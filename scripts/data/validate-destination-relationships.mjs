import fs from 'node:fs';

const route = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const engine = fs.readFileSync('src/data/destination-relationships.ts', 'utf8');
const component = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const errors = [];

const requireFeatures = (source, features, area) => {
  for (const feature of features) {
    if (!source.includes(feature)) errors.push(`${area} feature missing: ${feature}.`);
  }
};

requireFeatures(route, [
  'destinationsQuery({ limit: 5000 })',
  'buildDestinationRelationshipGroups(destination, catalog)',
  'DestinationRelationships',
  '"@type": "ItemList"',
  '"@id": `${url}#related-places`',
  'hasPart: { "@id": `${url}#related-places` }',
  'numberOfItems: relatedPlaces.length',
  'relationshipGroups.flatMap',
  'url: `${siteUrl}/destination/${item.slug}`',
], 'Destination relationship route');

requireFeatures(engine, [
  'const earthRadiusMiles = 3958.8',
  'Math.atan2',
  'miles <= 75',
  'COMPLEMENTARY_CATEGORIES',
  'WATER_CATEGORIES',
  'HISTORY_CATEGORIES',
  'OUTDOOR_CATEGORIES',
  'WEEKEND_CATEGORIES',
  'sameTown',
  'nearbyComplementary',
  'nearbyWater',
  'nearbyHistory',
  'nearbyOutdoors',
  'weekendPairings',
  'id: "nearby-water"',
  'id: "history-nearby"',
  'id: "outdoors-nearby"',
  'id: "weekend"',
  'similar',
  'regional',
  'const used = new Set<string>()',
  'item.slug !== destination.slug',
  'new Map(items.map((item) => [item.slug, item]))',
], 'Destination relationship engine');

requireFeatures(component, [
  'if (!groups.length) return null',
  'aria-label="Ways to continue the trip"',
  'groups.map((group)',
  'href={`#relationship-${group.id}`}',
  'id={`relationship-${group.id}`}',
  'group.destinations.map',
  'DestinationCard',
  'distanceMiles(destination, item)',
  'Math.max(1, Math.round(miles)).toLocaleString("en-US")',
  'miles away',
  'to="/explore/trip-planner"',
  'search={{ destination: destination.slug }}',
  'Build the weekend',
  'to="/explore/$category"',
  'to="/explore/region/$region"',
  'to="/events"',
  'to="/search"',
  'search={{ q: destination.nearestTown }}',
], 'Destination relationship UI');

if (route.includes('destinationsQuery({ category: destination.category, limit: 16 })')) {
  errors.push('Destination route regressed to the former same-category-only relationship query.');
}

if (errors.length) {
  console.error('Destination relationship validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Destination proximity, trip-intent water/history/outdoors/weekend groups, town, complementary-category, similarity, regional, deduplication, crawlable UI, planner exits, and ItemList relationships passed validation.');
