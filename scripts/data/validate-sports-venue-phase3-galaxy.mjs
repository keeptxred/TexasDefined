import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const galaxyRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const guide = read('src/data/sports-venue-guide-galaxy.ts');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const sponsoredPlacement = read('src/components/sports/SponsoredSportsPlacement.tsx');
const remediation = read('src/data/sports-venue-content-remediation-wave4.ts');
const corrections = read('src/data/knowledge-graph/current-entity-corrections.ts');
const images = read('src/data/sports-venue-images-additions.ts');
const eventFn = read('src/data/sports-venue-events.functions.ts');
const major = read('src/data/knowledge-graph/major-sports-venues.ts');
const tier2 = read('src/data/knowledge-graph/sports-venues-tier2.ts');
const seed = read('src/data/knowledge-graph/seed.ts');
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

for (const marker of [
  "createFileRoute('/sports-venue/jones-att-stadium')",
  "const venueName = 'Galaxy Stadium'",
  "const stableSlug = 'jones-att-stadium'",
  "title: 'Galaxy Stadium | Lubbock, TX'",
  'SportsVenueGuidePilotContent',
  "getActiveSportsSponsorPlacement({ data: { surfacePath: canonicalPath } })",
  "getSportsVenueUpcomingEvents({ data: { slug: stableSlug } })",
  "import('@/data/sports-venue-images-all')",
  "import('@/data/parking-maps.functions')",
  'getSportsVenueParkingMap(stableSlug)',
  'photo: getSportsVenuePhoto(stableSlug)',
  'parkingMap,',
  'head: ({ loaderData }) =>',
  'image: photo?.imageUrl',
  'imageAlt: photo?.alt',
  'imageWidth: photo?.width',
  'imageHeight: photo?.height',
  "robots: isIndexableEntityPage(entity) && photo ? undefined : 'noindex, follow, max-image-preview:large'",
  'parkingMap={parkingMap}',
  'nearbyAttractions={nearbyAttractions}',
  'upcomingEvents={upcomingEvents}',
  'eventCalendarHref={eventCalendarHref}',
  'sponsorPlacement={sponsorPlacement}',
]) requireText(galaxyRoute, marker, 'Galaxy static shared-guide wrapper');

if (dynamicRoute.includes("'jones-att-stadium'")) failures.push('Galaxy must remain outside the ordinary dynamic allowlist.');

for (const marker of [
  "canonicalPath: '/sports-venue/jones-att-stadium'",
  "city: 'Lubbock'",
  "venueType: 'College football stadium'",
  "homeTeam: 'Texas Tech Red Raiders football'",
  "officialUrl: 'https://texastech.com/facilities/jones-at-t-stadium/2'",
  "reviewedAt: '2026-09-10'",
  'formerly Jones AT&T Stadium',
  'Galaxy Stadium naming announcement',
]) requireText(guide, marker, 'Galaxy verified shared-guide record');

for (const marker of [
  "'jones-att-stadium': {",
  'Texas Tech Red Raiders football',
  'Big 12 Conference',
  'Galaxy Stadium name for the 2026 season',
  "url: 'https://texastech.com/facilities/jones-at-t-stadium/2'",
  'parking:',
  'arrival:',
  'planningLinks:',
  'verifiedAt:',
]) requireText(remediation, marker, 'Galaxy source-reviewed remediation');

for (const marker of [
  "name: 'Galaxy Stadium'",
  "'Jones AT&T Stadium'",
  "'Jones ATT Stadium'",
  "'Jones Stadium'",
  "'Galaxy Stadium'",
]) requireText(corrections, marker, 'Galaxy current-name/alias correction');
if (corrections.includes("slug: 'galaxy-stadium'")) failures.push('Galaxy correction must retain the stable jones-att-stadium slug.');

for (const marker of [
  'getSportsVenueGuideGalaxy',
  'getSportsVenueGuideGalaxy(slug) ?? getSportsVenueGuideWave7(slug)',
  'getSportsVenuePhoto(slug)',
  'getSportsVenueEnrichmentAll(slug)',
  'parkingMap?: ParkingMapAsset;',
  'parkingMap={parkingMap}',
  'TexasDefinedStayNearby?.refresh?.()',
  'sponsorPlacement?: PublicSportsSponsorPlacement | null;',
  'sponsorPlacement={sponsorPlacement}',
]) requireText(guideContent, marker, 'shared Galaxy guide resolver');
if (guideContent.includes('useVenueParkingMap')) failures.push('Shared venue guide must receive parking maps from SSR loader data, not a client-only effect hook.');

for (const marker of [
  'SponsoredSportsPlacement',
  'sponsorPlacement?: PublicSportsSponsorPlacement | null;',
  'sponsorPlacement ?',
  '<TexasEventCarousel',
  'data-stay-nearby-slot',
  'Venue details and planning information continue below.',
  'mainEntityOfPage: canonicalUrl',
  'image: photo?.imageUrl',
  'SourcesSection',
]) requireText(guidePage, marker, 'shared venue guide page');

const galaxyImageStart = images.indexOf("'jones-att-stadium': {");
if (galaxyImageStart === -1) {
  failures.push('Galaxy governed photo registry is missing jones-att-stadium.');
} else {
  const end = images.indexOf("\n  '", galaxyImageStart + 1);
  const block = images.slice(galaxyImageStart, end === -1 ? undefined : end);
  for (const marker of [
    "alt: 'Galaxy Stadium in Lubbock, photographed while it was known as Jones AT&T Stadium'",
    "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jones_AT%26T_Stadium_wide_shot.jpg?width=1600'",
    "sourcePage: 'https://commons.wikimedia.org/wiki/File:Jones_AT%26T_Stadium_wide_shot.jpg'",
    "sourceName: 'Wikimedia Commons'",
    "author: 'John McStravick'",
    "licenseName: 'CC BY 2.0'",
    "licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'",
  ]) requireText(block, marker, 'Galaxy governed photo rights metadata');
}

for (const marker of ['`sports-venue:${data.slug}`', 'encodeURIComponent(venueId)', '#calendar']) {
  requireText(eventFn, marker, 'Galaxy venue-scoped event/calendar integration');
}

for (const marker of [
  "import('@/data/parking-maps.functions')",
  'getSportsVenueParkingMap(params.slug)',
  'parkingMap={parkingMap}',
  'sponsorPlacement={sponsorPlacement}',
]) requireText(dynamicRoute, marker, 'dynamic redesigned venue SSR delivery');

for (const marker of [
  'Sponsored',
  'Paid placement by',
  'rel="sponsored nofollow noopener noreferrer"',
  "event: 'impression'",
  "event: 'click'",
]) requireText(sponsoredPlacement, marker, 'governed shared sponsorship disclosure/tracking');

const rowSlugs = (source) => [...source.matchAll(/^\s{2}\[(?:'[^']*'|"[^"]*"), '([^']+)'/gm)].map((match) => match[1]);
const coreSlugs = [...seed.matchAll(/^\s*\{id:'sports-venue:[^']+',kind:'sports-venue',name:'[^']+',slug:'([^']+)'/gm)].map((match) => match[1]);
const seededSlugs = [...new Set([...rowSlugs(major), ...rowSlugs(tier2), ...coreSlugs])];
if (seededSlugs.length !== 84) failures.push(`Expected 84 seeded sports venues; found ${seededSlugs.length}.`);

const dynamicSetMatch = dynamicRoute.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\n\]\);/);
if (!dynamicSetMatch) {
  failures.push('Unable to inspect dynamic shared-guide venue allowlist.');
} else {
  const dynamicSlugs = [...dynamicSetMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
  if (dynamicSlugs.length !== 83) failures.push(`Expected 83 dynamic shared-guide venues; found ${dynamicSlugs.length}.`);
  const expected = seededSlugs.filter((slug) => slug !== 'jones-att-stadium').sort();
  if (JSON.stringify([...dynamicSlugs].sort()) !== JSON.stringify(expected)) failures.push('Dynamic shared-guide coverage must equal every seeded venue except the protected Galaxy static route.');
}

if (failures.length) {
  console.error('Galaxy Stadium shared-guide reconciliation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Galaxy Stadium shared-guide reconciliation passed: stable canonical route and aliases, current Texas Tech sources, governed Commons hero and social metadata, server-rendered governed parking maps across the 83 dynamic venues plus protected Galaxy route, modern shared events/Stay Nearby/source architecture, governed sponsor delivery, and the complete 83-dynamic + 1-static = 84 venue coverage contract are intact.');
