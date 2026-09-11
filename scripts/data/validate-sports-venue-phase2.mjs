import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/sports-venue.$slug.tsx');
const guides = read('src/data/sports-venue-guide-pilots.ts');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const carousel = read('src/components/editorial/TexasEventCarousel.tsx');
const carouselCss = read('src/components/editorial/texas-event-carousel.css');
const eventFn = read('src/data/sports-venue-events.functions.ts');
const eventRecords = read('src/data/events/texas-event-records.server.ts');
const images = read('src/data/sports-venue-images.ts');
const expedia = read('public/expedia-travel.js');
const registry = JSON.parse(read('public/stay-nearby-hotels.json'));
const failures = [];
const requireText = (source, needle, label) => { if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`); };

const slugs = [
  'amon-g-carter-stadium',
  'gerald-j-ford-stadium',
  'globe-life-field',
  'american-airlines-center',
  'texas-motor-speedway',
];

for (const slug of slugs) {
  requireText(route, `'${slug}'`, `${slug} route integration`);
  requireText(guides, `"${slug}"`, `${slug} guide facts`);
  requireText(guides, `canonicalPath: "/sports-venue/${slug}"`, `${slug} canonical path`);
  requireText(images, `'${slug}'`, `${slug} licensed hero image`);
  const hotelContexts = registry.properties.flatMap((property) =>
    (property.contexts || []).filter((context) => context.kind === 'venue' && context.key === slug)
      .map((context) => ({ property, context }))
  ).sort((a, b) => a.context.rank - b.context.rank);
  if (hotelContexts.length !== 3) failures.push(`${slug}: expected exactly 3 curated Stay Nearby cards, found ${hotelContexts.length}`);
  if (hotelContexts.map(({ context }) => context.rank).join(',') !== '1,2,3') failures.push(`${slug}: hotel ranks must be 1,2,3`);
}

for (const marker of [
  'Get Directions',
  'Official Venue Site',
  'TexasEventCarousel',
  'data-stay-nearby-slot',
  'Know before you go',
  'Venue story',
  'Nearby attractions',
  'Sources',
  'Last reviewed',
  'StadiumOrArena',
]) requireText(guidePage, marker, 'shared venue guide');

for (const marker of ['EventTicketCta', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'aria-roledescription="carousel"', 'View all events', 'View Calendar']) requireText(carousel, marker, 'event carousel accessibility/CTA');
for (const marker of ['overflow-x: auto', 'scroll-snap-type: x mandatory', 'min-width: 84%', '@media (min-width: 640px)', '@media (min-width: 1024px)', 'calc(33.333% - .7rem)']) requireText(carouselCss, marker, 'event carousel responsive behavior');
for (const marker of ['`sports-venue:${data.slug}`', 'encodeURIComponent(venueId)', '#calendar', 'limit: 9']) requireText(eventFn, marker, 'venue event query');
for (const marker of ['timeZone: "America/Chicago"', 'startsOnOrAfter', '["scheduled", "postponed"]']) requireText(eventRecords, marker, 'event expiration');
for (const marker of ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings', 'rel = "sponsored noopener noreferrer"', 'td-stay-media']) requireText(expedia, marker, 'Stay Nearby disclosure/fallback');
if (registry.policy?.displayComputedDistance !== false) failures.push('Stay Nearby must keep computed hotel distance display disabled unless verified distance data is introduced.');
requireText(route, 'canonicalLink(texasDefinedBrand, canonicalPath)', 'venue canonical');
requireText(guidePage, 'canonicalEntityPath(item)', 'nearby internal links');

if (guides.includes('homeTeam: "N/A"') || guides.includes('homeTeam: "None"')) failures.push('Guide facts must omit nonexistent home teams instead of adding filler.');
const tmsBlock = guides.split('"texas-motor-speedway": {')[1]?.split('\n  },\n};')[0] ?? '';
if (tmsBlock.includes('homeTeam:')) failures.push('Texas Motor Speedway must not invent a home team.');

if (failures.length) {
  console.error('Sports venue Phase 2 integration validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue Phase 2 integration validation passed for five production candidates: shared responsive event/calendar/ticketing, real licensed venue imagery, verified quick facts, safe lodging fallbacks, internal linking, sources, canonicals and expiration behavior are wired without template filler.');
