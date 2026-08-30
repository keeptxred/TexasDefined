import fs from "node:fs";
import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";

const SLUG = "best-texas-stargazing-weekend-trips";
const CANONICAL = "/texas-stargazing-guide";
const manifest = buildGatewayProductionManifest(process.cwd());
const entry = manifest.entries.find((candidate) => candidate.slug === SLUG);

if (!entry) {
  console.error(`Stargazing consolidation validation failed: missing manifest entry for ${SLUG}.`);
  process.exit(1);
}

const readinessSource = fs.readFileSync("src/data/fixtures/texas-gateway-index-readiness.ts", "utf8");
const stubsSource = fs.readFileSync("src/data/fixtures/texas-gateway-index-ready-stubs.ts", "utf8");
const promotions = JSON.parse(fs.readFileSync("scripts/data/texas-gateway-editorial-promotions.json", "utf8"));
const routeSource = fs.readFileSync("src/routes/texas-stargazing-guide.tsx", "utf8");

const failures = [];
if (entry.existingCompetingUrl !== CANONICAL) failures.push(`expected canonical competitor ${CANONICAL}, found ${entry.existingCompetingUrl ?? "none"}`);
if (!entry.blockers.includes(`cannibalization:${CANONICAL}`)) failures.push(`manifest must retain explicit cannibalization blocker for ${CANONICAL}`);
if (entry.allowlisted) failures.push("competing gateway article must not remain allowlisted for indexing");
if (readinessSource.includes(`\"${SLUG}\"`)) failures.push("competing gateway slug must not remain in TEXAS_GATEWAY_INDEX_READY_SLUGS");
if (stubsSource.includes(`slug: \"${SLUG}\"`)) failures.push("competing gateway article must not remain in public discovery stubs");
if ((promotions.promotions ?? []).some((promotion) => promotion.slug === SLUG && promotion.status === "index-ready")) failures.push("competing gateway article must not retain an index-ready editorial promotion");
if (!routeSource.includes(`const canonicalPath = \"${CANONICAL}\"`)) failures.push("canonical stargazing guide must retain its exact canonical path");

if (failures.length) {
  console.error(`Stargazing consolidation validation failed: ${failures.join(", ")}`);
  console.error(JSON.stringify(entry, null, 2));
  process.exit(1);
}

console.log(`Stargazing consolidation passed: ${SLUG} stays quarantined from indexed discovery and ${CANONICAL} remains the single canonical stargazing authority.`);
