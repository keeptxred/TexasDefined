import fs from 'node:fs';

const affordabilityProfiles = fs.readFileSync('src/data/local-home-affordability.ts', 'utf8');
const mortgageProfiles = fs.readFileSync('src/data/local-mortgage.ts', 'utf8');
const mortgageRoute = fs.readFileSync('src/routes/texas-mortgage-calculator_.$location.tsx', 'utf8');
const calculatorPage = fs.readFileSync('src/components/calculators/CalculatorPage.tsx', 'utf8');
const selector = fs.readFileSync('src/components/calculators/ConsolidatedLocationSelector.tsx', 'utf8');
const sitemapDependencies = fs.readFileSync('src/data/sitemap-dependencies.server.ts', 'utf8');

const failures = [];
const governedLocations = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueLocations = new Set(governedLocations);

if (governedLocations.length !== 19 || uniqueLocations.size !== 19) {
  failures.push(`Mortgage local-context registry must stay aligned with 19 governed housing locations; found ${governedLocations.length} literal profiles and ${uniqueLocations.size} unique slugs.`);
}

for (const marker of [
  'LOCAL_HOME_AFFORDABILITY_PROFILES.map(toMortgageProfile)',
  'LOCAL_MORTGAGE_PROFILES',
  'LOCAL_MORTGAGE_PROFILE_BY_SLUG',
  'does not publish a current mortgage rate or imply lender approval',
  'Mortgage pricing depends on the borrower, loan program, market, lender and transaction',
]) {
  if (!mortgageProfiles.includes(marker)) failures.push(`Local mortgage context contract missing ${marker}`);
}

for (const marker of [
  "createFileRoute('/texas-mortgage-calculator/$location')",
  'LOCAL_MORTGAGE_PROFILE_BY_SLUG.has(params.location)',
  'notFound()',
  'redirect({ href: `/texas-mortgage-calculator#${params.location}`, statusCode: 301 })',
]) {
  if (!mortgageRoute.includes(marker)) failures.push(`Retired local mortgage route missing redirect/fail-closed marker ${marker}`);
}

for (const marker of [
  'ConsolidatedLocationSelector',
  '<ConsolidatedLocationSelector />',
]) {
  if (!calculatorPage.includes(marker)) failures.push(`Canonical calculator shell missing ${marker}`);
}

for (const marker of [
  "'/texas-mortgage-calculator':",
  'LOCAL_MORTGAGE_PROFILES.map',
  'Local mortgage context',
  'one authoritative calculator page',
  'window.location.hash',
]) {
  if (!selector.includes(marker)) failures.push(`Consolidated mortgage selector missing ${marker}`);
}

if (!sitemapDependencies.includes('"/texas-mortgage-calculator/"')) {
  failures.push('Sitemap indexability filter must exclude retired local mortgage URL prefixes.');
}

if (failures.length) {
  console.error('Consolidated mortgage authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Consolidated mortgage authority validation passed: ${uniqueLocations.size} local contexts are preserved in one canonical calculator and legacy location URLs are permanent redirects.`);
