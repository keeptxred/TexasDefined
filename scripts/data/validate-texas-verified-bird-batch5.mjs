import fs from 'node:fs';

const path = 'src/data/knowledge-bank/seed-verified-batch5.ts';
const source = fs.readFileSync(path, 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const failures = [];

const ids = [...source.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
if (ids.length !== 6) failures.push(`Expected exactly 6 fifth-batch verified bird records; found ${ids.length}.`);
if (new Set(ids).size !== 6) failures.push(`Expected 6 unique fifth-batch bird IDs; found ${new Set(ids).size}.`);

const requiredIds = [
  'birds-ruby-throat-texas-coast-migration',
  'birds-black-chinned-west-texas',
  'birds-scissor-tail-texas-breeding',
  'birds-painted-bunting-summer-texas',
  'birds-bald-eagle-texas-year-round-roles',
  'birds-trans-gulf-migration-route',
];
for (const id of requiredIds) if (!ids.includes(id)) failures.push(`Missing verified bird record: ${id}`);

const verifiedCount = (source.match(/verification:\s*['\"]verified['\"]/g) ?? []).length;
if (verifiedCount !== 6) failures.push(`Every batch-5 bird record must be verified; found ${verifiedCount} verified of 6.`);
if (!source.includes("const checkedAt = '2026-08-29'")) failures.push('Batch 5 must retain the 2026-08-29 verification date.');
if (!source.includes("sourceId: 'tpwd-wildlife'")) failures.push('Batch 5 must use the canonical TPWD wildlife source ID.');
const plannedCount = (source.match(/plannedArticlePath:\s*['\"]\/texas-birds-guide['\"]/g) ?? []).length;
if (plannedCount !== 6) failures.push(`Every batch-5 bird fact must point only to the staged birds guide; found ${plannedCount} of 6.`);
if (/\barticlePath\s*:/.test(source)) failures.push('Batch-5 bird facts must not expose a live articlePath before guide publication approval.');
if (source.includes('ebird.org') || source.includes("sourceId: 'ebird'")) failures.push('Batch-5 bird facts should remain claim-specific TPWD records and must not introduce eBird media/data licensing dependencies.');
if (!catalog.includes('TEXAS_KNOWLEDGE_VERIFIED_BATCH5')) failures.push('Canonical Knowledge Bank catalog is missing verified batch 5.');
if (!barrel.includes("export * from './seed-verified-batch5'")) failures.push('Knowledge Bank barrel must export verified batch 5.');

if (failures.length) {
  console.error('Texas verified bird batch 5 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas verified bird batch 5 validation passed: ${ids.length} unique TPWD-backed staged bird facts with no eBird media/data dependency.`);
