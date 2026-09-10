import fs from 'node:fs';

const countyEventsBridge = fs.readFileSync('src/data/county-major-events.ts', 'utf8');
const countyRvIndex = fs.readFileSync('src/data/rv-parks/county-index.ts', 'utf8');
const sharedFacade = fs.readFileSync('src/data/rv-parks/index.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const countySection = fs.readFileSync('src/components/explore/CountyRvParks.tsx', 'utf8');
const countyHost = fs.readFileSync('src/components/sports/CountySportsDestinations.tsx', 'utf8');

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

expect(countyEventsBridge.includes('const loadCountyMajorEvents = createServerFn({ method: "GET" })'), 'county events must keep their proven server-function boundary');
expect(countyEventsBridge.includes('import("./county-major-events.server")'), 'county events must load verified authority records server-side');
expect(!countyEventsBridge.includes('rv-parks/registry.server'), 'county event RPC must not own RV discovery');

for (const marker of [
  "RV_PARK_RAW_HILL_COUNTRY",
  "RV_PARK_RAW_GULF_COAST",
  "RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS",
  "RV_PARK_RAW_PANHANDLE_NORTH_TEXAS",
  "RV_PARK_RAW_BIG_BEND_WEST_TEXAS",
  "type CountyRvSeed = readonly",
  "function snapshotDestination(",
  "const COUNTY_RV_PARKS: readonly Destination[] = GROUPS.flatMap",
  "export function loadCountyRvParksSnapshot(countySlug: string): Destination[]",
  "normalizeCountySlug(park.county!) === normalized",
  ".sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name))",
  ".slice(0, 12)",
]) expect(countyRvIndex.includes(marker), `county RV snapshot missing protected generic marker: ${marker}`);

expect(!countyRvIndex.includes('CERTIFIED_COUNTY_FALLBACKS'), 'county RV snapshot must not retain county-specific fallback inventory');
expect(!countyRvIndex.includes('randall: ['), 'county RV snapshot must not hardcode Randall production rows');
expect(!countyRvIndex.includes('createServerFn'), 'county RV snapshot must not add another failing TanStack server-function boundary');
expect(!countyRvIndex.includes('registry.server'), 'county RV snapshot must not pull the full server-only RV registry into the county route');
expect(!countyRvIndex.includes('images.server'), 'county RV snapshot must not pull licensed image metadata into the county route');
expect(!sharedFacade.includes('{ action: "county"; value: string }'), 'generic RV server dispatcher must remain county-free after its failed production experiment');

expect(countyRoute.includes("import('@/data/rv-parks/county-index').then(({ loadCountyRvParksSnapshot }) => loadCountyRvParksSnapshot(entity.slug))"), 'county route must use the bounded client-safe RV snapshot');
expect(countyRoute.includes("import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))"), 'county route must keep the proven major-event server lookup');
expect(countyRoute.includes('rvParks: countyRvParks, majorEvents: countyMajorEvents'), 'county route must serialize both bounded discovery sets for synchronous rendering');
expect(!countyRoute.includes("from '@/data/rv-parks/county.functions'"), 'county route must not restore the failed standalone RV server-function module');
expect(!countyRoute.includes('getCountyDiscovery'), 'county route must not restore the failed unified county discovery RPC');

expect(countySection.includes("type CountyRvParkLink = Pick<Destination, 'slug' | 'name' | 'nearestTown'>;"), 'county RV child must accept only the lightweight fields it renders');
expect(countySection.includes('rvParks: readonly CountyRvParkLink[]'), 'county RV child must remain a pure render input');
expect(countySection.includes('if (!rvParks.length) return null;'), 'county RV child must only render resolved rows supplied by its SSR host');
expect(!countySection.includes('loadCountyRvParksSnapshot'), 'county RV child must not own discovery lookup');
expect(!countySection.includes('createServerFn'), 'county RV child must remain synchronous and server-function free');

expect(countyHost.includes('const rvParks = county.rvParks ?? [];'), 'county SSR host must render only the generic bounded loader payload');
expect(!countyHost.includes('CERTIFIED_RANDALL_RV_PARKS'), 'county SSR host must not retain a Randall-only production canary');
expect(!countyHost.includes("county.slug === 'randall'"), 'county SSR host must not special-case Randall RV discovery');
expect(countyHost.includes('function renderCountyRvParks(county: TexasEntityRecord, rvParks: readonly CountyRvParkLink[])'), 'county SSR host must own the production RV markup in the same module');
expect(countyHost.includes('if (!rvParks.length) return null;'), 'same-module RV renderer must stay empty for counties without resolved inventory');
expect(countyHost.includes("'@type': 'Campground'"), 'same-module RV renderer must emit Campground schema');
expect(countyHost.includes("'@type': 'ItemList'"), 'same-module RV renderer must emit ItemList schema');
expect(countyHost.includes('id="county-rv-parks-heading"'), 'same-module RV renderer must emit the county RV heading');
expect(countyHost.includes('RV camping around {county.name}'), 'same-module RV renderer must retain the required heading text');
expect(countyHost.includes('href="/explore/rv-parks"'), 'same-module RV renderer must retain the statewide RV handoff');
expect(countyHost.includes('{renderCountyRvParks(county, rvParks)}'), 'county SSR host must render the resolved RV section without a nested component boundary');
expect(!countyHost.includes("import { CountyRvParks } from '@/components/explore/CountyRvParks';"), 'county SSR host must not restore the nested CountyRvParks production boundary that live SSR skipped');
expect(!countyHost.includes('<CountyRvParks'), 'county SSR host must not restore nested CountyRvParks markup');
expect(!countyHost.includes("lazy(() => import('@/components/explore/CountyRvParks'))"), 'county RV section must not move behind a client-only lazy boundary');

if (failures.length) {
  console.error('County discovery boundary validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('County discovery boundary validation passed: all five regional RV seed arrays feed one bounded generic county snapshot, county-specific production fallbacks are forbidden, major events retain their proven server RPC, and RV markup renders synchronously in the established county SSR host.');
