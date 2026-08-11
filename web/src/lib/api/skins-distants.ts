import "server-only";

import type { SkinCardItem, SkinDetail } from "@/types/api";

/**
 * Va chercher de vrais skins sur la production, faute d'API locale.
 *
 * POURQUOI CE FICHIER EXISTE
 * Le site n'expose aucun endpoint de LISTE : `/api/skin/{id}` rend un skin, et
 * la galerie est peinte par Livewire, donc inatteignable en simple GET. Ce
 * module joue donc le rôle de l'endpoint manquant — relever des identifiants,
 * aller chercher chaque skin, rendre une liste normalisée.
 *
 * Ce n'est pas du gaspillage : la forme rendue ici est exactement celle que
 * devra servir le futur `GET /api/v1/unity-skins`. Le jour où il existera,
 * c'est ce fichier qu'on remplacera, et rien d'autre.
 *
 * CE QU'IL FAUT SAVOIR
 * - Tout est en cache une heure côté Next : une page vue ne déclenche pas une
 *   rafale de requêtes vers la production.
 * - Les appels sont menés par petits paquets, pas tous d'un coup.
 * - Si la production ne répond pas, l'appelant reçoit une liste vide et se
 *   rabat sur les fixtures. Le site ne doit jamais dépendre d'un tiers pour
 *   s'afficher.
 */

const PROD = "https://barbofus.com";

/** Une heure : les skins ne bougent pas si vite. */
const DUREE_CACHE = 3600;

/** Nombre d'appels menés de front. Au-delà on martèle la production. */
const PARALLELISME = 8;

/** En-tête de navigateur : la production refuse certains clients. */
const ENTETES = { "User-Agent": "Mozilla/5.0 (compatible; barbofus-refonte/dev)" };

/**
 * Relève les identifiants de skins visibles sur la galerie de production.
 *
 * On lit la page HTML, faute de mieux. Elle en expose quelques dizaines, ce
 * qui suffit à donner le ton ; pour un échantillon plus large, on complète en
 * descendant les identifiants voisins (ils sont attribués séquentiellement).
 */
async function releverIdentifiants(combien: number): Promise<number[]> {
  const reponse = await fetch(`${PROD}/unity-skins`, {
    headers: ENTETES,
    next: { revalidate: DUREE_CACHE },
  });
  if (!reponse.ok) return [];

  const html = await reponse.text();
  const vus = [...new Set([...html.matchAll(/unity-skin\/(\d+)/g)].map((m) => Number(m[1])))];
  if (vus.length === 0) return [];

  // Les identifiants sont séquentiels : on complète en descendant depuis le
  // plus récent, ce qui donne autant de skins qu'on veut sans dépendre de la
  // pagination Livewire, qu'un simple GET ne sait pas piloter.
  const plusRecent = Math.max(...vus);
  const complement: number[] = [];
  for (let id = plusRecent; complement.length + vus.length < combien && id > 0; id -= 1) {
    if (!vus.includes(id)) complement.push(id);
  }

  return [...vus, ...complement].slice(0, combien);
}

/** Une couleur de repli, pour les champs que la production laisse vides. */
const COULEUR_INCONNUE = "292522";

/**
 * La forme rendue par `/api/skin/{id}`, plus les champs qu'il ne rend pas.
 *
 * On comble aussi les trous : la production rend `items: {}` pour certains
 * skins, et des couleurs parfois absentes. Sans ça, un `undefined` traverserait
 * les filtres — qui testent `!== null` — et casserait l'affichage plus loin.
 * C'est le travail d'un adaptateur : que le reste du code n'ait jamais à se
 * demander si un champ existe.
 */
function normaliser(detail: SkinDetail): SkinCardItem {
  const items = detail.items ?? ({} as SkinDetail["items"]);
  const couleurs = detail.colors ?? ({} as SkinDetail["colors"]);

  const emplacements: SkinDetail["items"] = {
    hat: items.hat ?? null,
    cape: items.cape ?? null,
    shield: items.shield ?? null,
    pet: items.pet ?? null,
    costume: items.costume ?? null,
    wings: items.wings ?? null,
    shoulderPads: items.shoulderPads ?? null,
    mount: items.mount ?? null,
  };

  const palette: SkinDetail["colors"] = {
    skin: couleurs.skin ?? COULEUR_INCONNUE,
    hair: couleurs.hair ?? COULEUR_INCONNUE,
    cloth_1: couleurs.cloth_1 ?? COULEUR_INCONNUE,
    cloth_2: couleurs.cloth_2 ?? COULEUR_INCONNUE,
    cloth_3: couleurs.cloth_3 ?? COULEUR_INCONNUE,
    cloth_4: couleurs.cloth_4 ?? COULEUR_INCONNUE,
  };

  return {
    ...detail,
    breed: detail.breed ?? null,
    items: emplacements,
    colors: palette,
    // Ces cinq champs manquent à `/api/skin/{id}`. Ils prennent ici des
    // valeurs neutres — c'est visible et honnête, plutôt que des chiffres
    // inventés qui ressembleraient à des vraies statistiques.
    total_views: 0,
    likes_count: 0,
    liked_by_me: false,
    favorited_by_me: false,
    status: "Posted",
    colors_guild: { guild_1: palette.cloth_1, guild_2: palette.cloth_2 },
  };
}

/** Vrai si la réponse ressemble à un skin exploitable. */
function estExploitable(valeur: unknown): valeur is SkinDetail {
  if (typeof valeur !== "object" || valeur === null) return false;
  const skin = valeur as Partial<SkinDetail>;
  // La production rend parfois un objet quasi vide pour un skin supprimé —
  // observé sur le skin 94816. On l'écarte plutôt que de peindre une carte
  // sans image ni auteur.
  return typeof skin.id === "number" && typeof skin.image_path === "string" && !!skin.user;
}

/**
 * Charge des skins depuis la production.
 *
 * Renvoie une liste vide en cas d'échec : à l'appelant de se rabattre sur les
 * fixtures.
 */
export async function chargerSkinsDistants(combien: number): Promise<SkinCardItem[]> {
  try {
    const identifiants = await releverIdentifiants(combien);
    const skins: SkinCardItem[] = [];

    for (let debut = 0; debut < identifiants.length; debut += PARALLELISME) {
      const paquet = identifiants.slice(debut, debut + PARALLELISME);

      const reponses = await Promise.all(
        paquet.map(async (id) => {
          try {
            const reponse = await fetch(`${PROD}/api/skin/${id}`, {
              headers: ENTETES,
              next: { revalidate: DUREE_CACHE },
            });
            if (!reponse.ok) return null;
            return (await reponse.json()) as unknown;
          } catch {
            return null;
          }
        }),
      );

      for (const reponse of reponses) {
        if (estExploitable(reponse)) skins.push(normaliser(reponse));
      }
    }

    return skins;
  } catch {
    return [];
  }
}
