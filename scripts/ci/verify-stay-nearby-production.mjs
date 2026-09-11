const origin = process.env.STAY_NEARBY_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fallbackDisclosure = 'AI-generated area illustration — not the hotel property';

const pilots = [
  {
    key: 'amon-g-carter-stadium',
    route: '/sports-venue/amon-g-carter-stadium',
    pageMarker: 'Amon G. Carter Stadium',
    guideIntegrated: true,
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
    guideIntegrated: true,
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

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchLive(path, kind = 'text') {
  let lastError;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = new URL(path, origin);
    url.searchParams.set('td_verify', `${revision}-${runId}-${attempt}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache',
          'user-agent': 'TexasDefined-CI-Stay-Nearby/1.0',
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
        } else {
          return body;
        }
      } else {
        lastError = new Error(challenged
          ? `${url.pathname} returned a Cloudflare challenge.`
          : `${url.pathname} returned HTTP ${response.status}.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }

    if (attempt < 6) await sleep(5_000);
  }

  throw lastError || new Error(`${path} failed production verification.`);
}

const registry = await fetchLive('/stay-nearby-hotels.json', 'json');
requireCondition(registry?.version === 1, 'Stay Nearby production registry version is not 1.');
requireCondition(registry?.policy?.maxCards === 3, 'Stay Nearby production registry no longer caps cards at 3.');
requireCondition(registry?.policy?.displayComputedDistance === false, 'Stay Nearby production registry allows computed-distance display.');
requireCondition(registry?.policy?.broadVenueFallback === false, 'Stay Nearby production registry allows broad venue fallback.');
requireCondition(Array.isArray(registry?.properties), 'Stay Nearby production registry properties are missing.');

const fallbackRegistry = await fetchLive('/stay-nearby-ai-fallbacks.json', 'json');
requireCondition(fallbackRegistry?.version === 1, 'Stay Nearby production AI fallback registry version is not 1.');
requireCondition(fallbackRegistry?.disclosure === fallbackDisclosure, 'Stay Nearby production AI fallback disclosure drifted.');
requireCondition(Array.isArray(fallbackRegistry?.items) && fallbackRegistry.items.length === 9, 'Stay Nearby production AI fallback registry must expose exactly 9 pilot records.');
const fallbackById = new Map(fallbackRegistry.items.map((item) => [item.propertyId, item]));

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

    const verifiedTargets = (property.bookingTargets || []).filter((target) => target?.verified === true);
    for (const target of verifiedTargets) {
      requireCondition(/^https:\/\//.test(target.affiliateUrl || ''), `${property.name} has a verified affiliate target without an HTTPS URL.`);
    }

    if (property.image) {
      const matchingTarget = verifiedTargets.find((target) => target.provider === property.image.bookingProvider);
      requireCondition(property.image.rightsSource === 'expedia-creator-toolbox', `${property.name} production image lacks approved Expedia Creator Toolbox rights metadata.`);
      requireCondition(typeof property.image.url === 'string' && property.image.url.startsWith('/'), `${property.name} production image is not first-party hosted.`);
      requireCondition(Boolean(matchingTarget), `${property.name} production image is not paired with a verified matching booking referral.`);
    }

    const fallback = fallbackById.get(property.id);
    requireCondition(Boolean(fallback), `${property.name} is missing its production AI area-illustration fallback.`);
    requireCondition(fallback?.name === property.name, `${property.name} AI fallback record does not match the canonical property name.`);
    requireCondition(fallback?.kind === 'ai-area-illustration', `${property.name} AI fallback kind drifted.`);
    requireCondition(fallback?.depictsProperty === false, `${property.name} AI fallback must declare depictsProperty=false.`);
    requireCondition(fallback?.label === fallbackDisclosure, `${property.name} AI fallback disclosure drifted.`);
    requireCondition(/^\/images\/stay-nearby\/ai\/[a-z0-9-]+\.svg$/.test(fallback?.url || ''), `${property.name} AI fallback is not a first-party SVG path.`);
    requireCondition(String(fallback?.alt || '').startsWith('AI-generated illustration'), `${property.name} AI fallback alt text does not disclose AI generation.`);
    requireCondition(!String(fallback?.alt || '').toLowerCase().includes(property.name.toLowerCase()), `${property.name} AI fallback alt text implies an exact property depiction.`);

    const svg = await fetchLive(fallback.url);
    requireCondition(svg.trimStart().startsWith('<svg'), `${property.name} AI fallback asset is not an SVG document.`);
    requireCondition(svg.includes('AI-generated area illustration, not a depiction of the hotel property.'), `${property.name} AI fallback SVG lacks its non-property description.`);
    requireCondition(!svg.toLowerCase().includes(property.name.toLowerCase()), `${property.name} AI fallback SVG contains the hotel name.`);
    requireCondition(!/<script\b/i.test(svg) && !/<foreignObject\b/i.test(svg) && !/<image\b/i.test(svg) && !/\bhref\s*=/i.test(svg), `${property.name} AI fallback SVG contains disallowed markup.`);
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

const contextBootstrap = await fetchLive('/stay-nearby-context-images.js');
for (const marker of [
  'const FALLBACK_DATA_URL = "/stay-nearby-ai-fallbacks.json"',
  'data-stay-ai-fallback',
  'ai-area-illustration',
  fallbackDisclosure,
  'textFallback.replaceWith(buildFallbackMedia(item))',
  'const propertyImage = card.querySelector(":scope > .td-stay-image")',
]) {
  requireCondition(contextBootstrap.includes(marker), `Live Stay Nearby context/AI fallback bootstrap is missing marker: ${marker}`);
}

for (const pilot of pilots) {
  const page = await fetchLive(pilot.route);
  requireCondition(page.includes(pilot.pageMarker), `${pilot.route} did not render the expected venue marker.`);
  requireCondition(page.includes('/expedia-travel.js'), `${pilot.route} is missing the deferred Expedia/Stay Nearby bootstrap reference.`);
  requireCondition(page.includes('/stay-nearby-context-images.js'), `${pilot.route} is missing the deferred context/AI fallback bootstrap reference.`);

  if (pilot.guideIntegrated) {
    requireCondition(page.includes('Texas venue guide'), `${pilot.route} did not render the redesigned venue-guide marker.`);
    requireCondition(page.includes(`What’s happening at ${pilot.pageMarker}`), `${pilot.route} did not render the venue event integration heading.`);
    requireCondition(page.includes('href="/events"'), `${pilot.route} did not expose the statewide event calendar link.`);
    requireCondition(page.includes('data-stay-nearby-slot'), `${pilot.route} did not render the Stay Nearby integration slot.`);
  }
}

const integratedGuidePilots = pilots.filter((pilot) => pilot.guideIntegrated).length;
console.log(`Stay Nearby production verification passed for ${pilots.length} pilot venue pages, including ${integratedGuidePilots} integrated venue guides, 9 visibly disclosed first-party AI area-illustration fallbacks, the live hotel registry, and the deferred affiliate bootstrap.`);