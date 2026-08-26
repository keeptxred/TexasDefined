import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent depth audit failed: ${message}`);
  process.exit(1);
};

const profileFiles = [
  "src/data/texas-talent-profiles.ts",
  "src/data/texas-talent-profiles-wave2-music.ts",
  "src/data/texas-talent-profiles-wave2-film.ts",
  "src/data/texas-talent-profiles-wave2-arts.ts",
  "src/data/texas-talent-profiles-wave3.ts",
];

function findBalancedBlock(text, start, openChar, closeChar, context) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === openChar) depth += 1;
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }
  fail(`${context} did not close cleanly`);
}

function extractProfileBlocks(path) {
  const text = read(path);
  const declaration = /export const\s+[A-Z0-9_]+:\s*readonly\s+TexasTalentProfile\[\]\s*=\s*\[/g.exec(text);
  if (!declaration) fail(`${path} is missing its exported TexasTalentProfile[] array`);
  const start = declaration.index + declaration[0].lastIndexOf("[");
  const arrayText = findBalancedBlock(text, start, "[", "]", `${path} profile array`);
  const blocks = [];
  let squareDepth = 0;
  let curlyDepth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let index = 0; index < arrayText.length; index += 1) {
    const char = arrayText[index];
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "[") squareDepth += 1;
    else if (char === "]") squareDepth -= 1;
    else if (char === "{") {
      if (squareDepth === 1 && curlyDepth === 0) objectStart = index;
      curlyDepth += 1;
    } else if (char === "}") {
      curlyDepth -= 1;
      if (squareDepth === 1 && curlyDepth === 0 && objectStart >= 0) {
        blocks.push(arrayText.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }
  return blocks;
}

function extractCorrectionBlocks() {
  const text = read("src/data/texas-talent-profile-corrections.ts");
  const declaration = /export const\s+TEXAS_TALENT_PROFILE_CORRECTIONS:[^=]+=\s*\{/g.exec(text);
  if (!declaration) fail("Texas Talent corrections registry is missing");
  const start = declaration.index + declaration[0].lastIndexOf("{");
  const registry = findBalancedBlock(text, start, "{", "}", "Texas Talent corrections registry");
  const entries = new Map();
  const keyPattern = /^ {2}"([^"]+)":\s*\{/gm;
  for (const match of registry.matchAll(keyPattern)) {
    const objectStart = registry.indexOf("{", match.index);
    entries.set(match[1], findBalancedBlock(registry, objectStart, "{", "}", `correction ${match[1]}`));
  }
  return entries;
}

function stringProperty(block, field) {
  return new RegExp(`\\b${field}:\\s*"([^"]*)"`).exec(block)?.[1] ?? "";
}

function stringArray(block, field) {
  const fieldMatch = new RegExp(`\\b${field}:\\s*\\[`).exec(block);
  if (!fieldMatch) return [];
  const start = block.indexOf("[", fieldMatch.index);
  const array = findBalancedBlock(block, start, "[", "]", field);
  return [...array.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function contextStrings(block) {
  const fieldMatch = /\btexasPlaces:\s*\[/.exec(block);
  if (!fieldMatch) return [];
  const start = block.indexOf("[", fieldMatch.index);
  const array = findBalancedBlock(block, start, "[", "]", "texasPlaces");
  return [...array.matchAll(/\bcontext:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function hasField(block, field) {
  return new RegExp(`\\b${field}:`).test(block);
}

function countWords(values) {
  return values
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

const corrections = extractCorrectionBlocks();
const audits = profileFiles.flatMap(extractProfileBlocks).map((profileBlock) => {
  const slug = stringProperty(profileBlock, "slug");
  const name = stringProperty(profileBlock, "name");
  if (!slug || !name) fail("profile missing slug or name");
  const correction = corrections.get(slug) ?? "";
  const fromEffective = (field, extractor) => hasField(correction, field)
    ? extractor(correction, field)
    : extractor(profileBlock, field);

  const words = countWords([
    fromEffective("dek", stringProperty),
    fromEffective("texasConnection", stringProperty),
    ...fromEffective("overview", stringArray),
    ...fromEffective("legacy", stringArray),
    ...(hasField(correction, "texasPlaces") ? contextStrings(correction) : contextStrings(profileBlock)),
  ]);

  return {
    slug,
    name,
    words,
    status: words >= 350 ? "strong" : words >= 250 ? "adequate" : "thin",
  };
});

audits.sort((a, b) => a.words - b.words || a.name.localeCompare(b.name));
const counts = {
  strong: audits.filter((audit) => audit.status === "strong").length,
  adequate: audits.filter((audit) => audit.status === "adequate").length,
  thin: audits.filter((audit) => audit.status === "thin").length,
};

console.log(`Texas Talent depth audit: ${audits.length} profiles · ${counts.strong} strong · ${counts.adequate} adequate · ${counts.thin} thin.`);
console.log("Lowest-depth profiles:");
for (const audit of audits.slice(0, 15)) {
  console.log(`- ${audit.slug}: ${audit.words} narrative words (${audit.status})`);
}
console.log("Depth tiers are diagnostic only; publication still requires the existing readiness contract and explicit editorial approval.");
