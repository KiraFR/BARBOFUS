import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { estLocale, locales } from "@/messages";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Sert de base aux URL absolues des balises hreflang et Open Graph.
  metadataBase: new URL("https://barbofus.com"),
  title: {
    default: "BARBOFUS",
    template: "%s — BARBOFUS",
  },
  description: "La communauté des skins Dofus.",
};

/**
 * Les quatre langues sont connues à l'avance : on les prérend toutes plutôt
 * que de les générer à la demande.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Mise en page racine : le document, et rien de plus.
 *
 * Elle vit sous `[locale]` et non à la racine de `app/`, ce que Next autorise
 * explicitement — c'est même nécessaire ici, puisque l'attribut `lang` du
 * document doit refléter la langue de l'URL.
 *
 * L'habillage (bandeau, en-tête, menu, pied de page) N'EST PAS ici, parce que
 * le site a deux familles de pages et qu'elles ne le partagent pas :
 *
 *   - `(site)` — les pages normales, avec en-tête et menu ;
 *   - `(ecran)` — le planning et les récompenses, montrés en plein écran
 *     pendant le direct, sans menu ni en-tête.
 *
 * Côté Laravel la distinction existe déjà : ces deux pages étendent
 * `layouts/empty-views` là où toutes les autres étendent `layouts/app`. Les
 * groupes de routes de Next expriment exactement ça, et sans toucher aux URL —
 * les parenthèses ne comptent pas dans le chemin.
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Une langue inconnue dans l'URL donne un 404, pas un repli silencieux :
  // sinon /zz/skins répondrait 200 et se retrouverait indexé.
  if (!estLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
