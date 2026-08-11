import { notFound } from "next/navigation";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MainNav } from "@/components/layout/main-nav";
import { Notifications } from "@/components/layout/notifications";
import { PopupMissSkin } from "@/components/layout/popup-miss-skin";
import { PromoBanner } from "@/components/layout/promo-banner";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { estConnecte } from "@/lib/auth";
import { chargerThemeMissSkin } from "@/lib/miss-skin";
import { estLocale, getMessages } from "@/messages";

/**
 * L'habillage des pages normales : bandeau, en-tête, sélecteur de langue,
 * menu, pied de page.
 *
 * Équivaut à `layouts/app` côté Laravel. Le planning et les récompenses ne
 * passent pas par ici — voir `(ecran)/layout.tsx`.
 *
 * La page 404, elle, passe bien par ici : l'attrape-tout `[...introuvable]` la
 * ramène dans ce groupe précisément pour qu'elle garde le menu et le pied de
 * page. Un visiteur qui se trompe d'adresse doit avoir de quoi repartir.
 */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // La langue est déjà validée par la mise en page racine, qui rend un 404
  // pour toute autre valeur. Ce garde n'est là que pour le typage : Next impose
  // `params: Promise<{ locale: string }>` dans une mise en page, sans laisser
  // la possibilité de le restreindre à nos quatre langues.
  if (!estLocale(locale)) notFound();

  const t = getMessages(locale);

  // L'état de connexion est lu côté serveur : le menu est donc juste dès le
  // premier rendu, sans clignotement entre « visiteur » et « membre ».
  const [connecte, themeMissSkin] = await Promise.all([estConnecte(), chargerThemeMissSkin()]);

  return (
    <>
      <PromoBanner />
      <SiteHeader locale={locale} />
      <LocaleSwitcher locale={locale} />
      {/* La cloche n'existe que pour un membre connecté, comme sur le site. */}
      {connecte ? <Notifications locale={locale} /> : null}
      <MainNav t={t} locale={locale} connecte={connecte} />
      {/* Posée dans l'habillage, comme `layouts/basic-views` côté Laravel :
          elle peut donc s'ouvrir depuis n'importe quelle page du site. */}
      <PopupMissSkin t={t} locale={locale} theme={themeMissSkin} />
      {children}
      <ScrollToTop />
      <SiteFooter t={t} locale={locale} />
    </>
  );
}
