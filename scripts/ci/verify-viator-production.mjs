const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeReactSsrHtml(body) {
  // React inserts empty comment boundaries between static text and interpolated
  // values during SSR, for example: "around <!-- -->Barton Springs Pool".
  // Those boundaries are not visible text and should not make a live copy
  // assertion fail. Keep the rest of the HTML unchanged so PID/MCID,
  // campaign and rel-attribute safeguards remain exact raw-markup checks.
  return body.replace(/<!--\s*-->/g, '');
}

async function verifySurface({ path, label, required, minAffiliateLinks }) {
  let lastError = null;
  let lastStatus = 'network-error';
  let lastBody = '';

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${label}-${attempt}`)}`;
    console.log(`[viator-production] ${label} attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Viator-Smoke/1.0' },
      });
      const body = await response.text();
      const verificationBody = normalizeReactSsrHtml(body);
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastStatus = String(response.status);
      lastBody = body;

      if (challenged) {
        lastError = new Error('Cloudflare returned cf-mitigated: challenge');
      } else if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`);
      } else {
        const missing = required.filter((needle) => !verificationBody.includes(needle));
        if (!missing.length) {
          const affiliateLinkCount = (body.match(/pid=P00318227/g) ?? []).length;
          if (affiliateLinkCount < minAffiliateLinks) {
            lastError = new Error(`expected at least ${minAffiliateLinks} affiliate link(s), found ${affiliateLinkCount}`);
          } else {
            console.log(`[viator-production] ${label} verified ${affiliateLinkCount} affiliate link(s) with PID P00318227 / MCID 42383 and sponsored nofollow disclosure.`);
            return;
          }
        } else {
          lastError = new Error(`missing ${missing.join(', ')}`);
        }
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      lastStatus = 'network-error';
    }

    console.log(`[viator-production] ${label} attempt ${attempt} failed: ${lastError?.message ?? lastStatus}`);
    if (attempt < 5) await sleep(5_000);
  }

  console.error(`::error title=VIATOR PRODUCTION failure::${path} failed — ${lastError?.message ?? `HTTP ${lastStatus}`}`);
  if (lastBody) console.error(`[viator-production] ${label} response sample: ${lastBody.slice(0, 1400).replace(/\s+/g, ' ')}`);
  process.exit(1);
}

async function verifyCityBootstrap() {
  const token = encodeURIComponent(`${sha}-${runId}-city-bootstrap`);
  const [cityResponse, assetResponse] = await Promise.all([
    fetch(`${origin}/city/austin?verify=${token}`, { cache: 'no-store', redirect: 'follow', signal: AbortSignal.timeout(30_000) }),
    fetch(`${origin}/city-experience-affiliate.js?verify=${token}`, { cache: 'no-store', redirect: 'follow', signal: AbortSignal.timeout(30_000) }),
  ]);
  const cityHtml = await cityResponse.text();
  const asset = await assetResponse.text();
  const missing = [];
  if (!cityResponse.ok) missing.push(`Austin city page HTTP ${cityResponse.status}`);
  if (!assetResponse.ok) missing.push(`city bootstrap HTTP ${assetResponse.status}`);
  for (const needle of [
    '/city-experience-affiliate.js',
  ]) if (!cityHtml.includes(needle)) missing.push(`city page missing ${needle}`);
  for (const needle of [
    'austin: ["Austin", "/Austin/d5021"]',
    'pid=P00318227&mcid=42383&campaign=texasdefined-city-${slug}',
    'data-commercial-partner="viator"',
    'sponsored nofollow noopener noreferrer',
    'Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings',
  ]) if (!asset.includes(needle)) missing.push(`city bootstrap missing ${needle}`);
  if (missing.length) {
    console.error(`::error title=VIATOR CITY BOOTSTRAP production failure::${missing.join('; ')}`);
    process.exit(1);
  }
  console.log('[viator-production] Austin city page references the deployed bundle-neutral city experience bootstrap with approved Viator attribution and disclosure.');
}

await verifySurface({
  path: '/explore',
  label: 'explore-directory',
  minAffiliateLinks: 2,
  required: [
    'id="tours-experiences"',
    'Book the Texas experience after you decide where to go',
    'Recent inventory signals:',
    'September 8, 2026',
    'Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings',
    'pid=P00318227',
    'mcid=42383',
    'campaign=texasdefined-statewide-explore',
    'rel="sponsored nofollow noopener noreferrer"',
  ],
});

await verifySurface({
  path: '/destination/barton-springs-pool',
  label: 'destination-booking-card',
  minAffiliateLinks: 1,
  required: [
    'Tours and experiences near Barton Springs Pool',
    'Recent Austin inventory signals:',
    'On the water',
    'September 8, 2026',
    'Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings',
    'pid=P00318227',
    'mcid=42383',
    'campaign=texasdefined-destination-barton-springs-pool',
    'rel="sponsored nofollow noopener noreferrer"',
  ],
});

await verifyCityBootstrap();
console.log('[viator-production] Explore directory, representative destination booking card and city affiliate bootstrap passed live verification.');

await import('./verify-ask-texas-government-production.mjs');
await import('./verify-stay-nearby-production.mjs');
await import('./verify-critical-static-assets-production.mjs');
await import('./verify-sports-venue-heroes-production.mjs');
await import('./verify-galaxy-social-production.mjs');
