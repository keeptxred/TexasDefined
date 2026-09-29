import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");

const data = read("src/data/metro-proximity.ts");
const route = read("src/routes/explore.$category.tsx");
const lazyRoute = read("src/routes/explore.$category.lazy.tsx");
const page = read("src/components/editorial/MetroProximityLandingPage.tsx");
const links = read("src/components/editorial/MetroProximityLinks.tsx");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const suite = read("scripts/ci/run-validation-suite.mjs");

function requireAll(label, source, needles) {
  for (const needle of needles) if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
}

function forbidAll(label, source, needles) {
  for (const needle of needles) if (source.includes(needle)) failures.push(`${label}: forbidden ${needle}`);
}

requireAll("metro registry", data, [
  '"houston"', '"dallas-fort-worth"', '"austin"', '"san-antonio"',
  '"small-towns-1-hour"', '"small-towns-2-hours"', '"small-towns-3-hours"',
  '"weekend-trips"', '"state-parks"', '"lakes"', '"swimming-holes"', '"road-trips"',
  "METRO_PROXIMITY_ROUTES",
  "new Set(page.items.map((item) => item.destination.slug))",
  "page.items.length < page.guide.minItems",
  "page.uniqueTowns < page.guide.minTowns",
  "page.uniqueCounties < page.guide.minCounties",
  "page.uniqueCategories < page.guide.minCategories",
  "summary.trim().length >= 80",
  "listIndexableMetroProximityPaths",
]);

const minItemValues = [...data.matchAll(/minItems:\s*(\d+)/g)].map((match) => Number(match[1]));
if (minItemValues.length !== 8) failures.push(`metro registry: expected 8 minItems gates, found ${minItemValues.length}`);
if (minItemValues.some((value) => value < 4)) failures.push("metro registry: every generated landing pattern must require at least four substantive destinations before indexing");

requireAll("distance honesty", data, [
  "straightLineMiles",
  "conservative straight-line distance bands",
  "not promised drive times",
  "Check a live route before leaving",
]);
forbidAll("distance honesty", data, ["driveMinutes", "durationMinutes", "exactDriveTime"]);

requireAll("dynamic Explore integration", route, [
  "metroProximityRoute(params.category)",
  "destinationsQuery({ limit: 5000 })",
  "resolveMetroProximityPageBySlug",
  'kind: "metro-proximity" as const',
  'loaderData.kind === "metro-proximity"',
  'page.indexReady ? undefined : "noindex, follow, max-image-preview:large"',
  "canonicalLink(texasDefinedBrand, page.canonicalPath)",
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
]);

requireAll("landing-page UX", page, [
  "MapPreview",
  "maps.directionsUrl",
  "destination.bestSeason",
  'to="/county/$slug"',
  "relatedMetroProximityLinks",
  "Collection still growing",
  "verify the live driving route",
  "md:grid-cols-2",
  "xl:grid-cols-3",
]);

requireAll("category discovery", lazyRoute, [
  "MetroProximityLandingPage",
  "MetroProximityLinks",
  'data.kind === "metro-proximity"',
  "<MetroProximityLinks category={match.slug}",
]);
requireAll("category link registry", links, [
  "metroProximityLinksForCategory",
  "Houston, Dallas–Fort Worth, Austin and San Antonio",
]);

requireAll("sitemap qualification", sitemap, [
  "listIndexableMetroProximityPaths",
  "const metroProximityPaths = listIndexableMetroProximityPaths(indexableDestinations)",
  "...metroProximityPaths",
]);

requireAll("canonical CI contract", suite, [
  "metro-proximity-unit",
  "src/data/__tests__/metro-proximity.test.ts",
  "metro-proximity-seo",
  "scripts/data/validate-metro-proximity-seo.mjs",
]);

if (failures.length) {
  console.error("Metro-proximity SEO validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Metro-proximity SEO validation passed: four launch metros, eight intent patterns, conservative distance framing, conditional indexing, canonical/schema coverage, sitemap qualification, mobile UX, maps, county links and category discovery are protected.");
