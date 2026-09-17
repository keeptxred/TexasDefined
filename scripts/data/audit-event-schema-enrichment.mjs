import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'src', 'data');
const batchFiles = fs.readdirSync(dataDir)
  .filter((name) => /^major-event-schema-enrichment-batch\d+\.server\.ts$/.test(name))
  .sort((a, b) => Number(a.match(/batch(\d+)/)?.[1] ?? 0) - Number(b.match(/batch(\d+)/)?.[1] ?? 0));
const overrideFile = 'major-event-schema-enrichment-overrides.server.ts';
const overrideFiles = fs.existsSync(path.join(dataDir, overrideFile)) ? [overrideFile] : [];

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

function duplicateSlugs(records) {
  const seen = new Set();
  const duplicates = new Set();
  for (const record of records) {
    if (seen.has(record.slug)) duplicates.add(record.slug);
    seen.add(record.slug);
  }
  return [...duplicates].sort();
}

const batchRecords = batchFiles.flatMap((file) => enrichmentRecords(fs.readFileSync(path.join(dataDir, file), 'utf8'), file));
const overrideRecords = overrideFiles.flatMap((file) => enrichmentRecords(fs.readFileSync(path.join(dataDir, file), 'utf8'), file));
const batchDuplicates = duplicateSlugs(batchRecords);
const overrideDuplicates = duplicateSlugs(overrideRecords);

// Runtime enrichment appends the explicit override registry after the batches and then
// constructs a Map keyed by slug. Mirror that behavior here so intentional overrides
// replace their batch record for coverage/provenance metrics without hiding accidental
// duplicates inside the batch or override collections themselves.
const batchBySlug = new Map(batchRecords.map((record) => [record.slug, record]));
const effectiveBySlug = new Map(batchBySlug);
for (const record of overrideRecords) effectiveBySlug.set(record.slug, record);
const records = [...effectiveBySlug.values()];
const overrideReplacements = overrideRecords.filter((record) => batchBySlug.has(record.slug)).length;
const overrideOnlyRecords = overrideRecords.length - overrideReplacements;

const missingResearchMetadata = records
  .filter((record) => !/\bverifiedAt\s*:\s*["']\d{4}-\d{2}-\d{2}["']/.test(record.source) || !/\bsources\s*:/.test(record.source))
  .map((record) => record.slug);
const genericFallbackImages = records
  .filter((record) => /\bimage\s*:\s*\{/.test(record.source) && /palo[-_ ]?duro|generic|fallback/i.test(record.source))
  .map((record) => record.slug);

const imageRecords = records.filter((record) => /\bimage\s*:\s*\{/.test(record.source));
const imageMetadataIncomplete = [];
for (const record of imageRecords) {
  const source = record.source;
  const missing = [];
  const sourceType = source.match(/\bsourceType\s*:\s*["']([^"']+)["']/)?.[1];
  const isAi = sourceType === 'ai-generated';

  if (!sourceType) missing.push('sourceType');
  if (!/\bapprovedForCommercialUse\s*:\s*true\b/.test(source)) missing.push('approvedForCommercialUse:true');
  if (!/\bexactLocation\s*:\s*(?:true|false)\b/.test(source)) missing.push('exactLocation:boolean');
  if (!(/\blicenseName\s*:\s*["'][^"']+["']/.test(source) || /\brightsNote\s*:\s*["'][^"']+["']/.test(source))) missing.push('rights documentation');

  if (isAi) {
    if (!/\baiGenerated\s*:\s*true\b/.test(source)) missing.push('aiGenerated:true');
    if (!/\brightsNote\s*:\s*["'][^"']+["']/.test(source)) missing.push('AI rightsNote');
    if (!/\balt\s*:\s*["'][^"']*AI[- ]generated/i.test(source)) missing.push('AI disclosure in alt');
    if (!/\bsourceUrl\s*:\s*["']https:\/\/(?:[^"']+\.)?texasdefined\.com\//i.test(source)) missing.push('TexasDefined AI sourceUrl');
  } else if (sourceType) {
    if (!/\bexactLocation\s*:\s*true\b/.test(source)) missing.push('exactLocation:true for real image');
    if (sourceType === 'wikimedia') {
      if (!/\bsourceUrl\s*:\s*["']https:\/\/commons\.wikimedia\.org\//i.test(source)) missing.push('Commons sourceUrl');
      if (!/\blicenseName\s*:\s*["'][^"']+["']/.test(source)) missing.push('Wikimedia licenseName');
      if (!/\blicenseUrl\s*:\s*["']https:\/\/[^"']+["']/.test(source)) missing.push('Wikimedia licenseUrl');
    }
    if (sourceType === 'flickr-cc') {
      if (!/\blicenseName\s*:\s*["'][^"']+["']/.test(source)) missing.push('Flickr licenseName');
      if (!/\blicenseUrl\s*:\s*["']https:\/\/[^"']+["']/.test(source)) missing.push('Flickr licenseUrl');
    }
  }

  if (missing.length) imageMetadataIncomplete.push(`${record.slug} (${missing.join(', ')})`);
}

if (batchDuplicates.length || overrideDuplicates.length || missingResearchMetadata.length || genericFallbackImages.length || imageMetadataIncomplete.length || records.length === 0) {
  console.error('Event schema enrichment audit failed:');
  if (records.length === 0) console.error('- no enrichment records were discovered');
  if (batchDuplicates.length) console.error(`- duplicate batch enrichment slugs: ${batchDuplicates.join(', ')}`);
  if (overrideDuplicates.length) console.error(`- duplicate override enrichment slugs: ${overrideDuplicates.join(', ')}`);
  if (missingResearchMetadata.length) console.error(`- missing verifiedAt/sources metadata: ${missingResearchMetadata.sort().join(', ')}`);
  if (genericFallbackImages.length) console.error(`- generic/fallback Event imagery detected: ${genericFallbackImages.sort().join(', ')}`);
  if (imageMetadataIncomplete.length) console.error(`- image provenance metadata incomplete: ${imageMetadataIncomplete.sort().join('; ')}`);
  process.exit(1);
}

function countWith(pattern) {
  return records.filter((record) => pattern.test(record.source)).length;
}

const organizer = countWith(/\borganizer\s*:/);
const offers = countWith(/\boffers\s*:/);
const performers = countWith(/\bperformers\s*:/);
const images = imageRecords.length;
const total = records.length;
const imageRemediationPending = total - images;

const summary = {
  batches: batchFiles.length,
  overrideFiles: overrideFiles.length,
  batchRecords: batchRecords.length,
  overrides: overrideRecords.length,
  overrideReplacements,
  overrideOnlyRecords,
  reviewedLeaves: total,
  organizer,
  offers,
  performers,
  images,
  provenanceCompleteImages: images,
  intentionallyWithoutOrganizer: total - organizer,
  intentionallyWithoutOffers: total - offers,
  intentionallyWithoutPerformers: total - performers,
  imageRemediationPending,
  imageCoverageComplete: imageRemediationPending === 0,
};

console.log(`Event schema enrichment metrics audit passed across ${summary.batches} batch files, ${summary.overrideFiles} override registry, and ${summary.reviewedLeaves} effective reviewed leaves.`);
console.log(`Override reconciliation: records=${summary.overrides}, replacements=${summary.overrideReplacements}, overrideOnly=${summary.overrideOnlyRecords}`);
console.log(`Optional enrichment coverage: organizer=${summary.organizer}, offers=${summary.offers}, performers=${summary.performers}`);
console.log(`Required image coverage: images=${summary.images}, provenanceComplete=${summary.provenanceCompleteImages}, remediationPending=${summary.imageRemediationPending}, complete=${summary.imageCoverageComplete}`);
console.log(`Intentional non-image omissions: organizer=${summary.intentionallyWithoutOrganizer}, offers=${summary.intentionallyWithoutOffers}, performers=${summary.intentionallyWithoutPerformers}`);
if (summary.imageRemediationPending > 0) {
  console.warn(`${summary.imageRemediationPending} reviewed Event guides still require a compliant hero; the route/sitemap image governance gate must keep them fail-closed until remediation completes.`);
}
console.log(`EVENT_SCHEMA_ENRICHMENT_AUDIT=${JSON.stringify(summary)}`);
