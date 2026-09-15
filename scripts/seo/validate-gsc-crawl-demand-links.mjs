import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const propertyHub = read('src/routes/property.tsx');
const fredericksburgGuide = read('src/data/fixtures/fredericksburg-history-weekend-guide.ts');
const campingGuide = read('src/routes/best-places-to-go-camping-in-texas.lazy.tsx');
const serverEntry = read('src/server-entry.ts');
const localHousingHubServer = read('src/data/homeownership-cost-hub-page.server.ts');
const localHousingHub = read('src/routes/texas-homeownership-cost-calculator.lazy.tsx');
const failures = [];

const propertyTargets = [
  '/texas-property-tax-estimator#bexar-county',
  '/texas-property-tax-estimator#fort-bend-county',
  '/texas-property-tax-estimator#montgomery-county',
  '/texas-property-tax-estimator#williamson-county',
  '/texas-property-tax-estimator#hidalgo-county',
  '/texas-mortgage-calculator#houston',
  '/texas-home-affordability-calculator#houston',
  '/texas-home-insurance-calculator#houston',
];

for (const target of propertyTargets) {
  if (!propertyHub.includes(target)) failures.push(`Property authority hub lost direct consolidated crawl-demand link to ${target}.`);
}

if (!propertyHub.includes('const localPlanning = [')) {
  failures.push('Property authority hub lost the user-facing local planning section.');
}

const localHousingSlugs = [
  'houston',
  'austin',
  'dallas',
  'fort-worth',
  'san-antonio',
  'frisco',
  'el-paso',
  'harris-county',
  'dallas-county',
  'tarrant-county',
  'bexar-county',
  'travis-county',
  'collin-county',
  'denton-county',
  'fort-bend-county',
  'montgomery-county',
  'williamson-county',
  'el-paso-county',
  'hidalgo-county',
];

for (const slug of localHousingSlugs) {
  if (!localHousingHubServer.includes(`slug: '${slug}'`)) {
    failures.push(`Server-backed local housing directory lost governed location ${slug}.`);
  }
}

for (const marker of [
  'ownershipHref: `/texas-homeownership-cost-calculator#${slug}`',
  'affordabilityHref: `/texas-home-affordability-calculator#${slug}`',
  'insuranceHref: `/texas-home-insurance-calculator#${slug}`',
  'mortgageHref: `/texas-mortgage-calculator#${slug}`',
]) {
  if (!localHousingHubServer.includes(marker)) {
    failures.push(`Server-backed local housing directory lost consolidated crawl-path template ${marker}.`);
  }
}

for (const marker of [
  'card.ownershipHref',
  'card.affordabilityHref',
  'card.insuranceHref',
  'card.mortgageHref',
]) {
  if (!localHousingHub.includes(marker)) {
    failures.push(`Local housing hub no longer renders direct consolidated links via ${marker}.`);
  }
}

if (!fredericksburgGuide.includes('href: "/destination/fredericksburg"')) {
  failures.push('Fredericksburg history guide must link to the canonical Fredericksburg destination guide.');
}
if (!fredericksburgGuide.includes('relatedDestinations: ["fredericksburg"')) {
  failures.push('Fredericksburg history guide must preserve the destination relationship signal.');
}

if (!campingGuide.includes('to: "/destination/garner-state-park"')) {
  failures.push('Statewide camping guide must retain a direct Garner State Park destination link.');
}

const legacyPitmastersSlug = 'live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp';
const canonicalPitmastersPath = '/article/texas-pitmasters-food-network-competition';
if (!serverEntry.includes(legacyPitmastersSlug) || !serverEntry.includes(canonicalPitmastersPath)) {
  failures.push('Known GSC consolidation candidate must retain its canonical redirect mapping.');
}

if (failures.length) {
  console.error('GSC crawl-demand link validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`GSC crawl-demand links protected: ${propertyTargets.length} priority canonical property-tool selections plus ${localHousingSlugs.length * 4} consolidated local housing selections, Fredericksburg and Garner destination paths, and the known Pitmasters consolidation redirect.`);
