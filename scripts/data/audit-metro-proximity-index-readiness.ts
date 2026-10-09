import { listResolvedDestinations } from "../../src/data/destination-query-runtime.ts";
import {
  METRO_PROXIMITY_COLLECTIONS,
  METRO_PROXIMITY_METROS,
  isMetroProximityCollectionIndexReady,
  metroProximityHubReady,
  selectMetroProximityDestinations,
} from "../../src/data/metro-proximity.ts";

const destinations = await listResolvedDestinations({ limit: 5000 });

function normalizedCounty(destination) {
  return destination.county?.replace(/\s+County$/i, "").trim().toLowerCase() ?? "";
}

function readinessMetrics(metro, collection) {
  const rows = selectMetroProximityDestinations(destinations, metro, collection);
  const towns = new Set(rows.map((row) => row.destination.nearestTown.trim().toLowerCase()).filter(Boolean)).size;
  const counties = new Set(rows.map((row) => normalizedCounty(row.destination)).filter(Boolean)).size;
  const categories = new Set(rows.map((row) => row.destination.category)).size;
  const qualityRows = rows.filter((row) => row.destination.summary.trim().length >= 80 && Boolean(row.destination.hero?.src)).length;
  const ready = isMetroProximityCollectionIndexReady(destinations, metro, collection);
  const gaps = [];

  if (rows.length < collection.minResults) gaps.push(`results ${rows.length}/${collection.minResults}`);
  if (towns < collection.minTowns) gaps.push(`towns ${towns}/${collection.minTowns}`);
  if (counties < collection.minCounties) gaps.push(`counties ${counties}/${collection.minCounties}`);
  if (categories < collection.minCategories) gaps.push(`categories ${categories}/${collection.minCategories}`);
  if (qualityRows < rows.length) gaps.push(`summary/image quality ${qualityRows}/${rows.length}`);

  const deficit =
    Math.max(0, collection.minResults - rows.length) / Math.max(1, collection.minResults)
    + Math.max(0, collection.minTowns - towns) / Math.max(1, collection.minTowns)
    + Math.max(0, collection.minCounties - counties) / Math.max(1, collection.minCounties)
    + Math.max(0, collection.minCategories - categories) / Math.max(1, collection.minCategories)
    + (qualityRows < rows.length ? 1 : 0);

  return {
    metro: metro.slug,
    metroName: metro.name,
    collection: collection.slug,
    collectionLabel: collection.label,
    ready,
    resultCount: rows.length,
    towns,
    counties,
    categories,
    qualityRows,
    deficit,
    gaps,
  };
}

const matrix = METRO_PROXIMITY_METROS.flatMap((metro) =>
  METRO_PROXIMITY_COLLECTIONS.map((collection) => readinessMetrics(metro, collection)),
);
const readyCollections = matrix.filter((row) => row.ready);
const readyHubs = METRO_PROXIMITY_METROS.filter((metro) => metroProximityHubReady(destinations, metro));
const sitemapEligible = readyCollections.length + readyHubs.length;

console.log(
  `Metro proximity readiness audit: ${readyCollections.length}/${matrix.length} collection pages index-ready; `
  + `${readyHubs.length}/${METRO_PROXIMITY_METROS.length} hub pages index-ready; `
  + `${sitemapEligible} sitemap-eligible proximity URLs from ${destinations.length} resolved SEO-ready destinations.`,
);

console.log("\nPer-hub readiness:");
for (const metro of METRO_PROXIMITY_METROS) {
  const rows = matrix.filter((row) => row.metro === metro.slug);
  const ready = rows.filter((row) => row.ready);
  const hubReady = metroProximityHubReady(destinations, metro);
  console.log(
    `- ${metro.name}: ${ready.length}/${rows.length} collection pages index-ready; hub ${hubReady ? "index-ready" : "noindex"}.`,
  );
}


/**
 * Editorial diagnosis, not an indexing override. List the exact quality-gated
 * nearby inventory behind McAllen's noindex hub so content expansion can be
 * prioritized against actual missing categories, towns and counties instead
 * of filling fabricated pages or weakening the canonical eligibility rules.
 */
console.log("\\nMcAllen authority expansion evidence (quality-gated source catalog):");
const mcallen = METRO_PROXIMITY_METROS.find((metro) => metro.slug === "mcallen");
if (mcallen) {
  const readiness = matrix.filter((row) => row.metro === "mcallen");
  const countReady = readiness.filter((row) => row.ready).length;
  console.log(`McAllen hub: ${countReady} of 4 minimum qualifying collection pages, current ${countReady >= 4 ? "index-ready" : "noindex"}.`);
  for (const collection of METRO_PROXIMITY_COLLECTIONS) {
    const metric = readiness.find((row) => row.collection === collection.slug);
    const selected = selectMetroProximityDestinations(destinations, mcallen, collection);
    const categories = [...new Set(selected.map((row) => row.destination.category))].sort();
    const counties = [...new Set(selected.map((row) => normalizedCounty(row.destination)).filter(Boolean))].sort();
    const towns = [...new Set(selected.map((row) => row.destination.nearestTown.trim()).filter(Boolean))].sort();
    console.log(`- ${collection.slug}: ${metric?.ready ? "ready" : "noindex"}; ${selected.length} guides; categories [${categories.join(", ")}]; counties [${counties.join(", ")}]; ${metric?.gaps.join("; ") || "none"}`);
    if (collection.slug === "things-to-do" || collection.slug === "historic-sites" || collection.slug === "state-parks") {
      console.log(`  Evidence-backed selected guides: ${selected.map((row) => `${row.destination.slug} (${row.destination.category}; ${row.destination.nearestTown})`).join(" | ") || "none"}`);
      console.log(`  Represented towns: ${towns.join(", ") || "none"}`);
    }
  }
}

const nearReady = matrix
  .filter((row) => !row.ready)
  .sort((left, right) =>
    left.deficit - right.deficit
    || right.resultCount - left.resultCount
    || left.metroName.localeCompare(right.metroName)
    || left.collectionLabel.localeCompare(right.collectionLabel),
  )
  .slice(0, 40);

console.log("\nNear-ready blocked combinations (lowest aggregate threshold deficit first):");
for (const row of nearReady) {
  console.log(
    `- ${row.metroName} / ${row.collectionLabel}: ${row.gaps.length ? row.gaps.join("; ") : "blocked by quality gate"}.`,
  );
}
