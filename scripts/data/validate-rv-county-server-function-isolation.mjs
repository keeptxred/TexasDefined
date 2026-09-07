import fs from 'node:fs';

const countyFn = fs.readFileSync('src/data/rv-parks/county.functions.ts', 'utf8');
const sharedFacade = fs.readFileSync('src/data/rv-parks/index.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

expect(countyFn.includes('export const loadCountyRvParks = createServerFn({ method: "GET" })'), 'county RV server function must be exported directly from its own module');
expect(countyFn.includes('registry.loadRvParksForCountyServer(data.countySlug).slice(0, 12)'), 'county RV server function must filter and bound rows before serialization');
expect(!sharedFacade.includes('loadCountyRvParks'), 'shared RV facade must not co-locate the county server function');
expect(countyRoute.includes("import { loadCountyRvParks } from '@/data/rv-parks/county.functions';"), 'county route must statically import the isolated server function');
expect(countyRoute.includes('loadCountyRvParks({ data: { countySlug: entity.slug } })'), 'county route must call the isolated server function with the county slug');
expect(!countyRoute.includes("import('@/data/rv-parks').then(({ rvParksForCounty })"), 'county route must not dynamically import the RV server function');

if (failures.length) {
  console.error('RV county server-function isolation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('RV county server-function isolation validation passed.');
