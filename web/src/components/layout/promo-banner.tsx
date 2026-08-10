"use client";

import { useSyncExternalStore } from "react";

/**
 * Bandeau doré du haut de page : le code créateur.
 *
 * Porté du gabarit `layouts/basic-views.blade.php`, qui tire un message au
 * hasard parmi quatre à chaque chargement.
 *
 * Le tirage passe par `useSyncExternalStore`, qui est précisément fait pour
 * ça : rendre une valeur côté serveur et une autre côté client sans provoquer
 * d'incohérence d'hydratation. Le serveur rend toujours le premier message, le
 * navigateur bascule sur le tiré au sort dès l'hydratation.
 *
 * Comme dans l'original, le bandeau est masqué sous 1301 px — la place manque.
 */

const CODE = "BARBEDOUCE";

/** Les quatre messages, chacun coupé autour du code à mettre en valeur. */
const MESSAGES = [
  { avant: "Code Créateur : ", apres: " — merci du soutien 🙏" },
  { avant: "✂️ Customise ton perso avec le code créateur ", apres: " dans la boutique DOFUS 💛" },
  { avant: "🎨 Tu kiffes les skins ? Soutiens le site avec le code créateur : ", apres: " 💖" },
  {
    avant: "🎨 Soutiens BARBOFUS avec le code créateur : ",
    apres: " sur la boutique Ankama ! ❤️",
  },
];

/** Tiré une seule fois par chargement de page, au premier import côté client. */
const indexTire = Math.floor(Math.random() * MESSAGES.length);

/** Le message ne change jamais en cours de vie : rien à écouter. */
const nePasSouscrire = () => () => {};

export function PromoBanner() {
  const index = useSyncExternalStore(
    nePasSouscrire,
    () => indexTire,
    () => 0,
  );

  const message = MESSAGES[index];

  return (
    <div className="gold-gradient text-anthracite group sticky top-0 left-0 z-50 hidden h-10 w-full items-center justify-center font-light min-[1301px]:flex">
      {/* Balayage vert au survol, comme sur le site actuel. */}
      <div className="emerald-gradient absolute top-0 left-1/2 h-full w-full -translate-x-1/2 scale-x-0 opacity-0 transition-all duration-700 group-hover:scale-x-100 group-hover:opacity-100" />

      <a
        href="https://youtu.be/42wbG24vJQ4"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex h-full w-full items-center justify-center gap-x-1"
      >
        <p>
          {message.avant}
          <span className="font-medium">{CODE}</span>
          {message.apres}
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 origin-bottom-left transition-all group-hover:scale-150"
        >
          <path
            fillRule="evenodd"
            d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}
