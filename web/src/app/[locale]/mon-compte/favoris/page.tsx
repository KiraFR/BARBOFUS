import type { Metadata } from "next";

import { GrilleSkins } from "@/components/compte/grille-skins";
import { skins } from "@/lib/fixtures/skins";
import { favorisDemo } from "@/lib/fixtures/utilisateur";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Mes favoris",
  robots: { index: false, follow: false },
};

/**
 * Les skins mis en favori.
 *
 * La liste des favoris est arbitraire : l'API ne rend pas cette information.
 * Elle viendra de l'endpoint de galerie, sous la forme d'un `favorited_by_me`
 * sur chaque skin.
 */
export default async function MesFavorisPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getMessages(locale);

  const favoris = skins.filter((skin) => favorisDemo.includes(skin.id));

  return <GrilleSkins skins={favoris} locale={locale} messageVide={t.filterNoResult} />;
}
