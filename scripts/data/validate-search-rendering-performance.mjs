import fs from 'node:fs';

const errors = [];
const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const home = fs.readFileSync('src/routes/index.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const article = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const destinationShell = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const destinationPresentation = fs.readFileSync('src/components/editorial/DestinationPageContent.tsx', 'utf8');
const destination = `${destinationShell}\n${destinationPresentation}`;

for (const feature of [
  'staleTime: 10 * 60 * 1000',
  'gcTime: 30 * 60 * 1000',
  'refetchOnWindowFocus: false',
  'refetchOnMount: false',
  'refetchOnReconnect: false',
]) {
  if (!queries.includes(feature)) errors.push(`Destination query cache contract missing: ${feature}`);
}

for (const feature of [
  'HOMEPAGE_DESTINATION_LIMIT = 24',
  'HOMEPAGE_ROAD_TRIP_LIMIT = 8',
  'destinationsQuery({ limit: HOMEPAGE_DESTINATION_LIMIT })',
  'destinationsQuery({ category: "road-trips", limit: HOMEPAGE_ROAD_TRIP_LIMIT })',
]) {
  if (!home.includes(feature)) errors.push(`Homepage payload bound missing: ${feature}`);
}

if (home.includes('destinationsQuery({})')) {
  errors.push('Homepage must not request the unbounded destination catalog.');
}

for (const feature of [
  'Promise.allSettled',
  'status: 503',
  'retry-after',
  'stale-while-revalidate=86400',
]) {
  if (!sitemap.includes(feature)) errors.push(`Crawler-critical sitemap resilience missing: ${feature}`);
}

for (const [name, source] of [['article', article], ['destination', destination]]) {
  if (!source.includes('fetchPriority="high"')) errors.push(`${name} hero must keep high fetch priority.`);
  if (!source.includes('width={')) errors.push(`${name} hero must declare width.`);
  if (!source.includes('height={')) errors.push(`${name} hero must declare height.`);
}

if (!destinationShell.includes('lazy(() =>') || !destinationShell.includes('import("@/components/editorial/DestinationPageContent")')) {
  errors.push('Destination presentation must remain dynamically split from the global client bundle.');
}

if (errors.length) {
  console.error('Search rendering/performance validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Homepage payload bounds, destination query hydration caching, sitemap resilience, split destination presentation, and primary hero rendering contracts passed validation.');
