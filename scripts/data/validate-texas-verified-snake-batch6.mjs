import fs from 'node:fs';

const path = 'src/data/knowledge-bank/seed-verified-batch6.ts';
const source = fs.readFileSync(path, 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const failures = [];

const ids = [...source.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)].map((match) => match[1]);
if (ids.length !== 5) failures.push(`Expected exactly 5 sixth-batch verified snake records; found ${ids.length}.`);
if (new Set(ids).size !== 5) failures.push(`Expected 5 unique sixth-batch snake IDs; found ${new Set(ids).size}.`);

const requiredIds = [
  'snakes-copperhead-three-texas-ranges',
  'snakes-cottonmouth-eastern-texas-waterways',
  'snakes-prairie-rattlesnake-western-third',
  'snakes-coral-southeastern-half-texas',
  'snakes-give-space-retreat',
];
for (const id of requiredIds) if (!ids.includes(id)) failures.push(`Missing verified snake record: ${id}`);

const verifiedCount = (source.match(/verification:\s*['\"]verified['\"]/g) ?? []).length;
if (verifiedCount !== 5) failures.push(`Every batch-6 snake record must be verified; found ${verifiedCount} verified of 5.`);
if (!source.includes("const checkedAt = '2026-08-29'")) failures.push('Batch 6 must retain the 2026-08-29 verification date.');
if (!source.includes("sourceId: 'tpwd-wildlife'")) failures.push('Batch 6 must use the canonical TPWD wildlife source ID.');
const plannedCount = (source.match(/plannedArticlePath:\s*['\"]\/texas-snakes-guide['\"]/g) ?? []).length;
if (plannedCount !== 5) failures.push(`Every batch-6 snake fact must point only to the staged snakes guide; found ${plannedCount} of 5.`);
if (/\barticlePath\s*:/.test(source)) failures.push('Batch-6 snake facts must not expose a live articlePath before guide publication approval.');
if (/red\s+(?:touch|next to)\s+yellow|yellow\s+(?:touch|next to)\s+red/i.test(source)) failures.push('Batch-6 snake facts must not use the unreliable coral-snake color rhyme as an identification rule.');
if (/\b(?:catch|handle|kill|pin|grab)\s+(?:the\s+)?snake\b/i.test(source)) failures.push('Batch-6 snake facts must not recommend close-contact snake handling.');
if (!source.includes('giving snakes room to retreat')) failures.push('Batch 6 must retain TPWD-backed give-space encounter guidance.');
if (!catalog.includes('TEXAS_KNOWLEDGE_VERIFIED_BATCH6')) failures.push('Canonical Knowledge Bank catalog is missing verified batch 6.');
if (!barrel.includes("export * from './seed-verified-batch6'")) failures.push('Knowledge Bank barrel must export verified batch 6.');

if (failures.length) {
  console.error('Texas verified snake batch 6 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas verified snake batch 6 validation passed: ${ids.length} unique TPWD-backed staged snake facts with safer encounter guidance and no folklore identification rule.`);
