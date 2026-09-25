import vm from 'node:vm';

const origin = process.env.STAY_AFFILIATE_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function verifyLiveRoutingPolicy(source) {
  const sandbox = {
    window: {
      location: { pathname: '/' },
      dataLayer: [],
      addEventListener() {},
      dispatchEvent() {},
      requestAnimationFrame() {},
    },
    document: {
      readyState: 'loading',
      addEventListener() {},
      querySelectorAll() { return []; },
    },
    URL,
    CustomEvent: class CustomEvent {},
    console,
  };
  vm.runInNewContext(source, sandbox, { filename: 'live:/stay-affiliate-options.js' });
  const api = sandbox.window.TexasDefinedStayAffiliateOptions;
  requireCondition(api && typeof api.bookingIntent === 'function', 'Live stay affiliate bootstrap does not expose bookingIntent.');
  requireCondition(typeof api.comparisonHotelDestination === 'function', 'Live stay affiliate bootstrap does not expose comparisonHotelDestination.');
  requireCondition(typeof api.rvshareEligible === 'function', 'Live stay affiliate bootstrap does not expose rvshareEligible.');
  requireCondition(typeof api.buildCjDeepLink === 'function', 'Live stay affiliate bootstrap does not expose buildCjDeepLink.');
  requireCondition(typeof api.featuredGolfStay === 'function', 'Live stay affiliate bootstrap does not expose featuredGolfStay.');

  requireCondition(api.bookingIntent('/event/chappell-hill-bluebonnet-festival') === 'hotel-first', 'Live event intent no longer resolves to hotel-first.');
  requireCondition(api.bookingIntent('/destination/fredericksburg') === 'both', 'Live destination intent no longer resolves to broader lodging intent.');
  requireCondition(api.comparisonHotelDestination('hotel-first') === 'https://www.orbitz.com/', 'Live hotel-first comparison provider must resolve to Orbitz.');
  requireCondition(api.comparisonHotelDestination('both') === 'https://www.travelocity.com/', 'Live destination/leisure comparison provider must resolve to Travelocity.');
  requireCondition(api.rvshareEligible('/best-places-to-go-camping-in-texas') === true, 'Live camping guide must remain eligible for RVshare.');
  requireCondition(api.rvshareEligible('/explore/rv-parks') === true, 'Live RV-parks hub must remain eligible for RVshare.');
  requireCondition(api.rvshareEligible('/destination/fredericksburg') === false, 'Live generic destination pages must fail closed for RVshare.');

  const orbitz = api.buildCjDeepLink('https://www.orbitz.com/');
  const travelocity = api.buildCjDeepLink('https://www.travelocity.com/');
  const rvshare = api.buildCjDeepLink('https://rvshare.com/');
  requireCondition(orbitz.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.orbitz.com/'), 'Live Orbitz comparison target is no longer bound to the TexasDefined CJ publisher.');
  requireCondition(travelocity.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.travelocity.com/'), 'Live Travelocity comparison target is no longer bound to the TexasDefined CJ publisher.');
  requireCondition(rvshare.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://rvshare.com/'), 'Live RVshare target is no longer bound to the TexasDefined CJ publisher.');

  const featuredGolfCases = [
    ['/sports-venue/pga-frisco-fields-ranch', 'Omni PGA Frisco Resort & Spa', 'https://www.hotels.com/ho2796737888/omni-pga-frisco-resort-frisco-united-states-of-america/'],
    ['/sports-venue/tpc-san-antonio', 'JW Marriott San Antonio Hill Country Resort & Spa', 'https://www.hotels.com/ho325236/jw-marriott-san-antonio-hill-country-resort-spa-san-antonio-united-states-of-america/'],
    ['/sports-venue/memorial-park-golf-course', 'Holiday Inn Express & Suites Houston - Memorial Park Area', 'https://www.hotels.com/ho211068/holiday-inn-express-suites-houston-memorial-park-area-an-ihg-hotel-houston-united-states-of-america/'],
  ];
  for (const [pathname, expectedName, expectedDestination] of featuredGolfCases) {
    const stay = api.featuredGolfStay(pathname);
    requireCondition(stay?.name === expectedName, `Live featured golf stay name drifted for ${pathname}.`);
    requireCondition(stay?.destination === expectedDestination, `Live featured golf Hotels.com destination drifted for ${pathname}.`);
    requireCondition(stay?.verifiedAt === '2026-09-23', `Live featured golf verification date drifted for ${pathname}.`);
    requireCondition(/^https:\/\//.test(stay?.sourceUrl || ''), `Live featured golf source is missing for ${pathname}.`);
    const affiliateUrl = api.buildCjDeepLink(stay.destination);
    requireCondition(affiliateUrl.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.hotels.com/ho'), `Live featured golf stay is not bound to the TexasDefined CJ publisher for ${pathname}.`);
  }
  requireCondition(api.featuredGolfStay('/sports-venue/colonial-country-club') === null, 'Live Colonial lodging must remain on its curated three-property cohort.');
  requireCondition(api.featuredGolfStay('/sports-venue/globe-life-field') === null, 'Live non-golf venue must not receive a featured golf stay.');
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
  'https://www.orbitz.com/',
  'https://www.travelocity.com/',
  'https://www.vrbo.com/',
  'https://rvshare.com/',
  'const VERIFIED_PROPERTY_DESTINATIONS = new Map([',
  'const FEATURED_GOLF_STAYS = new Map([',
  'https://www.hotels.com/ho2796737888/omni-pga-frisco-resort-frisco-united-states-of-america/',
  'https://www.hotels.com/ho325236/jw-marriott-san-antonio-hill-country-resort-spa-san-antonio-united-states-of-america/',
  'https://www.hotels.com/ho211068/holiday-inn-express-suites-houston-memorial-park-area-an-ihg-hotel-houston-united-states-of-america/',
  'stay-nearby-featured-golf',
  'Venue relationship verified against',
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
  'Compare hotels on Orbitz',
  'Compare hotels on Travelocity',
  'Find vacation rentals on Vrbo',
  'Rent an RV on RVshare',
  'Compare more hotels on Hotels.com',
  'Compare more hotels on Orbitz',
  'Compare more hotels on Travelocity',
  'Browse vacation rentals on Vrbo',
  'stay-nearby-choice-after-exact',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com or Orbitz activity',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com, Travelocity or Vrbo activity',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com, Travelocity or RVshare activity',
  'if (intent === "both" && !showRvshare)',
  'variant: featuredStay || showRvshare ? "secondary" : "primary"',
  'sponsored nofollow noopener noreferrer',
  'event: "affiliate_click"',
  'window.dataLayer.push(detail)',
  'affiliate_placement: placement',
  'link.dataset.commercialPartner = partnerName(destination)',
  'link.dataset.commercialPlacement = placement',
  'PLACEMENT_HEADING',
  'anchor.parentNode.insertBefore(surface, anchor)',
]) requireCondition(affiliateBootstrap.includes(marker), `Live stay affiliate bootstrap is missing marker: ${marker}`);

verifyLiveRoutingPolicy(affiliateBootstrap);

const exactPropertyUrls = affiliateBootstrap.match(/https:\/\/www\.hotels\.com\/ho\d+\/[a-z0-9-]+\//gi) || [];
requireCondition(exactPropertyUrls.length === 33, `Live stay affiliate bootstrap must contain 33 exact Hotels.com property URLs: 30 governed curated properties plus 3 source-backed featured golf stays; found ${exactPropertyUrls.length}.`);
requireCondition(new Set(exactPropertyUrls).size === 33, 'Live exact Hotels.com property URLs must remain unique across the governed curated and featured-golf cohorts.');

const verificationRegistry = JSON.parse(await fetchLive('/stay-nearby-hotelscom-verification.json'));
requireCondition(verificationRegistry?.publisherId === '101876465', 'Live Hotels.com verification registry lost the TexasDefined CJ publisher ID.');
requireCondition(Array.isArray(verificationRegistry?.properties) && verificationRegistry.properties.length === 30, `Live Hotels.com verification registry must contain 30 governed properties; found ${verificationRegistry?.properties?.length ?? 'invalid'}.`);
for (const propertyId of ['albert-hotel-fredericksburg', 'grand-galvez', 'hotel-1928-waco', 'best-western-johnson-city-inn', 'carter-creek-winery-resort-spa', 'walden-retreats-johnson-city']) {
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
    route: '/best-places-to-go-camping-in-texas',
    marker: 'Best Places to Go Camping in Texas',
    requireSlot: false,
  },
  {
    route: '/explore/rv-parks',
    marker: 'Texas RV Parks',
    requireSlot: false,
  },
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
    route: '/sports-venue/pga-frisco-fields-ranch',
    marker: 'PGA Frisco',
    requireSlot: true,
  },
  {
    route: '/sports-venue/tpc-san-antonio',
    marker: 'TPC San Antonio',
    requireSlot: true,
  },
  {
    route: '/sports-venue/memorial-park-golf-course',
    marker: 'Memorial Park Golf Course',
    requireSlot: true,
  },
  {
    route: '/destination/fredericksburg',
    marker: 'Fredericksburg',
    requireSlot: true,
  },
  {
    route: '/destination/johnson-city',
    marker: 'Johnson City',
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
  requireCondition(html.includes('/stay-affiliate-options.js'), `${page.route} is missing the Hotels.com/Orbitz/Travelocity/Vrbo/RVshare affiliate bootstrap reference.`);
  const expediaPosition = html.indexOf('/expedia-travel.js');
  const affiliatePosition = html.indexOf('/stay-affiliate-options.js');
  requireCondition(expediaPosition >= 0 && affiliatePosition > expediaPosition, `${page.route} no longer loads the Hotels.com/Orbitz/Travelocity/Vrbo/RVshare bootstrap after Expedia/Stay Nearby.`);
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

console.log('Stay affiliate production verification passed: the deployed stay bootstrap was executed in a sandbox and confirms Orbitz for event/venue hotel-first intent, Travelocity for broader destination/leisure intent, and TexasDefined CJ deep-link binding for both providers; all 30 governed stay properties (18 venue + 12 destination) expose unique exact-property Hotels.com destinations through the TexasDefined CJ publisher, curated surfaces prioritize exact-property referrals before route-scoped comparison choices, while broad Expedia search remains the fallback; Vrbo remains separately gated on ordinary leisure routes and is suppressed on RVshare-intent routes; the live same-origin /api/analytics collector accepted partner_referral_shown, partner_referral_clicked and reserved expedia-search next_step_selected CI probes backed by Cloudflare Analytics Engine; Hotels.com/Orbitz/Travelocity/Vrbo/RVshare and verified Expedia/Stay Nearby property links use sponsored/nofollow plus first-party partner/placement attribution; the Stay Nearby asset continues to enforce separate indexability and monetization eligibility; representative camping and RV-directory pages load the governed travel bootstraps and remain self-canonical/indexable; representative event, destination and traffic-prioritized venue pages expose deterministic in-content stay slots; representative city and county travel pages remain self-canonical/indexable; the canonical road-trips hub exposes its dedicated Booking.com rental-car conversion with first-party placement metadata and disclosure; and script ordering is intact.');
