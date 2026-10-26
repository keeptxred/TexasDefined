#!/usr/bin/env node
/**
 * Reuse existing museum verification after a real production deployment when
 * museum code/media/public sources changed. No new monitoring service or cron.
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function isMuseumProductionChange(changedFiles) {
  if (!Array.isArray(changedFiles)) throw Error("Production change plan must include changedFiles array");
  return changedFiles.some(path => (
    /^src\/data\/museum-[^/]+\.(?:ts|tsx)$/.test(path)
    || /^src\/data\/museum-expansion-[^/]+\.ts$/.test(path)
    || path === "public/museum-verification-manifest.json"
    || path === "src/data/destination-query-runtime.ts"
    || path === "src/data/destination-preserved-catalog.ts"
    || path === "src/routes/destination.$slug.tsx"
    || path === "src/components/editorial/MuseumAuthorityNetworkSection.tsx"
    || path === "src/components/editorial/DestinationRelationships.tsx"
    || path === "src/lib/commons-hero-attribution.ts"
    || path === "scripts/ci/verify-museum-production.mjs"
    || path === "scripts/ci/museum-primary-hero.mjs"
  ));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const plan = JSON.parse(readFileSync(".artifacts/production-change-plan.json", "utf8"));
  if (!isMuseumProductionChange(plan.changedFiles)) {
    console.log("Museum acceptance: no museum-relevant deployment change; skip complete museum crawl.");
  } else {
    console.log("Museum acceptance: production changed museum code or licensed media; verify entire current manifest.");
    const child = spawnSync(process.execPath, ["scripts/ci/verify-museum-production.mjs"], {
      stdio: "inherit",
      env: { ...process.env, MUSEUM_VERIFY_ALL_GUIDES: "1" },
      timeout: 240_000,
    });
    if (child.error) console.error("Museum verification error:", child.error);
    process.exitCode = child.status === null ? 1 : child.status;
  }
}
