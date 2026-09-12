const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const legacyPath = '/destination/devil-s-sinkhole-state-natural-area';
const expectedLocation = '/destination/devils-sinkhole-state-natural-area';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let lastStatus = 'network-error';
let lastLocation = '';
let lastError = '';
let passed = false;

for (let attempt = 1; attempt <= 6; attempt += 1) {
  const url = `${origin}${legacyPath}?verify=${encodeURIComponent(`${process.env.GITHUB_SHA ?? 'local'}-${process.env.GITHUB_RUN_ID ?? Date.now()}-${attempt}`)}`;
  console.log(`[devils-sinkhole-legacy-301] attempt ${attempt}: ${url}`);

  try {
    const response = await fetch(url, {
      redirect: 'manual',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'TexasDefined-CI-Redirect-Smoke/1.0' },
    });

    lastStatus = String(response.status);
    lastLocation = response.headers.get('location') ?? '';
    lastError = '';

    let resolvedLocation = '';
    try {
      resolvedLocation = lastLocation ? new URL(lastLocation, origin).pathname : '';
    } catch {
      resolvedLocation = '';
    }

    if (response.status === 301 && resolvedLocation === expectedLocation) {
      console.log(`[devils-sinkhole-legacy-301] verified HTTP 301 -> ${lastLocation}`);
      passed = true;
      break;
    }

    console.log(`[devils-sinkhole-legacy-301] expected 301 -> ${expectedLocation}; got ${response.status} -> ${lastLocation || '(missing Location header)'}`);
  } catch (error) {
    lastError = error instanceof Error ? error.message : String(error);
    lastStatus = 'network-error';
    lastLocation = '';
    console.log(`[devils-sinkhole-legacy-301] request failed: ${lastError}`);
  }

  if (attempt < 6) await sleep(5_000);
}

if (!passed) {
  const reason = lastError || `HTTP ${lastStatus}, Location ${lastLocation || '(missing)'}`;
  console.error(`::error title=LIVE PRODUCTION redirect failure::Devil's Sinkhole legacy URL failed — ${reason}`);
  process.exit(1);
}

console.log("TexasDefined Devil's Sinkhole production redirect verification passed.");
