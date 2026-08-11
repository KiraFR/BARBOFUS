import Link from "next/link";

import { Socials } from "@/components/home/home-sections";
import { texteEnrichi } from "@/lib/texte";
import { lien, type Locale, type Messages } from "@/messages";

/**
 * Pied de page.
 *
 * Porté de `resources/views/components/footer.blade.php`. Une barre fixée en
 * bas de la fenêtre, réduite à un liseré au repos : seul un petit onglet
 * décoratif dépasse de son bord supérieur. Le survol du groupe fait remonter
 * toute la barre (translation, pas de changement de mise en page) pour
 * révéler son contenu, et fait pivoter le petit chevron de l'onglet.
 *
 * Contrairement au reste du site — anthracite sur ivoire —, cette barre est
 * ivoire sur anthracite : c'était déjà le cas dans l'original (`bg-secondary`
 * y valait ivoire, `text-primary` l'anthracite ; les jetons sémantiques du
 * nouveau site portent ces noms mais avec les couleurs inversées, donc on
 * reprend directement `bg-ivory` / `text-anthracite` pour obtenir le même
 * rendu visuel).
 */
export function SiteFooter({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <footer className="fixed bottom-2 z-50 h-fit w-full">
      <div className="bg-ivory group absolute left-0 h-fit w-full p-2 transition-all duration-200 hover:fixed hover:-translate-y-[calc(100%-0.5rem)]">
        {/* Onglet décoratif : deux ailes triangulaires et un chevron central
            qui pivote au survol du groupe. */}
        <div
          aria-hidden="true"
          className="absolute -top-4 left-[calc(50%-4.5rem)] flex h-4 w-36 justify-between"
        >
          <div className="bg-ivory nav-pointer h-full w-8 rotate-180" />
          <div className="bg-ivory nav-pointer h-full w-8 rotate-180" />
          <div className="bg-ivory absolute left-4 h-full w-28 rotate-180">
            <span className="bg-anthracite nav-pointer absolute top-0 left-[calc(50%-0.5rem)] h-3 w-4 transition-transform duration-200 group-hover:rotate-180" />
          </div>
        </div>

        <div>
          {/* 1. Réseaux sociaux. */}
          <Socials />

          {/* 2. Mentions légales. La chaîne porte un `<br>` et un `<a>` vers
              le site d'Ankama : `texteEnrichi` rend les deux en vrais nœuds
              React, sans jamais interpréter de HTML venu d'une traduction. */}
          <p className="text-anthracite text-center text-sm font-light">
            {texteEnrichi(t.footerLegals)}
          </p>

          {/* 3. Grille de liens : 2 colonnes, 3 à partir de 500px. */}
          <div className="text-anthracite mx-auto my-4 grid w-fit grid-cols-2 items-center justify-center gap-x-2 uppercase min-[500px]:grid-cols-3 [&>a]:h-8 [&>a:hover]:-skew-x-12">
            <Link href={lien(locale, "/")} title="Accueil Barbofus">
              {t.buttonHome}
            </Link>
            <Link href={lien(locale, "/skins")} title="Galerie de skins">
              {t.buttonSkins}
            </Link>
            <a
              href="https://barbofus.com/skinator"
              title="Créer ton skin"
              // Section non reprise dans la refonte : on quitte l'application.
              target="_blank"
              rel="noopener noreferrer"
            >
              Skinator
            </a>
            <a
              href="https://barbofus.com/havre-sacs"
              title="Galerie de havre-sacs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.buttonHavenbags}
            </a>
            <Link href={lien(locale, "/outils")} title="Outils">
              {t.buttonTools}
            </Link>
            {/* /mentions-legales n'existe pas encore côté front : la page
                viendra plus tard, le lien est posé par avance. */}
            <Link href={lien(locale, "/mentions-legales")} title="Mentions légales">
              {t.buttonLegals}
            </Link>
          </div>

          {/* 4. Copyright.
              L'année est figée en constante plutôt que lue avec `new Date()`
              au rendu : ce calcul devra être fait côté serveur uniquement
              (sinon le serveur et le client peuvent produire deux années
              différentes autour du nouvel an, et React râle sur la
              désynchronisation d'hydratation). */}
          <p className="text-anthracite text-center font-light">
            © {ANNEE_COPYRIGHT} Barbofus - {t.footerCopyright}
          </p>

          {/* 5. Crédit du webmaster. */}
          <p className="text-anthracite text-center font-light italic">
            {t.footerWebmaster} –{" "}
            <a
              href="https://www.malt.fr/profile/charlymollard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-text hover:text-gold-text-lit font-normal transition-all hover:underline"
            >
              EminensWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** À rendre dynamique côté serveur uniquement — voir le commentaire au point 4. */
const ANNEE_COPYRIGHT = 2026;
