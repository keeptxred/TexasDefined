import fs from 'node:fs';

const seeds = fs.readFileSync('src/data/historic-sites.ts', 'utf8');
const primary = fs.readFileSync('src/data/historic-site-enrichment.ts', 'utf8');
const extra = fs.readFileSync('src/data/historic-site-area-guides-extra.ts', 'utf8');
const remoteHeroes = fs.readFileSync('src/data/historic-site-remote-heroes.ts', 'utf8');
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

for (const marker of ['historicSiteDestinations', 'export const preservedExploreDestinations = mergePreservedDestinations(']) if (!preserved.includes(marker)) failures.push(`Preserved historic-site catalog contract missing: ${marker}`);
for (const marker of ['enrichHistoricSiteCatalog','enrichHistoricSiteDestination','enrichRemainingHistoricSiteAreaGuide','enrichHistoricSiteRemoteHero','enrichHistoricSiteCatalog(curated).map(enrichRemainingHistoricSiteAreaGuide).map(enrichHistoricSiteRemoteHero)']) if (!runtime.includes(marker)) failures.push(`Historic-site runtime enrichment contract missing: ${marker}`);
for (const marker of ['destinationsQuery({ category: "historic-sites" })','historicSiteClusters','/explore/$category']) if (!history.includes(marker)) failures.push(`Texas History historic-site discovery contract missing: ${marker}`);
for (const marker of ["destinationsQuery({ category: 'historic-sites' })",'Historic places in this county','/explore/historic-sites','/texas-history']) if (!county.includes(marker)) failures.push(`County historic-site discovery contract missing: ${marker}`);

const exactHeroAliases = ['barrington-living-history-farm','fanthorp-inn','kreische-brewery','monument-hill','san-jacinto-battleground','washington-on-the-brazos'];
for (const slug of exactHeroAliases) if (!primary.includes(`"${slug}"`)) failures.push(`Expected exact historic hero alias is missing: ${slug}.`);

const verifiedRemoteHeroes = [
  ['bush-family-home', 'CC BY-SA 3.0'],
  ['caddo-mounds-state-historic-site', 'CC BY-SA 3.0'],
  ['casa-navarro', 'CC BY-SA 3.0'],
  ['confederate-reunion-grounds', 'CC BY-SA 3.0'],
  ['eisenhower-birthplace', 'CC BY 2.0'],
  ['fannin-battleground', 'Public domain'],
  ['first-capitol-of-texas', 'no known copyright restrictions'],
  ['fort-griffin', 'CC BY-SA 3.0'],
  ['fort-lancaster', 'Public domain'],
  ['fort-martin-scott', 'CC BY 4.0'],
  ['fort-mckavett', 'CC0'],
  ['french-legation', 'CC BY 4.0'],
  ['fulton-mansion', 'CC BY 4.0'],
  ['goodnight-ranch', 'CC BY-SA 4.0'],
  ['iwo-jima-museum-monument', 'CC BY-SA 4.0'],
  ['landmark-inn', 'CC BY 4.0'],
  ['levi-jordan-plantation', 'CC BY 4.0'],
  ['magoffin-home', 'CC BY 4.0'],
  ['mission-dolores', 'CC BY-SA 4.0'],
  ['national-museum-pacific-war', 'CC BY-SA 4.0'],
  ['official-state-texas-longhorn-herd', 'Public domain'],
  ['old-socorro-mission', 'Public domain'],
  ['palmito-ranch-battlefield', 'CC BY-SA 3.0'],
  ['port-isabel-lighthouse', 'CC BY-SA 4.0'],
  ['presidio-la-bahia', 'CC BY-SA 4.0'],
  ['sabine-pass-battleground', 'CC BY-SA 4.0'],
  ['sam-bell-maxey-house', 'CC BY-SA 3.0'],
  ['sam-rayburn-house', 'CC BY 2.0'],
  ['san-felipe-de-austin', 'CC BY 4.0'],
  ['star-of-the-republic-museum', 'CC BY 4.0'],
  ['starr-family-home', 'CC BY 2.0'],
  ['varner-hogg-plantation', 'CC BY 2.0'],
  ['zaragoza-birthplace', 'CC BY-SA 2.0'],
];
for (const [slug, license] of verifiedRemoteHeroes) {
  if (!remoteHeroes.includes(`"${slug}"`)) failures.push(`Verified historic remote hero is missing: ${slug}.`);
  if (!remoteHeroes.includes(license)) failures.push(`Verified historic remote hero license marker is missing: ${slug} (${license}).`);
}
if (!remoteHeroes.includes('enrichHistoricSiteRemoteHero')) failures.push('Verified historic remote heroes are not exposed through the runtime enrichment function.');

if (failures.length) { console.error('Historic-sites validation failed:'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log(`Historic-sites validation passed: ${seedSlugs.length} statewide seeds, ${guideSlugs.size} destination-specific area guides, ${exactHeroAliases.length + verifiedRemoteHeroes.length} exact verified hero mappings, shared preserved-catalog publication, Texas History discovery and county cross-links are protected.`);