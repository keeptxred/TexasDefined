import './validate-calculator-app-seo.mjs';
import fs from 'node:fs';

const route = fs.readFileSync('src/routes/decide.financial-tools.tsx', 'utf8');
const propertyHub = fs.readFileSync('src/routes/property-tax-calculators.tsx', 'utf8');
const localProfiles = fs.readFileSync('src/data/local-property-tax-calculators.ts', 'utf8');
const localPage = fs.readFileSync('src/components/property/LocalPropertyTaxCalculatorPage.tsx', 'utf8');
const localRoute = fs.readFileSync('src/routes/property-tax-calculator.$location.tsx', 'utf8');
const localLazyRoute = fs.readFileSync('src/routes/property-tax-calculator.$location.lazy.tsx', 'utf8');
const localServer = fs.readFileSync('src/data/local-property-tax-calculator-page.server.ts', 'utf8');
const localServerFn = fs.readFileSync('src/data/local-property-tax-calculator-page.ts', 'utf8');
const affordabilityHub = fs.readFileSync('src/routes/texas-home-affordability-calculator.lazy.tsx', 'utf8');
const affordabilityProfiles = fs.readFileSync('src/data/local-home-affordability.ts', 'utf8');
const affordabilityPage = fs.readFileSync('src/components/calculators/LocalHomeAffordabilityPage.tsx', 'utf8');
const affordabilityRoute = fs.readFileSync('src/routes/texas-home-affordability-calculator_.$location.tsx', 'utf8');
const affordabilityLazyRoute = fs.readFileSync('src/routes/texas-home-affordability-calculator_.$location.lazy.tsx', 'utf8');
const affordabilityServer = fs.readFileSync('src/data/local-home-affordability-page.server.ts', 'utf8');
const affordabilityServerFn = fs.readFileSync('src/data/local-home-affordability-page.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const movingHub = fs.readFileSync('src/routes/moving-to-texas.lazy.tsx', 'utf8');
const homestead = fs.readFileSync('src/routes/texas-homestead-savings-calculator.tsx', 'utf8');

const required = [
  "'@type': 'CollectionPage'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'ItemList'",
  "mainEntity: { '@id': `${hubUrl}#tools` }",
  "absoluteUrl(texasDefinedBrand, path)",
];

const failures = required
  .filter((feature) => !route.includes(feature))
  .map((feature) => `Financial tools route missing ${feature}`);

if (route.includes("'@type': 'FinancialProduct'")) failures.push('Financial tools hub must not claim FinancialProduct entities.');
if (route.includes("'@type': 'Offer'")) failures.push('Financial tools hub must not claim Offer data.');

const cityPaths = [
  '/property-tax-calculator/houston',
  '/property-tax-calculator/austin',
  '/property-tax-calculator/frisco',
];
const countyPaths = [
  '/property-tax-calculator/harris-county',
  '/property-tax-calculator/dallas-county',
  '/property-tax-calculator/tarrant-county',
  '/property-tax-calculator/bexar-county',
  '/property-tax-calculator/travis-county',
  '/property-tax-calculator/collin-county',
  '/property-tax-calculator/denton-county',
  '/property-tax-calculator/fort-bend-county',
  '/property-tax-calculator/montgomery-county',
  '/property-tax-calculator/williamson-county',
  '/property-tax-calculator/el-paso-county',
  '/property-tax-calculator/hidalgo-county',
];
const requiredLocalPaths = [...cityPaths, ...countyPaths];

const profilePaths = [...localProfiles.matchAll(/path:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueProfilePaths = new Set(profilePaths);
if (profilePaths.length !== requiredLocalPaths.length || uniqueProfilePaths.size !== requiredLocalPaths.length) {
  failures.push(`Local property-tax profile registry must contain exactly ${requiredLocalPaths.length} unique paths; found ${profilePaths.length} definitions and ${uniqueProfilePaths.size} unique paths.`);
}
for (const path of requiredLocalPaths) {
  if (!uniqueProfilePaths.has(path)) failures.push(`Local property-tax profile registry missing ${path}`);
  if (!propertyHub.includes(path)) failures.push(`Property-tax calculator hub missing crawlable link to ${path}`);
}

for (const marker of [
  'function countyProfile(',
  'defaultCountySlug: countySlug',
  'counties: [{ name, slug: countySlug }]',
  'The county rate is only one part of a Texas property-tax bill',
  'Add MUD, ESD, community-college and other special districts only when appraisal or tax records confirm parcel membership.',
]) {
  if (!localProfiles.includes(marker)) failures.push(`Major-county calculator profile contract missing ${marker}`);
}
for (const marker of ['const countyTools = [', 'Major county calculators', 'Build an address-level scenario in a major Texas county']) {
  if (!propertyHub.includes(marker)) failures.push(`Property-tax calculator hub major-county discovery contract missing ${marker}`);
}

for (const marker of [
  "createFileRoute('/property-tax-calculator/$location')",
  'getLocalPropertyTaxCalculatorPage',
  'notFound()',
  'loaderData?.page.head',
]) {
  if (!localRoute.includes(marker)) failures.push(`Local property-tax route missing ${marker}`);
}
for (const marker of [
  "createLazyFileRoute('/property-tax-calculator/$location')",
  'LocalPropertyTaxCalculatorPage',
  'page.profile',
]) {
  if (!localLazyRoute.includes(marker)) failures.push(`Local property-tax lazy route missing ${marker}`);
}
for (const marker of [
  'OfficialTaxRateAssist',
  'CountySelector',
  'CalculatorCountyLink',
  'CitationTrustPanel',
  "profile.faqs.map",
  'parcel',
  'taxing-unit',
]) {
  if (!localPage.includes(marker)) failures.push(`Local property-tax calculator UI missing ${marker}`);
}
for (const marker of [
  "'@type': 'WebApplication'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'FAQPage'",
  'canonicalLink(texasDefinedBrand, profile.path)',
  'buildMeta(texasDefinedBrand',
  'LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG',
]) {
  if (!localServer.includes(marker)) failures.push(`Local property-tax server head missing ${marker}`);
}
for (const marker of ['createServerFn', "import('./local-property-tax-calculator-page.server')"]) {
  if (!localServerFn.includes(marker)) failures.push(`Local property-tax server boundary missing ${marker}`);
}
if (!sitemap.includes('LOCAL_PROPERTY_TAX_PROFILES')) failures.push('Primary sitemap must import the governed local property-tax profile registry.');
if (!sitemap.includes('...LOCAL_PROPERTY_TAX_PROFILES.map((profile) => ({ path: profile.path')) failures.push('Primary sitemap must emit each local property-tax calculator profile.');

for (const path of cityPaths) {
  if (!movingHub.includes(path)) failures.push(`Moving-to-Texas hub missing local property-tax discovery link to ${path}`);
}

const affordabilityLocations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];
const affordabilityPaths = affordabilityLocations.map((slug) => `/texas-home-affordability-calculator/${slug}`);
for (const slug of affordabilityLocations) {
  if (!affordabilityProfiles.includes(`slug: '${slug}'`)) failures.push(`Local affordability profile registry missing ${slug}`);
}
for (const path of affordabilityPaths) {
  if (!affordabilityHub.includes(path)) failures.push(`Texas home affordability hub missing crawlable link to ${path}`);
}
for (const marker of [
  'LOCAL_HOME_AFFORDABILITY_PROFILES',
  'LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG',
  'Replace the calculator defaults with the numbers for the exact property you are considering.',
  'Verify the parcel taxing units instead of applying one San Antonio-wide property-tax assumption.',
  'Frisco spans Collin and Denton counties',
]) {
  if (!affordabilityProfiles.includes(marker)) failures.push(`Local affordability profile contract missing ${marker}`);
}
for (const marker of [
  "createFileRoute('/texas-home-affordability-calculator/$location')",
  'getLocalHomeAffordabilityPage',
  'notFound()',
  'loaderData?.page.head',
]) {
  if (!affordabilityRoute.includes(marker)) failures.push(`Local affordability route missing ${marker}`);
}
for (const marker of [
  "createLazyFileRoute('/texas-home-affordability-calculator/$location')",
  'LocalHomeAffordabilityPage',
  'page.profile',
]) {
  if (!affordabilityLazyRoute.includes(marker)) failures.push(`Local affordability lazy route missing ${marker}`);
}
for (const marker of [
  'AffordabilityCalculator',
  'Make the estimate local',
  'profile.propertyTaxHref',
  'profile.relocationHref',
  'profile.faqs.map',
  'planning calculator, not a lending decision',
]) {
  if (!affordabilityPage.includes(marker)) failures.push(`Local affordability calculator UI missing ${marker}`);
}
for (const marker of [
  "'@type': 'WebApplication'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'FAQPage'",
  'canonicalLink(texasDefinedBrand, profile.path)',
  'buildMeta(texasDefinedBrand',
  'LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG',
]) {
  if (!affordabilityServer.includes(marker)) failures.push(`Local affordability server head missing ${marker}`);
}
for (const marker of ['createServerFn', "import('./local-home-affordability-page.server')"]) {
  if (!affordabilityServerFn.includes(marker)) failures.push(`Local affordability server boundary missing ${marker}`);
}
if (!sitemap.includes('LOCAL_HOME_AFFORDABILITY_PROFILES')) failures.push('Primary sitemap must import the governed local home-affordability profile registry.');
if (!sitemap.includes('...LOCAL_HOME_AFFORDABILITY_PROFILES.map((profile) => ({ path: profile.path')) failures.push('Primary sitemap must emit each local home-affordability profile.');
if (!affordabilityHub.includes('Run the affordability check with city-specific ownership context')) failures.push('Texas home affordability hub missing local planning discovery section.');
if (affordabilityProfiles.includes('average home price') || affordabilityProfiles.includes('average property tax rate')) failures.push('Local affordability pages must not publish unsupported city-average home-price or property-tax assumptions.');
if (affordabilityServer.includes("'@type': 'FinancialProduct'") || affordabilityServer.includes("'@type': 'Offer'")) failures.push('Local affordability calculators must not claim FinancialProduct or Offer schema.');

for (const marker of [
  'Texas Homestead Exemption Calculator | Estimate Tax Savings',
  'Texas homestead exemption calculator',
  "name: 'Texas Homestead Exemption Calculator'",
]) {
  if (!homestead.includes(marker)) failures.push(`Homestead calculator missing exact-intent marker ${marker}`);
}

if (localProfiles.includes('average property tax rate') || localProfiles.includes('average combined rate')) {
  failures.push('Local property-tax profiles must not substitute metro/county averages for parcel taxing-unit selection.');
}
if (localServer.includes("'@type': 'FinancialProduct'") || localServer.includes("'@type': 'Offer'")) {
  failures.push('Local property-tax calculators must not claim FinancialProduct or Offer schema.');
}

if (failures.length) {
  console.error('Financial tools SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Financial tools structured-data validation passed, including ${cityPaths.length} city and ${countyPaths.length} major-county local property-tax calculators plus ${affordabilityLocations.length} city home-affordability calculators.`);
