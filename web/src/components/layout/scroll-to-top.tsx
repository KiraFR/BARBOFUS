"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Le bouton de retour en haut de page.
 *
 * Porté de `resources/views/components/utils/scroll-to-top.blade.php` : un
 * rond doré en bas à droite, qui apparaît en fondu dès que la page a défilé.
 *
 * Il n'apparaît qu'après le premier défilement, donc il est inutile tant que
 * la page n'a pas bougé — d'où l'écoute du défilement plutôt qu'un affichage
 * permanent.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // `passive` : on ne bloque jamais le défilement, on se contente d'observer.
    const surDefilement = () => setVisible(window.scrollY > 20);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Revenir en haut de la page"
      // `aria-hidden` et `tabIndex` suivent la visibilité : un bouton
      // transparent ne doit pas être atteignable au clavier.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "gold-gradient text-anthracite fixed right-4 bottom-6 z-40 flex h-16 w-16",
        "items-center justify-center rounded-full shadow-lg transition-all duration-200",
        "hover:brightness-110 active:scale-90",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        aria-hidden="true"
        className="h-8 w-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    </button>
  );
}
