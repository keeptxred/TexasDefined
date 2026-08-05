import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const map = fs.readFileSync(path.join(root, 'src/components/editorial/MapPreview.tsx'), 'utf8');
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const errors = [];

for (const feature of [
  'function hasValidCoordinates',
  '...(validGeo',
  'destination.highlights.length > 0',
  'related.length > 0',
]) {
  if (!route.includes(feature)) errors.push(`Destination integrity feature missing: ${feature}.`);
}

for (const feature of [
  '!(primary.lat === 0 && primary.lng === 0)',
  'primary.lat >= -90',
  'primary.lng >= -180',
]) {
  if (!map.includes(feature)) errors.push(`Map coordinate guard missing: ${feature}.`);
}

if (!remote.includes('/images/texasdefined-destination-placeholder.svg')) {
  errors.push('Remote destination fallback image is not connected.');
}

if (errors.length) {
  console.error('Destination data integrity validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Destination data integrity validation passed.');
