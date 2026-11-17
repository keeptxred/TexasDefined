import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");
const catalog = read("src/data/destination-preserved-catalog.ts");
const newGuides = read("src/data/approved-attraction-authority-drafts.ts");
const forestry = read("src/data/museum-expansion-statewide-wave54.ts");
const legacy = read("src/data/museum-expansion-statewide-wave3.ts");
const heroes = read("src/data/museum-authority-heroes.ts");
const availability = read("src/data/destination-availability.ts");
const destinationRoute = read("src/routes/destination.$slug.tsx");
const museumManifest = JSON.parse(read("public/museum-verification-manifest.json"));
const attractionManifest = JSON.parse(read("docs/editorial/attraction-approval-2026-11-17/attraction-source-verification.json"));
const releaseGate = read("docs/editorial/attraction-approval-2026-11-17/RELEASE-GATE.md");

assert.match(catalog, /import \{ approvedAttractionDraftDestinations \}/);
assert.match(catalog, /\n  approvedAttractionDraftDestinations,/);
for (const slug of ["texas-freshwater-fisheries-center", "national-ranching-heritage-center-lubbock"]) {
  assert.equal(newGuides.split('slug: "' + slug + '"').length - 1, 1, slug + " must have one draft canonical");
}
assert.equal(forestry.split('slug: "texas-forestry-museum-lufkin"').length - 1, 1);
assert.doesNotMatch(legacy, /slug: "texas-forestry-museum-lufkin"/);
assert.match(heroes, /"texas-forestry-museum-lufkin": \{/);
assert.match(availability, /"national-ranching-heritage-center-lubbock", \/\/ Commercial photo clearance/);
assert.match(availability, /"texas-freshwater-fisheries-center", \/\/ New guide awaiting separate final owner publication approval/);
assert.match(destinationRoute, /robots: indexable \? undefined : "noindex, follow"/);
assert.match(destinationRoute, /verifiedAttractionPhotoRights/);
assert.match(destinationRoute, /acquireLicensePage: "https:\/\/commons.wikimedia.org\/wiki\/File:"/);
assert.doesNotMatch(newGuides, /DESTINATION_PHOTO_PLACEHOLDER/); // all three have exact-site Commons photos on draft branch
assert.match(newGuides, /Dogtrot_House%2C_NRHC%2C_Lubbock%2C_TX_IMG_1603.JPG/);
assert.match(newGuides, /Billy Hathorn · CC BY 3\.0/);
assert.match(newGuides, /Lake_Zebco_Texas_Freshwater_Fisheries_Center_2025.jpg/);
assert.match(newGuides, /Larry D\. Moore · CC BY 4\.0/);
assert.match(releaseGate, /File:Lake_Zebco_Texas_Freshwater_Fisheries_Center_2025\.jpg/);
assert.doesNotMatch(newGuides, /File:Cichlid_Texas_Freshwater_Fisheries_Center_2025\.jpg/);
assert.match(forestry, /sensory backpacks/i);
assert.match(forestry, /train table/i);
assert.match(forestry, /guided history tour/i);
assert.match(forestry, /\$3 per person/);
assert.match(forestry, /Angelina County/);
assert.match(newGuides, /any group larger than 20/);
assert.match(newGuides, /\$50 for the group/);
assert.match(newGuides, /Christmas Eve and Day/);
assert.match(forestry, /address: "1905 Atkinson Dr, Lufkin, TX 75901"/);
assert.match(forestry, /50th anniversary in 2026/);
assert.match(forestry, /conflicting ZIP codes/);
assert.match(newGuides, /paved pathways/i);
assert.match(newGuides, /editorial planning estimate/i);
assert.match(newGuides, /not an operator-promised duration/i);
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
