import fs from 'node:fs';

const routeTree = fs.readFileSync('src/routeTree.gen.ts', 'utf8');
const exploreSearchShell = fs.readFileSync('src/routes/explore.search.tsx', 'utf8');
const exploreSearchPresentation = fs.readFileSync('src/components/explore/ExploreSearchPage.tsx', 'utf8');
const exploreSearch = `${exploreSearchShell}\n${exploreSearchPresentation}`;
const tripPlanner = fs.readFileSync('src/routes/explore.trip-planner.tsx', 'utf8');
const tripPlannerLazy = fs.readFileSync('src/routes/explore.trip-planner.lazy.tsx', 'utf8');
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
  './routes/explore.trip-planner',
];

const requiredPaths = [
  '/explore/region/$region',
  '/explore/lake/$slug',
  '/explore/river/$slug',
  '/explore/cavern/$slug',
  '/explore/state-park/$slug',
  '/explore/county/$county',
  '/explore/trip-planner',
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
  'import("@/components/explore/ExploreSearchPage")',
  'component: ExploreSearchRoutePage',
  'canonicalPath: "/explore/search"',
  'robots: "noindex, follow"',
  'const text = z.string().optional().catch("")',
  'q: text, category: text, region: text, season: text, accessible: text, origin: text, radius: text',
  'const { q, category, region, season, accessible } = ExploreSearchRoute.useSearch()',
  'const { origin, radius } = ExploreSearchRoute.useSearch()',
  '!category || destination.category === category',
  '!region || destination.region === region',
  'normalized(destination.bestSeason).includes(wantedSeason)',
  'accessible !== "1" || Boolean(destination.accessibilityNotes)',
  'new Set(catalog.map((destination) => destination.category))',
  'new Set(catalog.map((destination) => destination.region))',
  'distanceMiles } from "@/data/destination-relationships"',
  'const radiusOptions = [25, 50, 75, 100, 200]',
  'function resolveOrigin(catalog: Destination[], value: string)',
  'normalized(destination.name) === target',
  'normalized(destination.slug) === target',
  'originDestination ? distanceMiles(originDestination, destination) : null',
  'item.miles <= radiusMiles',
  'name="origin"',
  'name="radius"',
  'name="region"',
  'name="category"',
  'name="season"',
  'name="accessible"',
  'Accessibility info available',
  'Radius filter not applied: enter the exact destination name or slug from the TexasDefined guide.',
  'Radius uses straight-line distance between destination coordinates, not driving distance.',
  'to="/explore/trip-planner"',
]) {
  if (!exploreSearch.includes(feature)) failures.push(`Explore search filter contract missing: ${feature}.`);
}

if (!exploreSearchShell.includes('links: [canonicalLink(texasDefinedBrand, "/explore/search")]')) {
  failures.push('Explore search must canonicalize all query/filter combinations to the curated search landing route.');
}
if (!exploreSearchShell.includes('lazy(() =>') || !exploreSearchShell.includes('import("@/components/explore/ExploreSearchPage")')) {
  failures.push('Explore search presentation must remain dynamically split without requiring generated route-tree drift.');
}
if (exploreSearch.includes('robots: "index')) failures.push('Interactive Explore search/filter combinations must remain non-indexable.');
if (exploreSearch.includes('dogFriendly') || exploreSearch.includes('kidFriendly')) {
  failures.push('Explore search must not expose unverified pet/family filters before the destination schema supports them.');
}
if (/geocode|google\.maps|maps\.googleapis/i.test(exploreSearch)) {
  failures.push('Explore radius search must not geocode or guess origin coordinates; origins resolve only to catalog destinations.');
}

for (const feature of [
  'createFileRoute("/explore/trip-planner")',
  'head: ({ match })',
  'const hasQueryState = Boolean(match.search.destination || match.search.trip)',
  'canonicalPath: "/explore/trip-planner"',
  'robots: hasQueryState ? "noindex, follow" : undefined',
  'links: [canonicalLink(texasDefinedBrand, "/explore/trip-planner")]',
]) {
  if (!tripPlanner.includes(feature)) failures.push(`Trip Planner shell contract missing: ${feature}.`);
}
if (/robots:\s*["']noindex, follow["']/.test(tripPlanner)) {
  failures.push('Trip Planner clean route must remain indexable; only destination/trip query states may emit noindex, follow.');
}

for (const feature of [
  'createLazyFileRoute("/explore/trip-planner")',
  'Travel month',
  '"museums", "food"',
  'name="accessible"',
  'Only include places with accessibility information',
  'Max daily driving (miles)',
]) {
  if (!tripPlannerLazy.includes(feature)) failures.push(`Trip Planner lazy UI contract missing: ${feature}.`);
}

if (failures.length) {
  console.error('Explore route registration validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Explore regional, compatibility, migrated guide, dynamically split Search, Trip Planner, crawl-safe structured destination and exact-radius filter routes are registered.');
