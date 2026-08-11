"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";

import { ColorPicker } from "@/components/skins/color-picker";
import { CLASSES, GENRES, NATURES, TYPES, type Filtres } from "@/lib/filtres";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages";

/**
 * Le panneau « Affine ta recherche », à gauche de la galerie.
 *
 * Chaque filtre s'écrit dans l'URL, ce qui n'est pas le cas du site actuel :
 * là-bas seules la recherche, la classe et la couleur y passent, les cases à
 * cocher restant dans l'état Livewire. Résultat, une galerie filtrée n'y est
 * pas partageable. Ici tout y est — c'est de toute façon nécessaire pour que
 * la page se rende côté serveur.
 *
 * Tous les filtres sont actifs. Deux d'entre eux ne rendront cependant leur
 * plein effet qu'avec l'API : « skins de Barbe Douce » attend son identifiant
 * de compte, et « Montilier » attend que l'API distingue ce type d'un familier
 * ordinaire. L'interface, elle, est complète.
 *
 * Le filtre couleur compare des teintes, pas des couleurs à l'identique : le
 * calcul vit dans `src/lib/filtres.ts`, à côté du reste du filtrage.
 */
export function SkinFilters({ t, filtres }: { t: Messages; filtres: Filtres }) {
  const router = useRouter();
  const pathname = usePathname();
  const parametres = useSearchParams();
  const [recherche, setRecherche] = useState(filtres.q);
  // Sous 1501 px le panneau se replie derrière un bouton, comme sur le site.
  const [ouvert, setOuvert] = useState(false);

  /** Écrit les paramètres et recharge la page côté serveur. */
  function appliquer(modifier: (p: URLSearchParams) => void) {
    const suivants = new URLSearchParams(parametres);
    modifier(suivants);
    const requete = suivants.toString();
    router.push(requete ? `${pathname}?${requete}` : pathname, { scroll: false });
  }

  /** Active ou désactive un filtre à deux états, écrit dans l'URL en « 1 ». */
  function basculerDrapeau(nom: string, actif: boolean) {
    appliquer((p) => {
      if (actif) p.delete(nom);
      else p.set(nom, "1");
    });
  }

  /**
   * Coche ou décoche une valeur d'un groupe.
   *
   * Le groupe n'apparaît dans l'URL que s'il s'écarte du défaut « tout coché »,
   * ce qui garde les URL lisibles.
   */
  function basculerGroupe(
    nom: string,
    valeur: string,
    toutes: readonly string[],
    actuelles: string[],
  ) {
    const suivantes = actuelles.includes(valeur)
      ? actuelles.filter((v) => v !== valeur)
      : [...actuelles, valeur];

    appliquer((p) => {
      p.delete(nom);
      const toutCoche = suivantes.length === toutes.length;
      if (!toutCoche) {
        // Zéro coché est un état légitime : il ne doit rien afficher, donc on
        // écrit une valeur impossible plutôt que d'omettre le paramètre.
        if (suivantes.length === 0) p.append(nom, "aucun");
        else for (const v of suivantes) p.append(nom, v);
      }
    });
  }

  return (
    <aside className="border-ivory bg-anthracite w-full py-4 min-[1501px]:w-[22rem] min-[1501px]:shrink-0 min-[1501px]:border-r-2 min-[1501px]:pl-6">
      {/* Au-dessus de 1500 px, un simple titre au sommet de la colonne. */}
      <p className="font-display text-ivory hidden text-center text-2xl min-[1501px]:block">
        {t.filterTitle}
      </p>

      {/* En dessous, le même titre devient le bouton qui déplie le panneau. */}
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        className="font-display text-ivory bg-anthracite-lit mx-auto flex items-center gap-x-3 rounded-md px-6 py-3 text-xl transition-all hover:brightness-125 min-[1501px]:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          className={cn("h-6 w-6 transition-transform", ouvert ? "" : "rotate-180")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
          />
        </svg>
        {t.filterTitle}
      </button>

      {/* Le contenu. Colonne unique dans la barre latérale ; deux colonnes
          côte à côte aux largeurs intermédiaires, comme sur le site. */}
      <div
        className={cn(
          "flex-col gap-y-5 pt-4",
          ouvert ? "flex" : "hidden min-[1501px]:flex",
          "min-[901px]:max-[1500px]:flex-row min-[901px]:max-[1500px]:justify-center min-[901px]:max-[1500px]:gap-x-12",
        )}
      >
        <div className="flex flex-col gap-y-5">
          {/* Recherche libre. Le site actuel propose une autocomplétion sur les
          items et les pseudos, qui demande leurs tables ; en attendant, la
          saisie filtre sur les noms déjà présents dans les données. */}
          <div>
            <label htmlFor="recherche" className="text-ivory block font-thin">
              {t.filterSearchLabel}
            </label>
            <input
              id="recherche"
              type="text"
              maxLength={45}
              autoComplete="off"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  appliquer((p) => {
                    if (recherche.trim()) p.set("q", recherche.trim());
                    else p.delete("q");
                  });
                }
              }}
              onBlur={() =>
                appliquer((p) => {
                  if (recherche.trim()) p.set("q", recherche.trim());
                  else p.delete("q");
                })
              }
              placeholder={t.filterSearchPlaceholder}
              className="bg-anthracite-lit placeholder-inactive text-inactive mt-1 w-[90%] rounded-sm border-transparent px-4 py-2 font-thin focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Case
              coche={filtres.missSkin}
              onChange={() => basculerDrapeau("missskin", filtres.missSkin)}
              libelle={t.filterMissSkinOnly}
            />
            {/* Ce filtre fonctionne mais ne retiendra rien tant que
                ID_BARBE_DOUCE n'est pas renseigné — voir src/lib/filtres.ts. */}
            <Case
              coche={filtres.barbeDouce}
              onChange={() => basculerDrapeau("barbedouce", filtres.barbeDouce)}
              libelle={t.filterBarbeDouceOnly}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          <Groupe titre={t.filterItemsCanBe}>
            {NATURES.map((nature) => (
              <Case
                key={nature.valeur}
                coche={filtres.natures.includes(nature.valeur)}
                onChange={() =>
                  basculerGroupe(
                    "nature",
                    nature.valeur,
                    NATURES.map((n) => n.valeur),
                    filtres.natures,
                  )
                }
                libelle={t[nature.cle]}
              />
            ))}
          </Groupe>

          <Groupe titre={t.filterOnlyShow}>
            {TYPES.map((type) => (
              <Case
                key={type.valeur}
                coche={filtres.types.includes(type.valeur)}
                onChange={() =>
                  basculerGroupe(
                    "type",
                    type.valeur,
                    TYPES.map((ty) => ty.valeur),
                    filtres.types,
                  )
                }
                libelle={t[type.cle]}
              />
            ))}
          </Groupe>

          {/* Classe. Le site actuel écrit déjà ce filtre dans l'URL sous `classe`,
          on garde le même nom de paramètre. */}
          <select
            value={filtres.classes[0] ?? ""}
            onChange={(e) =>
              appliquer((p) => {
                p.delete("classe");
                if (e.target.value) p.append("classe", e.target.value);
              })
            }
            className="bg-anthracite-lit text-inactive w-[90%] rounded-md px-4 py-3 font-thin focus:outline-none"
          >
            <option value="">{t.filterChooseClass}</option>
            {CLASSES.map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>

          {/* Couleur. Même nom de paramètre que le site actuel (`color`),
          voir src/lib/filtres.ts pour le calcul de teinte. */}
          <Groupe titre={t.filterColors}>
            <ColorPicker
              libelle={t.filterColors}
              valeur={filtres.couleur}
              onChange={(hex) =>
                appliquer((p) => {
                  if (hex) p.set("color", hex);
                  else p.delete("color");
                })
              }
            />
          </Groupe>

          <Groupe titre="">
            {GENRES.map((genre) => (
              <Case
                key={genre.valeur}
                coche={filtres.genres.includes(genre.valeur)}
                onChange={() =>
                  basculerGroupe(
                    "genre",
                    String(genre.valeur),
                    ["0", "1"],
                    filtres.genres.map(String),
                  )
                }
                libelle={t[genre.cle]}
              />
            ))}
          </Groupe>
        </div>
      </div>
    </aside>
  );
}

function Groupe({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-y-2">
      {titre ? (
        <p className="text-ivory border-ivory w-fit border-b pr-8 pb-1 font-thin">{titre}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">{children}</div>
    </div>
  );
}

function Case({
  coche,
  onChange,
  libelle,
}: {
  coche: boolean;
  onChange: () => void;
  libelle: string;
}) {
  return (
    <label className="text-ivory flex cursor-pointer items-center gap-x-1.5 font-thin">
      <input
        type="checkbox"
        checked={coche}
        onChange={onChange}
        className="accent-gold-text size-4 cursor-[inherit]"
      />
      {libelle}
    </label>
  );
}
