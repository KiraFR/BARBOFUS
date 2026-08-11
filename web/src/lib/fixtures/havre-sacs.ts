import type { HavenBag, HavenBagTheme } from "@/types/api";

/**
 * Les havre-sacs et thèmes de repli, relevés en production le 11 août 2026.
 *
 * Ne servent que si la production ne répond pas — la galerie va normalement
 * chercher les vrais, voir `src/lib/havre-sacs-source.ts`.
 *
 * Recopiés tels quels : certains havre-sacs sont publiés sans titre (`name` à
 * `null`), et c'est un cas fréquent qu'il faut voir à l'écran plutôt que de le
 * découvrir en production.
 *
 * Les quarante-trois thèmes, eux, sont la liste complète : ils viennent du jeu
 * et ne bougent qu'à chaque mise à jour d'Ankama.
 */

export const havreSacsFixtures: HavenBag[] = [
  {
    id: 394,
    name: "Barak bar",
    image_path: "https://barbofus.com/storage/images/haven-bags/17858337021962614519.png",
    user_name: "Gelo",
    theme_name: "Brâkmar",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141057.png",
  },
  {
    id: 393,
    name: "Beffroi des Corolles Radieuses",
    image_path: "https://barbofus.com/storage/images/haven-bags/17849797351455959310.png",
    user_name: "Sirolalo",
    theme_name: "Ephedrya",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141059.png",
  },
  {
    id: 392,
    name: null,
    image_path: "https://barbofus.com/storage/images/haven-bags/17846449701361281666.png",
    user_name: "Gobrunk",
    theme_name: "Coqueline",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141030.png",
  },
  {
    id: 391,
    name: "Casino Royale",
    image_path: "https://barbofus.com/storage/images/haven-bags/1784227515925411853.png",
    user_name: "Pocket-Rocket",
    theme_name: "Casino",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141028.png",
  },
  {
    id: 390,
    name: "Mi casa full equipada PB",
    image_path: "https://barbofus.com/storage/images/haven-bags/1784048860207986629.png",
    user_name: "Hiddenblood - Kourial",
    theme_name: "Ephedrya",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141059.png",
  },
  {
    id: 389,
    name: null,
    image_path: "https://barbofus.com/storage/images/haven-bags/17836354682026068185.png",
    user_name: "Skarwon",
    theme_name: "Ephedrya",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141059.png",
  },
  {
    id: 388,
    name: "été sous un oranger",
    image_path: "https://barbofus.com/storage/images/haven-bags/17835124101754655913.png",
    user_name: "Kiyohiko",
    theme_name: "Almanax Estival",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141063.png",
  },
  {
    id: 387,
    name: null,
    image_path: "https://barbofus.com/storage/images/haven-bags/178327668990594177.png",
    user_name: "mathéo",
    theme_name: "Anomalie Temporelle",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141025.png",
  },
  {
    id: 385,
    name: null,
    image_path: "https://barbofus.com/storage/images/haven-bags/1783263236466665078.png",
    user_name: "Lawys",
    theme_name: "Ephedrya",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/141059.png",
  },
  {
    id: 384,
    name: null,
    image_path: "https://barbofus.com/storage/images/haven-bags/17830082191363636361.png",
    user_name: "Dallex",
    theme_name: "Pandala",
    popocket_icon_path: "https://static.barbofus.com/images/icons/haven_bags/popockets/no_icon.png",
  },
];

export const themesFixtures: HavenBagTheme[] = [
  {
    id: 1,
    name: "Kerubim",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791424.jpg",
  },
  {
    id: 2,
    name: "Amakna",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793472.jpg",
  },
  {
    id: 3,
    name: "Nowel",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795520.jpg",
  },
  {
    id: 4,
    name: "Allister",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791426.jpg",
  },
  {
    id: 5,
    name: "Printemps",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791428.jpg",
  },
  {
    id: 6,
    name: "Sain Ballotin",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795522.jpg",
  },
  {
    id: 7,
    name: "Hiver",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795524.jpg",
  },
  {
    id: 8,
    name: "Wabbit",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793474.jpg",
  },
  {
    id: 9,
    name: "Taverne",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791430.jpg",
  },
  {
    id: 10,
    name: "Casino",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793478.jpg",
  },
  {
    id: 11,
    name: "Princesse",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795526.jpg",
  },
  {
    id: 12,
    name: "Pwâk",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791432.jpg",
  },
  {
    id: 13,
    name: "Fin Patraque",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793480.jpg",
  },
  {
    id: 14,
    name: "Fanfon",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795528.jpg",
  },
  {
    id: 15,
    name: "Été",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791434.jpg",
  },
  {
    id: 16,
    name: "Steamer",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791436.jpg",
  },
  {
    id: 17,
    name: "Sidimote",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793484.jpg",
  },
  {
    id: 18,
    name: "Halouine",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795532.jpg",
  },
  {
    id: 19,
    name: "Crypte",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791438.jpg",
  },
  {
    id: 20,
    name: "Pyramide",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793482.jpg",
  },
  {
    id: 21,
    name: "Harebourg",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795530.jpg",
  },
  {
    id: 22,
    name: "Champs",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793486.jpg",
  },
  {
    id: 23,
    name: "Trithon",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791440.jpg",
  },
  {
    id: 24,
    name: "Cale des Pirates",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795534.jpg",
  },
  {
    id: 25,
    name: "Moon",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793488.jpg",
  },
  {
    id: 26,
    name: "Coqueline",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795536.jpg",
  },
  {
    id: 27,
    name: "Bateau des Forbans",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791442.jpg",
  },
  {
    id: 28,
    name: "Anomalie Temporelle",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793490.jpg",
  },
  {
    id: 29,
    name: "Stade Bontarien",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795538.jpg",
  },
  {
    id: 30,
    name: "Stade Brâkmarien",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791444.jpg",
  },
  {
    id: 31,
    name: "Ankama",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793492.jpg",
  },
  {
    id: 32,
    name: "Eliocalypse",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791448.jpg",
  },
  {
    id: 33,
    name: "Brâkmar",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791450.jpg",
  },
  {
    id: 34,
    name: "Bonta",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793498.jpg",
  },
  {
    id: 35,
    name: "Mercenaire",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791452.jpg",
  },
  {
    id: 36,
    name: "Ephedrya",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793500.jpg",
  },
  {
    id: 37,
    name: "Almanax Printanier",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793502.jpg",
  },
  {
    id: 38,
    name: "Almanax Estival",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795550.jpg",
  },
  {
    id: 39,
    name: "Almanax Automnal",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795548.jpg",
  },
  {
    id: 40,
    name: "Almanax Hivernal",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162791454.jpg",
  },
  {
    id: 41,
    name: "Pandala",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162793496.jpg",
  },
  {
    id: 42,
    name: "Sucreries",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795544.jpg",
  },
  {
    id: 43,
    name: "Forêt Maléfique",
    image_path: "https://barbofus.com/storage/images/icons/haven_bags/backgrounds/162795546.jpg",
  },
];
