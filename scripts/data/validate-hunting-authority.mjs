import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (source, text, label) => {
  if (!source.includes(text)) throw new Error(`Hunting authority validation failed: ${label}`);
};
const requireRouteLiteral = (source, routePath, label) => {
  if (!source.includes(`"${routePath}"`) && !source.includes(`'${routePath}'`)) {
    throw new Error(`Hunting authority validation failed: ${label}`);
  }
};

const authority = read('src/data/hunting/authority.ts');
const freshness = read('src/data/hunting/freshness.ts');
const sitemap = read('src/data/hunting/sitemap.ts');
const queries = read('src/data/queries.ts');
const searchRuntime = read('src/data/search-documents-runtime.ts');
const searchImplementation = `${queries}\n${searchRuntime}`;
const publicRoutes = read('src/lib/public-routes.ts');
const wildlife = read('src/routes/explore.wildlife.lazy.tsx');
const resources = read('src/routes/texas-resources.lazy.tsx');
const fishing = read('src/components/fishing/FishingHub.tsx');
const search = read('src/routes/search.lazy.tsx');
const outdoors = read('src/routes/explore.$category.lazy.tsx');
const huntingTopicRoute = read('src/routes/hunting.$slug.lazy.tsx');
const huntingTopicPage = read('src/components/hunting/HuntingTopicPage.tsx');
const destinationBooking = read('src/components/editorial/DestinationViatorBooking.tsx');

const expectedTopics = [
  'texas-hunting-license', 'hunter-education', 'public-hunting', 'annual-public-hunting-permit',
  'drawn-hunts', 'hunting-seasons', 'bag-limits', 'archery-hunting', 'youth-hunting',
  'texas-deer-hunting', 'mule-deer', 'dove-hunting', 'turkey-hunting', 'quail-hunting',
  'waterfowl-hunting', 'javelina-hunting', 'feral-hogs', 'exotic-game',
];

for (const slug of expectedTopics) requireText(authority, `"${slug}"`, `missing topic ${slug}`);
requireText(authority, 'https://tpwd.texas.gov/', 'TPWD official-source links missing');
requireText(freshness, 'seasonYear: "2026–27"', '2026–27 season-year marker missing');
requireText(freshness, 'lastVerified: "2026-09-01"', 'last-verified marker missing');
requireText(freshness, 'not the legal authority', 'independence/legal-authority disclaimer missing');
requireText(sitemap, 'HUNTING_AUTHORITY_PATHS', 'hunting sitemap paths missing');
requireText(searchImplementation, 'buildHuntingSearchDocuments', 'search document registration missing');
requireText(queries, 'await import("./search-documents-runtime")', 'lazy search runtime registration missing');
requireText(publicRoutes, '"/hunting"', 'indexable /hunting route missing');

for (const [source, label] of [
  [wildlife, 'wildlife'], [resources, 'Texas resources'], [fishing, 'fishing'], [search, 'search'], [outdoors, 'outdoors'],
]) requireRouteLiteral(source, '/hunting', `${label} reciprocal hunting link missing`);
requireText(search, 'Texas Hunting', 'search hunting starting-point label missing');

requireText(huntingTopicRoute, 'createLazyFileRoute("/hunting/$slug")', 'hunting topic route is not lazy');
requireText(huntingTopicPage, 'function HuntingPublicLandDiscovery()', 'public-land discovery bridge missing');
for (const slug of ['public-hunting', 'annual-public-hunting-permit', 'drawn-hunts']) requireText(huntingTopicPage, `"${slug}"`, `WMA discovery missing from ${slug}`);
requireText(huntingTopicPage, '/search?q=Wildlife%20Management%20Area', 'WMA discovery must reuse statewide search');
requireRouteLiteral(huntingTopicPage, '/explore/outdoors', 'WMA discovery lacks canonical Outdoors path');
requireRouteLiteral(huntingTopicPage, '/hunting/annual-public-hunting-permit', 'WMA discovery lacks APH return path');
requireRouteLiteral(huntingTopicPage, '/hunting/public-hunting', 'WMA discovery lacks public-hunting return path');
if (huntingTopicPage.includes('destination-query-runtime') || huntingTopicPage.includes('wildlife-management-area-destinations-wave')) {
  throw new Error('Hunting authority validation failed: WMA discovery reintroduced a destination catalog dependency into the hunting client chunk');
}

requireText(destinationBooking, 'destination.id.startsWith("texas-wma-")', 'destination lazy chunk lacks WMA identity guard');
requireText(destinationBooking, 'function WmaHuntingLinks()', 'WMA reciprocal links are not contained by the existing destination lazy chunk');
for (const routePath of ['/hunting/public-hunting', '/hunting/annual-public-hunting-permit', '/hunting/drawn-hunts']) {
  requireRouteLiteral(destinationBooking, routePath, `WMA destination lacks reciprocal route ${routePath}`);
}

for (const redirectOnly of ['/explore/wildlife-management-areas', '/explore/texas-state-parks-guide']) {
  for (const source of [authority, huntingTopicPage, destinationBooking]) {
    if (source.includes(`href: "${redirectOnly}"`) || source.includes(`to="${redirectOnly}"`) || source.includes(`"${redirectOnly}"`)) {
      throw new Error(`Hunting authority validation failed: redirect-only internal route ${redirectOnly} reintroduced`);
    }
  }
}

console.log(`Hunting authority validation passed: hub + ${expectedTopics.length} topics, freshness, TPWD sourcing, search/sitemap governance, reciprocal discovery links and bundle-safe WMA discovery.`);
