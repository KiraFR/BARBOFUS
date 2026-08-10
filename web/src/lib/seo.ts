import type { Metadata } from "next";

import { defaultLocale, locales } from "@/messages";

/**
 * Déclare à Google les traductions d'une même page.
 *
 * Sans ces balises `hreflang`, les quatre versions d'une page se font
 * concurrence : le moteur les prend pour du contenu dupliqué et n'en retient
 * qu'une. Avec elles, il comprend qu'il s'agit de la même page en quatre
 * langues et sert la bonne selon le visiteur — ce qui est tout l'intérêt
 * d'avoir mis la langue dans l'URL.
 *
 * `x-default` désigne la version servie à qui ne correspond à aucune langue.
 *
 * À appeler depuis chaque page indexable, avec son chemin SANS la langue :
 *
 *     export const metadata = { ...alternatesPour("/skins") };
 *
 * Inutile sur les pages en `noindex` (connexion, inscription, etc.).
 */
export function alternatesPour(chemin: string): Pick<Metadata, "alternates"> {
  const versLangue = (locale: string) => `/${locale}${chemin === "/" ? "" : chemin}`;

  return {
    alternates: {
      canonical: versLangue(defaultLocale),
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, versLangue(locale)])),
        "x-default": versLangue(defaultLocale),
      },
    },
  };
}
