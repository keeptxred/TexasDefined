import fs from 'node:fs';

const affordabilityProfiles = fs.readFileSync('src/data/local-home-affordability.ts', 'utf8');
const insuranceProfiles = fs.readFileSync('src/data/local-home-insurance.ts', 'utf8');
const insuranceHub = fs.readFileSync('src/routes/texas-home-insurance-calculator.lazy.tsx', 'utf8');
const insurancePage = fs.readFileSync('src/components/calculators/LocalHomeInsurancePage.tsx', 'utf8');
const insuranceRoute = fs.readFileSync('src/routes/texas-home-insurance-calculator_.$location.tsx', 'utf8');
const insuranceLazyRoute = fs.readFileSync('src/routes/texas-home-insurance-calculator_.$location.lazy.tsx', 'utf8');
const insuranceServer = fs.readFileSync('src/data/local-home-insurance-page.server.ts', 'utf8');
const insuranceServerFn = fs.readFileSync('src/data/local-home-insurance-page.ts', 'utf8');
const ownershipPage = fs.readFileSync('src/components/calculators/LocalHomeownershipCostPage.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');

const failures = [];
const governedLocations = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueLocations = new Set(governedLocations);
if (governedLocations.length !== 19 || uniqueLocations.size !== 19) {
  failures.push(`Local insurance authority must stay aligned with the 19 governed affordability locations; found ${governedLocations.length} literal profiles and ${uniqueLocations.size} unique slugs.`);
}

for (const marker of [
  'LOCAL_HOME_AFFORDABILITY_PROFILES.map(toInsuranceProfile)',
  'LOCAL_HOME_INSURANCE_PROFILES',
  'LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG',
  'insurancePath = `/texas-home-insurance-calculator/${profile.slug}`',
  'does not assign a city or county average premium',
  'without entering personal information',
  'Actual premiums require property-specific insurer underwriting and quoting.',
]) {
  if (!insuranceProfiles.includes(marker)) failures.push(`Local home-insurance profile contract missing ${marker}`);
}

const cityLocations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];
for (const slug of cityLocations) {
  const path = `/texas-home-insurance-calculator/${slug}`;
  if (!insuranceHub.includes(path)) failures.push(`Statewide home-insurance hub missing crawlable city link to ${path}`);
}
for (const marker of [
  'Local planning context',
  'without inventing a city-average premium',
  'Local insurance planning calculator →',
]) {
  if (!insuranceHub.includes(marker)) failures.push(`Statewide home-insurance hub local discovery contract missing ${marker}`);
}

for (const marker of [
  "createFileRoute('/texas-home-insurance-calculator/$location')",
  'getLocalHomeInsurancePage',
  'notFound()',
  'loaderData?.page.head',
]) {
  if (!insuranceRoute.includes(marker)) failures.push(`Local home-insurance route missing ${marker}`);
}
for (const marker of [
  "createLazyFileRoute('/texas-home-insurance-calculator/$location')",
  'LocalHomeInsurancePage',
  'page.profile',
]) {
  if (!insuranceLazyRoute.includes(marker)) failures.push(`Local home-insurance lazy route missing ${marker}`);
}
for (const marker of [
  'HomeInsuranceCalculator',
  'profile.insurancePlanningPoints',
  'No local-average shortcut',
  'profile.propertyTaxHref',
  'affordabilityPath',
  'ownershipPath',
  'profile.relocationHref',
  'https://www.tdi.texas.gov/CONSUMER/home-insurance.html',
  'https://www.helpinsure.com/residential.html',
  'no-personal-information planning calculator',
]) {
  if (!insurancePage.includes(marker)) failures.push(`Local home-insurance UI missing ${marker}`);
}
for (const marker of [
  "'@type': 'WebApplication'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'FAQPage'",
  'canonicalLink(texasDefinedBrand, profile.insurancePath)',
  'buildMeta(texasDefinedBrand',
  'LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG',
]) {
  if (!insuranceServer.includes(marker)) failures.push(`Local home-insurance server head missing ${marker}`);
}
for (const marker of ['createServerFn', "import('./local-home-insurance-page.server')"]) {
  if (!insuranceServerFn.includes(marker)) failures.push(`Local home-insurance server boundary missing ${marker}`);
}

for (const marker of [
  'const insurancePath = `/texas-home-insurance-calculator/${profile.slug}`',
  'title: `${profile.name} home-insurance calculator`',
]) {
  if (!ownershipPage.includes(marker)) failures.push(`Local ownership-to-insurance discovery missing ${marker}`);
}
if (!sitemap.includes('LOCAL_HOME_INSURANCE_PROFILES')) failures.push('Primary sitemap must import the governed local home-insurance registry.');
if (!sitemap.includes('...LOCAL_HOME_INSURANCE_PROFILES.map((profile) => ({ path: profile.insurancePath')) failures.push('Primary sitemap must emit every governed local home-insurance page.');

if (insuranceProfiles.includes('average premium') && !insuranceProfiles.includes('does not assign a city or county average premium')) {
  failures.push('Local home-insurance profiles must not publish unsupported average premiums.');
}
if (insuranceServer.includes("'@type': 'FinancialProduct'") || insuranceServer.includes("'@type': 'Offer'")) {
  failures.push('Local home-insurance calculators must not claim FinancialProduct or Offer schema.');
}

if (failures.length) {
  console.error('Local home-insurance SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Local home-insurance authority validation passed for ${uniqueLocations.size} aligned city/county planning pages.`);
