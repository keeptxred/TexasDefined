import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-history-music.server.ts";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const researchPath = "src/data/texas-icons-research-music-4.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const talentPath = "src/data/texas-talent-profiles-wave3.ts";
const failures = [];

for (const path of [sourcePath, rosterPath, researchPath, resolverPath, talentPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons music batch-4 contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const roster = fs.readFileSync(rosterPath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const talent = fs.readFileSync(talentPath, "utf8");

const entries = [
  { rank: 81, name: "Megan Thee Stallion", slug: "megan-thee-stallion", mode: "reuse" },
  { rank: 82, name: "DJ Screw", slug: "dj-screw", mode: "research" },
  { rank: 83, name: "Bun B", slug: "bun-b", mode: "research" },
  { rank: 84, name: "Pimp C", slug: "pimp-c", mode: "research" },
  { rank: 85, name: "Geto Boys", slug: "geto-boys", mode: "research" },
  { rank: 86, name: "Ray Price", slug: "ray-price", mode: "research" },
  { rank: 87, name: "Flaco Jiménez", slug: "flaco-jimenez", mode: "research" },
  { rank: 88, name: "Lydia Mendoza", slug: "lydia-mendoza", mode: "research" },
  { rank: 89, name: "Freddy Fender", slug: "freddy-fender", mode: "research" },
  { rank: 90, name: "Spoon", slug: "spoon", mode: "research" },
];

for (const entry of entries) {
  if (!source.includes(`${entry.rank},${entry.name},Music & Culture,`)) {
    failures.push(`Music & Culture roster drift at rank ${entry.rank}: expected ${entry.name}.`);
  }
}

const researchEntries = entries.filter((entry) => entry.mode === "research");
const reuseEntries = entries.filter((entry) => entry.mode === "reuse");
if (researchEntries.length !== 9 || reuseEntries.length !== 1) failures.push("Music ranks 81–90 must remain exactly 9 research + 1 Talent reuse.");
for (const entry of researchEntries) if (!research.includes(`slug: "${entry.slug}"`)) failures.push(`Missing music batch-4 research profile: ${entry.slug}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 9) failures.push("Music batch 4 must contain exactly nine researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 9) failures.push("Every music batch-4 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 9) failures.push("Every music batch-4 profile must retain a reviewed date.");

const sourceUrls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (sourceUrls.length < 27) failures.push(`Music batch 4 needs at least three HTTPS sources per profile; found ${sourceUrls.length}.`);
for (const domain of ["tshaonline.org", "uh.edu", "rice.edu", "countrymusichalloffame.org", "arts.gov", "si.edu", "folkways.si.edu", "spoontheband.com"]) if (!research.includes(domain)) failures.push(`Music batch 4 is missing expected authority/source domain: ${domain}.`);
for (const token of ["Screwed Up Click", "Religion and Hip-Hop Culture", "accidental", "Fifth Ward", "Ray Price Beat", "2025", "Mal Hombre", "Before the Next Teardrop Falls", "Austin"]) if (!research.includes(token)) failures.push(`Music batch 4 is missing required editorial context: ${token}.`);

if (!talent.includes('slug: "megan-thee-stallion"')) failures.push("Megan Thee Stallion must continue to reuse the existing Texas Talent profile.");
if (research.includes('slug: "megan-thee-stallion"')) failures.push("Megan Thee Stallion must not gain a duplicate Texas Icons research profile.");
for (const token of ['TEXAS_ICON_RESEARCH_MUSIC_BATCH_4','from "@/data/texas-icons-research-music-4.server"','...TEXAS_ICON_RESEARCH_MUSIC_BATCH_4']) if (!resolver.includes(token)) failures.push(`Music batch-4 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
const researchPublicationBlock = resolver.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!researchPublicationBlock.includes('reuseKind: "icon-research-staged"') || !researchPublicationBlock.includes("indexableAtOwnRoute: true")) failures.push("Substantive music batch-4 research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (!roster.includes('"DJ Screw": ["Robert Earl Davis Jr."]')) failures.push("DJ Screw alias contract must remain present for duplicate-safe matching.");
if (!roster.includes('"Pimp C": ["Chad Butler"]')) failures.push("Pimp C alias contract must remain present for duplicate-safe matching.");
if (failures.length) fail();
console.log("Texas Icons music batch-4 validation passed: ranks 81–90 preserve one Texas Talent reuse, nine substantive sourced research profiles, source depth, duplicate safety and canonical written-content publication.");

function fail() {
  console.error("Texas Icons music batch-4 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}