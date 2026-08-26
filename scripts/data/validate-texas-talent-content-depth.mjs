import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent content-depth validation failed: ${message}`);
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

function stringProperty(block, property) {
  const match = new RegExp(`\\b${property}:\\s*"((?:\\\\.|[^"\\\\])*)"`).exec(block);
  return match?.[1]?.replace(/\\"/g, '"').trim() ?? "";
}

function arrayBlock(block, property) {
  const propertyIndex = block.search(new RegExp(`\\b${property}:\\s*\\[`));
  if (propertyIndex < 0) return "";
  const start = block.indexOf("[", propertyIndex);
  return findBalancedBlock(block, start, "[", "]", property);
}

function stringArrayValues(arrayText) {
  return [...arrayText.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => match[1].trim());
}

function topLevelObjects(arrayText) {
  const objects = [];
  let squareDepth = 0;
  let curlyDepth = 0;
  let start = -1;
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
      if (squareDepth === 1 && curlyDepth === 0) start = index;
      curlyDepth += 1;
    } else if (char === "}") {
      curlyDepth -= 1;
      if (squareDepth === 1 && curlyDepth === 0 && start >= 0) {
        objects.push(arrayText.slice(start, index + 1));
        start = -1;
      }
    }
  }
  return objects;
}

const overrideSource = read("src/data/texas-talent-place-context-overrides.ts");
const placeContextOverrides = new Map(
  [...overrideSource.matchAll(/^\s*"([^"]+::[^"]+)":\s*\n?\s*"([^"]+)",?$/gm)]
    .map((match) => [match[1], match[2]]),
);
const usedPlaceContextOverrides = new Set();

const failures = [];
const profiles = profileFiles.flatMap(extractProfileBlocks);

for (const block of profiles) {
  const slug = stringProperty(block, "slug") || "unknown-profile";
  const texasConnection = stringProperty(block, "texasConnection");
  const dek = stringProperty(block, "dek");
  const overview = stringArrayValues(arrayBlock(block, "overview"));
  const works = stringArrayValues(arrayBlock(block, "definingWorks"));
  const timeline = topLevelObjects(arrayBlock(block, "timeline"));
  const legacy = stringArrayValues(arrayBlock(block, "legacy"));
  const places = topLevelObjects(arrayBlock(block, "texasPlaces"));
  const sources = topLevelObjects(arrayBlock(block, "sources"));

  if (texasConnection.length < 50) failures.push(`${slug}: Texas connection is too thin (${texasConnection.length} chars; need 50+)`);
  if (dek.length < 90) failures.push(`${slug}: dek is too thin (${dek.length} chars; need 90+)`);

  if (overview.length < 2) failures.push(`${slug}: overview needs at least 2 narrative paragraphs`);
  const overviewChars = overview.reduce((sum, value) => sum + value.length, 0);
  if (overviewChars < 240) failures.push(`${slug}: overview narrative is too thin (${overviewChars} chars; need 240+)`);

  if (works.length < 4) failures.push(`${slug}: needs at least 4 defining works or achievements`);
  if (new Set(works.map((value) => value.toLowerCase())).size !== works.length) failures.push(`${slug}: defining works contain duplicates`);

  if (timeline.length < 4) failures.push(`${slug}: timeline needs at least 4 milestones`);
  const timelineEvents = [];
  for (const entry of timeline) {
    const year = stringProperty(entry, "year");
    const event = stringProperty(entry, "event");
    if (!year || !event) failures.push(`${slug}: timeline contains an incomplete milestone`);
    else timelineEvents.push(event);
  }
  const timelineChars = timelineEvents.reduce((sum, value) => sum + value.length, 0);
  if (timelineChars < 90) failures.push(`${slug}: timeline is too thin overall (${timelineChars} chars; need 90+)`);

  if (legacy.length < 2) failures.push(`${slug}: legacy section needs at least 2 substantive points`);
  const legacyChars = legacy.reduce((sum, value) => sum + value.length, 0);
  if (legacyChars < 140) failures.push(`${slug}: legacy section is too thin (${legacyChars} chars; need 140+)`);

  if (places.length < 1) failures.push(`${slug}: needs at least one Texas place with narrative context`);
  for (const place of places) {
    const name = stringProperty(place, "name");
    const storedContext = stringProperty(place, "context");
    const overrideKey = `${slug}::${name}`;
    const context = placeContextOverrides.get(overrideKey) ?? storedContext;
    if (placeContextOverrides.has(overrideKey)) usedPlaceContextOverrides.add(overrideKey);
    if (!name || !context) failures.push(`${slug}: Texas place entry is incomplete`);
    else if (context.length < 35) failures.push(`${slug}: Texas place '${name}' needs more context (${context.length} chars; need 35+)`);
  }

  if (sources.length < 2) failures.push(`${slug}: needs at least 2 displayed authority sources`);
  for (const source of sources) {
    const label = stringProperty(source, "label");
    const url = stringProperty(source, "url");
    if (label.length < 8) failures.push(`${slug}: source label is too vague`);
    if (!url.startsWith("https://")) failures.push(`${slug}: source URL must use HTTPS (${url || "missing"})`);
  }
}

if (profiles.length !== 51) failures.push(`expected the current 51-profile inventory; found ${profiles.length}`);
for (const key of placeContextOverrides.keys()) {
  if (!usedPlaceContextOverrides.has(key)) failures.push(`place-context override does not match an authored profile place: ${key}`);
}

if (failures.length) {
  fail(`${failures.length} content-depth issue(s):\n- ${failures.join("\n- ")}`);
}

console.log(
  `Texas Talent content-depth validation passed: ${profiles.length} profiles meet narrative, works, timeline, Texas-place, legacy and source minimums; ${placeContextOverrides.size} targeted place contexts are expanded.`,
);
