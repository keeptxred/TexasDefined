import fs from 'node:fs';

const paths = {
  historicSites: 'src/data/historic-sites.ts',
  enrichment: 'src/data/national-cemetery-enrichment.ts',
  article: 'src/data/fixtures/texas-national-cemeteries-guide.ts',
  lazy: 'src/data/fixtures/lazy-newest-evergreen.ts',
  reciprocal: 'src/data/fixtures/military-museum-links.ts',
  runtime: 'src/data/destination-query-runtime.ts',
  productionSmoke: 'scripts/ci/verify-production-surfaces.mjs',
};

const failures = [];
for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) failures.push(`Missing national-cemetery dependency: ${path}`);
}

const read = (path) => (fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '');
const historicSites = read(paths.historicSites);
const enrichment = read(paths.enrichment);
const article = read(paths.article);
const lazy = read(paths.lazy);
const reciprocal = read(paths.reciprocal);
const runtime = read(paths.runtime);
const productionSmoke = read(paths.productionSmoke);

const sourceCheckedAt = '2026-08-29';
const cemeteries = [
  {
    slug: 'fort-sam-houston-national-cemetery',
    name: 'Fort Sam Houston National Cemetery',
    officialUrl: 'https://www.cem.va.gov/CEM/cems/nchp/ftsamhouston.asp',
    address: '1520 Harry Wurzbach Road, San Antonio, TX 78209',
    hours: 'Open daily from sunrise to sunset.',
    imageCredit: 'Travis K. Witt · CC BY-SA 4.0 · Wikimedia Commons',
  },
  {
    slug: 'houston-national-cemetery',
    name: 'Houston National Cemetery',
    officialUrl: 'https://www.cem.va.gov/CEM/cems/nchp/houston.asp',
    address: '10410 Veterans Memorial Drive, Houston, TX 77038',
    hours: 'Open daily from 6:00 a.m. to 9:00 p.m.',
    imageCredit: 'WhisperToMe · CC0 · Wikimedia Commons',
  },
  {
    slug: 'dallas-fort-worth-national-cemetery',
    name: 'Dallas-Fort Worth National Cemetery',
    officialUrl: 'https://www.cem.va.gov/cems/nchp/DallasFtWorth.asp',
    address: '2000 Mountain Creek Parkway, Dallas, TX 75211',
    hours: 'Open daily from sunrise to sunset.',
    imageCredit: 'U.S. Department of Veterans Affairs · Public domain',
  },
];

for (const cemetery of cemeteries) {
  for (const marker of [
    `slug: \"${cemetery.slug}\"`,
    `name: \"${cemetery.name}\"`,
    `officialUrl: \"${cemetery.officialUrl}\"`,
  ]) {
    if (!historicSites.includes(marker)) failures.push(`Historic-site seed contract missing '${marker}': ${cemetery.slug}`);
  }

  for (const marker of [
    `\"${cemetery.slug}\": {`,
    `address: \"${cemetery.address}\"`,
    cemetery.hours,
    'visitor kiosk',
    cemetery.imageCredit,
  ]) {
    if (!enrichment.toLowerCase().includes(marker.toLowerCase())) failures.push(`Visitor enrichment missing '${marker}': ${cemetery.slug}`);
  }

  if (!article.includes(`/destination/${cemetery.slug}`)) failures.push(`Statewide guide does not link destination: ${cemetery.slug}`);
  if (!article.includes(`\"${cemetery.slug}\"`)) failures.push(`Statewide guide related destinations missing: ${cemetery.slug}`);
  if (!productionSmoke.includes(`/destination/${cemetery.slug}`)) failures.push(`Production smoke does not protect destination route: ${cemetery.slug}`);
}

for (const marker of [
  `sourceCheckedAt: \"${sourceCheckedAt}\"`,
  'U.S. Department of Veterans Affairs — National Cemetery Administration',
  'active burial site',
  'funeral processions',
  'Verify current hours',
  'areaGuide:',
]) {
  if (!enrichment.includes(marker)) failures.push(`National-cemetery enrichment safeguard missing: ${marker}`);
}

for (const marker of [
  'slug: \"texas-national-cemeteries-guide\"',
  'category: \"texas-history\"',
  'sourceName: \"U.S. Department of Veterans Affairs — National Cemetery Administration\"',
  'sourceUrl: \"https://www.cem.va.gov/find-cemetery/state.asp?STATE=TX\"',
  'internalLinks: [',
  'active burial grounds first',
  'not conventional tourist attractions',
  'Funeral processions',
  'grieving families',
  'August 29, 2026',
  '/article/texas-medal-of-honor-heroes',
  '/article/texas-military-museums-historic-sites-guide',
  '/texas-history',
]) {
  if (!article.includes(marker)) failures.push(`National-cemetery statewide guide safeguard missing: ${marker}`);
}

const paragraphCount = (article.match(/\bp\(\"/g) ?? []).length;
const headingCount = (article.match(/\bh\(\"/g) ?? []).length;
if (paragraphCount < 14) failures.push(`National-cemetery statewide guide is too thin: ${paragraphCount} paragraphs`);
if (headingCount < 5) failures.push(`National-cemetery statewide guide lacks section depth: ${headingCount} headings`);

for (const marker of [
  'slug: \"texas-national-cemeteries-guide\"',
  'import(\"./texas-national-cemeteries-guide\")',
  'texasNationalCemeteriesGuideArticle',
]) {
  if (!lazy.includes(marker)) failures.push(`National-cemetery lazy-loading contract missing: ${marker}`);
}

for (const sourceSlug of [
  'texas-military-history-timeline',
  'texas-military-museums-historic-sites-guide',
  'texas-medal-of-honor-heroes',
  'texas-world-war-ii-bases-pow-camps',
  'texas-world-war-ii-historic-sites-guide',
  'texas-national-guard-history',
  'san-antonio-military-aviation-history',
  'texas-cold-war-military-history',
  'texas-recent-wars-military-history',
]) {
  if (!reciprocal.includes(`\"${sourceSlug}\"`)) failures.push(`Military-history reciprocal source missing cemetery discovery: ${sourceSlug}`);
}
if (!reciprocal.includes('href: \"/article/texas-national-cemeteries-guide\"')) failures.push('Military-history reciprocal registry is missing the statewide cemetery guide link.');

for (const marker of [
  'enrichNationalCemeteryDestination',
  '.map(enrichNationalCemeteryDestination)',
]) {
  if (!runtime.includes(marker)) failures.push(`National-cemetery runtime enrichment contract missing: ${marker}`);
}

for (const [path, needle] of [
  ['/article/texas-national-cemeteries-guide', 'Texas National Cemeteries'],
  ['/destination/fort-sam-houston-national-cemetery', 'Fort Sam Houston National Cemetery'],
  ['/destination/houston-national-cemetery', 'Houston National Cemetery'],
  ['/destination/dallas-fort-worth-national-cemetery', 'Dallas-Fort Worth National Cemetery'],
]) {
  if (!productionSmoke.includes(`'${path}'`) || !productionSmoke.includes(`'${needle}'`)) failures.push(`Production verification contract missing: ${path}`);
}

if (failures.length) {
  console.error('National cemetery authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`National cemetery authority validation passed: ${cemeteries.length} VA/NCA destinations and the statewide guide retain source freshness, visitor dignity, rights-safe imagery, reciprocal discovery, lazy loading, runtime enrichment and production-route protection.`);
