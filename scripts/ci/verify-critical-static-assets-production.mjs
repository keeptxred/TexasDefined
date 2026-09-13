import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const assets = [
  {
    label: 'xtreme-raceway-park-image',
    path: '/images/sports-venues/xtreme-raceway-park.jpg',
    contentType: 'image/jpeg',
    minBytes: 4_096,
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

async function verifyAsset({ label, path, contentType, minBytes }) {
  let lastStatus = 'network-error';
  let lastType = '';
  let lastBytes = 0;
  let lastError = '';
  let lastChallenge = false;
  let attempts = 0;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    attempts = attempt;
    const url = `${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastType = response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() ?? '';
      const body = await response.arrayBuffer();
      lastBytes = body.byteLength;
      lastError = '';

      const passed = !lastChallenge
        && response.ok
        && lastType === contentType
        && lastBytes >= minBytes;

      if (passed) {
        console.log(`[${label}] verified (${response.status}, ${lastType}, ${lastBytes} bytes).`);
        appendSummary(`| ✅ pass | ${label} | ${lastStatus} | ${lastType} | ${lastBytes} | ${attempts} |\n`);
        return;
      }

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else {
        console.log(`[${label}] asset not healthy yet: HTTP ${lastStatus}, content-type ${lastType || 'missing'}, ${lastBytes} bytes.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastType = '';
      lastBytes = 0;
      lastChallenge = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  appendSummary(`| ❌ FAIL | ${label} | ${lastStatus} | ${lastType || 'missing'} | ${lastBytes} | ${attempts} |\n`);
  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
    || (lastType !== contentType ? `expected ${contentType}, received ${lastType || 'missing content-type'}` : '')
    || `asset body too small: ${lastBytes} bytes; expected at least ${minBytes}`;
  console.error(`::error title=LIVE PRODUCTION static asset failure::${label} failed after ${attempts} attempts — ${reason}`);
  throw new Error(`${label}: ${reason}`);
}

appendSummary('\n## Critical static asset verification\n\n');
appendSummary('| Result | Asset | HTTP | Content type | Bytes | Attempts |\n|---|---|---:|---|---:|---:|\n');

for (const asset of assets) {
  await verifyAsset(asset);
}

console.log(`TexasDefined critical static asset verification passed (${assets.length} asset${assets.length === 1 ? '' : 's'}).`);
