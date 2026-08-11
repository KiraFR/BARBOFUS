import "server-only";

import type { HavenBag, HavenBagTheme } from "@/types/api";

/**
 * Va chercher les havre-sacs et leurs thèmes sur la production.
 *
 * POURQUOI C'EST PLUS LABORIEUX QUE POUR LES SKINS
 * Les skins ont `/api/skin/{id}`, qui rend du JSON. Les havre-sacs n'ont rien :
 * la galerie est peinte par Livewire et le seul moyen de lire un havre-sac
 * précis est `/havre-sacs?show={id}`, qui renvoie 150 Ko de HTML pour en
 * extraire six champs. C'est cher, donc tout est mis en cache longuement et le
 * nombre d'appels est borné.
 *
 * Ce qu'on lit dans le HTML :
 *   - la première page de la galerie donne dix havre-sacs complets, dans le
 *     gestionnaire de clic de chaque carte ;
 *   - la colonne de gauche donne les quarante-trois thèmes ;
 *   - `?show={id}` donne un havre-sac précis, dans l'état initial du composant.
 *
 * Le jour où l'endpoint existera, ce fichier disparaîtra — la forme rendue ici
 * est déjà celle qu'il devra servir.
 */

const PROD = "https://barbofus.com";

/** Une heure. Les havre-sacs sont publiés au compte-gouttes. */
const DUREE_CACHE = 3600;

/** Appels menés de front. Chaque appel coûtant 150 Ko, on reste modeste. */
const PARALLELISME = 6;

const ENTETES = { "User-Agent": "Mozilla/5.0 (compatible; barbofus-refonte/dev)" };

/** Défait les entités HTML et les apostrophes échappées d'un attribut Alpine. */
function decoder(valeur: string): string {
  return valeur
    .replace(/\\'/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;?/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

/** Rétablit une URL propre : la production produit parfois un double slash. */
function normaliserUrl(valeur: string): string {
  return valeur.replace(/([^:])\/{2,}/g, "$1/");
}

/**
 * Lit `champ = '...'` dans un fragment de code Alpine.
 *
 * Les valeurs peuvent contenir une apostrophe échappée (`Kwis d\'Ombre`), d'où
 * l'alternative qui accepte `\` suivi de n'importe quoi.
 */
function champ(fragment: string, nom: string): string {
  const trouve = fragment.match(new RegExp(`${nom}\\s*[=:]\\s*'((?:[^'\\\\]|\\\\.)*)'`));

  return trouve ? decoder(trouve[1]) : "";
}

/** Construit un havre-sac à partir d'un fragment, ou `null` s'il est inutilisable. */
function lireHavreSac(id: number, fragment: string): HavenBag | null {
  const image = normaliserUrl(champ(fragment, "havenBagImagePath"));
  const auteur = champ(fragment, "username");

  // Sans image ni auteur, la carte n'a rien à montrer : on l'écarte plutôt que
  // de peindre un cadre vide.
  if (!image || !auteur) return null;

  const nom = champ(fragment, "havenBagName");

  return {
    id,
    name: nom === "" ? null : nom,
    image_path: image,
    user_name: auteur,
    theme_name: champ(fragment, "havenBagThemeName"),
    popocket_icon_path: normaliserUrl(champ(fragment, "popocketIconPath")),
  };
}

async function recupererPage(url: string): Promise<string | null> {
  try {
    const reponse = await fetch(url, { headers: ENTETES, next: { revalidate: DUREE_CACHE } });
    if (!reponse.ok) return null;

    return await reponse.text();
  } catch {
    return null;
  }
}

/** Les havre-sacs de la première page de la galerie, avec leurs identifiants. */
function lirePremierePage(html: string): HavenBag[] {
  const sacs: HavenBag[] = [];

  const cartes = html.matchAll(
    /wire:key="haven-bag\.(\d+)"([\s\S]{0,2000}?)\$dispatch\('haven-bag-change'\)/g,
  );

  for (const carte of cartes) {
    const sac = lireHavreSac(Number(carte[1]), carte[2]);
    if (sac) sacs.push(sac);
  }

  return sacs;
}

/**
 * Les thèmes, lus dans les boutons de la colonne de filtres.
 *
 * Ils y figurent tous : ceux qui ne sont pas cochés dans « Inactif », les
 * autres dans « Activé ». Sans filtre appliqué, la seconde liste est vide et la
 * première contient les quarante-trois.
 */
function lireThemes(html: string): HavenBagTheme[] {
  const themes = new Map<number, HavenBagTheme>();

  for (const bouton of html.matchAll(/wire:click="ToggleTheme\((\d+)\)"([\s\S]{0,1500}?)<\/button>/g)) {
    const id = Number(bouton[1]);
    const bloc = bouton[2];

    // Le nom suit le </span> du mot « Thème », masqué sous 900 px.
    const nom = bloc.match(/<\/span>([^<]*)<\/p>/);
    const image = bloc.match(/src="([^"]+)"/);
    if (!nom || !image) continue;

    themes.set(id, {
      id,
      name: decoder(nom[1]),
      image_path: normaliserUrl(decoder(image[1])),
    });
  }

  return [...themes.values()];
}

/** Un havre-sac précis, via `?show={id}`. */
async function chargerUn(id: number): Promise<HavenBag | null> {
  const html = await recupererPage(`${PROD}/havre-sacs?show=${id}`);
  if (!html) return null;

  // L'état initial du composant ne porte les valeurs que si le havre-sac
  // existe ET qu'il est publié — sinon `showHavenBag` reste à false.
  const debut = html.indexOf("showHavenBag:");
  if (debut === -1) return null;

  const fragment = html.slice(debut, debut + 1500);
  if (!/showHavenBag:\s*true/.test(fragment)) return null;

  return lireHavreSac(id, fragment);
}

/**
 * Charge des havre-sacs depuis la production.
 *
 * La première page en donne dix d'un coup ; au-delà on descend les
 * identifiants un par un, comme pour les skins. Rend une liste vide en cas
 * d'échec, à l'appelant de se rabattre sur les fixtures.
 */
export async function chargerHavreSacsDistants(combien: number): Promise<HavenBag[]> {
  const html = await recupererPage(`${PROD}/havre-sacs`);
  if (!html) return [];

  const sacs = lirePremierePage(html);
  if (sacs.length === 0) return [];

  // Les identifiants sont séquentiels : on descend depuis le plus ancien vu.
  let prochain = Math.min(...sacs.map((sac) => sac.id)) - 1;

  while (sacs.length < combien && prochain > 0) {
    const paquet: number[] = [];
    for (let i = 0; i < PARALLELISME && prochain > 0; i += 1, prochain -= 1) {
      paquet.push(prochain);
    }

    const charges = await Promise.all(paquet.map(chargerUn));
    for (const sac of charges) {
      if (sac) sacs.push(sac);
    }
  }

  return sacs.slice(0, combien);
}

/** Les thèmes de havre-sac. Liste vide en cas d'échec. */
export async function chargerThemesDistants(): Promise<HavenBagTheme[]> {
  const html = await recupererPage(`${PROD}/havre-sacs`);

  return html ? lireThemes(html) : [];
}
