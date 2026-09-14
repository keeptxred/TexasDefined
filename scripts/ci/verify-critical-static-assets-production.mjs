import { createHash } from 'node:crypto';
import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const BLUEBONNET_SHA256 = '9664491618145e39ce2ebac354ae65325dba7d65d9557dc9d13206fe8ead62d8';

const assets = [
  {
    label: 'xtreme-raceway-park-image',
    path: '/images/sports-venues/xtreme-raceway-park.jpg',
    contentType: 'image/jpeg',
    minBytes: 4_096,
  },
  {
    label: 'chappell-hill-bluebonnet-festival-versioned-image',
    path: '/images/events/chappell-hill-bluebonnet-festival-20260914.webp',
    contentType: 'image/webp',
    minBytes: 100_000,
    sha256: BLUEBONNET_SHA256,
  },
  {
    label: 'chappell-hill-bluebonnet-festival-legacy-image',
    path: '/images/events/chappell-hill-bluebonnet-festival.webp',
    contentType: 'image/webp',
    minBytes: 100_000,
    sha256: BLUEBONNET_SHA256,
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

async function verifyAsset({ label, path, contentType, minBytes, sha256 }) {
  let lastStatus = 'network-error';
  let lastType = '';
  let lastBytes = 0;
  let lastHash = '';
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
      const body = Buffer.from(await response.arrayBuffer());
      lastBytes = body.byteLength;
      lastHash = createHash('sha256').update(body).digest('hex');
      lastError = '';

      const passed = !lastChallenge
        && response.ok
        && lastType === contentType
        && lastBytes >= minBytes
        && (!sha256 || lastHash === sha256);

      if (passed) {
        console.log(`[${label}] verified (${response.status}, ${lastType}, ${lastBytes} bytes, sha256 ${lastHash}).`);
        appendSummary(`| ✅ pass | ${label} | ${lastStatus} | ${lastType} | ${lastBytes} | ${lastHash} | ${attempts} |\n`);
        return;
      }

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else {
        console.log(`[${label}] asset not healthy yet: HTTP ${lastStatus}, content-type ${lastType || 'missing'}, ${lastBytes} bytes, sha256 ${lastHash || 'missing'}.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastType = '';
      lastBytes = 0;
      lastHash = '';
      lastChallenge = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  appendSummary(`| ❌ FAIL | ${label} | ${lastStatus} | ${lastType || 'missing'} | ${lastBytes} | ${lastHash || 'missing'} | ${attempts} |\n`);
  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
    || (lastType !== contentType ? `expected ${contentType}, received ${lastType || 'missing content-type'}` : '')
    || (lastBytes < minBytes ? `asset body too small: ${lastBytes} bytes; expected at least ${minBytes}` : '')
    || (sha256 && lastHash !== sha256 ? `sha256 mismatch: expected ${sha256}, received ${lastHash || 'missing'}` : '')
    || 'unknown static asset verification failure';
  console.error(`::error title=LIVE PRODUCTION static asset failure::${label} failed after ${attempts} attempts — ${reason}`);
  throw new Error(`${label}: ${reason}`);
}

appendSummary('\n## Critical static asset verification\n\n');
appendSummary('| Result | Asset | HTTP | Content type | Bytes | SHA-256 | Attempts |\n|---|---|---:|---|---:|---|---:|\n');

for (const asset of assets) {
  await verifyAsset(asset);
}

console.log(`TexasDefined critical static asset verification passed (${assets.length} asset${assets.length === 1 ? '' : 's'}).`);
