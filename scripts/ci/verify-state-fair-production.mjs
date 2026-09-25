const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const origins = [
  ['direct-worker', process.env.STATE_FAIR_DIRECT_ORIGIN ?? 'https://texasdefined-site.freddy-coppola.workers.dev'],
  ['canonical-domain', process.env.STATE_FAIR_CANONICAL_ORIGIN ?? 'https://texasdefined.com'],
];
const required = [
  'September 25, 2026',
  '2026 dates, hours and Fair Park location',
  'How Food & Midway Coupons work',
  '2026 ticket prices and admission',
];
const forbidden = [
  'State Fair of Texas 2026: Dates, Fair Park, Food, Rides and Planning',
  'August 20, 2026',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const [label, origin] of origins) {
  let passed = false;
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = `${origin}/texas-state-fair?verify-state-fair=${encodeURIComponent(`${sha}-${runId}-${label}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache, no-store, max-age=0',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-StateFair-Production-Smoke/1.0',
        },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      lastError = '';

      const missing = required.filter((marker) => !lastBody.includes(marker));
      const stale = forbidden.filter((marker) => lastBody.includes(marker));
      if (response.ok && missing.length === 0 && stale.length === 0) {
        console.log(`[${label}] verified current State Fair body (${response.status}, ${lastBody.length} bytes).`);
        passed = true;
        break;
      }
      console.log(`[${label}] HTTP ${response.status}; missing=${missing.join(' | ') || 'none'}; stale=${stale.join(' | ') || 'none'}.`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  if (!passed) {
    console.error(`::error title=State Fair production body mismatch::${label} failed; HTTP=${lastStatus}; error=${lastError || 'none'}`);
    if (lastBody) {
      console.error(`[${label}] response sample: ${lastBody.slice(0, 5000).replace(/\s+/g, ' ')}`);
    }
    process.exit(1);
  }
}

console.log('State Fair direct-worker and canonical production body verification passed.');
