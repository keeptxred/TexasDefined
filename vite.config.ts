import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const protectedMainDiagnostics = {
  name: "protected-main-bundle-diagnostics",
  generateBundle(_outputOptions, bundle) {
    for (const output of Object.values(bundle)) {
      if (output.type !== "chunk" || !/^assets\/main-.*\.js$/.test(output.fileName)) continue;

      const targets = Object.keys(output.modules).filter((id) =>
        id.endsWith("/src/data/painted-church-search-guides.ts") ||
        id.endsWith("/src/data/painted-church-search.ts")
      );

      console.log("PROTECTED_MAIN_TARGET_IMPORTERS_START");
      for (const id of targets) {
        const info = this.getModuleInfo(id);
        console.log(`target\t${id}`);
        for (const importer of info?.importers ?? []) console.log(`importer\t${importer}`);
        for (const importer of info?.dynamicImporters ?? []) console.log(`dynamicImporter\t${importer}`);
      }
      console.log("PROTECTED_MAIN_TARGET_IMPORTERS_END");
    }
  },
};

// Cloudflare Builds production smoke marker: safe no-op source change.
export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      router: {
        autoCodeSplitting: false,
      },
    }),
    tsConfigPaths(),
    tailwindcss(),
    viteReact(),
    protectedMainDiagnostics,
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
