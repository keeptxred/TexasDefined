import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const sportsPaths = [1, 2, 3, 4, 5].map((n) => `src/data/texas-icons-research-sports-${n}.server.ts`);
const researchPath = sportsPaths[4];
const failures = [];
for (const path of [sourcePath, resolverPath, ...sportsPaths]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Sports completion file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const sportsResearch = sportsPaths.map((path) => fs.readFileSync(path, "utf8")).join("\n");
const entries = [
  [141, "Dat Nguyen", "dat-nguyen"],
  [142, "Kamaru Usman", "kamaru-usman"],
  [143, "Derrick Lewis", "derrick-lewis"],
  [144, "AJ Foyt", "aj-foyt"],
  [145, "Carroll Shelby", "carroll-shelby"],
  [146, "Lance Armstrong", "lance-armstrong"],
  [147, "Chris Simms", "chris-simms"],
  [148, "Colt McCoy", "colt-mccoy"],
  [149, "Dusty Baker", "dusty-baker"],
  [150, "Gregg Popovich", "gregg-popovich"],
];

for (const [rank, name, slug] of entries) {
  if (!source.includes(`${rank},${name},Sports,`)) failures.push(`Sports roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Sports batch-5 research profile: ${slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Sports batch 5 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every Sports batch-5 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 10) failures.push("Every Sports batch-5 profile must retain a reviewed date.");
if ((research.match(/remains noindex pending image-rights and internal-link certification/g) ?? []).length !== 10) failures.push("Every Sports batch-5 profile must explicitly retain the noindex/image-rights/internal-link boundary.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 30) failures.push(`Sports batch 5 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < entries.length; i += 1) {
  const slug = entries[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = entries[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Sports batch-5 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of [
  "Arkansas-born and Rockport-raised",
  "2026 middleweight campaign",
  "UFC career knockout record",
  "four Indianapolis 500 wins",
  "Shelby Cobra",
  "2012 USADA lifetime ban",
  "NBC Sports analyst",
  "retires from the NFL and joins NBC Sports",
  "2022 World Series championship",
  "president of basketball operations",
]) {
  if (!research.includes(token)) failures.push(`Sports batch 5 is missing required editorial context: ${token}.`);
}
for (const domain of ["12thman.com", "ufc.com", "indycar.com", "automotivehalloffame.org", "usada.org", "nbcsports.com", "texaslonghorns.com", "mlb.com", "nba.com", "hoophall.com"]) {
  if (!research.includes(domain)) failures.push(`Sports batch 5 is missing expected authority/source domain: ${domain}.`);
}

const allSportsSlugs = [...sportsResearch.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (allSportsSlugs.length !== 50) failures.push(`Sports research must contain exactly 50 profile records; found ${allSportsSlugs.length}.`);
if (new Set(allSportsSlugs).size !== 50) failures.push("Sports research must contain exactly 50 unique profile slugs.");
const rosterSportsRows = [...source.matchAll(/^(\d+),([^,]+),Sports,/gm)].filter((match) => Number(match[1]) >= 101 && Number(match[1]) <= 150);
if (rosterSportsRows.length !== 50) failures.push(`Sports source roster must contain exactly ranks 101-150; found ${rosterSportsRows.length} rows.`);

const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const slug of allSportsSlugs) {
  if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Sports duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);
}
for (let n = 1; n <= 5; n += 1) {
  const symbol = `TEXAS_ICON_RESEARCH_SPORTS_BATCH_${n}`;
  if (!resolver.includes(symbol) || !resolver.includes(`...${symbol}`)) failures.push(`Sports resolver must register ${symbol}.`);
}
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: false")) failures.push("Sports research drafts must remain non-indexable at their own routes.");

if (failures.length) fail();
console.log("Texas Icons Sports completion validation passed: ranks 101-150 are covered by exactly 50 unique staged research profiles with source depth, future duplicate detection and noindex publication boundaries.");

function fail() {
  console.error("Texas Icons Sports completion validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
