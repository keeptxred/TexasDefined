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
const authorityV2 = read('src/data/hunting/authority-v2.ts');
const allAuthority = `${authority}\n${authorityV2}`;
const freshness = read('src/data/hunting/freshness.ts');
const sitemap = read('src/data/hunting/sitemap.ts');
const huntingRoute = read('src/routes/hunting.$slug.tsx');
const huntingTopicRoute = read('src/routes/hunting.$slug.lazy.tsx');
const huntingTopicPage = read('src/components/hunting/HuntingTopicPage.tsx');
const huntingHub = read('src/components/hunting/HuntingAuthority.tsx');
const destinationBooking = read('src/components/editorial/DestinationViatorBooking.tsx');
const huntingSearch = read('src/data/hunting/search.ts');
const queries = read('src/data/queries.ts');
const searchRuntime = read('src/data/search-documents-runtime.ts');
const searchImplementation = `${queries}\n${searchRuntime}`;
const publicRoutes = read('src/lib/public-routes.ts');
const wildlife = read('src/routes/explore.wildlife.lazy.tsx');
const resources = read('src/routes/texas-resources.lazy.tsx');
const fishing = read('src/components/fishing/FishingHub.tsx');
const search = read('src/routes/search.lazy.tsx');
const outdoors = read('src/routes/explore.$category.lazy.tsx');
const productionSmokeWorkflow = read('.github/workflows/verify-hunting-production.yml');
const productionSmoke = read('scripts/data/verify-hunting-production.mjs');

const expectedTopics = [
  'texas-hunting-license', 'hunter-education', 'public-hunting', 'annual-public-hunting-permit',
  'drawn-hunts', 'hunting-seasons', 'bag-limits', 'archery-hunting', 'youth-hunting',
  'texas-deer-hunting', 'mule-deer', 'dove-hunting', 'turkey-hunting', 'quail-hunting',
  'waterfowl-hunting', 'javelina-hunting', 'feral-hogs', 'exotic-game',
  'squirrel-hunting', 'rabbit-hare-hunting', 'pheasant-hunting', 'chachalaca-hunting',
  'pronghorn-hunting', 'alligator-hunting', 'migratory-game-birds', 'goose-hunting',
  'teal-hunting', 'sandhill-crane-hunting', 'other-migratory-game-birds', 'trapping-furbearers',
];
const v2Topics = [
  'youth-hunting', 'squirrel-hunting', 'rabbit-hare-hunting', 'pheasant-hunting', 'chachalaca-hunting',
  'pronghorn-hunting', 'alligator-hunting', 'migratory-game-birds', 'goose-hunting', 'teal-hunting',
  'sandhill-crane-hunting', 'other-migratory-game-birds', 'trapping-furbearers',
];

for (const slug of expectedTopics) requireText(allAuthority, `"${slug}"`, `missing topic ${slug}`);
for (const slug of v2Topics) requireText(authorityV2, `"${slug}"`, `missing v2 topic ${slug}`);
for (const slug of expectedTopics) requireRouteLiteral(sitemap, `/hunting/${slug}`, `sitemap missing ${slug}`);

requireText(allAuthority, 'https://tpwd.texas.gov/', 'TPWD official-source links missing');
requireText(authorityV2, 'fur-bearing-animal-regulations', 'fur-bearer authority source missing');
requireText(authorityV2, 'migratory-game-bird-regulations', 'migratory game bird authority source missing');
requireText(authorityV2, 'youth-only', 'youth-only authority source missing');
requireText(freshness, 'seasonYear: "2026–27"', '2026–27 season-year marker missing');
requireText(freshness, 'lastVerified: "2026-09-01"', 'last-verified marker missing');
requireText(freshness, 'not the legal authority', 'independence/legal-authority disclaimer missing');
requireText(sitemap, 'HUNTING_AUTHORITY_PATHS', 'hunting sitemap paths missing');
requireText(huntingRoute, 'getHuntingAuthorityTopicV2', 'v2 route lookup missing');
requireText(huntingHub, 'HUNTING_V2_HUB_GROUPS', 'v2 hub grouping missing');
requireText(huntingHub, 'HUNTING_AUTHORITY_TOPICS_V2', 'v2 hub topic registry missing');
requireText(huntingSearch, 'HUNTING_AUTHORITY_TOPICS_V2', 'v2 search registration missing');
requireText(searchImplementation, 'buildHuntingSearchDocuments', 'search document registration missing');
requireText(queries, 'await import("./search-documents-runtime")', 'lazy search runtime registration missing');
requireText(publicRoutes, '"/hunting"', 'indexable /hunting route missing');

for (const [source, label] of [
  [wildlife, 'wildlife'],
  [resources, 'Texas resources'],
  [fishing, 'fishing'],
  [search, 'search'],
  [outdoors, 'outdoors'],
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

requireText(productionSmokeWorkflow, "workflows: ['Deploy TexasDefined production']", 'production smoke must follow successful production deploys');
requireText(productionSmokeWorkflow, 'pull_request:', 'verifier-only PR changes must test against production before merge');
requireText(productionSmokeWorkflow, "'scripts/data/verify-hunting-production.mjs'", 'production smoke script changes must self-test on main');
requireText(productionSmokeWorkflow, 'node scripts/data/verify-hunting-production.mjs', 'production workflow must execute decoded Node verifier');
requireText(productionSmoke, 'await fetch(', 'production smoke must use decoded Node fetch');
requireText(productionSmoke, 'response.text()', 'production smoke must decode response bodies as text');
requireText(productionSmoke, "function assertNulsOnlyInsideScripts", 'production smoke must distinguish framework script delimiters from document corruption');
requireText(productionSmoke, "text.replaceAll('\\0', '')", 'production smoke must normalize only validated framework NUL delimiters before text assertions');
requireText(productionSmoke, "startsWith('<!DOCTYPE html>')", 'production smoke must require an HTML document envelope');
requireText(productionSmoke, "includes('text/html')", 'production smoke must require HTML content type for page checks');
requireText(productionSmoke, 'More Texas game & small-game coverage', 'production smoke must verify v2 small-game hub group');
requireText(productionSmoke, 'Migratory game bird depth', 'production smoke must verify v2 migratory hub group');
requireText(productionSmoke, 'Fur-bearing animals & trapping', 'production smoke must verify v2 fur-bearer hub group');
for (const slug of v2Topics) requireRouteLiteral(productionSmoke, `/hunting/${slug}`, `production smoke missing v2 route ${slug}`);

for (const redirectOnly of ['/explore/wildlife-management-areas', '/explore/texas-state-parks-guide']) {
  for (const source of [allAuthority, huntingTopicPage, destinationBooking]) {
    if (source.includes(`href: "${redirectOnly}"`) || source.includes(`to="${redirectOnly}"`) || source.includes(`"${redirectOnly}"`)) {
      throw new Error(`Hunting authority validation failed: redirect-only internal route ${redirectOnly} reintroduced`);
    }
  }
}

console.log(`Hunting authority validation passed: hub + ${expectedTopics.length} topics, v2 coverage, freshness, TPWD sourcing, search/sitemap governance, reciprocal discovery links, bundle-safe WMA discovery and framework-aware v2 production smoke governance.`);