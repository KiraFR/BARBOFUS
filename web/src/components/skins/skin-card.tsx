import Link from "next/link";

import { storageUrl } from "@/lib/assets";
import { lien, type Locale } from "@/messages";
import type { SkinDetail } from "@/types/api";

/**
 * Une carte de la galerie.
 *
 * Portée de la galerie actuelle, dont elle garde l'organisation : l'auteur en
 * haut, l'image au centre, le nom du skin en bas à gauche. Toute la carte est
 * un lien vers la fiche du skin.
 *
 * Trois cas observés en production que cette carte doit encaisser, et qui ont
 * chacun coûté une ligne :
 *   - `name` peut être nul — beaucoup de skins sont publiés sans titre ;
 *   - `breed` peut être vide (`{}`) — la carte s'affiche alors sans classe ;
 *   - `image_path` peut renvoyer 404 — c'est l'état normal d'un skin qui vient
 *     d'être posté. D'où le fond en damier plutôt qu'une icône d'image cassée.
 *
 * Ce que la carte ne montre pas encore : le compteur de vues et le nombre de
 * likes. L'endpoint `/api/skin/{id}` ne les rend pas ; leurs emplacements sont
 * réservés dans la mise en page et se rempliront quand l'API les fournira.
 */
export function SkinCard({ skin, locale }: { skin: SkinDetail; locale: Locale }) {
  const classe = skin.breed.name;
  const description = classe ? `Skin Dofus ${classe}` : "Skin Dofus";

  return (
    <article className="relative aspect-3/4">
      {/* L'auteur, au-dessus de la carte. */}
      <p className="text-inactive absolute top-0 z-10 w-full truncate px-2 text-center text-sm font-thin italic">
        {skin.user.name}
      </p>

      <Link
        href={lien(locale, `/skin/${skin.id}`)}
        title={description}
        className="group absolute inset-0"
      >
        {/* Fond de carte, avec le reflet diagonal du site. */}
        <div className="bg-anthracite-lit absolute inset-0 -z-10 overflow-hidden rounded-md transition-all group-hover:brightness-125">
          <div className="absolute top-[-12.5rem] right-0 h-full w-[200%] rotate-[30deg] origin-bottom-right bg-[linear-gradient(0deg,rgba(255,255,255,0)_36%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* L'image du skin. Le damier reste visible dessous quand elle manque. */}
        <div className="absolute top-6 h-[calc(100%-3rem)] w-full">
          <div
            aria-hidden="true"
            className="absolute inset-0 m-auto h-2/3 w-1/2 rounded-sm opacity-[0.06] [background-image:repeating-conic-gradient(var(--color-ivory)_0_25%,transparent_0_50%)] [background-size:16px_16px]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={storageUrl(skin.image_path)}
            alt={skin.name ?? description}
            loading="lazy"
            draggable={false}
            className="relative mx-auto h-full transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Le nom du skin, en bas. Sur le site actuel c'est un bouton qui filtre
          la galerie sur ce nom ; il le redeviendra avec les filtres. */}
      {skin.name ? (
        <p className="text-gold-text absolute bottom-0 left-0 z-10 w-[calc(100%-3.75rem)] truncate px-2 pb-0.5 text-xs font-light">
          {skin.name}
        </p>
      ) : null}
    </article>
  );
}
