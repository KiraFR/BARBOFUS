import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Champ de saisie du site : une icône encadrée à gauche, le champ à droite.
 *
 * Porté de `resources/views/components/forms/text-input.blade.php`, avec le
 * comportement d'origine : l'icône et son trait passent de gris à ivoire dès
 * que le champ contient quelque chose, et l'encadré passe à l'or au focus.
 *
 * Entièrement en CSS, sans état React : `:placeholder-shown` dit si le champ
 * est vide, et `peer` propage l'information à l'encadré qui suit. L'icône et
 * le trait n'ont pas de couleur propre — ils héritent celle de l'encadré via
 * `currentColor`, donc une seule déclaration commande les deux.
 *
 * Conséquence : pas de « use client », rien à hydrater, et l'affichage est
 * correct même si le JavaScript ne s'exécute jamais.
 */
export function TextField({
  label,
  name,
  type = "text",
  icon,
  error,
  autoComplete,
  className,
}: {
  /** Sert de placeholder et d'étiquette accessible. */
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  icon: ReactNode;
  error?: string;
  autoComplete?: string;
  className?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <div className={cn("w-full max-w-[350px]", className)}>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>

      <div className={cn("flex h-12 rounded-md", error && "err-border")}>
        <input
          id={name}
          name={name}
          type={type}
          maxLength={255}
          // Le placeholder doit rester non vide : c'est lui qui rend
          // `:placeholder-shown` utilisable pour détecter un champ vide.
          placeholder={label}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer bg-anthracite-lit border-anthracite-lit placeholder-inactive",
            "focus:border-gold-text h-full w-full rounded-r-md border-y-2 border-r-2 p-2 pr-3",
            "outline-none transition-all",
          )}
        />

        {/* `order-first` : l'encadré s'affiche à gauche mais reste après le
            champ dans le DOM, pour que les variantes `peer-*` l'atteignent. */}
        <div
          className={cn(
            "bg-anthracite-lit border-anthracite-lit peer-focus:border-gold-text",
            // La couleur du texte commande l'icône et le trait, par héritage.
            // Écrit à l'endroit — ivoire par défaut, gris tant que le champ est
            // vide — pour n'employer que `peer-placeholder-shown`, une variante
            // standard : la forme négative entre crochets ne génère rien.
            "text-ivory peer-placeholder-shown:text-inactive",
            "relative order-first flex h-full w-12 items-center justify-between",
            "rounded-l-md border-y-2 border-l-2 p-2 transition-all",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
            className="h-full w-full transition-all"
          >
            {icon}
          </svg>

          <div className="absolute left-0 h-8 w-full border-r-2 border-current transition-all" />
        </div>
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-heart-lit mt-2 text-sm font-light">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Les tracés d'icônes utilisés par les formulaires, repris de l'original. */
export const fieldIcons = {
  email: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  ),
  password: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  ),
} as const;
