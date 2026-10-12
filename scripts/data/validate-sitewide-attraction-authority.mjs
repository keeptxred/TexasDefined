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
for (const key of ["addVerifiedVisitorFacilities", "VERIFIED_VISITOR_FACILITIES", "editorialFocus"]) {
  assert(facts.includes(key), `Missing source-backed destination selection: ${key}`);
}
for (const slug of ["enchanted-rock-state-natural-area", "space-center-houston", "moody-gardens", "padre-island-national-seashore", "texas-state-aquarium", "hamilton-pool-preserve"]) {
  assert(facts.includes(`"${slug}": {`), `Sourced facilities profile missing: ${slug}`);
}
assert(facts.includes('"enchanted-rock-state-natural-area": {\\n    editorialFocus: ["parking", "restrooms", "map"]'), "The remote hiking destination needs arrival, restroom and trail map priorities.");
assert(facts.includes('"texas-state-aquarium": {\\n    editorialFocus: ["map"]'), "The aquarium's public planning UI must prioritize exhibit navigation, not advertise bathrooms.");
assert(facts.includes('"space-center-houston": {\\n    editorialFocus: ["parking"]'), "Space Center Houston should emphasize an arrival decision instead of a universal facilities checklist.");
for (const key of ["auditAttractionAuthority", "auditAttractionAuthorityCatalog", "selectedTopics.has(\"parking\")", "selectedTopics.has(\"restrooms\")", "selectedTopics.has(\"map\")", "isExhibitionVenue", "image-license-unverified", "revisit-overdue", "attractionReviewCadenceDays"]) {
  assert(audit.includes(key), `Missing context-sensitive authority audit rule: ${key}`);
}
assert(!audit.includes('if (!sourceVerified(facilities?.parking'), "Do not demand parking verification of every type of attraction.");
assert(!audit.includes('if (!sourceVerified(facilities?.restrooms'), "Do not demand restroom verification of museums and indoor attractions by default.");
assert(resolver.includes("addVerifiedVisitorFacilities,"), "Known facility facts should be available to canonical destinations without being forced into visible copy.");
assert(route.includes("<DestinationVisitorEssentials destination={destination} />"), "Contextual visitor guide hook missing.");
assert(template.includes("if (!focus.length) return null"), "Visitor facilities panel must be absent unless an editor selects relevant topics.");
assert(template.includes('focus.includes("restrooms")') && template.includes('focus.includes("parking")'), "Selected visitor topics must control each visible section.");
assert(template.includes("editorialHeading") && template.includes("editorialIntro"), "Visitor copy must be specific to a place.");
assert(index.includes('to="/explore/attractions-comparison"'), "Explore entry point to statewide attraction index is missing.");
assert(explorer.includes("categoryFilter") && explorer.includes("searchTerm"), "Statewide Explore attraction index must support filtering and search.");
assert(inventory.includes("typescript") && inventory.includes("sourceFilesInspected"), "Full source inventory / research backlog generator missing.");
assert(quality.includes("readyForIndexing"), "Do not silently weaken existing publishing quality gates.");

if (failures.length) {
  console.error("Attraction sitewide authority governance failed:\n" + failures.map(x=>"- "+x).join("\n"));
  process.exit(1);
}
console.log("Sitewide attraction governance passed: shared facilities UI, source discipline, searchable Explore, legacy-ready backlog, and separate quality audit.");
