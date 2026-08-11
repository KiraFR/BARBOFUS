import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { CompteTabs } from "@/components/compte/compte-tabs";
import { utilisateurCourant } from "@/lib/auth";
import { getMessages, lien, type Locale } from "@/messages";

/**
 * L'espace membre.
 *
 * Le site actuel met tout sur une seule URL et change d'onglet en JavaScript.
 * Ici chaque onglet a sa route : on peut envoyer un lien vers « mes favoris »,
 * revenir en arrière, ouvrir dans un nouvel onglet — toutes choses que la
 * version actuelle ne permet pas.
 *
 * La garde d'accès est ici plutôt que dans chaque page : une seule vérification
 * couvre tout l'espace, et aucune page ne peut être ajoutée en oubliant de la
 * protéger.
 */
export default async function CompteLayout({
  children,
  params,
}: {
  children: ReactNode;
  // `string` et non `Locale` : Next impose cette forme aux props de layout. La
  // valeur a déjà été validée par la mise en page racine, qui renvoie un 404
  // pour toute langue inconnue — d'où la conversion juste en dessous.
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const utilisateur = await utilisateurCourant();

  if (!utilisateur) {
    redirect(lien(locale, "/login"));
  }

  const t = getMessages(locale);

  return (
    <main className="mx-auto w-[min(100%-2rem,75rem)] flex-1 py-10">
      <h1 className="font-display text-gold-text text-center text-4xl uppercase">
        {t.titleMyAccount}
      </h1>
      <p className="text-inactive mt-2 mb-10 text-center text-xl font-thin">
        {t.descriptionMyAccount}
      </p>

      <CompteTabs t={t} locale={locale} />

      <div className="mt-10">{children}</div>
    </main>
  );
}
