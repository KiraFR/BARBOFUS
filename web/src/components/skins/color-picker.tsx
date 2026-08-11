"use client";

import { useId } from "react";

/**
 * La pastille de couleur du filtre « Couleurs », et le sélecteur qu'elle ouvre.
 *
 * Le site actuel embarque un sélecteur maison (carré saturation/valeur,
 * curseur de teinte, champs R/G/B) porté par une bibliothèque JS. On s'appuie
 * ici sur `<input type="color">` : le navigateur fournit un sélecteur
 * équivalent nativement — accessible au clavier, sans dépendance à
 * maintenir — et la pastille cliquable du site est conservée comme
 * déclencheur visuel : elle habille l'input natif plutôt que de le
 * remplacer.
 */
export function ColorPicker({
  valeur,
  onChange,
  libelle,
}: {
  /** Hexadécimal sans croisillon, en minuscules ; `null` si aucune couleur choisie. */
  valeur: string | null;
  onChange: (hex: string | null) => void;
  libelle: string;
}) {
  const id = useId();
  // `<input type="color">` attend un hexadécimal AVEC croisillon ; sans
  // sélection, on l'ouvre sur le noir, comme le site actuel.
  const hex = `#${valeur ?? "000000"}`;

  return (
    <div className="flex items-center gap-x-3">
      <label htmlFor={id} className="text-ivory sr-only">
        {libelle}
      </label>

      {/* La pastille. Sa couleur vient du choix de l'utilisateur, pas de
          l'interface — c'est le seul endroit légitime pour une couleur en
          style inline plutôt qu'un jeton de design. L'input natif est
          superposé, transparent, et porte l'interaction réelle. */}
      <div
        style={{ background: hex }}
        className="border-ivory relative h-10 w-10 shrink-0 overflow-hidden rounded border-2"
      >
        <input
          id={id}
          type="color"
          value={hex}
          onChange={(e) => onChange(e.target.value.slice(1).toLowerCase())}
          className="h-full w-full cursor-pointer opacity-0"
        />
      </div>

      {/* La couleur choisie ne doit pas reposer sur la seule pastille : sa
          valeur hexadécimale est aussi affichée en texte. */}
      {valeur ? (
        <>
          <p className="text-inactive text-xs uppercase">{hex}</p>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Réinitialiser les couleurs"
            className="text-inactive hover:text-ivory text-xs underline"
          >
            Réinitialiser
          </button>
        </>
      ) : null}
    </div>
  );
}
