import fs from 'node:fs';

const path = 'src/data/knowledge-bank/seed-verified-batch4.ts';
const source = fs.readFileSync(path, 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const failures = [];

const ids = [...source.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
if (ids.length !== 6) failures.push(`Expected exactly 6 fourth-batch verified pest records; found ${ids.length}.`);
if (new Set(ids).size !== 6) failures.push(`Expected 6 unique fourth-batch pest IDs; found ${new Set(ids).size}.`);

const requiredIds = [
  'pests-carpenter-ants-excavate-not-eat-wood',
  'pests-cat-flea-most-texas-problems',
  'pests-chiggers-do-not-burrow',
  'pests-scorpion-habitat-modification-first',
  'pests-stinging-wasp-groups-safety',
  'pests-ipm-prevention-combination',
];
for (const id of requiredIds) if (!ids.includes(id)) failures.push(`Missing verified pest record: ${id}`);

const verifiedCount = (source.match(/verification:\s*['\"]verified['\"]/g) ?? []).length;
if (verifiedCount !== 6) failures.push(`Every batch-4 pest record must be verified; found ${verifiedCount} verified of 6.`);
if (!source.includes("const checkedAt = '2026-08-29'")) failures.push('Batch 4 must retain the 2026-08-29 verification date.');
if (!source.includes("sourceId: 'texas-am-agrilife'")) failures.push('Batch 4 must use the canonical Texas A&M AgriLife source ID.');
const plannedCount = (source.match(/plannedArticlePath:\s*['\"]\/texas-pests-guide['\"]/g) ?? []).length;
if (plannedCount !== 6) failures.push(`Every batch-4 pest fact must point only to the staged pest guide; found ${plannedCount} of 6.`);
if (/\barticlePath\s*:/.test(source)) failures.push('Batch-4 pest facts must not expose a live articlePath before guide publication approval.');
if (/\bneeds-review\b/.test(source)) failures.push('Batch-4 records are claim-specific sourced facts and must not silently fall back to needs-review.');
if (/\b(?:dosage|mixing rate|application rate|tablespoon|ounce per gallon)\b/i.test(source)) failures.push('Batch-4 Knowledge Bank facts must not embed pesticide dosing or application-rate instructions.');
if (!catalog.includes('TEXAS_KNOWLEDGE_VERIFIED_BATCH4')) failures.push('Canonical Knowledge Bank catalog is missing verified batch 4.');
if (!barrel.includes("export * from './seed-verified-batch4'")) failures.push('Knowledge Bank barrel must export verified batch 4.');

if (failures.length) {
  console.error('Texas verified pest batch 4 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas verified pest batch 4 validation passed: ${ids.length} unique AgriLife-backed staged pest facts with no pesticide dosing instructions.`);
