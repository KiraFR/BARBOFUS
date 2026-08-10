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
} as const;
