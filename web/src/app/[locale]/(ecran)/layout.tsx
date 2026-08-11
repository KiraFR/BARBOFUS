import { notFound } from "next/navigation";

import { PromoBanner } from "@/components/layout/promo-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { estLocale, getMessages } from "@/messages";

/**
 * L'habillage des écrans plein cadre : planning et récompenses.
 *
 * Ces deux pages sont faites pour être montrées pendant le direct, ou ouvertes
 * depuis un lien de la chaîne. Elles occupent tout le viewport et n'ont donc ni
 * en-tête, ni menu, ni bouton de retour en haut — seulement le bandeau du code
 * créateur et le pied de page, comme `layouts/empty-views` côté Laravel.
 */
export default async function EcranLayout({
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

  return (
    <>
      <PromoBanner />
      {children}
      <SiteFooter t={getMessages(locale)} locale={locale} />
    </>
  );
}
