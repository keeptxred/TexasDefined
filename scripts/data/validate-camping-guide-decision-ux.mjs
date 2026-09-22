import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const component = read("src/components/camping/CampingDiscovery.tsx");
const page = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const profileWave2 = read("src/data/camping/profiles-wave2.ts");
const profileWave3 = read("src/data/camping/profiles-wave3.ts");
const profileWave4 = read("src/data/camping/profiles-wave4.ts");
const profileWave5 = read("src/data/camping/profiles-wave5.ts");
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
  "Cabins & glamping",
  "Fishing",
  "Swimming",
  "Water-focused",
  "Accessible sites",
  "Pet friendly",
]) requireText(component, label, "camping quick-match coverage");

requireText(component, "Destination view — verify the exact campsite on the official reservation page.", "camping image disclosure");
requireText(component, "campingCardImages", "camping destination imagery");
requireText(component, "Why choose this campground", "campground decision context");
requireText(component, "Managed by:", "campground managing-agency context");
requireText(component, "profile.whyCampHere", "campground choice rendering");
requireText(component, "Managing agency", "campground agency filter");
requireText(component, "Sort results", "campground result sorting");
requireText(component, "Most recently verified", "campground verification sort");
requireText(component, "Planning detail", "campground comparison detail");
requireText(component, "profile.planningDetail", "campground planning-detail rendering");
requireText(component, "destinationGuideSlugs", "campground canonical destination-link registry");
requireText(component, "hasDestinationGuide", "campground destination-link guard");
requireText(component, "Build trip", "campground seeded trip-planner link");
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

const allowedAmenities = new Set([
  "electric-hookup", "electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup",
  "full-hookup", "dump-station", "restrooms", "showers", "ada-site", "pets", "shade", "swimming",
  "lake-access", "river-access", "gulf-access", "fishing", "hiking",
]);
for (const [label, source] of [
  ["discovery", read("src/data/camping/discovery.ts")],
  ["wave2", profileWave2],
  ["wave3", profileWave3],
  ["wave4", profileWave4],
  ["wave5", profileWave5],
]) {
  for (const match of source.matchAll(/amenities:\s*\[([^\]]*)\]/g)) {
    for (const amenityMatch of match[1].matchAll(/"([^"]+)"/g)) {
      if (!allowedAmenities.has(amenityMatch[1])) failures.push(`camping ${label}: unknown amenity key ${amenityMatch[1]}`);
    }
  }
}
if (!profileWave4.includes('"pets"') || !profileWave5.includes('"pets"')) {
  failures.push("camping pet filter: normalized pets amenity must remain present in LCRA/GBRA discovery waves.");
}

const destinationGuideRegistry = component.slice(
  component.indexOf("const destinationGuideSlugs"),
  component.indexOf("function profileAnchor"),
);
for (const slug of [
  "cedar-breaks-park-lake-georgetown",
  "russell-park-lake-georgetown",
  "ratcliff-lake-recreation-area",
  "black-rock-park-lake-buchanan",
  "lake-bastrop-north-shore-park",
  "lake-bastrop-south-shore-park",
  "coleto-creek-park",
  "brackenridge-park-campground",
  "texana-park-campground",
  "lakeview-campground-toledo-bend",
  "toledo-bend-tailrace-camping",
]) {
  if (destinationGuideRegistry.includes(`"${slug}"`)) failures.push(`camping destination-link registry must not invent a canonical guide for ${slug}`);
}
for (const slug of ["garner-state-park", "big-bend-national-park", "matagorda-bay-nature-park"]) {
  if (!destinationGuideRegistry.includes(`"${slug}"`)) failures.push(`camping destination-link registry must retain canonical guide ${slug}`);
}

if (failures.length) {
  console.error("Camping guide decision-UX validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping guide decision-UX validation passed: quick-match presets, normalized amenity filtering, agency filtering, result sorting, guarded destination links, seeded trip planning, campground choice context, planning-detail comparison, managing-agency context, destination-view disclosure, governed imagery, explicit lodging placement, affiliate route coverage, live production verification and Big Bend campground hierarchy are protected.");
