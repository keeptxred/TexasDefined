import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-business-3.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Business batch-3 file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const expected = [
  [171, "Jim McIngvale", "jim-mcingvale"],
  [172, "Gene Stallings", "gene-stallings"],
  [173, "Robert Dennard", "robert-dennard"],
  [174, "Gene Kranz", "gene-kranz"],
  [175, "Alan Bean", "alan-bean"],
  [176, "John Young", "john-young"],
  [177, "Bernard Harris", "bernard-harris"],
  [178, "Peggy Whitson", "peggy-whitson"],
  [179, "Tom Slick", "tom-slick"],
  [180, "George Mitchell", "george-mitchell"],
];

for (const [rank, name, slug] of expected) {
  if (!source.includes(`${rank},${name},Business & Science,`)) failures.push(`Business & Science roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Business batch-3 research profile: ${slug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 10) failures.push("Business batch 3 must contain exactly ten researched-staged profiles.");
if ((research.match(/publicationNote:/g) ?? []).length !== 10) failures.push("Every Business batch-3 profile must retain a publication boundary note.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 30) failures.push(`Business batch 3 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < expected.length; i += 1) {
  const slug = expected[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = expected[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Business batch-3 profile ${slug} must retain at least three distinct HTTPS sources.`);
}

for (const token of ["industrial agricultural innovator","one-transistor DRAM","Apollo 13","fourth person to walk on the Moon","born in San Francisco","first African American to perform a spacewalk","695 days","Southwest Research Institute","commercially viable","The Woodlands"]) if (!research.includes(token)) failures.push(`Business batch 3 is missing required accuracy/context token: ${token}.`);
if (!research.includes("intake note incorrectly described Stallings")) failures.push("Gene Stallings profile must explicitly correct the inaccurate intake description.");
if (!research.includes("born in Toledo, Ohio") || !research.includes("born in Iowa") || !research.includes("born in Pennsylvania")) failures.push("Business batch 3 must preserve non-Texas origins for Kranz, Whitson and Slick.");
if (!research.includes("did not invent hydraulic fracturing from scratch")) failures.push("George Mitchell profile must distinguish commercial shale-fracturing development from sole invention mythology.");
for (const domain of ["galleryfurniture.com", "footballfoundation.org", "invent.org", "ibm.com", "nasa.gov", "historycollection.jsc.nasa.gov", "ntrs.nasa.gov", "axiomspace.com", "rice.edu", "swri.org", "tshaonline.org", "tamu.edu"]) if (!research.includes(domain)) failures.push(`Business batch 3 is missing expected authority/source domain: ${domain}.`);

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 10 || new Set(slugs).size !== 10) failures.push(`Business batch 3 must contain exactly 10 unique profile slugs; found ${slugs.length} records and ${new Set(slugs).size} unique.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const slug of slugs) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Business duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);

const symbol = "TEXAS_ICON_RESEARCH_BUSINESS_BATCH_3";
if (!resolver.includes(symbol) || !resolver.includes(`...${symbol}`)) failures.push("Business resolver must register TEXAS_ICON_RESEARCH_BUSINESS_BATCH_3.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes("texasTalentFutureCanonicalPath") || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Business batch 3 must preserve Texas Talent canonical ownership while substantive Icons research publishes at its own canonical route.");

if (failures.length) fail();
console.log("Texas Icons Business & Science batch-3 validation passed: ranks 171-180 contain ten verified publishable narrative profiles with corrected identity/context claims, canonical ownership and duplicate protection.");
function fail() {
  console.error("Texas Icons Business & Science batch-3 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}