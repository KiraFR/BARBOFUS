import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { LoginForm } from "@/components/auth/login-form";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Connexion",
  // Une page de connexion n'a rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // La langue a déjà été validée par la mise en page : une valeur inconnue
  // n'atteint jamais cette page, elle part en 404.
  const { locale } = await params;
  const t = getMessages(locale);

  return (
    <AuthScreen title={t.titleLogin} subtitle={t.descriptionLogin}>
      <LoginForm t={t} locale={locale} />
    </AuthScreen>
  );
}
