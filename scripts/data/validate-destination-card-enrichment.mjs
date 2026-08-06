import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const card = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationCard.tsx'), 'utf8');
const categoryRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const errors = [];

for (const feature of [
  'locationLabel(destination, regionLabel)',
  'destination.nearestTown',
  'destination.county',
  'checkedLabel(destination.sourceCheckedAt)',
  'Best time:',
  'cardHighlights(destination)',
  'destination.highlights',
  'aria-label={`${destination.name} highlights`}',
  'Plan a visit',
]) {
  if (!card.includes(feature)) errors.push(`Destination card enrichment feature missing: ${feature}`);
}

if (!card.includes('.slice(0, 3)')) errors.push('Destination cards must limit highlight chips to three.');
if (!card.includes('Number.isNaN(date.getTime())')) errors.push('Destination cards must guard invalid source-check dates.');

for (const feature of [
  'function validCoordinates(destination: Destination)',
  'function destinationSchema(destination: Destination)',
  'sameAs: destination.officialUrl',
  'dateModified: destination.sourceCheckedAt',
  'provider: destination.managingAuthority',
  'containedInPlace: destination.county',
  '"@type": "GeoCoordinates"',
  'latitude: destination.coordinates.lat',
  'longitude: destination.coordinates.lng',
  'item: destinationSchema(destination)',
]) {
  if (!categoryRoute.includes(feature)) errors.push(`Explore category destination schema feature missing: ${feature}`);
}

if (!categoryRoute.includes('!(lat === 0 && lng === 0)')) errors.push('Explore category schema must suppress 0,0 coordinates.');

if (errors.length) {
  console.error('Destination card and category schema enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Destination card and Explore category schema enrichment validation passed.');
