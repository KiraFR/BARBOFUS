import "server-only";

import { chargerHavreSacsDistants, chargerThemesDistants } from "@/lib/api/havre-sacs-distants";
import { havreSacsFixtures, themesFixtures } from "@/lib/fixtures/havre-sacs";
import type { HavenBag, HavenBagTheme } from "@/types/api";

/**
 * D'où viennent les havre-sacs.
 *
 * Même porte d'entrée unique que pour les skins et les écrans : deux sources
 * derrière, et les pages n'ont pas à savoir laquelle a répondu.
 *
 * Pour forcer les fixtures : HAVRE_SACS_SOURCE=fixtures dans l'environnement.
 */

/**
 * Combien de havre-sacs on demande à la production.
 *
 * Bien plus bas que l'échantillon de skins (120), et pour une raison
 * concrète : au-delà des dix premiers, chaque havre-sac coûte une page HTML de
 * 150 Ko faute d'endpoint JSON. Quarante suffisent à éprouver les filtres et le
 * chargement à la volée sans marteler la production.
 */
const TAILLE_ECHANTILLON = 40;

export async function chargerHavreSacs(): Promise<HavenBag[]> {
  if (process.env.HAVRE_SACS_SOURCE === "fixtures") {
    return havreSacsFixtures;
  }

  const distants = await chargerHavreSacsDistants(TAILLE_ECHANTILLON);
  return distants.length > 0 ? distants : havreSacsFixtures;
}

export async function chargerThemes(): Promise<HavenBagTheme[]> {
  if (process.env.HAVRE_SACS_SOURCE === "fixtures") {
    return themesFixtures;
  }

  const distants = await chargerThemesDistants();
  return distants.length > 0 ? distants : themesFixtures;
}
