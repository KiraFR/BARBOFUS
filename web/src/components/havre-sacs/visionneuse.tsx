"use client";

import { useEffect, useRef } from "react";

import { EnteteHavreSac } from "@/components/havre-sacs/carte-havre-sac";
import type { Messages } from "@/messages";
import type { HavenBag } from "@/types/api";

/**
 * La visionneuse : le havre-sac en grand, par-dessus la galerie.
 *
 * Il n'y a pas de page de détail sur ce site — cliquer une carte ouvre cette
 * fenêtre et écrit `?show={id}` dans l'URL, ce qui rend le lien partageable.
 * On garde ce comportement, et le même nom de paramètre, pour que les liens
 * déjà échangés continuent de fonctionner.
 *
 * Bâtie sur `<dialog>` plutôt que sur un `<div>` en position fixe : le
 * navigateur fournit alors gratuitement ce que l'original réimplémente à moitié
 * — fermeture à Échap, piégeage du focus dans la fenêtre, inertie du reste de
 * la page pour les lecteurs d'écran. L'original enveloppe tout dans un
 * `<button>` plein écran, ce qui annonce l'image entière comme un bouton.
 */
export function Visionneuse({
  sac,
  t,
  onFermer,
}: {
  sac: HavenBag | null;
  t: Messages;
  onFermer: () => void;
}) {
  const dialogue = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const element = dialogue.current;
    if (!element) return;

    if (sac && !element.open) element.showModal();
    if (!sac && element.open) element.close();
  }, [sac]);

  return (
    <dialog
      ref={dialogue}
      onClose={onFermer}
      // Un clic hors du cadre ferme, comme sur le site. `<dialog>` reçoit le
      // clic sur toute la zone assombrie, d'où la comparaison avec la cible.
      onClick={(evenement) => {
        if (evenement.target === dialogue.current) onFermer();
      }}
      className="bg-transparent backdrop:bg-black/50 open:flex m-auto max-h-full max-w-full items-center justify-center p-4"
    >
      {sac && (
        <div className="bg-anthracite-lit relative overflow-hidden rounded-xl shadow-sm">
          <EnteteHavreSac sac={sac} t={t} />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sac.image_path}
            alt={sac.name ?? `Havre-sac de ${sac.user_name}`}
            className="max-h-[75vh] max-w-[90vw] object-contain"
          />

          <button
            type="button"
            onClick={onFermer}
            className="text-ivory absolute top-2 right-2 rounded-full bg-black/50 px-3 py-1 text-sm backdrop-blur-sm transition-all hover:bg-black/70"
          >
            Fermer
          </button>
        </div>
      )}
    </dialog>
  );
}
