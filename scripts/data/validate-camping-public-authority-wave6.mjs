import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const wave6 = read("src/data/camping/profiles-wave6.ts");
const route = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const component = read("src/components/camping/CampingDiscovery.tsx");
const discovery = read("src/data/camping/discovery.ts");
const types = read("src/data/camping/types.ts");

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
}

const tpwdSourceCount = (wave6.match(/https:\/\/tpwd\.texas\.gov\/state-parks\//g) || []).length;
if (tpwdSourceCount < requiredProfiles.length) failures.push(`expected at least ${requiredProfiles.length} TPWD source URLs, found ${tpwdSourceCount}`);

const inventoryCount = (wave6.match(/siteCountNote:\\s*"/g) || []).length;
const priceCount = (wave6.match(/priceNote:\\s*"/g) || []).length;
if (inventoryCount !== requiredProfiles.length) failures.push(`expected ${requiredProfiles.length} siteCountNote values, found ${inventoryCount}`);
if (priceCount !== requiredProfiles.length) failures.push(`expected ${requiredProfiles.length} priceNote values, found ${priceCount}`);

for (const source of [types, discovery]) {
  if (!source.includes("siteCountNote?: string;")) failures.push("camping type contract missing optional siteCountNote");
  if (!source.includes("priceNote?: string;")) failures.push("camping type contract missing optional priceNote");
}
for (const marker of ["siteCountNote: profile.siteCountNote", "priceNote: profile.priceNote"]) {
  if (!wave6.includes(marker)) failures.push(`Wave 6 browser projection missing ${marker}`);
}

if (!route.includes("CAMPING_DISCOVERY_PROFILES_WAVE6")) failures.push("camping guide loader does not include Wave 6");
if (!route.includes('import("@/data/camping/profiles-wave6")')) failures.push("camping guide loader does not dynamically import Wave 6");
if (!component.includes("Campsite inventory")) failures.push("camping cards do not render campsite inventory notes");
if (!component.includes("Published campsite range")) failures.push("camping cards do not render published campsite price notes");

for (const slug of requiredProfiles.slice(0, 7).map(([slug]) => slug)) {
  if (!component.includes(`"${slug}": { src: "/images/state-parks/`)) failures.push(`missing governed destination image mapping: ${slug}`);
}
if (component.includes('"choke-canyon-state-park": { src:')) failures.push("Choke Canyon must remain text-only until an exact governed image exists.");

if (failures.length) {
  console.error("Camping public authority Wave 6 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping public authority Wave 6 validated: eight TPWD-backed destinations, inventory/rate notes, browser projection, loader coverage and governed imagery policy are intact.");
