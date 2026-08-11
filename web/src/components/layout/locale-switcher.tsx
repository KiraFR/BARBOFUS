"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/messages";

/**
 * Le sélecteur de langue, en haut à droite.
 *
 * Porté de `resources/views/livewire/utils/locale-dropdown.blade.php`, où
 * changer de langue enregistrait une préférence côté serveur. Ici la langue
 * est dans l'URL : changer de langue, c'est aller à la même page sous un autre
 * préfixe. Le chemin et les paramètres sont conservés — on ne perd ni ses
 * filtres ni son tri en passant du français à l'anglais.
 *
 * Les drapeaux viennent de `static.barbofus.com`, comme sur le site actuel.
 */

const DRAPEAUX = "https://static.barbofus.com/images/icons/locale";

/** Le nom de chaque langue, écrit dans cette langue. */
const NOMS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Española",
  pt: "Português",
};

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  function changer(cible: Locale) {
    // On remplace le préfixe de langue et rien d'autre.
    const chemin = pathname.replace(new RegExp(`^/${locale}`), `/${cible}`);

    // La requête est lue au moment du clic plutôt que par `useSearchParams` :
    // ce composant vit dans la mise en page racine, et `useSearchParams` y
    // exigerait une frontière Suspense sur toutes les pages, y compris celles
    // qui sont figées à la compilation.
    const requete = window.location.search;

    router.push(chemin + requete);
    setOuvert(false);
  }

  const autres = locales.filter((autre) => autre !== locale);

  return (
    <div
      className="fixed top-3 right-14 z-50 w-12 min-[1301px]:top-12"
      onMouseLeave={() => setOuvert(false)}
    >
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-haspopup="menu"
        aria-label={`Langue : ${NOMS[locale]}. Changer de langue.`}
        className="w-full transition-all hover:opacity-75 active:scale-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${DRAPEAUX}/${locale}.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="mx-auto h-8"
        />
      </button>

      <div
        role="menu"
        className={cn(
          "bg-anthracite-lit absolute mt-1 rounded-md p-2 shadow-xl transition-opacity",
          ouvert ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {autres.map((autre) => (
          <button
            key={autre}
            type="button"
            role="menuitem"
            onClick={() => changer(autre)}
            title={NOMS[autre]}
            className="block transition-all hover:brightness-50 active:scale-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${DRAPEAUX}/${autre}.png`}
              alt={NOMS[autre]}
              draggable={false}
              className="h-8"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
