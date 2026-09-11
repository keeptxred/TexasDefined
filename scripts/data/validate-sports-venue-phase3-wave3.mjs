import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const guides = read('src/data/sports-venue-guide-pilots.ts');
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

const enrichmentPaths = fs.readdirSync('src/data')
  .filter((name) => name.startsWith('sports-venue-enrichment') && name.endsWith('.ts'))
  .map((name) => `src/data/${name}`);
const remediationPaths = fs.readdirSync('src/data')
  .filter((name) => name.startsWith('sports-venue-content-remediation') && name.endsWith('.ts'))
  .map((name) => `src/data/${name}`);
const editorialPaths = [...enrichmentPaths, ...remediationPaths];

const venues = [
  ['daikin-park', 'Daikin Park'],
  ['toyota-center-houston', 'Toyota Center'],
  ['shell-energy-stadium', 'Shell Energy Stadium'],
  ['tdecu-stadium', 'TDECU Stadium'],
  ['fertitta-center', 'Fertitta Center'],
  ['q2-stadium', 'Q2 Stadium'],
  ['moody-center', 'Moody Center'],
  ['frost-bank-center', 'Frost Bank Center'],
  ['alamodome', 'Alamodome'],
  ['olsen-field-blue-bell-park', 'Olsen Field at Blue Bell Park'],
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
  requireText(guides, `"${slug}": {`, `${name} verified guide facts`);
  requireText(guides, `canonicalPath: "/sports-venue/${slug}"`, `${name} canonical path`);

  const guideStart = guides.indexOf(`"${slug}": {`);
  const nextGuide = guides.indexOf('\n  "', guideStart + 1);
  const guideBlock = guides.slice(guideStart, nextGuide === -1 ? undefined : nextGuide);
  requireText(guideBlock, 'reviewedAt:', `${name} review metadata`);
  requireText(guideBlock, 'officialUrl:', `${name} official venue URL`);
  requireText(guideBlock, 'sources: [', `${name} source list`);
  if (!/officialUrl: "https:\/\//.test(guideBlock)) failures.push(`${name}: official URL must be HTTPS.`);
  if (!/href: "https:\/\//.test(guideBlock)) failures.push(`${name}: guide source list must contain an HTTPS source.`);

  const blocks = findEditorialBlocks(slug);
  if (!blocks.length) {
    failures.push(`${name}: source-reviewed venue-specific editorial enrichment is missing.`);
  } else {
    const completeBlock = blocks.find(({ block }) =>
      ['primaryEvents:', 'parking:', 'arrival:', 'planningLinks:', 'verifiedAt'].every((marker) => block.includes(marker)));
    if (!completeBlock) {
      failures.push(`${name}: no single verified editorial record contains events, parking, arrival, planning links and review metadata.`);
    }
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

  const staticPath = `src/routes/sports-venue.${slug}.tsx`;
  if (fs.existsSync(staticPath)) failures.push(`${name}: redundant static route must not bypass the governed /sports-venue/$slug route.`);
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
  'A verified venue photograph is not available yet.',
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

const tmsStart = guides.indexOf('"texas-motor-speedway": {');
if (tmsStart === -1 || guides.indexOf('\n  "', tmsStart + 1) !== -1) {
  failures.push('Texas Motor Speedway must remain the terminal guide registry record for the existing Phase 2 compatibility contract.');
}
if (fs.existsSync('src/data/sports-venue-guide-route.ts')) failures.push('Superseded sports-venue-guide-route.ts helper must remain removed.');

if (failures.length) {
  console.error('Sports venue Phase 3 wave-three validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue Phase 3 wave-three validation passed for ${venues.length} migrations: governed dynamic routing, source-reviewed venue-specific editorial records, canonical event/calendar wiring, provider-neutral ticket fallbacks, fail-closed Stay Nearby behavior and licensed-photo-or-intentional-fallback image handling remain intact without generic filler.`);
