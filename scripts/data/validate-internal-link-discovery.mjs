import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const registry = read('src/lib/public-routes.ts');
const exploreDiscovery = read('src/components/editorial/ExploreDiscovery.tsx');
const texasLifeDiscovery = read('src/components/editorial/TexasLifeDiscovery.tsx');
const categoryPage = read('src/components/editorial/CategoryPage.tsx');
const calculatorPage = read('src/components/calculators/CalculatorPage.tsx');
const destinationPlanner = read('src/components/editorial/DestinationVisitPlanner.tsx');
const countyIdentity = read('src/components/content/CountyIdentitySection.tsx');
const guidesPage = read('src/routes/guides.tsx');
const exploreSitemap = read('src/routes/sitemap-explore[.]xml.ts');

for (const path of ['/property', '/explore/trip-planner']) {
  const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];
  if (!indexableSection.includes(`"${path}"`)) failures.push(`${path} must remain an indexable static route.`);
}

for (const target of ['/explore/trip-planner', '/browse/cities', '/events']) {
  if (!exploreDiscovery.includes(`to="${target}"`)) failures.push(`Explore discovery must link to ${target}.`);
}

for (const target of ['/property', '/decide/financial-tools', '/browse/cities', '/moving-to-texas', '/real-estate', '/texas-explained']) {
  if (!texasLifeDiscovery.includes(`to: "${target}"`)) failures.push(`Texas Life discovery must link to ${target}.`);
}

for (const target of ['/decide/financial-tools', '/property', '/browse/counties', '/moving-to-texas', '/browse/cities']) {
  if (!calculatorPage.includes(`to="${target}"`)) failures.push(`Calculator pages must link to ${target}.`);
}

for (const token of ['to="/explore/$category"', '/explore/trip-planner?destination=', 'to="/explore"', 'to="/browse/cities"']) {
  if (!destinationPlanner.includes(token)) failures.push(`Destination planning pathways are missing ${token}.`);
}

for (const marker of [
  'const regionalExplainers:',
  '/article/texas-rivers-explained',
  '/article/texas-lakes-reservoirs-explained',
  '/article/texas-farm-to-market-roads-explained',
  '/article/texas-wildflowers-guide',
  '/article/texas-trees-guide',
  '/article/texas-home-architecture-regions',
  '/article/buying-land-in-texas-guide',
  '/article/texas-wildlife-guide',
  '/article/texas-cultural-regions-explained',
  '/article/why-texas-has-254-counties',
  'Understand the bigger picture',
  'href="/texas-explained"',
]) {
  if (!countyIdentity.includes(marker)) failures.push(`County → Texas Explained discovery contract is missing ${marker}.`);
}

for (const marker of [
  'to: "/texas-explained"',
  'label: "Texas Explained"',
  'Ten connected evergreen guides to why Texas works the way it does.',
  'Start with Texas Explained for the why behind the state',
]) {
  if (!guidesPage.includes(marker)) failures.push(`Guidebook → Texas Explained discovery contract is missing ${marker}.`);
}

if (!categoryPage.includes('TexasLifeDiscovery')) failures.push('Texas Life category pages must render TexasLifeDiscovery.');
if (!categoryPage.includes('belongsToTexasLife && <TexasLifeDiscovery')) failures.push('TexasLifeDiscovery must be limited to Texas Life category surfaces.');
if (!exploreSitemap.includes('"/explore/trip-planner"')) failures.push('Explore sitemap must publish the Trip Planner.');

if (failures.length) {
  console.error('Internal-link discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Internal-link discovery pathways, Texas Explained links from Texas Life, county profiles and the Guidebook, calculator/destination cross-links and Explore sitemap coverage are protected.');
