import type { CurrentUser } from "@/types/api";

/**
 * L'utilisateur de démonstration, servi par l'authentification simulée.
 *
 * Le nom et l'identifiant sont ceux d'un vrai compte de la galerie, pour que
 * ses skins correspondent à ceux des fixtures — sans quoi l'espace personnel
 * afficherait une liste vide. L'adresse e-mail, elle, est fictive : aucune
 * donnée personnelle réelle ne doit se retrouver dans le dépôt.
 */
/**
 * Les skins mis en favori par l'utilisateur de démonstration.
 *
 * L'API ne rend ni les favoris ni les likes : cette liste est arbitraire, elle
 * sert à peupler l'onglet « Mes favoris ». Elle disparaîtra quand l'endpoint de
 * galerie renverra `favorited_by_me`.
 */
export const favorisDemo = [94882, 94875, 94870, 94868];

export const utilisateurDemo: CurrentUser = {
  id: 533,
  name: "CrioZola",
  email: "compte.demo@exemple.invalid",
  email_verified_at: "2026-01-15T09:00:00Z",
  locale: "fr",
  roles: [],
  created_at: "2023-04-02T18:31:00Z",
};
