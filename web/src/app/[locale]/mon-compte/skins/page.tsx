import type { Metadata } from "next";

import { GrilleSkins } from "@/components/compte/grille-skins";
import { utilisateurCourant } from "@/lib/auth";
import { skins } from "@/lib/fixtures/skins";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Mes skins",
  robots: { index: false, follow: false },
};

/**
 * Les skins publiés par le membre.
 *
 * Filtrés sur les fixtures faute d'API. L'utilisateur de démonstration reprend
 * volontairement le pseudo d'un auteur présent dans l'échantillon, sans quoi
 * cette page serait désespérément vide.
 */
export default async function MesSkinsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const utilisateur = await utilisateurCourant();
  const t = getMessages(locale);

  // La garde du layout empêche d'arriver ici sans session ; TypeScript ne le
  // sait pas, d'où ce filet.
  if (!utilisateur) return null;

  const miens = skins.filter((skin) => skin.user.id === utilisateur.id);

  return <GrilleSkins skins={miens} locale={locale} messageVide={t.filterNoResult} />;
}
