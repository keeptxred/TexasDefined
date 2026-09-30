import { createServer } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const vite = await createServer({
  configFile: false,
  plugins: [tsconfigPaths()],
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  await vite.ssrLoadModule("/scripts/data/audit-metro-proximity-index-readiness.ts");
} finally {
  await vite.close();
}
