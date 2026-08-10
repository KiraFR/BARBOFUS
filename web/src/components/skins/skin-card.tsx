import Link from "next/link";

import { storageUrl } from "@/lib/assets";
import { lien, type Locale } from "@/messages";
import type { SkinCardItem } from "@/types/api";

/**
 * Une carte de la galerie.
 *
 * Portée de la galerie actuelle, dont elle garde l'organisation : le nom du
 * skin en haut, l'image au centre, l'auteur en bas à gauche. Toute la carte
 * est un lien vers la fiche du skin.
 *
 * Attention en relisant le HTML d'origine : l'élément du haut porte la classe
 * `skinCardUserName` alors qu'il contient le nom du SKIN, pas celui de
 * l'utilisateur. Vérifié contre l'API — le skin 94883 s'appelle « Explorateur
 * rat » et son auteur « Phazo ».
 *
 * Trois cas observés en production que cette carte doit encaisser :
 *   - `name` peut être nul — beaucoup de skins sont publiés sans titre ;
 *   - `breed` peut être vide (`{}`) — la carte s'affiche alors sans classe ;
 *   - `image_path` peut renvoyer 404 — c'est l'état normal d'un skin qui vient
 *     d'être posté. La place reste alors vide, comme sur le site actuel.
 *
 * Ce que la carte ne montre pas encore : le compteur de vues et le nombre de
 * likes. L'endpoint `/api/skin/{id}` ne les rend pas ; leurs emplacements sont
 * réservés dans la mise en page et se rempliront quand l'API les fournira.
 */
export function SkinCard({ skin, locale }: { skin: SkinCardItem; locale: Locale }) {
  const classe = skin.breed.name;
  const description = classe ? `Skin Dofus ${classe}` : "Skin Dofus";

  return (
    // Hauteur fixe, reprise du site actuel (22,5 rem). La largeur vient de la
    // colonne de la grille, fixée à 13,125 rem : les cartes ne s'étirent pas.
    <article className="relative h-90 shadow-sm">
      {/* Le nom du skin, au-dessus de la carte. Souvent absent : la place
          reste alors vide, comme sur le site actuel. */}
      {skin.name ? (
        <p className="text-inactive absolute top-0 z-10 w-full truncate px-2 text-center text-sm font-thin italic">
          {skin.name}
        </p>
      ) : null}

      <Link
        href={lien(locale, `/skin/${skin.id}`)}
        title={description}
        className="group absolute inset-0"
      >
        {/* Fond de carte, avec le reflet diagonal du site. */}
        <div className="bg-anthracite-lit absolute inset-0 -z-10 overflow-hidden rounded-md transition-all group-hover:brightness-125">
          <div className="absolute top-[-12.5rem] right-0 h-full w-[200%] rotate-[30deg] origin-bottom-right bg-[linear-gradient(0deg,rgba(255,255,255,0)_36%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* L'image du skin. Quand elle manque — cas courant pour un skin qui
            vient d'être posté — la place reste simplement vide. */}
        <div className="absolute top-6 h-[calc(100%-3rem)] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={storageUrl(skin.image_path)}
            alt={skin.name ?? description}
            loading="lazy"
            draggable={false}
            className="mx-auto h-full transition-transform group-hover:scale-105"
          />
        </div>

        {/* Compteur de vues, en bas à droite. */}
        <div className="text-inactive absolute right-2 bottom-1 flex items-center gap-x-1 text-xs">
          <span>{skin.total_views.toLocaleString(locale)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Link>

      {/* L'auteur, en bas à gauche. Sur le site actuel c'est un bouton qui
          filtre la galerie sur ce pseudo ; il le redeviendra avec les filtres.
          La largeur laisse la place au compteur de vues, à sa droite. */}
      <p className="text-gold-text absolute bottom-0 left-0 z-10 w-[calc(100%-3.75rem)] truncate px-2 pb-0.5 text-xs font-light">
        {skin.user.name}
      </p>
    </article>
  );
}
