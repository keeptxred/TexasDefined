import fs from 'node:fs';

const countyBridge = fs.readFileSync('src/data/county-major-events.ts', 'utf8');
const sharedFacade = fs.readFileSync('src/data/rv-parks/index.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

expect(countyBridge.includes('const loadCountyDiscovery = createServerFn({ method: "GET" })'), 'county discovery must cross one server-function boundary');
expect(countyBridge.includes('import("./county-major-events.server")'), 'county discovery must load verified major-event records server-side');
expect(countyBridge.includes('import("./rv-parks/registry.server")'), 'county discovery must load the RV registry server-side');
expect(countyBridge.includes('majorEvents: loadCountyMajorEventsServer(data.countySlug)'), 'county discovery must include major events');
expect(countyBridge.includes('rvParks: rvRegistry.loadRvParksForCountyServer(data.countySlug).slice(0, 12)'), 'county discovery must filter and bound RV rows before serialization');
expect(!sharedFacade.includes('loadCountyRvParks') && !sharedFacade.includes('rvParksForCounty'), 'shared RV facade must not own another county RPC');
expect(countyRoute.includes("import('@/data/county-major-events').then(({ getCountyDiscovery }) => getCountyDiscovery(entity.slug))"), 'county route must call the single discovery bridge');
expect(countyRoute.includes('rvParks: countyDiscovery.rvParks, majorEvents: countyDiscovery.majorEvents'), 'county route must serialize both discovery sets from one response');
expect(!countyRoute.includes("from '@/data/rv-parks/county.functions'"), 'county route must not use the failed standalone RV server-function module');
expect(!countyRoute.includes("import('@/data/rv-parks').then(({ rvParksForCounty })"), 'county route must not use the failed dynamic RV server-function path');

if (failures.length) {
  console.error('Unified county discovery server-boundary validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Unified county discovery server-boundary validation passed: events and bounded RV rows share one loader-backed server payload.');
