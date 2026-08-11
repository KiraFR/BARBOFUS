import type { Metadata } from "next";
import type { ReactNode } from "react";

import { images, reseaux, storageUrl } from "@/lib/assets";
import { alternatesPour } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Locale } from "@/messages";

// Cette page n'existe qu'en français : c'est la page « bio de réseaux »
// partagée sur les profils de Barbe Douce, et l'original
// (resources/views/socials.blade.php) n'a lui-même jamais été traduit. Le
// texte est donc en dur ci-dessous plutôt que passé par src/messages, et il
// ne faut PAS y ajouter de clés de traduction tant que la version française
// n'a pas, elle, été officiellement traduite en amont (choix éditorial, pas
// un oubli technique).

export const metadata: Metadata = {
  title: "Réseaux de Barbe Douce",
  ...alternatesPour("/socials"),
};

/**
 * URL d'un réseau déjà déclaré dans `reseaux` (src/lib/assets.ts), pour ne
 * pas la recopier à la main quand elle correspond exactement à celle de la
 * page d'origine. Certains réseaux de la page d'origine pointent vers une
 * autre URL que celle de `reseaux` (Instagram, X, Discord) : ceux-là restent
 * écrits en dur plus bas, avec un commentaire, plutôt que d'être forcés dans
 * ce tableau.
 */
const urlReseau = (nom: (typeof reseaux)[number]["nom"]) =>
  reseaux.find((reseau) => reseau.nom === nom)!.url;

/** Style commun aux cartes de liens : bordure dorée, halo au survol. */
function ReseauLien({
  href,
  vedette = false,
  children,
}: {
  href: string;
  /** Cartes « mises en avant » : halo doré visible en permanence, sans fond. */
  vedette?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="gold-gradient group relative rounded-[14px] p-[2px]"
    >
      <span
        aria-hidden="true"
        className={cn(
          "gold-gradient absolute rounded-[14px] blur-lg",
          vedette
            ? "inset-1 opacity-40"
            : "inset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-40",
        )}
      />
      <div
        className={cn(
          "relative flex items-center space-x-3 rounded-xl p-3 transition-all",
          !vedette && "bg-anthracite-lit",
        )}
      >
        {children}
      </div>
    </a>
  );
}

/** Classe commune aux icônes (SVG ou image) de chaque carte. */
const ICONE = "h-5 min-[500px]:h-8 text-ivory";

export default async function SocialsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Le paramètre n'est pas utilisé (page monolingue), mais on l'attend tout
  // de même : Next 16 fournit `params` comme une promesse sur toutes les
  // pages de `[locale]`, et il faut la consommer pour rester cohérent avec
  // le reste du routage.
  await params;

  return (
    // Sur le site actuel, cette page utilise la mise en page « empty-views »
    // de Laravel : sans en-tête ni navigation, la carte est centrée dans tout
    // le viewport grâce à un padding calculé sur mesure. Ici, la page passe
    // par la mise en page commune (en-tête, navigation, pied de page) : la
    // carte est donc simplement centrée dans l'espace de contenu disponible,
    // plutôt que de reproduire ce calcul devenu sans objet.
    <main className="flex w-full flex-1 items-center justify-center bg-black/10 px-2 py-16">
      <div className="border-ivory/10 bg-anthracite mx-auto flex w-[min(26rem,100vw)] flex-col items-center rounded-xl border p-8 px-2 shadow-2xl min-[500px]:px-8">
        {/* Logo */}
        <a
          href={urlReseau("Twitch")}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-gradient relative inline-flex aspect-square items-center justify-center rounded-full p-1 shadow-xl"
        >
          {/* Le halo doré et le badge LIVE de l'original changent d'état en
              JS (appel à decapi.me toutes les 30 secondes pour savoir si le
              stream est en direct). Cette page étant un composant serveur
              statique, ce comportement n'est pas reproduit : on garde le
              halo doré, sans le badge « LIVE » qui serait trompeur s'il
              restait affiché en permanence. */}
          <span
            aria-hidden="true"
            className="gold-gradient absolute inset-0 rounded-full opacity-40 blur-xl"
          />
          <div className="bg-anthracite relative flex h-[9.5rem] w-full items-center justify-center rounded-full p-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={storageUrl("images/misc_ui/barbed_pp1.png")}
              alt=""
              aria-hidden="true"
              className="absolute h-full max-w-full rounded-full p-2"
            />
          </div>
        </a>

        {/* Présentation */}
        <h2 className="mt-4 text-[2rem] tracking-wider">BARBE DOUCE</h2>
        <p className="text-inactive text-[0.75rem] font-light min-[500px]:text-sm">
          Streamer chill | Joueur de RPG | Good vibes only
        </p>

        {/* Liens */}
        <div className="mt-12 flex w-full flex-col gap-y-4">
          <ReseauLien href="https://barbofus.com/planning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
            <p className="flex-1 text-[1.15rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.25rem]">
              Le planning de la chaine !
            </p>
          </ReseauLien>

          <ReseauLien href="https://barbofus.com/">
            {/* L'original pointe vers le favicon du site (asset('favicon.ico')),
                qui n'est pas un chemin de /storage : storageUrl() produirait
                une URL cassée. Le logo Barbofus, déjà exporté par assets.ts,
                identifie la même marque sans introduire d'URL à la main. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.logo} alt="" aria-hidden="true" className={ICONE} />
            <p className="flex-1 text-[1.375rem] transition-all group-hover:tracking-wider">
              Barbofus
            </p>
          </ReseauLien>

          <ReseauLien href={urlReseau("TikTok")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
            </svg>
            <p className="flex-1 text-[1.1rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.25rem]">
              Tiktok - Q&amp;R et Gameplay
            </p>
          </ReseauLien>

          <ReseauLien href={urlReseau("Twitch")} vedette>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
              <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
            </svg>
            <p className="text-anthracite flex-1 text-[1.25rem] font-bold transition-all group-hover:tracking-wider">
              Twitch LIVE!
            </p>
          </ReseauLien>

          <ReseauLien href={urlReseau("Youtube")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
            <p className="flex-1 text-[1.15rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.25rem]">
              YouTube - Tuto &amp; Build
            </p>
          </ReseauLien>

          {/* L'original pointe vers x.com/DouceBarbe, alors que `reseaux`
              référence twitter.com/DouceBarbe : les deux domaines ne
              redirigent pas forcément de façon identique, donc on garde le
              lien exact de la page d'origine plutôt que de forcer la
              réutilisation de `reseaux`. */}
          <ReseauLien href="https://x.com/DouceBarbe">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
            <p className="flex-1 text-[1rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.125rem]">
              X (Twitter) - Actu&apos; du Stream
            </p>
          </ReseauLien>

          {/* Même remarque que pour X : l'original pointe vers
              instagram.com/barbe___douce, alors que `reseaux` référence
              instagram.com/barbe.douce.twitch — un compte différent. On garde
              le lien exact de la page d'origine. */}
          <ReseauLien href="https://www.instagram.com/barbe___douce/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
            <p className="flex-1 text-[1.2rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.375rem]">
              Instagram - Tout neuf
            </p>
          </ReseauLien>

          {/* Idem : discord.com/invite/YKHc4RD (original) plutôt que
              discord.gg/YKHc4RD (`reseaux`) — même salon, lien différent. */}
          <ReseauLien href="https://discord.com/invite/YKHc4RD">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
            </svg>
            <p className="flex-1 text-[1.05rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.125rem]">
              Discord - Rejoins la Taverne
            </p>
          </ReseauLien>

          <div className="border-inactive mx-auto my-4 h-0 w-3/4 border-b" />

          <ReseauLien href="https://store.ankama.com/fr/729-dofus" vedette>
            {/* Seule image de la page qui porte une information propre :
                le mot « Ankama » n'apparaît nulle part ailleurs dans le
                texte de cette carte. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={storageUrl("images/misc_ui/logo-ankama.png")}
              alt="Ankama"
              className="h-5 min-[500px]:w-8"
            />
            <p className="text-anthracite flex-1 text-[1.25rem] font-bold transition-all group-hover:tracking-wider">
              <span className="text-[1rem] font-light tracking-normal group-hover:tracking-normal">
                Code créateur:
              </span>{" "}
              BARBEDOUCE
            </p>
          </ReseauLien>

          <ReseauLien href="https://www.topachat.com/setup/BARBE__DOUCE?mtm_campaign=mkstrm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className={ICONE}
              viewBox="0 0 16 16"
            >
              <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
            </svg>
            <p className="flex-1 text-[1rem] transition-all group-hover:tracking-wider min-[500px]:text-[1.25rem]">
              TopAchat - Partenaire
            </p>
          </ReseauLien>
        </div>

        {/* Footer */}
        <p className="text-inactive mt-6 text-sm font-light">barbofus.com/socials</p>
      </div>
    </main>
  );
}
