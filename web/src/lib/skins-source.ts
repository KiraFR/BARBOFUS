import "server-only";

import { chargerSkinsDistants } from "@/lib/api/skins-distants";
import { skins as skinsFixtures } from "@/lib/fixtures/skins";
import type { SkinCardItem } from "@/types/api";

/**
 * D'où viennent les skins affichés.
 *
 * Deux sources, une seule porte d'entrée. Les pages appellent `chargerSkins()`
 * sans savoir laquelle répond — et ne changeront pas le jour où ce sera la
 * vraie API.
 *
 *   - « proxy » (par défaut) : de vrais skins tirés de la production. C'est ce
 *     qui permet d'éprouver la galerie sur du volume plutôt que sur treize
 *     entrées.
 *   - « fixtures » : les treize skins du dépôt. Aucun accès réseau, donc
 *     utile hors ligne, en test, ou pour un rendu reproductible.
 *
 * Pour forcer les fixtures : SKINS_SOURCE=fixtures dans l'environnement.
 *
 * Le repli est automatique : si la production ne répond pas, on sert les
 * fixtures. Le site ne doit jamais dépendre d'un tiers pour s'afficher — un
 * principe qui vaudra encore quand le tiers sera notre propre API.
 */

/** Combien de skins on demande à la production. */
const TAILLE_ECHANTILLON = 120;

export async function chargerSkins(): Promise<SkinCardItem[]> {
  if (process.env.SKINS_SOURCE === "fixtures") {
    return skinsFixtures;
  }

  const distants = await chargerSkinsDistants(TAILLE_ECHANTILLON);
  return distants.length > 0 ? distants : skinsFixtures;
}
