import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const component = read("src/components/camping/CampingDiscovery.tsx");
const page = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const profileWave3 = read("src/data/camping/profiles-wave3.ts");
const expedia = read("public/expedia-travel.js");
const production = read("scripts/ci/verify-production-surfaces.mjs");

const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

for (const label of [
  "Full-hookup RV",
  "Beach camping",
  "Primitive camping",
  "Fishing",
  "Swimming",
  "Water-focused",
  "Accessible sites",
]) requireText(component, label, "camping quick-match coverage");

requireText(component, "Destination view — verify the exact campsite on the official reservation page.", "camping image disclosure");
requireText(component, "campingCardImages", "camping destination imagery");
requireText(component, "Why choose this campground", "campground decision context");
requireText(component, "Managed by:", "campground managing-agency context");
requireText(component, "profile.whyCampHere", "campground choice rendering");
requireText(page, "data-stay-nearby-slot", "camping Stay Nearby placement");
requireText(expedia, "best-places-to-go-camping-in-texas", "camping affiliate route coverage");
requireText(production, "['camping-guide', '/best-places-to-go-camping-in-texas', 'Best Places to Go Camping in Texas']", "camping live-production verification");

const imageCount = (component.match(/"[^"]+": \{ src: "\/images\//g) || []).length;
if (imageCount < 15) failures.push(`camping destination imagery: expected at least 15 governed local image mappings, found ${imageCount}`);

const rioGrandeBlock = profileWave3.slice(
  Math.max(0, profileWave3.indexOf('name: "Rio Grande Village RV Campground"') - 240),
  profileWave3.indexOf('name: "Rio Grande Village RV Campground"') + 900,
);
if (!rioGrandeBlock.includes('destinationSlug: "big-bend-national-park"')) {
  failures.push("Big Bend full-hookup campground must roll up to the canonical Big Bend destination.");
}
if (!rioGrandeBlock.includes('profileSlug: "big-bend-national-park-rio-grande-village-rv-park"')) {
  failures.push("Big Bend full-hookup campground must keep a distinct campground profile anchor.");
}

if (failures.length) {
  console.error("Camping guide decision-UX validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping guide decision-UX validation passed: quick-match presets, campground choice context, managing-agency context, destination-view disclosure, governed imagery, explicit lodging placement, affiliate route coverage, live production verification and Big Bend campground hierarchy are protected.");
