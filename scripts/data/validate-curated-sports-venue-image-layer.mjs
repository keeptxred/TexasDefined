import fs from 'node:fs/promises';

const [overrideSource, baseSource, aggregateSource, productionVerifier] = await Promise.all([
  fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8'),
  fs.readFile('src/data/sports-venue-images.ts', 'utf8'),
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
  !/all rights reserved/i.test(overrideSource),
  'Curated sports venue image overrides must not use all-rights-reserved media without documented commercial reuse permission.',
);
for (const match of overrideSource.matchAll(/licenseName: '([^']+)'/g)) {
  assert(
    /^(?:CC|Public domain)\b/i.test(match[1]),
    `Curated sports venue image override has no explicit commercial-reuse license: ${match[1]}`,
  );
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

const memorialGolfMatch = overrideSource.match(/'memorial-park-golf-course': \{[\s\S]*?\n  \},/);
const memorialGolfSource = memorialGolfMatch?.[0] ?? '';
assert(memorialGolfSource, 'Memorial Park Golf Course must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/MemorialParkHouston.JPG?width=1600'",
  "sourcePage: 'https://commons.wikimedia.org/wiki/File:MemorialParkHouston.JPG'",
  "sourceName: 'Wikimedia Commons'",
  "author: 'Tartessos75'",
  "licenseName: 'Public domain'",
  "alt: 'Memorial Park Golf Course in Houston with Williams Tower in the background'",
]) {
  assert(memorialGolfSource.includes(marker), `Memorial Park Golf Course documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(memorialGolfSource),
  'Memorial Park Golf Course hero must be documentary venue media, not generated or illustrative imagery.',
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

const pgaFriscoMatch = overrideSource.match(/'pga-frisco-fields-ranch': \{[\s\S]*?\n  \},/);
const pgaFriscoSource = pgaFriscoMatch?.[0] ?? '';
assert(pgaFriscoSource, 'PGA Frisco / Fields Ranch must have a curated documentary hero override.');
for (const marker of [
  "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Exterior_view_of_the_Professional_Golfers%27_Association_%28PGA%29_of_America_headquarters_in_Frisco%2C_Texas.jpg?width=1600'",
  "sourcePage: 'https://commons.wikimedia.org/wiki/File:Exterior_view_of_the_Professional_Golfers%27_Association_%28PGA%29_of_America_headquarters_in_Frisco%2C_Texas.jpg'",
  "sourceName: 'Wikimedia Commons'",
  "author: 'Jackilometresan'",
  "licenseName: 'CC0 1.0'",
  "licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/'",
  "alt: 'Exterior of the PGA of America headquarters at PGA Frisco in Frisco, Texas'",
]) {
  assert(pgaFriscoSource.includes(marker), `PGA Frisco documentary hero is missing required source marker: ${marker}`);
}
assert(
  !/AI-generated|illustration|OpenAI|Copilot/i.test(pgaFriscoSource),
  'PGA Frisco hero must be documentary venue media, not generated or illustrative imagery.',
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

assert(
  !overrideSource.includes("'xtreme-raceway-park': {"),
  'Xtreme Raceway Park must not use a curated documentary override unless the media has explicit commercial-reuse rights.',
);
const xtremeBaseMatch = baseSource.match(/'xtreme-raceway-park': \{[\s\S]*?\n  \},/);
const xtremeBaseSource = xtremeBaseMatch?.[0] ?? '';
assert(xtremeBaseSource, 'Xtreme Raceway Park must retain its site-owner supplied fallback in the base registry.');
for (const marker of [
  "imageUrl: '/images/sports-venues/xtreme-raceway-park.jpg'",
  "sourceName: 'site-owner supplied media'",
  "author: 'Microsoft Copilot AI image'",
  "licenseName: 'AI-generated image supplied for TexasDefined use'",
]) {
  assert(xtremeBaseSource.includes(marker), `Xtreme Raceway Park safe fallback is missing required marker: ${marker}`);
}

for (const marker of [
  "'src/data/sports-venue-images-curated-overrides.ts'",
  'const governedPhotos = new Map();',
  'const governedPhoto = governedPhotos.get(slug);',
  'const expectedImageUrl = governedPhoto.imageUrl;',
  "const assetPath = expectedImageUrl.startsWith('/') ? expectedImageUrl : undefined;",
  "redirect: 'manual'",
  'actualLocation === expectedLocation',
  'expectedImageUrl ?? assetPath',
]) {
  assert(
    productionVerifier.includes(marker),
    `Wave 7 production hero verifier must derive curated-first governed targets and enforce local-or-remote resolution: ${marker}`,
  );
}

if (errors.length) {
  console.error('Curated sports venue image layer validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Curated sports venue image layer validated: precedence, HTTPS policy, explicit commercial-reuse licensing, documentary Legacy Stadium, Memorial Park Golf Course, National Shooting Complex, PGA Frisco, Retama Park and TPC San Antonio sources, safe site-owner Xtreme fallback, real Dickies Arena fallback, production target enforcement, and disallowed-source guardrails are intact.');
