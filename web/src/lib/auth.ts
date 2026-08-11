import "server-only";

import { cookies } from "next/headers";

import { utilisateurDemo } from "@/lib/fixtures/utilisateur";
import type { CurrentUser } from "@/types/api";

/**
 * Authentification simulée.
 *
 * L'API n'existe pas encore, mais sans notion d'utilisateur connecté une
 * moitié du site reste inaccessible : le menu des membres, la cloche de
 * notifications, les likes, l'espace personnel. On simule donc une session
 * pour pouvoir construire ces écrans.
 *
 * GARDE-FOU — À LIRE AVANT DE DÉPLOYER
 * Cette simulation accepte n'importe quel identifiant : c'est une porte
 * ouverte. Elle est donc **désactivée dans un build de production**, sauf si
 * `MOCK_AUTH=1` est explicitement défini. Autrement dit, si ce code partait en
 * production par accident, personne ne pourrait se connecter — ce qui est un
 * échec bruyant, préférable à un trou de sécurité silencieux.
 *
 * Le jour où l'API arrive, seul ce fichier change : le reste du site interroge
 * `utilisateurCourant()` sans savoir d'où vient la réponse.
 */

const COOKIE = "barbofus_session_simulee";

/** La simulation est-elle autorisée dans cet environnement ? */
export function simulationActive(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.MOCK_AUTH === "1";
}

/**
 * L'utilisateur connecté, ou `null`.
 *
 * C'est le point d'entrée unique : composants et pages passent par ici, et ne
 * changeront pas quand l'authentification deviendra réelle.
 */
export async function utilisateurCourant(): Promise<CurrentUser | null> {
  if (!simulationActive()) return null;

  const session = (await cookies()).get(COOKIE);
  if (!session) return null;

  return utilisateurDemo;
}

/** Vrai si quelqu'un est connecté. Raccourci de lecture. */
export async function estConnecte(): Promise<boolean> {
  return (await utilisateurCourant()) !== null;
}

export const COOKIE_SESSION = COOKIE;
