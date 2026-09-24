import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const wave7 = read("src/data/camping/profiles-wave7.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const component = read("src/components/camping/CampingDiscovery.tsx");
const destinationGuides = read("src/data/camping/destination-guides.ts");

const failures = [];
const requiredProfiles = [
  ["galveston-island-state-park", "Galveston Island State Park"],
  ["lake-livingston-state-park", "Lake Livingston State Park"],
  ["martin-dies-jr-state-park", "Martin Dies, Jr. State Park"],
  ["bastrop-state-park", "Bastrop State Park"],
  ["eisenhower-state-park", "Eisenhower State Park"],
  ["lake-mineral-wells-state-park", "Lake Mineral Wells State Park & Trailway"],
  ["south-llano-river-state-park", "South Llano River State Park"],
  ["seminole-canyon-state-park-and-historic-site", "Seminole Canyon State Park & Historic Site"],
];

for (const [slug, name] of requiredProfiles) {
  if (!wave7.includes(`destinationSlug: "${slug}"`)) failures.push(`missing Wave 7 destination: ${slug}`);
  if (!wave7.includes(`name: "${name}"`)) failures.push(`missing Wave 7 name: ${name}`);
}

const tpwdSourceCount = (wave7.match(/https:\/\/tpwd\.texas\.gov\/state-parks\//g) || []).length;
if (tpwdSourceCount < requiredProfiles.length) failures.push(`expected at least ${requiredProfiles.length} TPWD source URLs, found ${tpwdSourceCount}`);

for (const marker of [
  "whyCampHere: profile.campingNotes?.[0]",
  "planningDetail: profile.campingNotes?.[1]",
  "searchTerms: profile.searchTerms",
]) {
  if (!wave7.includes(marker)) failures.push(`Wave 7 lean projection missing ${marker}`);
}

if (wave7.includes("priceNote:")) failures.push("Wave 7 must not copy volatile campsite prices into the camping data contract.");
if (!wave7.includes('const VERIFIED_AT = "2026-09-23";')) failures.push("Wave 7 verification date must reflect the current TPWD re-check.");

if (!route.includes("CAMPING_DISCOVERY_PROFILES_WAVE7")) failures.push("camping guide loader does not include Wave 7");
if (!route.includes('import("@/data/camping/profiles-wave7")')) failures.push("camping guide loader does not dynamically import Wave 7");

for (const slug of requiredProfiles.slice(0, 7).map(([slug]) => slug)) {
  if (!component.includes(`"${slug}": { src: "/images/state-parks/`)) failures.push(`missing governed destination image mapping: ${slug}`);
}
if (!component.includes('"seminole-canyon-state-park-and-historic-site": { src: "/images/explore/historic-sites/seminole-canyon-state-park.jpg"')) {
  failures.push("missing governed Seminole Canyon historic-site image mapping");
}

for (const [slug] of requiredProfiles) {
  if (!destinationGuides.includes(`"${slug}"`)) failures.push(`missing Wave 7 canonical destination guide: ${slug}`);
}

const allowedAmenities = new Set([
  "electric-hookup", "electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup",
  "full-hookup", "dump-station", "restrooms", "showers", "ada-site", "pets", "shade", "swimming",
  "lake-access", "river-access", "gulf-access", "fishing", "hiking",
]);
for (const match of wave7.matchAll(/amenities:\s*\[([^\]]*)\]/g)) {
  for (const amenityMatch of match[1].matchAll(/"([^"]+)"/g)) {
    if (!allowedAmenities.has(amenityMatch[1])) failures.push(`Wave 7 unknown amenity key: ${amenityMatch[1]}`);
  }
}

for (const intent of [
  "camping near Houston",
  "full hookup camping East Texas",
  "full hookup camping near Austin",
  "RV camping near Dallas",
  "camping near Fort Worth",
  "camping near Amistad",
]) {
  if (!wave7.includes(intent)) failures.push(`Wave 7 search intent missing: ${intent}`);
}

if (failures.length) {
  console.error("Camping public authority Wave 7 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping public authority Wave 7 validated: eight current TPWD-backed destinations, current-model decision/search projection, guarded canonical links, loader coverage, governed imagery and no volatile price copy are intact.");
