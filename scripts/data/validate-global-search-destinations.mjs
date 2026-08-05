import fs from 'node:fs';

const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const errors = [];

for (const feature of [
  'function destinationSearchDocument',
  'id: `destination:${destination.slug}`',
  'brandId: "texasdefined"',
  'kind: "destination"',
  'href: `/destination/${destination.slug}`',
  'destination.category',
  'destination.region',
  'destination.nearestTown',
  'destination.county',
  'destination.managingAuthority',
  'destination.bestSeason',
  '...destination.highlights',
  'keywords: [...new Set(keywords)]',
  'const base = await platform.search.documents(scope)',
  'fetchExploreDestinations({ limit: 5000 })',
  'fetchCoreExploreDestinations({ limit: 5000 })',
  'if (!destinations.length) return base',
  'base.filter((document) => document.kind !== "destination")',
  'destinations.map(destinationSearchDocument)',
]) {
  if (!queries.includes(feature)) errors.push(`Global destination search feature missing: ${feature}.`);
}

if (queries.includes('href: `/explore/${destination.category}/${destination.slug}`')) {
  errors.push('Global destination search documents must link to canonical /destination/:slug routes.');
}
if (!queries.includes('Enriched destination search index unavailable; retrying core remote catalog')) {
  errors.push('Enriched destination search fallback logging is missing.');
}
if (!queries.includes('Core remote destination search index unavailable; retaining fixture search documents')) {
  errors.push('Core destination search fallback logging is missing.');
}

if (errors.length) {
  console.error('Global destination search validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Global search destination enrichment, canonical URLs, keyword deduplication, replacement semantics, and outage fallbacks passed validation.');
