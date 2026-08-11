import { notFound } from "next/navigation";

/**
 * Attrape toutes les adresses inconnues sous une langue.
 *
 * Sans cette route, `/fr/nimporte-quoi` ne correspondrait à AUCUN segment, et
 * Next servirait sa page 404 par défaut : fond blanc, texte anglais, ni en-tête
 * ni pied de page. Un `not-found.tsx` posé plus bas n'y changerait rien — Next
 * ne consulte que celui de la racine pour une adresse non appariée, et notre
 * racine vit sous `[locale]`, donc hors de portée.
 *
 * En faisant correspondre l'adresse à une vraie route qui appelle `notFound()`,
 * on ramène le 404 à l'intérieur du groupe `(site)` : il hérite de son
 * habillage, et `(site)/not-found.tsx` s'affiche avec le menu et le pied de
 * page. Le code de statut reste bien 404.
 *
 * Cette route ne masque rien : Next fait toujours passer les segments explicites
 * avant un attrape-tout.
 */
export default function Introuvable(): never {
  notFound();
}
