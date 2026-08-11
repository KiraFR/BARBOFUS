"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { lien, type Locale } from "@/messages";

/**
 * Le cœur d'une carte de skin.
 *
 * Repris de la galerie actuelle : il n'apparaît qu'au survol de la carte, sauf
 * si le skin est déjà liké — auquel cas il reste visible. Pour un visiteur non
 * connecté, c'est un lien vers la page de connexion, comme sur le site.
 *
 * L'état est local : aucun appel réseau n'existe encore. Le jour où l'API
 * arrive, `basculer` deviendra un POST/DELETE sur `/unity-skins/{id}/like` et
 * le reste du composant ne bougera pas.
 */
export function LikeButton({
  skinId,
  likes,
  likeParMoi,
  connecte,
  locale,
}: {
  skinId: number;
  likes: number;
  likeParMoi: boolean;
  connecte: boolean;
  locale: Locale;
}) {
  const [aime, setAime] = useState(likeParMoi);
  const total = likes + (aime === likeParMoi ? 0 : aime ? 1 : -1);

  const contenu = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 transition-transform group-active/like:scale-125"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
      <span className="text-xs">{total}</span>
    </>
  );

  // La carte entière est un lien : ce bouton doit vivre au-dessus, et son clic
  // ne doit pas déclencher la navigation vers la fiche.
  const classes = cn(
    "group/like absolute top-2 left-2 z-20 flex items-center gap-x-1 pr-1 transition-all",
    aime ? "text-heart-lit" : "text-heart-gray opacity-0 group-hover:opacity-100",
  );

  if (!connecte) {
    return (
      <Link
        href={lien(locale, "/login")}
        title="Connecte-toi pour aimer ce skin"
        className={classes}
      >
        {contenu}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={(evenement) => {
        evenement.preventDefault();
        evenement.stopPropagation();
        setAime((valeur) => !valeur);
      }}
      aria-pressed={aime}
      aria-label={aime ? "Retirer des likes" : "Aimer ce skin"}
      title={`Skin ${skinId}`}
      className={classes}
    >
      {contenu}
    </button>
  );
}
