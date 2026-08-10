import type { ReactNode } from "react";

/**
 * Ossature commune aux écrans d'authentification : un grand titre, un
 * sous-titre, puis le formulaire.
 *
 * Reprend la mise en page de `layouts.basic-views` pour ces écrans, sans les
 * marges négatives de l'original (`-mt-10`, `-ml-[min(200px,20vw)]`) qui
 * servaient à rattraper un centrage : c'est réglé ici par une colonne de
 * largeur fixe.
 *
 * L'écran de vérification d'e-mail n'a pas de titre, d'où `title` facultatif.
 */
export function AuthScreen({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-5 py-16">
      {title ? (
        <h1 className="text-center text-[min(5rem,15vw)] leading-none font-normal uppercase">
          {title}
        </h1>
      ) : null}

      {subtitle ? (
        <h2 className="text-inactive mt-4 mb-12 text-center text-2xl font-thin uppercase">
          {subtitle}
        </h2>
      ) : null}

      {children}
    </main>
  );
}

/**
 * Encart d'information au-dessus ou au-dessous d'un formulaire : confirmation
 * d'envoi, avertissement, ou le fait que l'API n'est pas branchée.
 *
 * `whitespace-pre-line` parce que certains textes traduits tiennent sur deux
 * lignes — l'original utilisait `<br>` dans la chaîne de traduction, ce qui
 * obligeait à injecter du HTML. Un simple retour à la ligne fait la même chose
 * sans ouvrir cette porte.
 */
export function FormNotice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "success" }) {
  const tones = {
    info: "bg-pending-bg text-gold-text",
    success: "bg-emerald-dark/20 text-emerald-lit",
  };

  return (
    <p
      role="status"
      className={`${tones[tone]} w-full max-w-[350px] rounded-md px-6 py-3 text-center text-sm font-light whitespace-pre-line`}
    >
      {children}
    </p>
  );
}
