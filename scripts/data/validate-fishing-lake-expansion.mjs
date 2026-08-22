import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  expansionFixtures: "src/data/fishing/lake-expansion-fixtures.ts",
  expansionPrototypes: "src/data/fishing/expanded-showcase-lakes-prototype.ts",
  showcasePrototypes: "src/data/fishing/showcase-lakes-prototype.ts",
  conroePrototype: "src/data/fishing/lake-conroe-prototype.ts",
  liveLevelServer: "src/data/fishing/live-lake-level.server.ts",
  liveLevelFetch: "src/data/fishing/live-lake-level-fetch.server.ts",
  liveLevelFunctions: "src/data/fishing/live-lake-level.functions.ts",
  conroePageFunctions: "src/data/fishing/lake-conroe-page-data.functions.ts",
  showcasePageFunctions: "src/data/fishing/showcase-lakes-page-data.functions.ts",
  liveLevelStrip: "src/components/fishing/LiveLakeLevelStrip.tsx",
  index: "src/data/fishing/index.ts",
  slugs: "src/data/fishing/slugs.ts",
  routing: "src/data/fishing/showcase-lake-routing.ts",
  server: "src/data/fishing/showcase-lakes-page-data.server.ts",
  overviewRoute: "src/routes/fishing.lakes.$slug.tsx",
  sectionRoute: "src/routes/fishing.lakes.$slug.$section.tsx",
  directoryRoute: "src/routes/fishing.lakes.tsx",
  directoryUi: "src/components/fishing/FishingLakesDirectory.tsx",
  hub: "src/components/fishing/FishingHub.tsx",
  sitemap: "src/data/fishing/sitemap.ts",
  package: "package.json",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) throw new Error(`Fishing Batch 15 missing required file: ${path}`);
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const pkg = JSON.parse(files.package);
const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 15 validation failed: ${label}`); };

const newLakes = [
  ["toledo-bend-reservoir", "Toledo Bend Reservoir"],
  ["possum-kingdom-reservoir", "Possum Kingdom Reservoir"],
  ["canyon-lake", "Canyon Lake"],
  ["choke-canyon-reservoir", "Choke Canyon Reservoir"],
  ["amistad-reservoir", "Amistad Reservoir"],
];
const allComplete = ["lake-conroe", "lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma", ...newLakes.map(([slug]) => slug)];

for (const [slug, name] of newLakes) {
  requireText(files.expansionFixtures, `slug: "${slug}"`, `typed fishing-lake record missing ${slug}`);
  requireText(files.expansionFixtures, `name: "${name}"`, `fishing-lake identity missing ${name}`);
  requireText(files.expansionFixtures, `lakeId: "${slug}"`, `verified lake relationship coverage missing ${slug}`);
  requireText(files.expansionPrototypes, `"${slug}"`, `complete guide prototype missing ${slug}`);
  requireText(files.routing, `"${slug}"`, `published showcase routing missing ${slug}`);
  requireText(files.slugs, `"${slug}"`, `complete-lake allowlist missing ${slug}`);
}

const completeMatch = files.slugs.match(/COMPLETE_FISHING_LAKE_SLUGS\s*=\s*\[([^\]]+)\]/s);
const completeSlugs = completeMatch ? [...completeMatch[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
if (completeSlugs.length !== 10) throw new Error(`Fishing Batch 15 validation failed: expected exactly 10 complete lakes, found ${completeSlugs.length}.`);
for (const slug of allComplete) if (!completeSlugs.includes(slug)) throw new Error(`Fishing Batch 15 validation failed: complete-lake registry missing ${slug}.`);

for (const token of [
  "expandedFishingLakes",
  "expandedLakeSpeciesProfiles",
  "expandedLakeTechniqueProfiles",
  "lakes: [...fixtureFishingCatalog.lakes, ...expandedFishingLakes]",
  "lakeSpecies: [...fixtureFishingCatalog.lakeSpecies, ...expandedLakeSpeciesProfiles]",
  "lakeTechniques: [...fixtureFishingCatalog.lakeTechniques, ...expandedLakeTechniqueProfiles]",
]) requireText(files.index, token, `validated repository expansion boundary missing ${token}`);

for (const token of ["tpwdLake", "tpwdAccess", "tpwdRegulations", "liveLevel"]) requireText(files.expansionPrototypes, `${token}:`, `official/live-check source key missing ${token}`);
for (const url of [...`${files.expansionFixtures}\n${files.expansionPrototypes}`.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1])) {
  if (!url.startsWith("https://")) throw new Error(`Fishing Batch 15 validation failed: source must use https: ${url}`);
}
for (const [slug] of newLakes) {
  const relationCount = [...files.expansionFixtures.matchAll(new RegExp(`lakeId: "${slug}"`, "g"))].length;
  if (relationCount < 3) throw new Error(`Fishing Batch 15 validation failed: ${slug} has insufficient verified relationship depth (${relationCount}).`);
}

const liveSourceCorpus = `${files.conroePrototype}\n${files.showcasePrototypes}\n${files.expansionPrototypes}`;
const liveSourceUrls = [...liveSourceCorpus.matchAll(/liveLevel:\s*\{[^}]*url:\s*"(https:\/\/(?:www\.)?waterdatafortexas\.org\/reservoirs\/individual\/[a-z0-9-]+)"/g)].map((match) => match[1]);
const uniqueLiveSources = new Set(liveSourceUrls);
if (uniqueLiveSources.size !== 10) throw new Error(`Fishing Batch 15 validation failed: expected 10 unique Water Data for Texas live-level sources, found ${uniqueLiveSources.size}.`);

for (const token of [
  "parseWaterDataForTexasReservoirCsv",
  "parseWaterDataForTexasReservoirPage",
  "normalizeCsvHeader",
  "percent_full",
  "mean_water_level",
  "percentFull",
  "measuredAt",
]) requireText(files.liveLevelServer, token, `live lake-level parser contract missing ${token}`);
for (const token of [
  "RECENT_CONDITIONS_URL",
  "recent-conditions.json",
  "RECENT_CACHE_MS",
  "recentCache",
  "recentRequest",
  "cache: \"no-store\"",
  "parseWaterDataForTexasRecentConditions",
  "`${canonicalSourceUrl}-30day.csv`",
  "parseWaterDataForTexasReservoirCsv",
  "parseWaterDataForTexasReservoirPage",
  "AbortSignal.timeout",
  "loadLiveLakeLevelResilient",
]) requireText(files.liveLevelFetch, token, `resilient live lake-level fetch contract missing ${token}`);
for (const token of [
  "createServerFn",
  "live-lake-level.server",
  "getLiveLakeLevel",
  "loadLiveLakeLevel",
]) requireText(files.liveLevelFunctions, token, `live lake-level server bridge missing ${token}`);
for (const token of [
  "loadLiveLakeLevelResilient",
  "pageData.sources.liveLevel.url",
  "return { ...pageData, liveLakeLevel }",
]) requireText(files.conroePageFunctions, token, `Lake Conroe page-data bundle missing ${token}`);
for (const token of [
  "loadLiveLakeLevelResilient",
  "Object.entries(pageData)",
  "lake.sources.liveLevel.url",
  "liveLakeLevel:",
  "return Object.fromEntries(entries)",
]) requireText(files.showcasePageFunctions, token, `showcase lake page-data bundle missing ${token}`);
for (const token of [
  "Live lake level:",
  "snapshot.percentFull.toFixed(1)",
  "measured",
  "Water Data for Texas",
  "Current reading could not be loaded right now.",
]) requireText(files.liveLevelStrip, token, `live lake-level UI contract missing ${token}`);

for (const token of [
  "expandedShowcaseLakePrototypes",
  "const prototypes = { ...showcaseLakePrototypes, ...expandedShowcaseLakePrototypes }",
  "SHOWCASE_LAKE_SECTION_SLUGS",
]) requireText(files.server, token, `expanded server page-data integration missing ${token}`);
for (const token of ["EXPANDED_SHOWCASE_LAKE_SLUGS", "isShowcaseLakeSlug", "PublishedShowcaseLakeSlug"]) requireText(files.routing, token, `expanded routing contract missing ${token}`);
for (const route of [files.overviewRoute, files.sectionRoute]) {
  requireText(route, "isShowcaseLakeSlug", "generic dynamic route must enforce published showcase gate");
  requireText(route, "getShowcaseLakesPageData()", "generic dynamic route must hydrate shared server data");
  requireText(route, "pageData.liveLakeLevel", "lake route must consume bundled request-time live lake snapshot");
  requireText(route, "LiveLakeLevelStrip", "lake route must render the live level strip");
  if (route.includes("getLiveLakeLevel({ data:")) throw new Error("Fishing Batch 15 validation failed: lake routes must not make a second standalone live-level server-function request.");
  if (route.includes("@/data/fishing/live-lake-level.server")) throw new Error("Fishing Batch 15 validation failed: lake routes must not import .server live-level code directly into the client route boundary.");
}
requireText(files.sectionRoute, "isShowcaseLakeSection", "lake section route must keep section allowlist");

for (const token of [
  "Texas Fishing Lakes — Compare 10 Complete Lake Guides",
  "isCompleteFishingLakeSlug(lake.slug)",
  "numberOfItems: rows.length",
]) requireText(files.directoryRoute, token, `ten-lake directory SEO/data contract missing ${token}`);
for (const token of ["rows.length} lake guides", "Lake facts are durable. Conditions are not.", "unfinished lake records are not exposed here as thin pages"]) requireText(files.directoryUi, token, `ten-lake directory UI integrity contract missing ${token}`);
for (const token of ["Ten complete lake guides now span more of Texas.", "Toledo Bend", "Possum Kingdom", "Canyon Lake", "Choke Canyon", "Amistad", "Compare all {completeLakes.length} complete lake guides"]) requireText(files.hub, token, `statewide hub expansion/discovery missing ${token}`);
for (const token of ["EXPANDED_SHOWCASE_LAKE_SLUGS", "ALL_SHOWCASE_LAKE_SLUGS", "showcaseLakeCanonicalPath(slug, section)"]) requireText(files.sitemap, token, `expanded lake sitemap publication missing ${token}`);

const volatilePatterns = [
  /\bcurrent(?:ly)?\s+\d+(?:\.\d+)?%\s+full\b/i,
  /\b(?:today|right now)\b[^\n]{0,80}\b(?:feet|ft|percent|%)\b/i,
  /fee:\s*"\$\d+/i,
  /daily bag limit\s*[:=]\s*\d+/i,
  /\b\d+-inch minimum\b/i,
];
for (const pattern of volatilePatterns) if (pattern.test(files.expansionPrototypes)) throw new Error(`Fishing Batch 15 validation failed: volatile condition/fee/harvest claim frozen into evergreen prototype (${pattern}).`);
for (const phrase of ["guaranteed catch", "today's best lake", "sponsored ranking", "affiliate pick"]) if (`${files.expansionFixtures}\n${files.expansionPrototypes}\n${files.directoryUi}`.toLowerCase().includes(phrase)) throw new Error(`Fishing Batch 15 validation failed: unsupported editorial/commercial claim leaked (${phrase}).`);

requireText(pkg.scripts["fishing:validate"], "validate-fishing-lake-expansion.mjs", "Batch 15 validator not wired into fishing:validate");

console.log("Fishing Batch 15 lake-expansion validation passed: ten complete lake guides, ten Water Data for Texas live-level sources, recent-conditions-first resilient fetching with shared cache and CSV/HTML fallbacks, live snapshots bundled into established page-data server functions, graceful live UI fallback, verified species/technique depth, reusable dynamic routes, live-condition separation, ten-lake directory discovery and sitemap publication are protected.");
