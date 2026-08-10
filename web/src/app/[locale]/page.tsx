import type { Metadata } from "next";
import Link from "next/link";

import { alternatesPour } from "@/lib/seo";
import { lien, type Locale } from "@/messages";

export const metadata: Metadata = {
  ...alternatesPour("/"),
};

/**
 * Page d'accueil — vide pour l'instant.
 *
 * Elle assemblera des composants qui n'existent pas encore : la carte de skin,
 * l'encart des gagnants Miss'Skin. Elle vient donc après la galerie.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-gold-text text-4xl">BARBOFUS</h1>
      <p className="text-muted-foreground">Refonte en cours. Rien à voir ici pour le moment.</p>
      <p>
        <Link href={lien(locale, "/design")} className="text-primary underline underline-offset-4">
          Voir les jetons de design
        </Link>
      </p>
    </main>
  );
}
