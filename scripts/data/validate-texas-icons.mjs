import fs from "node:fs";

const rosterPath = "src/data/texas-icons-roster.server.ts";
const sourcePaths = [
  "src/data/texas-icons-source-history-music.server.ts",
  "src/data/texas-icons-source-sports-business.server.ts",
  "src/data/texas-icons-source-media-symbols.server.ts",
];
const typesPath = "src/data/texas-icons-types.ts";
const serverPath = "src/data/texas-icons.server.ts";
const hubPath = "src/routes/texas-icons.tsx";
const profilePath = "src/routes/texas-icons_.$slug.tsx";

const failures = [];
for (const path of [rosterPath, ...sourcePaths, typesPath, serverPath, hubPath, profilePath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons contract file: ${path}`);
}
if (failures.length) fail();

const rosterSource = fs.readFileSync(rosterPath, "utf8");
const types = fs.readFileSync(typesPath, "utf8");
const server = fs.readFileSync(serverPath, "utf8");
const hub = fs.readFileSync(hubPath, "utf8");
const profile = fs.readFileSync(profilePath, "utf8");

const sourceFragments = sourcePaths.map((path) => {
  const source = fs.readFileSync(path, "utf8");
  const match = source.match(/String\.raw`([\s\S]*?)`;/);
  if (!match) failures.push(`Texas Icons source fragment missing raw CSV payload: ${path}`);
  return match?.[1] ?? "";
});
const rows = parseCsv(["Rank,Name,Category,Description", ...sourceFragments].join("\n"));
const header = rows[0] ?? [];
if (header.join("|") !== "Rank|Name|Category|Description") {
  failures.push(`Unexpected Texas Icons CSV header: ${header.join("|")}`);
}
const records = rows.slice(1).map(([rank, name, category, description]) => ({
  rank: Number(rank),
  name,
  category,
  description,
  slug: slugify(name ?? ""),
}));

if (records.length !== 250) failures.push(`Expected exactly 250 Texas Icon records; found ${records.length}.`);
if (records.map((record) => record.rank).join(",") !== Array.from({ length: 250 }, (_, index) => index + 1).join(",")) {
  failures.push("Texas Icon ranks must be exactly 1 through 250 in source order.");
}
if (new Set(records.map((record) => record.slug)).size !== records.length) {
  failures.push("Texas Icon slugs must be unique.");
}
if (new Set(records.map((record) => normalize(record.name))).size !== records.length) {
  failures.push("Texas Icon names collide after punctuation/accent normalization.");
}
if (records.some((record) => !record.name || !record.description)) {
  failures.push("Every Texas Icon intake row must retain a name and roster note.");
}

const expectedCategoryCounts = new Map([
  ["History & Politics", 50],
  ["Music & Culture", 50],
  ["Sports", 50],
  ["Business & Science", 40],
  ["Media & Arts", 35],
  ["Symbols & Food", 25],
]);
for (const [category, expected] of expectedCategoryCounts) {
  const actual = records.filter((record) => record.category === category).length;
  if (actual !== expected) failures.push(`Expected ${expected} ${category} records; found ${actual}.`);
}

for (const token of [
  'label: "History & Politics"',
  'label: "Music & Culture"',
  'label: "Sports"',
  'label: "Business & Science"',
  'label: "Media & Arts"',
  'label: "Symbols & Food"',
]) {
  if (!types.includes(token)) failures.push(`Texas Icons category contract missing: ${token}`);
}

for (const token of [
  "loadTexasTalentProfilesServer",
  "loadTexasKnowledgeGraph",
  "canonicalEntityPath",
  "uniqueMatch",
  'entry.subjectType === "place"',
  "isTexasTalentPublishable",
]) {
  if (!server.includes(token)) failures.push(`Texas Icons duplicate resolver contract missing: ${token}`);
}

for (const token of [
  "CANONICAL_PATHS",
  '"/destination/the-alamo"',
  '"/destination/cadillac-ranch"',
  '"/destination/palo-duro-canyon-state-park"',
  '"/destination/big-bend-national-park"',
  '"/destination/space-center-houston"',
  '"/dr-pepper-texas-history"',
  '"/texas-chili-con-carne-history"',
  '"/article/history-of-the-texas-flag"',
]) {
  if (!rosterSource.includes(token)) failures.push(`Texas Icons explicit canonical reuse missing: ${token}`);
}

for (const token of [
  "No duplicate or thin profile pages",
  "noindex, follow, max-image-preview:large",
  "Existing canonical pages reused",
  "Existing Talent records reused",
]) {
  if (!hub.includes(token)) failures.push(`Texas Icons hub safeguard missing: ${token}`);
}

for (const token of [
  'throw redirect({ href: result.icon.href, statusCode: 301 })',
  "noindex, follow, max-image-preview:large",
  "Cross-linked profiles",
]) {
  if (!profile.includes(token)) failures.push(`Texas Icons profile safeguard missing: ${token}`);
}
if (!server.includes("getRelatedTexasIcons(entry, 8)")) {
  failures.push("Texas Icons related-profile resolver must retain eight same-category cross-links.");
}

if (!/Description (?:field|column).*roster note.*not a publishable authority citation\./s.test(rosterSource)) {
  failures.push("Texas Icons source provenance must distinguish roster notes from authority citations.");
}
if (!/short roster notes below are intake provenance,[\s\S]*not substitutes for research\./.test(hub)) {
  failures.push("Texas Icons hub must disclose that starter notes are not researched profiles.");
}

if (failures.length) fail();

console.log(
  `Texas Icons validation passed: ${records.length} unique source records, protected duplicate resolution, canonical reuse, noindex starter profiles, and eight related-profile links per record.`,
);

function fail() {
  console.error("Texas Icons validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
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

function normalize(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’".,()]/g, "")
    .replace(/\b(the)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
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
    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}
