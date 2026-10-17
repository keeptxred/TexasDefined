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
const beachPhotos = read("src/data/inland-beach-photos.ts");

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
  "dana-peak-park-swimming-beach",
  "stillhouse-park-swimming-beach",
  "union-grove-park-stillhouse-swimming-beach",
  "wilson-h-fox-park-granger-swimming-beach",
  "friendship-park-granger-swimming-beach",
  "westcliff-park-belton-lake-swimming-beach",
  "airport-beach-park-waco-lake-swimming-beach",
  "east-fork-campground-lavon-swimming-beach",
  "avalon-park-lavon-swimming-beach",
  "cooper-doctors-creek-pelican-point-swimming-beach",
  "ray-roberts-isle-du-bois-swimming-beach",
  "ray-roberts-johnson-branch-swimming-beach",
  "benbrook-lake-mustang-point-swimming-beach",
  "benbrook-lake-north-holiday-swimming-beach",
  "lake-arrowhead-state-park-swimming-beach",
  "russell-park-lake-georgetown-swimming-beach",
  "temples-lake-park-swimming-beach",
  "cedar-ridge-park-belton-lake-swimming-beach",
  "oak-park-navarro-mills-swimming-beach",
  "liberty-hill-park-navarro-mills-swimming-beach",
  "wright-patman-north-shore-park-swimming-beach",
  "wright-patman-clear-springs-swimming-beach",
  "sam-rayburn-mill-creek-park-swimming-beach",
  "sam-rayburn-san-augustine-park-swimming-beach",
  "sam-rayburn-ebenezer-park-swimming-beach",
  "possum-kingdom-state-park-swimming-beach",
];
const recordsFound = [...records.matchAll(/^\s+slug: "([^"]+)",$/gm)].map((match) => match[1]);
assert.deepEqual(recordsFound, expectedSlugs, "The eight agency-verified beach records should stay stable and unique.");
assert.equal(new Set(recordsFound).size, expectedSlugs.length);
const sourceLinks = [...records.matchAll(/^\s+officialUrl: "(https:\/\/[^"]+)",$/gm)].map((match) => match[1]);
assert.equal(sourceLinks.length, expectedSlugs.length, "Every beach needs a first-party agency source");
assert.ok(sourceLinks.every((link) => link.startsWith("https://tpwd.texas.gov/") || link.startsWith("https://www.fs.usda.gov/") || link.startsWith("https://www.recreation.gov/") || link.startsWith("https://www.swf-wc.usace.army.mil/")), "All URLs must be from official managing agencies");
for (const key of ["name", "county", "lake", "nearestTown", "managingAgency", "evidence", "experience", "arrival", "safety", "nearby"]) {
  assert.equal([...records.matchAll(new RegExp('^\\s+' + key + ': "', 'gm'))].length, expectedSlugs.length, `Missing beach property: ${key}`);
}
assert.ok(records.includes("NOT a claim to cover every inland"));
assert.ok(page.includes('createFileRoute("/explore/inland-beaches")'));
assert.ok(page.includes("useRouterState") && page.includes("return <Outlet />"), "Parent route must render children rather than swallowing individual beach pages");
assert.ok(page.includes("matches[matches.length - 1]?.routeId !== match.routeId"), "Parent sitemap/canonical metadata must not replace the individual beach head");
assert.ok(page.includes("mainEntity") && page.includes("ItemList"));
assert.ok(page.includes('numberOfItems: beaches.length'));
assert.ok(individual.includes("beach.officialUrl") && individual.includes("beach.checkedAt"));
assert.ok(individual.includes("beach.statusNotice") && individual.includes("beach.statusUrl"), "Special-closure swim beaches must display active caution and direct status links");
assert.equal([...records.matchAll(/^\s+statusNotice: "/gm)].length, 5, "Benbrook and Sam Rayburn swimming beaches must retain dated low-water closure notices");
assert.equal([...records.matchAll(/^\s+statusUrl: "/gm)].length, 5, "Benbrook and Sam Rayburn closure notices must link to official live status");
for (const slug of ["cedar-hill-state-park-swimming-beach", "lake-mineral-wells-state-park-swim-beach"]) {
  assert.ok(beachPhotos.includes('"' + slug + '": {'), `Missing exact-beach photo for ${slug}`);
}
assert.ok(beachPhotos.includes('Larry D. Moore') && beachPhotos.includes('creativecommons.org/licenses/by/4.0'), "Photographer and CC BY attribution required");
assert.ok(individual.includes("photo.licenseUrl") && individual.includes("photo.sourceUrl"), "Source and image license must render visibly");

assert.ok(individual.includes('createFileRoute("/explore/inland-beaches/$slug")'), "Every beach needs an individual route, not just an anchor");
assert.ok(page.includes('await import("@/data/inland-beach-authority")'), "Directory must lazy-load full profiles instead of expanding global client JS");
assert.ok(individual.includes('await import("@/data/inland-beach-authority")'), "Individual beach route must lazy-load full profiles");
assert.ok(!page.includes('import { inlandSwimmingBeaches }') && !individual.includes('import { inlandBeachBySlug, inlandSwimmingBeaches }'), "No eager inland inventory in statically registered routes");

assert.ok(individual.includes("inlandBeachBySlug(params.slug)"));
assert.ok(individual.includes("canonicalLink(texasDefinedBrand, canonicalPath)"));
assert.ok(individual.includes("beach.evidence") && individual.includes("beach.arrival") && individual.includes("beach.safety") && individual.includes("beach.nearby"));
assert.ok(individual.includes("beach.officialUrl") && individual.includes("beach.checkedAt"));
assert.ok(page.includes('to="/explore/inland-beaches/$slug"'), "Index must link to individual beach pages");
for (const bodyProperty of ["evidence","experience","arrival","safety","nearby"]) assert.ok(!page.includes(`{beach.${bodyProperty}}`), `Directory should not duplicate full ${bodyProperty} text from every individual page`);
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

const coastalEditorialText = read("src/data/coastal-beach-editorial.ts");
const sourceBlock = coastalEditorialText.match(/= (\{[\s\S]*\});\s*$/);
assert.ok(sourceBlock, "Official coastal beach editorial data must be complete JSON-compatible source records");
const editorial = JSON.parse(sourceBlock[1]);
const researchedSlugs = Object.keys(editorial);
assert.equal(researchedSlugs.length, 9, "All nine separately researched high-traffic coastal pages must remain present");
const coastCatalogSlugs = [...read("src/data/coastal-places.ts").matchAll(/^    slug: "([^"]+)",/gm)].map((m) => m[1]);
for (const slug of researchedSlugs) {
  const entry = editorial[slug];
  assert.ok(coastCatalogSlugs.includes(slug), `Coastal editorial page has no canonical source record: ${slug}`);
  for (const field of ["headline", "arrival", "rules", "visitorDecision"]) {
    assert.ok(entry[field]?.length >= 55, `Coastal editorial entry ${slug} missing original research: ${field}`);
  }
  assert.match(entry.sourceUrl, /^https:\/\//, slug);
  assert.match(entry.extraUrl, /^https:\/\//, slug);
}
assert.ok(coastalGuide.includes("COASTAL_BEACH_EDITORIAL[rawSlug]"), "Individual coastal destination must render its own source-backed details");
assert.ok(coastalGuide.includes("editorial.sourceUrl") && coastalGuide.includes("editorial.extraUrl"), "Operator sources must remain visible on each enriched page");

console.log(`Beach authority contract validated: ${expectedSlugs.length} individual inland guides, 52 coastal guide hooks, county backlinks and XML sitemaps.`);
