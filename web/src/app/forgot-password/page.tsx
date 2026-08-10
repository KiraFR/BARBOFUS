import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { getMessages } from "@/messages";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  // Un écran de réinitialisation n'a rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  const t = getMessages();

  return (
    <AuthScreen title={t.titleForgotPassword} subtitle={t.descriptionForgotPassword}>
      <ForgotPasswordForm t={t} />
    </AuthScreen>
  );
}
