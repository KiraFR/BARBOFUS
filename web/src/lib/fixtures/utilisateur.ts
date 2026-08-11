import type { CurrentUser } from "@/types/api";

/**
 * L'utilisateur de démonstration, servi par l'authentification simulée.
 *
 * Le nom et l'identifiant sont ceux d'un vrai compte de la galerie, pour que
 * ses skins correspondent à ceux des fixtures — sans quoi l'espace personnel
 * afficherait une liste vide. L'adresse e-mail, elle, est fictive : aucune
 * donnée personnelle réelle ne doit se retrouver dans le dépôt.
 */
export const utilisateurDemo: CurrentUser = {
  id: 533,
  name: "CrioZola",
  email: "compte.demo@exemple.invalid",
  email_verified_at: "2026-01-15T09:00:00Z",
  locale: "fr",
  roles: [],
  created_at: "2023-04-02T18:31:00Z",
};
