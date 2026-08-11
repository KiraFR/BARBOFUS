import type { Metadata } from "next";

import { CadreEcran, EnteteEcran, PiedEcran } from "@/components/ecrans/entete-ecran";
import { GrilleRecompenses } from "@/components/ecrans/grille-recompenses";
import { estConnecte } from "@/lib/auth";
import { chargerRecompenses } from "@/lib/ecrans-source";
import { alternatesPour } from "@/lib/seo";
import type { Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Récompenses",
  description: "Les récompenses à gagner au concours Miss'Skin de Barbe Douce.",
  ...alternatesPour("/recompenses"),
};

/**
 * La boutique des récompenses du concours Miss'Skin.
 *
 * Un membre y choisit la récompense qu'il souhaite en cas de victoire. Le choix
 * est remis à zéro chaque mardi, jour du concours — d'où la date en sous-titre.
 *
 * La page est atteinte depuis la fenêtre d'annonce du Miss'Skin (la chaîne
 * `popupMissSkinContent` des traductions y renvoie), fenêtre qui n'est pas
 * encore portée.
 *
 * CE QUI N'EST PAS REPRIS : l'ajout, le remplacement d'image et la suppression
 * d'une récompense, réservés aux administrateurs — l'espace d'administration
 * est hors périmètre.
 */
export default async function RecompensesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [recompenses, connecte] = await Promise.all([chargerRecompenses(), estConnecte()]);

  const mardi = prochainMardi(locale);

  return (
    <CadreEcran>
      <EnteteEcran
        icone={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-8 w-8"
          >
            <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
          </svg>
        }
        titre="Boutique des Récompenses"
        sousTitre={
          <>
            <p className="text-ivory/60 text-sm md:text-base">Concours Miss Skin {mardi}</p>
            <p className="text-ivory/40 mt-2 text-xs md:text-sm">
              {recompenses.length} récompenses disponibles
            </p>
          </>
        }
      />

      <div className="mt-16 min-h-0 flex-1 overflow-y-auto">
        <GrilleRecompenses recompenses={recompenses} connecte={connecte} />
      </div>

      <PiedEcran>Concours Miss Skin {mardi}</PiedEcran>
    </CadreEcran>
  );
}

/**
 * « Mardi 18/08 » — le prochain mardi, ou aujourd'hui si on y est déjà.
 *
 * Reprend la règle de la page d'origine : le mardi, elle affiche le jour même
 * plutôt que de renvoyer à la semaine suivante, parce que c'est le jour du
 * concours et que c'est ce jour-là que la page est le plus consultée.
 */
function prochainMardi(locale: Locale): string {
  const aujourdhui = new Date();
  const MARDI = 2;

  const dans = (MARDI - aujourdhui.getDay() + 7) % 7;
  const mardi = new Date(aujourdhui);
  mardi.setDate(aujourdhui.getDate() + dans);

  const date = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit" }).format(mardi);

  return `Mardi ${date}`;
}
