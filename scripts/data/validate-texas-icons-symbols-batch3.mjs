import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-symbols-3.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const venuePath = "src/data/knowledge-graph/major-sports-venues.ts";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath, rosterPath, venuePath]) if (!fs.existsSync(path)) failures.push(`Missing Texas Icons final Symbols file: ${path}`);
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const roster = fs.readFileSync(rosterPath, "utf8");
const venues = fs.readFileSync(venuePath, "utf8");

const researched = [[248, "Texas Sheet Cake", "texas-sheet-cake"],[249, "The Cowboy Boot", "the-cowboy-boot"]];
const canonical = [[246, "Space Center Houston", "/destination/space-center-houston", "space-center-houston"],[250, "The Lone Star Flag", "/article/history-of-the-texas-flag", "the-lone-star-flag"]];
const graphOwned = [247, "The Cotton Bowl", "Cotton Bowl Stadium", "cotton-bowl-stadium", "Cotton Bowl"];

for (const [rank, name] of [...researched, ...canonical, [graphOwned[0], graphOwned[1]]]) if (!source.includes(`${rank},${name},Symbols & Food,`)) failures.push(`Symbols & Food roster drift at rank ${rank}: expected ${name}.`);
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing final Symbols research profile: ${slug}.`);
for (const [, name, path, slug] of canonical) {
  if (!roster.includes(`"${name}": "${path}"`)) failures.push(`${name} must reuse canonical owner ${path}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Canonical subject ${slug} must not be duplicated as research.`);
}
if (!venues.includes(`'${graphOwned[2]}', '${graphOwned[3]}'`) || !venues.includes(`['${graphOwned[4]}']`)) failures.push("The Cotton Bowl must continue to resolve through the Cotton Bowl Stadium knowledge-graph entity and alias.");
if (research.includes('slug: "the-cotton-bowl"')) failures.push("The Cotton Bowl must not duplicate its knowledge-graph owner as research.");

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 2 || new Set(slugs).size !== 2) failures.push(`Final Symbols batch must contain exactly 2 unique research profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 2) failures.push("Final Symbols batch must retain both substantive research profiles.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 2) failures.push("Every final Symbols profile must retain the publication note.");
for (const slug of researched.map((entry) => entry[2])) {
  const start = research.indexOf(`slug: "${slug}"`);
  const nextStart = research.indexOf('slug: "', start + 8);
  const block = research.slice(start, nextStart > start ? nextStart : research.length);
  const urls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(urls).size < 3) failures.push(`Final Symbols profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["origin remains uncertain","1936","Galveston Daily News","buttermilk","pecans","official State Footwear","1879","1883","1912","2007","2025","Boot Capital"]) if (!research.includes(token)) failures.push(`Final Symbols batch is missing accuracy/context token: ${token}.`);

const symbol = "TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_3";
if (!resolver.includes(`from "@/data/texas-icons-research-symbols-3.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Symbols resolver must import and register batch 3 before merge.");
const canonicalPrecedence = resolver.indexOf("if (entry.canonicalPath)");
const graphPrecedence = resolver.indexOf("if (graphEntity)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (canonicalPrecedence < 0 || graphPrecedence < 0 || researchPrecedence < 0 || canonicalPrecedence > graphPrecedence || graphPrecedence > researchPrecedence) failures.push("Canonical and knowledge-graph owners must continue to resolve before Symbols research.");
if (!resolver.includes("indexableAtOwnRoute: true")) failures.push("Substantive final Symbols research profiles must publish at their canonical Texas Icons routes while canonical and knowledge-graph owners continue to win.");

if (failures.length) fail();
console.log("Texas Icons Symbols & Food final validation passed: ranks 246-250 close the 250-item registry with two substantive sourced narrative profiles, two explicit canonical reuses, and one knowledge-graph reuse.");
function fail() { console.error("Texas Icons Symbols & Food final validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }