import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const comparison = read('src/components/relocation/CityRelocationComparison.tsx');
const cityRoute = read('src/routes/browse.cities.lazy.tsx');
const citySeo = read('src/routes/browse.cities.tsx');
const relocationHub = read('src/routes/moving-to-texas.lazy.tsx');
const relocationData = read('src/data/relocation-authority.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const smoke = read('scripts/ci/verify-production-surfaces.mjs');

for (const requirement of [
  'RELOCATION_METROS',
  'RELOCATION_PLACES',
  'RELOCATION_SOURCES',
  'RELOCATION_SOURCE_VERIFIED',
  'Compare places without a hidden “best city” score',
  'editorial orientation labels—not live home prices',
  'A mailing city can cross county, school, utility, tax, flood and insurance boundaries.',
  'region === ALL || place.region === region',
  'setting === ALL || place.setting === setting',
  'commute === ALL || place.commuteStyle === commute',
  'planningBand === ALL || place.planningBand === planningBand',
  'metro.jobCountJune2026.toLocaleString()',
  '/moving-to-texas#address-research-desk',
  '/moving-to-texas/data',
  '/browse/counties',
  '/texas-cost-of-living-calculator',
  '/texas-salary-comparison-by-city',
  '/texas-homeownership-cost-calculator',
  '/texas-home-insurance-calculator',
  '/texas-utility-cost-calculator',
  'RELOCATION_SOURCES.blsMetro',
  'RELOCATION_SOURCES.tdiInsurance',
  'RELOCATION_SOURCES.teaSchools',
  'RELOCATION_SOURCES.comptrollerProperty',
  'RELOCATION_SOURCES.txdotTraffic',
  'RELOCATION_SOURCES.pucUtilities',
  'RELOCATION_SOURCES.femaFlood',
]) {
  if (!comparison.includes(requirement)) failures.push(`City relocation comparison safeguard missing: ${requirement}.`);
}

for (const guidePath of [
  '/article/moving-to-dallas-fort-worth-guide',
  '/article/moving-to-houston-address-checklist',
  '/article/moving-to-austin-guide',
  '/article/moving-to-san-antonio-guide',
  '/article/moving-to-el-paso-guide',
]) {
  if (!relocationData.includes(`guideHref: \"${guidePath}\"`)) failures.push(`City comparison must retain canonical metro guide ${guidePath}.`);
}

for (const city of [
  'Dallas', 'Fort Worth', 'Frisco', 'Plano', 'McKinney', 'Denton', 'Arlington',
  'Houston', 'Katy', 'Sugar Land', 'The Woodlands', 'Pearland', 'Cypress',
  'Austin', 'Round Rock', 'Georgetown', 'Cedar Park', 'Pflugerville',
  'San Antonio', 'New Braunfels', 'Boerne', 'El Paso', 'Corpus Christi',
  'Lubbock', 'Amarillo', 'Waco', 'College Station', 'Tyler', 'Brownsville', 'McAllen',
]) {
  if (!relocationData.includes(`name: \"${city}\"`)) failures.push(`City comparison research registry must retain ${city}.`);
}

for (const requirement of [
  'CityRelocationComparison',
  '<CityRelocationComparison />',
  'title="How to use the Texas city directory"',
  'does not publish a hidden best-city score',
]) {
  if (!cityRoute.includes(requirement)) failures.push(`Browse-cities authority integration missing: ${requirement}.`);
}

for (const requirement of [
  'title: "Texas Cities & Towns Directory | Browse by County & Region"',
  'Browse Texas cities and towns by county and region',
  'Texas relocation research',
  'canonicalPath: "/browse/cities"',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
]) {
  if (!citySeo.includes(requirement)) failures.push(`Browse-cities SEO safeguard missing: ${requirement}.`);
}

if (!relocationHub.includes('Compare Texas cities & suburbs →')) failures.push('Moving hub must link directly to the city/suburb comparison authority.');
if (!relocationHub.includes('to="/browse/cities"')) failures.push('Moving hub city-comparison link must target /browse/cities.');
if (!publicRoutes.includes('"/browse/cities"')) failures.push('/browse/cities must remain explicitly indexable and sitemap-governed.');

if (!smoke.includes("['relocation-city-comparison', '/browse/cities', 'The Texas city directory']")) {
  failures.push('Production smoke must permanently verify the Texas city/suburb comparison authority.');
}

if (failures.length) {
  console.error('Texas city/suburb relocation comparison validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Texas city/suburb relocation comparison authority is source-backed, non-ranking, indexed, internally linked, CTR-contract preserving and production-smoke protected.');