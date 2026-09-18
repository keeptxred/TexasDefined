import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = 'src';
const sharedTrackerPath = path.normalize('src/lib/affiliate-click.ts');
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
const failures = [];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(path.normalize(fullPath));
  }
  return files;
}

if (!fs.existsSync(sharedTrackerPath)) {
  console.error(`Missing shared affiliate tracker: ${sharedTrackerPath}`);
  process.exit(1);
}

const sharedTracker = fs.readFileSync(sharedTrackerPath, 'utf8');
for (const [pattern, label] of [
  [/event\s*:\s*["'`]affiliate_click["'`]/, 'shared affiliate_click payload'],
  [/new\s+CustomEvent\s*\(\s*["'`]texasdefined:affiliate-click["'`]/, 'shared browser event dispatch'],
]) {
  if (!pattern.test(sharedTracker)) failures.push(`Shared tracker is missing ${label}.`);
}

for (const file of walk(sourceRoot)) {
  if (file === sharedTrackerPath) continue;
  const source = fs.readFileSync(file, 'utf8');

  if (/event\s*:\s*["'`]affiliate_click["'`]/.test(source)) {
    failures.push(`${file} defines affiliate_click locally; use src/lib/affiliate-click.ts instead.`);
  }

  if (/new\s+CustomEvent\s*\(\s*["'`]texasdefined:affiliate-click["'`]/.test(source)) {
    failures.push(`${file} dispatches texasdefined:affiliate-click locally; use src/lib/affiliate-click.ts instead.`);
  }
}

if (failures.length) {
  console.error('Shared affiliate tracker governance failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Shared affiliate tracker governance passed: React/source affiliate emitters are centralized in src/lib/affiliate-click.ts.');
