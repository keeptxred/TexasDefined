import fs from 'node:fs';

const profiles = fs.readFileSync('src/data/local-cost-of-living.ts', 'utf8');
const page = fs.readFileSync('src/components/calculators/LocalCostOfLivingPage.tsx', 'utf8');
const route = fs.readFileSync('src/routes/texas-cost-of-living-calculator_.$location.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/texas-cost-of-living-calculator_.$location.lazy.tsx', 'utf8');
const server = fs.readFileSync('src/data/local-cost-of-living-page.server.ts', 'utf8');
const serverBoundary = fs.readFileSync('src/data/local-cost-of-living-page.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-cost-of-living-calculator.lazy.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');

const failures = [];
const locations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];

for (const slug of locations) {
  if (!profiles.includes(`slug: '${slug}'`)) failures.push(`Local cost-of-living registry missing ${slug}.`);
}

for (const marker of [
  'LOCAL_COST_OF_LIVING_PROFILES',
  'LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG',
  'No citywide average or preset local index is used.',
  'Houston-area household costs can change materially by address',
  'Frisco spans Collin and Denton counties',
  '/property-tax-calculator/dallas-county',
  '/texas-home-affordability-calculator/san-antonio',
  '/texas-homeownership-cost-calculator/el-paso',
  '/texas-home-insurance-calculator/houston',
  '/texas-mortgage-calculator/austin',
]) {
  if (!profiles.includes(marker) && !page.includes(marker)) failures.push(`Local cost-of-living authority contract missing ${marker}.`);
}

for (const marker of [
  "createFileRoute('/texas-cost-of-living-calculator/$location')",
  'getLocalCostOfLivingPage',
  'notFound()',
  'loaderData?.page.head',
]) {
  if (!route.includes(marker)) failures.push(`Local cost-of-living route missing ${marker}.`);
}
for (const marker of [
  "createLazyFileRoute('/texas-cost-of-living-calculator/$location')",
  'LocalCostOfLivingPage',
  'page.profile',
]) {
  if (!lazyRoute.includes(marker)) failures.push(`Local cost-of-living lazy route missing ${marker}.`);
}
for (const marker of [
  'Current household vs. possible',
  'Current monthly budget',
  'Annual difference',
  'No citywide average or preset local index is used.',
  'profile.propertyTaxHref',
  'profile.affordabilityHref',
  'profile.homeownershipHref',
  'profile.insuranceHref',
  'profile.mortgageHref',
  'profile.relocationHref',
  '/texas-salary-comparison-by-city',
  '/texas-salary-calculator',
  '/texas-budget-planner',
  'Planning only.',
]) {
  if (!page.includes(marker)) failures.push(`Local cost-of-living UI missing ${marker}.`);
}
for (const marker of [
  "'@type': 'WebApplication'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'FAQPage'",
  'canonicalLink(texasDefinedBrand, profile.path)',
  'buildMeta(texasDefinedBrand',
  'LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG',
]) {
  if (!server.includes(marker)) failures.push(`Local cost-of-living server head missing ${marker}.`);
}
for (const marker of ['createServerFn', "import('./local-cost-of-living-page.server')"]) {
  if (!serverBoundary.includes(marker)) failures.push(`Local cost-of-living server boundary missing ${marker}.`);
}
for (const marker of [
  "import { LOCAL_COST_OF_LIVING_PROFILES } from '@/data/local-cost-of-living'",
  'LOCAL_COST_OF_LIVING_PROFILES.map((profile)',
  'to={profile.path}',
  'Build a city budget without pretending one average fits everyone',
]) {
  if (!hub.includes(marker)) failures.push(`Statewide cost-of-living hub missing registry-driven discovery contract ${marker}.`);
}
if (!sitemap.includes('LOCAL_COST_OF_LIVING_PROFILES')) failures.push('Primary sitemap must import the local cost-of-living registry.');
if (!sitemap.includes('...LOCAL_COST_OF_LIVING_PROFILES.map((profile) => ({ path: profile.path')) failures.push('Primary sitemap must emit each local cost-of-living profile.');
if (server.includes("'@type': 'FinancialProduct'") || server.includes("'@type': 'Offer'")) failures.push('Local cost-of-living pages must not claim FinancialProduct or Offer schema.');
for (const unsupported of ['average home price', 'average property tax rate', 'average rent is', 'average salary is']) {
  if (profiles.toLowerCase().includes(unsupported)) failures.push(`Local cost-of-living registry must not publish unsupported assumptions: ${unsupported}.`);
}

if (failures.length) {
  console.error('Local cost-of-living SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Local cost-of-living SEO validation passed for ${locations.length} city planners with governed routing, canonical/schema coverage, registry-driven crawlable hub discovery, sitemap membership, local financial cross-links, and no unsupported citywide cost assumptions.`);
