import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const legacyGuides = read('src/data/sports-venue-guide-pilots.ts');
const wave4Guides = read('src/data/sports-venue-guide-wave4.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const images = read('src/data/sports-venue-images.ts');
const eventFn = read('src/data/sports-venue-events.functions.ts');
const carousel = read('src/components/editorial/TexasEventCarousel.tsx');
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
  ['mclane-stadium', 'McLane Stadium'],
  ['foster-pavilion', 'Foster Pavilion'],
  ['heb-center-at-cedar-park', 'H-E-B Center at Cedar Park'],
  ['dell-diamond', 'Dell Diamond'],
  ['reed-arena', 'Reed Arena'],
  ['kyle-field', 'Kyle Field'],
  ['rice-stadium', 'Rice Stadium'],
  ['constellation-field', 'Constellation Field'],
  ['ufcu-stadium', 'UFCU Stadium'],
  ['nelson-wolff-stadium', 'Nelson W. Wolff Municipal Stadium'],
  ['freeman-coliseum', 'Freeman Coliseum'],
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
  requireText(wave4Guides, `'${slug}': {`, `${name} verified wave-four guide`);
  requireText(wave4Guides, `canonicalPath: '/sports-venue/${slug}'`, `${name} canonical path`);

  const guideStart = wave4Guides.indexOf(`'${slug}': {`);
  const nextGuide = wave4Guides.indexOf("\n  '", guideStart + 1);
  const guideBlock = wave4Guides.slice(guideStart, nextGuide === -1 ? undefined : nextGuide);
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
  'getSportsVenueGuideWave4',
  'getSportsVenueGuideWave4(slug) ?? getSportsVenueGuidePilot(slug)',
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

if (!wave4Guides.includes("officialUrl: 'https://baylorbears.com/facilities/foster-pavilion/1358'")) {
  failures.push('Foster Pavilion must use the current Baylor facility destination /1358.');
}
if (wave4Guides.includes('/facilities/foster-pavilion/40')) {
  failures.push('Foster Pavilion stale facility destination /40 must not be carried into Wave 4.');
}
for (const filler of ["homeTeam: 'N/A'", "homeTeam: 'None'", 'Make the venue part of the weekend', 'Best trip pattern']) {
  if (wave4Guides.includes(filler)) failures.push(`Wave-four guide registry contains prohibited filler: ${filler}`);
}

const tmsStart = legacyGuides.indexOf('"texas-motor-speedway": {');
if (tmsStart === -1 || legacyGuides.indexOf('\n  "', tmsStart + 1) !== -1) {
  failures.push('Texas Motor Speedway must remain the terminal legacy guide registry record for the existing Phase 2 compatibility contract.');
}
if (fs.existsSync('src/data/sports-venue-guide-route.ts')) failures.push('Superseded sports-venue-guide-route.ts helper must remain removed.');

if (failures.length) {
  console.error('Sports venue Phase 3 wave-four validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue Phase 3 wave-four validation passed for ${venues.length} migrations: modular verified guides, governed dynamic routing, source-reviewed venue-specific editorial records, canonical event/calendar wiring, provider-neutral ticket fallbacks, fail-closed Stay Nearby behavior and licensed-photo-or-intentional-fallback image handling remain intact without generic filler.`);
