import fs from "node:fs";

const sourcePath = "src/data/texas-icons-source-media-symbols.server.ts";
const researchPath = "src/data/texas-icons-research-media-3.server.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const dataDir = "src/data";
const failures = [];
for (const path of [sourcePath, researchPath, resolverPath]) if (!fs.existsSync(path)) failures.push(`Missing Texas Icons Media batch-3 file: ${path}`);
if (failures.length) fail();

const source = fs.readFileSync(sourcePath, "utf8");
const research = fs.readFileSync(researchPath, "utf8");
const resolver = fs.readFileSync(resolverPath, "utf8");
const researched = [
  [212, "Taylor Sheridan", "taylor-sheridan"],
  [213, "Jim Parsons", "jim-parsons"],
  [214, "Selena Gomez", "selena-gomez"],
  [215, "Demi Lovato", "demi-lovato"],
  [216, "Chace Crawford", "chace-crawford"],
  [217, "Hilary Duff", "hilary-duff"],
  [218, "Jensen Ackles", "jensen-ackles"],
  [219, "Jared Padalecki", "jared-padalecki"],
];
const reused = [[211, "Wes Anderson", "wes-anderson"]];
const unresolved = [[220, "Slick Woods", "slick-woods"]];

for (const [rank, name] of [...researched, ...reused, ...unresolved]) if (!source.includes(`${rank},${name},Media & Arts,`)) failures.push(`Media & Arts roster drift at rank ${rank}: expected ${name}.`);
for (const [, , slug] of researched) if (!research.includes(`slug: "${slug}"`)) failures.push(`Missing Media batch-3 research profile: ${slug}.`);
for (const [, , slug] of unresolved) if (research.includes(`slug: "${slug}"`)) failures.push(`${slug} must remain unresolved because the supplied Houston-birth claim is not supported.`);

const talentFiles = fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name) || name === "texas-talent.ts");
const talentSource = talentFiles.map((name) => fs.readFileSync(`${dataDir}/${name}`, "utf8")).join("\n");
for (const [, , slug] of reused) {
  if (!talentSource.includes(`slug: "${slug}"`)) failures.push(`Expected Texas Talent reuse is missing: ${slug}.`);
  if (research.includes(`slug: "${slug}"`)) failures.push(`Media duplicate detected: ${slug} must reuse Texas Talent.`);
}
for (const [, , slug] of researched) if (talentSource.includes(`slug: "${slug}"`)) failures.push(`${slug} now exists in Texas Talent and must be reconciled instead of duplicated.`);

const slugs = [...research.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (slugs.length !== 8 || new Set(slugs).size !== 8) failures.push(`Media batch 3 must contain exactly 8 unique research profiles; found ${slugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== 8) failures.push("Media batch 3 must retain all eight substantive research profiles.");
if ((research.match(/publicationNote: staged/g) ?? []).length !== 8) failures.push("Every Media batch-3 profile must retain the publication note.");

const urls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length < 24) failures.push(`Media batch 3 needs at least three HTTPS sources per researched profile; found ${urls.length}.`);
for (let i = 0; i < researched.length; i += 1) {
  const slug = researched[i][2];
  const start = research.indexOf(`slug: "${slug}"`);
  const nextSlug = researched[i + 1]?.[2];
  const end = nextSlug ? research.indexOf(`slug: "${nextSlug}"`, start + 1) : research.length;
  const block = start >= 0 ? research.slice(start, end > start ? end : research.length) : "";
  const profileUrls = [...block.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
  if (new Set(profileUrls).size < 3) failures.push(`Media batch-3 profile ${slug} must retain at least three distinct HTTPS sources.`);
}
for (const token of ["born in Chapel Hill, North Carolina","raised in Fort Worth","Jim Parsons was born in Houston","born in Grand Prairie in 1992","born in Albuquerque, New Mexico","born in Lubbock in 1985","born in Houston in 1987","born in Dallas in 1978","born in San Antonio in 1982"]) if (!research.includes(token)) failures.push(`Media batch 3 is missing required origin/context token: ${token}.`);

const symbol = "TEXAS_ICON_RESEARCH_MEDIA_BATCH_3";
if (!resolver.includes(`from "@/data/texas-icons-research-media-3.server"`) || !resolver.includes(`...${symbol}`)) failures.push("Media resolver must import and register batch 3 before merge.");
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Texas Talent must continue to resolve before Media research.");
if (!resolver.includes("texasTalentFutureCanonicalPath") || !resolver.includes("indexableAtOwnRoute: true")) failures.push("Media batch 3 must preserve canonical ownership while substantive Icons narratives publish at their canonical routes.");

if (failures.length) fail();
console.log("Texas Icons Media & Arts batch-3 validation passed: ranks 211-220 are covered by one Talent reuse, eight substantive publishable research profiles, and one explicit unresolved bad intake row (Slick Woods).");
function fail() { console.error("Texas Icons Media & Arts batch-3 validation failed:"); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }