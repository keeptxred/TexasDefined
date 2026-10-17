import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  network: "src/data/fishing/statewide-lake-network.ts",
  fortParkerPark: "src/data/destination-curation-batch6.ts",
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
  ["joe-pool-lake", "Joe Pool Lake"],
  ["lake-granbury", "Lake Granbury"],
  ["lake-waco", "Lake Waco"],
  ["lake-brownwood", "Lake Brownwood"],
  ["proctor-lake", "Proctor Lake"],
  ["lake-arrowhead", "Lake Arrowhead"],
  ["lake-casa-blanca", "Lake Casa Blanca"],
  ["lake-mineral-wells", "Lake Mineral Wells"],
  ["lake-colorado-city", "Lake Colorado City"],
  ["lake-stamford", "Lake Stamford"],
  ["lake-sweetwater", "Lake Sweetwater"],
  ["lake-georgetown", "Lake Georgetown"],
  ["benbrook-lake", "Benbrook Lake"],
  ["granger-lake", "Granger Lake"],
  ["aquilla-lake", "Aquilla Lake"],
  ["white-rock-lake", "White Rock Lake"],
  ["bardwell-lake", "Bardwell Lake"],
  ["lake-bastrop", "Lake Bastrop"],
  ["lake-arlington", "Lake Arlington"],
  ["cedar-lake-cleburne-state-park", "Cedar Lake at Cleburne State Park"],
  ["lake-worth", "Lake Worth"],
  ["lake-nasworthy", "Lake Nasworthy"],
  ["fort-parker-state-park-lake", "Fort Parker State Park Lake"],
  ["lake-tyler", "Lake Tyler (East and West)"],
  ["medina-lake", "Medina Lake"],
  ["lake-weatherford", "Lake Weatherford"],
  ["lake-abilene", "Lake Abilene"],
  ["lake-cypress-springs", "Lake Cypress Springs"],
  ["bachman-lake", "Bachman Lake"],
  ["e-v-spence-reservoir", "E. V. Spence Reservoir"],
  ["brady-creek-reservoir", "Brady Creek Reservoir"],
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
if (statewide.length !== 57) fail(`expected 57 statewide-network lakes, found ${statewide.length}`);
const complete = [...base, ...wave2, ...statewide];
if (new Set(complete).size !== 72) fail(`expected 72 unique complete lakes, found ${new Set(complete).size}`);

const expectedSlugs = expected.map(([slug]) => slug);
const lcraLiveExpectedSlugs = new Set(["fayette-county-reservoir"]);
const officialFallbackSlugs = new Set(["calaveras-lake", "lake-casa-blanca", "white-rock-lake", "lake-bastrop", "cedar-lake-cleburne-state-park", "fort-parker-state-park-lake", "bachman-lake"]);
const twdbLiveExpectedSlugs = expectedSlugs.filter((slug) => !lcraLiveExpectedSlugs.has(slug) && !officialFallbackSlugs.has(slug));
const liveExpectedSlugs = expectedSlugs.filter((slug) => !officialFallbackSlugs.has(slug));
if (JSON.stringify(statewide) !== JSON.stringify(expectedSlugs)) fail("statewide slug registry drifted from the authoritative 57-lake release order");

const topLevel = [...files.network.matchAll(/^    slug: "([^"]+)", name: "([^"]+)"/gm)].map((match) => ({ slug: match[1], name: match[2], index: match.index }));
if (topLevel.length !== 57) fail(`expected 57 top-level lake definitions, found ${topLevel.length}`);
if (new Set(topLevel.map((row) => row.slug)).size !== topLevel.length) fail("duplicate statewide lake slug");
if (new Set(topLevel.map((row) => row.name)).size !== topLevel.length) fail("duplicate statewide lake name");
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
  // Every statewide guide must offer named TPWD-reviewed visit planning, not one generic ramp inventory.
  const accessSegment = segment.match(/accessPoints:\s*\[([\s\S]*?)\n\s*\],/)?.[1];
  if (!accessSegment) fail(`${row.slug} is missing named public-access facilities`);
  const facilityNames = [...accessSegment.matchAll(/\{\s*name:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (facilityNames.length < 1) fail(`${row.slug} has no independently named public-access sites`);
  if (new Set(facilityNames).size !== facilityNames.length) fail(`${row.slug} repeats the same facility in its access inventory`);
  for (const token of ["operator:", "launch:", "fee:", "availability:"]) {
    if (!accessSegment.includes(token)) fail(`${row.slug} access inventory is missing ${token}`);
  }
  if (segment.includes("public access inventory") && segment.includes("accessPoints:")) {
    // The historical summary may mention an inventory; the actual accessPoints must not be a fabricated generic site.
    if (accessSegment.includes("public access inventory")) fail(`${row.slug} includes a generic access item after review`);
  }
  const fishCount = [...segment.matchAll(/fish\("/g)].length;
  if (fishCount < 3) fail(`${row.slug} is too thin: only ${fishCount} source-backed fish targets`);
  const relatedCount = [...segment.matchAll(/\{slug:"[^"]+",name:"[^"]+"\}/g)].length;
  if (relatedCount < 2) fail(`${row.slug} requires at least two related-lake links`);
}

for (const slug of ["white-rock-lake", "lake-ray-hubbard"]) {
  const m = new RegExp('^    slug: "' + slug + '", name:', 'm').exec(files.network);
  if (!m) fail(`missing source-supported no-camping lake ${slug}`);
  const end = files.network.indexOf("\n  },", m.index);
  if (!files.network.slice(m.index, end).includes("campingProhibited: true"))
    fail(`${slug} must continue publishing its verified no-camping restriction`);
}
for (const token of ["pageData.campingProhibited", "No overnight camping at"]) {
  requireText(files.component, token, "source-confirmed no-camping UI contract missing " + token);
}

// Operator-specific safety gates: retain current low-water, pier and construction warnings
// on BOTH the fishing authority and its related state-park destination page.
const fortParkerStart = files.network.indexOf('    slug: "fort-parker-state-park-lake", name:');
if (fortParkerStart < 0) fail("Fort Parker Lake must remain independently registered");
const fortParkerEnd = files.network.indexOf("\n  },", fortParkerStart);
const fortParkerGuide = files.network.slice(fortParkerStart, fortParkerEnd);
for (const token of [
  "fort_parker", "2016", "2026", "2027", "motorized launching",
  "fishing piers", "burn ban", "Navasota River", "Lake Springfield",
  "campingUrl:", "liveDataNote:",
]) requireText(fortParkerGuide, token, "Fort Parker Lake source/access warning missing " + token);
const parkStart = files.fortParkerPark.indexOf('"fort-parker-state-park": {');
if (parkStart < 0) fail("Fort Parker park curation missing");
const parkEnd = files.fortParkerPark.indexOf('"galveston-island-state-park": {', parkStart);
const fortParkerPark = files.fortParkerPark.slice(parkStart, parkEnd);
for (const token of ["Fort Parker Lake", "low water", "both fishing piers", "burn ban", "May 2027", "Navasota River"]) {
  requireText(fortParkerPark, token, "Fort Parker state-park destination lost its active operator warning " + token);
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

if ((files.network.match(/waterDataSlug:\s*"/g) ?? []).length !== twdbLiveExpectedSlugs.length) fail(`expected ${twdbLiveExpectedSlugs.length} statewide-network TWDB live-water mappings`);
if ((files.network.match(/lcraHydrometSiteNumber: "/g) ?? []).length !== 1) fail("expected exactly one statewide-network LCRA Hydromet mapping");
if (files.network.includes("TPWD — current lake conditions entry point")) fail("obsolete pseudo-live TPWD current-conditions fallback remains");

for (const slug of liveExpectedSlugs) {
  requireText(files.liveWorkflow, slug, `production live-water workflow missing ${slug}`);
}
const workflowExpectedBlock = files.liveWorkflow.match(/expected = \[[\s\S]*?\n\s*\]/)?.[0] ?? "";
const workflowLiveUiBlock = files.liveWorkflow.match(/lakes=\([\s\S]*?\n\s*\)/)?.[0] ?? "";
for (const slug of officialFallbackSlugs) {
  if (workflowExpectedBlock.includes(`'${slug}'`) || workflowLiveUiBlock.includes(slug)) {
    fail(`unmonitored fallback lake must not be a release-blocking live-water check: ${slug}`);
  }
}
for (const token of [
  "All 57 monitored lake page-data snapshots and server paths are current",
  "All 57 monitored lake snapshots and live UI surfaces passed",
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


for (const token of [
  "parseLcraHydrometLakeLevelCsv",
  "https://hydromet.lcra.org/media/LakeLevel.csv",
  "https://hydromet.lcra.org/api/GetLakeLevelsForAllSites/",
  "https://hydromet.lcra.org/api/GetDataBySite/",
]) requireText(files.liveParser + files.liveFetcher, token, `Fayette LCRA resilient live-water contract missing ${token}`);

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
requireText(files.network, 'liveDataNote: "No public real-time pool-elevation feed is currently published for Calaveras Lake.', "Calaveras no-live-data note missing");
requireText(files.network, "liveDataNote: def.liveDataNote", "statewide live-data note propagation missing");
requireText(files.component, "pageData.liveDataNote", "lake guide must render source-backed live-data availability notes");
for (const token of [
  "Verify Calaveras no-public-gauge disclosure",
  "No public real-time pool-elevation feed is currently published for Calaveras Lake.",
  "Calaveras must not render a fake live-level strip without a public real-time gauge.",
]) requireText(files.liveWorkflow, token, `Calaveras production fallback verification missing ${token}`);

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
if (newEntryUrls !== 513) fail(`expected 513 statewide-network overview/intent URLs across the 57 statewide lake guides, found ${newEntryUrls}`);

if (files.network.includes('from "@/data/types";\\nimport')) fail("literal escaped newline remains in statewide import block");

console.log(`Statewide fishing network validation passed: 15 existing + 57 statewide-network lakes = 72 complete lake guides; ${newEntryUrls} statewide-network overview/intent URLs; source-backed identity, species/technique relationships, canonical routing, sitemap discovery, related-lake/county links, report freshness language, 49 TWDB live-water mappings, one resilient LCRA Hydromet live mapping, three explicit official-agency fallbacks, current-condition honesty and duplicate-route safeguards are protected.`);
