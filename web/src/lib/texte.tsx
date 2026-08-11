import type { ReactNode } from "react";

/**
 * Traitement des textes venus des fichiers de langue Laravel.
 *
 * Ces chaînes ne sont pas du texte pur : Laravel y mêle du HTML (`<br>`,
 * `<strong>`) et ses propres marqueurs de substitution (`:skinCount`). Côté
 * Blade, elles sont rendues avec `{!! !!}`, c'est-à-dire injectées telles
 * quelles.
 *
 * On ne fait pas ça ici. Chaque balise attendue est traitée explicitement, et
 * tout le reste est affiché comme du texte : une balise qui apparaîtrait un
 * jour dans une traduction ne serait pas interprétée.
 */

/**
 * Convertit les `<br>` en vrais retours à la ligne.
 *
 * À rendre dans un élément portant `whitespace-pre-line`, sans quoi les
 * retours seront ignorés à l'affichage.
 */
export function sautsDeLigne(texte: string): string {
  return texte.replace(/<br\s*\/?>/gi, "\n");
}

/** Les balises qu'on sait traiter. Le reste est affiché tel quel. */
const BALISES =
  /(<strong\b[^>]*>[\s\S]*?<\/strong>|<em\b[^>]*>[\s\S]*?<\/em>|<a\b[^>]*>[\s\S]*?<\/a>|<br\s*\/?>)/gi;

/**
 * Rend un texte contenant des `<strong>`, des `<a>`, des `<br>` et des
 * marqueurs de substitution `:nom`.
 *
 * Le résultat est identique à celui du site actuel, mais reconstruit en nœuds
 * React plutôt qu'injecté en HTML. Une balise inconnue s'affichera en clair :
 * c'est voulu — mieux vaut un texte laid qu'une balise interprétée parce
 * qu'elle vient d'un fichier de traduction.
 */
export function texteEnrichi(
  texte: string,
  valeurs: Record<string, string> = {},
  /**
   * Traduit un chemin interne (`/recompenses`) en URL utilisable.
   *
   * Les traductions contiennent des liens écrits pour Laravel, donc sans
   * langue et parfois vers des sections restées sur l'ancien site. Sans
   * résolveur, ces liens sont affichés en texte simple plutôt que menés vers
   * une adresse fausse.
   */
  resoudreLienInterne?: (chemin: string) => string | null,
): ReactNode[] {
  const substitue = Object.entries(valeurs).reduce(
    (acc, [cle, valeur]) => acc.replaceAll(`:${cle}`, valeur),
    texte,
  );

  return substitue.split(BALISES).map((morceau, index) => {
    if (!morceau) return null;

    if (/^<br\s*\/?>$/i.test(morceau)) {
      return <br key={index} />;
    }

    // `[\s\S]` plutôt que `.` avec le drapeau `s` : ce drapeau exige une cible
    // ES2018, plus récente que celle du projet.
    // Le contenu d'un `<strong>` peut lui-même contenir un `<a>` : on le
    // repasse à la moulinette plutôt que de l'afficher brut.
    const gras = /^<strong\b[^>]*>([\s\S]*)<\/strong>$/i.exec(morceau);
    if (gras) {
      return <strong key={index}>{texteEnrichi(gras[1], {}, resoudreLienInterne)}</strong>;
    }

    const italique = /^<em\b[^>]*>([\s\S]*)<\/em>$/i.exec(morceau);
    if (italique) {
      return <em key={index}>{italique[1]}</em>;
    }

    const lien = /^<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*)<\/a>$/i.exec(morceau);
    if (lien) {
      const [, href, libelle] = lien;

      // Un chemin interne commence par une seule barre oblique. Deux (`//`)
      // désigneraient un autre domaine : c'est un lien externe déguisé, on le
      // refuse.
      const interne = /^\/(?!\/)/.test(href) ? (resoudreLienInterne?.(href) ?? null) : null;

      // Hors chemin interne résolu, seules les URL http(s) sont suivies : un
      // `javascript:` glissé dans une traduction ne doit pas devenir un lien
      // exécutable.
      const destination = interne ?? (/^https?:\/\//i.test(href) ? href : null);
      if (!destination) {
        return <span key={index}>{libelle}</span>;
      }

      // Ce qui décide de l'ouverture dans un nouvel onglet, c'est la
      // destination FINALE et non la forme d'origine : le résolveur peut très
      // bien renvoyer un chemin interne vers l'ancien site, auquel cas on
      // quitte l'application et l'onglet doit être neuf.
      const quitteLeSite = /^https?:\/\//i.test(destination);

      return (
        <a
          key={index}
          href={destination}
          {...(quitteLeSite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="underline transition-all hover:opacity-75"
        >
          {libelle}
        </a>
      );
    }

    return <span key={index}>{morceau}</span>;
  });
}
