import fs from 'node:fs';

const errors = [];
const queries = fs.readFileSync('src/data/queries.ts', 'utf8');
const home = fs.readFileSync('src/routes/index.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const article = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const destination = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const destinationCollectionsServer = fs.readFileSync('src/data/destination-collections.functions.ts', 'utf8');
const museums = fs.readFileSync('src/routes/explore.museums.tsx', 'utf8');
const aquariums = fs.readFileSync('src/routes/explore.aquariums.tsx', 'utf8');
const region = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');
const topAttractions = fs.readFileSync('src/routes/explore.top-attractions.tsx', 'utf8');
const topAttractionRoadTrips = fs.readFileSync('src/routes/explore.top-attractions.road-trips.tsx', 'utf8');
const attractionsComparison = fs.readFileSync('src/routes/explore.attractions-comparison.tsx', 'utf8');
const attractionsComparisonComponent = fs.readFileSync('src/components/explore/ExploreDestinationComparison.tsx', 'utf8');
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
  'function destinationAutoLinkGraph(',
  'const [completeGraph, categories, relationshipGroups, regions, relatedArticles] = await Promise.all([',
  'const graph = destinationAutoLinkGraph(destination, completeGraph);',
]) {
  if (!destination.includes(feature)) errors.push(`Destination knowledge-graph hydration bound missing: ${feature}`);
}
if (destination.includes('const [graph, categories, relationshipGroups, regions, relatedArticles] = await Promise.all([')) {
  errors.push('Destination detail routes must not return the complete Texas knowledge graph to the browser.');
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


if (article.includes('destinationsQuery({ limit: 5000 })')) {
  errors.push('Article detail routes must not query-cache the 5,000-item destination catalog.');
}
for (const feature of [
  'function articleAutoLinkGraph(',
  'const [authors, categories, related, destinations, completeGraph] = await Promise.all([',
  'getDestinationsBySlugs({ data: { slugs: article.relatedDestinations.slice(0, 8) } })',
  'const graph = articleAutoLinkGraph(article, completeGraph);',
]) {
  if (!article.includes(feature)) errors.push(`Article hydration bound missing: ${feature}`);
}
if (article.includes('const [authors, categories, related, destinations, graph] = await Promise.all([')) {
  errors.push('Article detail routes must not return the complete Texas knowledge graph to the browser.');
}

for (const feature of [
  'createServerFn({ method: "GET" })',
  'getDestinationsBySlugs',
  'getDestinationCollection',
  'getDestinationCatalog',
  'listResolvedDestinations({ limit: 5000 })',
  'prepareDestinationForDelivery',
]) {
  if (!destinationCollectionsServer.includes(feature)) errors.push(`Server-only destination collection contract missing: ${feature}`);
}
if (destinationCollectionsServer.includes('queryClient')) {
  errors.push('Server-only destination collection assembly must not populate the client query cache.');
}

for (const [name, source, required] of [
  ['museums', museums, 'getDestinationCollection({ data: { collection: "museums" } })'],
  ['aquariums', aquariums, 'getDestinationCollection({ data: { collection: "aquariums" } })'],
  ['top attractions', topAttractions, 'getDestinationsBySlugs({ data: { slugs: TOP_TEXAS_ATTRACTIONS.map((entry) => entry.slug) } })'],
  ['top-attraction road trips', topAttractionRoadTrips, 'getDestinationsBySlugs({ data: { slugs } })'],
]) {
  if (source.includes('destinationsQuery({ limit: 5000 })')) errors.push(`${name} must not query-cache the full destination catalog.`);
  if (!source.includes(required)) errors.push(`${name} server-bounded destination loader missing: ${required}`);
}

if (region.includes('destinationsQuery({ limit: 5000 })')) {
  errors.push('Regional guides must not query-cache the statewide destination catalog.');
}
if (!region.includes('destinationsQuery({ region: region.id, limit: 5000 })')) {
  errors.push('Regional guides must constrain destination hydration to the active region.');
}

if (attractionsComparison.includes('destinationsQuery({ limit: 5000 })')) {
  errors.push('Attractions comparison must not duplicate the full catalog in the TanStack query cache.');
}
if (!attractionsComparison.includes('loader: () => getDestinationCatalog()')) {
  errors.push('Attractions comparison must use the server-only destination catalog loader.');
}
for (const feature of [
  "const pageSize = kind === 'attractions' ? 100 : sorted.length;",
  'const visibleDestinations = sorted.slice(0, visibleCount);',
  'Show 100 more',
]) {
  if (!attractionsComparisonComponent.includes(feature)) errors.push(`Attractions comparison progressive-render guard missing: ${feature}`);
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

console.log('Homepage payload bounds, detail and collection hydration bounds, destination query caching, progressive comparison rendering, complete destination crawl discovery, sitemap resilience, and primary hero rendering contracts passed validation.');
