import type { Metadata } from "next";

import { Profil } from "@/components/compte/profil";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { utilisateurCourant } from "@/lib/auth";
import { skins } from "@/lib/fixtures/skins";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Mon compte",
  // Espace personnel : rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

/**
 * Chiffres affichés dans la section « Informations », repris de
 * `user-details.blade.php`. Aucun n'existe dans `CurrentUser` (voir
 * src/types/api.ts) : le modèle Laravel `User` porte des colonnes
 * (`like_given`, `like_received`, `ocre_wins`, `emerald_wins`,
 * `cawotte_wins`, ...) que l'API ne sert pas encore.
 *
 * Le nombre de skins postés est calculé plus bas depuis les fixtures — c'est
 * la seule valeur ici qui reflète vraiment l'utilisateur connecté. Les trois
 * autres sont des valeurs FIGÉES à 0, en attendant que l'API fournisse :
 *   - le nombre de favoris donnés / reçus (`like_given` / `like_received`
 *     côté modèle `User`) ;
 *   - le total de skins du site (`Skin::count() + UnitySkin::count()`) ;
 *   - le nombre de victoires Miss'Skin (`ocre_wins + emerald_wins +
 *     cawotte_wins`, trois compteurs fusionnés en un seul ici faute de
 *     maquette détaillée).
 */
const FAVORIS_DONNES_FIGE = 0;
const FAVORIS_RECUS_FIGE = 0;
const TOTAL_SKINS_SITE_FIGE = 0;
const VICTOIRES_MISS_SKIN_FIGEE = 0;

/** Classes communes au sous-titre de chaque section, et à son trait. */
const TITRE_SECTION = "font-thin text-3xl min-[800px]:text-4xl uppercase";
const TRAIT_SECTION = "border-secondary ml-4 w-[min(24rem,50vw)] border-b";

export default async function MonComptePage({ params }: { params: Promise<{ locale: Locale }> }) {
  // La langue a déjà été validée par la mise en page : une valeur inconnue
  // n'atteint jamais cette page, elle part en 404.
  const { locale } = await params;
  const t = getMessages(locale);

  const utilisateur = await utilisateurCourant();
  // `null` ne devrait jamais atteindre ce rendu : la garde d'accès vit dans
  // le layout de `mon-compte`, qui redirige avant d'arriver ici. Ce
  // `return null` n'est là que pour satisfaire TypeScript.
  if (!utilisateur) return null;

  const skinsPostes = skins.filter((skin) => skin.user.id === utilisateur.id).length;

  const inscritLe = utilisateur.created_at
    ? new Date(utilisateur.created_at).toLocaleDateString(locale)
    : null;

  return (
    <div className="flex w-[80%] flex-col gap-x-16 gap-y-16 min-[800px]:mx-auto min-[1500px]:flex-row">
      <div className="flex flex-col gap-y-12">
        {/* Informations */}
        <div>
          <h2 className={TITRE_SECTION}>{t.titleInfo}</h2>
          <div className={TRAIT_SECTION} />

          <h2 className="mt-4 text-2xl font-light italic min-[800px]:pl-60">{utilisateur.name}</h2>

          <div className="mt-8 flex flex-col items-start gap-x-8 gap-y-8 text-xl font-light min-[800px]:flex-row min-[800px]:items-center min-[800px]:pl-36">
            <div className="flex flex-col gap-y-4">
              <p>
                {t.contentRegistered} <span className="font-normal italic">{inscritLe ?? "—"}</span>
              </p>
              <p>
                <span className="font-normal tracking-widest italic">{skinsPostes}</span>{" "}
                {t.contentSkinPosted}
              </p>
              <p>
                <span className="font-normal tracking-widest italic">{FAVORIS_DONNES_FIGE}</span>{" "}
                {t.contentFavoritesGiven}
              </p>
              <p>
                <span className="font-normal tracking-widest italic">{FAVORIS_RECUS_FIGE}</span>{" "}
                {t.contentFavoritesReceived}
              </p>
              <p>
                <span className="font-normal tracking-widest italic">{TOTAL_SKINS_SITE_FIGE}</span>{" "}
                {t.contentTotalSkins}
              </p>
              <p>
                <span className="font-normal tracking-widest italic">
                  {VICTOIRES_MISS_SKIN_FIGEE}
                </span>{" "}
                {t.contentVictory}
              </p>
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div>
          <h2 className={TITRE_SECTION}>{t.titlePreferences}</h2>
          <div className={TRAIT_SECTION} />

          <h3 className="mt-6 pl-12 text-xl font-thin uppercase">{t.labelEmailFor}</h3>

          <div className="mt-6 flex flex-col gap-y-6 pl-4">
            <div className="flex items-center gap-x-2">
              {/*
                Désactivée plutôt que fausse : aucune préférence n'est
                enregistrée tant que l'API n'existe pas (règle du projet).
              */}
              <Checkbox
                id="mail-skin-validation"
                disabled
                title="Pas encore disponible : l'API ne permet pas encore d'enregistrer cette préférence."
                className="border-inactive size-5"
              />
              <Label
                htmlFor="mail-skin-validation"
                className="text-inactive text-lg font-thin italic"
              >
                {t.inputValidationSkins}
              </Label>
            </div>
          </div>
        </div>

        {/* Connexions */}
        <div>
          <h2 className={TITRE_SECTION}>{t.titleConnection}</h2>
          <div className={TRAIT_SECTION} />

          {/*
            Le bouton d'origine ouvre l'écran d'autorisation Discord. Cette
            intégration n'existe pas encore côté front : le bouton reste
            visible, mais désactivé et explicite, plutôt que de prétendre
            lancer une connexion qui n'aboutira nulle part.
          */}
          <button
            type="button"
            disabled
            title="Pas encore disponible : la connexion à Discord n'est pas branchée."
            className="bg-anthracite-lit text-inactive mt-4 ml-8 w-fit cursor-not-allowed rounded-md px-4 py-2 text-lg font-thin uppercase"
          >
            {t.buttonLinkDiscord}
          </button>
        </div>

        {/* Récompense Miss'Skin */}
        <div>
          <h2 className={TITRE_SECTION}>{t.titleMissSkinReward}</h2>
          <div className={TRAIT_SECTION} />

          <div className="mt-6 flex flex-wrap items-center gap-6 pl-8">
            <div className="flex items-center gap-4">
              <div className="bg-anthracite-lit flex h-24 w-24 items-center justify-center rounded-lg">
                <svg
                  className="text-inactive h-12 w-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
                </svg>
              </div>
              <div>
                <p className="text-inactive text-lg font-light">{t.contentNoRewardSelected}</p>
                <p className="text-inactive text-sm italic">{t.contentNoRewardDescription}</p>
              </div>
            </div>

            {/*
              Choisir une récompense suppose un écran de sélection qui
              n'existe pas encore : le bouton reste visible mais désactivé,
              pour ne pas mener vers une page qui n'existe pas.
            */}
            <button
              type="button"
              disabled
              title="Pas encore disponible : la sélection de récompense n'est pas encore branchée."
              className="bg-anthracite-lit text-inactive w-fit cursor-not-allowed rounded-lg px-6 py-3 text-lg font-medium"
            >
              {t.buttonChooseReward}
            </button>
          </div>
        </div>
      </div>

      {/* Paramètres */}
      <div>
        <h2 className={TITRE_SECTION}>{t.titleSettings}</h2>
        <div className={TRAIT_SECTION} />

        <Profil t={t} />
      </div>
    </div>
  );
}
