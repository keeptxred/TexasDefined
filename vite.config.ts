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

      const target = Object.keys(output.modules).find((id) =>
        id.endsWith("/src/data/painted-church-search-guides.ts")
      );
      if (!target) continue;

      console.log("PROTECTED_MAIN_IMPORT_CHAIN_START");
      const seen = new Set();
      const visit = (id, depth) => {
        if (seen.has(id) || depth > 8) return;
        seen.add(id);
        const info = this.getModuleInfo(id);
        console.log(`${depth}\t${id}`);
        for (const importer of info?.importers ?? []) visit(importer, depth + 1);
      };
      visit(target, 0);
      console.log("PROTECTED_MAIN_IMPORT_CHAIN_END");
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
