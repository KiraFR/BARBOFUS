import "server-only";

import { chargerPlanningDistant, chargerRecompensesDistantes } from "@/lib/api/ecrans-distants";
import { planningFixture } from "@/lib/fixtures/planning";
import { recompensesFixtures } from "@/lib/fixtures/recompenses";
import type { Planning, Recompense } from "@/types/ecrans";

/**
 * D'où viennent le planning et les récompenses.
 *
 * Même principe que `skins-source.ts` : une seule porte d'entrée, deux
 * sources derrière, et les pages n'ont pas à savoir laquelle a répondu.
 *
 *   - « proxy » (par défaut) : les vraies données de production ;
 *   - « fixtures » : la copie figée du dépôt, sans accès réseau.
 *
 * Pour forcer les fixtures : ECRANS_SOURCE=fixtures dans l'environnement.
 *
 * Le repli est automatique. Un planning périmé reste un planning ; une page en
 * erreur n'est rien.
 */

export async function chargerPlanning(): Promise<Planning> {
  if (process.env.ECRANS_SOURCE === "fixtures") {
    return planningFixture;
  }

  return (await chargerPlanningDistant()) ?? planningFixture;
}

export async function chargerRecompenses(): Promise<Recompense[]> {
  if (process.env.ECRANS_SOURCE === "fixtures") {
    return recompensesFixtures;
  }

  return (await chargerRecompensesDistantes()) ?? recompensesFixtures;
}
