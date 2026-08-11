import type { Messages } from "@/messages";
import type { HavenBag } from "@/types/api";

/**
 * L'en-tête d'un havre-sac : popoche, titre, auteur, thème.
 *
 * Partagé par la carte et la visionneuse — le site actuel recopie le même bloc
 * aux deux endroits, l'un en Blade et l'autre en Alpine, ce qui explique que
 * les deux aient légèrement divergé.
 */
export function EnteteHavreSac({ sac, t }: { sac: HavenBag; t: Messages }) {
  return (
    <div className="flex items-center gap-2 p-2 text-left">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sac.popocket_icon_path}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="hidden aspect-square h-[clamp(3rem,5vw,6rem)] shrink-0 min-[400px]:block"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-0.5">
        <div className="min-w-0">
          {sac.name && (
            <p className="truncate text-[clamp(0.9rem,1.4vw,1.3rem)]">{sac.name}</p>
          )}

          <p className="text-ivory/70 truncate text-[clamp(0.75rem,1.1vw,1rem)] font-thin">
            {t.contentBy} <span className="text-ivory font-normal">{sac.user_name}</span>
          </p>
        </div>

        <p className="text-ivory/50 truncate pt-1 text-[clamp(0.7rem,1vw,0.9rem)] font-thin">
          {t.contentTheme} :{" "}
          <span className="font-light italic">
            {t.contentHS} {sac.theme_name}
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Une carte de la galerie.
 *
 * L'image est cadrée en 16/9 et débordée volontairement : le site actuel la
 * fait dériver lentement de haut en bas (`animate-slideY`, avec un décalage
 * aléatoire pour désynchroniser les cartes). Cette dérive n'est pas reprise —
 * une dizaine d'images animées en permanence pour rien, et un décalage tiré au
 * hasard au rendu serveur casserait l'hydratation. Le débordement, lui, est
 * gardé : il sert au zoom au survol.
 */
export function CarteHavreSac({
  sac,
  t,
  onOuvrir,
}: {
  sac: HavenBag;
  t: Messages;
  onOuvrir: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOuvrir}
      className="bg-anthracite-lit group relative w-full overflow-hidden rounded-xl shadow-sm transition-all hover:brightness-110"
    >
      <EnteteHavreSac sac={sac} t={t} />

      <div className="relative aspect-video w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sac.image_path}
          alt={sac.name ?? `Havre-sac de ${sac.user_name}`}
          draggable={false}
          loading="lazy"
          className="absolute top-[-12.5%] h-[125%] w-full object-cover transition-all duration-1000 group-hover:top-[-7.5%] group-hover:h-[115%]"
        />
      </div>
    </button>
  );
}
