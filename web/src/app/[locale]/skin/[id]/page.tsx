import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkinDetail } from "@/components/skins/skin-detail";
import { storageUrl } from "@/lib/assets";
import { skins } from "@/lib/fixtures/skins";
import { alternatesPour } from "@/lib/seo";
import { getMessages, type Locale } from "@/messages";
import type { SkinCardItem } from "@/types/api";

/** Retrouve un skin par son identifiant. `undefined` si l'URL est fausse. */
function trouverSkin(id: string): SkinCardItem | undefined {
  const identifiant = Number(id);
  if (!Number.isInteger(identifiant)) return undefined;
  return skins.find((skin) => skin.id === identifiant);
}

/** Un titre lisible même quand le skin est publié sans nom (cas fréquent). */
function titreDuSkin(skin: SkinCardItem): string {
  if (skin.name) return skin.name;
  return skin.breed.name ? `Skin Dofus ${skin.breed.name}` : "Skin Dofus";
}

/**
 * `params` est une promesse en Next 16 — d'où l'`await` avant de s'en servir.
 * Le type est écrit à la main plutôt que via `PageProps<"...">` : ce type
 * généré casse dès que le cache de `.next` est périmé.
 */
type ParametresPage = { params: Promise<{ locale: Locale; id: string }> };

/**
 * Métadonnées de la fiche : titre, description, et Open Graph pour l'aperçu
 * de lien (Discord notamment — c'est là que ce site se partage le plus).
 * `alternatesPour` fournit les balises hreflang, comme sur les autres pages
 * indexables.
 */
export async function generateMetadata({ params }: ParametresPage): Promise<Metadata> {
  const { locale, id } = await params;
  const skin = trouverSkin(id);
  if (!skin) return {};

  const titre = titreDuSkin(skin);
  const description = skin.breed.name
    ? `Skin Dofus ${skin.breed.name} par ${skin.user.name}, ${skin.total_views.toLocaleString(locale)} vues sur Barbofus.`
    : `Skin Dofus par ${skin.user.name}, ${skin.total_views.toLocaleString(locale)} vues sur Barbofus.`;
  const image = storageUrl(skin.image_path);

  return {
    title: titre,
    description,
    ...alternatesPour(`/skin/${id}`),
    openGraph: {
      title: titre,
      description,
      images: [{ url: image }],
      locale,
      type: "website",
    },
  };
}

/**
 * La fiche d'un skin — la page vers laquelle pointe chaque carte de la
 * galerie. Un identifiant inconnu donne un vrai 404 (`notFound()`), pas une
 * page vide : c'est le comportement juste pour une ressource qui n'existe
 * pas, y compris pour le référencement.
 */
export default async function SkinPage({ params }: ParametresPage) {
  const { locale, id } = await params;
  const skin = trouverSkin(id);
  if (!skin) notFound();

  const t = getMessages(locale);

  return <SkinDetail skin={skin} locale={locale} t={t} />;
}
