/**
 * En-têtes de requête posés par le proxy.
 *
 * Isolés dans ce fichier sans dépendance : le proxy s'exécute dans un
 * environnement restreint et ne peut pas importer les modules marqués
 * `server-only`, qui sont pourtant ceux qui relisent ces en-têtes.
 */

/** La langue lue dans l'URL. Voir `src/lib/locale-serveur.ts`. */
export const ENTETE_LOCALE = "x-barbofus-locale";
