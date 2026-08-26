import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent launch-metadata validation failed: ${message}`);
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
  const array = findBalancedBlock(text, start, "[", "]", `${path} profile array`);
  const blocks = [];
  let squareDepth = 0;
  let curlyDepth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let index = 0; index < array.length; index += 1) {
    const char = array[index];
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
        blocks.push(array.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }
  return blocks;
}

function stringProperty(block, property) {
  return new RegExp(`\\b${property}:\\s*"((?:\\\\.|[^"\\\\])*)"`).exec(block)?.[1]?.replace(/\\"/g, '"').trim() ?? "";
}

function extractCorrections() {
  const text = read("src/data/texas-talent-profile-corrections.ts");
  const declaration = /export const\s+TEXAS_TALENT_PROFILE_CORRECTIONS:[^=]+=\s*\{/g.exec(text);
  if (!declaration) fail("Texas Talent corrections registry is missing");
  const start = declaration.index + declaration[0].lastIndexOf("{");
  const registry = findBalancedBlock(text, start, "{", "}", "Texas Talent corrections registry");
  const corrections = new Map();
  for (const match of registry.matchAll(/^ {2}"([^"]+)":\s*\{/gm)) {
    const objectStart = registry.indexOf("{", match.index);
    corrections.set(match[1], findBalancedBlock(registry, objectStart, "{", "}", `correction ${match[1]}`));
  }
  return corrections;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function truncateAtWordBoundary(value, maxLength) {
  if (value.length <= maxLength) return value;
  const candidate = value.slice(0, Math.max(0, maxLength - 1)).trimEnd();
  const boundary = candidate.lastIndexOf(" ");
  const trimmed = boundary >= Math.floor(maxLength * 0.7) ? candidate.slice(0, boundary) : candidate;
  return `${trimmed.replace(/[,:;\-–—]+$/, "")}…`;
}

function descriptionFor(dek, texasConnection) {
  const normalizedDek = normalizeWhitespace(dek);
  const normalizedConnection = normalizeWhitespace(texasConnection);
  const candidate = normalizedDek.length >= 110 ? normalizedDek : `${normalizedDek} ${normalizedConnection}`;
  return truncateAtWordBoundary(candidate, 158);
}

const corrections = extractCorrections();
const metadata = profileFiles.flatMap(extractProfileBlocks).map((block) => {
  const slug = stringProperty(block, "slug");
  const correction = corrections.get(slug) ?? "";
  const name = stringProperty(correction, "name") || stringProperty(block, "name");
  const dek = stringProperty(correction, "dek") || stringProperty(block, "dek");
  const texasConnection = stringProperty(correction, "texasConnection") || stringProperty(block, "texasConnection");
  if (!slug || !name || !dek || !texasConnection) fail(`${slug || "unknown-profile"} is missing launch metadata inputs`);
  const canonicalPath = `/texas-talent/${slug}`;
  const title = `${name}: Texas Talent | Texas Defined`;
  const description = descriptionFor(dek, texasConnection);
  return { slug, canonicalPath, title, description };
});

const failures = [];
if (metadata.length !== 51) failures.push(`expected 51 launch metadata records; found ${metadata.length}`);
if (new Set(metadata.map((item) => item.canonicalPath)).size !== metadata.length) failures.push("future canonical paths must be unique");
if (new Set(metadata.map((item) => item.title)).size !== metadata.length) failures.push("SEO titles must be unique");
for (const item of metadata) {
  if (!/^\/texas-talent\/[a-z0-9-]+$/.test(item.canonicalPath)) failures.push(`${item.slug}: invalid future canonical path ${item.canonicalPath}`);
  if (item.title.length < 25 || item.title.length > 65) failures.push(`${item.slug}: title length ${item.title.length} is outside 25–65 characters`);
  if (item.description.length < 110 || item.description.length > 158) failures.push(`${item.slug}: description length ${item.description.length} is outside 110–158 characters`);
}

const helperPath = "src/data/texas-talent-launch-metadata.server.ts";
if (!existsSync(resolve(root, helperPath))) failures.push(`missing ${helperPath}`);
else {
  const helper = read(helperPath);
  if (!helper.includes('TEXAS_TALENT_FUTURE_BASE_PATH = "/texas-talent"')) failures.push("future Texas Talent base path contract is missing");
  if (!helper.includes('"@type": "Person"')) failures.push("future Person schema contract is missing");
  if (!helper.includes("mainEntityOfPage")) failures.push("future Person schema must identify the canonical main entity page");
}

const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");
if (publicRoutes.includes('"/texas-talent"')) failures.push("Texas Talent must remain outside public route classification before launch approval");
if (sitemap.includes("texas-talent")) failures.push("Texas Talent must remain outside sitemap generation before launch approval");
if (existsSync(resolve(root, "src/routes/texas-talent.tsx")) || existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx"))) {
  failures.push("public Texas Talent hub route must remain absent during hidden launch preparation");
}

if (failures.length) fail(`${failures.length} issue(s):\n- ${failures.join("\n- ")}`);
console.log(`Texas Talent launch metadata passed: ${metadata.length} unique future canonical paths with bounded titles/descriptions and conservative Person schema; public launch remains disabled.`);
