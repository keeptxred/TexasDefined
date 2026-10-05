const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const path = '/explore/landscapes/rivers-and-river-valleys';
const requiredNeedles = [
  'Texas Rivers, Region by Region',
  'Spring-fed vs. runoff-driven rivers',
  'Thirteen rivers that explain Texas',
  'Texas river valleys FAQ',
  'Six river-valley features worth knowing',
];
const forbiddenNeedles = [
  'Rock, water and living cover',
  'How to recognize Texas Rivers & River Valleys',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHtml(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: {
      'user-agent': 'TexasDefined-CI-Rivers-Landscape-Smoke/1.0',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
    },
  });
  return {
    response,
    body: await response.text(),
    challenged: response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge',
  };
}

let lastReason = 'verification did not run';

for (let attempt = 1; attempt <= 6; attempt += 1) {
  try {
    const url = `${origin}${path}`;
    console.log(`[rivers-landscape-canonical] attempt ${attempt}: ${url}`);
    const { response, body, challenged } = await fetchHtml(url);
    const missing = requiredNeedles.filter((needle) => !body.includes(needle));
    const stale = forbiddenNeedles.filter((needle) => body.includes(needle));

    if (response.ok && !challenged && missing.length === 0 && stale.length === 0) {
      console.log('Texas Rivers & River Valleys canonical production page is current.');
      process.exit(0);
    }

    lastReason = challenged
      ? 'Cloudflare returned cf-mitigated: challenge'
      : !response.ok
        ? `HTTP ${response.status}`
        : missing.length > 0
          ? `required content missing: ${missing.join(' | ')}`
          : `retired generic content still served: ${stale.join(' | ')}`;
    console.log(`[rivers-landscape-canonical] ${lastReason}`);
  } catch (error) {
    lastReason = error instanceof Error ? error.message : String(error);
    console.log(`[rivers-landscape-canonical] request failed: ${lastReason}`);
  }

  if (attempt < 6) await sleep(5_000);
}

try {
  const probeUrl = `${origin}${path}?verify=rivers-landscape-${Date.now()}`;
  const { response, body, challenged } = await fetchHtml(probeUrl);
  const probeCurrent = response.ok
    && !challenged
    && requiredNeedles.every((needle) => body.includes(needle))
    && forbiddenNeedles.every((needle) => !body.includes(needle));
  console.error(`::error title=Rivers landscape production mismatch::Canonical page failed after 6 attempts — ${lastReason}. Cache-busted probe current=${probeCurrent}.`);
} catch (error) {
  const probeError = error instanceof Error ? error.message : String(error);
  console.error(`::error title=Rivers landscape production mismatch::Canonical page failed after 6 attempts — ${lastReason}. Cache-busted probe also failed: ${probeError}.`);
}

process.exit(1);
