import fs from 'node:fs';

const failures = [];
const citationPath = 'public/citation-magnets.json';
const publicRoutesPath = 'src/lib/public-routes.ts';
const hubPath = 'src/routes/things-unique-to-texas.lazy.tsx';

let index;
try {
  index = JSON.parse(fs.readFileSync(citationPath, 'utf8'));
} catch (error) {
  failures.push(`citation-magnets.json must remain valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}

const publicRoutes = fs.readFileSync(publicRoutesPath, 'utf8');
const hub = fs.readFileSync(hubPath, 'utf8');

const required = [
  ['https://texasdefined.com/things-unique-to-texas', 'culture-reference-collection'],
  ['https://texasdefined.com/things-unique-to-texas/methodology', 'culture-methodology'],
  ['https://texasdefined.com/texas-food-history', 'food-history-collection'],
  ['https://texasdefined.com/texas-food-trail', 'culture-travel-reference'],
  ['https://texasdefined.com/texas-chili-con-carne-history', 'food-history-reference'],
  ['https://texasdefined.com/texas-chicken-fried-steak-guide', 'food-history-reference'],
  ['https://texasdefined.com/texas-breakfast-taco-guide', 'food-culture-reference'],
  ['https://texasdefined.com/texas-roadside-oddities', 'culture-travel-reference'],
  ['https://texasdefined.com/texas-slang-explained', 'culture-reference'],
  ['https://texasdefined.com/texas-dance-halls-honky-tonks', 'music-culture-reference'],
  ['https://texasdefined.com/texas-homecoming-mums', 'culture-reference'],
  ['https://texasdefined.com/texas-natural-wonders-bucket-list', 'travel-reference'],
  ['https://texasdefined.com/german-czech-texas-towns', 'heritage-travel-reference'],
  ['https://texasdefined.com/texas-brand-origin-stories', 'brand-culture-reference'],
  ['https://texasdefined.com/dr-pepper-texas-history', 'brand-history-reference'],
];

if (index) {
  if (index.schemaVersion !== 1) failures.push('Texas culture citation index requires schemaVersion 1.');
  if (index.asOf !== '2026-08-19') failures.push(`citation-magnets.json asOf must remain 2026-08-19; found ${index.asOf ?? 'missing'}.`);
  const resources = new Map((index.resources ?? []).map((resource) => [resource.url, resource]));
  for (const [url, type] of required) {
    const resource = resources.get(url);
    if (!resource) {
      failures.push(`Machine-readable citation index missing ${url}.`);
      continue;
    }
    if (resource.type !== type) failures.push(`${url} citation type must be ${type}; found ${resource.type}.`);
    if (!Array.isArray(resource.trust) || resource.trust.length < 2) failures.push(`${url} must retain at least two trust/scope markers.`);

    const path = new URL(url).pathname;
    if (path !== '/things-unique-to-texas/methodology' && path !== '/things-unique-to-texas') {
      if (!publicRoutes.includes(`"${path}"`)) failures.push(`${path} citation target must remain governed as an indexable public route.`);
    }
  }
}

for (const path of [
  '/texas-food-history',
  '/texas-food-trail',
  '/texas-chili-con-carne-history',
  '/texas-chicken-fried-steak-guide',
  '/texas-breakfast-taco-guide',
  '/texas-brand-origin-stories',
  '/dr-pepper-texas-history',
]) {
  if (!hub.includes(`to="${path}"`)) failures.push(`Things That Define Texas hub must retain discovery link ${path}.`);
}

if (failures.length) {
  console.error('Texas culture citation-index validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas culture citation-index validation passed: ${required.length} canonical culture references retain machine-discovery, trust guidance, route governance and hub discovery.`);
