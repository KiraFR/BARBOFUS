import type { Messages } from "@/messages";
import type { SkinCardItem } from "@/types/api";

/**
 * Les six tris de la galerie.
 *
 * Les codes (`0,DESC`, `4,DESC`…) sont ceux du site actuel, qui les écrit tels
 * quels dans l'URL sous le paramètre `sort`. On les reprend à l'identique pour
 * que les liens déjà partagés continuent de fonctionner après la bascule.
 */
export const TRIS = [
  { code: "0,DESC", cle: "sortNewest" },
  { code: "0,ASC", cle: "sortOldest" },
  { code: "1,DESC", cle: "sortFavorites" },
  { code: "2,DESC", cle: "sortRewards" },
  { code: "3,ASC", cle: "sortBreeds" },
  { code: "4,DESC", cle: "sortMostViewed" },
] as const satisfies ReadonlyArray<{ code: string; cle: keyof Messages }>;

export type CodeTri = (typeof TRIS)[number]["code"];

export const TRI_DEFAUT: CodeTri = "0,DESC";

/** Vrai si la valeur lue dans l'URL est un tri connu. */
export function estCodeTri(valeur: string | undefined): valeur is CodeTri {
  return TRIS.some((tri) => tri.code === valeur);
}

/**
 * Le tri « ascendant » commande la flèche de l'icône : elle pivote selon le
 * sens, comme sur le site actuel.
 */
export function estAscendant(code: CodeTri): boolean {
  return code.endsWith("ASC");
}

/**
 * Trie une liste de skins.
 *
 * Deux tris ne sont pas applicables pour l'instant : « Favoris » demande le
 * nombre de likes et « Récompenses » les récompenses, que `/api/skin/{id}` ne
 * rend pas. Ils restent proposés — le menu doit rester celui du site — mais
 * conservent l'ordre par défaut tant que l'API ne fournit pas ces données.
 */
export function trierSkins(skins: SkinCardItem[], code: CodeTri): SkinCardItem[] {
  const copie = [...skins];
  const parDate = (a: SkinCardItem, b: SkinCardItem) => a.created_at.localeCompare(b.created_at);

  switch (code) {
    case "0,DESC":
      return copie.sort((a, b) => parDate(b, a));
    case "0,ASC":
      return copie.sort(parDate);
    case "3,ASC":
      return copie.sort((a, b) => (a.breed?.name ?? "").localeCompare(b.breed?.name ?? "", "fr"));
    case "4,DESC":
      return copie.sort((a, b) => b.total_views - a.total_views);
    default:
      // Favoris et Récompenses : données absentes de l'API actuelle.
      return copie;
  }
}
