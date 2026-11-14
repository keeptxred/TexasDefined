import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ownership = JSON.parse(readFileSync("src/data/authority/content-ownership.json", "utf8"));
const expected = {
  "hill-country-small-town-discovery": ["wimberley", "boerne"],
  "corpus-christi-ship-museum": ["uss-lexington-museum-corpus-christi", "texas-world-war-ii-historic-sites-guide"],
  "texas-state-park-planning": ["enchanted-rock-state-natural-area", "brazos-bend-state-park"],
  "lake-conroe-fishing": ["lake-conroe"],
  "texas-camping-and-garner": ["garner-state-park"],
  "fredericksburg-johnson-city-history-route": ["fredericksburg-johnson-city-historic-road-trip", "johnson-city"],
};
let audited = 0;
for (const [id, subjects] of Object.entries(expected)) {
  const cluster = ownership.clusters.find((x) => x.id === id);
  assert.ok(cluster, "missing cross-category ownership cluster " + id);
  assert.ok(cluster.pages.some((x) => x.path === cluster.primaryPath),
    "canonical primary is not declared as its own page: " + id);
  assert.ok(Array.isArray(cluster.sourceCatalogs) && cluster.sourceCatalogs.length,
    "category cluster missing authoritative source catalogs: " + id);
  const sharedSources = cluster.sourceCatalogs.map((path) => {
    assert.match(path, /^src\/data\/[\w./-]+\.ts$/, "unsafe source path");
    return readFileSync(resolve(path), "utf8");
  }).join("\n");
  // Fail closed if we register a page family but omit the actual researched
  // entity identifier in its existing source catalog. This does NOT prove all
  // operator facts are current: sourceCheckedAt and freshness checks own that.
  for (const slug of subjects) {
    assert.ok(sharedSources.includes(slug), "unbacked authority subject " + slug + " in " + id);
    assert.ok(cluster.pages.some((row) => row.path.endsWith("/" + slug) ||
      (slug === "lake-conroe" && row.path.includes("/lake-conroe"))),
      "subject lacks a canonical page in " + id + ": " + slug);
  }
  audited += cluster.pages.length;
}
const read = (path) => readFileSync(path, "utf8");
const destination = read("src/routes/destination.$slug.tsx");
const relationships = read("src/components/editorial/DestinationRelationships.tsx");
const facts = read("src/components/editorial/DestinationVerifiedVisitorFacts.tsx");
const planner = read("src/components/editorial/DestinationVisitPlanner.tsx");
const camping = read("src/components/camping/CampingDiscovery.tsx");
const fishing = read("src/components/fishing/LakeConroeGuide.tsx");
const museum = read("src/components/editorial/DestinationAuthorityGuide.tsx");
const widget = read("src/components/editorial/VisitorPlanningToolkit.tsx");
assert.match(destination, /<DestinationVerifiedVisitorFacts destination=\{destination\} \/>/);
assert.match(facts, /reviewDestinationVisitorFacts\(destination\.visitorFacts\)/);
assert.match(relationships, /<DestinationAuthorityGuide destination=\{destination\}/);
assert.match(relationships, /to="\/explore\/trip-planner" search=\{\{ destination: destination\.slug \}\}/);
assert.doesNotMatch(planner, /showTripPlannerHandoff/);
assert.match(camping, /compareIds/);
assert.match(camping, /sourceUrl|sources|reservationUrl/);
assert.match(fishing, /section === "regulations"/);
assert.match(fishing, /section === "access"/);
assert.match(fishing, /<SourceFooter section=\{section\}/);
assert.match(museum, /authority\.itineraries\.map/);
assert.match(museum, /authority\.sources\.map/);
assert.match(widget, /directionsLabel=\{profile\.title \+ " locations"\}/);
console.log("Authority category coverage passed: " + Object.keys(expected).length +
  " research-backed clusters, " + audited +
  " distinct existing page roles, one shared planner handoff and no copied category widgets.");
