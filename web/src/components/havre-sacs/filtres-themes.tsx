"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import type { Messages } from "@/messages";
import type { HavenBagTheme } from "@/types/api";

/**
 * La colonne « Affine ta recherche » : les thèmes de havre-sac, en deux
 * groupes — ceux qui filtrent la galerie, et les autres.
 *
 * Comme pour les skins, la sélection passe par l'URL (`?theme=3&theme=7`) là
 * où le site actuel la garde dans l'état Livewire. Une galerie filtrée devient
 * donc partageable, et la page peut se rendre côté serveur.
 *
 * Le sens des flèches est celui de l'original : vers le haut pour faire monter
 * un thème dans les actifs, vers le bas pour l'en sortir.
 */
export function FiltresThemes({
  themes,
  selection,
  t,
}: {
  themes: HavenBagTheme[];
  selection: number[];
  t: Messages;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const parametres = useSearchParams();

  const actifs = themes.filter((theme) => selection.includes(theme.id));
  const inactifs = themes.filter((theme) => !selection.includes(theme.id));

  function basculer(id: number) {
    const suivants = selection.includes(id)
      ? selection.filter((valeur) => valeur !== id)
      : [...selection, id];

    const p = new URLSearchParams(parametres);
    p.delete("theme");
    for (const valeur of suivants) p.append("theme", String(valeur));

    // La visionneuse n'a pas de raison de rester ouverte après un changement
    // de filtre : le havre-sac affiché peut très bien sortir de la sélection.
    p.delete("show");

    const requete = p.toString();
    router.push(requete ? `${pathname}?${requete}` : pathname, { scroll: false });
  }

  return (
    <aside className="border-anthracite-lit no-scrollbar sticky top-16 hidden h-[calc(100vh-15vh-4rem)] w-96 shrink-0 overflow-y-auto border-r-2 p-2 min-[600px]:block">
      <p className="text-gold-text flex items-center justify-center gap-2 text-[1.35rem] font-medium tracking-wide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-10 w-10"
        >
          <path d="M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {t.contentRefineSearch}
      </p>

      {actifs.length > 0 && (
        <GroupeThemes
          titre={t.contentSet}
          themes={actifs}
          t={t}
          actif
          onBasculer={basculer}
        />
      )}

      <GroupeThemes titre={t.contentUnset} themes={inactifs} t={t} onBasculer={basculer} />
    </aside>
  );
}

function GroupeThemes({
  titre,
  themes,
  t,
  actif = false,
  onBasculer,
}: {
  titre: string;
  themes: HavenBagTheme[];
  t: Messages;
  actif?: boolean;
  onBasculer: (id: number) => void;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-ivory text-[1.25rem] font-thin">{titre} :</h2>

      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onBasculer(theme.id)}
            aria-pressed={actif}
            className="bg-anthracite-lit group relative h-fit overflow-hidden rounded-lg"
          >
            <p className="px-2 py-0.5 text-left text-[0.9rem] font-thin">
              <span className="hidden min-[900px]:inline">{t.contentTheme} </span>
              {theme.name}
            </p>

            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={theme.image_path}
                alt=""
                aria-hidden="true"
                draggable={false}
                loading="lazy"
                className="absolute top-[-25%] h-[150%] w-full object-cover transition-all group-hover:top-[-30%] group-hover:h-[160%]"
              />
            </div>

            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 flex justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100",
                actif ? "text-heart-lit items-end" : "text-gold-text items-start",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={cn("h-1/2", actif && "rotate-180")}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
