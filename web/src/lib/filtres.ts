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

/**
 * Les types d'items montrables, sur `category`.
 *
 * « Montilier » désigne un familier chevauchable. L'API ne l'expose pas comme
 * une catégorie distincte : la case est donc là et fonctionne, mais aucun item
 * ne porte encore cette catégorie, donc la décocher ne retire rien. À relier
 * quand l'endpoint distinguera les deux.
 */
export const TYPES = [
  { valeur: "pet", cle: "filterTypePet" },
  { valeur: "mountable", cle: "filterTypeMountable" },
  { valeur: "mount", cle: "filterTypeMount" },
] as const;

/**
 * Le compte de Barbe Douce, pour le filtre « voir uniquement ses skins ».
 *
 * Reconnu par son PSEUDO et non par un identifiant : c'est ce que fait le site
 * actuel, qui compare littéralement `users.name` à cette chaîne
 * (InfiniteUnitySkinIndex.php, ligne 169). Ni configuration, ni variable
 * d'environnement là-bas — on reproduit à l'identique.
 */
export const PSEUDO_BARBE_DOUCE = "Barbe Douce";

export const GENRES = [
  { valeur: 0, cle: "filterGenderMale" },
  { valeur: 1, cle: "filterGenderFemale" },
] as const;

export interface Filtres {
  /** Recherche libre : nom de skin, pseudo d'auteur, ou nom d'item. */
  q: string;
  /** N'afficher que les skins vainqueurs du concours Miss'Skin. */
  missSkin: boolean;
  /** N'afficher que les skins publiés par Barbe Douce. */
  barbeDouce: boolean;
  /** Noms de classes retenues. Vide = toutes. */
  classes: string[];
  natures: string[];
  types: string[];
  genres: Gender[];
  /** Hexadécimal sans croisillon, en minuscules ; `null` si aucun filtre couleur. */
  couleur: string | null;
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

  // Même nom de paramètre que le site actuel (`color`), pour que les liens
  // déjà partagés continuent de fonctionner. On ne garde la valeur que si
  // c'est bien un hexadécimal à six chiffres, sans croisillon, en minuscules.
  const couleurBrute = typeof params.color === "string" ? params.color.toLowerCase() : "";
  const couleur = /^[0-9a-f]{6}$/.test(couleurBrute) ? couleurBrute : null;

  return {
    q: typeof params.q === "string" ? params.q : "",
    missSkin: params.missskin === "1",
    barbeDouce: params.barbedouce === "1",
    classes: liste(params.classe),
    natures: groupe(params.nature, NATURES_TOUTES),
    types: groupe(params.type, TYPES_TOUS),
    genres: params.genre === undefined ? [...GENRES_TOUS] : genres,
    couleur,
  };
}

/** Supprime accents et casse, pour que « Crâ » se trouve en tapant « cra ». */
function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/**
 * Tolérance de rapprochement des teintes, en degrés sur le cercle
 * chromatique (0-360°). Le site actuel précalcule en base la teinte de
 * chaque couleur de tenue et filtre dessus plutôt que de comparer les
 * couleurs à l'identique — personne ne retrouverait un skin en cherchant un
 * hexadécimal exact. On fait pareil ici, à la volée. ±20° est assez large
 * pour retrouver un skin sans connaître sa nuance précise, et assez étroit
 * pour ne pas mélanger deux familles de couleurs voisines (rouge/orange,
 * bleu/violet...).
 */
const TOLERANCE_TEINTE = 20;

/**
 * Convertit un hexadécimal (sans croisillon) en teinte, en degrés [0, 360).
 *
 * Renvoie `null` pour une couleur sans teinte significative — gris, blanc ou
 * noir, où la saturation est nulle (r = g = b). La teinte y est
 * mathématiquement indéfinie ; plutôt que de laisser le calcul retomber
 * silencieusement sur 0° (rouge), le cas est explicite et ces couleurs
 * n'entrent jamais en correspondance avec un filtre de teinte — exactement
 * ce que ferait une comparaison `BETWEEN` en base sur une colonne de teinte
 * nulle.
 */
function teinte(hexSansCroisillon: string): number | null {
  const hex = hexSansCroisillon.toLowerCase();
  if (!/^[0-9a-f]{6}$/.test(hex)) return null;

  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return null; // Gris, blanc ou noir : pas de teinte.

  let h: number;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h *= 60;
  return h < 0 ? h + 360 : h;
}

/** Écart entre deux teintes sur le cercle chromatique, entre 0° et 180°. */
function ecartTeinte(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
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

    if (filtres.missSkin && skin.status !== "MissSkin") {
      return false;
    }

    if (filtres.barbeDouce && skin.user.name !== PSEUDO_BARBE_DOUCE) {
      return false;
    }

    // Comparaison normalisée : le sélecteur affiche « Féca » quand l'API rend
    // « Feca », et les deux doivent se reconnaître.
    if (
      filtres.classes.length > 0 &&
      !filtres.classes.some((c) => normaliser(c) === normaliser(skin.breed?.name ?? ""))
    ) {
      return false;
    }

    if (skin.gender !== null && !filtres.genres.includes(skin.gender)) {
      return false;
    }

    // Couleur : on retient le skin si l'une de ses quatre couleurs de tenue a
    // une teinte proche de celle demandée. Une teinte cible indéfinie (gris,
    // blanc, noir) ne peut correspondre à rien — voir le commentaire de
    // `teinte` — donc un tel choix vide la galerie plutôt que de l'ignorer.
    if (filtres.couleur) {
      const cible = teinte(filtres.couleur);
      const teintesTenue = [
        skin.colors.cloth_1,
        skin.colors.cloth_2,
        skin.colors.cloth_3,
        skin.colors.cloth_4,
      ].map(teinte);

      const correspond =
        cible !== null &&
        teintesTenue.some((t) => t !== null && ecartTeinte(t, cible) <= TOLERANCE_TEINTE);

      if (!correspond) return false;
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
        (item) =>
          TYPES_TOUS.includes(item.category as never) && !filtres.types.includes(item.category),
      )
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Les dix-neuf classes du jeu, dans l'ordre de leur identifiant Dofus — le
 * même que celui du sélecteur du site actuel.
 *
 * La liste est écrite en dur plutôt que déduite des skins affichés : sinon le
 * sélecteur ne proposerait que les classes présentes dans la page, ce qui est
 * absurde pour un filtre. Elle bougera le jour où Ankama ajoutera une classe,
 * ce qui arrive environ une fois tous les deux ans.
 */
export const CLASSES = [
  "Féca",
  "Osamodas",
  "Enutrof",
  "Sram",
  "Xélor",
  "Ecaflip",
  "Eniripsa",
  "Iop",
  "Crâ",
  "Sadida",
  "Sacrieur",
  "Pandawa",
  "Roublard",
  "Zobal",
  "Steamer",
  "Eliotrope",
  "Huppermage",
  "Ouginak",
  "Forgelance",
] as const;
