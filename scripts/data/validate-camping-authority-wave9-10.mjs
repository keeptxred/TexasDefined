import fs from "node:fs";

const wave9 = fs.readFileSync("src/data/camping/profiles-wave9.ts", "utf8");
const wave10 = fs.readFileSync("src/data/camping/profiles-wave10.ts", "utf8");
const route = fs.readFileSync("src/routes/best-places-to-go-camping-in-texas.tsx", "utf8");
const failures = [];

const requiredSlugs = [
  "abilene-state-park", "blanco-state-park", "bonham-state-park", "buescher-state-park",
  "cleburne-state-park", "cooper-lake-state-park", "copper-breaks-state-park",
  "stephen-f-austin-state-park", "lockhart-state-park", "lake-tawakoni-state-park",
];
for (const slug of requiredSlugs) {
  if (!(wave9 + wave10).includes(`destinationSlug: "${slug}"`)) failures.push(`missing profile ${slug}`);
}
for (const moduleName of ["profiles-wave9", "profiles-wave10"]) {
  if (!route.includes(`import("@/data/camping/${moduleName}")`)) failures.push(`missing lazy import ${moduleName}`);
}
for (const spread of ["CAMPING_DISCOVERY_PROFILES_WAVE9", "CAMPING_DISCOVERY_PROFILES_WAVE10"]) {
  if (!route.includes(`...${spread}`)) failures.push(`missing route spread ${spread}`);
}
if (/nightly|\$\d+/i.test(wave9 + wave10)) failures.push("volatile nightly prices must not be embedded");
if (route.includes("destinationsQuery({ limit: 5000 })")) failures.push("heavy destination resolver must remain absent");
if (!wave10.includes("RVs up to 40 feet")) failures.push("verified Lockhart RV-length note missing");
if (!wave10.includes("generators are not allowed")) failures.push("verified Stephen F. Austin generator rule missing");
if (!wave10.includes("accessible electric sites")) failures.push("verified Lake Tawakoni accessibility note missing");

if (failures.length) {
  console.error("Camping Waves 9-10 validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Camping Waves 9-10 validation passed: ten additional TPWD profiles, lazy-loader wiring, price freshness, and lean SSR safeguards are intact.");
