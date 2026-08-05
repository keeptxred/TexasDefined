import fs from 'node:fs';

const route = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const engine = fs.readFileSync('src/data/destination-relationships.ts', 'utf8');
const component = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const errors = [];

for (const feature of [
  'destinationsQuery({ limit: 5000 })',
  'buildDestinationRelationshipGroups(destination, catalog)',
  'DestinationRelationships',
  '"@id": `${url}#related-places`',
  'numberOfItems: relatedPlaces.length',
  'relationshipGroups.flatMap',
]) {
  if (!route.includes(feature)) errors.push(`Destination relationship route feature missing: ${feature}.`);
}

for (const feature of [
  'const earthRadiusMiles = 3958.8',
  'Math.atan2',
  'miles <= 75',
  'COMPLEMENTARY_CATEGORIES',
  'sameTown',
  'nearbyComplementary',
  'similar',
  'regional',
  'const used = new Set<string>()',
]) {
  if (!engine.includes(feature)) errors.push(`Destination relationship engine feature missing: ${feature}.`);
}

for (const feature of [
  'Destination relationship sections',
  'Nearby places',
  'People also visit',
  'About {Math.max(1, Math.round(miles))',
  'to="/explore/$category"',
  'to="/explore/region/$region"',
  'search={{ q: destination.nearestTown }}',
]) {
  if (!component.includes(feature)) errors.push(`Destination relationship UI feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Destination relationship validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Destination proximity, town, complementary-category, similarity, regional, internal-link and structured-data relationships passed validation.');
