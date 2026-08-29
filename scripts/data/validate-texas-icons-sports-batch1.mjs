import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-sports-1.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const failures = [];

for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons sports batch-1 contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const entries = [
  { rank: 101, name: "Nolan Ryan", slug: "nolan-ryan" },
  { rank: 102, name: "Simone Biles", slug: "simone-biles" },
  { rank: 103, name: "Tom Landry", slug: "tom-landry" },
  { rank: 104, name: "Earl Campbell", slug: "earl-campbell" },
  { rank: 105, name: "Emmitt Smith", slug: "emmitt-smith" },
  { rank: 106, name: "Troy Aikman", slug: "troy-aikman" },
  { rank: 107, name: "Roger Staubach", slug: "roger-staubach" },
  { rank: 108, name: "Hakeem Olajuwon", slug: "hakeem-olajuwon" },
  { rank: 109, name: "Tim Duncan", slug: "tim-duncan" },
  { rank: 110, name: "George Foreman", slug: "george-foreman" },
];

for (const entry of entries) {
  if (!source.includes(`${entry.rank},${entry.name},Sports,`)) failures.push(`Sports roster drift at rank ${entry.rank}: expected ${entry.name}.`);
  if (!research.includes(`slug: "${entry.slug}"`)) failures.push(`Missing Sports batch-1 research profile: ${entry.slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Sports batch 1 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every Sports batch-1 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 10) failures.push("Every Sports batch-1 profile must retain a reviewed date.");

const sourceUrls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (sourceUrls.length < 30) failures.push(`Sports batch 1 needs at least three HTTPS sources per profile; found ${sourceUrls.length}.`);
for (const domain of ["baseballhall.org","usagym.org","profootballhof.com","tshaonline.org","heisman.com","texaslonghorns.com","hoophall.com","nba.com","ibhof.com","houstonchronicle.com"]) if (!research.includes(domain)) failures.push(`Sports batch 1 is missing expected authority/source domain: ${domain}.`);
for (const token of ["5,714","Spring","flex defense","Tyler Rose","18,355","Oklahoma","Vietnam","Lagos","St. Croix","age 45"]) if (!research.includes(token)) failures.push(`Sports batch 1 is missing required editorial context: ${token}.`);

const talentFiles = fs.readdirSync("src/data")
  .filter((name) => /^texas-talent-profiles.*\.ts$/.test(name))
  .map((name) => [name, fs.readFileSync(`src/data/${name}`, "utf8")]);
for (const entry of entries) {
  for (const [name, talentSource] of talentFiles) {
    if (talentSource.includes(`slug: "${entry.slug}"`)) failures.push(`${entry.slug} now exists in ${name}; reconcile to Texas Talent reuse instead of keeping a duplicate Sports research profile.`);
  }
}
for (const token of ["TEXAS_ICON_RESEARCH_SPORTS_BATCH_1",'from "@/data/texas-icons-research-sports-1.server"',"...TEXAS_ICON_RESEARCH_SPORTS_BATCH_1"]) if (!resolver.includes(token)) failures.push(`Sports batch-1 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
const researchPublicationBlock = resolver.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!researchPublicationBlock.includes('reuseKind: "icon-research-staged"') || !researchPublicationBlock.includes("indexableAtOwnRoute: true")) failures.push("Substantive Sports batch-1 research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons Sports batch-1 validation passed: ranks 101–110 contain ten substantive sourced research profiles, no Texas Talent duplicates, source depth, factual Texas framing and canonical written-content publication.");
function fail() {
  console.error("Texas Icons Sports batch-1 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}