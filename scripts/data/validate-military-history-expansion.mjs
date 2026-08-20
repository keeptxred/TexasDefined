import fs from 'node:fs';

const lazyPath = 'src/data/fixtures/lazy-military-history-expansion.ts';
const repositoriesPath = 'src/data/fixtures/repositories.ts';
const historyHubPath = 'src/routes/texas-history.tsx';
const reciprocalPath = 'src/data/historic-site-evergreen-links.ts';
const sourcingPath = 'docs/free-image-sourcing.md';
const sitemapPath = 'src/routes/sitemap[.]xml.ts';

const lazy = fs.readFileSync(lazyPath, 'utf8');
const repositories = fs.readFileSync(repositoriesPath, 'utf8');
const historyHub = fs.readFileSync(historyHubPath, 'utf8');
const reciprocal = fs.readFileSync(reciprocalPath, 'utf8');
const sourcing = fs.readFileSync(sourcingPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const failures = [];

const guides = [
  {
    slug: 'texas-us-mexican-war-palo-alto-guide',
    path: 'src/data/fixtures/texas-us-mexican-war-palo-alto-guide.ts',
    exportName: 'texasUsMexicanWarPaloAltoGuideArticle',
    sourceName: 'National Park Service',
    sourceUrl: 'https://www.nps.gov/paal/learn/historyculture/index.htm',
    reciprocalHref: '/article/texas-us-mexican-war-palo-alto-guide',
    requiredTerms: ['Palo Alto', 'Resaca de la Palma', 'Rio Grande', 'Treaty of Guadalupe Hidalgo'],
  },
  {
    slug: 'texas-national-guard-history',
    path: 'src/data/fixtures/texas-national-guard-history.ts',
    exportName: 'texasNationalGuardHistoryArticle',
    sourceName: 'Texas Military Department',
    sourceUrl: 'https://tmd.texas.gov/texas-military-department-history',
    requiredTerms: ['Camp Mabry', '36th', 'Texas State Guard', '1903'],
  },
  {
    slug: 'san-antonio-military-aviation-history',
    path: 'src/data/fixtures/san-antonio-military-aviation-history.ts',
    exportName: 'sanAntonioMilitaryAviationHistoryArticle',
    sourceName: 'Joint Base San Antonio',
    sourceUrl: 'https://www.jbsa.mil/Information/JBSA-History-Fact-Sheets/',
    requiredTerms: ['Kelly Field', 'Brooks Field', 'Randolph', 'Lackland', 'Fort Sam Houston'],
  },
  {
    slug: 'texas-world-war-ii-bases-pow-camps',
    path: 'src/data/fixtures/texas-world-war-ii-bases-pow-camps.ts',
    exportName: 'texasWorldWarIIBasesPowCampsArticle',
    sourceName: 'Texas Historical Commission',
    sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-world-war-ii',
    reciprocalHref: '/article/texas-world-war-ii-bases-pow-camps',
    requiredTerms: ['Camp Hood', 'Camp Swift', 'Camp Wolters', 'prisoner-of-war', 'Crystal City'],
  },
  {
    slug: 'battleship-texas-history-restoration-guide',
    path: 'src/data/fixtures/battleship-texas-history-restoration-guide.ts',
    exportName: 'battleshipTexasHistoryRestorationGuideArticle',
    sourceName: 'Battleship Texas Foundation',
    sourceUrl: 'https://battleshiptexas.org/',
    requiredTerms: ['World War I', 'Normandy', 'Iwo Jima', 'Okinawa', 'Galveston'],
  },
];

for (const guide of guides) {
  if (!fs.existsSync(guide.path)) {
    failures.push(`Missing military history guide: ${guide.path}`);
    continue;
  }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Slug mismatch: ${guide.slug}`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Export mismatch: ${guide.exportName}`);
  if (!source.includes('category: "texas-history"')) failures.push(`Guide is not in texas-history: ${guide.slug}`);
  if (!source.includes(`sourceName: "${guide.sourceName}"`)) failures.push(`Source name mismatch: ${guide.slug}`);
  if (!source.includes(`sourceUrl: "${guide.sourceUrl}"`)) failures.push(`Source URL mismatch: ${guide.slug}`);
  if (!source.includes('internalLinks: [')) failures.push(`Missing internal-link cluster: ${guide.slug}`);
  if (!source.includes('hero: {')) failures.push(`Missing hero image: ${guide.slug}`);
  if (!source.includes('credit:')) failures.push(`Missing hero image credit: ${guide.slug}`);
  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 14) failures.push(`Guide is too thin (${paragraphCount} paragraphs): ${guide.slug}`);
  if (headingCount < 6) failures.push(`Guide lacks section depth (${headingCount} headings): ${guide.slug}`);
  for (const term of guide.requiredTerms) if (!source.includes(term)) failures.push(`Guide lacks required topic '${term}': ${guide.slug}`);

  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Lazy stub missing: ${guide.slug}`);
  const moduleName = guide.path.split('/').pop().replace('.ts', '');
  if (!lazy.includes(`import("./${moduleName}")`)) failures.push(`Dynamic import missing: ${guide.slug}`);
  if (!lazy.includes(guide.exportName)) failures.push(`Lazy export name mismatch: ${guide.slug}`);
  if (!historyHub.includes(`slug: "${guide.slug}"`)) failures.push(`Texas History hub does not feature: ${guide.slug}`);
  if (guide.reciprocalHref && !reciprocal.includes(`href: "${guide.reciprocalHref}"`)) failures.push(`Historic-site reciprocal link missing: ${guide.slug}`);
}

for (const marker of [
  'militaryHistoryExpansionStubs',
  'loadMilitaryHistoryExpansionArticle',
  '...militaryHistoryExpansionStubs',
  'const militaryHistoryArticle = await loadMilitaryHistoryExpansionArticle',
]) if (!repositories.includes(marker)) failures.push(`Article repository is missing military expansion contract: ${marker}`);

for (const marker of [
  'export const militaryHistoryExpansionStubs',
  'export async function loadMilitaryHistoryExpansionArticle',
]) if (!lazy.includes(marker)) failures.push(`Lazy military expansion registry is missing: ${marker}`);

for (const marker of [
  'The Portal to Texas History',
  'Texas Digital Archive',
  'Library of Congress',
  'Wikimedia Commons',
  'PICRYL',
  'Pexels',
  'No known restrictions',
  'Historical image workflow',
]) if (!sourcing.includes(marker)) failures.push(`Historical image sourcing policy is missing: ${marker}`);

for (const marker of [
  'platform.articles.list(scope)',
  'articles.filter((article) => !isLegacyCountySeriesArticle(article.slug)).map((article) => ({ path: `/article/${article.slug}`',
]) if (!sitemap.includes(marker)) failures.push(`Article sitemap discovery contract missing: ${marker}`);

for (const marker of [
  'historicAuthorityGuides',
  '{historicAuthorityGuides.length} routes into the statewide collection',
  'Plan history by story',
]) if (!historyHub.includes(marker)) failures.push(`History hub presentation contract missing: ${marker}`);

if (failures.length) {
  console.error('Military history expansion validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Military history expansion validation passed: ${guides.length} source-backed, lazy-loaded guides retain substantive depth, explicit History-hub discovery, article sitemap publication, internal linking and archival-image sourcing rules.`);
