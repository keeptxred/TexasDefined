import './validate-calculator-app-seo.mjs';
import './validate-phase10-housing-indexing.mjs';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/decide.financial-tools.tsx');
const propertyHub = read('src/routes/property.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const selector = read('src/components/calculators/ConsolidatedLocationSelector.tsx');
const calculatorPage = read('src/components/calculators/CalculatorPage.tsx');
const sitemapDependencies = read('src/data/sitemap-dependencies.server.ts');
const propertyProfiles = read('src/data/local-property-tax-calculators.ts');
const affordabilityProfiles = read('src/data/local-home-affordability.ts');
const costProfiles = read('src/data/local-cost-of-living.ts');

const failures = [];

for (const feature of [
  "'@type': 'CollectionPage'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'ItemList'",
  "mainEntity: { '@id': `${hubUrl}#tools` }",
  'absoluteUrl(texasDefinedBrand, path)',
]) {
  if (!route.includes(feature)) failures.push(`Financial tools route missing ${feature}.`);
}
if (route.includes("'@type': 'FinancialProduct'")) failures.push('Financial tools hub must not claim FinancialProduct entities.');
if (route.includes("'@type': 'Offer'")) failures.push('Financial tools hub must not claim Offer data.');

const canonicalCalculators = [
  '/texas-property-tax-estimator',
  '/texas-home-affordability-calculator',
  '/texas-homeownership-cost-calculator',
  '/texas-home-insurance-calculator',
  '/texas-mortgage-calculator',
  '/texas-cost-of-living-calculator',
  '/texas-salary-needed-calculator',
];
for (const path of canonicalCalculators) {
  if (!publicRoutes.includes(`\"${path}\"`)) failures.push(`Canonical calculator is missing from public-route governance: ${path}.`);
  if (!selector.includes(`'${path}'`)) failures.push(`Consolidated location selector is missing canonical calculator config: ${path}.`);
}
if (!calculatorPage.includes('<ConsolidatedLocationSelector />')) failures.push('Shared CalculatorPage must render the consolidated location selector.');

for (const registry of [
  'LOCAL_PROPERTY_TAX_PROFILES',
  'LOCAL_HOME_AFFORDABILITY_PROFILES',
  'LOCAL_HOMEOWNERSHIP_COST_PROFILES',
  'LOCAL_HOME_INSURANCE_PROFILES',
  'LOCAL_MORTGAGE_PROFILES',
  'LOCAL_COST_OF_LIVING_PROFILES',
  'LOCAL_SALARY_NEEDED_PROFILES',
]) {
  if (!selector.includes(registry)) failures.push(`Consolidated selector is missing governed registry ${registry}.`);
}
for (const marker of ['window.location.hash', 'window.history.replaceState', 'Select a city or county', 'One calculator, local context']) {
  if (!selector.includes(marker)) failures.push(`Consolidated selector is missing behavior/content marker ${marker}.`);
}

const retiredPrefixes = [
  '/property-tax-calculator/',
  '/texas-home-affordability-calculator/',
  '/texas-homeownership-cost-calculator/',
  '/texas-home-insurance-calculator/',
  '/texas-mortgage-calculator/',
  '/texas-cost-of-living-calculator/',
  '/texas-salary-needed-calculator/',
];
for (const prefix of retiredPrefixes) {
  if (!sitemapDependencies.includes(`\"${prefix}\"`)) failures.push(`Sitemap governance must suppress retired calculator prefix ${prefix}.`);
}

const propertyLocations = [...propertyProfiles.matchAll(/path:\s*'\/property-tax-calculator\/([^']+)'/g)].map((match) => match[1]);
const housingLocations = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const costLocations = [...costProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
if (propertyLocations.length !== 15 || new Set(propertyLocations).size !== 15) failures.push(`Expected 15 governed property-tax location contexts; found ${propertyLocations.length}/${new Set(propertyLocations).size}.`);
if (housingLocations.length !== 19 || new Set(housingLocations).size !== 19) failures.push(`Expected 19 governed housing location contexts; found ${housingLocations.length}/${new Set(housingLocations).size}.`);
if (costLocations.length !== 7 || new Set(costLocations).size !== 7) failures.push(`Expected 7 governed cost/salary location contexts; found ${costLocations.length}/${new Set(costLocations).size}.`);

for (const marker of [
  '/texas-property-tax-estimator',
  '/texas-homeownership-cost-calculator',
  '/texas-home-affordability-calculator',
  'Official-Rate Property Tax Estimator',
  'Homeownership Cost Calculator',
  'Home Affordability Calculator',
]) {
  if (!propertyHub.includes(marker)) failures.push(`Property authority hub is missing canonical financial-tool discovery marker ${marker}.`);
}

if (failures.length) {
  console.error('Financial tools SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Financial tools SEO validation passed: seven canonical interactive calculators retain governed local context (${propertyLocations.length} property-tax, ${housingLocations.length} housing, ${costLocations.length} cost/salary locations), legacy child URLs remain redirect-only, and canonical financial-tool discovery/schema safeguards are intact.`);
