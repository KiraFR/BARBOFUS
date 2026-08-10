import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { RegisterForm } from "@/components/auth/register-form";
import { getMessages, type Locale } from "@/messages";

export const metadata: Metadata = {
  title: "Inscription",
  // Une page d'inscription n'a rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // La langue a déjà été validée par la mise en page : une valeur inconnue
  // n'atteint jamais cette page, elle part en 404.
  const { locale } = await params;
  const t = getMessages(locale);

  return (
    <AuthScreen title={t.titleRegister} subtitle={t.descriptionRegister1}>
      <RegisterForm t={t} locale={locale} />
    </AuthScreen>
  );
}
