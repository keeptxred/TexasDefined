import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const wave6 = read("src/data/camping/profiles-wave6.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const component = read("src/components/camping/CampingDiscovery.tsx");
const destinationGuides = read("src/data/camping/destination-guides.ts");

const failures = [];
const requiredProfiles = [
  ["balmorhea-state-park", "Balmorhea State Park"],
  ["davis-mountains-state-park", "Davis Mountains State Park"],
  ["monahans-sandhills-state-park", "Monahans Sandhills State Park"],
  ["guadalupe-river-state-park", "Guadalupe River State Park"],
  ["lost-maples-state-natural-area", "Lost Maples State Natural Area"],
  ["huntsville-state-park", "Huntsville State Park"],
  ["tyler-state-park", "Tyler State Park"],
  ["choke-canyon-state-park", "Choke Canyon State Park"],
];

for (const [slug, name] of requiredProfiles) {
  if (!wave6.includes(`destinationSlug: "${slug}"`)) failures.push(`missing Wave 6 destination: ${slug}`);
  if (!wave6.includes(`name: "${name}"`)) failures.push(`missing Wave 6 name: ${name}`);
  if (!destinationGuides.includes(`"${slug}"`)) failures.push(`missing Wave 6 canonical destination guide: ${slug}`);
}

const tpwdSourceCount = (wave6.match(/https:\/\/tpwd\.texas\.gov\/state-parks\//g) || []).length;
if (tpwdSourceCount < requiredProfiles.length) failures.push(`expected at least ${requiredProfiles.length} TPWD source URLs, found ${tpwdSourceCount}`);

for (const marker of [
  "whyCampHere: profile.campingNotes?.[0]",
  "planningDetail: profile.campingNotes?.[1]",
  "searchTerms: profile.searchTerms",
]) {
  if (!wave6.includes(marker)) failures.push(`Wave 6 lean projection missing ${marker}`);
}

if (wave6.includes("siteCountNote:") || wave6.includes("priceNote:")) {
  failures.push("Wave 6 must not reintroduce obsolete or volatile site-count/price fields into the current camping data contract.");
}

if (!wave6.includes('const VERIFIED_AT = "2026-09-23";')) failures.push("Wave 6 verification date must reflect the current TPWD re-check.");

if (!route.includes("CAMPING_DISCOVERY_PROFILES_WAVE6")) failures.push("camping guide loader does not include Wave 6");
if (!route.includes('import("@/data/camping/profiles-wave6")')) failures.push("camping guide loader does not dynamically import Wave 6");

for (const slug of requiredProfiles.slice(0, 7).map(([slug]) => slug)) {
  if (!component.includes(`"${slug}": { src: "/images/state-parks/`)) failures.push(`missing governed destination image mapping: ${slug}`);
}
if (component.includes('"choke-canyon-state-park": { src:')) failures.push("Choke Canyon must remain text-only until an exact governed image is approved.");

const allowedAmenities = new Set([
  "electric-hookup", "electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup",
  "full-hookup", "dump-station", "restrooms", "showers", "ada-site", "pets", "shade", "swimming",
  "lake-access", "river-access", "gulf-access", "fishing", "hiking",
]);
for (const match of wave6.matchAll(/amenities:\s*\[([^\]]*)\]/g)) {
  for (const amenityMatch of match[1].matchAll(/"([^"]+)"/g)) {
    if (!allowedAmenities.has(amenityMatch[1])) failures.push(`Wave 6 unknown amenity key: ${amenityMatch[1]}`);
  }
}

for (const intent of [
  "camping near Odessa Midland",
  "RV camping near San Antonio",
  "full hookup camping near Houston",
  "Texas fall color camping",
]) {
  if (!wave6.includes(intent)) failures.push(`Wave 6 search intent missing: ${intent}`);
}

if (failures.length) {
  console.error("Camping public authority Wave 6 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping public authority Wave 6 validated: eight current TPWD-backed destinations, current-model decision/search projection, canonical destination guides, loader coverage and governed imagery policy are intact.");
