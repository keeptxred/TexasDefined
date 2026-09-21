import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/data');
const extensions = new Set(['.ts', '.tsx']);
const failures = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolute);
      continue;
    }
    if (!entry.isFile() || !extensions.has(path.extname(entry.name))) continue;

    const source = fs.readFileSync(absolute, 'utf8');
    const usesCheckedSentinel = /\b(?:sourceCheckedAt|checkedAt)\s*:\s*CHECKED\b/.test(source);
    if (!usesCheckedSentinel) continue;

    const declaresChecked =
      /\b(?:const|let|var)\s+CHECKED\b/.test(source) ||
      /\bimport\s+[\s\S]{0,500}\bCHECKED\b/.test(source);

    if (declaresChecked) continue;

    const relative = path.relative(process.cwd(), absolute).replaceAll(path.sep, '/');
    const lines = source.split('\n');
    lines.forEach((line, index) => {
      if (/\b(?:sourceCheckedAt|checkedAt)\s*:\s*CHECKED\b/.test(line)) {
        failures.push(`${relative}:${index + 1} references CHECKED without declaring or importing it`);
      }
    });
  }
}

walk(ROOT);

if (failures.length) {
  console.error('Runtime data constant validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('Bare CHECKED sentinels can transpile successfully but crash SSR at runtime.');
  process.exit(1);
}

console.log('Runtime data constant validation passed: every CHECKED freshness sentinel used by src/data is declared or imported.');
