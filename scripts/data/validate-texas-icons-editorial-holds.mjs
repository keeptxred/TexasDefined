import fs from "node:fs";

const holdsPath = "src/data/texas-icons-editorial-holds.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const sourceBusinessPath = "src/data/texas-icons-source-sports-business.server.ts";
const sourceMediaPath = "src/data/texas-icons-source-media-symbols.server.ts";
const routePaths = ["src/routes/texas-icons.tsx", "src/routes/texas-icons_.$slug.tsx"];
const researchPaths = fs.readdirSync("src/data").filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name));
const failures = [];

for (const path of [holdsPath, functionsPath, sourceBusinessPath, sourceMediaPath, ...routePaths]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons editorial-hold contract file: ${path}`);
}
if (failures.length) fail();

const holds = fs.readFileSync(holdsPath, "utf8");
const functions = fs.readFileSync(functionsPath, "utf8");
const businessSource = fs.readFileSync(sourceBusinessPath, "utf8");
const mediaSource = fs.readFileSync(sourceMediaPath, "utf8");
const research = researchPaths.map((name) => fs.readFileSync(`src/data/${name}`, "utf8")).join("\n");

const expected = [
  [164, "John Crump", "john-crump"],
  [168, "Burt 'Buddy' Crump", "burt-buddy-crump"],
  [182, "Cyrus Vance", "cyrus-vance"],
  [183, "James Truett", "james-truett"],
  [188, "Margarita Salas", "margarita-salas"],
  [220, "Slick Woods", "slick-woods"],
];

for (const [rank, name, slug] of expected) {
  const source = rank < 191 ? businessSource : mediaSource;
  const category = rank < 191 ? "Business & Science" : "Media & Arts";
  if (!source.includes(`${rank},${name},${category},`)) failures.push(`Editorial-hold roster drift at rank ${rank}: expected ${name}.`);
  if (!holds.includes(`"${slug}":`)) failures.push(`Missing safe editorial-hold summary for ${slug}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Disputed intake row ${slug} must not gain a staged research profile until its identity/Texas claim is resolved.`);
}

const holdKeys = [...holds.matchAll(/^\s{2}"([^"]+)":/gm)].map((match) => match[1]);
if (holdKeys.length !== expected.length || new Set(holdKeys).size !== expected.length) {
  failures.push(`Editorial-hold map must contain exactly ${expected.length} unique disputed slugs; found ${holdKeys.length}.`);
}
for (const slug of holdKeys) if (!expected.some((entry) => entry[2] === slug)) failures.push(`Unexpected Texas Icons editorial-hold slug: ${slug}.`);
if (holds.includes('"trey-parker":')) failures.push("Resolved rank 223 must leave the generic editorial-hold map and be governed by the explicit roster-correction contract.");

for (const token of [
  "under editorial verification",
  "has not confirmed which John Crump",
  "has not found authoritative evidence",
  "do not substantiate",
  "has not matched the supplied Fort Worth aerospace-engineer",
  "does not match the supplied Houston-laboratory description",
  "Houston-birth claim conflicts",
  "applyTexasIconEditorialHoldSummary",
]) if (!holds.includes(token)) failures.push(`Editorial-hold safety copy/function missing: ${token}.`);

if (!functions.includes('import("./texas-icons-editorial-holds.server")')) failures.push("Texas Icons server functions must dynamically import the editorial-hold sanitizer.");
const sanitizerUses = (functions.match(/applyTexasIconEditorialHoldSummary/g) ?? []).length;
if (sanitizerUses < 6) failures.push(`Texas Icons payloads must sanitize hub, category, profile and related summaries; found ${sanitizerUses} sanitizer references.`);
for (const path of routePaths) {
  const route = fs.readFileSync(path, "utf8");
  if (route.includes("texas-icons-editorial-holds.server")) failures.push(`${path} must not import the server-only editorial-hold module directly.`);
}

if (!holds.includes("TEXAS_ICON_EDITORIAL_HOLD_SLUGS") || !holds.includes("texasIconEditorialHoldSummary")) failures.push("Editorial-hold module must expose an auditable slug list and summary resolver.");
if (holds.includes("editorialStatus") || holds.includes("indexableAtOwnRoute") || holds.includes("canonicalPath")) failures.push("Editorial holds may sanitize summaries only; they must not alter publication, indexability, or canonical ownership.");

if (failures.length) fail();
console.log("Texas Icons editorial-hold validation passed: six unresolved intake rows keep provenance while public summaries are sanitized and resolved corrections are governed separately.");

function fail() {
  console.error("Texas Icons editorial-hold validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
