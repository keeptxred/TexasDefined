import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-business-2.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Business batch-2 file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const researched = [
  [161, "Mark Cuban", "mark-cuban"],
  [162, "T. Boone Pickens", "t-boone-pickens"],
  [163, "Denton Cooley", "denton-cooley"],
  [165, "Anthony Lucas", "anthony-lucas"],
  [166, "Robert McNair", "robert-mcnair"],
  [167, "Lamar Hunt", "lamar-hunt"],
  [169, "Ebby Halliday", "ebby-halliday"],
  [170, "Rex Tillerson", "rex-tillerson"],
];
const unresolved = [
  [164, "John Crump", "john-crump"],
  [168, "Burt 'Buddy' Crump", "burt-buddy-crump"],
];

for (const [rank, name, slug] of researched) {
  if (!source.includes(`${rank},${name},Business & Science,`)) failures.push(`Business & Science roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing verified Business batch-2 research profile: ${slug}.`);
}
for (const [rank, name, slug] of unresolved) {
  if (!source.includes(`${rank},${name},Business & Science,`)) failures.push(`Business & Science unresolved roster drift at rank ${rank}: expected ${name}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Unverified intake identity ${slug} must remain a roster-only starter until authoritative identity evidence is resolved.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 8) failures.push("Business batch 2 must contain exactly eight researched-staged profiles and leave the two unresolved Crump rows as starters.");
if ((research.match(/publicationNote:/g) ?? []).length !== 8) failures.push("Every researched Business batch-2 profile must retain a publication boundary note.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 24) failures.push(`Business batch 2 needs at least three HTTPS sources per verified profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Business batch-2 profile ${slug} must retain at least three distinct HTTPS sources.`);
}

for (const token of ["27 percent","Mesa Petroleum","total artificial heart","Spindletop","Houston NFL Holdings","American Football League","1945","69th U.S. secretary of state"]) if (!research.includes(token)) failures.push(`Business batch 2 is missing required editorial context: ${token}.`);
if (!research.includes("born in Tampa, Florida") || !research.includes("born in El Dorado, Arkansas") || !research.includes("born Vera Lucille Koch in Arkansas")) failures.push("Business batch 2 must preserve non-Texas origins where Texas identity was adopted later.");
for (const domain of ["nba.com", "tshaonline.org", "utsouthwestern.edu", "texasheart.org", "houstontexans.com", "profootballhof.com", "dallasisd.org", "ebby.com", "utexas.edu", "mcc.gov"]) if (!research.includes(domain)) failures.push(`Business batch 2 is missing expected authority/source domain: ${domain}.`);

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 8 || new Set(slugs).size !== 8) failures.push(`Business batch 2 must contain exactly 8 unique verified profile slugs; found ${slugs.length} records and ${new Set(slugs).size} unique.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const slug of slugs) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Business duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);

const symbol = "TEXAS_ICON_RESEARCH_BUSINESS_BATCH_2";
if (!resolver.includes(symbol) || !resolver.includes(`...${symbol}`)) failures.push("Business resolver must register TEXAS_ICON_RESEARCH_BUSINESS_BATCH_2.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Verified substantive Business research profiles must publish at their canonical Texas Icons routes while unresolved/data-only starters remain withheld.");

if (failures.length) fail();
console.log("Texas Icons Business & Science batch-2 validation passed: ranks 161-170 contain eight verified publishable narrative profiles while John Crump and Burt 'Buddy' Crump remain explicitly unresolved roster-only starters.");
function fail() {
  console.error("Texas Icons Business & Science batch-2 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}