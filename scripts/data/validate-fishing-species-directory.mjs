import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const [slugs, data, component, route, search, sitemap] = await Promise.all([
  read("src/data/fishing/slugs.ts"),
  read("src/data/fishing/species-directory-data.server.ts"),
  read("src/components/fishing/FishSpeciesDirectory.tsx"),
  read("src/routes/fishing.species.tsx"),
  read("src/data/fishing/search.ts"),
  read("src/data/fishing/sitemap.ts"),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'COMPLETE_FISHING_SPECIES_SLUGS = ["largemouth-bass"]',
  'isCompleteFishingSpeciesSlug',
  'kind === "species" && isCompleteFishingSpeciesSlug(canonicalSlug)',
  'return `/fishing/species#species-${canonicalSlug}`',
]) assert(slugs.includes(marker), `Fishing species completeness routing is missing marker: ${marker}.`);

const completeSpeciesMatch = slugs.match(/COMPLETE_FISHING_SPECIES_SLUGS\s*=\s*\[([^\]]+)\]/s);
const completeSpecies = completeSpeciesMatch ? [...completeSpeciesMatch[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
assert(completeSpecies.length === 1 && completeSpecies[0] === "largemouth-bass", `Only largemouth bass may have a complete standalone species route until another species clears validation; found ${completeSpecies.join(", ") || "none"}.`);

for (const marker of [
  'fishingPlatform.lakes.list',
  'fishingPlatform.lakeSpecies.list',
  'isCompleteFishingLakeSlug(lake.slug)',
  'isCompleteFishingSpeciesSlug(row.slug)',
  'completeLakesBySpeciesId',
  'href: fishingFoundationAnchor("lake", lake.slug)',
  'completeSpeciesGuides:',
  'completeLakeGuides:',
]) assert(data.includes(marker), `Fishing species directory server data is missing completed-lake/completeness marker: ${marker}.`);

for (const marker of [
  'Compare complete fishing lakes →',
  'Published records',
  'Complete species guides',
  'Complete lake guides',
  'Broad catalog, selective standalone guides',
  'Other records stay in the directory rather than becoming thin pages.',
  'In complete lake guides',
  'Directory profile · standalone guide not published',
  'No completed TexasDefined lake guide currently carries a verified relationship for this record.',
  'lake-to-species relationship',
  'not a live fishing report',
]) assert(component.includes(marker), `Fishing species directory UI is missing quality/internal-link marker: ${marker}.`);

for (const marker of [
  'fishingFoundationAnchor("species", row.slug)',
  '"@type": "CollectionPage"',
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: rows.length',
  'How many fish have complete standalone species guides?',
  'thin standalone pages',
]) assert(route.includes(marker), `Fishing species route is missing governed AEO/schema marker: ${marker}.`);

assert(!route.includes('row.slug === "largemouth-bass"'), 'Fishing species route must use the completeness allowlist rather than a hardcoded largemouth slug check.');
assert(!component.includes('to="/fishing/species/$slug"'), 'Fishing species directory must not route every catalog species to a standalone page.');

for (const marker of [
  'href: fishingFoundationAnchor("species", row.slug)',
  'kind: "fish-species"',
]) assert(search.includes(marker), `Fishing search must preserve completeness-aware species routing: ${marker}.`);

assert(sitemap.includes('fishingSpeciesCanonicalPath("largemouth-bass")'), 'Fishing sitemap must keep largemouth bass as the only standalone species page until completeness expands.');
for (const slug of ["guadalupe-bass", "smallmouth-bass", "crappie", "catfish", "striped-bass", "alligator-gar", "sunfish", "rainbow-trout"]) {
  assert(!sitemap.includes(`fishingSpeciesCanonicalPath("${slug}")`), `Incomplete species ${slug} must not leak into the sitemap as a standalone route.`);
}

if (errors.length) {
  console.error("Fishing species directory validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Fishing species directory validated: one complete standalone species guide, directory-only incomplete profiles, verified links into completed lake guides and completeness-aware sitemap/search routing are protected.");
