import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-sports-3.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons sports batch-3 contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const entries = [
  [121, "Deion Sanders", "deion-sanders"],
  [122, "Bob Lilly", "bob-lilly"],
  [123, "JJ Watt", "jj-watt"],
  [124, "Andre Johnson", "andre-johnson"],
  [125, "Craig Biggio", "craig-biggio"],
  [126, "Jeff Bagwell", "jeff-bagwell"],
  [127, "José Altuve", "jose-altuve"],
  [128, "Justin Verlander", "justin-verlander"],
  [129, "Michael Johnson", "michael-johnson"],
  [130, "Sheryl Swoopes", "sheryl-swoopes"],
];

for (const [rank, name, slug] of entries) {
  if (!source.includes(`${rank},${name},Sports,`)) failures.push(`Sports roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing sports batch-3 research profile: ${slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Sports batch 3 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every sports batch-3 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 10) failures.push("Every sports batch-3 profile must retain a reviewed date.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 30) failures.push(`Sports batch 3 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < entries.length; i += 1) {
  const slug = entries[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = entries[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Sports batch-3 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["Super Bowl XXX","Cowboys first draft pick","more than $41 million","2024 Pro Football Hall of Fame","3,060 hits","449 home runs","sign-stealing","retire at season's end","four Olympic gold medals","first player signed by the WNBA"]) if (!research.includes(token)) failures.push(`Sports batch 3 is missing required editorial context: ${token}.`);
for (const domain of ["profootballhof.com","dallascowboys.com","baseballhall.org","houstontexans.com","mlb.com","worldathletics.org","baylorbears.com","hoophall.com","wnba.com","texastech.com"]) if (!research.includes(domain)) failures.push(`Sports batch 3 is missing expected authority/source domain: ${domain}.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const [, , slug] of entries) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Sports batch-3 duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);
for (const token of ["TEXAS_ICON_RESEARCH_SPORTS_BATCH_3",'from "@/data/texas-icons-research-sports-3.server"',"...TEXAS_ICON_RESEARCH_SPORTS_BATCH_3"]) if (!resolver.includes(token)) failures.push(`Sports batch-3 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Substantive Sports research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons sports batch-3 validation passed: ranks 121-130 preserve ten substantive sourced research profiles, distinct authority sources, corrected 2026 context, future duplicate detection and canonical written-content publication.");
function fail() {
  console.error("Texas Icons sports batch-3 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}