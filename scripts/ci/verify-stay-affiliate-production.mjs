const origin = process.env.STAY_AFFILIATE_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function liveUrl(path, attempt) {
  const url = new URL(path, origin);
  url.searchParams.set('td_stay_affiliate_verify', `${revision}-${runId}-${attempt}`);
  return url;
}

async function fetchLive(path) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = liveUrl(path, attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache',
          'user-agent': 'TexasDefined-CI-Stay-Affiliate/1.0',
        },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (!challenged && response.ok) return body;
      lastError = new Error(challenged ? `${url.pathname} returned a Cloudflare challenge.` : `${url.pathname} returned HTTP ${response.status}.`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError || new Error(`${path} failed production verification.`);
}

async function verifyOutcomeAnalytics() {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = liveUrl('/api/analytics', attempt);
    try {
      const response = await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'origin': new URL(origin).origin,
          'user-agent': 'TexasDefined-CI-Stay-Affiliate/1.0',
        },
        body: JSON.stringify({
          events: [
            {
              event: 'partner_referral_shown',
              resourceId: 'hotels.com',
              entityKind: 'production-verifier',
              destination: 'https://www.hotels.com/',
              detection: 'ci-probe',
              occurredAt: new Date().toISOString(),
              path: '/sports-venue/globe-life-field?ignored=1',
              sessionId: 'ci-probe-must-not-persist',
            },
            {
              event: 'partner_referral_clicked',
              resourceId: 'hotels.com',
              entityKind: 'production-verifier',
              destination: 'https://www.hotels.com/',
              detection: 'ci-probe',
              occurredAt: new Date().toISOString(),
              path: '/sports-venue/globe-life-field?ignored=1',
              sessionId: 'ci-probe-must-not-persist',
            },
            {
              event: 'next_step_selected',
              resourceId: 'expedia-search',
              stepId: 'Search Expedia stays',
              entityKind: 'production-verifier',
              destination: 'https://www.expedia.com/',
              detection: 'ci-probe',
              occurredAt: new Date().toISOString(),
              path: '/destination/fredericksburg?ignored=1',
              sessionId: 'ci-probe-must-not-persist',
            },
          ],
        }),
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (challenged) {
        lastError = new Error('/api/analytics returned a Cloudflare challenge.');
      } else if (response.status !== 202) {
        lastError = new Error(`/api/analytics returned HTTP ${response.status}: ${body.slice(0, 300)}`);
      } else {
        let parsed;
        try {
          parsed = JSON.parse(body);
        } catch {
          throw new Error('/api/analytics returned non-JSON success content.');
        }
        requireCondition(parsed?.accepted === 3, `/api/analytics accepted count must be 3; received ${JSON.stringify(parsed)}.`);
        return;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError || new Error('/api/analytics failed production verification.');
}

const affiliateBootstrap = await fetchLive('/stay-affiliate-options.js');
for (const marker of [
  'const CJ_PUBLISHER_ID = "101876465"',
  'https://www.hotels.com/',
  'https://www.travelocity.com/',
  'https://www.vrbo.com/',
  'const VERIFIED_PROPERTY_DESTINATIONS = new Map([',
  'https://www.hotels.com/ho115100/hilton-anatole-dallas-united-states-of-america/',
  'https://www.hotels.com/ho2949850752/loews-arlington-arlington-united-states-of-america/',
  'https://www.hotels.com/ho1830497920/tru-by-hilton-northlake-fort-worth-tx-roanoke-united-states-of-america/',
  'https://www.hotels.com/ho3489929696/albert-hotel/',
  'https://www.hotels.com/ho145347/hotel-galvez-spa-galveston-united-states-of-america/',
  'https://www.hotels.com/ho3586848288/hotel-1928/',
  'upgradeExactPropertyCards',
  'View on Hotels.com',
  'placement: "stay-nearby-card-exact"',
  'link.dataset.exactProperty = propertyName',
  'EXACT_PROPERTY_AFFILIATE_SELECTOR',
  'View recommended stays',
  'choice.dataset.priority = exactPropertyFirst ? "exact-property-first" : "broad-search-first"',
  'const choiceMode = exactPropertyFirst ? "after-exact" : "broad"',
  'createBookingChoice(intent, exactPropertyFirst)',
  'choice.dataset.mode = choiceMode',
  'placeBookingChoice(expediaSurface, choice, exactPropertyFirst)',
  'exactPropertyAffiliate.scrollIntoView',
  'Find places to stay',
  'Find hotels on Hotels.com',
  'Compare hotels on Travelocity',
  'Find vacation rentals on Vrbo',
  'Compare more hotels on Hotels.com',
  'Compare more hotels on Travelocity',
  'Browse vacation rentals on Vrbo',
  'stay-nearby-choice-after-exact',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com, Travelocity or Vrbo activity',
  'sponsored nofollow noopener noreferrer',
  'event: "affiliate_click"',
  'window.dataLayer.push(detail)',
  'affiliate_placement: placement',
  'link.dataset.commercialPartner = partnerName(destination)',
  'link.dataset.commercialPlacement = placement',
  'PLACEMENT_HEADING',
  'anchor.parentNode.insertBefore(surface, anchor)',
]) requireCondition(affiliateBootstrap.includes(marker), `Live stay affiliate bootstrap is missing marker: ${marker}`);

const exactPropertyUrls = affiliateBootstrap.match(/https:\/\/www\.hotels\.com\/ho\d+\/[a-z0-9-]+\//gi) || [];
requireCondition(exactPropertyUrls.length === 27, `Live stay affiliate bootstrap must contain 27 exact Hotels.com property URLs; found ${exactPropertyUrls.length}.`);
requireCondition(new Set(exactPropertyUrls).size === 27, 'Live exact Hotels.com property URLs must be unique across the governed stay cohort.');

const verificationRegistry = JSON.parse(await fetchLive('/stay-nearby-hotelscom-verification.json'));
requireCondition(verificationRegistry?.publisherId === '101876465', 'Live Hotels.com verification registry lost the TexasDefined CJ publisher ID.');
requireCondition(Array.isArray(verificationRegistry?.properties) && verificationRegistry.properties.length === 27, `Live Hotels.com verification registry must contain 27 governed properties; found ${verificationRegistry?.properties?.length ?? 'invalid'}.`);
for (const propertyId of ['albert-hotel-fredericksburg', 'grand-galvez', 'hotel-1928-waco']) {
  requireCondition(verificationRegistry.properties.some((property) => property.propertyId === propertyId), `Live Hotels.com verification registry is missing destination property: ${propertyId}`);
}

await verifyOutcomeAnalytics();

const expediaBootstrap = await fetchLive('/expedia-travel.js');
for (const marker of [
  'const SLOT_SELECTOR = "[data-stay-nearby-slot]"',
  'const STAY_DATA_URL = "/stay-nearby-hotels.json"',
  'function placementTarget(main)',
  'function placeSurface(surface, main)',
  'window.TexasDefinedStayNearby',
  'function isIndexabilityEligible(',
  'function isMonetizationEligible(',
  'hasNoindexDirective()',
  'link[rel="canonical" i]',
  'canonical === normalizePath(pathname)',
  'affiliate_module: "stay-nearby"',
  'event: "affiliate_surface_impression"',
  'link.rel = "sponsored nofollow noopener noreferrer"',
  'const provider = affiliateTarget.provider || "expedia"',
  'const placement = "stay-nearby-card"',
  'link.dataset.affiliatePartner = provider',
  'link.dataset.affiliatePlacement = placement',
  'link.dataset.commercialPartner = provider',
  'link.dataset.commercialPlacement = placement',
  'contextual-slot',
  'end-of-guide-fallback',
]) requireCondition(expediaBootstrap.includes(marker), `Live Expedia/Stay Nearby bootstrap is missing marker: ${marker}`);

const pages = [
  {
    route: '/event/chappell-hill-bluebonnet-festival',
    marker: 'Official State of Texas Bluebonnet Festival',
    requireSlot: true,
  },
  {
    route: '/sports-venue/globe-life-field',
    marker: 'Globe Life Field',
    requireSlot: true,
  },
  {
    route: '/sports-venue/xtreme-raceway-park',
    marker: 'Xtreme Raceway Park',
    requireSlot: true,
  },
  {
    route: '/destination/fredericksburg',
    marker: 'Fredericksburg',
    requireSlot: true,
  },
  {
    route: '/city/austin',
    marker: 'Austin',
    requireSlot: false,
  },
  {
    route: '/county/travis',
    marker: 'Travis County',
    requireSlot: false,
  },
  {
    route: '/explore/road-trips',
    marker: 'Road Trips',
    requireSlot: false,
    requireBookingCar: true,
  },
];

for (const page of pages) {
  const html = await fetchLive(page.route);
  requireCondition(html.includes(page.marker), `${page.route} did not render its expected page marker.`);
  requireCondition(html.includes('/expedia-travel.js'), `${page.route} is missing the Expedia/Stay Nearby bootstrap reference.`);
  requireCondition(html.includes('/stay-affiliate-options.js'), `${page.route} is missing the Hotels.com/Vrbo affiliate bootstrap reference.`);
  const expediaPosition = html.indexOf('/expedia-travel.js');
  const affiliatePosition = html.indexOf('/stay-affiliate-options.js');
  requireCondition(expediaPosition >= 0 && affiliatePosition > expediaPosition, `${page.route} no longer loads the Hotels.com/Travelocity/Vrbo bootstrap after Expedia/Stay Nearby.`);
  if (page.requireSlot) requireCondition(html.includes('data-stay-nearby-slot'), `${page.route} is missing its explicit in-content Stay Nearby slot.`);
  if (page.requireBookingCar) {
    for (const marker of [
      'Need a rental car for your Texas road trip?',
      'Compare rental cars on Booking.com',
      'data-affiliate-partner="booking.com"',
      'data-commercial-placement="road-trips-category"',
      'rel="sponsored nofollow noopener noreferrer"',
      'Affiliate disclosure: TexasDefined may earn a commission from qualifying Booking.com car-rental bookings',
    ]) requireCondition(html.includes(marker), `${page.route} is missing live Booking.com rental-car marker: ${marker}`);
  }

  const noindex = /<meta[^>]+(?:name=["'](?:robots|googlebot|googlebot-news)["'][^>]+content=["'][^"']*\bnoindex\b|content=["'][^"']*\bnoindex\b[^>]+name=["'](?:robots|googlebot|googlebot-news)["'])/i.test(html);
  requireCondition(!noindex, `${page.route} is noindex and must not be part of the monetized production cohort.`);

  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const canonicalHref = canonicalMatch?.[1] || canonicalMatch?.[2];
  requireCondition(Boolean(canonicalHref), `${page.route} is missing a canonical URL required by the monetization policy.`);
  const canonical = new URL(canonicalHref, origin);
  requireCondition(canonical.origin === new URL(origin).origin && canonical.pathname.replace(/\/+$/, '') === page.route.replace(/\/+$/, ''), `${page.route} is not self-canonical and must not be part of the monetized production cohort.`);
}

console.log('Stay affiliate production verification passed: all 27 governed stay properties (18 venue + 9 destination) expose unique exact-property Hotels.com destinations through the TexasDefined CJ publisher, curated surfaces prioritize exact-property referrals before broad Hotels.com/Travelocity/Vrbo choices, while broad Expedia search remains the fallback; the live same-origin /api/analytics collector accepted partner_referral_shown, partner_referral_clicked and reserved expedia-search next_step_selected CI probes backed by Cloudflare Analytics Engine; Hotels.com/Travelocity/Vrbo and verified Expedia/Stay Nearby property links use sponsored/nofollow plus first-party partner/placement attribution; the Stay Nearby asset continues to enforce separate indexability and monetization eligibility; representative event, destination and traffic-prioritized venue pages expose deterministic in-content stay slots; representative city and county travel pages remain self-canonical/indexable; the canonical road-trips hub exposes its dedicated Booking.com rental-car conversion with first-party placement metadata and disclosure; and script ordering is intact.');
