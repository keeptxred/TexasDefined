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

const affiliateBootstrap = await fetchLive('/stay-affiliate-options.js');
for (const marker of [
  'const CJ_PUBLISHER_ID = "101876465"',
  'https://www.hotels.com/',
  'https://www.vrbo.com/',
  'const VERIFIED_PROPERTY_DESTINATIONS = new Map([',
  'https://www.hotels.com/ho115100/hilton-anatole-dallas-united-states-of-america/',
  'https://www.hotels.com/ho2949850752/loews-arlington-arlington-united-states-of-america/',
  'https://www.hotels.com/ho1830497920/tru-by-hilton-northlake-fort-worth-tx-roanoke-united-states-of-america/',
  'upgradeExactPropertyCards',
  'View on Hotels.com',
  'placement: "stay-nearby-card-exact"',
  'link.dataset.exactProperty = propertyName',
  'Find places to stay',
  'Find hotels on Hotels.com',
  'Find vacation rentals on Vrbo',
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
requireCondition(exactPropertyUrls.length === 15, `Live stay affiliate bootstrap must contain 15 exact Hotels.com property URLs; found ${exactPropertyUrls.length}.`);
requireCondition(new Set(exactPropertyUrls).size === 15, 'Live exact Hotels.com property URLs must be unique across the curated hotel cohort.');

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
];

for (const page of pages) {
  const html = await fetchLive(page.route);
  requireCondition(html.includes(page.marker), `${page.route} did not render its expected page marker.`);
  requireCondition(html.includes('/expedia-travel.js'), `${page.route} is missing the Expedia/Stay Nearby bootstrap reference.`);
  requireCondition(html.includes('/stay-affiliate-options.js'), `${page.route} is missing the Hotels.com/Vrbo affiliate bootstrap reference.`);
  const expediaPosition = html.indexOf('/expedia-travel.js');
  const affiliatePosition = html.indexOf('/stay-affiliate-options.js');
  requireCondition(expediaPosition >= 0 && affiliatePosition > expediaPosition, `${page.route} no longer loads the stay affiliate bootstrap after Expedia/Stay Nearby.`);
  if (page.requireSlot) requireCondition(html.includes('data-stay-nearby-slot'), `${page.route} is missing its explicit in-content Stay Nearby slot.`);

  const noindex = /<meta[^>]+(?:name=["'](?:robots|googlebot|googlebot-news)["'][^>]+content=["'][^"']*\bnoindex\b|content=["'][^"']*\bnoindex\b[^>]+name=["'](?:robots|googlebot|googlebot-news)["'])/i.test(html);
  requireCondition(!noindex, `${page.route} is noindex and must not be part of the monetized production cohort.`);

  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const canonicalHref = canonicalMatch?.[1] || canonicalMatch?.[2];
  requireCondition(Boolean(canonicalHref), `${page.route} is missing a canonical URL required by the monetization policy.`);
  const canonical = new URL(canonicalHref, origin);
  requireCondition(canonical.origin === new URL(origin).origin && canonical.pathname.replace(/\/+$/, '') === page.route.replace(/\/+$/, ''), `${page.route} is not self-canonical and must not be part of the monetized production cohort.`);
}

console.log('Stay affiliate production verification passed: all 15 curated hotel records expose unique exact-property Hotels.com destinations through the TexasDefined CJ publisher while broad Expedia search remains the fallback; Hotels.com/Vrbo tracking and disclosures are live with GTM plus first-party commercial-partner attribution; the Stay Nearby asset continues to enforce separate indexability and monetization eligibility; representative event, venue and destination pages expose deterministic in-content stay slots; representative city and county travel pages remain self-canonical/indexable; and script ordering is intact.');
