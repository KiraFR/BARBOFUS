/**
 * Notifications de démonstration pour la cloche de l'en-tête.
 *
 * Reproduit ce que rend `NotificationsList` (Livewire) côté Laravel — mais
 * uniquement les deux gabarits demandés,
 * `resources/views/components/notification/skin-posted.blade.php` et
 * `skin-refused.blade.php`. Les havre-sacs ont leurs propres gabarits
 * (`haven-bag-posted`, `haven-bag-refused`) mais ne sont pas repris ici.
 *
 * Ce jeu de données remplacera un appel à l'API le jour où elle existera :
 * côté Laravel, l'équivalent est la relation `notifications()` du modèle
 * `User`, exposée en HTTP par un futur `GET /notifications` — l'écran actuel
 * (`notifications-list.blade.php`) l'interroge directement en Livewire, il
 * n'y a pas encore de route HTTP dédiée à porter ici telle quelle.
 *
 * Les identifiants et noms de skins sont ceux de `fixtures/skins.ts`, pour
 * que les liens « Clique ici pour le modifier » pointent vers des fiches qui
 * existent réellement dans la démo.
 */

/** Les deux gabarits de notification repris depuis le Laravel. */
export type NotificationType = "skin-posted" | "skin-refused";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  /** Le skin concerné : sert à construire le lien vers sa fiche. */
  skinId: number;
  /** Souvent nul : beaucoup de skins sont publiés sans titre (cf. fixtures/skins.ts). */
  skinName: string | null;
  /** Nom de la classe, injecté dans le message (paramètre `:race` côté Laravel). */
  breedName: string;
  /** Motif du refus, saisi par le staff. Uniquement pour "skin-refused". */
  refusedReason: string | null;
  /** Date de création, au format ISO 8601. */
  createdAt: string;
  /** Date de lecture, ou `null` tant que la notification n'a pas été marquée comme lue. */
  readAt: string | null;
}

export const notificationsDemo: NotificationItem[] = [
  {
    id: "1",
    type: "skin-posted",
    skinId: 94878,
    skinName: "Vaelaerys v5",
    breedName: "Crâ",
    refusedReason: null,
    createdAt: "2026-08-11T09:12:00.000000Z",
    readAt: null,
  },
  {
    id: "2",
    type: "skin-refused",
    skinId: 94879,
    skinName: "hupper",
    breedName: "Huppermage",
    refusedReason:
      "Les couleurs utilisées ne respectent pas la charte du concours Miss'Skin : merci de proposer une palette plus proche du thème de la semaine.",
    createdAt: "2026-08-10T21:19:27.000000Z",
    readAt: null,
  },
  {
    id: "3",
    type: "skin-posted",
    skinId: 94873,
    skinName: "Vaelaerys v1",
    breedName: "Crâ",
    refusedReason: null,
    createdAt: "2026-08-05T10:00:00.000000Z",
    readAt: "2026-08-05T18:32:00.000000Z",
  },
  {
    id: "4",
    type: "skin-refused",
    skinId: 94870,
    skinName: "walter white",
    breedName: "Steamer",
    refusedReason: "Ce skin reprend un design déjà posté par un autre membre de la communauté.",
    createdAt: "2026-07-30T09:15:00.000000Z",
    readAt: "2026-07-30T09:20:00.000000Z",
  },
];
