import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const failures = [];

const publicRoutes = read('src/lib/public-routes.ts');
const sitemapDependencies = read('src/data/sitemap-dependencies.server.ts');
const propertyProfiles = read('src/data/local-property-tax-calculators.ts');
const affordabilityProfiles = read('src/data/local-home-affordability.ts');
const ownershipProfiles = read('src/data/local-homeownership-cost.ts');
const insuranceProfiles = read('src/data/local-home-insurance.ts');
const mortgageProfiles = read('src/data/local-mortgage.ts');
const costProfiles = read('src/data/local-cost-of-living.ts');
const salaryProfiles = read('src/data/local-salary-needed.ts');
const selector = read('src/components/calculators/ConsolidatedLocationSelector.tsx');
const calculatorPage = read('src/components/calculators/CalculatorPage.tsx');
const propertyEstimator = read('src/routes/texas-property-tax-estimator.tsx');
const buyerRoute = read('src/routes/buying-a-home-in-texas.tsx');
const buyerPage = read('src/routes/buying-a-home-in-texas.lazy.tsx');
const productionVerifier = read('scripts/ci/verify-housing-index-surfaces.mjs');
const productionWorkflow = read('.github/workflows/verify-housing-index-surfaces.yml');

const dynamicRoutes = [
  ['property tax', 'src/routes/property-tax-calculator.$location.tsx', '/property-tax-calculator/$location', 'LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG', '/texas-property-tax-estimator#'],
  ['affordability', 'src/routes/texas-home-affordability-calculator_.$location.tsx', '/texas-home-affordability-calculator/$location', 'LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG', '/texas-home-affordability-calculator#'],
  ['homeownership cost', 'src/routes/texas-homeownership-cost-calculator_.$location.tsx', '/texas-homeownership-cost-calculator/$location', 'LOCAL_HOMEOWNERSHIP_COST_PROFILE_BY_SLUG', '/texas-homeownership-cost-calculator#'],
  ['home insurance', 'src/routes/texas-home-insurance-calculator_.$location.tsx', '/texas-home-insurance-calculator/$location', 'LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG', '/texas-home-insurance-calculator#'],
  ['mortgage', 'src/routes/texas-mortgage-calculator_.$location.tsx', '/texas-mortgage-calculator/$location', 'LOCAL_MORTGAGE_PROFILE_BY_SLUG', '/texas-mortgage-calculator#'],
  ['cost of living', 'src/routes/texas-cost-of-living-calculator_.$location.tsx', '/texas-cost-of-living-calculator/$location', 'LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG', '/texas-cost-of-living-calculator#'],
  ['salary needed', 'src/routes/texas-salary-needed-calculator_.$location.tsx', '/texas-salary-needed-calculator/$location', 'LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG', '/texas-salary-needed-calculator#'],
];

for (const [label, path, routeId, profileMap, target] of dynamicRoutes) {
  const source = read(path);
  if (!source.includes(`createFileRoute('${routeId}')`) && !source.includes(`createFileRoute("${routeId}")`)) failures.push(`${label} dynamic route must retain legacy route id ${routeId}`);
  if (!source.includes(profileMap)) failures.push(`${label} redirect must validate against ${profileMap}.`);
  if (!source.includes('notFound()')) failures.push(`${label} redirect must keep unknown slugs fail-closed with notFound().`);
  if (!source.includes('redirect(') || !source.includes('statusCode: 301')) failures.push(`${label} legacy route must permanently redirect.`);
  if (!source.includes(target)) failures.push(`${label} legacy route must redirect to ${target}{slug}.`);
}

const propertyPaths = [...propertyProfiles.matchAll(/path:\s*'\/property-tax-calculator\/([^']+)'/g)].map((match) => match[1]);
const affordabilitySlugs = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const costSlugs = [...costProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueProperty = new Set(propertyPaths);
const uniqueAffordability = new Set(affordabilitySlugs);
const uniqueCost = new Set(costSlugs);
if (propertyPaths.length !== 15 || uniqueProperty.size !== 15) failures.push(`Expected 15 governed legacy property-tax locations; found ${propertyPaths.length}/${uniqueProperty.size}.`);
if (affordabilitySlugs.length !== 19 || uniqueAffordability.size !== 19) failures.push(`Expected 19 governed shared housing locations; found ${affordabilitySlugs.length}/${uniqueAffordability.size}.`);
if (costSlugs.length !== 7 || uniqueCost.size !== 7) failures.push(`Expected 7 governed city cost-of-living locations; found ${costSlugs.length}/${uniqueCost.size}.`);

for (const [label, source, marker] of [
  ['homeownership cost', ownershipProfiles, 'LOCAL_HOME_AFFORDABILITY_PROFILES.map'],
  ['home insurance', insuranceProfiles, 'LOCAL_HOME_AFFORDABILITY_PROFILES.map'],
  ['mortgage', mortgageProfiles, 'LOCAL_HOME_AFFORDABILITY_PROFILES.map'],
  ['salary needed', salaryProfiles, 'LOCAL_COST_OF_LIVING_PROFILES.map'],
]) if (!source.includes(marker)) failures.push(`${label} locality inventory must remain derived from its governed source registry.`);

for (const marker of [
  "'/texas-home-affordability-calculator'",
  "'/texas-mortgage-calculator'",
  "'/texas-home-insurance-calculator'",
  "'/texas-homeownership-cost-calculator'",
  "'/texas-cost-of-living-calculator'",
  "'/texas-salary-needed-calculator'",
  "'/texas-property-tax-estimator'",
  'LOCAL_PROPERTY_TAX_PROFILES',
  'LOCAL_HOME_AFFORDABILITY_PROFILES',
  'LOCAL_HOMEOWNERSHIP_COST_PROFILES',
  'LOCAL_HOME_INSURANCE_PROFILES',
  'LOCAL_MORTGAGE_PROFILES',
  'LOCAL_COST_OF_LIVING_PROFILES',
  'LOCAL_SALARY_NEEDED_PROFILES',
  'window.location.hash',
  'window.history.replaceState',
]) if (!selector.includes(marker)) failures.push(`Consolidated selector missing ${marker}.`);
if (!calculatorPage.includes('<ConsolidatedLocationSelector />')) failures.push('Shared CalculatorPage must render the consolidated location selector.');
if (!propertyEstimator.includes('<ConsolidatedLocationSelector/>') && !propertyEstimator.includes('<ConsolidatedLocationSelector />')) failures.push('Property-tax estimator must render the consolidated location selector.');

for (const prefix of [
  '/property-tax-calculator/',
  '/texas-home-affordability-calculator/',
  '/texas-homeownership-cost-calculator/',
  '/texas-home-insurance-calculator/',
  '/texas-mortgage-calculator/',
  '/texas-cost-of-living-calculator/',
  '/texas-salary-needed-calculator/',
]) if (!sitemapDependencies.includes(`"${prefix}"`)) failures.push(`Sitemap filtering must suppress legacy calculator prefix ${prefix}.`);
if (!sitemapDependencies.includes('isBaseIndexablePublicPath')) failures.push('Sitemap dependency wrapper must preserve the base public-route indexability policy.');

if (!publicRoutes.split('export const REDIRECT_ONLY_PATHS')[0].includes('"/buying-a-home-in-texas"')) failures.push('/buying-a-home-in-texas must remain indexable.');
for (const marker of ["createFileRoute('/buying-a-home-in-texas')", 'loaderData?.head']) if (!buyerRoute.includes(marker)) failures.push(`Texas homebuyer route missing ${marker}.`);
for (const marker of ['nine-step', 'property taxes', 'homeowners insurance', 'closing']) if (!buyerPage.toLowerCase().includes(marker)) failures.push(`Texas homebuyer journey missing visible planning concept: ${marker}.`);

for (const marker of ['105 legacy local calculator URLs', '7 canonical calculator pages', 'response.status === 301', "headers.get('location')", 'response.status === 404']) if (!productionVerifier.includes(marker)) failures.push(`Production consolidation verifier missing contract marker: ${marker}`);
for (const marker of ['pull_request:', 'push:', 'branches:', 'main', 'Validate calculator consolidation contract', 'Verify consolidated calculator surfaces']) if (!productionWorkflow.includes(marker)) failures.push(`Calculator consolidation workflow missing ${marker}.`);

if (failures.length) {
  console.error('Calculator consolidation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Calculator consolidation contract passed: ${uniqueProperty.size + (uniqueAffordability.size * 4) + (uniqueCost.size * 2)} legacy local calculator URLs collapse into seven canonical interactive calculators while unknown slugs remain fail-closed.`);
