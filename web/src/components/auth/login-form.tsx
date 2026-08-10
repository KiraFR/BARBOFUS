"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { fieldIcons, TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Messages } from "@/messages";

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
export function LoginForm({ t }: { t: Messages }) {
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

    const found = validate(event.currentTarget);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // Tient lieu d'appel réseau, le temps de vérifier l'état « envoi en cours ».
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPending(false);
    setNotice("L'API n'est pas encore branchée : personne ne peut se connecter pour l'instant.");
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

      <TextField
        name="password"
        type="password"
        label={t.inputPassword}
        icon={fieldIcons.password}
        error={errors.password}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        disabled={pending}
        className="gold-gradient text-anthracite rounded-lg px-8 py-3 text-lg font-normal uppercase transition-all hover:tracking-widest hover:brightness-110 focus:brightness-75 disabled:tracking-normal disabled:brightness-75"
      >
        {t.buttonLogin}
      </Button>

      {notice ? (
        <p role="status" className="bg-pending-bg text-gold-text max-w-[350px] rounded-md px-6 py-3 text-center text-sm font-light">
          {notice}
        </p>
      ) : null}

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
          href="/forgot-password"
          className="text-gold-text hover:text-gold-text-lit text-lg font-normal transition-all"
        >
          {t.buttonForgotPassword}
        </Link>

        <p className="font-thin">
          {t.descriptionNoAccount}{" "}
          <Link
            href="/register"
            className="text-gold-text hover:text-gold-text-lit text-lg font-normal transition-all"
          >
            {t.buttonRegister}
          </Link>
        </p>
      </div>
    </form>
  );
}
