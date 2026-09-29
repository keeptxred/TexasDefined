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
};

for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) throw new Error(`Relocation search validation failed: missing ${path}`);
}

const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const fail = (message) => { throw new Error(`Relocation search validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

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

for (const token of [
  'createFileRoute("/compare-texas-cities/$pair")',
  "getRelocationCityPairPage",
  "throw notFound()",
  "loaderData?.head",
]) requireText(files.route, token, `critical pair route missing ${token}`);

for (const forbidden of ["Container", "buildMeta", "RELOCATION_CITY_PAIRS"]) {
  if (files.route.includes(forbidden)) fail(`critical pair route leaked eager UI/data payload: ${forbidden}`);
}

for (const token of [
  'createLazyFileRoute("/compare-texas-cities/$pair")',
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

console.log("Relocation search validation passed: five priority state-move intents reuse canonical state comparisons, six major Texas city-pair spokes are source-backed and sitemap-owned, and the eager route remains server-backed with lazy UI.");
