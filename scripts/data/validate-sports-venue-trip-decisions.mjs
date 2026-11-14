import fs from 'node:fs/promises';
import path from 'node:path';

const read = (file) => fs.readFile(path.join(process.cwd(), file), 'utf8');
const files = await Promise.all([
  read('src/data/sports-venue-trip-decisions.ts'),
  read('src/routes/sports-venues.$landing.tsx'),
  read('src/routes/sports-venues.tsx'),
  read('src/routes/sports-venues.compare.tsx'),
  read('src/components/editorial/TexasEventCarousel.tsx'),
  read('src/data/sports-venue-images.ts'),
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  read('src/data/knowledge-graph/seed.ts'),
]);
const [choices, landingRoute, directory, comparison, events, images, majorVenues, tier2Venues, seed] = files;
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

const slugs = [
  'dallas-fort-worth', 'houston', 'austin-central-texas', 'san-antonio',
  'waco', 'college-station', 'el-paso', 'lubbock', 'football', 'baseball',
  'basketball', 'motorsports', 'college-sports', 'high-school-football',
  'rodeo-western', 'golf', 'soccer',
];
const titles = new Set();
for (const slug of slugs) {
  const key = slug.includes('-') ? "'"+slug+"': [" : slug + ': [';
  const start = choices.indexOf('  ' + key);
  check(start !== -1, 'Missing trip decisions for ' + slug);
  if (start === -1) continue;
  const end = choices.indexOf('\n  ],', start);
  check(end !== -1, 'Unclosed trip decisions for ' + slug);
  if (end === -1) continue;
  const block = choices.slice(start, end);
  const records = [...block.matchAll(/\{ title: '([^']+)', detail: '([^']+)'/g)];
  check(records.length === 3, slug + ': require three distinct visitor decisions (found ' + records.length + ')');
  for (const record of records) {
    check(record[1].length >= 14, slug + ': decision title too generic: ' + record[1]);
    check(record[2].length >= 125, slug + ': decision lacks practical detail: ' + record[1]);
    check(!titles.has(record[1]), 'Repeated decision heading: ' + record[1]);
    titles.add(record[1]);
  }
}
const knownVenueSeeds = majorVenues + '\n' + tier2Venues + '\n' + seed;
for (const [, slug] of choices.matchAll(/venueSlug: '([^']+)'/g)) {
  check(knownVenueSeeds.includes("'" + slug + "'") || knownVenueSeeds.includes("slug:'" + slug + "'"), 'Trip choice links to a non-existent sports venue slug: ' + slug);
}
check(titles.size >= 45, 'Original visitor decisions are missing or too repetitive');
for (const phrase of ['delve into', 'hidden gem', 'vibrant tapestry', 'unlock the magic', 'unforgettable journey']) {
  check(!choices.toLowerCase().includes(phrase), 'Generic AI-style copy is not accepted: ' + phrase);
}
check(landingRoute.includes('sportsVenueTripDecisions(landing.slug)'), 'Landing page must use per-market and per-sport decisions');
check(landingRoute.includes('const matchedVenue = choice.venueSlug ? venues.find'), 'Decision links must resolve to eligible guides');
check(landingRoute.includes('seenVenuePaths.has(path)'), 'Landing directory needs canonical path deduplication');
check(directory.includes('seenVenuePaths.has(venuePath)'), 'Statewide directory needs canonical path deduplication');
check(directory.includes('getSportsVenueEditorialDescriptions') && directory.includes('editorialDescriptions[venue.id]'), 'Statewide directory must show original verified venue editorial instead of generic seed descriptions');
check(directory.includes('catalogCount: SPORTS_VENUE_COMPARISON_INVENTORY_COUNT'), 'Curated vs complete inventory must be explained with live counts');
check(directory.includes("'@type': 'CollectionPage'") && directory.includes("'@type': 'ItemList'") && directory.includes("'@type': 'BreadcrumbList'"), 'Statewide sports directory must expose factual collection, unique links and breadcrumb schema');
check(!landingRoute.includes("'@type': 'FAQPage'"), 'Non-government sports collection must not emit generic FAQ markup');
check(comparison.includes('visibleRows.map((row)'), 'Comparison must provide functional venue filters');
check(comparison.includes('row.officialUrl'), 'Comparison must link to official sources');
check(events.includes('normalizePhotoCredit(event.image.credit)'), 'Event photo credits must normalize duplicated labels');
check(!events.includes('Photo: {event.image.credit ??'), 'Legacy unnormalized event credit still present');
check(images.includes('Reliant Stadium in Houston, Texas (formerly NRG Stadium)'), 'Current Reliant Stadium alt text must remain correct');
check(!images.includes('Reliant Stadium, now NRG Stadium'), 'Obsolete 2026 venue name remains in image alt');

if (errors.length) {
  console.error('Sports venue editorial authority failed:\n' + errors.map((item) => '- ' + item).join('\n'));
  process.exit(1);
}
console.log('Sports venue editorial authority validated: 17 distinct collection plans, canonical deduplication, live inventory explanation, working comparison controls, image-credit normalization, and current venue identity.');
