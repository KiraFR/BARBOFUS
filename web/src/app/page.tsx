import Link from "next/link";

/**
 * Page d'accueil — vide pour l'instant.
 *
 * Le premier écran réellement construit sera l'authentification (le plus
 * simple, pour roder la stack), puis la galerie. L'accueil viendra après,
 * quand les composants qu'il assemble existeront.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-gold-text text-4xl">BARBOFUS</h1>
      <p className="text-muted-foreground">
        Refonte en cours. Rien à voir ici pour le moment.
      </p>
      <p>
        <Link href="/design" className="text-primary underline underline-offset-4">
          Voir les jetons de design
        </Link>
      </p>
    </main>
  );
}
