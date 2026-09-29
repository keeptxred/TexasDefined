import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  data: "src/data/metro-proximity.ts",
  hubRoute: "src/routes/explore.near.$metro.tsx",
  collectionRoute: "src/routes/explore.near.$metro.$collection.tsx",
  exploreRoute: "src/routes/explore.index.tsx",
  exploreUi: "src/routes/explore.index.lazy.tsx",
  sitemap: "src/routes/sitemap-explore[.]xml.ts",
  package: "package.json",
};
for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) throw new Error(`Metro proximity validation failed: missing required file ${path}`);
}
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const fail = (message) => { throw new Error(`Metro proximity validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const metroSlugs = [...files.data.matchAll(/slug: "(houston|dallas|fort-worth|austin|san-antonio)"/g)].map((match) => match[1]);
if (metroSlugs.length !== 5 || new Set(metroSlugs).size !== 5) fail(`expected exactly five unique metro definitions, found ${new Set(metroSlugs).size}`);

const collectionMatch = files.data.match(/METRO_PROXIMITY_COLLECTIONS\s*=\s*\[([\s\S]*?)\n\] as const;/);
const collectionSlugs = collectionMatch ? [...collectionMatch[1].matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
const expectedCollections = ["things-to-do", "day-trips", "state-parks", "small-towns", "lakes-rivers", "historic-sites"];
if (JSON.stringify(collectionSlugs) !== JSON.stringify(expectedCollections)) fail(`collection allowlist drifted: ${collectionSlugs.join(", ")}`);

for (const token of [
  "radiusMiles:",
  "minimumMiles:",
  "minResults:",
  "maxResults:",
  "distanceFromPointMiles",
  "selectMetroProximityDestinations",
  "isMetroProximityCollectionIndexReady",
  "metroProximityHubReady",
  "metroProximityCanonicalPath",
  "metroProximitySitemapEntries",
]) requireText(files.data, token, `data model missing ${token}`);

for (const token of [
  'createFileRoute("/explore/near/$metro")',
  "isPrimaryTripPlannerDestination",
  "auditDestination(destination).readyForIndexing",
  "metroProximityHubReady",
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"index, follow, max-image-preview:large"',
  '"noindex, follow"',
  "straight-line geographic estimates",
  'to="/explore/near/$metro/$collection"',
  'to="/explore/trip-planner"',
]) requireText(files.hubRoute, token, `metro hub route missing ${token}`);

for (const token of [
  'createFileRoute("/explore/near/$metro/$collection")',
  "getMetroProximityCollection",
  "selectMetroProximityDestinations",
  "isMetroProximityCollectionIndexReady",
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"index, follow, max-image-preview:large"',
  '"noindex, follow"',
  "straight-line estimates",
  "not road miles or drive-time promises",
  'to="/destination/$slug"',
  'to="/explore/near/$metro"',
]) requireText(files.collectionRoute, token, `metro collection route missing ${token}`);

for (const token of [
  "METRO_PROXIMITY_METROS",
  "metroProximityCanonicalPath",
  "Day Trips & Things to Do Near",
]) requireText(files.exploreRoute, token, `Explore structured discovery missing ${token}`);

for (const token of [
  "METRO_PROXIMITY_METROS",
  "Explore from a Texas metro",
  'to="/explore/near/$metro"',
  "Find day trips without scanning the whole state",
]) requireText(files.exploreUi, token, `Explore internal discovery missing ${token}`);

for (const token of [
  "metroProximitySitemapEntries",
  "metroProximitySitemapEntries(indexableDestinations)",
  "const proximityEntries",
  "...proximityEntries",
]) requireText(files.sitemap, token, `Explore sitemap missing ${token}`);

const pkg = JSON.parse(files.package);
if (pkg.scripts?.["metro-proximity:validate"] !== "node scripts/data/validate-metro-proximity.mjs") fail("package script metro-proximity:validate is missing or changed");
if (!pkg.scripts?.["data:validate"]?.includes("npm run metro-proximity:validate")) fail("metro proximity validation is not wired into data:validate");

for (const forbidden of [
  "/explore/near/near/",
  "guaranteed drive time",
  "exact drive time",
  "best attraction near",
  "sponsored ranking",
]) {
  if (Object.values(files).some((source) => source.toLowerCase().includes(forbidden.toLowerCase()))) fail(`forbidden proximity pattern leaked: ${forbidden}`);
}

console.log("Metro proximity validation passed: five metro hubs and thirty intent landings are allowlisted, distance-ranked, quality-gated, fail-closed for indexing, sitemap-owned and internally discoverable.");
