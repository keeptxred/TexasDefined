import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-media-2.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Media batch-2 file: ${path}`);
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const researched = [[207, "Dan Rather", "dan-rather"],[208, "Bill Moyers", "bill-moyers"]];
const reused = [[201, "Eva Longoria", "eva-longoria"],[202, "Carol Burnett", "carol-burnett"],[203, "Steve Martin", "steve-martin"],[204, "Larry McMurtry", "larry-mcmurtry"],[205, "Cormac McCarthy", "cormac-mccarthy"],[206, "Katherine Anne Porter", "katherine-anne-porter"],[209, "Robert Rodriguez", "robert-rodriguez"],[210, "Richard Linklater", "richard-linklater"]];
for (const [rank, name] of [...researched, ...reused]) if (!source.includes(`${rank},${name},Media & Arts,`)) failures.push(`Media & Arts roster drift at rank ${rank}: expected ${name}.`);
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Media batch-2 research profile: ${slug}.`);

const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name) || name === "texas-talent.ts");
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const [, , slug] of reused) {
  if (!talentSource.includes(`slug: "${slug}"`)) failures.push(`Expected Texas Talent reuse is missing: ${slug}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Media duplicate detected: ${slug} must reuse Texas Talent.`);
}
for (const [, , slug] of researched) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 2 || new Set(slugs).size !== 2) failures.push(`Media batch 2 must contain exactly 2 unique research profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 2) failures.push("Media batch 2 must retain both substantive research profiles.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 2) failures.push("Every Media batch-2 profile must retain the publication note.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 6) failures.push(`Media batch 2 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (const [,, slug] of researched) {
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched.find((entry) => entry[2] !== slug && research.indexOf(`slug: "${entry[2]}"`) > start)?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = research.slice(start, end > start ? end : research.length);
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Media profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["born in Wharton in 1931", "Houston Heights", "Hurricane Carla", "grew up in Marshall, Texas", "University of Texas at Austin", "White House"]) if (!research.includes(token)) failures.push(`Media batch 2 is missing accuracy/context token: ${token}.`);
const symbol = "TEXAS_ICON_RESEARCH_MEDIA_BATCH_2";
if (!resolver.includes(`from "@/data/texas-icons-research-media-2.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Media resolver must import and register batch 2.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Media research.");
if (!resolver.includes("texasTalentFutureCanonicalPath") || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Media batch 2 must preserve canonical ownership while substantive Icons narratives publish at their canonical routes.");

if (failures.length) fail();
console.log("Texas Icons Media & Arts batch-2 validation passed: ranks 201-210 are covered exactly once by eight Texas Talent reuses and two substantive publishable research profiles.");
function fail() { console.error("Texas Icons Media & Arts batch-2 validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }