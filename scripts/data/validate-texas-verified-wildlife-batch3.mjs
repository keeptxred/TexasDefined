import fs from 'node:fs';

const path = 'src/data/knowledge-bank/seed-verified-batch3.ts';
const source = fs.readFileSync(path, 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const failures = [];

const ids = [...source.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
if (ids.length !== 8) failures.push(`Expected exactly 8 third-batch verified wildlife records; found ${ids.length}.`);
if (new Set(ids).size !== 8) failures.push(`Expected 8 unique third-batch wildlife IDs; found ${new Set(ids).size}.`);

const requiredIds = [
  'wildlife-raccoon-statewide',
  'wildlife-raccoon-feeding-conflict',
  'wildlife-red-fox-introduced-texas',
  'wildlife-porcupine-western-texas-range',
  'wildlife-gray-fox-tree-climber',
  'wildlife-white-tail-252-counties',
  'wildlife-white-tail-feeding-conflict',
  'wildlife-nutria-furbearer-rule',
];
for (const id of requiredIds) if (!ids.includes(id)) failures.push(`Missing verified wildlife record: ${id}`);

const verifiedCount = (source.match(/verification:\s*['\"]verified['\"]/g) ?? []).length;
if (verifiedCount !== 8) failures.push(`Every batch-3 wildlife record must be verified; found ${verifiedCount} verified of 8.`);
if (!source.includes("const checkedAt = '2026-08-29'")) failures.push('Batch 3 must retain the 2026-08-29 verification date.');
if (!source.includes("sourceId: 'tpwd-wildlife'")) failures.push('Batch 3 must use the canonical TPWD wildlife source ID.');
for (const url of source.matchAll(/url:\s*([^,}\n]+)/g)) {
  if (url[1].includes('http://')) failures.push('Batch-3 wildlife evidence must use HTTPS.');
}

const plannedCount = (source.match(/plannedArticlePath:\s*['\"]\/texas-wildlife-guide['\"]/g) ?? []).length;
if (plannedCount !== 8) failures.push(`Every batch-3 wildlife fact must point only to the staged wildlife guide; found ${plannedCount} of 8.`);
if (/\barticlePath\s*:/.test(source)) failures.push('Batch-3 wildlife facts must not expose a live articlePath before guide publication approval.');

const currentDataCount = (source.match(/temporalScope:\s*['\"]current-data['\"]/g) ?? []).length;
const currentRuleCount = (source.match(/temporalScope:\s*['\"]current-rule['\"]/g) ?? []).length;
if (currentDataCount !== 1) failures.push(`Expected exactly one current-data wildlife record; found ${currentDataCount}.`);
if (currentRuleCount !== 1) failures.push(`Expected exactly one current-rule wildlife record; found ${currentRuleCount}.`);
const reviewCount = (source.match(/reviewBy:\s*['\"]2027-08-01['\"]/g) ?? []).length;
if (reviewCount !== 2) failures.push(`Expected exactly two 2027-08-01 wildlife review windows; found ${reviewCount}.`);

if (!catalog.includes('TEXAS_KNOWLEDGE_VERIFIED_BATCH3')) failures.push('Canonical Knowledge Bank catalog is missing verified batch 3.');
if (!barrel.includes("export * from './seed-verified-batch3'")) failures.push('Knowledge Bank barrel must export verified batch 3.');

if (failures.length) {
  console.error('Texas verified wildlife batch 3 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas verified wildlife batch 3 validation passed: ${ids.length} unique TPWD-backed staged wildlife facts with explicit time-bounded review windows.`);
