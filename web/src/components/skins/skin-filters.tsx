"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";

import { GENRES, NATURES, TYPES, type Filtres } from "@/lib/filtres";
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
 * Trois filtres sont présents mais inactifs, faute de données dans l'API :
 * les vainqueurs Miss'Skin et les skins de Barbe Douce demandent le statut et
 * l'auteur de référence, et « Montilier » n'est pas distinguable d'un familier
 * dans ce que l'API renvoie. Ils sont désactivés et le disent, plutôt que de
 * faire semblant.
 *
 * Le nuancier de couleurs n'est pas encore là : il s'appuiera sur les colonnes
 * de teinte précalculées en base, et mérite son propre écran de travail.
 */
export function SkinFilters({ t, filtres, classes }: { t: Messages; filtres: Filtres; classes: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const parametres = useSearchParams();
  const [recherche, setRecherche] = useState(filtres.q);

  /** Écrit les paramètres et recharge la page côté serveur. */
  function appliquer(modifier: (p: URLSearchParams) => void) {
    const suivants = new URLSearchParams(parametres);
    modifier(suivants);
    const requete = suivants.toString();
    router.push(requete ? `${pathname}?${requete}` : pathname, { scroll: false });
  }

  /**
   * Coche ou décoche une valeur d'un groupe.
   *
   * Le groupe n'apparaît dans l'URL que s'il s'écarte du défaut « tout coché »,
   * ce qui garde les URL lisibles.
   */
  function basculerGroupe(nom: string, valeur: string, toutes: readonly string[], actuelles: string[]) {
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
    <aside className="border-ivory bg-anthracite flex w-full flex-col gap-y-5 py-4 min-[1501px]:w-[22rem] min-[1501px]:border-r-2 min-[1501px]:pl-6">
      <p className="font-display text-ivory text-center text-2xl">{t.filterTitle}</p>

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

      <Indisponible t={t}>
        <Case coche={false} onChange={() => {}} libelle={t.filterMissSkinOnly} desactive />
        <Case coche={false} onChange={() => {}} libelle={t.filterBarbeDouceOnly} desactive />
      </Indisponible>

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
        <Indisponible t={t}>
          <Case coche={false} onChange={() => {}} libelle={t.filterTypeMountable} desactive />
        </Indisponible>
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
        {classes.map((classe) => (
          <option key={classe} value={classe}>
            {classe}
          </option>
        ))}
      </select>

      <Groupe titre="">
        {GENRES.map((genre) => (
          <Case
            key={genre.valeur}
            coche={filtres.genres.includes(genre.valeur)}
            onChange={() =>
              basculerGroupe("genre", String(genre.valeur), ["0", "1"], filtres.genres.map(String))
            }
            libelle={t[genre.cle]}
          />
        ))}
      </Groupe>
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

/** Enveloppe les filtres que l'API ne permet pas encore de servir. */
function Indisponible({ t, children }: { t: Messages; children: ReactNode }) {
  return (
    <div title={t.filterUnavailable} className="flex flex-col gap-y-2 opacity-40">
      {children}
    </div>
  );
}

function Case({
  coche,
  onChange,
  libelle,
  desactive,
}: {
  coche: boolean;
  onChange: () => void;
  libelle: string;
  desactive?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-x-1.5 font-thin",
        desactive ? "text-inactive cursor-not-allowed" : "text-ivory cursor-pointer",
      )}
    >
      <input
        type="checkbox"
        checked={coche}
        disabled={desactive}
        onChange={onChange}
        className="accent-gold-text size-4 cursor-[inherit]"
      />
      {libelle}
    </label>
  );
}
