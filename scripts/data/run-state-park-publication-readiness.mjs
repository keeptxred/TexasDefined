import { createServer } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Park-only, checked-in catalog audit. No production crawling, Cloudflare requests
// or network lookup; run on demand or only when park authority files change.
const vite = await createServer({
  configFile: false,
  plugins: [tsconfigPaths()],
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});
try {
  await vite.ssrLoadModule("/scripts/data/audit-state-park-publication-readiness.ts");
} finally {
  await vite.close();
}
