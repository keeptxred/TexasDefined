import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

/**
 * Production builds must NOT deploy a Worker without every governed Discover
 * WebP. Cloudflare's historical independent Git Build ran only "npm run build"
 * and could silently replace the image-complete GitHub Actions deployment.
 * This check is intentionally part of Vite buildStart, regardless of CI host.
 */
export function governedDiscoverSlugs({ spawn = spawnSync } = {}) {
  const call = spawn(process.execPath, [
    path.resolve("scripts/assets/materialize-discover-overrides.mjs"),
    "--list-slugs",
  ], { encoding: "utf8", timeout: 15_000 });
  if (call.status !== 0) {
    throw new Error("Unable to load governed Discover image registry: " + (call.stderr || call.error?.message || call.status));
  }
  return call.stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

export function requireGovernedDiscoverBuildAssets({
  directory = path.resolve("public/images/discover"),
  slugs = governedDiscoverSlugs(),
  minimum = 42,
} = {}) {
  if (!Array.isArray(slugs) || slugs.length < minimum || new Set(slugs).size !== slugs.length
      || slugs.some((s) => !/^[a-z0-9-]+$/.test(s))) {
    throw new Error("Governed Discover image registry incomplete, duplicated or invalid; refusing deployment.");
  }
  if (!fs.existsSync(directory)) {
    throw new Error("Governed Discover derivatives are absent. Run npm run prebuild and the governed Discover materializer before npm run build; refusing image-incomplete Worker deployment.");
  }
  const missing = [];
  const invalid = [];
  for (const slug of slugs) {
    const file = path.join(directory, slug + ".webp");
    if (!fs.existsSync(file)) { missing.push(slug); continue; }
    const bytes = fs.readFileSync(file);
    if (bytes.length < 12 || bytes.toString("ascii", 0, 4) !== "RIFF"
        || bytes.toString("ascii", 8, 12) !== "WEBP") invalid.push(slug);
  }
  if (missing.length || invalid.length) {
    throw new Error(`Governed Discover build is not publishable: ${missing.length} missing, ${invalid.length} invalid WebP derivative(s). Missing: ${missing.join(", ") || "none"}; invalid: ${invalid.join(", ") || "none"}. Generate and verify exact governed assets before deploying.`);
  }
  return slugs.length;
}
