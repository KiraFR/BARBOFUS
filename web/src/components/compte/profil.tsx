"use client";

import { useState, type FormEvent } from "react";

import { FormNotice } from "@/components/auth/auth-screen";
import { SubmitButton } from "@/components/forms/submit-button";
import { fieldIcons, TextField } from "@/components/forms/text-field";
import type { Messages } from "@/messages";

type ErreursMotDePasse = {
  current_password?: string;
  password?: string;
  password_confirmation?: string;
};

type ErreursPseudo = { name?: string };

type ErreursEmail = { email?: string };

/**
 * Comme dans `RegisterForm` / `LoginForm` : aucune requête n'est envoyée,
 * l'API n'existe pas. Ce texte le dit sans détour plutôt que de faire
 * semblant d'avoir enregistré quelque chose — c'est la règle du projet.
 */
const NOTICE_NON_BRANCHEE =
  "Cette modification n'est pas encore enregistrée : l'API n'est pas branchée.";

/**
 * Section « Paramètres » de l'espace membre : trois formulaires distincts
 * (mot de passe, pseudo, e-mail), portés de
 * `resources/views/livewire/user-panel/user-details.blade.php`.
 *
 * Chacun valide côté client exactement comme `RegisterForm`, puis affiche un
 * `FormNotice` honnête au lieu de simuler un enregistrement.
 */
export function Profil({ t }: { t: Messages }) {
  return (
    <div className="flex flex-col gap-y-10">
      <FormulaireMotDePasse t={t} />
      <FormulairePseudo t={t} />
      <FormulaireEmail t={t} />
    </div>
  );
}

function FormulaireMotDePasse({ t }: { t: Messages }) {
  const [errors, setErrors] = useState<ErreursMotDePasse>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(form: HTMLFormElement): ErreursMotDePasse {
    const data = new FormData(form);
    const currentPassword = String(data.get("current_password") ?? "");
    const password = String(data.get("password") ?? "");
    const passwordConfirmation = String(data.get("password_confirmation") ?? "");
    const found: ErreursMotDePasse = {};

    if (!currentPassword) {
      found.current_password = t.errorPasswordRequired;
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
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPending(false);
    setNotice(NOTICE_NON_BRANCHEE);
  }

  return (
    <div>
      <h3 className="mt-8 pl-12 text-2xl font-thin uppercase">{t.labelChangePassword}</h3>

      <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-y-4 pl-4">
        <TextField
          name="current_password"
          type="password"
          label={t.inputOldPassword}
          icon={fieldIcons.password}
          error={errors.current_password}
          autoComplete="current-password"
        />

        <TextField
          name="password"
          type="password"
          label={t.inputNewPassword}
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

        <SubmitButton disabled={pending} className="w-fit">
          {t.buttonSave}
        </SubmitButton>

        {notice ? <FormNotice>{notice}</FormNotice> : null}
      </form>
    </div>
  );
}

function FormulairePseudo({ t }: { t: Messages }) {
  const [errors, setErrors] = useState<ErreursPseudo>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(form: HTMLFormElement): ErreursPseudo {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const found: ErreursPseudo = {};

    if (!name) {
      found.name = t.errorNameRequired;
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

    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPending(false);
    setNotice(NOTICE_NON_BRANCHEE);
  }

  return (
    <div>
      <h3 className="pl-12 text-2xl font-thin uppercase">{t.labelChangeName}</h3>

      <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-y-4 pl-4">
        <TextField
          name="name"
          label={t.inputNewName}
          icon={fieldIcons.name}
          error={errors.name}
          autoComplete="username"
          maxLength={64}
        />

        <SubmitButton disabled={pending} className="w-fit">
          {t.buttonSave}
        </SubmitButton>

        {notice ? <FormNotice>{notice}</FormNotice> : null}
      </form>
    </div>
  );
}

function FormulaireEmail({ t }: { t: Messages }) {
  const [errors, setErrors] = useState<ErreursEmail>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function validate(form: HTMLFormElement): ErreursEmail {
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const found: ErreursEmail = {};

    if (!email) {
      found.email = t.errorEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      found.email = t.errorEmailInvalid;
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

    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPending(false);
    setNotice(NOTICE_NON_BRANCHEE);
  }

  return (
    <div>
      <h3 className="pl-12 text-2xl font-thin uppercase">{t.labelChangeEmail}</h3>

      <p className="text-inactive mt-2 mb-4 pl-8 text-lg font-light italic">
        {t.labelChangeEmailDetail}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-y-4 pl-4">
        <TextField
          name="email"
          type="email"
          label={t.inputNewEmail}
          icon={fieldIcons.email}
          error={errors.email}
          autoComplete="email"
        />

        <SubmitButton disabled={pending} className="w-fit">
          {t.buttonSave}
        </SubmitButton>

        {notice ? <FormNotice>{notice}</FormNotice> : null}
      </form>
    </div>
  );
}
