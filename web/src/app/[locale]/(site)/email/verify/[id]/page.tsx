import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Vérification de l'e-mail",
  // Un lien de vérification ne concerne qu'un seul utilisateur : rien à indexer.
  robots: { index: false, follow: false },
};

// Next.js 16 : `params` est une promesse, y compris pour un segment
// dynamique unique — il faut l'attendre avant de lire `id`.
//
// Le type `PageProps<"/email/verify/[id]">` généré par Next.js existe, mais
// dépend d'un fichier de types (`.next/types` ou `.next/dev/types`) reconstruit
// par `next dev`/`next build` : selon le moment où ce fichier est régénéré, les
// deux versions coexistent et se fondent en un type incohérent, ce qui fait
// échouer `tsc`. La forme explicite ci-dessous ne dépend d'aucune génération.
export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const t = getMessages(locale);

  return (
    // Pas de titre sur cet écran, contrairement aux autres écrans d'authentification.
    <AuthScreen>
      <VerifyEmailForm t={t} id={id} />
    </AuthScreen>
  );
}
