import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent source-provenance validation failed: ${message}`);
  process.exit(1);
};

const profileFiles = [
  "src/data/texas-talent-profiles.ts",
  "src/data/texas-talent-profiles-wave2-music.ts",
  "src/data/texas-talent-profiles-wave2-film.ts",
  "src/data/texas-talent-profiles-wave2-arts.ts",
  "src/data/texas-talent-profiles-wave3.ts",
];

const readinessFiles = [
  "src/data/texas-talent-readiness.ts",
  "src/data/texas-talent-readiness-batch3.ts",
  "src/data/texas-talent-readiness-batch4.ts",
  "src/data/texas-talent-readiness-batch5.ts",
  "src/data/texas-talent-readiness-batch6.ts",
  "src/data/texas-talent-readiness-batch7.ts",
  "src/data/texas-talent-readiness-batch8.ts",
  "src/data/texas-talent-readiness-batch9.ts",
  "src/data/texas-talent-readiness-batch10.ts",
  "src/data/texas-talent-readiness-batch11.ts",
  "src/data/texas-talent-readiness-batch12.ts",
];

function findBalancedBlock(text, start, openChar, closeChar, context) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
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

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
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

  const arrayStart = declaration.index + declaration[0].lastIndexOf("[");
  const arrayText = findBalancedBlock(text, arrayStart, "[", "]", `${path} profile array`);
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
    if (char === "[") {
      squareDepth += 1;
      continue;
    }
    if (char === "]") {
      squareDepth -= 1;
      continue;
    }
    if (char === "{") {
      if (squareDepth === 1 && curlyDepth === 0) objectStart = index;
      curlyDepth += 1;
      continue;
    }
    if (char === "}") {
      curlyDepth -= 1;
      if (squareDepth === 1 && curlyDepth === 0 && objectStart >= 0) {
        blocks.push(arrayText.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  return blocks;
}

function extractRecordEntries(path, declarationPattern) {
  const text = read(path);
  const declaration = declarationPattern.exec(text);
  if (!declaration) fail(`${path} is missing its expected exported record`);

  const objectStart = declaration.index + declaration[0].lastIndexOf("{");
  const registryText = findBalancedBlock(text, objectStart, "{", "}", `${path} record`);
  const entries = new Map();
  const keyPattern = /^ {2}(?:"([^"]+)"|([a-z][a-z0-9-]*)):\s*\{/gm;

  for (const match of registryText.matchAll(keyPattern)) {
    const slug = match[1] ?? match[2];
    const localStart = registryText.indexOf("{", match.index);
    entries.set(slug, findBalancedBlock(registryText, localStart, "{", "}", `${path}:${slug}`));
  }

  return entries;
}

function extractProfileSourceUrls(block) {
  const sourcesStart = block.search(/\bsources:\s*\[/);
  if (sourcesStart < 0) return [];
  const arrayStart = block.indexOf("[", sourcesStart);
  const sourcesBlock = findBalancedBlock(block, arrayStart, "[", "]", "profile sources");
  return [...sourcesBlock.matchAll(/\burl:\s*"(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
}

function extractVerifiedSourceUrls(block) {
  const sourcesStart = block.search(/\bverifiedSources:\s*\[/);
  if (sourcesStart < 0) return [];
  const arrayStart = block.indexOf("[", sourcesStart);
  const sourcesBlock = findBalancedBlock(block, arrayStart, "[", "]", "readiness verifiedSources");
  return [...sourcesBlock.matchAll(/"(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
}

const profileBlocks = profileFiles.flatMap(extractProfileBlocks);
const profiles = new Map();
for (const block of profileBlocks) {
  const slug = /\bslug:\s*"([^"]+)"/.exec(block)?.[1];
  if (!slug) fail("a profile block is missing its slug");
  if (profiles.has(slug)) fail(`duplicate profile slug ${slug}`);
  profiles.set(slug, block);
}

const readiness = new Map();
for (const path of readinessFiles) {
  const entries = extractRecordEntries(
    path,
    /export const\s+TEXAS_TALENT_READINESS(?:_BATCH\d+)?:\s*Readonly<Record<string, TexasTalentReadinessRecord>>\s*=\s*\{/g,
  );
  for (const [slug, block] of entries) {
    if (readiness.has(slug)) fail(`duplicate readiness slug ${slug}`);
    readiness.set(slug, block);
  }
}

const corrections = extractRecordEntries(
  "src/data/texas-talent-profile-corrections.ts",
  /export const\s+TEXAS_TALENT_PROFILE_CORRECTIONS:\s*Readonly<Record<string, TexasTalentProfileCorrection>>\s*=\s*\{/g,
);

const failures = [];
for (const [slug, profileBlock] of profiles) {
  const readinessBlock = readiness.get(slug);
  if (!readinessBlock) {
    failures.push(`${slug}: missing readiness record`);
    continue;
  }

  const correctionBlock = corrections.get(slug);
  const effectiveSourceBlock = correctionBlock && /\bsources:\s*\[/.test(correctionBlock)
    ? correctionBlock
    : profileBlock;
  const profileSourceUrls = extractProfileSourceUrls(effectiveSourceBlock);
  const verifiedSourceUrls = extractVerifiedSourceUrls(readinessBlock);

  if (profileSourceUrls.length === 0) {
    failures.push(`${slug}: profile exposes no source URLs`);
    continue;
  }
  if (verifiedSourceUrls.length === 0) {
    failures.push(`${slug}: readiness exposes no verified source URLs`);
    continue;
  }

  const verifiedSet = new Set(verifiedSourceUrls);
  if (!profileSourceUrls.some((url) => verifiedSet.has(url))) {
    failures.push(`${slug}: displayed profile sources do not include any readiness-reviewed source`);
  }
}

for (const slug of corrections.keys()) {
  if (!profiles.has(slug)) failures.push(`${slug}: correction targets an unknown profile`);
}

if (failures.length > 0) {
  fail(`${failures.length} provenance mismatch(es):\n- ${failures.join("\n- ")}`);
}

console.log(
  `Texas Talent source provenance passed: ${profiles.size} profiles each expose at least one source URL that also appears in their readiness-reviewed source set.`,
);
