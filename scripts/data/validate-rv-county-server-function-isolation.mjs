import fs from 'node:fs';

const countyEventsBridge = fs.readFileSync('src/data/county-major-events.ts', 'utf8');
const countyRvIndex = fs.readFileSync('src/data/rv-parks/county-index.ts', 'utf8');
const sharedFacade = fs.readFileSync('src/data/rv-parks/index.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');

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
  "export function loadCountyRvParksSnapshot(countySlug: string): Destination[]",
  "normalizeCountySlug(park.county!) === normalized",
  ".slice(0, 12)",
]) expect(countyRvIndex.includes(marker), `county RV snapshot missing protected marker: ${marker}`);
expect(!countyRvIndex.includes('createServerFn'), 'county RV snapshot must not add another failing TanStack server-function boundary');
expect(!countyRvIndex.includes('registry.server'), 'county RV snapshot must not pull the full server-only RV registry into the county route');
expect(!countyRvIndex.includes('images.server'), 'county RV snapshot must not pull licensed image metadata into the county route');
expect(!sharedFacade.includes('{ action: "county"; value: string }'), 'generic RV server dispatcher must remain county-free after its failed production experiment');

expect(countyRoute.includes("import('@/data/rv-parks/county-index').then(({ loadCountyRvParksSnapshot }) => loadCountyRvParksSnapshot(entity.slug))"), 'county route must use the bounded client-safe RV snapshot');
expect(countyRoute.includes("import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))"), 'county route must keep the proven major-event server lookup');
expect(countyRoute.includes('rvParks: countyRvParks, majorEvents: countyMajorEvents'), 'county route must serialize both bounded discovery sets for synchronous rendering');
expect(!countyRoute.includes("from '@/data/rv-parks/county.functions'"), 'county route must not restore the failed standalone RV server-function module');
expect(!countyRoute.includes('getCountyDiscovery'), 'county route must not restore the failed unified county discovery RPC');

if (failures.length) {
  console.error('County discovery boundary validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('County discovery boundary validation passed: major events keep their proven server RPC while RV cards use a bounded client-safe seed snapshot with no full registry or image payload.');
