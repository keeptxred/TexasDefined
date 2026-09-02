import fs from 'node:fs';

const routeTree = fs.readFileSync('src/routeTree.gen.ts', 'utf8');
const exploreSearch = fs.readFileSync('src/routes/explore.search.tsx', 'utf8');
const failures = [];

const requiredRouteFiles = [
  './routes/explore.region.$region',
  './routes/explore.lake.$slug',
  './routes/explore.river.$slug',
  './routes/explore.cavern.$slug',
  './routes/explore.state-park.$slug',
  './routes/explore.county.$county',
  './routes/explore.texas-state-parks-guide',
  './routes/explore.texas-lakes-guide',
  './routes/explore.texas-camping-guide',
  './routes/explore.texas-scenic-drives',
  './routes/explore.texas-wildflower-seasons',
  './routes/explore.national-wildlife-refuges',
  './routes/explore.wildlife-management-areas',
  './routes/explore.lighthouses',
  './routes/explore.spring-fed-swimming',
  './routes/explore.hill-country-springs',
  './routes/explore.spring-conservation-and-education',
];

const requiredPaths = [
  '/explore/region/$region',
  '/explore/lake/$slug',
  '/explore/river/$slug',
  '/explore/cavern/$slug',
  '/explore/state-park/$slug',
  '/explore/county/$county',
];

for (const routeFile of requiredRouteFiles) {
  if (!routeTree.includes(routeFile)) failures.push(`Generated route tree is missing ${routeFile}.`);
}

for (const routePath of requiredPaths) {
  if (!routeTree.includes(`path: '${routePath}'`) && !routeTree.includes(`id: '${routePath}'`)) {
    failures.push(`Generated route tree is missing path ${routePath}.`);
  }
}

for (const feature of [
  'createFileRoute("/explore/search")',
  'component: ExploreSearchPage',
  'canonicalPath: "/explore/search"',
  'robots: "noindex, follow"',
  'const text = z.string().optional().catch("")',
  'q: text, category: text, region: text, season: text, accessible: text',
  'const { q, category, region, season, accessible } = Route.useSearch()',
  '!category || destination.category === category',
  '!region || destination.region === region',
  'normalized(destination.bestSeason).includes(wantedSeason)',
  'accessible !== "1" || Boolean(destination.accessibilityNotes)',
  'new Set(catalog.map((destination) => destination.category))',
  'new Set(catalog.map((destination) => destination.region))',
  'name="region"',
  'name="category"',
  'name="season"',
  'name="accessible"',
  'Accessibility info available',
  'to="/explore/trip-planner"',
]) {
  if (!exploreSearch.includes(feature)) failures.push(`Explore search filter contract missing: ${feature}.`);
}

if (!exploreSearch.includes('links: [canonicalLink(texasDefinedBrand, "/explore/search")]')) {
  failures.push('Explore search must canonicalize all query/filter combinations to the curated search landing route.');
}
if (exploreSearch.includes('robots: "index')) failures.push('Interactive Explore search/filter combinations must remain non-indexable.');
if (exploreSearch.includes('dogFriendly') || exploreSearch.includes('kidFriendly')) {
  failures.push('Explore search must not expose unverified pet/family filters before the destination schema supports them.');
}

if (failures.length) {
  console.error('Explore route registration validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Explore regional, compatibility, migrated guide and crawl-safe compact destination-filter routes are registered.');
