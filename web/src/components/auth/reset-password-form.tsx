"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { FormNotice } from "@/components/auth/auth-screen";
import { SubmitButton } from "@/components/forms/submit-button";
import { fieldIcons, TextField } from "@/components/forms/text-field";
import type { Messages } from "@/messages";

type FieldErrors = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

/**
 * Formulaire de réinitialisation de mot de passe.
 *
 * Comme `LoginForm`, il ne fait rien de réel côté réseau : l'API n'est pas
 * branchée. Le jeton reçu dans l'URL (`/reset-password/[token]`) est transmis
 * tel quel dans un champ caché, exactement comme le faisait la vue Blade
 * d'origine.
 */
export function ResetPasswordForm({ t, token }: { t: Messages; token: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const passwordConfirmation = String(data.get("password_confirmation") ?? "");
    const found: FieldErrors = {};

    if (!email) {
      found.email = t.errorEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      found.email = t.errorEmailInvalid;
    }

    if (!password) {
      found.password = t.errorPasswordRequired;
    } else if (password.length < 8) {
      found.password = t.errorPasswordTooShort;
    }

    if (password && passwordConfirmation !== password) {
      found.passwordConfirmation = t.errorPasswordMismatch;
    }

    return found;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const found = validate(event.currentTarget);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // Tient lieu d'appel réseau, le temps de vérifier l'état « envoi en cours ».
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPending(false);
    setNotice("L'API n'est pas encore branchée : le mot de passe ne peut pas encore être réinitialisé.");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col items-center gap-y-8">
      <input type="hidden" name="token" value={token} />

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
        autoComplete="new-password"
      />

      <TextField
        name="password_confirmation"
        type="password"
        label={t.inputPasswordConfirmation}
        icon={fieldIcons.password}
        error={errors.passwordConfirmation}
        autoComplete="new-password"
      />

      <SubmitButton disabled={pending}>{t.buttonSend}</SubmitButton>

      {notice ? <FormNotice>{notice}</FormNotice> : null}

      <p className="font-thin">
        {t.descriptionPasswordRetrieved}{" "}
        <Link href="/login" className="text-gold-text hover:text-gold-text-lit text-lg font-normal transition-all">
          {t.buttonLogin}
        </Link>
      </p>
    </form>
  );
}
