import fs from 'node:fs';
import path from 'node:path';

const read = (filePath) => fs.readFileSync(filePath, 'utf8');

const overrides = read('src/data/sports-venue-images-curated-overrides.ts');
const base = read('src/data/sports-venue-images.ts');
const supplementalSources = [
  read('src/data/sports-venue-images-additions.ts'),
  read('src/data/sports-venue-images-additions-wave2.ts'),
  read('src/data/sports-venue-images-additions-wave3.ts'),
  read('src/data/sports-venue-images-additions-wave4.ts'),
  read('src/data/sports-venue-images-additions-wave5.ts'),
  read('src/data/sports-venue-images-additions-wave6.ts'),
  read('src/data/sports-venue-images-additions-wave7.ts'),
];
const combined = read('src/data/sports-venue-images-all.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const galaxyRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');

const failures = [];
const recordEntries = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
  const body = match[2];
  const stringField = (name) => body.match(new RegExp(`\\b${name}:\\s*(['"])(.*?)\\1`))?.[2] ?? '';
  const numberField = (name) => Number(body.match(new RegExp(`\\b${name}:\\s*(\\d+)`))?.[1] ?? 0);
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

const dynamicPilotBlock = dynamicRoute.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const dynamicSlugs = [...dynamicPilotBlock.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]);
const galaxySlug = galaxyRoute.match(/const stableSlug = ['"]([^'"]+)['"];/)?.[1] ?? '';
const governed = new Set([...dynamicSlugs, galaxySlug].filter(Boolean));

if (!dynamicSlugs.length) failures.push('Could not derive governed dynamic sports-venue slugs.');
if (!galaxySlug) failures.push('Could not derive the protected Galaxy Stadium slug.');
if (dynamicSlugs.length !== new Set(dynamicSlugs).size) failures.push('Governed dynamic sports-venue slug list contains duplicates.');

const baseEntries = recordEntries(base);
const supplementalEntries = supplementalSources.flatMap(recordEntries);
const overrideEntries = recordEntries(overrides);

const supplementalCounts = new Map();
for (const entry of supplementalEntries) supplementalCounts.set(entry.slug, (supplementalCounts.get(entry.slug) ?? 0) + 1);
const duplicateSupplementalSlugs = [...supplementalCounts.entries()].filter(([, count]) => count > 1).map(([slug]) => slug).sort();
if (duplicateSupplementalSlugs.length) failures.push(`Duplicate supplemental sports-venue photo slugs: ${duplicateSupplementalSlugs.join(', ')}.`);

const allEntries = [...overrideEntries, ...baseEntries, ...supplementalEntries];
const orphanEntries = allEntries.filter((entry) => !governed.has(entry.slug)).map((entry) => entry.slug);
if (orphanEntries.length) failures.push(`Photo records attached to nonexistent/unapproved sports-venue routes: ${[...new Set(orphanEntries)].sort().join(', ')}.`);

const effective = new Map();
for (const entry of allEntries) {
  if (!effective.has(entry.slug)) effective.set(entry.slug, entry);
}

const supportedLicense = (entry) =>
  /^CC\b/i.test(entry.licenseName)
  || /^Public domain\b/i.test(entry.licenseName)
  || (entry.slug === 'xtreme-raceway-park' && /^AI-generated image supplied for TexasDefined use$/i.test(entry.licenseName));

const disallowedSourceMarkers = [
  'gettyimages',
  'tripadvisor',
  'yelp',
  'facebook.com',
  'instagram.com',
  'images.unsplash.com',
  'googleusercontent',
  'google.com/imgres',
];
const legacyDimensionExceptions = new Map([
  ['xtreme-raceway-park', { width: 600, height: 400 }],
]);

for (const [slug, entry] of effective) {
  for (const field of ['slug', 'alt', 'imageUrl', 'sourcePage', 'sourceName', 'author', 'licenseName', 'licenseUrl']) {
    if (!String(entry[field] ?? '').trim()) failures.push(`Malformed sports-venue photo record ${slug}: missing ${field}.`);
  }

  if (entry.slug !== slug) failures.push(`Malformed sports-venue photo record ${slug}: embedded slug is ${entry.slug || '(missing)'}.`);
  if (!supportedLicense(entry)) failures.push(`Unsupported or missing reusable license for ${slug}: ${entry.licenseName || '(missing)'}.`);
  if (!entry.author.trim()) failures.push(`Missing author/attribution for ${slug}.`);
  if (entry.imageUrl.startsWith('http://') || entry.sourcePage.startsWith('http://') || entry.licenseUrl.startsWith('http://')) {
    failures.push(`Insecure HTTP URL in sports-venue photo record: ${slug}.`);
  }
  if (!entry.imageUrl.startsWith('/') && !entry.imageUrl.startsWith('https://')) {
    failures.push(`Sports-venue image URL must be HTTPS or a governed local asset: ${slug} -> ${entry.imageUrl || '(missing)'}.`);
  }
  if (!entry.sourcePage.startsWith('https://')) failures.push(`Sports-venue source page must use HTTPS: ${slug} -> ${entry.sourcePage || '(missing)'}.`);
  if (!entry.licenseUrl.startsWith('https://')) failures.push(`Sports-venue license URL must use HTTPS: ${slug} -> ${entry.licenseUrl || '(missing)'}.`);

  const provenance = `${entry.imageUrl} ${entry.sourcePage}`.toLowerCase();
  for (const forbidden of disallowedSourceMarkers) {
    if (provenance.includes(forbidden)) failures.push(`Disallowed sports-venue image source ${forbidden}: ${slug}.`);
  }

  if (entry.width < 480 || entry.height < 480) {
    const exception = legacyDimensionExceptions.get(slug);
    if (!exception || entry.width !== exception.width || entry.height !== exception.height) {
      failures.push(`Sports-venue hero dimensions are suspiciously small: ${slug} -> ${entry.width}x${entry.height}.`);
    }
  }

  if (entry.imageUrl.startsWith('/')) {
    const assetPath = path.join('public', entry.imageUrl.replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) failures.push(`Governed local sports-venue hero asset is missing: ${slug} -> ${assetPath}.`);
    else if (fs.statSync(assetPath).size < 10_000) failures.push(`Governed local sports-venue hero asset is suspiciously small: ${slug} -> ${assetPath}.`);
  }

  const generated = entry.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(entry.licenseName) || /\bAI\b/i.test(entry.author);
  if (generated && slug !== 'xtreme-raceway-park') {
    failures.push(`Only the owner-approved Xtreme Raceway Park exception may use AI-generated venue imagery; found generated hero for ${slug}.`);
  }

  if (entry.sourceName === 'Wikimedia Commons') {
    if (!entry.sourcePage.startsWith('https://commons.wikimedia.org/wiki/File:')) failures.push(`Wikimedia sports-venue hero must link to its Commons file page: ${slug}.`);
    if (!/^CC\b/i.test(entry.licenseName) && !/^Public domain\b/i.test(entry.licenseName)) failures.push(`Wikimedia sports-venue hero lacks an explicitly reusable license: ${slug}.`);
  }
}

const repeatedFieldValues = (field) => {
  const grouped = new Map();
  for (const [slug, entry] of effective) {
    const value = entry[field];
    if (!value) continue;
    const slugs = grouped.get(value) ?? [];
    slugs.push(slug);
    grouped.set(value, slugs);
  }
  return [...grouped.entries()].filter(([, slugs]) => slugs.length > 1);
};
for (const [imageUrl, slugs] of repeatedFieldValues('imageUrl')) failures.push(`Multiple sports venues resolve to the same hero image URL (${slugs.join(', ')}): ${imageUrl}.`);
for (const [sourcePage, slugs] of repeatedFieldValues('sourcePage')) failures.push(`Multiple sports venues resolve to the same hero source page (${slugs.join(', ')}): ${sourcePage}.`);

const baseSlugs = new Set(baseEntries.map((entry) => entry.slug));
const supplementalSlugs = new Set(supplementalEntries.map((entry) => entry.slug));
const overlapSlugs = [...baseSlugs].filter((slug) => supplementalSlugs.has(slug)).sort();
const approvedGovernedSlugs = [...governed].filter((slug) => effective.has(slug)).sort();
const missingSlugs = [...governed].filter((slug) => !effective.has(slug)).sort();

for (const marker of [
  "getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug)",
  "getSportsVenuePhotoAdditionWave7(slug)",
]) {
  if (!combined.includes(marker)) failures.push(`Combined sports-venue registry is missing expected precedence marker: ${marker}.`);
}

const expectedMissing = [
  'amarillo-national-center',
  'colonial-country-club',
  'cy-fair-fcu-stadium',
  'expo-center-taylor-county',
  'hodgetown',
  'houston-motorsports-park',
  'waco-surf',
];
const unexpectedMissing = missingSlugs.filter((slug) => !expectedMissing.includes(slug));
if (unexpectedMissing.length) failures.push(`Sports-venue photo coverage regressed; unexpected fallback venues: ${unexpectedMissing.join(', ')}.`);

if (failures.length) {
  console.error('Final sports venue image validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log([
  'Final sports venue image validation passed.',
  `Base photo count: ${baseSlugs.size}.`,
  `Supplemental photo count: ${supplementalSlugs.size}.`,
  `Base/supplemental overlap count: ${overlapSlugs.length}${overlapSlugs.length ? ` (${overlapSlugs.join(', ')})` : ''}.`,
  `Curated override count: ${overrideEntries.length}.`,
  `Unique governed venues with approved photos: ${approvedGovernedSlugs.length}/${governed.size}.`,
  `Remaining fallback count: ${missingSlugs.length}.`,
  `Missing slugs: ${missingSlugs.join(', ') || 'none'}.`,
  'Only Xtreme Raceway Park may use the existing owner-approved AI image exception.',
].join(' '));
