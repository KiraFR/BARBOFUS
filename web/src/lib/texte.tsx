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

/** Les trois balises qu'on sait traiter. Le reste est affiché tel quel. */
const BALISES = /(<strong>[\s\S]*?<\/strong>|<a\b[^>]*>[\s\S]*?<\/a>|<br\s*\/?>)/gi;

/**
 * Rend un texte contenant des `<strong>`, des `<a>`, des `<br>` et des
 * marqueurs de substitution `:nom`.
 *
 * Le résultat est identique à celui du site actuel, mais reconstruit en nœuds
 * React plutôt qu'injecté en HTML. Une balise inconnue s'affichera en clair :
 * c'est voulu — mieux vaut un texte laid qu'une balise interprétée parce
 * qu'elle vient d'un fichier de traduction.
 */
export function texteEnrichi(texte: string, valeurs: Record<string, string> = {}): ReactNode[] {
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
    const gras = /^<strong>([\s\S]*)<\/strong>$/.exec(morceau);
    if (gras) {
      return <strong key={index}>{gras[1]}</strong>;
    }

    const lien = /^<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*)<\/a>$/i.exec(morceau);
    if (lien) {
      const [, href, libelle] = lien;
      // Seules les URL http(s) sont suivies : un `javascript:` glissé dans une
      // traduction ne doit pas devenir un lien exécutable.
      if (!/^https?:\/\//i.test(href)) {
        return <span key={index}>{libelle}</span>;
      }
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-all hover:opacity-75"
        >
          {libelle}
        </a>
      );
    }

    return <span key={index}>{morceau}</span>;
  });
}
