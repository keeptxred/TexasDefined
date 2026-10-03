import fs from 'node:fs';

const failures = [];
const route = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
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

const discoverImageOverrides = [
  ['/event/chappell-hill-bluebonnet-festival', '/images/discover/chappell-hill-bluebonnet-festival.webp'],
  ['/article/ima-hogg-texas-legacy', '/images/discover/ima-hogg-texas-legacy.webp'],
  ['/article/camping-in-texas-with-your-dog', '/images/discover/camping-in-texas-with-your-dog.webp'],
  ['/article/texas-high-school-football-scores-schedules', '/images/discover/texas-high-school-football-scores-schedules.webp'],
  ['/article/best-lighthouses-to-visit-in-texas', '/images/discover/best-lighthouses-to-visit-in-texas.webp'],
  ['/article/texas-medal-of-honor-heroes', '/images/discover/texas-medal-of-honor-heroes.webp'],
  ['/article/texas-red-river-war-guide', '/images/discover/texas-red-river-war-guide.webp'],
  ['/article/republic-of-texas-government-trail', '/images/discover/republic-of-texas-government-trail.webp'],
  ['/article/brazoria-plantations-slavery-emancipation-history', '/images/discover/brazoria-plantations-slavery-emancipation-history.webp'],
  ['/article/texas-frontier-forts-road-trip', '/images/discover/texas-frontier-forts-road-trip.webp'],
  ['/sports-venue/freeman-coliseum', '/images/discover/freeman-coliseum.webp'],
  ['/sports-venue/eagle-stadium-allen', '/images/discover/eagle-stadium-allen.webp'],
  ['/sports-venue/xtreme-raceway-park', '/images/discover/xtreme-raceway-park.webp'],
];

for (const [canonicalPath, imagePath] of discoverImageOverrides) {
  const mapping = `  "${canonicalPath}": "${imagePath}",`;
  if (!seo.includes(mapping)) {
    failures.push(`Shared SEO Discover image override missing: ${canonicalPath} -> ${imagePath}`);
  }

  const publicPath = `public${imagePath}`;
  if (!fs.existsSync(publicPath)) {
    failures.push(`Discover image derivative missing: ${publicPath}`);
  }
}

for (const feature of [
  'const TEXASDEFINED_DISCOVER_IMAGE_OVERRIDES: Record<string, string>',
  'TEXASDEFINED_DISCOVER_IMAGE_OVERRIDES[page.canonicalPath]',
  'discoverImage ? 1600 : page.imageWidth',
  'discoverImage ? 900 : page.imageHeight',
  '{ src: discoverImage, alt: page.imageAlt, type: "image/webp" }',
]) {
  if (!seo.includes(feature)) failures.push(`Shared SEO Discover override governance missing: ${feature}`);
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

console.log(`Article metadata, large-image Discover handling, ${discoverImageOverrides.length} governed Discover image overrides, entity relationships, read-next pathways and freshness integrity are protected.`);
