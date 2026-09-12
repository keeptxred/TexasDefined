const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const userAgent = 'TexasDefined-CI-Brand-Locator-Smoke/1.0';
const publicTestAddress = '1100 Congress Ave, Austin, TX 78701';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(path, expectedNeedles) {
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const url = `${origin}${path}${path.includes('?') ? '&' : '?'}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': userAgent },
      });
      const body = await response.text();
      const missing = expectedNeedles.filter((needle) => !body.includes(needle));
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (response.ok && !challenged && missing.length === 0) return;
      lastError = challenged
        ? 'Cloudflare challenge'
        : response.ok
          ? `missing ${missing.join(' | ')}`
          : `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000);
  }
  throw new Error(`${path} production smoke failed: ${lastError || 'unknown failure'}`);
}

async function verifyLocatorApi() {
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(`${origin}/api/texas-brand-locator`, {
        method: 'POST',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          origin,
          referer: `${origin}/things-unique-to-texas/texas-brands`,
          'sec-fetch-site': 'same-origin',
          'user-agent': userAgent,
        },
        body: JSON.stringify({ address: publicTestAddress, brands: ['bucees'] }),
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const payload = await response.json().catch(() => null);
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const hasBucees = results.some((result) => result?.brand === 'bucees' && typeof result?.address === 'string' && result.address.length > 0);
      const hasMatchedAddress = typeof payload?.matchedAddress === 'string' && payload.matchedAddress.length > 0;
      if (response.ok && !challenged && hasMatchedAddress && hasBucees) return;
      lastError = challenged
        ? 'Cloudflare challenge'
        : !response.ok
          ? `HTTP ${response.status}${typeof payload?.error === 'string' ? `: ${payload.error}` : ''}`
          : !hasMatchedAddress
            ? 'missing matchedAddress'
            : 'no Buc-ee\'s result returned';
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000);
  }
  throw new Error(`brand locator API production smoke failed: ${lastError || 'unknown failure'}`);
}

await fetchText('/things-unique-to-texas/texas-brands', [
  'data-texas-brand-locator-anchor',
  '32 brands and Texas retail institutions',
]);
await fetchText('/texas-brand-locator.js', [
  '/api/texas-brand-locator',
  "Find H-E-B, Buc-ee's, Whataburger, Shipley, Kolache Factory and H-E-B family stores",
  'central-market',
  'joe-vs',
  'mi-tienda',
  'whataburger',
  'shipley',
  'kolache-factory',
  "Whataburger's official Texas location directory",
  "Shipley Do-Nuts' official nearby-location finder",
  "Kolache Factory's official Texas location directory",
]);
await verifyLocatorApi();

console.log('Texas brand locator production smoke passed (page mount, H-E-B-family, Buc-ee\'s, Whataburger, Shipley and Kolache Factory choices, deferred script, and Buc-ee\'s lookup).');