import fs from 'node:fs';

const failures = [];
const route = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const relatedDestinationServer = fs.readFileSync('src/data/article-related-destinations.functions.ts', 'utf8');
const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');

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
  'getArticleRelatedDestinations({ data: { slugs: article.relatedDestinations } })',
  'article.relatedDestinations',
  'Places connected to this story',
  'More stories to read next',
  'More from {department.name}',
]) {
  if (!route.includes(feature)) failures.push(`Article SEO/Discover contract missing: ${feature}`);
}


for (const feature of [
  'createServerFn({ method: "POST" })',
  'MAX_RELATED_DESTINATIONS = 8',
  'getResolvedDestination',
  'prepareDestinationForDelivery',
]) {
  if (!relatedDestinationServer.includes(feature)) failures.push(`Article related-destination server boundary missing: ${feature}`);
}

if (route.includes('destinationsQuery({ limit: 5000 })')) {
  failures.push('Article detail route must not hydrate the 5,000-item destination catalog into the browser.');
}
if (relatedDestinationServer.includes('queryClient')) {
  failures.push('Article related-destination server boundary must not populate the public query cache.');
}

for (const feature of [
  'max-image-preview:large',
  'og:image:width',
  'og:image:height',
]) {
  if (!seo.includes(feature)) failures.push(`Shared SEO Discover contract missing: ${feature}`);
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
