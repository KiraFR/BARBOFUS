import type { Metadata } from "next";

import { SkinCard } from "@/components/skins/skin-card";
import { skins } from "@/lib/fixtures/skins";
import { alternatesPour } from "@/lib/seo";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Skins",
  // Première page du site destinée à être indexée, dans les quatre langues.
  ...alternatesPour("/skins"),
};

/**
 * La galerie de skins.
 *
 * Première étape : la grille, en statique, sur les douze skins de
 * démonstration. Ni filtres, ni tri, ni chargement à la volée — ils viennent
 * ensuite, et ce sont eux qui décideront de la forme de l'endpoint.
 */
export default async function SkinsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getMessages(locale);

  return (
    <main className="w-full flex-1 py-10">
      <h1 className="font-display text-gold-text mb-4 text-center text-4xl uppercase">
        {t.buttonSkins}
      </h1>

      {/* Colonnes de largeur fixe en auto-fill, reprises du site actuel : les
          cartes gardent leurs proportions et c'est leur nombre par ligne qui
          s'adapte, jamais leur taille. */}
      <div className="mx-auto grid w-[min(100%,93rem)] grid-cols-[repeat(auto-fill,13.125rem)] justify-center gap-x-8 gap-y-16 px-4 pt-[4.5rem]">
        {skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} locale={locale} />
        ))}
      </div>
    </main>
  );
}
