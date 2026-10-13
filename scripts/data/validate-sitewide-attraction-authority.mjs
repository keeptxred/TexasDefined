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
const destinationQuality = read("src/data/destination-quality.ts");
const visitPlanner = read("src/components/editorial/DestinationVisitPlanner.tsx");
const relevance = read("src/data/destination-editorial-relevance.ts");
const viator = read("src/components/editorial/DestinationViatorBooking.tsx");
const categoryPage = read("src/components/editorial/CategoryPage.tsx");
const entityDepth = read("src/components/content/EntityDepthSections.tsx");
const destinationCard = read("src/components/editorial/DestinationCard.tsx");
const articlePage = read("src/routes/article.$slug.tsx");

for (const key of ["VisitorFacilityFact", "DestinationVisitorFacilities", "visitorFacilities?: DestinationVisitorFacilities", "officialMapUrl?", "sourceUrl?", "checkedAt?"]) assert(types.includes(key), `Missing typed authority facility contract: ${key}`);
for (const key of ["addVerifiedVisitorFacilities", "VERIFIED_VISITOR_FACILITIES", "editorialFocus"]) {
  assert(facts.includes(key), `Missing source-backed destination selection: ${key}`);
}
for (const slug of ["enchanted-rock-state-natural-area", "space-center-houston", "moody-gardens", "padre-island-national-seashore", "texas-state-aquarium"]) {
  assert(facts.includes(`"${slug}": {`), `Sourced facilities profile missing: ${slug}`);
}
const preview = (slug) => {
  const start = facts.indexOf(`"${slug}": {`);
  return start < 0 ? "" : facts.slice(start, start + 250);
};
assert(preview("enchanted-rock-state-natural-area").includes('editorialFocus: ["parking", "restrooms", "map"]'), "Backcountry visitor priorities should include access, facilities and trail map.");
assert(preview("texas-state-aquarium").includes('editorialFocus: ["map"]'), "Aquarium visitor copy must focus on exhibit navigation rather than advertising bathrooms.");
assert(preview("space-center-houston").includes('editorialFocus: ["parking"]'), "Space Center Houston highlights a meaningful arrival decision rather than a generic checklist.");
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

for (const needle of [
  'showSeasonDecision(destination)', 'showAdvancePlanningDecision(destination)',
  'showSeason &&', 'showEntryPlanning &&',
]) assert(route.includes(needle), `Destination template does not suppress irrelevant trip questions: ${needle}`);
for (const needle of ['destination.editorialDisplay?.showSeason', 'destination.editorialDisplay?.showEntryPlanning', 'indoorCollection'])
  assert(relevance.includes(needle), `Visitor topic relevance override not implemented: ${needle}`);
for (const unnecessary of [
  'Those details make it easier to decide whether this stop fits',
  'works best as part of a trip built around the surrounding region',
  'is a Texas destination',
]) assert(!destinationQuality.includes(unnecessary), `Generic auto-generated destination writing must stay removed: ${unnecessary}`);
for (const unnecessary of ['Things to do and see', 'Visitor facilities', 'facilityPattern.test(item)', 'const activities = unique('])
  assert(!visitPlanner.includes(unnecessary), `Shared visit planner must not duplicate destination highlights: ${unnecessary}`);
assert(visitPlanner.includes('destination.category === "road-trips"'), "Car rental promotion needs explicit travel category relevance.");
assert(!viator.includes('viatorMarketsForPlace(destination.county)'), "Do not recommend generic county-market affiliate offers on unrelated attractions.");
assert(viator.includes('viatorMarketsForPlace(destination.name)'), "Relevant attraction-specific affiliate matching must be preserved.");

assert(!categoryPage.includes("How should I use this page?"), "Do not auto-generate navigation-instruction FAQs for every category page.");
assert(!categoryPage.includes("What can I read here?"), "Category story counts belong in the content index, not manufactured FAQ copy.");
assert(categoryPage.includes("LivingAuthorityPaths"), "Preserve useful category authority navigation.");
assert(entityDepth.includes("needsServiceDecisionGuidance ? buildContextItems"), "Generic attraction/entity narrative boilerplate must stay disabled.");
assert(entityDepth.includes("needsServiceDecisionGuidance ? practicalChecklist"), "Generic checklists must not be imposed on place pages.");
assert(entityDepth.includes("needsServiceDecisionGuidance ? quickAnswers"), "Generic FAQs must not be generated for every attraction.");
assert(entityDepth.includes("relatedItems.map"), "Preserve the entity's useful related-place discovery.");

assert(destinationCard.includes("showSeasonDecision(destination)"), "A museum must not acquire generic best-season advice on Explore listing cards.");
assert(articlePage.includes("showSeasonDecision(destination)"), "Related museum attractions in article cards must not display irrelevant seasonal trivia.");

if (failures.length) {
  console.error("Attraction sitewide authority governance failed:\n" + failures.map(x=>"- "+x).join("\n"));
  process.exit(1);
}
console.log("Sitewide attraction governance passed: shared facilities UI, source discipline, searchable Explore, legacy-ready backlog, and separate quality audit.");
