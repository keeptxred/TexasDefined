const productionOrigin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const directWorkerOrigin = process.env.DIRECT_WORKER_ORIGIN ?? 'https://texasdefined-site.freddy-coppola.workers.dev';
const keepTxRedOrigin = process.env.KEEP_TX_RED_ORIGIN ?? 'https://keeptxred.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const pageQuestion = 'Who represents me in the Texas Legislature?';
const requiredPageNeedles = [
  'Texas Defined AI',
  'Ask Texas anything.',
  'Who represents me in the Texas Legislature?',
  'What does HB 1056 do?',
  'Keep TX Red\'s public government and election knowledge',
  'name="question"',
  'noindex, follow',
];

function fail(label, message, sample = '') {
  console.error(`::error title=ASK TEXAS production failure::${label} — ${message}`);
  if (sample) console.error(`[${label}] response sample: ${sample.slice(0, 1800).replace(/\s+/g, ' ')}`);
  process.exit(1);
}

async function verifyAskPage(origin, label) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let lastHeaders = null;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = new URL('/ask-texas', origin);
    url.searchParams.set('q', pageQuestion);
    url.searchParams.set('verify-ask-texas', `${sha}-${runId}-${attempt}`);
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Ask-Texas-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastHeaders = response.headers;
      lastBody = await response.text();
      lastError = '';

      const missing = requiredPageNeedles.filter((needle) => !lastBody.includes(needle));
      const cacheControl = response.headers.get('cache-control')?.toLowerCase() ?? '';
      const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
      const contentTypeOptions = response.headers.get('x-content-type-options')?.toLowerCase() ?? '';
      const csp = response.headers.get('content-security-policy')?.toLowerCase() ?? '';
      const headersOkay = cacheControl.includes('no-store')
        && contentType.includes('text/html')
        && contentTypeOptions === 'nosniff'
        && csp.includes("default-src 'none'")
        && csp.includes("form-action 'self'");

      if (response.ok && missing.length === 0 && headersOkay) {
        console.log(`[${label}] Ask Texas page verified (${response.status}) with government examples, noindex and hardened headers.`);
        return;
      }

      console.log(`[${label}] not ready: status=${response.status}, missing=${missing.join(' | ') || 'none'}, headersOkay=${headersOkay}`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  const cacheControl = lastHeaders?.get('cache-control') ?? 'missing';
  const csp = lastHeaders?.get('content-security-policy') ?? 'missing';
  fail(label, lastError || `HTTP ${lastStatus}; cache-control=${cacheControl}; csp=${csp}`, lastBody);
}

async function verifyKeepTxRedContract() {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = new URL('/api/public/texasdefined-government-search', keepTxRedOrigin);
    url.searchParams.set('q', 'HB 1056');
    url.searchParams.set('limit', '3');
    url.searchParams.set('verify-ask-texas', `${sha}-${runId}-${attempt}`);
    console.log(`[keep-tx-red-contract] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          accept: 'application/json',
          'user-agent': 'TexasDefined-CI-Ask-Texas-Smoke/1.0',
        },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      lastError = '';

      let payload = null;
      try {
        payload = JSON.parse(lastBody);
      } catch {
        payload = null;
      }

      const results = payload && Array.isArray(payload.results) ? payload.results : [];
      const validResult = results.some((item) => {
        if (!item || typeof item !== 'object') return false;
        const title = typeof item.title === 'string' ? item.title : '';
        const summary = typeof item.summary === 'string' ? item.summary : '';
        const urlValue = typeof item.url === 'string' ? item.url : '';
        return /HB\s*1056/i.test(`${title} ${summary}`) && /^https:\/\/(?:www\.)?keeptxred\.com\//i.test(urlValue);
      });

      if (response.ok && payload?.ok === true && results.length > 0 && validResult) {
        console.log(`[keep-tx-red-contract] verified (${response.status}): ${results.length} bounded public government result(s).`);
        return;
      }

      console.log(`[keep-tx-red-contract] not ready: status=${response.status}, ok=${payload?.ok}, results=${results.length}, validHB1056=${validResult}`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      console.log(`[keep-tx-red-contract] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  fail('keep-tx-red-contract', lastError || `HTTP ${lastStatus}; expected bounded JSON results for HB 1056`, lastBody);
}

async function verifyCrossOriginRejection() {
  const url = new URL('/api/texas-defined-ai', productionOrigin);
  const response = await fetch(url, {
    method: 'POST',
    redirect: 'manual',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: {
      'content-type': 'application/json',
      origin: 'https://example.invalid',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'TexasDefined-CI-Ask-Texas-Smoke/1.0',
    },
    body: JSON.stringify({ question: 'What does HB 1056 do?' }),
  });
  const body = await response.text();
  if (response.status !== 403 || !/cross-origin/i.test(body)) {
    fail('cross-origin-rejection', `expected HTTP 403 without invoking inference; received HTTP ${response.status}`, body);
  }
  console.log('[cross-origin-rejection] verified: government AI endpoint rejects cross-site POST before inference.');
}

await verifyAskPage(productionOrigin, 'custom-domain:ask-texas');
await verifyAskPage(directWorkerOrigin, 'direct-worker:ask-texas');
await verifyKeepTxRedContract();
await verifyCrossOriginRejection();

console.log('Ask Texas government production verification passed without generating an AI answer.');
