import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const guides = read('src/data/sports-venue-guide-pilots.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const images = read('src/data/sports-venue-images.ts');
const remediation = read('src/data/sports-venue-content-remediation-wave5.ts');
const eventFn = read('src/data/sports-venue-events.functions.ts');
const carousel = read('src/components/editorial/TexasEventCarousel.tsx');
const registry = JSON.parse(read('public/stay-nearby-hotels.json'));
const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const venues = [
  ['cotton-bowl-stadium', 'Cotton Bowl Stadium'],
  ['choctaw-stadium', 'Choctaw Stadium'],
  ['ford-center-at-the-star', 'Ford Center at The Star'],
  ['datcu-stadium', 'DATCU Stadium'],
  ['riders-field', 'Riders Field'],
  ['lone-star-park', 'Lone Star Park'],
];

for (const [slug, name] of venues) {
  requireText(dynamicRoute, `'${slug}'`, `${name} dynamic guide rollout allowlist`);
  requireText(guides, `"${slug}": {`, `${name} verified guide facts`);
  requireText(guides, `canonicalPath: "/sports-venue/${slug}"`, `${name} canonical path`);
  requireText(images, `'${slug}': {`, `${name} licensed venue image`);
  requireText(remediation, `'${slug}': {`, `${name} venue-specific editorial remediation`);

  const guideStart = guides.indexOf(`"${slug}": {`);
  const nextGuide = guides.indexOf('\n  "', guideStart + 1);
  const guideBlock = guides.slice(guideStart, nextGuide === -1 ? undefined : nextGuide);
  requireText(guideBlock, 'reviewedAt:', `${name} review metadata`);
  requireText(guideBlock, 'officialUrl:', `${name} official venue URL`);
  requireText(guideBlock, 'sources: [', `${name} source list`);

  const hotelContexts = registry.properties.flatMap((property) =>
    (property.contexts || [])
      .filter((context) => context.kind === 'venue' && context.key === slug)
      .map((context) => ({ property, context })),
  ).sort((a, b) => a.context.rank - b.context.rank);
  if (hotelContexts.length > 3) failures.push(`${name}: Stay Nearby must not exceed three curated properties.`);
  if (hotelContexts.length) {
    const expectedRanks = hotelContexts.map((_, index) => index + 1).join(',');
    const actualRanks = hotelContexts.map(({ context }) => context.rank).join(',');
    if (actualRanks !== expectedRanks) failures.push(`${name}: Stay Nearby ranks must be contiguous from 1.`);
    for (const { property, context } of hotelContexts) {
      if (property.status !== 'active') failures.push(`${name}: inactive hotel ${property.name} must not be selected.`);
      if (!context.source?.url || !context.source?.verifiedAt) failures.push(`${name}: hotel ${property.name} lacks source review metadata.`);
    }
  }
}

for (const marker of [
  "createFileRoute('/sports-venue/$slug')",
  'isSportsVenueGuidePilot(params.slug)',
  'getSportsVenueUpcomingEvents',
  'guideEvents?.events ?? []',
  "guideEvents?.calendarHref ?? '/events'",
  'isSportsVenueGuidePilot(slug)',
  'SportsVenueGuidePilotContent',
  'eventCalendarHref={eventCalendarHref}',
  'countyVisitorPlaces',
  'isIndexableEntityPage',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
]) requireText(dynamicRoute, marker, 'governed dynamic sports venue route');

for (const marker of [
  'getSportsVenuePhoto(slug)',
  'getSportsVenueEnrichmentAll(slug)',
  'TexasDefinedStayNearby?.refresh?.()',
  'event.image?.url !== photo.imageUrl',
]) requireText(guideContent, marker, 'shared guide content safeguards');

for (const marker of [
  'TexasEventCarousel',
  'data-stay-nearby-slot',
  'Know before you go',
  'Venue story',
  'Nearby attractions',
  'Verification & review',
  'photo.licenseUrl',
]) requireText(guidePage, marker, 'shared venue guide architecture');

for (const marker of ['`sports-venue:${data.slug}`', 'encodeURIComponent(venueId)', '#calendar']) {
  requireText(eventFn, marker, 'venue-filtered event/calendar integration');
}
for (const marker of ['EventTicketCta', 'View all events', 'View Calendar']) {
  requireText(carousel, marker, 'provider-neutral event/ticket carousel');
}

for (const filler of ['homeTeam: "N/A"', 'homeTeam: "None"', 'Make the venue part of the weekend', 'Best trip pattern']) {
  if (guides.includes(filler)) failures.push(`Guide registry contains prohibited filler: ${filler}`);
}

for (const [slug, name] of venues) {
  const staticPath = `src/routes/sports-venue.${slug}.tsx`;
  if (fs.existsSync(staticPath)) failures.push(`${name}: redundant static route must not bypass the governed /sports-venue/$slug route.`);
}
if (fs.existsSync('src/data/sports-venue-guide-route.ts')) failures.push('Superseded sports-venue-guide-route.ts helper must remain removed.');

if (failures.length) {
  console.error('Sports venue Phase 3 wave-one validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue Phase 3 wave-one validation passed for ${venues.length} migrations: the governed dynamic venue route selects the approved guide renderer, with verified facts/editorial, licensed venue imagery, canonical upcoming events and calendar filters, provider-neutral ticket fallbacks, safe optional Stay Nearby behavior and source/review metadata without generic filler.`);
