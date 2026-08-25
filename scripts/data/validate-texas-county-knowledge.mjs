import fs from 'node:fs';

const files = Array.from({ length: 9 }, (_, index) =>
  `src/data/knowledge-bank/seed-counties-batch${index + 1}.ts`,
);
const route = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const relationships = fs.readFileSync('src/data/knowledge-graph/relationships.ts', 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const failures = [];
const ids = new Set();
const slugs = new Set();
let count = 0;

if (!route.includes("createFileRoute('/$kind/$slug')")) failures.push('County knowledge requires the existing /$kind/$slug route.');
if (!relationships.includes('return `/${entity.kind}/${entity.slug}`')) failures.push('County knowledge requires canonicalEntityPath /{kind}/{slug}.');

for (const file of files) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing county knowledge batch: ${file}`);
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');
  const batchNumber = file.match(/batch(\d+)/)?.[1];
  const exportName = `TEXAS_COUNTY_FACTS_BATCH${batchNumber}`;
  if (!catalog.includes(exportName)) failures.push(`Canonical catalog is missing ${exportName}.`);
  if (!barrel.includes(`./seed-counties-batch${batchNumber}`)) failures.push(`Knowledge Bank index is missing county batch ${batchNumber}.`);
  if (!/sourceId\s*:\s*['\"]tslac['\"]/.test(source)) failures.push(`${file} must use the canonical TSLAC source ID.`);
  if (!source.includes('https://www.tsl.texas.gov/ref/abouttx/countyseats.html')) failures.push(`${file} must cite the official TSLAC county-seat directory.`);
  if (!/verification\s*:\s*['\"]verified['\"]/.test(source)) failures.push(`${file} must mark county-seat facts verified.`);
  if (!/articlePath\s*:\s*`\/county\/\$\{slug\}`/.test(source)) failures.push(`${file} must link county facts through the verified /county/{slug} route template.`);
  if (!/socialFormats\s*:\s*\[\s*['\"]county-of-the-day['\"]\s*,\s*['\"]fact-of-the-day['\"]\s*,\s*['\"]texas-trivia['\"]\s*\]/.test(source)) {
    failures.push(`${file} must support county-of-the-day, fact-of-the-day and Texas trivia.`);
  }

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

if (count !== 254) failures.push(`Expected exactly 254 county-seat facts; found ${count}.`);
if (slugs.size !== 254) failures.push(`Expected exactly 254 unique county slugs; found ${slugs.size}.`);
if (ids.size !== 254) failures.push(`Expected exactly 254 unique county knowledge IDs; found ${ids.size}.`);

// Alphabet-spanning anchors catch source-list drift and common county-seat mistakes.
const requiredRows = new Map([
  ['anderson', 'Palestine'],
  ['bexar', 'San Antonio'],
  ['borden', 'Gail'],
  ['bowie', 'Boston'],
  ['cameron', 'Brownsville'],
  ['collin', 'McKinney'],
  ['dallas', 'Dallas'],
  ['deaf-smith', 'Hereford'],
  ['denton', 'Denton'],
  ['el-paso', 'El Paso'],
  ['fort-bend', 'Richmond'],
  ['gillespie', 'Fredericksburg'],
  ['harris', 'Houston'],
  ['hays', 'San Marcos'],
  ['hidalgo', 'Edinburg'],
  ['lubbock', 'Lubbock'],
  ['nueces', 'Corpus Christi'],
  ['tarrant', 'Fort Worth'],
  ['travis', 'Austin'],
  ['webb', 'Laredo'],
  ['williamson', 'Georgetown'],
  ['zavala', 'Crystal City'],
]);
const allSource = files
  .filter((file) => fs.existsSync(file))
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');
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
console.log(`Texas county knowledge validation passed: exactly ${count} unique TSLAC-backed county-seat facts across ${files.length} batches.`);
