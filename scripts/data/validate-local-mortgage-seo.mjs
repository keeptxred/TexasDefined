import fs from 'node:fs';

const affordabilityProfiles = fs.readFileSync('src/data/local-home-affordability.ts', 'utf8');
const affordabilityPage = fs.readFileSync('src/components/calculators/LocalHomeAffordabilityPage.tsx', 'utf8');
const ownershipPage = fs.readFileSync('src/components/calculators/LocalHomeownershipCostPage.tsx', 'utf8');
const insurancePage = fs.readFileSync('src/components/calculators/LocalHomeInsurancePage.tsx', 'utf8');
const mortgageProfiles = fs.readFileSync('src/data/local-mortgage.ts', 'utf8');
const mortgageHub = fs.readFileSync('src/routes/texas-mortgage-calculator.lazy.tsx', 'utf8');
const mortgagePage = fs.readFileSync('src/components/calculators/LocalMortgagePage.tsx', 'utf8');
const mortgageCalculator = fs.readFileSync('src/components/calculators/OfficialMortgageCalculator.tsx', 'utf8');
const mortgageRoute = fs.readFileSync('src/routes/texas-mortgage-calculator_.$location.tsx', 'utf8');
const mortgageLazyRoute = fs.readFileSync('src/routes/texas-mortgage-calculator_.$location.lazy.tsx', 'utf8');
const mortgageServer = fs.readFileSync('src/data/local-mortgage-page.server.ts', 'utf8');
const mortgageServerFn = fs.readFileSync('src/data/local-mortgage-page.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');

const failures = [];
const governedLocations = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueLocations = new Set(governedLocations);
if (governedLocations.length !== 19 || uniqueLocations.size !== 19) failures.push(`Local mortgage authority must stay aligned with 19 governed housing locations; found ${governedLocations.length} literal profiles and ${uniqueLocations.size} unique slugs.`);

for (const marker of [
  'LOCAL_HOME_AFFORDABILITY_PROFILES.map(toMortgageProfile)',
  'LOCAL_MORTGAGE_PROFILES',
  'LOCAL_MORTGAGE_PROFILE_BY_SLUG',
  'mortgagePath = `/texas-mortgage-calculator/${profile.slug}`',
  "profile.kind === 'county' ? profile.slug.replace(/-county$/, '') : ''",
  'does not publish a current mortgage rate or imply lender approval',
  'Mortgage pricing depends on the borrower, loan program, market, lender and transaction',
]) {
  if (!mortgageProfiles.includes(marker)) failures.push(`Local mortgage profile contract missing ${marker}`);
}

const cityLocations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];
for (const slug of cityLocations) {
  const path = `/texas-mortgage-calculator/${slug}`;
  if (!mortgageHub.includes(path)) failures.push(`Statewide mortgage hub missing crawlable city link to ${path}`);
}
for (const marker of ['Local payment planning', 'Major-county mortgage pages are also linked from their matching local affordability pages.', 'Local mortgage payment calculator →']) {
  if (!mortgageHub.includes(marker)) failures.push(`Statewide mortgage hub local discovery contract missing ${marker}`);
}

for (const marker of ["createFileRoute('/texas-mortgage-calculator/$location')", 'getLocalMortgagePage', 'notFound()', 'loaderData?.page.head']) if (!mortgageRoute.includes(marker)) failures.push(`Local mortgage route missing ${marker}`);
for (const marker of ["createLazyFileRoute('/texas-mortgage-calculator/$location')", 'LocalMortgagePage', 'page.profile']) if (!mortgageLazyRoute.includes(marker)) failures.push(`Local mortgage lazy route missing ${marker}`);
for (const marker of ['OfficialMortgageCalculator defaultCountySlug={profile.defaultCountySlug}', 'profile.mortgagePlanningPoints', 'profile.propertyTaxHref', 'insurancePath', 'ownershipPath', 'affordabilityPath', 'consumerfinance.gov/owning-a-home/loan-estimate', 'comptroller.texas.gov/taxes/property-tax/rates', 'not a mortgage quote, preapproval, Loan Estimate']) if (!mortgagePage.includes(marker)) failures.push(`Local mortgage UI missing ${marker}`);
for (const marker of ["'@type': 'WebApplication'", "'@type': 'BreadcrumbList'", "'@type': 'FAQPage'", 'canonicalLink(texasDefinedBrand, profile.mortgagePath)', 'LOCAL_MORTGAGE_PROFILE_BY_SLUG']) if (!mortgageServer.includes(marker)) failures.push(`Local mortgage server head missing ${marker}`);
for (const marker of ['createServerFn', "import('./local-mortgage-page.server')"]) if (!mortgageServerFn.includes(marker)) failures.push(`Local mortgage server boundary missing ${marker}`);
for (const marker of ["defaultCountySlug = ''", 'useState(defaultCountySlug)', 'OfficialTaxRateAssist', 'CountySelector']) if (!mortgageCalculator.includes(marker)) failures.push(`Official mortgage calculator local-context support missing ${marker}`);

for (const [source, label] of [[affordabilityPage, 'affordability'], [ownershipPage, 'ownership'], [insurancePage, 'insurance']]) {
  if (!source.includes('const mortgagePath = `/texas-mortgage-calculator/${profile.slug}`')) failures.push(`Local ${label}-to-mortgage discovery is missing the aligned mortgage path.`);
  if (!source.includes('`${profile.name} mortgage payment calculator`')) failures.push(`Local ${label}-to-mortgage discovery is missing the mortgage link title.`);
}

if (!sitemap.includes('LOCAL_MORTGAGE_PROFILES')) failures.push('Primary sitemap must import the governed local mortgage registry.');
if (!sitemap.includes('...LOCAL_MORTGAGE_PROFILES.map((profile) => ({ path: profile.mortgagePath')) failures.push('Primary sitemap must emit every governed local mortgage page.');
if (mortgageProfiles.includes('average mortgage rate')) failures.push('Local mortgage profiles must not publish unsupported average mortgage rates.');
if (mortgageServer.includes("'@type': 'FinancialProduct'") || mortgageServer.includes("'@type': 'Offer'")) failures.push('Local mortgage calculators must not claim FinancialProduct or Offer schema.');

if (failures.length) {
  console.error('Local mortgage SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Local mortgage authority validation passed for ${uniqueLocations.size} aligned city/county payment pages with official tax-rate support and bidirectional housing-funnel links.`);
