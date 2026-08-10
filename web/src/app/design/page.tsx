import type { Metadata } from "next";

import { SkinPlaceholder } from "@/components/skin-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { skins } from "@/lib/fixtures/skins";
import type { SkinStatus } from "@/types/api";

export const metadata: Metadata = {
  // Le suffixe « — BARBOFUS » est ajouté par le gabarit défini dans layout.tsx.
  title: "Jetons de design",
  robots: { index: false, follow: false },
};

const brandColors = [
  { name: "anthracite", className: "bg-anthracite", hex: "#292522" },
  { name: "anthracite-lit", className: "bg-anthracite-lit", hex: "#332f2c" },
  { name: "ivory", className: "bg-ivory", hex: "#fff5e9" },
  { name: "ivory-dark", className: "bg-ivory-dark", hex: "#f2e8dc" },
  { name: "gold-text", className: "bg-gold-text", hex: "#fcb943" },
  { name: "gold-text-lit", className: "bg-gold-text-lit", hex: "#fbe25b" },
  { name: "gold-dark", className: "bg-gold-dark", hex: "#fba436" },
  { name: "gold-lit", className: "bg-gold-lit", hex: "#faed61" },
  { name: "cawotte-dark", className: "bg-cawotte-dark", hex: "#e2510f" },
  { name: "cawotte-lit", className: "bg-cawotte-lit", hex: "#ff891c" },
  { name: "emerald-dark", className: "bg-emerald-dark", hex: "#488911" },
  { name: "emerald-lit", className: "bg-emerald-lit", hex: "#e6ff00" },
  { name: "heart-gray", className: "bg-heart-gray", hex: "#99928b" },
  { name: "heart-dark", className: "bg-heart-dark", hex: "#b10f0f" },
  { name: "heart-lit", className: "bg-heart-lit", hex: "#f33a3a" },
  { name: "inactive", className: "bg-inactive", hex: "#8b847b" },
  { name: "refused-bg", className: "bg-refused-bg", hex: "#483131" },
  { name: "pending-bg", className: "bg-pending-bg", hex: "#4d4532" },
];

const semanticColors = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
];

const gradients = [
  { name: "gold-gradient", className: "gold-gradient" },
  { name: "cawotte-gradient", className: "cawotte-gradient" },
  { name: "emerald-gradient", className: "emerald-gradient" },
  { name: "heart-gradient", className: "heart-gradient" },
];

/** Rendu d'un statut de modération, aux couleurs prévues pour ça en base. */
function StatusBadge({ status }: { status: SkinStatus }) {
  const styles: Record<SkinStatus, string> = {
    Posted: "bg-emerald-dark text-ivory",
    Pending: "bg-pending-bg text-gold-text",
    Refused: "bg-refused-bg text-heart-lit",
    MissSkin: "gold-gradient text-anthracite",
  };
  const labels: Record<SkinStatus, string> = {
    Posted: "Publié",
    Pending: "En attente",
    Refused: "Refusé",
    MissSkin: "Miss'Skin",
  };
  return <Badge className={styles[status]}>{labels[status]}</Badge>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl text-gold-text">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="space-y-2">
        <h1 className="font-display text-4xl text-gold-text">Jetons de design</h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Page de contrôle interne — elle ne fait pas partie du site. Elle sert à vérifier que
          la palette, la typographie et les composants de base sont en place et cohérents.
        </p>
      </header>

      <Section title="Couleurs de marque">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brandColors.map((color) => (
            <div key={color.name} className="space-y-1.5">
              <div className={`${color.className} border-border h-14 rounded-md border`} />
              <p className="font-mono text-xs">{color.name}</p>
              <p className="text-muted-foreground font-mono text-xs">{color.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Jetons sémantiques">
        <p className="text-muted-foreground -mt-2 max-w-2xl text-sm">
          Ce sont eux qu&apos;il faut utiliser au quotidien : les composants shadcn/ui s&apos;y
          branchent seuls. Les couleurs de marque ci-dessus restent pour les usages identitaires.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {semanticColors.map((color) => (
            <div key={color.name} className="space-y-1.5">
              <div className={`${color.className} border-border h-14 rounded-md border`} />
              <p className="font-mono text-xs">{color.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dégradés">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gradients.map((gradient) => (
            <div key={gradient.name} className="space-y-1.5">
              <div className={`${gradient.className} h-14 rounded-md`} />
              <p className="font-mono text-xs">{gradient.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typographie">
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">
            « MADE Okin » et « MV Boli » ne sont pas encore embarquées — question de licence
            non tranchée. La pile retombe sur Geist en attendant.
          </p>
          <p className="font-display text-3xl">
            font-display — titres — Le Feca contemple l&apos;horizon
          </p>
          <p className="text-lg">font-sans — corps de texte — Le Feca contemple l&apos;horizon</p>
          <p className="text-muted-foreground text-sm">
            text-muted-foreground — texte secondaire, mentions, compteurs
          </p>
        </div>
      </Section>

      <Section title="Composants de base">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Publier</Button>
          <Button variant="secondary">Filtrer</Button>
          <Button variant="outline">Annuler</Button>
          <Button variant="ghost">Voir plus</Button>
          <Button variant="destructive">Supprimer</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status="Posted" />
          <StatusBadge status="Pending" />
          <StatusBadge status="Refused" />
          <StatusBadge status="MissSkin" />
        </div>
        <Input placeholder="Rechercher un skin…" className="max-w-sm" />
      </Section>

      <Section title="Carte de skin">
        <p className="text-muted-foreground -mt-2 max-w-2xl text-sm">
          Données de démonstration, silhouettes teintées par les vraies couleurs de chaque skin.
          Ce n&apos;est pas la carte définitive de la galerie — juste la preuve que le contrat de
          données traverse jusqu&apos;à l&apos;écran.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skins.map((skin) => (
            <Card key={skin.id} className="overflow-hidden">
              <CardHeader className="gap-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-display text-base">
                    {skin.name ?? "Sans nom"}
                  </CardTitle>
                  <StatusBadge status={skin.status} />
                </div>
                <p className="text-muted-foreground text-xs">
                  {skin.race?.name ?? "Classe inconnue"} ·{" "}
                  {skin.gender === 1 ? "Femme" : "Homme"} · par {skin.author.name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-anthracite-lit flex justify-center rounded-md py-4">
                  <SkinPlaceholder skin={skin} className="h-40" />
                </div>
              </CardContent>
              <CardFooter className="text-muted-foreground justify-between text-xs">
                <span className={skin.liked_by_me ? "text-heart-lit" : undefined}>
                  ♥ {skin.likes_count}
                </span>
                <span>{skin.total_views.toLocaleString("fr-FR")} vues</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
