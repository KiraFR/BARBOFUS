import "server-only";

import type { ActiviteStockee, Jour, JourStocke, Planning, Recompense } from "@/types/ecrans";

/**
 * Va chercher le planning et les récompenses sur la production.
 *
 * POURQUOI ÇA RESSEMBLE À DU BRICOLAGE
 * Ces deux pages n'ont pas d'endpoint : Laravel lit deux fichiers JSON du
 * stockage (`json/planning.json`, `json/rewards.json`) et les injecte dans le
 * HTML, dans l'état initial du composant Alpine. Il n'y a donc rien d'autre à
 * interroger que la page elle-même.
 *
 * On assume : ces données changent (le planning, chaque semaine), et les figer
 * dans le dépôt condamnerait la page à afficher un planning périmé. Le jour où
 * une vraie API existera, seul ce fichier disparaîtra.
 *
 * Comme pour les skins, tout est en cache et l'échec est silencieux : si la
 * production ne répond pas ou si le HTML change de forme, on rend `null` et
 * l'appelant se rabat sur les fixtures. Une page qui s'affiche avec des données
 * datées vaut mieux qu'une page en erreur.
 */

const PROD = "https://barbofus.com";

/** Dix minutes : le planning peut changer en cours de semaine. */
const DUREE_CACHE = 600;

/** En-tête de navigateur : la production refuse certains clients. */
const ENTETES = { "User-Agent": "Mozilla/5.0 (compatible; barbofus-refonte/dev)" };

/**
 * Extrait le tableau JSON qui suit un marqueur dans le HTML.
 *
 * On ne peut pas s'en tirer avec une expression régulière : les valeurs
 * contiennent des crochets (noms d'activités, emoji) et une regex gourmande
 * s'arrêterait au mauvais endroit. On compte donc les crochets ouvrants et
 * fermants, en ignorant ceux qui se trouvent à l'intérieur d'une chaîne.
 */
function extraireTableau(html: string, marqueur: string): unknown[] | null {
  const debut = html.indexOf(marqueur);
  if (debut === -1) return null;

  const ouverture = html.indexOf("[", debut);
  if (ouverture === -1) return null;

  let profondeur = 0;
  let dansUneChaine = false;
  let echappe = false;

  for (let i = ouverture; i < html.length; i += 1) {
    const c = html[i];

    if (dansUneChaine) {
      if (echappe) echappe = false;
      else if (c === "\\") echappe = true;
      else if (c === '"') dansUneChaine = false;
      continue;
    }

    if (c === '"') dansUneChaine = true;
    else if (c === "[") profondeur += 1;
    else if (c === "]") {
      profondeur -= 1;
      if (profondeur === 0) {
        try {
          const valeur: unknown = JSON.parse(html.slice(ouverture, i + 1));
          return Array.isArray(valeur) ? valeur : null;
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

/**
 * Transforme un chemin d'image en URL affichable.
 *
 * Le JSON stocke `/storage/images/planning/xxx.png`. On préfixe par le domaine
 * de production, en laissant passer une éventuelle URL déjà absolue.
 */
function urlImage(chemin: string | undefined): string {
  if (!chemin) return "";
  if (/^https?:\/\//.test(chemin)) return chemin;

  return `${PROD}/${chemin.replace(/^\/+/, "")}`;
}

/**
 * Normalise une activité : la casse des clés disparaît ici, et nulle part
 * ailleurs. Voir le commentaire de `types/ecrans.ts` sur ce mélange de
 * conventions.
 */
function normaliserActivite(activite: ActiviteStockee) {
  return {
    nom: activite.Name ?? activite.name ?? "",
    debut: activite.StartTime ?? activite.startTime ?? "00:00",
    fin: activite.EndTime ?? activite.endTime ?? "00:00",
    image: urlImage(activite.Image ?? activite.image),
    // Seul `false` masque : une activité sans le champ est visible, c'est la
    // règle appliquée par Laravel comme par le composant Alpine.
    visible: activite.visible !== false,
  };
}

function normaliserJours(jours: unknown[]): Jour[] {
  return jours.map((valeur) => {
    const jour = valeur as JourStocke;

    return {
      nom: jour.name ?? "",
      activites: Array.isArray(jour.activities) ? jour.activities.map(normaliserActivite) : [],
    };
  });
}

/**
 * Le planning de la semaine affichée en production.
 *
 * Rend `null` si la production ne répond pas, si le HTML a changé de forme, ou
 * si le planning en revient vide — ce dernier cas trahissant un problème plutôt
 * qu'une semaine réellement sans activité.
 */
export async function chargerPlanningDistant(): Promise<Planning | null> {
  try {
    const reponse = await fetch(`${PROD}/planning`, {
      headers: ENTETES,
      next: { revalidate: DUREE_CACHE },
    });
    if (!reponse.ok) return null;

    const html = await reponse.text();

    const jours = extraireTableau(html, "planning: [");
    if (!jours || jours.length === 0) return null;

    // La semaine et l'année sont passées en arguments au composant Alpine :
    // `planningComponent(false, 14, 2026)`.
    const arguments_ = html.match(/planningComponent\(\s*\w+\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (!arguments_) return null;

    return {
      jours: normaliserJours(jours),
      semaine: Number(arguments_[1]),
      annee: Number(arguments_[2]),
    };
  } catch {
    return null;
  }
}

/** Les récompenses affichées en production. `null` en cas d'échec. */
export async function chargerRecompensesDistantes(): Promise<Recompense[] | null> {
  try {
    const reponse = await fetch(`${PROD}/recompenses`, {
      headers: ENTETES,
      next: { revalidate: DUREE_CACHE },
    });
    if (!reponse.ok) return null;

    const brutes = extraireTableau(await reponse.text(), "rewards: [");
    if (!brutes || brutes.length === 0) return null;

    return brutes
      .map((valeur) => urlImage((valeur as { image?: string }).image))
      .filter((image) => image !== "")
      .map((image) => ({ image }));
  } catch {
    return null;
  }
}
