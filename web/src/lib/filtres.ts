import type { Gender, SkinCardItem } from "@/types/api";

/**
 * Les filtres de la galerie, et leur traduction en paramètres d'URL.
 *
 * Le site actuel ne met que `search`, `classe` et `color` dans l'URL : les
 * cases à cocher vivent uniquement dans l'état Livewire, donc une galerie
 * filtrée n'est pas partageable et le rendu serveur ne peut pas la reproduire.
 * Ici tout passe par l'URL — c'est nécessaire pour que la page se rende côté
 * serveur, et accessoirement ça rend enfin les liens partageables.
 *
 * Pour garder les URL courtes, un paramètre n'est écrit que lorsqu'il s'écarte
 * de la valeur par défaut. Une galerie sans filtre a donc une URL nue.
 */

/** Les trois natures d'items, sur `subcategory`. */
export const NATURES = [
  { valeur: "ceremonial", cle: "filterItemCeremonial" },
  { valeur: "livingObject", cle: "filterItemLiving" },
  { valeur: "mimisymbic", cle: "filterItemMimibiotable" },
] as const;

/** Les types d'items montrables, sur `category`. */
export const TYPES = [
  { valeur: "pet", cle: "filterTypePet" },
  { valeur: "mount", cle: "filterTypeMount" },
] as const;

export const GENRES = [
  { valeur: 0, cle: "filterGenderMale" },
  { valeur: 1, cle: "filterGenderFemale" },
] as const;

export interface Filtres {
  /** Recherche libre : nom de skin, pseudo d'auteur, ou nom d'item. */
  q: string;
  /** Noms de classes retenues. Vide = toutes. */
  classes: string[];
  natures: string[];
  types: string[];
  genres: Gender[];
}

const NATURES_TOUTES = NATURES.map((n) => n.valeur);
const TYPES_TOUS = TYPES.map((t) => t.valeur);
const GENRES_TOUS: Gender[] = [0, 1];

/** Lit les filtres depuis les paramètres d'URL de la page. */
export function lireFiltres(params: Record<string, string | string[] | undefined>): Filtres {
  const liste = (valeur: string | string[] | undefined): string[] =>
    valeur === undefined ? [] : Array.isArray(valeur) ? valeur : [valeur];

  // Absent de l'URL = tout est coché, comme à l'ouverture de la page. Présent
  // avec la valeur sentinelle « aucun » = tout est décoché, ce qui est un état
  // légitime et doit donner une galerie vide — d'où la distinction entre
  // « paramètre absent » et « paramètre vide ».
  const groupe = (valeur: string | string[] | undefined, defaut: readonly string[]): string[] => {
    if (valeur === undefined) return [...defaut];
    return liste(valeur).filter((v) => v !== "aucun");
  };

  const genres = groupe(params.genre, ["0", "1"])
    .map(Number)
    .filter((g): g is Gender => g === 0 || g === 1);

  return {
    q: typeof params.q === "string" ? params.q : "",
    classes: liste(params.classe),
    natures: groupe(params.nature, NATURES_TOUTES),
    types: groupe(params.type, TYPES_TOUS),
    genres: params.genre === undefined ? [...GENRES_TOUS] : genres,
  };
}

/** Supprime accents et casse, pour que « Crâ » se trouve en tapant « cra ». */
function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function filtrerSkins(skins: SkinCardItem[], filtres: Filtres): SkinCardItem[] {
  const recherche = normaliser(filtres.q.trim());

  return skins.filter((skin) => {
    const items = Object.values(skin.items).filter((item) => item !== null);

    if (recherche) {
      const cible = normaliser(
        [skin.name ?? "", skin.user.name, ...items.map((i) => i.name)].join(" "),
      );
      if (!cible.includes(recherche)) return false;
    }

    if (filtres.classes.length > 0 && !filtres.classes.includes(skin.breed.name ?? "")) {
      return false;
    }

    if (skin.gender !== null && !filtres.genres.includes(skin.gender)) {
      return false;
    }

    // « Les items peuvent être : » — un skin portant un item d'une nature
    // décochée sort de la liste.
    if (items.some((item) => !filtres.natures.includes(item.subcategory))) {
      return false;
    }

    // « Voir uniquement les : » — même principe, mais seuls les familiers et
    // les montures sont concernés ; les autres emplacements passent toujours.
    if (
      items.some(
        (item) => TYPES_TOUS.includes(item.category as never) && !filtres.types.includes(item.category),
      )
    ) {
      return false;
    }

    return true;
  });
}

/** Les classes présentes dans le jeu de données, pour peupler le sélecteur. */
export function classesDisponibles(skins: SkinCardItem[]): string[] {
  const noms = new Set<string>();
  for (const skin of skins) {
    if (skin.breed.name) noms.add(skin.breed.name);
  }
  return [...noms].sort((a, b) => a.localeCompare(b, "fr"));
}
