"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { FormNotice } from "@/components/auth/auth-screen";
import { connecter } from "@/lib/auth-actions";
import { SubmitButton } from "@/components/forms/submit-button";
import { fieldIcons, TextField } from "@/components/forms/text-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { lien, type Locale, type Messages } from "@/messages";

type FieldErrors = {
  email?: string;
  password?: string;
};

/**
 * Formulaire de connexion.
 *
 * Il ne connecte personne : l'API n'est pas branchée. Ce qui est réel ici,
 * c'est la validation, les états (repos, envoi en cours, erreur) et
 * l'accessibilité. Le jour où l'API existe, seul `onSubmit` change.
 */
export function LoginForm({ t, locale }: { t: Messages; locale: Locale }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const found: FieldErrors = {};

    if (!email) {
      found.email = t.errorEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      found.email = t.errorEmailInvalid;
    }

    if (!password) {
      found.password = t.errorPasswordRequired;
    }

    return found;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const donnees = new FormData(event.currentTarget);
    const found = validate(event.currentTarget);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // Ouvre la session simulée côté serveur, qui redirige vers l'accueil.
    // Aucun identifiant n'est vérifié : voir l'avertissement affiché plus bas
    // et le garde-fou dans src/lib/auth.ts.
    setPending(true);
    donnees.set("locale", locale);
    await connecter(donnees);
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col items-center gap-y-8">
      <FormNotice>{t.authSimulee}</FormNotice>

      <TextField
        name="email"
        type="email"
        label={t.inputEmail}
        icon={fieldIcons.email}
        error={errors.email}
        autoComplete="email"
      />

      <TextField
        name="password"
        type="password"
        label={t.inputPassword}
        icon={fieldIcons.password}
        error={errors.password}
        autoComplete="current-password"
      />

      <SubmitButton disabled={pending}>{t.buttonLogin}</SubmitButton>

      {notice ? <FormNotice>{notice}</FormNotice> : null}

      <div className="flex w-full max-w-[350px] flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="remember"
            name="remember"
            className="border-inactive hover:border-ivory data-[state=checked]:bg-gold-text data-[state=checked]:text-anthracite data-[state=checked]:border-gold-text size-5 cursor-pointer transition-all"
          />
          <Label
            htmlFor="remember"
            className="text-inactive hover:text-ivory cursor-pointer text-lg font-light transition-all"
          >
            {t.inputRememberMe}
          </Label>
        </div>

        <Link
          href={lien(locale, "/forgot-password")}
          className="text-gold-text hover:text-gold-text-lit text-lg font-normal transition-all"
        >
          {t.buttonForgotPassword}
        </Link>

        <p className="font-thin">
          {t.descriptionNoAccount}{" "}
          <Link
            href={lien(locale, "/register")}
            className="text-gold-text hover:text-gold-text-lit text-lg font-normal transition-all"
          >
            {t.buttonRegister}
          </Link>
        </p>
      </div>
    </form>
  );
}
