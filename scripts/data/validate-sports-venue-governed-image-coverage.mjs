import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/sports-venue.$slug.tsx');
const galaxyRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');
const aggregate = read('src/data/sports-venue-images-all.ts');

const registryPaths = [
  'src/data/sports-venue-images-curated-overrides.ts',
  'src/data/sports-venue-images.ts',
  'src/data/sports-venue-images-additions.ts',
  'src/data/sports-venue-images-additions-wave2.ts',
  'src/data/sports-venue-images-additions-wave3.ts',
  'src/data/sports-venue-images-additions-wave4.ts',
  'src/data/sports-venue-images-additions-wave5.ts',
  'src/data/sports-venue-images-additions-wave6.ts',
  'src/data/sports-venue-images-additions-wave7.ts',
];

const routeBlock = route.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const governed = [...routeBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);
if (galaxyRoute.includes("createFileRoute('/sports-venue/jones-att-stadium')")) governed.push('jones-att-stadium');

const fallbackBlock = aggregate.match(/intentionalSportsVenuePhotoFallbackSlugs = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const intentionalFallbacks = [...fallbackBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);

const decodeTsString = (value) => value
  .replace(/\\'/g, "'")
  .replace(/\\"/g, '"')
  .replace(/\\n/g, '\n')
  .replace(/\\r/g, '\r')
  .replace(/\\t/g, '\t')
  .replace(/\\\\/g, '\\');

function entries(source, file) {
  return [...source.matchAll(/^  ["']([^"']+)["']:\s*\{\n([\s\S]*?)^  \},$/gm)].map((match) => {
    const body = match[2];
    const stringField = (name) => {
      const field = body.match(new RegExp(`\\b${name}:\\s*(["'])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`));
      return field ? decodeTsString(field[2]) : '';
    };
    const numberField = (name) => Number(body.match(new RegExp(`\\b${name}:\\s*(\\d+)`))?.[1] ?? 0);
    return {
      file,
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
}

const failures = [];
const governedSet = new Set(governed);
if (governed.length !== governedSet.size) failures.push('Governed sports-venue inventory contains duplicate slugs.');
if (!governedSet.has('xtreme-raceway-park')) failures.push('Xtreme Raceway Park must remain governed.');
if (!governedSet.has('jones-att-stadium')) failures.push('Jones AT&T Stadium static route must remain governed.');

const registryEntries = registryPaths.map((file) => ({ file, records: entries(read(file), file) }));
for (const { file, records } of registryEntries) {
  const slugs = records.map((record) => record.slug);
  if (slugs.length !== new Set(slugs).size) failures.push(`${file}: duplicate slugs within registry.`);
}

const effective = new Map();
const occurrences = new Map();
for (const { records } of registryEntries) {
  for (const record of records) {
    const seen = occurrences.get(record.slug) ?? [];
    seen.push(record.file);
    occurrences.set(record.slug, seen);
    if (!effective.has(record.slug)) effective.set(record.slug, record);
  }
}

const fallbackSet = new Set(intentionalFallbacks);
for (const slug of fallbackSet) {
  if (!governedSet.has(slug)) failures.push(`Intentional fallback is not a governed venue: ${slug}.`);
}
if (intentionalFallbacks.length !== fallbackSet.size) failures.push('Intentional fallback list contains duplicate slugs.');

const runtimeApproved = new Map();
for (const slug of governed) {
  const record = effective.get(slug);
  if (fallbackSet.has(slug)) continue;
  if (record) runtimeApproved.set(slug, record);
}

const missing = governed.filter((slug) => !runtimeApproved.has(slug));
const unexpectedMissing = missing.filter((slug) => !fallbackSet.has(slug));
if (unexpectedMissing.length) failures.push(`Unapproved missing venue heroes: ${unexpectedMissing.join(', ')}.`);

const staleFallbacks = intentionalFallbacks.filter((slug) => !missing.includes(slug));
if (staleFallbacks.length) failures.push(`Intentional fallback list contains venues that still resolve an approved runtime photo: ${staleFallbacks.join(', ')}.`);

const allowedGenerated = new Set(['xtreme-raceway-park']);
for (const [slug, record] of runtimeApproved) {
  const generated = record.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(record.licenseName);
  if (generated && !allowedGenerated.has(slug)) failures.push(`Generated media is reachable as a production venue hero without an explicit owner-approved exception: ${slug}.`);
  if (!record.alt.trim()) failures.push(`${slug}: missing alt text.`);
  if (!record.imageUrl.trim()) failures.push(`${slug}: missing image URL.`);
  if (!record.sourcePage.trim()) failures.push(`${slug}: missing source page.`);
  if (!record.sourceName.trim()) failures.push(`${slug}: missing source name.`);
  if (!record.author.trim()) failures.push(`${slug}: missing author/creator.`);
  if (!record.licenseName.trim() || !record.licenseUrl.trim()) failures.push(`${slug}: missing explicit license metadata.`);
  const approvedLegacySize = slug === 'xtreme-raceway-park' && record.width === 600 && record.height === 400;
  if ((record.width < 480 || record.height < 480) && !approvedLegacySize) failures.push(`${slug}: hero image dimensions are too small (${record.width}x${record.height}).`);
  if (!record.imageUrl.startsWith('/') && !record.imageUrl.startsWith('https://')) failures.push(`${slug}: image URL must be local or HTTPS.`);
  if (!record.sourcePage.startsWith('https://')) failures.push(`${slug}: source page must use HTTPS.`);
  if (record.imageUrl.startsWith('http://') || record.sourcePage.startsWith('http://')) failures.push(`${slug}: insecure HTTP is forbidden.`);
  for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'instagram.com', 'images.unsplash.com', 'googleusercontent']) {
    if ((record.imageUrl + record.sourcePage).toLowerCase().includes(forbidden)) failures.push(`${slug}: disallowed source/host ${forbidden}.`);
  }
}

for (const [slug] of effective) {
  if (!governedSet.has(slug)) failures.push(`Photo registry record is not attached to a governed sports-venue route: ${slug}.`);
}

const overlapSlugs = [...occurrences.entries()].filter(([, files]) => files.length > 1).map(([slug]) => slug).sort();
const baseCount = registryEntries.find(({ file }) => file === 'src/data/sports-venue-images.ts')?.records.length ?? 0;
const supplementalCount = registryEntries
  .filter(({ file }) => file !== 'src/data/sports-venue-images.ts' && file !== 'src/data/sports-venue-images-curated-overrides.ts')
  .reduce((sum, { records }) => sum + records.length, 0);
const overrideCount = registryEntries.find(({ file }) => file === 'src/data/sports-venue-images-curated-overrides.ts')?.records.length ?? 0;

if (failures.length) {
  console.error('Sports venue governed image coverage validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue governed image coverage:');
console.log(`- base photo count: ${baseCount}`);
console.log(`- curated override count: ${overrideCount}`);
console.log(`- supplemental record count: ${supplementalCount}`);
console.log(`- overlap count: ${overlapSlugs.length}`);
console.log(`- unique governed venues with approved runtime heroes: ${runtimeApproved.size}`);
console.log(`- total governed venue count: ${governed.length}`);
console.log(`- remaining intentional fallback count: ${missing.length}`);
console.log(`- exact missing slugs: ${missing.length ? missing.join(', ') : '(none)'}`);
