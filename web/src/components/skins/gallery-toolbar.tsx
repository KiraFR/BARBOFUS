"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { estAscendant, TRIS, type CodeTri } from "@/lib/tri";
import type { Messages } from "@/messages";

const SITE_ACTUEL = "https://barbofus.com";
const TUTORIEL = "https://www.youtube.com/watch?v=cuAsh_dMw90&ab_channel=BarbeDouce";

/**
 * La bande au-dessus de la galerie : lien vers le tutoriel, accès au
 * skinator, nombre de skins, et le tri.
 *
 * Portée de la galerie actuelle. Le tri s'écrit dans l'URL sous le paramètre
 * `sort`, avec les mêmes codes que le site d'aujourd'hui (`0,DESC`…) : les
 * liens de galerie déjà partagés continueront de fonctionner après la
 * bascule.
 */
export function GalleryToolbar({
  t,
  nombreDeSkins,
  triCourant,
  locale,
}: {
  t: Messages;
  nombreDeSkins: number;
  triCourant: CodeTri;
  locale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const parametres = useSearchParams();
  const [ouvert, setOuvert] = useState(false);

  function choisir(code: CodeTri) {
    const suivants = new URLSearchParams(parametres);
    suivants.set("sort", code);
    router.push(`${pathname}?${suivants}`, { scroll: false });
    setOuvert(false);
  }

  const libelleCourant = TRIS.find((tri) => tri.code === triCourant)!.cle;

  return (
    <div className="mx-auto flex w-[min(100%,93rem)] flex-col gap-4 px-4 max-[850px]:items-center min-[851px]:flex-row min-[851px]:items-start min-[851px]:justify-between">
      {/* Tutoriel et accès au skinator — le skinator reste sur l'ancien site. */}
      <div className="flex flex-col items-start gap-y-2">
        <a
          href={TUTORIEL}
          target="_blank"
          rel="noopener noreferrer"
          title={t.galleryTutorialTitle}
          className="flex items-center gap-x-2"
        >
          <span
            aria-hidden="true"
            className="bg-ivory text-anthracite flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-lg font-bold italic"
          >
            i
          </span>
          <span className="font-display text-ivory">{t.galleryTutorial}</span>
        </a>

        <a
          href={`${SITE_ACTUEL}/skinator`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-ivory w-fit rounded-md bg-red-500 px-4 transition-all hover:bg-red-300"
        >
          {t.galleryToSkinator}
        </a>
      </div>

      {/* Le nombre total de skins. */}
      <p className="italic">
        {nombreDeSkins.toLocaleString(locale)} {t.gallerySkinsCount}
      </p>

      {/* Le tri. */}
      <div className="relative max-[850px]:order-first">
        <div className="flex items-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
            className={cn(
              "stroke-ivory h-6 w-6 transition-all duration-100",
              estAscendant(triCourant) ? "" : "rotate-90",
            )}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>

          <p className="text-ivory text-base font-thin">{t.gallerySortBy}</p>

          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            onBlur={() => setOuvert(false)}
            aria-expanded={ouvert}
            aria-haspopup="listbox"
            className={cn(
              "border-anthracite w-48 cursor-pointer rounded-t-md border-t px-4 text-left text-lg font-normal transition-all duration-200",
              ouvert ? "bg-ivory text-anthracite" : "text-ivory hover:bg-anthracite-lit",
            )}
          >
            {t[libelleCourant]}
          </button>
        </div>

        {ouvert ? (
          <ul
            role="listbox"
            className="bg-ivory-dark text-anthracite absolute top-9 right-0 z-30 w-48 overflow-hidden rounded-b-md text-base font-light"
          >
            {TRIS.map((tri) => (
              <li key={tri.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={tri.code === triCourant}
                  // `onMouseDown` plutôt que `onClick` : le `onBlur` du bouton
                  // ferme le menu avant qu'un clic n'ait le temps d'aboutir.
                  onMouseDown={() => choisir(tri.code)}
                  className="hover:bg-ivory w-full cursor-pointer px-4 py-1 text-left"
                >
                  {t[tri.cle]}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
