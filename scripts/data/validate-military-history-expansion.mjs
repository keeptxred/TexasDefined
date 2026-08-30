import fs from 'node:fs';

const lazyPath = 'src/data/fixtures/lazy-military-history-expansion.ts';
const repositoriesPath = 'src/data/fixtures/repositories.ts';
const historyHubPath = 'src/routes/texas-history.tsx';
const reciprocalPath = 'src/data/historic-site-evergreen-links.ts';
const sourcingPath = 'docs/free-image-sourcing.md';
const sitemapPath = 'src/routes/sitemap[.]xml.ts';
const destinationsPath = 'src/data/military-history-destinations.ts';
const preservedCatalogPath = 'src/data/destination-preserved-catalog.ts';

const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(file, 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

const lazy = fs.readFileSync(lazyPath, 'utf8');
const repositories = fs.readFileSync(repositoriesPath, 'utf8');
const historyHub = readRouteSurface(historyHubPath);
const reciprocal = fs.readFileSync(reciprocalPath, 'utf8');
const sourcing = fs.readFileSync(sourcingPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const destinations = fs.readFileSync(destinationsPath, 'utf8');
const preservedCatalog = fs.readFileSync(preservedCatalogPath, 'utf8');
const failures = [];

const guides = [
  { slug: 'spanish-texas-military-battle-medina', path: 'src/data/fixtures/spanish-texas-military-battle-medina.ts', exportName: 'spanishTexasMilitaryBattleMedinaArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/military-spanish-texas', requiredTerms: ['presidio', 'Gutiérrez-Magee', 'Battle of Medina', 'Joaquín de Arredondo', 'San Antonio', 'Indigenous'] },
  { slug: 'mexican-texas-military-history', path: 'src/data/fixtures/mexican-texas-military-history.ts', exportName: 'mexicanTexasMilitaryHistoryArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/military-mexican-texas', requiredTerms: ['Coahuila y Tejas', 'Fredonian Rebellion', 'Law of April 6, 1830', 'Anahuac', 'Turtle Bayou Resolutions', 'Gonzales', 'Texas Rangers'] },
  { slug: 'texas-us-mexican-war-palo-alto-guide', path: 'src/data/fixtures/texas-us-mexican-war-palo-alto-guide.ts', exportName: 'texasUsMexicanWarPaloAltoGuideArticle', sourceName: 'National Park Service', sourceUrl: 'https://www.nps.gov/paal/learn/historyculture/index.htm', reciprocalHref: '/article/texas-us-mexican-war-palo-alto-guide', requiredTerms: ['Palo Alto', 'Resaca de la Palma', 'Rio Grande', 'Treaty of Guadalupe Hidalgo'] },
  { slug: 'buffalo-soldiers-texas-frontier-guide', path: 'src/data/fixtures/buffalo-soldiers-texas-frontier-guide.ts', exportName: 'buffaloSoldiersTexasFrontierGuideArticle', sourceName: 'National Park Service', sourceUrl: 'https://www.nps.gov/foda/learn/historyculture/buffalo-soldiers.htm', reciprocalHref: '/article/buffalo-soldiers-texas-frontier-guide', requiredTerms: ['9th Cavalry', '10th Cavalry', '24th Infantry', '25th Infantry', 'Fort Davis', 'Fort McKavett', 'Fort Lancaster', 'Native'] },
  { slug: 'texas-red-river-war-guide', path: 'src/data/fixtures/texas-red-river-war-guide.ts', exportName: 'texasRedRiverWarGuideArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/archeological-spotlight/red-river-war-battle-sites-project', reciprocalHref: '/article/texas-red-river-war-guide', requiredTerms: ['Adobe Walls', 'Palo Duro Canyon', 'Quanah Parker', 'Comanche', 'Kiowa', 'Southern Cheyenne', 'bison', 'archeological'] },
  { slug: 'republic-of-texas-navy-history', path: 'src/data/fixtures/republic-of-texas-navy-history.ts', exportName: 'republicOfTexasNavyHistoryArticle', sourceName: 'Texas State Library and Archives Commission', sourceUrl: 'https://www.tsl.texas.gov/exhibits/navy/index.html', reciprocalHref: '/article/republic-of-texas-navy-history', requiredTerms: ['Liberty', 'Invincible', 'Independence', 'Brutus', 'Austin', 'Wharton', 'Campeche', 'Edwin Ward Moore'] },
  { slug: 'texas-spanish-american-war-guide', path: 'src/data/fixtures/texas-spanish-american-war-guide.ts', exportName: 'texasSpanishAmericanWarGuideArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-spanish-american-war', requiredTerms: ['Rough Riders', 'Texas Volunteer Guard', '1st Texas Volunteer Infantry', '33rd United States Volunteer Infantry', 'Cuba', 'Philippine'] },
  { slug: 'texas-world-war-i-history-guide', path: 'src/data/fixtures/texas-world-war-i-history-guide.ts', exportName: 'texasWorldWarIHistoryGuideArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-world-war-i', requiredTerms: ['Camp Logan', '36th Infantry Division', '90th Infantry Division', 'Kelly Field', 'African American', 'Marcelino Serna', 'influenza'] },
  { slug: 'texas-national-guard-history', path: 'src/data/fixtures/texas-national-guard-history.ts', exportName: 'texasNationalGuardHistoryArticle', sourceName: 'Texas Military Department', sourceUrl: 'https://tmd.texas.gov/texas-military-department-history', requiredTerms: ['Camp Mabry', '36th', 'Texas State Guard', '1903'] },
  { slug: 'san-antonio-military-aviation-history', path: 'src/data/fixtures/san-antonio-military-aviation-history.ts', exportName: 'sanAntonioMilitaryAviationHistoryArticle', sourceName: 'Joint Base San Antonio', sourceUrl: 'https://www.jbsa.mil/Information/JBSA-History-Fact-Sheets/', requiredTerms: ['Kelly Field', 'Brooks Field', 'Randolph', 'Lackland', 'Fort Sam Houston'] },
  { slug: 'texas-world-war-ii-bases-pow-camps', path: 'src/data/fixtures/texas-world-war-ii-bases-pow-camps.ts', exportName: 'texasWorldWarIIBasesPowCampsArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-world-war-ii', reciprocalHref: '/article/texas-world-war-ii-bases-pow-camps', requiredTerms: ['Camp Hood', 'Camp Swift', 'Camp Wolters', 'prisoner-of-war', 'Crystal City'] },
  { slug: 'texas-cold-war-military-history', path: 'src/data/fixtures/texas-cold-war-military-history.ts', exportName: 'texasColdWarMilitaryHistoryArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-cold-war', reciprocalHref: '/article/texas-cold-war-military-history', reciprocalSource: 'military-destinations', requiredTerms: ['Carswell', 'B-36', 'Dyess', 'Atlas F', 'Pantex', 'Laughlin', 'U-2', 'Nike'] },
  { slug: 'texas-recent-wars-military-history', path: 'src/data/fixtures/texas-recent-wars-military-history.ts', exportName: 'texasRecentWarsMilitaryHistoryArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://thc.texas.gov/learn/military-history/texas-recent-wars', requiredTerms: ['Operation Desert Storm', 'Yugoslavia', 'September 11', 'Operation Enduring Freedom', 'Operation Iraqi Freedom', 'BRAC', '36th Infantry Division'] },
  { slug: 'women-in-texas-military-history', path: 'src/data/fixtures/women-in-texas-military-history.ts', exportName: 'womenInTexasMilitaryHistoryArticle', sourceName: 'Texas Historical Commission', sourceUrl: 'https://atlas.thc.texas.gov/Details?atlasnumber=5353005666&fn=print', requireHub: false, requiredTerms: ['Oveta Culp Hobby', "Women's Army Corps", 'Avenger Field', 'WASP', 'Thirty-eight', 'National WASP WWII Museum'] },
  { slug: 'texas-medal-of-honor-heroes', path: 'src/data/fixtures/texas-medal-of-honor-heroes.ts', exportName: 'texasMedalOfHonorHeroesArticle', sourceName: 'U.S. Army', sourceUrl: 'https://www.army.mil/medalofhonor/', requireHub: false, requiredTerms: ['Audie', 'Macario Garcia', 'Roy P. Benavidez', 'Medal of Honor', 'Texas Legislative Medal of Honor', 'Fort Sam Houston'] },
];

for (const guide of guides) {
  if (!fs.existsSync(guide.path)) { failures.push(`Missing military history guide: ${guide.path}`); continue; }
  const source = fs.readFileSync(guide.path, 'utf8');
  if (!source.includes(`slug: "${guide.slug}"`)) failures.push(`Slug mismatch: ${guide.slug}`);
  if (!source.includes(`export const ${guide.exportName}`)) failures.push(`Export mismatch: ${guide.exportName}`);
  if (!source.includes('category: "texas-history"')) failures.push(`Guide is not in texas-history: ${guide.slug}`);
  if (!source.includes(`sourceName: "${guide.sourceName}"`)) failures.push(`Source name mismatch: ${guide.slug}`);
  if (!source.includes(`sourceUrl: "${guide.sourceUrl}"`)) failures.push(`Source URL mismatch: ${guide.slug}`);
  if (!source.includes('internalLinks: [')) failures.push(`Missing internal-link cluster: ${guide.slug}`);
  if (!source.includes('hero: {')) failures.push(`Missing hero image: ${guide.slug}`);
  if (!source.includes('credit:')) failures.push(`Missing hero image credit: ${guide.slug}`);
  const paragraphCount = (source.match(/\bp\("/g) ?? []).length;
  const headingCount = (source.match(/\bh\("/g) ?? []).length;
  if (paragraphCount < 14) failures.push(`Guide is too thin (${paragraphCount} paragraphs): ${guide.slug}`);
  if (headingCount < 6) failures.push(`Guide lacks section depth (${headingCount} headings): ${guide.slug}`);
  for (const term of guide.requiredTerms) if (!source.includes(term)) failures.push(`Guide lacks required topic '${term}': ${guide.slug}`);
  if (!lazy.includes(`slug: "${guide.slug}"`)) failures.push(`Lazy stub missing: ${guide.slug}`);
  const moduleName = guide.path.split('/').pop().replace('.ts', '');
  if (!lazy.includes(`import("./${moduleName}")`)) failures.push(`Dynamic import missing: ${guide.slug}`);
  if (!lazy.includes(guide.exportName)) failures.push(`Lazy export name mismatch: ${guide.slug}`);
  if (guide.requireHub !== false && !historyHub.includes(`slug: "${guide.slug}"`)) failures.push(`Texas History hub does not feature: ${guide.slug}`);
  if (guide.reciprocalHref) {
    const reciprocalCatalog = guide.reciprocalSource === 'military-destinations' ? destinations : reciprocal;
    if (!reciprocalCatalog.includes(`href: "${guide.reciprocalHref}"`)) failures.push(`Reciprocal destination link missing: ${guide.slug}`);
  }
}

for (const href of ['/article/spanish-texas-military-battle-medina', '/article/mexican-texas-military-history', '/article/texas-spanish-american-war-guide', '/article/texas-world-war-i-history-guide', '/article/texas-recent-wars-military-history', '/article/women-in-texas-military-history', '/article/texas-medal-of-honor-heroes']) {
  if (!lazy.includes(`href: "${href}"`)) failures.push(`New military guide lacks reciprocal article discovery: ${href}`);
}

const plannerDestinations = [
  { slug: 'palo-alto-battlefield-national-historical-park', name: 'Palo Alto Battlefield National Historical Park', officialUrl: 'https://www.nps.gov/paal/index.htm', articleHref: '/article/texas-us-mexican-war-palo-alto-guide', requiredTerms: ['category: "historic-sites"', 'nearestTown: "Brownsville"', 'county: "Cameron"', 'coordinates:', 'credit:', 'sourceCheckedAt: "2026-08-19"', 'areaGuide: {'] },
  { slug: 'texas-military-forces-museum', name: 'Texas Military Forces Museum', officialUrl: 'https://texasmilitaryforcesmuseum.org/', articleHref: '/article/texas-national-guard-history', requiredTerms: ['category: "historic-sites"', 'nearestTown: "Austin"', 'county: "Travis"', 'coordinates:', 'credit:', 'sourceCheckedAt: "2026-08-19"', 'areaGuide: {', 'href: "/article/texas-cold-war-military-history"'] },
];
for (const destination of plannerDestinations) {
  if (!destinations.includes(`slug: "${destination.slug}"`)) failures.push(`Trip Planner destination missing: ${destination.slug}`);
  if (!destinations.includes(`name: "${destination.name}"`)) failures.push(`Trip Planner destination name missing: ${destination.name}`);
  if (!destinations.includes(`officialUrl: "${destination.officialUrl}"`)) failures.push(`Trip Planner destination official source missing: ${destination.slug}`);
  if (!destinations.includes(`href: "${destination.articleHref}"`)) failures.push(`Trip Planner destination does not link back to its military-history article: ${destination.slug}`);
  for (const marker of destination.requiredTerms) if (!destinations.includes(marker)) failures.push(`Trip Planner destination contract missing '${marker}': ${destination.slug}`);
}

for (const marker of ['import { militaryHistoryDestinations } from "./military-history-destinations";', 'militaryHistoryDestinations,']) if (!preservedCatalog.includes(marker)) failures.push(`Preserved destination catalog is missing military Trip Planner integration: ${marker}`);
for (const marker of ['militaryHistoryExpansionStubs', 'loadMilitaryHistoryExpansionArticle', '...militaryHistoryExpansionStubs', 'const militaryHistoryArticle = await loadMilitaryHistoryExpansionArticle']) if (!repositories.includes(marker)) failures.push(`Article repository is missing military expansion contract: ${marker}`);
for (const marker of ['export const militaryHistoryExpansionStubs', 'export async function loadMilitaryHistoryExpansionArticle', '/destination/palo-alto-battlefield-national-historical-park', '/destination/texas-military-forces-museum', '/article/buffalo-soldiers-texas-frontier-guide', '/article/texas-red-river-war-guide', '/article/republic-of-texas-navy-history', '/article/texas-cold-war-military-history', '/article/battleship-texas-bb-35-history-restoration', '/article/spanish-texas-military-battle-medina', '/article/mexican-texas-military-history', '/article/texas-spanish-american-war-guide', '/article/texas-world-war-i-history-guide', '/article/texas-recent-wars-military-history', '/article/women-in-texas-military-history', '/article/texas-medal-of-honor-heroes']) if (!lazy.includes(marker)) failures.push(`Lazy military expansion registry or supplemental linking is missing: ${marker}`);
for (const marker of ['The Portal to Texas History', 'Texas Digital Archive', 'Library of Congress', 'Wikimedia Commons', 'PICRYL', 'Pexels', 'No known restrictions', 'Historical image workflow']) if (!sourcing.includes(marker)) failures.push(`Historical image sourcing policy is missing: ${marker}`);
for (const marker of ['platform.articles.list(scope)', '.filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article))', '.map((article) => ({ path: `/article/${article.slug}`']) if (!sitemap.includes(marker)) failures.push(`Article sitemap discovery contract missing: ${marker}`);
for (const marker of ['historicAuthorityGuides', '{historicAuthorityGuides.length} routes into the statewide collection', 'Plan history by story', 'battleship-texas-bb-35-history-restoration']) if (!historyHub.includes(marker)) failures.push(`History hub presentation contract missing: ${marker}`);

if (failures.length) {
  console.error('Military history expansion validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Military history expansion validation passed: ${guides.length} source-backed, lazy-loaded guides, the canonical Battleship Texas authority page, and ${plannerDestinations.length} preserved Trip Planner destinations retain substantive depth, explicit discovery, strict quality-gated article sitemap publication, reciprocal linking, archival-image sourcing rules, and Texas History hub coverage across eager and lazy route surfaces.`);