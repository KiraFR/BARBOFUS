"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { lien, type Locale, type Messages } from "@/messages";

/**
 * Les onglets de l'espace membre.
 *
 * Ce sont de vrais liens, pas des boutons : chaque onglet a sa propre URL. Le
 * site actuel les gère en JavaScript sur une URL unique, ce qui empêche de
 * partager un onglet ou d'utiliser le bouton « précédent ».
 *
 * Ne figurent pas ici : les anciens skins Dofus 2 (le jeu n'existe plus), les
 * havre-sacs (hors périmètre de la refonte) et les onglets de modération, qui
 * demandent des rôles et une API.
 */
export function CompteTabs({ t, locale }: { t: Messages; locale: Locale }) {
  const pathname = usePathname();

  const onglets = [
    { href: "/mon-compte", libelle: t.titleUserDetails },
    { href: "/mon-compte/skins", libelle: t.titleMySkins },
    { href: "/mon-compte/favoris", libelle: t.titleMyFavorites },
  ];

  return (
    <nav className="border-ivory flex flex-wrap justify-center gap-x-2 gap-y-2 border-b">
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
              "rounded-t-md px-6 py-3 text-lg font-light transition-all",
              actif
                ? "bg-anthracite-lit text-gold-text"
                : "text-inactive hover:text-ivory hover:bg-anthracite-lit/50",
            )}
          >
            {onglet.libelle}
          </Link>
        );
      })}
    </nav>
  );
}
