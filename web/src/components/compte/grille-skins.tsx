import { SkinCard } from "@/components/skins/skin-card";
import type { Locale } from "@/messages";
import type { SkinCardItem } from "@/types/api";

/**
 * Une grille de skins pour l'espace membre, partagée par « Mes skins » et
 * « Mes favoris ».
 *
 * Mêmes colonnes que la galerie — les cartes gardent leurs proportions et
 * c'est leur nombre par ligne qui s'adapte — mais sans les filtres ni le tri,
 * qui n'ont pas de sens sur une liste courte.
 */
export function GrilleSkins({
  skins,
  locale,
  messageVide,
}: {
  skins: SkinCardItem[];
  locale: Locale;
  messageVide: string;
}) {
  if (skins.length === 0) {
    return <p className="text-inactive mt-16 text-center italic">{messageVide}</p>;
  }

  return (
    <div className="mx-auto grid grid-cols-[repeat(auto-fill,13.125rem)] justify-center gap-x-8 gap-y-16">
      {skins.map((skin) => (
        <SkinCard key={skin.id} skin={skin} locale={locale} />
      ))}
    </div>
  );
}
