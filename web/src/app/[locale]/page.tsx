import type { Metadata } from "next";

import {
  GoldBand,
  HomeActions,
  HomeCarousel,
  Partners,
  Portrait,
  Socials,
  Translators,
} from "@/components/home/home-sections";
import { TwitchLive } from "@/components/layout/twitch-live";
import { estConnecte } from "@/lib/auth";
import { chargerSkins } from "@/lib/skins-source";
import { texteEnrichi } from "@/lib/texte";
import { alternatesPour } from "@/lib/seo";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  ...alternatesPour("/"),
};

/**
 * Chiffres affichés dans la présentation.
 *
 * Relevés en production le 11 août 2026 : le site les calcule en base et les
 * arrondit à la dizaine inférieure. Ils viendront de l'API le moment venu ;
 * en attendant ce sont de vraies valeurs, pas des chiffres inventés, mais
 * elles ne bougeront pas toutes seules.
 */
const COMPTEURS = { skinCount: "75350", userCount: "27190" } as const;

const TWITCH = "https://www.twitch.tv/barbe___douce";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getMessages(locale);
  const connecte = await estConnecte();
  const skins = await chargerSkins();

  return (
    <main className="w-full flex-1">
      <h1 className="mt-16 text-center text-[min(4rem,8vw)] font-normal uppercase">
        {t.titleHome}
      </h1>
      <h2 className="mt-2 mb-8 text-center text-2xl font-thin uppercase">{t.descriptionHome}</h2>

      <HomeCarousel skins={skins.slice(0, 10)} locale={locale} connecte={connecte} />

      <GoldBand className="mt-28 h-[20rem] min-[800px]:h-48">
        <HomeActions locale={locale} libelleGalerie={t.buttonSkinExplore} />
      </GoldBand>

      {/* Présentation de Barbe Douce. */}
      <h2 className="mt-32 text-center text-[min(4rem,7vw)] font-normal uppercase">
        {t.titleBarbe}
      </h2>
      <h3 className="-mt-2 mb-8 text-center text-2xl font-thin uppercase">{t.descriptionBarbe}</h3>

      {/*
        Indicateur de direct Twitch (pastille, texte Stream OFF/ON, lien vers
        la chaîne, image d'attente, cadre à dégradé doré) : voir
        src/components/layout/twitch-live.tsx. Le lecteur vidéo embarqué
        lui-même (le script tiers `embed.twitch.tv`) n'est lui pas porté :
        c'est un second chantier, et le même lecteur sert aussi dans la
        colonne de la galerie — autant le faire une seule fois, plus tard.
      */}
      <TwitchLive className="mx-auto mt-16" />

      <div className="mx-auto mt-16 flex w-[min(90vw,62.5rem)] flex-col justify-between gap-8 min-[800px]:flex-row">
        <div>
          <div className="text-ivory flex flex-col gap-y-4 text-xl font-thin [&_a]:inline-block [&_a]:transition-all [&_a]:text-gold-text hover:[&_a]:text-gold-text-lit hover:[&_a]:-skew-x-12">
            <p className="mb-4 font-normal uppercase">{t.titleBarbeDetails}</p>
            <p>• Mathieu - Barbe Douce</p>
            <p>
              • {t.descriptionBarbeDetails1}{" "}
              <a href={TWITCH} target="_blank" rel="noopener noreferrer">
                Twitch
              </a>
              ,{" "}
              <a href="https://www.ankama.com/fr" target="_blank" rel="noopener noreferrer">
                Ankama
              </a>{" "}
              &{" "}
              <a
                href="https://www.topachat.com/accueil/index.php?mtm_campaign=mkstrm"
                target="_blank"
                rel="noopener noreferrer"
              >
                TopAchat
              </a>
            </p>
            <p>
              • {t.descriptionBarbeDetails2}{" "}
              <a href={TWITCH} target="_blank" rel="noopener noreferrer">
                twitch.tv/barbe___douce
              </a>
            </p>
            <p>
              • {t.descriptionBarbeDetails3}{" "}
              <a href="mailto:mathieu.lehr@gmail.com?subject=Contact a partir du site Barbofus">
                mathieu.lehr@gmail.com
              </a>
            </p>
          </div>

          <Socials />
        </div>

        <Portrait />
      </div>

      {/* Présentation de l'éditeur Unity. */}
      <GoldBand className="text-anthracite my-28 py-20">
        <div className="mx-auto max-w-screen-xl px-2">
          <h2 className="text-center text-[min(4rem,8vw)] font-normal uppercase">{t.titleUnity}</h2>
          <div className="mt-8 flex flex-col gap-y-4 text-[min(1.25rem,4vw)]">
            <p>{texteEnrichi(t.descriptionUnity1, COMPTEURS)}</p>
            <p>{t.descriptionUnity2}</p>
            <p>{t.descriptionUnity3}</p>
            <p>{t.descriptionUnity4}</p>
            <p>{t.descriptionUnity5}</p>
          </div>
        </div>
      </GoldBand>

      {/* Remerciements. */}
      <h2 className="mt-32 mb-8 text-center text-[min(4rem,7vw)] font-normal uppercase">
        {t.titleThanks}
      </h2>
      <Partners />

      <h3 className="mt-8 mb-2 text-center text-3xl font-normal uppercase">{t.titleTranslation}</h3>
      <Translators />

      <div className="h-24" />
    </main>
  );
}
