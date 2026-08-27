import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-symbols-2.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath, rosterPath]) if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Symbols batch-2 file: ${path}`);
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const roster = fs.readFileSync(rosterPath, "utf8");
const researched = [
  [236, "Texas Smoked Brisket", "texas-smoked-brisket"],
  [237, "The Bluebonnet", "the-bluebonnet"],
  [239, "The Texas Mockingbird", "the-texas-mockingbird"],
  [241, "Prada Marfa", "prada-marfa"],
];
const canonical = [
  [238, "San Antonio River Walk", "/destination/san-antonio-river-walk", "san-antonio-river-walk"],
  [240, "Cadillac Ranch", "/destination/cadillac-ranch", "cadillac-ranch"],
  [242, "Palo Duro Canyon", "/destination/palo-duro-canyon-state-park", "palo-duro-canyon"],
  [243, "Big Bend National Park", "/destination/big-bend-national-park", "big-bend-national-park"],
  [244, "Enchanted Rock", "/destination/enchanted-rock-state-natural-area", "enchanted-rock"],
  [245, "King Ranch", "/article/king-ranch-texas-history-cattle-legacy", "king-ranch"],
];
for (const [rank, name] of [...researched, ...canonical]) if (!source.includes(`${rank},${name},Symbols & Food,`)) failures.push(`Symbols & Food roster drift at rank ${rank}: expected ${name}.`);
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Symbols batch-2 research profile: ${slug}.`);
for (const [, name, path, slug] of canonical) {
  if (!roster.includes(`"${name}": "${path}"`)) failures.push(`${name} must reuse canonical owner ${path}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Canonical Symbols entry ${slug} must not be duplicated as staged research.`);
}

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 4 || new Set(slugs).size !== 4) failures.push(`Symbols batch 2 must contain exactly 4 unique research profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 4) failures.push("Symbols batch 2 must keep all four new profiles researched-staged.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 4) failures.push("Every Symbols batch-2 profile must retain the staged publication boundary.");
if ((research.match(/noindex pending image-rights and internal-link certification/g) ?? []).length < 1) failures.push("Symbols batch 2 must retain the noindex/image-rights/internal-link boundary.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 12) failures.push(`Symbols batch 2 needs at least three HTTPS sources per profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = research.slice(start, end > start ? end : research.length);
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Symbols profile ${slug} must retain at least three distinct HTTPS sources.`);
}

for (const token of [
  "Central Texas",
  "1901",
  "1971",
  "1927",
  "October 1, 2005",
  "Valentine",
]) if (!research.includes(token)) failures.push(`Symbols batch 2 is missing accuracy/context token: ${token}.`);

const symbol = "TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_2";
if (!resolver.includes(`from "@/data/texas-icons-research-symbols-2.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Symbols resolver must import and register batch 2 before merge.");
if (!resolver.includes("indexableAtOwnRoute: false")) failures.push("Symbols batch 2 must preserve non-indexable Icons routes.");

if (failures.length) fail();
console.log("Texas Icons Symbols & Food batch-2 validation passed: ranks 236-245 reuse six canonical owners and retain four server-only staged research profiles.");
function fail() { console.error("Texas Icons Symbols & Food batch-2 validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
