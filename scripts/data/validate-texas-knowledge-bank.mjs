import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const types = read('src/data/knowledge-bank/types.ts');
const sources = read('src/data/knowledge-bank/sources.ts');
const seed = read('src/data/knowledge-bank/seed.ts');
const expanded = read('src/data/knowledge-bank/seed-expanded.ts');
const observations = read('src/data/knowledge-bank/cultural-observations.ts');
const social = read('src/data/knowledge-bank/social.ts');
const scheduler = read('src/data/knowledge-bank/social-batch.ts');
const validation = read('src/data/knowledge-bank/validation.ts');
const guides = read('src/data/texas-evergreen-guides-batch8.ts');
const routes = read('src/lib/public-routes.ts');
const homeGarden = read('src/routes/home-garden.tsx');

const requiredSourceIds = [
  'texas-open-data', 'tpwd-wildlife', 'tpwd-plants', 'ebird', 'usfws-birds',
  'texas-historical-commission', 'tslac', 'texas-demographic-center', 'census',
  'tnris', 'texas-water-data', 'txdot', 'texas-comptroller', 'noaa',
  'nws-hurricanes', 'usgs', 'texas-am-agrilife', 'texas-am-fire-ants', 'tdem-emergency',
];
for (const id of requiredSourceIds) if (!sources.includes(`id:'${id}'`) && !sources.includes(`id: '${id}'`)) failures.push(`Missing required knowledge source: ${id}`);

const guidePaths = [
  '/texas-hurricane-home-prep', '/texas-pool-guide', '/texas-pests-guide',
  '/texas-snakes-guide', '/texas-wildlife-guide', '/texas-birds-guide',
  '/texas-flowers-wildflowers-guide',
];
for (const path of guidePaths) {
  if (!routes.includes(`"${path}"`) && !routes.includes(`'${path}'`)) failures.push(`Guide is not crawl-governed as a public route: ${path}`);
  if (!homeGarden.includes(path)) failures.push(`Home & Garden does not link to practical guide: ${path}`);
}

for (const field of ['verification', 'socialReady', 'sources', 'socialFormats', 'usage']) if (!types.includes(field)) failures.push(`Knowledge record type is missing field: ${field}`);
for (const format of ['fact-of-the-day', 'you-know-youre-a-texan-if', 'texas-trivia', 'wildlife-of-the-day', 'wildflower-of-the-day']) if (!types.includes(format)) failures.push(`Missing social format: ${format}`);

if (!validation.includes("record.verification === 'needs-review' && record.socialReady")) failures.push('Validation must block needs-review records from social use.');
if (!validation.includes("record.verification === 'verified' && !record.sources.length")) failures.push('Validation must block verified records with no source.');
if (!social.includes('if (!record.socialReady)')) failures.push('Social renderer must reject non-social-ready records.');
if (!social.includes('record.socialFormats?.length') || !social.includes('includes(format)')) failures.push('Social renderer must enforce approved formats.');
if (!scheduler.includes('excludedRecordIds') || !scheduler.includes('timesUsed') || !scheduler.includes('preferredSeason')) failures.push('Social scheduler must support exclusions, usage scoring and season preference.');

const combinedRecords = `${seed}\n${expanded}\n${observations}`;
const ids = [...combinedRecords.matchAll(/\bid:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) failures.push(`Duplicate knowledge record id detected in source files: ${id}`);
  seen.add(id);
}
if (ids.length < 40) failures.push(`Expected at least 40 seeded knowledge records; found ${ids.length}.`);

const observationCount = (observations.match(/verification:\s*['"]editorial-observation['"]/g) ?? []).length;
if (observationCount < 20) failures.push(`Expected at least 20 cultural observations; found ${observationCount}.`);
const verifiedCount = ((seed + expanded).match(/verification:\s*['"]verified['"]/g) ?? []).length;
if (verifiedCount < 15) failures.push(`Expected at least 15 verified/source-backed records; found ${verifiedCount}.`);

for (const slug of ['texas-hurricane-home-prep','texas-pool-guide','texas-pests-guide','texas-snakes-guide','texas-wildlife-guide','texas-birds-guide','texas-flowers-wildflowers-guide']) {
  if (!guides.includes(`"${slug}"`) && !guides.includes(`'${slug}'`)) failures.push(`Evergreen guide batch is missing ${slug}.`);
}

if (failures.length) {
  console.error('Texas knowledge bank validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas knowledge bank validation passed: ${ids.length} seeded records, ${verifiedCount} verified records, ${observationCount} cultural observations, ${guidePaths.length} governed practical guides, and ${requiredSourceIds.length} required authoritative sources.`);
