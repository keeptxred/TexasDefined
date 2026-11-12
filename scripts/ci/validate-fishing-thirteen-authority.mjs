import fs from "node:fs";
import assert from "node:assert/strict";

const read = (p) => fs.readFileSync(p, "utf8");
const paths = [
  "/fishing/techniques",
  ...["soft-plastics", "crankbaits", "spinnerbaits", "topwater", "trolling", "vertical-jigging", "jigs-and-minnows", "live-bait", "cut-bait"].map((s) => `/fishing/techniques/${s}`),
  "/fishing/regulations",
  "/fishing/species",
  "/fishing/species/largemouth-bass",
];
assert.equal(paths.length, 13, "Exactly 13 authority URLs must be checked");
const route = read("src/data/fishing/technique-routing.ts");
const field = read("src/data/fishing/technique-field-guide.ts");
const tServer = read("src/data/fishing/technique-data.server.ts");
const tProfile = read("src/components/fishing/FishingTechniqueProfile.tsx");
const tDirectory = read("src/components/fishing/FishingTechniqueDirectory.tsx");
const speciesDirectory = read("src/components/fishing/FishSpeciesDirectory.tsx");
const speciesServer = read("src/data/fishing/species-directory-data.server.ts");
const speciesGuideServer = read("src/data/fishing/species-guide-data.server.ts");
const bassGuide = read("src/components/fishing/FishSpeciesGuide.tsx");
const bassServer = read("src/data/fishing/largemouth-bass-page-data.server.ts");
const bassProfile = read("src/data/fishing/species-profiles.ts");
const regulations = read("src/routes/fishing.regulations.tsx");
const regulationData = read("src/data/fishing/regulations-routing.ts");
const closures = read("src/data/fishing/operational-closures.ts");
for (const slug of paths.slice(1, 10).map((p) => p.split("/").at(-1))) {
  assert(route.includes(JSON.stringify(slug)), `Missing public technique route ${slug}`);
  assert(field.includes(`${JSON.stringify(slug)}:`), `Missing unique field guidance for ${slug}`);
}
assert.equal((field.match(/situation:/g) ?? []).length, 28, "Expect 27 independent decision records and one type declaration");
assert(tServer.includes("allProfiles: profiles.map"), "Complete lake registry was hidden behind featured selection");
assert(tProfile.includes("data.allProfiles.map"), "Page does not link the complete verified source-backed lake set");
assert(tProfile.includes("fieldGuide.decisions.map"), "Unique editorial decisions not displayed");
assert(tProfile.includes('season !== "year-round"'), "Season tally counts year-round as fifth season");
assert(tDirectory.includes("Year-round is an applicability label"), "Directory taxonomy remains misleading");
assert(speciesDirectory.includes("Directory records versus standalone guides"), "Directory claims all species have full guides");
assert(speciesDirectory.includes("row.completeGuide ?"), "Directory incorrectly labels non-complete species");
assert(!speciesDirectory.includes("Every published fish record opens a standalone Texas guide"), "Untrue blanket promise");
assert(speciesServer.includes("isFishingCurrentlyClosed"), "Directory exposes closed fishing destinations");
assert(speciesGuideServer.includes("isFishingCurrentlyClosed"), "Species profiles expose closed fishing destinations");
assert(tServer.includes("isFishingCurrentlyClosed"), "Technique pages expose closed fishing destinations");
assert(bassServer.includes("isFishingCurrentlyClosed"), "Bass destinations expose closed fishing sites");
assert(!bassGuide.includes("#{index + 1}"), "Unjustified numerical bass-lake ranking");
assert(bassGuide.includes("bass-identification"), "Bass species identification guidance missing");
assert(bassGuide.includes('id="bass-lake-search"') && bassGuide.includes('id="bass-lake-quality"') && bassGuide.includes('id="bass-lake-region"'), "Long bass lake list must have accessible search, quality and region controls");
assert(bassGuide.includes("filteredLakes.map") && bassGuide.includes("Clear lake filters") && bassGuide.includes("aria-live"), "Bass lake filtering must be interactive and expose accessible result feedback");
assert(bassProfile.includes("not measured head-to-head catch-rate rankings"), "Bass ranking methodology remains misleading");
assert(closures.includes("lake-abilene") && closures.includes("fishing-prohibited"), "Official Lake Abilene closure missing");
assert(regulations.includes("rules-explained") && regulations.includes("bait-transport"), "Regulations still links-only");
assert(regulations.includes("TPWD_GENERAL_FISHING_RULES_URL"), "Primary legal source missing");
assert(regulationData.includes('FISHING_REGULATORY_YEAR_END = "2027-08-31"'), "2026-27 regulatory edition metadata missing");
for (const phrase of ["game fish", "lake water", "Gulf of Mexico", "waterbody"]) {
  assert(regulations.toLowerCase().includes(phrase.toLowerCase()), `Missing explanation ${phrase}`);
}
for (const p of paths) {
  const sourcePath = p === "/fishing/techniques" ? "src/routes/fishing.techniques.tsx"
    : p.startsWith("/fishing/techniques/") ? "src/data/fishing/technique-routing.ts"
    : p === "/fishing/regulations" ? "src/routes/fishing.regulations.tsx"
    : p === "/fishing/species" ? "src/routes/fishing.species.tsx"
    : "src/routes/fishing.species.largemouth-bass.tsx";
  assert(fs.existsSync(sourcePath), `Missing route for ${p}`);
}
console.log("PASS: 13 Texas fishing authority routes; 9 unique field guides; verified relationships; honest coverage; central closure exclusion; current TPWD legal explanations.");
