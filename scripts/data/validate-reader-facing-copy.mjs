import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

const files = [
  'src/data/city-metro-authority.ts',
  'src/data/whirlyball-hurst-destination.ts',
  'src/data/fixtures/texas-regions-explained.ts',
  'src/data/fixtures/texas-us-mexican-war-palo-alto-guide.ts',
  ...fs.readdirSync(path.join(root, 'src/data'))
    .filter((name) => /^museum-expansion-statewide-wave\d+\.ts$/.test(name) || /^small-town-destinations-wave\d+\.ts$/.test(name))
    .map((name) => `src/data/${name}`),
];

const forbidden = [
  /TexasDefined(?:'s|’s)\s+[^\n"']*authority hub/i,
  /\bdiscovery graph\b/i,
  /\bauthority node\b/i,
  /\bcanonical destination\b/i,
  /\boriginal audit\b/i,
  /\bthe audit(?:'s|’s)\b/i,
  /\braw list\b/i,
  /\bnew content lane\b/i,
  /\bcontent lane\b/i,
  /\bGuide In Progress\b/i,
  /\bstill being completed\b/i,
  /\bstill building\b/i,
  /\bFor TexasDefined trip planning\b/i,
  /TexasDefined(?:'s|’s) larger military-history story/i,
  /editorial and discovery system/i,
  /local-reference node/i,
];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const pattern of forbidden) {
    const match = source.match(pattern);
    if (match) failures.push(`${file}: reader-facing copy still exposes internal/process wording: "${match[0]}"`);
  }
}

if (failures.length) {
  console.error('Reader-facing copy validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Reader-facing copy safeguards passed across ${files.length} audited public content sources.`);
