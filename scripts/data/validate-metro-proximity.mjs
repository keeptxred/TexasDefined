import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  data: "src/data/metro-proximity.ts",
  townReferences: "src/data/metro-proximity-town-references.ts",
  test: "src/data/__tests__/metro-proximity.test.ts",
  pageData: "src/data/metro-proximity-page-data.server.ts",
  functions: "src/data/metro-proximity-page-data.functions.ts",
  hubRoute: "src/routes/explore.near.$metro.tsx",
  hubUi: "src/routes/explore.near.$metro.lazy.tsx",
  hubComponent: "src/components/explore/MetroProximityHubPage.tsx",
  collectionRoute: "src/routes/explore.near.$metro.$collection.tsx",
  collectionUi: "src/routes/explore.near.$metro.$collection.lazy.tsx",
  roadTripAuthority: "src/components/editorial/MetroRoadTripAuthority.tsx",
  exploreRoute: "src/routes/explore.index.tsx",
  exploreUi: "src/routes/explore.index.lazy.tsx",
  sitemap: "src/routes/sitemap-explore[.]xml.ts",
  routeTree: "src/routeTree.gen.ts",
  server: "src/server.ts",
  productionSmoke: "scripts/ci/verify-production-surfaces.mjs",
  audit: "scripts/data/audit-metro-proximity-index-readiness.ts",
  auditRunner: "scripts/data/run-metro-proximity-audit.mjs",
  package: "package.json",
};
for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) throw new Error(`Metro proximity validation failed: missing required file ${path}`);
}
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const fail = (message) => { throw new Error(`Metro proximity validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const expectedMetroSlugs = [
  "houston", "dallas", "fort-worth", "austin", "san-antonio", "corpus-christi", "waco",
  "beaumont-port-arthur", "amarillo", "el-paso", "lubbock", "mcallen", "midland-odessa",
  "tyler", "college-station", "abilene", "laredo", "killeen-temple", "san-angelo",
  "wichita-falls", "texarkana", "victoria",
];
const metroMatch = files.data.match(/METRO_PROXIMITY_METROS\s*=\s*\[([\s\S]*?)\n\] as const;/);
const metroSlugs = metroMatch ? [...metroMatch[1].matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
if (JSON.stringify(metroSlugs) !== JSON.stringify(expectedMetroSlugs)) fail(`metro allowlist drifted: ${metroSlugs.join(", ")}`);

const collectionMatch = files.data.match(/METRO_PROXIMITY_COLLECTIONS\s*=\s*\[([\s\S]*?)\n\] as const;/);
const collectionSlugs = collectionMatch ? [...collectionMatch[1].matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
const expectedCollections = [
  "things-to-do", "day-trips", "weekend-trips", "road-trips", "state-parks", "small-towns",
  "small-towns-1-hour", "small-towns-2-hours", "small-towns-3-hours", "lakes-rivers", "lakes",
  "swimming-holes", "historic-sites",
];
if (JSON.stringify(collectionSlugs) !== JSON.stringify(expectedCollections)) fail(`collection allowlist drifted: ${collectionSlugs.join(", ")}`);

for (const token of [
  "radiusMiles:", "minimumMiles:", "minResults:", "maxResults:", "minTowns:", "minCounties:",
  "minCategories:", "matchTerms:", "distanceFromPointMiles", "selectMetroProximityDestinations",
  "isMetroProximityCollectionIndexReady", "metroProximityHubReady", "metroProximityCanonicalPath",
  "metroProximitySitemapEntries", "const seen = new Set<string>()", "summary.trim().length >= 80",
  "collection.matchTerms.some",
]) requireText(files.data, token, `data model missing ${token}`);

for (const token of [
  '"small-towns-1-hour"', '"small-towns-2-hours"', '"small-towns-3-hours"', '"weekend-trips"',
  '"road-trips"', '"lakes"', '"swimming-holes"', "Actual road mileage and drive time vary.",
]) requireText(files.data, token, `requested intent expansion missing ${token}`);

for (const token of [
  'metroSlug: "san-angelo"', 'name: "Miles"', 'name: "Christoval"', 'name: "Mertzon"',
  'name: "Robert Lee"', 'name: "Bronte"', 'name: "Paint Rock"', 'name: "Ballinger"',
  "selectMetroProximityTownReferences", "isMetroProximityCollectionIndexReadyWithTownReferences",
  "officialUrl", "sourceCheckedAt", "destinationNames", "collection.maxResults - destinationRows.length",
]) requireText(files.townReferences, token, `supplemental town-reference layer missing ${token}`);

for (const token of [
  "unknown metro and collection slugs fail closed", "small-town hour-intent rings are non-overlapping",
  "duplicate destination slugs cannot inflate collection inventory", "swimming-hole intent requires water-use language",
  "thin or geographically narrow collections remain noindex", "substantive, diverse inventory can clear the index gate",
  "San Angelo closest-small-town page is geography-first instead of catalog-only",
  "San Angelo town references stay inside configured geographic rings",
  "a full destination guide supersedes its supplemental town reference",
]) requireText(files.test, token, `metro proximity regression test missing ${token}`);

for (const token of [
  "listResolvedDestinations", "isPrimaryTripPlannerDestination", "auditDestination", "metroIndexableDestinations",
  "loadMetroProximityHubPageDataServer", "loadMetroProximityCollectionPageDataServer", "loadMetroProximitySitemapEntriesServer",
  "loadMetroIndexableDestinationsForHub", "loadMetroIndexableDestinationsForCollection",
  "METRO_PROXIMITY_DISCOVERY_RETRY_TARGETS", '["amarillo", ["road-trips"]]', '["el-paso", ["road-trips"]]',
  "const retry = await loadMetroIndexableDestinations()", "retryRequiredReady > firstRequiredReady",
  "isMetroProximityCollectionIndexReadyWithTownReferences", "selectMetroProximityTownReferences", "metroProximitySitemapEntries",
  "selectMetroProximityDestinations", "destinations.filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing)", "optionCount", '"@type": "CollectionPage"', '"@type": "ItemList"',
  '"@type": "BreadcrumbList"', '"@type": "City"', '"index, follow, max-image-preview:large"',
  '"noindex, follow"', "buildMeta", "canonicalLink", "metroProximityCollectionPresentation",
]) requireText(files.pageData, token, `server page-data layer missing ${token}`);

for (const token of [
  "createServerFn", "getMetroProximityHubPageData", "getMetroProximityCollectionPageData",
  "loadMetroProximityHubPageDataServer", "loadMetroProximityCollectionPageDataServer",
]) requireText(files.functions, token, `server-function bridge missing ${token}`);

for (const [label, route, fn] of [
  ["hub", files.hubRoute, "getMetroProximityHubPageData"],
  ["collection", files.collectionRoute, "getMetroProximityCollectionPageData"],
]) {
  requireText(route, "createFileRoute(", `${label} critical route missing createFileRoute`);
  requireText(route, fn, `${label} critical route missing server-function handoff`);
  requireText(route, "loaderData?.head", `${label} critical route missing server-built head handoff`);
  requireText(route, "throw notFound()", `${label} critical route must reject invalid params`);
  requireText(route, "component:", `${label} critical route missing SSR component`);
  requireText(route, "lazy(() =>", `${label} critical route missing lazy rich-UI boundary`);
  for (const forbidden of ["DestinationCard", "Container", "MapPreview", "buildMeta", '"@type":', "@/data/metro-proximity\""]) {
    if (route.includes(forbidden)) fail(`${label} eager route leaked heavy UI/SEO/catalog payload: ${forbidden}`);
  }
}

for (const token of [
  "component: MetroProximityBoundary", "matches[matches.length - 1]?.routeId === match.routeId", "useRouterState",
  "return <Outlet />", 'const hubPath = "/explore/near/" + pageData.metro.slug',
  'import("@/components/explore/MetroProximityHubPage")',
]) requireText(files.hubRoute, token, `metro parent leaf/canonical boundary missing ${token}`);
if (!files.hubRoute.includes("return isLeaf ? (loaderData?.head ?? {}) : {};")) fail("metro parent head must fail closed on descendant routes");

for (const token of ['createLazyFileRoute("/explore/near/$metro")']) requireText(files.hubUi, token, `metro parent lazy route missing ${token}`);
if (files.hubUi.includes("component:") || files.hubUi.includes("DestinationCard")) fail("metro parent lazy route must stay component-neutral so critical boundary owns hub-vs-child rendering");

for (const token of [
  "MetroProximityHubPage", "Explore by trip type", "straight-line geographic estimates", "DestinationCard",
  "Nearby places worth opening first", 'to="/explore/trip-planner"', "optionCount", "source-backed options",
]) requireText(files.hubComponent, token, `metro hub lazy presentation missing ${token}`);

for (const token of [
  "component: MetroProximityCollectionPage", "Distance window", "not road miles or drive-time promises",
  "Closest towns first", "Official local source", "Check current drive", "Source-backed options",
  "MetroProximityCollectionRich",
]) requireText(files.collectionRoute, token, `metro collection SSR shell missing ${token}`);

for (const token of [
  'createLazyFileRoute("/explore/near/$metro/$collection")', "METRO_PROXIMITY_COLLECTIONS",
  "MetroProximityCollectionRich", "DestinationCard destination={row.destination}", "MapPreview", "townReferences",
  'to="/county/$slug"', 'to="/explore/near/$metro"', "origin={metro.center}",
]) requireText(files.collectionUi, token, `metro collection lazy rich UI missing ${token}`);

for (const token of [
  "MetroRoadTripAuthority", 'collection.slug === "road-trips"',
]) requireText(files.collectionUi, token, `shared road-trip authority handoff missing ${token}`);
for (const token of [
  "Build a route, not a list of pins.", "Curated route builders", "Open live multi-stop route",
  "Geographic reach", "Road mileage", "Route anchors", "Seasonal strategy",
  "Let the live road network make the final decision.", "buildPlans", "liveLoopUrl",
]) requireText(files.roadTripAuthority, token, `shared road-trip authority layer missing ${token}`);
for (const token of [
  'const isRoadTrips = collection.slug === "road-trips"', "Best Road Trips From", "Plan multi-stop road trips from",
]) requireText(files.pageData, token, `shared road-trip SEO layer missing ${token}`);

for (const token of [
  "AUSTIN_TWO_HOUR_EDITORIAL", "Choose the trip, not the radius",
  "Which Austin small-town day trip fits your day?", "Planning drive",
  "Three ways to turn the list into an actual Austin day trip",
  "Painted Churches authority guide",
]) requireText(files.collectionUi, token, `Austin two-hour small-town editorial layer missing ${token}`);
for (const token of [
  'metro.slug === "austin" && collection.slug === "small-towns-2-hours"',
  "Small Towns About 1–2 Hours From Austin, Texas",
  "worthwhile small-town day trips from Austin",
]) requireText(files.pageData, token, `Austin two-hour small-town SEO layer missing ${token}`);

if (files.exploreRoute.includes("@/data/metro-proximity")) fail("Explore head route must not eagerly import metro proximity catalog");
for (const token of [
  "METRO_PROXIMITY_METROS", "Explore from a Texas metro", 'to="/explore/near/$metro"',
  "Find day trips without scanning the whole state",
]) requireText(files.exploreUi, token, `Explore internal discovery missing ${token}`);

for (const token of [
  'await import("@/data/metro-proximity-page-data.server")',
  "loadMetroProximitySitemapEntriesServer",
  "await loadMetroProximitySitemapEntriesServer()",
  "const proximityEntries", "...proximityEntries",
]) requireText(files.sitemap, token, `Explore sitemap missing shared page/sitemap readiness contract: ${token}`);
for (const forbidden of [
  "metroProximitySitemapEntries(indexableDestinations",
  "isMetroProximityCollectionIndexReadyWithTownReferences",
  'await import("@/data/destination-query-runtime")',
]) {
  if (files.sitemap.includes(forbidden)) fail(`Explore sitemap must not independently recompute proximity readiness from a catalog that can diverge from the canonical page: ${forbidden}`);
}
for (const token of [
  "export async function loadMetroProximitySitemapEntriesServer()",
  "const destinations = await loadMetroIndexableDestinations()",
  "return metroProximitySitemapEntries(destinations, isMetroProximityCollectionIndexReadyWithTownReferences);",
]) requireText(files.pageData, token, `Shared proximity sitemap/page catalog parity missing ${token}`);
if (files.sitemap.includes("loadMetroProximitySitemapEntriesServer(indexableDestinations)")) fail("Explore sitemap must not pass its separately assembled destination catalog into metro proximity eligibility.");

for (const token of [
  "applyMetroProximityEdgeCachePolicy", 'url.pathname.startsWith("/explore/near/")',
  'headers.set("Cache-Control", "no-store, max-age=0")', 'headers.set("CDN-Cache-Control", "no-store")',
  'headers.set("Cloudflare-CDN-Cache-Control", "no-store")',
]) requireText(files.server, token, `metro edge freshness safeguard missing ${token}`);

for (const token of [
  "'cache-control': 'no-cache'", "pragma: 'no-cache'", "cf-cache-status", "metro-distance-methodology",
  "metro-distance-schema", "metro-drive-time-disclaimer", "metro-corpus-christi-hub", "metro-waco-day-trips",
  "metro-beaumont-port-arthur-hub", "metro-amarillo-road-trips", "metro-el-paso-weekend-trips",
  "metro-lubbock-hub", "metro-mcallen-hub", "metro-midland-odessa-road-trips", "metro-tyler-lakes",
  "metro-college-station-day-trips", "metro-abilene-hub", "metro-laredo-hub",
  "metro-killeen-temple-day-trips", "metro-san-angelo-road-trips", "metro-wichita-falls-lakes",
  "metro-texarkana-weekend-trips", "metro-victoria-historic-sites",
]) requireText(files.productionSmoke, token, `metro production freshness smoke missing ${token}`);

for (const token of [
  "ExploreNearMetroRouteImport", "ExploreNearMetroCollectionRouteImport", "ExploreNearMetroRouteWithChildren",
  "explore.near.$metro.lazy", "explore.near.$metro.$collection.lazy", "'/explore/near/$metro/$collection'",
]) requireText(files.routeTree, token, `generated route tree missing ${token}`);

const pkg = JSON.parse(files.package);
const expectedAuditScript = "node scripts/data/run-metro-proximity-audit.mjs";
if (pkg.scripts?.["metro-proximity:audit"] !== expectedAuditScript) fail("package script metro-proximity:audit is missing or changed");
const expectedScript = "node --experimental-strip-types --test src/data/__tests__/metro-proximity.test.ts && node scripts/data/validate-metro-proximity.mjs && npm run metro-proximity:audit";
if (pkg.scripts?.["metro-proximity:validate"] !== expectedScript) fail("package script metro-proximity:validate is missing or changed");
if (!pkg.scripts?.["data:validate"]?.includes("npm run metro-proximity:validate")) fail("metro proximity validation is not wired into data:validate");

for (const token of [
  "createServer", "vite-tsconfig-paths", 'ssrLoadModule("/scripts/data/audit-metro-proximity-index-readiness.ts")',
  "await vite.close()",
]) requireText(files.auditRunner, token, `metro readiness audit runner missing ${token}`);

for (const token of [
  "listResolvedDestinations({ limit: 5000 })", "METRO_PROXIMITY_METROS", "METRO_PROXIMITY_COLLECTIONS",
  "isMetroProximityCollectionIndexReady", "metroProximityHubReady", "sitemap-eligible proximity URLs",
  "Near-ready blocked combinations",
]) requireText(files.audit, token, `metro readiness audit missing ${token}`);

for (const forbidden of [
  "/explore/near/near/", "guaranteed drive time", "exact drive time", "best attraction near", "sponsored ranking",
]) {
  if (Object.values(files).some((source) => source.toLowerCase().includes(forbidden.toLowerCase()))) fail(`forbidden proximity pattern leaked: ${forbidden}`);
}

console.log("Metro proximity validation passed: twenty-two metro hubs and 286 governed intent combinations remain distance-ranked, source-backed, diversity-gated, duplicate-resistant and fail-closed for indexing, with supplemental official-source town references allowed to close verified geography gaps without manufacturing thin destination pages.");
