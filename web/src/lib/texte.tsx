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

/**
 * Rend un texte contenant des `<strong>` et des marqueurs `:nom`.
 *
 * Le résultat est identique à celui du site actuel, mais reconstruit en nœuds
 * React plutôt qu'injecté en HTML.
 */
export function texteEnrichi(texte: string, valeurs: Record<string, string> = {}): ReactNode[] {
  const substitue = Object.entries(valeurs).reduce(
    (acc, [cle, valeur]) => acc.replaceAll(`:${cle}`, valeur),
    texte,
  );

  return substitue.split(/(<strong>.*?<\/strong>)/g).map((morceau, index) => {
    // `[\s\S]` plutôt que `.` avec le drapeau `s` : ce drapeau exige une cible
    // ES2018, plus récente que celle du projet.
    const gras = /^<strong>([\s\S]*)<\/strong>$/.exec(morceau);
    return gras ? <strong key={index}>{gras[1]}</strong> : <span key={index}>{morceau}</span>;
  });
}
