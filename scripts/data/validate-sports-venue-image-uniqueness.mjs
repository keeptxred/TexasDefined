import fs from 'node:fs';

const files = [
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
    const path = decode(url.pathname);
    if (host === 'commons.wikimedia.org') {
      const redirect = path.match(/^\/wiki\/Special:Redirect\/file\/(.+)$/i);
      if (redirect?.[1]) return `commons:${normalizeFilename(redirect[1])}`;
      const page = path.match(/^\/wiki\/(File:.+)$/i);
      if (page?.[1]) return `commons:${normalizeFilename(page[1])}`;
    }
    if (host === 'upload.wikimedia.org') {
      const filename = path.split('/').filter(Boolean).at(-1);
      if (filename) return `commons:${normalizeFilename(filename)}`;
    }
    return `url:${host}${path.replace(/\/$/, '') || '/'}`;
  } catch {
    return `raw:${raw.normalize('NFKC').toLowerCase()}`;
  }
}

const records = [];
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const entryPattern = /^\s{2}["']([^"']+)["']:\s*\{([\s\S]*?)(?=^\s{2}["'][^"']+["']:\s*\{|^\};)/gm;
  for (const match of source.matchAll(entryPattern)) {
    const slug = match[1];
    const block = match[2];
    const imageUrl = block.match(/imageUrl:\s*["']([^"']+)["']/)?.[1];
    const sourcePage = block.match(/sourcePage:\s*["']([^"']+)["']/)?.[1];
    if (imageUrl) records.push({ file, slug, imageUrl, sourcePage });
  }
}

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

const dynamicRoute = fs.readFileSync('src/routes/sports-venue.$slug.tsx', 'utf8');
const staticRoute = fs.readFileSync('src/routes/sports-venue.jones-att-stadium.tsx', 'utf8');
const routeBlock = dynamicRoute.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const dynamicSlugs = [...routeBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const staticSlug = staticRoute.match(/const stableSlug = '([^']+)'/)?.[1] ?? '';
const governedSlugs = [...dynamicSlugs, ...(staticSlug ? [staticSlug] : [])];
const governed = new Set(governedSlugs);
const uniqueSlugs = new Set(records.map((record) => record.slug));
const extraSlugs = [...uniqueSlugs].filter((slug) => !governed.has(slug));
const missingSlugs = governedSlugs.filter((slug) => !uniqueSlugs.has(slug)).sort();
if (!dynamicSlugs.length || !staticSlug) failures.push('Could not derive the current governed sports venue inventory.');
if (extraSlugs.length) failures.push(`Image records target ungoverned venue slugs: ${extraSlugs.join(', ')}.`);

if (failures.length) {
  console.error('Sports venue image uniqueness audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS: ${uniqueSlugs.size}/${governed.size} governed sports venues have approved image records, ${missingSlugs.length} intentionally remain on fallback (${missingSlugs.join(', ') || 'none'}), and no image asset/source is reused across different venue slugs.`);
