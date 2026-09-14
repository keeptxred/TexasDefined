import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubs = read('src/data/fixtures/texas-explained-road-system-stubs.ts');
const articles = read('src/data/fixtures/texas-explained-road-systems.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const hub = `${read('src/routes/texas-explained.tsx')}\n${read('src/components/editorial/TexasExplainedPage.tsx')}`;
const topology = read('src/data/fixtures/newest-evergreen.ts');
const articleRoute = read('src/routes/article.$slug.tsx');
const errors = [];

const profiles = [
  ['texas-ranch-to-market-roads-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-loops-spurs-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-business-routes-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-park-recreational-roads-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-historic-memorial-highways-explained', 'https://www.txdot.gov/projects/planning/highway-designations.html'],
];

for (const marker of [
  'const collectionLink = { href: "/texas-explained"',
  'const designationsLink = { href: "/article/texas-highway-designations-explained"',
]) if (!articles.includes(marker)) errors.push(`Shared road-system navigation contract missing: ${marker}`);

for (const [slug, sourceUrl] of profiles) {
  if (!stubs.includes(`"${slug}"`)) errors.push(`Missing road-system stub: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Missing full road-system article: ${slug}`);
  if (!articles.includes(sourceUrl)) errors.push(`Missing current TxDOT source URL: ${slug}`);
  if (!hub.includes(`"${slug}"`)) errors.push(`Texas Explained hub must surface road-system article: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`FM-road pillar must link to road-system article: ${slug}`);
  if (!articleRoute.includes(`"${slug}"`)) errors.push(`Shared article route must recognize road-system article: ${slug}`);
}

for (const marker of [
  'import { texasExplainedRoadSystemStubs }',
  '...texasExplainedRoadSystemStubs',
  'texasExplainedRoadSystemStubs.some((article) => article.slug === slug)',
  'await import("./texas-explained-road-systems")',
  'texasExplainedRoadSystemArticles.find',
]) if (!lazy.includes(marker)) errors.push(`Road-system lazy registration missing: ${marker}`);

for (const marker of [
  'const roadSystemSlugs = [',
  '...roadSystemSlugs',
  'roadSystems: orderedArticles(catalog, roadSystemSlugs)',
  '<DepthGrid articles={roadSystems} label="Texas road systems" />',
  '10 core guides · 25 deeper explainers',
  'Twenty-five focused explainers behind the core guides',
]) if (!hub.includes(marker)) errors.push(`Road-system hub contract missing: ${marker}`);

const paragraphCount = (block) => (block.match(/p\("/g) || []).length;
for (const [slug] of profiles) {
  const start = articles.indexOf(`slug: "${slug}"`);
  const next = start >= 0 ? articles.indexOf('\nexport const ', start + 1) : -1;
  const block = start >= 0 ? articles.slice(start, next > start ? next : articles.length) : '';
  if (paragraphCount(block) < 7) errors.push(`Road-system article too shallow (${paragraphCount(block)} paragraphs): ${slug}`);
  if (!block.includes('designationsLink') || !block.includes('collectionLink')) errors.push(`Road-system article must use designation and collection backlinks: ${slug}`);
}

for (const hero of [
  '/images/editorial/texas-rm-roads.svg',
  '/images/editorial/texas-loops-spurs.svg',
  '/images/editorial/texas-business-routes.svg',
  '/images/editorial/texas-park-recreational-roads.svg',
  '/images/editorial/texas-historic-memorial-routes.svg',
]) if (!stubs.includes(hero) || !articles.includes(hero)) errors.push(`Road-system hero contract missing: ${hero}`);

if (errors.length) {
  console.error('Texas Explained road-system validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('Texas Explained road-system batch passed: five current-TxDOT-backed explainers are lazy-loaded, hub-visible, reciprocal with the FM-road pillar, collection-aware and substantive.');
