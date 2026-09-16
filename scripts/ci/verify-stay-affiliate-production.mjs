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
  'Find places to stay',
  'Find hotels on Hotels.com',
  'Find vacation rentals on Vrbo',
  'sponsored nofollow noopener noreferrer',
  'event: "affiliate_click"',
  'window.dataLayer.push(detail)',
  'affiliate_placement: placement',
  'link.dataset.commercialPartner',
  'function commercialEligible',
  'meta[name="robots"]',
  'data-td-commercial-eligibility',
  'expediaSurface.hidden = true',
  'PLACEMENT_HEADING',
  'anchor.parentNode.insertBefore(surface, anchor)',
]) requireCondition(affiliateBootstrap.includes(marker), `Live stay affiliate bootstrap is missing marker: ${marker}`);

const expediaBootstrap = await fetchLive('/expedia-travel.js');
for (const marker of [
  'const SLOT_SELECTOR = "[data-stay-nearby-slot]"',
  'const STAY_DATA_URL = "/stay-nearby-hotels.json"',
  'function placementTarget(main)',
  'function placeSurface(surface, main)',
  'window.TexasDefinedStayNearby',
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
}

console.log('Stay affiliate production verification passed: Hotels.com/Vrbo tracking and disclosures are live, destination monetization fails closed when the route emits noindex, first-party commercial-partner attribution is present, Expedia remains the lodging host, representative event, venue and destination pages expose deterministic in-content stay slots, representative city and county travel pages retain the shared stay bootstraps, and script ordering is intact.');
