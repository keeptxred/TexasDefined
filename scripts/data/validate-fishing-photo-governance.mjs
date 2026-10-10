import fs from "node:fs";

const registry = fs.readFileSync("src/data/fishing/image-library.ts", "utf8");
const governance = fs.readFileSync("src/data/fishing/lake-photo-governance.ts", "utf8");
const photoComponent = fs.readFileSync("src/components/fishing/FishingPhoto.tsx", "utf8");

const requiredOverrideIds = [
  "lake-amistad",
  "lake-meredith",
  "lake-ray-roberts",
  "lake-somerville",
  "lake-caddo",
  "lake-bob-sandlin",
  "lake-corpus-christi",
  "lake-livingston",
  "lake-tawakoni",
  "lake-whitney",
];

for (const id of requiredOverrideIds) {
  if (!governance.includes(`\"${id}\": governed({`)) throw new Error(`Missing governed lake-photo override: ${id}`);
}

for (const required of ["sourceUrl:", "licenseUrl:", "creator:", "credit:", "verifiedAt: \"2026-09-30\"", "actualLocation: true"]) {
  if (!governance.includes(required)) throw new Error(`Governance layer missing required metadata field: ${required}`);
}

if (!photoComponent.includes("applyLakePhotoGovernance(image)")) {
  throw new Error("FishingPhoto does not apply the governed lake-photo layer");
}
if (!photoComponent.includes("governedImage.sourceUrl")) {
  throw new Error("FishingPhoto does not render the governed source page link");
}
if (!photoComponent.includes("governedImage.licenseUrl")) {
  throw new Error("FishingPhoto does not render the governed license link");
}

const knownWrongLegacySubjects = [
  "Cemetery in Lake Bob Sandlin State Park Texas 2023.jpg",
  "Lake Livingston State Park Cabin.jpg",
  "Jade Clubtail - Arigomphus submedianus",
  "Shelters Lake Whitney State Park Texas 2024.jpg",
];
for (const wrong of knownWrongLegacySubjects) {
  if (governance.includes(wrong)) throw new Error(`Wrong-location/subject legacy photo leaked into governed overrides: ${wrong}`);
}

const exactReplacementFiles = [
  "Lake View from Lake Somerville SP Texas 2023.jpg",
  "Caddo Lake- Cypress.jpg",
  "Lake Bob Sandlin.jpg",
  "Lake corpus christi view.jpg",
  "Lake Livingston State Park Dock.jpg",
  "Lake Tawakoni State Park Texas 2023.jpg",
  "Sunset Lake Whitney Texas 2024.jpg",
];
for (const file of exactReplacementFiles) {
  if (!governance.includes(file)) throw new Error(`Exact-lake replacement not governed: ${file}`);
}

const mappingMatch = registry.match(/export const fishingLakeImages:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function getFishingFishImage/);
if (!mappingMatch) throw new Error("Could not locate fishingLakeImages registry");
const lakeMappings = [...mappingMatch[1].matchAll(/^\s{2}\"([^\"]+)\":/gm)].map((m) => m[1]);
if (lakeMappings.length !== 50) throw new Error(`Expected 50 complete-lake photo mappings, found ${lakeMappings.length}`);
if (new Set(lakeMappings).size !== lakeMappings.length) throw new Error("Duplicate lake slugs in fishingLakeImages");

console.log(`Fishing photo governance verified: ${lakeMappings.length}/50 lake mappings; ${requiredOverrideIds.length} legacy local mappings carry traceable governance overrides.`);
