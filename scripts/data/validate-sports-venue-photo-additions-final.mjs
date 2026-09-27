import fs from 'node:fs';
import path from 'node:path';

const read = (filePath) => fs.readFileSync(filePath, 'utf8');
const failures = [];
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

const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const staticRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');
const combined = read('src/data/sports-venue-images-all.ts');

function decodeTsString(value) {
  return value
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\');
}

function recordEntries(source, file) {
  return [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
    const body = match[2];
    const stringField = (name) => {
      const field = body.match(new RegExp(`\\b${name}:\\s*(["'])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`));
      return field ? decodeTsString(field[2]) : '';
    };
    const numberField = (name) => Number(body.match(new RegExp(`\\b${name}:\\s*(\\d+)`))?.[1] ?? 0);
    return {
      key: match[1],
      slug: stringField('slug'),
      alt: stringField('alt'),
      imageUrl: stringField('imageUrl'),
      sourcePage: stringField('sourcePage'),
      sourceName: stringField('sourceName'),
      author: stringField('author'),
      licenseName: stringField('licenseName'),
      licenseUrl: stringField('licenseUrl'),
      width: numberField('width'),
      height: numberField('height'),
      file,
    };
  });
}

const setBlock = dynamicRoute.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const dynamicSlugs = [...setBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const staticSlug = staticRoute.match(/const stableSlug = '([^']+)'/)?.[1] ?? '';
const governedSlugs = [...dynamicSlugs, ...(staticSlug ? [staticSlug] : [])];
const governed = new Set(governedSlugs);

if (!dynamicSlugs.length) failures.push('Could not derive governed dynamic sports venue slugs from the route.');
if (!staticSlug) failures.push('Could not derive the protected static Galaxy/Jones sports venue slug.');
if (governed.size !== governedSlugs.length) failures.push('Governed sports venue inventory contains duplicate slugs.');

const entriesByFile = new Map();
for (const file of registryPaths) entriesByFile.set(file, recordEntries(read(file), file));

for (const [file, entries] of entriesByFile) {
  const keys = entries.map((entry) => entry.key);
  const duplicates = keys.filter((slug, index) => keys.indexOf(slug) !== index);
  if (duplicates.length) failures.push(`${file}: duplicate slugs: ${[...new Set(duplicates)].join(', ')}.`);

  for (const entry of entries) {
    if (!governed.has(entry.key)) failures.push(`${file}: photo record targets nonexistent/unapproved venue ${entry.key}.`);
    if (entry.slug !== entry.key) failures.push(`${file}: key/slug mismatch for ${entry.key}.`);
    for (const field of ['alt', 'imageUrl', 'sourcePage', 'sourceName', 'author', 'licenseName', 'licenseUrl']) {
      if (!entry[field]?.trim()) failures.push(`${file}: ${entry.key} missing ${field}.`);
    }
    if (!entry.imageUrl.startsWith('https://') && !entry.imageUrl.startsWith('/images/sports-venues/')) {
      failures.push(`${file}: ${entry.key} imageUrl must be HTTPS or a governed local sports-venue asset.`);
    }
    if (!entry.sourcePage.startsWith('https://')) failures.push(`${file}: ${entry.key} sourcePage must use HTTPS.`);
    if (!entry.licenseUrl.startsWith('https://')) failures.push(`${file}: ${entry.key} licenseUrl must use HTTPS.`);

    const exactLegacy = entry.key === 'xtreme-raceway-park' && entry.width === 600 && entry.height === 400;
    if (!exactLegacy && (entry.width < 480 || entry.height < 480)) {
      failures.push(`${file}: ${entry.key} hero dimensions are too small (${entry.width}x${entry.height}).`);
    }

    const provenance = `${entry.imageUrl} ${entry.sourcePage}`.toLowerCase();
    for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'instagram.com', 'images.unsplash.com', 'googleusercontent']) {
      if (provenance.includes(forbidden)) failures.push(`${file}: ${entry.key} uses disallowed image/source host marker ${forbidden}.`);
    }

    const generated = entry.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(entry.licenseName);
    if (generated && entry.key !== 'xtreme-raceway-park') {
      failures.push(`${file}: ${entry.key} uses an AI-generated venue depiction; only the owner-approved Xtreme Raceway exception is permitted.`);
    }
    if (entry.key === 'xtreme-raceway-park') {
      if (entry.sourceName !== 'site-owner supplied media') failures.push('Xtreme Raceway must retain site-owner supplied provenance.');
      if (!/^AI-generated\b/i.test(entry.licenseName)) failures.push('Xtreme Raceway must retain its AI provenance disclosure.');
    }

    if (entry.sourceName === 'Wikimedia Commons') {
      if (!entry.sourcePage.startsWith('https://commons.wikimedia.org/wiki/File:')) failures.push(`${file}: ${entry.key} Commons photo must link to its file page.`);
      if (!/^(CC|Public domain)/.test(entry.licenseName)) failures.push(`${file}: ${entry.key} Commons license is not explicitly reusable.`);
      if (!entry.licenseUrl.startsWith('https://creativecommons.org/')
          && entry.licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
        failures.push(`${file}: ${entry.key} Commons license URL is unsupported.`);
      }
    }

    if (entry.imageUrl.startsWith('/')) {
      const assetPath = path.join('public', entry.imageUrl.slice(1));
      if (!fs.existsSync(assetPath)) failures.push(`${file}: ${entry.key} local asset missing: ${assetPath}.`);
      else if (fs.statSync(assetPath).size < 10_000) failures.push(`${file}: ${entry.key} local asset is suspiciously small.`);
    }
  }
}

const supplementalPaths = registryPaths.slice(2);
const supplementalCounts = new Map();
for (const file of supplementalPaths) {
  for (const entry of entriesByFile.get(file)) {
    supplementalCounts.set(entry.key, (supplementalCounts.get(entry.key) ?? 0) + 1);
  }
}
const duplicateSupplemental = [...supplementalCounts.entries()].filter(([, count]) => count > 1).map(([slug]) => slug);
if (duplicateSupplemental.length) failures.push(`Duplicate supplemental sports venue slugs: ${duplicateSupplemental.join(', ')}.`);

const effective = new Map();
for (const file of registryPaths) {
  for (const entry of entriesByFile.get(file)) {
    if (!effective.has(entry.key)) effective.set(entry.key, entry);
  }
}
const extraEffective = [...effective.keys()].filter((slug) => !governed.has(slug));
if (extraEffective.length) failures.push(`Effective registry contains ungoverned venues: ${extraEffective.join(', ')}.`);

const repeated = (field) => {
  const values = new Map();
  for (const [slug, entry] of effective) {
    const list = values.get(entry[field]) ?? [];
    list.push(slug);
    values.set(entry[field], list);
  }
  return [...values.entries()].filter(([value, slugs]) => value && slugs.length > 1);
};
for (const [value, slugs] of repeated('imageUrl')) failures.push(`Multiple venues share hero image URL (${slugs.join(', ')}): ${value}.`);
for (const [value, slugs] of repeated('sourcePage')) failures.push(`Multiple venues share hero source page (${slugs.join(', ')}): ${value}.`);

for (const marker of [
  "getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug)",
  'getSportsVenuePhotoAdditionWave7(slug)',
]) {
  if (!combined.includes(marker)) failures.push(`Combined sports venue image registry is missing runtime lookup marker: ${marker}.`);
}

const baseSlugs = new Set(entriesByFile.get('src/data/sports-venue-images.ts').map((entry) => entry.key));
const supplementalSlugs = new Set(supplementalPaths.flatMap((file) => entriesByFile.get(file).map((entry) => entry.key)));
const overlapSlugs = [...baseSlugs].filter((slug) => supplementalSlugs.has(slug)).sort();
const missingSlugs = governedSlugs.filter((slug) => !effective.has(slug)).sort();
const effectiveGenerated = [...effective.entries()]
  .filter(([, entry]) => entry.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(entry.licenseName))
  .map(([slug]) => slug)
  .sort();
if (effectiveGenerated.some((slug) => slug !== 'xtreme-raceway-park')) {
  failures.push(`Unapproved effective AI venue heroes: ${effectiveGenerated.filter((slug) => slug !== 'xtreme-raceway-park').join(', ')}.`);
}

if (failures.length) {
  console.error('Final sports venue image validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue image coverage validation passed.');
console.log(`Base photo count: ${baseSlugs.size}`);
console.log(`Supplemental unique photo count: ${supplementalSlugs.size}`);
console.log(`Base/supplemental overlap count: ${overlapSlugs.length}`);
console.log(`Curated override count: ${entriesByFile.get('src/data/sports-venue-images-curated-overrides.ts').length}`);
console.log(`Unique governed venues with approved photos: ${effective.size}/${governed.size}`);
console.log(`Remaining fallback count: ${missingSlugs.length}`);
console.log(`Missing slugs: ${missingSlugs.join(', ') || 'none'}`);
console.log(`Approved AI exception(s): ${effectiveGenerated.join(', ') || 'none'}`);
