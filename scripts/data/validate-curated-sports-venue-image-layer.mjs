import fs from 'node:fs/promises';

const [overrideSource, aggregateSource, productionVerifier] = await Promise.all([
  fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8'),
  fs.readFile('src/data/sports-venue-images-all.ts', 'utf8'),
  fs.readFile('scripts/ci/verify-sports-venue-heroes-production.mjs', 'utf8'),
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

const legacyMatch = overrideSource.match(/'legacy-stadium-katy': \{[\s\S]*?\n  \},/);
const legacySource = legacyMatch?.[0] ?? '';
assert(legacySource, 'Legacy Stadium Katy must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2410/8718549/2000w_q95.jpg'",
  "sourcePage: 'https://www.dvidshub.net/image/8718549/rss-katy-attends-katy-jordan-vs-katy-taylor-football-game'",
  "sourceName: 'DVIDS / U.S. Marine Corps'",
  "author: 'Ryan Pulliam'",
  "licenseName: 'Public domain; the appearance of U.S. Department of War visual information does not imply or constitute DoW endorsement'",
  "licenseUrl: 'https://www.dvidshub.net/about/copyright'",
  "alt: 'Football game and crowd activity at Legacy Stadium in Katy, Texas'",
]) {
  assert(legacySource.includes(marker), `Legacy Stadium documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(legacySource),
  'Legacy Stadium hero must be documentary venue media, not generated or illustrative imagery.',
);

const nationalShootingMatch = overrideSource.match(/'national-shooting-complex': \{[\s\S]*?\n  \},/);
const nationalShootingSource = nationalShootingMatch?.[0] ?? '';
assert(nationalShootingSource, 'National Shooting Complex must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/1902/5114543/2000w_q95.jpg'",
  "sourcePage: 'https://www.dvidshub.net/image/5114543/us-army-soldiers-give-shotgun-demo-in-texas'",
  "sourceName: 'DVIDS / U.S. Army Marksmanship Unit'",
  "author: 'Michelle Lunato'",
  "licenseName: 'Public domain; the appearance of U.S. Department of War visual information does not imply or constitute DoW endorsement'",
  "licenseUrl: 'https://www.dvidshub.net/about/copyright'",
  "alt: 'U.S. Army Marksmanship Unit shotgun demonstration at the National Shooting Complex in San Antonio'",
]) {
  assert(nationalShootingSource.includes(marker), `National Shooting Complex documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(nationalShootingSource),
  'National Shooting Complex hero must be documentary venue media, not generated or illustrative imagery.',
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

const tpcMatch = overrideSource.match(/'tpc-san-antonio': \{[\s\S]*?\n  \},/);
const tpcSource = tpcMatch?.[0] ?? '';
assert(tpcSource, 'TPC San Antonio must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Martin_Trainer_The_Thinker.jpg?width=1600'",
  "sourcePage: 'https://commons.wikimedia.org/wiki/File:Martin_Trainer_The_Thinker.jpg'",
  "sourceName: 'Wikimedia Commons'",
  "author: 'TheDapperDan'",
  "licenseName: 'CC BY-SA 4.0'",
  "licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'",
  "alt: 'PGA Tour golfer Martin Trainer on the course at TPC San Antonio during the Valero Texas Open'",
]) {
  assert(tpcSource.includes(marker), `TPC San Antonio documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(tpcSource),
  'TPC San Antonio hero must be documentary venue media, not generated or illustrative imagery.',
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

for (const marker of [
  'const remotePhoto = wave7CuratedRemotePhoto[slug];',
  'const expectedImageUrl = remotePhoto?.imageUrl',
  "redirect: 'manual'",
  'actualLocation === expectedLocation',
  'expectedImageUrl ?? assetPath',
]) {
  assert(
    productionVerifier.includes(marker),
    `Wave 7 production hero verifier must enforce governed local-or-remote target resolution: ${marker}`,
  );
}

if (errors.length) {
  console.error('Curated sports venue image layer validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Curated sports venue image layer validated: precedence, HTTPS policy, documentary Legacy Stadium, National Shooting Complex, Retama Park, TPC San Antonio and Xtreme Raceway sources, real Dickies Arena fallback, production target enforcement, and disallowed-source guardrails are intact.');
