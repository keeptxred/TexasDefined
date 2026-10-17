import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (pathName) => fs.readFileSync(path.join(root, pathName), "utf8");
const records = read("src/data/inland-beach-authority.ts");
const page = read("src/routes/explore.inland-beaches.tsx");
const coastAndLakes = read("src/routes/explore.$category.lazy.tsx");
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
];
const recordsFound = [...records.matchAll(/^\s+slug: "([^"]+)",$/gm)].map((match) => match[1]);
assert.deepEqual(recordsFound, expectedSlugs, "The eight agency-verified beach records should stay stable and unique.");
assert.equal(new Set(recordsFound).size, expectedSlugs.length);
const sourceLinks = [...records.matchAll(/^\s+officialUrl: "(https:\/\/[^"]+)",$/gm)].map((match) => match[1]);
assert.equal(sourceLinks.length, expectedSlugs.length, "Every beach needs a first-party agency source");
assert.ok(sourceLinks.every((link) => link.startsWith("https://tpwd.texas.gov/")), "Sources should be official managing-agency evidence");
for (const key of ["name", "county", "lake", "nearestTown", "managingAgency", "evidence", "experience", "arrival", "safety", "nearby"]) {
  assert.equal([...records.matchAll(new RegExp('^\\s+' + key + ': "', 'gm'))].length, expectedSlugs.length, `Missing beach property: ${key}`);
}
assert.ok(records.includes("NOT a claim to cover every inland"));
assert.ok(page.includes('createFileRoute("/explore/inland-beaches")'));
assert.ok(page.includes("mainEntity") && page.includes("ItemList"));
assert.ok(page.includes('numberOfItems: inlandSwimmingBeaches.length'));
assert.ok(page.includes("beach.officialUrl") && page.includes("beach.checkedAt"));
assert.ok(page.includes("not a claim that these are all inland beaches"));
assert.ok(page.includes("lifeguards"));
assert.ok(coastAndLakes.includes('match.slug === "beaches-coast" || match.slug === "lakes-rivers"'));
assert.ok(coastAndLakes.includes('<Link to="/explore/inland-beaches"'));
assert.equal(sitemap.split('"/explore/inland-beaches"').length - 1, 2, "Both primary and fallback explore sitemaps must list the guide");
console.log(`Inland beach authority validated: ${expectedSlugs.length} grounded entries; coast/lake links; structured data; sitemap.`);
