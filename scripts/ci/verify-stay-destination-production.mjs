const origin = process.env.STAY_DESTINATION_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function liveUrl(path, attempt) {
  const url = new URL(path, origin);
  url.searchParams.set('td_stay_destination_verify', `${revision}-${runId}-${attempt}`);
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
          'user-agent': 'TexasDefined-CI-Stay-Destination/1.0',
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

const registryBody = await fetchLive('/stay-nearby-destination-hotels.json');
const registry = JSON.parse(registryBody);
requireCondition(registry.version === 1, 'Live destination stay registry version is not 1.');
requireCondition(Array.isArray(registry.properties) && registry.properties.length === 9, 'Live destination stay registry must contain exactly 9 controlled properties.');

const expected = ['fredericksburg', 'galveston-seawall', 'texas-ranger-hall-of-fame-museum-waco'];
for (const key of expected) {
  const matches = registry.properties.filter((property) =>
    property.status === 'active' && (property.contexts || []).some((context) => context.kind === 'destination' && context.key === key));
  requireCondition(matches.length === 3, `${key}: live registry must expose exactly 3 active curated stays.`);
  requireCondition(matches.every((property) => property.image === null), `${key}: live destination cohort must fail closed on ungoverned imagery.`);
  requireCondition(matches.every((property) => (property.bookingTargets || []).every((target) => target.verified === false && target.affiliateUrl === null)), `${key}: live destination cohort contains an unverified property deeplink.`);
}

const bootstrap = await fetchLive('/expedia-travel.js');
for (const marker of [
  'const DESTINATION_STAY_DATA_URL = "/stay-nearby-destination-hotels.json"',
  'fetchRegistry(DESTINATION_STAY_DATA_URL)',
  'Useful stays near this destination',
  'function contextHeading(kind)',
  'function isIndexabilityEligible(',
  'function isMonetizationEligible(',
]) requireCondition(bootstrap.includes(marker), `Live Expedia bootstrap missing destination cohort marker: ${marker}`);

for (const route of expected.map((slug) => `/destination/${slug}`)) {
  const html = await fetchLive(route);
  requireCondition(html.includes('/expedia-travel.js'), `${route} is missing the Expedia/Stay Nearby bootstrap.`);
  requireCondition(html.includes('data-stay-nearby-slot'), `${route} is missing the contextual Stay Nearby slot.`);
  const noindex = /<meta[^>]+(?:name=["'](?:robots|googlebot|googlebot-news)["'][^>]+content=["'][^"']*\bnoindex\b|content=["'][^"']*\bnoindex\b[^>]+name=["'](?:robots|googlebot|googlebot-news)["'])/i.test(html);
  requireCondition(!noindex, `${route} is noindex and must not be monetized.`);
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const canonicalHref = canonicalMatch?.[1] || canonicalMatch?.[2];
  requireCondition(Boolean(canonicalHref), `${route} is missing a canonical URL.`);
  const canonical = new URL(canonicalHref, origin);
  requireCondition(canonical.origin === new URL(origin).origin && canonical.pathname.replace(/\/+$/, '') === route.replace(/\/+$/, ''), `${route} is not self-canonical.`);
}

const admin = await fetchLive('/admin/stay-monetization');
requireCondition(/noindex/i.test(admin), 'Stay monetization readiness route must remain noindex in production.');
requireCondition(admin.includes('Stay monetization readiness'), 'Stay monetization readiness route did not render its expected heading.');
requireCondition(admin.includes('does not invent traffic, booking, conversion or revenue performance'), 'Stay monetization readiness route lost its evidence-only performance disclaimer.');

console.log('Destination stay production verification passed: 3 governed destination contexts and 9 source-backed properties are live; each destination has exactly 3 curated choices; unverified property deeplinks and ungoverned imagery fail closed; destination pages are self-canonical/indexable with contextual stay slots; and the noindex readiness dashboard is live without fabricated performance data.');
