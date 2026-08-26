import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent flagship-depth validation failed: ${message}`);
  process.exit(1);
};

function findBalancedBlock(text, start, openChar, closeChar, context) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (char === "\\") { escaped = true; continue; }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") { quote = char; continue; }
    if (char === openChar) depth += 1;
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }
  fail(`${context} did not close cleanly`);
}

function stringArray(block, property) {
  const at = block.search(new RegExp(`\\b${property}:\\s*\\[`));
  if (at < 0) return [];
  const array = findBalancedBlock(block, block.indexOf("[", at), "[", "]", property);
  return [...array.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => match[1].replace(/\\"/g, '"'));
}

function objectArray(block, property) {
  const at = block.search(new RegExp(`\\b${property}:\\s*\\[`));
  if (at < 0) return [];
  const array = findBalancedBlock(block, block.indexOf("[", at), "[", "]", property);
  const objects = [];
  let depth = 0;
  let start = -1;
  let quote = null;
  let escaped = false;
  for (let index = 0; index < array.length; index += 1) {
    const char = array[index];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (char === "\\") { escaped = true; continue; }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") { quote = char; continue; }
    if (char === "{") { if (depth === 0) start = index; depth += 1; }
    else if (char === "}") { depth -= 1; if (depth === 0 && start >= 0) objects.push(array.slice(start, index + 1)); }
  }
  return objects;
}

const words = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const source = read("src/data/texas-talent-launch-depth-wave1.ts");
const server = read("src/data/texas-talent.server.ts");
const expected = ["willie-nelson", "selena", "buddy-holly", "beyonce", "matthew-mcconaughey"];

if (!server.includes("TEXAS_TALENT_LAUNCH_DEPTH_WAVE1") || !server.includes("...(TEXAS_TALENT_LAUNCH_DEPTH_WAVE1[profile.slug] ?? {})")) {
  fail("server loader must apply the flagship depth overrides to effective profiles");
}
if (source.includes('launchStatus: "launch-ready"')) fail("flagship depth work must not grant editorial launch approval");

for (const slug of expected) {
  const marker = `"${slug}": {`;
  const start = source.indexOf(marker);
  if (start < 0) fail(`missing flagship depth record for ${slug}`);
  const objectStart = source.indexOf("{", start);
  const block = findBalancedBlock(source, objectStart, "{", "}", slug);
  const overview = stringArray(block, "overview");
  const legacy = stringArray(block, "legacy");
  const places = objectArray(block, "texasPlaces");
  const overviewWords = overview.reduce((sum, paragraph) => sum + words(paragraph), 0);
  const legacyWords = legacy.reduce((sum, paragraph) => sum + words(paragraph), 0);

  if (overview.length < 3 || overviewWords < 300) fail(`${slug}: overview is below launch depth (${overview.length} paragraphs, ${overviewWords} words)`);
  if (legacy.length < 3 || legacyWords < 100) fail(`${slug}: legacy is below launch depth (${legacy.length} points, ${legacyWords} words)`);
  if (places.length < 2) fail(`${slug}: needs at least two substantive Texas places`);
  for (const place of places) {
    const context = /\bcontext:\s*"((?:\\.|[^"\\])*)"/.exec(place)?.[1] ?? "";
    if (words(context) < 18) fail(`${slug}: Texas place context is below the 18-word launch threshold`);
  }
}

const recordCount = [...source.matchAll(/^  "[a-z0-9-]+": \{/gm)].length;
if (recordCount !== expected.length) fail(`wave 1 must contain exactly ${expected.length} flagship records; found ${recordCount}`);

console.log("Texas Talent flagship-depth validation passed: Willie Nelson, Selena, Buddy Holly, Beyoncé and Matthew McConaughey all meet the stronger narrative, legacy and Texas-place launch thresholds without receiving launch approval.");
