import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'src', 'data');
const coreSource = fs.readFileSync(path.join(dataDir, 'major-event-index.ts'), 'utf8');
const supplementalSource = fs.readFileSync(path.join(dataDir, 'major-event-supplemental-registry.server.ts'), 'utf8');
const batchFiles = fs.readdirSync(dataDir)
  .filter((name) => /^major-event-schema-enrichment-batch\d+\.server\.ts$/.test(name))
  .sort((a, b) => Number(a.match(/batch(\d+)/)?.[1] ?? 0) - Number(b.match(/batch(\d+)/)?.[1] ?? 0));

function slugSet(source) {
  return new Set([...source.matchAll(/\bslug\s*:\s*["']([^"']+)["']/g)].map((match) => match[1]));
}

function matchingObjectEnd(source, start) {
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === quote) quote = '';
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }

  return -1;
}

function enrichmentRecords(source, file) {
  const records = [];
  const pattern = /\bslug\s*:\s*["']([^"']+)["']/g;
  for (const match of source.matchAll(pattern)) {
    const objectStart = source.lastIndexOf('{', match.index);
    if (objectStart < 0) throw new Error(`${file}: could not locate object start for ${match[1]}`);
    const objectEnd = matchingObjectEnd(source, objectStart);
    if (objectEnd < 0) throw new Error(`${file}: could not locate object end for ${match[1]}`);
    records.push({ slug: match[1], file, source: source.slice(objectStart, objectEnd) });
  }
  return records;
}

const core = slugSet(coreSource);
const supplementalAll = slugSet(supplementalSource);
const supplemental = new Set([...supplementalAll].filter((slug) => !core.has(slug)));
const dedicatedLeaves = new Set([...core, ...supplemental]);
const records = batchFiles.flatMap((file) => enrichmentRecords(fs.readFileSync(path.join(dataDir, file), 'utf8'), file));
const bySlug = new Map();
const duplicates = [];

for (const record of records) {
  if (bySlug.has(record.slug)) duplicates.push(record.slug);
  bySlug.set(record.slug, record);
}

const enriched = new Set(bySlug.keys());
const missing = [...dedicatedLeaves].filter((slug) => !enriched.has(slug));
const orphans = [...enriched].filter((slug) => !dedicatedLeaves.has(slug));
const missingResearchMetadata = records
  .filter((record) => !/\bverifiedAt\s*:\s*["']\d{4}-\d{2}-\d{2}["']/.test(record.source) || !/\bsources\s*:/.test(record.source))
  .map((record) => record.slug);
const genericFallbackImages = records
  .filter((record) => /\bimage(?:Url)?\s*:/.test(record.source) && /palo[-_ ]?duro|generic|fallback/i.test(record.source))
  .map((record) => record.slug);

if (duplicates.length || missing.length || orphans.length || missingResearchMetadata.length || genericFallbackImages.length) {
  console.error('Event schema enrichment audit failed:');
  if (duplicates.length) console.error(`- duplicate enrichment slugs: ${[...new Set(duplicates)].sort().join(', ')}`);
  if (missing.length) console.error(`- missing enrichment records: ${missing.sort().join(', ')}`);
  if (orphans.length) console.error(`- orphan enrichment records: ${orphans.sort().join(', ')}`);
  if (missingResearchMetadata.length) console.error(`- missing verifiedAt/sources metadata: ${missingResearchMetadata.sort().join(', ')}`);
  if (genericFallbackImages.length) console.error(`- generic/fallback Event imagery detected: ${genericFallbackImages.sort().join(', ')}`);
  process.exit(1);
}

function countWith(pattern) {
  return records.filter((record) => pattern.test(record.source)).length;
}

const organizer = countWith(/\borganizer\s*:/);
const offers = countWith(/\boffers\s*:/);
const performers = countWith(/\bperformers\s*:/);
const images = countWith(/\bimage(?:Url)?\s*:/);
const total = records.length;

const summary = {
  batches: batchFiles.length,
  coreLeaves: core.size,
  supplementalLeaves: supplemental.size,
  reviewedLeaves: total,
  organizer,
  offers,
  performers,
  images,
  intentionallyWithoutOrganizer: total - organizer,
  intentionallyWithoutOffers: total - offers,
  intentionallyWithoutPerformers: total - performers,
  intentionallyWithoutImages: total - images,
};

console.log(`Event schema enrichment audit passed across ${summary.batches} registered batch files.`);
console.log(`Core leaves reviewed: ${summary.coreLeaves}`);
console.log(`Unique supplemental leaves reviewed: ${summary.supplementalLeaves}`);
console.log(`Total dedicated Event leaves reviewed: ${summary.reviewedLeaves}`);
console.log(`Optional enrichment coverage: organizer=${summary.organizer}, offers=${summary.offers}, performers=${summary.performers}, images=${summary.images}`);
console.log(`Intentional omissions: organizer=${summary.intentionallyWithoutOrganizer}, offers=${summary.intentionallyWithoutOffers}, performers=${summary.intentionallyWithoutPerformers}, images=${summary.intentionallyWithoutImages}`);
console.log(`EVENT_SCHEMA_ENRICHMENT_AUDIT=${JSON.stringify(summary)}`);
