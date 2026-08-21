import fs from 'node:fs';

const files = [
  'src/data/knowledge-bank/seed-counties-batch1.ts',
  'src/data/knowledge-bank/seed-counties-batch2.ts',
];
const route = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const relationships = fs.readFileSync('src/data/knowledge-graph/relationships.ts', 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const failures = [];
const ids = new Set();
const slugs = new Set();
let count = 0;

if (!route.includes("createFileRoute('/$kind/$slug')")) failures.push('County knowledge requires the existing /$kind/$slug route.');
if (!relationships.includes('return `/${entity.kind}/${entity.slug}`')) failures.push('County knowledge requires canonicalEntityPath /{kind}/{slug}.');

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const exportName = file.includes('batch1') ? 'TEXAS_COUNTY_FACTS_BATCH1' : 'TEXAS_COUNTY_FACTS_BATCH2';
  if (!catalog.includes(exportName)) failures.push(`Canonical catalog is missing ${exportName}.`);
  if (!source.includes("sourceId: 'tslac'")) failures.push(`${file} must use the canonical TSLAC source ID.`);
  if (!source.includes('https://www.tsl.texas.gov/ref/abouttx/countyseats.html')) failures.push(`${file} must cite the official TSLAC county-seat directory.`);
  if (!source.includes("socialFormats: ['county-of-the-day', 'fact-of-the-day', 'texas-trivia']")) failures.push(`${file} must support county-of-the-day, fact-of-the-day and Texas trivia.`);

  for (const match of source.matchAll(/countySeat\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)/g)) {
    const [, county, slug, seat] = match;
    const id = `county-${slug}-seat`;
    count += 1;
    if (ids.has(id)) failures.push(`Duplicate county knowledge ID: ${id}`);
    if (slugs.has(slug)) failures.push(`Duplicate county slug across county batches: ${slug}`);
    ids.add(id);
    slugs.add(slug);
    if (!county.trim() || !slug.trim() || !seat.trim()) failures.push(`County row ${id} requires county, slug and seat.`);
  }
}

if (count < 60) failures.push(`Expected at least 60 county-seat facts; found ${count}.`);

// These known rows catch accidental source-list drift on high-value and previously reported counties.
const requiredRows = new Map([
  ['borden', 'Gail'],
  ['bexar', 'San Antonio'],
  ['bowie', 'Boston'],
  ['cameron', 'Brownsville'],
  ['collin', 'McKinney'],
  ['dallas', 'Dallas'],
  ['deaf-smith', 'Hereford'],
]);
const allSource = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
for (const [slug, seat] of requiredRows) {
  const escapedSeat = seat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`countySeat\\(\\s*['\"][^'\"]+['\"]\\s*,\\s*['\"]${slug}['\"]\\s*,\\s*['\"]${escapedSeat}['\"]`);
  if (!pattern.test(allSource)) failures.push(`Missing or changed verified county-seat row: ${slug} -> ${seat}.`);
}

if (failures.length) {
  console.error('Texas county knowledge validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Texas county knowledge validation passed: ${count} unique TSLAC-backed county-seat facts across ${files.length} batches.`);
