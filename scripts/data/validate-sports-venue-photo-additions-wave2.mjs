import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const base = read('src/data/sports-venue-images.ts');
const wave1 = read('src/data/sports-venue-images-additions.ts');
const wave2 = read('src/data/sports-venue-images-additions-wave2.ts');
const combined = read('src/data/sports-venue-images-all.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');

const failures = [];
const recordSlugs = (source) => [...source.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const baseSlugs = recordSlugs(base);
const wave1Slugs = recordSlugs(wave1);
const wave2Slugs = recordSlugs(wave2);
const expectedWave2 = ['extraco-events-center', 'jamail-texas-swimming-center', 'eagles-canyon-raceway', 'freeman-coliseum'];

if (JSON.stringify([...wave2Slugs].sort()) !== JSON.stringify([...expectedWave2].sort())) {
  failures.push(`Expected exact wave 2 slugs ${expectedWave2.join(', ')}; found ${wave2Slugs.join(', ')}.`);
}

for (const slug of wave2Slugs) {
  const start = wave2.indexOf(`  '${slug}': {`);
  const next = wave2.indexOf("\n  '", start + 1);
  const block = wave2.slice(start, next === -1 ? wave2.indexOf('\n};', start) : next);
  for (const marker of [
    `slug: '${slug}'`,
    'alt:',
    "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/",
    "sourcePage: 'https://commons.wikimedia.org/wiki/File:",
    "sourceName: 'Wikimedia Commons'",
    'author:', 'licenseName:', 'licenseUrl:', 'width:', 'height:',
  ]) requireText(block, marker, `wave 2 photo ${slug}`);

  const licenseUrl = block.match(/licenseUrl: '([^']+)'/)?.[1] ?? '';
  if (!licenseUrl.startsWith('https://creativecommons.org/')
      && licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
    failures.push(`${slug}: unsupported license URL ${licenseUrl || '(missing)'}.`);
  }
  const dimensions = [...block.matchAll(/(?:width|height): (\d+)/g)].map((match) => Number(match[1]));
  if (dimensions.length !== 2 || dimensions.some((value) => value < 480)) failures.push(`${slug}: dimensions are missing or too small.`);
  if (!dynamicRoute.includes(`'${slug}'`)) failures.push(`${slug}: no governed dynamic venue route found.`);
}

requireText(combined, "import { getSportsVenuePhotoAdditionWave2 } from './sports-venue-images-additions-wave2';", 'combined registry');
requireText(combined, 'getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug)', 'base-first photo precedence');

for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com', 'googleusercontent']) {
  if (wave2.toLowerCase().includes(forbidden)) failures.push(`Wave 2 additions contain disallowed source ${forbidden}.`);
}
if (wave2.includes('http://')) failures.push('Wave 2 additions must use HTTPS only.');

const unique = new Set([...baseSlugs, ...wave1Slugs, ...wave2Slugs]);
if (unique.size < 63) failures.push(`Expected at least 63 unique licensed venue heroes after wave 2; found ${unique.size}.`);
if (unique.size > 84) failures.push(`Licensed photo union exceeds the 84-venue seeded inventory.`);

if (failures.length) {
  console.error('Sports venue photo additions wave 2 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue photo additions wave 2 validated: ${unique.size}/84 unique licensed venue heroes; ${84 - unique.size} venues remain on the intentional fail-closed fallback.`);
