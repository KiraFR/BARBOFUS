"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { Recompense } from "@/types/ecrans";

/**
 * La grille de la boutique des récompenses.
 *
 * Composant client parce que le choix d'une récompense est une interaction.
 *
 * CE QUI MANQUE, ET QUI EST DIT À L'ÉCRAN : le choix n'est pas enregistré. Côté
 * Laravel il part vers `POST /recompenses/select` et atterrit dans
 * `users.selected_reward_image` ; il n'y a pas encore d'équivalent ici. Plutôt
 * que de laisser croire que c'est retenu, la page l'annonce en toutes lettres
 * dès qu'une récompense est choisie. Le jour où l'API existe, il n'y a qu'à
 * remplacer l'appel de `choisir` — la mise en évidence, elle, est déjà là.
 */

const CARTE = "w-[13.75rem] h-[16.875rem]";

export function GrilleRecompenses({
  recompenses,
  connecte,
  /** La récompense déjà choisie par le membre, si le serveur la connaît. */
  choisieInitialement = null,
}: {
  recompenses: Recompense[];
  connecte: boolean;
  choisieInitialement?: string | null;
}) {
  const [choisie, setChoisie] = useState<string | null>(choisieInitialement);

  // Vrai seulement après un clic : on n'annonce l'absence d'enregistrement
  // qu'au moment où quelqu'un croit avoir enregistré quelque chose.
  const [aChoisiIci, setAChoisiIci] = useState(false);

  if (recompenses.length === 0) {
    return (
      <div className="py-16 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-ivory/40 h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
          </svg>
        </span>
        <h2 className="text-ivory mb-2 text-xl font-semibold">Aucune récompense</h2>
        <p className="text-ivory/60">Les récompenses du concours apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <>
      {aChoisiIci && (
        <p
          role="status"
          className="border-gold-dark/30 text-gold-text mx-auto mb-6 max-w-3xl rounded-lg border bg-white/5 px-4 py-2 text-center text-sm"
        >
          Ce choix n&apos;est pas encore enregistré : la mise en avant est
          locale, et disparaîtra en rechargeant la page.
        </p>
      )}

      <div className="grid justify-center gap-4 [grid-template-columns:repeat(auto-fit,13.75rem)]">
        {recompenses.map((recompense) => {
          const selectionnee = choisie === recompense.image;

          return (
            <div
              key={recompense.image}
              className={cn(
                "group relative rounded-xl border bg-white/5 transition-all",
                CARTE,
                selectionnee
                  ? "border-gold-text border-2"
                  : "border-white/10 hover:border-white/20",
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-white/5 transition-all group-hover:bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={recompense.image}
                  alt="Récompense du concours Miss'Skin"
                  className="h-full w-full scale-110 object-cover"
                />

                {selectionnee && (
                  <p className="gold-gradient text-anthracite absolute top-3 left-3 z-20 rounded-full px-2 py-1 text-xs">
                    ✓ Sélectionnée
                  </p>
                )}

                {connecte && (
                  <div className="absolute right-3 bottom-3 left-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <button
                      type="button"
                      disabled={selectionnee}
                      onClick={() => {
                        setChoisie(recompense.image);
                        setAChoisiIci(true);
                      }}
                      className={cn(
                        "text-anthracite w-full rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        selectionnee
                          ? "gold-gradient cursor-default"
                          : "emerald-gradient hover:brightness-110",
                      )}
                    >
                      {selectionnee ? "✓ Sélectionnée" : "Choisir"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
