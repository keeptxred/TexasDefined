import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-media-1.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Media batch-1 file: ${path}`);
}
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const entries = [
  { rank: 191, name: "Matthew McConaughey", slug: "matthew-mcconaughey", mode: "reuse" },
  { rank: 192, name: "Walter Cronkite", slug: "walter-cronkite", mode: "research" },
  { rank: 193, name: "Tommy Lee Jones", slug: "tommy-lee-jones", mode: "reuse" },
  { rank: 194, name: "Jamie Foxx", slug: "jamie-foxx", mode: "reuse" },
  { rank: 195, name: "Woody Harrelson", slug: "woody-harrelson", mode: "reuse" },
  { rank: 196, name: "Patrick Swayze", slug: "patrick-swayze", mode: "research" },
  { rank: 197, name: "Owen Wilson", slug: "owen-wilson", mode: "research" },
  { rank: 198, name: "Luke Wilson", slug: "luke-wilson", mode: "research" },
  { rank: 199, name: "Ethan Hawke", slug: "ethan-hawke", mode: "reuse" },
  { rank: 200, name: "Renée Zellweger", slug: "renee-zellweger", mode: "reuse" },
];

for (const entry of entries) if (!source.includes(`${entry.rank},${entry.name},Media & Arts,`)) failures.push(`Media & Arts roster drift at rank ${entry.rank}: expected ${entry.name}.`);
const researchEntries = entries.filter((entry) => entry.mode === "research");
const reuseEntries = entries.filter((entry) => entry.mode === "reuse");
if (researchEntries.length !== 4 || reuseEntries.length !== 6) failures.push("Media ranks 191-200 must remain exactly 4 Icons research profiles + 6 Texas Talent reuses.");
for (const entry of researchEntries) if (!research.includes(`slug: "${entry.slug}"`)) failures.push(`Missing Media batch-1 research profile: ${entry.slug}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 4) failures.push("Media batch 1 must contain exactly four researched-staged profiles.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 4) failures.push("Every Media batch-1 research profile must retain the shared publication boundary.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== 4) failures.push("Every Media batch-1 research profile must retain a reviewed date.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 12) failures.push(`Media batch 1 needs at least three HTTPS sources per research profile; found ${urls.length}.`);
for (const entry of researchEntries) {
  const start = research.indexOf(`slug: "${entry.slug}"`);
  const next = researchEntries[researchEntries.indexOf(entry) + 1];
  const end = next ? research.indexOf(`slug: "${next.slug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Media batch-1 profile ${entry.slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["born in St. Joseph, Missouri","Houston Press","San Jacinto College","Dirty Dancing","University of Texas at Austin","The Royal Tenenbaums","St. Mark's School of Texas","Bottle Rocket"]) if (!research.includes(token)) failures.push(`Media batch 1 is missing required accuracy/context token: ${token}.`);
for (const domain of ["utexas.edu", "utpress.utexas.edu", "walkoffame.com", "biography.com", "sanjac.edu", "oscars.org", "dallaslibrary2.org", "austinchronicle.com", "offcamera.vhx.tv"]) if (!research.includes(domain)) failures.push(`Media batch 1 is missing expected authority/source domain: ${domain}.`);

const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name) || name === "texas-talent.ts");
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const entry of reuseEntries) {
  if (!talentSource.includes(`slug: "${entry.slug}"`)) failures.push(`${entry.slug} must continue to reuse an existing Texas Talent record.`);
  if (research.includes(`slug: "${entry.slug}"`)) failures.push(`${entry.slug} must not gain a duplicate Texas Icons research profile.`);
}
for (const entry of researchEntries) if (talentSource.includes(`slug: "${entry.slug}"`)) failures.push(`${entry.slug} now exists in Texas Talent and must be reconciled instead of duplicated in Media research.`);

for (const token of ["TEXAS_ICON_RESEARCH_MEDIA_BATCH_1",'from "@/data/texas-icons-research-media-1.server"',"...TEXAS_ICON_RESEARCH_MEDIA_BATCH_1"]) if (!resolver.includes(token)) failures.push(`Media batch-1 resolver wiring missing: ${token}.`);
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
const researchBlock = resolver.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!researchBlock.includes('reuseKind: "icon-research-staged"') || !researchBlock.includes("indexableAtOwnRoute: true")) failures.push("Substantive Media research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");

if (failures.length) fail();
console.log("Texas Icons Media & Arts batch-1 validation passed: ranks 191-200 preserve six Texas Talent reuses, four substantive sourced research profiles, source depth, duplicate safety and canonical written-content publication.");
function fail() {
  console.error("Texas Icons Media & Arts batch-1 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}