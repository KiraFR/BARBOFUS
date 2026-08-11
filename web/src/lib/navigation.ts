import type { Messages } from "@/messages";

/**
 * Le site actuel, encore en production.
 *
 * Une seule section ne fait pas partie de la refonte — le Skinator — et reste
 * servie par le Laravel existant. Son entrée de menu pointe donc dessus : on ne
 * construit pas cette page, mais on ne la cache pas non plus, sinon le nouveau
 * site paraîtrait amputé.
 *
 * Les havre-sacs, eux, ont rejoint la refonte : seule leur page de publication
 * reste sur l'ancien site, faute d'API pour recevoir une image.
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

/**
 * Le menu, selon qu'on soit connecté ou non.
 *
 * Les cinq premières entrées sont communes ; seule la fin change. La
 * déconnexion n'y figure pas : ce n'est pas un lien mais un bouton de
 * formulaire, traité à part dans la barre de navigation.
 */
export function navigation(connecte: boolean): NavItem[] {
  const communes = navigationVisiteur().slice(0, 5);

  if (!connecte) return navigationVisiteur();

  return [
    ...communes,
    { href: "/mon-compte", emoji: "⚙️", cle: "buttonDashboard", titre: "Espace mon compte" },
  ];
}

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
      href: "/havre-sacs",
      emoji: "🏠",
      cle: "buttonHavenbags",
      titre: "Galerie de havre-sacs",
    },
    { href: "/outils", emoji: "🔧", cle: "buttonTools", titre: "Outils" },
    { href: "/login", emoji: "🔑", cle: "buttonLogin", titre: "Page de connexion" },
    { href: "/register", emoji: "📝", cle: "buttonRegister", titre: "Formulaire d'inscription" },
  ];
}
