import fs from 'node:fs';

const route = fs.readFileSync('src/routes/texas-data.county-housing-costs.tsx', 'utf8');
const csvRoute = fs.readFileSync('src/routes/texas-data.county-housing-costs[.]csv.ts', 'utf8');
const loader = fs.readFileSync('src/data/acs-county-housing-costs.ts', 'utf8');
const generator = fs.readFileSync('scripts/data/refresh-county-housing-costs.mjs', 'utf8');
const refreshWorkflow = fs.readFileSync('.github/workflows/refresh-acs-county-housing-costs.yml', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-data.tsx', 'utf8');
const snapshot = JSON.parse(fs.readFileSync('src/data/acs-county-housing-costs.snapshot.json', 'utf8'));
const errors = [];

for (const token of [
  "createFileRoute('/texas-data/county-housing-costs')",
  "title: 'Texas County Housing Costs | Home Values, Rent & Income'",
  "loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow'",
  "'@type': 'Dataset'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-housing-costs.csv')",
  'Source',
  'Methodology',
  'Last verified',
  'medianHomeValue',
  'medianGrossRent',
  'medianMonthlyOwnerCosts',
  'medianHouseholdIncome',
]) {
  if (!route.includes(token)) errors.push(`County housing/cost route missing ${token}`);
}

for (const token of [
  "createFileRoute('/texas-data/county-housing-costs.csv')",
  "'x-robots-tag': 'noindex, follow'",
  "status: 503",
  'median_home_value',
  'median_gross_rent',
  'median_monthly_owner_costs',
  'median_household_income',
]) {
  if (!csvRoute.includes(token)) errors.push(`County housing/cost CSV contract missing ${token}`);
}

for (const token of [
  'rows.length >= 250',
  'getCountyPropertyRecordByFips',
  'snapshot.sourcePage',
]) {
  if (!loader.includes(token)) errors.push(`County housing/cost loader missing ${token}`);
}

for (const token of [
  'https://www2.census.gov/programs-surveys/acs/summary_file/',
  'acsdt5y${YEAR}-b19013.dat',
  'B19013_E001',
  'B25064_E001',
  'B25077_E001',
  'B25088_E001',
  "^0500000US48\\d{3}$",
  'fips.length < 250',
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
  'Expected at least 250 Texas county rows',
  "gh pr create",
]) {
  if (!refreshWorkflow.includes(token)) errors.push(`ACS refresh workflow missing ${token}`);
}

if (!publicRoutes.includes('"/texas-data/county-housing-costs"')) errors.push('Conditional county housing/cost public path is missing.');
if (!publicRoutes.includes('"/texas-data/county-housing-costs.csv"')) errors.push('Noindex county housing/cost CSV path is missing.');
for (const token of ['loadTexasCountyHousingCosts', 'countyHousingCosts.available', '"/texas-data/county-housing-costs"']) {
  if (!sitemap.includes(token)) errors.push(`Sitemap conditional housing/cost contract missing ${token}`);
}
if (!hub.includes("['County housing costs', '/texas-data/county-housing-costs'")) errors.push('Texas Data hub must link to county housing costs.');

if (!Number.isInteger(snapshot.rowCount) || snapshot.rowCount !== snapshot.rows.length) errors.push('ACS snapshot rowCount must match rows length.');
if (snapshot.rows.length > 0) {
  if (snapshot.rows.length < 250) errors.push(`Published ACS snapshot must have at least 250 counties; found ${snapshot.rows.length}.`);
  if (new Set(snapshot.rows.map((row) => row.fips)).size !== snapshot.rows.length) errors.push('ACS snapshot contains duplicate county FIPS codes.');
  for (const row of snapshot.rows) {
    if (!/^48\d{3}$/.test(String(row.fips))) errors.push(`Invalid Texas county FIPS ${row.fips}`);
    for (const key of ['medianHouseholdIncome','medianHomeValue','medianGrossRent','medianMonthlyOwnerCosts']) {
      if (!Number.isFinite(row[key]) || row[key] < 0) errors.push(`Invalid ${key} for ${row.fips}`);
    }
  }
}

if (errors.length) {
  console.error(`County housing/cost validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`County housing/cost pipeline validation passed (${snapshot.rows.length || 0} snapshot rows; fail-closed until near-complete official Census data is present).`);
