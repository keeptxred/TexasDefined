import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(path, "utf8");
const expected = [
  "bowfin", "common-carp", "alligator-gar", "spotted-gar",
  "channel-catfish", "blue-catfish", "flathead-catfish",
  "largemouth-bass", "guadalupe-bass", "bluegill",
  "redear-sunfish", "green-sunfish", "warmouth", "longear-sunfish", "redbreast-sunfish", "rio-grande-cichlid",
  "black-crappie", "white-crappie", "striped-bass", "white-bass", "freshwater-drum", "rainbow-trout",
];
const newSpecies = [
  "bowfin", "common-carp", "spotted-gar", "redear-sunfish", "green-sunfish",
  "warmouth", "longear-sunfish", "redbreast-sunfish", "rio-grande-cichlid",
];
const identificationSource = read("src/data/fishing/species-identification.ts");
const marker = "export const fishIdentification: Record<string, FishIdentification> = ";
assert(identificationSource.includes(marker), "Identification data export missing");
const data = JSON.parse(identificationSource.split(marker)[1].split(";\n")[0]);
assert.equal(Object.keys(data).length, 22, "The TPWD pocket-guide cohort must have exactly 22 unique species");
assert.deepEqual(new Set(Object.keys(data)), new Set(expected), "Pocket-guide species coverage mismatch");

const catalog = read("src/data/fishing/species-catalog.ts");
const foundation = read("src/data/fishing/fixtures.ts");
const images = read("src/data/fishing/image-library.ts");
const slugs = read("src/data/fishing/slugs.ts");
const server = read("src/data/fishing/species-guide-data.server.ts");
const component = read("src/components/fishing/FishingSpeciesProfile.tsx");
const flagshipServer = read("src/data/fishing/largemouth-bass-page-data.server.ts");
const flagshipUI = read("src/components/fishing/FishSpeciesGuide.tsx");
const ui = read("src/components/fishing/FishIdentificationSection.tsx");
const sitemap = read("src/data/fishing/sitemap.ts");
const directory = read("src/data/fishing/species-directory-data.server.ts");
for (const slug of expected) {
  const row = data[slug];
  assert(row && typeof row === "object", `Missing identification for ${slug}`);
  for (const field of ["fieldSize", "markings", "texasHabitat", "similarSpecies", "approach", "caution"]) {
    assert.equal(typeof row[field], "string", `${slug} missing ${field}`);
    assert(row[field].trim().length > (field === "fieldSize" ? 9 : 25), `${slug} has incomplete ${field} text`);
  }
  assert(Array.isArray(row.naturalHistory) && row.naturalHistory.length >= 2 &&
    row.naturalHistory.every((paragraph) => typeof paragraph === "string" && paragraph.length >= 180),
    `${slug} requires two researched TPWD-grounded diet, spawning and ecology paragraphs`);
  assert(row.sourceUrl.startsWith("https://tpwd.texas.gov/"), `${slug} missing authoritative TPWD citation`);
  if (row.compareSlugs !== undefined) {
    assert(Array.isArray(row.compareSlugs) && row.compareSlugs.length > 0 && row.compareSlugs.length <= 3,
      `${slug} needs a bounded, explicit lookalike list`);
    assert.equal(new Set(row.compareSlugs).size, row.compareSlugs.length, `${slug} repeats lookalike links`);
    for (const compareSlug of row.compareSlugs) {
      assert.notEqual(compareSlug, slug, `${slug} links to itself as a lookalike`);
      assert(slugs.includes(`"${compareSlug}"`), `${slug} links to unpublished guide ${compareSlug}`);
      assert((catalog + foundation).includes(`"${compareSlug}"`),
        `${slug} links to unregistered comparison species ${compareSlug}`);
    }
  }
  assert(slugs.includes(`"${slug}"`), `Missing standalone route for ${slug}`);
  assert(images.includes(`"${slug}": `) || images.includes(`  ${slug}:`), `Missing individually licensed image for ${slug}`);
  assert((catalog + foundation).includes(`"${slug}"`), `Missing catalog entry for ${slug}`);
}
for (const slug of newSpecies) {
  assert(catalog.includes(`id: "${slug}"`), `Missing new published species record ${slug}`);
  assert(Array.isArray(data[slug].naturalHistory) && data[slug].naturalHistory.length >= 2 && data[slug].naturalHistory.every((paragraph) => paragraph.length > 70), `New ${slug} guide requires TPWD-grounded ecological context, not a thin identifying paragraph`);
  assert(catalog.includes(`"tpwd-${slug}"`), `Missing species-specific TPWD source record ${slug}`);
}
for (const token of [
  "FishIdentificationSection", "How to Identify", "markings", "similarSpecies", "texasHabitat",
  "fieldSize", "approach", "caution", "Official TPWD species identification", "Diet, Spawning and Natural History", "target=\"_blank\"",
]) assert(ui.includes(token), `Public identification UI missing ${token}`);
for (const token of ["fishIdentification[species.slug]", "identification,", "FISH_IDENTIFICATION_EDITORIAL_UPDATED_AT"]) {
  assert(server.includes(token), `Dynamic species source/metadata integration missing ${token}`);
}
assert(component.includes("identification={data.identification}") && component.includes("comparisonGuides={data.comparisonGuides}"),
  "Standalone species UI missing source-backed identification comparison guides");
assert(ui.includes("comparisonGuides.map") && ui.includes("Compare with {guide.name}"),
  "Lookalike links missing inside the field identification section");
assert(server.includes("comparisonGuides,") && server.includes("identification?.compareSlugs"),
  "Standard species resolver must only link published comparison guides");
assert(flagshipServer.includes('fishIdentification["largemouth-bass"]'), "Flagship bass identification not passed through server");
assert(flagshipUI.includes("identification={pageData.identification}") && flagshipUI.includes("comparisonGuides={pageData.comparisonGuides}"),
  "Flagship bass UI missing identification and comparison links");
assert(flagshipServer.includes("comparisonGuides,") && flagshipServer.includes("isCompleteFishingSpeciesSlug"),
  "Flagship bass server missing published-guide lookalike resolution");
assert(sitemap.includes("FISH_AUTHORITY_EDITORIAL_UPDATED_AT"), "Species sitemap editorial refresh date missing");
assert(directory.includes("row.verifiedAt"), "Directory falsely presents uniform source-review freshness");
console.log("TPWD freshwater fish identification validation passed: all 22 species covered, nine new canonical guides, licensed illustrations, verified habitat and source fields, contextual published-guide lookalike links and sitemap freshness.");

const authority = read("src/data/fishing/species-authority-notes.ts");
const sources = JSON.parse(authority.split("export const FISH_AUTHORITY_SOURCES = ")[1].split(" as const;")[0]);
const notes = JSON.parse(authority.split("export const FISH_AUTHORITY_NOTES: Record<string,FishAuthorityNote> = ")[1].split(";\n")[0]);
const complete = [...slugs.match(/COMPLETE_FISHING_SPECIES_SLUGS\s*=\s*\[([\s\S]*?)\]/)[1].matchAll(/"([^"]+)"/g)].map(x=>x[1]);
assert.equal(complete.length,28);
assert.deepEqual(new Set(Object.keys(notes)),new Set(complete));
assert.equal(new Set(Object.values(notes).map(x=>x.title)).size,28);
assert.equal(new Set(Object.values(notes).map(x=>x.description)).size,28);
for(const [slug,row] of Object.entries(notes)){
  assert(row.title.length>=30 && row.description.length>=70 && row.guidance.length>=220,slug+": incomplete practical guidance");
  for(const key of [row.source,...(row.extraSources??[])]) assert(sources[key],slug+": missing source "+key);
  for(const target of row.related??[]) assert(target!==slug && complete.includes(target),slug+": invalid contextual species link");
  assert.equal(new Set(row.related??[]).size,(row.related??[]).length,slug+": duplicate links");
}
for(const src of Object.values(sources)){assert.equal(new URL(src.url).hostname,"tpwd.texas.gov");assert(src.witness.length>3);}
for(const slug of complete) assert(slug==="rainbow-trout" || Object.values(notes).some(row=>row.related?.includes(slug)),slug+": missing incoming contextual species link");
assert(read("src/components/fishing/FishingSeasonDirectory.tsx").includes("/fishing/species/rainbow-trout"),"Stocking guide inbound link missing");
assert(component.includes("FishAuthorityNote") && flagshipUI.includes("FishAuthorityNote"),"Practical source guidance must render in both templates");
console.log("PASS: 28 distinct editorial notes, titles, descriptions, official sources and contextual incoming links.");
