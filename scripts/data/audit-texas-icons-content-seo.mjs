import fs from "node:fs";
import path from "node:path";

const dataDir = "src/data";
const routePath = "src/routes/texas-icons_.$slug.tsx";
const typesPath = "src/data/texas-icons-types.ts";
const failures = [];
const warnings = [];
const researchFiles = fs.readdirSync(dataDir)
  .filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))
  .sort();

const words = (value) => (value.match(/[A-Za-z0-9À-ÿ][A-Za-z0-9À-ÿ’'&.-]*/g) ?? []).length;
const strings = (value) => [...value.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((match) => match[1]);
const section = (block, field, nextField) => {
  const pattern = new RegExp(`${field}:\\s*\\[(.*?)\\]\\s*,\\n\\s{4}${nextField}:`, "s");
  return block.match(pattern)?.[1] ?? "";
};

let profileCount = 0;
let totalOverviewWords = 0;
let totalLegacyWords = 0;
let linkedPlaceCount = 0;
let placeCount = 0;
const categoryFiles = new Map();

for (const file of researchFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  const matches = [...source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)];
  for (let index = 0; index < matches.length; index += 1) {
    const slug = matches[index][1];
    const start = matches[index].index ?? 0;
    const end = matches[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    profileCount += 1;
    categoryFiles.set(file, (categoryFiles.get(file) ?? 0) + 1);

    const overviewValues = strings(section(block, "overview", "definingWorks"));
    const worksValues = strings(section(block, "definingWorks", "timeline"));
    const timelineBlock = section(block, "timeline", "legacy");
    const legacyValues = strings(section(block, "legacy", "texasPlaces"));
    const placesBlock = section(block, "texasPlaces", "sources");
    const sourcesBlock = section(block, "sources", "lastReviewedAt");
    const overviewWords = overviewValues.reduce((sum, value) => sum + words(value), 0);
    const legacyWords = legacyValues.reduce((sum, value) => sum + words(value), 0);
    const timelineCount = (timelineBlock.match(/\{\s*year:/g) ?? []).length;
    const places = (placesBlock.match(/\{\s*name:/g) ?? []).length;
    const linkedPlaces = (placesBlock.match(/href:\s*"\//g) ?? []).length;
    const sourceUrls = [...sourcesBlock.matchAll(/url:\s*"(https:\/\/[^\"]+)"/g)].map((match) => match[1]);

    totalOverviewWords += overviewWords;
    totalLegacyWords += legacyWords;
    placeCount += places;
    linkedPlaceCount += linkedPlaces;

    if (overviewValues.length < 2) failures.push(`${file}:${slug} needs at least two overview paragraphs; found ${overviewValues.length}.`);
    if (overviewWords < 90) failures.push(`${file}:${slug} overview is thin at ${overviewWords} words; minimum is 90.`);
    if (worksValues.length < 3) failures.push(`${file}:${slug} needs at least three defining-work/context points; found ${worksValues.length}.`);
    if (timelineCount < 4) failures.push(`${file}:${slug} needs at least four timeline milestones; found ${timelineCount}.`);
    if (legacyValues.length < 1 || legacyWords < 45) failures.push(`${file}:${slug} legacy section is thin at ${legacyWords} words; minimum is 45.`);
    if (places < 2) failures.push(`${file}:${slug} needs at least two Texas-place/context entries; found ${places}.`);
    if (new Set(sourceUrls).size < 3) failures.push(`${file}:${slug} needs at least three distinct HTTPS sources; found ${new Set(sourceUrls).size}.`);
    if (linkedPlaces === 0) warnings.push(`${file}:${slug} has no direct internal Texas-place link; safe resolver enrichment may still add one at runtime.`);
    if (!/lastReviewedAt:\s*"2026-/.test(block)) warnings.push(`${file}:${slug} lastReviewedAt is not dated in 2026.`);
  }
}

if (profileCount < 180) failures.push(`Expected the completed narrative registry to contain at least 180 researched profiles; found ${profileCount}.`);

const route = fs.readFileSync(routePath, "utf8");
for (const token of [
  'type: "article"',
  "canonicalLink(texasDefinedBrand, canonicalPath)",
  'type="application/ld+json"',
  "TEXAS_ICON_CATEGORY_AUTHORITY_HUBS",
  "related.map",
  "profile.texasPlaces.map",
  "profile.sources.map",
]) {
  if (!route.includes(token)) failures.push(`Texas Icons profile route is missing SEO/cross-link contract token: ${token}`);
}
if (!route.includes('"@type": "BreadcrumbList"')) failures.push("Texas Icons profiles must emit BreadcrumbList structured data.");
if (!route.includes("isPartOf:")) failures.push("Texas Icons entity schema must identify the Texas Icons collection as its parent.");

const types = fs.readFileSync(typesPath, "utf8");
for (const category of ["history-politics", "music-culture", "sports", "business-science", "media-arts", "symbols-food"]) {
  if (!types.includes(`id: "${category}"`)) failures.push(`Texas Icons category metadata is missing ${category}.`);
}

console.log(`Texas Icons content audit reviewed ${profileCount} narrative profiles across ${researchFiles.length} server-only research modules.`);
console.log(`Overview words: ${totalOverviewWords}; legacy words: ${totalLegacyWords}; Texas-place entries: ${placeCount}; explicit internal place links: ${linkedPlaceCount}.`);
if (warnings.length) {
  console.log(`Non-blocking audit notes (${warnings.length}):`);
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (failures.length) {
  console.error(`Texas Icons content/SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Texas Icons content/SEO audit passed: every researched narrative meets the minimum depth/source contract and the public route retains canonical, structured-data, related-profile, authority-hub, Texas-place and source discovery paths.");
