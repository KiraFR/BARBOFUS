import type { Metadata } from "next";

import { CarteActivite } from "@/components/ecrans/carte-activite";
import { CadreEcran, EnteteEcran, Gelule, PiedEcran } from "@/components/ecrans/entete-ecran";
import { TwitchStatut } from "@/components/layout/twitch-live";
import { chargerPlanning } from "@/lib/ecrans-source";
import { alternatesPour } from "@/lib/seo";
import { dateDuJour, intituleSemaine, jourEtMois, minutesDepuisMinuit } from "@/lib/semaine";
import type { Jour } from "@/types/ecrans";
import type { Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Planning",
  description: "Le planning hebdomadaire des directs de Barbe Douce.",
  ...alternatesPour("/planning"),
};

/**
 * Le planning hebdomadaire des directs.
 *
 * Écran plein cadre, sans en-tête ni menu : il est fait pour être montré
 * pendant le stream. C'est aussi la seule page vers laquelle la page Réseaux
 * pointait encore en dehors du nouveau site.
 *
 * CE QUI N'EST PAS REPRIS : l'édition par l'administrateur — modifier les
 * horaires et les noms au clavier, déposer une image sur une carte, masquer une
 * activité, changer de semaine. Tout cela écrit dans le JSON via des routes
 * réservées aux administrateurs, et l'espace d'administration est hors du
 * périmètre de cette refonte. La page est donc en lecture seule ; le planning
 * continue de s'éditer sur le site actuel.
 */
export default async function PlanningPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const planning = await chargerPlanning();

  const { heures, sessions } = statistiques(planning.jours);

  return (
    <CadreEcran>
      <EnteteEcran
        halo
        icone={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            className="h-9 w-9"
            viewBox="0 0 16 16"
          >
            <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
            <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
          </svg>
        }
        titre="Planning Hebdomadaire"
        sousTitre={
          <p className="text-ivory/50 mt-1.5 flex items-center gap-1.5 text-xs md:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-hidden="true"
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
            {intituleSemaine(planning.annee, planning.semaine, locale)}
          </p>
        }
        actions={
          <div className="flex w-full items-center gap-2 font-light sm:w-auto sm:gap-3">
            <TwitchStatut className="flex-1 sm:flex-none" />

            <Gelule className="hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                aria-hidden="true"
                className="text-gold-dark h-4 w-4"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                />
              </svg>
              {sessions} sessions
            </Gelule>

            <Gelule className="hidden md:flex">{heures}h total</Gelule>
          </div>
        }
      />

      <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-visible">
        <div className="grid h-full gap-8 md:grid-cols-2 lg:grid-cols-7 lg:gap-4">
          {planning.jours.map((jour, index) => (
            <ColonneJour
              key={`${index}-${jour.nom}`}
              jour={jour}
              date={jourEtMois(dateDuJour(planning.annee, planning.semaine, index), locale)}
              semaine={planning.semaine}
              annee={planning.annee}
            />
          ))}
        </div>
      </div>

      <PiedEcran />
    </CadreEcran>
  );
}

/** Une colonne : l'en-tête du jour, puis ses activités. */
function ColonneJour({
  jour,
  date,
  semaine,
  annee,
}: {
  jour: Jour;
  date: string;
  semaine: number;
  annee: number;
}) {
  // Une activité masquée n'existe pas pour le visiteur : le site actuel ne la
  // rend qu'à l'administrateur, en transparence, pour qu'il puisse la
  // réafficher. Sans espace d'administration, elle disparaît simplement.
  const activites = jour.activites.filter((activite) => activite.visible);

  return (
    <div className="relative flex h-full min-h-0 flex-col gap-3">
      <div className="relative shrink-0">
        <span
          aria-hidden="true"
          className="gold-gradient absolute inset-0 rounded-2xl opacity-40 blur-md"
        />
        <div className="gold-gradient text-anthracite relative rounded-[min(1rem,0.75vw)] p-[min(1rem,0.75vw)] text-center">
          <p className="text-xl font-light tracking-[0.3em] uppercase opacity-80 lg:text-[min(1.25rem,1.25vw)]">
            {jour.nom}
          </p>
          <p className="mt-1 text-sm opacity-70 lg:text-[min(0.875rem,0.875vw)]">{date}</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-3 lg:flex-col">
        {activites.length === 0 ? (
          <p className="text-ivory/25 flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/10 p-4 text-center text-sm italic">
            Repos
          </p>
        ) : (
          activites.map((activite, index) => (
            <div key={index} className="aspect-[9/16] min-h-0 flex-1 lg:aspect-auto">
              <CarteActivite
                activite={activite}
                jour={jour.nom}
                semaine={semaine}
                annee={annee}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Nombre de sessions et total d'heures de la semaine.
 *
 * Reprend le calcul de `PlanningController::calculateStats` : les activités
 * masquées ne comptent pas, et une plage qui finit avant de commencer — ou au
 * même instant — vaut zéro heure plutôt qu'une durée négative. La production
 * contient justement une activité « Dofus » de 00:00 à 00:00.
 */
function statistiques(jours: Jour[]): { heures: number; sessions: number } {
  let minutes = 0;
  let sessions = 0;

  for (const jour of jours) {
    for (const activite of jour.activites) {
      if (!activite.visible) continue;

      sessions += 1;

      const debut = minutesDepuisMinuit(activite.debut);
      const fin = minutesDepuisMinuit(activite.fin);
      if (fin > debut) minutes += fin - debut;
    }
  }

  return { heures: Math.round((minutes / 60) * 10) / 10, sessions };
}
