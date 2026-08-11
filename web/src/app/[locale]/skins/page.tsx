import type { Metadata } from "next";

import { GalleryToolbar } from "@/components/skins/gallery-toolbar";
import { SkinCard } from "@/components/skins/skin-card";
import { SkinFilters } from "@/components/skins/skin-filters";
import { estConnecte } from "@/lib/auth";
import { filtrerSkins, lireFiltres } from "@/lib/filtres";
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
 * Les filtres et le tri sont lus dans l'URL, ce qui rend la page dynamique —
 * c'est assumé : une galerie filtrée ne peut pas être figée à la compilation,
 * et le rendu serveur suffit largement au référencement. En contrepartie, une
 * galerie filtrée devient partageable, ce que le site actuel ne permet pas.
 *
 * Reste à venir : le chargement à la volée, et la colonne de droite avec le
 * classement Miss'Skin.
 */
export default async function SkinsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const requete = await searchParams;
  const t = getMessages(locale);
  const connecte = await estConnecte();

  const sortDemande = typeof requete.sort === "string" ? requete.sort : undefined;
  const tri = estCodeTri(sortDemande) ? sortDemande : TRI_DEFAUT;
  const filtres = lireFiltres(requete);

  const liste = trierSkins(filtrerSkins(skins, filtres), tri);

  return (
    <div className="flex w-full flex-1 flex-col min-[1501px]:flex-row">
      <SkinFilters t={t} filtres={filtres} />

      <main className="w-full flex-1 py-6">
        <GalleryToolbar t={t} nombreDeSkins={liste.length} triCourant={tri} locale={locale} />

        {liste.length === 0 ? (
          <p className="text-inactive mt-24 text-center italic">{t.filterNoResult}</p>
        ) : (
          /* Colonnes de largeur fixe en auto-fill, reprises du site actuel :
             les cartes gardent leurs proportions et c'est leur nombre par
             ligne qui s'adapte, jamais leur taille. */
          <div className="mx-auto grid w-[min(100%,93rem)] grid-cols-[repeat(auto-fill,13.125rem)] justify-center gap-x-8 gap-y-16 px-4 pt-[4.5rem]">
            {liste.map((skin) => (
              <SkinCard key={skin.id} skin={skin} locale={locale} connecte={connecte} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
