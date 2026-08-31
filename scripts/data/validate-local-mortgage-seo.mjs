import fs from 'node:fs';

const affordabilityProfiles = fs.readFileSync('src/data/local-home-affordability.ts', 'utf8');
const mortgageProfiles = fs.readFileSync('src/data/local-mortgage.ts', 'utf8');
const mortgageHub = fs.readFileSync('src/routes/texas-mortgage-calculator.lazy.tsx', 'utf8');
const mortgagePage = fs.readFileSync('src/components/calculators/LocalMortgagePage.tsx', 'utf8');
const mortgageRoute = fs.readFileSync('src/routes/texas-mortgage-calculator_.$location.tsx', 'utf8');
const mortgageLazyRoute = fs.readFileSync('src/routes/texas-mortgage-calculator_.$location.lazy.tsx', 'utf8');
const mortgageServer = fs.readFileSync('src/data/local-mortgage-page.server.ts', 'utf8');
const mortgageServerFn = fs.readFileSync('src/data/local-mortgage-page.ts', 'utf8');
const affordabilityPage = fs.readFileSync('src/components/calculators/LocalHomeAffordabilityPage.tsx', 'utf8');
const ownershipPage = fs.readFileSync('src/components/calculators/LocalHomeownershipCostPage.tsx', 'utf8');
const insurancePage = fs.readFileSync('src/components/calculators/LocalHomeInsurancePage.tsx', 'utf8');
const officialCalculator = fs.readFileSync('src/components/calculators/OfficialMortgageCalculator.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');

const failures = [];
const governedLocations = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueLocations = new Set(governedLocations);
if (governedLocations.length !== 19 || uniqueLocations.size !== 19) {
  failures.push(`Local mortgage authority must stay aligned with the 19 governed affordability locations; found ${governedLocations.length} literal profiles and ${uniqueLocations.size} unique slugs.`);
}

for (const marker of [
  'LOCAL_HOME_AFFORDABILITY_PROFILES.map(toMortgageProfile)',
  'LOCAL_MORTGAGE_PROFILES',
  'LOCAL_MORTGAGE_PROFILE_BY_SLUG',
  'mortgagePath = `/texas-mortgage-calculator/${profile.slug}`',
  'official local property-tax rates',
  'does not identify every taxing unit',
  'property-specific insurer quote',
  'The lender Loan Estimate and later transaction documents control',
]) {
  if (!mortgageProfiles.includes(marker)) failures.push(`Local mortgage profile contract missing ${marker}`);
}

const cityLocations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];
for (const slug of cityLocations) {
  const path = `/texas-mortgage-calculator/${slug}`;
  if (!mortgageHub.includes(path)) failures.push(`Statewide mortgage hub missing crawlable city link to ${path}`);
}
for (const marker of [
  'Local payment planning',
  'without publishing a city-average tax rate or insurance premium',
  'Local mortgage payment calculator →',
]) {
  if (!mortgageHub.includes(marker)) failures.push(`Statewide mortgage hub local discovery contract missing ${marker}`);
}

for (const marker of [
  "createFileRoute('/texas-mortgage-calculator/$location')",
  'getLocalMortgagePage',
  'notFound()',
  'loaderData?.page.head',
]) {
  if (!mortgageRoute.includes(marker)) failures.push(`Local mortgage route missing ${marker}`);
}
for (const marker of [
  "createLazyFileRoute('/texas-mortgage-calculator/$location')",
  'LocalMortgagePage',
  'page.profile',
]) {
  if (!mortgageLazyRoute.includes(marker)) failures.push(`Local mortgage lazy route missing ${marker}`);
}
for (const marker of [
  'OfficialMortgageCalculator',
  'profile.mortgagePlanningPoints',
  'Make PITI address-specific',
  'profile.propertyTaxHref',
  'insurancePath',
  'affordabilityPath',
  'ownershipPath',
  'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
  'https://comptroller.texas.gov/taxes/property-tax/rates/',
  'not a lender Loan Estimate',
]) {
  if (!mortgagePage.includes(marker)) failures.push(`Local mortgage UI missing ${marker}`);
}
for (const marker of [
  "'@type': 'WebApplication'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'FAQPage'",
  'canonicalLink(texasDefinedBrand, profile.mortgagePath)',
  'buildMeta(texasDefinedBrand',
  'LOCAL_MORTGAGE_PROFILE_BY_SLUG',
]) {
  if (!mortgageServer.includes(marker)) failures.push(`Local mortgage server head missing ${marker}`);
}
for (const marker of ['createServerFn', "import('./local-mortgage-page.server')"]) {
  if (!mortgageServerFn.includes(marker)) failures.push(`Local mortgage server boundary missing ${marker}`);
}
for (const marker of ['OfficialTaxRateAssist', 'CountySelector', 'propertyTaxRate', 'Annual homeowners insurance']) {
  if (!officialCalculator.includes(marker)) failures.push(`Official mortgage engine missing ${marker}`);
}

for (const [source, label] of [
  [affordabilityPage, 'affordability'],
  [ownershipPage, 'ownership'],
  [insurancePage, 'insurance'],
]) {
  for (const marker of [
    'const mortgagePath = `/texas-mortgage-calculator/${profile.slug}`',
    'title: `${profile.name} mortgage calculator`',
  ]) {
    if (!source.includes(marker)) failures.push(`Local ${label}-to-mortgage discovery missing ${marker}`);
  }
}

if (!sitemap.includes('LOCAL_MORTGAGE_PROFILES')) failures.push('Primary sitemap must import the governed local mortgage registry.');
if (!sitemap.includes('...LOCAL_MORTGAGE_PROFILES.map((profile) => ({ path: profile.mortgagePath')) failures.push('Primary sitemap must emit every governed local mortgage page.');
if (mortgageProfiles.includes('average mortgage rate') || mortgageProfiles.includes('average property tax rate') || mortgageProfiles.includes('average insurance premium')) {
  failures.push('Local mortgage pages must not publish unsupported average mortgage, property-tax or insurance assumptions.');
}
if (mortgageServer.includes("'@type': 'FinancialProduct'") || mortgageServer.includes("'@type': 'Offer'")) {
  failures.push('Local mortgage calculators must not claim FinancialProduct or Offer schema.');
}

if (failures.length) {
  console.error('Local mortgage SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Local mortgage authority validation passed for ${uniqueLocations.size} aligned city/county payment pages with official tax selection and bidirectional housing-funnel links.`);
