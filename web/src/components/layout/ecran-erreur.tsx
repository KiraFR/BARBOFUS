import { storageUrl } from "@/lib/assets";

/**
 * L'écran d'erreur du site : un grand titre, une explication, et Barbe qui
 * pleure.
 *
 * Reprend le gabarit des huit pages d'erreur de Laravel, qui partagent toutes
 * la même forme — seul le texte change. L'image, elle, n'est présente que sur
 * la 404 côté Laravel ; on la garde partout, une page d'erreur nue étant plus
 * inquiétante qu'utile.
 */
export function EcranErreur({
  titre,
  detail,
  action,
}: {
  titre: string;
  detail: string;
  /** Un bouton ou un lien pour repartir. */
  action?: React.ReactNode;
}) {
  return (
    <main className="flex w-full flex-1 flex-col items-center px-4 pb-16">
      <h1 className="mt-10 text-center text-[min(4rem,15vw)] font-normal uppercase">{titre}</h1>

      <p className="-mt-3 mb-8 max-w-3xl text-center text-2xl font-thin uppercase">{detail}</p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={storageUrl("images/misc_ui/Barbe_pleure.webp")}
        alt=""
        aria-hidden="true"
        className="w-[min(80vw,20rem)]"
      />

      {action && <div className="mt-10">{action}</div>}
    </main>
  );
}
