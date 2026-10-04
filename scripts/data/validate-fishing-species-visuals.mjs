import fs from "node:fs";

const assets = [
  "public/images/fishing/species/largemouth-bass-tackle-setup.svg",
  "public/images/fishing/species/largemouth-bass-baits-lures.svg",
];
const uiPath = "src/components/fishing/FishSpeciesGuide.tsx";
const failures = [];

for (const asset of assets) {
  if (!fs.existsSync(asset)) failures.push(`Missing largemouth instructional visual: ${asset}`);
}
if (!fs.existsSync(uiPath)) failures.push(`Missing largemouth guide UI: ${uiPath}`);

if (!failures.length) {
  const ui = fs.readFileSync(uiPath, "utf8");
  for (const token of [
    "/images/fishing/species/largemouth-bass-tackle-setup.svg",
    "/images/fishing/species/largemouth-bass-baits-lures.svg",
    "Largemouth bass tackle setups for general-purpose fishing, heavy cover, and clear or pressured water",
    "Soft plastic, crankbait, spinnerbait and topwater lure silhouettes for largemouth bass fishing",
    "Three tackle situations, not three mandatory prescriptions.",
    "Four broad presentation families represented in this guide.",
  ]) {
    if (!ui.includes(token)) failures.push(`Largemouth instructional visual contract missing: ${token}`);
  }
  const imageCount = (ui.match(/<img src="\/images\/fishing\/species\/largemouth-bass-/g) ?? []).length;
  if (imageCount < 2) failures.push("Largemouth tackle and lure guidance must render both instructional images.");
}

if (failures.length) {
  console.error("Fishing species visual validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Fishing species visual validation passed: largemouth tackle and lure guidance retain dedicated instructional images, descriptive alt text and editorial caveats.");
