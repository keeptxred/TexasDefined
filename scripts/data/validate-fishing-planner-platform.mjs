import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const requiredFiles = [
  "src/data/fishing/planner-routing.ts",
  "src/data/fishing/planner-data.server.ts",
  "src/data/fishing/planner-data.functions.ts",
  "src/data/fishing/location.server.ts",
  "src/data/fishing/location.functions.ts",
  "src/data/fishing/fixtures.ts",
  "src/data/fishing/lake-expansion-fixtures.ts",
  "src/data/fishing/lake-expansion-wave2-fixtures.ts",
  "src/routes/fishing.plan.tsx",
  "src/routes/fishing.compare.tsx",
  "src/components/fishing/FishingHub.tsx",
  "src/components/fishing/FishingResultsMap.tsx",
  "src/components/fishing/GenericFishingLakeGuide.tsx",
  "src/routes/fishing.lakes.$slug.tsx",
  "src/data/fishing/lake-sitemap.server.ts",
];
for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Fishing Batch 9 missing required file: ${path}`);
}

const routing = read("src/data/fishing/planner-routing.ts");
const server = read("src/data/fishing/planner-data.server.ts");
const planner = read("src/routes/fishing.plan.tsx");
const locationServer = read("src/data/fishing/location.server.ts");
const locationFunctions = read("src/data/fishing/location.functions.ts");
const resultsMap = read("src/components/fishing/FishingResultsMap.tsx");
const fishingFixtures = read("src/data/fishing/fixtures.ts");
const expandedLakeFixtures = read("src/data/fishing/lake-expansion-fixtures.ts");
const wave2LakeFixtures = read("src/data/fishing/lake-expansion-wave2-fixtures.ts");
const compare = read("src/routes/fishing.compare.tsx");
const search = read("src/data/fishing/search.ts");
const links = read("src/data/fishing/internal-links.ts");
const sitemap = read("src/data/fishing/sitemap.ts");
const publicRoutes = read("src/lib/public-routes.ts");
const hub = read("src/routes/fishing.tsx");
const hubComponent = read("src/components/fishing/FishingHub.tsx");
const genericLake = read("src/components/fishing/GenericFishingLakeGuide.tsx");
const lakeRoute = read("src/routes/fishing.lakes.$slug.tsx");
const lakeSitemap = read("src/data/fishing/lake-sitemap.server.ts");
const pkg = JSON.parse(read("package.json"));

const requireText = (text, needle, label) => { if (!text.includes(needle)) throw new Error(`Fishing Batch 9 validation failed: ${label}`); };

requireText(routing, '"/fishing/plan"', "trip planner canonical route missing");
requireText(routing, '"/fishing/compare"', "lake comparison canonical route missing");
requireText(server, "fullGuide: isCompleteFishingLakeSlug", "planner must distinguish full guides from basic lake profiles");
requireText(server, "Boolean(relation.verifiedAt) && relation.sources.length > 0", "planner lake/species relationships must be verified and sourced");
requireText(server, ".filter((row) => row.targets.length > 0)", "planner must omit lakes without verified fish relationships");
requireText(server, "verifiedListing: true", "planner guide inventory must enforce verified listings");
requireText(server, "filter(isFishingRecordVerified)", "planner local inventory must enforce source verification");
requireText(server, 'freshness === "current"', "planner must explicitly gate current reports by freshness");
requireText(server, "staleReports", "planner must preserve older reports separately from current conditions");
requireText(server, "Sponsorship never changes planner order", "planner editorial independence policy missing");
requireText(server, "Zero means no verified listing is currently published", "planner zero-inventory language must avoid false absence claims");

requireText(planner, "Where would you like to go fishing?", "planner location search missing");
requireText(planner, "ZIP code", "planner ZIP search copy missing");
requireText(planner, "Use my location", "planner browser-location control missing");
requireText(planner, "roundCoordinate(coords.latitude)", "planner must round browser latitude before URL storage");
requireText(planner, "roundCoordinate(coords.longitude)", "planner must round browser longitude before URL storage");
requireText(planner, "haversineMiles", "planner distance calculation missing");
requireText(planner, 'value="closest"', "planner closest-sort control missing");
requireText(planner, 'name="radius"', "planner distance-radius control missing");
requireText(planner, "More filters", "planner advanced filters disclosure missing");
for (const token of ['name="shore"', 'name="boat"', 'name="camp"', 'name="guide"', 'name="report"']) requireText(planner, token, `planner verified filter missing ${token}`);
requireText(planner, '<FishingResultsMap rows={mapRows}', "planner map view missing");
requireText(planner, 'aria-label="Results view"', "planner list/map view switch missing");
requireText(locationFunctions, "createServerFn", "fishing location resolver must remain behind a server function");
requireText(locationFunctions, "resolveFishingLocationServer", "fishing location server isolation missing");
requireText(locationServer, "api.zippopotam.us/us/", "ZIP lookup provider missing");
requireText(locationServer, "api.zippopotam.us/us/tx/", "Texas city lookup provider missing");
requireText(locationServer, 'source: "zip"', "ZIP origin classification missing");
requireText(locationServer, 'source: "city"', "city origin classification missing");
requireText(resultsMap, "Map of matching Texas fishing lakes", "fishing map accessibility title missing");
requireText(resultsMap, "simplified Texas outline", "fishing map orientation disclosure missing");
const fixtureCoordinateCount = (fishingFixtures.match(/coordinates:\s*\{\s*lat:/g) ?? []).length;
const expandedCoordinateCount = (expandedLakeFixtures.match(/coordinates:\s*\{\s*lat:/g) ?? []).length;
const wave2CoordinateCount = (wave2LakeFixtures.match(/coordinates:\s*\{\s*lat:/g) ?? []).length;
if (fixtureCoordinateCount < 5) throw new Error("Fishing Batch 9 validation failed: base showcase lakes must publish representative source-backed coordinates.");
if (expandedCoordinateCount < 5) throw new Error("Fishing Batch 9 validation failed: expanded showcase lakes must publish representative source-backed coordinates.");
if (wave2CoordinateCount < 5) throw new Error("Fishing Batch 15 validation failed: wave-2 showcase lakes must publish representative source-backed coordinates.");
for (const token of ["National Weather Service HADS", "USGS-08039300", "TCEQMAIN-14007", "USGS-07331500"]) requireText(fishingFixtures, token, `base fishing coordinate provenance missing ${token}`);
for (const token of ["USGS-08025350", "USGS-08088500", "USGS-08167700", "USGS-08206910", "TCEQMAIN-13211"]) requireText(expandedLakeFixtures, token, `expanded fishing coordinate provenance missing ${token}`);
for (const token of ["USGS-08136600", "USGS-302329097542100", "USGS-08092500", "USGS-08017400", "USGS-263318099090800"]) requireText(wave2LakeFixtures, token, `wave-2 fishing coordinate provenance missing ${token}`);
requireText(planner, "What would you like to fish for?", "planner multi-species prompt missing");
requireText(planner, 'type="checkbox" name="species"', "planner multi-select species controls missing");
requireText(planner, "Require every selected fish", "planner all-species match option missing");
requireText(planner, "GROUP_MEMBER_SLUGS", "planner group-to-species expansion missing");
requireText(planner, "Why this matches", "planner match explanation missing");
requireText(planner, "Full fishing guide", "planner full-guide distinction missing");
requireText(planner, "Lake profile", "planner basic-profile distinction missing");
requireText(planner, "Current report", "planner current-condition layer missing");
requireText(planner, "Fishery fit is not today\'s conditions", "planner stale-condition safeguard missing");
if (planner.includes("None published")) throw new Error("Fishing Batch 9 validation failed: zero-inventory clutter reintroduced into lake results.");
requireText(planner, '"@type": "ItemList"', "planner ItemList schema missing");
requireText(planner, '"@type": "BreadcrumbList"', "planner breadcrumb schema missing");
requireText(planner, "canonicalPath: FISHING_TRIP_PLANNER_PATH", "planner canonical metadata missing");
requireText(planner, "return unique.length ? unique : undefined;", "planner must omit an empty species search instead of redirecting the canonical route");
requireText(hubComponent, 'action="/fishing/plan"', "fishing hub must expose the lake finder directly");
requireText(hubComponent, "multi-select", "fishing hub must explain multi-select species search");
requireText(hubComponent, "ZIP code", "fishing hub must expose ZIP-aware lake discovery");
requireText(hubComponent, "Browse every Texas fish guide", "fishing hub species discovery missing");
for (const token of ['kind: "generic"', "GenericFishingLakeGuide", 'canonicalFishingPath("lake", lake.slug)', "lakeSpeciesProfilesQuery", "fishingAccessPointsQuery"]) requireText(lakeRoute, token, `generic lake route contract missing ${token}`);
for (const token of ["Fish recorded for", 'fishingFoundationAnchor("species", fish.slug)', "/county/", "Verify before the trip"]) requireText(genericLake, token, `generic lake profile contract missing ${token}`);
for (const token of ['status: "published"', "Boolean(relationship.verifiedAt) && relationship.sources.length > 0", "fishing/lakes/"]) requireText(lakeSitemap, token, `generic lake sitemap gate missing ${token}`);

for (const phrase of [
  "source-backed fishery fit",
  "source-backed lake-to-species relationships",
  "Shore or pier access",
  "Boat or kayak access",
  "Camping or cabins",
  "Fishing guide listed",
  "published, source-backed fishing records",
  "published guide",
  "published access site",
]) requireText(planner, phrase, `planner visitor-facing copy missing ${phrase}`);
for (const stale of [
  "compare verified fishery fit",
  "verified lake-to-species relationships",
  "Verified shore or pier access",
  "Verified boat or kayak access",
  "Verified camping or cabins",
  "Verified fishing guide listed",
  "Filters use verified fishing records only",
]) if (planner.includes(stale)) throw new Error(`Fishing Batch 9 validation failed: planner still exposes verification-heavy public copy (${stale}).`);

requireText(compare, "Choose up to three", "comparison selection control missing");
requireText(compare, "Top source-backed targets", "comparison fishery-strength row missing");
requireText(compare, "Published guides", "comparison guide coverage row missing");
requireText(compare, "Published access", "comparison access coverage row missing");
requireText(compare, "Published services", "comparison service coverage row missing");
requireText(compare, "Source-backed lake signals", "comparison source-backed heading missing");
requireText(compare, "No source-backed target relationships", "comparison source-backed empty-target label missing");
requireText(compare, "A zero means no listing is currently published here", "comparison honest zero-inventory wording missing");
for (const stale of ["Verified lake signals", "Top verified targets", "Verified guides", "Verified access", "Verified services", "no verified listing is published here"]) {
  if (compare.includes(stale)) throw new Error(`Fishing Batch 9 validation failed: comparison still exposes verification-heavy public copy (${stale}).`);
}
requireText(compare, "Coverage is not a quality score", "comparison anti-ranking safeguard missing");
requireText(compare, "does not create an editorial ranking", "comparison must explicitly reject selection-as-ranking");
requireText(compare, "does not accept paid weighting", "comparison sponsorship independence missing");
requireText(compare, "canonicalPath: FISHING_LAKE_COMPARE_PATH", "comparison canonical metadata missing");
requireText(compare, '"@type": "ItemList"', "comparison ItemList schema missing");

for (const path of ["/fishing/plan", "/fishing/compare"]) {
  requireText(publicRoutes, `"${path}"`, `public route governance missing ${path}`);
  requireText(sitemap, path === "/fishing/plan" ? "FISHING_TRIP_PLANNER_PATH" : "FISHING_LAKE_COMPARE_PATH", `sitemap missing ${path}`);
  requireText(hub, `to="${path}"`, `fishing hub discovery missing ${path}`);
}
requireText(search, "fishing-directory:texas-fishing-trip-planner", "global search planner destination missing");
requireText(search, "fishing-directory:texas-fishing-lake-compare", "global search comparison destination missing");
requireText(links, "fishing-planner:trip", "internal-link planner target missing");
requireText(links, "fishing-planner:compare", "internal-link comparison target missing");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-planner-platform.mjs", "Batch 9 validator is not wired into npm run fishing:validate");

await import("./validate-fishing-monetization.mjs");

console.log("Fishing Batch 9 planner/comparison validation passed.");
