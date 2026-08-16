import fs from 'node:fs';

const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const searchRoute = fs.readFileSync('src/routes/search.tsx', 'utf8');
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
  'mergeDestinations(enriched, core, preservedExploreDestinations)',
  'const destinations = reconcileExploreCatalog(',
  'if (!destinations.length) return base',
  'base.filter((document) => document.kind !== "destination")',
  'destinations.map(destinationSearchDocument)',
]) {
  if (!queries.includes(feature)) errors.push(`Global destination search feature missing: ${feature}.`);
}

for (const feature of [
  'searchDocumentsQuery',
  'const { data: documents } = useSuspenseQuery(searchDocumentsQuery())',
  'search(documents, { term: query, brandId: texasDefinedBrand.identity.id })',
]) {
  if (!searchRoute.includes(feature)) errors.push(`Global search route must use the publication-ready search index: ${feature}.`);
}

if (queries.includes('href: `/explore/${destination.category}/${destination.slug}`')) {
  errors.push('Global destination search documents must link to canonical /destination/:slug routes.');
}
if (!queries.includes('Enriched destination search index unavailable; merging core and preserved catalogs')) {
  errors.push('Enriched destination search fallback logging is missing.');
}
if (!queries.includes('Core remote destination search index unavailable; retaining preserved destinations')) {
  errors.push('Core destination search fallback logging is missing.');
}
if (searchRoute.includes('fetchExploreDestinations')) {
  errors.push('Global search route must not append a raw destination feed that bypasses the resolved SEO-readiness pipeline.');
}
if (searchRoute.includes('remoteDocuments')) {
  errors.push('Global search route must not merge raw remote destination documents over the publication-ready search index.');
}

if (errors.length) {
  console.error('Global destination search validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Global search destinations are resolved and SEO-ready before indexing, use canonical URLs and deduplicated keywords, retain core/preserved outage fallbacks, and cannot be bypassed by a raw route-level destination feed.');
