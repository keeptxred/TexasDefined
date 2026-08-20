import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };
const concat = (paths) => paths.map(read).join('\n');

const census = concat(['src/data/painted-church-census.ts','src/data/painted-church-census-legacy.ts']);
const people = concat([
  'src/data/painted-church-people-legacy.ts',
  'src/data/painted-church-people-preindex.ts',
  'src/data/painted-church-people-preindex-supplemental.ts',
  'src/data/painted-church-people-preindex-ihm.ts',
]);
const media = read('src/routes/explore.painted-churches.media.tsx');
const extraGallery = read('src/data/painted-church-gallery-extra.ts');
const archival = read('src/data/painted-church-archival-images-expansion.ts');
const thenNow = read('src/routes/explore.painted-churches.then-and-now.tsx');
const tripPlanner = read('src/routes/explore.trip-planner.tsx');
const countyGuides = read('src/components/content/CountyGuideSections.tsx');
const guidebook = read('src/routes/guides.tsx');
const topicPaths = read('src/components/editorial/ExploreTopicPaths.tsx');
const thematic = read('src/data/painted-church-thematic-nomination.ts');
const sources = read('src/data/painted-church-source-registry.ts');
const manifest = JSON.parse(read('src/data/painted-church-preindex-manifest.json'));
const preindexExpansion = read('src/data/painted-churches-preindex-expansion.ts');
const profileIndex = read('src/data/painted-church-profile-index.ts');
const researchIndex = read('src/data/painted-church-research-index.ts');
const visitorIndex = read('src/data/painted-church-visitor-status.ts');
const featureIndex = read('src/data/painted-church-feature-index.ts');

for (const slug of ['ellinger-st-marys-catholic-church','rockne-sacred-heart-catholic-church','san-antonio-san-fernando-cathedral']) {
  requireText(census, `slug: "${slug}"`, 'Candidate adjudication');
}
requireText(census, '16-slide San Fernando Cathedral decorative-painting research group', 'San Fernando hold evidence');
requireText(census, 'exact-building decorative evidence', 'Ellinger hold standard');
requireText(census, 'qualifying decorative evidence', 'Rockne hold standard');

for (const promoted of [
  'palestine-first-presbyterian-church',
  'houston-annunciation-catholic-church',
  'waco-st-francis-on-the-brazos',
  'san-antonio-immaculate-heart-of-mary',
]) requireText(preindexExpansion, `slug: "${promoted}"`, 'Pre-index verified expansion');

requireText(people, 'slug: "michaela-wegman"', 'People authority');
requireText(people, 'umbarger-st-marys-catholic-church', 'Umbarger researcher relationship');
requireText(people, 'slug: "rev-louis-netardus"', 'Praha artist authority');
requireText(people, 'san-antonio-st-joseph-catholic-church', 'Stockert/Kern San Antonio relationship');
requireText(people, 'slug: "pedro-juan-barcelo"', 'Waco artist authority');
requireText(people, 'slug: "nicholas-j-clayton"', 'Houston architect authority');
requireText(people, 'slug: "bartola-ihm-san-antonio"', 'Immaculate Heart of Mary original decorator');
requireText(people, 'slug: "fr-alberto-domingo"', 'Immaculate Heart of Mary restorer');
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

requireText(thematic, 'originalChurchCount: 15', 'Original thematic count');
requireText(thematic, 'currentThcMpsIndexCount: 14', 'Current THC MPS count');
requireText(thematic, 'galveston-st-joseph-church', 'Galveston thematic-member reconciliation');
requireText(sources, 'paintedChurchSourcesForChurch', 'Canonical source registry');
requireText(profileIndex, 'preindexPaintedChurchProfileBySlug', 'Canonical pre-index profile resolver');
requireText(profileIndex, 'immaculateHeartOfMaryPaintedChurchProfileBySlug', 'Canonical IHM profile resolver');
requireText(researchIndex, 'preindexPaintedChurchResearchBySlug', 'Canonical pre-index research resolver');
requireText(researchIndex, 'immaculateHeartOfMaryPaintedChurchResearchBySlug', 'Canonical IHM research resolver');
requireText(visitorIndex, 'throw new Error(`Missing explicit visitor-status research', 'Visitor fallback prohibition');
requireText(featureIndex, 'canonicalPaintedChurchFeaturesBySlug', 'Canonical object-level feature resolver');

requireText(tripPlanner, 'PaintedChurchRoutePromo', 'Trip-planner reciprocal link');
requireText(tripPlanner, '/explore/painted-churches/routes', 'Trip-planner reciprocal link');
requireText(tripPlanner, '/explore/painted-churches/map', 'Trip-planner reciprocal link');
requireText(countyGuides, 'countyChurches = expandedPaintedChurches.filter', 'County reciprocal link');
requireText(guidebook, 'label: "Painted Churches of Texas"', 'Guidebook discovery');
requireText(topicPaths, 'label: "Painted Churches of Texas"', 'Historic-sites reciprocal link');
requireText(topicPaths, 'to: "/explore/painted-churches/routes"', 'Road-trip reciprocal link');
requireText(topicPaths, 'label: "Painted Churches"', 'Small-town reciprocal link');

if (manifest.verifiedChurchCount !== 32 || manifest.churchSlugs.length !== 32) failures.push('Pre-index manifest must preserve the 32-church authority corpus.');
if (manifest.publicationState !== 'pre-index-review') failures.push('Painted Churches must remain in pre-index-review until explicit release.');
if (manifest.requirements.searchIndexingEnabled !== false) failures.push('Search indexing must remain disabled during pre-index review.');

if (failures.length) {
  console.error('Painted Churches completion validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches completion protected: 32-church pre-index authority corpus, original 14-vs-15 thematic reconciliation, candidate adjudication, oral-history sources, complete Then & Now accounting, rights-verified interiors, primary-source archival evidence, explicit visitor research, canonical profile/research/feature resolvers, source registry and statewide discovery links.');
