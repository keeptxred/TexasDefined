import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");
const catalog = read("src/data/destination-preserved-catalog.ts");
const newGuides = read("src/data/approved-attraction-authority-drafts.ts");
const forestry = read("src/data/museum-expansion-statewide-wave54.ts");
const legacy = read("src/data/museum-expansion-statewide-wave3.ts");
const heroes = read("src/data/museum-authority-heroes.ts");

assert.match(catalog, /import \{ approvedAttractionDraftDestinations \}/);
assert.match(catalog, /\n  approvedAttractionDraftDestinations,/);
for (const slug of ["texas-freshwater-fisheries-center", "national-ranching-heritage-center-lubbock"]) {
  assert.equal(newGuides.split('slug: "' + slug + '"').length - 1, 1, slug + " must have one draft canonical");
}
assert.equal(forestry.split('slug: "texas-forestry-museum-lufkin"').length - 1, 1);
assert.doesNotMatch(legacy, /slug: "texas-forestry-museum-lufkin"/);
assert.match(heroes, /"texas-forestry-museum-lufkin": \{/);
assert.match(newGuides, /DESTINATION_PHOTO_PLACEHOLDER/);
assert.match(newGuides, /hatchery tram tour is suspended/i);
assert.match(newGuides, /commercial use of images of its structures/i);
for (const [label, text] of [["fisheries", newGuides], ["forestry", forestry]]) {
  assert.match(text, /visitorFaqs:/, label + " FAQ required");
  assert.match(text, /sourceCheckedAt:/, label + " source date required");
}
console.log("Owner-approved attraction draft source invariants passed; publication remains on hold.");
