import type { Messages } from "@/messages";

/**
 * Le site actuel, encore en production.
 *
 * Deux sections ne font pas partie de la refonte — le Skinator et les
 * havre-sacs — et restent servies par le Laravel existant. Les entrées de menu
 * correspondantes pointent donc dessus : on ne construit pas ces pages, mais
 * on ne les cache pas non plus, sinon le nouveau site paraîtrait amputé.
 *
 * Les Barb'Outils, eux, ont été repris : la page ne fait que présenter des
 * liens, elle ne coûtait presque rien.
 */
const SITE_ACTUEL = "https://barbofus.com";

export type NavItem = {
  /** Chemin interne, ou URL absolue vers le site actuel. */
  href: string;
  /** Vrai pour les sections non reprises, qui ouvrent l'ancien site. */
  externe?: boolean;
  emoji: string;
  /** Clé de traduction du libellé. Absente pour les noms propres. */
  cle?: keyof Messages;
  /** Libellé littéral, quand il n'y a rien à traduire (« Skinator »). */
  libelle?: string;
  /** Attribut `title`, repris de l'original. */
  titre: string;
};

/** Le menu tel qu'il apparaît pour un visiteur non connecté. */
export function navigationVisiteur(): NavItem[] {
  return [
    { href: "/", emoji: "⭐", cle: "buttonHome", titre: "Accueil Barbofus" },
    { href: "/skins", emoji: "🎨", cle: "buttonSkins", titre: "Galerie de skins" },
    {
      href: `${SITE_ACTUEL}/skinator`,
      externe: true,
      emoji: "🚀",
      libelle: "Skinator",
      titre: "Partage de skin",
    },
    {
      href: `${SITE_ACTUEL}/havre-sacs`,
      externe: true,
      emoji: "🏠",
      cle: "buttonHavenbags",
      titre: "Galerie de havre-sacs",
    },
    { href: "/outils", emoji: "🔧", cle: "buttonTools", titre: "Outils" },
    { href: "/login", emoji: "🔑", cle: "buttonLogin", titre: "Page de connexion" },
    { href: "/register", emoji: "📝", cle: "buttonRegister", titre: "Formulaire d'inscription" },
  ];
}
