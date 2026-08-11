/**
 * Contrat de données des deux écrans plein cadre : planning et récompenses.
 *
 * Ces données-là ne viennent PAS de la base : côté Laravel elles vivent dans
 * deux fichiers JSON du stockage, `json/planning.json` et `json/rewards.json`,
 * lus et réécrits par `PlanningController` et `RewardsController`. Elles n'ont
 * donc rien à faire dans `types/api.ts`, qui décrit les tables.
 *
 * Comme partout ailleurs, ces types sont le contrat : le jour où ces données
 * passeront par une vraie API, c'est cette forme-là qu'elle devra servir.
 *
 * ATTENTION AUX MAJUSCULES. Le JSON du planning mélange deux conventions,
 * héritage d'une refonte à moitié faite : les jours portent `name` en
 * minuscule, les activités portent `Name`, `StartTime`, `EndTime` et `Image` en
 * capitale — mais pas `visible`. Le composant Alpine du site actuel accepte les
 * deux (`activity.name ?? activity.Name`). On décrit ici la forme réellement
 * stockée, et c'est l'adaptateur qui normalise, une fois, à l'entrée.
 */

/** Une activité du planning, telle qu'elle est stockée. */
export interface ActiviteStockee {
  Name?: string;
  name?: string;
  StartTime?: string;
  startTime?: string;
  EndTime?: string;
  endTime?: string;
  Image?: string;
  image?: string;
  /** Absent vaut « visible ». Seul `false` masque. */
  visible?: boolean;
}

/** Un jour du planning, tel qu'il est stocké. */
export interface JourStocke {
  name?: string;
  activities?: ActiviteStockee[];
}

/**
 * Une activité, une fois normalisée : plus aucun champ optionnel, plus aucune
 * question à se poser sur la casse ailleurs dans le code.
 */
export interface Activite {
  nom: string;
  /** Heure de début, au format `HH:MM`. */
  debut: string;
  /** Heure de fin, au format `HH:MM`. */
  fin: string;
  /** URL absolue de l'image, ou chaîne vide si l'activité n'en a pas. */
  image: string;
  visible: boolean;
}

/** Un jour du planning, normalisé. */
export interface Jour {
  /** Le libellé court affiché en tête de colonne : LUN, MAR, ... */
  nom: string;
  activites: Activite[];
}

/**
 * Le planning complet d'une semaine.
 *
 * `semaine` et `annee` sont des numéros ISO — c'est ce que Carbon écrit dans le
 * JSON (`isoWeek` / `isoWeekYear`), donc c'est bien en ISO qu'il faut les
 * relire.
 */
export interface Planning {
  jours: Jour[];
  semaine: number;
  annee: number;
}

/**
 * Une récompense de la boutique du concours Miss'Skin.
 *
 * C'est une image, et rien d'autre : le JSON de production ne contient que
 * `{"image": "..."}`. Pas de nom, pas de description, pas d'identifiant — c'est
 * d'ailleurs l'URL de l'image qui sert de clé lorsqu'un membre en choisit une
 * (`users.selected_reward_image`).
 */
export interface Recompense {
  /** URL absolue de l'image. */
  image: string;
}
