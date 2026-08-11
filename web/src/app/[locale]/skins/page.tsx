import type { Metadata } from "next";

import { GalleryToolbar } from "@/components/skins/gallery-toolbar";
import { InfiniteGrid } from "@/components/skins/infinite-grid";
import { MissSkinPodium } from "@/components/skins/miss-skin-podium";
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

        {/* Jusqu'à 1800 px, le podium s'intercale entre la barre et la grille ;
            au-delà il devient la colonne de droite, plus bas. Il est rendu à
            deux endroits et masqué en CSS — la copie cachée ne charge aucune
            image, `display: none` suspendant le chargement différé. */}
        <MissSkinPodium locale={locale} className="mt-10 min-[1801px]:hidden" />

        {liste.length === 0 ? (
          <p className="text-inactive mt-24 text-center italic">{t.filterNoResult}</p>
        ) : (
          /* La clé change dès qu'un filtre ou le tri bouge : la grille est
             remontée à neuf et repart de la première tranche. */
          <InfiniteGrid
            key={JSON.stringify(requete)}
            skins={liste}
            locale={locale}
            connecte={connecte}
          />
        )}
      </main>

      <MissSkinPodium
        locale={locale}
        className="border-ivory hidden shrink-0 border-l-2 px-6 py-10 min-[1801px]:block min-[1801px]:w-[25rem]"
      />
    </div>
  );
}
