import fs from "node:fs";
import path from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import "./scripts/assets/materialize-generated-images.mjs";

// Diagnostic only: surfaces which source modules are actually retained in the main client chunk.
// Does not alter code splitting, bundle budgets, emitted assets or mandatory gates.
function reportClientMainModuleWeights(): Plugin {
  return {
    name: "texasdefined-report-client-main-modules",
    apply: "build",
    generateBundle(_output, bundle) {
      if (process.env.GITHUB_ACTIONS !== "true") return;
      const mainChunks = Object.values(bundle).filter(
        (item) => item.type === "chunk" && item.fileName.split("/").pop()?.startsWith("main-") && item.fileName.endsWith(".js"),
      );
      for (const chunk of mainChunks) {
        if (chunk.type !== "chunk") continue;
        const ranked = Object.entries(chunk.modules)
          .filter(([, detail]) => detail.renderedLength > 0)
          .sort((a, b) => b[1].renderedLength - a[1].renderedLength)
          .slice(0, 35)
          .map(([id, detail]) => `${detail.renderedLength} bytes  ${path.relative(process.cwd(), id)}`);
        console.log("[client-main-modules] " + chunk.fileName + "\\n" + ranked.join("\\n"));
      }
    },
  };
}

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
    reportClientMainModuleWeights(),
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
