import Link from "next/link";
import type { ReactNode } from "react";

import { SkinCard } from "@/components/skins/skin-card";
import { images, partenaires, reseaux, traducteurs } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { lien, type Locale } from "@/messages";
import type { SkinCardItem } from "@/types/api";

/**
 * Les blocs de la page d'accueil.
 *
 * Ils sont regroupés ici plutôt qu'éclatés en un fichier par bloc : aucun ne
 * sert ailleurs, et la page se lit mieux d'un seul tenant.
 */

/**
 * Bandeau doré incliné, sur lequel se détachent les appels à l'action et le
 * texte de présentation. L'inclinaison porte sur le fond seul, pas sur le
 * contenu, sinon le texte partirait de travers.
 */
export function GoldBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("relative flex items-center justify-center", className)}>
      <div className="gold-band absolute inset-0 -z-10 w-full skew-y-[1.5deg]" />
      {children}
    </section>
  );
}

/**
 * Le carrousel des derniers skins.
 *
 * La liste est rendue deux fois, comme sur le site actuel : c'est ce qui permet
 * au défilement de reboucler sans saut visible. Le tout est en CSS, donc rien
 * à hydrater — et l'animation s'arrête au survol pour laisser le temps de
 * cliquer sur une carte.
 */
export function HomeCarousel({ skins, locale }: { skins: SkinCardItem[]; locale: Locale }) {
  const doublee = [...skins, ...skins];

  return (
    <div className="gold-gradient mx-auto mt-16 h-[max(20vh,13.75rem)] w-[min(90vw,62.5rem)] rounded-md px-1">
      <div className="bg-anthracite h-full w-full overflow-x-clip">
        <div className="carousel-slide flex h-full w-fit gap-x-4 pl-4 hover:[animation-play-state:paused]">
          {doublee.map((skin, index) => (
            <SkinCard
              // La seconde moitié est un doublon d'affichage : l'index la
              // distingue de la première pour React.
              key={`${skin.id}-${index}`}
              skin={skin}
              locale={locale}
              className="aspect-14/19 h-full w-auto shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Les deux boutons sous le carrousel. */
export function HomeActions({
  locale,
  libelleGalerie,
}: {
  locale: Locale;
  libelleGalerie: string;
}) {
  return (
    <div className="flex h-fit w-fit flex-col gap-y-4 min-[800px]:flex-row">
      <div className="flex w-96 justify-center">
        <Link
          href={lien(locale, "/skins")}
          title="Galerie de skins dofus"
          className="text-gold-text border-anthracite bg-anthracite hover:bg-anthracite-lit hover:border-anthracite-lit h-fit rounded-lg border-4 px-8 py-3 text-xl font-normal uppercase transition-all hover:tracking-widest"
        >
          {libelleGalerie}
        </Link>
      </div>
      <div className="flex w-96 justify-center">
        {/* Le skinator reste sur l'ancien site : lien sortant. */}
        <a
          href="https://barbofus.com/skinator"
          target="_blank"
          rel="noopener noreferrer"
          title="Créer ton skin dofus"
          className="text-anthracite border-anthracite hover:border-anthracite-lit h-fit rounded-lg border-4 px-8 py-3 text-xl font-medium uppercase transition-all hover:tracking-widest"
        >
          Skinator
        </a>
      </div>
    </div>
  );
}

/** Les réseaux de Barbe Douce. */
export function Socials() {
  return (
    <div className="relative mx-auto my-2 flex flex-wrap items-center justify-center gap-x-4">
      {reseaux.map((reseau) => (
        <a
          key={reseau.nom}
          href={reseau.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${reseau.nom} de Barbe Douce`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={reseau.logo}
            alt={reseau.nom}
            loading="lazy"
            className="h-12 transition-all duration-100 hover:-translate-y-1"
          />
        </a>
      ))}
    </div>
  );
}

/** Une vignette « logo + nom + rôle », partagée par les deux listes du bas. */
function Vignette({ logo, nom, role }: { logo: string; nom: string; role: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="" aria-hidden="true" loading="lazy" className="h-12 w-12" />
      <div className="flex flex-col items-start justify-center">
        <p className="text-ivory text-xl font-light uppercase">{nom}</p>
        <p className="text-ivory font-thin italic">{role}</p>
      </div>
    </>
  );
}

const CADRE =
  "bg-anthracite hover:bg-anthracite-lit flex items-center gap-x-4 p-2 transition-all hover:rounded-md";

/** Les sites remerciés, en bas de page. */
export function Partners() {
  return (
    <div className="flex flex-col items-center justify-center gap-x-16 gap-y-8 min-[800px]:flex-row">
      {partenaires.map((partenaire) => (
        <a
          key={partenaire.nom}
          href={partenaire.url}
          target="_blank"
          rel="noopener noreferrer"
          title={partenaire.nom}
          className={CADRE}
        >
          <Vignette logo={partenaire.logo} nom={partenaire.nom} role={partenaire.role} />
        </a>
      ))}
    </div>
  );
}

/** Les traducteurs bénévoles. Sans lien : ce sont des personnes, pas des sites. */
export function Translators() {
  return (
    <div className="flex flex-col items-center justify-center gap-x-16 gap-y-8 min-[800px]:flex-row">
      {traducteurs.map((traducteur) => (
        <div key={traducteur.nom} className={CADRE}>
          <Vignette logo={traducteur.drapeau} nom={traducteur.nom} role={traducteur.role} />
        </div>
      ))}
    </div>
  );
}

/** Le portrait de Barbe Douce, à droite de sa présentation. */
export function Portrait() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={images.portrait}
      alt="Portrait de Barbe Douce"
      loading="lazy"
      className="h-[22rem] max-[799px]:mx-auto max-[799px]:rounded-full"
    />
  );
}
