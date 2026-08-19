import fs from 'node:fs';

const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const searchShell = fs.readFileSync('src/routes/search.tsx', 'utf8');
const searchLazy = fs.readFileSync('src/routes/search.lazy.tsx', 'utf8');
const paintedChurchSearch = fs.readFileSync('src/data/painted-church-search.ts', 'utf8');
const searchRoute = `${searchShell}\n${searchLazy}`;
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
  'const nonDestinationDocuments = base.filter((document) => document.kind !== "destination")',
  'if (!destinations.length) return nonDestinationDocuments',
  '...nonDestinationDocuments',
  'destinations.map(destinationSearchDocument)',
]) {
  if (!queries.includes(feature)) errors.push(`Global destination search feature missing: ${feature}.`);
}

for (const feature of [
  'searchDocumentsQuery',
  'const { data: documents } = useSuspenseQuery(searchDocumentsQuery())',
  'const searchableDocuments = [...new Map([...documents, ...paintedChurchSearchDocuments]',
  'search(searchableDocuments, { term: query, brandId: texasDefinedBrand.identity.id })',
]) {
  if (!searchRoute.includes(feature)) errors.push(`Global search route must use the publication-ready search index plus verified Painted Church documents: ${feature}.`);
}
if (!searchLazy.includes('createLazyFileRoute("/search")')) errors.push('Global search UI and Painted Church search catalog must remain behind a native lazy route boundary.');
if (searchShell.includes('paintedChurchSearchDocuments') || searchShell.includes('painted-church-search')) errors.push('Global search shell must not eagerly import the Painted Churches search catalog.');
for (const feature of ['paintedChurches.map', 'id: `painted-church:${church.slug}`', 'href: `/explore/painted-churches/${church.slug}`', 'keywords: [...new Set(keywords)]']) {
  if (!paintedChurchSearch.includes(feature)) errors.push(`Painted Church search document contract missing: ${feature}.`);
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
if (queries.includes('if (!destinations.length) return base')) {
  errors.push('Empty resolved destination catalogs must not fall back to raw fixture destination search documents.');
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

console.log('Global search destinations are resolved and SEO-ready before publication, use canonical URLs and deduplicated keywords, retain core/preserved source fallbacks, add verified Painted Churches behind a native lazy boundary, fail closed when no destination is ready, and cannot be bypassed by a raw route-level destination feed.');
