import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { estConnecte } from "@/lib/auth";
import { MainNav } from "@/components/layout/main-nav";
import { Notifications } from "@/components/layout/notifications";
import { PromoBanner } from "@/components/layout/promo-banner";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { estLocale, getMessages, locales } from "@/messages";

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
 * Mise en page racine.
 *
 * Elle vit sous `[locale]` et non à la racine de `app/`, ce que Next autorise
 * explicitement — c'est même nécessaire ici, puisque l'attribut `lang` du
 * document doit refléter la langue de l'URL.
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

  const t = getMessages(locale);

  // L'état de connexion est lu côté serveur : le menu est donc juste dès le
  // premier rendu, sans clignotement entre « visiteur » et « membre ».
  const connecte = await estConnecte();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PromoBanner />
        <SiteHeader locale={locale} />
        <LocaleSwitcher locale={locale} />
        {/* La cloche n'existe que pour un membre connecté, comme sur le site. */}
        {connecte ? <Notifications locale={locale} /> : null}
        <MainNav t={t} locale={locale} connecte={connecte} />
        {children}
        <ScrollToTop />
        <SiteFooter t={t} locale={locale} />
      </body>
    </html>
  );
}
