import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubs = read('src/data/fixtures/texas-explained-reservoir-profile-stubs.ts');
const articles = read('src/data/fixtures/texas-explained-reservoir-profiles.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const hub = `${read('src/routes/texas-explained.tsx')}\n${read('src/components/editorial/TexasExplainedPage.tsx')}`;
const topology = read('src/data/fixtures/newest-evergreen.ts');
const articleRoute = read('src/routes/article.$slug.tsx');
const errors = [];

const profiles = [
  ['lake-buchanan-water-system-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/'],
  ['lake-travis-water-system-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/index.asp'],
  ['lake-whitney-water-system-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/index.asp'],
  ['possum-kingdom-water-system-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/index.asp'],
  ['toledo-bend-water-system-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/index.asp'],
];

for (const marker of [
  'const reservoirsLink = { href: "/article/texas-lakes-reservoirs-explained"',
  'const basinsLink = { href: "/article/texas-river-basins-guide"',
  'const collectionLink = { href: "/texas-explained"',
]) if (!articles.includes(marker)) errors.push(`Shared reservoir navigation contract missing: ${marker}`);

for (const [slug, sourceUrl] of profiles) {
  if (!stubs.includes(`"${slug}"`)) errors.push(`Missing reservoir profile stub: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Missing full reservoir profile: ${slug}`);
  if (!articles.includes(sourceUrl)) errors.push(`Missing TWDB reservoir source URL: ${slug}`);
  if (!hub.includes(`"${slug}"`)) errors.push(`Texas Explained hub must surface reservoir profile: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`Reservoir pillar must link to profile: ${slug}`);
  if (!articleRoute.includes(`"${slug}"`)) errors.push(`Shared article route must recognize reservoir profile: ${slug}`);
}

for (const marker of [
  'import { texasExplainedReservoirProfileStubs }',
  '...texasExplainedReservoirProfileStubs',
  'texasExplainedReservoirProfileStubs.some((article) => article.slug === slug)',
  'await import("./texas-explained-reservoir-profiles")',
  'texasExplainedReservoirProfileArticles.find',
]) if (!lazy.includes(marker)) errors.push(`Reservoir lazy-registration contract missing: ${marker}`);

for (const marker of [
  'const reservoirProfileSlugs = [',
  '...reservoirProfileSlugs',
  'reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs)',
  '<DepthGrid articles={reservoirProfiles} label="Reservoir water systems" />',
  '10 core guides · 25 deeper explainers',
  'Twenty-five focused explainers behind the core guides',
]) if (!hub.includes(marker)) errors.push(`Reservoir hub contract missing: ${marker}`);

const paragraphCount = (block) => (block.match(/p\("/g) || []).length;
for (const [slug] of profiles) {
  const start = articles.indexOf(`slug: "${slug}"`);
  const next = start >= 0 ? articles.indexOf('\nexport const ', start + 1) : -1;
  const block = start >= 0 ? articles.slice(start, next > start ? next : articles.length) : '';
  if (paragraphCount(block) < 7) errors.push(`Reservoir profile is too shallow (${paragraphCount(block)} paragraphs): ${slug}`);
  for (const link of ['reservoirsLink', 'basinsLink', 'collectionLink']) {
    if (!block.includes(link)) errors.push(`Reservoir profile ${slug} must use ${link}`);
  }
}

if (errors.length) {
  console.error('Texas Explained reservoir profile validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('Texas Explained reservoir batch passed: five TWDB-backed water-system profiles are lazy-loaded, hub-visible, reciprocal with the reservoir pillar, collection-aware and substantive.');
