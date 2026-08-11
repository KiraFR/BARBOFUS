"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { lien, type Locale, type Messages } from "@/messages";

/**
 * Les onglets de l'espace membre : une colonne verticale à gauche du contenu.
 *
 * Reprise de `user-dashboard.blade.php`. Chaque onglet porte son icône, et le
 * libellé disparaît sous 1250 px pour ne garder que les icônes — c'est le
 * comportement du site actuel.
 *
 * Différence assumée : ce sont de vrais liens vers de vraies routes, là où le
 * site actuel bascule en JavaScript et reflète l'onglet dans un paramètre
 * `?section=`. Le résultat est proche — les deux sont partageables — mais ici
 * le bouton « précédent » fonctionne et chaque onglet se rend côté serveur.
 *
 * Ne figurent pas ici : les anciens skins Dofus 2 (le jeu n'existe plus), les
 * havre-sacs (hors périmètre) et les onglets de modération, qui demandent des
 * rôles et une API.
 */

const ICONES = {
  profil:
    "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
  pinceau:
    "M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z",
  coeur:
    "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z",
} as const;

export function CompteTabs({ t, locale }: { t: Messages; locale: Locale }) {
  const pathname = usePathname();

  const onglets = [
    { href: "/mon-compte", libelle: t.titleUserDetails, icone: ICONES.profil },
    { href: "/mon-compte/skins", libelle: t.titleMySkins, icone: ICONES.pinceau },
    { href: "/mon-compte/favoris", libelle: t.titleMyFavorites, icone: ICONES.coeur },
  ];

  return (
    <nav className="sticky top-32 max-h-100 shrink-0 font-light min-[1250px]:w-80">
      {onglets.map((onglet) => {
        const cible = lien(locale, onglet.href);
        // Comparaison exacte : sans cela, « /mon-compte » se croirait actif sur
        // chacun de ses sous-onglets.
        const actif = pathname === cible;

        return (
          <Link
            key={onglet.href}
            href={cible}
            aria-current={actif ? "page" : undefined}
            className={cn(
              "group flex h-12 w-full items-center gap-x-2 border-b-2 px-2",
              "transition-all min-[400px]:h-16 min-[1250px]:px-6",
              actif
                ? "border-ivory text-ivory fill-ivory text-2xl font-normal"
                : "border-anthracite text-inactive fill-inactive hover:bg-anthracite-lit hover:text-ivory text-xl",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-6 shrink-0"
            >
              <path fillRule="evenodd" clipRule="evenodd" d={onglet.icone} />
            </svg>

            {/* Sous 1250 px seules les icônes restent : le libellé est retiré
                du flux, mais conservé pour les lecteurs d'écran. */}
            <span className="sr-only min-[1250px]:not-sr-only min-[1250px]:transition-transform min-[1250px]:group-hover:-skew-x-12">
              {onglet.libelle}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
