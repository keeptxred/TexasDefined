import fs from "node:fs";
import path from "node:path";

const dataDir = "src/data";
const routePath = "src/routes/texas-icons_.$slug.tsx";
const resolverPath = "src/data/texas-icons.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const enrichmentPath = "src/data/texas-icons-content-enrichment.server.ts";
const typesPath = "src/data/texas-icons-types.ts";
const failures = [];
const researchFiles = fs.readdirSync(dataDir)
  .filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))
  .sort();

const words = (value) => (value.match(/[A-Za-z0-9À-ÿ][A-Za-z0-9À-ÿ’'&.-]*/g) ?? []).length;
const strings = (value) => [...value.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((match) => match[1]);
const section = (block, field, nextField) => {
  const pattern = new RegExp(`${field}:\\s*\\[(.*?)\\]\\s*,\\n\\s{4}${nextField}:`, "s");
  return block.match(pattern)?.[1] ?? "";
};

const enrichmentSource = fs.readFileSync(enrichmentPath, "utf8");
const enrichmentBySlug = new Map();
for (const match of enrichmentSource.matchAll(/^\s{2}"([^"]+)":\s*\{\s*\n\s{4}legacyAppend:\s*\[(.*?)\]\s*,?\s*\n\s{2}\},/gms)) {
  enrichmentBySlug.set(match[1], strings(match[2]));
}

let profileCount = 0;
let enrichedProfileCount = 0;
let totalNarrativeWords = 0;
let totalOverviewWords = 0;
let totalLegacyWords = 0;
let placeCount = 0;

for (const file of researchFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  const matches = [...source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)];
  for (let index = 0; index < matches.length; index += 1) {
    const slug = matches[index][1];
    const start = matches[index].index ?? 0;
    const end = matches[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    profileCount += 1;

    const overviewValues = strings(section(block, "overview", "definingWorks"));
    const worksValues = strings(section(block, "definingWorks", "timeline"));
    const timelineBlock = section(block, "timeline", "legacy");
    const timelineValues = strings(timelineBlock);
    const legacyValues = strings(section(block, "legacy", "texasPlaces"));
    const enrichmentValues = enrichmentBySlug.get(slug) ?? [];
    if (enrichmentValues.length) enrichedProfileCount += 1;
    const effectiveLegacyValues = [...legacyValues, ...enrichmentValues];
    const placesBlock = section(block, "texasPlaces", "sources");
    const placeValues = strings(placesBlock).filter((value) => !value.startsWith("/"));
    const sourcesBlock = section(block, "sources", "lastReviewedAt");
    const overviewWords = overviewValues.reduce((sum, value) => sum + words(value), 0);
    const legacyWords = effectiveLegacyValues.reduce((sum, value) => sum + words(value), 0);
    const narrativeWords = [...overviewValues, ...worksValues, ...timelineValues, ...effectiveLegacyValues, ...placeValues]
      .reduce((sum, value) => sum + words(value), 0);
    const timelineCount = (timelineBlock.match(/\{\s*year:/g) ?? []).length;
    const places = (placesBlock.match(/\{\s*name:/g) ?? []).length;
    const sourceUrls = [...sourcesBlock.matchAll(/url:\s*"(https:\/\/[^\"]+)"/g)].map((match) => match[1]);

    totalNarrativeWords += narrativeWords;
    totalOverviewWords += overviewWords;
    totalLegacyWords += legacyWords;
    placeCount += places;

    if (overviewValues.length < 2) failures.push(`${file}:${slug} needs at least two overview paragraphs; found ${overviewValues.length}.`);
    if (overviewWords < 55) failures.push(`${file}:${slug} overview is too thin at ${overviewWords} words; minimum is 55.`);
    if (worksValues.length < 3) failures.push(`${file}:${slug} needs at least three defining-work/context points; found ${worksValues.length}.`);
    if (timelineCount < 2) failures.push(`${file}:${slug} needs at least two timeline milestones; found ${timelineCount}.`);
    if (effectiveLegacyValues.length < 1 || legacyWords < 20) failures.push(`${file}:${slug} legacy section is too thin at ${legacyWords} words; minimum is 20.`);
    if (places < 1) failures.push(`${file}:${slug} needs at least one Texas-place/context entry.`);
    if (narrativeWords < 180) failures.push(`${file}:${slug} effective full narrative is thin at ${narrativeWords} words across overview, defining points, timeline, legacy and Texas-place context; minimum is 180.`);
    if (new Set(sourceUrls).size < 3) failures.push(`${file}:${slug} needs at least three distinct HTTPS sources; found ${new Set(sourceUrls).size}.`);
  }
}

if (profileCount < 190) failures.push(`Expected the completed narrative registry to contain at least 190 researched profiles; found ${profileCount}.`);

const resolver = fs.readFileSync(resolverPath, "utf8");
if (!resolver.includes("enrichResearchProfilePlaceLinks(researchProfile, context)")) failures.push("Texas Icons research must retain safe runtime enrichment of verified Texas-place internal links.");
const functions = fs.readFileSync(functionsPath, "utf8");
if (!functions.includes('import("./texas-icons-content-enrichment.server")') || !functions.includes("enrichTexasIconNarrativeContent(researchProfile)")) failures.push("Texas Icons public profile server function must apply audited narrative enrichment before returning research content.");
if (enrichedProfileCount < 21) failures.push(`Expected at least 21 audit-driven narrative enrichments; found ${enrichedProfileCount}.`);

const route = fs.readFileSync(routePath, "utf8");
for (const token of [
  'type: "article"',
  "canonicalLink(texasDefinedBrand, canonicalPath)",
  'type="application/ld+json"',
  "TEXAS_ICON_CATEGORY_AUTHORITY_HUBS",
  "related.map",
  "profile.texasPlaces.map",
  "profile.sources.map",
]) {
  if (!route.includes(token)) failures.push(`Texas Icons profile route is missing SEO/cross-link contract token: ${token}`);
}
if (!route.includes('"@type": "BreadcrumbList"')) failures.push("Texas Icons profiles must emit BreadcrumbList structured data.");
if (!route.includes("isPartOf:")) failures.push("Texas Icons entity schema must identify the Texas Icons collection as its parent.");

const types = fs.readFileSync(typesPath, "utf8");
for (const category of ["history-politics", "music-culture", "sports", "business-science", "media-arts", "symbols-food"]) {
  if (!types.includes(`id: "${category}"`)) failures.push(`Texas Icons category metadata is missing ${category}.`);
}

console.log(`Texas Icons content audit reviewed ${profileCount} narrative profiles across ${researchFiles.length} server-only research modules and applied ${enrichedProfileCount} targeted depth enrichments.`);
console.log(`Effective full narrative words: ${totalNarrativeWords}; overview words: ${totalOverviewWords}; legacy words: ${totalLegacyWords}; Texas-place entries: ${placeCount}.`);

if (failures.length) {
  console.error(`Texas Icons content/SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Texas Icons content/SEO audit passed: every researched narrative meets the effective full-page depth/source contract and the public route retains canonical metadata, structured data, related-profile links, authority bridges, safe Texas-place enrichment and visible research sources.");
