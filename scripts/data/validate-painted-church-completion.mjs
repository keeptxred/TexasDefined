import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };
const forbidText = (content, token, label) => { if (content.includes(token)) failures.push(`${label} contains stale ${token}`); };

const census = read('src/data/painted-church-census.ts');
const sourceLibrary = read('src/components/editorial/PaintedChurchSourceLibrary.tsx');
const people = read('src/data/painted-church-people.ts');
const media = read('src/routes/explore.painted-churches.media.tsx');
const extraGallery = read('src/data/painted-church-gallery-extra.ts');
const archival = read('src/data/painted-church-archival-images-expansion.ts');
const thenNow = read('src/routes/explore.painted-churches.then-and-now.tsx');
const mapRoute = read('src/routes/explore.painted-churches.map.tsx');
const tripPlanner = read('src/routes/explore.trip-planner.tsx');
const countyGuides = read('src/components/content/CountyGuideSections.tsx');
const guidebook = read('src/routes/guides.tsx');
const topicPaths = read('src/components/editorial/ExploreTopicPaths.tsx');
const categoryRoute = read('src/routes/explore.$category.lazy.tsx');
const trustRouter = read('src/components/authority/CitationCollectionTrustRouter.tsx');
const profileShim = read('src/data/painted-church-profiles-additional.ts');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const robots = read('public/robots.txt');
const releaseState = read('ops/editorial/painted-churches-release-state.json');

const candidateSlugs = ['ellinger-st-marys-catholic-church','rockne-sacred-heart-catholic-church','san-antonio-san-fernando-cathedral'];
for (const slug of candidateSlugs) {
  requireText(census, `slug: "${slug}"`, 'Candidate adjudication');
  requireText(sourceLibrary, `slug: "${slug}"`, 'Public research queue accounting');
}
requireText(census, '16-slide San Fernando Cathedral decorative-painting research group', 'San Fernando hold evidence');
requireText(census, 'exact-building decorative evidence', 'Ellinger hold standard');
requireText(census, 'qualifying decorative evidence', 'Rockne hold standard');

const expansionSlugs = [
  'plantersville-st-marys-catholic-church', 'corn-hill-holy-trinity-catholic-church',
  'palestine-sacred-heart-catholic-church', 'bandera-st-stanislaus-catholic-church',
  'corpus-christi-sacred-heart-catholic-church', 'san-antonio-st-joseph-catholic-church',
  'anderson-st-stanislaus-kostka', 'castroville-st-louis-catholic-church', 'lacoste-our-lady-of-grace',
];
for (const slug of expansionSlugs) requireText(sourceLibrary, `slug: "${slug}"`, 'Verified expansion accounting');
requireText(sourceLibrary, 'The collection now includes {expandedPaintedChurches.length} verified church profiles.', 'Canonical expansion count');
requireText(sourceLibrary, 'to="/explore/painted-churches/$slug"', 'Verified-addition internal links');
requireText(profileShim, 'canonicalPaintedChurchProfileBySlug', 'Public church-detail profile resolver shim');
forbidText(profileShim, 'paintedChurchAdditionProfileBySlug', 'Public church-detail profile resolver shim');

requireText(people, 'slug: "michaela-wegman"', 'People authority');
requireText(people, 'umbarger-st-marys-catholic-church', 'Umbarger researcher relationship');
requireText(media, 'St. Mary\'s Umbarger parish history', 'Oral-history library');
requireText(media, 'Color Me Catholic: The Umbarger Mural Story', 'Oral-history library');
requireText(media, 'Documented voices', 'Oral-history library');

requireText(extraGallery, 'Saint Mary Catholic Church Fredericksburg Texas by afc 240916.jpg', 'Fredericksburg current interior');
requireText(extraGallery, 'Reverence (5670524189).jpg', 'High Hill current interior detail');
requireText(extraGallery, 'Holy Holy Holy (5650995094).jpg', 'Ammannsville current interior detail');
requireText(extraGallery, 'painted to resemble stone', 'Ammannsville technique evidence');
requireText(extraGallery, 'BFS Man (Mike Fisher)', 'Interior image attribution');
requireText(extraGallery, 'CC BY-SA 4.0', 'Fredericksburg image license');
requireText(extraGallery, 'CC BY 2.0', 'High Hill and Ammannsville image license');
requireText(archival, 'metapth943229', 'Fredericksburg 1980 archival record');
requireText(archival, 'October 1, 1980', 'Fredericksburg archival date');
requireText(archival, 'metapth685127', 'Lindsay 1972 archival interior');
requireText(archival, 'metapth933232', 'Lindsay 1980 archival interior');
requireText(archival, 'metapth686708', 'Umbarger sanctuary archival record');
requireText(archival, 'Italian prisoners of war', 'Umbarger archival attribution context');

requireText(thenNow, 'const neither =', 'Then & Now coverage accounting');
requireText(thenNow, 'Coverage accounting:', 'Then & Now coverage accounting');
requireText(thenNow, 'Open visual-research queue', 'Then & Now backlog transparency');
requireText(thenNow, 'paired.length + archivalOnly.length + currentOnly.length + neither.length', 'Then & Now reconciliation');
requireText(mapRoute, '["Gillespie", "Bandera", "Karnes", "Bexar", "Medina"]', 'Medina County Painted Churches map region');
requireText(mapRoute, 'return "Hill Country & South-Central Texas"', 'Medina County Painted Churches map region');

requireText(tripPlanner, 'PaintedChurchRoutePromo', 'Trip-planner reciprocal link');
requireText(tripPlanner, '/explore/painted-churches/routes', 'Trip-planner reciprocal link');
requireText(tripPlanner, '/explore/painted-churches/map', 'Trip-planner reciprocal link');
requireText(countyGuides, 'countyChurches = expandedPaintedChurches.filter', 'County reciprocal link');
requireText(guidebook, 'label: "Painted Churches of Texas"', 'Guidebook discovery');
requireText(guidebook, 'A source-backed heritage reference and travel-planning system for 27 verified churches.', 'Guidebook authority copy');
requireText(topicPaths, 'label: "Painted Churches of Texas"', 'Historic-sites reciprocal link');
requireText(topicPaths, 'to: "/explore/painted-churches/routes"', 'Road-trip reciprocal link');
requireText(topicPaths, 'label: "Painted Churches"', 'Small-town reciprocal link');

forbidText(categoryRoute, 'Explore 18 historic church guides', 'Explore category Painted Churches promo');
requireText(categoryRoute, 'Explore the verified statewide church collection', 'Explore category Painted Churches promo');
forbidText(trustRouter, '22-church verified collection', 'Painted Churches trust panel');
requireText(trustRouter, 'the canonical collection controls the current church count', 'Painted Churches trust panel');

const authorityPaths = [
  '/explore/painted-churches/map', '/explore/painted-churches/compare', '/explore/painted-churches/how-many',
  '/explore/painted-churches/methodology', '/explore/painted-churches/census', '/explore/painted-churches/techniques',
  '/explore/painted-churches/symbols', '/explore/painted-churches/people', '/explore/painted-churches/heritage',
  '/explore/painted-churches/preservation', '/explore/painted-churches/knowledge-graph', '/explore/painted-churches/harwood-archive',
  '/explore/painted-churches/how-to-read', '/explore/painted-churches/glossary', '/explore/painted-churches/timeline',
  '/explore/painted-churches/routes', '/explore/painted-churches/guides', '/explore/painted-churches/print-guide',
  '/explore/painted-churches/media', '/explore/painted-churches/cite', '/explore/painted-churches/then-and-now',
];
requireText(sitemap, 'const PAINTED_CHURCH_STATIC_PATHS = [', 'Painted Churches sitemap registry');
for (const path of authorityPaths) requireText(sitemap, JSON.stringify(path), 'Painted Churches sitemap registry');
requireText(sitemap, 'const paintedChurchEntries = expandedPaintedChurches', 'Painted Churches church-profile sitemap registry');
requireText(publicRoutes, '"/explore/painted-churches"', 'Painted Churches public-route registry');

requireText(robots, 'User-agent: Googlebot', 'Google crawl policy');
requireText(robots, 'User-agent: Googlebot-Image', 'Google image crawl policy');
requireText(robots, 'Allow: /', 'Google crawl policy');
forbidText(robots, 'Disallow: /explore/painted-churches', 'Google crawl policy');

requireText(releaseState, '"schemaVersion": 2', 'Painted Churches release state');
requireText(releaseState, '"collectionState": "production-public"', 'Painted Churches release state');
requireText(releaseState, '"runtimeIndexability": "public-indexable"', 'Painted Churches release state');
requireText(releaseState, '"ownerIndexingApproval": true', 'Painted Churches release state');
requireText(releaseState, '"ownerIndexingApprovalDate": "2026-08-26"', 'Painted Churches release state');
requireText(releaseState, '"googleCrawlingExpected": true', 'Painted Churches release state');
requireText(releaseState, '"robotsGovernance": "public/robots.txt"', 'Painted Churches release state');
requireText(releaseState, '"historicalSnapshotControlsRuntime": false', 'Painted Churches release state');
requireText(releaseState, 'no Painted Churches-specific noindex gate may be introduced', 'Painted Churches release state');
forbidText(releaseState, '"ownerIndexingApproval": false', 'Painted Churches release state');

if (failures.length) {
  console.error('Painted Churches completion validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches completion protected: candidate adjudication, complete public research accounting, canonical public detail profile resolution, oral-history sources, complete Then & Now accounting, current imagery and primary-source interiors, correct regional map grouping, county/history/road-trip/small-town discovery, trip-planner integration, statewide Guidebook exposure, non-stale cross-links, self-canonical sitemap coverage, Google crawl access and explicit indexing approval.');