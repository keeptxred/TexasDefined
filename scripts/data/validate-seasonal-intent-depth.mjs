import fs from "node:fs";

const ARTICLE_PATH = "src/data/fixtures/seasonal-intent-articles.ts";
const DEPTH_PATH = "src/data/fixtures/seasonal-intent-depth-blocks.ts";
const LOADER_PATH = "src/data/fixtures/lazy-seasonal-intents.ts";
const READINESS_PATH = "src/data/fixtures/texas-gateway-index-readiness.ts";

const articles = fs.readFileSync(ARTICLE_PATH, "utf8");
const depth = fs.readFileSync(DEPTH_PATH, "utf8");
const loader = fs.readFileSync(LOADER_PATH, "utf8");
const readiness = fs.readFileSync(READINESS_PATH, "utf8");

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

const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const sourceWordCount = (value) => value.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0;
const ignoredLiteralValues = new Set(["paragraph", "heading", "list", "image", "shop"]);

const quotedLiteralValues = (source) => {
  const matches = source.match(/"(?:\\.|[^"\\])*"/g) ?? [];
  return matches.flatMap((token) => {
    try {
      const value = JSON.parse(token);
      return typeof value === "string" && !ignoredLiteralValues.has(value) ? [value] : [];
    } catch {
      return [];
    }
  });
};

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

const baseBodyWordCount = (block) => {
  const marker = "body: [";
  const start = block.indexOf(marker);
  if (start < 0) return 0;
  return wordCount(quotedLiteralValues(block.slice(start + marker.length)).join(" "));
};

const supplementalBodyWordCount = (slug, block) => {
  if (!block) return 0;
  const marker = `\"${slug}\": [`;
  const start = block.indexOf(marker);
  if (start < 0) return 0;
  return wordCount(quotedLiteralValues(block.slice(start + marker.length)).join(" "));
};

const readinessMinimumMatch = readiness.match(/export const SEASONAL_INTENT_INDEX_MIN_BODY_WORDS = (\d+);/);
const seasonalIndexMinimum = Number(readinessMinimumMatch?.[1] ?? NaN);
if (!Number.isFinite(seasonalIndexMinimum) || seasonalIndexMinimum < 400) {
  fail("seasonal route-level body threshold must remain explicit and at least 400 words");
}

const readinessSetStart = readiness.indexOf("export const SEASONAL_INTENT_INDEX_READY_SLUGS");
const readinessSetEnd = readiness.indexOf("]);", readinessSetStart);
const readinessSet = readinessSetStart >= 0 && readinessSetEnd > readinessSetStart
  ? readiness.slice(readinessSetStart, readinessSetEnd)
  : "";
if (!readinessSet) fail("seasonal index-ready allowlist is missing from route readiness governance");

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

let minimumObservedBodyWords = Number.POSITIVE_INFINITY;
for (const slug of slugs) {
  const base = articleBlock(slug);
  if (!base) {
    fail(`${slug}: canonical article is missing`);
    continue;
  }
  const supplement = depthBlock(slug);
  const combinedSourceWords = sourceWordCount(`${base} ${supplement}`);
  if (combinedSourceWords < 500) {
    fail(`${slug}: canonical source remains too thin (${combinedSourceWords} source words; minimum 500)`);
  }

  const bodyWords = baseBodyWordCount(base) + supplementalBodyWordCount(slug, supplement);
  minimumObservedBodyWords = Math.min(minimumObservedBodyWords, bodyWords);
  if (bodyWords < seasonalIndexMinimum) {
    fail(`${slug}: rendered article body would trigger route noindex (${bodyWords} words; minimum ${seasonalIndexMinimum})`);
  }
  if (!readinessSet.includes(`\"${slug}\"`)) {
    fail(`${slug}: missing from explicit seasonal route index-readiness allowlist`);
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
  console.log(`Seasonal intent depth guard passed: ${slugs.length} canonical seasonal pages retain at least 500 source words, every rendered body clears the ${seasonalIndexMinimum}-word route indexability floor (minimum observed ${minimumObservedBodyWords}), keep one canonical owner, and cannot regress to a one-minute contract.`);
}
