import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const failures = [];

const publicRoutes = read('src/lib/public-routes.ts');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const propertyProfiles = read('src/data/local-property-tax-calculators.ts');
const affordabilityProfiles = read('src/data/local-home-affordability.ts');
const ownershipProfiles = read('src/data/local-homeownership-cost.ts');
const insuranceProfiles = read('src/data/local-home-insurance.ts');
const mortgageProfiles = read('src/data/local-mortgage.ts');
const buyerRoute = read('src/routes/buying-a-home-in-texas.tsx');
const buyerPage = read('src/routes/buying-a-home-in-texas.lazy.tsx');
const productionVerifier = read('scripts/ci/verify-housing-index-surfaces.mjs');
const productionWorkflow = read('.github/workflows/verify-housing-index-surfaces.yml');

const dynamicRoutes = [
  ['property tax', 'src/routes/property-tax-calculator.$location.tsx', "/property-tax-calculator/$location"],
  ['affordability', 'src/routes/texas-home-affordability-calculator_.$location.tsx', "/texas-home-affordability-calculator/$location"],
  ['homeownership cost', 'src/routes/texas-homeownership-cost-calculator_.$location.tsx', "/texas-homeownership-cost-calculator/$location"],
  ['home insurance', 'src/routes/texas-home-insurance-calculator_.$location.tsx', "/texas-home-insurance-calculator/$location"],
  ['mortgage', 'src/routes/texas-mortgage-calculator_.$location.tsx', "/texas-mortgage-calculator/$location"],
];

for (const [label, path, routeId] of dynamicRoutes) {
  const source = read(path);
  if (!source.includes(`createFileRoute('${routeId}')`) && !source.includes(`createFileRoute(\"${routeId}\")`)) {
    failures.push(`${label} dynamic route must retain canonical route id ${routeId}`);
  }
  if (!source.includes('notFound()')) failures.push(`${label} dynamic route must fail closed for unknown slugs with notFound().`);
  if (!source.includes('loaderData') || !source.includes('.head')) failures.push(`${label} dynamic route must return loader-provided SEO head metadata.`);
}

const propertyPaths = [...propertyProfiles.matchAll(/path:\s*'\/property-tax-calculator\/([^']+)'/g)].map((match) => match[1]);
const affordabilitySlugs = [...affordabilityProfiles.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const uniqueProperty = new Set(propertyPaths);
const uniqueAffordability = new Set(affordabilitySlugs);
if (propertyPaths.length !== 15 || uniqueProperty.size !== 15) failures.push(`Expected exactly 15 governed local property-tax calculator profiles; found ${propertyPaths.length} definitions / ${uniqueProperty.size} unique.`);
if (affordabilitySlugs.length !== 19 || uniqueAffordability.size !== 19) failures.push(`Expected exactly 19 governed affordability locations; found ${affordabilitySlugs.length} definitions / ${uniqueAffordability.size} unique.`);

for (const [label, source, registry] of [
  ['homeownership cost', ownershipProfiles, 'LOCAL_HOME_AFFORDABILITY_PROFILES.map'],
  ['home insurance', insuranceProfiles, 'LOCAL_HOME_AFFORDABILITY_PROFILES.map'],
  ['mortgage', mortgageProfiles, 'LOCAL_HOME_AFFORDABILITY_PROFILES.map'],
]) {
  if (!source.includes(registry)) failures.push(`${label} locality inventory must remain derived from the governed affordability registry.`);
}

const sitemapContracts = [
  ['property tax', 'LOCAL_PROPERTY_TAX_PROFILES', 'profile.path'],
  ['affordability', 'LOCAL_HOME_AFFORDABILITY_PROFILES', 'profile.path'],
  ['homeownership cost', 'LOCAL_HOMEOWNERSHIP_COST_PROFILES', 'profile.ownershipPath'],
  ['home insurance', 'LOCAL_HOME_INSURANCE_PROFILES', 'profile.insurancePath'],
  ['mortgage', 'LOCAL_MORTGAGE_PROFILES', 'profile.mortgagePath'],
];
for (const [label, registry, field] of sitemapContracts) {
  if (!sitemap.includes(registry) || !sitemap.includes(field)) failures.push(`Primary sitemap must emit the governed ${label} registry using ${field}.`);
}
if (!sitemap.includes('isIndexablePublicPath(entry.path)')) failures.push('Primary sitemap must keep the shared public indexability filter.');
if (!sitemap.includes('isTexasDefinedOwnedStaticPath(entry.path)')) failures.push('Primary sitemap must keep TexasDefined route-ownership filtering.');

if (!publicRoutes.split('export const REDIRECT_ONLY_PATHS')[0].includes('"/buying-a-home-in-texas"')) failures.push('/buying-a-home-in-texas must remain in INDEXABLE_STATIC_PATHS.');
const suppressionSection = publicRoutes.slice(publicRoutes.indexOf('export const REDIRECT_ONLY_PATHS'));
for (const path of ['/buying-a-home-in-texas', '/texas-home-affordability-calculator', '/texas-homeownership-cost-calculator', '/texas-home-insurance-calculator', '/texas-mortgage-calculator', '/property-tax-calculator']) {
  if (suppressionSection.includes(`\"${path}\"`)) failures.push(`${path} must not be classified as redirect-only/noindex.`);
}
for (const prefix of ['"/admin"', '"/api/"']) {
  if (!publicRoutes.includes(prefix)) failures.push(`Existing technical noindex prefix ${prefix} must remain governed.`);
}

for (const marker of [
  "createFileRoute('/buying-a-home-in-texas')",
  'loaderData?.head',
]) {
  if (!buyerRoute.includes(marker)) failures.push(`Texas homebuyer route missing ${marker}.`);
}
for (const marker of ['nine-step', 'property taxes', 'homeowners insurance', 'closing']) {
  if (!buyerPage.toLowerCase().includes(marker)) failures.push(`Texas homebuyer journey missing visible planning concept: ${marker}.`);
}

for (const marker of [
  "const origin = 'https://texasdefined.com'",
  'canonical === item.url',
  'sitemap.includes(url)',
  'hasNoindex(html)',
  "'WebApplication'",
  "'FAQPage'",
  "'HowTo'",
  'invalid-slug-phase10',
  'response.status === 404',
  '92 governed housing URLs',
]) {
  if (!productionVerifier.includes(marker)) failures.push(`Phase 10 production verifier missing contract marker: ${marker}`);
}
for (const family of ['property-tax-calculator', 'texas-home-affordability-calculator', 'texas-homeownership-cost-calculator', 'texas-home-insurance-calculator', 'texas-mortgage-calculator', 'buying-a-home-in-texas']) {
  if (!productionVerifier.includes(family)) failures.push(`Phase 10 production verifier does not cover ${family}.`);
}
for (const marker of ['pull_request:', 'push:', 'branches:', 'main', 'Validate Phase 10 housing index contract', 'Verify 92 live housing planning URLs']) {
  if (!productionWorkflow.includes(marker)) failures.push(`Phase 10 production workflow missing ${marker}.`);
}

if (failures.length) {
  console.error('Phase 10 housing index-suppression validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Phase 10 housing index-suppression contract passed: ${uniqueProperty.size} property-tax pages, ${uniqueAffordability.size} shared housing locations across four local planning families, and the statewide homebuyer journey remain crawlable, canonical, sitemap-governed and fail-closed for unknown slugs.`);
