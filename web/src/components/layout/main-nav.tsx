"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { images } from "@/lib/assets";
import { navigationVisiteur, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { lien, type Locale, type Messages } from "@/messages";

/**
 * Barre de navigation principale.
 *
 * Portée de `resources/views/components/main-navbar.blade.php`. Comme
 * l'original, elle bascule en menu plein écran sous 1301 px de large, avec un
 * bouton hamburger — c'est le seul endroit du site où ce point de rupture est
 * utilisé, il est repris tel quel pour rester cohérent avec l'en-tête.
 *
 * L'élément actif porte le texte ivoire et un triangle pointant vers le bas,
 * comme sur le site actuel.
 *
 * Ce qui n'est pas encore là : les entrées réservées aux membres connectés
 * (Mon compte, Se déconnecter). Il n'y a pas d'authentification tant que l'API
 * n'est pas branchée, donc le menu est toujours celui d'un visiteur.
 */
export function MainNav({ t, locale }: { t: Messages; locale: Locale }) {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const items = navigationVisiteur();

  // L'URL courante porte la langue en tête (« /fr/login ») ; on la retire pour
  // comparer avec les chemins du menu, qui n'en ont pas.
  const cheminSansLangue = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  function estActif(item: NavItem) {
    if (item.externe) return false;
    if (item.href === "/") return cheminSansLangue === "/";
    return cheminSansLangue.startsWith(item.href);
  }

  return (
    <nav
      className={cn(
        // La bordure ivoire n'apparaît qu'en disposition bureau : en dessous
        // de 1301 px la barre est repliée derrière le hamburger, et le site
        // actuel ne la dessine pas non plus à ces largeurs.
        "bg-anthracite border-ivory sticky top-0 z-40 w-full min-[1301px]:border-t-8",
        "text-inactive text-[1.35rem] font-thin tracking-tight",
      )}
    >
      {/* Bureau : tout sur une ligne. Mobile : replié derrière le hamburger. */}
      <div
        className={cn(
          "items-center justify-center",
          "max-[1300px]:fixed max-[1300px]:inset-0 max-[1300px]:z-40",
          "max-[1300px]:bg-anthracite max-[1300px]:flex-col max-[1300px]:pt-16",
          menuOuvert ? "flex" : "hidden min-[1301px]:flex",
        )}
      >
        {items.map((item, index) => {
          const actif = estActif(item);
          const libelle = item.libelle ?? (item.cle ? t[item.cle] : "");
          const dernier = index === items.length - 1;

          const classes = cn(
            "flex h-12 items-center px-5 transition-all focus:outline-none",
            "min-[1301px]:h-8",
            actif ? "text-ivory-dark relative font-light" : "hover:text-ivory-dark",
            // Séparateur vertical entre les entrées, sauf après la dernière et
            // autour de l'entrée active (l'original les retire aussi).
            !actif && !dernier && "min-[1301px]:border-r-inactive min-[1301px]:border-r",
          );

          const contenu = (
            <>
              <span aria-hidden="true">{item.emoji}</span>
              {libelle}
              {actif ? (
                // Le repère triangulaire sous l'entrée courante.
                <span
                  aria-hidden="true"
                  className="bg-ivory nav-pointer absolute top-full left-1/2 hidden h-4 w-16 -translate-x-1/2 min-[1301px]:block"
                />
              ) : null}
            </>
          );

          return item.externe ? (
            <a
              key={item.href}
              href={item.href}
              title={item.titre}
              // Ces sections vivent encore sur l'ancien site : on quitte
              // l'application, donc nouvel onglet et lien annoncé comme tel.
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
              onClick={() => setMenuOuvert(false)}
            >
              {contenu}
            </a>
          ) : (
            <Link
              key={item.href}
              href={lien(locale, item.href)}
              title={item.titre}
              aria-current={actif ? "page" : undefined}
              className={classes}
              onClick={() => setMenuOuvert(false)}
            >
              {contenu}
            </Link>
          );
        })}
      </div>

      {/* Logo réduit, visible seulement quand la barre est repliée. */}
      <div className="flex h-12 items-center justify-between px-2 min-[1301px]:hidden">
        <Link href={lien(locale, "/")} title="Accueil Barbofus" className="h-full py-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="Barbofus" className="h-full w-auto" draggable={false} />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setMenuOuvert((ouvert) => !ouvert)}
        aria-expanded={menuOuvert}
        aria-label={
          menuOuvert ? "Fermeture du menu de navigation" : "Ouverture du menu de navigation"
        }
        className="text-ivory fixed top-2 right-2 z-50 h-10 w-10 min-[1301px]:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          {menuOuvert ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>
    </nav>
  );
}
