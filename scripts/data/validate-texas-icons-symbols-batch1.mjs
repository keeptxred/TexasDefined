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
const researched = [
  [227, "Buc-ee's", "buc-ees"],
  [228, "Whataburger", "whataburger"],
  [229, "H-E-B", "h-e-b"],
  [230, "Big Tex", "big-tex"],
  [231, "Texas Longhorn", "texas-longhorn"],
  [232, "Shiner Bock", "shiner-bock"],
  [234, "Blue Bell Ice Cream", "blue-bell-ice-cream"],
  [236, "Texas Smoked Brisket", "texas-smoked-brisket"],
  [237, "The Bluebonnet", "the-bluebonnet"],
];
const canonical = [
  [226, "The Alamo", "/destination/the-alamo", "the-alamo"],
  [233, "Dr Pepper", "/dr-pepper-texas-history", "dr-pepper"],
  [235, "Chili Con Carne", "/texas-chili-con-carne-history", "chili-con-carne"],
];
for (const [rank, name] of [...researched, ...canonical]) if (!source.includes(`${rank},${name},Symbols & Food,`)) failures.push(`Symbols & Food roster drift at rank ${rank}: expected ${name}.`);
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Symbols & Food batch-1 research profile: ${slug}.`);
for (const [, name, path, slug] of canonical) {
  if (!roster.includes(`"${name}": "${path}"`)) failures.push(`Canonical reuse missing for ${name}: ${path}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Duplicate research forbidden for canonical subject ${name}.`);
}
const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 9 || new Set(slugs).size !== 9) failures.push(`Symbols batch 1 must contain exactly 9 unique research profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 9) failures.push("Symbols batch 1 must keep all nine profiles researched-staged.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 9) failures.push("Every Symbols batch-1 profile must retain the staged publication boundary.");
if (!research.includes("remains noindex pending image-rights and internal-link certification")) failures.push("Symbols batch 1 must retain the noindex/image-rights/internal-link boundary.");
const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 27) failures.push(`Symbols batch 1 needs at least three HTTPS sources per researched profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = research.slice(start, end > start ? end : research.length);
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Symbols batch-1 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["1982", "Corpus Christi", "Kerrville", "1952", "official large state mammal", "since 1909", "Brenham", "Texas barbecue", "state flower since 1901"]) if (!research.includes(token)) failures.push(`Symbols batch 1 is missing required context token: ${token}.`);
const symbol = "TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_1";
if (!resolver.includes(`from "@/data/texas-icons-research-symbols-1.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Symbols resolver must import and register batch 1 before merge.");
if (!resolver.includes("indexableAtOwnRoute: false")) failures.push("Symbols batch 1 must preserve non-indexable Icons routes.");
if (failures.length) fail();
console.log("Texas Icons Symbols & Food batch-1 validation passed: ranks 226-237 are covered by 9 staged research profiles and 3 canonical reuses.");
function fail() { console.error("Texas Icons Symbols & Food batch-1 validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
