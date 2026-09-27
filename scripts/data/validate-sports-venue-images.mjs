import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const enrichmentFiles = [
  'src/data/sports-venue-enrichment.ts',
  'src/data/sports-venue-enrichment-batch2.ts',
  'src/data/sports-venue-enrichment-batch3.ts',
  'src/data/sports-venue-enrichment-batch4-racing.ts',
  'src/data/sports-venue-enrichment-batch5.ts',
  'src/data/sports-venue-enrichment-batch6.ts',
  'src/data/sports-venue-enrichment-batch7-major-completion.ts',
  'src/data/sports-venue-enrichment-batch8a-completion.ts',
  'src/data/sports-venue-enrichment-batch8b-completion.ts',
];

const registryPaths = [
  'src/data/sports-venue-images.ts',
  'src/data/sports-venue-images-additions.ts',
  'src/data/sports-venue-images-additions-wave2.ts',
  'src/data/sports-venue-images-additions-wave3.ts',
  'src/data/sports-venue-images-additions-wave4.ts',
  'src/data/sports-venue-images-additions-wave5.ts',
  'src/data/sports-venue-images-additions-wave6.ts',
  'src/data/sports-venue-images-additions-wave7.ts',
];

const curatedPath = 'src/data/sports-venue-images-curated-overrides.ts';
const [aggregateSource, allLookup, ...sources] = await Promise.all([
  read('src/data/sports-venue-images-all.ts'),
  read('src/data/sports-venue-enrichment-all.ts'),
  ...registryPaths.map(read),
  read(curatedPath),
  ...enrichmentFiles.map(read),
]);

const registrySources = sources.slice(0, registryPaths.length);
const curatedSource = sources[registryPaths.length];
const enrichmentSources = sources.slice(registryPaths.length + 1);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const decodeTsString = (value) => value
  .replace(/\\'/g, "'")
  .replace(/\\"/g, '"')
  .replace(/\\n/g, '\n')
  .replace(/\\r/g, '\r')
  .replace(/\\t/g, '\t')
  .replace(/\\\\/g, '\\');

const recordEntries = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
  const body = match[2];
  const stringField = (name) => {
    const field = body.match(new RegExp('\\b' + name + ':\\s*(["\\\'])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1'));
    return field ? decodeTsString(field[2]) : '';
  };
  const numberField = (name) => Number(body.match(new RegExp('\\b' + name + ':\\s*(\\d+)'))?.[1] ?? 0);
  return {
    slug: match[1],
    alt: stringField('alt'),
    imageUrl: stringField('imageUrl'),
    sourcePage: stringField('sourcePage'),
    sourceName: stringField('sourceName'),
    author: stringField('author'),
    licenseName: stringField('licenseName'),
    licenseUrl: stringField('licenseUrl'),
    width: numberField('width'),
    height: numberField('height'),
  };
});

const objectKeys = (source) => [...source.matchAll(/^  ["']([^"']+)["']:\s*\{/gm)].map((match) => match[1]);

const governedSlugs = [...new Set(enrichmentSources.flatMap(objectKeys))].sort();
assert(governedSlugs.length > 0, 'Governed sports venue inventory must not be empty.');
assert(allLookup.includes("lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug"), 'Galaxy/Jones image lookup alias must remain governed.');

for (const marker of [
  "getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug)",
  'getSportsVenuePhotoAddition(slug)',
  'getSportsVenuePhotoAdditionWave2(slug)',
  'getSportsVenuePhotoAdditionWave3(slug)',
  'getSportsVenuePhotoAdditionWave4(slug)',
  'getSportsVenuePhotoAdditionWave5(slug)',
  'getSportsVenuePhotoAdditionWave6(slug)',
  'getSportsVenuePhotoAdditionWave7(slug)',
]) assert(aggregateSource.includes(marker), `Aggregate sports venue image lookup is missing: ${marker}`);

const baseEntries = recordEntries(registrySources[0]);
const supplementalGroups = registrySources.slice(1).map(recordEntries);
const supplementalEntries = supplementalGroups.flat();
const curatedEntries = recordEntries(curatedSource);
const allDeclaredEntries = [...baseEntries, ...supplementalEntries, ...curatedEntries];
const governedSet = new Set(governedSlugs);

const supplementalCounts = new Map();
for (const entry of supplementalEntries) supplementalCounts.set(entry.slug, (supplementalCounts.get(entry.slug) ?? 0) + 1);
const duplicateSupplemental = [...supplementalCounts.entries()].filter(([, count]) => count > 1).map(([slug]) => slug).sort();
assert(duplicateSupplemental.length === 0, `Duplicate supplemental venue photo slugs: ${duplicateSupplemental.join(', ')}`);

const orphanRecords = [...new Set(allDeclaredEntries.map((entry) => entry.slug).filter((slug) => !governedSet.has(slug)))].sort();
assert(orphanRecords.length === 0, `Venue photo records attached to nonexistent/unapproved routes: ${orphanRecords.join(', ')}`);

const effective = new Map();
for (const entry of [...curatedEntries, ...baseEntries, ...supplementalEntries]) {
  if (!effective.has(entry.slug)) effective.set(entry.slug, entry);
}

const disallowedMarkers = ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'instagram.com', 'images.unsplash.com', 'googleusercontent'];
const reusableLicense = /^(?:CC0|CC BY(?:-SA)?|Public domain\b)/i;

for (const [slug, entry] of effective) {
  assert(entry.slug === slug, `Malformed venue photo slug field for ${slug}.`);
  assert(Boolean(entry.alt.trim()), `Venue photo is missing alt text: ${slug}.`);
  assert(Boolean(entry.imageUrl), `Venue photo is missing imageUrl: ${slug}.`);
  assert(Boolean(entry.sourcePage), `Venue photo is missing sourcePage: ${slug}.`);
  assert(Boolean(entry.sourceName.trim()), `Venue photo is missing sourceName: ${slug}.`);
  assert(Boolean(entry.author.trim()), `Venue photo is missing author/attribution: ${slug}.`);
  assert(Boolean(entry.licenseName.trim()), `Venue photo is missing licenseName: ${slug}.`);
  assert(Boolean(entry.licenseUrl), `Venue photo is missing licenseUrl: ${slug}.`);
  assert(entry.imageUrl.startsWith('/') || entry.imageUrl.startsWith('https://'), `Venue photo image URL must be local or HTTPS: ${slug} -> ${entry.imageUrl}`);
  assert(entry.sourcePage.startsWith('https://'), `Venue photo sourcePage must use HTTPS: ${slug} -> ${entry.sourcePage}`);
  assert(entry.licenseUrl.startsWith('https://'), `Venue photo licenseUrl must use HTTPS: ${slug} -> ${entry.licenseUrl}`);
  assert(entry.width >= 600 && entry.height >= 400, `Venue photo is suspiciously small: ${slug} -> ${entry.width}x${entry.height}`);

  const provenance = `${entry.imageUrl} ${entry.sourcePage} ${entry.sourceName}`.toLowerCase();
  for (const forbidden of disallowedMarkers) {
    assert(!provenance.includes(forbidden), `Venue photo uses a disallowed image host/source (${forbidden}): ${slug}`);
  }

  const generated = /^AI-generated\b/i.test(entry.licenseName) || /generated media/i.test(entry.sourceName);
  if (generated) {
    assert(slug === 'xtreme-raceway-park', `Only the owner-approved Xtreme Raceway exception may use generated venue imagery; found ${slug}.`);
    assert(entry.sourceName === 'site-owner supplied media', 'Xtreme Raceway generated-image exception must retain site-owner supplied provenance.');
  } else {
    assert(reusableLicense.test(entry.licenseName), `Unsupported or unclear reusable license for ${slug}: ${entry.licenseName}`);
  }
}

const missingSlugs = governedSlugs.filter((slug) => !effective.has(slug));
const uniqueCovered = governedSlugs.length - missingSlugs.length;
const baseGoverned = baseEntries.filter((entry) => governedSet.has(entry.slug)).length;
const supplementalGoverned = supplementalEntries.filter((entry) => governedSet.has(entry.slug)).length;
const overlapSlugs = governedSlugs.filter((slug) => allDeclaredEntries.filter((entry) => entry.slug === slug).length > 1).sort();

if (errors.length) {
  console.error('Sports venue image validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Sports venue image coverage report:');
console.log(`- base photo records: ${baseGoverned}`);
console.log(`- supplemental photo records: ${supplementalGoverned}`);
console.log(`- curated override records: ${curatedEntries.length}`);
console.log(`- overlapping governed slugs: ${overlapSlugs.length}`);
console.log(`- unique governed venues with approved photos: ${uniqueCovered}`);
console.log(`- total governed venue count: ${governedSlugs.length}`);
console.log(`- remaining fallback count: ${missingSlugs.length}`);
console.log(`- missing slugs: ${missingSlugs.join(', ') || 'none'}`);
