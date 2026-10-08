import fs from 'node:fs';

const failures = [];
const route = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');
const discoverMaterializer = fs.readFileSync('scripts/assets/materialize-discover-overrides.mjs', 'utf8');

for (const feature of [
  'DISCOVER_MIN_IMAGE_WIDTH = 1200',
  'fetchPriority="high"',
  'rel: "preload"',
  'imageWidth: article.hero.width',
  'imageHeight: article.hero.height',
  'publishedTime: article.publishedAt',
  'representativeOfPage: true',
  'thumbnailUrl: imageUrl',
  'genre: department.name',
  'hasPart: relatedDestinations.map',
  'getDestinationsBySlugs({ data: { slugs: article.relatedDestinations.slice(0, 8) } })',
  'function articleAutoLinkGraph(',
  'article.relatedDestinations',
  'Places connected to this story',
  'More stories to read next',
  'More from {department.name}',
]) {
  if (!route.includes(feature)) failures.push(`Article SEO/Discover contract missing: ${feature}`);
}

for (const feature of [
  'max-image-preview:large',
  'og:image:width',
  'og:image:height',
]) {
  if (!seo.includes(feature)) failures.push(`Shared SEO Discover contract missing: ${feature}`);
}

for (const feature of [
  '|c:crockett|',
  '|c:dickens|',
  '|d:zapata-county-museum-history|',
]) {
  if (!seo.includes(feature)) failures.push(`Shared SEO governed Discover route missing: ${feature}`);
}

for (const [slug, source] of [
  ['crockett', 'Crockett_county_courthouse_2009.jpg?width=1600'],
  ['dickens', 'Dickens02_courthouse.jpg?width=1600'],
  ['zapata-county-museum-history', '/images/zapata-county-museum-history-editorial.svg'],
]) {
  if (!discoverMaterializer.includes(`"${slug}"`) || !discoverMaterializer.includes(source)) {
    failures.push(`Governed Discover materializer source missing for ${slug}.`);
  }
}

if (route.includes('destinationsQuery({ limit: 5000 })')) {
  failures.push('Article route must not hydrate the full destination catalog for related-place rendering.');
}

if (route.includes('dateModified: article.publishedAt')) {
  failures.push('Article route must not fabricate dateModified from the publication timestamp.');
}

if (failures.length) {
  console.error('Article SEO/Discover validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Article metadata, large-image Discover handling, entity relationships, read-next pathways and freshness integrity are protected.');
