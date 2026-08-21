import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const types = read('src/data/knowledge-bank/types.ts');
const sources = read('src/data/knowledge-bank/sources.ts');
const seed = read('src/data/knowledge-bank/seed.ts');
const expanded = read('src/data/knowledge-bank/seed-expanded.ts');
const observations = read('src/data/knowledge-bank/cultural-observations.ts');
const catalog = read('src/data/knowledge-bank/catalog.ts');
const social = read('src/data/knowledge-bank/social.ts');
const scheduler = read('src/data/knowledge-bank/social-batch.ts');
const validation = read('src/data/knowledge-bank/validation.ts');
const guides = read('src/data/texas-evergreen-guides-batch8.ts');
const clusters = read('src/data/texas-home-nature-clusters.ts');
const routes = read('src/lib/public-routes.ts');
const homeGarden = read('src/routes/home-garden.tsx');

const requiredSourceIds = [
  'texas-open-data', 'tpwd-wildlife', 'tpwd-plants', 'ebird', 'usfws-birds',
  'texas-historical-commission', 'tslac', 'texas-demographic-center', 'census',
  'tnris', 'texas-water-data', 'txdot', 'texas-comptroller', 'noaa',
  'nws-hurricanes', 'usgs', 'texas-am-agrilife', 'texas-am-fire-ants', 'tdem-emergency',
];
const registeredSourceIds = new Set(
  [...sources.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]),
);
for (const id of requiredSourceIds) if (!registeredSourceIds.has(id)) failures.push(`Missing required knowledge source: ${id}`);

for (const sourceList of clusters.matchAll(/sourceIds:\s*\[([^\]]*)\]/g)) {
  for (const sourceMatch of sourceList[1].matchAll(/['\"]([^'\"]+)['\"]/g)) {
    if (!registeredSourceIds.has(sourceMatch[1])) failures.push(`Home/nature cluster references unregistered source ID: ${sourceMatch[1]}`);
  }
}
if (!clusters.includes("publicationState: 'staged'")) failures.push('Home/nature clusters must explicitly declare staged publication state.');
if (!clusters.includes('plannedCrossLinkTargets')) failures.push('Home/nature cluster link hints must be labeled planning-only.');

// Batch 8 is deliberately staged editorial copy. Until publication is explicitly approved,
// these paths must not leak into the public crawl registry, navigation, or file routes.
const stagedGuideSlugs = [
  'texas-hurricane-home-prep', 'texas-pool-guide', 'texas-pests-guide',
  'texas-snakes-guide', 'texas-wildlife-guide', 'texas-birds-guide',
  'texas-flowers-wildflowers-guide',
];
const stagedGuidePaths = stagedGuideSlugs.map((slug) => `/${slug}`);
for (const path of stagedGuidePaths) {
  if (routes.includes(`\"${path}\"`) || routes.includes(`'${path}'`)) failures.push(`Staged guide leaked into public route registry: ${path}`);
  if (homeGarden.includes(path)) failures.push(`Staged guide leaked into Home & Garden links: ${path}`);
}
for (const slug of stagedGuideSlugs) {
  if (fs.existsSync(`src/routes/${slug}.tsx`)) failures.push(`Staged guide has a public file route before publication approval: /${slug}`);
}

for (const field of ['verification', 'socialReady', 'sources', 'socialFormats', 'usage']) if (!types.includes(field)) failures.push(`Knowledge record type is missing field: ${field}`);
const requiredSocialFormats = [
  'fact-of-the-day', 'you-know-youre-a-texan-if', 'you-know-youre-from-texas-if',
  'only-texans-understand', 'til-texas-edition', 'only-in-texas', 'texas-trivia',
  'true-or-false', 'this-or-that', 'would-you-rather-texas', 'finish-the-sentence',
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
if (!scheduler.includes('buildDefaultTexasSocialBatch') || !scheduler.includes('TEXAS_KNOWLEDGE_CATALOG')) failures.push('Default social batching must use the canonical Knowledge Bank catalog.');
for (const seedExport of ['TEXAS_KNOWLEDGE_SEED', 'TEXAS_KNOWLEDGE_EXPANDED_SEED', 'TEXAS_CULTURAL_OBSERVATIONS']) {
  if (!catalog.includes(seedExport)) failures.push(`Canonical Knowledge Bank catalog is missing ${seedExport}.`);
}
if (!catalog.includes("record.verification !== 'needs-review'")) failures.push('Canonical social candidate selector must exclude needs-review records.');

const explicitRecordIds = (text) => [...text.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const helperObservationIds = [...observations.matchAll(/\bobservation\(\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
const ids = [
  ...explicitRecordIds(seed),
  ...explicitRecordIds(expanded),
  ...helperObservationIds,
];
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) failures.push(`Duplicate knowledge record id detected in source files: ${id}`);
  seen.add(id);
}
if (ids.length < 40) failures.push(`Expected at least 40 seeded knowledge records; found ${ids.length}.`);

const observationCount = helperObservationIds.length + ((seed + expanded).match(/verification:\s*['\"]editorial-observation['\"]/g) ?? []).length;
if (observationCount < 20) failures.push(`Expected at least 20 cultural observations; found ${observationCount}.`);
const verifiedCount = ((seed + expanded).match(/verification:\s*['\"]verified['\"]/g) ?? []).length;
if (verifiedCount < 15) failures.push(`Expected at least 15 verified/source-backed records; found ${verifiedCount}.`);

for (const slug of stagedGuideSlugs) {
  if (!guides.includes(`\"${slug}\"`) && !guides.includes(`'${slug}'`)) failures.push(`Staged evergreen guide batch is missing ${slug}.`);
}

if (failures.length) {
  console.error('Texas knowledge bank validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas knowledge bank validation passed: ${ids.length} seeded records, ${verifiedCount} verified records, ${observationCount} cultural observations, ${stagedGuidePaths.length} staged/non-public practical guides, ${registeredSourceIds.size} registered sources, and ${requiredSocialFormats.length} social formats.`);
