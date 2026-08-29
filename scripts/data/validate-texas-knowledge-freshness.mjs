import fs from 'node:fs';

const files = [
  'src/data/knowledge-bank/seed.ts',
  'src/data/knowledge-bank/seed-expanded.ts',
  'src/data/knowledge-bank/seed-verified-batch2.ts',
  'src/data/knowledge-bank/seed-verified-batch3.ts',
];
const source = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const types = fs.readFileSync('src/data/knowledge-bank/types.ts', 'utf8');
const validation = fs.readFileSync('src/data/knowledge-bank/validation.ts', 'utf8');
const social = fs.readFileSync('src/data/knowledge-bank/social.ts', 'utf8');
const batch = fs.readFileSync('src/data/knowledge-bank/social-batch.ts', 'utf8');
const failures = [];
const asOfDate = process.env.TEXAS_KNOWLEDGE_AS_OF_DATE ?? new Date().toISOString().slice(0, 10);

if (!/^\d{4}-\d{2}-\d{2}$/.test(asOfDate)) {
  failures.push(`TEXAS_KNOWLEDGE_AS_OF_DATE must be YYYY-MM-DD; received ${asOfDate}.`);
}

for (const field of ['temporalScope', 'reviewBy', 'validThrough']) {
  if (!types.includes(field)) failures.push(`Knowledge record type is missing temporal field: ${field}`);
}
if (!validation.includes("record.temporalScope === 'current-rule'") || !validation.includes('!record.reviewBy')) {
  failures.push('Runtime validation must require reviewBy for current-rule records.');
}
if (!validation.includes("record.temporalScope === 'current-data'")) {
  failures.push('Runtime validation must require reviewBy for current-data records.');
}
if (!social.includes('record.reviewBy') || !social.includes('record.validThrough')) {
  failures.push('Direct social rendering must honor reviewBy and validThrough.');
}
if (!batch.includes('isKnowledgeRecordCurrent') || !batch.includes('asOfDate')) {
  failures.push('Social batch selection must enforce temporal freshness with an injectable asOfDate.');
}

const recordBlocks = source
  .split(/\n\s*\},\n/)
  .filter((block) => /\bid:\s*['\"][^'\"]+['\"]/.test(block));
const currentRuleRecords = recordBlocks.filter((block) => /temporalScope:\s*['\"]current-rule['\"]/.test(block));
const currentDataRecords = recordBlocks.filter((block) => /temporalScope:\s*['\"]current-data['\"]/.test(block));
if (currentRuleRecords.length < 4) failures.push(`Expected at least 4 current-rule records; found ${currentRuleRecords.length}.`);
if (currentDataRecords.length < 1) failures.push(`Expected at least 1 current-data record; found ${currentDataRecords.length}.`);

for (const block of [...currentRuleRecords, ...currentDataRecords]) {
  const id = block.match(/\bid:\s*['\"]([^'\"]+)['\"]/)?.[1] ?? 'unknown-record';
  const scope = block.match(/\btemporalScope:\s*['\"]([^'\"]+)['\"]/)?.[1] ?? 'time-bounded';
  const reviewBy = block.match(/\breviewBy:\s*['\"](\d{4}-\d{2}-\d{2})['\"]/)?.[1];
  if (!reviewBy) failures.push(`${id} is ${scope} but has no ISO reviewBy date.`);
  else if (reviewBy < asOfDate) failures.push(`${id} review window expired on ${reviewBy}; re-verify it before ${asOfDate} use.`);
  if (/\bevergreen:\s*true/.test(block)) failures.push(`${id} is ${scope} and must not be marked evergreen.`);
}

for (const block of recordBlocks) {
  const id = block.match(/\bid:\s*['\"]([^'\"]+)['\"]/)?.[1] ?? 'unknown-record';
  const validThrough = block.match(/\bvalidThrough:\s*['\"](\d{4}-\d{2}-\d{2})['\"]/)?.[1];
  if (validThrough && validThrough < asOfDate) failures.push(`${id} validity expired on ${validThrough}; re-verify it before ${asOfDate} use.`);
}

const requiredTimeBoundedIds = [
  'wildlife-black-bear-threatened',
  'wildlife-alligator-feeding-illegal',
  'wildlife-bat-protection',
  'wildlife-bat-exclusion-season',
  'wildlife-white-tail-252-counties',
  'wildlife-nutria-furbearer-rule',
];
for (const id of requiredTimeBoundedIds) {
  const block = recordBlocks.find((recordBlock) => recordBlock.includes(`id: '${id}'`) || recordBlock.includes(`id: \"${id}\"`));
  if (!block) {
    failures.push(`Missing expected time-bounded record: ${id}`);
    continue;
  }
  const reviewBy = block.match(/\breviewBy:\s*['\"](\d{4}-\d{2}-\d{2})['\"]/)?.[1];
  if (!reviewBy) failures.push(`${id} must have an ISO reviewBy date.`);
  else if (reviewBy < asOfDate) failures.push(`${id} review window expired on ${reviewBy}.`);
}

if (failures.length) {
  console.error(`Texas knowledge freshness validation failed for ${asOfDate}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Texas knowledge freshness validation passed for ${asOfDate}: ${currentRuleRecords.length} current-rule records, ${currentDataRecords.length} current-data records, and ${requiredTimeBoundedIds.length} required review-window records checked.`);
