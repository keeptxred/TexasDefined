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

async function postLocator(brands) {
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
    body: JSON.stringify({ address: publicTestAddress, brands }),
  });
  const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const cacheControl = response.headers.get('cache-control')?.toLowerCase() ?? '';
  const payload = await response.json().catch(() => null);
  return { response, challenged, cacheControl, payload };
}

async function verifyBuceesLocatorApi() {
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const { response, challenged, cacheControl, payload } = await postLocator(['bucees']);
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const hasBucees = results.some((result) => result?.brand === 'bucees' && typeof result?.address === 'string' && result.address.length > 0);
      const hasMatchedAddress = typeof payload?.matchedAddress === 'string' && payload.matchedAddress.length > 0;
      const privateNoStore = cacheControl.includes('no-store') && cacheControl.includes('private');
      if (response.ok && !challenged && privateNoStore && hasMatchedAddress && hasBucees) return;
      lastError = challenged
        ? 'Cloudflare challenge'
        : !response.ok
          ? `HTTP ${response.status}${typeof payload?.error === 'string' ? `: ${payload.error}` : ''}`
          : !privateNoStore
            ? `unsafe cache-control: ${cacheControl || 'missing'}`
            : !hasMatchedAddress
              ? 'missing matchedAddress'
              : 'no Buc-ee\'s result returned';
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000);
  }
  throw new Error(`Buc-ee's brand locator API production smoke failed: ${lastError || 'unknown failure'}`);
}

async function verifyHebLocatorApi() {
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const { response, challenged, cacheControl, payload } = await postLocator(['heb']);
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const fallbackLinks = Array.isArray(payload?.fallbackLinks) ? payload.fallbackLinks : [];
      const hasHeb = results.some((result) => result?.brand === 'heb' && typeof result?.address === 'string' && result.address.length > 0);
      const hasOfficialHebFallback = fallbackLinks.some((link) => {
        if (link?.brand !== 'heb' || typeof link?.url !== 'string') return false;
        try {
          const url = new URL(link.url);
          return url.protocol === 'https:' && url.hostname === 'www.heb.com' && url.pathname === '/store-locations';
        } catch {
          return false;
        }
      });
      const hasMatchedAddress = typeof payload?.matchedAddress === 'string' && payload.matchedAddress.length > 0;
      const privateNoStore = cacheControl.includes('no-store') && cacheControl.includes('private');
      const usableOutcome = hasHeb ? hasMatchedAddress : hasOfficialHebFallback;
      const expectedStatus = response.ok || (response.status === 503 && hasOfficialHebFallback);
      if (expectedStatus && !challenged && privateNoStore && usableOutcome) return;
      lastError = challenged
        ? 'Cloudflare challenge'
        : !expectedStatus
          ? `HTTP ${response.status}${typeof payload?.error === 'string' ? `: ${payload.error}` : ''}`
          : !privateNoStore
            ? `unsafe cache-control: ${cacheControl || 'missing'}`
            : hasHeb && !hasMatchedAddress
              ? 'H-E-B result returned without matchedAddress'
              : 'neither an H-E-B result nor the official H-E-B fallback was returned';
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000);
  }
  throw new Error(`H-E-B brand locator API production smoke failed: ${lastError || 'unknown failure'}`);
}

await fetchText('/things-unique-to-texas/texas-brands', [
  'data-texas-brand-locator-anchor',
  '32 brands and Texas retail institutions',
]);
await fetchText('/texas-brand-locator.js', [
  '/api/texas-brand-locator',
  "Find H-E-B, Buc-ee's, Whataburger, Academy, Shipley, Kolache Factory and H-E-B family stores",
  'central-market',
  'joe-vs',
  'mi-tienda',
  'whataburger',
  'academy',
  'shipley',
  'kolache-factory',
  "Whataburger's official Texas location directory",
  'official Buc-ee\'s and Academy Texas directories',
  "Shipley Do-Nuts' official nearby-location finder",
  "Kolache Factory's official Texas location directory",
]);
await verifyBuceesLocatorApi();
await verifyHebLocatorApi();

console.log('Texas brand locator production smoke passed (page mount, deferred script, Buc-ee\'s lookup, and H-E-B live-result/official-fallback coverage).');
