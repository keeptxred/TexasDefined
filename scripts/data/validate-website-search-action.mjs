import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rootRoute = fs.readFileSync(path.join(root, 'src/routes/__root.tsx'), 'utf8');
const siteSearchRoute = fs.readFileSync(path.join(root, 'src/routes/search.tsx'), 'utf8');
const exploreSearchRoute = fs.readFileSync(path.join(root, 'src/routes/explore.search.tsx'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const errors = [];

if (!rootRoute.includes('"@type": "SearchAction"')) errors.push('WebSite schema is missing SearchAction.');
if (!rootRoute.includes('/search?q={search_term_string}')) errors.push('WebSite SearchAction does not target the site-wide search route.');
if (rootRoute.includes('/explore/search?q={search_term_string}')) errors.push('WebSite SearchAction still targets destination-only search.');
if (!siteSearchRoute.includes('createFileRoute("/search")')) errors.push('Site-wide search route is missing.');
if (!siteSearchRoute.includes('name="q"')) errors.push('Site-wide search form does not accept the SearchAction query parameter.');
if (!siteSearchRoute.includes('canonicalPath: "/search"')) errors.push('Site-wide search does not consolidate query variants to its canonical route.');
if (!siteSearchRoute.includes('robots: "noindex, follow"')) errors.push('Site-wide search results are not protected from indexing.');
if (!siteSearchRoute.includes('searchDocumentsQuery()')) errors.push('Site-wide search no longer searches the publication corpus.');
if (siteSearchRoute.includes('fetchExploreDestinations')) errors.push('Site-wide search route must not bypass the resolved destination search index with a raw Explore fetch.');
for (const feature of [
  'fetchExploreDestinations({ limit: 5000 })',
  'fetchCoreExploreDestinations({ limit: 5000 })',
  'reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations))',
  'const nonDestinationDocuments = base.filter((document) => document.kind !== "destination")',
  'if (!destinations.length) return nonDestinationDocuments',
  'destinations.map(destinationSearchDocument)',
]) {
  if (!queries.includes(feature)) errors.push(`Gated destination search-index feature missing: ${feature}`);
}
if (!exploreSearchRoute.includes('robots: "noindex, follow"')) errors.push('Destination-only search results are not protected from indexing.');

if (errors.length) {
  console.error('WebSite search-action validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('WebSite SearchAction, noindex search surfaces, and resolved publication-gated destination search indexing passed validation.');
