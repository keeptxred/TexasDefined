import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const base = read('src/data/sports-venue-images.ts');
const wave1 = read('src/data/sports-venue-images-additions.ts');
const wave2 = read('src/data/sports-venue-images-additions-wave2.ts');
const wave3 = read('src/data/sports-venue-images-additions-wave3.ts');
const wave4 = read('src/data/sports-venue-images-additions-wave4.ts');
const wave5 = read('src/data/sports-venue-images-additions-wave5.ts');
const combined = read('src/data/sports-venue-images-all.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');

const failures = [];
const recordSlugs = (source) => [...source.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const expectedWave5 = ['msr-houston'];
const wave5Slugs = recordSlugs(wave5);
if (JSON.stringify(wave5Slugs) !== JSON.stringify(expectedWave5)) {
  failures.push(`Expected exact wave 5 slugs ${expectedWave5.join(', ')}; found ${wave5Slugs.join(', ')}.`);
}

for (const slug of wave5Slugs) {
  const start = wave5.indexOf(`  '${slug}': {`);
  const next = wave5.indexOf("\n  '", start + 1);
  const block = wave5.slice(start, next === -1 ? wave5.indexOf('\n};', start) : next);
  for (const marker of [
    `slug: '${slug}'`,
    'alt:',
    "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/",
    "sourcePage: 'https://commons.wikimedia.org/wiki/File:",
    "sourceName: 'Wikimedia Commons'",
    'author:', 'licenseName:', 'licenseUrl:', 'width:', 'height:',
  ]) requireText(block, marker, `wave 5 photo ${slug}`);

  const licenseUrl = block.match(/licenseUrl: '([^']+)'/)?.[1] ?? '';
  if (!licenseUrl.startsWith('https://creativecommons.org/')
      && licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
    failures.push(`${slug}: unsupported license URL ${licenseUrl || '(missing)'}.`);
  }
  if (!/licenseName: '(?:CC|Public domain)/.test(block)) failures.push(`${slug}: license name is not explicitly reusable.`);
  if (/author: '\s*'/.test(block)) failures.push(`${slug}: author must not be empty.`);
  const dimensions = [...block.matchAll(/(?:width|height): (\d+)/g)].map((match) => Number(match[1]));
  if (dimensions.length !== 2 || dimensions.some((value) => value < 480)) failures.push(`${slug}: dimensions are missing or too small.`);
  if (!dynamicRoute.includes(`'${slug}'`)) failures.push(`${slug}: no governed dynamic venue route found.`);
}

for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com', 'googleusercontent']) {
  if (wave5.toLowerCase().includes(forbidden)) failures.push(`Wave 5 additions contain disallowed source ${forbidden}.`);
}
if (wave5.includes('http://')) failures.push('Wave 5 additions must use HTTPS only.');

requireText(combined, "import { getSportsVenuePhotoAdditionWave5 } from './sports-venue-images-additions-wave5';", 'combined registry');
requireText(combined, 'getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug) ?? getSportsVenuePhotoAdditionWave3(slug) ?? getSportsVenuePhotoAdditionWave4(slug) ?? getSportsVenuePhotoAdditionWave5(slug)', 'base-first photo precedence');

const unique = new Set([
  ...recordSlugs(base),
  ...recordSlugs(wave1),
  ...recordSlugs(wave2),
  ...recordSlugs(wave3),
  ...recordSlugs(wave4),
  ...recordSlugs(wave5),
]);
if (unique.size < 67) failures.push(`Expected at least 67 unique licensed venue heroes after wave 5; found ${unique.size}.`);
if (unique.size > 84) failures.push('Licensed photo union exceeds the 84-venue seeded inventory.');

if (failures.length) {
  console.error('Sports venue photo additions wave 5 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue photo additions wave 5 validated: ${unique.size}/84 unique licensed venue heroes; ${84 - unique.size} venues remain on the intentional fail-closed fallback.`);
