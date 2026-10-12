import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const types = read("src/data/types.ts");
const facts = read("src/data/destination-visitor-facilities.ts");
const audit = read("src/data/destination-authority-audit.ts");
const template = read("src/components/editorial/DestinationVisitorEssentials.tsx");
const route = read("src/routes/destination.$slug.tsx");
const resolver = read("src/data/destination-curation-all.ts");
const explorer = read("src/components/explore/ExploreDestinationComparison.tsx");
const index = read("src/routes/explore.index.lazy.tsx");
const inventory = read("scripts/data/audit-all-attraction-authority.mjs");
const quality = read("src/data/destination-audit.ts");

for (const key of ["VisitorFacilityFact", "DestinationVisitorFacilities", "visitorFacilities?: DestinationVisitorFacilities", "officialMapUrl?", "sourceUrl?", "checkedAt?"]) assert(types.includes(key), `Missing typed authority facility contract: ${key}`);
for (const key of ["addVerifiedVisitorFacilities", "VERIFIED_VISITOR_FACILITIES", "not independently"]) {
  assert(facts.includes(key) || template.includes(key), `Missing fact distinction: ${key}`);
}
for (const slug of ["enchanted-rock-state-natural-area", "space-center-houston", "moody-gardens", "padre-island-national-seashore", "texas-state-aquarium", "hamilton-pool-preserve"]) {
  assert(facts.includes(`"${slug}": {`), `Sourced facilities profile missing: ${slug}`);
}
for (const key of ["auditAttractionAuthority", "auditAttractionAuthorityCatalog", "parking-unverified", "restrooms-unverified", "operator-map-unverified", "image-license-unverified", "revisit-overdue", "attractionReviewCadenceDays"]) assert(audit.includes(key), `Missing sitewide audit rule: ${key}`);
assert(resolver.includes("addVerifiedVisitorFacilities,"), "Facilities must be part of canonical destination curation.");
assert(route.includes("<DestinationVisitorEssentials destination={destination} />"), "Every canonical destination page must show facility evidence or an explicit unknown.");
assert(template.includes("Not independently verified"), "Unknown facilities must never be represented as absent or present.");
assert(template.includes("Official facility / visitor map"), "Operator map must have a distinct link from geographic pin.");
assert(index.includes('to="/explore/attractions-comparison"'), "Explore entry point to statewide attraction index is missing.");
assert(explorer.includes("categoryFilter") && explorer.includes("searchTerm"), "Statewide Explore attraction index must support filtering and search.");
assert(inventory.includes("typescript") && inventory.includes("sourceFilesInspected"), "Full source inventory / research backlog generator missing.");
assert(quality.includes("readyForIndexing"), "Do not silently weaken existing publishing quality gates.");

if (failures.length) {
  console.error("Attraction sitewide authority governance failed:\n" + failures.map(x=>"- "+x).join("\n"));
  process.exit(1);
}
console.log("Sitewide attraction governance passed: shared facilities UI, source discipline, searchable Explore, legacy-ready backlog, and separate quality audit.");
