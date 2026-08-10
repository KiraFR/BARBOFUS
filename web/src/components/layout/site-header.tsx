import Link from "next/link";

import { images } from "@/lib/assets";

/**
 * En-tête illustré : décor de donjon, logo au centre, et la découpe ivoire en
 * V qui fait la transition vers le corps de la page.
 *
 * Porté de `resources/views/components/main-header.blade.php`. Comme
 * l'original, il ne s'affiche que si l'écran est à la fois assez haut et assez
 * large (900 px de haut, 901 px de large) : en dessous, la place est trop
 * comptée et seule la barre de navigation subsiste.
 *
 * Ce qui n'est pas repris : les six créatures (Dofus, Tofu, Champ Champ,
 * Wabbit) posées le long de la pente. Leur position verticale est calculée en
 * JavaScript à partir de leur abscisse et de la pente du V — sans ce calcul
 * elles s'alignent toutes en bas et l'effet tombe à plat. À refaire
 * proprement, en CSS si possible ; l'en-tête tient debout sans elles.
 */
export function SiteHeader() {
  return (
    <header
      className={cnHeader}
      // Le décor est purement illustratif : rien à annoncer aux lecteurs
      // d'écran, le logo qu'il entoure est déjà un lien nommé.
    >
      {/* Décor de fond, avec fondu vers l'anthracite sur les deux bords. */}
      <div className="bg-anthracite absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-[min(100vw,1500px)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.headerBackground}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1500}
            height={783}
            className="absolute bottom-[-200px] left-0 max-w-none"
          />
          <div className="from-anthracite absolute top-0 left-0 z-10 h-full w-[300px] bg-gradient-to-r to-transparent" />
          <div className="from-anthracite absolute top-0 right-0 z-10 h-full w-[300px] bg-gradient-to-l to-transparent" />
        </div>
      </div>

      {/* Logo, sur un voile sombre qui le détache du décor. */}
      <div className="relative z-10 flex h-full justify-center">
        <div className="relative flex h-full max-w-1/2 justify-center overflow-hidden">
          <div className="absolute -z-10 h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.65)_25%,rgba(0,0,0,.65)_75%,transparent_100%)]" />
          <Link href="/" title="Accueil Barbofus">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.logo}
              alt="Barbofus"
              loading="lazy"
              className="h-full"
              draggable={false}
            />
          </Link>
        </div>
      </div>

      {/* Les deux pentes ivoire, qui forment un V très ouvert. */}
      <div className="absolute bottom-[-1px] left-0 z-10 h-[min(2vw,30%)] w-1/2">
        <div className="bg-ivory h-full w-full [clip-path:polygon(0%_0%,100%_80%,100%_100%,0%_100%)]" />
      </div>
      <div className="absolute right-0 bottom-[-1px] z-10 h-[min(2vw,30%)] w-[calc(50%+1px)]">
        <div className="bg-ivory h-full w-full [clip-path:polygon(0%_80%,100%_0%,100%_100%,0%_100%)]" />
      </div>
    </header>
  );
}

/**
 * Les conditions d'affichage de l'en-tête, isolées pour la lisibilité : masqué
 * par défaut, révélé seulement au-delà de 900 px de haut et 901 px de large.
 */
const cnHeader = [
  "bg-ivory relative z-20 hidden h-0 w-full overflow-hidden",
  "[@media(min-height:900px)_and_(min-width:901px)]:block",
  "[@media(min-height:900px)_and_(min-width:901px)]:h-[15vh]",
  "[@media(min-height:900px)_and_(min-width:901px)]:min-h-[150px]",
].join(" ");
