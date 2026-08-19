import fs from 'node:fs';

const madeSource = fs.readFileSync('src/data/made-in-texas.ts', 'utf8');
const evidenceSource = fs.readFileSync('src/data/made-in-texas-evidence.ts', 'utf8');
const failures = [];

const decodeTsString = (value) => value.replace(/\\'/g, "'").replace(/\\\\/g, '\\');

const entries = new Map();
const entryPattern = /^\s*entry\('((?:\\.|[^'])*)',\s*'((?:\\.|[^'])*)',\s*'((?:\\.|[^'])*)',\s*'((?:\\.|[^'])*)',\s*'((?:\\.|[^'])*)',/gm;
for (const match of madeSource.matchAll(entryPattern)) {
  const name = decodeTsString(match[1]);
  entries.set(name, {
    city: decodeTsString(match[2]),
    countySlug: decodeTsString(match[3]),
    category: decodeTsString(match[4]),
    relationship: decodeTsString(match[5]),
  });
}

const evidenceBlocks = evidenceSource.match(/\{\s*\n\s*entryName:\s*['"][\s\S]*?\n\s*\},/g) ?? [];
const readField = (block, field) => {
  const line = block.split('\n').find((candidate) => candidate.trimStart().startsWith(`${field}:`));
  if (!line) return null;
  const match = line.match(/:\s*(['"])(.*?)\1,?\s*$/);
  return match ? match[2] : null;
};

const evidence = evidenceBlocks.map((block) => ({
  entryName: readField(block, 'entryName'),
  claim: readField(block, 'claim'),
  sourceLabel: readField(block, 'sourceLabel'),
  sourceUrl: readField(block, 'sourceUrl'),
  checkedAt: readField(block, 'checkedAt'),
}));

if (entries.size < 80) failures.push(`Made in Texas dataset unexpectedly shrank to ${entries.size} entries.`);
if (evidence.length < 26) failures.push(`Expected at least 26 verified Made in Texas evidence records; found ${evidence.length}.`);

const seenNames = new Set();
const seenUrls = new Set();
const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const maxAgeMs = 400 * 24 * 60 * 60 * 1000;

for (const record of evidence) {
  const { entryName, claim, sourceLabel, sourceUrl, checkedAt } = record;
  if (!entryName || !claim || !sourceLabel || !sourceUrl || !checkedAt) {
    failures.push(`Evidence record is missing a required field: ${JSON.stringify(record)}.`);
    continue;
  }

  if (seenNames.has(entryName)) failures.push(`Duplicate evidence entryName: ${entryName}.`);
  seenNames.add(entryName);

  if (seenUrls.has(sourceUrl)) failures.push(`Duplicate evidence sourceUrl: ${sourceUrl}.`);
  seenUrls.add(sourceUrl);

  const datasetEntry = entries.get(entryName);
  if (!datasetEntry) {
    failures.push(`Evidence refers to unknown Made in Texas entry: ${entryName}.`);
  } else if (datasetEntry.relationship !== 'made-or-processed') {
    failures.push(`Evidence may only verify made-or-processed entries; ${entryName} is ${datasetEntry.relationship}.`);
  }

  if (!sourceUrl.startsWith('https://')) failures.push(`Evidence source must use HTTPS for ${entryName}: ${sourceUrl}.`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkedAt)) {
    failures.push(`Evidence checkedAt must use YYYY-MM-DD for ${entryName}: ${checkedAt}.`);
  } else {
    const checked = new Date(`${checkedAt}T00:00:00Z`);
    if (Number.isNaN(checked.getTime())) failures.push(`Evidence checkedAt is invalid for ${entryName}: ${checkedAt}.`);
    else {
      if (checked > today) failures.push(`Evidence checkedAt is in the future for ${entryName}: ${checkedAt}.`);
      if (today - checked > maxAgeMs) failures.push(`Evidence is older than 400 days and needs re-verification: ${entryName} (${checkedAt}).`);
    }
  }

  if (claim.length < 35) failures.push(`Evidence claim is too thin for ${entryName}.`);
  if (sourceLabel.length < 3) failures.push(`Evidence source label is too thin for ${entryName}.`);
}

if (!evidenceSource.includes('evidenceForMadeInTexasEntry')) failures.push('Evidence lookup helper must remain available to county and statewide UI.');

if (failures.length) {
  console.error('Made in Texas evidence validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const verifiedCount = evidence.length;
const queuedCount = [...entries.values()].filter((entry) => entry.relationship === 'made-or-processed').length - verifiedCount;
console.log(`Made in Texas evidence validation passed: ${verifiedCount} first-party evidence records map only to made-or-processed entries; ${Math.max(0, queuedCount)} made-or-processed entries remain eligible for future source review.`);
