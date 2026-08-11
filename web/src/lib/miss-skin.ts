import "server-only";

/**
 * Le thème du concours Miss'Skin de la semaine.
 *
 * Côté Laravel il vit dans `storage/app/json/missskin.json` et n'est exposé
 * nulle part — il est injecté dans le composant Alpine de la fenêtre du
 * concours, sur toutes les pages qui portent l'habillage standard. On le relit
 * donc là où il est le moins cher à aller chercher : les mentions légales,
 * 41 Ko contre 650 Ko pour la galerie.
 *
 * Un seul fichier plutôt que la paire habituelle proxy + source : il n'y a
 * qu'une chaîne de caractères à ramener, et un repli d'une ligne.
 */

const PROD = "https://barbofus.com";

/** Six heures. Le thème change une fois par semaine, au mieux. */
const DUREE_CACHE = 21_600;

/**
 * Ce que le site affiche quand aucun thème n'est fixé — et ce qu'il affiche
 * réellement aujourd'hui. La chaîne vient du JSON de production, pas d'une
 * traduction : elle est en français dans les quatre langues, là-bas comme ici.
 */
const THEME_PAR_DEFAUT = "A définir";

export async function chargerThemeMissSkin(): Promise<string> {
  try {
    const reponse = await fetch(`${PROD}/mentions-legales`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; barbofus-refonte/dev)" },
      next: { revalidate: DUREE_CACHE },
    });
    if (!reponse.ok) return THEME_PAR_DEFAUT;

    const html = await reponse.text();

    // `get misskinTheme() { return 'Halloween'; }` — la valeur est produite par
    // `Js::from()`, donc échappée en JSON puis posée entre apostrophes.
    const trouve = html.match(/get misskinTheme\(\)\s*\{\s*return\s*'((?:[^'\\]|\\.)*)'/);
    if (!trouve) return THEME_PAR_DEFAUT;

    // `Js::from` écrit les accents en séquences \uXXXX : « A définir ».
    const theme = trouve[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    );

    return theme.trim() === "" ? THEME_PAR_DEFAUT : theme;
  } catch {
    return THEME_PAR_DEFAUT;
  }
}
