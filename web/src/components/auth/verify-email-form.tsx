"use client";

import { useState, type FormEvent } from "react";

import { FormNotice } from "@/components/auth/auth-screen";
import { SubmitButton } from "@/components/forms/submit-button";
import type { Messages } from "@/messages";

/**
 * Formulaire de vérification d'e-mail.
 *
 * Pas de champ de saisie ici, juste un bouton qui redemande l'envoi de
 * l'e-mail de validation. Comme les autres formulaires d'authentification,
 * l'API n'est pas branchée : le second encart le dit clairement plutôt que
 * de laisser croire qu'un e-mail est réellement parti.
 *
 * `id` identifie l'utilisateur dont l'adresse doit être vérifiée, repris de
 * l'URL `/email/verify/[id]`. Il sert à construire l'`action` du formulaire,
 * qui pointe sur l'endpoint d'origine (`verification.send` côté Laravel).
 * Cette action n'est jamais suivie tant que `onSubmit` intercepte l'envoi,
 * mais elle documente la cible et servira telle quelle une fois l'API là.
 */
export function VerifyEmailForm({ t, id }: { t: Messages; id: string }) {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Tient lieu d'appel réseau, le temps de vérifier l'état « envoi en cours ».
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPending(false);
    setSent(true);
  }

  return (
    <form
      method="post"
      action={`/email/verification-notification/${id}`}
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-y-8"
    >
      <div className="flex flex-col items-center gap-y-8 text-center">
        <p className="text-2xl font-thin">{t.descriptionVerifyEmail1}</p>
        <p className="text-2xl font-thin">{t.descriptionVerifyEmail2}</p>
        <p className="text-2xl font-light">{t.descriptionVerifyEmail3}</p>
        <p className="text-xl font-light">{t.descriptionVerifyEmail4}</p>
      </div>

      <SubmitButton disabled={pending}>{t.buttonSendVerifyEmail}</SubmitButton>

      {sent ? (
        <>
          <FormNotice tone="success">{t.alertVerifyEmailSended}</FormNotice>
          <FormNotice>
            L&apos;API n&apos;est pas encore branchée : aucun e-mail n&apos;est réellement parti.
          </FormNotice>
        </>
      ) : null}
    </form>
  );
}
