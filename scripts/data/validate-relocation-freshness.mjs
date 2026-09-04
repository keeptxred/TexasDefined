import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const today = new Date();
const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

const data = read('src/data/texas-data-center.server.ts');
const dataBridge = read('src/data/texas-data-center.ts');
const sources = read('src/data/relocation-authority.ts');
const hub = read('src/routes/moving-to-texas.lazy.tsx');
const dataCenter = [
  read('src/routes/moving-to-texas_.data.tsx'),
  read('src/routes/moving-to-texas_.data.lazy.tsx'),
].join('\n');
const metro = read('src/components/relocation/MetroRelocationAuthority.tsx');
const blsMetroReview = read('docs/verification/bls-metro-july-2026-review.md');

const reviewWindows = [
  {
    id: 'census-vintage-2025',
    reviewBy: '2027-02-15',
    reason: 'Confirm the newest Census Population Estimates vintage after the annual state totals release window.',
  },
  {
    id: 'acs-state-to-state-2024',
    reviewBy: '2026-10-01',
    reason: 'Check whether a newer ACS state-to-state migration-flow release is available.',
  },
  {
    id: 'bls-metro-july-2026',
    reviewBy: '2026-10-01',
    reason: 'July 2026 BLS metropolitan employment was reviewed September 3; recheck after the August 2026 release scheduled September 30.',
  },
  {
    id: 'tdi-homeowners-2025-preliminary',
    reviewBy: '2027-01-15',
    reason: 'Recheck TDI homeowners market and county data for revised or newer annual figures.',
  },
  {
    id: 'txdot-traffic-coverage-2026',
    reviewBy: '2027-01-15',
    reason: 'Recheck TxDOT monitoring coverage and DISCOS annual statistics.',
  },
];

for (const item of reviewWindows) {
  const reviewTime = Date.parse(`${item.reviewBy}T23:59:59Z`);
  if (todayUtc > reviewTime) failures.push(`Relocation source review overdue: ${item.id} was due ${item.reviewBy}. ${item.reason}`);
}

for (const requirement of [
  'Reviewed: 2026-09-03',
  'USDL-26-1433',
  'https://www.bls.gov/news.release/metro.htm',
  'Dallas–Fort Worth–Arlington: 4,353,400',
  'Houston–Pasadena–The Woodlands: 3,497,700',
  'Austin–Round Rock–San Marcos: 1,421,700',
  'San Antonio–New Braunfels: 1,192,200',
  'El Paso: 364,300',
  'scheduled for September 30, 2026',
  'remain explicitly labeled as **June 2026** point-in-time figures',
]) {
  if (!blsMetroReview.includes(requirement)) failures.push(`BLS July 2026 metro review evidence missing: ${requirement}`);
}

for (const requirement of [
  "slug: 'texas-population-and-migration-2025'",
  "title: 'Texas Population and Migration Snapshot, 2025'",
  "year: 2025, updated: '2026-08-27'",
  "sourceName: 'U.S. Census Bureau, Vintage 2025 Population Estimates'",
  "sourceUrl: 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html'",
  "{ label: 'Texas population — July 1, 2025', value: 31709821",
  "{ label: 'Numeric population growth — 2024 to 2025', value: 391243",
  "{ label: 'Net domestic migration', value: 67299",
  "{ label: 'Net international migration', value: 167475",
  "{ label: 'Natural increase', value: 157711",
  "title: 'Texas Population and Migration Snapshot, 2024 — Revised Vintage 2025'",
  "{ label: 'Texas population — July 1, 2024', value: 31318578",
  'older vintages are superseded',
]) {
  if (!data.includes(requirement)) failures.push(`Vintage 2025 Texas data contract missing: ${requirement}`);
}

for (const forbidden of [
  'U.S. Census Bureau — Vintage 2024 Population Estimates',
  'https://www.census.gov/newsroom/press-releases/2024/population-estimates-international-migration.html',
  'freshness: "Vintage 2024 estimates"',
]) {
  if (sources.includes(forbidden)) failures.push(`Superseded Census population source must not remain current: ${forbidden}`);
}

for (const requirement of [
  'U.S. Census Bureau — Vintage 2025 Population Estimates',
  'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html',
  'older vintages should not be mixed with Vintage 2025',
  'Vintage 2025 state totals and components released January 27, 2026',
  'RELOCATION_SOURCE_VERIFIED = "August 27, 2026"',
]) {
  if (!sources.includes(requirement)) failures.push(`Relocation source freshness contract missing: ${requirement}`);
}

const continuousSourceContracts = [
  ['teaSchools', 'freshness: "Verified August 2026"'],
  ['comptrollerProperty', 'freshness: "Continuously maintained county directory"'],
  ['pucUtilities', 'freshness: "Verified August 2026"'],
  ['femaFlood', 'freshness: "Current effective FEMA mapping"'],
];
for (const [key, freshness] of continuousSourceContracts) {
  const start = sources.indexOf(`${key}:`);
  const end = start >= 0 ? sources.indexOf('\n  },', start) : -1;
  const block = start >= 0 ? sources.slice(start, end >= 0 ? end : undefined) : '';
  if (!block.includes(freshness)) failures.push(`Continuously maintained relocation source contract missing for ${key}: ${freshness}`);
}

if (!dataBridge.includes('await import("./texas-data-center.server")')) {
  failures.push('Texas Data Center must load the full source-backed registry through a server function.');
}
if (dataBridge.includes('Texas population — July 1, 2025')) {
  failures.push('Texas Data Center bridge must not duplicate relocation measurement rows into emitted client JavaScript.');
}

for (const surface of [hub, metro]) {
  if (!surface.includes('/texas-data/texas-population-and-migration-2025')) {
    failures.push('Current relocation hub and metro authority surfaces must link directly to the Vintage 2025 population brief.');
  }
}

for (const requirement of [
  "'texas-population-and-migration-2025'",
  "'texas-population-and-migration-2024'",
  'to="/texas-data/$datasetSlug"',
  "['Texas population', 'texas-population-and-migration-2025', 'Texas population — July 1, 2025']",
  "['Net domestic migration', 'texas-population-and-migration-2025', 'Net domestic migration']",
  'The current statewide population brief uses Census Vintage 2025.',
  'The retained 2024 brief is restated on that same vintage',
  'historical comparisons do not mix superseded Census series',
]) {
  if (!dataCenter.includes(requirement)) failures.push(`Relocation Data Center current-vintage safeguard missing: ${requirement}`);
}

const dataCenterPopulationSourceReference = [
  'RELOCATION_SOURCES.censusPopulation',
  'relocationSources.censusPopulation',
].some((reference) => dataCenter.includes(reference));
if (!dataCenterPopulationSourceReference) {
  failures.push('Relocation Data Center current-vintage safeguard missing: Census population source reference');
}

if (!hub.includes('Current Texas population snapshot')) failures.push('Moving hub must label the Vintage 2025 population brief as current.');
if (!metro.includes('Current Texas population and migration snapshot')) failures.push('Metro guides must lead with the Vintage 2025 population brief.');
if (!metro.includes('Revised Texas 2024 population history')) failures.push('Metro guides must label the retained 2024 brief as historical/revised.');
if (!metro.includes('/texas-data/texas-population-and-migration-2024')) failures.push('Metro authority must retain a discoverable link to the revised historical 2024 brief.');

if (failures.length) {
  console.error('Relocation source freshness validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Relocation source freshness passed (${reviewWindows.length} release-backed review windows and ${continuousSourceContracts.length} continuously maintained source contracts; Census Vintage 2025 current, July 2026 BLS metro release reviewed, revised 2024 history retained, and the full registry remains server-only).`);
