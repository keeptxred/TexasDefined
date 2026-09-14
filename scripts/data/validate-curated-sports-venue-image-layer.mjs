import fs from 'node:fs/promises';

const [overrideSource, aggregateSource] = await Promise.all([
  fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8'),
  fs.readFile('src/data/sports-venue-images-all.ts', 'utf8'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'const curatedSportsVenuePhotoOverrides',
  'export function getCuratedSportsVenuePhotoOverride',
]) {
  assert(overrideSource.includes(marker), `Curated sports venue override layer is missing: ${marker}`);
}

assert(
  aggregateSource.includes("import { getCuratedSportsVenuePhotoOverride } from './sports-venue-images-curated-overrides';"),
  'Aggregate sports venue image registry must import the curated override layer.',
);
assert(
  aggregateSource.includes('return getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug)'),
  'Curated sports venue image overrides must resolve before the base photo registry.',
);
assert(!overrideSource.includes('http://'), 'Curated sports venue image overrides must use HTTPS only.');

for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com']) {
  assert(!overrideSource.toLowerCase().includes(forbidden), `Curated sports venue image overrides contain a disallowed source: ${forbidden}`);
}

if (errors.length) {
  console.error('Curated sports venue image layer validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Curated sports venue image layer validated: precedence, HTTPS policy, and disallowed-source guardrails are intact.');
