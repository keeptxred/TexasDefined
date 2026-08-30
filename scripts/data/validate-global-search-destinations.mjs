import fs from 'node:fs';

const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const destinationRuntime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const searchImplementation = `${queries}\n${destinationRuntime}`;
const searchShell = fs.readFileSync('src/routes/search.tsx', 'utf8');
const searchLazy = fs.readFileSync('src/routes/search.lazy.tsx', 'utf8');
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
  'platform.search.documents(scope)',
  'platform.articles.list(scope)',
  '.filter(isArticleDiscoveryReady)',
  'document.kind !== "article" || indexableArticleHrefs.has(document.href)',
  'fetchExploreDestinations({ limit: 5000 })',
  'fetchCoreExploreDestinations({ limit: 5000 })',
  'mergeDestinations(enriched, core, preservedExploreDestinations)',
  'return reconcileExploreCatalog(',
  'const nonDestinationDocuments = base.filter((document) => document.kind !== "destination")',
  'if (!destinations.length) return nonDestinationDocuments',
  '...nonDestinationDocuments',
  'destinations.map(destinationSearchDocument)',
]) {
  if (!searchImplementation.includes(feature)) errors.push(`Global destination search feature missing: ${feature}.`);
}

for (const feature of [
  'searchDocumentsQuery',
  'const { data: documents } = useSuspenseQuery(searchDocumentsQuery())',
  'search(documents, { term: query, brandId: texasDefinedBrand.identity.id })',
]) {
  if (!searchRoute.includes(feature)) errors.push(`Global search route must use the publication-ready search index: ${feature}.`);
}
if (!searchShell.includes('await import("@/data/queries")')) {
  errors.push('Global search route shell must dynamically load the publication-ready query module.');
}
if (!searchLazy.includes('createLazyFileRoute("/search")')) {
  errors.push('Global search result renderer must remain behind the explicit lazy route boundary.');
}
if (!queries.includes('await import("./destination-query-runtime")')) {
  errors.push('Heavy destination resolution must stay behind a dynamic runtime boundary.');
}

if (searchImplementation.includes('href: `/explore/${destination.category}/${destination.slug}`')) {
  errors.push('Global destination search documents must link to canonical /destination/:slug routes.');
}
if (!searchImplementation.includes('Enriched destination search index unavailable; merging core and preserved catalogs')) {
  errors.push('Enriched destination search fallback logging is missing.');
}
if (!searchImplementation.includes('Core remote destination search index unavailable; retaining preserved destinations')) {
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

console.log('Global search destinations and articles are resolved through publication-readiness gates before discovery, use canonical URLs and deduplicated keywords, retain core/preserved destination fallbacks, fail closed when no destination is ready, keep heavy destination resolution behind a runtime split, use a lazy result renderer with dynamic query loading, and cannot be bypassed by raw route-level feeds.');
