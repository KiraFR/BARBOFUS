import type { Metadata } from "next";

import { GalleryToolbar } from "@/components/skins/gallery-toolbar";
import { SkinCard } from "@/components/skins/skin-card";
import { skins } from "@/lib/fixtures/skins";
import { alternatesPour } from "@/lib/seo";
import { estCodeTri, TRI_DEFAUT, trierSkins } from "@/lib/tri";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Skins",
  // Première page du site destinée à être indexée, dans les quatre langues.
  ...alternatesPour("/skins"),
};

/**
 * La galerie de skins.
 *
 * Le tri est lu dans l'URL, ce qui rend la page dynamique — c'est assumé :
 * une galerie triée et filtrée ne peut pas être figée à la compilation, et le
 * rendu serveur suffit largement au référencement.
 *
 * Restent à venir : les filtres, et le chargement à la volée.
 */
export default async function SkinsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { locale } = await params;
  const { sort } = await searchParams;
  const t = getMessages(locale);

  const tri = estCodeTri(sort) ? sort : TRI_DEFAUT;
  const liste = trierSkins(skins, tri);

  return (
    <main className="w-full flex-1 py-6">
      <GalleryToolbar
        t={t}
        nombreDeSkins={liste.length}
        triCourant={tri}
        locale={locale}
      />

      {/* Colonnes de largeur fixe en auto-fill, reprises du site actuel : les
          cartes gardent leurs proportions et c'est leur nombre par ligne qui
          s'adapte, jamais leur taille. */}
      <div className="mx-auto grid w-[min(100%,93rem)] grid-cols-[repeat(auto-fill,13.125rem)] justify-center gap-x-8 gap-y-16 px-4 pt-[4.5rem]">
        {liste.map((skin) => (
          <SkinCard key={skin.id} skin={skin} locale={locale} />
        ))}
      </div>
    </main>
  );
}
