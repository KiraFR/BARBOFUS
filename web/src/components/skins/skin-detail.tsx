import Link from "next/link";

import { storageUrl } from "@/lib/assets";
import { lien, type Locale, type Messages } from "@/messages";
import type { SkinCardItem, SkinColors, SkinItem, SkinItems } from "@/types/api";

/**
 * Les huit emplacements d'équipement, dans l'ordre demandé pour la fiche.
 *
 * Pas de clé dans `src/messages` pour ces libellés : la fiche Laravel
 * d'origine (`resources/views/unity-skins/show.blade.php`) étiquette ses
 * items par NATURE (objet d'apparat / vivant / mimibiotable), pas par
 * emplacement. Le libellé « chapeau », « cape »... n'existe nulle part côté
 * traductions : il est donc écrit en dur, en français, comme le reste du
 * texte non encore internationalisé de ce projet.
 */
const EMPLACEMENTS: { cle: keyof SkinItems; libelle: string }[] = [
  { cle: "hat", libelle: "Chapeau" },
  { cle: "cape", libelle: "Cape" },
  { cle: "shield", libelle: "Bouclier" },
  { cle: "pet", libelle: "Familier" },
  { cle: "mount", libelle: "Monture" },
  { cle: "costume", libelle: "Costume" },
  { cle: "wings", libelle: "Ailes" },
  { cle: "shoulderPads", libelle: "Épaulières" },
];

/**
 * Positions de la disposition « poupée à habiller » du site actuel
 * (`resources/views/unity-skins/show.blade.php`, section Items, lignes
 * 201-301) : chaque vignette est ancrée à une coordonnée précise autour du
 * personnage, au-delà de 950px de large — c'est le seuil `min-[950px]`
 * choisi par l'original, repris ici tel quel.
 *
 * L'original enveloppe chaque item dans une boîte invisible large de
 * `31.25rem`, alignée à gauche ou à droite selon le côté, pour que le point
 * d'ancrage reste stable quel que soit le nombre de caractères du nom. Le
 * même résultat est obtenu ici directement : `left` pour les items ancrés à
 * gauche de leur vignette (elle s'étend vers la droite), `right` pour ceux
 * ancrés à droite (elle s'étend vers la gauche) — sans passer par la boîte
 * intermédiaire. Le calcul (bord de la boîte d'origine = décalage `left` +
 * 31.25rem) est documenté item par item ci-dessous.
 *
 * `order-N` fixe l'ordre d'empilement du repli mobile (< 950px), où les
 * vignettes redeviennent un flux vertical normal : hat, shoulderPads, wings,
 * cape, shield, costume, pet, mount — repris de l'attribut `order-*` de
 * l'original (le rang 7, partagé avec l'arme dans l'original, n'a pas
 * d'équivalent ici : `SkinItems` ne porte pas d'emplacement arme).
 */
const POSITIONS: Record<keyof SkinItems, string> = {
  // left-[calc(50%+11.5rem)] top-[6rem] order-1
  hat: "order-1 min-[950px]:top-[6rem] min-[950px]:left-[calc(50%+11.5rem)]",
  // left-[calc(50%+8.5rem)] top-[12rem] order-2
  shoulderPads: "order-2 min-[950px]:top-[12rem] min-[950px]:left-[calc(50%+8.5rem)]",
  // bord droit de la boîte d'origine : 50% - 37rem + 31.25rem = 50% - 5.75rem
  wings: "order-3 min-[950px]:top-[6rem] min-[950px]:right-[calc(50%+5.75rem)]",
  // bord droit de la boîte d'origine : 50% - 40rem + 31.25rem = 50% - 8.75rem
  cape: "order-4 min-[950px]:top-[18rem] min-[950px]:right-[calc(50%+8.75rem)]",
  // bord droit de la boîte d'origine : 50% - 41rem + 31.25rem = 50% - 9.75rem
  shield: "order-5 min-[950px]:top-[12rem] min-[950px]:right-[calc(50%+9.75rem)]",
  // left-[calc(50%+10rem)] top-[18rem] order-6
  costume: "order-6 min-[950px]:top-[18rem] min-[950px]:left-[calc(50%+10rem)]",
  // bord droit de la boîte d'origine : 50% - 43.5rem + 31.25rem = 50% - 12.25rem
  pet: "order-7 min-[950px]:top-[24rem] min-[950px]:right-[calc(50%+12.25rem)]",
  // left-[calc(50%+8.5rem)] top-[24rem] order-8
  mount: "order-8 min-[950px]:top-[24rem] min-[950px]:left-[calc(50%+8.5rem)]",
};

/**
 * Les couleurs rendues par `/api/skin/{id}` (type `SkinColors`).
 *
 * Les couleurs de guilde sont affichées à part, plus bas : elles existent en
 * base (`unity_skins.color_guild_1/2`) mais pas dans la réponse de cet
 * endpoint, et les valeurs montrées sont donc des remplaçantes.
 */
const COULEURS: { cle: keyof SkinColors; libelle: string }[] = [
  { cle: "skin", libelle: "Peau" },
  { cle: "hair", libelle: "Cheveux" },
  { cle: "cloth_1", libelle: "Tenue 1" },
  { cle: "cloth_2", libelle: "Tenue 2" },
  { cle: "cloth_3", libelle: "Tenue 3" },
  { cle: "cloth_4", libelle: "Tenue 4" },
];

/**
 * La fiche d'un skin — la page vers laquelle pointe chaque carte de la
 * galerie.
 *
 * Trois cas réels, documentés en tête de `src/lib/fixtures/skins.ts`, que la
 * fiche doit encaisser sans casser :
 *   - `name` peut être nul (skin 94882) — un titre de repli est affiché ;
 *   - `breed` peut être vide, `{}` (skin 94867) — le badge de classe ne
 *     s'affiche simplement pas ;
 *   - `image_path` peut renvoyer 404 (skin 94879) — comme sur la carte de la
 *     galerie, on pose une balise <img> ordinaire et on laisse le
 *     comportement natif du navigateur (icône d'image cassée) plutôt que
 *     d'inventer un état d'erreur que l'API ne signale pas.
 */
export function SkinDetail({
  skin,
  locale,
  t,
}: {
  skin: SkinCardItem;
  locale: Locale;
  t: Messages;
}) {
  const classe = skin.breed?.name;
  const description = classe ? `Skin Dofus ${classe}` : "Skin Dofus";

  const items = EMPLACEMENTS.map((emplacement) => ({
    ...emplacement,
    item: skin.items[emplacement.cle],
  })).filter(
    (emplacement): emplacement is (typeof EMPLACEMENTS)[number] & { item: SkinItem } =>
      emplacement.item !== null,
  );

  return (
    <main className="mx-auto w-[min(100%,64rem)] flex-1 px-4 py-10">
      <Link
        href={lien(locale, "/skins")}
        className="text-inactive hover:text-ivory inline-flex items-center gap-x-1 text-sm transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        {t.buttonSkins}
      </Link>

      {/* Nom, auteur, vues */}
      <div className="mt-4 flex flex-col items-center gap-y-2 text-center">
        <div className="text-inactive flex items-center gap-x-1 text-lg">
          <span>{skin.total_views.toLocaleString(locale)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Le nom du skin est souvent absent en production : un titre de
            repli, moins affirmatif, prend sa place plutôt que de laisser le
            haut de la fiche vide. */}
        {skin.name ? (
          <h1 className="font-display bg-gradient-to-r from-gold-text to-gold-text-lit bg-clip-text text-4xl font-normal text-transparent italic">
            {skin.name}
          </h1>
        ) : (
          <h1 className="text-inactive font-display text-4xl font-thin italic">Skin sans nom</h1>
        )}

        <p className="text-ivory font-thin">
          par <span className="text-gold-text font-normal">{skin.user.name}</span>
        </p>
      </div>

      {/* Classe et genre. Le badge de classe ne s'affiche pas quand `breed`
          est vide (`{}`), cas réel en production (skin 94867). */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {classe ? (
          <span className="border-ivory text-gold-text rounded-md border-2 px-4 py-1 font-thin">
            {classe}
          </span>
        ) : null}

        {skin.gender === 0 || skin.gender === 1 ? (
          <span className="border-ivory text-ivory flex items-center gap-x-2 rounded-md border-2 px-4 py-1 font-thin">
            {skin.gender === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                />
              </svg>
            )}
            {skin.gender === 0 ? t.filterGenderMale : t.filterGenderFemale}
          </span>
        ) : null}
      </div>

      {/* L'image du skin, entourée des items équipés façon poupée à
          habiller — la signature visuelle de la fiche sur le site actuel.
          Quand l'image manque — cas courant pour un skin qui vient d'être
          posté (skin 94879) — le navigateur affiche son icône d'image cassée
          native, comme sur la carte de galerie.

          `min-[950px]:pt-24` pousse l'image de 6rem, pour lui laisser la
          place face aux vignettes du haut (chapeau, ailes) ancrées à
          `top-[6rem]` ; `min-[950px]:min-h-[34rem]` garantit assez de hauteur
          pour contenir les vignettes du bas (familier, monture, jusqu'à
          `top-[24rem]`) même quand l'image elle-même est basse — l'original
          s'en remet à la hauteur naturelle de l'image, ce qui peut laisser
          les vignettes du bas chevaucher la suite de la page pour une image
          très courte ; ce filet de sécurité comble cette lacune plutôt que de
          la reproduire. */}
      <div className="relative mt-10 flex flex-col items-center gap-y-4 min-[950px]:min-h-[34rem] min-[950px]:pt-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={storageUrl(skin.image_path)}
          alt={skin.name ?? description}
          draggable={false}
          className="max-h-[36rem] w-auto"
        />

        {items.length === 0 ? (
          <p className="text-inactive italic">Aucun item équipé sur ce skin.</p>
        ) : (
          // Pas de `position: relative` ici : à partir de 950px, chaque `li`
          // devient absolu et se positionne par rapport au conteneur
          // ci-dessus (qui, lui, porte l'image), exactement comme
          // l'original où les items sautent leur parent flex immédiat pour
          // se positionner contre le conteneur qui porte l'image du skin.
          <ul className="flex w-full flex-col items-center gap-y-4">
            {items.map(({ cle, libelle, item }) => (
              <li
                key={cle}
                className={`bg-anthracite-lit flex w-[min(88vw,20rem)] items-center gap-x-3 rounded-md p-3 min-[950px]:absolute min-[950px]:w-auto min-[950px]:max-w-[14rem] ${POSITIONS[cle]}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={storageUrl(item.icon_path)}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="h-12 w-12 shrink-0"
                />
                {/* Le nom de l'item est toujours visible, pas seulement au
                    survol : c'est ce que fait déjà l'original
                    (`x-skins-presentation.item`), et ça satisfait
                    l'accessibilité sans rien ajouter. */}
                <div className="min-w-0">
                  <p className="text-inactive text-xs font-light uppercase">{libelle}</p>
                  <p className="text-ivory font-thin italic">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Couleurs */}
      <section className="mt-16">
        <h2 className="font-display text-ivory border-ivory mb-6 border-b pb-2 text-2xl">
          Couleurs
        </h2>

        <ul className="flex flex-wrap gap-6">
          {COULEURS.map(({ cle, libelle }) => {
            // L'API rend les couleurs en hexadécimal SANS le croisillon
            // (« E9AF86 ») : il faut l'ajouter pour en faire une valeur CSS
            // valide.
            const hex = `#${skin.colors[cle]}`;

            return (
              <li key={cle} className="flex flex-col items-center gap-y-1">
                {/* Couleur du skin : elle vient des données, pas de l'UI —
                    c'est le seul endroit légitime pour une couleur en style
                    inline plutôt qu'un jeton de design. La pastille n'est pas
                    la seule porteuse de l'information : le libellé et la
                    valeur hexadécimale sont aussi affichés en texte, pour ne
                    rien réserver à la seule vue. */}
                <span
                  role="img"
                  aria-label={`${libelle} : ${hex}`}
                  style={{ backgroundColor: hex }}
                  className="border-ivory h-12 w-12 rounded-md border-2"
                />
                <p className="text-ivory text-xs font-thin">{libelle}</p>
                <p className="text-inactive text-xs uppercase">{hex}</p>
              </li>
            );
          })}
        </ul>

        {/* Les couleurs de guilde. Elles existent en base mais pas dans la
            réponse de `/api/skin/{id}` : les valeurs affichées ici sont des
            remplaçantes, reprises des couleurs de tenue du skin. La mise en
            page, elle, est définitive. */}
        <h3 className="font-display text-ivory mt-10 mb-4 text-xl">Couleurs de guilde</h3>

        <ul className="flex flex-wrap gap-6">
          {(
            [
              { cle: "guild_1", libelle: "Guilde 1" },
              { cle: "guild_2", libelle: "Guilde 2" },
            ] as const
          ).map(({ cle, libelle }) => {
            const hex = `#${skin.colors_guild[cle]}`;

            return (
              <li key={cle} className="flex flex-col items-center gap-y-1">
                <span
                  role="img"
                  aria-label={`${libelle} : ${hex}`}
                  style={{ backgroundColor: hex }}
                  className="border-ivory h-12 w-12 rounded-md border-2"
                />
                <p className="text-ivory text-xs font-thin">{libelle}</p>
                <p className="text-inactive text-xs uppercase">{hex}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
