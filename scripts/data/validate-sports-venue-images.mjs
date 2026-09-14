import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');
const enrichmentFiles = [
  'src/data/sports-venue-enrichment.ts',
  'src/data/sports-venue-enrichment-batch2.ts',
  'src/data/sports-venue-enrichment-batch3.ts',
  'src/data/sports-venue-enrichment-batch4-racing.ts',
  'src/data/sports-venue-enrichment-batch5.ts',
  'src/data/sports-venue-enrichment-batch6.ts',
  'src/data/sports-venue-enrichment-batch7-major-completion.ts',
  'src/data/sports-venue-enrichment-batch8a-completion.ts',
  'src/data/sports-venue-enrichment-batch8b-completion.ts',
];

const [heroRoute, sharedComponent, photoSource, curatedOverrideSource, aggregatePhotoSource, allLookup, ...enrichmentSources] = await Promise.all([
  read('src/routes/api.sports-venue-hero.ts'),
  read('src/components/sports/SportsVenueQuickAnswers.tsx'),
  read('src/data/sports-venue-images.ts'),
  read('src/data/sports-venue-images-curated-overrides.ts'),
  read('src/data/sports-venue-images-all.ts'),
  read('src/data/sports-venue-enrichment-all.ts'),
  ...enrichmentFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const imageBriefCount = enrichmentSources.reduce((sum, source) => sum + (source.match(/\bimageBrief\s*:\s*['"`]/g)?.length ?? 0), 0);
assert(imageBriefCount === 84, `Expected 84 venue-specific image briefs; found ${imageBriefCount}.`);
assert(allLookup.includes("lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug"), 'Galaxy/Jones image lookup alias must remain governed.');
assert(aggregatePhotoSource.includes("getSportsVenuePhotoAdditionWave7(slug)"), 'Aggregate sports venue image registry must include Wave 7.');
assert(aggregatePhotoSource.includes("getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug)"), 'Curated sports venue photo overrides must resolve before the base registry.');
for (const marker of [
  'const curatedSportsVenuePhotoOverrides',
  'getCuratedSportsVenuePhotoOverride(slug)',
]) assert(curatedOverrideSource.includes(marker), `Curated sports venue override layer is missing protected marker: ${marker}`);
assert(!curatedOverrideSource.includes('http://'), 'Curated sports venue photo overrides must use HTTPS only.');
for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com']) {
  assert(!curatedOverrideSource.toLowerCase().includes(forbidden), `Curated sports venue photo overrides contain a disallowed source: ${forbidden}`);
}

const licensedPhotoSlugs = [
  'att-stadium',
  'globe-life-field',
  'american-airlines-center',
  'toyota-stadium-frisco',
  'dickies-arena',
  'cotton-bowl-stadium',
  'choctaw-stadium',
  'ford-center-at-the-star',
  'college-park-center',
  'comerica-center',
  'texas-motor-speedway',
  'cowtown-coliseum',
  'credit-union-of-texas-event-center',
  'moody-coliseum-smu',
  'unt-coliseum',
  'amon-g-carter-stadium',
  'gerald-j-ford-stadium',
  'datcu-stadium',
  'riders-field',
  'lone-star-park',
  'daikin-park',
  'darrell-k-royal-texas-memorial-stadium',
  'mclane-stadium',
  'moody-center',
  'toyota-center-houston',
  'reliant-stadium',
  'kyle-field',
  'tdecu-stadium',
  'q2-stadium',
  'rice-stadium',
];
for (const slug of licensedPhotoSlugs) {
  assert(photoSource.includes(`'${slug}': {`), `Licensed venue photo registry is missing ${slug}.`);
}
const commonsRedirectCount = photoSource.match(/https:\/\/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//g)?.length ?? 0;
assert(commonsRedirectCount === licensedPhotoSlugs.length, `Expected ${licensedPhotoSlugs.length} Wikimedia Commons delivery URLs; found ${commonsRedirectCount}.`);
const sourcePageCount = photoSource.match(/sourcePage: 'https:\/\/commons\.wikimedia\.org\/wiki\/File:/g)?.length ?? 0;
assert(sourcePageCount === licensedPhotoSlugs.length, `Expected ${licensedPhotoSlugs.length} Wikimedia Commons source pages; found ${sourcePageCount}.`);
const licenseUrlCount = photoSource.match(/licenseUrl: 'https:\/\/creativecommons\.org\//g)?.length ?? 0;
assert(licenseUrlCount === licensedPhotoSlugs.length, `Expected ${licensedPhotoSlugs.length} explicit Creative Commons license URLs; found ${licenseUrlCount}.`);
assert(!photoSource.includes('http://'), 'Licensed venue photo registry must use HTTPS only.');
for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com']) {
  assert(!photoSource.toLowerCase().includes(forbidden), `Licensed venue photo registry contains a disallowed source: ${forbidden}`);
}

for (const marker of [
  "createFileRoute('/api/sports-venue-hero')",
  "const missingHeroHeaders = {",
  "'cache-control': 'no-store'",
  "'x-robots-tag': 'noindex, nofollow'",
  "findCompleteTexasEntity(lookupSlug)",
  "entity.kind !== 'sports-venue'",
  'getSportsVenueEnrichmentAll(lookupSlug)',
  "import('@/data/sports-venue-images-all')",
  'getSportsVenuePhoto(lookupSlug)',
  'if (!photo)',
  "return new Response('Not found', { status: 404, headers: missingHeroHeaders });",
  'location: photo.imageUrl',
  'status: 302',
]) assert(heroRoute.includes(marker), `Sports venue hero route is missing protected fail-closed marker: ${marker}`);
assert(!heroRoute.includes("import('@/data/sports-venue-images')"), 'Sports venue hero route must not use the base-only image registry; it must resolve the aggregate Wave 1–7 registry.');
for (const forbidden of [
  'fetch(',
  'images.unsplash.com',
  'cloudinary',
  'gettyimages',
  'image/svg+xml',
  'renderVenueHero',
  'VenueVisualKind',
  'Original TexasDefined editorial illustration',
]) assert(!heroRoute.toLowerCase().includes(forbidden.toLowerCase()), `Sports venue hero route must fail closed instead of fetching or rendering fallback imagery: ${forbidden}`);
assert(!heroRoute.includes('commons.wikimedia.org/wiki/Special:Redirect/file/'), 'Wikimedia delivery URLs must remain centralized in the licensed photo registry, not hardcoded in the route.');

for (const marker of [
  "canonicalUrl.split('/sports-venue/')",
  'getSportsVenuePhoto(slug)',
  'const heroSrc = slug && photo ?',
  '/api/sports-venue-hero?slug=',
  'const heroAlt = photo?.alt',
  'const heroWidth = photo?.width ?? 1600',
  'const heroHeight = photo?.height ?? 900',
  'width={heroWidth}',
  'height={heroHeight}',
  'fetchPriority="high"',
  "'@type': 'ImageObject'",
  'representativeOfPage: true',
  'contentUrl: absoluteHeroUrl',
  'Photo by',
  'photo.sourcePage',
  'photo.licenseUrl',
  'photo.licenseName',
]) assert(sharedComponent.includes(marker), `Shared sports venue component is missing governed-image marker: ${marker}`);

assert(!sharedComponent.includes('Original TexasDefined editorial illustration.'), 'Shared sports venue component must not render a generic illustration when a governed hero is missing.');
assert(!sharedComponent.includes('http://') && !sharedComponent.includes('commons.wikimedia.org/wiki/Special:Redirect/file/'), 'Shared venue component must use the governed same-origin hero endpoint instead of direct third-party delivery URLs.');

if (errors.length) {
  console.error('Sports venue image validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue imagery validated: ${imageBriefCount} venue briefs, ${licensedPhotoSlugs.length} licensed base photo overrides, a curated high-priority override layer with live-source validation, aggregate Wave 1–7 same-origin delivery, fail-closed missing-hero behavior, and governed structured ImageObject metadata.`);
