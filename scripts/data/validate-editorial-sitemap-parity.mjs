import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const primary = read("src/routes/sitemap[.]xml.ts");
const routes = read("src/lib/public-routes.ts");
const fixture = read("src/data/fixtures/texas.ts");
const reviewed = read("src/data/reviewed-attraction-authorities.ts");
const reviewedCanonical = read("src/lib/reviewed-attraction-canonical-redirect.ts");
const cachePolicy = read("src/lib/hashed-asset-document-cache-policy.ts");
const worker = read("src/server.ts");

const preserved = read("src/data/small-town-destinations-wave7.ts");
const terms = read("src/routes/network.terms.tsx");

// Both pages are intentionally indexable and must appear in the NORMAL
// sitemap, not only the emergency fallback.
const normal = sitemap.slice(sitemap.indexOf("const staticPaths = ["));
for (const route of ["/explore/big-bend-scenic-drives", "/explore/lighthouses"]) {
  assert.match(normal, new RegExp('"' + route + '"'));
}

// These are complete source records also used by the public detail route.
// Preserve audit/visitability gates; never force raw path strings into XML.
for (const slug of ["caddo-lake", "blue-hole-wimberley"]) {
  assert.ok(fixture.includes(`slug: "${slug}"`), `Missing canonical fixture: ${slug}`);
  assert.ok(sitemap.includes(`"${slug}"`), `No fixture sitemap overlay: ${slug}`);
}
assert.ok(preserved.includes('slug: "blanco"'), "Town authority source missing");
assert.ok(sitemap.includes('item.slug === "blanco"'), "Town authority not reconciled");
assert.ok(worker.includes("reviewedAttractionCanonicalRedirect(request)"),
  "Worker must consolidate reviewed attraction query/slash variants before SSR.");
for (const path of ["/destination/san-antonio-japanese-tea-garden","/destination/fort-worth-water-gardens","/destination/houston-botanic-garden","/city/san-antonio","/city/fort-worth","/city/houston","/county/bexar","/county/tarrant","/county/harris"]) {
  assert.ok(cachePolicy.includes('"' + path + '"'), `Attraction/city/county HTML must not retain stale cached versions: ${path}`);
}
for (const path of ["/destination/san-antonio-japanese-tea-garden","/destination/fort-worth-water-gardens","/destination/houston-botanic-garden"]) {
  assert.ok(reviewedCanonical.includes('"' + path + '"'), `Reviewed attraction canonical redirect missing: ${path}`);
}

for (const slug of ["san-antonio-japanese-tea-garden", "fort-worth-water-gardens", "houston-botanic-garden"]) {
  assert.ok(reviewed.includes(`"slug": "${slug}"`), `Reviewed attraction source missing: ${slug}`);
  assert.ok(sitemap.includes(`"${slug}"`), `Reviewed attraction absent from sitemap reconcile: ${slug}`);
}
for (const guard of [
  'auditDestination(destination).readyForIndexing',
  'isPrimaryTripPlannerDestination(destination)',
  'const destinations = await resolveDestinationCatalog(rawDestinations)',
  'const editorialCanonicalSources',
  'reviewedAttractionDestinations.filter',
  'originalEditorialDestinations.filter',
]) assert.ok(sitemap.includes(guard), `Editorial sitemap must retain quality gate: ${guard}`);

const detailParity = read("src/data/destination-sitemap-detail-parity.server.ts");
for (const marker of [
  'const DETAIL_PARITY_SLUGS = ["blanco", "caddo-lake"] as const',
  'await getResolvedDestination(slug)',
  'auditDestination(destination).readyForIndexing',
  'isPrimaryTripPlannerDestination(destination)',
]) assert.ok(detailParity.includes(marker), `Shared detail parity must retain canonical resolver and audit gate: ${marker}`);
for (const marker of [
  'await import("@/data/destination-sitemap-detail-parity.server")',
  'await loadCanonicalDestinationSitemapParity()',
  'destinationEntries.some((item) => item.includes(loc))',
]) assert.ok(sitemap.includes(marker), `Explore sitemap must use shared detail parity: ${marker}`);
assert.ok(!sitemap.includes('await import("@/data/destination-query-runtime")'),
  "Do not couple Explore sitemap directly to the runtime; Metro proximity uses a distinct shared readiness owner.");

// Public membership terms are visible and self-canonical in production. Do
// not exclude them from the sitemap or accidentally index private Network
// enrollment, billing or callback surfaces.
assert.ok(routes.includes('  "/network/terms",'), "Terms route should be indexable");
const publicPaths = routes.split("export const NON_INDEXABLE_PUBLIC_PATHS")[0];
assert.ok(publicPaths.includes('  "/network/terms",'), "Terms absent from indexable static paths");
const excluded = routes.split("export const NON_INDEXABLE_PUBLIC_PATHS")[1].split("const NON_INDEXABLE_PREFIXES")[0];
assert.ok(!excluded.includes('"/network/terms"'), "Public terms still excluded from sitemap");
for (const privatePath of ["/network/apply", "/network/billing", "/network/checkout-return", "/network/join"]) {
  assert.ok(excluded.includes(`"${privatePath}"`), `Private network path accidentally indexable: ${privatePath}`);
}
assert.ok(terms.includes("canonicalLink(texasDefinedBrand,canonicalPath)"), "Terms page lost its self canonical");
assert.ok(primary.includes("INDEXABLE_STATIC_PATHS"), "Main sitemap must use public route registry");

console.log("PASS: eight existing editorial pages and public membership terms have canonical sitemap sources; protected quality gates and private network exclusions retained.");
