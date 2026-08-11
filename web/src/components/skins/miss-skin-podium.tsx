import Link from "next/link";

import { storageUrl } from "@/lib/assets";
import { vainqueursDemo } from "@/lib/fixtures/vainqueurs";
import { cn } from "@/lib/utils";
import { lien, type Locale } from "@/messages";

/**
 * Le podium du concours Miss'Skin, à droite de la galerie.
 *
 * Porté de `livewire/skin/unity-last-winners.blade.php`. Chaque vainqueur a un
 * cadre coloré et le Dofus qu'il a remporté : ocre, émeraude, cawotte.
 *
 * Sur le site, ce bloc passe sous la grille jusqu'à 1800 px, puis devient une
 * troisième colonne à droite. C'est la page qui décide de ce placement ; le
 * composant, lui, s'adapte à la largeur qu'on lui donne.
 */
export function MissSkinPodium({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <aside className={cn("w-full", className)}>
      <div className="mb-6 flex items-center justify-center gap-x-3">
        <span
          aria-hidden="true"
          className="bg-ivory text-anthracite flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-lg font-bold italic"
        >
          i
        </span>
        <p className="font-display text-ivory text-xl">
          Classement tous les <strong className="font-normal">Mardi</strong> !
        </p>
      </div>

      <ol className="flex flex-wrap justify-center gap-8 min-[1801px]:flex-col min-[1801px]:flex-nowrap">
        {vainqueursDemo.map((vainqueur, rang) => (
          <li key={vainqueur.skinId} className="relative">
            {/* Le Dofus remporté, en médaille au-dessus du cadre. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vainqueur.dofus}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute -top-6 left-1/2 z-10 h-12 -translate-x-1/2"
            />

            <Link
              href={lien(locale, `/skin/${vainqueur.skinId}`)}
              title={`${vainqueur.nom} par ${vainqueur.auteur}`}
              className={cn(
                "bg-anthracite-lit relative flex h-90 w-52 flex-col rounded-md border-2 pt-6",
                "transition-all hover:brightness-125",
                vainqueur.cadre,
              )}
            >
              <span className="sr-only">Place {rang + 1} — </span>

              <p className="text-inactive absolute top-1 w-full truncate px-2 text-center text-sm font-thin italic">
                {vainqueur.nom}
              </p>

              <div className="h-[calc(100%-3rem)] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={storageUrl(vainqueur.image)}
                  alt={vainqueur.nom}
                  loading="lazy"
                  draggable={false}
                  className="mx-auto h-full"
                />
              </div>

              <p className="text-gold-text absolute bottom-0 left-0 w-full truncate px-2 pb-1 text-xs font-light">
                {vainqueur.auteur}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
