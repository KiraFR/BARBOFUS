import type { Metadata } from "next";

import { storageUrl } from "@/lib/assets";
import { alternatesPour } from "@/lib/seo";
import { sautsDeLigne } from "@/lib/texte";
import { getMessages, type Locale, type Messages } from "@/messages";

export const metadata: Metadata = {
  title: "Barb'Outils",
  ...alternatesPour("/outils"),
};

/**
 * Les outils présentés sur la page, dans l'ordre du site.
 *
 * Les clés de traduction sont écrites une par une plutôt que composées à la
 * volée : TypeScript peut alors vérifier qu'elles existent, ce qu'un nom
 * construit par concaténation lui interdirait.
 */
const OUTILS: {
  image: string;
  titre: keyof Messages;
  description: keyof Messages;
  bouton: keyof Messages;
  url: string;
  infobulle: string;
  auteur?: { nom: string; url?: string };
}[] = [
  {
    image: "logo_Tougli.webp",
    titre: "titleToolsTougli",
    description: "descriptionToolsTougli",
    bouton: "buttonToolsTougli",
    url: "https://tougli.barbofus.com/",
    infobulle: "Tougli - Dofus Opti",
  },
  {
    image: "grougalorasalar.png",
    titre: "titleToolsGrougalorasalar",
    description: "descriptionToolsGrougalorasalar",
    bouton: "buttonToolsGrougalorasalar",
    url: "https://solver.barbofus.com/grougalorasalar/",
    infobulle: "Grougalorasalar Solver par Pawmi (Sinaninho)",
    auteur: { nom: "Pawmi (Sinaninho)" },
  },
  {
    image: "bolgrot.png",
    titre: "titleToolsBolgrot",
    description: "descriptionToolsBolgrot",
    bouton: "buttonToolsBolgrot",
    url: "https://solver.barbofus.com/bolgrot/",
    infobulle: "Bolgrot Solver par Emmathie",
    auteur: { nom: "Emmathie", url: "https://emmathie.fr/" },
  },
  {
    image: "minogolem.png",
    titre: "titleToolsMinigolem",
    description: "descriptionToolsMinigolem",
    bouton: "buttonToolsMinigolem",
    url: "https://solver.barbofus.com/minogolem/",
    infobulle: "Minogolem Solver par Emmathie",
    auteur: { nom: "Emmathie", url: "https://emmathie.fr/" },
  },
  {
    image: "rainikrone.png",
    titre: "titleToolsRainikrone",
    description: "descriptionToolsRainikrone",
    bouton: "buttonToolsRainikrone",
    url: "https://solver.barbofus.com/rainikrone/",
    infobulle: "Rainikrone Solver par Emmathie",
    auteur: { nom: "Emmathie", url: "https://emmathie.fr/" },
  },
  {
    image: "Dofus_Logo-2_0.png",
    titre: "titleToolsSkin20",
    description: "descriptionToolsSkin20",
    bouton: "buttonToolsSkin20",
    // La galerie Dofus 2.0 n'est pas reprise dans la refonte : le lien reste
    // sur l'ancien site, comme le Skinator et les havre-sacs.
    url: "https://barbofus.com/skins",
    infobulle: "Galerie de skins Dofus 2.0",
  },
];

const LIEN_DORE =
  "text-gold-text hover:text-gold-text-lit font-light italic underline transition-all";

export default async function OutilsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getMessages(locale);

  return (
    <main className="w-full flex-1">
      <h1 className="mt-10 text-center text-[min(4rem,15vw)] font-normal uppercase">
        {t.buttonTools}
      </h1>
      <p className="-mt-3 mb-16 text-center text-2xl font-thin uppercase">{t.descriptionTools}</p>

      <div className="text-md mx-auto my-24 flex w-[calc(100%-1rem)] flex-col space-y-16 min-[800px]:w-[80%] min-[800px]:text-lg">
        {OUTILS.map((outil) => (
          <article
            key={outil.url}
            className="border-ivory flex flex-col items-center gap-16 border-y px-0 py-4 min-[800px]:px-8 min-[800px]:py-8 min-[1200px]:flex-row"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={storageUrl(`images/misc_ui/${outil.image}`)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-40"
            />

            <div>
              <div className="mb-4 flex items-end space-x-8">
                <h2 className="text-xl font-light min-[800px]:text-4xl">{t[outil.titre]}</h2>

                {outil.auteur ? (
                  outil.auteur.url ? (
                    <a
                      href={outil.auteur.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Site web d'${outil.auteur.nom}`}
                      className={LIEN_DORE}
                    >
                      par {outil.auteur.nom}
                    </a>
                  ) : (
                    <p className={LIEN_DORE}>par {outil.auteur.nom}</p>
                  )
                ) : null}
              </div>

              {/* Les descriptions contiennent des retours à la ligne et des
                  balises <br> héritées de Laravel : les deux sont rendus comme
                  de vraies coupures, pas comme du texte. */}
              <p className="font-thin whitespace-pre-line">{sautsDeLigne(t[outil.description])}</p>

              <a
                href={outil.url}
                target="_blank"
                rel="noopener noreferrer"
                title={outil.infobulle}
                className={LIEN_DORE}
              >
                {t[outil.bouton]}
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
