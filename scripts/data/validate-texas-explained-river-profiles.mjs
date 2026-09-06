import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubs = read('src/data/fixtures/texas-explained-river-profile-stubs.ts');
const articles = read('src/data/fixtures/texas-explained-river-profiles.ts');
const pillar = read('src/data/fixtures/texas-rivers-explained.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const hub = `${read('src/routes/texas-explained.tsx')}\n${read('src/components/editorial/TexasExplainedPage.tsx')}`;
const topology = read('src/data/fixtures/newest-evergreen.ts');
const errors = [];

const profiles = [
  ['texas-brazos-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp'],
  ['texas-colorado-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/'],
  ['texas-guadalupe-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp'],
  ['texas-trinity-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp'],
  ['texas-rio-grande-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/'],
];

for (const marker of [
  'title: "Major Rivers of Texas: Basins, Regions & Waterways Explained"',
  'major rivers and river basins of Texas',
  'Major Texas rivers by region and basin',
  'West Texas and the mountains',
  'Central Texas and the plains',
  'Hill Country and South-Central Texas',
  'North Texas',
  'East Texas',
  'href: "/article/texas-river-basins-guide"',
  'href: "/article/texas-lakes-reservoirs-explained"',
]) if (!pillar.includes(marker)) errors.push(`GSC river-intent contract missing: ${marker}`);

for (const marker of [
  'const riversLink = { href: "/article/texas-rivers-explained"',
  'const basinsLink = { href: "/article/texas-river-basins-guide"',
  'const collectionLink = { href: "/texas-explained"',
]) if (!articles.includes(marker)) errors.push(`Shared river profile navigation contract missing: ${marker}`);

for (const [slug, sourceUrl] of profiles) {
  if (!stubs.includes(`"${slug}"`)) errors.push(`Missing river profile stub: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Missing full river profile: ${slug}`);
  if (!articles.includes(sourceUrl)) errors.push(`Missing TWDB source URL for ${slug}`);
  if (!hub.includes(`"${slug}"`)) errors.push(`Texas Explained hub must surface river profile: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`Texas rivers pillar must link to river profile: ${slug}`);
}

for (const marker of [
  'import { texasExplainedRiverProfileStubs }',
  '...texasExplainedRiverProfileStubs',
  'texasExplainedRiverProfileStubs.some((article) => article.slug === slug)',
  'await import("./texas-explained-river-profiles")',
  'texasExplainedRiverProfileArticles.find',
]) if (!lazy.includes(marker)) errors.push(`River profile lazy-registration contract missing: ${marker}`);

for (const marker of [
  'const riverProfileSlugs = [',
  '...riverProfileSlugs',
  'riverProfiles: orderedArticles(catalog, riverProfileSlugs)',
  '<DepthGrid articles={riverProfiles} label="Major river profiles" />',
  '10 core guides · 25 deeper explainers',
  'Twenty-five focused explainers behind the core guides',
]) if (!hub.includes(marker)) errors.push(`River profile hub contract missing: ${marker}`);

for (const marker of [
  'Brazos River explained',
  'Texas Colorado River explained',
  'Guadalupe River explained',
  'Trinity River explained',
  'Rio Grande explained',
]) if (!topology.includes(marker)) errors.push(`Texas rivers reciprocal navigation missing: ${marker}`);

const paragraphCount = (block) => (block.match(/p\("/g) || []).length;
for (const [slug] of profiles) {
  const start = articles.indexOf(`slug: "${slug}"`);
  const next = start >= 0 ? articles.indexOf('\nexport const ', start + 1) : -1;
  const block = start >= 0 ? articles.slice(start, next > start ? next : articles.length) : '';
  if (paragraphCount(block) < 7) errors.push(`River profile is too shallow (${paragraphCount(block)} paragraphs): ${slug}`);
  if (!block.includes('riversLink') || !block.includes('basinsLink') || !block.includes('collectionLink')) {
    errors.push(`River profile must use statewide rivers, basin and collection backlinks: ${slug}`);
  }
}

if (errors.length) {
  console.error('Texas Explained river profile validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Texas Explained river authority passed: the GSC-focused statewide river title, basin/region answer layer and internal links are protected alongside five TWDB-backed, lazy-loaded, hub-visible, substantive river profiles.');