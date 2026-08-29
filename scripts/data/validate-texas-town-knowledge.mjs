import fs from 'node:fs';

const townPath = 'src/data/knowledge-bank/seed-towns-from-county-seats.ts';
const town = fs.readFileSync(townPath, 'utf8');
const catalog = fs.readFileSync('src/data/knowledge-bank/catalog.ts', 'utf8');
const barrel = fs.readFileSync('src/data/knowledge-bank/index.ts', 'utf8');
const countyFiles = Array.from({ length: 9 }, (_, index) => `src/data/knowledge-bank/seed-counties-batch${index + 1}.ts`);
const countyText = countyFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const failures = [];

for (let batch = 1; batch <= 9; batch += 1) {
  if (!town.includes(`TEXAS_COUNTY_FACTS_BATCH${batch}`)) failures.push(`Town derivation must include county batch ${batch}.`);
}
if (!town.includes('const COUNTY_SEAT_FACTS')) failures.push('Town derivation must aggregate the canonical county-seat corpus.');
if (!town.includes('COUNTY_SEAT_FACTS.map(reciprocalTownFact)')) failures.push('Town derivation must map every county-seat fact one-to-one without filtering.');
if (!town.includes("kind: 'town-fact'")) failures.push('Reciprocal records must use kind town-fact.');
if (!town.includes("domain: 'towns'")) failures.push('Reciprocal records must use the towns domain.');
if (!town.includes("socialFormats: ['town-of-the-day', 'fact-of-the-day', 'texas-trivia']")) failures.push('Reciprocal town facts must support town-of-the-day, fact-of-the-day and Texas trivia.');
if (!town.includes('townSlug,')) failures.push('Reciprocal town facts must preserve a normalized townSlug.');
if (!town.includes('sources: record.sources')) failures.push('Reciprocal town facts must inherit the verified county source evidence.');
if (!town.includes('verifiedAt: record.verifiedAt')) failures.push('Reciprocal town facts must inherit the verified-at date.');
if (!town.includes('relatedEntityIds: [`county:${record.countySlug}`]')) failures.push('Reciprocal town facts must retain their county entity relationship.');
if (/\barticlePath\s*:/.test(town)) failures.push('Reciprocal town facts must not emit city articlePath links before city entities are independently index-ready.');
if (/\bplannedArticlePath\s*:/.test(town)) failures.push('Reciprocal town facts do not need speculative planned city links.');
if (!catalog.includes('TEXAS_TOWN_COUNTY_SEAT_FACTS')) failures.push('Canonical Knowledge Bank catalog is missing TEXAS_TOWN_COUNTY_SEAT_FACTS.');
if (!barrel.includes("export * from './seed-towns-from-county-seats'")) failures.push('Knowledge Bank barrel must export reciprocal town facts.');
if (!catalog.includes('texasKnowledgeByTownSlug')) failures.push('Canonical catalog must expose townSlug lookup.');
if (!catalog.includes('texasTownCountySeatFactBySlug')) failures.push('Canonical catalog must expose a town county-seat lookup helper.');

const countyRows = [...countyText.matchAll(/\bcountySeat\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)/g)];
if (countyRows.length !== 254) failures.push(`Expected exactly 254 source county-seat rows; found ${countyRows.length}.`);
const countySlugs = countyRows.map((match) => match[2]);
if (new Set(countySlugs).size !== 254) failures.push(`Expected 254 unique source county slugs; found ${new Set(countySlugs).size}.`);

const requiredReciprocalAnchors = [
  ['borden', 'Gail'],
  ['bexar', 'San Antonio'],
  ['bowie', 'Boston'],
  ['fort-bend', 'Richmond'],
  ['harris', 'Houston'],
  ['tarrant', 'Fort Worth'],
  ['travis', 'Austin'],
  ['webb', 'Laredo'],
  ['williamson', 'Georgetown'],
  ['zavala', 'Crystal City'],
];
for (const [countySlug, seat] of requiredReciprocalAnchors) {
  const found = countyRows.some((match) => match[2] === countySlug && match[3] === seat);
  if (!found) failures.push(`Missing verified reciprocal anchor ${seat} -> ${countySlug}.`);
}

if (failures.length) {
  console.error('Texas town knowledge validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas town knowledge validation passed: ${countyRows.length} reciprocal town/county-seat facts derive one-to-one from the TSLAC-backed county corpus without public city links.`);
