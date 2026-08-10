import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { getMessages } from "@/messages";

export const metadata: Metadata = {
  title: "Réinitialisation du mot de passe",
  // Un lien de réinitialisation est à usage unique : rien à indexer.
  robots: { index: false, follow: false },
};

// Next.js 16 : `params` est une promesse, y compris pour un segment dynamique
// unique — il faut l'attendre avant de lire `token`.
//
// Type écrit à la main plutôt que le `PageProps<"...">` généré par Next : ce
// dernier vient de `.next/types`, et quand l'ancien et le nouveau cache
// coexistent, les deux déclarations globales entrent en conflit et la
// compilation échoue. La forme explicite ne dépend d'aucune génération.
export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const t = getMessages();

  return (
    <AuthScreen title={t.titleResetPassword} subtitle={t.descriptionResetPassword}>
      <ResetPasswordForm t={t} token={token} />
    </AuthScreen>
  );
}
