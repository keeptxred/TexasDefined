import fs from 'node:fs';

const targets = fs.readFileSync('src/data/property/county-calculator-targets.ts', 'utf8');
const places = fs.readFileSync('src/data/texas-places.ts', 'utf8');
const localProfiles = fs.readFileSync('src/data/local-property-tax-calculators.ts', 'utf8');
const countyHub = fs.readFileSync('src/routes/property-tax.counties.tsx', 'utf8');
const countyDetail = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const estimator = fs.readFileSync('src/routes/texas-property-tax-estimator.tsx', 'utf8');
const localServer = fs.readFileSync('src/data/local-property-tax-calculator-page.server.ts', 'utf8');
const localLazy = fs.readFileSync('src/routes/property-tax-calculator.$location.lazy.tsx', 'utf8');
const localPage = fs.readFileSync('src/components/property/LocalPropertyTaxCalculatorPage.tsx', 'utf8');

const failures = [];

const countyNamesMatch = places.match(/const COUNTY_NAMES = `([^`]+)`\.split\('\|'\);/);
const countyNames = countyNamesMatch ? countyNamesMatch[1].split('|') : [];
if (countyNames.length !== 254) failures.push(`Texas county registry must contain 254 counties; found ${countyNames.length}.`);
if (!places.includes('if (TEXAS_COUNTIES.length !== 254)')) failures.push('Texas county registry must keep its 254-county integrity assertion.');

const localCountyPaths = [...localProfiles.matchAll(/path:\s*'\/property-tax-calculator\/([^']+-county)'/g)].map((match) => match[1]);
const uniqueLocalCountyPaths = new Set(localCountyPaths);
if (localCountyPaths.length !== 12 || uniqueLocalCountyPaths.size !== 12) {
  failures.push(`Expected exactly 12 governed major-county calculator profiles; found ${localCountyPaths.length} definitions and ${uniqueLocalCountyPaths.size} unique paths.`);
}

for (const marker of [
  'LOCAL_PROPERTY_TAX_PROFILES.filter',
  'profile.defaultCountySlug',
  'profile.counties.length === 1',
  "profile.name.endsWith(' County')",
  'MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS',
  'countyPropertyTaxCalculatorTarget',
  "kind: 'local'",
  "kind: 'statewide'",
  '`/texas-property-tax-estimator?county=${encodeURIComponent(normalized)}`',
  'follow: false',
]) {
  if (!targets.includes(marker)) failures.push(`County calculator target contract missing ${marker}`);
}

for (const marker of [
  'useUrlStateDefaults(DEFAULTS)',
  "county:String(initial.county)",
  "county:''",
]) {
  if (!estimator.includes(marker)) failures.push(`Statewide estimator must continue accepting URL county state: ${marker}`);
}

for (const marker of [
  'MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS.map',
  'Dedicated property-tax calculators for 12 major Texas counties',
  'TEXAS_COUNTIES.map',
  'countyPropertyTaxCalculatorTarget(county.slug)',
  'Calculate {county.name} taxes →',
  "rel={calculatorTarget.follow ? undefined : 'nofollow'}",
  'Counties without a verified local property-tax guide still link to their substantive county reference page.',
  'verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
]) {
  if (!countyHub.includes(marker)) failures.push(`County property-tax directory flow missing ${marker}`);
}

for (const marker of [
  'countyPropertyTaxCalculatorTarget(county.slug)',
  'Calculate {county.name} property taxes',
  'Estimate {county.name} taxes →',
  "rel={calculatorTarget.follow ? undefined : 'nofollow'}",
  'texas-homestead-savings-calculator',
  'texas-property-tax-protest-savings-calculator',
  'texas-property-tax-rate-history',
  "robots: indexReady ? undefined : 'noindex, follow'",
  'isCountyPropertyIndexReady(county)',
]) {
  if (!countyDetail.includes(marker)) failures.push(`County property-tax detail flow missing ${marker}`);
}

for (const marker of [
  'getCountyPropertyRecordBySlug(profile.defaultCountySlug)',
  'isCountyPropertyIndexReady(countyRecord)',
  'verifiedCountyGuide',
  '`/property-tax/county/${countyRecord.slug}`',
]) {
  if (!localServer.includes(marker)) failures.push(`Local calculator verified-guide boundary missing ${marker}`);
}
if (!localLazy.includes('verifiedCountyGuide={page.verifiedCountyGuide}')) failures.push('Local calculator lazy route must pass only the server-approved verified county guide.');
for (const marker of [
  'verifiedCountyGuide?: VerifiedCountyGuide',
  'verifiedCountyGuide && state.county === profile.defaultCountySlug',
  'verifiedCountyGuide.href',
  'verifiedCountyGuide.label',
]) {
  if (!localPage.includes(marker)) failures.push(`Local calculator reverse-link contract missing ${marker}`);
}

if (targets.includes('TEXAS_COUNTIES.map') || targets.includes('254 calculator pages')) {
  failures.push('County calculator target helper must not manufacture a 254-page local calculator family.');
}
if (countyHub.includes('/property-tax-calculator/${county.slug}-county')) {
  failures.push('County directory must not synthesize ungoverned local calculator URLs for all counties.');
}

if (failures.length) {
  console.error('County property-tax calculator flow validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`County property-tax calculator flow validation passed: ${countyNames.length} county references, ${localCountyPaths.length} governed major-county calculators, statewide preselection fallback, readiness-aware guide links, and no thin 254-page calculator family.`);
