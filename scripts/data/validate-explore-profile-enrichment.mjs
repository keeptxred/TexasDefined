import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const errors = [];

for (const feature of [
  'explore_park_profiles(',
  'explore_lake_profiles(',
  'explore_entity_activities(',
  'explore_entity_amenities(',
  'explore_entity_media(',
  'explore_entity_sources(',
  'bestSeasonFromActivities',
  'parkEntryNote',
  'generatedSummary',
  'profileHighlights',
  'sourceParagraph',
  'media.external_url',
  'reservations_url',
  'entrance_fee_cents',
  'accessibility_notes',
]) {
  if (!remote.includes(feature)) errors.push(`Remote Explore enrichment feature missing: ${feature}`);
}

if (!remote.includes('visibility: "eq.public"') || !remote.includes('status: "in.(published,verified)"')) {
  errors.push('Remote Explore publication filters are missing.');
}

if (errors.length) {
  console.error('Explore profile enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore profile, activity, amenity, media, and source enrichment validation passed.');
