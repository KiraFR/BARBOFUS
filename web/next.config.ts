import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le dépôt contient aussi l'application Laravel, qui a son propre
  // package-lock.json à la racine. Sans ça, Turbopack prend la racine du dépôt
  // pour la racine du projet et surveille tout Laravel pour rien.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
