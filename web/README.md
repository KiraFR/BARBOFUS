# BARBOFUS — front

Refonte du front de BARBOFUS en Next.js. L'application Laravel à la racine du
dépôt n'est pas touchée : elle reste le site en production jusqu'à la bascule.

## Démarrer

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000. La page http://localhost:3000/design
affiche les jetons de design (couleurs, typographie, composants de base) — c'est
une page de contrôle interne, non indexée, qui ne fait pas partie du site.

## Polices

Les polices ne sont pas dans le dépôt. Sans elles le site reste parfaitement
lisible (repli sur Geist), mais pour retrouver l'identité visuelle exacte :

```bash
cp ../storage/app/public/fonts/* public/fonts/
```

Elles sont exclues volontairement : `MADE Okin` est sous licence « personal
use » et `MV Boli` est une police système Windows que sa licence n'autorise pas
à rediffuser comme police web. Les servir depuis le serveur est une chose, les
publier sur un dépôt public en est une autre. `MV Boli` devrait à terme être
remplacée par une alternative libre.

## Où sont les choses

| Chemin | Rôle |
|---|---|
| `src/types/api.ts` | Le contrat de données, calqué sur les modèles Laravel de `develop` |
| `src/app/globals.css` | Polices, couleurs de marque, jetons sémantiques, dégradés |
| `src/lib/fixtures/` | Données de démonstration, en attendant l'API |
| `src/components/ui/` | Composants shadcn/ui — ne pas modifier à la main, ils se régénèrent |
| `src/app/design/` | Page de contrôle des jetons de design |

## Méthode

Le front est construit d'abord, en statique, contre des données typées calquées
sur les vraies tables. Ces types sont le contrat que l'API devra respecter le
jour où elle sera branchée. Un écran est terminé avant qu'un autre soit commencé.

## À savoir

- Next 16 : `params` et `searchParams` sont des promesses, `middleware` s'appelle
  désormais `proxy`, et `next lint` n'existe plus (utiliser `npm run lint`).
- Le site n'a qu'un seul thème, sombre. Pas de bascule clair/sombre.
- Les images de skins sont pour l'instant des silhouettes générées à partir des
  couleurs du skin (`SkinPlaceholder`), à supprimer quand l'API servira
  `image_path`.
