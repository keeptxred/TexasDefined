import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (pathName) => fs.readFileSync(path.join(root, pathName), "utf8");
const records = read("src/data/inland-beach-authority.ts");
const page = read("src/routes/explore.inland-beaches.tsx");
const coastAndLakes = read("src/routes/explore.$category.lazy.tsx");
const individual = read("src/routes/explore.inland-beaches.$slug.tsx");
const coastDestination = read("src/routes/destination.$slug.tsx");
const coastalGuide = read("src/components/content/CoastalBeachFieldGuide.tsx");
const countyRoute = read("src/routes/$kind.$slug.lazy.tsx");
const countyInland = read("src/components/content/CountyInlandSwimmingBeaches.tsx");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");

const expectedSlugs = [
  "cedar-hill-state-park-swimming-beach",
  "ray-roberts-lake-state-park-swim-beaches",
  "eisenhower-state-park-swimming-cove",
  "lake-mineral-wells-state-park-swim-beach",
  "tyler-state-park-swimming-beach",
  "atlanta-state-park-swim-beach",
  "cedron-creek-park-swimming-beach",
  "lake-brownwood-state-park-swim-beach",
  "fort-richardson-north-park-swimming-beach",
  "cooper-state-park-south-sulphur-swimming-beach",
  "lake-colorado-city-state-park-swimming-beach",
  "ratcliff-lake-recreation-area-swimming-beach",
];
const recordsFound = [...records.matchAll(/^\s+slug: "([^"]+)",$/gm)].map((match) => match[1]);
assert.deepEqual(recordsFound, expectedSlugs, "The eight agency-verified beach records should stay stable and unique.");
assert.equal(new Set(recordsFound).size, expectedSlugs.length);
const sourceLinks = [...records.matchAll(/^\s+officialUrl: "(https:\/\/[^"]+)",$/gm)].map((match) => match[1]);
assert.equal(sourceLinks.length, expectedSlugs.length, "Every beach needs a first-party agency source");
assert.ok(sourceLinks.every((link) => link.startsWith("https://tpwd.texas.gov/") || link.startsWith("https://www.fs.usda.gov/")), "All URLs must be from official managing agencies");
for (const key of ["name", "county", "lake", "nearestTown", "managingAgency", "evidence", "experience", "arrival", "safety", "nearby"]) {
  assert.equal([...records.matchAll(new RegExp('^\\s+' + key + ': "', 'gm'))].length, expectedSlugs.length, `Missing beach property: ${key}`);
}
assert.ok(records.includes("NOT a claim to cover every inland"));
assert.ok(page.includes('createFileRoute("/explore/inland-beaches")'));
assert.ok(page.includes("mainEntity") && page.includes("ItemList"));
assert.ok(page.includes('numberOfItems: inlandSwimmingBeaches.length'));
assert.ok(page.includes("beach.officialUrl") && page.includes("beach.checkedAt"));
assert.ok(individual.includes('createFileRoute("/explore/inland-beaches/$slug")'), "Every beach needs an individual route, not just an anchor");
assert.ok(individual.includes("inlandBeachBySlug(params.slug)"));
assert.ok(individual.includes("canonicalLink(texasDefinedBrand, canonicalPath)"));
assert.ok(individual.includes("beach.evidence") && individual.includes("beach.arrival") && individual.includes("beach.safety") && individual.includes("beach.nearby"));
assert.ok(individual.includes("beach.officialUrl") && individual.includes("beach.checkedAt"));
assert.ok(page.includes('to="/explore/inland-beaches/$slug"'), "Index must link to individual beach pages");
assert.ok(coastalGuide.includes("coastalPlaces.find"), "All existing coast records must connect to a page-specific field guide");
for (const kind of ['gulf-beach','bay-beach','coastal-park','barrier-island','national-seashore','shoreline','beach-access']) assert.ok(coastalGuide.includes('"'+kind+'"'), kind);
assert.ok(coastDestination.includes('<CoastalBeachFieldGuide destinationSlug={destination.slug}'), "Destination page must render coastal-specific visitor detail");
assert.ok(countyRoute.includes("<CountyInlandSwimmingBeaches"), "Matching county guides need reverse links");
assert.ok(countyInland.includes("inlandSwimmingBeaches.filter"), "County reverse link source must be actual inland beach inventory");
assert.equal(sitemap.split("...inlandSwimmingBeaches.map").length - 1, 2, "Both sitemaps must include all 8 individual guides");

assert.ok(page.includes('beach.county.split(" / ")') && page.includes('/county/'), "Every inland beach must link to its county guide");
assert.ok(page.includes("not a claim that these are all inland beaches"));
assert.ok(page.includes("lifeguards"));
assert.ok(coastAndLakes.includes('match.slug === "beaches-coast" || match.slug === "lakes-rivers"'));
assert.ok(coastAndLakes.includes('<Link to="/explore/inland-beaches"'));
assert.equal(sitemap.split('"/explore/inland-beaches"').length - 1, 2, "Both primary and fallback explore sitemaps must list the guide");
console.log(`Beach authority contract validated: ${expectedSlugs.length} individual inland guides, 52 coastal guide hooks, county backlinks and XML sitemaps.`);
