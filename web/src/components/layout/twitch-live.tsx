"use client";

import { useEffect, useState } from "react";

import { storageUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Indicateur de direct Twitch de Barbe Douce.
 *
 * Porté de deux endroits du site Laravel, qui partagent le même état :
 * - `resources/views/components/utils/twitch-embed.blade.php` — le cadre de
 *   la page d'accueil (pastille + texte "Stream OFF/ON" + lien + image
 *   d'attente + cadre à dégradé doré) ;
 * - `resources/views/socials.blade.php` — le badge "LIVE" et le halo doré
 *   (or vs cœur) autour de l'avatar de la page /socials.
 *
 * Les deux tiennent sur le même mécanisme de vérification, repris tel quel :
 * une requête à decapi.me toutes les 30 secondes.
 */

const TWITCH_CHANNEL = "barbe___douce";
const TWITCH_CHANNEL_URL = `https://www.twitch.tv/${TWITCH_CHANNEL}`;

/**
 * API tierce (non officielle, non affiliée à Twitch) qui renvoie l'uptime
 * d'une chaîne en texte brut : une durée si elle est en direct, une phrase
 * contenant "offline" sinon. Centralisée ici pour ne changer qu'un seul
 * endroit si elle disparaît ou change de forme.
 */
const TWITCH_UPTIME_API_URL = `https://decapi.me/twitch/uptime?channel=${TWITCH_CHANNEL}`;

/** Fréquence d'interrogation, identique à l'original. */
const INTERVALLE_VERIFICATION_MS = 30_000;

/**
 * Interroge decapi.me pour savoir si Barbe Douce est en direct.
 *
 * Départ toujours "hors ligne" : impossible d'annoncer un direct qu'on n'a
 * pas encore vérifié. Si l'appel échoue (API tierce en panne, requête
 * bloquée par un bloqueur de pub, utilisateur hors ligne...), on reste
 * simplement sur "hors ligne", sans rien casser ni afficher d'erreur.
 */
function useTwitchEnDirect(): boolean {
  const [enDirect, setEnDirect] = useState(false);

  useEffect(() => {
    // Évite d'appliquer une réponse arrivée après le démontage du composant.
    let annule = false;

    async function verifier() {
      try {
        const reponse = await fetch(TWITCH_UPTIME_API_URL);
        const texte = await reponse.text();
        if (!annule) {
          setEnDirect(!texte.toLowerCase().includes("offline"));
        }
      } catch {
        if (!annule) {
          setEnDirect(false);
        }
      }
    }

    verifier();
    const intervalId = window.setInterval(verifier, INTERVALLE_VERIFICATION_MS);

    return () => {
      annule = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return enDirect;
}

/**
 * Le cadre "lecteur" de la page d'accueil : pastille + texte Stream OFF/ON,
 * lien vers la chaîne, image d'attente, cadre à dégradé doré.
 *
 * Le lecteur vidéo Twitch embarqué (le script tiers `embed.twitch.tv`) n'est
 * lui pas repris ici — c'est un second chantier, indépendant de l'indicateur
 * de direct. En attendant ce lecteur, ce cadre pointe vers la chaîne.
 */
export function TwitchLive({ className }: { className?: string }) {
  const enDirect = useTwitchEnDirect();

  return (
    <div className={cn("relative aspect-video w-[min(90vw,50rem)]", className)}>
      {/* Bandeau (pastille + lien) et dégradé doré, débordant légèrement du
          cadre de l'image pour former la bordure. */}
      <div className="bg-anthracite absolute -top-[23px] -left-[3px] z-0 flex h-[calc(100%+26px)] w-[calc(100%+6px)] justify-between rounded-md">
        <div className="flex items-center gap-x-1.5 px-2">
          <span
            aria-hidden="true"
            className={cn("h-3 w-3 rounded-full", enDirect ? "bg-emerald-lit" : "bg-heart-lit")}
          />
          <p className="text-ivory text-[0.9rem] font-thin">
            Stream <span className="font-normal">{enDirect ? "ON" : "OFF"}</span>
          </p>
        </div>

        <a
          href={TWITCH_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-text hover:text-gold-text-lit self-center pr-2 text-[0.8rem] font-thin transition-all hover:-translate-y-1"
        >
          Rejoins-moi sur Twitch !
        </a>

        <div className="gold-gradient absolute top-[20px] z-10 h-[calc(100%-20px)] w-full rounded-md" />
      </div>

      {/* Image d'attente, affichée tant que le lecteur n'est pas intégré. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={storageUrl("images/misc_ui/Stream_Offlin.avif")}
        alt=""
        aria-hidden="true"
        className="relative z-20 h-full w-full rounded-[4px] object-cover"
      />
    </div>
  );
}

/**
 * La pastille d'état de l'en-tête du planning : un point et un mot, en lien
 * vers la chaîne.
 *
 * L'original affiche « En direct » en permanence, avec un point qui clignote —
 * aucun script ne vient jamais corriger ce texte, si bien que la page annonce
 * un direct même quand la chaîne est éteinte. On le branche ici sur le même
 * mécanisme que le reste du site : annoncer un direct qui n'a pas lieu, c'est
 * exactement ce qu'un site ne doit pas faire.
 */
export function TwitchStatut({ className }: { className?: string }) {
  const enDirect = useTwitchEnDirect();

  return (
    <a
      href={TWITCH_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "from-gold-dark/10 to-gold-lit/10 border-gold-dark/20 flex items-center justify-center gap-2.5 rounded-full border bg-gradient-to-r px-4 py-2 backdrop-blur-sm transition-all hover:brightness-125",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5 rounded-full shadow-lg",
          enDirect ? "gold-gradient shadow-gold-dark/50 animate-pulse" : "bg-inactive",
        )}
      />
      <span className="text-ivory/80 text-sm md:text-base">
        {enDirect ? "En direct" : "Hors ligne"}
      </span>
    </a>
  );
}

/**
 * L'avatar de la page /socials : halo doré et badge "LIVE" quand Barbe Douce
 * est en direct, halo "cœur" sinon. Remplace l'avatar statique qui ne
 * reproduisait pas ce comportement (composant serveur oblige).
 */
export function TwitchLiveAvatar({ className }: { className?: string }) {
  const enDirect = useTwitchEnDirect();

  return (
    <a
      href={TWITCH_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative inline-flex aspect-square items-center justify-center rounded-full p-1 shadow-xl",
        enDirect ? "gold-gradient" : "heart-gradient",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full opacity-40 blur-xl",
          enDirect ? "gold-gradient" : "heart-gradient",
        )}
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

      {enDirect && (
        <div
          aria-hidden="true"
          className="heart-gradient text-ivory absolute right-2 bottom-2 z-20 flex animate-pulse items-center gap-1.5 rounded-full px-2 py-1 text-xs font-bold tracking-wide uppercase shadow-lg"
        >
          <span className="bg-ivory h-1.5 w-1.5 animate-pulse rounded-full" />
          LIVE
        </div>
      )}

      {/* L'état est annoncé en texte, pas seulement par la couleur du halo
          ou la présence du badge (masqué aux lecteurs d'écran ci-dessus). */}
      <span className="sr-only">{enDirect ? "En direct sur Twitch" : "Hors ligne"}</span>
    </a>
  );
}
