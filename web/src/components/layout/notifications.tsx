"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { notificationsDemo, type NotificationItem } from "@/lib/fixtures/notifications";
import { cn } from "@/lib/utils";
import { lien, type Locale } from "@/messages";

/**
 * La cloche de notifications, en haut à droite — réservée à un membre
 * connecté. Ce composant ne connaît pas lui-même l'état de connexion : c'est
 * à l'appelant de ne le monter que dans ce cas, comme il le fait déjà pour
 * les entrées réservées aux membres dans `MainNav`.
 *
 * Portée de `resources/views/livewire/notifications/notifications-list.blade.php`
 * et des gabarits `resources/views/components/notification/{template,skin-posted,skin-refused}.blade.php` :
 * une pastille sur la cloche annonce les notifications non lues, le panneau
 * déroulant liste chaque notification avec un style selon son type (skin
 * publié en vert, skin refusé en rouge avec son motif), et un bouton marque
 * chacune — ou toutes — comme lue.
 *
 * Ce qui change par rapport à l'original :
 *   - Les havre-sacs ont leurs propres gabarits côté Laravel mais ne sont pas
 *     repris ici : seuls les skins le sont, comme demandé.
 *   - "Marquer comme lu" et "Supprimer" ne font aucun appel réseau : ils ne
 *     modifient que l'état local du composant. Pas de faux message de succès
 *     serveur — juste un changement d'apparence immédiat, cohérent avec ce
 *     que fera l'API une fois branchée (voir le commentaire de
 *     `fixtures/notifications.ts`).
 *   - Comme l'original (`@if(count($notifications) > 0)`), la cloche
 *     disparaît quand il ne reste plus aucune notification — y compris après
 *     un "Tout supprimer" ici, puisqu'il n'y a rien d'autre pour la repeupler
 *     tant que l'API n'est pas branchée.
 */
export function Notifications({ locale }: { locale: Locale }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsDemo);
  const [ouvert, setOuvert] = useState(false);
  const conteneurRef = useRef<HTMLDivElement>(null);

  const nonLues = notifications.filter((notification) => notification.readAt === null).length;

  // Fermeture au clic extérieur ou à Échap, comme le sélecteur de langue.
  useEffect(() => {
    if (!ouvert) return;

    function surClicExterieur(evenement: MouseEvent) {
      if (!conteneurRef.current?.contains(evenement.target as Node)) {
        setOuvert(false);
      }
    }

    function surEchap(evenement: KeyboardEvent) {
      if (evenement.key === "Escape") setOuvert(false);
    }

    document.addEventListener("mousedown", surClicExterieur);
    document.addEventListener("keydown", surEchap);
    return () => {
      document.removeEventListener("mousedown", surClicExterieur);
      document.removeEventListener("keydown", surEchap);
    };
  }, [ouvert]);

  function marquerCommeLue(id: string) {
    setNotifications((liste) =>
      liste.map((notification) =>
        notification.id === id
          ? { ...notification, readAt: new Date().toISOString() }
          : notification,
      ),
    );
  }

  function toutMarquerCommeLu() {
    const maintenant = new Date().toISOString();
    setNotifications((liste) =>
      liste.map((notification) =>
        notification.readAt ? notification : { ...notification, readAt: maintenant },
      ),
    );
  }

  function supprimer(id: string) {
    setNotifications((liste) => liste.filter((notification) => notification.id !== id));
  }

  function toutSupprimer() {
    setNotifications([]);
  }

  // Comme l'original : pas de notification, pas de cloche.
  if (notifications.length === 0) return null;

  return (
    <div
      ref={conteneurRef}
      className="fixed top-3 right-28 z-50 flex flex-col items-end min-[1301px]:top-12"
    >
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-haspopup="true"
        aria-controls="panneau-notifications"
        aria-label={
          nonLues > 0
            ? `Notifications, ${nonLues} non lue${nonLues > 1 ? "s" : ""}`
            : "Notifications"
        }
        className="text-ivory relative transition-all hover:opacity-75 active:scale-90"
      >
        {nonLues > 0 ? (
          <span
            aria-hidden="true"
            className="bg-heart-lit text-ivory absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.65rem] font-bold"
          >
            {nonLues > 9 ? "9+" : nonLues}
          </span>
        ) : null}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Annoncé aux lecteurs d'écran dès que le compte change, sans dépendre
          du survol ou de l'ouverture du panneau. */}
      <span role="status" aria-live="polite" className="sr-only">
        {nonLues > 0
          ? `${nonLues} notification${nonLues > 1 ? "s" : ""} non lue${nonLues > 1 ? "s" : ""}`
          : "Aucune notification non lue"}
      </span>

      <div
        id="panneau-notifications"
        aria-label="Notifications"
        className={cn(
          "bg-anthracite-lit mt-1 w-80 max-w-[90vw] rounded-md p-2 shadow-xl transition-opacity",
          ouvert ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-baseline justify-between px-1 pb-1 text-sm">
          <button
            type="button"
            onClick={toutMarquerCommeLu}
            className="text-gold-text hover:text-gold-text-lit transition-colors"
          >
            Tout marquer comme lu
          </button>
          <button
            type="button"
            onClick={toutSupprimer}
            className="text-gold-text hover:text-gold-text-lit transition-colors"
          >
            Tout supprimer
          </button>
        </div>

        <ul className="max-h-[70vh] overflow-auto">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              locale={locale}
              onMarquerCommeLue={() => marquerCommeLue(notification.id)}
              onSupprimer={() => supprimer(notification.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function NotificationCard({
  notification,
  locale,
  onMarquerCommeLue,
  onSupprimer,
}: {
  notification: NotificationItem;
  locale: Locale;
  onMarquerCommeLue: () => void;
  onSupprimer: () => void;
}) {
  const lue = notification.readAt !== null;
  const titre = notification.skinName ?? `ID#${notification.skinId}`;

  return (
    <li
      className={cn(
        "mb-1 w-full rounded-md p-2 text-left shadow-md last:mb-0",
        lue ? "bg-anthracite-lit" : "bg-anthracite hover:bg-anthracite-lit transition-colors",
      )}
    >
      <div className={cn("flex items-start gap-x-3", lue && "opacity-40")}>
        {notification.type === "skin-posted" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
            className="text-emerald-lit h-10 w-10 shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
            className="text-heart-lit h-10 w-10 shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}

        <div className="min-w-0">
          <p className="font-normal">
            {notification.type === "skin-posted" ? "Skin publié" : "Skin refusé"}{" "}
            <span className="text-inactive italic">{titre}</span>
          </p>

          {notification.type === "skin-posted" ? (
            <p className="pl-2 text-sm font-light">
              Bien joué ! Ton skin en <span className="font-normal">{notification.breedName}</span>{" "}
              a été validé par un membre du staff.
            </p>
          ) : (
            <p className="pl-2 text-sm font-light">
              Ton skin en <span className="font-normal">{notification.breedName}</span> a été refusé
              par un membre du staff : « {notification.refusedReason} »{" "}
              <Link
                href={lien(locale, `/skin/${notification.skinId}`)}
                className="text-gold-text hover:text-gold-text-lit font-thin"
              >
                Clique ici pour le modifier
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-1">
        <p className="text-inactive text-sm">{formatDate(notification.createdAt, locale)}</p>

        {lue ? (
          <button
            type="button"
            onClick={onSupprimer}
            className="text-gold-text hover:text-gold-text-lit text-sm transition-colors"
          >
            Supprimer
          </button>
        ) : (
          <button
            type="button"
            onClick={onMarquerCommeLue}
            className="text-gold-text hover:text-gold-text-lit text-sm transition-colors"
          >
            Marquer comme lu
          </button>
        )}
      </div>
    </li>
  );
}

/**
 * Date absolue, formatée dans la langue courante.
 *
 * `dateRelative` (src/lib/dates.ts) calcule un écart par rapport à
 * `Date.now()` — appelée depuis un composant client, elle donnerait un
 * résultat différent au rendu serveur et à l'hydratation (l'horloge tourne
 * entre les deux), ce que React signale comme une erreur. `Intl.DateTimeFormat`
 * appliqué à une date fixe est en revanche déterministe : mêmes entrées,
 * même résultat, des deux côtés.
 */
function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(iso),
  );
}
