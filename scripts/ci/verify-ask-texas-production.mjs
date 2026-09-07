import { appendFileSync } from 'node:fs';

const origin = (process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').replace(/\/$/, '');
const requireOfficial = process.env.ASK_TEXAS_REQUIRE_OFFICIAL === 'true';
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const userAgent = 'TexasDefined-Ask-Texas-Production-Smoke/1.0';

function summary(line) {
  if (summaryPath) appendFileSync(summaryPath, `${line}\n`);
}

function fail(message) {
  console.error(`::error title=Ask Texas production smoke failed::${message}`);
  throw new Error(message);
}

async function request(path, init = {}) {
  const response = await fetch(`${origin}${path}`, {
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    ...init,
    headers: {
      'user-agent': userAgent,
      ...(init.headers ?? {}),
    },
  });
  const body = await response.text();
  if (response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge') {
    fail(`${path} returned a Cloudflare challenge.`);
  }
  return { response, body };
}

function requireText(label, body, text) {
  if (!body.includes(text)) fail(`${label} is missing expected text: ${text}`);
}

async function ask(question) {
  const encoded = new URLSearchParams({ question }).toString();
  const { response, body } = await request('/ask-texas', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'content-length': String(Buffer.byteLength(encoded)),
      origin,
      'sec-fetch-site': 'same-origin',
      accept: 'text/html',
    },
    body: encoded,
  });
  if (!response.ok) {
    console.error(`[ask-texas] response sample: ${body.slice(0, 1800).replace(/\s+/g, ' ')}`);
    fail(`POST /ask-texas returned HTTP ${response.status}.`);
  }
  requireText('Ask Texas answer', body, '<section class="answer"');
  requireText('Ask Texas answer', body, 'Texas Defined sources');
  if (body.includes('Texas Defined AI is unavailable:')) fail('Ask Texas rendered an unavailable error after POST.');
  return body;
}

summary('## Ask Texas production smoke');
summary('');

const page = await request(`/ask-texas?verify=${encodeURIComponent(process.env.GITHUB_SHA ?? Date.now().toString())}`);
if (!page.response.ok) fail(`GET /ask-texas returned HTTP ${page.response.status}.`);
requireText('Ask Texas page', page.body, 'Ask Texas anything.');
requireText('Ask Texas page', page.body, '<meta name="robots" content="noindex, follow">');
requireText('Ask Texas page', page.body, '<form class="askbox" action="/ask-texas" method="post">');
requireText('Ask Texas page', page.body, 'AI answers can make mistakes.');
summary('- ✅ GET `/ask-texas`: server-rendered page, noindex policy and first-party form verified.');

await ask('Why does Texas have 254 counties?');
summary('- ✅ POST `/ask-texas`: Workers AI answer and Texas Defined source rendering verified.');

if (requireOfficial) {
  const officialBody = await ask('Is SH 130 closed right now near Seguin?');
  requireText('Ask Texas official research answer', officialBody, 'Official sources checked');
  requireText('Ask Texas official research answer', officialBody, 'Live verification');
  requireText('Ask Texas official research answer', officialBody, '[O1]');
  summary('- ✅ Official fallback: live governed source rendering verified with `[O1]`.');
}

console.log(`Ask Texas production smoke passed${requireOfficial ? ' with official-source fallback' : ''}.`);
