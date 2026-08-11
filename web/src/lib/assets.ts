/**
 * Images du site, servies en statique par la production.
 *
 * On pointe directement sur barbofus.com plutôt que de recopier les fichiers
 * dans le dépôt : ils y sont déjà, ils ne bougent pas, et ça évite d'avoir à
 * republier de l'imagerie Ankama (Tofu, Wabbit, Champ Champ, Dofus) sur un
 * dépôt public.
 *
 * Le jour de la bascule, ces URL désigneront le site lui-même — rien à
 * changer, tant que Laravel continue de servir `/storage`. Si un jour on veut
 * héberger ces images avec le front, il suffit de remplacer cette base par une
 * chaîne vide et de déposer les fichiers dans `public/`.
 *
 * Les images sont posées avec des balises <img> ordinaires plutôt qu'avec
 * next/image : ce sont des décors de taille fixe, et next/image sur un hôte
 * distant imposerait une configuration `remotePatterns` et ferait transiter
 * chaque image par l'optimiseur pour rien.
 */
const STORAGE = "https://barbofus.com/storage";

const BASE = `${STORAGE}/images/misc_ui`;

/**
 * Transforme un chemin rendu par l'API en URL affichable.
 *
 * L'API rend des chemins relatifs à `/storage` (« images/skins/1786….png »,
 * « images/icons/items/17627.webp »). Rendus, les skins comme les icônes
 * d'items passent par ici.
 */
export function storageUrl(chemin: string): string {
  return `${STORAGE}/${chemin.replace(/^\/+/, "")}`;
}

export const images = {
  logo: `${BASE}/Barbofus_Logo.webp`,
  headerBackground: `${BASE}/header-background.avif`,
  dofusOcre: `${BASE}/dofus_ocre.webp`,
  dofusEmeraude: `${BASE}/dofus_emeraude.webp`,
  dofusCawotte: `${BASE}/dofus_cawotte.webp`,
  tofu: `${BASE}/tofu.webp`,
  champchamp: `${BASE}/champchamp.webp`,
  wabbit: `${BASE}/wabbit.webp`,
  portrait: `${BASE}/portrait.avif`,
} as const;

/** Les réseaux de Barbe Douce, dans l'ordre du site. */
export const reseaux = [
  {
    nom: "TikTok",
    url: "https://www.tiktok.com/@barbe___douce",
    logo: `${BASE}/Logo_TikTok.png`,
  },
  {
    nom: "Instagram",
    url: "https://www.instagram.com/barbe.douce.twitch/",
    logo: `${BASE}/Logo_Instagram.webp`,
  },
  {
    nom: "Twitter",
    url: "https://twitter.com/DouceBarbe",
    logo: `${BASE}/logo-twitter-x.webp`,
  },
  {
    nom: "Youtube",
    url: "https://www.youtube.com/channel/UCJIBwLWxtdrVCwuX-F3W9bA?view_as=subscriber",
    logo: `${BASE}/Logo_Youtube.png`,
  },
  {
    nom: "Twitch",
    url: "https://www.twitch.tv/barbe___douce",
    logo: `${BASE}/Logo_Twitch.png`,
  },
  {
    nom: "Discord",
    url: "https://discord.gg/YKHc4RD",
    logo: `${BASE}/Logo_Discord.png`,
  },
] as const;

/**
 * Les traducteurs bénévoles du site.
 *
 * Leurs drapeaux viennent de `static.barbofus.com`, un second domaine qui sert
 * aussi des ressources — à ne pas confondre avec `/storage`.
 */
export const traducteurs = [
  {
    nom: "Max Medina",
    role: "Traductions es",
    drapeau: "https://static.barbofus.com/images/icons/locale/es.png",
  },
  {
    nom: "Amalik",
    role: "Traduction pt/br",
    drapeau: "https://static.barbofus.com/images/icons/locale/pt.png",
  },
] as const;

/** Les sites remerciés en bas de la page d'accueil. */
export const partenaires = [
  {
    nom: "DofusDB",
    role: "API des Items",
    url: "https://dofusdb.fr/fr/",
    logo: `${BASE}/logo-dofus-db.ico`,
  },
  {
    nom: "DofusRoom",
    role: "Builder & outils",
    url: "https://www.dofusroom.com/",
    logo: `${BASE}/dofusroom.png`,
  },
  {
    nom: "DofusBook",
    role: "Builder & outils",
    url: "https://dofusbook.net/fr/",
    logo: `${BASE}/dofusbook.ico`,
  },
] as const;
