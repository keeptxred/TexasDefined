import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const route = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/data/types.ts'), 'utf8');
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
  'sourceDetails',
  'media.external_url',
  'media.credit_text',
  'reservations_url',
  'entrance_fee_cents',
  'accessibility_notes',
  'officialUrl: source.officialUrl',
  'sourceCheckedAt: source.sourceCheckedAt',
  'reservationUrl:',
]) {
  if (!remote.includes(feature)) errors.push(`Remote Explore enrichment feature missing: ${feature}`);
}

for (const feature of [
  'Visit official source',
  'Official visitor information',
  'Check reservations',
  'Source checked',
  'destination.hero.credit',
  'citation: destination.officialUrl',
  'sameAs: destination.officialUrl',
  'dateModified: destination.sourceCheckedAt',
  'provider: { "@type": "Organization"',
  'destinationsQuery({ category: destination.category, limit: 16 })',
  'relatedDestinations',
  'Where to point the car next',
  'destination.accessibilityNotes',
  'destination.directions',
  'destination.address',
  'destination.county',
]) {
  if (!route.includes(feature)) errors.push(`Destination authority or discovery feature missing: ${feature}`);
}

for (const feature of [
  'managingAuthority?: string',
  'officialUrl?: string',
  'sourceCheckedAt?: string',
  'reservationUrl?: string',
  'county?: string',
  'address?: string',
  'directions?: string',
  'accessibilityNotes?: string',
]) {
  if (!types.includes(feature)) errors.push(`Destination authority type missing: ${feature}`);
}

if (!remote.includes('visibility: "eq.public"') || !remote.includes('status: "in.(published,verified)"')) {
  errors.push('Remote Explore publication filters are missing.');
}

if (errors.length) {
  console.error('Explore profile enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore profile, activity, amenity, media, source, authority, access, and nearby-destination enrichment validation passed.');
