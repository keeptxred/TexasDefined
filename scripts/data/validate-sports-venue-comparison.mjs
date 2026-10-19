import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [route, data, csv, publicRoutes, landingIndex, sportsSearch, llms, citationGuide, citationManifest] = await Promise.all([
  read('src/routes/sports-venues.compare.tsx'),
  read('src/data/sports-venue-comparison.ts'),
  read('src/routes/sports-venues.compare[.]csv.ts'),
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
  'SPORTS_VENUE_COMPARISON_ROWS',
  'SPORTS_VENUE_COMPARISON_WITH_CAPACITY',
  'SPORTS_VENUE_COMPARISON_WITH_OPENED',
  'SPORTS_VENUE_COMPARISON_LATEST_REVIEW',
  'Compare 84 verified Texas sports venues',
  "'@type': 'CollectionPage'",
  "'@type': 'Dataset'",
  "'@type': 'DataDownload'",
  "encodingFormat: 'text/csv'",
  'contentUrl: csvUrl',
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
  'href="/sports-venues/compare.csv"',
  'Download comparison CSV',
  '<SportsVenueLandingIndex compact />',
]) assert(route.includes(marker), `Sports venue comparison route is missing quality/SEO/download marker: ${marker}.`);

for (const forbidden of [
  'TEXAS_ENTITY_REGISTRY',
  'entitiesByKind',
  'loadTexasKnowledgeGraph',
  'SponsoredSportsPlacement',
  'CURATED_KNOWLEDGE_GRAPH_SEED',
  'getSportsVenueEnrichmentAll',
]) assert(!route.includes(forbidden), `Sports venue comparison route must use the shared comparison module rather than heavy or duplicated dependency: ${forbidden}.`);

for (const marker of [
  'CURATED_KNOWLEDGE_GRAPH_SEED',
  "entity.kind === 'sports-venue'",
  '.map(applyCurrentEntityCorrections)',
  'new Map(',
  'getSportsVenueEnrichmentAll(venue.slug)',
  'canonicalPath: canonicalEntityPath(venue)',
  'officialUrl: venue.officialUrl',
  'SPORTS_VENUE_COMPARISON_ROWS',
  'SPORTS_VENUE_COMPARISON_WITH_CAPACITY',
  'SPORTS_VENUE_COMPARISON_WITH_OPENED',
  'SPORTS_VENUE_COMPARISON_LATEST_REVIEW',
]) assert(data.includes(marker), `Shared sports venue comparison data is missing marker: ${marker}.`);
assert(!data.includes('TEXAS_ENTITY_REGISTRY'), 'Shared sports comparison data must not import the full statewide entity registry.');
assert(!data.includes('loadTexasKnowledgeGraph'), 'Shared sports comparison data must not load the remote/full knowledge graph.');

for (const marker of [
  "createFileRoute('/sports-venues/compare.csv')",
  'SPORTS_VENUE_COMPARISON_ROWS',
  "'venue_name'",
  "'canonical_url'",
  "'source_checked_at'",
  "'official_url'",
  "'content-type': 'text/csv; charset=utf-8'",
  "'content-disposition': 'attachment; filename=\"texasdefined-sports-venue-comparison.csv\"'",
  "'x-robots-tag': 'noindex, follow'",
  'function csvCell(value: string)',
]) assert(csv.includes(marker), `Sports venue comparison CSV route is missing safety/download marker: ${marker}.`);

assert(publicRoutes.includes('"/sports-venues/compare"'), 'Sports venue comparison must be an indexable static sitemap-owned path.');
assert(publicRoutes.includes('"/sports-venues/compare.csv"'), 'Sports venue comparison CSV must be registered as a public route.');
const nonIndexableBlock = publicRoutes.slice(publicRoutes.indexOf('NON_INDEXABLE_PUBLIC_PATHS'), publicRoutes.indexOf('const NON_INDEXABLE_PREFIXES'));
assert(nonIndexableBlock.includes('"/sports-venues/compare.csv"'), 'Sports venue comparison CSV must remain explicitly non-indexable.');

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
  'Texas sports venue comparison CSV: https://texasdefined.com/sports-venues/compare.csv',
  'Compare Texas sports venues: https://texasdefined.com/sports-venues/compare',
  'Comparison CSV download: https://texasdefined.com/sports-venues/compare.csv',
  'blank values are not inferred',
  'CSV distribution is generated from the same shared comparison rows',
  'Do not infer hours, fees, access, reservations, accessibility, activities or amenities when a field is absent.',
  'Do not infer venue capacities or opening dates when those fields are absent.',
]) assert(llms.includes(marker), `llms.txt is missing sports comparison retrieval/download guidance: ${marker}.`);

for (const marker of [
  "['Compare Texas sports venues', '/sports-venues/compare']",
  '<Link to="/sports-venues/compare"',
  'href="/sports-venues/compare.csv"',
  'Sports venue comparison CSV',
  'use the canonical HTML page for context, methodology and caveats',
]) assert(citationGuide.includes(marker), `Human citation guide is missing sports comparison/download marker: ${marker}.`);

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
    for (const marker of ['official-sources', 'answer-layer', 'missing-value-caveat', 'event-day-caveat', 'downloadable-csv']) {
      assert(comparison.trust?.includes(marker), `Sports venue comparison citation resource is missing trust marker ${marker}.`);
    }
  }
}

if (errors.length) {
  console.error('Sports venue comparison validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Sports venue comparison validated: one shared 84-guide dataset powers the human table and noindex CSV distribution with missing-value safeguards, sitemap/search discovery, structured data and human/machine citation guidance.');
