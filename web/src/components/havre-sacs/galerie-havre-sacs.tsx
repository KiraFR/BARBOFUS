"use client";

import { useEffect, useRef, useState } from "react";

import { CarteHavreSac } from "@/components/havre-sacs/carte-havre-sac";
import { Visionneuse } from "@/components/havre-sacs/visionneuse";
import { storageUrl } from "@/lib/assets";
import type { Messages } from "@/messages";
import type { HavenBag } from "@/types/api";

/**
 * La galerie de havre-sacs : la grille, la visionneuse, et le chargement à la
 * volée.
 *
 * Mêmes principes que la galerie de skins — une tranche révélée à la fois, un
 * IntersectionObserver qui déclenche la suivante, et un bouton qui fait la
 * même chose au clic pour le clavier et pour les navigateurs qui n'exécutent
 * pas l'observateur.
 *
 * La taille de tranche est celle du site : dix par palier.
 */

const TAILLE_PAGE = 10;

export function GalerieHavreSacs({
  sacs,
  t,
  /** Identifiant lu dans `?show=` : la visionneuse s'ouvre dessus au chargement. */
  ouvertInitialement,
}: {
  sacs: HavenBag[];
  t: Messages;
  ouvertInitialement: number | null;
}) {
  const [visibles, setVisibles] = useState(TAILLE_PAGE);
  const [ouvert, setOuvert] = useState<HavenBag | null>(
    () => sacs.find((sac) => sac.id === ouvertInitialement) ?? null,
  );
  const sentinelle = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cible = sentinelle.current;
    if (!cible) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        if (!entrees[0]?.isIntersecting) return;
        setVisibles((actuel) => Math.min(actuel + TAILLE_PAGE, sacs.length));
      },
      { rootMargin: "600px" },
    );

    observateur.observe(cible);
    return () => observateur.disconnect();
  }, [sacs.length]);

  /**
   * Ouvre un havre-sac et met `?show={id}` dans l'URL.
   *
   * `history.pushState` plutôt que le routeur : la page ne doit pas être
   * re-rendue côté serveur pour ouvrir une fenêtre. C'est ce que fait déjà le
   * site actuel, et c'est le bon choix — seule l'adresse change.
   */
  function ouvrir(sac: HavenBag) {
    setOuvert(sac);

    const url = new URL(window.location.href);
    url.searchParams.set("show", String(sac.id));
    window.history.pushState(null, "", url);
  }

  function fermer() {
    setOuvert(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("show");
    window.history.pushState(null, "", url);
  }

  if (sacs.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={storageUrl("images/misc_ui/Barbe_pleure.webp")}
          alt=""
          aria-hidden="true"
          height={256}
          className="mt-8 h-[16rem]"
        />
        <p className="mt-4 text-4xl font-normal">
          {t.contentOuch}{" "}
          <span className="text-3xl font-thin italic">{t.contentNoResult}</span>
        </p>
      </div>
    );
  }

  const affiches = sacs.slice(0, visibles);
  const restants = sacs.length - visibles;

  return (
    <>
      <div className="mx-auto grid w-[min(95%,130rem)] grid-cols-1 justify-center gap-x-8 gap-y-16 px-4 pt-8 min-[900px]:grid-cols-2">
        {affiches.map((sac) => (
          <CarteHavreSac key={sac.id} sac={sac} t={t} onOuvrir={() => ouvrir(sac)} />
        ))}
      </div>

      {restants > 0 && (
        <div ref={sentinelle} className="flex justify-center py-12">
          <button
            type="button"
            onClick={() => setVisibles((actuel) => Math.min(actuel + TAILLE_PAGE, sacs.length))}
            className="text-inactive hover:text-ivory border-inactive hover:border-ivory rounded-md border px-6 py-2 text-sm italic transition-all"
          >
            Charger la suite — {restants} havre-sacs restants
          </button>
        </div>
      )}

      <Visionneuse sac={ouvert} t={t} onFermer={fermer} />
    </>
  );
}
