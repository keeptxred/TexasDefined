import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const legacy = read("src/data/fixtures/seasonal-intent-articles.ts");
const depth = read("src/data/fixtures/seasonal-intent-depth.ts");
const loader = read("src/data/fixtures/lazy-seasonal-intents.ts");

const slugs = [
  "bluebonnets-near-austin",
  "bluebonnets-near-houston",
  "bluebonnets-near-dallas-fort-worth",
  "bluebonnets-near-san-antonio",
  "texas-bluebonnet-festivals",
  "is-it-illegal-to-pick-bluebonnets-in-texas",
  "best-christmas-lights-in-texas",
  "texas-christmas-train-rides",
  "free-christmas-events-in-texas",
  "east-texas-fall-colors",
  "hill-country-fall-colors",
  "best-texas-state-parks-for-fall-colors",
];

const fail = (message) => {
  console.error(`SEASONAL INTENT DEPTH FAIL: ${message}`);
  process.exitCode = 1;
};

const wordCount = (value) => value.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0;

const legacyBlock = (slug) => {
  const marker = `slug: \"${slug}\"`;
  const start = legacy.indexOf(marker);
  if (start < 0) return "";
  const next = legacy.indexOf("\n  {\n    id:", start + marker.length);
  return legacy.slice(start, next < 0 ? legacy.length : next);
};

const depthBlock = (slug) => {
  const marker = `\"${slug}\": [`;
  const start = depth.indexOf(marker);
  if (start < 0) return "";
  const nextKey = depth.indexOf("\n  \"", start + marker.length);
  const mapEnd = depth.indexOf("\n};", start + marker.length);
  const end = nextKey >= 0 && (mapEnd < 0 || nextKey < mapEnd) ? nextKey : mapEnd;
  return depth.slice(start, end < 0 ? depth.length : end);
};

if (!loader.includes('import { enrichSeasonalIntentArticle } from "./seasonal-intent-depth"')) {
  fail("lazy seasonal loader is not wired to the depth enrichment module");
}
if (!loader.includes("canonicalizeSeasonalArticleLinks(enrichSeasonalIntentArticle(article))")) {
  fail("canonical seasonal intent loader must enrich full articles before returning them");
}
if (legacy.includes("readingMinutes: 1") || depth.includes("readingMinutes: 1") || loader.includes("readingMinutes: 1")) {
  fail("seasonal intent sources must never advertise a one-minute canonical article");
}

for (const slug of slugs) {
  const base = legacyBlock(slug);
  const supplement = depthBlock(slug);
  if (!base) {
    fail(`${slug}: missing canonical legacy article body`);
    continue;
  }
  if (!supplement) {
    fail(`${slug}: missing depth supplement`);
    continue;
  }
  const supplementWords = wordCount(supplement);
  const combinedWords = wordCount(`${base} ${supplement}`);
  if (supplementWords < 220) fail(`${slug}: depth supplement is too small (${supplementWords} words; minimum 220)`);
  if (combinedWords < 500) fail(`${slug}: combined canonical source remains too thin (${combinedWords} words; minimum 500)`);
}

if (!depth.includes("A low-cost Christmas trip works best when the main atmosphere does not depend on admission")) {
  fail("free Christmas article depth marker is missing");
}
if (!depth.includes("The San Antonio River Walk is one of the clearest statewide examples")) {
  fail("free Christmas article must retain the verified free River Walk planning section");
}

if (!process.exitCode) {
  console.log(`Seasonal intent depth guard passed: ${slugs.length} canonical seasonal intent pages have enrichment coverage and no one-minute source contract.`);
}
