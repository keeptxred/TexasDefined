import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-business-1.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Business batch-1 file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const entries = [
  [151, "Michael Dell", "michael-dell"],
  [152, "Jack Kilby", "jack-kilby"],
  [153, "Howard Hughes", "howard-hughes"],
  [154, "Michael DeBakey", "michael-debakey"],
  [155, "Jerry Jones", "jerry-jones"],
  [156, "Ross Perot", "ross-perot"],
  [157, "H.L. Hunt", "h-l-hunt"],
  [158, "Mary Kay Ash", "mary-kay-ash"],
  [159, "Herb Kelleher", "herb-kelleher"],
  [160, "Tilman Fertitta", "tilman-fertitta"],
];

for (const [rank, name, slug] of entries) {
  if (!source.includes(`${rank},${name},Business & Science,`)) failures.push(`Business & Science roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Business batch-1 research profile: ${slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Business batch 1 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every Business batch-1 profile must retain a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 10) failures.push("Every Business batch-1 profile must retain a reviewed date.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 30) failures.push(`Business batch 1 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < entries.length; i += 1) {
  const slug = entries[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = entries[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Business batch-1 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["University of Texas","for his part in the invention of the integrated circuit","H-1 Racer","roller pump","three Super Bowl championships","Electronic Data Systems","East Texas Oil Field","pink Cadillac","Southwest Airlines","ambassador to Italy and San Marino"]) if (!research.includes(token)) failures.push(`Business batch 1 is missing required editorial context: ${token}.`);
if (!research.includes("born in Los Angeles") || !research.includes("born in New Jersey") || !research.includes("born in Lake Charles")) failures.push("Business batch 1 must preserve non-Texas origins where the Texas connection is adopted or institutional.");
if (!research.includes("2026") || !research.includes("U.S. ambassador to Italy and San Marino")) failures.push("Tilman Fertitta profile must remain explicitly date-stamped through his 2026 diplomatic role.");
for (const domain of ["utexas.edu", "nobelprize.org", "tshaonline.org", "bcm.edu", "dallascowboys.com", "usna.edu", "twu.edu", "southwest.com", "nba.com"]) if (!research.includes(domain)) failures.push(`Business batch 1 is missing expected authority/source domain: ${domain}.`);

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 10 || new Set(slugs).size !== 10) failures.push(`Business batch 1 must contain exactly 10 unique profile slugs; found ${slugs.length} records and ${new Set(slugs).size} unique.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const slug of slugs) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Business duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);

const symbol = "TEXAS_ICON_RESEARCH_BUSINESS_BATCH_1";
if (!resolver.includes(symbol) || !resolver.includes(`...${symbol}`)) failures.push("Business resolver must register TEXAS_ICON_RESEARCH_BUSINESS_BATCH_1.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Substantive Business research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons Business & Science batch-1 validation passed: ranks 151-160 are covered by ten unique substantive sourced research profiles with current-state safeguards, future duplicate detection and canonical written-content publication.");
function fail() {
  console.error("Texas Icons Business & Science batch-1 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}