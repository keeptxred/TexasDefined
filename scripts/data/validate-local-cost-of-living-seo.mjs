import fs from 'node:fs';

const profiles = fs.readFileSync('src/data/local-cost-of-living.ts', 'utf8');
const route = fs.readFileSync('src/routes/texas-cost-of-living-calculator_.$location.tsx', 'utf8');
const calculatorPage = fs.readFileSync('src/components/calculators/CalculatorPage.tsx', 'utf8');
const selector = fs.readFileSync('src/components/calculators/ConsolidatedLocationSelector.tsx', 'utf8');
const sitemapDependencies = fs.readFileSync('src/data/sitemap-dependencies.server.ts', 'utf8');

const failures = [];
const locations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];

for (const slug of locations) {
  if (!profiles.includes(`slug: '${slug}'`)) failures.push(`Local cost-of-living registry missing ${slug}.`);
}

for (const marker of [
  'LOCAL_COST_OF_LIVING_PROFILES',
  'LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG',
  'instead of a citywide average.',
  'rather than relying on a single city index.',
  'adjustable household-budget comparison',
  'Houston-area household costs can change materially by address',
  'Frisco spans Collin and Denton counties',
]) {
  if (!profiles.includes(marker)) failures.push(`Local cost-of-living context contract missing ${marker}.`);
}

for (const marker of [
  "createFileRoute('/texas-cost-of-living-calculator/$location')",
  'LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG.has(params.location)',
  'notFound()',
  'redirect({ href: `/texas-cost-of-living-calculator#${params.location}`, statusCode: 301 })',
]) {
  if (!route.includes(marker)) failures.push(`Retired local cost-of-living route missing redirect/fail-closed marker ${marker}.`);
}

for (const marker of [
  'ConsolidatedLocationSelector',
  '<ConsolidatedLocationSelector />',
]) {
  if (!calculatorPage.includes(marker)) failures.push(`Canonical calculator shell missing ${marker}.`);
}

for (const marker of [
  "'/texas-cost-of-living-calculator':",
  'LOCAL_COST_OF_LIVING_PROFILES.map',
  'Local cost-of-living context',
  'one canonical tool',
  'window.location.hash',
]) {
  if (!selector.includes(marker)) failures.push(`Consolidated cost-of-living selector missing ${marker}.`);
}

if (!sitemapDependencies.includes('"/texas-cost-of-living-calculator/"')) {
  failures.push('Sitemap indexability filter must exclude retired local cost-of-living URL prefixes.');
}

for (const unsupported of ['average home price', 'average property tax rate', 'average rent is', 'average salary is']) {
  if (profiles.toLowerCase().includes(unsupported)) failures.push(`Local cost-of-living registry must not publish unsupported assumptions: ${unsupported}.`);
}

if (failures.length) {
  console.error('Consolidated cost-of-living authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Consolidated cost-of-living authority validation passed: ${locations.length} local contexts are preserved in one canonical calculator, citywide-average shortcuts remain explicitly rejected, and legacy location URLs are permanent redirects.`);
