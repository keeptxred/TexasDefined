import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src/data');
const failures = [];
const forbidden = [
  'For TexasDefined,',
];

for (const name of fs.readdirSync(dataDir)) {
  if (!/^museum-expansion-statewide-wave\d+\.ts$/.test(name)) continue;
  const relative = path.join('src/data', name);
  const content = fs.readFileSync(path.join(root, relative), 'utf8');
  for (const phrase of forbidden) {
    if (content.includes(phrase)) failures.push(`${relative} exposes internal editorial language: ${phrase}`);
  }
}

if (failures.length) {
  console.error('Reader-facing museum copy validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Reader-facing museum copy validation passed: public museum expansion copy contains no direct internal TexasDefined framing.');
