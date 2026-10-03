import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const [route, component, csvRoute, hubRoute, hubComponent, slugs, sitemap, search, publicRoutes] = await Promise.all([
  read("src/routes/fishing.lakes.tsx"),
  read("src/components/fishing/FishingLakesDirectory.tsx"),
  read("src/routes/fishing.lakes[.]csv.ts"),
  read("src/routes/fishing.tsx"),
  read("src/components/fishing/FishingHub.tsx"),
  read("src/data/fishing/slugs.ts"),
  read("src/data/fishing/sitemap.ts"),
  read("src/data/fishing/search.ts"),
  read("src/lib/public-routes.ts"),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'createFileRoute("/fishing/lakes")',
  'await import("@/data/fishing/queries")',
  'fishingLakesQuery({ limit: 100 })',
  'lakeSpeciesProfilesQuery()',
  'isCompleteFishingLakeSlug(lake.slug)',
  '"@type": "CollectionPage"',
  '"@type": "Dataset"',
  '"@type": "DataDownload"',
  'encodingFormat: "text/csv"',
  'contentUrl: csvUrl',
  '"@type": "ItemList"',
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: rows.length',
  'const completeLakeCount = rows.length || COMPLETE_FISHING_LAKE_SLUGS.length',
  'title: `Texas Lakes Database — Map & Compare ${completeLakeCount} Source-Backed Lakes`',
  'lazy(() => import("@/components/fishing/FishingLakesDirectory")',
  'FishingLakesDirectory rows={rows} latestReview={latestReview}',
]) assert(route.includes(marker), `Fishing lakes route is missing loader/SEO/dataset/lazy-boundary marker: ${marker}.`);

for (const marker of [
  'Texas Lakes Database',
  'What this database covers',
  'Is this every lake in Texas?',
  'Search and compare Texas lakes',
  'Interactive map',
  'Download full CSV',
  'Derived TexasDefined views',
  'Most represented fish targets',
  'thin pages',
  'complete, source-backed lake records',
  "fishingFoundationAnchor('lake', lake.slug)",
  'CitationTrustPanel',
]) assert(component.includes(marker), `Fishing lakes UI is missing citation-database quality marker: ${marker}.`);

for (const marker of [
  "createFileRoute('/fishing/lakes.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  'texasdefined-texas-lakes-database.csv',
  'surface_acres',
  'maximum_depth_feet',
  'river_basin',
  'source_urls',
  'isCompleteFishingLakeSlug(lake.slug)',
]) assert(csvRoute.includes(marker), `Fishing lakes CSV is missing distribution/source marker: ${marker}.`);

for (const forbidden of [
  '@/data/fishing/fixtures',
  'showcase-lakes-prototype',
  'lake-conroe-prototype',
  'fishingPlatform',
]) assert(!route.includes(forbidden), `Fishing lakes directory must use lazy public queries instead of direct/heavy fishing data dependency: ${forbidden}.`);

const legacyExpectedCompleteSlugs = [
  "lake-conroe", "lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma",
  "toledo-bend-reservoir", "possum-kingdom-reservoir", "canyon-lake", "choke-canyon-reservoir", "amistad-reservoir",
  "o-h-ivie-lake", "lake-travis", "lake-whitney", "lake-tawakoni", "falcon-international-reservoir",
];
for (const slug of legacyExpectedCompleteSlugs) assert(slugs.includes(`"${slug}"`), `Complete fishing lake allowlist is missing legacy validated lake ${slug}.`);
const parseSlugArray = (source, name) => {
  const match = source.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]+)\\]`, "s"));
  return match ? [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]) : [];
};
const statewideCompleteSlugs = parseSlugArray(slugs, "STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS");
const completeSlugs = [
  ...parseSlugArray(slugs, "BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseSlugArray(slugs, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...statewideCompleteSlugs,
];
assert(slugs.includes("...BASE_COMPLETE_FISHING_LAKE_SLUGS") && slugs.includes("...WAVE2_COMPLETE_FISHING_LAKE_SLUGS") && slugs.includes("...STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"), "Fishing lakes complete-guide registry must compose the base, wave-2 and statewide-network slug tuples.");
assert(statewideCompleteSlugs.length === 26, `Fishing lakes directory must include exactly 26 statewide-network lake guides; found ${statewideCompleteSlugs.length}.`);
assert(new Set(completeSlugs).size === 41, `Fishing lakes directory must expose exactly 41 currently validated complete lake guides; found ${new Set(completeSlugs).size}.`);
assert(legacyExpectedCompleteSlugs.every((slug) => completeSlugs.includes(slug)), "Fishing lakes complete-guide registry no longer contains the original validated fifteen-lake collection.");

assert(hubRoute.includes('lazy(() => import("@/components/fishing/FishingHub")'), "Fishing hub lazy boundary is missing.");
for (const marker of ['to="/fishing/lakes"', 'Browse fishing lakes →', 'Explore fishing lakes', 'Featured Texas Fishing Lakes']) assert(hubComponent.includes(marker), `Fishing hub is missing lakes-directory discovery marker: ${marker}.`);
for (const marker of ['FISHING_LAKES_DIRECTORY_PATH = "/fishing/lakes"', '{ path: FISHING_LAKES_DIRECTORY_PATH, lastmod: FISHING_LAKES_DIRECTORY_VERIFIED_AT }']) assert(sitemap.includes(marker), `Fishing sitemap is missing lakes-directory ownership marker: ${marker}.`);
assert(publicRoutes.includes('"/fishing/lakes"'), 'Public static route registry must sitemap-own /fishing/lakes.');
for (const marker of ['id: "fishing-directory:texas-fishing"', 'href: "/fishing"', 'id: "fishing-directory:texas-fishing-lakes"', 'title: "Texas Fishing Lakes"', 'href: "/fishing/lakes"', '"compare fishing lakes"']) assert(search.includes(marker), `Fishing site-search index is missing statewide/lakes directory marker: ${marker}.`);
for (const marker of [
  "const completeLakes = lakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug))",
  "const completeLakeCount = completeLakes.length",
  "const completeLakeNames = completeLakes.map((lake) => lake.name)",
  "Compare ${completeLakeCount} complete TexasDefined fishing-lake guides",
  "...completeLakeNames",
]) assert(search.includes(marker), `Fishing site-search complete-lake metadata is not dynamically derived: ${marker}.`);
assert(!search.includes("Compare the five complete TexasDefined fishing-lake guides"), "Fishing site-search must not reintroduce the stale five-lake summary.");

if (errors.length) {
  console.error("Fishing lakes directory validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Fishing lakes database validated: 41 completed lake records remain query-backed and quality-gated, with Dataset metadata, interactive comparison and a source-aligned CSV distribution.");
