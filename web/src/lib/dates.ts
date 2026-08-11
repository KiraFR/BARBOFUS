import type { Locale } from "@/messages";

/**
 * Exprime une date en écart par rapport à maintenant : « il y a 1 an ».
 *
 * C'est la forme employée par le site actuel, qui s'appuie sur le
 * `diffForHumans()` de Carbon. `Intl.RelativeTimeFormat` fait la même chose et
 * traduit dans les quatre langues sans dépendance supplémentaire.
 *
 * À n'utiliser QUE dans un composant serveur : le résultat dépend de l'heure
 * courante, donc serveur et navigateur ne calculeraient pas la même chose et
 * React signalerait une incohérence d'hydratation.
 */

const UNITES: { unite: Intl.RelativeTimeFormatUnit; secondes: number }[] = [
  { unite: "year", secondes: 31_536_000 },
  { unite: "month", secondes: 2_592_000 },
  { unite: "week", secondes: 604_800 },
  { unite: "day", secondes: 86_400 },
  { unite: "hour", secondes: 3_600 },
  { unite: "minute", secondes: 60 },
];

export function dateRelative(iso: string | null, locale: Locale): string {
  if (!iso) return "—";

  const ecartSecondes = (Date.parse(iso) - Date.now()) / 1000;
  const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  for (const { unite, secondes } of UNITES) {
    const valeur = ecartSecondes / secondes;
    if (Math.abs(valeur) >= 1) {
      return format.format(Math.round(valeur), unite);
    }
  }

  return format.format(0, "second");
}
