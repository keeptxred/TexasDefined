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

assert(
  !overrideSource.includes("'dickies-arena': {"),
  'Dickies Arena must resolve to its existing reusable documentary photo instead of an AI-generated curated override.',
);

const retamaMatch = overrideSource.match(/'retama-park': \{[\s\S]*?\n  \},/);
const retamaSource = retamaMatch?.[0] ?? '';
assert(retamaSource, 'Retama Park must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2407/8518059/2000w_q95.jpg'",
  "sourcePage: 'https://www.dvidshub.net/image/8518059/quarter-horse-races-honoring-the-memorial-of-colonel-gary-baber'",
  "sourceName: 'DVIDS / U.S. Air Force'",
  "author: 'Olivia Mendoza Sencalar'",
  "licenseName: 'Public domain; the appearance of U.S. Department of War visual information does not imply or constitute DoW endorsement'",
  "licenseUrl: 'https://www.dvidshub.net/about/copyright'",
  "alt: 'Quarter horse racing at Retama Park in Selma, Texas'",
]) {
  assert(retamaSource.includes(marker), `Retama Park documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(retamaSource),
  'Retama Park hero must be documentary venue media, not generated or illustrative imagery.',
);

const xtremeMatch = overrideSource.match(/'xtreme-raceway-park': \{[\s\S]*?\n  \},/);
const xtremeSource = xtremeMatch?.[0] ?? '';
assert(xtremeSource, 'Xtreme Raceway Park must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://membertrack.nhradata.com/Images/Tracks/PRIMARY__153.jpg'",
  "sourcePage: 'https://www.nhradiv4.com/membertrackinfo?trackID=885'",
  "sourceName: 'NHRA South Central Division'",
  "author: 'NHRA Member Track Network'",
  "alt: 'Xtreme Raceway Park drag strip in Ferris, Texas'",
]) {
  assert(xtremeSource.includes(marker), `Xtreme Raceway Park documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(xtremeSource),
  'Xtreme Raceway Park hero must be documentary venue media, not generated or illustrative imagery.',
);

if (errors.length) {
  console.error('Curated sports venue image layer validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Curated sports venue image layer validated: precedence, HTTPS policy, documentary Retama Park and Xtreme Raceway sources, real Dickies Arena fallback, and disallowed-source guardrails are intact.');
