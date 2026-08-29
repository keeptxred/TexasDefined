import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const correctionsPath = "src/data/texas-icons-roster-corrections.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const holdsPath = "src/data/texas-icons-editorial-holds.server.ts";
const mediaValidatorPath = "scripts/data/validate-texas-icons-media-batch4.mjs";
const routes = ["src/routes/texas-icons.tsx", "src/routes/texas-icons_.$slug.tsx"];
const dataDir = "src/data";
const failures = [];

for (const path of [sourcePath, correctionsPath, functionsPath, holdsPath, mediaValidatorPath, ...routes]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons correction contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const corrections = fs.readFileSync(correctionsPath, "utf8");
const functions = fs.readFileSync(functionsPath, "utf8");
const holds = fs.readFileSync(holdsPath, "utf8");
const mediaValidator = fs.readFileSync(mediaValidatorPath, "utf8");

if (!source.includes("223,Trey Parker,Media & Arts,Creative voice with profound roots in animation spheres.")) {
  failures.push("Rank 223 raw owner-supplied Trey Parker row must remain byte-auditable as provenance.");
}
for (const token of [
  "sourceRank: 223",
  'sourceName: "Trey Parker"',
  'sourceSlug: "trey-parker"',
  'replacementName: "Matt Stone"',
  'replacementSlug: "matt-stone"',
  "explicit editorial correction, not an alias",
  "https://www.televisionacademy.com/bios/trey-parker",
  "https://www.televisionacademy.com/bios/matt-stone",
  "Houston, Texas",
  "Littleton, Colorado",
  'slug: "matt-stone"',
  'editorialStatus: "researched-staged"',
  "2026",
  "Television Academy Hall of Fame",
  "indexableAtOwnRoute: true",
]) if (!corrections.includes(token)) failures.push(`Rank 223 correction is missing required provenance/publication token: ${token}.`);

if (corrections.includes('replacementName: "Trey Parker"') || corrections.includes('slug: "trey-parker",\n    editorialStatus')) {
  failures.push("The corrected research profile must be Matt Stone, not a fabricated Texas Trey Parker profile.");
}
if (!functions.includes('import("./texas-icons-roster-corrections.server")')) failures.push("Texas Icons server functions must dynamically import the server-only correction layer.");
for (const token of ["texasIconCorrectionSourceSlug", "applyTexasIconRosterCorrection", "texasIconCorrectedResearchProfile"]) {
  if (!functions.includes(token)) failures.push(`Texas Icons server-function correction bridge missing: ${token}.`);
}
if (!functions.includes("loadTexasIconProfileServer(sourceSlug)")) failures.push("Corrected profile requests must resolve through the preserved source slug so the legacy URL can redirect.");
if (holds.includes('"trey-parker":')) failures.push("Resolved rank 223 must not remain in the unresolved editorial-hold map.");
if (!mediaValidator.includes('replacementSlug: "matt-stone"') && !mediaValidator.includes('"matt-stone"')) failures.push("Media batch-4 validation must acknowledge the explicit rank-223 correction.");

const urls = [...corrections.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (new Set(urls).size < 4) failures.push("Published Matt Stone correction must retain at least four distinct HTTPS research sources.");

const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name) || name === "texas-talent.ts");
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
if (talentSource.includes('slug: "matt-stone"')) failures.push("Matt Stone now exists in Texas Talent and must be reconciled rather than duplicated as corrected Icons research.");

for (const path of routes) {
  const route = fs.readFileSync(path, "utf8");
  if (route.includes("texas-icons-roster-corrections.server")) failures.push(`${path} must not directly import the server-only roster-correction module.`);
}

if (failures.length) fail();
console.log("Texas Icons roster-correction validation passed: raw rank 223 remains Trey Parker provenance, effective rank 223 is transparently corrected to a published Houston-born Matt Stone narrative, and duplicate/canonical boundaries remain intact.");

function fail() {
  console.error("Texas Icons roster-correction validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
