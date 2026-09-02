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
const publicRoutes = read('src/lib/public-routes.ts');
const wildlife = read('src/routes/explore.wildlife.lazy.tsx');
const resources = read('src/routes/texas-resources.lazy.tsx');
const fishing = read('src/components/fishing/FishingHub.tsx');
const search = read('src/routes/search.lazy.tsx');
const outdoors = read('src/routes/explore.$category.lazy.tsx');
const huntingTopicPage = read('src/components/hunting/HuntingTopicPage.tsx');
const publicLandDiscovery = read('src/components/hunting/HuntingPublicLandDiscovery.tsx');
const destinationVisitPlanner = read('src/components/editorial/DestinationVisitPlanner.tsx');

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
requireText(queries, 'buildHuntingSearchDocuments', 'search document registration missing');
requireText(publicRoutes, '"/hunting"', 'indexable /hunting route missing');

for (const [source, label] of [
  [wildlife, 'wildlife'],
  [resources, 'Texas resources'],
  [fishing, 'fishing'],
  [search, 'search'],
  [outdoors, 'outdoors'],
]) requireRouteLiteral(source, '/hunting', `${label} reciprocal hunting link missing`);
requireText(search, 'Texas Hunting', 'search hunting starting-point label missing');

requireText(huntingTopicPage, 'lazy(() => import("./HuntingPublicLandDiscovery"))', 'WMA finder is not nested-lazy');
for (const slug of ['public-hunting', 'annual-public-hunting-permit', 'drawn-hunts']) {
  requireText(huntingTopicPage, `"${slug}"`, `WMA finder missing from ${slug}`);
}
for (let wave = 1; wave <= 9; wave += 1) {
  requireText(publicLandDiscovery, `wildlife-management-area-destinations-wave${wave}`, `WMA finder missing inventory wave ${wave}`);
}
requireText(publicLandDiscovery, 'destination.id.startsWith("texas-wma-")', 'WMA finder lacks WMA identity guard');
requireText(publicLandDiscovery, 'to="/destination/$slug"', 'WMA finder lacks canonical destination links');
requireRouteLiteral(publicLandDiscovery, '/hunting/annual-public-hunting-permit', 'WMA finder lacks APH return path');
requireRouteLiteral(publicLandDiscovery, '/hunting/public-hunting', 'WMA finder lacks public-hunting return path');
requireText(destinationVisitPlanner, 'destination.id.startsWith("texas-wma-")', 'destination planner lacks WMA identity guard');
for (const routePath of ['/hunting/public-hunting', '/hunting/annual-public-hunting-permit', '/hunting/drawn-hunts']) {
  requireRouteLiteral(destinationVisitPlanner, routePath, `WMA destination lacks reciprocal route ${routePath}`);
}

for (const redirectOnly of ['/explore/wildlife-management-areas', '/explore/texas-state-parks-guide']) {
  for (const source of [authority, publicLandDiscovery, destinationVisitPlanner]) {
    if (source.includes(`href: "${redirectOnly}"`) || source.includes(`to="${redirectOnly}"`) || source.includes(`"${redirectOnly}"`)) {
      throw new Error(`Hunting authority validation failed: redirect-only internal route ${redirectOnly} reintroduced`);
    }
  }
}

console.log(`Hunting authority validation passed: hub + ${expectedTopics.length} topics, freshness, TPWD sourcing, search/sitemap governance, reciprocal discovery links and nine-wave WMA public-land bridge.`);
