import { images } from "@/lib/assets";

/**
 * Le podium du dernier concours Miss'Skin.
 *
 * Données réelles, relevées en production le 11 août 2026 sur
 * `GET /api/skin/{id}`. Le site les tire de la table `skin_winners`, dont il
 * prend les trois dernières lignes (`UnityLastWinners.php`) — c'est cet
 * endpoint-là qui remplacera ce fichier.
 *
 * L'ordre compte : premier, deuxième, troisième, chacun associé à son Dofus et
 * à la couleur de cadre correspondante.
 */
export interface Vainqueur {
  skinId: number;
  /** Nom du skin. */
  nom: string;
  /** Pseudo de l'auteur. */
  auteur: string;
  /** Chemin relatif à `/storage`. */
  image: string;
  /** L'image du Dofus remis au vainqueur. */
  dofus: string;
  /** La couleur du cadre, reprise du Dofus. */
  cadre: string;
}

export const vainqueursDemo: Vainqueur[] = [
  {
    skinId: 73467,
    nom: "LastOrigins#1458",
    auteur: "Taan-Meros",
    image: "images/skins/1777969565403775138.png",
    dofus: images.dofusOcre,
    cadre: "border-gold-text",
  },
  {
    skinId: 73497,
    nom: "ledecapitateur#1144",
    auteur: "shizurique",
    image: "images/skins/1777971395957717086.png",
    dofus: images.dofusEmeraude,
    cadre: "border-emerald-lit",
  },
  {
    skinId: 73387,
    nom: "NoahAllister#3180",
    auteur: "Noali",
    image: "images/skins/17779657381426148416.png",
    dofus: images.dofusCawotte,
    cadre: "border-cawotte-lit",
  },
];
