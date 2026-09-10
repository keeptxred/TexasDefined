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

const [heroRoute, sharedComponent, allLookup, licensedImageManifest, ...enrichmentSources] = await Promise.all([
  read('src/routes/api.sports-venue-hero.ts'),
  read('src/components/sports/SportsVenueQuickAnswers.tsx'),
  read('src/data/sports-venue-enrichment-all.ts'),
  read('src/data/sports-venue-licensed-images.ts'),
  ...enrichmentFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const imageBriefCount = enrichmentSources.reduce((sum, source) => sum + (source.match(/\bimageBrief\s*:\s*['"`]/g)?.length ?? 0), 0);
assert(imageBriefCount === 84, `Expected 84 venue-specific image briefs; found ${imageBriefCount}.`);
assert(allLookup.includes("lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug"), 'Galaxy/Jones image lookup alias must remain governed.');

const licensedSlugs = [
  'amon-g-carter-stadium',
  'gerald-j-ford-stadium',
  'datcu-stadium',
  'riders-field',
  'lone-star-park',
];
const manifestEntryCount = licensedImageManifest.match(/^  '[a-z0-9-]+': \{$/gm)?.length ?? 0;
assert(manifestEntryCount === licensedSlugs.length, `Expected ${licensedSlugs.length} approved licensed venue photos; found ${manifestEntryCount}.`);
for (const slug of licensedSlugs) {
  assert(licensedImageManifest.includes(`'${slug}': {`), `Licensed venue image manifest is missing ${slug}.`);
}

for (const marker of [
  "sourceName: 'Wikimedia Commons'",
  "licenseName: 'CC BY-SA 4.0'",
  "const ccBySa40 = 'https://creativecommons.org/licenses/by-sa/4.0/' as const",
  "const wikimediaFileRedirect = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/'",
  'SPORTS_VENUE_LICENSED_IMAGE_SLUGS',
  'sportsVenueLicensedImageSource',
  "verifiedAt = '2026-09-10'",
  'Amon G. Carter Stadium, 2017.jpg',
  'View of Gerald J Ford Stadium after renovations, 20224.jpg',
  'University of North Texas September 2015 43 (Apogee Stadium).jpg',
  'Dr Pepper Ballpark 2017.jpg',
  'Lone Star Park.jpg',
]) assert(licensedImageManifest.includes(marker), `Licensed venue image manifest is missing protected marker: ${marker}`);

const sourcePageCount = licensedImageManifest.match(/sourcePage: 'https:\/\/commons\.wikimedia\.org\/wiki\/File:/g)?.length ?? 0;
assert(sourcePageCount === licensedSlugs.length, `Every approved venue photo must point to a Wikimedia Commons file page; found ${sourcePageCount}/${licensedSlugs.length}.`);
assert(!licensedImageManifest.includes('http://'), 'Licensed image metadata must use HTTPS only.');
for (const forbidden of ['unsplash.com', 'pexels.com', 'pixabay.com', 'flickr.com', 'gettyimages', 'cloudinary']) {
  assert(!licensedImageManifest.toLowerCase().includes(forbidden), `Licensed venue image manifest contains an unapproved source: ${forbidden}`);
}

for (const marker of [
  "createFileRoute('/api/sports-venue-hero')",
  "'content-type': 'image/svg+xml; charset=utf-8'",
  "findCompleteTexasEntity(lookupSlug)",
  "entity.kind !== 'sports-venue'",
  'getSportsVenueEnrichmentAll(lookupSlug)',
  'getSportsVenueLicensedImage(lookupSlug)',
  'sportsVenueLicensedImageSource(image)',
  "const allowedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])",
  "'x-texasdefined-image-source': 'wikimedia-commons'",
  'if (photoResponse) return photoResponse',
  'return new Response(renderVenueHero({',
  'enrichment.imageBrief',
  "Original TexasDefined editorial illustration · no venue logos or sponsor marks",
  "type VenueVisualKind = 'stadium' | 'ballpark' | 'arena' | 'motorsports' | 'golf' | 'western' | 'surf'",
  "lookupSlug === 'jones-att-stadium' ? 'Galaxy Stadium' : entity.name",
]) assert(heroRoute.includes(marker), `Sports venue hero route is missing protected marker: ${marker}`);

assert(heroRoute.includes("url.searchParams.get('slug')"), 'Sports venue hero route must select images only by validated venue slug.');
assert(!heroRoute.includes("url.searchParams.get('url')") && !heroRoute.includes("url.searchParams.get('source')"), 'Sports venue hero route must not accept arbitrary remote image URLs.');
for (const forbidden of ['images.unsplash.com', 'cloudinary', 'gettyimages', 'pexels.com', 'pixabay.com', 'flickr.com']) {
  assert(!heroRoute.toLowerCase().includes(forbidden), `Sports venue hero route contains an unapproved remote image source: ${forbidden}`);
}

for (const marker of [
  "canonicalUrl.split('/sports-venue/')",
  '/api/sports-venue-hero?slug=',
  'getSportsVenueLicensedImage(slug)',
  'licensedImage.sourcePage',
  'licensedImage.licenseUrl',
  'licensedImage.creator',
  'licensedImage?.alt',
  'fetchPriority="high"',
  "'@type': 'ImageObject'",
  'representativeOfPage: true',
  'contentUrl: absoluteHeroUrl',
  'license: licensedImage?.licenseUrl',
  'creditText: licensedImage',
  'Displayed in a cropped 16:9 frame; see the source for the original.',
  'Venue logos, sponsor marks and third-party photography are intentionally not reproduced.',
]) assert(sharedComponent.includes(marker), `Shared sports venue component is missing image marker: ${marker}`);

assert(!sharedComponent.includes('http://') && !sharedComponent.includes('https://images.'), 'Shared venue component must not hotlink sports venue photography.');

if (errors.length) {
  console.error('Sports venue image validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue imagery validated: ${imageBriefCount} venue briefs, ${manifestEntryCount} approved CC BY-SA photos with attribution, owned SVG fallback rendering, structured ImageObject metadata, Galaxy naming and no arbitrary third-party image proxying are protected.`);
