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

const officialDepthSources = [
  'https://www.lcra.org/water/dams-and-lakes/',
  'https://www.lcra.org/water/flood-management/key-elevations-for-lake-travis-during-floods/',
  'https://www.swf-wc.usace.army.mil/whitney/',
  'https://brazos.org/about-us/reservoirs/possum-kingdom-lake',
  'https://brazos.org/about-us/water-supply',
  'https://srala-toledo.com/sra/',
  'https://srala-toledo.com/engineering/',
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

for (const sourceUrl of officialDepthSources) {
  if (!articles.includes(sourceUrl)) errors.push(`Missing official reservoir depth source: ${sourceUrl}`);
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

const articleBlock = (source, slug) => {
  const start = source.indexOf(`slug: "${slug}"`);
  if (start < 0) return '';
  const next = source.indexOf('\nexport const ', start + 1);
  return source.slice(start, next > start ? next : source.length);
};

const paragraphCount = (block) => (block.match(/\bp\("/g) || []).length;
const bodyWordCount = (block) => {
  const start = block.indexOf('body: [');
  if (start < 0) return 0;
  const end = block.indexOf('\n  ],', start);
  if (end < 0) return 0;
  const body = block.slice(start, end);
  const literals = body.match(/"(?:\\.|[^"\\])*"/g) ?? [];
  const text = literals.map((literal) => {
    try { return JSON.parse(literal); } catch { return ''; }
  }).join(' ');
  return (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
};

const RESERVOIR_MIN_PARAGRAPHS = 12;
const RESERVOIR_MIN_WORDS = 850;

for (const [slug] of profiles) {
  const block = articleBlock(articles, slug);
  const paragraphs = paragraphCount(block);
  const words = bodyWordCount(block);
  if (paragraphs < RESERVOIR_MIN_PARAGRAPHS) errors.push(`Reservoir profile is too shallow (${paragraphs} paragraphs; minimum ${RESERVOIR_MIN_PARAGRAPHS}): ${slug}`);
  if (words < RESERVOIR_MIN_WORDS) errors.push(`Reservoir profile is too thin (${words} body words; minimum ${RESERVOIR_MIN_WORDS}): ${slug}`);
  if (!block.includes('readingMinutes: 6')) errors.push(`Reservoir profile reading time must match expanded authority depth: ${slug}`);
  for (const link of ['reservoirsLink', 'basinsLink', 'collectionLink']) {
    if (!block.includes(link)) errors.push(`Reservoir profile ${slug} must use ${link}`);
  }
}

if (!stubs.includes('readingMinutes: 6')) errors.push('Reservoir discovery stubs must advertise the expanded six-minute authority depth.');

if (errors.length) {
  console.error('Texas Explained reservoir profile validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Texas Explained reservoir batch passed: five TWDB-backed water-system profiles remain lazy-loaded, hub-visible, reciprocal, source-backed, collection-aware and substantive at ${RESERVOIR_MIN_PARAGRAPHS}+ paragraphs and ${RESERVOIR_MIN_WORDS}+ body words each.`);