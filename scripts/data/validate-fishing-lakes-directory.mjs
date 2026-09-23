import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const [route, component, hubRoute, hubComponent, slugs, sitemap, search, publicRoutes] = await Promise.all([
  read("src/routes/fishing.lakes.tsx"),
  read("src/components/fishing/FishingLakesDirectory.tsx"),
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
  '"@type": "ItemList"',
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: rows.length',
  'Texas Fishing Lakes — Compare 15 Complete Lake Guides',
  'lazy(() => import("@/components/fishing/FishingLakesDirectory")',
  'FishingLakesDirectory rows={rows} latestReview={latestReview}',
]) assert(route.includes(marker), `Fishing lakes route is missing loader/SEO/lazy-boundary marker: ${marker}.`);

for (const marker of [
  "complete Texas fishing lake guides are published",
  'What this directory covers',
  'not a claim that these are the only or universally “best” fishing lakes in Texas',
  'Compare before you choose the water',
  'Fishing targets',
  'Lake facts are durable. Conditions are not.',
  'unfinished lake records are not exposed here as thin pages',
  'same sourcing standard',
  'source-backed lake-to-species relationships',
  'fishingFoundationAnchor("lake", lake.slug)',
]) assert(component.includes(marker), `Fishing lakes UI is missing quality/discovery marker: ${marker}.`);

for (const forbidden of [
  '@/data/fishing/fixtures',
  'showcase-lakes-prototype',
  'lake-conroe-prototype',
  'fishingPlatform',
]) assert(!route.includes(forbidden), `Fishing lakes directory must use lazy public queries instead of direct/heavy fishing data dependency: ${forbidden}.`);

const expectedCompleteSlugs = [
  "lake-conroe", "lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma",
  "toledo-bend-reservoir", "possum-kingdom-reservoir", "canyon-lake", "choke-canyon-reservoir", "amistad-reservoir",
  "o-h-ivie-lake", "lake-travis", "lake-whitney", "lake-tawakoni", "falcon-international-reservoir",
];
for (const slug of expectedCompleteSlugs) assert(slugs.includes(`"${slug}"`), `Complete fishing lake allowlist is missing ${slug}.`);
const parseSlugArray = (source, name) => {
  const match = source.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]+)\\]`, "s"));
  return match ? [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]) : [];
};
const completeSlugs = [
  ...parseSlugArray(slugs, "BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseSlugArray(slugs, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
];
assert(slugs.includes("...BASE_COMPLETE_FISHING_LAKE_SLUGS") && slugs.includes("...WAVE2_COMPLETE_FISHING_LAKE_SLUGS"), "Fishing lakes complete-guide registry must compose the base and authoritative wave-2 slug tuples.");
assert(new Set(completeSlugs).size === 15, `Fishing lakes directory must expose exactly the fifteen lake guides that have cleared current validation; found ${new Set(completeSlugs).size}.`);
assert(expectedCompleteSlugs.every((slug) => completeSlugs.includes(slug)), "Fishing lakes complete-guide registry does not match the validated fifteen-lake collection.");

assert(hubRoute.includes('lazy(() => import("@/components/fishing/FishingHub")'), "Fishing hub lazy boundary is missing.");
for (const marker of ['to="/fishing/lakes"', 'Browse fishing lakes →', 'Explore fishing lakes', 'A few places to start.']) assert(hubComponent.includes(marker), `Fishing hub is missing lakes-directory discovery marker: ${marker}.`);
for (const marker of ['FISHING_LAKES_DIRECTORY_PATH = "/fishing/lakes"', '{ path: FISHING_LAKES_DIRECTORY_PATH, lastmod: FISHING_LAKES_DIRECTORY_VERIFIED_AT }']) assert(sitemap.includes(marker), `Fishing sitemap is missing lakes-directory ownership marker: ${marker}.`);
assert(publicRoutes.includes('"/fishing/lakes"'), 'Public static route registry must sitemap-own /fishing/lakes.');
for (const marker of ['id: "fishing-directory:texas-fishing"', 'href: "/fishing"', 'id: "fishing-directory:texas-fishing-lakes"', 'title: "Texas Fishing Lakes"', 'href: "/fishing/lakes"', '"compare fishing lakes"']) assert(search.includes(marker), `Fishing site-search index is missing statewide/lakes directory marker: ${marker}.`);

if (errors.length) {
  console.error("Fishing lakes directory validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Fishing lakes directory validated: the fifteen completed lake guides remain query-backed, lazily rendered, sitemap/search-owned and answer-first, while the fishing hub can separately discover verified basic lake profiles.");
