import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");
const catalog = read("src/data/destination-preserved-catalog.ts");
const newGuides = read("src/data/approved-attraction-authority-drafts.ts");
const forestry = read("src/data/museum-expansion-statewide-wave54.ts");
const legacy = read("src/data/museum-expansion-statewide-wave3.ts");
const heroes = read("src/data/museum-authority-heroes.ts");
const museumFaqs = read("src/data/museum-visitor-faqs.ts");
const museumDossiers = read("src/data/museum-authority-network.ts");
const authorityPresentation = read("src/components/editorial/DestinationAuthoritySections.tsx");
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
assert.doesNotMatch(availability, /"national-ranching-heritage-center-lubbock"\s*,/);
assert.doesNotMatch(availability, /"texas-freshwater-fisheries-center"\s*,/);
const sitemapParity = read("src/data/destination-sitemap-detail-parity.server.ts");
for (const slug of ["national-ranching-heritage-center-lubbock", "texas-freshwater-fisheries-center"]) {
  assert.ok(sitemapParity.includes('"' + slug + '"'), "Approved attraction requires canonical sitemap parity: " + slug);
}
assert.match(sitemapParity, /getResolvedDestination\(slug\)/);
assert.match(sitemapParity, /auditDestination\(destination\)\.readyForIndexing/);
assert.doesNotMatch(destinationRoute, /DraftAttractionAuthoritySections/);
assert.match(destinationRoute, /DestinationVisitPlanner destination=\{destination\}/);
assert.match(destinationRoute, /robots: indexable \? undefined : "noindex, follow"/);
assert.match(destinationRoute, /verifiedAttractionPhotoRights/);
assert.match(destinationRoute, /acquireLicensePage: "https:\/\/commons.wikimedia.org\/wiki\/File:"/);
assert.doesNotMatch(newGuides, /DESTINATION_PHOTO_PLACEHOLDER/); // two exact-site photos plus clearly labeled off-site NRHC context photo
assert.doesNotMatch(newGuides, /Dogtrot_House%2C_NRHC%2C_Lubbock%2C_TX_IMG_1603.JPG/);
assert.match(newGuides, /Longhorn_cattle_grazing\._%2825111309555%29\.jpg/);
assert.match(newGuides, /USDA NRCS Texas · CC BY 2\.0/);
assert.match(newGuides, /not photographed at the National Ranching Heritage Center/);
assert.match(destinationRoute, /Illustrative Texas ranching photograph; not taken at the National Ranching Heritage Center/);
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
assert.match(newGuides, /contact form not found/i);
assert.match(newGuides, /ranchhc@ttu\.edu/);
assert.match(newGuides, /Christmas Eve and Day/);
assert.equal((newGuides.match(/authorityGuide: \{/g) || []).length, 2, "both new guides need full editorial authority assessments");
assert.doesNotMatch(forestry, /authorityGuide: \{/); // full museum-specific dossier avoids duplicate trip plans
assert.match(museumDossiers, /"texas-forestry-museum-lufkin": \{/);
assert.match(museumDossiers, /Angelina County adult groups tour free/);
assert.match(newGuides, /visitorFacts:/);
assert.match(forestry, /visitorFacts:/);
assert.match(newGuides, /groups larger than 20|larger than 20/i);
assert.match(forestry, /out-of-county rate/);
assert.match(museumFaqs, /\$3 per person for adult groups from outside Angelina County/);
assert.match(authorityPresentation, /!museumAuthoritySlugs\.has\(destination\.slug\)/);
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
console.log("Approved attraction publication contracts passed: no owner hold, licensed media, canonical sitemap parity, source-linked visitor FAQs and monthly verification.");
