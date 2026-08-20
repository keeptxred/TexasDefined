import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };

const census = read('src/data/painted-church-census.ts');
const people = read('src/data/painted-church-people.ts');
const media = read('src/routes/explore.painted-churches.media.tsx');
const extraGallery = read('src/data/painted-church-gallery-extra.ts');
const archival = read('src/data/painted-church-archival-images-expansion.ts');
const tripPlanner = read('src/routes/explore.trip-planner.tsx');
const countyGuides = read('src/components/content/CountyGuideSections.tsx');
const guidebook = read('src/routes/guides.tsx');

for (const slug of ['ellinger-st-marys-catholic-church','rockne-sacred-heart-catholic-church','san-antonio-san-fernando-cathedral']) {
  requireText(census, `slug: "${slug}"`, 'Candidate adjudication');
}
requireText(census, '16-slide San Fernando Cathedral decorative-painting research group', 'San Fernando hold evidence');
requireText(census, 'exact-building decorative evidence', 'Ellinger hold standard');
requireText(census, 'qualifying decorative evidence', 'Rockne hold standard');

requireText(people, 'slug: "michaela-wegman"', 'People authority');
requireText(people, 'umbarger-st-marys-catholic-church', 'Umbarger researcher relationship');
requireText(media, 'St. Mary\'s Umbarger parish history', 'Oral-history library');
requireText(media, 'Color Me Catholic: The Umbarger Mural Story', 'Oral-history library');
requireText(media, 'Documented voices', 'Oral-history library');

requireText(extraGallery, 'Saint Mary Catholic Church Fredericksburg Texas by afc 240916.jpg', 'Fredericksburg current interior');
requireText(extraGallery, 'CC BY-SA 4.0', 'Fredericksburg image license');
requireText(archival, 'metapth943229', 'Fredericksburg 1980 archival record');
requireText(archival, 'October 1, 1980', 'Fredericksburg archival date');

requireText(tripPlanner, 'PaintedChurchRoutePromo', 'Trip-planner reciprocal link');
requireText(tripPlanner, '/explore/painted-churches/routes', 'Trip-planner reciprocal link');
requireText(tripPlanner, '/explore/painted-churches/map', 'Trip-planner reciprocal link');
requireText(countyGuides, 'countyChurches = expandedPaintedChurches.filter', 'County reciprocal link');
requireText(guidebook, 'label: "Painted Churches of Texas"', 'Guidebook discovery');
requireText(guidebook, 'A source-backed heritage reference and travel-planning system for 27 verified churches.', 'Guidebook authority copy');

if (failures.length) {
  console.error('Painted Churches completion validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches completion protected: candidate adjudication, oral-history sources, Fredericksburg Then & Now, county links, trip-planner discovery and statewide Guidebook exposure.');
