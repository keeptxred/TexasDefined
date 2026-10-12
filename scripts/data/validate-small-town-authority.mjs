#!/usr/bin/env node
/** Run: node scripts/data/validate-small-town-authority.mjs */
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const network = read("src/data/town-authority-network.ts");
const catalog = read("src/data/destination-preserved-catalog.ts");
const runtime = read("src/data/destination-query-runtime.ts");
const planner = read("src/components/editorial/DestinationVisitPlanner.tsx");
const authority = read("src/components/editorial/DestinationAuthoritySections.tsx");
const county = read("src/components/content/CountyTownAuthorityLinks.tsx");
const countyPage = read("src/routes/$kind.$slug.lazy.tsx");
const towns = [
  ["fredericksburg", "gillespie", 1], ["wimberley", "hays", 1],
  ["gruene-historic-district", "comal", null], ["boerne", "kendall", 2],
  ["marble-falls", "burnet", 16], ["bandera", "bandera", 2],
  ["port-aransas", "nueces", 16], ["rockport", "aransas", 8],
  ["jefferson", "marion", 1], ["salado", "bell", 3],
  ["granbury", "hood", 2], ["glen-rose", "somervell", 4],
  ["alpine", "brewster", 3], ["marfa", "presidio", 1],
  ["fort-davis", "jeff-davis", 9],
];
const errors = [];
function check(ok, label) { if (!ok) errors.push(label); }
check(towns.length === 15 && new Set(towns.map((x) => x[0])).size === 15, "Exactly 15 distinct town/district pages");
for (const [slug, countySlug, wave] of towns) {
  check(network.includes(JSON.stringify(slug)), slug + ": network registration");
  check(network.includes(JSON.stringify(countySlug)), slug + ": county registration");
  if (wave === null) {
    check(read("src/data/destination-curation-top-attractions-batch5.ts").includes(JSON.stringify(slug)), "Gruene top attraction");
    check(read("src/data/destination-authority-top-attractions.ts").includes(JSON.stringify(slug)), "Gruene sourced authority itinerary");
  } else {
    const filename = wave === 16 ? "src/data/small-town-authority-wave16.ts" : "src/data/small-town-destinations-wave" + wave + ".ts";
    const content = read(filename);
    const index = content.indexOf("slug: " + JSON.stringify(slug));
    check(index !== -1, slug + ": canonical record");
    if (index !== -1) {
      const after = content.indexOf("\n  {", index + 8);
      const section = content.slice(index, after < 0 ? undefined : after);
      for (const required of ["authorityGuide:", "areaGuide:", "sources:", "hero:", "sourceCheckedAt"]) {
        check(section.includes(required), slug + ": " + required);
      }
    }
  }
}
check(catalog.includes("additionalTownAuthorityDestinations,"), "Marble Falls and Port Aransas in catalog");
check(runtime.includes("applyTownAuthority(normalizeDestinationCounty("), "Canonical authority detail resolution");
check(runtime.includes(".map(applyTownAuthority);"), "Canonical authority catalog resolution");
check(authority.includes("guide.itineraries.map"), "Visible itineraries");
check(authority.includes("guide.sources.filter"), "Visible primary sources");
check(authority.includes("area[key]"), "Visible area details");
check(authority.includes("noopener noreferrer"), "Safe outgoing links");
check(planner.includes("<DestinationAuthoritySections destination={destination} />"), "Shared authority UI");
check(planner.includes("townAuthorityContextualLinks(destination)"), "Contextual reciprocal links");
check(countyPage.includes("<CountyTownAuthorityLinks"), "County/city template integration");
check(county.includes("townAuthorityCountyLinks"), "County guides");
check(county.includes("townAuthorityCityLinks"), "City guides");
for (const [filename, slug] of [
  ["burnet-county-burnet-marble-falls-highland-lakes-granite", "marble-falls"],
  ["nueces-county-corpus-christi-bay-islands-coastal-bend", "port-aransas"],
  ["marion-county-jefferson-caddo-lake-riverport-piney-woods-texas", "jefferson"],
]) {
  const content = read("src/data/fixtures/" + filename + ".ts");
  check(content.includes('href: "/destination/' + slug + '"'), filename + ": inbound editorial link");
}
if (errors.length) {
  console.error("15-town authority validation FAILED:");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("15-town authority validation PASSED: records, sources, templates, county and attraction crosslinks.");
}
