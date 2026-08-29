import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-sports-2.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons sports batch-2 contract file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const entries = [
  [111, "Babe Didrikson Zaharias", "babe-didrikson-zaharias"],
  [112, "Ben Hogan", "ben-hogan"],
  [113, "Byron Nelson", "byron-nelson"],
  [114, "Lee Trevino", "lee-trevino"],
  [115, "Patrick Mahomes", "patrick-mahomes"],
  [116, "Drew Brees", "drew-brees"],
  [117, "Shaquille O'Neal", "shaquille-o-neal"],
  [118, "David Robinson", "david-robinson"],
  [119, "Dirk Nowitzki", "dirk-nowitzki"],
  [120, "Vince Young", "vince-young"],
];

for (const [rank, name, slug] of entries) {
  if (!source.includes(`${rank},${name},Sports,`)) failures.push(`Sports roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing sports batch-2 research profile: ${slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Sports batch 2 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every sports batch-2 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 10) failures.push("Every sports batch-2 profile must retain a reviewed date.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 30) failures.push(`Sports batch 2 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < entries.length; i += 1) {
  const slug = entries[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = entries[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Sports batch-2 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["1932 Olympic","1950","1949","11 consecutive","Marine Corps","2026 season","2026 Pro Football Hall of Fame","San Antonio","Naval Academy","21 seasons","41-38"]) if (!research.includes(token)) failures.push(`Sports batch 2 is missing required editorial context: ${token}.`);
for (const domain of ["lpga.com","worldgolfhalloffame.org","texasgolfhof.org","tshaonline.org","chiefs.com","texastech.com","purduesports.com","profootballhof.com","hoophall.com","navysports.com","nba.com","texaslonghorns.com"]) if (!research.includes(domain)) failures.push(`Sports batch 2 is missing expected authority/source domain: ${domain}.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const [, , slug] of entries) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Sports batch-2 duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);
for (const token of ['TEXAS_ICON_RESEARCH_SPORTS_BATCH_2','from "@/data/texas-icons-research-sports-2.server"','...TEXAS_ICON_RESEARCH_SPORTS_BATCH_2']) if (!resolver.includes(token)) failures.push(`Sports batch-2 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes("texasTalentFutureCanonicalPath") || !resolver.includes("canonical owner")) failures.push("Sports reconciliation must preserve Texas Talent future canonical ownership from the launch-metadata contract.");
if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Substantive Sports research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons sports batch-2 validation passed: ranks 111-120 preserve ten substantive sourced research profiles, distinct source depth, Talent canonical ownership, future duplicate detection and canonical written-content publication.");
function fail() {
  console.error("Texas Icons sports batch-2 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}