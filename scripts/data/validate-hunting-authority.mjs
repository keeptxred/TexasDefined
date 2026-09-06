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
  [wildlife, 'wildlife'],
  [resources, 'Texas resources'],
  [fishing, 'fishing'],
  [search, 'search'],
  [outdoors, 'outdoors'],
]) requireRouteLiteral(source, '/hunting', `${label} reciprocal hunting link missing`);
requireText(search, 'Texas Hunting', 'search hunting starting-point label missing');

for (const redirectOnly of ['/explore/wildlife-management-areas', '/explore/texas-state-parks-guide']) {
  if (authority.includes(`href: "${redirectOnly}"`) || authority.includes(`to="${redirectOnly}"`)) {
    throw new Error(`Hunting authority validation failed: redirect-only internal route ${redirectOnly} reintroduced`);
  }
}

console.log(`Hunting authority validation passed: hub + ${expectedTopics.length} topics, freshness, TPWD sourcing, search/sitemap governance and reciprocal discovery links.`);
