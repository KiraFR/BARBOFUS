import Link from "next/link";

import { EcranErreur } from "@/components/layout/ecran-erreur";
import { localeCourante } from "@/lib/locale-serveur";
import { getMessages } from "@/messages";

/**
 * La page 404.
 *
 * Elle se rend à l'intérieur de la mise en page de `(site)` : le visiteur égaré
 * garde donc le menu et le pied de page, donc de quoi repartir.
 *
 * Deux chemins y mènent : `notFound()` appelé par une page (une fiche de skin
 * dont l'identifiant n'existe pas), et l'attrape-tout `[...introuvable]` pour
 * les adresses qui ne correspondent à rien.
 *
 * La langue vient d'un en-tête posé par le proxy : Next ne passe pas `params`
 * à cet écran. Voir `src/lib/locale-serveur.ts`.
 */
export default async function PageIntrouvable() {
  const locale = await localeCourante();
  const t = getMessages(locale);

  return (
    <EcranErreur
      titre={t.contentLost}
      detail={t.content404}
      action={
        <Link
          href={`/${locale}`}
          className="gold-gradient text-anthracite rounded-md px-6 py-3 text-lg transition-all hover:rounded-3xl hover:brightness-110"
        >
          {t.buttonHome}
        </Link>
      }
    />
  );
}
