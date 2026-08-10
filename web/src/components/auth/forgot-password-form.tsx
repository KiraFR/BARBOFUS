"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { FormNotice } from "@/components/auth/auth-screen";
import { SubmitButton } from "@/components/forms/submit-button";
import { fieldIcons, TextField } from "@/components/forms/text-field";
import type { Messages } from "@/messages";

type FieldErrors = {
  email?: string;
};

/**
 * Formulaire de mot de passe oublié.
 *
 * Comme pour la connexion, l'API n'est pas branchée : aucun e-mail ne part
 * réellement. Ce qui est réel, c'est la validation de l'adresse et les
 * états (repos, envoi en cours, envoyé). Le second encart est là pour ne
 * pas laisser croire qu'un e-mail a été envoyé alors qu'il ne l'a pas été.
 */
export function ForgotPasswordForm({ t }: { t: Messages }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const found: FieldErrors = {};

    if (!email) {
      found.email = t.errorEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      found.email = t.errorEmailInvalid;
    }

    return found;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(false);

    const found = validate(event.currentTarget);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // Tient lieu d'appel réseau, le temps de vérifier l'état « envoi en cours ».
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPending(false);
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col items-center gap-y-8">
      <TextField
        name="email"
        type="email"
        label={t.inputEmail}
        icon={fieldIcons.email}
        error={errors.email}
        autoComplete="email"
      />

      <SubmitButton disabled={pending}>{t.buttonSend}</SubmitButton>

      {sent ? (
        <>
          <FormNotice tone="success">{t.alertPasswordResetSended}</FormNotice>
          <FormNotice>
            L&apos;API n&apos;est pas encore branchée : aucun e-mail n&apos;est réellement parti.
          </FormNotice>
        </>
      ) : null}

      <p className="font-thin">
        {t.descriptionPasswordRetrieved}{" "}
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
