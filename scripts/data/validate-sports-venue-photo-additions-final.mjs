import fs from 'node:fs';
import path from 'node:path';

const read = (filePath) => fs.readFileSync(filePath, 'utf8');
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

const failures = [];
const recordEntries = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
  const body = match[2];
  const stringField = (name) => body.match(new RegExp('\\b' + name + ':\\s*(["\\\'])(.*?)\\1'))?.[2] ?? '';
  const numberField = (name) => Number(body.match(new RegExp('\\b' + name + ':\\s*(\\d+)'))?.[1] ?? 0);
  return { slug: match[1], alt: stringField('alt'), imageUrl: stringField('imageUrl'), sourcePage: stringField('sourcePage'), sourceName: stringField('sourceName'), author: stringField('author'), licenseName: stringField('licenseName'), licenseUrl: stringField('licenseUrl'), width: numberField('width'), height: numberField('height') };
});
const objectKeys = (source) => [...source.matchAll(/^  ["']([^"']+)["']:\s*\{/gm)].map((match) => match[1]);

const governed = [...new Set(enrichmentFiles.flatMap((file) => objectKeys(read(file))))].sort();
const governedSet = new Set(governed);
const overrides = recordEntries(read('src/data/sports-venue-images-curated-overrides.ts'));
const registryGroups = registryPaths.map((file) => recordEntries(read(file)));
const base = registryGroups[0];
const supplemental = registryGroups.slice(1).flat();
const combined = read('src/data/sports-venue-images-all.ts');

for (const marker of [
  "getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug)",
  'getSportsVenuePhotoAdditionWave7(slug)',
]) if (!combined.includes(marker)) failures.push(`Combined venue image registry is missing ${marker}.`);

const duplicateSupplemental = [...new Set(supplemental.map((entry) => entry.slug).filter((slug, index, all) => all.indexOf(slug) !== index))].sort();
if (duplicateSupplemental.length) failures.push(`Duplicate supplemental venue image slugs: ${duplicateSupplemental.join(', ')}.`);

const declared = [...overrides, ...base, ...supplemental];
const orphaned = [...new Set(declared.filter((entry) => !governedSet.has(entry.slug)).map((entry) => entry.slug))].sort();
if (orphaned.length) failures.push(`Venue image records outside the governed venue inventory: ${orphaned.join(', ')}.`);

const effective = new Map();
for (const entry of [...overrides, ...base, ...supplemental]) if (!effective.has(entry.slug)) effective.set(entry.slug, entry);

const repeated = (field) => {
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
for (const [value, slugs] of repeated('imageUrl')) failures.push(`Multiple effective venue heroes use the same image URL (${slugs.join(', ')}): ${value}.`);
for (const [value, slugs] of repeated('sourcePage')) failures.push(`Multiple effective venue heroes use the same source page (${slugs.join(', ')}): ${value}.`);

const allowedGenerated = new Set(['xtreme-raceway-park']);
for (const [slug, entry] of effective) {
  if (!entry.alt.trim()) failures.push(`Missing alt text: ${slug}.`);
  if (!entry.author.trim()) failures.push(`Missing author/attribution: ${slug}.`);
  if (!entry.licenseName.trim()) failures.push(`Missing license name: ${slug}.`);
  if (!entry.sourcePage.startsWith('https://')) failures.push(`sourcePage must be HTTPS: ${slug}.`);
  if (!entry.licenseUrl.startsWith('https://')) failures.push(`licenseUrl must be HTTPS: ${slug}.`);
  if (!(entry.imageUrl.startsWith('/') || entry.imageUrl.startsWith('https://'))) failures.push(`imageUrl must be local or HTTPS: ${slug}.`);
  if (entry.width < 600 || entry.height < 400) failures.push(`Hero dimensions are too small: ${slug} -> ${entry.width}x${entry.height}.`);

  if (entry.imageUrl.startsWith('/')) {
    const assetPath = path.join('public', entry.imageUrl.replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) failures.push(`Local hero asset is missing: ${slug} -> ${assetPath}.`);
    else if (fs.statSync(assetPath).size < 10_000) failures.push(`Local hero asset is suspiciously small: ${slug} -> ${assetPath}.`);
  }

  const generated = /^AI-generated\b/i.test(entry.licenseName) || /generated media/i.test(entry.sourceName);
  if (generated && !allowedGenerated.has(slug)) failures.push(`Generated venue imagery is not permitted for ${slug}; use documentary reusable media or the fallback.`);
  if (!generated && !/^(?:CC0|CC BY(?:-SA)?|Public domain\b)/i.test(entry.licenseName)) failures.push(`Unsupported reusable license for ${slug}: ${entry.licenseName}.`);

  const provenance = `${entry.imageUrl} ${entry.sourcePage}`.toLowerCase();
  for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'instagram.com', 'images.unsplash.com', 'googleusercontent']) {
    if (provenance.includes(forbidden)) failures.push(`Disallowed image source ${forbidden}: ${slug}.`);
  }
}

const covered = governed.filter((slug) => effective.has(slug));
const missing = governed.filter((slug) => !effective.has(slug));
const overlaps = governed.filter((slug) => declared.filter((entry) => entry.slug === slug).length > 1);

if (failures.length) {
  console.error('Final sports venue image validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Final sports venue image validation passed: ${covered.length}/${governed.length} governed venues have approved documentary/owner-authorized heroes; ${missing.length} intentionally fail closed; ${base.length} base records, ${supplemental.length} supplemental records, ${overrides.length} curated overrides, ${overlaps.length} governed overlaps. Missing slugs: ${missing.join(', ') || 'none'}.`);
