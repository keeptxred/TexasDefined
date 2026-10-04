const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const proof = 'San Angelo town-reference proof: Christoval, Mertzon, Robert Lee, Bronte, Paint Rock, Ballinger';
const surfaces = [
  { label: 'san-angelo-small-towns', path: '/explore/near/san-angelo/small-towns' },
  { label: 'san-angelo-small-towns-1-hour', path: '/explore/near/san-angelo/small-towns-1-hour' },
];

for (const surface of surfaces) {
  let lastBody = '';
  let lastReason = 'not attempted';

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const token = `${sha}-${runId}-${surface.label}-${attempt}`;
    const url = `${origin}${surface.path}?verify=${encodeURIComponent(token)}`;
    console.log(`[san-angelo-proximity-production] ${surface.label} attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'user-agent': 'TexasDefined-CI-San-Angelo-Proximity-Smoke/1.0',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
      });
      lastBody = await response.text();
      const required = [proof, 'Closest towns first', 'Christoval', 'Mertzon', 'Robert Lee', 'Bronte', 'Paint Rock', 'Ballinger'];
      const missing = required.filter((needle) => !lastBody.includes(needle));
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';

      if (response.ok && !challenged && missing.length === 0) {
        console.log(`[san-angelo-proximity-production] ${surface.label} verified live close-town references.`);
        lastReason = '';
        break;
      }

      lastReason = challenged
        ? 'Cloudflare challenge'
        : !response.ok
          ? `HTTP ${response.status}`
          : `missing ${missing.join(' | ')}`;
    } catch (error) {
      lastReason = error instanceof Error ? error.message : String(error);
    }

    if (attempt < 5) await sleep(5_000);
  }

  if (lastReason) {
    console.error(`::error title=SAN ANGELO PROXIMITY PRODUCTION failure::${surface.path} failed — ${lastReason}`);
    if (lastBody) console.error(`[san-angelo-proximity-production] response sample: ${lastBody.slice(0, 1800).replace(/\s+/g, ' ')}`);
    process.exit(1);
  }
}

console.log('[san-angelo-proximity-production] Both San Angelo small-town surfaces render the verified close-town reference layer in production.');
