import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const places = read('src/data/texas-places.ts');
const sources = read('src/data/source-governance.ts');
const requiredRoutes = [
  'src/routes/learn.property-taxes.tsx',
  'src/routes/decide.property-taxes.tsx',
  'src/routes/learn.appraisal-districts.tsx',
  'src/routes/do.homestead-exemption.tsx',
  'src/routes/do.property-tax-protest.tsx',
  'src/routes/browse.counties.tsx',
  'src/routes/browse.cities.tsx',
  'src/routes/admin.platform-health.tsx',
];

const countyLiteral = places.match(/const COUNTY_NAMES = `([^`]+)`\.split/s)?.[1] ?? '';
const countyCount = countyLiteral ? countyLiteral.split('|').length : 0;
if (countyCount !== 254) errors.push(`Expected 254 Texas counties; found ${countyCount}.`);

const cityTuples = [...places.matchAll(/\['[^']+','[^']+','[^']+'\]/g)].length;
if (cityTuples < 50) errors.push(`Expected at least 50 city directory records; found ${cityTuples}.`);

const sourceIds = [...sources.matchAll(/id: '([^']+)'/g)].map((match) => match[1]);
if (new Set(sourceIds).size !== sourceIds.length) errors.push('Authoritative source and health resource IDs must be unique within their registry blocks.');
if (!sources.includes('https://comptroller.texas.gov/taxes/property-tax/')) errors.push('Texas Comptroller property-tax source is missing.');
if (!sources.includes('https://www.texas.gov/texas-county-websites.html')) errors.push('Texas county directory source is missing.');

for (const route of requiredRoutes) {
  if (!fs.existsSync(path.join(root, route))) errors.push(`Required migrated route is missing: ${route}`);
}

if (errors.length) {
  console.error('TexasDefined production-data validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`TexasDefined production data valid: ${countyCount} counties, ${cityTuples} cities, ${requiredRoutes.length} migrated routes.`);
