import fs from 'node:fs';

const route = fs.readFileSync('src/routes/texas-data.county-housing-costs.tsx', 'utf8');
const csvRoute = fs.readFileSync('src/routes/texas-data.county-housing-costs[.]csv.ts', 'utf8');
const types = fs.readFileSync('src/data/acs-county-housing-costs.ts', 'utf8');
const functions = fs.readFileSync('src/data/acs-county-housing-costs.functions.ts', 'utf8');
const serverLoader = fs.readFileSync('src/data/acs-county-housing-costs.server.ts', 'utf8');
const generator = fs.readFileSync('scripts/data/refresh-county-housing-costs.mjs', 'utf8');
const refreshWorkflow = fs.readFileSync('.github/workflows/refresh-acs-county-housing-costs.yml', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-data.tsx', 'utf8');
const snapshot = JSON.parse(fs.readFileSync('src/data/acs-county-housing-costs.snapshot.json', 'utf8'));
const errors = [];

for (const token of [
  "createFileRoute('/texas-data/county-housing-costs')",
  "getTexasCountyHousingCosts",
  "title: 'Texas County Housing Costs | Home Values, Rent & Income'",
  "loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow'",
  "'@type': 'Dataset'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-housing-costs.csv')",
  'Source',
  'Methodology',
  'Last verified',
  "const formatEstimate = (value: number | null) => value === null ? 'Not available'",
  'Census-suppressed estimates remain explicitly unavailable',
  'medianHomeValue',
  'medianGrossRent',
  'medianMonthlyOwnerCosts',
  'medianHouseholdIncome',
]) {
  if (!route.includes(token)) errors.push(`County housing/cost route missing ${token}`);
}

for (const token of [
  "createFileRoute('/texas-data/county-housing-costs.csv')",
  'await getTexasCountyHousingCosts()',
  "'x-robots-tag': 'noindex, follow'",
  'status: 503',
  'median_home_value',
  'median_gross_rent',
  'median_monthly_owner_costs',
  'median_household_income',
  "return value === null ? '' : String(value);",
]) {
  if (!csvRoute.includes(token)) errors.push(`County housing/cost CSV contract missing ${token}`);
}

for (const token of ['TexasCountyHousingCostRow', 'TexasCountyHousingCostDataset', 'number | null']) {
  if (!types.includes(token)) errors.push(`Client-safe ACS types missing ${token}`);
}
if (types.includes('snapshot.json') || types.includes('county-property-data')) {
  errors.push('Client-safe ACS types file must not import the snapshot or county registry.');
}
for (const token of [
  "import snapshot from '@/data/acs-county-housing-costs.snapshot.json'",
  'available: rows.length === 254',
  'getCountyPropertyRecordByFips',
  'snapshot.sourcePage',
]) {
  if (!serverLoader.includes(token)) errors.push(`Server-only ACS loader missing ${token}`);
}
for (const token of [
  "createServerFn({ method: 'GET' })",
  'loadTexasCountyHousingCostsServer',
]) {
  if (!functions.includes(token)) errors.push(`ACS server function missing ${token}`);
}
if (functions.includes('snapshot.json')) errors.push('ACS server function wrapper must not import snapshot data directly.');

for (const token of [
  'https://www2.census.gov/programs-surveys/acs/summary_file/',
  "{ table: 'b19013', variable: 'B19013_E001'",
  "{ table: 'b25064', variable: 'B25064_E001'",
  "{ table: 'b25077', variable: 'B25077_E001'",
  "{ table: 'b25088', variable: 'B25088_E001'",
  'const TEXAS_COUNTY_COUNT = 254;',
  'estimate = Number.isFinite(numeric) && numeric >= 0 ? numeric : null',
  'values.size !== TEXAS_COUNTY_COUNT',
  'const dataChanged = JSON.stringify(stablePayload) !== JSON.stringify(existingStablePayload);',
]) {
  if (!generator.includes(token)) errors.push(`ACS snapshot generator missing ${token}`);
}
if (generator.includes('api.census.gov')) errors.push('ACS snapshot generator must not depend on the Census Data API key path.');

for (const token of [
  'workflow_dispatch:',
  "cron: '41 11 6 * *'",
  "'scripts/data/refresh-county-housing-costs.mjs'",
  'pull-requests: write',
  'node scripts/data/refresh-county-housing-costs.mjs',
  'Expected all 254 Texas county rows',
  'Census-suppressed/unavailable estimate cells preserved as null',
  'gh pr create',
]) {
  if (!refreshWorkflow.includes(token)) errors.push(`ACS refresh workflow missing ${token}`);
}

if (!publicRoutes.includes('"/texas-data/county-housing-costs"')) errors.push('Conditional county housing/cost public path is missing.');
if (!publicRoutes.includes('"/texas-data/county-housing-costs.csv"')) errors.push('Noindex county housing/cost CSV path is missing.');
for (const token of ['getTexasCountyHousingCosts', 'countyHousingCosts?.available', '"/texas-data/county-housing-costs"']) {
  if (!sitemap.includes(token)) errors.push(`Sitemap conditional housing/cost contract missing ${token}`);
}
if (!hub.includes("['County housing costs', '/texas-data/county-housing-costs'")) errors.push('Texas Data hub must link to county housing costs.');

if (snapshot.release !== '2020–2024 ACS 5-Year Estimates' || snapshot.year !== 2024) {
  errors.push(`ACS snapshot release metadata is unexpected: ${snapshot.release || 'missing'} / ${snapshot.year || 'missing year'}`);
}
if (!String(snapshot.sourcePage || '').startsWith('https://www.census.gov/')) {
  errors.push('ACS snapshot source page must remain on census.gov.');
}
const expectedSourceSuffixes = {
  medianHouseholdIncome: 'acsdt5y2024-b19013.dat',
  medianGrossRent: 'acsdt5y2024-b25064.dat',
  medianHomeValue: 'acsdt5y2024-b25077.dat',
  medianMonthlyOwnerCosts: 'acsdt5y2024-b25088.dat',
};
for (const [field, suffix] of Object.entries(expectedSourceSuffixes)) {
  const sourceUrl = snapshot.sourceFiles?.[field];
  if (!String(sourceUrl || '').startsWith('https://www2.census.gov/') || !String(sourceUrl).endsWith(suffix)) {
    errors.push(`ACS snapshot provenance is invalid for ${field}: ${sourceUrl || 'missing'}`);
  }
}
if (!snapshot.generatedAt || Number.isNaN(Date.parse(snapshot.generatedAt))) errors.push('ACS snapshot generatedAt must be a valid timestamp.');
if (!Number.isInteger(snapshot.rowCount) || snapshot.rowCount !== snapshot.rows.length) errors.push('ACS snapshot rowCount must match rows length.');
if (snapshot.rows.length > 0) {
  if (snapshot.rows.length !== 254) errors.push(`Published ACS snapshot must contain all 254 counties; found ${snapshot.rows.length}.`);
  if (new Set(snapshot.rows.map((row) => row.fips)).size !== snapshot.rows.length) errors.push('ACS snapshot contains duplicate county FIPS codes.');
  for (const row of snapshot.rows) {
    if (!/^48\d{3}$/.test(String(row.fips))) errors.push(`Invalid Texas county FIPS ${row.fips}`);
    for (const key of ['medianHouseholdIncome','medianHomeValue','medianGrossRent','medianMonthlyOwnerCosts']) {
      if (!(key in row)) errors.push(`Missing ${key} field for ${row.fips}`);
      const value = row[key];
      if (value !== null && (!Number.isFinite(value) || value < 0)) errors.push(`Invalid ${key} for ${row.fips}`);
    }
  }
}

if (errors.length) {
  console.error(`County housing/cost validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`County housing/cost pipeline validation passed (${snapshot.rows.length || 0} snapshot rows; official 2024 ACS provenance locked, server-only bundle boundary protected, all 254 source county rows required, Census suppression preserved as null).`);
