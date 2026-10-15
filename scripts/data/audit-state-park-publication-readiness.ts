import { listResolvedDestinations } from "../../src/data/destination-query-runtime";
import fs from "node:fs";
import { preservedExploreDestinations } from "../../src/data/destination-preserved-catalog";
import { publicCavernDestinationFallbacks } from "../../src/data/public-cavern-destinations";
import { applyAllCuratedDestination } from "../../src/data/destination-curation-all";
import { applyStateParkHeroAsset } from "../../src/data/state-park-heroes";
import { applyExploreHeroAsset } from "../../src/data/explore-heroes";
import { improveDestinationQuality } from "../../src/data/destination-quality";
import { auditDestination } from "../../src/data/destination-audit";
import { isCurrentlyVisitableDestination, isPrimaryTripPlannerDestination } from "../../src/data/destination-availability";
import { isTexasStateParkDestination } from "../../src/data/state-park-authority";

const official = JSON.parse(fs.readFileSync("docs/state-parks/TPWD_OFFICIAL_90_SITE_INVENTORY_2026-10-12.json", "utf8"));
const originals = new Map([...preservedExploreDestinations, ...publicCavernDestinationFallbacks].map((item) => [item.slug, item]));
const results = official.entries.filter((item: any) => item.status === "public-park" || item.status === "guided-only").map((entry: any) => {
  const slug = entry.associatedPath.replace("/destination/", "");
  const original = originals.get(slug);
  if (!original) return { slug, ready: false, blockers: ["missing-canonical-catalog-record"] };
  const destination = improveDestinationQuality(applyAllCuratedDestination(applyExploreHeroAsset(applyStateParkHeroAsset(original))));
  const audit = auditDestination(destination);
  const blockers = audit.issues.filter((issue) => issue.severity === "error").map((issue) => issue.code);
  if (!isCurrentlyVisitableDestination(destination)) blockers.push("unavailable");
  if (!isPrimaryTripPlannerDestination(destination)) blockers.push("nonprimary-alias");
  if (!isTexasStateParkDestination(destination)) blockers.push("official-park-classifier");
  return {
    slug, ready: audit.readyForIndexing && !blockers.length, blockers,
    originalBodyChars: original.body.join(" ").length,
    curatedBodyChars: destination.body.join(" ").length,
    hero: destination.hero.src,
    summaryChars: destination.summary.length,
    score: audit.score,
  };
});
const passed = results.filter((item) => item.ready);
const failed = results.filter((item) => !item.ready);
const frequencies: Record<string, number> = {};
for (const item of failed) for (const issue of item.blockers) frequencies[issue] = (frequencies[issue] || 0) + 1;
console.log(`TPWD public and guided parks: ${results.length}. Local source-checked catalog ready: ${passed.length}; blocked: ${failed.length}.`);
console.log("Remaining blockers: " + JSON.stringify(frequencies));
for (const item of failed) console.log(`PARK_NOT_READY ${item.slug}: ${item.blockers.join(", ")} (original body ${item.originalBodyChars ?? 0}, curated body ${item.curatedBodyChars ?? 0})`);
if (results.length !== 84 || !passed.length) throw new Error("TPWD catalog diagnostic failed to identify valid primary parks");

const runtime = await listResolvedDestinations({ category: "state-parks" });
const runtimeSlugs = new Set(runtime.map((destination) => destination.slug));
const expected = results.filter((result) => result.ready);
const missingRuntime = expected.filter((result) => !runtimeSlugs.has(result.slug));
const unverifiedRuntime = runtime.filter((destination) => !results.some((result) => result.slug === destination.slug));
console.log(`ACTUAL STATE PARK DIRECTORY: ${runtime.length} records; local-readiness ${passed.length}; missing-from-runtime ${missingRuntime.length}; extras ${unverifiedRuntime.length}`);
for (const item of missingRuntime) console.log(`PARK_RUNTIME_MISSING ${item.slug} (body ${item.curatedBodyChars}, hero ${item.hero})`);
for (const item of unverifiedRuntime) console.log(`PARK_RUNTIME_EXTRA ${item.slug} (${item.category})`);
if (runtime.length < 83 || missingRuntime.length) throw new Error(`State Parks full resolved list still suppresses ${missingRuntime.length} ready official parks`);
