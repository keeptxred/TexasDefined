import fs from 'node:fs';

const registryFiles = [
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

function decode(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function normalizeFilename(value) {
  return decode(value)
    .replace(/^File:/i, '')
    .replace(/_/g, ' ')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function canonicalReference(value) {
  const raw = String(value || '').trim();
  if (!raw) return undefined;
  if (raw.startsWith('/')) return `local:${decode(raw).replace(/\?.*$/, '').replace(/#.*$/, '')}`;
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    const urlPath = decode(url.pathname);
    if (host === 'commons.wikimedia.org') {
      const redirect = urlPath.match(/^\/wiki\/Special:Redirect\/file\/(.+)$/i);
      if (redirect?.[1]) return `commons:${normalizeFilename(redirect[1])}`;
      const page = urlPath.match(/^\/wiki\/(File:.+)$/i);
      if (page?.[1]) return `commons:${normalizeFilename(page[1])}`;
    }
    if (host === 'upload.wikimedia.org') {
      const filename = urlPath.split('/').filter(Boolean).at(-1);
      if (filename) return `commons:${normalizeFilename(filename)}`;
    }
    return `url:${host}${urlPath.replace(/\/$/, '') || '/'}`;
  } catch {
    return `raw:${raw.normalize('NFKC').toLowerCase()}`;
  }
}

function parseRecords(file) {
  const source = fs.readFileSync(file, 'utf8');
  const records = [];
  const entryPattern = /^\s{2}["']([^"']+)["']:\s*\{([\s\S]*?)(?=^\s{2}["'][^"']+["']:\s*\{|^\};)/gm;
  for (const match of source.matchAll(entryPattern)) {
    const slug = match[1];
    const block = match[2];
    const imageUrl = block.match(/imageUrl:\s*["']([^"']+)["']/)?.[1];
    const sourcePage = block.match(/sourcePage:\s*["']([^"']+)["']/)?.[1];
    if (imageUrl) records.push({ file, slug, imageUrl, sourcePage });
  }
  return records;
}

function objectKeys(file) {
  const source = fs.readFileSync(file, 'utf8');
  return [...source.matchAll(/^\s{2}["']([^"']+)["']:\s*\{/gm)].map((match) => match[1]);
}

const governedSlugs = [...new Set(enrichmentFiles.flatMap(objectKeys))].sort();
const governedSet = new Set(governedSlugs);

const effective = new Map();
for (const file of registryFiles) {
  for (const record of parseRecords(file)) {
    if (!effective.has(record.slug)) effective.set(record.slug, record);
  }
}

const records = [...effective.values()].filter((record) => governedSet.has(record.slug));
const failures = [];
const collisions = (field, label) => {
  const groups = new Map();
  for (const record of records) {
    const key = canonicalReference(record[field]);
    if (!key) continue;
    const list = groups.get(key) ?? [];
    list.push(record);
    groups.set(key, list);
  }
  for (const [key, list] of groups) {
    const slugs = [...new Set(list.map((record) => record.slug))];
    if (slugs.length > 1) failures.push(`${label} reused across distinct venues (${key}): ${slugs.join(', ')}`);
  }
};

collisions('imageUrl', 'image asset');
collisions('sourcePage', 'image source page');

const orphanRecords = [...effective.keys()].filter((slug) => !governedSet.has(slug)).sort();
if (orphanRecords.length) failures.push(`Image records exist outside the governed venue inventory: ${orphanRecords.join(', ')}.`);

const coveredSlugs = governedSlugs.filter((slug) => effective.has(slug));
const missingSlugs = governedSlugs.filter((slug) => !effective.has(slug));

if (failures.length) {
  console.error('Sports venue image uniqueness audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS: ${coveredSlugs.length}/${governedSlugs.length} governed sports venues have approved image records, ${missingSlugs.length} intentionally fail closed, and no effective image asset/source is reused across different venue slugs. Missing slugs: ${missingSlugs.join(', ') || 'none'}.`);
