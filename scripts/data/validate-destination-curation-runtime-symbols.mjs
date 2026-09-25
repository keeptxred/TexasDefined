import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'src/data');
const files = fs.readdirSync(dataDir)
  .filter((name) => /^destination-curation(?:-[a-z0-9-]+)?\.ts$/i.test(name))
  .sort();

const failures = [];

for (const name of files) {
  const filePath = path.join(dataDir, name);
  const source = fs.readFileSync(filePath, 'utf8');
  const symbolMatches = [...source.matchAll(/sourceCheckedAt\s*:\s*([A-Z][A-Z0-9_]*)\b/g)];

  for (const match of symbolMatches) {
    const symbol = match[1];
    const declared = new RegExp(`\\b(?:const|let|var)\\s+${symbol}\\b`).test(source);
    const imported = new RegExp(`\\bimport[\\s\\S]{0,500}?\\b${symbol}\\b[\\s\\S]{0,500}?from\\s+['"]`).test(source);

    if (!declared && !imported) {
      failures.push(`${name}: sourceCheckedAt references undeclared runtime symbol ${symbol}`);
    }
  }
}

const batch7Path = path.join(dataDir, 'destination-curation-batch7.ts');
const batch7 = fs.readFileSync(batch7Path, 'utf8');
if (!batch7.includes('"lyndon-b-johnson-state-park-and-historic-site"')) {
  failures.push('destination-curation-batch7.ts: LBJ State Park curation is missing');
}
if (!batch7.includes('sourceCheckedAt: "2026-09-21"')) {
  failures.push('destination-curation-batch7.ts: LBJ State Park must retain an explicit source review date');
}
if (batch7.includes('sourceCheckedAt: CHECKED')) {
  failures.push('destination-curation-batch7.ts: undefined CHECKED runtime reference reintroduced');
}

if (failures.length) {
  console.error('Destination curation runtime-symbol validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Destination curation runtime-symbol validation passed (${files.length} curation modules checked).`);
