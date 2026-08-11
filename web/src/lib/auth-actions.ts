"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE_SESSION, simulationActive } from "@/lib/auth";
import { defaultLocale, estLocale, lien } from "@/messages";

/**
 * Ouvrir et fermer la session simulée.
 *
 * Ce sont les seules écritures de session du projet. Quand l'API arrivera,
 * elles appelleront `/api/v1/auth/login` et `/logout` au lieu de poser un
 * cookie local — le reste du site n'a pas à le savoir.
 */

function langueDe(valeur: FormDataEntryValue | null) {
  const brut = typeof valeur === "string" ? valeur : "";
  return estLocale(brut) ? brut : defaultLocale;
}

/**
 * « Connecte » le visiteur. Aucun identifiant n'est vérifié : c'est une
 * simulation, et elle refuse de fonctionner hors développement.
 */
export async function connecter(formData: FormData) {
  const locale = langueDe(formData.get("locale"));

  if (!simulationActive()) {
    redirect(lien(locale, "/login?erreur=simulation-desactivee"));
  }

  (await cookies()).set(COOKIE_SESSION, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Une journée : assez pour travailler, assez court pour ne pas traîner.
    maxAge: 60 * 60 * 24,
  });

  redirect(lien(locale, "/"));
}

/** Ferme la session simulée. */
export async function deconnecter(formData: FormData) {
  const locale = langueDe(formData.get("locale"));
  (await cookies()).delete(COOKIE_SESSION);
  redirect(lien(locale, "/"));
}
