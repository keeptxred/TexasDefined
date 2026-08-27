import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(here, "evergreen-hero-rights-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const EXPECTED_COUNT = 19;
const ALLOWED_LICENSES = new Set([
  "Public domain",
  "CC0",
  "CC BY 3.0",
  "CC BY 4.0",
  "CC BY-SA 3.0",
  "CC BY-SA 4.0",
]);

const failures = [];
if (!Array.isArray(manifest)) failures.push("manifest must be an array");
if (manifest.length !== EXPECTED_COUNT) failures.push(`expected ${EXPECTED_COUNT} entries; found ${manifest.length}`);

const slugs = new Set();
const heroUrls = new Set();
for (const [index, entry] of manifest.entries()) {
  const label = entry?.slug || `entry ${index + 1}`;
  if (!entry || typeof entry !== "object") {
    failures.push(`${label}: entry must be an object`);
    continue;
  }
  for (const field of ["slug", "heroUrl", "sourcePage", "license", "credit"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) failures.push(`${label}: missing ${field}`);
  }
  if (slugs.has(entry.slug)) failures.push(`${label}: duplicate slug`);
  slugs.add(entry.slug);
  if (heroUrls.has(entry.heroUrl)) failures.push(`${label}: duplicate heroUrl`);
  heroUrls.add(entry.heroUrl);

  if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//.test(entry.heroUrl)) {
    failures.push(`${label}: heroUrl must use the Wikimedia Commons Special:Redirect/file convention`);
  }
  if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(entry.sourcePage)) {
    failures.push(`${label}: sourcePage must be an item-level Wikimedia Commons File page`);
  }
  if (!ALLOWED_LICENSES.has(entry.license)) failures.push(`${label}: unsupported license ${entry.license}`);
  if (/generated editorial image|workers ai|unsplash|pexels/i.test(entry.credit)) {
    failures.push(`${label}: credit is not a rights-vetted archival/editorial attribution`);
  }
  if (!/Wikimedia Commons/i.test(entry.credit)) failures.push(`${label}: credit must name Wikimedia Commons`);
}

if (failures.length) {
  console.error("Evergreen hero rights validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Evergreen hero rights validation passed: ${manifest.length} unique, item-level rights-vetted heroes.`);
