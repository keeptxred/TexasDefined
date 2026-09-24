import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const files = [
  "src/data/camping/discovery.ts",
  "src/data/camping/profiles-wave2.ts",
  "src/data/camping/profiles-wave3.ts",
  "src/data/camping/profiles-wave4.ts",
  "src/data/camping/profiles-wave5.ts",
  "src/data/camping/profiles-wave6.ts",
  "src/data/camping/profiles-wave7.ts",
  "src/data/camping/profiles-wave8.ts",
  "src/data/camping/profiles-wave9.ts",
];

const failures = [];
const sources = new Map(files.map((file) => [file, read(file)]));
const wave9 = sources.get("src/data/camping/profiles-wave9.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const component = read("src/components/camping/CampingDiscovery.tsx");
const registrySource = read("src/data/camping/destination-guides.ts");

const records = [];
for (const [file, source] of sources) {
  const constants = Object.fromEntries([...source.matchAll(/const\s+(\w+)\s*=\s*"([^"]+)";/g)].map((m) => [m[1], m[2]]));
  const blocks = source.split(/\n\s*\{\n\s*destinationSlug:/).slice(1);
  for (const block of blocks) {
    const destinationSlug = (block.match(/^\s*"([^"]+)"/) || [])[1];
    const name = (block.match(/\n\s*name:\s*"([^"]+)"/) || [])[1];
    if (!destinationSlug || !name) continue;
    const profileSlug = (block.match(/\n\s*profileSlug:\s*"([^"]+)"/) || [])[1];
    const region = (block.match(/\n\s*region:\s*"([^"]+)"/) || [])[1];
    const agencyExpr = (block.match(/\n\s*managingAgency:\s*([^,\n]+)/) || [])[1]?.trim() || "";
    const agency = agencyExpr.startsWith('"') ? agencyExpr.slice(1, -1) : (constants[agencyExpr] || agencyExpr);
    records.push({ file, destinationSlug, profileSlug, anchor: profileSlug || destinationSlug, name, region, agency });
  }
}

if (records.length !== 63) failures.push("expected 63 verified camping profiles after Wave 9, found " + records.length);

const anchors = new Set();
for (const record of records) {
  if (anchors.has(record.anchor)) failures.push("duplicate camping anchor: " + record.anchor);
  anchors.add(record.anchor);
}
if (anchors.size !== records.length) failures.push("every camping profile must retain a unique stable anchor");

const regions = new Map();
const agencies = new Map();
for (const record of records) {
  regions.set(record.region, (regions.get(record.region) || 0) + 1);
  agencies.set(record.agency, (agencies.get(record.agency) || 0) + 1);
}
for (const region of ["panhandle", "prairies-lakes", "piney-woods", "gulf-coast", "south-texas", "hill-country", "big-bend"]) {
  if (!regions.has(region)) failures.push("missing camping coverage for Texas region: " + region);
}
if ((agencies.get("Texas Parks and Wildlife Department") || 0) < 42) failures.push("TPWD camping authority coverage regressed below 42 profiles");
if ((agencies.get("National Park Service") || 0) < 8) failures.push("NPS camping authority coverage regressed below 8 profiles");
if ((agencies.get("U.S. Army Corps of Engineers") || 0) < 2) failures.push("USACE camping authority coverage regressed below 2 profiles");
if (![...agencies.keys()].some((agency) => agency.includes("U.S. Forest Service"))) failures.push("USFS camping authority coverage is missing");
for (const authority of ["Lower Colorado River Authority", "Guadalupe-Blanco River Authority", "Sabine River Authority", "Lavaca-Navidad River Authority"]) {
  if (![...agencies.keys()].some((agency) => agency.includes(authority))) failures.push(authority + " camping coverage is missing");
}

for (const slug of [
  "possum-kingdom-state-park",
  "atlanta-state-park",
  "daingerfield-state-park",
  "stephen-f-austin-state-park",
  "fort-richardson-state-park",
  "devils-river-state-natural-area",
]) {
  if (!wave9.includes('destinationSlug: "' + slug + '"')) failures.push("Wave 9 missing profile: " + slug);
}

for (const phrase of [
  "camping near Fort Worth",
  "camping near Houston",
  "camping near Katy",
  "camping near Texarkana",
  "Northeast Texas camping",
  "Devils River camping",
]) {
  if (!wave9.includes(phrase)) failures.push("Wave 9 search coverage missing: " + phrase);
}

for (const url of [
  "tpwd.texas.gov/state-parks/possum-kingdom",
  "tpwd.texas.gov/state-parks/atlanta",
  "tpwd.texas.gov/state-parks/daingerfield",
  "tpwd.texas.gov/state-parks/stephen-f-austin",
  "tpwd.texas.gov/state-parks/fort-richardson",
  "tpwd.texas.gov/state-parks/devils-river",
]) {
  if (!wave9.includes(url)) failures.push("Wave 9 authoritative source missing: " + url);
}
if (/\$\d|Nightly|Daily\s+Plus daily/i.test(wave9)) failures.push("Wave 9 must not copy static statewide campsite prices");

if (!route.includes("CAMPING_DISCOVERY_PROFILES_WAVE9")) failures.push("camping route must load Wave 9");
if (!route.includes('import("@/data/camping/profiles-wave9")')) failures.push("camping route must lazy-load Wave 9");
if (!route.includes("hasCampingDestinationGuide(profile.destinationSlug)")) failures.push("Campground JSON-LD must use the canonical destination-guide registry");
if (!route.includes("profileAnchor(profile)")) failures.push("Campground JSON-LD must retain stable anchor fallback");
if (!component.includes("hasCampingDestinationGuide(profile.destinationSlug)")) failures.push("visible camping destination links must use the shared registry");
if (!component.includes("hasDestinationGuide")) failures.push("visible camping destination links must remain guarded");
if (!component.includes('"Not verified in this guide"')) failures.push("comparison must preserve unknown != No semantics");

const registry = new Set([...registrySource.matchAll(/\n\s*"([^"]+)",/g)].map((m) => m[1]));
const destinationSlugs = new Set(records.map((record) => record.destinationSlug));
for (const slug of registry) {
  if (!destinationSlugs.has(slug)) failures.push("destination-guide registry contains no camping profile: " + slug);
}
for (const slug of ["possum-kingdom-state-park", "stephen-f-austin-state-park", "devils-river-state-natural-area"]) {
  if (!registry.has(slug)) failures.push("verified canonical destination guide missing from registry: " + slug);
}
for (const slug of ["atlanta-state-park", "daingerfield-state-park", "fort-richardson-state-park"]) {
  if (registry.has(slug)) failures.push("unverified /destination route must use camping-page anchor instead: " + slug);
}

const allSearch = [...sources.values()].join("\n");
for (const metro of ["Houston", "Austin", "San Antonio", "Dallas", "Fort Worth"]) {
  if (!allSearch.includes(metro)) failures.push("major-metro camping discovery missing: " + metro);
}

if (failures.length) {
  console.error("Camping public authority Wave 9 / final integrity validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Camping final integrity passed: " + records.length + " unique profiles across " + regions.size + " Texas regions; TPWD, NPS, USACE, USFS and river-authority coverage retained; Wave 9 omissions filled; visible links and Campground JSON-LD share guarded destination/anchor logic; unknown comparison values remain explicitly unverified.");
