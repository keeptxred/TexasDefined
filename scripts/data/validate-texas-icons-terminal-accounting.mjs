import fs from "node:fs";
import path from "node:path";

const dataDir = "src/data";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const correctionsPath = "src/data/texas-icons-roster-corrections.server.ts";
const holdsPath = "src/data/texas-icons-editorial-holds.server.ts";
const serverPath = "src/data/texas-icons.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const graphOwnerEvidencePath = "scripts/data/validate-texas-icons-symbols-batch3.mjs";
const sourcePaths = [
  "src/data/texas-icons-source-history-music.server.ts",
  "src/data/texas-icons-source-sports-business.server.ts",
  "src/data/texas-icons-source-media-symbols.server.ts",
];

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
  slug: slugify(name ?? "", false),
}));

if (records.length !== 250) failures.push(`Terminal accounting requires exactly 250 source rows; found ${records.length}.`);
if (new Set(records.map((record) => record.rank)).size !== 250) failures.push("Terminal accounting requires 250 unique source ranks.");
if (new Set(records.map((record) => record.slug)).size !== 250) failures.push("Terminal accounting requires 250 unique source slugs.");
if (records.map((record) => record.rank).join(",") !== Array.from({ length: 250 }, (_, index) => index + 1).join(",")) {
  failures.push("Terminal accounting requires source ranks exactly 1 through 250 in order.");
}

const aliasesByName = parseAliases(rosterSource);
const canonicalNames = parseCanonicalNames(rosterSource);
const sourceBySlug = new Map(records.map((record) => [record.slug, record]));

const researchFiles = fs.readdirSync(dataDir)
  .filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))
  .sort();
const researchSlugs = collectUniqueProfileSlugs(researchFiles, "Texas Icons research");

const talentFiles = fs.readdirSync(dataDir)
  .filter((name) => /^texas-talent-profiles.*\.ts$/.test(name) || name === "texas-talent.ts")
  .sort();
const talentSlugs = collectProfileSlugs(talentFiles);

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
if (!correctionsSource.includes('slug: "matt-stone"')) failures.push("The Matt Stone correction must retain its corrected research profile.");

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

const graphOwnedSlugs = new Set(["the-cotton-bowl"]);
if (!graphOwnerEvidence.includes('const graphOwned = [247, "The Cotton Bowl"')) {
  failures.push("The Cotton Bowl knowledge-graph ownership evidence must remain explicit in the final Symbols validator.");
}

const candidateSlugsByRank = new Map();
for (const record of records) {
  candidateSlugsByRank.set(record.rank, subjectSlugCandidates(record.name, aliasesByName.get(record.name) ?? []));
}

const researchRanksBySlug = new Map();
const talentRanksBySlug = new Map();
for (const record of records) {
  const candidates = candidateSlugsByRank.get(record.rank) ?? new Set([record.slug]);
  const matchedResearch = intersection(candidates, researchSlugs);
  const matchedTalent = intersection(candidates, talentSlugs);
  if (matchedResearch.size > 1) failures.push(`Rank ${record.rank} ${record.name} matches multiple Texas Icons research owners: ${[...matchedResearch].join(", ")}.`);
  if (matchedTalent.size > 1) failures.push(`Rank ${record.rank} ${record.name} matches multiple Texas Talent owners: ${[...matchedTalent].join(", ")}.`);
  for (const slug of matchedResearch) addRank(researchRanksBySlug, slug, record.rank);
  for (const slug of matchedTalent) addRank(talentRanksBySlug, slug, record.rank);
}
for (const [slug, ranks] of researchRanksBySlug) {
  if (ranks.size > 1) failures.push(`Texas Icons research owner ${slug} maps to multiple roster ranks: ${[...ranks].join(", ")}.`);
}
for (const [slug, ranks] of talentRanksBySlug) {
  if (ranks.size > 1) failures.push(`Texas Talent owner ${slug} maps to multiple Texas Icons roster ranks: ${[...ranks].join(", ")}.`);
}

const correctionReplacementSlugs = new Set([...correctionsBySourceSlug.values()].map((entry) => entry.replacementSlug));
for (const slug of researchSlugs) {
  if (!researchRanksBySlug.has(slug) && !correctionReplacementSlugs.has(slug)) {
    failures.push(`Texas Icons research has no roster/alias or documented-correction owner: ${slug}.`);
  }
}

for (const slug of holdSlugs) {
  const record = sourceBySlug.get(slug);
  if (!record) {
    failures.push(`Editorial hold does not map to a source roster slug: ${slug}.`);
    continue;
  }
  const candidates = candidateSlugsByRank.get(record.rank) ?? new Set([slug]);
  if (canonicalNames.has(record.name)
    || graphOwnedSlugs.has(slug)
    || intersection(candidates, talentSlugs).size
    || intersection(candidates, researchSlugs).size) {
    failures.push(`Editorial hold ${slug} also has a competing owner; reconcile it instead of keeping dual terminal states.`);
  }
}

const outcomeCounts = new Map([
  ["correction", 0],
  ["editorial-canonical", 0],
  ["knowledge-graph", 0],
  ["texas-talent", 0],
  ["icon-research", 0],
  ["editorial-hold", 0],
]);
const outcomesByRank = new Map();

for (const record of records) {
  const candidates = candidateSlugsByRank.get(record.rank) ?? new Set([record.slug]);
  const correction = correctionsBySourceSlug.get(record.slug);
  let outcome = null;
  if (correction) {
    if (correction.rank !== record.rank || correction.sourceName !== record.name) {
      failures.push(`Correction source drift at rank ${record.rank}: ${record.name} (${record.slug}).`);
    }
    outcome = "correction";
  } else if (canonicalNames.has(record.name)) {
    outcome = "editorial-canonical";
  } else if (graphOwnedSlugs.has(record.slug)) {
    outcome = "knowledge-graph";
  } else if (intersection(candidates, talentSlugs).size) {
    outcome = "texas-talent";
  } else if (intersection(candidates, researchSlugs).size) {
    outcome = "icon-research";
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
  if (!sourceBySlug.has(slug)) failures.push(`Correction source slug is absent from intake: ${slug}.`);
  if (sourceBySlug.has(correction.replacementSlug)) failures.push(`Correction replacement ${correction.replacementSlug} must remain an explicit replacement, not a second raw intake row.`);
}

const canonicalIndex = serverSource.indexOf("if (entry.canonicalPath)");
const graphIndex = serverSource.indexOf("if (graphEntity)");
const talentIndex = serverSource.indexOf("if (talentProfile)");
const researchIndex = serverSource.indexOf("if (researchProfile)");
if ([canonicalIndex, graphIndex, talentIndex, researchIndex].some((index) => index < 0)
  || !(canonicalIndex < graphIndex && graphIndex < talentIndex && talentIndex < researchIndex)) {
  failures.push("Terminal accounting requires resolver precedence canonical -> graph -> Talent -> Icons research.");
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
const summary = [...outcomeCounts.entries()].map(([outcome, count]) => `${outcome}=${count}`).join(", ");
console.log(`Texas Icons terminal accounting passed: all 250 intake rows have one allowed resolver outcome (${summary}); one documented correction and six editorial holds remain explicit and fail closed.`);

function collectUniqueProfileSlugs(files, label) {
  const result = new Set();
  for (const file of files) {
    const source = fs.readFileSync(path.join(dataDir, file), "utf8");
    for (const match of source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)) {
      const slug = match[1];
      if (result.has(slug)) failures.push(`Duplicate ${label} slug across modules: ${slug}.`);
      result.add(slug);
    }
  }
  return result;
}

function collectProfileSlugs(files) {
  const result = new Set();
  for (const file of files) {
    const source = fs.readFileSync(path.join(dataDir, file), "utf8");
    for (const match of source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)) result.add(match[1]);
  }
  return result;
}

function subjectSlugCandidates(name, aliases) {
  const result = new Set();
  for (const value of [name, ...aliases]) {
    result.add(slugify(value, false));
    result.add(slugify(value, true));
  }
  return result;
}

function slugify(value, apostropheAsSeparator) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, apostropheAsSeparator ? " " : "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function intersection(left, right) {
  return new Set([...left].filter((value) => right.has(value)));
}

function addRank(map, slug, rank) {
  const ranks = map.get(slug) ?? new Set();
  ranks.add(rank);
  map.set(slug, ranks);
}

function parseAliases(source) {
  const block = source.match(/const ALIASES:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
  const result = new Map();
  for (const match of block.matchAll(/^\s{2}"([^"]+)":\s*\[([^\]]*)\],/gm)) {
    result.set(match[1], [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]));
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
      } else if (character === '"') quoted = false;
      else field += character;
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
