import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales, type Locale } from "@/messages";

/**
 * Redirige les URL sans langue vers la langue du visiteur.
 *
 * `/skins` devient `/fr/skins` ou `/en/skins` selon l'en-tête
 * `Accept-Language`. Toutes les pages vivent sous un segment de langue : c'est
 * ce qui permet aux moteurs de recherche d'indexer les quatre traductions au
 * lieu d'une seule, ce que l'ancien site ne pouvait pas faire puisque la
 * langue y était une simple préférence d'utilisateur.
 *
 * Ce fichier s'appelle `proxy` et non `middleware` : Next 16 a renommé la
 * convention.
 *
 * La négociation est écrite à la main plutôt que via `negotiator` et
 * `intl-localematcher` : quatre langues sans variante régionale ne justifient
 * pas deux dépendances.
 */

/** Lit l'en-tête Accept-Language et en tire la meilleure langue disponible. */
function langueDemandee(request: NextRequest): Locale {
  const entete = request.headers.get("accept-language");
  if (!entete) return defaultLocale;

  // « fr-FR,fr;q=0.9,en;q=0.8 » → [{ code: 'fr', poids: 1 }, …], trié.
  const preferences = entete
    .split(",")
    .map((morceau) => {
      const [etiquette, qualite] = morceau.trim().split(";q=");
      return {
        code: etiquette.split("-")[0]!.toLowerCase(),
        poids: qualite ? Number.parseFloat(qualite) : 1,
      };
    })
    .filter((p) => !Number.isNaN(p.poids))
    .sort((a, b) => b.poids - a.poids);

  const trouvee = preferences.find((p) => locales.includes(p.code as Locale));
  return (trouvee?.code as Locale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const aDejaUneLangue = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (aDejaUneLangue) return;

  const locale = langueDemandee(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // On laisse passer les ressources internes, l'API et les fichiers statiques :
  // seules les pages ont besoin d'une langue dans leur URL.
  matcher: ["/((?!_next|api|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
