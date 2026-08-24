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
      if (output.type !== "chunk" || !/^assets\/main-.*\.js$/.test(output.fileName)) {
        continue;
      }

      const modules = Object.entries(output.modules)
        .map(([id, info]) => ({ id, renderedLength: info.renderedLength }))
        .sort((a, b) => b.renderedLength - a.renderedLength)
        .slice(0, 50);

      console.log("PROTECTED_MAIN_MODULES_START");
      for (const { id, renderedLength } of modules) {
        console.log(`${renderedLength}\t${id}`);
      }
      console.log("PROTECTED_MAIN_MODULES_END");
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
