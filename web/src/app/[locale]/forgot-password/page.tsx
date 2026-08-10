import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  // Un écran de réinitialisation n'a rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // La langue a déjà été validée par la mise en page : une valeur inconnue
  // n'atteint jamais cette page, elle part en 404.
  const { locale } = await params;
  const t = getMessages(locale);

  return (
    <AuthScreen title={t.titleForgotPassword} subtitle={t.descriptionForgotPassword}>
      <ForgotPasswordForm t={t} locale={locale} />
    </AuthScreen>
  );
}
