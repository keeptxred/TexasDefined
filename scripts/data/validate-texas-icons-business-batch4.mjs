import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-sports-business.server.ts";
const researchPath = "src/data/texas-icons-research-business-4.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Business batch-4 file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const researched = [
  [181, "Boz Scaggs", "boz-scaggs"],
  [184, "Red McCombs", "red-mccombs"],
  [185, "Lowry Mays", "lowry-mays"],
  [186, "William Marsh Rice", "william-marsh-rice"],
  [187, "George W. Brackenridge", "george-w-brackenridge"],
  [189, "Walter Splawn", "walter-splawn"],
  [190, "Harry Huntt Ransom", "harry-huntt-ransom"],
];
const unresolved = [
  [182, "Cyrus Vance", "cyrus-vance"],
  [183, "James Truett", "james-truett"],
  [188, "Margarita Salas", "margarita-salas"],
];

for (const [rank, name, slug] of researched) {
  if (!source.includes(`${rank},${name},Business & Science,`)) failures.push(`Business & Science roster drift at rank ${rank}: expected ${name}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing verified Business batch-4 research profile: ${slug}.`);
}
for (const [rank, name, slug] of unresolved) {
  if (!source.includes(`${rank},${name},Business & Science,`)) failures.push(`Business & Science unresolved roster drift at rank ${rank}: expected ${name}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Unverified intake row ${slug} must remain a roster-only starter until authoritative Texas identity evidence is resolved.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 7) failures.push("Business batch 4 must contain exactly seven researched-staged profiles and leave three unresolved roster rows as starters.");
if ((research.match(/publicationNote:/g) ?? []).length !== 7) failures.push("Every researched Business batch-4 profile must retain a publication boundary note.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 21) failures.push(`Business batch 4 needs at least three HTTPS sources per verified profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Business batch-4 profile ${slug} must retain at least three distinct HTTPS sources.`);
}

for (const token of ["misclassifies Boz Scaggs","not a Plano technology inventor","Clear Channel Communications","Mays Business School","owned enslaved people","Union","Communications Act of 1934","Humanities Research Center"]) if (!research.includes(token)) failures.push(`Business batch 4 is missing required accuracy/context token: ${token}.`);
if (!research.includes("born in Canton, Ohio") || !research.includes("born in Springfield, Massachusetts") || !research.includes("born in Indiana")) failures.push("Business batch 4 must preserve non-Texas origins for Scaggs, Rice and Brackenridge.");
for (const domain of ["bozscaggs.com", "yamaha.com", "mccombs.utexas.edu", "texaslonghorns.com", "tamu.edu", "rice.edu", "tshaonline.org", "utpress.utexas.edu", "sa.gov", "president.utexas.edu", "hrc.utexas.edu"]) if (!research.includes(domain)) failures.push(`Business batch 4 is missing expected authority/source domain: ${domain}.`);

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 7 || new Set(slugs).size !== 7) failures.push(`Business batch 4 must contain exactly 7 unique verified profile slugs; found ${slugs.length} records and ${new Set(slugs).size} unique.`);
const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name));
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const slug of slugs) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`Business duplicate detected: ${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);

const symbol = "TEXAS_ICON_RESEARCH_BUSINESS_BATCH_4";
if (!resolver.includes(symbol) || !resolver.includes(`...${symbol}`)) failures.push("Business resolver must register TEXAS_ICON_RESEARCH_BUSINESS_BATCH_4.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
if (!resolver.includes("texasTalentFutureCanonicalPath") || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Business batch 4 must preserve Texas Talent canonical ownership while verified substantive Icons research publishes at its own canonical route.");

if (failures.length) fail();
console.log("Texas Icons Business & Science batch-4 validation passed: ranks 181-190 contain seven verified publishable narrative profiles while Cyrus Vance, James Truett and Margarita Salas remain explicit unresolved roster-only starters.");
function fail() {
  console.error("Texas Icons Business & Science batch-4 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}