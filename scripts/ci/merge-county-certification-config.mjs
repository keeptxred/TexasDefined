import fs from 'node:fs';

const basePath = 'scripts/ci/incomplete-county-certification-config.json';
const additionalPath = 'scripts/ci/additional-county-certification-config.json';

const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));
const additional = JSON.parse(fs.readFileSync(additionalPath, 'utf8'));
const duplicates = Object.keys(additional).filter((county) => Object.hasOwn(base, county));
if (duplicates.length) {
  console.error(`County certification config overlap is forbidden: ${duplicates.join(', ')}`);
  process.exit(1);
}

const merged = { ...base, ...additional };
fs.writeFileSync(basePath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
console.log(`Merged county certification contracts: ${Object.keys(base).length} base + ${Object.keys(additional).length} additional = ${Object.keys(merged).length}`);
