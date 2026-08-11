"use client";

import { useSyncExternalStore } from "react";

import { minutesDepuisMinuit, semaineDeDate } from "@/lib/semaine";
import { cn } from "@/lib/utils";
import type { Activite } from "@/types/ecrans";

/**
 * Une activité du planning, avec le badge « LIVE » quand elle est en cours.
 *
 * Composant client, et pour une seule raison : savoir si une activité est en
 * cours dépend de l'heure qu'il est chez le visiteur. Rendue côté serveur,
 * cette information serait celle du serveur, et React signalerait une
 * incohérence d'hydratation.
 */

/**
 * Correspondance entre les libellés du planning et `Date.getDay()`, où le
 * dimanche vaut 0. Reprise telle quelle du site actuel.
 */
const JOURS: Record<string, number> = {
  LUN: 1,
  MAR: 2,
  MER: 3,
  JEU: 4,
  VEN: 5,
  SAM: 6,
  DIM: 0,
};

const MINUTE_MS = 60_000;

function souscrire(rappel: () => void): () => void {
  const identifiant = window.setInterval(rappel, MINUTE_MS);
  return () => window.clearInterval(identifiant);
}

/**
 * La minute courante, arrondie — deux appels dans la même minute rendent la
 * même valeur, ce qu'exige `useSyncExternalStore` pour ne pas boucler.
 */
function minuteCourante(): number {
  return Math.floor(Date.now() / MINUTE_MS);
}

/**
 * Côté serveur, il n'y a pas d'heure « du visiteur » : on rend `null`, donc
 * aucune activité n'est en cours au premier rendu. Le badge apparaît à
 * l'hydratation, sans divergence possible.
 */
function pasDHeure(): null {
  return null;
}

function useMinute(): number | null {
  return useSyncExternalStore(souscrire, minuteCourante, pasDHeure);
}

export function CarteActivite({
  activite,
  jour,
  semaine,
  annee,
}: {
  activite: Activite;
  /** Le libellé du jour de la colonne : LUN, MAR, ... */
  jour: string;
  /** La semaine ISO affichée, pour ne rien marquer en cours sur une autre. */
  semaine: number;
  annee: number;
}) {
  const minute = useMinute();
  const enCours = minute !== null && estEnCours(activite, jour, semaine, annee);

  return (
    <article
      className={cn(
        "group bg-anthracite/50 relative h-full overflow-hidden rounded-xl border-2 backdrop-blur-md transition-all",
        enCours
          ? "border-gold-dark/60 shadow-gold-dark/20 scale-[1.03] shadow-2xl"
          : "hover:border-gold-dark/40 hover:shadow-gold-dark/20 border-white/5 hover:scale-[1.02] hover:shadow-2xl",
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden">
        {enCours && (
          <p className="heart-gradient text-ivory absolute top-2 left-2 z-20 flex animate-pulse items-center gap-1.5 rounded-full px-2 py-1 text-xs font-bold tracking-wide uppercase shadow-lg">
            <span aria-hidden="true" className="bg-ivory h-1.5 w-1.5 rounded-full" />
            En direct
          </p>
        )}

        <div className="relative min-h-0 flex-1 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activite.image}
            alt=""
            aria-hidden="true"
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out",
              enCours ? "scale-110" : "group-hover:scale-110",
            )}
          />

          {/* Voile sombre : le nom et les horaires se lisent par-dessus
              l'image, quelle qu'elle soit. Il s'éclaircit au survol. */}
          <div
            aria-hidden="true"
            className={cn(
              "from-anthracite via-anthracite/50 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500",
              enCours ? "opacity-50" : "opacity-100 group-hover:opacity-50",
            )}
          />
        </div>

        <div className="from-anthracite absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-2 lg:p-[min(0.75rem,0.6vw)]">
          <p className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="gold-gradient shadow-gold-dark/50 h-2 w-2 shrink-0 rounded-full shadow-lg"
            />
            <span className="gold-gradient bg-clip-text font-light tracking-wider text-transparent lg:text-[min(1rem,1.1vw)]">
              {activite.debut} - {activite.fin}
            </span>
          </p>

          <p className="text-ivory mt-1 leading-tight lg:text-[min(1rem,1.05vw)]">{activite.nom}</p>
        </div>
      </div>
    </article>
  );
}

/**
 * L'activité est-elle en cours, maintenant, chez le visiteur ?
 *
 * Trois conditions, dans l'ordre du site actuel : c'est bien la semaine
 * affichée, c'est bien le jour de la colonne, et l'heure tombe dans la plage.
 */
function estEnCours(activite: Activite, jour: string, semaine: number, annee: number): boolean {
  const maintenant = new Date();

  const actuelle = semaineDeDate(maintenant);
  if (actuelle.semaine !== semaine || actuelle.annee !== annee) return false;

  if (maintenant.getDay() !== JOURS[jour.toUpperCase()]) return false;

  const minutes = maintenant.getHours() * 60 + maintenant.getMinutes();

  return (
    minutes >= minutesDepuisMinuit(activite.debut) && minutes <= minutesDepuisMinuit(activite.fin)
  );
}
