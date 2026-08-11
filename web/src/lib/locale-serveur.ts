import "server-only";

import { headers } from "next/headers";

import { ENTETE_LOCALE } from "@/lib/entetes";
import { defaultLocale, estLocale, type Locale } from "@/messages";

/**
 * La langue de l'URL courante, pour les écrans qui ne reçoivent pas `params`.
 *
 * Next passe `params` aux pages et aux mises en page, mais PAS à `not-found.tsx`
 * ni à `error.tsx` : ces écrans sont rendus hors du routage normal. Or notre
 * langue vit dans l'URL, et une page 404 en français servie à un visiteur
 * anglophone serait un aveu de bricolage.
 *
 * Le proxy recopie donc la langue de l'URL dans un en-tête de requête, et c'est
 * ici qu'on la relit. Le repli sur la langue par défaut ne devrait jamais
 * servir : toute page passe par le proxy, qui redirige les URL sans langue.
 */

export async function localeCourante(): Promise<Locale> {
  const valeur = (await headers()).get(ENTETE_LOCALE);

  return estLocale(valeur ?? "") ? (valeur as Locale) : defaultLocale;
}
