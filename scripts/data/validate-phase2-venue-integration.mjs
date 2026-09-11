import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/sports-venue.$slug.tsx');
const guides = read('src/data/sports-venue-guide-pilots.ts');
const page = read('src/components/sports/SportsVenueGuidePage.tsx');
const pilot = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const carousel = read('src/components/editorial/TexasEventCarousel.tsx');
const carouselCss = read('src/components/editorial/texas-event-carousel.css');
const venueEvents = read('src/data/sports-venue-events.functions.ts');
const imageRegistry = read('src/data/sports-venue-images.ts');
const remediation = read('src/data/sports-venue-content-remediation.ts');
const ticketResolver = read('src/data/events/ticketing.ts');
const ticketProjection = read('src/data/events/texas-event-calendar.server.ts');
const ticketCta = read('src/components/events/EventTicketCta.tsx');
const stayNearbyBootstrap = read('public/expedia-travel.js');
const hotels = JSON.parse(read('public/stay-nearby-hotels.json'));

const candidates = [
  'amon-g-carter-stadium',
  'gerald-j-ford-stadium',
  'globe-life-field',
  'american-airlines-center',
  'texas-motor-speedway',
];

const failures = [];
const requireText = (source, token, label) => {
  if (!source.includes(token)) failures.push(`${label} is missing required contract text: ${token}`);
};

for (const slug of candidates) {
  requireText(route, `'${slug}'`, `${slug} route rollout`);
  requireText(guides, `"${slug}": {`, `${slug} verified guide profile`);
  requireText(guides, `canonicalPath: "/sports-venue/${slug}"`, `${slug} canonical guide path`);
  requireText(imageRegistry, `'${slug}': {`, `${slug} governed hero photograph`);
  requireText(remediation, `'${slug}': {`, `${slug} venue-specific editorial remediation`);

  const matches = hotels.properties.filter((property) =>
    (property.contexts ?? []).some((context) => context.kind === 'venue' && context.key === slug));
  if (matches.length !== 3) failures.push(`${slug} must have exactly three curated Stay Nearby choices; found ${matches.length}.`);
  const ranks = matches
    .flatMap((property) => property.contexts.filter((context) => context.kind === 'venue' && context.key === slug))
    .map((context) => context.rank)
    .sort((a, b) => a - b);
  if (ranks.join(',') !== '1,2,3') failures.push(`${slug} Stay Nearby ranks must be exactly 1,2,3; found ${ranks.join(',') || '<none>'}.`);
  for (const property of matches) {
    const context = property.contexts.find((item) => item.kind === 'venue' && item.key === slug);
    if (!context?.source?.url?.startsWith('https://') || !context.source.verifiedAt) failures.push(`${property.id} lacks source-backed Phase 2 venue context.`);
    if (property.image && property.image.rightsSource !== 'expedia-creator-toolbox') failures.push(`${property.id} bypasses the property-image rights gate.`);
    for (const target of property.bookingTargets ?? []) {
      if (target.affiliateUrl && target.verified !== true) failures.push(`${property.id} has an unverified affiliate property link.`);
    }
  }
}

for (const token of [
  'SportsVenueGuidePilotContent',
  "upcomingEvents: guideEvents?.events ?? []",
  "eventCalendarHref: guideEvents?.calendarHref ?? '/events'",
  'isSportsVenueGuidePilot(params.slug)',
]) requireText(route, token, 'venue route integration');

for (const token of [
  'guide.schemaType ?? "StadiumOrArena"',
  'guide.homeTeamLabel ?? "Home team"',
  'Get Directions',
  'Official Venue Site',
  'events={upcomingEvents}',
  'viewAllHref={eventCalendarHref}',
  'data-stay-nearby-slot',
  'Know before you go',
  'Venue story',
  'Nearby discovery',
  'Verification & review',
  'Last reviewed',
]) requireText(page, token, 'shared venue guide shell');

for (const token of [
  'const photo = getSportsVenuePhoto(slug)',
  'event.image?.url !== photo.imageUrl',
  'eventWithoutDuplicateVenueImage',
  'nearbyAttractions={[]}',
  'upcomingEvents={venueEvents}',
  'TexasDefinedStayNearby?.refresh?.()',
]) requireText(pilot, token, 'venue pilot client integration');

for (const token of [
  'EventTicketCta',
  'View all events',
  'View Calendar',
  'ArrowLeft',
  'ArrowRight',
  'event.key === "Home" || event.key === "End"',
  'aria-roledescription="carousel"',
  'scrollBy',
]) requireText(carousel, token, 'event carousel accessibility and actions');

for (const token of [
  'overflow-x: auto',
  'scroll-snap-type: x mandatory',
  'min-width: 84%',
  '@media (min-width: 640px)',
  'min-width: calc(50% - .5rem)',
  '@media (min-width: 1024px)',
  'min-width: calc(33.333% - .7rem)',
]) requireText(carouselCss, token, 'responsive/swipe carousel styling');

for (const token of [
  'loadUpcomingTexasEventRecordsServer',
  'venueId = `sports-venue:${data.slug}`',
  'limit: 9',
  '/events?venue=${encodeURIComponent(venueId)}#calendar',
]) requireText(venueEvents, token, 'venue event server boundary and calendar deep link');

for (const token of [
  'resolveEventTicketCta',
  "return null",
]) requireText(ticketResolver, token, 'provider-neutral ticket resolver');
requireText(ticketProjection, 'ticketCta: resolveEventTicketCta(event.ticketing)', 'ticket CTA calendar/carousel projection');
for (const token of ['rel={cta.rel}', 'cta.disclosure', 'TexasDefined never owns ticket checkout']) requireText(ticketCta, token, 'ticket CTA disclosure/fallback component');

for (const token of [
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings',
  'aria-roledescription',
  'ArrowLeft',
  'scroll-snap-type',
  'calc((100% - 2rem)/3)',
  'property.image',
  'expedia-creator-toolbox',
  'affiliateUrl',
]) requireText(stayNearbyBootstrap, token, 'Stay Nearby affiliate/fallback contract');

if (hotels.policy?.maxCards !== 3) failures.push('Stay Nearby policy must continue to cap venue carousels at three cards.');
if (hotels.policy?.displayComputedDistance !== false) failures.push('Stay Nearby must continue to forbid computed distance display.');
if (hotels.policy?.broadVenueFallback !== false) failures.push('Stay Nearby must continue to fail closed instead of using broad venue fallbacks.');

for (const token of [
  'homeTeamLabel: "Primary use"',
  'schemaType: "SportsActivityLocation"',
  'NASCAR and major motorsports events',
]) requireText(guides, token, 'Texas Motor Speedway non-team template support');

if (failures.length) {
  console.error('Phase 2 venue integration validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS: Phase 2 production candidates use the shared verified venue shell with governed hero photography, compact facts, directions and official sources, canonical venue-filtered events/calendar, provider-neutral ticket CTAs, concise visit logistics, exactly three source-backed Stay Nearby choices, venue-specific story/nearby context, source review metadata, responsive keyboard/swipe carousels, safe affiliate/property-image fallbacks, and motorsports-aware structured data.');
