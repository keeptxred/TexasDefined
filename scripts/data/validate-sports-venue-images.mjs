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

const [heroRoute, sharedComponent, allLookup, ...enrichmentSources] = await Promise.all([
  read('src/routes/api.sports-venue-hero.ts'),
  read('src/components/sports/SportsVenueQuickAnswers.tsx'),
  read('src/data/sports-venue-enrichment-all.ts'),
  ...enrichmentFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const imageBriefCount = enrichmentSources.reduce((sum, source) => sum + (source.match(/\bimageBrief\s*:/g)?.length ?? 0), 0);
assert(imageBriefCount === 84, `Expected 84 venue-specific image briefs; found ${imageBriefCount}.`);
assert(allLookup.includes("lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug"), 'Galaxy/Jones image lookup alias must remain governed.');

for (const marker of [
  "createFileRoute('/api/sports-venue-hero')",
  "'content-type': 'image/svg+xml; charset=utf-8'",
  "findCompleteTexasEntity(lookupSlug)",
  "entity.kind !== 'sports-venue'",
  'getSportsVenueEnrichmentAll(lookupSlug)',
  'enrichment.imageBrief',
  "Original TexasDefined editorial illustration · no venue logos or sponsor marks",
  "type VenueVisualKind = 'stadium' | 'ballpark' | 'arena' | 'motorsports' | 'golf' | 'western' | 'surf'",
  "lookupSlug === 'jones-att-stadium' ? 'Galaxy Stadium' : entity.name",
]) assert(heroRoute.includes(marker), `Sports venue hero route is missing protected marker: ${marker}`);

for (const forbidden of [
  'fetch(',
  'https://images.',
  'images.unsplash.com',
  'cloudinary',
  'wikimedia',
  'gettyimages',
]) assert(!heroRoute.toLowerCase().includes(forbidden.toLowerCase()), `Sports venue hero route must not fetch/hotlink third-party imagery: ${forbidden}`);

for (const marker of [
  "canonicalUrl.split('/sports-venue/')",
  '/api/sports-venue-hero?slug=',
  'original TexasDefined sports venue illustration',
  'width={1600}',
  'height={900}',
  'fetchPriority="high"',
  'Venue logos, sponsor marks and third-party photography are intentionally not reproduced.',
]) assert(sharedComponent.includes(marker), `Shared sports venue component is missing image marker: ${marker}`);

assert(!sharedComponent.includes('http://') && !sharedComponent.includes('https://images.'), 'Shared venue component must not hotlink sports venue photography.');

if (errors.length) {
  console.error('Sports venue image validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue imagery validated: ${imageBriefCount} venue briefs, owned SVG rendering, shared hero delivery, Galaxy naming and no third-party image hotlinks are protected.`);
