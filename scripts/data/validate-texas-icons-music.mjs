import fs from "node:fs";

const rosterPath = "src/data/texas-icons-roster.server.ts";
const sourcePath = "src/data/texas-icons-source-history-music.server.ts";
const researchPath = "src/data/texas-icons-research-music-1.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const talentProfilePaths = [
  "src/data/texas-talent-profiles.ts",
  "src/data/texas-talent-profiles-wave2-music.ts",
];
const failures = [];

for (const path of [rosterPath, sourcePath, researchPath, resolverPath, ...talentProfilePaths]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons music contract file: ${path}`);
}
if (failures.length) fail();

const roster = fs.readFileSync(rosterPath, "utf8");
const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const talentProfiles = talentProfilePaths.map((path) => fs.readFileSync(path, "utf8")).join("\n");

const firstTen = [
  { rank: 51, name: "Beyoncé Knowles", iconSlug: "beyonce-knowles", talentSlug: "beyonce", mode: "reuse" },
  { rank: 52, name: "Willie Nelson", iconSlug: "willie-nelson", talentSlug: "willie-nelson", mode: "reuse" },
  { rank: 53, name: "Selena Quintanilla", iconSlug: "selena-quintanilla", talentSlug: "selena", mode: "reuse" },
  { rank: 54, name: "George Strait", iconSlug: "george-strait", talentSlug: "george-strait", mode: "reuse" },
  { rank: 55, name: "Stevie Ray Vaughan", iconSlug: "stevie-ray-vaughan", talentSlug: "stevie-ray-vaughan", mode: "reuse" },
  { rank: 56, name: "Janis Joplin", iconSlug: "janis-joplin", talentSlug: "janis-joplin", mode: "reuse" },
  { rank: 57, name: "Buddy Holly", iconSlug: "buddy-holly", talentSlug: "buddy-holly", mode: "reuse" },
  { rank: 58, name: "ZZ Top", iconSlug: "zz-top", mode: "research" },
  { rank: 59, name: "Waylon Jennings", iconSlug: "waylon-jennings", talentSlug: "waylon-jennings", mode: "reuse" },
  { rank: 60, name: "Scott Joplin", iconSlug: "scott-joplin", mode: "research" },
];

for (const entry of firstTen) {
  if (!source.includes(`${entry.rank},${entry.name},Music & Culture,`)) {
    failures.push(`Music & Culture roster drift at rank ${entry.rank}: expected ${entry.name}.`);
  }
}

const researchEntries = firstTen.filter((entry) => entry.mode === "research");
for (const entry of researchEntries) {
  if (!research.includes(`slug: "${entry.iconSlug}"`)) failures.push(`Missing dedicated music research profile: ${entry.iconSlug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== researchEntries.length) {
  failures.push(`Music batch 1 must contain exactly ${researchEntries.length} researched-staged profiles.`);
}
if ((research.match(/publicationNote:/g) ?? []).length !== researchEntries.length) failures.push("Every music research profile needs a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== researchEntries.length) failures.push("Every music research profile needs a reviewed date.");
const sourceUrls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (sourceUrls.length < researchEntries.length * 3) failures.push(`Music batch 1 needs at least three HTTPS sources per research profile; found ${sourceUrls.length}.`);
for (const domain of ["tshaonline.org", "rockhall.com", "zztop.com", "txculturaltrust.org", "loc.gov"]) {
  if (!research.includes(domain)) failures.push(`Music batch 1 is missing expected authority domain: ${domain}.`);
}
for (const token of [
  "Frank Beard", "August 17, 2026", "intended to continue", "Dusty Hill",
  "exact birthplace remains uncertain", "Texarkana", "Treemonisha", "Maple Leaf Rag",
]) {
  if (!research.includes(token)) failures.push(`Music batch 1 is missing required editorial context: ${token}.`);
}

const reuseEntries = firstTen.filter((entry) => entry.mode === "reuse");
for (const entry of reuseEntries) {
  if (!talentProfiles.includes(`slug: "${entry.talentSlug}"`)) {
    failures.push(`Music rank ${entry.rank} must reuse existing Texas Talent slug ${entry.talentSlug}.`);
  }
  if (research.includes(`slug: "${entry.iconSlug}"`) || research.includes(`slug: "${entry.talentSlug}"`)) {
    failures.push(`Music rank ${entry.rank} ${entry.name} must not gain a duplicate Icons research profile.`);
  }
}

for (const aliasToken of [
  '"Beyoncé Knowles": ["Beyoncé", "Beyonce Knowles", "Beyonce"]',
  '"Selena Quintanilla": ["Selena", "Selena Quintanilla-Pérez", "Selena Quintanilla-Perez"]',
]) {
  if (!roster.includes(aliasToken)) failures.push(`Music duplicate resolution is missing roster alias contract: ${aliasToken}.`);
}

for (const token of [
  'TEXAS_ICON_RESEARCH_MUSIC_BATCH_1',
  'from "@/data/texas-icons-research-music-1.server"',
  '...TEXAS_ICON_RESEARCH_MUSIC_BATCH_1',
]) {
  if (!resolver.includes(token)) failures.push(`Music research resolver wiring missing: ${token}.`);
}
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) {
  failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
}
const stagedResearchBlock = resolver.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!stagedResearchBlock.includes('reuseKind: "icon-research-staged"') || !stagedResearchBlock.includes("indexableAtOwnRoute: false")) {
  failures.push("Music research drafts must remain non-indexable at their own routes.");
}

const coveredFirstTen = new Set(firstTen.map((entry) => entry.iconSlug));
if (coveredFirstTen.size !== 10) failures.push(`Music ranks 51–60 must resolve to ten unique roster slugs; found ${coveredFirstTen.size}.`);
if (reuseEntries.length !== 8 || researchEntries.length !== 2) failures.push(`Music ranks 51–60 must remain eight Talent reuses plus two research profiles; found ${reuseEntries.length} reuse and ${researchEntries.length} research.`);

if (failures.length) fail();
console.log("Texas Icons music validation passed: ranks 51–60 preserve eight Texas Talent reuses, two substantive staged research profiles, alias-safe duplicate resolution, source depth, noindex publication boundaries, and current ZZ Top/Scott Joplin editorial context.");

function fail() {
  console.error("Texas Icons music validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
