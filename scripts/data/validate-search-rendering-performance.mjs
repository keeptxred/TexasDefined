import fs from 'node:fs';

const errors = [];
const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const home = fs.readFileSync('src/routes/index.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const article = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const destination = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const destinationRelationshipsServer = fs.readFileSync('src/data/destination-relationships.functions.ts', 'utf8');
const destinationCollection = fs.readFileSync('src/components/editorial/DestinationCollectionGrid.tsx', 'utf8');

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


if (destination.includes('destinationsQuery({ limit: 5000 })')) {
  errors.push('Destination detail routes must not query-cache the 5,000-item destination catalog; that catalog would be dehydrated into the browser.');
}
for (const feature of [
  'getDestinationRelationshipGroups({ data: { slug: params.slug } })',
  'import { getDestinationRelationshipGroups } from "@/data/destination-relationships.functions"',
]) {
  if (!destination.includes(feature)) errors.push(`Destination relationship server boundary missing: ${feature}`);
}
for (const feature of [
  'createServerFn({ method: "GET" })',
  'listResolvedDestinations({ limit: 5000 })',
  'buildDestinationRelationshipGroups(',
  'prepareDestinationForDelivery',
]) {
  if (!destinationRelationshipsServer.includes(feature)) errors.push(`Server-only destination relationship contract missing: ${feature}`);
}
if (destinationRelationshipsServer.includes('queryClient')) {
  errors.push('Server-only destination relationship assembly must not populate the client query cache.');
}

for (const [name, source] of [['article', article], ['destination', destination]]) {
  if (!source.includes('fetchPriority="high"')) errors.push(`${name} hero must keep high fetch priority.`);
  if (!source.includes('width={')) errors.push(`${name} hero must declare width.`);
  if (!source.includes('height={')) errors.push(`${name} hero must declare height.`);
}

for (const feature of [
  'const PAGE_SIZE = 24',
  'aria-label="All places in this guide"',
  'Browse every place in this guide',
  'allDestinations.map((destination)',
  'to="/destination/$slug"',
]) {
  if (!destinationCollection.includes(feature)) errors.push(`Destination crawl directory contract missing: ${feature}`);
}

if (destinationCollection.includes('filtered.slice(0, visibleCount)') && !destinationCollection.includes('allDestinations.map((destination)')) {
  errors.push('Paginated destination cards must retain a complete crawlable text-link directory for destinations beyond the initial render.');
}

if (errors.length) {
  console.error('Search rendering/performance validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Homepage payload bounds, destination detail hydration bounds, destination query caching, complete destination crawl discovery, sitemap resilience, and primary hero rendering contracts passed validation.');
