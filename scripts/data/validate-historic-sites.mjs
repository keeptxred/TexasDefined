import fs from 'node:fs';

const seeds = fs.readFileSync('src/data/historic-sites.ts', 'utf8');
const primary = fs.readFileSync('src/data/historic-site-enrichment.ts', 'utf8');
const extra = fs.readFileSync('src/data/historic-site-area-guides-extra.ts', 'utf8');
const runtime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const preserved = fs.readFileSync('src/data/destination-preserved-catalog.ts', 'utf8');
const history = fs.readFileSync('src/routes/texas-history.tsx', 'utf8');
const county = fs.readFileSync('src/components/content/CountyHistoricSites.tsx', 'utf8');
const failures = [];

const seedBlock = seeds.match(/export const historicSiteSeeds:[\s\S]*?= \[([\s\S]*?)\n\];/);
if (!seedBlock) failures.push('Could not parse historicSiteSeeds.');
const seedSlugs = seedBlock ? [...seedBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]) : [];
if (seedSlugs.length !== 43) failures.push(`Expected 43 statewide historic-site seeds; found ${seedSlugs.length}.`);
if (new Set(seedSlugs).size !== seedSlugs.length) failures.push('Historic-site seed slugs must be unique.');

const primaryGuideBlock = primary.match(/const areaSeeds:[\s\S]*?= \{([\s\S]*?)\n\};\n\nfunction areaGuide/);
const extraGuideBlock = extra.match(/const guides:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
if (!primaryGuideBlock) failures.push('Could not parse primary historic-site area-guide map.');
if (!extraGuideBlock) failures.push('Could not parse supplemental historic-site area-guide map.');
const primaryGuideSlugs = primaryGuideBlock ? [...primaryGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const extraGuideSlugs = extraGuideBlock ? [...extraGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const guideSlugs = new Set([...primaryGuideSlugs, ...extraGuideSlugs]);
for (const slug of seedSlugs) if (!guideSlugs.has(slug)) failures.push(`Historic site is missing destination-specific area-guide coverage: ${slug}.`);
for (const slug of guideSlugs) if (!seedSlugs.includes(slug)) failures.push(`Historic area-guide key does not match a statewide historic-site seed: ${slug}.`);

for (const marker of [
  'historicSiteDestinations',
  'export const preservedExploreDestinations = mergePreservedDestinations(',
]) if (!preserved.includes(marker)) failures.push(`Preserved historic-site catalog contract missing: ${marker}`);

for (const marker of [
  'enrichHistoricSiteCatalog',
  'enrichHistoricSiteDestination',
  'enrichRemainingHistoricSiteAreaGuide',
  'enrichHistoricSiteCatalog(curated).map(enrichRemainingHistoricSiteAreaGuide)',
]) if (!runtime.includes(marker)) failures.push(`Historic-site runtime enrichment contract missing: ${marker}`);

for (const marker of [
  'destinationsQuery({ category: "historic-sites" })',
  'historicSiteClusters',
  '/explore/$category',
]) if (!history.includes(marker)) failures.push(`Texas History historic-site discovery contract missing: ${marker}`);

for (const marker of [
  "destinationsQuery({ category: 'historic-sites' })",
  'Historic places in this county',
  '/explore/historic-sites',
  '/texas-history',
]) if (!county.includes(marker)) failures.push(`County historic-site discovery contract missing: ${marker}`);

const exactHeroAliases = [
  'barrington-living-history-farm',
  'fanthorp-inn',
  'kreische-brewery',
  'monument-hill',
  'san-jacinto-battleground',
  'washington-on-the-brazos',
];
for (const slug of exactHeroAliases) if (!primary.includes(`"${slug}"`)) failures.push(`Expected exact historic hero alias is missing: ${slug}.`);

if (failures.length) {
  console.error('Historic-sites validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Historic-sites validation passed: ${seedSlugs.length} statewide seeds, ${guideSlugs.size} destination-specific area guides, six exact existing hero aliases, shared preserved-catalog publication, Texas History discovery and county cross-links are protected.`);
