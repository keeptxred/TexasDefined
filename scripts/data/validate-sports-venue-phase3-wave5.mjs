import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const legacyGuides = read('src/data/sports-venue-guide-pilots.ts');
const wave4Guides = read('src/data/sports-venue-guide-wave4.ts');
const wave5Guides = read('src/data/sports-venue-guide-wave5.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const images = read('src/data/sports-venue-images.ts');
const eventFn = read('src/data/sports-venue-events.functions.ts');
const carousel = read('src/components/editorial/TexasEventCarousel.tsx');
const galaxyRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');
const currentCorrections = read('src/data/knowledge-graph/current-entity-corrections.ts');
const registry = JSON.parse(read('public/stay-nearby-hotels.json'));
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const editorialPaths = fs.readdirSync('src/data')
  .filter((name) => (
    name.startsWith('sports-venue-enrichment')
    || name.startsWith('sports-venue-content-remediation')
  ) && name.endsWith('.ts'))
  .map((name) => `src/data/${name}`);

const venues = [
  ['united-supermarkets-arena', 'United Supermarkets Arena'],
  ['sun-bowl-stadium', 'Sun Bowl Stadium'],
  ['don-haskins-center', 'Don Haskins Center'],
  ['southwest-university-park', 'Southwest University Park'],
  ['hodgetown', 'HODGETOWN'],
  ['momentum-bank-ballpark', 'Momentum Bank Ballpark'],
  ['whataburger-field', 'Whataburger Field'],
  ['bowers-stadium', 'Elliott T. Bowers Stadium'],
];

function findEditorialBlocks(slug) {
  const blocks = [];
  for (const path of editorialPaths) {
    const source = read(path);
    let cursor = 0;
    const marker = `'${slug}': {`;
    while ((cursor = source.indexOf(marker, cursor)) !== -1) {
      const next = source.indexOf("\n  '", cursor + marker.length);
      blocks.push({ path, block: source.slice(cursor, next === -1 ? undefined : next) });
      cursor += marker.length;
    }
  }
  return blocks;
}

for (const [slug, name] of venues) {
  requireText(dynamicRoute, `'${slug}'`, `${name} dynamic guide rollout allowlist`);
  requireText(wave5Guides, `'${slug}': {`, `${name} verified wave-five guide`);
  requireText(wave5Guides, `canonicalPath: '/sports-venue/${slug}'`, `${name} canonical path`);

  const guideStart = wave5Guides.indexOf(`'${slug}': {`);
  const nextGuide = wave5Guides.indexOf("\n  '", guideStart + 1);
  const guideBlock = wave5Guides.slice(guideStart, nextGuide === -1 ? undefined : nextGuide);
  requireText(guideBlock, 'reviewedAt:', `${name} review metadata`);
  requireText(guideBlock, 'officialUrl:', `${name} official venue URL`);
  requireText(guideBlock, 'sources: [', `${name} source list`);
  if (!/officialUrl: 'https:\/\//.test(guideBlock)) failures.push(`${name}: official URL must be HTTPS.`);
  if (!/href: 'https:\/\//.test(guideBlock)) failures.push(`${name}: guide source list must contain an HTTPS source.`);

  const blocks = findEditorialBlocks(slug);
  if (!blocks.length) {
    failures.push(`${name}: source-reviewed venue-specific editorial enrichment is missing.`);
  } else {
    const completeBlock = blocks.find(({ block }) =>
      ['primaryEvents:', 'parking:', 'arrival:', 'planningLinks:', 'verifiedAt'].every((marker) => block.includes(marker)));
    if (!completeBlock) failures.push(`${name}: no single verified editorial record contains events, parking, arrival, planning links and review metadata.`);
  }

  const hasDedicatedPhoto = images.includes(`'${slug}': {`);
  if (hasDedicatedPhoto) {
    const photoStart = images.indexOf(`'${slug}': {`);
    const nextPhoto = images.indexOf("\n  '", photoStart + 1);
    const photoBlock = images.slice(photoStart, nextPhoto === -1 ? undefined : nextPhoto);
    for (const marker of ['sourcePage:', 'author:', 'licenseName:', 'licenseUrl:']) {
      requireText(photoBlock, marker, `${name} dedicated photo rights metadata`);
    }
  } else {
    requireText(guidePage, 'A verified venue photograph is not available yet.', `${name} intentional image fallback`);
    requireText(guidePage, 'image: photo?.imageUrl', `${name} fail-closed image structured data`);
  }

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

  if (fs.existsSync(`src/routes/sports-venue.${slug}.tsx`)) {
    failures.push(`${name}: redundant static route must not bypass the governed /sports-venue/$slug route.`);
  }
}

for (const marker of [
  "createFileRoute('/sports-venue/$slug')",
  'isSportsVenueGuidePilot(params.slug)',
  'getSportsVenueUpcomingEvents',
  'guideEvents?.events ?? []',
  "guideEvents?.calendarHref ?? '/events'",
  'SportsVenueGuidePilotContent',
  'eventCalendarHref={eventCalendarHref}',
  'countyVisitorPlaces',
  'isIndexableEntityPage',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
]) requireText(dynamicRoute, marker, 'governed dynamic sports venue route');

for (const marker of [
  'getSportsVenueGuideWave5',
  'getSportsVenueGuideWave5(slug) ?? getSportsVenueGuideWave4(slug) ?? getSportsVenueGuidePilot(slug)',
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
  'A verified venue photograph is not available yet.',
]) requireText(guidePage, marker, 'shared venue guide architecture');

for (const marker of ['`sports-venue:${data.slug}`', 'encodeURIComponent(venueId)', '#calendar']) {
  requireText(eventFn, marker, 'venue-filtered event/calendar integration');
}
for (const marker of ['EventTicketCta', 'View all events', 'View Calendar']) {
  requireText(carousel, marker, 'provider-neutral event/ticket carousel');
}

if (!wave5Guides.includes("officialUrl: 'https://utepminers.com/facilities/don-haskins-center/3'")) {
  failures.push('Don Haskins Center must use the current UTEP facility destination /3.');
}
if (wave5Guides.includes("officialUrl: 'https://utepminers.com/facilities/don-haskins-center/1'")) {
  failures.push('Don Haskins Center stale facility destination /1 must not be carried into Wave 5.');
}
if (!wave5Guides.includes("officialUrl: 'https://gobearkats.com/facilities/bowers-stadium/22'")) {
  failures.push('Bowers Stadium must use the current Sam Houston facility destination /22.');
}
if (wave5Guides.includes("officialUrl: 'https://gobearkats.com/facilities/bowers-stadium/2'")) {
  failures.push('Bowers Stadium stale facility destination /2 must not be carried into Wave 5.');
}

for (const filler of ["homeTeam: 'N/A'", "homeTeam: 'None'", 'Make the venue part of the weekend', 'Best trip pattern']) {
  if (wave5Guides.includes(filler)) failures.push(`Wave-five guide registry contains prohibited filler: ${filler}`);
}

const tmsStart = legacyGuides.indexOf('"texas-motor-speedway": {');
if (tmsStart === -1 || legacyGuides.indexOf('\n  "', tmsStart + 1) !== -1) {
  failures.push('Texas Motor Speedway must remain the terminal legacy guide registry record for the existing Phase 2 compatibility contract.');
}
requireText(wave4Guides, "'mclane-stadium': {", 'Wave 4 registry compatibility');

// Galaxy Stadium is a protected special-case route and must remain outside this ordinary dynamic batch.
if (dynamicRoute.includes("'jones-att-stadium'")) failures.push('Galaxy Stadium/Jones AT&T Stadium must remain outside the ordinary dynamic rollout allowlist.');
requireText(galaxyRoute, "createFileRoute('/sports-venue/jones-att-stadium')", 'Galaxy Stadium stable static canonical route');
requireText(galaxyRoute, "venueName = 'Galaxy Stadium'", 'Galaxy Stadium current display name');
requireText(currentCorrections, "name: 'Galaxy Stadium'", 'Galaxy Stadium current entity correction');
requireText(currentCorrections, "'Jones AT&T Stadium'", 'Galaxy Stadium former-name alias');

if (fs.existsSync('src/data/sports-venue-guide-route.ts')) failures.push('Superseded sports-venue-guide-route.ts helper must remain removed.');

if (failures.length) {
  console.error('Sports venue Phase 3 wave-five validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue Phase 3 wave-five validation passed for ${venues.length} ordinary migrations: modular verified guides, governed dynamic routing, source-reviewed editorial records, event/calendar wiring, provider-neutral ticket fallbacks, fail-closed Stay Nearby behavior and licensed-photo-or-intentional-fallback image handling remain intact; Galaxy Stadium's protected static canonical contract remains untouched.`);
