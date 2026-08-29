import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-history-music.server.ts";
const researchPath = "src/data/texas-icons-research-music-5.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const talentPath = "src/data/texas-talent-profiles-wave2-music.ts";
const failures = [];

for (const path of [sourcePath, researchPath, resolverPath, talentPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons music batch-5 contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const talent = fs.readFileSync(talentPath, "utf8");

const entries = [
  { rank: 91, name: "Leon Bridges", slug: "leon-bridges", mode: "reuse" },
  { rank: 92, name: "Khruangbin", slug: "khruangbin", mode: "research" },
  { rank: 93, name: "Gary Clark Jr.", slug: "gary-clark-jr", mode: "research" },
  { rank: 94, name: "Cody Johnson", slug: "cody-johnson", mode: "research" },
  { rank: 95, name: "Aaron Watson", slug: "aaron-watson", mode: "research" },
  { rank: 96, name: "Asleep at the Wheel", slug: "asleep-at-the-wheel", mode: "research" },
  { rank: 97, name: "The Chicks", slug: "the-chicks", mode: "research" },
  { rank: 98, name: "Pantera", slug: "pantera", mode: "research" },
  { rank: 99, name: "Erykah Badu", slug: "erykah-badu", mode: "reuse" },
  { rank: 100, name: "Vanilla Ice", slug: "vanilla-ice", mode: "research" },
];

for (const entry of entries) if (!source.includes(`${entry.rank},${entry.name},Music & Culture,`)) failures.push(`Music & Culture roster drift at rank ${entry.rank}: expected ${entry.name}.`);
const researchEntries = entries.filter((entry) => entry.mode === "research");
const reuseEntries = entries.filter((entry) => entry.mode === "reuse");
if (researchEntries.length !== 8 || reuseEntries.length !== 2) failures.push("Music ranks 91–100 must remain exactly 8 research + 2 Texas Talent reuses.");
for (const entry of researchEntries) if (!research.includes(`slug: "${entry.slug}"`)) failures.push(`Missing music batch-5 research profile: ${entry.slug}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 8) failures.push("Music batch 5 must contain exactly eight researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 8) failures.push("Every music batch-5 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 8) failures.push("Every music batch-5 profile must retain a reviewed date.");

const sourceUrls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (sourceUrls.length < 24) failures.push(`Music batch 5 needs at least three HTTPS sources per research profile; found ${sourceUrls.length}.`);
for (const domain of ["grammy.com","rodeohouston.com","codyjohnsonmusic.com","aaronwatson.com","asleepatthewheel.com","allmusic.com","biography.com","washingtonpost.com","latimes.com"]) if (!research.includes(domain)) failures.push(`Music batch 5 is missing expected authority/source domain: ${domain}.`);
for (const token of ["Thai funk","Antone's","80,203","The Underdog","Paw Paw","2003","glam","fabricated","Carrollton"]) if (!research.includes(token)) failures.push(`Music batch 5 is missing required editorial context: ${token}.`);
for (const slug of ["leon-bridges", "erykah-badu"]) {
  if (!talent.includes(`slug: "${slug}"`)) failures.push(`${slug} must continue to reuse the existing Texas Talent profile.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`${slug} must not gain a duplicate Texas Icons research profile.`);
}
for (const token of ["TEXAS_ICON_RESEARCH_MUSIC_BATCH_5",'from "@/data/texas-icons-research-music-5.server"',"...TEXAS_ICON_RESEARCH_MUSIC_BATCH_5"]) if (!resolver.includes(token)) failures.push(`Music batch-5 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
const researchPublicationBlock = resolver.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!researchPublicationBlock.includes('reuseKind: "icon-research-staged"') || !researchPublicationBlock.includes("indexableAtOwnRoute: true")) failures.push("Substantive music batch-5 research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons music batch-5 validation passed: ranks 91–100 preserve two Texas Talent reuses, eight substantive sourced research profiles, source depth, factual nuance, duplicate safety and canonical written-content publication.");
function fail() {
  console.error("Texas Icons music batch-5 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}