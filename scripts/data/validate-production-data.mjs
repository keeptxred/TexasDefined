import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const places = read('src/data/texas-places.ts');
const sources = read('src/data/source-governance.ts');
const entityRegistry = read('src/data/texas-entity-registry.ts');
const analytics = read('src/platform/analytics.ts');
const rootRoute = read('src/routes/__root.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const requiredFiles = [
  'src/routes/learn.property-taxes.tsx',
  'src/routes/learn.property-tax-payments.tsx',
  'src/routes/decide.property-taxes.tsx',
  'src/routes/learn.appraisal-districts.tsx',
  'src/routes/do.homestead-exemption.tsx',
  'src/routes/do.property-tax-protest.tsx',
  'src/routes/browse.counties.tsx',
  'src/routes/browse.cities.tsx',
  'src/routes/admin.platform-health.tsx',
  'src/routes/sitemap[.]xml.ts',
  'src/data/texas-data-sources.ts',
  'src/data/texas-entity-registry.ts',
  'src/platform/analytics.ts',
];

const publicPaths = [
  '/learn/property-taxes',
  '/learn/property-tax-payments',
  '/decide/property-taxes',
  '/learn/appraisal-districts',
  '/do/homestead-exemption',
  '/do/property-tax-protest',
  '/browse/counties',
  '/browse/cities',
];

const countyLiteral = places.match(/const COUNTY_NAMES = `([^`]+)`\.split/s)?.[1] ?? '';
const countyCount = countyLiteral ? countyLiteral.split('|').length : 0;
if (countyCount !== 254) errors.push(`Expected 254 Texas counties; found ${countyCount}.`);
const cityTuples = [...places.matchAll(/\['[^']+','[^']+','[^']+'\]/g)].length;
if (cityTuples < 50) errors.push(`Expected at least 50 city directory records; found ${cityTuples}.`);

if (!sources.includes('https://comptroller.texas.gov/taxes/property-tax/')) errors.push('Texas Comptroller property-tax source is missing.');
if (!sources.includes('https://www.texas.gov/texas-county-websites.html')) errors.push('Texas county directory source is missing.');
if (!sources.includes("id: 'property-tax-payments'")) errors.push('Payments and collections guide is missing from content-health governance.');
if (!entityRegistry.includes('TEXAS_ENTITY_REGISTRY')) errors.push('Production Texas entity registry export is missing.');
if (!entityRegistry.includes('TEXAS_LOCAL_OFFICE_ENTITIES')) errors.push('County appraisal-district and tax-office entity placeholders are missing.');
if (!analytics.includes("QUEUE_KEY='texasdefined:analytics-queue'")) errors.push('Privacy-safe local analytics queue is missing.');
if (!analytics.includes('MAX_QUEUE=100')) errors.push('Analytics queue limit is missing.');
if (!rootRoute.includes('installTexasDefinedAnalytics')) errors.push('Outcome analytics is not initialized in the application root.');
for (const publicPath of publicPaths) if (!sitemap.includes(`\"${publicPath}\"`)) errors.push(`Main sitemap is missing ${publicPath}.`);

for (const file of requiredFiles) if (!fs.existsSync(path.join(root, file))) errors.push(`Required migrated file is missing: ${file}`);
if (errors.length) {
  console.error('TexasDefined production-data validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`TexasDefined production data valid: ${countyCount} counties, ${cityTuples} cities, ${requiredFiles.length} migrated files, ${publicPaths.length} sitemap routes.`);
