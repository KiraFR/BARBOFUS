import { cn } from "@/lib/utils";

/**
 * L'ossature commune au planning et aux récompenses : un cadre plein écran,
 * une en-tête (pastille dorée, titre, sous-titre), et un pied discret.
 *
 * Les deux pages du site actuel partagent ce dessin au pixel près sans rien
 * mettre en commun — chacune recopie le même bloc de classes. Une seule
 * définition ici : les deux écrans bougeront désormais ensemble.
 */

export function CadreEcran({ children }: { children: React.ReactNode }) {
  return (
    <div className="from-anthracite via-anthracite-lit to-anthracite flex min-h-screen w-full max-w-screen flex-1 items-center justify-center bg-gradient-to-br p-[min(2rem,1.5vw)] pb-16 lg:pb-0 min-[1301px]:min-h-[calc(100vh-2.5rem)]">
      <div className="from-anthracite/20 to-anthracite/10 w-full max-w-[1920px] rounded-2xl border border-white/5 bg-gradient-to-br p-[min(2rem,1.5vw)] shadow-2xl backdrop-blur-sm lg:aspect-video lg:rounded-3xl">
        <div className="flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}

export function EnteteEcran({
  icone,
  titre,
  /** Le halo pulsant derrière la pastille : présent sur le planning seul. */
  halo = false,
  sousTitre,
  actions,
}: {
  icone: React.ReactNode;
  titre: React.ReactNode;
  halo?: boolean;
  sousTitre?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-8 shrink-0 lg:mb-[min(1.5rem,1vw)]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="relative">
            {halo && (
              <span
                aria-hidden="true"
                className="gold-gradient absolute inset-0 animate-pulse rounded-xl opacity-60 blur-lg md:blur-xl lg:rounded-2xl"
              />
            )}
            <div
              className={cn(
                "gold-gradient text-anthracite relative flex items-center justify-center rounded-xl p-4 shadow-lg lg:rounded-2xl",
              )}
            >
              {icone}
            </div>
          </div>

          <div>
            <h1 className="gold-gradient bg-clip-text text-xl leading-tight text-transparent md:text-3xl">
              {titre}
            </h1>
            {sousTitre}
          </div>
        </div>

        {actions}
      </div>
    </header>
  );
}

/** Une gélule d'information à droite de l'en-tête : « 10 sessions », « 49h ». */
export function Gelule({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-ivory/70 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm backdrop-blur-sm md:px-5 md:py-3 md:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Le pied de page commun : un lien vers la chaîne, en petit et en retrait. */
export function PiedEcran({ children }: { children?: React.ReactNode }) {
  return (
    <footer className="mt-4 hidden h-10 border-t border-white/5 pt-4 md:block">
      <div className="text-ivory/30 flex items-center justify-between gap-3 text-xs md:text-sm">
        <div>{children}</div>

        <a
          href="https://www.twitch.tv/barbe___douce"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ivory/50 flex items-center gap-2 transition-all"
        >
          <span>twitch.tv/barbe___douce</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
