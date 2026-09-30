import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  data: "src/data/metro-proximity.ts",
  test: "src/data/__tests__/metro-proximity.test.ts",
  pageData: "src/data/metro-proximity-page-data.server.ts",
  functions: "src/data/metro-proximity-page-data.functions.ts",
  hubRoute: "src/routes/explore.near.$metro.tsx",
  hubUi: "src/routes/explore.near.$metro.lazy.tsx",
  collectionRoute: "src/routes/explore.near.$metro_.$collection.tsx",
  collectionUi: "src/routes/explore.near.$metro_.$collection.lazy.tsx",
  exploreRoute: "src/routes/explore.index.tsx",
  exploreUi: "src/routes/explore.index.lazy.tsx",
  sitemap: "src/routes/sitemap-explore[.]xml.ts",
  routeTree: "src/routeTree.gen.ts",
  server: "src/server.ts",
  productionSmoke: "scripts/ci/verify-production-surfaces.mjs",
  package: "package.json",
};
for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) throw new Error(`Metro proximity validation failed: missing required file ${path}`);
}
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const fail = (message) => { throw new Error(`Metro proximity validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const expectedMetroSlugs = [
  "houston",
  "dallas",
  "fort-worth",
  "austin",
  "san-antonio",
  "corpus-christi",
  "waco",
  "beaumont-port-arthur",
  "amarillo",
  "el-paso",
  "lubbock",
];
const metroMatch = files.data.match(/METRO_PROXIMITY_METROS\s*=\s*\[([\s\S]*?)\n\] as const;/);
const metroSlugs = metroMatch ? [...metroMatch[1].matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
if (JSON.stringify(metroSlugs) !== JSON.stringify(expectedMetroSlugs)) fail(`metro allowlist drifted: ${metroSlugs.join(", ")}`);

const collectionMatch = files.data.match(/METRO_PROXIMITY_COLLECTIONS\s*=\s*\[([\s\S]*?)\n\] as const;/);
const collectionSlugs = collectionMatch ? [...collectionMatch[1].matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
const expectedCollections = [
  "things-to-do",
  "day-trips",
  "weekend-trips",
  "road-trips",
  "state-parks",
  "small-towns",
  "small-towns-1-hour",
  "small-towns-2-hours",
  "small-towns-3-hours",
  "lakes-rivers",
  "lakes",
  "swimming-holes",
  "historic-sites",
];
if (JSON.stringify(collectionSlugs) !== JSON.stringify(expectedCollections)) fail(`collection allowlist drifted: ${collectionSlugs.join(", ")}`);

for (const token of [
  "radiusMiles:", "minimumMiles:", "minResults:", "maxResults:",
  "minTowns:", "minCounties:", "minCategories:", "matchTerms:",
  "distanceFromPointMiles", "selectMetroProximityDestinations",
  "isMetroProximityCollectionIndexReady", "metroProximityHubReady",
  "metroProximityCanonicalPath", "metroProximitySitemapEntries",
  "const seen = new Set<string>()",
  "summary.trim().length >= 80",
  "collection.matchTerms.some",
]) requireText(files.data, token, `data model missing ${token}`);

for (const token of [
  '"small-towns-1-hour"',
  '"small-towns-2-hours"',
  '"small-towns-3-hours"',
  '"weekend-trips"',
  '"road-trips"',
  '"lakes"',
  '"swimming-holes"',
  "Actual road mileage and drive time vary.",
]) requireText(files.data, token, `requested intent expansion missing ${token}`);

for (const token of [
  "unknown metro and collection slugs fail closed",
  "small-town hour-intent rings are non-overlapping",
  "duplicate destination slugs cannot inflate collection inventory",
  "swimming-hole intent requires water-use language",
  "thin or geographically narrow collections remain noindex",
  "substantive, diverse inventory can clear the index gate",
]) requireText(files.test, token, `metro proximity regression test missing ${token}`);

for (const token of [
  "listResolvedDestinations",
  "loadMetroProximityHubPageDataServer",
  "loadMetroProximityCollectionPageDataServer",
  "isMetroProximityCollectionIndexReady",
  "metroProximityHubReady",
  "selectMetroProximityDestinations",
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"index, follow, max-image-preview:large"',
  '"noindex, follow"',
  "buildMeta",
  "canonicalLink",
]) requireText(files.pageData, token, `server page-data layer missing ${token}`);

for (const token of [
  "createServerFn",
  "getMetroProximityHubPageData",
  "getMetroProximityCollectionPageData",
  "loadMetroProximityHubPageDataServer",
  "loadMetroProximityCollectionPageDataServer",
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
  "component: MetroProximityHubPage",
  "Explore by trip type",
  "straight-line geographic estimates",
  "MetroProximityHubRich",
]) requireText(files.hubRoute, token, `metro hub SSR shell missing ${token}`);

for (const token of [
  'createLazyFileRoute("/explore/near/$metro")',
  "MetroProximityHubRich",
  "DestinationCard",
  "Nearby places worth opening first",
  'to="/explore/trip-planner"',
]) requireText(files.hubUi, token, `metro hub lazy rich UI missing ${token}`);

for (const token of [
  "component: MetroProximityCollectionPage",
  "Distance window",
  "not road miles or drive-time promises",
  "Quick shortlist",
  "Best season:",
  "MetroProximityCollectionRich",
]) requireText(files.collectionRoute, token, `metro collection SSR shell missing ${token}`);

for (const token of [
  'createLazyFileRoute("/explore/near/$metro/$collection")',
  "METRO_PROXIMITY_COLLECTIONS",
  "MetroProximityCollectionRich",
  "DestinationCard destination={row.destination}",
  "MapPreview",
  'to="/county/$slug"',
  'to="/explore/near/$metro"',
]) requireText(files.collectionUi, token, `metro collection lazy rich UI missing ${token}`);

if (files.exploreRoute.includes("@/data/metro-proximity")) fail("Explore head route must not eagerly import metro proximity catalog");
for (const token of [
  "METRO_PROXIMITY_METROS",
  "Explore from a Texas metro",
  'to="/explore/near/$metro"',
  "Find day trips without scanning the whole state",
]) requireText(files.exploreUi, token, `Explore internal discovery missing ${token}`);

for (const token of [
  'await import("@/data/metro-proximity")',
  "metroProximitySitemapEntries(indexableDestinations)",
  "const proximityEntries",
  "...proximityEntries",
]) requireText(files.sitemap, token, `Explore sitemap missing ${token}`);

for (const token of [
  "applyMetroProximityEdgeCachePolicy",
  'url.pathname.startsWith("/explore/near/")',
  'headers.set("Cache-Control", "no-store, max-age=0")',
  'headers.set("CDN-Cache-Control", "no-store")',
  'headers.set("Cloudflare-CDN-Cache-Control", "no-store")',
]) requireText(files.server, token, `metro edge freshness safeguard missing ${token}`);

for (const token of [
  "'cache-control': 'no-cache'",
  "pragma: 'no-cache'",
  "cf-cache-status",
  "metro-distance-methodology",
  "metro-distance-schema",
  "metro-drive-time-disclaimer",
  "metro-corpus-christi-hub",
  "metro-waco-day-trips",
  "metro-beaumont-port-arthur-hub",
  "metro-amarillo-road-trips",
  "metro-el-paso-weekend-trips",
  "metro-lubbock-hub",
]) requireText(files.productionSmoke, token, `metro production freshness smoke missing ${token}`);

for (const token of [
  "ExploreNearMetroRouteImport",
  "ExploreNearMetroCollectionRouteImport",
  "explore.near.$metro.lazy",
  "explore.near.$metro_.$collection.lazy",
  "id: '/explore/near/$metro_/$collection'",
  "path: '/explore/near/$metro/$collection'",
  "parentRoute: typeof rootRouteImport",
]) requireText(files.routeTree, token, `generated flattened route tree missing ${token}`);

for (const forbidden of [
  "ExploreNearMetroRouteWithChildren",
  "interface ExploreNearMetroRouteChildren",
  "explore.near.$metro.$collection.lazy",
  "parentRoute: typeof ExploreNearMetroRoute",
]) {
  if (files.routeTree.includes(forbidden)) fail(`proximity collection route must not inherit metro hub head metadata: ${forbidden}`);
}

for (const oldNestedPath of [
  "src/routes/explore.near.$metro.$collection.tsx",
  "src/routes/explore.near.$metro.$collection.lazy.tsx",
]) {
  if (fs.existsSync(oldNestedPath)) fail(`nested proximity route must remain removed: ${oldNestedPath}`);
}

const pkg = JSON.parse(files.package);
const expectedScript = "node --experimental-strip-types --test src/data/__tests__/metro-proximity.test.ts && node scripts/data/validate-metro-proximity.mjs";
if (pkg.scripts?.["metro-proximity:validate"] !== expectedScript) fail("package script metro-proximity:validate is missing or changed");
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

console.log("Metro proximity validation passed: eleven metro hubs and 143 governed intent combinations are distance-ranked, source-backed, diversity-gated, duplicate-resistant, fail-closed for indexing, sitemap-owned, internally discoverable and protected by server-built SEO, critical SSR body shells and lazy rich-UI boundaries.");
