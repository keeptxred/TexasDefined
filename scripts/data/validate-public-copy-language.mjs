import fs from 'node:fs';
import path from 'node:path';

const roots = ['src/data/fixtures'];
const banned = [
  'belongs in the county series',
  'unusual-business experiment',
  'this experiment is meant to test',
  'new content lane',
  'passes the same test TexasDefined is using',
];
const failures = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(?:ts|tsx)$/.test(entry.name)) {
      const source = fs.readFileSync(full, 'utf8');
      for (const phrase of banned) {
        if (source.toLowerCase().includes(phrase.toLowerCase())) failures.push(`${full}: reader-facing internal editorial language: "${phrase}"`);
      }
    }
  }
}

for (const root of roots) walk(root);

if (failures.length) {
  console.error('Public-copy language validation failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}
console.log('Public-copy language validation passed: internal planning/experiment wording is absent from public fixture copy.');
