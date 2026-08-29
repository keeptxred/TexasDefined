import fs from "node:fs";
import path from "node:path";

const dataDir = "src/data";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const correctionsPath = "src/data/texas-icons-roster-corrections.server.ts";
const holdsPath = "src/data/texas-icons-editorial-holds.server.ts";
const serverPath = "src/data/texas-icons.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const sourcePaths = [
  "src/data/texas-icons-source-history-music.server.ts",
  "src/data/texas-icons-source-sports-business.server.ts",
  "src/data/texas-icons-source-media-symbols.server.ts",
];
const graphOwnerEvidencePath = "scripts/data/validate-texas-icons-symbols-batch3.mjs";

const failures = [];
for (const requiredPath of [
  rosterPath,
  correctionsPath,
  holdsPath,
  serverPath,
  functionsPath,
  graphOwnerEvidencePath,
  ...sourcePaths,
]) {
  if (!fs.existsSync(requiredPath)) failures.push(`Missing Texas Icons accounting contract file: ${requiredPath}`);
}
if (failures.length) fail();

const rosterSource = fs.readFileSync(rosterPath, "utf8");
const correctionsSource = fs.readFileSync(correctionsPath, "utf8");
const holdsSource = fs.readFileSync(holdsPath, "utf8");
const serverSource = fs.readFileSync(serverPath, "utf8");
const functionsSource = fs.readFileSync(functionsPath, "utf8");
const graphOwnerEvidence = fs.readFileSync(graphOwnerEvidencePath, "utf8");

const sourceFragments = sourcePaths.map((sourcePath) => {
  const source = fs.readFileSync(sourcePath, "utf8");
  const match = source.match(/String\.raw`([\s\S]*?)`;/);
  if (!match) failures.push(`Texas Icons source fragment missing raw CSV payload: ${sourcePath}`);
  return match?.[1] ?? "";
});
const rows = parseCsv(["Rank,Name,Category,Description", ...sourceFragments].join("\n"));
const records = rows.slice(1).map(([rank, name, category, description]) => ({
  rank: Number(rank),
  name,
  category,
  description,
  slug: slugify(name ?? ""),
}));

if (records.length !== 250) failures.push(`Terminal accounting requires exactly 250 source rows; found ${records.length}.`);
if (new Set(records.map((record) => record.rank)).size !== 250) failures.push("Terminal accounting requires 250 unique source ranks.");
if (new Set(records.map((record) => record.slug)).size !== 250) failures.push("Terminal accounting requires 250 unique source slugs.");

const researchFiles = fs.readdirSync(dataDir)
  .filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))
  .sort();
const researchSlugs = new Set();
for (const file of researchFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  for (const match of source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)) {
    const slug = match[1];
    if (researchSlugs.has(slug)) failures.push(`Duplicate staged research slug across Texas Icons modules: ${slug}.`);
    researchSlugs.add(slug);
  }
}

const talentFiles = fs.readdirSync(dataDir)
  .filter((name) => /^texas-talent-profiles.*\.ts$/.test(name))
  .sort();
const talentSlugs = new Set();
for (const file of talentFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  for (const match of source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)) talentSlugs.add(match[1]);
}

const aliasesByName = parseAliases(rosterSource);
const rosterAliasSlugs = new Set([...aliasesByName.values()].flat().map(slugify));
const canonicalNames = parseCanonicalNames(rosterSource);
const canonicalSourceSlugs = new Set([...canonicalNames].map(slugify));

const correctionMatches = [...correctionsSource.matchAll(
  /sourceRank:\s*(\d+),[\s\S]*?sourceName:\s*"([^"]+)",[\s\S]*?sourceSlug:\s*"([^"]+)",[\s\S]*?replacementName:\s*"([^"]+)",[\s\S]*?replacementSlug:\s*"([^"]+)"/g,
)];
const correctionsBySourceSlug = new Map(correctionMatches.map((match) => [
  match[3],
  {
    rank: Number(match[1]),
    sourceName: match[2],
    sourceSlug: match[3],
    replacementName: match[4],
    replacementSlug: match[5],
  },
]));

const expectedCorrection = correctionsBySourceSlug.get("trey-parker");
if (correctionsBySourceSlug.size !== 1
  || !expectedCorrection
  || expectedCorrection.rank !== 223
  || expectedCorrection.replacementSlug !== "matt-stone") {
  failures.push("Texas Icons terminal accounting requires the single documented rank-223 Trey Parker -> Matt Stone correction.");
}
if (!correctionsSource.includes('slug: "matt-stone"')) failures.push("The Matt Stone correction must retain its staged corrected research profile.");

const holdObject = holdsSource.match(/const TEXAS_ICON_EDITORIAL_HOLD_SUMMARIES:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
const holdSlugs = new Set([...holdObject.matchAll(/^\s{2}"([^"]+)":/gm)].map((match) => match[1]));
const expectedHoldSlugs = new Set([
  "john-crump",
  "burt-buddy-crump",
  "cyrus-vance",
  "james-truett",
  "margarita-salas",
  "slick-woods",
]);
if (!sameSet(holdSlugs, expectedHoldSlugs)) {
  failures.push(`Editorial holds must remain exactly the six documented disputed rows; found: ${[...holdSlugs].sort().join(", ")}.`);
}

// The Cotton Bowl is the one roster row intentionally owned by a knowledge-graph
// entity rather than a canonicalPath, Texas Talent profile, or Icons research record.
// Its dedicated final-batch validator owns the entity/alias evidence.
const graphOwnedSlugs = new Set(["the-cotton-bowl"]);
if (!graphOwnerEvidence.includes('const graphOwned = [247, "The Cotton Bowl"')) {
  failures.push("The Cotton Bowl knowledge-graph ownership evidence must remain explicit in the final Symbols validator.");
}

const sourceSlugs = new Set(records.map((record) => record.slug));
const correctionReplacementSlugs = new Set([...correctionsBySourceSlug.values()].map((entry) => entry.replacementSlug));
for (const slug of researchSlugs) {
  if (!sourceSlugs.has(slug) && !rosterAliasSlugs.has(slug) && !correctionReplacementSlugs.has(slug)) {
    failures.push(`Staged Texas Icons research has no roster, roster-alias, or documented-correction owner: ${slug}.`);
  }
}
for (const slug of holdSlugs) {
  if (!sourceSlugs.has(slug)) failures.push(`Editorial hold does not map to a source roster slug: ${slug}.`);
  if (researchSlugs.has(slug) || canonicalSourceSlugs.has(slug) || graphOwnedSlugs.has(slug) || hasTalentOwner(slug, null)) {
    failures.push(`Editorial hold ${slug} also has a competing owner; reconcile it instead of keeping dual terminal states.`);
  }
}

const outcomeCounts = new Map([
  ["correction", 0],
  ["editorial-canonical", 0],
  ["knowledge-graph", 0],
  ["texas-talent", 0],
  ["icon-research-staged", 0],
  ["editorial-hold", 0],
]);
const outcomesByRank = new Map();

for (const record of records) {
  let outcome = null;
  const aliases = aliasesByName.get(record.name) ?? [];
  const correction = correctionsBySourceSlug.get(record.slug);
  if (correction) {
    if (correction.rank !== record.rank || correction.sourceName !== record.name) {
      failures.push(`Correction source drift at rank ${record.rank}: ${record.name} (${record.slug}).`);
    }
    outcome = "correction";
  } else if (canonicalNames.has(record.name)) {
    outcome = "editorial-canonical";
  } else if (graphOwnedSlugs.has(record.slug)) {
    outcome = "knowledge-graph";
  } else if (hasTalentOwner(record.slug, aliases)) {
    outcome = "texas-talent";
  } else if (hasResearchOwner(record.slug, aliases)) {
    outcome = "icon-research-staged";
  } else if (holdSlugs.has(record.slug)) {
    outcome = "editorial-hold";
  }

  if (!outcome) {
    failures.push(`Unaccounted Texas Icons source row: rank ${record.rank} ${record.name} (${record.slug}).`);
    continue;
  }
  outcomesByRank.set(record.rank, outcome);
  outcomeCounts.set(outcome, (outcomeCounts.get(outcome) ?? 0) + 1);
}

if (outcomesByRank.size !== 250) failures.push(`Terminal accounting resolved ${outcomesByRank.size}/250 source ranks.`);
if ([...outcomeCounts.values()].reduce((sum, count) => sum + count, 0) !== 250) failures.push("Terminal outcome counts must sum to exactly 250.");
if (outcomeCounts.get("correction") !== 1) failures.push(`Expected exactly one documented roster correction; found ${outcomeCounts.get("correction")}.`);
if (outcomeCounts.get("editorial-hold") !== 6) failures.push(`Expected exactly six editorial holds; found ${outcomeCounts.get("editorial-hold")}.`);
if (outcomeCounts.get("knowledge-graph") !== 1) failures.push(`Expected exactly one graph-owned source row; found ${outcomeCounts.get("knowledge-graph")}.`);

for (const [slug, correction] of correctionsBySourceSlug) {
  if (!sourceSlugs.has(slug)) failures.push(`Correction source slug is absent from intake: ${slug}.`);
  if (sourceSlugs.has(correction.replacementSlug)) failures.push(`Correction replacement ${correction.replacementSlug} must remain an explicit replacement, not a second raw intake row.`);
}

const canonicalIndex = serverSource.indexOf("if (entry.canonicalPath)");
const graphIndex = serverSource.indexOf("if (graphEntity)");
const talentIndex = serverSource.indexOf("if (talentProfile)");
const researchIndex = serverSource.indexOf("if (researchProfile)");
if ([canonicalIndex, graphIndex, talentIndex, researchIndex].some((index) => index < 0)
  || !(canonicalIndex < graphIndex && graphIndex < talentIndex && talentIndex < researchIndex)) {
  failures.push("Terminal accounting requires resolver precedence canonical -> graph -> Talent -> staged research.");
}
for (const token of [
  "applyTexasIconEditorialHoldSummary",
  "applyTexasIconRosterCorrection",
  "texasIconCorrectedResearchProfile",
  "texasIconCorrectionSourceSlug",
]) {
  if (!functionsSource.includes(token)) failures.push(`Texas Icons presentation boundary is missing terminal-state helper: ${token}.`);
}

if (failures.length) fail();

const summary = [...outcomeCounts.entries()]
  .map(([outcome, count]) => `${outcome}=${count}`)
  .join(", ");
console.log(`Texas Icons terminal accounting passed: all 250 intake rows have one allowed resolver outcome (${summary}); one documented correction and six editorial holds remain explicit and fail closed.`);

function hasTalentOwner(sourceSlug, aliases) {
  if (talentSlugs.has(sourceSlug)) return true;
  for (const alias of aliases ?? []) if (talentSlugs.has(slugify(alias))) return true;
  return false;
}

function hasResearchOwner(sourceSlug, aliases) {
  if (researchSlugs.has(sourceSlug)) return true;
  for (const alias of aliases ?? []) if (researchSlugs.has(slugify(alias))) return true;
  return false;
}

function parseAliases(source) {
  const block = source.match(/const ALIASES:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
  const result = new Map();
  for (const match of block.matchAll(/^\s{2}"([^"]+)":\s*\[([^\]]*)\],/gm)) {
    const aliases = [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
    result.set(match[1], aliases);
  }
  return result;
}

function parseCanonicalNames(source) {
  const block = source.match(/const CANONICAL_PATHS:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
  return new Set([...block.matchAll(/^\s{2}"([^"]+)":\s*"\//gm)].map((match) => match[1]));
}

function sameSet(left, right) {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];
    if (quoted) {
      if (character === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }
    if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += character;
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function fail() {
  console.error("Texas Icons terminal accounting failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
