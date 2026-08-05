import fs from 'node:fs';

const routeTree = fs.readFileSync('src/routeTree.gen.ts', 'utf8');
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

if (failures.length) {
  console.error('Explore route registration validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Explore regional, compatibility, and migrated guide routes are registered in routeTree.gen.ts.');
