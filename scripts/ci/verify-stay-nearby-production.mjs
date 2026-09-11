const origin = process.env.STAY_NEARBY_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const cacheBuster = `td-stay-verify=${Date.now()}`;

const pilots = [
  {
    key: 'amon-g-carter-stadium',
    route: '/sports-venue/amon-g-carter-stadium',
    pageMarker: 'Amon G. Carter Stadium',
    hotels: [
      'Courtyard Fort Worth University Drive',
      'Hilton Garden Inn Fort Worth Medical Center',
      'Homewood Suites by Hilton Fort Worth Medical Center',
    ],
  },
  {
    key: 'gerald-j-ford-stadium',
    route: '/sports-venue/gerald-j-ford-stadium',
    pageMarker: 'Gerald J. Ford Stadium',
    hotels: [
      'Graduate by Hilton Dallas',
      'The Highland Dallas, Curio Collection by Hilton',
      'Hotel Mockingbird, Dallas, a Tribute Portfolio Hotel',
    ],
  },
  {
    key: 'globe-life-field',
    route: '/sports-venue/globe-life-field',
    pageMarker: 'Globe Life Field',
    hotels: [
      'Live! by Loews – Arlington, TX',
      'Loews Arlington Hotel',
      'Drury Plaza Hotel Dallas Arlington',
    ],
  },
];

function fail(message) {
  throw new Error(message);
}

function requireCondition(condition, message) {
  if (!condition) fail(message);
}

function verifiedTarget(property) {
  return (property.bookingTargets || []).find((target) => target?.verified === true);
}

async function fetchLive(path, kind = 'text') {
  const url = new URL(path, origin);
  url.searchParams.set('td_verify', cacheBuster);
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'cache-control': 'no-cache',
      'user-agent': 'TexasDefined-Production-Verification/1.0',
    },
  });
  requireCondition(response.ok, `${url.pathname} returned HTTP ${response.status}`);
  return kind === 'json' ? response.json() : response.text();
}

const registry = await fetchLive('/stay-nearby-hotels.json', 'json');
requireCondition(registry?.version === 1, 'Stay Nearby production registry version is not 1.');
requireCondition(registry?.policy?.maxCards === 3, 'Stay Nearby production registry no longer caps cards at 3.');
requireCondition(registry?.policy?.displayComputedDistance === false, 'Stay Nearby production registry allows computed-distance display.');
requireCondition(registry?.policy?.broadVenueFallback === false, 'Stay Nearby production registry allows broad venue fallback.');
requireCondition(Array.isArray(registry?.properties), 'Stay Nearby production registry properties are missing.');

for (const pilot of pilots) {
  const entries = registry.properties
    .filter((property) => property?.status === 'active')
    .map((property) => ({
      property,
      context: (property.contexts || []).find((context) => context?.kind === 'venue' && context?.key === pilot.key),
    }))
    .filter((entry) => entry.context)
    .sort((left, right) => left.context.rank - right.context.rank);

  requireCondition(entries.length === 3, `${pilot.key} production registry must expose exactly 3 curated hotels; found ${entries.length}.`);
  requireCondition(entries.map((entry) => entry.context.rank).join(',') === '1,2,3', `${pilot.key} production hotel ranks must be 1,2,3.`);
  requireCondition(entries.map((entry) => entry.property.name).join('|') === pilot.hotels.join('|'), `${pilot.key} production hotel set or order drifted.`);

  for (const { property, context } of entries) {
    requireCondition(typeof context.geographicContext === 'string' && context.geographicContext.length > 0, `${property.name} lacks geographic context.`);
    requireCondition(typeof context.proximity === 'string' && context.proximity.length > 0, `${property.name} lacks verified proximity copy.`);
    requireCondition(/^https:\/\//.test(context.source?.url || ''), `${property.name} lacks an HTTPS verification source.`);
    requireCondition(/^\d{4}-\d{2}-\d{2}$/.test(context.source?.verifiedAt || ''), `${property.name} lacks a verification date.`);

    const target = verifiedTarget(property);
    if (target) {
      requireCondition(/^https:\/\//.test(target.affiliateUrl || ''), `${property.name} has a verified affiliate target without an HTTPS URL.`);
    }
    if (property.image) {
      requireCondition(property.image.rightsSource === 'expedia-creator-toolbox', `${property.name} production image lacks approved Expedia Creator Toolbox rights metadata.`);
      requireCondition(typeof property.image.url === 'string' && property.image.url.startsWith('/'), `${property.name} production image is not first-party hosted.`);
      requireCondition(target && property.image.bookingProvider === target.provider, `${property.name} production image is not paired with a verified matching booking referral.`);
    }
  }
}

const bootstrap = await fetchLive('/expedia-travel.js');
for (const marker of [
  'const STAY_DATA_URL = "/stay-nearby-hotels.json"',
  'window.TexasDefinedStayNearby',
  '[data-stay-nearby-slot]',
  'flex:0 0 calc((100% - 2rem)/3)',
  'flex-basis:84%',
  'data-camref',
  '1110lMy6E',
  'data-pubref',
  'texasdefined-stays',
  'TexasDefined does not cache or display nightly prices.',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings',
]) {
  requireCondition(bootstrap.includes(marker), `Live Expedia/Stay Nearby bootstrap is missing marker: ${marker}`);
}

for (const pilot of pilots) {
  const page = await fetchLive(pilot.route);
  requireCondition(page.includes(pilot.pageMarker), `${pilot.route} did not render the expected venue marker.`);
  requireCondition(page.includes('/expedia-travel.js'), `${pilot.route} is missing the deferred Expedia/Stay Nearby bootstrap reference.`);
}

console.log(`Stay Nearby production verification passed for ${pilots.length} pilot venue pages, the live hotel registry, and the deferred affiliate bootstrap.`);
