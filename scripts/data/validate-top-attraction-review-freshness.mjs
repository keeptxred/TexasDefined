import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MAX_AGE_DAYS = 183;
const DAY_MS = 24 * 60 * 60 * 1000;
const now = new Date();

const registrySource = fs.readFileSync(path.join(ROOT, 'src/data/top-texas-attractions.ts'), 'utf8');
const slugs = [...registrySource.matchAll(/\{\s*rank:\s*\d+,\s*slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);

if (slugs.length !== 25) {
  console.error(`Top 25 freshness audit found ${slugs.length} registered attractions; expected 25.`);
  process.exit(1);
}

const curationFiles = fs.readdirSync(path.join(ROOT, 'src/data'))
  .filter((name) => /^destination-curation-top-attractions(?:-batch\d+)?\.ts$/.test(name))
  .sort()
  .map((name) => path.join(ROOT, 'src/data', name));

if (curationFiles.length !== 5) {
  console.error(`Top 25 freshness audit found ${curationFiles.length} canonical curation files; expected base + batches 2–5.`);
  process.exit(1);
}

const source = curationFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const failures = [];
const dates = [...source.matchAll(/sourceCheckedAt:\s*["'](\d{4}-\d{2}-\d{2})["']/g)].map((match) => match[1]);

if (dates.length !== 25) failures.push(`Found ${dates.length} canonical Top-25 sourceCheckedAt values; expected exactly 25.`);

for (const value of dates) {
  const checked = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(checked.getTime())) {
    failures.push(`Invalid sourceCheckedAt value: ${value}`);
    continue;
  }
  const ageDays = Math.floor((now.getTime() - checked.getTime()) / DAY_MS);
  if (ageDays < -1) failures.push(`sourceCheckedAt is in the future: ${value}`);
  if (ageDays > MAX_AGE_DAYS) failures.push(`sourceCheckedAt is stale (${ageDays} days old; max ${MAX_AGE_DAYS}): ${value}`);
}

const newest = dates.length ? [...dates].sort().at(-1) : 'none';
const oldest = dates.length ? [...dates].sort()[0] : 'none';

if (failures.length) {
  console.error('Top 25 review freshness validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Top 25 review freshness validation passed: exactly ${dates.length} canonical verification dates across ${curationFiles.length} curation files; oldest ${oldest}, newest ${newest}, maximum age ${MAX_AGE_DAYS} days.`);
