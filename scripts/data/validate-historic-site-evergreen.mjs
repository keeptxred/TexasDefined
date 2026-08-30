import fs from 'node:fs';

const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(file, 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

const lazy = fs.readFileSync('src/data/fixtures/lazy-standalone-evergreen.ts', 'utf8');
const repositories = fs.readFileSync('src/data/fixtures/repositories.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const historyHub = readRouteSurface('src/routes/texas-history.tsx');
const historicSites = fs.readFileSync('src/data/historic-sites.ts', 'utf8');
const reciprocal = fs.readFileSync('src/data/historic-site-evergreen-links.ts', 'utf8');
const runtime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const failures = [];

const guides = [
  { slug: 'texas-revolution-historic-sites-road-trip', path: 'src/data/fixtures/texas-revolution-historic-sites-road-trip.ts', exportName: 'texasRevolutionHistoricSitesRoadTripArticle', destinations: ['san-felipe-de-austin', 'washington-on-the-brazos', 'fannin-battleground', 'presidio-la-bahia', 'san-jacinto-battleground'] },
  { slug: 'republic-of-texas-government-trail', path: 'src/data/fixtures/republic-of-texas-government-trail.ts', exportName: 'republicOfTexasGovernmentTrailArticle', destinations: ['san-felipe-de-austin', 'washington-on-the-brazos', 'star-of-the-republic-museum', 'first-capitol-of-texas', 'stephen-f-austin-memorial', 'french-legation', 'barrington-living-history-farm'] },
  { slug: 'texas-frontier-forts-road-trip', path: 'src/data/fixtures/texas-frontier-forts-road-trip.ts', exportName: 'texasFrontierFortsRoadTripArticle', destinations: ['fort-martin-scott', 'fort-griffin', 'fort-mckavett', 'fort-lancaster'] },
  { slug: 'presidential-texas-historic-homes', path: 'src/data/fixtures/presidential-texas-historic-homes.ts', exportName: 'presidentialTexasHistoricHomesArticle', destinations: ['eisenhower-birthplace', 'bush-family-home', 'sam-rayburn-house', 'casa-navarro'] },
  { slug: 'brazoria-plantations-slavery-emancipation-history', path: 'src/data/fixtures/brazoria-plantations-slavery-emancipation-history.ts', exportName: 'brazoriaPlantationsSlaveryEmancipationHistoryArticle', destinations: ['levi-jordan-plantation', 'varner-hogg-plantation', 'first-capitol-of-texas', 'stephen-f-austin-memorial'] },
  { slug: 'texas-borderlands-historic-sites-guide', path: 'src/data/fixtures/texas-borderlands-historic-sites-guide.ts', exportName: 'texasBorderlandsHistoricSitesGuideArticle', destinations: ['old-socorro-mission', 'magoffin-home', 'casa-navarro', 'lipantitlan', 'mission-dolores'] },
  { slug: 'texas-world-war-ii-historic-sites-guide', path: 'src/data/fixtures/texas-world-war-ii-historic-sites-guide.ts', exportName: 'texasWorldWarIIHistoricSitesGuideArticle', destinations: ['eisenhower-birthplace', 'national-museum-pacific-war', 'iwo-jima-museum-monument', 'slaton-harvey-house'] },
];

const militaryGuides = [
  {
    slug: 'texas-military-history-timeline',
    path: 'src/data/fixtures/texas-military-history-timeline.ts',
    exportName: 'texasMilitaryHistoryTimelineArticle',
    sourceName: 'Texas Military Department',
    sourceUrl: 'https://tmd.texas.gov/texas-military-department-history',
    destinations: ['san-jacinto-battleground', 'fort-mckavett', 'sabine-pass-battleground', 'palmito-ranch-battlefield', 'national-museum-pacific-war'],
  },
  {
    slug: 'texas-civil-war-sites-guide',
    path: 'src/data/fixtures/texas-civil-war-sites-guide.ts',
    exportName: 'texasCivilWarSitesGuideArticle',
    sourceName: 'Texas Historical Commission',
    sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-civil-war',
    destinations: ['sabine-pass-battleground', 'palmito-ranch-battlefield', 'confederate-reunion-grounds', 'sam-bell-maxey-house', 'levi-jordan-plantation', 'varner-hogg-plantation', 'starr-family-home'],
  },
];

const weekendGuides = [
  {
    slug: 'washington-on-the-brazos-weekend-guide',
    path: 'src/data/fixtures/washington-on-the-brazos-weekend-guide.ts',
    exportName: 'washingtonOnTheBrazosWeekendGuideArticle',
    sourceName: 'Texas Historical Commission',
    sourceUrl: 'https://thc.texas.gov/historic-sites/washington-brazos',
    destinations: ['washington-on-the-brazos', 'star-of-the-republic-museum', 'barrington-living-history-farm'],
  },
  {
    slug: 'goliad-history-weekend-guide',
    path: 'src/data/fixtures/goliad-history-weekend-guide.ts',
    exportName: 'goliadHistoryWeekendGuideArticle',
    sourceName: 'Texas Historical Commission',
    sourceUrl: 'https://thc.texas.gov/historic-sites/presidio-la-bahia',
    destinations: ['fannin-battleground', 'presidio-la-bahia'],
  },
  {
    slug: 'fredericksburg-history-weekend-guide',
    path: 'src/data/fixtures/fredericksburg-history-weekend-guide.ts',
    exportName: 'fredericksburgHistoryWeekendGuideArticle',
    sourceName: 'National Museum of the Pacific War',
    sourceUrl: 'https://www.pacificwarmuseum.org/visit',
    destinations: ['national-museum-pacific-war', 'fort-martin-scott'],
  },
];

const seedBlock = historicSites.match(/export const historicSiteSeeds:[\s\S]*?= \[([\s\S]*?)\n\];/);
const seedSlugs = seedBlock ? [...seedBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]) : [];
if (seedSlugs.length !== 46) failures.push(`Expected 46 historic-site seeds while validating evergreen guides; found ${seedSlugs.length}.`);

for (const guide of guides) {
  if (!fs.existsSync(guide.path)) { failures.push(`Historic evergreen guide file is missing: ${guide.path}`); continue; }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Historic evergreen guide slug mismatch: ${guide.slug}.`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Historic evergreen guide export missing: ${guide.exportName}.`);
  if (!source.includes('category: "texas-history"')) failures.push(`Historic evergreen guide is not in texas-history: ${guide.slug}.`);
  if (!source.includes('sourceName: "Texas Historical Commission"')) failures.push(`Historic evergreen guide lacks THC source identity: ${guide.slug}.`);
  if (!source.includes('sourceUrl: "https://thc.texas.gov/historic-sites"')) failures.push(`Historic evergreen guide lacks canonical THC historic-sites source: ${guide.slug}.`);
  if (!source.includes('relatedDestinations: [')) failures.push(`Historic evergreen guide lacks related destination discovery: ${guide.slug}.`);
  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 14) failures.push(`Historic evergreen guide is too thin (${paragraphCount} paragraphs): ${guide.slug}.`);
  if (headingCount < 6) failures.push(`Historic evergreen guide lacks section depth (${headingCount} headings): ${guide.slug}.`);
  for (const destination of guide.destinations) {
    if (!seedSlugs.includes(destination)) failures.push(`Historic evergreen guide validator references non-seed destination ${destination} in ${guide.slug}.`);
    if (!source.includes(destination)) failures.push(`Historic evergreen guide does not link required destination ${destination}: ${guide.slug}.`);
  }
  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Historic evergreen stub is not registered: ${guide.slug}.`);
  if (!lazy.includes(`import("./${guide.path.split('/').pop().replace('.ts', '')}")`)) failures.push(`Historic evergreen full article is not lazy-loaded: ${guide.slug}.`);
  if (!lazy.includes(guide.exportName)) failures.push(`Historic evergreen lazy loader export mismatch: ${guide.slug}.`);
  const href = `/article/${guide.slug}`;
  if (!reciprocal.includes(`href: "${href}"`)) failures.push(`Historic destination reciprocal route guide link is missing: ${href}.`);
  if (!historyHub.includes(`slug: "${guide.slug}"`)) failures.push(`Historic evergreen guide is not explicitly featured on the Texas History hub: ${guide.slug}.`);
}

for (const guide of militaryGuides) {
  if (!fs.existsSync(guide.path)) { failures.push(`Military history evergreen guide file is missing: ${guide.path}`); continue; }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Military history guide slug mismatch: ${guide.slug}.`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Military history guide export missing: ${guide.exportName}.`);
  if (!source.includes('category: "texas-history"')) failures.push(`Military history guide is not in texas-history: ${guide.slug}.`);
  if (!source.includes(`sourceName: "${guide.sourceName}"`)) failures.push(`Military history guide source identity mismatch: ${guide.slug}.`);
  if (!source.includes(`sourceUrl: "${guide.sourceUrl}"`)) failures.push(`Military history guide source URL mismatch: ${guide.slug}.`);
  if (!source.includes('relatedDestinations: [')) failures.push(`Military history guide lacks related destination discovery: ${guide.slug}.`);
  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 14) failures.push(`Military history guide is too thin (${paragraphCount} paragraphs): ${guide.slug}.`);
  if (headingCount < 6) failures.push(`Military history guide lacks section depth (${headingCount} headings): ${guide.slug}.`);
  for (const destination of guide.destinations) {
    if (!seedSlugs.includes(destination)) failures.push(`Military history guide validator references non-seed destination ${destination} in ${guide.slug}.`);
    if (!source.includes(destination)) failures.push(`Military history guide does not link required destination ${destination}: ${guide.slug}.`);
    if (!reciprocal.includes(`"${destination}"`)) failures.push(`Military history reciprocal destination registration is missing ${destination}: ${guide.slug}.`);
  }
  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Military history stub is not registered: ${guide.slug}.`);
  if (!lazy.includes(`import("./${guide.path.split('/').pop().replace('.ts', '')}")`)) failures.push(`Military history full article is not lazy-loaded: ${guide.slug}.`);
  if (!lazy.includes(guide.exportName)) failures.push(`Military history lazy loader export mismatch: ${guide.slug}.`);
  const href = `/article/${guide.slug}`;
  if (!reciprocal.includes(`href: "${href}"`)) failures.push(`Military history reciprocal route guide link is missing: ${href}.`);
  if (!historyHub.includes(`slug: "${guide.slug}"`)) failures.push(`Military history guide is not explicitly featured on the Texas History hub: ${guide.slug}.`);
}

for (const guide of weekendGuides) {
  if (!fs.existsSync(guide.path)) { failures.push(`Historic weekend guide file is missing: ${guide.path}`); continue; }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Historic weekend guide slug mismatch: ${guide.slug}.`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Historic weekend guide export missing: ${guide.exportName}.`);
  if (!source.includes('category: "road-trips"')) failures.push(`Historic weekend guide is not in road-trips: ${guide.slug}.`);
  if (!source.includes(`sourceName: "${guide.sourceName}"`)) failures.push(`Historic weekend guide source identity mismatch: ${guide.slug}.`);
  if (!source.includes(`sourceUrl: "${guide.sourceUrl}"`)) failures.push(`Historic weekend guide source URL mismatch: ${guide.slug}.`);
  if (!source.includes('relatedDestinations: [')) failures.push(`Historic weekend guide lacks related destination discovery: ${guide.slug}.`);
  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 10) failures.push(`Historic weekend guide is too thin (${paragraphCount} paragraphs): ${guide.slug}.`);
  if (headingCount < 5) failures.push(`Historic weekend guide lacks planning depth (${headingCount} headings): ${guide.slug}.`);
  for (const destination of guide.destinations) {
    if (!seedSlugs.includes(destination)) failures.push(`Historic weekend guide validator references non-seed destination ${destination} in ${guide.slug}.`);
    if (!source.includes(destination)) failures.push(`Historic weekend guide does not link required destination ${destination}: ${guide.slug}.`);
    if (!reciprocal.includes(`"${destination}"`)) failures.push(`Historic weekend reciprocal destination registration is missing ${destination}: ${guide.slug}.`);
  }
  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Historic weekend stub is not registered: ${guide.slug}.`);
  if (!lazy.includes(`import("./${guide.path.split('/').pop().replace('.ts', '')}")`)) failures.push(`Historic weekend full article is not lazy-loaded: ${guide.slug}.`);
  if (!lazy.includes(guide.exportName)) failures.push(`Historic weekend lazy loader export mismatch: ${guide.slug}.`);
  const href = `/article/${guide.slug}`;
  if (!reciprocal.includes(`href: "${href}"`)) failures.push(`Historic weekend reciprocal route guide link is missing: ${href}.`);
}

const reciprocalSlugSets = [...reciprocal.matchAll(/slugs:\s*new Set\(\[([\s\S]*?)\]\)/g)].flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]));
for (const slug of reciprocalSlugSets) if (!seedSlugs.includes(slug)) failures.push(`Historic reciprocal guide link references non-seed destination: ${slug}.`);
for (const marker of ['import { enrichHistoricSiteEvergreenLinks } from "./historic-site-evergreen-links";', 'enrichHistoricSiteEvergreenLinks(', '.map(enrichHistoricSiteEvergreenLinks)']) if (!runtime.includes(marker)) failures.push(`Historic destination runtime is missing reciprocal evergreen enrichment: ${marker}`);
for (const marker of ['standaloneEvergreenStubs', '...standaloneEvergreenStubs', 'loadStandaloneEvergreenArticle']) if (!repositories.includes(marker)) failures.push(`Historic evergreen repository discovery contract missing: ${marker}.`);
if (!sitemap.includes('platform.articles.list(scope)')) failures.push('Historic evergreen sitemap discovery contract missing: platform.articles.list(scope).');
const articleCatalogPattern = /\.\.\.articles\s*\.filter\(\(article\)\s*=>\s*!isLegacyCountySeriesArticle\(article\.slug\)\s*&&\s*isArticleIndexReady\(article\)\)\s*\.map\(\(article\)\s*=>\s*\(\{\s*path:\s*`\/article\/\$\{article\.slug\}`/s;
if (!articleCatalogPattern.test(sitemap)) failures.push('Historic evergreen sitemap discovery contract missing: strict quality-gated canonical article catalog.');
for (const marker of ['historicAuthorityGuides', 'Plan history by story', '{historicAuthorityGuides.length} routes into the statewide collection']) if (!historyHub.includes(marker)) failures.push(`Texas History hub authority-guide presentation contract missing: ${marker}`);

if (failures.length) { console.error('Historic-site evergreen validation failed:'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log(`Historic-site evergreen validation passed: ${guides.length + militaryGuides.length} authority guides and ${weekendGuides.length} historic weekend planning guides retain substantive depth, authoritative sourcing, verified destination links, reciprocal discovery, lazy loading, repository listing, strict quality-gated canonical article-sitemap publication, and Texas History hub discovery across eager and lazy route surfaces.`);