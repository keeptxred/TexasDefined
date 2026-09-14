import fs from "node:fs";

const ARTICLE_PATH = "src/data/fixtures/seasonal-intent-articles.ts";
const DEPTH_PATH = "src/data/fixtures/seasonal-intent-depth-blocks.ts";
const LOADER_PATH = "src/data/fixtures/lazy-seasonal-intents.ts";

const articles = fs.readFileSync(ARTICLE_PATH, "utf8");
const depth = fs.readFileSync(DEPTH_PATH, "utf8");
const loader = fs.readFileSync(LOADER_PATH, "utf8");

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

const articleBlock = (slug) => {
  const marker = `slug: \"${slug}\"`;
  const start = articles.indexOf(marker);
  if (start < 0) return "";
  const next = articles.indexOf("\n  {\n    id:", start + marker.length);
  return articles.slice(start, next < 0 ? articles.indexOf("\n];", start) : next);
};

const depthBlock = (slug) => {
  const marker = `\"${slug}\": [`;
  const start = depth.indexOf(marker);
  if (start < 0) return "";
  const next = depth.indexOf("\n  \"", start + marker.length);
  const mapEnd = depth.indexOf("\n};", start + marker.length);
  const end = next >= 0 && (mapEnd < 0 || next < mapEnd) ? next : mapEnd;
  return depth.slice(start, end < 0 ? depth.length : end);
};

if (!articles.includes('import { applySeasonalIntentDepth } from "./seasonal-intent-depth-blocks"')) {
  fail("canonical seasonal article module is not wired to the depth blocks");
}
if (!articles.includes("baseSeasonalIntentArticles.map(applySeasonalIntentDepth)")) {
  fail("canonical seasonal article export must apply depth before articles leave their owner module");
}
if (loader.includes("seasonal-intent-depth-blocks") || loader.includes("applySeasonalIntentDepth")) {
  fail("lazy seasonal resolver must not own or apply article depth; canonical article ownership belongs in seasonal-intent-articles.ts");
}
if (!loader.includes('await import("./seasonal-intent-articles")')) {
  fail("lazy seasonal resolver lost its canonical dynamic import");
}
if (articles.includes("readingMinutes: 1") || depth.includes("readingMinutes: 1") || loader.includes("readingMinutes: 1")) {
  fail("seasonal intent sources must never advertise a one-minute canonical article");
}

for (const slug of slugs) {
  const base = articleBlock(slug);
  if (!base) {
    fail(`${slug}: canonical article is missing`);
    continue;
  }
  const supplement = depthBlock(slug);
  const combinedWords = wordCount(`${base} ${supplement}`);
  if (combinedWords < 500) {
    fail(`${slug}: canonical source remains too thin (${combinedWords} words; minimum 500)`);
  }
  if (slug !== "free-christmas-events-in-texas" && !supplement) {
    fail(`${slug}: missing canonical depth blocks`);
  }
}

if (depthBlock("free-christmas-events-in-texas")) {
  fail("free-christmas-events-in-texas is already deep in the canonical source and must not receive duplicate supplemental copy");
}

for (const marker of [
  "A free Texas Christmas night can be every bit as memorable as a ticketed attraction",
  "San Antonio River Walk: the lights are the experience",
  "Georgetown Christmas Stroll: a free festival, not just lights",
  "Verify this year's schedule before you leave",
]) {
  if (!articles.includes(marker)) fail(`free Christmas canonical depth marker is missing: ${marker}`);
}

if (!process.exitCode) {
  console.log(`Seasonal intent depth guard passed: ${slugs.length} canonical seasonal pages are at least 500 source words, keep one canonical owner, and cannot regress to a one-minute contract.`);
}
