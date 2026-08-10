/**
 * Contrat de données BARBOFUS.
 *
 * Ces types sont calqués sur les modèles Eloquent et les migrations de la
 * branche `develop` (site Laravel en production). Ils décrivent la forme des
 * données telles qu'elles existent en base, pas encore une réponse d'API :
 * il n'y a pas de couche `App\Http\Resources` côté Laravel aujourd'hui.
 *
 * C'est volontaire, et c'est la méthode : le front est construit d'abord,
 * contre ces types. Quand viendra le moment de brancher l'API, ce fichier
 * sera le contrat à respecter — côté Laravel d'abord, puis côté API
 * TypeScript si elle voit le jour.
 *
 * Règle : ce fichier ne contient QUE des types. Aucune donnée, aucune logique.
 * Les jeux de données de démonstration vivent dans `src/lib/fixtures/`.
 */

/** Statut de modération d'un skin. Enum MySQL sur `unity_skins.status`. */
export type SkinStatus = "Posted" | "Refused" | "Pending" | "MissSkin";

/**
 * Genre du personnage.
 * Stocké en `tinyint` depuis la migration 2025_04_30 : 0 = Homme, 1 = Femme.
 * Nullable en base — d'anciennes lignes n'ont pas été converties.
 */
export type Gender = 0 | 1;

/** Couleur au format hexadécimal, telle que stockée (`#rrggbb`). */
export type HexColor = string;

/**
 * Décomposition TSL d'une couleur de tenue, précalculée et indexée en base
 * (migration 2026_03_25) pour que le filtre par couleur soit une clause SQL
 * plutôt qu'un post-filtrage en mémoire.
 */
export interface ColorHsl {
  hue: number | null;
  saturation: number | null;
  lightness: number | null;
}

/**
 * Une classe de personnage Dofus (Iop, Cra, ...).
 * Table `races`. `colors`, `heads` et `bodies` sont des colonnes JSON dont la
 * forme exacte reste à établir — laissées en `unknown` tant qu'on ne s'en sert
 * pas, plutôt que devinées.
 */
export interface Race {
  id: number;
  dofus_id: number;
  name: string;
  ghost_icon_path: string;
  colored_icon_path: string;
  colors: unknown | null;
  heads: unknown | null;
  bodies: unknown | null;
}

/** Nom de classe traduit. Table `localized_races`. */
export interface LocalizedRace {
  id: number;
  race_id: number;
  locale: string;
  name: string;
}

/**
 * Un skin de l'éditeur Unity — le contenu principal du site.
 * Table `unity_skins`.
 *
 * Les huit `*_id` sont les emplacements d'équipement. `hat_id`, `cape_id`,
 * `shield_id`, `costume_id`, `wings_id` et `shoulderpads_id` pointent vers les
 * anciennes tables `dofus_item_*` ; `weapon_id` et `mount_id` pointent vers
 * `items.dofus_id` (migrations 2025_04_30 et 2026_07_17). Cette dualité est un
 * héritage : à unifier le jour où l'API sera écrite, pas avant.
 */
export interface UnitySkin {
  id: number;
  name: string | null;
  image_path: string;

  user_id: number;
  race_id: number | null;

  face: number;
  body: number;
  gender: Gender | null;

  hat_id: number | null;
  cape_id: number | null;
  shield_id: number | null;
  weapon_id: number | null;
  pet_id: number | null;
  mount_id: number | null;
  costume_id: number | null;
  wings_id: number | null;
  shoulderpads_id: number | null;

  color_skin: HexColor;
  color_hair: HexColor;
  color_cloth_1: HexColor;
  color_cloth_2: HexColor;
  color_cloth_3: HexColor;
  color_cloth_4: HexColor;
  color_guild_1: HexColor;
  color_guild_2: HexColor;

  status: SkinStatus;
  refused_reason: string | null;

  /** Vues en galerie. */
  chunk_views: number;
  /** Vues sur la fiche détaillée. */
  detailed_views: number;
  /** Colonne calculée : `chunk_views + detailed_views`. Lecture seule. */
  total_views: number;

  created_at: string | null;
  updated_at: string | null;
}

/**
 * Un skin tel que le front en a besoin pour l'afficher : les relations sont
 * résolues et les compteurs agrégés. C'est cette forme-là que l'API devra
 * servir — la table brute ne suffit pas pour peindre une carte de galerie.
 */
export interface UnitySkinView extends UnitySkin {
  race: Race | null;
  author: PublicUser;
  likes_count: number;
  /** `null` quand le visiteur n'est pas connecté. */
  liked_by_me: boolean | null;
  favorited_by_me: boolean | null;
}

/**
 * Un utilisateur tel qu'il peut être montré publiquement (auteur d'un skin).
 * Ne jamais y faire figurer l'e-mail ni quoi que ce soit d'authentification.
 */
export interface PublicUser {
  id: number;
  name: string;
}

/** L'utilisateur connecté, vu par lui-même. Table `users`. */
export interface CurrentUser extends PublicUser {
  email: string;
  email_verified_at: string | null;
  locale: string;
  roles: Role[];
  created_at: string | null;
}

/** Table `roles` (pivot `role_user`). */
export interface Role {
  id: number;
  name: string;
}

/**
 * Pagination par curseur. Le site dépasse les 60 000 skins : la pagination par
 * numéro de page (OFFSET) s'effondre sur ces volumes, elle est proscrite.
 */
export interface CursorPage<T> {
  data: T[];
  next_cursor: string | null;
  prev_cursor: string | null;
}

/** Critères de filtrage de la galerie. Doivent rester alignés sur l'URL. */
export interface SkinFilters {
  race_ids: number[];
  gender: Gender | null;
  /** Teinte recherchée, en degrés (0-359), comparée aux colonnes TSL. */
  hue: number | null;
  search: string | null;
  sort: SkinSort;
}

export type SkinSort = "recent" | "popular" | "views" | "random";
