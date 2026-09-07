import fs from 'node:fs';

const countyDiscovery = fs.readFileSync('src/data/rv-parks/county-discovery.ts', 'utf8');
const countyEventsBridge = fs.readFileSync('src/data/county-major-events.ts', 'utf8');
const sharedFacade = fs.readFileSync('src/data/rv-parks/index.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

for (const sourceName of [
  'RV_PARK_RAW_HILL_COUNTRY',
  'RV_PARK_RAW_GULF_COAST',
  'RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS',
  'RV_PARK_RAW_PANHANDLE_NORTH_TEXAS',
  'RV_PARK_RAW_BIG_BEND_WEST_TEXAS',
]) expect(countyDiscovery.includes(sourceName), `static county discovery must include ${sourceName}`);
expect(countyDiscovery.includes('export function rvParkDiscoveryForCounty(countySlug: string)'), 'county RV discovery must be a deterministic local function');
expect(countyDiscovery.includes('.filter(([, , county]) => normalizeCounty(county) === normalizedCounty)'), 'county RV discovery must filter exact normalized county identity');
expect(countyDiscovery.includes('.slice(0, 12)'), 'county RV discovery must stay bounded to 12 cards');
expect(!countyDiscovery.includes('createServerFn'), 'county RV discovery must not cross a Worker server-function boundary');
expect(!countyDiscovery.includes('registry.server'), 'county RV discovery must not import the full server-only destination registry');

expect(countyEventsBridge.includes('const loadCountyMajorEvents = createServerFn({ method: "GET" })'), 'major events must retain their proven event-only server bridge');
expect(!countyEventsBridge.includes('rvParks') && !countyEventsBridge.includes('rv-parks'), 'major-event bridge must not carry RV rows');
expect(!sharedFacade.includes('loadCountyRvParks') && !sharedFacade.includes('rvParksForCounty'), 'shared RV facade must not own another county RPC');
expect(countyRoute.includes("import { rvParkDiscoveryForCounty } from '@/data/rv-parks/county-discovery';"), 'county route must statically import deterministic RV discovery');
expect(countyRoute.includes('const countyRvParks = rvParkDiscoveryForCounty(entity.slug) as Destination[];'), 'county route must resolve RV rows locally from seed data');
expect(countyRoute.includes("import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))"), 'county route must keep the proven event-only server bridge');
expect(countyRoute.includes('rvParks: countyRvParks, majorEvents: countyMajorEvents'), 'county route must serialize deterministic RV rows with event discovery');
expect(!countyRoute.includes('getCountyDiscovery(entity.slug)'), 'county route must not return to the failed unified Worker payload');
expect(!countyRoute.includes("from '@/data/rv-parks/county.functions'"), 'county route must not use the failed standalone RV server-function module');
expect(!countyRoute.includes("import('@/data/rv-parks').then(({ rvParksForCounty })"), 'county route must not use the failed dynamic RV server-function path');

if (failures.length) {
  console.error('Static county RV discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Static county RV discovery validation passed: bounded RV cards come directly from client-safe seed arrays while major events retain their proven server bridge.');
