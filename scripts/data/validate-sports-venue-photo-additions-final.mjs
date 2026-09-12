import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const base = read('src/data/sports-venue-images.ts');
const wave1 = read('src/data/sports-venue-images-additions.ts');
const wave2 = read('src/data/sports-venue-images-additions-wave2.ts');
const wave3 = read('src/data/sports-venue-images-additions-wave3.ts');
const wave4 = read('src/data/sports-venue-images-additions-wave4.ts');
const combined = read('src/data/sports-venue-images-all.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');

const failures = [];
const recordSlugs = (source) => [...source.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const validateSingleWave = (source, expectedSlug, label) => {
  const slugs = recordSlugs(source);
  if (slugs.length !== 1 || slugs[0] !== expectedSlug) failures.push(`${label}: expected only ${expectedSlug}; found ${slugs.join(', ')}.`);
  const block = source;
  for (const marker of [
    `slug: '${expectedSlug}'`,
    'alt:',
    "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/",
    "sourcePage: 'https://commons.wikimedia.org/wiki/File:",
    "sourceName: 'Wikimedia Commons'",
    'author:', 'licenseName:', 'licenseUrl:', 'width:', 'height:',
  ]) requireText(block, marker, label);
  const licenseUrl = block.match(/licenseUrl: '([^']+)'/)?.[1] ?? '';
  if (!licenseUrl.startsWith('https://creativecommons.org/')
      && licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
    failures.push(`${label}: unsupported license URL ${licenseUrl || '(missing)'}.`);
  }
  const dimensions = [...block.matchAll(/(?:width|height): (\d+)/g)].map((match) => Number(match[1]));
  if (dimensions.length !== 2 || dimensions.some((value) => value < 480)) failures.push(`${label}: dimensions are missing or too small.`);
  if (!dynamicRoute.includes(`'${expectedSlug}'`)) failures.push(`${label}: no governed dynamic venue route found.`);
};

validateSingleWave(wave3, 'ufcu-stadium', 'wave 3 UFCU Stadium photo');
validateSingleWave(wave4, 'round-rock-multipurpose-complex', 'wave 4 Round Rock Multipurpose Complex photo');

for (const source of [wave3, wave4]) {
  for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com', 'googleusercontent']) {
    if (source.toLowerCase().includes(forbidden)) failures.push(`Final photo additions contain disallowed source ${forbidden}.`);
  }
  if (source.includes('http://')) failures.push('Final photo additions must use HTTPS only.');
}

for (const marker of [
  "import { getSportsVenuePhotoAdditionWave3 } from './sports-venue-images-additions-wave3';",
  "import { getSportsVenuePhotoAdditionWave4 } from './sports-venue-images-additions-wave4';",
  'getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug) ?? getSportsVenuePhotoAdditionWave3(slug) ?? getSportsVenuePhotoAdditionWave4(slug)',
]) requireText(combined, marker, 'combined final photo registry');

const unique = new Set([
  ...recordSlugs(base),
  ...recordSlugs(wave1),
  ...recordSlugs(wave2),
  ...recordSlugs(wave3),
  ...recordSlugs(wave4),
]);
if (unique.size < 65) failures.push(`Expected at least 65 unique licensed venue heroes after final wave; found ${unique.size}.`);
if (unique.size > 84) failures.push('Licensed photo union exceeds the 84-venue seeded inventory.');

if (failures.length) {
  console.error('Final sports venue photo validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Final sports venue photo validation passed: ${unique.size}/84 unique licensed venue heroes; ${84 - unique.size} venues remain on the intentional fail-closed fallback.`);
