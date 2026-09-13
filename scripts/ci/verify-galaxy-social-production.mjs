const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const path = '/sports-venue/jones-att-stadium';
const expectedImage = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jones_AT%26T_Stadium_wide_shot.jpg?width=1600';
const expectedAlt = 'Galaxy Stadium in Lubbock, photographed while it was known as Jones AT&T Stadium';

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

let lastStatus = 'network-error';
let lastBody = '';
let lastReason = 'not attempted';

for (let attempt = 1; attempt <= 6; attempt += 1) {
  const token = `${sha}-${runId}-galaxy-social-${attempt}`;
  const url = `${origin}${path}?verify=${encodeURIComponent(token)}`;
  console.log(`[galaxy-social-production] attempt ${attempt}: ${url}`);

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'TexasDefined-CI-Galaxy-Social-Smoke/1.0' },
    });
    lastStatus = String(response.status);
    lastBody = await response.text();
    const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    const decoded = decodeHtml(lastBody);

    if (challenged) {
      lastReason = 'Cloudflare returned cf-mitigated: challenge';
    } else if (!response.ok) {
      lastReason = `HTTP ${response.status}`;
    } else {
      const required = [
        'Galaxy Stadium | Lubbock, TX',
        expectedImage,
        expectedAlt,
        'property="og:image"',
        'property="og:image:alt"',
        'name="twitter:image"',
        'name="twitter:image:alt"',
      ];
      const missing = required.filter((needle) => !decoded.includes(needle));
      const incorrectlyNoindexed = decoded.includes('name="robots" content="noindex');

      if (!missing.length && !incorrectlyNoindexed) {
        console.log('[galaxy-social-production] Galaxy Stadium governed social metadata verified in production.');
        process.exit(0);
      }

      lastReason = incorrectlyNoindexed
        ? 'live Galaxy route is unexpectedly noindex despite governed hero availability'
        : `missing ${missing.join(' | ')}`;
    }
  } catch (error) {
    lastStatus = 'network-error';
    lastReason = error instanceof Error ? error.message : String(error);
  }

  console.log(`[galaxy-social-production] attempt ${attempt} failed: ${lastReason}`);
  if (attempt < 6) await sleep(5_000);
}

console.error(`::error title=GALAXY SOCIAL PRODUCTION failure::${path} failed after 6 attempts — ${lastReason} (status=${lastStatus})`);
if (lastBody) console.error(`[galaxy-social-production] response sample: ${lastBody.slice(0, 1800).replace(/\s+/g, ' ')}`);
process.exit(1);
