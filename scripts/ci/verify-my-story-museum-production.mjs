const origin = process.env.MY_STORY_MUSEUM_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const FETCH_ATTEMPTS = 4;
const FETCH_TIMEOUT_MS = 30_000;
const FETCH_RETRY_DELAY_MS = 2_000;
const DESTINATION_PATH = '/destination/my-story-museum-crystal-city';
const HERO_PATH = '/images/museums/my-story-museum-crystal-city.webp';
const CANONICAL = `https://texasdefined.com${DESTINATION_PATH}`;

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function liveUrl(path, attempt, key = 'page') {
  const url = new URL(path, origin);
  url.searchParams.set('td_my_story_museum_verify', `${revision}-${runId}-${key}-${attempt}`);
  return url;
}

async function fetchLive(path, { attempts = FETCH_ATTEMPTS, timeoutMs = FETCH_TIMEOUT_MS } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const url = liveUrl(path, attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-CI-My-Story-Museum/1.0',
        },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (!challenged && response.ok && body.length > 0) {
        console.log(`verified live fetch ${path} on attempt ${attempt}`);
        return body;
      }
      lastError = new Error(challenged
        ? `${url.pathname} returned a Cloudflare challenge.`
        : `${url.pathname} returned HTTP ${response.status}.`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`live fetch ${path} attempt ${attempt}/${attempts} failed: ${lastError.message}`);
    }
    if (attempt < attempts) await sleep(FETCH_RETRY_DELAY_MS);
  }
  throw lastError || new Error(`${path} failed production verification.`);
}

async function verifyLiveImage(path) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const url = liveUrl(path, attempt, 'image');
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-CI-My-Story-Museum/1.0',
        },
      });
      const contentType = response.headers.get('content-type') || '';
      const body = await response.arrayBuffer();
      if (response.ok && contentType.toLowerCase().startsWith('image/') && body.byteLength > 5_000) {
        console.log(`verified live hero image on attempt ${attempt}: ${body.byteLength} bytes`);
        return;
      }
      lastError = new Error(`hero returned HTTP ${response.status}, content-type ${contentType || 'missing'}, ${body.byteLength} bytes.`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`hero attempt ${attempt}/3 failed: ${lastError.message}`);
    }
    if (attempt < 3) await sleep(FETCH_RETRY_DELAY_MS);
  }
  throw lastError || new Error('My Story Museum hero failed production verification.');
}

function requireIndexableHtml(body) {
  requireCondition(body.includes(CANONICAL), 'My Story Museum page is missing its self-canonical URL.');
  requireCondition(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body), 'My Story Museum unexpectedly renders noindex.');
}

const page = await fetchLive(DESTINATION_PATH);
const exploreSitemap = await fetchLive('/sitemap-explore.xml');

requireIndexableHtml(page);
for (const marker of [
  'My Story Museum',
  'Crystal City Family Internment Camp',
  '1969 Crystal City student walkouts',
  'Zavala County veterans',
  '224 E Zavala St',
  'Crystal City Pilgrimage Committee',
  'Sources and verification',
]) {
  requireCondition(page.includes(marker), `My Story Museum production HTML is missing authority marker: ${marker}`);
}

requireCondition(page.includes(HERO_PATH), 'My Story Museum production HTML is missing the local AI-generated hero path.');
requireCondition(page.includes('AI-generated image · TexasDefined'), 'My Story Museum production HTML is missing the AI-generated image credit.');
requireCondition(page.includes('/county/zavala'), 'My Story Museum is missing its Zavala County internal link.');
requireCondition(page.includes('/county/uvalde'), 'My Story Museum is missing its Uvalde County side-trip link.');
requireCondition(page.includes('/county/dimmit'), 'My Story Museum is missing its Dimmit County side-trip link.');
requireCondition(
  exploreSitemap.includes(CANONICAL),
  'Explore sitemap is missing the canonical My Story Museum destination URL.',
);

await verifyLiveImage(HERO_PATH);

console.log('My Story Museum production smoke passed: indexability, canonical, authority content, county links, sitemap entry and hero asset are live.');
