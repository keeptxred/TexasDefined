import fs from "node:fs";
import path from "node:path";

const dataDir = "src/data";
const resolverPath = "src/data/texas-icons.server.ts";
const routePath = "src/routes/texas-icons_.$slug.tsx";
const hubPath = "src/routes/texas-icons.tsx";
const sitemapPath = "src/routes/sitemap-texas-icons[.]xml.ts";
const robotsPath = "public/robots.txt";
const correctionsPath = "src/data/texas-icons-roster-corrections.server.ts";
const failures = [];
const researchFiles = fs
  .readdirSync(dataDir)
  .filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))
  .sort();
let profileCount = 0;
const seenSlugs = new Map();

for (const required of [resolverPath, routePath, hubPath, correctionsPath]) {
  if (!fs.existsSync(required)) failures.push(`Missing Texas Icons publication contract file: ${required}`);
}
if (!researchFiles.length) failures.push("No Texas Icons narrative research modules were found.");

for (const file of researchFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  const matches = [...source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const slug = match[1];
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? source.lastIndexOf("];\n");
    const block = source.slice(start, end > start ? end : source.length);
    profileCount += 1;

    const previous = seenSlugs.get(slug);
    if (previous) failures.push(`Duplicate Texas Icons narrative slug ${slug} appears in ${previous} and ${file}.`);
    else seenSlugs.set(slug, file);

    for (const token of ["dek:", "overview:", "definingWorks:", "timeline:", "legacy:", "texasPlaces:", "sources:", "lastReviewedAt:"]) {
      if (!block.includes(token)) failures.push(`${file}:${slug} is missing narrative field ${token}`);
    }
    const urls = [...block.matchAll(/url:\s*"(https:\/\/[^\"]+)"/g)].map((candidate) => candidate[1]);
    if (new Set(urls).size < 3) failures.push(`${file}:${slug} must retain at least three distinct HTTPS sources before publication.`);
  }
}
if (!profileCount) failures.push("No Texas Icons narrative profiles were audited.");

if (fs.existsSync(resolverPath)) {
  const resolver = fs.readFileSync(resolverPath, "utf8");
  const talentStart = resolver.indexOf("if (talentProfile)");
  const researchStart = resolver.indexOf("if (researchProfile)");
  const starterStart = resolver.indexOf("\n  return {", researchStart);
  if (talentStart < 0 || researchStart < 0 || talentStart >= researchStart) failures.push("Texas Talent ownership must resolve before Texas Icons narrative research.");
  const talentBlock = talentStart >= 0 && researchStart > talentStart ? resolver.slice(talentStart, researchStart) : "";
  const researchBlock = researchStart >= 0 && starterStart > researchStart ? resolver.slice(researchStart, starterStart) : "";
  const starterBlock = starterStart >= 0 ? resolver.slice(starterStart) : "";

  if (!talentBlock.includes("indexableAtOwnRoute: !publishable")) failures.push("Completed Texas Talent narratives must publish at the Icons route until Talent becomes the stronger canonical owner.");
  if (!talentBlock.includes("summary: talentProfile.dek")) failures.push("Published Talent-owned Icons pages must use the written Talent narrative summary.");
  if (!researchBlock.includes("indexableAtOwnRoute: true")) failures.push("Completed Texas Icons narrative profiles must be indexable at their own canonical route.");
  if (!researchBlock.includes('reuseKind: "icon-research-staged"')) failures.push("Legacy research provenance may remain, but the runtime must still identify the research profile deterministically.");
  if (!starterBlock.includes('reuseKind: "new-starter"') || !starterBlock.includes("indexableAtOwnRoute: false")) failures.push("Pure roster/data-only starter records must remain unpublished.");
  if (!resolver.includes('resolved.reuseKind === "texas-talent-staged"')) failures.push("The loader must expose completed Talent narrative content while the Icons route temporarily owns publication.");
  if (!resolver.includes("enrichResearchProfilePlaceLinks(researchProfile, context)")) failures.push("Published Icons research must retain safe Texas-place enrichment.");
  if (resolver.includes("publicationNote")) failures.push("Legacy research publication notes must not control runtime publication.");
}

if (fs.existsSync(correctionsPath)) {
  const corrections = fs.readFileSync(correctionsPath, "utf8");
  if (!corrections.includes('replacementSlug: "matt-stone"')) failures.push("Rank 223 provenance correction must remain explicit.");
  if (!corrections.includes("indexableAtOwnRoute: true")) failures.push("The completed corrected Matt Stone narrative must publish rather than remain a hidden article.");
}

if (fs.existsSync(routePath)) {
  const route = fs.readFileSync(routePath, "utf8");
  if (!route.includes("if (!result.talentProfile && !result.researchProfile) throw notFound()")) failures.push("Data-only Texas Icons records must not receive standalone public article routes.");
  if (!route.includes('type: "article"')) failures.push("Published Texas Icons narratives must emit article metadata.");
  if (!route.includes("const narrativeProfile: TexasIconNarrativeProfile")) failures.push("Texas Icons detail pages must be backed by narrative content.");
  if (!route.includes('type="application/ld+json"')) failures.push("Published Texas Icons narratives must emit structured data.");
  if (route.includes("Researched draft · noindex") || route.includes("profile.publicationNote")) failures.push("Published narrative routes must not retain the old permanent-draft/noindex UI.");
}

if (fs.existsSync(hubPath)) {
  const hub = fs.readFileSync(hubPath, "utf8");
  if (!hub.includes("Data stays data; written profiles publish")) failures.push("Texas Icons hub must state the written-content publication rule.");
  if (!hub.includes("hasPublicDestination")) failures.push("Texas Icons hub must not link data-only roster records to standalone pages.");
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  if (!sitemap.includes("icon.indexableAtOwnRoute") || !sitemap.includes("/texas-icons/${icon.slug}")) failures.push("Texas Icons sitemap must include only publishable own-route narratives.");
} else {
  failures.push(`Missing Texas Icons narrative sitemap: ${sitemapPath}`);
}

if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8");
  if (!robots.includes("Sitemap: https://texasdefined.com/sitemap-texas-icons.xml")) failures.push("robots.txt must advertise the Texas Icons narrative sitemap.");
} else {
  failures.push(`Missing robots file: ${robotsPath}`);
}

if (failures.length) {
  console.error("Texas Icons written-content publication validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas Icons written-content publication validation passed: ${profileCount} sourced narrative profiles publish through canonical routes, while pure data-only roster records stay without standalone article pages.`);
