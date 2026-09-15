import fs from 'node:fs';

const affordabilityProfiles = fs.readFileSync('src/data/local-home-affordability.ts', 'utf8');
const insuranceProfiles = fs.readFileSync('src/data/local-home-insurance.ts', 'utf8');
const insuranceRoute = fs.readFileSync('src/routes/texas-home-insurance-calculator_.$location.tsx', 'utf8');
const calculatorPage = fs.readFileSync('src/components/calculators/CalculatorPage.tsx', 'utf8');
const selector = fs.readFileSync('src/components/calculators/ConsolidatedLocationSelector.tsx', 'utf8');
const sitemapDependencies = fs.readFileSync('src/data/sitemap-dependencies.server.ts', 'utf8');

const failures = [];
const governedLocations = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueLocations = new Set(governedLocations);

if (governedLocations.length !== 19 || uniqueLocations.size !== 19) {
  failures.push(`Home-insurance local-context registry must stay aligned with 19 governed housing locations; found ${governedLocations.length} literal profiles and ${uniqueLocations.size} unique slugs.`);
}

for (const marker of [
  'LOCAL_HOME_AFFORDABILITY_PROFILES.map(toInsuranceProfile)',
  'LOCAL_HOME_INSURANCE_PROFILES',
  'LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG',
  'does not assign a city or county average premium',
  'without entering personal information',
  'Actual premiums require property-specific insurer underwriting and quoting.',
]) {
  if (!insuranceProfiles.includes(marker)) failures.push(`Local home-insurance context contract missing ${marker}`);
}

for (const marker of [
  "createFileRoute('/texas-home-insurance-calculator/$location')",
  'LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG.has(params.location)',
  'notFound()',
  'redirect({ href: `/texas-home-insurance-calculator#${params.location}`, statusCode: 301 })',
]) {
  if (!insuranceRoute.includes(marker)) failures.push(`Retired local home-insurance route missing redirect/fail-closed marker ${marker}`);
}

for (const marker of [
  'ConsolidatedLocationSelector',
  '<ConsolidatedLocationSelector />',
]) {
  if (!calculatorPage.includes(marker)) failures.push(`Canonical calculator shell missing ${marker}`);
}

for (const marker of [
  "'/texas-home-insurance-calculator':",
  'LOCAL_HOME_INSURANCE_PROFILES.map',
  'Local insurance context',
  'one authoritative calculator page',
  'window.location.hash',
]) {
  if (!selector.includes(marker)) failures.push(`Consolidated home-insurance selector missing ${marker}`);
}

if (!sitemapDependencies.includes('"/texas-home-insurance-calculator/"')) {
  failures.push('Sitemap indexability filter must exclude retired local home-insurance URL prefixes.');
}

if (failures.length) {
  console.error('Consolidated home-insurance authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Consolidated home-insurance authority validation passed: ${uniqueLocations.size} local contexts are preserved in one canonical calculator and legacy location URLs are permanent redirects.`);
