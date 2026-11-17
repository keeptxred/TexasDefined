import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");
const catalog = read("src/data/destination-preserved-catalog.ts");
const newGuides = read("src/data/approved-attraction-authority-drafts.ts");
const forestry = read("src/data/museum-expansion-statewide-wave54.ts");
const legacy = read("src/data/museum-expansion-statewide-wave3.ts");
const heroes = read("src/data/museum-authority-heroes.ts");
const museumManifest = JSON.parse(read("public/museum-verification-manifest.json"));
const attractionManifest = JSON.parse(read("docs/editorial/attraction-approval-2026-11-17/attraction-source-verification.json"));

assert.match(catalog, /import \{ approvedAttractionDraftDestinations \}/);
assert.match(catalog, /\n  approvedAttractionDraftDestinations,/);
for (const slug of ["texas-freshwater-fisheries-center", "national-ranching-heritage-center-lubbock"]) {
  assert.equal(newGuides.split('slug: "' + slug + '"').length - 1, 1, slug + " must have one draft canonical");
}
assert.equal(forestry.split('slug: "texas-forestry-museum-lufkin"').length - 1, 1);
assert.doesNotMatch(legacy, /slug: "texas-forestry-museum-lufkin"/);
assert.match(heroes, /"texas-forestry-museum-lufkin": \{/);
assert.match(newGuides, /DESTINATION_PHOTO_PLACEHOLDER/); // NRHC intentionally withheld until permission
assert.match(newGuides, /Lake_Zebco_Texas_Freshwater_Fisheries_Center_2025.jpg/);
assert.match(newGuides, /Larry D\. Moore · CC BY 4\.0/);
for (const slug of ["texas-freshwater-fisheries-center", "texas-forestry-museum-lufkin", "national-ranching-heritage-center-lubbock"]) {
  const entries = [...museumManifest.museums, ...attractionManifest.attractions].filter((entry) => entry.path === "/destination/" + slug);
  assert.equal(entries.length, 1, slug + " must have exactly one scheduled official-source review");
  assert.equal(entries[0].cadenceDays, 30, slug + " should refresh monthly");
  assert.ok(entries[0].sources.some((source) => /^https:\/\//.test(source.sourceUrl)), slug + " needs an official source");
}
assert.match(newGuides, /hatchery tram tour is suspended/i);
assert.match(newGuides, /commercial use of images of its structures/i);
for (const [label, text] of [["fisheries", newGuides], ["forestry", forestry]]) {
  assert.match(text, /visitorFaqs:/, label + " FAQ required");
  assert.match(text, /sourceCheckedAt:/, label + " source date required");
}
console.log("Owner-approved attraction draft source invariants passed; publication remains on hold.");
