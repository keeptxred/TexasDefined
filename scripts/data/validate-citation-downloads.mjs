import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const growthRoute = await read('src/routes/texas-data.county-growth.tsx');
const growthContent = await read('src/components/data/CountyGrowthContent.tsx');
const growthCsv = await read('src/routes/texas-data.county-growth[.]csv.ts');
const cityCountyRoute = await read('src/routes/texas-data.city-county-relationships.tsx');
const cityCountyCsv = await read('src/routes/texas-data.city-county-relationships[.]csv.ts');

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

for (const token of [
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-growth.csv')",
]) expect(growthRoute.includes(token), `county-growth Dataset distribution missing: ${token}`);
expect(growthContent.includes('href="/texas-data/county-growth.csv"'), 'county-growth page must expose a visible CSV download link');
for (const token of [
  "createFileRoute('/texas-data/county-growth.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texas-county-population-growth-2020-2025.csv\"'",
  'if (!data.available)',
  'status: 503',
  'population_change_percent',
]) expect(growthCsv.includes(token), `county-growth CSV contract missing: ${token}`);

for (const token of [
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/city-county-relationships.csv')",
  'href="/texas-data/city-county-relationships.csv"',
]) expect(cityCountyRoute.includes(token), `city-county Dataset distribution missing: ${token}`);
for (const token of [
  "createFileRoute('/texas-data/city-county-relationships.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-city-county-relationships.csv\"'",
  'county_registry_match',
  "county ? 'matched' : 'pending'",
]) expect(cityCountyCsv.includes(token), `city-county CSV contract missing: ${token}`);

if (errors.length) {
  console.error('Citation dataset download validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Citation dataset download validation passed: growth and city-county CSV distributions remain visible, noindex, source-aligned and machine-readable.');
