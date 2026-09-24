import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const profileFiles = [
  "src/data/camping/discovery.ts",
  "src/data/camping/profiles-wave2.ts",
  "src/data/camping/profiles-wave3.ts",
  "src/data/camping/profiles-wave4.ts",
  "src/data/camping/profiles-wave5.ts",
  "src/data/camping/profiles-wave6.ts",
  "src/data/camping/profiles-wave7.ts",
  "src/data/camping/profiles-wave8.ts",
];
const sources = profileFiles.map(read);
const all = sources.join("\n");
const component = read("src/components/camping/CampingDiscovery.tsx");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const page = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const registry = read("src/data/camping/destination-guides.ts");

const failures = [];
const count = (regex) => [...all.matchAll(regex)].length;
const profileCount = count(/\n\s*name:\s*"[^"]+"/g);

if (profileCount < 57) failures.push(`expected at least 57 curated profiles, found ${profileCount}`);

const regionMinimums = new Map([
  ["hill-country", 10],
  ["panhandle", 2],
  ["prairies-lakes", 10],
  ["piney-woods", 7],
  ["gulf-coast", 9],
  ["big-bend", 10],
  ["south-texas", 2],
]);
for (const [region, minimum] of regionMinimums) {
  const found = count(new RegExp(`region:\\s*"${region}"`, "g"));
  if (found < minimum) failures.push(`regional coverage regression: ${region} has ${found}, expected >= ${minimum}`);
}

for (const marker of [
  'const USACE = "U.S. Army Corps of Engineers"',
  'const USFS = "U.S. Forest Service"',
  'const LCRA = "Lower Colorado River Authority"',
  'Guadalupe-Blanco River Authority',
  'Lavaca-Navidad River Authority',
  'Sabine River Authority of Texas',
  'National Park Service',
  'Texas Parks and Wildlife Department',
]) {
  if (!all.includes(marker)) failures.push(`managing-agency coverage missing: ${marker}`);
}

for (const metro of ["Houston area", "Austin area", "San Antonio area", "Dallas area", "Fort Worth area"]) {
  if (!component.includes(metro)) failures.push(`major-metro discovery missing: ${metro}`);
}

for (const coastal of ["mustang-island-state-park", "sea-rim-state-park", "galveston-island-state-park", "goose-island-state-park", "padre-island-national-seashore"]) {
  if (!all.includes(`destinationSlug: "${coastal}"`)) failures.push(`coastal coverage missing: ${coastal}`);
}

for (const highDemand of ["garner-state-park", "palo-duro-canyon-state-park", "big-bend-national-park", "guadalupe-mountains-national-park", "enchanted-rock-state-natural-area", "cedar-hill-state-park", "ray-roberts-lake-state-park"]) {
  if (!all.includes(`destinationSlug: "${highDemand}"`)) failures.push(`high-demand public camping coverage missing: ${highDemand}`);
}

if (!component.includes('Not verified in this guide')) failures.push("unknown amenity state must remain distinct from No");
if (!component.includes("Compare up to 3 verified profiles")) failures.push("comparison readability guard missing");
if (!component.includes("compareIds.length >= 3")) failures.push("comparison must remain capped at three profiles");
if (!component.includes("Destination view — verify the exact campsite on the official reservation page.")) failures.push("destination-image disclosure missing");
if (!component.includes("hideFailedImageContainer")) failures.push("failed campground images must collapse instead of leaving empty containers");
if (!page.includes('data-stay-nearby-slot')) failures.push("Stay Nearby affiliate slot missing");
if (!page.includes('aria-label="Places to stay before or after a Texas camping trip"')) failures.push("Stay Nearby placement context missing");
if (!page.includes('overflow-x-auto')) failures.push("mobile long-page navigation must remain horizontally scrollable");

if (!route.includes("hasCampingDestinationGuide(profile.destinationSlug)")) failures.push("structured-data canonical destination guard missing");
if (!route.includes("${pageUrl}#${profileAnchor(profile)}")) failures.push("structured-data stable-anchor fallback missing");
if (!component.includes("hasCampingDestinationGuide(profile.destinationSlug)")) failures.push("visible destination-link canonical guard missing");

for (const forbidden of [
  '"cedar-breaks-park-lake-georgetown"',
  '"russell-park-lake-georgetown"',
  '"ratcliff-lake-recreation-area"',
  '"black-rock-park-lake-buchanan"',
  '"lake-bastrop-north-shore-park"',
  '"coleto-creek-park"',
  '"lakeview-campground-toledo-bend"',
]) {
  if (registry.includes(forbidden)) failures.push(`invented destination registry entry detected: ${forbidden}`);
}

if (/coordinates\s*:/.test(all)) failures.push("partial campground coordinates must not be introduced before verified statewide coverage exists");
if (/priceNote\s*:/.test(all)) failures.push("volatile campground price notes must not be embedded in curated profiles");

if (failures.length) {
  console.error("Camping completion audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Camping completion audit passed: 57+ profiles retain statewide regional, agency, coast, metro and high-demand coverage; unknown amenities remain unknown; comparison stays readable; image/affiliate/mobile guards remain intact; and visible/schema destination URLs remain canonical-or-anchor guarded.");
