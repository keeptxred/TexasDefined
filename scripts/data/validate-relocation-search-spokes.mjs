import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  data: "src/data/relocation-city-pairs.ts",
  pageData: "src/data/relocation-city-pair-page.server.ts",
  functions: "src/data/relocation-city-pair-page.functions.ts",
  route: "src/routes/compare-texas-cities_.$pair.tsx",
  lazyRoute: "src/routes/compare-texas-cities_.$pair.lazy.tsx",
  stateRoute: "src/routes/texas-vs.$state.tsx",
  hub: "src/routes/moving-to-texas.lazy.tsx",
  sitemap: "src/routes/sitemap[.]xml.ts",
  package: "package.json",
  routeTree: "src/routeTree.gen.ts",
  expansion: "src/data/fixtures/relocation-authority-expansion.ts",
  expansionLazy: "src/data/fixtures/lazy-relocation-authority-expansion.ts",
  wave5: "src/data/fixtures/relocation-authority-wave5.ts",
  wave5Lazy: "src/data/fixtures/lazy-relocation-authority-wave5.ts",
  repositories: "src/data/fixtures/repositories.ts",
  checklist: "src/routes/moving-to-texas-checklist.tsx",
};

for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) throw new Error(`Relocation search validation failed: missing ${path}`);
}

const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const fail = (message) => { throw new Error(`Relocation search validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };
const hasRouteCall = (source, functionName, publicPath) => {
  const generatedPath = publicPath.replace('/compare-texas-cities/', '/compare-texas-cities_/');
  return [publicPath, generatedPath].some((routeId) =>
    source.includes(`${functionName}("${routeId}")`) || source.includes(`${functionName}('${routeId}')`));
};

const expectedPairs = [
  "houston-vs-dallas",
  "houston-vs-austin",
  "houston-vs-san-antonio",
  "dallas-vs-austin",
  "dallas-vs-san-antonio",
  "austin-vs-san-antonio",
];
const pairSlugs = [...files.data.matchAll(/slug: "(houston-vs-dallas|houston-vs-austin|houston-vs-san-antonio|dallas-vs-austin|dallas-vs-san-antonio|austin-vs-san-antonio)"/g)].map((match) => match[1]);
if (JSON.stringify(pairSlugs) !== JSON.stringify(expectedPairs)) fail(`city pair allowlist drifted: ${pairSlugs.join(", ")}`);

for (const token of [
  "RELOCATION_CITY_PAIR_VERIFIED_AT",
  "relocationCityPairPath",
  "relocationCityPairTitle",
  "relocationCityPairDescription",
  "relocationCityPairProfile",
  "relocationCityPairSitemapEntries",
  "RELOCATION_SOURCES.blsMetro",
  "RELOCATION_SOURCES.txdotTraffic",
  "RELOCATION_SOURCES.tdiInsurance",
  "RELOCATION_SOURCES.femaFlood",
  "RELOCATION_SOURCES.teaSchools",
  "RELOCATION_SOURCES.comptrollerProperty",
  "RELOCATION_SOURCES.pucUtilities",
]) requireText(files.data, token, `city-pair model missing ${token}`);

for (const token of [
  "loadRelocationCityPairPageServer",
  "buildMeta",
  "canonicalLink",
  '"@type": "WebPage"',
  '"@type": "BreadcrumbList"',
  '"@type": "FAQPage"',
  '"index, follow, max-image-preview:large"',
]) requireText(files.pageData, token, `server page-data layer missing ${token}`);

for (const token of ["createServerFn", "getRelocationCityPairPage", "loadRelocationCityPairPageServer"]) {
  requireText(files.functions, token, `server-function bridge missing ${token}`);
}

if (!hasRouteCall(files.route, 'createFileRoute', '/compare-texas-cities/$pair')) {
  fail('critical pair route missing createFileRoute for /compare-texas-cities/$pair');
}
for (const token of [
  "getRelocationCityPairPage",
  "throw notFound()",
  "loaderData?.head",
]) requireText(files.route, token, `critical pair route missing ${token}`);

for (const forbidden of ["Container", "buildMeta", "RELOCATION_CITY_PAIRS"]) {
  if (files.route.includes(forbidden)) fail(`critical pair route leaked eager UI/data payload: ${forbidden}`);
}

if (!hasRouteCall(files.lazyRoute, 'createLazyFileRoute', '/compare-texas-cities/$pair')) {
  fail('lazy pair UI missing createLazyFileRoute for /compare-texas-cities/$pair');
}
for (const token of [
  "Compare the address, not the stereotype",
  "Official research trail",
  "More major Texas city matchups",
  "Interactive Texas city comparer",
  "First-month moving checklist",
]) requireText(files.lazyRoute, token, `lazy pair UI missing ${token}`);

for (const state of ["California", "New York", "Illinois", "Florida", "Colorado"]) {
  if (!files.stateRoute.includes(`"${state}"`)) fail(`priority origin state missing: ${state}`);
}
for (const token of [
  "PRIORITY_MOVE_STATES",
  "Moving from ${loaderData.name} to Texas",
  "First-month checklist",
  "Driver license guide",
  "Vehicle registration guide",
]) requireText(files.stateRoute, token, `state canonical search packaging missing ${token}`);

for (const token of [
  "priorityOriginStates",
  "RELOCATION_CITY_PAIRS",
  "Start with the state you are leaving",
  "Compare Houston, Dallas, Austin and San Antonio directly",
  "texas-vs-every-state",
]) requireText(files.hub, token, `relocation hub discovery missing ${token}`);

const expansionSlugs = [
  "best-houston-suburbs-for-commuters",
  "best-dallas-suburbs-for-commuters",
  "texas-property-taxes-for-new-residents",
  "corporate-relocation-to-texas",
  "employee-relocation-guide-to-texas",
];
for (const slug of expansionSlugs) {
  requireText(files.expansion, `slug: "${slug}"`, `relocation authority body missing ${slug}`);
  requireText(files.expansionLazy, `slug: "${slug}"`, `relocation authority catalog stub missing ${slug}`);
  requireText(files.hub, `/article/${slug}`, `relocation hub missing authority link to ${slug}`);
}
for (const token of [
  "METRO Park & Ride",
  "TxDOT traffic count maps",
  "Dallas Area Rapid Transit",
  "Texas Comptroller Property Tax Assistance",
  "Texas Economic Development & Tourism",
  "Texas Workforce Commission labor-market information",
  "IRS Publication 15-B",
  "Texas Department of Motor Vehicles",
  "Texas Department of Public Safety",
  "general information, not tax advice",
]) requireText(files.expansion, token, `relocation authority source or safeguard missing ${token}`);

const wave5Slugs = [
  "moving-to-texas-renter-guide",
  "how-to-verify-texas-moving-company",
  "health-insurance-when-moving-to-texas",
  "military-family-moving-to-texas",
];
for (const slug of wave5Slugs) {
  requireText(files.wave5, `slug: "${slug}"`, `relocation authority wave 5 body missing ${slug}`);
  requireText(files.wave5Lazy, `slug: "${slug}"`, `relocation authority wave 5 stub missing ${slug}`);
  requireText(files.hub, `/article/${slug}`, `relocation hub missing wave 5 link to ${slug}`);
}
for (const token of [
  "Texas Attorney General Renter’s Rights",
  "Texas Property Code Chapter 92",
  "TxDMV: Don’t Make a Move Without Us",
  "FMCSA registered mover search",
  "HealthCare.gov Special Enrollment Periods",
  "Texas Department of Insurance",
  "Military OneSource",
  "Plan My Move",
  "TRICARE moving guidance",
  "Texas Education Agency Military Compact",
  "general planning information, not insurance, legal or medical advice",
]) requireText(files.wave5, token, `relocation authority wave 5 source or safeguard missing ${token}`);

for (const token of [
  "relocationAuthorityWave5Stubs",
  "loadRelocationAuthorityWave5Article",
  'await import("./relocation-authority-wave5")',
]) requireText(files.wave5Lazy, token, `relocation authority wave 5 lazy registry missing ${token}`);

for (const token of [
  "relocationAuthorityExpansionStubs",
  "loadRelocationAuthorityExpansionArticle",
  'await import("./relocation-authority-expansion")',
]) requireText(files.expansionLazy, token, `relocation authority lazy registry missing ${token}`);

for (const token of [
  'from "./lazy-relocation-authority-expansion"',
  "...relocationAuthorityExpansionStubs",
  "loadRelocationAuthorityExpansionArticle(scope.brandId, slug)",
  'from "./lazy-relocation-authority-wave5"',
  "...relocationAuthorityWave5Stubs",
  "loadRelocationAuthorityWave5Article(scope.brandId, slug)",
]) requireText(files.repositories, token, `relocation repository wiring missing ${token}`);

for (const token of [
  "First 30 Days in Texas: Moving Checklist for New Residents",
  "What to do during your first 30 days in Texas",
  "My Texas Move progress",
]) requireText(files.checklist, token, `first-30-days checklist intent missing ${token}`);

if (files.expansion.includes("guaranteed commute") || files.expansion.includes("universally best suburb")) {
  fail("commuter guides must not promise a commute or declare a universally best suburb");
}

for (const token of [
  'await import("@/data/relocation-city-pairs")',
  "relocationCityPairSitemapEntries()",
]) requireText(files.sitemap, token, `primary sitemap missing ${token}`);

for (const token of [
  "CompareTexasCitiesPairRouteImport",
  "'/compare-texas-cities/$pair'",
  "compare-texas-cities_.$pair.lazy",
]) requireText(files.routeTree, token, `generated route tree missing ${token}`);

const pkg = JSON.parse(files.package);
if (pkg.scripts?.["relocation-search:validate"] !== "node scripts/data/validate-relocation-search-spokes.mjs") fail("package script relocation-search:validate missing or changed");
if (!pkg.scripts?.["data:validate"]?.includes("npm run relocation-search:validate")) fail("relocation search validation is not wired into data:validate");

for (const forbidden of [
  "/moving-from-california-to-texas",
  "/moving-from-new-york-to-texas",
  "/moving-from-illinois-to-texas",
  "/moving-from-florida-to-texas",
  "/moving-from-colorado-to-texas",
  "universally better city",
]) {
  if (Object.values(files).some((source) => source.toLowerCase().includes(forbidden.toLowerCase()))) fail(`duplicate or overclaim pattern leaked: ${forbidden}`);
}

console.log("Relocation search validation passed: five priority state-move intents reuse canonical state comparisons, six major Texas city-pair spokes remain source-backed and sitemap-owned, nine high-intent relocation authority articles are lazily repository-backed and hub-linked, including renter, mover-verification, health-coverage and military-PCS guides, and the first-30-days checklist owns its newcomer intent without duplicate routing.");
