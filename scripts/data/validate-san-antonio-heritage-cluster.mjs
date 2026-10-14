import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const destination = read("src/data/san-antonio-heritage-destinations.ts");
const existing = read("src/data/san-antonio-heritage-enrichment.ts");
const registry = read("src/data/destination-preserved-catalog.ts");
const article = read("src/data/fixtures/historic-san-antonio-heritage-road-trip.ts");
const stubs = read("src/data/fixtures/lazy-standalone-evergreen.ts");
const graph = read("src/data/san-antonio-heritage-links.ts");
const links = read("src/data/destination-editorial-links.ts");
const bexar = read("src/data/fixtures/bexar-county-san-antonio-missions-river.ts");
const kingWilliam = read("src/data/viator-destination-expansion-base.ts");
const cityProfiles = read("src/data/city-authority-profiles.ts");
const sanAntonioCity = cityProfiles.split("'san-antonio': {")[1]?.split("'el-paso': {")[0];
assert(sanAntonioCity, "Missing San Antonio city authority profile");
assert(sanAntonioCity.includes("href: '/article/historic-san-antonio-heritage-road-trip'"), "San Antonio city must link to heritage road trip");
assert(sanAntonioCity.includes("href: '/destination/san-antonio-missions-national-historical-park'"), "City missions itinerary must link to the park guide");

const newSlugs = [
  "mission-concepcion-san-antonio", "mission-san-jose-san-antonio",
  "mission-san-juan-capistrano-san-antonio", "mission-espada-san-antonio",
  "san-fernando-cathedral", "bexar-county-courthouse-historic",
  "guenther-house-san-antonio", "steves-homestead-san-antonio",
  "la-villita-historic-district", "menger-hotel-san-antonio",
];
const upgradedSlugs = [
  "casa-navarro", "spanish-governors-palace-san-antonio",
  "king-william-historic-district", "villa-finale-museum-gardens-san-antonio",
  "the-alamo", "san-antonio-missions-national-historical-park"
];

for (const slug of newSlugs) {
  assert(destination.includes(`"slug": "${slug}"`), `Missing specific destination ${slug}`);
  assert(graph.includes(`"${slug}": [`), `Missing destination graph for ${slug}`);
  assert(article.includes(`"/destination/${slug}"`), `Missing article outgoing link ${slug}`);
}
for (const slug of upgradedSlugs) {
  assert(existing.includes(`"${slug}": {`), `Missing existing-page upgrade ${slug}`);
  assert(graph.includes(`"${slug}": [`), `Missing reciprocal graph for existing ${slug}`);
}
assert(registry.includes("sanAntonioHeritageDestinations,"), "New destinations not merged into canonical collection");
assert(registry.includes(".map(enrichSanAntonioHeritageAuthority)"), "Existing pages not upgraded");
assert(stubs.includes("historicSanAntonioHeritageRoadTripStub,"), "Road-trip guide not indexed in stub registry");
assert(stubs.includes('import("./historic-san-antonio-heritage-road-trip")'), "Guide full content not lazily loaded");
assert(links.includes("...sanAntonioHeritageLinks(slug)"), "Destination visitor planner missing reciprocal links");
assert(bexar.includes("/article/historic-san-antonio-heritage-road-trip"), "Bexar County article missing guide");
assert(bexar.includes("/destination/mission-san-jose-san-antonio"), "Bexar county missing mission links");
assert(!kingWilliam.includes("Villa Finale and the Steves Homestead have their own admission rules and schedules"), "False Steves public tour implication remains");
assert(!graph.includes('"href": "/destination/san-antonio"'), "No 404 destination-city aliases in San Antonio graph");
assert(graph.includes('"href": "/city/san-antonio"'), "City gateway must resolve via canonical /city/san-antonio");
assert(!article.includes('"href": "/destination/san-antonio"'), "Guide city gateway must not use broken /destination/san-antonio");
assert(article.includes('"href": "/city/san-antonio"'), "Guide must link to canonical city page");
const heritageGraphJson = graph.slice(graph.indexOf("= {") + 2, graph.lastIndexOf("};") + 1);
const heritageGraphEntries = JSON.parse(heritageGraphJson);
const heritageDescriptions = Object.values(heritageGraphEntries).flatMap((entries) => entries.map((entry) => entry.description));
assert(heritageDescriptions.length >= 121, "Unexpected drop in San Antonio contextual cross-link coverage");
assert.equal(new Set(heritageDescriptions).size, heritageDescriptions.length, "Cross-links must have source-and-target-specific explanations");
assert(!heritageDescriptions.some((description) => description.includes("adding context from the city's different historical eras")), "Generic history-crosslink filler remains");

assert(destination.includes("sold the property in 2022"), "Steves access correction absent");
assert(article.includes("SOLD") && article.includes("1897") && article.includes("1896"), "Known corrections missing in main guide");
assert(!/license to confirm|verify attribution\/license|check current Commons license/.test(destination), "Unverified media license note in destination images");
assert(!destination.includes("Most useful when combined with"), "Templated visitor-assessment text remains");
assert(!destination.includes("History and architecture interest, subject to heat, active use and accessibility"), "Generic family-visit notes remain");

const objectCount = (destination.match(/"slug": "/g) ?? []).length;
assert.equal(objectCount, newSlugs.length, "Unexpected destination count or duplicates");
assert.equal((destination.match(/Historic-site photo: source, original creator and usage rights/g) ?? []).length, newSlugs.length,
  "Each hero image must link to the original license and creator record");
for (const corrected of ['"lat": 29.41245', '"lng": -98.49499', '"lat": 29.42472', '"lng": -98.48639', '"lat": 29.36015', '"lng": -98.480325']) {
  assert(destination.includes(corrected), `Missing verified heritage map coordinate: ${corrected}`);
}

const sourceCount = (destination.match(/"sourceUrl": /g) ?? []).length;
assert(sourceCount >= 40, "Every site needs multiple site-specific FAQ source URLs");
console.log(`San Antonio heritage cluster verified: ${newSlugs.length} new, ${upgradedSlugs.length} upgraded, 1 guide, district and county reciprocal links.`);
