import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  network: "src/data/fishing/statewide-lake-network.ts",
  species: "src/data/fishing/species-catalog.ts",
  slugs: "src/data/fishing/slugs.ts",
  routing: "src/data/fishing/showcase-lake-routing.ts",
  index: "src/data/fishing/index.ts",
  server: "src/data/fishing/showcase-lakes-page-data.server.ts",
  sitemap: "src/data/fishing/sitemap.ts",
  component: "src/components/fishing/ShowcaseLakeGuide.tsx",
  overviewRoute: "src/routes/fishing.lakes.$slug.tsx",
  sectionRoute: "src/routes/fishing.lakes.$slug.$section.tsx",
  liveWorkflow: ".github/workflows/verify-live-lake-levels.yml",
  liveSource: "src/data/fishing/live-lake-level-source.ts",
  liveParser: "src/data/fishing/live-lake-level.server.ts",
  liveFetcher: "src/data/fishing/live-lake-level-fetch.server.ts",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) throw new Error(`Statewide fishing network missing required file: ${path}`);
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));

const expected = [
  ["lake-buchanan", "Lake Buchanan"],
  ["lake-lbj", "Lake LBJ"],
  ["richland-chambers-reservoir", "Richland-Chambers Reservoir"],
  ["lake-palestine", "Lake Palestine"],
  ["cedar-creek-reservoir", "Cedar Creek Reservoir"],
  ["lewisville-lake", "Lewisville Lake"],
  ["ray-roberts-lake", "Ray Roberts Lake"],
  ["lake-ray-hubbard", "Lake Ray Hubbard"],
  ["lake-lavon", "Lake Lavon"],
  ["grapevine-lake", "Grapevine Lake"],
  ["eagle-mountain-lake", "Eagle Mountain Lake"],
  ["lake-bridgeport", "Lake Bridgeport"],
  ["lake-austin", "Lake Austin"],
  ["fayette-county-reservoir", "Fayette County Reservoir"],
  ["lake-somerville", "Lake Somerville"],
  ["belton-lake", "Belton Lake"],
  ["stillhouse-hollow-reservoir", "Stillhouse Hollow Reservoir"],
  ["caddo-lake", "Caddo Lake"],
  ["lake-o-the-pines", "Lake O' the Pines"],
  ["lake-bob-sandlin", "Lake Bob Sandlin"],
  ["lake-nacogdoches", "Lake Nacogdoches"],
  ["calaveras-lake", "Calaveras Lake"],
  ["lake-corpus-christi", "Lake Corpus Christi"],
  ["alan-henry-reservoir", "Alan Henry Reservoir"],
  ["lake-meredith", "Lake Meredith"],
  ["lake-houston", "Lake Houston"],
];

const fail = (message) => { throw new Error(`Statewide fishing network validation failed: ${message}`); };
const requireText = (text, token, label) => { if (!text.includes(token)) fail(label); };

const parseTuple = (source, name) => {
  const match = source.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]+)\\]`, "s"));
  return match ? [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]) : [];
};

const base = parseTuple(files.slugs, "BASE_COMPLETE_FISHING_LAKE_SLUGS");
const wave2 = parseTuple(files.slugs, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS");
const statewide = parseTuple(files.slugs, "STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS");
if (base.length !== 10) fail(`expected 10 legacy complete lakes, found ${base.length}`);
if (wave2.length !== 5) fail(`expected 5 wave-2 complete lakes, found ${wave2.length}`);
if (statewide.length !== 26) fail(`expected 26 statewide-network lakes, found ${statewide.length}`);
const complete = [...base, ...wave2, ...statewide];
if (new Set(complete).size !== 41) fail(`expected 41 unique complete lakes, found ${new Set(complete).size}`);

const expectedSlugs = expected.map(([slug]) => slug);
const lcraLiveExpectedSlugs = new Set(["fayette-county-reservoir"]);
const officialFallbackSlugs = new Set(["calaveras-lake"]);
const twdbLiveExpectedSlugs = expectedSlugs.filter((slug) => !lcraLiveExpectedSlugs.has(slug) && !officialFallbackSlugs.has(slug));
const liveExpectedSlugs = expectedSlugs.filter((slug) => !officialFallbackSlugs.has(slug));
if (JSON.stringify(statewide) !== JSON.stringify(expectedSlugs)) fail("statewide slug registry drifted from the authoritative 26-lake release order");

const topLevel = [...files.network.matchAll(/^    slug: "([^"]+)", name: "([^"]+)"/gm)].map((match) => ({ slug: match[1], name: match[2], index: match.index }));
if (topLevel.length !== 26) fail(`expected 26 top-level lake definitions, found ${topLevel.length}`);
if (new Set(topLevel.map((row) => row.slug)).size !== 26) fail("duplicate statewide lake slug");
if (new Set(topLevel.map((row) => row.name)).size !== 26) fail("duplicate statewide lake name");
for (const [slug, name] of expected) {
  const row = topLevel.find((item) => item.slug === slug);
  if (!row || row.name !== name) fail(`missing or renamed lake definition: ${slug}`);
}

for (let i = 0; i < topLevel.length; i += 1) {
  const row = topLevel[i];
  const end = i + 1 < topLevel.length ? topLevel[i + 1].index : files.network.indexOf("\n];", row.index);
  const segment = files.network.slice(row.index, end);
  for (const token of ["tpwdSlug:", "summary:", "surfaceAcres:", "maxDepthFeet:", "counties:", "nearestCities:", "waterway:", "riverBasin:", "authority:", "habitat:", "fish:", "access:", "nearbyLakes:"]) {
    if (!segment.includes(token)) fail(`${row.slug} missing required content field ${token}`);
  }
  const expectsTwdbLive = twdbLiveExpectedSlugs.includes(row.slug);
  const expectsLcraLive = lcraLiveExpectedSlugs.has(row.slug);
  const hasTwdbLive = segment.includes("waterDataSlug:");
  const hasLcraLive = segment.includes("lcraHydrometSiteNumber:");
  if (expectsTwdbLive && !hasTwdbLive) fail(`${row.slug} must have a Water Data for Texas mapping`);
  if (expectsLcraLive && !hasLcraLive) fail(`${row.slug} must have an LCRA Hydromet mapping`);
  if (officialFallbackSlugs.has(row.slug) && (hasTwdbLive || hasLcraLive)) fail(`${row.slug} must remain on an official-agency fallback until a monitored live source exists`);
  if (!expectsTwdbLive && hasTwdbLive) fail(`${row.slug} has an unexpected Water Data for Texas mapping`);
  if (!expectsLcraLive && hasLcraLive) fail(`${row.slug} has an unexpected LCRA Hydromet mapping`);
  const fishCount = [...segment.matchAll(/fish\("/g)].length;
  if (fishCount < 3) fail(`${row.slug} is too thin: only ${fishCount} source-backed fish targets`);
  const relatedCount = [...segment.matchAll(/\{slug:"[^"]+",name:"[^"]+"\}/g)].length;
  if (relatedCount < 2) fail(`${row.slug} requires at least two related-lake links`);
}

for (const slug of expectedSlugs) {
  requireText(files.network, `id: def.slug`, "generated lake records must preserve the canonical slug");
  if (!statewide.includes(slug)) fail(`complete-lake registry missing ${slug}`);
}
for (const token of [
  "WATER_DATA_FOR_TEXAS_RESERVOIR_BASE",
  "waterDataSlug",
  "liveLevelSource",
  "Water Data for Texas —",
]) requireText(files.network, token, `TWDB live-water source contract missing ${token}`);
for (const token of [
  "LCRA_HYDROMET_CHART_BASE",
  'lcraHydrometSiteNumber: "5634"',
  "LCRA Hydromet —",
]) requireText(files.network, token, `LCRA Fayette live-water source contract missing ${token}`);

for (const token of [
  "isWaterDataForTexasLiveLevelSource",
  "getLcraHydrometSiteNumber",
  "isLcraHydrometLiveLevelSource",
  "isLiveLakeLevelSource",
  "liveLakeLevelProvider",
]) requireText(files.liveSource, token, `live source helper contract missing ${token}`);
for (const token of [
  "parseLcraHydrometLakeLevel",
  "percentFull?: number | null",
  "headElevation",
  "lakeLevel",
]) requireText(files.liveParser, token, `LCRA live parser contract missing ${token}`);
for (const token of [
  "GetDataBySite",
  "fetchLcraSnapshot",
  "parseLcraHydrometLakeLevel",
  "getLcraHydrometSiteNumber",
]) requireText(files.liveFetcher, token, `LCRA resilient fetch contract missing ${token}`);

if ((files.network.match(/waterDataSlug: "/g) ?? []).length !== 24) fail("expected 24 statewide-network TWDB live-water mappings");
if ((files.network.match(/lcraHydrometSiteNumber: "/g) ?? []).length !== 1) fail("expected exactly one statewide-network LCRA Hydromet mapping");
if (files.network.includes("TPWD — current lake conditions entry point")) fail("obsolete pseudo-live TPWD current-conditions fallback remains");

for (const slug of liveExpectedSlugs) {
  requireText(files.liveWorkflow, slug, `production live-water workflow missing ${slug}`);
}
for (const slug of officialFallbackSlugs) {
  if (files.liveWorkflow.includes(slug)) fail(`unmonitored fallback lake must not be a release-blocking live-water check: ${slug}`);
}
for (const token of [
  "All 40 monitored lake page-data snapshots and server paths are current",
  "All 40 monitored lake snapshots and live UI surfaces passed",
]) requireText(files.liveWorkflow, token, `production live-water workflow coverage contract missing ${token}`);

for (const token of [
  "statewideNetworkFishingLakes",
  "statewideNetworkLakeSpeciesProfiles",
  "statewideNetworkLakeTechniqueProfiles",
  "statewideNetworkShowcaseLakePrototypes",
  "tpwdSource",
  "accessSource",
  "tpwdRegulations",
  "reportSnapshot",
  "does not convert durable",
  "mapQuery:",
]) requireText(files.network, token, `network generator missing ${token}`);

for (const token of [
  "statewideNetworkFishingLakes",
  "statewideNetworkLakeSpeciesProfiles",
  "statewideNetworkLakeTechniqueProfiles",
  "statewideNetworkShowcaseLakePrototypes",
]) requireText(files.index, token, `repository wiring missing ${token}`);

for (const token of [
  "STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS",
  "StatewideNetworkLakeSlug",
  "...STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS",
]) requireText(files.routing, token, `showcase routing missing ${token}`);

requireText(files.server, "statewideNetworkShowcaseLakePrototypes", "page-data server is not loading statewide prototypes");
for (const token of ["STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS", "STATEWIDE_NETWORK_SHOWCASE_LAKE_VERIFIED_AT", "STATEWIDE_SET"]) requireText(files.sitemap, token, `sitemap publication missing ${token}`);

for (const route of [files.overviewRoute, files.sectionRoute]) {
  requireText(route, "isShowcaseLakeSlug", "dynamic lake route must enforce the showcase allowlist");
  requireText(route, "showcaseLakeCanonicalPath", "dynamic lake route must use canonical fishing lake paths");
  requireText(route, "isLiveLakeLevelSource", "dynamic lake route must distinguish supported live-level sources from ordinary official condition links");
  if (route.includes("/fishing/fishing/")) fail("duplicated /fishing/fishing/ route leaked into dynamic lake routing");
}

for (const token of [
  "pageData.nearby.filter",
  'href.startsWith("/fishing/lakes/")',
  "All complete lake guides",
  "fishingTechniqueCanonicalPath",
  "TechniquePill",
  "Nearby communities",
  "Official current conditions",
]) requireText(files.component, token, `shared lake UX/internal-link contract missing ${token}`);

if (!files.species.includes('id: "walleye"') || !files.network.includes('fish("walleye"')) fail("Lake Meredith must retain its defining walleye fishery");
if (!files.species.includes('id: "red-drum"') || !files.network.includes('fish("red-drum"')) fail("Calaveras must retain its distinctive freshwater red-drum fishery");

const forbidden = ["/fishing/fishing/", "guaranteed catch", "today's best lake", "affiliate pick", "sponsored ranking"];
for (const phrase of forbidden) if (Object.values(files).some((source) => source.toLowerCase().includes(phrase.toLowerCase()))) fail(`forbidden/duplicate content pattern found: ${phrase}`);

const volatilePatterns = [
  /\bcurrent(?:ly)?\s+\d+(?:\.\d+)?%\s+full\b/i,
  /\b(?:today|right now)\b[^\n]{0,80}\b(?:feet|ft|percent|%)\b/i,
  /daily bag limit\s*[:=]\s*\d+/i,
  /\b\d+-inch minimum\b/i,
];
for (const pattern of volatilePatterns) if (pattern.test(files.network)) fail(`volatile condition or harvest detail frozen into evergreen lake data: ${pattern}`);

const sectionMatch = files.routing.match(/SHOWCASE_LAKE_SECTION_SLUGS\s*=\s*\[([^\]]+)\]/s);
const sectionCount = sectionMatch ? [...sectionMatch[1].matchAll(/"([a-z0-9-]+)"/g)].length : 0;
if (sectionCount !== 8) fail(`expected 8 lake intent sections, found ${sectionCount}`);
const newEntryUrls = statewide.length * (1 + sectionCount);
if (newEntryUrls !== 234) fail(`expected 234 statewide-network overview/intent URLs, found ${newEntryUrls}`);

if (files.network.includes('from "@/data/types";\\nimport')) fail("literal escaped newline remains in statewide import block");

console.log(`Statewide fishing network validation passed: 15 existing + 26 statewide-network lakes = 41 complete lake guides; ${newEntryUrls} statewide-network overview/intent URLs; source-backed identity, species/technique relationships, canonical routing, sitemap discovery, related-lake/county links, report freshness language, 24 TWDB live-water mappings, one LCRA Hydromet live mapping, one explicit official-agency fallback, current-condition honesty and duplicate-route safeguards are protected.`);
