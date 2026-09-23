import fs from 'node:fs';

const route = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const engine = fs.readFileSync('src/data/destination-relationships.ts', 'utf8');
const serverBoundary = fs.readFileSync('src/data/destination-relationships.functions.ts', 'utf8');
const component = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const errors = [];

const requireFeatures = (source, features, area) => {
  for (const feature of features) {
    if (!source.includes(feature)) errors.push(`${area} feature missing: ${feature}.`);
  }
};

requireFeatures(route, [
  'getDestinationRelationshipGroups({ data: { slug: params.slug } })',
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


requireFeatures(serverBoundary, [
  'createServerFn({ method: "GET" })',
  'listResolvedDestinations({ limit: 5000 })',
  'buildDestinationRelationshipGroups(',
  'prepareDestinationForDelivery',
], 'Destination relationship server boundary');

if (route.includes('destinationsQuery({ limit: 5000 })')) {
  errors.push('Destination relationship route must not hydrate the full 5,000-item catalog into the browser.');
}
if (serverBoundary.includes('queryClient')) {
  errors.push('Destination relationship server boundary must not populate the public query cache.');
}

requireFeatures(component, [
  'const pairedDestinations = [...new Map(',
  '.flatMap((group) => group.destinations)',
  '.map((item) => [item.slug, item])',
  '.sort((left, right)',
  '.slice(0, 6)',
  'TexasExplainedContextLinks surface="destination"',
  'title="Explore nearby"',
  'More places near ${destination.name}, ordered by distance to help plan the rest of your trip.',
  'pairedDestinations.map((item)',
  'DestinationCard',
  'distanceMiles(destination, item)',
  'const roundedMiles = miles === null ? null : Math.max(1, Math.round(miles));',
  'roundedMiles.toLocaleString("en-US")',
  'roundedMiles === 1 ? "mile" : "miles"',
  'Approx.',
  'to="/explore/trip-planner"',
  'search={{ destination: destination.slug }}',
  'Build the weekend',
  'to="/explore/$category"',
  'to="/explore/region/$region"',
  'to="/events"',
  'to="/search"',
  'search={{ q: destination.nearestTown }}',
  'const areaGroups = AREA_GROUPS.filter((group) => guide[group.key].length > 0)',
  '<details key={group.key} open={index === 0}',
  'Continue exploring from ${destination.name}',
  'className="flex flex-wrap gap-x-6 gap-y-3"',
], 'Destination relationship UI');

if (component.includes('if (!groups.length) return null')) {
  errors.push('Destination relationship UI must preserve Texas Explained fallback discovery when no relationship groups are available.');
}
if (component.includes('#relationship-') || component.includes('groups.map((group, index)')) {
  errors.push('Destination relationship UI must not regress to a stacked relationship-section tail.');
}
if (component.includes('mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2') || component.includes('mt-6 grid border-t border-ink-foreground/20 sm:grid-cols-2 lg:grid-cols-3')) {
  errors.push('Destination relationship UI must keep the area guide and continuation links compact instead of restoring the tall stacked tail.');
}

if (route.includes('destinationsQuery({ category: destination.category, limit: 16 })')) {
  errors.push('Destination route regressed to the former same-category-only relationship query.');
}

if (errors.length) {
  console.error('Destination relationship validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Destination proximity and trip-intent relationships remain crawlable and structured while the area guide uses non-empty compact disclosure groups and continuation links stay in a compact strip.');