import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { RegisterForm } from "@/components/auth/register-form";
import { getMessages } from "@/messages";

export const metadata: Metadata = {
  title: "Inscription",
  // Une page d'inscription n'a rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  const t = getMessages();

  return (
    <AuthScreen title={t.titleRegister} subtitle={t.descriptionRegister1}>
      <RegisterForm t={t} />
    </AuthScreen>
  );
}
