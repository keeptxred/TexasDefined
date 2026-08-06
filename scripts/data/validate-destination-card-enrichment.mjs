import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const card = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationCard.tsx'), 'utf8');
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

if (errors.length) {
  console.error('Destination card enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Destination card location, planning, verification and highlight enrichment validation passed.');
