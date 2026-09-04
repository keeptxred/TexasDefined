import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');
const readRouteSurface = async (file) => {
  const eagerSource = await read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  try {
    return `${eagerSource}\n${await read(lazyFile)}`;
  } catch (error) {
    if (error?.code === 'ENOENT') return eagerSource;
    throw error;
  }
};

const [landings, landingPaths, route, indexComponent, quickAnswers, countySports, sportsSearch, directory, sports, genericVenue, galaxyVenue, entityRoute, searchRoute, homepage, guidebook, queries, types, llms, publicRoutes, majorVenues, tier2Venues] = await Promise.all([
  read('src/data/sports-venue-landings.ts'),
  read('src/data/sports-venue-landing-paths.ts'),
  read('src/routes/sports-venues.$landing.tsx'),
  read('src/components/sports/SportsVenueLandingIndex.tsx'),
  read('src/components/sports/SportsVenueQuickAnswers.tsx'),
  read('src/components/sports/CountySportsDestinations.tsx'),
  read('src/data/sports-venue-search.ts'),
  read('src/routes/sports-venues.tsx'),
  readRouteSurface('src/routes/sports.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/routes/sports-venue.jones-att-stadium.tsx'),
  readRouteSurface('src/routes/$kind.$slug.tsx'),
  read('src/routes/search.tsx'),
  readRouteSurface('src/routes/index.tsx'),
  readRouteSurface('src/routes/guides.tsx'),
  read('src/data/queries.ts'),
  read('src/data/types.ts'),
  read('src/routes/llms[.]txt.ts'),
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
  'isIndexableEntityPage(venue)',
  "landing.slug === 'golf' && venue.tags?.includes('starter-golf-directory')",
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

assert(!route.includes("landing.slug !== 'golf'"), 'Sports landing publication gate must not be inverted to make non-golf collections bypass indexability.');
assert(!route.includes('sports-venue-enrichment-all'), 'Sports venue landing pages must not import the full venue enrichment payload.');
assert(!route.includes('loadTexasKnowledgeGraph'), 'Sports venue landing pages must remain on the static venue index path rather than loading the remote/full graph.');

for (const marker of [
  'SPORTS_VENUE_LANDINGS',
  'Browse Texas sports by market or sport',
  'Texas sports markets',
  'Sports and venue types',
  'href={`/sports-venues/${item.slug}`}',
]) assert(indexComponent.includes(marker), `Sports venue landing index is missing navigation marker: ${marker}.`);

for (const marker of [
  'SportsVenueQuickAnswers',
  "'@type': 'FAQPage'",
  "'@type': 'Question'",
  "'@type': 'Answer'",
  'Planning a visit to {venueName}',
  'Where is ${venueName}?',
  'What sports or events take place at ${venueName}?',
  'What should I know about parking at ${venueName}?',
  'When should I arrive at ${venueName}?',
  'firstSentence(parking)',
  'firstSentence(arrival)',
  'How current is this ${venueName} visitor guide?',
  'official links farther down the guide',
]) assert(quickAnswers.includes(marker), `Sports venue quick-answer component is missing AEO/source-safety marker: ${marker}.`);

for (const marker of [
  'CountySportsDestinations',
  "'@type': 'ItemList'",
  'Sports destinations',
  'Major sports venues in {county.name}',
  'What major sports venues are in {county.name}?',
  'County-wide does not mean every venue is close to the county seat.',
  'sportsVenueLandingLinksForVenue',
  'href={`/sports-venues/${landing.slug}`}',
  'All Texas sports venues',
]) assert(countySports.includes(marker), `County sports discovery component is missing editorial/discovery marker: ${marker}.`);
assert(!countySports.includes('sports-venue-enrichment-all'), 'County sports discovery must not import the heavy sports enrichment payload.');

for (const marker of [
  'MAJOR_TEXAS_SPORTS_VENUES',
  'TEXAS_SPORTS_VENUE_TIER2_ENTITIES',
  'applyCurrentEntityCorrections',
  'SPORTS_VENUE_LANDINGS',
  'const reliantDocument',
  "'NRG Stadium'",
  'const venueMap = new Map(',
  "kind: 'sports-venue'",
  "kind: 'sports-collection'",
  'href: `/sports-venue/${venue.slug}`',
  'href: `/sports-venues/${landing.slug}`',
  "href: '/sports-venues'",
  "href: '/sports'",
]) assert(sportsSearch.includes(marker), `Sports search index is missing verified venue/collection marker: ${marker}.`);
assert(!sportsSearch.includes('TEXAS_ENTITY_REGISTRY'), 'Sports search index must not import the full statewide entity registry.');
assert(!sportsSearch.includes('entitiesByKind'), 'Sports search index must stay on the direct sports seed path rather than the full knowledge graph helper.');
assert(!sportsSearch.includes('loadTexasKnowledgeGraph'), 'Sports search index must not load the remote/full knowledge graph.');

for (const marker of [
  'await import("./sports-venue-search")',
  'buildSportsVenueSearchDocuments()',
  'const sportsDocuments =',
  'base.push(document)',
]) assert(queries.includes(marker), `Shared search query is missing lazy sports index marker: ${marker}.`);
assert(!queries.includes('import { buildSportsVenueSearchDocuments'), 'Shared queries must not statically import the sports venue search index.');

for (const marker of [
  '"sports-venue"',
  '"sports-collection"',
]) assert(types.includes(marker), `SearchDocumentKind is missing sports search kind: ${marker}.`);

for (const marker of [
  '{ to: "/sports-venues", label: "Sports Venues"',
  'Caddo Lake, Kyle Field, Marfa, property taxes…',
  'town, landmark, stadium, subject, guide, event',
  '"sports-venue": "Sports venue"',
  '"sports-collection": "Sports collection"',
]) assert(searchRoute.includes(marker), `Site search UI is missing sports discovery marker: ${marker}.`);

for (const marker of [
  "import { CountySportsDestinations } from '@/components/sports/CountySportsDestinations'",
  "candidate.kind === 'sports-venue'",
  'candidate.countySlug === entity.slug',
  'isIndexableEntityPage(candidate)',
  'sportsVenuePriority(left) - sportsVenuePriority(right)',
  '<CountySportsDestinations county={entity} venues={countySportsVenues} />',
]) assert(entityRoute.includes(marker), `County entity route is missing sports-venue graph integration marker: ${marker}.`);

for (const marker of [
  'const sportsTravelPicks = [',
  'Texas sports travel',
  'Make game day part of the trip',
  'actionTo="/sports-venues"',
  'to: "/sports-venues/dallas-fort-worth"',
  'to: "/sports-venues/football"',
  'to: "/sports-venues/motorsports"',
  'Open the guide →',
]) assert(homepage.includes(marker), `Homepage is missing sports authority-flow marker: ${marker}.`);
assert(!homepage.includes('sports-venue-enrichment-all'), 'Homepage sports promotion must not import the heavy sports venue enrichment payload.');

for (const marker of [
  'Texas Sports Venue Guide',
  'to: "/sports-venues"',
  'stadiums, arenas, ballparks, racetracks, college venues and other sports destinations',
  'Verified venue guides for planning game days and sports weekends.',
  '<Link to={guide.to}',
]) assert(guidebook.includes(marker), `Guidebook is missing sports travel discovery marker: ${marker}.`);
assert(!guidebook.includes('sports-venue-enrichment-all'), 'Guidebook sports promotion must not import the heavy sports venue enrichment payload.');

for (const marker of [
  '## Sports travel',
  'Texas sports venue directory: https://texasdefined.com/sports-venues',
  'https://texasdefined.com/sports-venues/dallas-fort-worth',
  'https://texasdefined.com/sports-venues/houston',
  'https://texasdefined.com/sports-venues/football',
  'https://texasdefined.com/sports-venues/motorsports',
  'treat official venue or event sources as controlling for current schedules, parking, ticketing, gate times and entry policies',
]) assert(llms.includes(marker), `llms.txt is missing sports retrieval/citation guidance marker: ${marker}.`);

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

for (const marker of [
  "import { SportsVenueQuickAnswers } from '@/components/sports/SportsVenueQuickAnswers'",
  "import { sportsVenueLandingLinksForVenue } from '@/data/sports-venue-landings'",
  'const landingLinks = sportsVenueLandingLinksForVenue(entity);',
  '<SportsVenueQuickAnswers',
  'primaryEvents={enrichment?.primaryEvents}',
  'parking={enrichment?.parking}',
  'arrival={enrichment?.arrival}',
  'verifiedAt={enrichment?.verifiedAt ?? entity.sourceCheckedAt}',
  'Explore the collection',
  'More venues like {entity.name}',
  'href={`/sports-venues/${landing.slug}`}',
  'Browse collection →',
]) assert(genericVenue.includes(marker), `Generic sports venue guide is missing answer-first or bidirectional discovery marker: ${marker}.`);

for (const marker of [
  "import { SportsVenueQuickAnswers } from '@/components/sports/SportsVenueQuickAnswers'",
  '<SportsVenueQuickAnswers',
  'venueName={venueName}',
  'parking={enrichment?.parking}',
  'arrival={enrichment?.arrival}',
  'verifiedAt={enrichment?.verifiedAt}',
  'Explore the collection',
  '/sports-venues/lubbock',
  '/sports-venues/football',
  '/sports-venues/college-sports',
  'Browse collection →',
]) assert(galaxyVenue.includes(marker), `Galaxy Stadium exception is missing answer-first or sports collection discovery marker: ${marker}.`);

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

console.log(`Sports venue landings validated: ${expectedLandings.length} indexable market/theme pages, venue guides, county guides, site-wide discovery surfaces and lazy site search are answer-first, bidirectionally linked, structured, source-safe, and validated across eager and lazy route surfaces.`);
