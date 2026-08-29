import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-media-4.server.ts";
const correctionsPath = "src/data/texas-icons-roster-corrections.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, correctionsPath, resolverPath]) if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Media batch-4 file: ${path}`);
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const corrections = fs.readFileSync(correctionsPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const researched = [
  [221, "Tex Avery", "tex-avery"],
  [222, "Gene Roddenberry", "gene-roddenberry"],
  [224, "Mike Judge", "mike-judge"],
  [225, "Alex Jones", "alex-jones"],
];
for (const [rank, name] of researched) if (!source.includes(`${rank},${name},Media & Arts,`)) failures.push(`Media & Arts roster drift at rank ${rank}: expected ${name}.`);
if (!source.includes("223,Trey Parker,Media & Arts,")) failures.push("Rank 223 raw Trey Parker intake row must remain auditable as provenance.");
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Media batch-4 research profile: ${slug}.`);
if (research.includes('slug: "trey-parker"')) failures.push("No Texas research profile may be fabricated for Colorado-born Trey Parker.");
for (const token of [
  "sourceRank: 223",
  'sourceName: "Trey Parker"',
  'replacementName: "Matt Stone"',
  'replacementSlug: "matt-stone"',
  'slug: "matt-stone"',
  "Houston, Texas",
  "Television Academy Hall of Fame",
  "indexableAtOwnRoute: true",
]) if (!corrections.includes(token)) failures.push(`Media rank-223 correction missing required provenance/publication token: ${token}.`);

const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name) || name === "texas-talent.ts");
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const [, , slug] of researched) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);
if (talentSource.includes('slug: "matt-stone"')) failures.push("Matt Stone now exists in Texas Talent and must be reconciled instead of duplicated by the correction layer.");

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 4 || new Set(slugs).size !== 4) failures.push(`Media batch 4 base research file must contain exactly 4 unique profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 4) failures.push("Media batch 4 must retain four traceable research-workflow records.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 4) failures.push("Every Media batch-4 base profile must retain its legacy research-workflow note.");
if (!research.includes("remains noindex pending image-rights and internal-link certification")) failures.push("Media batch 4 must retain its historical research-workflow boundary note as provenance; runtime publication is validated separately.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 12) failures.push(`Media batch 4 needs at least three HTTPS sources per base profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = research.slice(start, end > start ? end : research.length);
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Media profile ${slug} must retain at least three distinct HTTPS sources.`);
}
const correctionUrls = [...corrections.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (new Set(correctionUrls).size < 4) failures.push(`Matt Stone correction research must retain at least four distinct HTTPS sources; found ${new Set(correctionUrls).size}.`);

for (const token of [
  "born in Taylor, Texas",
  "White Rock Lake",
  "born in El Paso, Texas",
  "born in Guayaquil, Ecuador",
  "born in Dallas in 1974",
  "Sandy Hook",
  "August 2026",
  "Connecticut liability remains above $1 billion",
]) if (!research.includes(token)) failures.push(`Media batch 4 is missing accuracy/context token: ${token}.`);

const symbol = "TEXAS_ICON_RESEARCH_MEDIA_BATCH_4";
if (!resolver.includes(`from "@/data/texas-icons-research-media-4.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Media resolver must import and register base batch 4 before merge.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Media research.");
const starterPrecedence = resolver.indexOf("\n  return {", researchPrecedence);
const researchBlock = researchPrecedence >= 0 && starterPrecedence > researchPrecedence ? resolver.slice(researchPrecedence, starterPrecedence) : "";
if (!resolver.includes("texasTalentFutureCanonicalPath") || !researchBlock.includes("indexableAtOwnRoute: true")) failures.push("Media batch 4 must preserve canonical ownership while publishing completed Icons narratives.");

if (failures.length) fail();
console.log("Texas Icons Media & Arts batch-4 validation passed: ranks 221-225 retain four sourced narrative profiles plus an explicit provenance-preserving correction of rank 223 to published Houston-born Matt Stone; completed written profiles publish while canonical ownership remains guarded.");
function fail() { console.error("Texas Icons Media & Arts batch-4 validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
