import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [route, publicRoutes, landingIndex, sportsSearch, llms, citationGuide, citationManifest] = await Promise.all([
  read('src/routes/sports-venues.compare.tsx'),
  read('src/lib/public-routes.ts'),
  read('src/components/sports/SportsVenueLandingIndex.tsx'),
  read('src/data/sports-venue-search.ts'),
  read('src/routes/llms[.]txt.ts'),
  read('src/routes/citation-guide.tsx'),
  read('public/citation-magnets.json'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  "createFileRoute('/sports-venues/compare')",
  "const canonicalPath = '/sports-venues/compare'",
  'CURATED_KNOWLEDGE_GRAPH_SEED',
  "entity.kind === 'sports-venue'",
  '.map(applyCurrentEntityCorrections)',
  'new Map(',
  'getSportsVenueEnrichmentAll(venue.slug)',
  'Compare 84 verified Texas sports venues',
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'FAQPage'",
  "'@type': 'BreadcrumbList'",
  'numberOfItems: rows.length',
  'Compare Texas sports venues',
  'How many Texas sports venues are in this comparison?',
  'missing values are left blank rather than inferred',
  'Venue-by-venue comparison',
  '<table',
  "row.capacity ?? '—'",
  "row.opened ?? '—'",
  'Capacity may vary by event configuration.',
  'does not rank venues by “best,” infer missing capacities',
  '<SportsVenueLandingIndex compact />',
]) assert(route.includes(marker), `Sports venue comparison route is missing quality/SEO marker: ${marker}.`);

for (const forbidden of [
  'TEXAS_ENTITY_REGISTRY',
  'entitiesByKind',
  'loadTexasKnowledgeGraph',
  'SponsoredSportsPlacement',
]) assert(!route.includes(forbidden), `Sports venue comparison must not use heavy, remote or paid-placement dependency: ${forbidden}.`);

assert(publicRoutes.includes('"/sports-venues/compare"'), 'Sports venue comparison must be an indexable static sitemap-owned path.');

for (const marker of [
  'href="/sports-venues/compare"',
  'Compare all Texas sports venues →',
]) assert(landingIndex.includes(marker), `Sports venue discovery index is missing comparison link marker: ${marker}.`);

for (const marker of [
  "id: 'sports-collection:texas-sports-venue-comparison'",
  "title: 'Compare Texas Sports Venues'",
  "href: '/sports-venues/compare'",
  'stadium capacity',
]) assert(sportsSearch.includes(marker), `Sports site-search index is missing comparison marker: ${marker}.`);

for (const marker of [
  'Texas sports venue comparison: https://texasdefined.com/sports-venues/compare',
  'Compare Texas sports venues: https://texasdefined.com/sports-venues/compare',
  'blank values are not inferred',
  'Do not infer hours, fees, access, reservations, accessibility, activities or amenities when a field is absent.',
  'Do not infer venue capacities or opening dates when those fields are absent.',
]) assert(llms.includes(marker), `llms.txt is missing sports comparison retrieval guidance: ${marker}.`);

for (const marker of [
  "['Compare Texas sports venues', '/sports-venues/compare']",
  '<Link to="/sports-venues/compare"',
]) assert(citationGuide.includes(marker), `Human citation guide is missing sports comparison marker: ${marker}.`);

let manifest;
try {
  manifest = JSON.parse(citationManifest);
} catch (error) {
  errors.push(`citation-magnets.json is invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
}
if (manifest) {
  const comparison = (manifest.resources ?? []).find((resource) => resource.url === 'https://texasdefined.com/sports-venues/compare');
  assert(Boolean(comparison), 'Machine citation manifest must include the sports venue comparison.');
  if (comparison) {
    assert(comparison.type === 'sports-venue-comparison', 'Sports venue comparison citation resource must use sports-venue-comparison type.');
    for (const marker of ['official-sources', 'answer-layer', 'missing-value-caveat', 'event-day-caveat']) {
      assert(comparison.trust?.includes(marker), `Sports venue comparison citation resource is missing trust marker ${marker}.`);
    }
  }
}

if (errors.length) {
  console.error('Sports venue comparison validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Sports venue comparison validated: 84-guide reference table, preserved Explore guidance, sports missing-value safeguards, sitemap/search discovery, structured data and human/machine citation guidance are protected.');
