import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent music-authority validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const profileFiles = [
  "src/data/texas-talent-profiles.ts",
  "src/data/texas-talent-profiles-wave2-music.ts",
  "src/data/texas-talent-profiles-wave2-film.ts",
  "src/data/texas-talent-profiles-wave2-arts.ts",
  "src/data/texas-talent-profiles-wave3.ts",
];
const mappingPath = "src/data/texas-talent-music-authority.server.ts";
const linksPath = "src/data/texas-talent-links.server.ts";
const musicPath = "src/data/texas-music.ts";
const publicRoutesPath = "src/lib/public-routes.ts";

for (const path of [...profileFiles, mappingPath, linksPath, musicPath, publicRoutesPath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required file ${path}`);
}

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
  requireCondition(Boolean(declaration), `${path} is missing its profile array`);

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

const profileCategories = new Map();
for (const block of profileFiles.flatMap(extractProfileBlocks)) {
  const slug = /\bslug:\s*"([^"]+)"/.exec(block)?.[1];
  const category = /\bcategory:\s*"([^"]+)"/.exec(block)?.[1];
  requireCondition(Boolean(slug && category), "profile is missing slug or category");
  profileCategories.set(slug, category);
}

const mappingText = read(mappingPath);
const mappingDeclaration = /export const\s+TEXAS_TALENT_MUSIC_AUTHORITY_BY_PROFILE[\s\S]*?=\s*\{/.exec(mappingText);
requireCondition(Boolean(mappingDeclaration), "music authority mapping export is missing");
const mappingStart = mappingDeclaration.index + mappingDeclaration[0].lastIndexOf("{");
const mappingBlock = findBalancedBlock(mappingText, mappingStart, "{", "}", "music authority mapping");
const mappings = [...mappingBlock.matchAll(/^\s{2}"([^"]+)":\s*\[([^\]]+)\],?$/gm)].map((match) => ({
  slug: match[1],
  traditionIds: [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]),
}));

requireCondition(mappings.length >= 20, `expected at least 20 curated musician mappings; found ${mappings.length}`);
requireCondition(new Set(mappings.map((item) => item.slug)).size === mappings.length, "mapped profile slugs must be unique");

const texasMusic = read(musicPath);
const traditionGuideHrefs = new Map(
  [...texasMusic.matchAll(/\bid:\s*"([^"]+)"[\s\S]*?\bguideHref:\s*"([^"]+)"/g)].map((match) => [match[1], match[2]]),
);
const publicRoutes = read(publicRoutesPath);

for (const { slug, traditionIds } of mappings) {
  requireCondition(profileCategories.has(slug), `${slug} does not match an authored Texas Talent profile`);
  requireCondition(profileCategories.get(slug) === "music", `${slug} is mapped to Texas Music authority but is not a music profile`);
  requireCondition(traditionIds.length > 0, `${slug} has an empty tradition mapping`);
  requireCondition(new Set(traditionIds).size === traditionIds.length, `${slug} repeats a tradition mapping`);

  for (const traditionId of traditionIds) {
    const href = traditionGuideHrefs.get(traditionId);
    requireCondition(Boolean(href), `${slug} references unknown or unpublished tradition ${traditionId}`);
    requireCondition(publicRoutes.includes(`"${href}"`), `${slug} maps to ${href}, which is not explicitly indexable`);
    const routeStem = href.slice(1);
    requireCondition(existsSync(resolve(root, `src/routes/${routeStem}.tsx`)), `${href} is missing its route file`);
    requireCondition(existsSync(resolve(root, `src/routes/${routeStem}.lazy.tsx`)), `${href} is missing its lazy route file`);
  }
}

requireCondition(publicRoutes.includes('"/texas-music"'), "general Texas Music hub must remain explicitly indexable");
requireCondition(existsSync(resolve(root, "src/routes/texas-music.tsx")), "general Texas Music hub route is missing");

const linksText = read(linksPath);
requireCondition(linksText.includes("TEXAS_TALENT_MUSIC_AUTHORITY_BY_PROFILE"), "resolver does not consume the curated profile-to-tradition map");
requireCondition(linksText.includes("TEXAS_MUSIC_TRADITIONS"), "resolver does not resolve mappings through the Texas Music authority registry");
requireCondition(linksText.includes("isIndexablePublicPath"), "resolver must recheck authority routes against public indexability at runtime");
requireCondition(linksText.includes('isIndexablePublicPath("/texas-music")'), "general Texas Music link must remain runtime-gated by indexability");
requireCondition(linksText.includes('kind: "culture"'), "Texas Music authority links must remain culture links");

console.log(
  `Texas Talent music-authority validation passed: ${mappings.length} curated musician profiles point only to live, explicitly indexable Texas Music guides; ambiguous profiles remain eligible for the general hub only.`,
);
