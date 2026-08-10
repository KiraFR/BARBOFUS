import type { Metadata } from "next";

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
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-5 py-16">
      <h1 className="text-center text-[min(5rem,15vw)] leading-none font-normal uppercase">
        {t.titleLogin}
      </h1>
      <h2 className="text-inactive mt-4 mb-12 text-center text-2xl font-thin uppercase">
        {t.descriptionLogin}
      </h2>

      <LoginForm t={t} />
    </main>
  );
}
