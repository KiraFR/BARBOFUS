"use client";

import { useEffect, useRef, useState } from "react";

import { texteEnrichi } from "@/lib/texte";
import type { Locale, Messages } from "@/messages";

/**
 * La fenêtre d'annonce du concours Miss'Skin.
 *
 * Elle s'ouvre d'elle-même le mardi matin, pendant le concours, et une seule
 * fois par semaine. C'est elle qui explique les règles et qui mène à la page
 * des récompenses — sans elle, cette page n'est atteignable qu'en tapant son
 * adresse.
 *
 * DEUX CORRECTIONS SUR L'ORIGINAL
 *
 * 1. L'heure. L'original calcule l'heure française en ajoutant 1 à l'heure UTC,
 *    avec ce commentaire : « Pour simplifier, on assume UTC+1 (hiver) ». La
 *    fenêtre est donc décalée d'une heure la moitié de l'année, alors que le
 *    concours a lieu tous les mardis. `Intl` connaît le fuseau de Paris et son
 *    heure d'été : autant le lui demander.
 *
 * 2. La semaine. L'original la calcule en divisant par sept jours l'écart au
 *    1er janvier, ce qui ne coïncide avec aucune semaine réelle. Ici c'est la
 *    semaine ISO, la même que celle du planning.
 *
 * Les horaires eux-mêmes sont ceux du code d'origine — 6h00 à 11h30 — et non
 * ceux annoncés dans le texte de la fenêtre, qui dit 7h00. L'écart existe déjà
 * en production ; le corriger serait décider à la place de Barbe Douce.
 */

/** Ce qui est retenu d'une semaine à l'autre, dans le stockage du navigateur. */
const CLE_STOCKAGE = "misskin_popup_week";

const DEBUT_MINUTES = 6 * 60;
const FIN_MINUTES = 11 * 60 + 30;

/**
 * L'heure et le jour à Paris, quel que soit le fuseau du visiteur.
 *
 * `formatToParts` évite d'analyser une chaîne formatée : on lit directement
 * les morceaux qui nous intéressent.
 */
function maintenantAParis(): { jour: string; minutes: number; annee: number; mois: number; date: number } {
  const format = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const morceaux = Object.fromEntries(
    format.formatToParts(new Date()).map((p) => [p.type, p.value]),
  );

  return {
    jour: morceaux.weekday ?? "",
    minutes: Number(morceaux.hour) * 60 + Number(morceaux.minute),
    annee: Number(morceaux.year),
    mois: Number(morceaux.month),
    date: Number(morceaux.day),
  };
}

/** L'identifiant de la semaine ISO courante à Paris, ex. « 2026-33 ». */
function semaineCourante(instant: ReturnType<typeof maintenantAParis>): string {
  const jour = Date.UTC(instant.annee, instant.mois - 1, instant.date);
  const jourDeSemaine = new Date(jour).getUTCDay() || 7;
  const jeudi = jour + (4 - jourDeSemaine) * 86_400_000;
  const annee = new Date(jeudi).getUTCFullYear();
  const semaine = Math.floor((jeudi - Date.UTC(annee, 0, 1)) / 86_400_000 / 7) + 1;

  return `${annee}-${semaine}`;
}

export function PopupMissSkin({
  t,
  locale,
  theme,
}: {
  t: Messages;
  locale: Locale;
  /** Le thème de la semaine, lu côté serveur. */
  theme: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const dialogue = useRef<HTMLDialogElement | null>(null);
  const semaine = useRef<string>("");

  // Rien de tout ceci ne peut être décidé côté serveur : la fenêtre dépend de
  // l'heure ET de ce que ce navigateur a déjà vu. D'où un effet, au premier
  // rendu seulement.
  useEffect(() => {
    const instant = maintenantAParis();

    const pendantLeConcours =
      instant.jour === "Tue" &&
      instant.minutes >= DEBUT_MINUTES &&
      instant.minutes <= FIN_MINUTES;

    if (!pendantLeConcours) return;

    semaine.current = semaineCourante(instant);

    try {
      if (window.localStorage.getItem(CLE_STOCKAGE) === semaine.current) return;
    } catch {
      // Stockage refusé (navigation privée, réglage strict) : on montre la
      // fenêtre. Mieux vaut la revoir que de ne jamais la voir.
    }

    setOuvert(true);
  }, []);

  useEffect(() => {
    const element = dialogue.current;
    if (!element) return;

    if (ouvert && !element.open) element.showModal();
    if (!ouvert && element.open) element.close();
  }, [ouvert]);

  function fermer() {
    try {
      window.localStorage.setItem(CLE_STOCKAGE, semaine.current);
    } catch {
      // Sans stockage, la fenêtre réapparaîtra au prochain chargement. C'est
      // le comportement le moins mauvais.
    }

    setOuvert(false);
  }

  /**
   * Les liens du texte traduit.
   *
   * `/recompenses` existe désormais ici, et prend la langue de l'URL. Le
   * Skinator, lui, n'est pas repris : son lien mène à l'ancien site, comme les
   * entrées de menu correspondantes.
   */
  function resoudreLien(chemin: string): string | null {
    if (chemin.startsWith("/recompenses")) return `/${locale}/recompenses`;
    if (chemin.startsWith("/skinator")) return "https://barbofus.com/skinator";

    return null;
  }

  return (
    <dialog
      ref={dialogue}
      onClose={fermer}
      onClick={(evenement) => {
        if (evenement.target === dialogue.current) fermer();
      }}
      className="bg-transparent p-4 backdrop:bg-black/50 open:flex m-auto max-h-full max-w-full items-center justify-center"
    >
      <div className="bg-anthracite text-ivory mx-auto w-full max-w-md rounded-lg font-light shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-6">
          <h2 className="text-xl font-normal">
            {t.popupMissSkinTitle}
            <span className="text-gold-text">{theme}</span>
          </h2>

          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer"
            className="text-heart-lit hover:text-heart-dark shrink-0 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="text-ivory/80 leading-relaxed">
            {texteEnrichi(t.popupMissSkinContent, {}, resoudreLien)}
          </div>

          <p className="mt-4 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[#9146ff]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
            </svg>
            <a
              href="https://www.twitch.tv/barbe___douce"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#9146ff] hover:underline"
            >
              twitch.tv/barbe___douce
            </a>
          </p>
        </div>
      </div>
    </dialog>
  );
}
