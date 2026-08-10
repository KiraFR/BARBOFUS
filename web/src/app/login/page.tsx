import type { Metadata } from "next";

import { AuthScreen } from "@/components/auth/auth-screen";
import { LoginForm } from "@/components/auth/login-form";
import { getMessages } from "@/messages";

export const metadata: Metadata = {
  title: "Connexion",
  // Une page de connexion n'a rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  const t = getMessages();

  return (
    <AuthScreen title={t.titleLogin} subtitle={t.descriptionLogin}>
      <LoginForm t={t} />
    </AuthScreen>
  );
}
