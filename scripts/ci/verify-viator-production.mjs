const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const path = '/explore';
const required = [
  'id="tours-experiences"',
  'Book the Texas experience after you decide where to go',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings',
  'pid=P00318227',
  'mcid=42383',
  'campaign=texasdefined-statewide-explore',
  'rel="sponsored noopener noreferrer"',
];

let lastError = null;
let lastStatus = 'network-error';
let lastBody = '';

for (let attempt = 1; attempt <= 5; attempt += 1) {
  const url = `${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
  console.log(`[viator-production] attempt ${attempt}: ${url}`);

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'TexasDefined-CI-Viator-Smoke/1.0' },
    });
    const body = await response.text();
    const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    lastStatus = String(response.status);
    lastBody = body;

    if (challenged) {
      lastError = new Error('Cloudflare returned cf-mitigated: challenge');
    } else if (!response.ok) {
      lastError = new Error(`HTTP ${response.status}`);
    } else {
      const missing = required.filter((needle) => !body.includes(needle));
      if (!missing.length) {
        const affiliateLinkCount = (body.match(/pid=P00318227/g) ?? []).length;
        if (affiliateLinkCount < 2) {
          lastError = new Error(`expected multiple affiliate links, found ${affiliateLinkCount}`);
        } else {
          console.log(`[viator-production] verified ${affiliateLinkCount} affiliate links with PID P00318227 / MCID 42383 and sponsored disclosure.`);
          process.exit(0);
        }
      } else {
        lastError = new Error(`missing ${missing.join(', ')}`);
      }
    }
  } catch (error) {
    lastError = error instanceof Error ? error : new Error(String(error));
    lastStatus = 'network-error';
  }

  console.log(`[viator-production] attempt ${attempt} failed: ${lastError?.message ?? lastStatus}`);
  if (attempt < 5) await sleep(5_000);
}

console.error(`::error title=VIATOR PRODUCTION failure::/explore failed — ${lastError?.message ?? `HTTP ${lastStatus}`}`);
if (lastBody) console.error(`[viator-production] response sample: ${lastBody.slice(0, 1400).replace(/\s+/g, ' ')}`);
process.exit(1);
