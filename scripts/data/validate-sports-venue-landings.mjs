import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [landings, landingPaths, route, indexComponent, directory, sports, publicRoutes, majorVenues, tier2Venues] = await Promise.all([
  read('src/data/sports-venue-landings.ts'),
  read('src/data/sports-venue-landing-paths.ts'),
  read('src/routes/sports-venues.$landing.tsx'),
  read('src/components/sports/SportsVenueLandingIndex.tsx'),
  read('src/routes/sports-venues.tsx'),
  read('src/routes/sports.tsx'),
  read('src/lib/public-routes.ts'),
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const expectedLandings = [
  'dallas-fort-worth',
  'houston',
  'austin-central-texas',
  'san-antonio',
  'waco',
  'college-station',
  'el-paso',
  'lubbock',
  'football',
  'baseball',
  'basketball',
  'motorsports',
  'college-sports',
  'high-school-football',
  'rodeo-western',
  'golf',
  'soccer',
];

const slugMatches = [...landings.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((match) => match[1]);
assert(slugMatches.length === expectedLandings.length, `Expected ${expectedLandings.length} sports venue landings, found ${slugMatches.length}.`);
assert(new Set(slugMatches).size === slugMatches.length, 'Sports venue landing slugs must be unique.');
for (const slug of expectedLandings) {
  const concretePath = `/sports-venues/${slug}`;
  assert(slugMatches.includes(slug), `Sports venue landing data is missing ${slug}.`);
  assert(publicRoutes.includes(`"${concretePath}"`), `Public sitemap ownership is missing ${concretePath}.`);
  assert(landingPaths.includes(`'${concretePath}'`), `Concrete sports landing discovery registry is missing ${concretePath}.`);
}

const concretePathMatches = [...landingPaths.matchAll(/'\/sports-venues\/([a-z0-9-]+)'/g)].map((match) => match[1]);
assert(concretePathMatches.length === expectedLandings.length, `Expected ${expectedLandings.length} concrete sports venue landing paths, found ${concretePathMatches.length}.`);
assert(new Set(concretePathMatches).size === concretePathMatches.length, 'Concrete sports venue landing paths must be unique.');

for (const marker of [
  "createFileRoute('/sports-venues/$landing')",
  'sportsVenueLanding(params.landing)',
  'throw notFound()',
  "entitiesByKind('sports-venue')",
  '.filter(isIndexableEntityPage)',
  '.map(applyCurrentEntityCorrections)',
  'matchesSportsVenueLanding(venue, landing)',
  'canonicalPath',
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'FAQPage'",
  "'@type': 'Question'",
  "'@type': 'Answer'",
  "'@type': 'BreadcrumbList'",
  'buildQuickAnswers(landing, venues, lastReviewed)',
  'Quick answers',
  'What travelers ask first',
  'Short answers drawn from the same verified venue inventory used by this guide.',
  'Venue-by-venue trip guides',
  'More Texas sports markets',
  'More sports venue guides',
  'Browse all Texas sports venues',
]) assert(route.includes(marker), `Sports venue landing route is missing SEO/AEO/discovery marker: ${marker}.`);

assert(!route.includes('sports-venue-enrichment-all'), 'Sports venue landing pages must not import the full venue enrichment payload.');
assert(!route.includes('loadTexasKnowledgeGraph'), 'Sports venue landing pages must remain on the static venue index path rather than loading the remote/full graph.');

for (const marker of [
  'SPORTS_VENUE_LANDINGS',
  'Browse Texas sports by market or sport',
  'Texas sports markets',
  'Sports and venue types',
  'href={`/sports-venues/${item.slug}`}',
]) assert(indexComponent.includes(marker), `Sports venue landing index is missing navigation marker: ${marker}.`);

assert(directory.includes('SportsVenueLandingIndex'), 'The statewide sports venue directory must link to market/theme landing pages.');
assert(sports.includes('SportsVenueLandingIndex'), 'The main Texas Sports page must link to market/theme landing pages.');

for (const marker of [
  "kind: 'market'",
  "kind: 'theme'",
  'planning:',
  'description:',
  'intro:',
  'SPORTS_VENUE_LANDING_PATHS',
  'matchesSportsVenueLanding',
  'sportsVenueLandingLinksForVenue',
]) assert(landings.includes(marker), `Sports venue landing taxonomy is missing marker: ${marker}.`);

const venueSources = `${majorVenues}\n${tier2Venues}`;
const representativeVenueByLanding = {
  'dallas-fort-worth': 'att-stadium',
  houston: 'daikin-park',
  'austin-central-texas': 'circuit-of-the-americas',
  'san-antonio': 'frost-bank-center',
  waco: 'mclane-stadium',
  'college-station': 'kyle-field',
  'el-paso': 'sun-bowl-stadium',
  lubbock: 'jones-att-stadium',
  football: 'darrell-k-royal-texas-memorial-stadium',
  baseball: 'globe-life-field',
  basketball: 'toyota-center-houston',
  motorsports: 'texas-motor-speedway',
  'college-sports': 'kyle-field',
  'high-school-football': 'eagle-stadium-allen',
  'rodeo-western': 'will-rogers-memorial-center',
  golf: 'pga-frisco-fields-ranch',
  soccer: 'q2-stadium',
};

for (const [landing, venueSlug] of Object.entries(representativeVenueByLanding)) {
  assert(venueSources.includes(`'${venueSlug}'`), `${landing} landing lost its representative verified venue ${venueSlug}.`);
}

if (errors.length) {
  console.error('Sports venue landing validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue landings validated: ${expectedLandings.length} indexable market/theme pages are sitemap-owned, internally linked, answer-first, structured and kept off the heavy enrichment path.`);
