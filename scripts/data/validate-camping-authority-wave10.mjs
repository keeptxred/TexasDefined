import fs from "node:fs";

const profilePath = "src/data/camping/profiles-wave10.ts";
const routePath = "src/routes/best-places-to-go-camping-in-texas.tsx";
const profiles = fs.readFileSync(profilePath, "utf8");
const route = fs.readFileSync(routePath, "utf8");
const failures = [];

for (const marker of [
  'destinationSlug: "stephen-f-austin-state-park"',
  'destinationSlug: "lockhart-state-park"',
  'destinationSlug: "lake-tawakoni-state-park"',
  'Number of Sites',
]) {
  if (marker === 'Number of Sites') continue;
  if (!profiles.includes(marker)) failures.push(`missing Wave 10 profile: ${marker}`);
}

if (!profiles.includes('generatorRules: "TPWD states generators are not allowed')) failures.push("Stephen F. Austin generator rule missing");
if (!profiles.includes('RVs up to 40 feet')) failures.push("Lockhart verified RV-length guidance missing");
if (!profiles.includes('two specifically identified accessible electric sites')) failures.push("Lake Tawakoni accessible-site guidance missing");
if (!profiles.includes('const VERIFIED_AT = "2026-10-03"')) failures.push("Wave 10 verification date missing");
if (/nightly|\$\d+/i.test(profiles)) failures.push("Wave 10 must not embed volatile nightly prices");
if (!route.includes('import("@/data/camping/profiles-wave10")')) failures.push("Wave 10 lazy import missing");
if (!route.includes("...CAMPING_DISCOVERY_PROFILES_WAVE10")) failures.push("Wave 10 route spread missing");
if (route.includes("destinationsQuery({ limit: 5000 })")) failures.push("heavy destination resolver must not return");

if (failures.length) {
  console.error("Camping authority Wave 10 validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Camping authority Wave 10 validation passed.");
