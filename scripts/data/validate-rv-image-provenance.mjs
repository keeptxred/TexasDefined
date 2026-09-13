import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IMAGE_SOURCE_PATH = path.join(ROOT, 'src/data/rv-parks/images.server.ts');
const EXPECTED_IMAGE_COUNT = 250;
const PROHIBITED_SOURCE_HOSTS = new Set([
  'google.com',
  'www.google.com',
  'images.google.com',
  'yelp.com',
  'www.yelp.com',
  'tripadvisor.com',
  'www.tripadvisor.com',
  'facebook.com',
  'www.facebook.com',
  'instagram.com',
  'www.instagram.com',
]);

function parseEntries(source) {
  const lines = source.split(/\r?\n/);
  const entries = [];

  for (let index = 0; index < lines.length; index += 1) {
    const start = lines[index].match(/^\s{2}(['"])([a-z0-9][a-z0-9-]*)\1:\s*\{\s*$/);
    if (!start) continue;

    const slug = start[2];
    const body = [];
    index += 1;
    while (index < lines.length && !/^\s{2}\},?\s*$/.test(lines[index])) {
      body.push(lines[index]);
      index += 1;
    }
    entries.push({ slug, block: body.join('\n') });
  }

  return entries;
}

function stringField(block, field) {
  const match = block.match(new RegExp(`^\\s{4}${field}:\\s*(["'])(.*?)\\1,?\\s*$`, 'm'));
  return match?.[2] ?? null;
}

function numberField(block, field) {
  const match = block.match(new RegExp(`^\\s{4}${field}:\\s*(\\d+),?\\s*$`, 'm'));
  return match ? Number(match[1]) : null;
}

function booleanField(block, field) {
  const match = block.match(new RegExp(`^\\s{4}${field}:\\s*(true|false),?\\s*$`, 'm'));
  return match ? match[1] === 'true' : null;
}

function verifiedAtValue(source, block) {
  const literal = stringField(block, 'verifiedAt');
  if (literal) return literal;
  if (!/^\s{4}verifiedAt,?\s*$/m.test(block)) return null;
  return source.match(/^const verifiedAt\s*=\s*['"](\d{4}-\d{2}-\d{2})['"];?\s*$/m)?.[1] ?? null;
}

function srcValue(block) {
  const local = stringField(block, 'src');
  if (local) return { kind: 'local', value: local };
  const commons = block.match(/^\s{4}src:\s*commons\((['"])(.*?)\1\),?\s*$/m)?.[2] ?? null;
  if (commons) return { kind: 'commons', value: commons };
  return null;
}

function validHttps(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

function hostname(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function texasDefinedSource(value) {
  const host = hostname(value);
  return host === 'texasdefined.com' || host === 'www.texasdefined.com';
}

function commercialReuseLicense(value) {
  const normalized = String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!normalized) return false;
  if (/\b(?:nc|noncommercial|non commercial|nd|no derivatives|non derivative)\b/.test(normalized)) return false;
  return normalized.startsWith('cc by ')
    || normalized.startsWith('cc by sa ')
    || normalized.startsWith('cc0')
    || normalized.startsWith('public domain');
}

function validReviewedDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return false;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(timestamp) && timestamp <= Date.now();
}

const source = fs.readFileSync(IMAGE_SOURCE_PATH, 'utf8');
const entries = parseEntries(source);
const failures = [];

if (entries.length !== EXPECTED_IMAGE_COUNT) {
  failures.push(`Expected ${EXPECTED_IMAGE_COUNT} governed RV image records; found ${entries.length}.`);
}

const duplicateSlugs = entries
  .filter((entry, index) => entries.findIndex((candidate) => candidate.slug === entry.slug) !== index)
  .map((entry) => entry.slug);
if (duplicateSlugs.length) failures.push(`Duplicate RV image slugs: ${[...new Set(duplicateSlugs)].join(', ')}`);

let generatedCount = 0;
let licensedCount = 0;

for (const { slug, block } of entries) {
  const src = srcValue(block);
  const sourceUrl = stringField(block, 'sourceUrl');
  const alt = stringField(block, 'alt');
  const width = numberField(block, 'width');
  const height = numberField(block, 'height');
  const creator = stringField(block, 'creator');
  const license = stringField(block, 'license');
  const licenseUrl = stringField(block, 'licenseUrl');
  const reviewedAt = verifiedAtValue(source, block);
  const actualLocation = booleanField(block, 'actualLocation');
  const subjectScope = stringField(block, 'subjectScope');
  const sourceKind = stringField(block, 'sourceKind');
  const generated = sourceKind === 'generated-representative';

  const missing = [];
  if (!src) missing.push('src');
  if (!sourceUrl) missing.push('sourceUrl');
  if (!alt) missing.push('alt');
  if (!width) missing.push('width');
  if (!height) missing.push('height');
  if (!creator) missing.push('creator');
  if (!license) missing.push('license');
  if (!licenseUrl) missing.push('licenseUrl');
  if (!reviewedAt) missing.push('verifiedAt');
  if (actualLocation === null) missing.push('actualLocation');
  if (!subjectScope) missing.push('subjectScope');
  if (missing.length) {
    failures.push(`${slug}: missing required provenance fields: ${missing.join(', ')}`);
    continue;
  }

  if (!validHttps(sourceUrl)) failures.push(`${slug}: sourceUrl must be HTTPS.`);
  if (!validHttps(licenseUrl)) failures.push(`${slug}: licenseUrl must be HTTPS.`);
  if (PROHIBITED_SOURCE_HOSTS.has(hostname(sourceUrl))) failures.push(`${slug}: prohibited source host ${hostname(sourceUrl)}.`);
  if ((alt?.trim().length ?? 0) < 20) failures.push(`${slug}: alt text is too weak for a governed hero.`);
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) failures.push(`${slug}: width/height must be positive numbers.`);
  if (!validReviewedDate(reviewedAt)) failures.push(`${slug}: verifiedAt must be a valid non-future YYYY-MM-DD review date.`);

  if (generated) {
    generatedCount += 1;
    if (actualLocation !== false) failures.push(`${slug}: generated representative imagery must set actualLocation: false.`);
    if (subjectScope !== 'representative') failures.push(`${slug}: generated representative imagery must use subjectScope: representative.`);
    if (src?.kind !== 'local' || src.value !== `/images/rv-parks/${slug}.jpg`) failures.push(`${slug}: generated representative imagery must use its slug-specific local JPG.`);
    if (!texasDefinedSource(sourceUrl)) failures.push(`${slug}: generated representative sourceUrl must be TexasDefined-hosted provenance.`);
    if (!texasDefinedSource(licenseUrl)) failures.push(`${slug}: generated representative licenseUrl must remain TexasDefined-hosted.`);
    if (!/AI-generated representative editorial image/i.test(license ?? '')) failures.push(`${slug}: generated representative license must explicitly disclose AI-generated representative editorial imagery.`);
    if (!/AI-generated representative editorial image/i.test(alt ?? '')) failures.push(`${slug}: generated representative alt text must explicitly disclose AI-generated representative editorial imagery.`);
    if (!/^Texas Defined$/i.test(creator ?? '')) failures.push(`${slug}: generated representative creator must remain Texas Defined.`);
    continue;
  }

  licensedCount += 1;
  if (actualLocation !== true) failures.push(`${slug}: non-generated imagery must be an actual-location image.`);
  if (!['campground', 'park-property'].includes(subjectScope ?? '')) failures.push(`${slug}: actual-location imagery must use campground or park-property subjectScope.`);
  if (sourceKind && sourceKind !== 'licensed-location') failures.push(`${slug}: unsupported real-image sourceKind ${sourceKind}.`);
  if (!commercialReuseLicense(license)) failures.push(`${slug}: real image license is not an approved commercial-reuse license (${license}).`);
  if (hostname(sourceUrl) === 'commons.wikimedia.org' && hostname(licenseUrl) !== 'creativecommons.org') {
    failures.push(`${slug}: Wikimedia Commons imagery must retain its Creative Commons/public-domain license URL.`);
  }
}

if (failures.length) {
  console.error(`RV image provenance validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`RV image provenance validated: ${entries.length} governed heroes (${licensedCount} rights-cleared actual-location images, ${generatedCount} explicitly disclosed representative AI images); prohibited-source, rights, subject-scope, review-date and AI provenance rules are enforced.`);
