import type { UnitySkin } from "@/types/api";

/**
 * Visuel de remplacement pour un skin, en attendant les vraies images.
 *
 * Le site actuel stocke un rendu dans `unity_skins.image_path`. Tant que le
 * front n'est pas branché sur l'API, on ne dispose pas de ces fichiers — mais
 * on dispose des couleurs, qui sont dans les données. Cette silhouette les
 * utilise : elle change réellement d'un skin à l'autre.
 *
 * Ce n'est pas de la décoration. Un rectangle gris uniforme n'aurait rien
 * prouvé ; ici, si les couleurs remontent mal, ça se voit immédiatement.
 *
 * À supprimer le jour où `image_path` est servi par l'API.
 */
export function SkinPlaceholder({
  skin,
  className,
}: {
  skin: Pick<
    UnitySkin,
    "color_skin" | "color_hair" | "color_cloth_1" | "color_cloth_2" | "color_cloth_3"
  >;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      role="img"
      aria-label="Aperçu de remplacement du skin"
    >
      {/* Cape, en arrière-plan */}
      <path
        d="M50 44 C26 50 20 82 22 116 L78 116 C80 82 74 50 50 44 Z"
        fill={skin.color_cloth_3}
      />
      {/* Torse */}
      <path
        d="M50 46 C34 50 30 76 31 108 L69 108 C70 76 66 50 50 46 Z"
        fill={skin.color_cloth_1}
      />
      {/* Ceinture */}
      <rect x="31" y="84" width="38" height="9" fill={skin.color_cloth_2} />
      {/* Bras */}
      <path d="M32 54 C22 62 20 82 22 96 L30 96 C29 80 30 64 34 58 Z" fill={skin.color_cloth_1} />
      <path d="M68 54 C78 62 80 82 78 96 L70 96 C71 80 70 64 66 58 Z" fill={skin.color_cloth_1} />
      {/* Mains */}
      <circle cx="26" cy="98" r="6" fill={skin.color_skin} />
      <circle cx="74" cy="98" r="6" fill={skin.color_skin} />
      {/* Cou */}
      <rect x="45" y="38" width="10" height="12" fill={skin.color_skin} />
      {/* Tête */}
      <circle cx="50" cy="28" r="17" fill={skin.color_skin} />
      {/* Cheveux */}
      <path
        d="M33 26 C33 10 67 10 67 26 C67 18 60 15 50 15 C40 15 33 18 33 26 Z"
        fill={skin.color_hair}
      />
    </svg>
  );
}
