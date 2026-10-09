import fs from "node:fs";
import path from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import "./scripts/assets/materialize-generated-images.mjs";

function governedDiscoverAssetsPlugin(): Plugin {
  return {
    name: "texasdefined-governed-discover-assets",
    apply: "build",
    buildStart() {
      const discoverDir = path.resolve("public/images/discover");
      if (!fs.existsSync(discoverDir)) return;

      for (const name of fs.readdirSync(discoverDir).filter((entry) => entry.endsWith(".webp")).sort()) {
        this.emitFile({
          type: "asset",
          fileName: `images/discover/${name}`,
          source: fs.readFileSync(path.join(discoverDir, name)),
        });
      }
    },
  };
}

// Cloudflare Builds production smoke marker: safe no-op source change.
export default defineConfig({
  plugins: [
    governedDiscoverAssetsPlugin(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      router: {
        autoCodeSplitting: false,
      },
    }),
    tsConfigPaths(),
    tailwindcss(),
    viteReact(),
  ],
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
});
