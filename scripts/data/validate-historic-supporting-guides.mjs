import fs from 'node:fs';

const lazyPath = 'src/data/fixtures/lazy-historic-supporting.ts';
const repositoryPath = 'src/data/fixtures/repositories.ts';
const seedPath = 'src/data/historic-sites.ts';
const reciprocalPath = 'src/data/historic-site-evergreen-links.ts';
const clusterPath = 'src/data/historic-site-clusters.ts';
const sitemapPath = 'src/routes/sitemap[.]xml.ts';
const failures = [];

for (const path of [lazyPath, repositoryPath, seedPath, reciprocalPath, clusterPath, sitemapPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing supporting historic-guide dependency: ${path}`);
}

const lazy = fs.existsSync(lazyPath) ? fs.readFileSync(lazyPath, 'utf8') : '';
const repositories = fs.existsSync(repositoryPath) ? fs.readFileSync(repositoryPath, 'utf8') : '';
const seeds = fs.existsSync(seedPath) ? fs.readFileSync(seedPath, 'utf8') : '';
const reciprocal = fs.existsSync(reciprocalPath) ? fs.readFileSync(reciprocalPath, 'utf8') : '';
const clusters = fs.existsSync(clusterPath) ? fs.readFileSync(clusterPath, 'utf8') : '';
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';

const seedBlock = seeds.match(/export const historicSiteSeeds:[\s\S]*?= \[([\s\S]*?)\n\];/);
const seedSlugs = seedBlock ? [...seedBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]) : [];
if (seedSlugs.length !== 46) failures.push(`Expected 46 statewide historic-site seeds; found ${seedSlugs.length}.`);

const guides = [
  {
    slug: 'texas-cattle-ranching-history-guide',
    path: 'src/data/fixtures/texas-cattle-ranching-history-guide.ts',
    exportName: 'texasCattleRanchingHistoryGuideArticle',
    sourceUrl: 'https://thc.texas.gov/state-historic-sites/official-state-texas-longhorn-herd/state-texas-longhorn-herd-history',
    credit: 'Pi3.124 · CC BY-SA 4.0 · Wikimedia Commons',
    destinations: ['official-texas-longhorn-herd', 'fort-griffin', 'goodnight-ranch'],
    clusterId: 'cattle-ranching',
  },
  {
    slug: 'texas-historic-travel-transportation-guide',
    path: 'src/data/fixtures/texas-historic-travel-transportation-guide.ts',
    exportName: 'texasHistoricTravelTransportationGuideArticle',
    sourceUrl: 'https://thc.texas.gov/state-historic-sites/fanthorp-inn/fanthorp-inn-history',
    credit: 'Renelibrary · CC BY-SA 4.0 · Wikimedia Commons',
    destinations: ['fanthorp-inn', 'landmark-inn', 'slaton-harvey-house', 'fort-lancaster'],
    clusterId: 'historic-transportation',
  },
];

for (const guide of guides) {
  if (!fs.existsSync(guide.path)) { failures.push(`Missing historic supporting guide: ${guide.path}`); continue; }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Historic supporting guide slug mismatch: ${guide.slug}.`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Historic supporting guide export mismatch: ${guide.exportName}.`);
  if (!source.includes('category: "texas-history"')) failures.push(`Historic supporting guide must remain in texas-history: ${guide.slug}.`);
  if (!source.includes('sourceName: "Texas Historical Commission"')) failures.push(`Historic supporting guide must retain THC source identity: ${guide.slug}.`);
  if (!source.includes(`sourceUrl: "${guide.sourceUrl}"`)) failures.push(`Historic supporting guide source URL mismatch: ${guide.slug}.`);
  if (!source.includes(`credit: "${guide.credit}"`)) failures.push(`Historic supporting guide exact-image license/credit mismatch: ${guide.slug}.`);
  if (!source.includes('relatedDestinations: [')) failures.push(`Historic supporting guide lacks related destination discovery: ${guide.slug}.`);
  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 14) failures.push(`Historic supporting guide is too thin (${paragraphCount} paragraphs): ${guide.slug}.`);
  if (headingCount < 6) failures.push(`Historic supporting guide lacks section depth (${headingCount} headings): ${guide.slug}.`);
  for (const destination of guide.destinations) {
    if (!seedSlugs.includes(destination)) failures.push(`Historic supporting guide references non-seed destination ${destination}: ${guide.slug}.`);
    if (!source.includes(destination)) failures.push(`Historic supporting guide does not link destination ${destination}: ${guide.slug}.`);
    if (!reciprocal.includes(`"${destination}"`)) failures.push(`Historic reciprocal registry is missing ${destination}: ${guide.slug}.`);
  }
  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Historic supporting lazy stub missing: ${guide.slug}.`);
  const moduleName = guide.path.split('/').pop().replace('.ts', '');
  if (!lazy.includes(`import("./${moduleName}")`)) failures.push(`Historic supporting dynamic import missing: ${guide.slug}.`);
  if (!lazy.includes(guide.exportName)) failures.push(`Historic supporting lazy export mismatch: ${guide.slug}.`);
  if (!reciprocal.includes(`href: "/article/${guide.slug}"`)) failures.push(`Historic supporting reciprocal article link missing: ${guide.slug}.`);
  if (!clusters.includes(`id: "${guide.clusterId}"`)) failures.push(`Historic supporting thematic cluster missing: ${guide.clusterId}.`);
}

for (const marker of [
  'historicSupportingStubs, loadHistoricSupportingArticle',
  '...historicSupportingStubs',
  'loadHistoricSupportingArticle(scope.brandId, slug)',
]) if (!repositories.includes(marker)) failures.push(`Historic supporting repository integration missing: ${marker}`);

for (const marker of ['export const historicSupportingStubs', 'export async function loadHistoricSupportingArticle']) {
  if (!lazy.includes(marker)) failures.push(`Historic supporting lazy registry contract missing: ${marker}`);
}

if (!sitemap.includes('platform.articles.list(scope)')) failures.push('Historic supporting sitemap discovery contract missing: platform.articles.list(scope)');
const articleCatalogPattern = /\.\.\.articles\s*\.filter\(\(article\)\s*=>\s*!isLegacyCountySeriesArticle\(article\.slug\)\s*&&\s*isArticleIndexReady\(article\)\)\s*\.map\(\(article\)\s*=>\s*\(\{\s*path:\s*`\/article\/\$\{article\.slug\}`/s;
if (!articleCatalogPattern.test(sitemap)) failures.push('Historic supporting sitemap discovery contract missing: strict quality-gated canonical article catalog.');

if (failures.length) {
  console.error('Historic supporting-guide validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Historic supporting-guide validation passed: ${guides.length} source-backed lazy guides retain substantive depth, exact licensed heroes, ${guides.reduce((count, guide) => count + guide.destinations.length, 0)} destination relationships, reciprocal discovery, thematic clusters, repository listing and strict quality-gated canonical sitemap publication.`);
