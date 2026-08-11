import type { Metadata } from "next";
import Link from "next/link";

import { FiltresThemes } from "@/components/havre-sacs/filtres-themes";
import { GalerieHavreSacs } from "@/components/havre-sacs/galerie-havre-sacs";
import { chargerHavreSacs, chargerThemes } from "@/lib/havre-sacs-source";
import { alternatesPour } from "@/lib/seo";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Havre-Sacs",
  description: "La galerie de havre-sacs Dofus partagés par la communauté Barbofus.",
  ...alternatesPour("/havre-sacs"),
};

/**
 * La galerie de havre-sacs.
 *
 * Seconde galerie du site, et la plus simple : pas de page de détail, pas de
 * likes, pas de tri. On filtre par thème de décor, et on clique une carte pour
 * la voir en grand.
 *
 * CE QUI N'EST PAS REPRIS : la publication et la modification d'un havre-sac
 * (`/havre-sacs/create` et `/havre-sacs/{id}/edit`). Elles envoient une image,
 * la redimensionnent en 1920×1080, écrivent en base et préviennent un salon
 * Discord — rien de tout cela ne peut exister sans l'API. Le bouton « Poster
 * un havre-sac » est donc là, mais il renvoie au site actuel : mieux vaut un
 * détour qu'un bouton mort ou une page qui ferait semblant.
 */
export default async function HavreSacsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const requete = await searchParams;
  const t = getMessages(locale);

  const [sacs, themes] = await Promise.all([chargerHavreSacs(), chargerThemes()]);

  const selection = lireThemes(requete.theme);
  const affiches =
    selection.length === 0
      ? sacs
      : sacs.filter((sac) => themesRetenus(themes, selection).has(sac.theme_name));

  const ouvert = Number(requete.show);

  return (
    <div className="flex w-full flex-1 pt-10">
      <FiltresThemes themes={themes} selection={selection} t={t} />

      <main className="mb-10 flex w-full min-w-0 flex-col items-center">
        <div className="flex w-full justify-center">
          <a
            href="https://barbofus.com/havre-sacs/create"
            className="gold-gradient text-anthracite group flex flex-col items-center rounded-md px-4 py-2 text-lg transition-all hover:rounded-3xl hover:brightness-110 min-[400px]:text-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="h-12"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="transition-all group-hover:-translate-y-2">{t.buttonPostHS}</span>
          </a>
        </div>

        <GalerieHavreSacs
          // La clé remonte la grille à neuf quand les filtres changent : elle
          // repart de la première tranche, sans effet de synchronisation.
          key={selection.join(",")}
          sacs={affiches}
          t={t}
          ouvertInitialement={Number.isInteger(ouvert) && ouvert > 0 ? ouvert : null}
        />

        {/* Le panneau de filtres disparaît sous 600 px, comme sur le site
            actuel. On offre au moins de quoi revenir à la galerie entière. */}
        {selection.length > 0 && (
          <Link
            href={`/${locale}/havre-sacs`}
            className="text-inactive hover:text-ivory mt-6 text-sm italic underline min-[600px]:hidden"
          >
            Retirer les filtres
          </Link>
        )}
      </main>
    </div>
  );
}

/** Les identifiants de thèmes cochés, lus dans l'URL. */
function lireThemes(valeur: string | string[] | undefined): number[] {
  const liste = valeur === undefined ? [] : Array.isArray(valeur) ? valeur : [valeur];

  return liste.map(Number).filter((id) => Number.isInteger(id) && id > 0);
}

/**
 * Les noms des thèmes cochés.
 *
 * Le filtrage se fait sur le NOM et non sur l'identifiant, faute de mieux :
 * la galerie de production ne rend pas l'identifiant de thème de chaque
 * havre-sac, seulement son libellé traduit. C'est une faiblesse du proxy, pas
 * du modèle — l'endpoint devra rendre `haven_bag_theme_id`, et ce détour
 * disparaîtra.
 */
function themesRetenus(
  themes: { id: number; name: string }[],
  selection: number[],
): Set<string> {
  return new Set(
    themes.filter((theme) => selection.includes(theme.id)).map((theme) => theme.name),
  );
}
