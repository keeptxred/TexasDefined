import fs from 'node:fs';

const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(file, 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

const seeds = fs.readFileSync('src/data/historic-sites.ts', 'utf8');
const primary = fs.readFileSync('src/data/historic-site-enrichment.ts', 'utf8');
const extra = fs.readFileSync('src/data/historic-site-area-guides-extra.ts', 'utf8');
const nationalCemeteries = fs.readFileSync('src/data/national-cemetery-enrichment.ts', 'utf8');
const remoteHeroes = fs.readFileSync('src/data/historic-site-remote-heroes.ts', 'utf8');
const clusters = fs.readFileSync('src/data/historic-site-clusters.ts', 'utf8');
const corrections = fs.readFileSync('src/data/historic-site-fact-corrections.ts', 'utf8');
const runtime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const preserved = fs.readFileSync('src/data/destination-preserved-catalog.ts', 'utf8');
const history = readRouteSurface('src/routes/texas-history.tsx');
const county = fs.readFileSync('src/components/content/CountyHistoricSites.tsx', 'utf8');
const failures = [];

const seedBlock = seeds.match(/export const historicSiteSeeds:[\s\S]*?= \[([\s\S]*?)\n\];/);
if (!seedBlock) failures.push('Could not parse historicSiteSeeds.');
const seedSlugs = seedBlock ? [...seedBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]) : [];
if (seedSlugs.length !== 46) failures.push(`Expected 46 statewide historic-site seeds; found ${seedSlugs.length}.`);
if (new Set(seedSlugs).size !== seedSlugs.length) failures.push('Historic-site seed slugs must be unique.');

const primaryGuideBlock = primary.match(/const areaSeeds:[\s\S]*?= \{([\s\S]*?)\n\};\n\nfunction areaGuide/);
const extraGuideBlock = extra.match(/const guides:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
const nationalGuideBlock = nationalCemeteries.match(/const nationalCemeteryDetails:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
if (!primaryGuideBlock) failures.push('Could not parse primary historic-site area-guide map.');
if (!extraGuideBlock) failures.push('Could not parse supplemental historic-site area-guide map.');
if (!nationalGuideBlock) failures.push('Could not parse national-cemetery area-guide map.');
const primaryGuideSlugs = primaryGuideBlock ? [...primaryGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const extraGuideSlugs = extraGuideBlock ? [...extraGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const nationalGuideSlugs = nationalGuideBlock ? [...nationalGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const guideSlugs = new Set([...primaryGuideSlugs, ...extraGuideSlugs, ...nationalGuideSlugs]);
for (const slug of seedSlugs) if (!guideSlugs.has(slug)) failures.push(`Historic site is missing destination-specific area-guide coverage: ${slug}.`);
for (const slug of guideSlugs) if (!seedSlugs.includes(slug)) failures.push(`Historic area-guide key does not match a statewide historic-site seed: ${slug}.`);

const protectedNationalCemeteries = [
  'fort-sam-houston-national-cemetery',
  'houston-national-cemetery',
  'dallas-fort-worth-national-cemetery',
];
for (const slug of protectedNationalCemeteries) {
  if (!seedSlugs.includes(slug)) failures.push(`Protected national cemetery is missing from statewide historic-site seeds: ${slug}.`);
  if (!nationalGuideSlugs.includes(slug)) failures.push(`Protected national cemetery is missing its dedicated visitor enrichment: ${slug}.`);
}
for (const marker of ['areaGuide:', 'sourceCheckedAt: "2026-08-29"', 'U.S. Department of Veterans Affairs — National Cemetery Administration']) {
  if (!nationalCemeteries.includes(marker)) failures.push(`National-cemetery enrichment contract missing: ${marker}`);
}

const clusterIds = [...clusters.matchAll(/\{ id: "([^"]+)"[\s\S]*?slugs: \[([^\]]+)\] \}/g)].map((match) => ({
  id: match[1],
  slugs: [...match[2].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]),
}));
if (!clusterIds.length) failures.push('Could not parse historic-site thematic clusters.');
if (new Set(clusterIds.map((cluster) => cluster.id)).size !== clusterIds.length) failures.push('Historic-site thematic cluster ids must be unique.');
for (const cluster of clusterIds) {
  if (!cluster.slugs.length) failures.push(`Historic-site thematic cluster is empty: ${cluster.id}.`);
  if (new Set(cluster.slugs).size !== cluster.slugs.length) failures.push(`Historic-site thematic cluster repeats a destination: ${cluster.id}.`);
  for (const slug of cluster.slugs) if (!seedSlugs.includes(slug)) failures.push(`Historic-site thematic cluster ${cluster.id} links a non-seed slug: ${slug}.`);
}

for (const marker of ['historicSiteDestinations', 'export const preservedExploreDestinations = mergePreservedDestinations(']) if (!preserved.includes(marker)) failures.push(`Preserved historic-site catalog contract missing: ${marker}`);
for (const marker of [
  'enrichHistoricSiteCatalog',
  'enrichHistoricSiteDestination',
  'enrichRemainingHistoricSiteAreaGuide',
  'enrichHistoricSiteRemoteHero',
  'enrichHistoricSiteEvergreenLinks',
  'applyHistoricSiteFactCorrections',
  'enrichNationalCemeteryDestination',
  'enrichHistoricSiteCatalog(curated)\n    .map(enrichRemainingHistoricSiteAreaGuide)\n    .map(enrichHistoricSiteRemoteHero)\n    .map(enrichHistoricSiteEvergreenLinks)',
  '.map(applyHistoricSiteFactCorrections)',
  '.map(enrichNationalCemeteryDestination)',
]) if (!runtime.includes(marker)) failures.push(`Historic-site runtime enrichment contract missing: ${marker}`);
for (const marker of ['destinationsQuery({ category: "historic-sites" })','historicSiteClusters','/explore/$category']) if (!history.includes(marker)) failures.push(`Texas History historic-site discovery contract missing: ${marker}`);
for (const marker of ["destinationsQuery({ category: 'historic-sites' })",'Historic places in this county','/explore/historic-sites','/texas-history']) if (!county.includes(marker)) failures.push(`County historic-site discovery contract missing: ${marker}`);

for (const marker of [
  'destination.slug === "lipantitlan"',
  'county: "Nueces"',
  'coordinates: { lat: 27.96445, lng: -97.81838 }',
]) if (!corrections.includes(marker)) failures.push(`Lipantitlan source-backed fact correction missing: ${marker}`);

const exactHeroAliases = ['barrington-living-history-farm','fanthorp-inn','kreische-brewery','monument-hill','san-jacinto-battleground','washington-on-the-brazos'];
for (const slug of exactHeroAliases) {
  if (!seedSlugs.includes(slug)) failures.push(`Exact historic hero alias does not match a statewide seed: ${slug}.`);
  if (!primary.includes(`"${slug}"`)) failures.push(`Expected exact historic hero alias is missing: ${slug}.`);
}

const verifiedRemoteHeroes = [
  ['acton-state-historic-site', 'CC BY-SA 2.0'],
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
  ['official-texas-longhorn-herd', 'Public domain'],
  ['old-socorro-mission', 'Public domain'],
  ['palmito-ranch-battlefield', 'CC BY-SA 3.0'],
  ['port-isabel-lighthouse', 'CC BY-SA 4.0'],
  ['presidio-la-bahia', 'CC BY-SA 4.0'],
  ['sabine-pass-battleground', 'CC BY-SA 4.0'],
  ['sam-bell-maxey-house', 'CC BY-SA 3.0'],
  ['sam-rayburn-house', 'CC BY 2.0'],
  ['san-felipe-de-austin', 'CC BY 4.0'],
  ['slaton-harvey-house', 'CC0'],
  ['star-of-the-republic-museum', 'CC BY 4.0'],
  ['starr-family-home', 'CC BY 2.0'],
  ['stephen-f-austin-memorial', 'CC0'],
  ['varner-hogg-plantation', 'CC BY 2.0'],
  ['zaragoza-birthplace', 'CC BY-SA 2.0'],
];

const remoteHeroBlock = remoteHeroes.match(/export const historicSiteRemoteHeroes:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
if (!remoteHeroBlock) failures.push('Could not parse verified historic remote-hero map.');
const remoteHeroSlugs = remoteHeroBlock ? [...remoteHeroBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
if (new Set(remoteHeroSlugs).size !== remoteHeroSlugs.length) failures.push('Verified historic remote-hero slugs must be unique.');
for (const slug of remoteHeroSlugs) if (!seedSlugs.includes(slug)) failures.push(`Verified historic remote hero does not match a statewide historic-site seed: ${slug}.`);
if (remoteHeroSlugs.length !== verifiedRemoteHeroes.length) failures.push(`Historic remote-hero registry/validator count mismatch: registry ${remoteHeroSlugs.length}, validator ${verifiedRemoteHeroes.length}.`);
for (const slug of exactHeroAliases) if (remoteHeroSlugs.includes(slug)) failures.push(`Historic site has competing exact hero alias and remote hero mappings: ${slug}.`);

for (const [slug, license] of verifiedRemoteHeroes) {
  if (!seedSlugs.includes(slug)) failures.push(`Protected historic remote hero does not match a statewide seed: ${slug}.`);
  if (!remoteHeroSlugs.includes(slug)) failures.push(`Verified historic remote hero is missing: ${slug}.`);
  if (!remoteHeroes.includes(license)) failures.push(`Verified historic remote hero license marker is missing: ${slug} (${license}).`);
}
if (!remoteHeroes.includes('enrichHistoricSiteRemoteHero')) failures.push('Verified historic remote heroes are not exposed through the runtime enrichment function.');

if (failures.length) { console.error('Historic-sites validation failed:'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log(`Historic-sites validation passed: ${seedSlugs.length} statewide seeds, ${guideSlugs.size} destination-specific area guides, ${clusterIds.length} thematic clusters with valid seed links, ${exactHeroAliases.length + verifiedRemoteHeroes.length} exact verified hero mappings plus ${protectedNationalCemeteries.length} dedicated national-cemetery heroes, every protected hero matches a real seed, Lipantitlan geography is source-corrected, shared preserved-catalog publication, runtime enrichment, Texas History discovery and county cross-links are protected across eager and lazy route surfaces.`);
