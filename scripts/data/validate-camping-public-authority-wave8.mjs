import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const wave8 = read("src/data/camping/profiles-wave8.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const component = read("src/components/camping/CampingDiscovery.tsx");
const destinationGuides = read("src/data/camping/destination-guides.ts");

const failures = [];
const requiredProfiles = [
  ["cedar-hill-state-park", "Cedar Hill State Park"],
  ["ray-roberts-lake-state-park", "Ray Roberts Lake State Park — Isle du Bois Unit"],
  ["goose-island-state-park", "Goose Island State Park"],
  ["lake-corpus-christi-state-park", "Lake Corpus Christi State Park"],
  ["palo-pinto-mountains-state-park", "Palo Pinto Mountains State Park"],
  ["padre-island-national-seashore", "Padre Island National Seashore"],
];

for (const [slug, name] of requiredProfiles) {
  if (!wave8.includes(`destinationSlug: "${slug}"`)) failures.push(`missing Wave 8 destination: ${slug}`);
  if (!wave8.includes(`name: "${name}"`)) failures.push(`missing Wave 8 name: ${name}`);
}

if (!wave8.includes('const VERIFIED_AT = "2026-09-24";')) failures.push("Wave 8 verification date must reflect the current official-source re-check.");
if ((wave8.match(/https:\/\/tpwd\.texas\.gov\/state-parks\//g) || []).length < 10) failures.push("Wave 8 must retain current TPWD source coverage.");
if ((wave8.match(/https:\/\/www\.nps\.gov\/pais\//g) || []).length < 3) failures.push("Wave 8 must retain current NPS Padre Island source coverage.");
if (wave8.includes("priceNote:") || /\$\d+/.test(wave8)) failures.push("Wave 8 must not copy volatile campsite prices into the camping data contract.");
if (wave8.includes("coordinates:")) failures.push("Wave 8 must not add partial campground coordinates before statewide geography coverage is ready.");

for (const marker of [
  "whyCampHere: profile.campingNotes?.[0]",
  "planningDetail: profile.campingNotes?.[1]",
  "searchTerms: profile.searchTerms",
]) {
  if (!wave8.includes(marker)) failures.push(`Wave 8 lean projection missing ${marker}`);
}

if (!route.includes("CAMPING_DISCOVERY_PROFILES_WAVE8")) failures.push("camping guide loader does not include Wave 8");
if (!route.includes('import("@/data/camping/profiles-wave8")')) failures.push("camping guide loader does not dynamically import Wave 8");

for (const [slug, imagePath] of [
  ["cedar-hill-state-park", "/images/state-parks/cedar-hill-state-park.jpg"],
  ["goose-island-state-park", "/images/state-parks/goose-island-state-park.jpg"],
  ["lake-corpus-christi-state-park", "/images/state-parks/lake-corpus-christi-state-park.jpg"],
  ["padre-island-national-seashore", "/images/explore/national-parks/padre-island-national-seashore.jpg"],
]) {
  if (!component.includes(`"${slug}": { src: "${imagePath}"`)) failures.push(`missing governed Wave 8 image mapping: ${slug}`);
}

for (const [slug] of requiredProfiles) {
  if (!destinationGuides.includes(`"${slug}"`)) failures.push(`missing Wave 8 canonical destination guide: ${slug}`);
}
if (destinationGuides.includes('"ray-roberts-lake-state-park-isle-du-bois-camping"')) {
  failures.push("Ray Roberts campground anchor must not be registered as an invented destination guide.");
}

const padreStart = wave8.indexOf('destinationSlug: "padre-island-national-seashore"');
const padreBlock = wave8.slice(padreStart, padreStart + 3600);
if (!padreBlock.includes("first come, first served")) failures.push("Padre Island must retain first-come/no-reservations guidance.");
if (!padreBlock.includes('amenities: ["dump-station", "restrooms", "showers", "gulf-access", "fishing"]')) {
  failures.push("Padre Island must not imply campground hookups or unverified statewide amenities.");
}

const gooseStart = wave8.indexOf('destinationSlug: "goose-island-state-park"');
const gooseBlock = wave8.slice(gooseStart, gooseStart + 3600);
if (!gooseBlock.includes("does not recommend swimming")) failures.push("Goose Island must retain the official no-swimming planning distinction.");
if (!gooseBlock.includes("seven premium full-hookup sites are not reservable in advance")) failures.push("Goose Island full-hookup reservation caveat is missing.");

for (const intent of [
  "camping near Dallas",
  "camping near Fort Worth",
  "Rockport camping",
  "camping near Corpus Christi",
  "Palo Pinto Mountains camping",
  "Padre Island National Seashore camping",
]) {
  if (!wave8.includes(intent)) failures.push(`Wave 8 search intent missing: ${intent}`);
}

if (failures.length) {
  console.error("Camping public authority Wave 8 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping public authority Wave 8 validated: six current first-party-backed public camping additions, lean discovery projection, source-dated facts, guarded canonical destination links, governed local imagery where available, first-come/reservation caveats and no volatile price or partial-map data are intact.");
