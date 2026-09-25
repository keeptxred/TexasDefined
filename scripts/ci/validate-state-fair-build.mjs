import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist/server';
const required = [
  'September 25, 2026',
  '2026 dates, hours and Fair Park location',
  'How Food & Midway Coupons work',
  '2026 ticket prices and admission',
  'State Fair of Texas 2026: Dates, Hours, Tickets, Food, Rides and Fair Park',
];
const forbidden = [
  'State Fair of Texas 2026: Dates, Fair Park, Food, Rides and Planning',
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walk(path));
    else if (/\.(?:js|mjs|json|html)$/.test(name)) out.push(path);
  }
  return out;
}

const files = walk(root);
const textByFile = new Map(files.map((file) => [file, readFileSync(file, 'utf8')]));
const missing = [];
for (const marker of required) {
  const matches = [...textByFile].filter(([, text]) => text.includes(marker)).map(([file]) => file);
  if (matches.length === 0) missing.push(marker);
  else console.log(`State Fair build marker found: ${JSON.stringify(marker)} in ${matches.join(', ')}`);
}

const stale = [];
for (const marker of forbidden) {
  const matches = [...textByFile].filter(([, text]) => text.includes(marker)).map(([file]) => file);
  if (matches.length > 0) stale.push({ marker, matches });
}

if (missing.length || stale.length) {
  console.error('State Fair built-server freshness validation failed.');
  for (const marker of missing) console.error(`- missing required marker: ${marker}`);
  for (const item of stale) console.error(`- stale marker remains: ${item.marker} in ${item.matches.join(', ')}`);
  process.exit(1);
}

console.log('State Fair built-server freshness validation passed.');
