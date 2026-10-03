import fs from "node:fs";

const assets = [
  "public/images/fishing/tackle/soft-plastics-setup.svg",
  "public/images/fishing/tackle/crankbaits-setup.svg",
  "public/images/fishing/tackle/spinnerbaits-setup.svg",
  "public/images/fishing/tackle/topwater-setup.svg",
  "public/images/fishing/tackle/trolling-setup.svg",
  "public/images/fishing/tackle/vertical-jigging-setup.svg",
  "public/images/fishing/tackle/jigs-and-minnows-setup.svg",
  "public/images/fishing/tackle/live-bait-setup.svg",
  "public/images/fishing/tackle/cut-bait-setup.svg",
];
const registryPath = "src/data/fishing/technique-tackle-visuals.ts";
const uiPath = "src/components/fishing/FishingTechniqueProfile.tsx";
const failures = [];

for (const asset of assets) {
  if (!fs.existsSync(asset)) failures.push(`Missing fishing technique tackle visual: ${asset}`);
}
for (const file of [registryPath, uiPath]) {
  if (!fs.existsSync(file)) failures.push(`Missing fishing tackle visual contract file: ${file}`);
}

if (!failures.length) {
  const registry = fs.readFileSync(registryPath, "utf8");
  const ui = fs.readFileSync(uiPath, "utf8");
  for (const asset of assets) {
    const publicPath = asset.replace("public", "");
    if (!registry.includes(publicPath)) failures.push(`Tackle visual registry missing asset: ${publicPath}`);
  }
  for (const slug of ["soft-plastics", "crankbaits", "spinnerbaits", "topwater", "trolling", "vertical-jigging", "jigs-and-minnows", "live-bait", "cut-bait"]) {
    if (!registry.includes(`\"${slug}\"`)) failures.push(`Tackle visual registry missing technique: ${slug}`);
  }
  for (const token of [
    "fishingTechniqueTackleVisuals",
    "const tackleVisual = fishingTechniqueTackleVisuals[technique.slug]",
    "src={tackleVisual.src}",
    "alt={tackleVisual.alt}",
    "tackleVisual.caption",
    "Basic Tackle and Rigging Setup",
  ]) {
    if (!ui.includes(token)) failures.push(`Technique tackle visual UI contract missing: ${token}`);
  }
}

if (failures.length) {
  console.error("Fishing technique tackle visual validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Fishing technique tackle visual validation passed: all nine technique setup schematics, registry entries, alt text and shared rendering contract are protected.");
