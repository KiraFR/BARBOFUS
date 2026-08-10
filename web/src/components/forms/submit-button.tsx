import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Le bouton d'envoi du site : dégradé doré, texte anthracite, majuscules,
 * et l'espacement des lettres qui s'ouvre au survol.
 *
 * Porté de `resources/views/components/forms/submit.blade.php`.
 */
export function SubmitButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      className={cn(
        "gold-gradient text-anthracite rounded-lg px-8 py-3 text-lg font-normal uppercase",
        "transition-all hover:tracking-widest hover:brightness-110 focus:brightness-75",
        "disabled:tracking-normal disabled:brightness-75",
        className,
      )}
      {...props}
    />
  );
}
