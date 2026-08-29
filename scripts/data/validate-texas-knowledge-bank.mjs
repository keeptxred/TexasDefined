import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const types = read('src/data/knowledge-bank/types.ts');
const sources = read('src/data/knowledge-bank/sources.ts');
const seed = read('src/data/knowledge-bank/seed.ts');
const expanded = read('src/data/knowledge-bank/seed-expanded.ts');
const verifiedBatch2 = read('src/data/knowledge-bank/seed-verified-batch2.ts');
const verifiedBatch3 = read('src/data/knowledge-bank/seed-verified-batch3.ts');
const countyBatchFiles = Array.from({ length: 9 }, (_, index) => `src/data/knowledge-bank/seed-counties-batch${index + 1}.ts`);
const countyBatches = countyBatchFiles.map(read);
const countyText = countyBatches.join('\n');
const town = read('src/data/knowledge-bank/seed-towns-from-county-seats.ts');
const observations = read('src/data/knowledge-bank/cultural-observations.ts');
const observationsBatch2 = read('src/data/knowledge-bank/cultural-observations-batch2.ts');
const catalog = read('src/data/knowledge-bank/catalog.ts');
const social = read('src/data/knowledge-bank/social.ts');
const scheduler = read('src/data/knowledge-bank/social-batch.ts');
const validation = read('src/data/knowledge-bank/validation.ts');
const guides = read('src/data/texas-evergreen-guides-batch8.ts');
const clusters = read('src/data/texas-home-nature-clusters.ts');
const routes = read('src/lib/public-routes.ts');
const homeGarden = read('src/routes/home-garden.tsx');
const entityRoute = read('src/routes/$kind.$slug.tsx');
const entityRelationships = read('src/data/knowledge-graph/relationships.ts');

const requiredSourceIds = [
  'texas-open-data', 'tpwd-wildlife', 'tpwd-plants', 'ebird', 'usfws-birds',
  'texas-historical-commission', 'tslac', 'texas-demographic-center', 'census',
  'tnris', 'texas-water-data', 'txdot', 'texas-comptroller', 'noaa',
  'nws-hurricanes', 'usgs', 'texas-am-agrilife', 'texas-am-fire-ants', 'tdem-emergency',
  'cdc-snakebite',
];
const sourceIdMatches = [...sources.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const registeredSourceIds = new Set(sourceIdMatches);
for (const id of sourceIdMatches) {
  if (sourceIdMatches.indexOf(id) !== sourceIdMatches.lastIndexOf(id)) failures.push(`Duplicate knowledge source ID: ${id}`);
}
for (const id of requiredSourceIds) if (!registeredSourceIds.has(id)) failures.push(`Missing required knowledge source: ${id}`);
for (const urlMatch of sources.matchAll(/\burl:\s*['\"]([^'\"]+)['\"]/g)) {
  if (!urlMatch[1].startsWith('https://')) failures.push(`Knowledge source registry URL must use HTTPS: ${urlMatch[1]}`);
}
for (const text of [seed, expanded, verifiedBatch2, verifiedBatch3, ...countyBatches]) {
  for (const sourceMatch of text.matchAll(/\bsourceId:\s*['\"]([^'\"]+)['\"]/g)) {
    if (!registeredSourceIds.has(sourceMatch[1])) failures.push(`Knowledge record references unregistered source ID: ${sourceMatch[1]}`);
  }
}

for (const sourceList of clusters.matchAll(/sourceIds:\s*\[([^\]]*)\]/g)) {
  for (const sourceMatch of sourceList[1].matchAll(/['\"]([^'\"]+)['\"]/g)) {
    if (!registeredSourceIds.has(sourceMatch[1])) failures.push(`Home/nature cluster references unregistered source ID: ${sourceMatch[1]}`);
  }
}
const clusterCount = (clusters.match(/\bid:\s*['\"]/g) ?? []).length;
const stagedClusterCount = (clusters.match(/publicationState:\s*['\"]staged['\"],/g) ?? []).length;
const plannedLinkCount = (clusters.match(/plannedCrossLinkTargets\s*:\s*\[/g) ?? []).length;
if (!clusterCount) failures.push('Home/nature cluster inventory must contain at least one cluster.');
if (stagedClusterCount !== clusterCount) failures.push(`Every home/nature cluster must be staged; found ${stagedClusterCount} staged of ${clusterCount}.`);
if (plannedLinkCount !== clusterCount) failures.push(`Every home/nature cluster must label cross-links planning-only; found ${plannedLinkCount} of ${clusterCount}.`);
if (/\bcrossLinkTargets\s*:/.test(clusters)) failures.push('Home/nature clusters must not expose unqualified crossLinkTargets; use plannedCrossLinkTargets until routes are verified for publication.');

const stagedGuideSlugs = [
  'texas-hurricane-home-prep', 'texas-pool-guide', 'texas-pests-guide',
  'texas-snakes-guide', 'texas-wildlife-guide', 'texas-birds-guide',
  'texas-flowers-wildflowers-guide',
];
const stagedGuidePaths = stagedGuideSlugs.map((slug) => `/${slug}`);
const knowledgeRecordText = `${seed}\n${expanded}\n${verifiedBatch2}\n${verifiedBatch3}\n${countyText}\n${town}`;
for (const path of stagedGuidePaths) {
  if (routes.includes(`\"${path}\"`) || routes.includes(`'${path}'`)) failures.push(`Staged guide leaked into public route registry: ${path}`);
  if (homeGarden.includes(path)) failures.push(`Staged guide leaked into Home & Garden links: ${path}`);
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp(`\\barticlePath\\s*:\\s*['\"]${escaped}['\"]`).test(knowledgeRecordText)) failures.push(`Staged guide leaked into live knowledge articlePath: ${path}`);
  if (!new RegExp(`\\bplannedArticlePath\\s*:\\s*['\"]${escaped}['\"]`).test(knowledgeRecordText)) failures.push(`Staged guide is missing a planning-only knowledge destination: ${path}`);
}
for (const slug of stagedGuideSlugs) {
  if (fs.existsSync(`src/routes/${slug}.tsx`)) failures.push(`Staged guide has a public file route before publication approval: /${slug}`);
}

for (const field of ['verification', 'socialReady', 'sources', 'socialFormats', 'usage', 'plannedArticlePath', 'engagementChoices', 'temporalScope', 'reviewBy', 'validThrough', 'townSlug']) {
  if (!types.includes(field)) failures.push(`Knowledge record type is missing field: ${field}`);
}
if (!types.includes("'town-fact'")) failures.push('Knowledge record kinds must include town-fact.');
if (!validation.includes("record.kind === 'county-fact'")) failures.push('Runtime validation must require countySlug for county-fact records.');
if (!validation.includes("record.kind === 'town-fact'")) failures.push('Runtime validation must require townSlug for town-fact records.');
if (!validation.includes('SLUG.test(record.townSlug)')) failures.push('Runtime validation must enforce normalized townSlug shape.');
if (!validation.includes('SLUG.test(record.countySlug)')) failures.push('Runtime validation must enforce normalized countySlug shape.');
if (!validation.includes('record.articlePath && record.plannedArticlePath')) failures.push('Runtime validation must reject records that mix live and planned article paths.');
if (!validation.includes("socialFormats.includes('which-one-is-more-texas')")) failures.push('Runtime validation must enforce paired engagement choices.');
if (!social.includes("format === 'which-one-is-more-texas' && !record.engagementChoices")) failures.push('Social renderer must reject paired-choice posts without engagementChoices.');
const requiredSocialFormats = [
  'fact-of-the-day', 'you-know-youre-a-texan-if', 'you-know-youre-from-texas-if', 'tell-me-youre-from-texas',
  'only-texans-understand', 'til-texas-edition', 'only-in-texas', 'texas-trivia',
  'true-or-false', 'this-or-that', 'which-one-is-more-texas', 'would-you-rather-texas', 'finish-the-sentence',
  'name-this-texas-place', 'what-do-texans-call-this', 'how-texas-are-you',
  'texas-by-the-numbers', 'county-of-the-day', 'town-of-the-day',
  'wildlife-of-the-day', 'wildflower-of-the-day', 'food-fight', 'tag-a-texan',
];
for (const format of requiredSocialFormats) if (!types.includes(`'${format}'`)) failures.push(`Missing social format: ${format}`);

if (!validation.includes("record.verification === 'needs-review' && record.socialReady")) failures.push('Validation must block needs-review records from social use.');
if (!validation.includes("record.verification === 'verified' && !record.sources.length")) failures.push('Validation must block verified records with no source.');
if (!social.includes('if (!record.socialReady)')) failures.push('Social renderer must reject non-social-ready records.');
if (!social.includes('record.socialFormats?.length') || !social.includes('includes(format)')) failures.push('Social renderer must enforce approved formats.');
for (const format of requiredSocialFormats) if (!social.includes(`case '${format}'`) && !['fact-of-the-day', 'texas-by-the-numbers'].includes(format)) failures.push(`Social renderer is missing format handling: ${format}`);
if (!scheduler.includes('excludeRecordIds') || !scheduler.includes('timesUsed') || !scheduler.includes('preferredSeason')) failures.push('Social scheduler must support exclusions, usage scoring and season preference.');
if (!scheduler.includes("'which-one-is-more-texas'")) failures.push('Social scheduler must rotate the paired Texas choice format.');
if (!scheduler.includes('buildDefaultTexasSocialBatch') || !scheduler.includes('TEXAS_KNOWLEDGE_CATALOG')) failures.push('Default social batching must use the canonical Knowledge Bank catalog.');
const requiredCatalogExports = [
  'TEXAS_KNOWLEDGE_SEED',
  'TEXAS_KNOWLEDGE_EXPANDED_SEED',
  'TEXAS_KNOWLEDGE_VERIFIED_BATCH2',
  'TEXAS_KNOWLEDGE_VERIFIED_BATCH3',
  ...Array.from({ length: 9 }, (_, index) => `TEXAS_COUNTY_FACTS_BATCH${index + 1}`),
  'TEXAS_TOWN_COUNTY_SEAT_FACTS',
  'TEXAS_CULTURAL_OBSERVATIONS',
  'TEXAS_CULTURAL_OBSERVATIONS_BATCH2',
];
for (const seedExport of requiredCatalogExports) {
  if (!catalog.includes(seedExport)) failures.push(`Canonical Knowledge Bank catalog is missing ${seedExport}.`);
}
if (!catalog.includes("record.verification !== 'needs-review'")) failures.push('Canonical social candidate selector must exclude needs-review records.');
if (!catalog.includes('texasKnowledgeByTownSlug')) failures.push('Canonical Knowledge Bank catalog must expose townSlug lookup.');

// County facts may use live links only because the existing generic entity route is /$kind/$slug
// and canonicalEntityPath resolves non-destination entities to /{kind}/{slug}.
if (!entityRoute.includes("createFileRoute('/$kind/$slug')")) failures.push('County facts require the existing /$kind/$slug entity route.');
if (!entityRelationships.includes('return `/${entity.kind}/${entity.slug}`')) failures.push('County facts require canonicalEntityPath to preserve /county/{slug}.');
for (const [index, countyBatch] of countyBatches.entries()) {
  if (!countyBatch.includes("sourceId:'tslac'") && !countyBatch.includes("sourceId: 'tslac'")) failures.push(`County fact batch ${index + 1} must cite the canonical TSLAC source.`);
  if (!countyBatch.includes('https://www.tsl.texas.gov/ref/abouttx/countyseats.html')) failures.push(`County fact batch ${index + 1} must cite the official TSLAC county-seat directory.`);
  if (!countyBatch.includes("socialFormats:['county-of-the-day','fact-of-the-day','texas-trivia']") && !countyBatch.includes("socialFormats: ['county-of-the-day', 'fact-of-the-day', 'texas-trivia']")) failures.push(`County fact batch ${index + 1} must support the county social format set.`);
}
if (/\barticlePath\s*:/.test(town)) failures.push('Reciprocal town facts must not link to pending city entity pages.');
if (!town.includes("socialFormats: ['town-of-the-day', 'fact-of-the-day', 'texas-trivia']")) failures.push('Reciprocal town facts must support the town social format set.');

const explicitRecordIds = (text) => [...text.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const helperObservationIds = [...observations.matchAll(/\bobservation\(\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const pairedChoiceIds = [...observations.matchAll(/\bpairedChoice\(\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const batch2ObservationIds = [...observationsBatch2.matchAll(/\bobservation\(\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const verifiedBatch2Ids = explicitRecordIds(verifiedBatch2);
const verifiedBatch3Ids = explicitRecordIds(verifiedBatch3);
const countyRows = [...countyText.matchAll(/\bcountySeat\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)/g)];
const countyIds = countyRows.map((match) => `county-${match[2]}-seat`);
const slugify = (value) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const townIds = countyRows.map((match) => `town-${slugify(match[3])}-county-seat-${match[2]}`);
const ids = [
  ...explicitRecordIds(seed),
  ...explicitRecordIds(expanded),
  ...verifiedBatch2Ids,
  ...verifiedBatch3Ids,
  ...countyIds,
  ...townIds,
  ...helperObservationIds,
  ...pairedChoiceIds,
  ...batch2ObservationIds,
];
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) failures.push(`Duplicate knowledge record id detected in source files: ${id}`);
  seen.add(id);
}
if (ids.length < 604) failures.push(`Expected at least 604 seeded knowledge records after statewide county/town coverage and verified wildlife batch 3; found ${ids.length}.`);
if (pairedChoiceIds.length < 5) failures.push(`Expected at least 5 paired Texas engagement prompts; found ${pairedChoiceIds.length}.`);
if (batch2ObservationIds.length < 30) failures.push(`Expected at least 30 second-batch cultural observations; found ${batch2ObservationIds.length}.`);
if (verifiedBatch2Ids.length < 13) failures.push(`Expected at least 13 second-batch verified facts; found ${verifiedBatch2Ids.length}.`);
if (verifiedBatch3Ids.length !== 8) failures.push(`Expected exactly 8 third-batch verified wildlife facts; found ${verifiedBatch3Ids.length}.`);
if (countyIds.length !== 254) failures.push(`Expected exactly 254 statewide county facts; found ${countyIds.length}.`);
if (new Set(countyIds).size !== 254) failures.push(`Expected exactly 254 unique county fact IDs; found ${new Set(countyIds).size}.`);
if (townIds.length !== 254) failures.push(`Expected exactly 254 reciprocal town facts; found ${townIds.length}.`);
if (new Set(townIds).size !== 254) failures.push(`Expected exactly 254 unique reciprocal town fact IDs; found ${new Set(townIds).size}.`);
for (const [, county, slug] of countyRows) {
  if (!county.trim() || !slug.trim()) failures.push('County fact rows require county name and slug.');
}

const observationCount = helperObservationIds.length + pairedChoiceIds.length + batch2ObservationIds.length + ((seed + expanded).match(/verification:\s*['\"]editorial-observation['\"]/g) ?? []).length;
if (observationCount < 55) failures.push(`Expected at least 55 cultural observations/engagement prompts; found ${observationCount}.`);
const verifiedCount = ((seed + expanded + verifiedBatch2 + verifiedBatch3).match(/verification:\s*['\"]verified['\"]/g) ?? []).length + countyIds.length + townIds.length;
if (verifiedCount < 544) failures.push(`Expected at least 544 verified/source-backed records after statewide county/town coverage and verified wildlife batch 3; found ${verifiedCount}.`);

for (const slug of stagedGuideSlugs) {
  if (!guides.includes(`\"${slug}\"`) && !guides.includes(`'${slug}'`)) failures.push(`Staged evergreen guide batch is missing ${slug}.`);
}

if (failures.length) {
  console.error('Texas knowledge bank validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas knowledge bank validation passed: ${ids.length} seeded records, ${verifiedCount} verified records, ${observationCount} cultural observations/engagement prompts, ${verifiedBatch2Ids.length} second-batch verified facts, ${verifiedBatch3Ids.length} third-batch verified wildlife facts, ${countyIds.length} statewide county facts, ${townIds.length} reciprocal town facts, ${pairedChoiceIds.length} paired-choice prompts, ${stagedGuidePaths.length} staged/non-public practical guides, ${registeredSourceIds.size} registered sources, and ${requiredSocialFormats.length} social formats.`);
