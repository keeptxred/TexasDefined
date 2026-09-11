import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'src', 'data');
const PUBLIC_DIR = path.join(ROOT, 'public');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function extractBalancedObject(source, startIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = startIndex; index < source.length; index += 1) {
    const ch = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(startIndex, index + 1);
    }
  }
  throw new Error('Unbalanced event parking-map object');
}

function parseEventOverrideRecords() {
  const files = fs.readdirSync(DATA_DIR)
    .filter((name) => /^parking-maps-event-batch\d+\.ts$/.test(name))
    .sort();
  const records = [];
  for (const file of files) {
    const source = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    const marker = source.indexOf('export const EVENT_PARKING_MAPS_BATCH_');
    if (marker < 0) continue;
    const rootStart = source.indexOf('{', marker);
    if (rootStart < 0) continue;
    const rootObject = extractBalancedObject(source, rootStart);
    const entryRegex = /'([^']+)'\s*:\s*{/g;
    let match;
    while ((match = entryRegex.exec(rootObject)) !== null) {
      const objectStart = match.index + match[0].lastIndexOf('{');
      const raw = extractBalancedObject(rootObject, objectStart);
      const imageUrl = raw.match(/imageUrl:\s*'([^']+)'/)?.[1];
      const id = raw.match(/id:\s*'([^']+)'/)?.[1];
      const eventYearText = raw.match(/eventYear:\s*(\d{4})/)?.[1];
      const eventYear = eventYearText ? Number(eventYearText) : undefined;
      const eventSlugsRaw = raw.match(/eventSlugs:\s*\[([^\]]*)\]/)?.[1] ?? '';
      const eventSlugs = [...eventSlugsRaw.matchAll(/'([^']+)'/g)].map((item) => item[1]);
      records.push({ key: match[1], file, raw, id, imageUrl, eventSlugs, eventYear });
      entryRegex.lastIndex = objectStart + raw.length;
    }
  }
  return records;
}

function readKnownMajorEventSlugs() {
  const slugs = new Set();
  for (const file of walk(DATA_DIR)) {
    const base = path.basename(file);
    if (!base.startsWith('major-event') || !/\.tsx?$/.test(base)) continue;
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)) slugs.add(match[1]);
  }
  return slugs;
}

const records = parseEventOverrideRecords();
const knownEventSlugs = readKnownMajorEventSlugs();
const failures = [];
const seen = new Set();

for (const record of records) {
  if (seen.has(record.key)) failures.push(`${record.key}: duplicate event override key`);
  seen.add(record.key);
  if (!record.id) failures.push(`${record.key}: missing id`);
  if (!record.eventSlugs.includes(record.key)) failures.push(`${record.key}: eventSlugs must include its registry key`);
  if (!record.raw.includes('eventSpecific: true')) failures.push(`${record.key}: eventSpecific must be true`);
  if (!Number.isInteger(record.eventYear) || record.eventYear < 2000 || record.eventYear > 2100) failures.push(`${record.key}: event-specific override requires eventYear`);
  if (!record.raw.includes("verificationStatus: 'verified'")) failures.push(`${record.key}: override must be verified before registration`);
  if (!record.raw.includes('verifiedAgainstRealMap: true')) failures.push(`${record.key}: verifiedAgainstRealMap must be true`);
  if (!record.raw.includes('displayAllowed: true')) failures.push(`${record.key}: displayAllowed must be true`);
  if (!record.imageUrl?.startsWith('/')) failures.push(`${record.key}: imageUrl must be a root-relative public asset`);
  else if (!fs.existsSync(path.join(PUBLIC_DIR, record.imageUrl.slice(1)))) failures.push(`${record.key}: missing asset ${record.imageUrl}`);
  if (!knownEventSlugs.has(record.key)) failures.push(`${record.key}: no matching slug found in major-event data`);
}

console.log('\nEvent parking-map override audit');
console.log('================================');
console.log(`Override records: ${records.length}`);
for (const record of records) console.log(`  - ${record.key} (${record.eventYear ?? 'missing year'}, ${record.file})`);

if (failures.length > 0) {
  console.error('\nFailures:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log('\nEvent parking-map override audit passed.');
