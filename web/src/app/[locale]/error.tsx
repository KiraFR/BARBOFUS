"use client";

import { useEffect } from "react";

import { EcranErreur } from "@/components/layout/ecran-erreur";

/**
 * L'écran des erreurs d'exécution — l'équivalent du 500 de Laravel.
 *
 * Next impose un composant client ici, et n'y passe ni `params` ni la langue :
 * les textes sont donc en français, comme les pages 500, 419 et 429 de Laravel,
 * qui ne sont pas traduites non plus.
 *
 * Pas d'habillage : une erreur peut très bien venir de l'habillage lui-même
 * (une mise en page qui échoue), et tenter de le rendre à nouveau ferait
 * boucler l'écran d'erreur. On reste donc sur le minimum, mais aux couleurs du
 * site plutôt que sur la page blanche de Next.
 *
 * Le message d'erreur technique n'est PAS montré : il peut contenir des
 * chemins de fichiers ou des détails d'infrastructure. Il part dans la console.
 */
export default function Erreur({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EcranErreur
      titre="Erreur"
      detail="Quelque chose s'est mal passé de notre côté."
      action={
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="gold-gradient text-anthracite rounded-md px-6 py-3 text-lg transition-all hover:rounded-3xl hover:brightness-110"
          >
            Réessayer
          </button>

          {/* L'identifiant permet de retrouver la trace côté serveur. Il ne
              révèle rien : c'est une empreinte, pas un message. */}
          {error.digest && (
            <p className="text-inactive text-xs">Référence : {error.digest}</p>
          )}
        </div>
      }
    />
  );
}
