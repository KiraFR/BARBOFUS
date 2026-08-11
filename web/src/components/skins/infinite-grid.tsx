"use client";

import { useEffect, useRef, useState } from "react";

import { SkinCard } from "@/components/skins/skin-card";
import type { Locale } from "@/messages";
import type { SkinCardItem } from "@/types/api";

/**
 * La grille de la galerie, qui s'allonge au défilement.
 *
 * Ce que fait ce composant aujourd'hui : il reçoit la liste complète et n'en
 * révèle qu'une tranche à la fois, une tranche de plus chaque fois que le bas
 * de la grille approche.
 *
 * Ce qu'il fera avec l'API : le même déclencheur, mais au lieu de révéler des
 * éléments déjà en mémoire, il ira chercher la page suivante par curseur. Le
 * site dépasse les 60 000 skins — les envoyer tous au navigateur ne tiendra
 * évidemment pas. Le point de bascule est isolé dans `chargerLaSuite()`, c'est
 * la seule fonction à réécrire.
 *
 * Le déclenchement passe par un IntersectionObserver plutôt que par un
 * écouteur de défilement : le navigateur fait le travail, sans recalcul à
 * chaque pixel parcouru.
 */

/** Nombre de skins ajoutés à chaque palier. */
const TAILLE_PAGE = 12;

export function InfiniteGrid({
  skins,
  locale,
  connecte,
}: {
  skins: SkinCardItem[];
  locale: Locale;
  connecte: boolean;
}) {
  const [visibles, setVisibles] = useState(TAILLE_PAGE);
  const sentinelle = useRef<HTMLDivElement | null>(null);

  // Le compteur ne se remet PAS à zéro dans un effet quand les filtres
  // changent : la page donne à ce composant une clé dérivée de la requête, ce
  // qui le remonte à neuf. C'est la façon recommandée de repartir d'un état
  // propre — un effet de synchronisation ferait un rendu de trop, avec
  // l'ancien nombre d'éléments affiché entre-temps.
  useEffect(() => {
    const cible = sentinelle.current;
    if (!cible) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        if (!entrees[0]?.isIntersecting) return;
        // Ici viendra l'appel à l'API, avec le curseur de la page suivante.
        chargerLaSuite();
      },
      // On déclenche un peu avant que la sentinelle n'entre à l'écran, pour que
      // la suite soit déjà là quand le visiteur y arrive.
      { rootMargin: "600px" },
    );

    function chargerLaSuite() {
      setVisibles((actuel) => Math.min(actuel + TAILLE_PAGE, skins.length));
    }

    observateur.observe(cible);
    return () => observateur.disconnect();
  }, [skins.length]);

  const affiches = skins.slice(0, visibles);
  const resteDesSkins = visibles < skins.length;

  return (
    <>
      {/* Colonnes de largeur fixe en auto-fill, reprises du site actuel : les
          cartes gardent leurs proportions et c'est leur nombre par ligne qui
          s'adapte, jamais leur taille. */}
      <div className="mx-auto grid w-[min(100%,93rem)] grid-cols-[repeat(auto-fill,13.125rem)] justify-center gap-x-8 gap-y-16 px-4 pt-[4.5rem]">
        {affiches.map((skin) => (
          <SkinCard key={skin.id} skin={skin} locale={locale} connecte={connecte} />
        ))}
      </div>

      {/* La sentinelle déclenche le palier suivant en approchant de l'écran.
          Le bouton fait la même chose au clic : c'est le chemin du clavier, et
          le filet si l'observateur ne s'exécute pas — certains navigateurs ne
          le déclenchent pas quand l'onglet ne rend rien. */}
      {resteDesSkins ? (
        <div ref={sentinelle} className="flex justify-center py-12">
          <button
            type="button"
            onClick={() => setVisibles((actuel) => Math.min(actuel + TAILLE_PAGE, skins.length))}
            className="text-inactive hover:text-ivory border-inactive hover:border-ivory rounded-md border px-6 py-2 text-sm italic transition-all"
          >
            Charger la suite — {skins.length - visibles} skins restants
          </button>
        </div>
      ) : null}
    </>
  );
}
