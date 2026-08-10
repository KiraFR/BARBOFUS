"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { FormNotice } from "@/components/auth/auth-screen";
import { SubmitButton } from "@/components/forms/submit-button";
import { fieldIcons, TextField } from "@/components/forms/text-field";
import type { Messages } from "@/messages";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

/**
 * Formulaire d'inscription.
 *
 * Comme `LoginForm`, il n'inscrit personne : l'API n'est pas branchée. Ce qui
 * est réel ici, c'est la validation, les états (repos, envoi en cours,
 * erreur) et l'accessibilité. Le jour où l'API existe, seul `onSubmit`
 * change.
 */
export function RegisterForm({ t }: { t: Messages }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const passwordConfirmation = String(data.get("password_confirmation") ?? "");
    const found: FieldErrors = {};

    if (!name) {
      found.name = t.errorNameRequired;
    }

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

    if (passwordConfirmation !== password) {
      found.password_confirmation = t.errorPasswordMismatch;
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
    setNotice("L'API n'est pas encore branchée : personne ne peut s'inscrire pour l'instant.");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col items-center gap-y-8">
      <FormNotice>{t.descriptionRegister2}</FormNotice>

      <TextField
        name="name"
        label={t.inputName}
        icon={fieldIcons.name}
        error={errors.name}
        autoComplete="name"
        maxLength={64}
      />

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
        error={errors.password_confirmation}
        autoComplete="new-password"
      />

      {/*
        Le bouton d'origine est protégé par Google reCAPTCHA v3 (attributs
        `g-recaptcha` / `data-sitekey` / `data-action="register"`, script
        chargé depuis google.com). On ne le réimplémente pas ici — pas de
        script externe tant que l'API d'inscription n'existe pas. À
        rebrancher au même endroit quand le formulaire enverra vraiment ses
        données.
      */}
      <SubmitButton disabled={pending}>{t.buttonRegister}</SubmitButton>

      {notice ? <FormNotice>{notice}</FormNotice> : null}

      <p className="font-thin">
        {t.descriptionAlreadyRegistered}{" "}
        <Link
          href="/login"
          className="text-gold-text hover:text-gold-text-lit text-lg font-normal transition-all"
        >
          {t.buttonLogin}
        </Link>
      </p>
    </form>
  );
}
