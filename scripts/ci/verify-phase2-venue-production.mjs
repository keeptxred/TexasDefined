const origin = process.env.TEXASDEFINED_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const venues = [
  {
    slug: 'amon-g-carter-stadium',
    name: 'Amon G. Carter Stadium',
    schemaType: 'StadiumOrArena',
    hotels: ['Courtyard Fort Worth University Drive', 'Hilton Garden Inn Fort Worth Medical Center', 'Homewood Suites by Hilton Fort Worth Medical Center'],
  },
  {
    slug: 'gerald-j-ford-stadium',
    name: 'Gerald J. Ford Stadium',
    schemaType: 'StadiumOrArena',
    hotels: ['Graduate by Hilton Dallas', 'The Highland Dallas, Curio Collection by Hilton', 'Hotel Mockingbird, Dallas, a Tribute Portfolio Hotel'],
  },
  {
    slug: 'globe-life-field',
    name: 'Globe Life Field',
    schemaType: 'StadiumOrArena',
    hotels: ['Live! by Loews – Arlington, TX', 'Loews Arlington Hotel', 'Drury Plaza Hotel Dallas Arlington'],
  },
  {
    slug: 'american-airlines-center',
    name: 'American Airlines Center',
    schemaType: 'StadiumOrArena',
    hotels: ['Homewood Suites by Hilton Dallas Downtown, TX', 'Hilton Garden Inn Downtown Dallas', 'DoubleTree by Hilton Hotel Dallas - Market Center'],
  },
  {
    slug: 'texas-motor-speedway',
    name: 'Texas Motor Speedway',
    schemaType: 'SportsActivityLocation',
    hotels: ['Home2 Suites by Hilton Fort Worth Northlake', 'Hilton Garden Inn Fort Worth Alliance Airport', 'Courtyard by Marriott Fort Worth at Alliance Town Center'],
  },
];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchLive(path, kind = 'text') {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = new URL(path, origin);
    url.searchParams.set('td_phase2_verify', `${revision}-${runId}-${attempt}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache',
          'user-agent': 'TexasDefined-CI-Phase2-Venue/1.0',
        },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (!challenged && response.ok) {
        if (kind === 'json') {
          try {
            return JSON.parse(body);
          } catch (error) {
            lastError = new Error(`${url.pathname} returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
          }
        } else return body;
      } else {
        lastError = new Error(challenged ? `${url.pathname} returned a Cloudflare challenge.` : `${url.pathname} returned HTTP ${response.status}.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError || new Error(`${path} failed production verification.`);
}

const registry = await fetchLive('/stay-nearby-hotels.json', 'json');
requireCondition(registry?.version === 1 && Array.isArray(registry?.properties), 'Live Stay Nearby registry is unavailable or malformed.');
requireCondition(registry?.policy?.maxCards === 3, 'Live Stay Nearby registry no longer caps venue carousels at three cards.');
requireCondition(registry?.policy?.displayComputedDistance === false, 'Live Stay Nearby registry allows computed-distance display.');
requireCondition(registry?.policy?.broadVenueFallback === false, 'Live Stay Nearby registry allows broad venue fallback.');

for (const venue of venues) {
  const route = `/sports-venue/${venue.slug}`;
  const page = await fetchLive(route);
  const calendarHref = `/events?venue=sports-venue%3A${venue.slug}#calendar`;
  const allEventsHref = `/events?venue=sports-venue%3A${venue.slug}`;
  const canonicalUrl = `${origin}${route}`;

  for (const marker of [
    venue.name,
    'Texas venue guide',
    'Quick facts',
    'Get Directions',
    'Official Venue Site',
    `What’s happening at ${venue.name}`,
    'View all events',
    'View Calendar',
    calendarHref,
    allEventsHref,
    'Know before you go',
    'data-stay-nearby-slot',
    'Venue story',
    'Nearby discovery',
    'Verification &amp; review',
    canonicalUrl,
    `\"@type\":\"${venue.schemaType}\"`,
  ]) requireCondition(page.includes(marker), `${route} is missing deployed Phase 2 marker: ${marker}`);

  requireCondition(/<img\b[^>]+fetchpriority="high"/i.test(page) || /<img\b[^>]+fetchPriority="high"/i.test(page), `${route} is missing its eager governed venue hero image.`);
  requireCondition(!page.includes('A verified venue photograph is not available yet.'), `${route} fell back from its governed real venue hero image.`);

  const entries = registry.properties
    .filter((property) => property?.status === 'active')
    .map((property) => ({
      property,
      context: (property.contexts || []).find((context) => context?.kind === 'venue' && context?.key === venue.slug),
    }))
    .filter((entry) => entry.context)
    .sort((left, right) => left.context.rank - right.context.rank);

  requireCondition(entries.length === 3, `${venue.slug} must expose exactly three live Stay Nearby choices; found ${entries.length}.`);
  requireCondition(entries.map((entry) => entry.context.rank).join(',') === '1,2,3', `${venue.slug} live Stay Nearby ranks must be 1,2,3.`);
  requireCondition(entries.map((entry) => entry.property.name).join('|') === venue.hotels.join('|'), `${venue.slug} live hotel set/order drifted.`);

  for (const { property, context } of entries) {
    requireCondition(/^https:\/\//.test(context?.source?.url || ''), `${property.name} lacks a live HTTPS verification source.`);
    requireCondition(/^\d{4}-\d{2}-\d{2}$/.test(context?.source?.verifiedAt || ''), `${property.name} lacks a live verification date.`);
    requireCondition(typeof context?.geographicContext === 'string' && context.geographicContext.length > 0, `${property.name} lacks geographic fallback context.`);
    for (const target of property.bookingTargets || []) {
      if (target.affiliateUrl) requireCondition(target.verified === true && /^https:\/\//.test(target.affiliateUrl), `${property.name} exposes an unsafe affiliate property target.`);
    }
    if (property.image) {
      requireCondition(property.image.rightsSource === 'expedia-creator-toolbox', `${property.name} bypassed the live property-image rights gate.`);
      const matchingTarget = (property.bookingTargets || []).find((target) => target.provider === property.image.bookingProvider && target.verified === true && target.affiliateUrl);
      requireCondition(Boolean(matchingTarget), `${property.name} renders property imagery without a verified matching referral.`);
    }
  }
}

const bootstrap = await fetchLive('/expedia-travel.js');
for (const marker of [
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings',
  'flex:0 0 calc((100% - 2rem)/3)',
  'flex-basis:84%',
  'aria-roledescription',
  'ArrowLeft',
  'scroll-snap-type',
  'property.image',
  'expedia-creator-toolbox',
]) requireCondition(bootstrap.includes(marker), `Live Stay Nearby bootstrap is missing Phase 2 contract marker: ${marker}`);

console.log(`PASS: all ${venues.length} Phase 2 venue pages render the deployed verified visitor journey with governed hero imagery, canonical venue-filtered event/calendar links, visit logistics, exactly three source-backed Stay Nearby choices, editorial/nearby context, source review metadata, safe hotel fallbacks, canonicals and venue-appropriate structured data.`);
