const origin = process.env.HURST_WHIRLYBALL_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function liveUrl(path, attempt) {
  const url = new URL(path, origin);
  url.searchParams.set('td_hurst_whirlyball_verify', `${revision}-${runId}-${attempt}`);
  return url;
}

async function fetchLive(path) {
  let lastError;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const url = liveUrl(path, attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-CI-Hurst-WhirlyBall/1.0',
        },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (!challenged && response.ok) return body;
      lastError = new Error(challenged
        ? `${url.pathname} returned a Cloudflare challenge.`
        : `${url.pathname} returned HTTP ${response.status}.`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 12) await sleep(5_000);
  }
  throw lastError || new Error(`${path} failed production verification.`);
}

function requireIndexableHtml(body, canonical, label) {
  requireCondition(body.includes(canonical), `${label} is missing its self-canonical URL.`);
  requireCondition(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body), `${label} unexpectedly renders noindex.`);
}

const [directory, city, whirlyball] = await Promise.all([
  fetchLive('/browse/cities'),
  fetchLive('/city/hurst'),
  fetchLive('/destination/whirlyball-hurst'),
]);

requireCondition(
  directory.includes('Hurst has a Texas Defined city guide with official municipal sources'),
  'Texas city directory still treats Hurst as an unverified directory-only city.',
);
requireCondition(directory.includes('/city/hurst'), 'Texas city directory is missing the canonical Hurst city-guide link.');

requireIndexableHtml(city, 'https://texasdefined.com/city/hurst', 'Hurst city authority page');
requireCondition(city.includes('Hurst systems at a glance'), 'Hurst city authority systems section is missing.');
requireCondition(city.includes('WhirlyBall Hurst'), 'Hurst city authority page is missing its WhirlyBall cross-link.');
requireCondition(city.includes('/destination/whirlyball-hurst'), 'Hurst city authority page is missing the canonical WhirlyBall URL.');

requireIndexableHtml(whirlyball, 'https://texasdefined.com/destination/whirlyball-hurst', 'WhirlyBall Hurst destination page');
requireCondition(whirlyball.includes('/city/hurst'), 'WhirlyBall Hurst is missing the reciprocal Hurst city-authority link.');
requireCondition(whirlyball.includes('Whirlyball.jpg'), 'WhirlyBall Hurst is missing the verified Wikimedia hero image.');
requireCondition(
  !whirlyball.includes('Special:Redirect/file/Whirlyball.jpg') && !whirlyball.includes('Special%3ARedirect%2Ffile%2FWhirlyball.jpg'),
  'WhirlyBall Hurst regressed to the unstable Wikimedia Special:Redirect hero source.',
);

console.log('Hurst / WhirlyBall production smoke passed: city directory, city authority, destination reciprocity, canonical indexability and hero source are live.');
