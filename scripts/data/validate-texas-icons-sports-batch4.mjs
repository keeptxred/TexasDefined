import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-sports-4.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons sports batch-4 contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const entries = [
  [131, "Mia Hamm", "mia-hamm"],
  [132, "Spud Webb", "spud-webb"],
  [133, "Adrian Peterson", "adrian-peterson"],
  [134, "Von Miller", "von-miller"],
  [135, "Myles Garrett", "myles-garrett"],
  [136, "Scottie Scheffler", "scottie-scheffler"],
  [137, "Jordan Spieth", "jordan-spieth"],
  [138, "Eric Dickerson", "eric-dickerson"],
  [139, "Sammy Baugh", "sammy-baugh"],
  [140, "Doak Walker", "doak-walker"],
];

for (const [rank, name, slug] of entries) {
  if (!source.includes(`${rank},${name},Sports,`)) failures.push(`Sports roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing sports batch-4 research profile: ${slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Sports batch 4 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every sports batch-4 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 10) failures.push("Every sports batch-4 profile must retain a reviewed date.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 30) failures.push(`Sports batch 4 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < entries.length; i += 1) {
  const slug = entries[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = entries[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Sports batch-4 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["Wichita Falls","1986 Slam Dunk Contest","2012 NFL MVP","2026 Dallas Cowboys homecoming","2026 Rams trade","21 PGA Tour wins by August 2026","13 PGA Tour wins through 2026","2,105-yard 1984 season","six NFL passing titles","1948 Heisman Trophy"]) if (!research.includes(token)) failures.push(`Sports batch 4 is missing required editorial context: ${token}.`);
for (const domain of ["usopm.org","nationalsoccerhof.com","nba.com","nfl.com","dallascowboys.com","therams.com","pgatour.com","texaslonghorns.com","profootballhof.com","smumustangs.com","gofrogs.com"]) if (!research.includes(domain)) failures.push(`Sports batch 4 is missing expected authority/source domain: ${domain}.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const [, , slug] of entries) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Sports batch-4 duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);
for (const token of ["TEXAS_ICON_RESEARCH_SPORTS_BATCH_4",'from "@/data/texas-icons-research-sports-4.server"',"...TEXAS_ICON_RESEARCH_SPORTS_BATCH_4"]) if (!resolver.includes(token)) failures.push(`Sports batch-4 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Substantive Sports research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons sports batch-4 validation passed: ranks 131-140 preserve ten substantive sourced research profiles, 2026 current-state context, source depth, future duplicate detection and canonical written-content publication.");
function fail() {
  console.error("Texas Icons sports batch-4 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}