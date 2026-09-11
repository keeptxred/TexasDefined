import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const major = read('src/data/knowledge-graph/major-sports-venues.ts');
const tier2 = read('src/data/knowledge-graph/sports-venues-tier2.ts');
const seed = read('src/data/knowledge-graph/seed.ts');
const legacyGuides = read('src/data/sports-venue-guide-pilots.ts');
const wave4Guides = read('src/data/sports-venue-guide-wave4.ts');
const wave5Guides = read('src/data/sports-venue-guide-wave5.ts');
const wave6Guides = read('src/data/sports-venue-guide-wave6.ts');
const wave7Guides = read('src/data/sports-venue-guide-wave7.ts');
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
  ['sam-houston-race-park', 'Sam Houston Race Park'],
  ['circuit-of-the-americas', 'Circuit of The Americas'],
  ['retama-park', 'Retama Park'],
  ['texas-motorplex', 'Texas Motorplex'],
  ['will-rogers-memorial-center', 'Will Rogers Memorial Center'],
  ['pga-frisco-fields-ranch', 'PGA Frisco / Fields Ranch'],
  ['colonial-country-club', 'Colonial Country Club'],
  ['memorial-park-golf-course', 'Memorial Park Golf Course'],
  ['tpc-san-antonio', 'TPC San Antonio'],
  ['amarillo-national-center', 'Amarillo National Center'],
  ['extraco-events-center', 'Extraco Events Center'],
  ['expo-center-taylor-county', 'Expo Center of Taylor County'],
  ['msr-houston', 'MSR Houston'],
  ['eagles-canyon-raceway', 'Eagles Canyon Raceway'],
  ['xtreme-raceway-park', 'Xtreme Raceway Park'],
  ['houston-motorsports-park', 'Houston Motorsports Park'],
  ['national-shooting-complex', 'National Shooting Complex'],
  ['waco-surf', 'Waco Surf'],
  ['jamail-texas-swimming-center', 'Lee and Joe Jamail Texas Swimming Center'],
  ['round-rock-sports-center', 'Round Rock Sports Center'],
  ['round-rock-multipurpose-complex', 'Round Rock Multipurpose Complex'],
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
  requireText(wave7Guides, `'${slug}': {`, `${name} verified wave-seven guide`);
  requireText(wave7Guides, `canonicalPath: '/sports-venue/${slug}'`, `${name} canonical path`);

  const guideStart = wave7Guides.indexOf(`'${slug}': {`);
  const nextGuide = wave7Guides.indexOf("\n  '", guideStart + 1);
  const guideBlock = wave7Guides.slice(guideStart, nextGuide === -1 ? undefined : nextGuide);
  requireText(guideBlock, 'city:', `${name} city`);
  requireText(guideBlock, 'subtitle:', `${name} venue-specific subtitle`);
  requireText(guideBlock, 'venueType:', `${name} venue type`);
  requireText(guideBlock, 'officialUrl:', `${name} official venue URL`);
  requireText(guideBlock, 'sources:', `${name} source list`);
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

const guideEntries = [...wave7Guides.matchAll(/^\s{2}'([^']+)': \{/gm)].map((match) => match[1]);
if (guideEntries.length !== 21) failures.push(`Wave 7 must contain exactly 21 specialty guide records; found ${guideEntries.length}.`);
if (new Set(guideEntries).size !== guideEntries.length) failures.push('Wave 7 guide slugs must be unique.');
for (const [slug] of venues) {
  if (!guideEntries.includes(slug)) failures.push(`Wave 7 expected slug missing from registry: ${slug}.`);
}

const dynamicSetMatch = dynamicRoute.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\n\]\);/);
if (!dynamicSetMatch) {
  failures.push('Unable to inspect governed dynamic venue rollout allowlist.');
} else {
  const dynamicSlugs = [...dynamicSetMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
  if (dynamicSlugs.length !== 83) failures.push(`Expected 83 dynamic shared-guide venue slugs after Wave 7; found ${dynamicSlugs.length}.`);
  if (new Set(dynamicSlugs).size !== dynamicSlugs.length) failures.push('Dynamic shared-guide venue slugs must be unique.');
  if (dynamicSlugs.includes('jones-att-stadium')) failures.push('Galaxy Stadium/Jones AT&T Stadium must remain outside the ordinary dynamic rollout allowlist.');

  const rowSlugs = (source) => [...source.matchAll(/^\s{2}\[(?:'[^']*'|"[^"]*"), '([^']+)'/gm)].map((match) => match[1]);
  const coreSlugs = [...seed.matchAll(/^\s*\{id:'sports-venue:[^']+',kind:'sports-venue',name:'[^']+',slug:'([^']+)'/gm)].map((match) => match[1]);
  const seededSlugs = [...new Set([...rowSlugs(major), ...rowSlugs(tier2), ...coreSlugs])];
  if (seededSlugs.length !== 84) failures.push(`Expected 84 seeded sports venues; found ${seededSlugs.length}.`);
  const expectedDynamic = seededSlugs.filter((slug) => slug !== 'jones-att-stadium').sort();
  const actualDynamic = [...dynamicSlugs].sort();
  if (JSON.stringify(expectedDynamic) !== JSON.stringify(actualDynamic)) {
    const missing = expectedDynamic.filter((slug) => !actualDynamic.includes(slug));
    const extra = actualDynamic.filter((slug) => !expectedDynamic.includes(slug));
    failures.push(`Dynamic renderer coverage must equal all seeded venues except Galaxy. Missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}.`);
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
  'getSportsVenueGuideWave7',
  'getSportsVenueGuideWave7(slug) ?? getSportsVenueGuideWave6(slug)',
  'getSportsVenuePhoto(slug)',
  'getSportsVenueEnrichmentAll(slug)',
  'TexasDefinedStayNearby?.refresh?.()',
  'event.image?.url !== photo.imageUrl',
]) requireText(guideContent, marker, 'shared guide content safeguards');

for (const marker of [
  'const schemaType = sportsVenueSchemaType(entity);',
  '"@type": schemaType',
  'tags.has("golf")',
  'return "GolfCourse"',
  'tags.has("motorsports")',
  'tags.has("horse-racing")',
  'tags.has("shooting-sports")',
  'tags.has("action-sports")',
  'tags.has("tournament-complex")',
  'tags.has("aquatics")',
  'return "SportsActivityLocation"',
  'return "StadiumOrArena"',
  'TexasEventCarousel',
  'data-stay-nearby-slot',
  'A verified venue photograph is not available yet.',
]) requireText(guidePage, marker, 'shared specialty-aware venue guide architecture');
if (guidePage.includes('"@type": "StadiumOrArena"')) failures.push('Shared venue JSON-LD must not hardcode every migrated venue as StadiumOrArena.');

const schemaGroups = {
  GolfCourse: ['pga-frisco-fields-ranch', 'colonial-country-club', 'memorial-park-golf-course', 'tpc-san-antonio'],
  SportsActivityLocation: [
    'sam-houston-race-park', 'circuit-of-the-americas', 'retama-park', 'texas-motorplex',
    'msr-houston', 'eagles-canyon-raceway', 'xtreme-raceway-park', 'houston-motorsports-park',
    'national-shooting-complex', 'waco-surf', 'jamail-texas-swimming-center',
    'round-rock-sports-center', 'round-rock-multipurpose-complex',
  ],
  StadiumOrArena: ['will-rogers-memorial-center', 'amarillo-national-center', 'extraco-events-center', 'expo-center-taylor-county'],
};
if (Object.values(schemaGroups).flat().length !== venues.length) failures.push('Specialty schema groups must classify every Wave 7 venue exactly once.');
for (const [schemaType, slugs] of Object.entries(schemaGroups)) {
  for (const slug of slugs) {
    if (!guideEntries.includes(slug)) failures.push(`${slug}: expected ${schemaType} classification target is not a Wave 7 guide.`);
  }
}

// Already-migrated specialty venues must also benefit from the shared schema correction.
for (const slug of ['texas-motor-speedway', 'lone-star-park']) {
  requireText(dynamicRoute, `'${slug}'`, `${slug} existing redesigned specialty route`);
}

for (const marker of ['`sports-venue:${data.slug}`', 'encodeURIComponent(venueId)', '#calendar']) {
  requireText(eventFn, marker, 'venue-filtered event/calendar integration');
}
for (const marker of ['EventTicketCta', 'View all events', 'View Calendar']) {
  requireText(carousel, marker, 'provider-neutral event/ticket carousel');
}

for (const filler of ["homeTeam: 'N/A'", "homeTeam: 'None'", 'Make the venue part of the weekend', 'Best trip pattern']) {
  if (wave7Guides.includes(filler)) failures.push(`Wave-seven guide registry contains prohibited filler: ${filler}`);
}

const tmsStart = legacyGuides.indexOf('"texas-motor-speedway": {');
if (tmsStart === -1 || legacyGuides.indexOf('\n  "', tmsStart + 1) !== -1) {
  failures.push('Texas Motor Speedway must remain the terminal legacy guide registry record for the existing Phase 2 compatibility contract.');
}
requireText(wave4Guides, "'mclane-stadium': {", 'Wave 4 registry compatibility');
requireText(wave5Guides, "'united-supermarkets-arena': {", 'Wave 5 registry compatibility');
requireText(wave6Guides, "'reliant-stadium': {", 'Wave 6 registry compatibility');

requireText(galaxyRoute, "createFileRoute('/sports-venue/jones-att-stadium')", 'Galaxy Stadium stable static canonical route');
requireText(galaxyRoute, "venueName = 'Galaxy Stadium'", 'Galaxy Stadium current display name');
requireText(currentCorrections, "name: 'Galaxy Stadium'", 'Galaxy Stadium current entity correction');
requireText(currentCorrections, "'Jones AT&T Stadium'", 'Galaxy Stadium former-name alias');

if (fs.existsSync('src/data/sports-venue-guide-route.ts')) failures.push('Superseded sports-venue-guide-route.ts helper must remain removed.');

if (failures.length) {
  console.error('Sports venue Phase 3 wave-seven validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue Phase 3 wave-seven validation passed: ${venues.length} specialty migrations, 83/84 seeded venues on the shared dynamic renderer, Galaxy preserved on its protected static canonical route, specialty-aware schema mapping, source-reviewed editorial records, event/calendar wiring, provider-neutral ticket fallbacks, fail-closed Stay Nearby behavior and licensed-photo-or-intentional-fallback image handling are all intact.`);
