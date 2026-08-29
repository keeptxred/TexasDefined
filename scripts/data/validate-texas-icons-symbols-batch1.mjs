import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-symbols-1.server.ts";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const failures = [];
for (const path of [sourcePath, researchPath, rosterPath, resolverPath]) if (!fs.existsSync(path)) failures.push(`Missing Symbols & Food batch-1 file: ${path}`);
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const roster = fs.readFileSync(rosterPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const researched = [[228, "Whataburger", "whataburger"],[230, "Big Tex", "big-tex"],[231, "Texas Longhorn", "texas-longhorn"],[232, "Shiner Bock", "shiner-bock"]];
const canonical = [[226, "The Alamo", "/destination/the-alamo", "the-alamo"],[227, "Buc-ee's", "/article/bucees-texas-road-trip-history", "buc-ees"],[229, "H-E-B", "/article/heb-texas-grocery-history-culture", "h-e-b"],[233, "Dr Pepper", "/dr-pepper-texas-history", "dr-pepper"],[234, "Blue Bell Ice Cream", "/article/blue-bell-ice-cream-brenham-texas-history", "blue-bell-ice-cream"],[235, "Chili Con Carne", "/texas-chili-con-carne-history", "chili-con-carne"]];

for (const [rank, name] of [...researched, ...canonical]) if (!source.includes(`${rank},${name},Symbols & Food,`)) failures.push(`Symbols & Food roster drift at rank ${rank}: expected ${name}.`);
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Symbols & Food research profile: ${slug}.`);
for (const [, name, path, slug] of canonical) {
  if (!roster.includes(`"${name}": "${path}"`)) failures.push(`Canonical reuse missing for ${name}: ${path}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Duplicate research forbidden for canonical subject ${name}.`);
}

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 4 || new Set(slugs).size !== 4) failures.push(`Symbols batch 1 must contain exactly 4 unique research profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 4) failures.push("Symbols batch 1 must retain all four substantive research profiles.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 4) failures.push("Every Symbols batch-1 profile must retain the publication note.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 12) failures.push(`Symbols batch 1 needs at least three HTTPS sources per researched profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Symbols batch-1 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["August 8, 1950","Corpus Christi","1952","October 19, 2012","Kerens","official large state mammal","1995","1909","Shiner, Texas"]) if (!research.includes(token)) failures.push(`Symbols batch 1 is missing required accuracy/context token: ${token}.`);

const symbol = "TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_1";
if (!resolver.includes(`from "@/data/texas-icons-research-symbols-1.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Symbols resolver must import and register batch 1 before merge.");
const canonicalPrecedence = resolver.indexOf("if (entry.canonicalPath)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (canonicalPrecedence < 0 || researchPrecedence < 0 || canonicalPrecedence > researchPrecedence) failures.push("Explicit canonical routes must continue to resolve before Symbols research.");
if (!resolver.includes("indexableAtOwnRoute: true")) failures.push("Substantive Symbols research profiles must publish at their canonical Texas Icons routes while existing canonical owners continue to win.");

if (failures.length) fail();
console.log("Texas Icons Symbols & Food batch-1 validation passed: ranks 226-235 use six existing canonical owners and four substantive sourced research profiles with no duplicate authority pages.");
function fail() { console.error("Texas Icons Symbols & Food batch-1 validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }