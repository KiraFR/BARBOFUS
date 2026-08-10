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
    <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-10">
      <h1 className="font-display text-gold-text mb-8 text-center text-4xl uppercase">
        {t.buttonSkins}
      </h1>

      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} locale={locale} />
        ))}
      </div>
    </main>
  );
}
