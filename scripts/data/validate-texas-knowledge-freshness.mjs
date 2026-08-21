import fs from 'node:fs';

const files = [
  'src/data/knowledge-bank/seed.ts',
  'src/data/knowledge-bank/seed-expanded.ts',
  'src/data/knowledge-bank/seed-verified-batch2.ts',
];
const source = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const types = fs.readFileSync('src/data/knowledge-bank/types.ts', 'utf8');
const validation = fs.readFileSync('src/data/knowledge-bank/validation.ts', 'utf8');
const social = fs.readFileSync('src/data/knowledge-bank/social.ts', 'utf8');
const batch = fs.readFileSync('src/data/knowledge-bank/social-batch.ts', 'utf8');
const failures = [];

for (const field of ['temporalScope', 'reviewBy', 'validThrough']) {
  if (!types.includes(field)) failures.push(`Knowledge record type is missing temporal field: ${field}`);
}
if (!validation.includes("record.temporalScope === 'current-rule'") || !validation.includes('!record.reviewBy')) {
  failures.push('Runtime validation must require reviewBy for current-rule records.');
}
if (!social.includes('record.reviewBy') || !social.includes('record.validThrough')) {
  failures.push('Direct social rendering must honor reviewBy and validThrough.');
}
if (!batch.includes('isKnowledgeRecordCurrent') || !batch.includes('asOfDate')) {
  failures.push('Social batch selection must enforce temporal freshness with an injectable asOfDate.');
}

const currentRuleRecords = [...source.matchAll(/\{[\s\S]*?temporalScope:\s*['\"]current-rule['\"][\s\S]*?\}/g)];
if (currentRuleRecords.length < 3) failures.push(`Expected at least 3 current-rule records; found ${currentRuleRecords.length}.`);
for (const match of currentRuleRecords) {
  const block = match[0];
  const id = block.match(/\bid:\s*['\"]([^'\"]+)['\"]/)?.[1] ?? 'unknown-record';
  const reviewBy = block.match(/\breviewBy:\s*['\"](\d{4}-\d{2}-\d{2})['\"]/)?.[1];
  if (!reviewBy) failures.push(`${id} is current-rule but has no ISO reviewBy date.`);
  if (/\bevergreen:\s*true/.test(block)) failures.push(`${id} is current-rule and must not be marked evergreen.`);
}

const requiredTimeBoundedIds = [
  'wildlife-black-bear-threatened',
  'wildlife-alligator-feeding-illegal',
  'wildlife-bat-protection',
  'wildlife-bat-exclusion-season',
];
for (const id of requiredTimeBoundedIds) {
  const start = source.indexOf(`id: '${id}'`);
  if (start < 0) {
    failures.push(`Missing expected time-bounded record: ${id}`);
    continue;
  }
  const block = source.slice(start, source.indexOf('\n  },', start) + 5);
  if (!/\breviewBy:\s*['\"]\d{4}-\d{2}-\d{2}['\"]/.test(block)) failures.push(`${id} must have an ISO reviewBy date.`);
}

if (failures.length) {
  console.error('Texas knowledge freshness validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Texas knowledge freshness validation passed: ${currentRuleRecords.length} current-rule records and ${requiredTimeBoundedIds.length} required review-window records checked.`);
