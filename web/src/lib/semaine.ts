import type { Locale } from "@/messages";

/**
 * Semaines ISO : conversions entre un numéro de semaine et des dates.
 *
 * POURQUOI CE FICHIER EXISTE, ET POURQUOI IL NE COPIE PAS L'ORIGINAL
 *
 * Le site actuel calcule ses semaines à deux endroits, de deux façons qui ne
 * donnent pas le même résultat :
 *
 *   - Laravel ÉCRIT le numéro avec `Carbon::isoWeek` — la norme ISO 8601, où
 *     la semaine 1 est celle qui contient le premier jeudi de l'année ;
 *   - le JavaScript de la page le RELIT avec un calcul maison qui part du
 *     premier lundi de l'année.
 *
 * Les deux divergent d'une semaine dès que le 1er janvier tombe un vendredi,
 * un samedi ou un dimanche. C'est le cas pour 2026 : la production affiche
 * « Semaine du 6 au 12 avril » pour une semaine 14 qui, en ISO, va du 30 mars
 * au 5 avril. Le planning est donc daté d'une semaine trop tard.
 *
 * Comme c'est Laravel qui écrit le numéro, c'est l'ISO qui fait foi : on
 * calcule en ISO, et l'affichage retombe juste.
 */

const JOUR_MS = 86_400_000;

/**
 * Le lundi d'une semaine ISO, à minuit UTC.
 *
 * Tout est calculé en UTC pour que le serveur et le navigateur tombent sur la
 * même date quel que soit leur fuseau — sans quoi React signalerait une
 * incohérence d'hydratation aux dates charnières.
 */
export function lundiDeSemaine(annee: number, semaine: number): Date {
  // Le 4 janvier appartient toujours à la semaine 1, par définition de l'ISO.
  const quatreJanvier = Date.UTC(annee, 0, 4);
  const jourDeSemaine = new Date(quatreJanvier).getUTCDay() || 7; // lundi = 1, dimanche = 7
  const lundiSemaine1 = quatreJanvier - (jourDeSemaine - 1) * JOUR_MS;

  return new Date(lundiSemaine1 + (semaine - 1) * 7 * JOUR_MS);
}

/** Le numéro de semaine ISO d'une date, et l'année à laquelle il se rattache. */
export function semaineDeDate(date: Date): { annee: number; semaine: number } {
  const jour = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const jourDeSemaine = new Date(jour).getUTCDay() || 7;

  // Le jeudi de la semaine désigne l'année ISO : une semaine à cheval sur deux
  // années appartient à celle où tombe son jeudi.
  const jeudi = jour + (4 - jourDeSemaine) * JOUR_MS;
  const annee = new Date(jeudi).getUTCFullYear();
  const semaine = Math.floor((jeudi - Date.UTC(annee, 0, 1)) / JOUR_MS / 7) + 1;

  return { annee, semaine };
}

/** La date d'un jour de la semaine, `index` allant de 0 (lundi) à 6 (dimanche). */
export function dateDuJour(annee: number, semaine: number, index: number): Date {
  return new Date(lundiDeSemaine(annee, semaine).getTime() + index * JOUR_MS);
}

/** « 30/3 » — le format court affiché sous le nom du jour. */
export function jourEtMois(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * « Semaine du 30 au 5 avril 2026 » — l'intitulé de l'en-tête.
 *
 * Le premier nombre est nu : c'est la tournure de la page d'origine, et elle se
 * lit bien tant que les deux dates sont proches.
 *
 * Les mots sont en français en dur, comme sur la page d'origine, qui n'est
 * traduite dans aucune langue — son contenu (les noms d'activités saisis par
 * le streamer) est français de toute façon. Seules les dates suivent la langue
 * de l'URL. À reprendre le jour où cette page sera traduite.
 */
export function intituleSemaine(annee: number, semaine: number, locale: Locale): string {
  const lundi = lundiDeSemaine(annee, semaine);
  const dimanche = new Date(lundi.getTime() + 6 * JOUR_MS);

  const numeroDuJour = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    timeZone: "UTC",
  }).format(lundi);

  const dateComplete = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dimanche);

  return `Semaine du ${numeroDuJour} au ${dateComplete}`;
}

/** Minutes écoulées depuis minuit, pour une heure au format `HH:MM`. */
export function minutesDepuisMinuit(heure: string): number {
  const [h, m] = heure.split(":");
  const heures = Number(h);
  const minutes = Number(m);

  if (!Number.isFinite(heures) || !Number.isFinite(minutes)) return 0;

  return heures * 60 + minutes;
}
