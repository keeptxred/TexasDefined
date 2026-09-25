const origin = process.env.HURST_WHIRLYBALL_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function renderedText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

async function verifyLiveImage(path, label) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const url = new URL(path, origin);
    url.searchParams.set('td_hurst_whirlyball_image_verify', `${revision}-${runId}-${attempt}`);
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
      const contentType = response.headers.get('content-type') || '';
      const body = await response.arrayBuffer();
      if (response.ok && contentType.toLowerCase().startsWith('image/') && body.byteLength > 10_000) return;
      lastError = new Error(`${label} returned HTTP ${response.status}, content-type ${contentType || 'missing'}, ${body.byteLength} bytes.`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 4) await sleep(3_000);
  }
  throw lastError || new Error(`${label} failed production image verification.`);
}

function requireIndexableHtml(body, canonical, label) {
  requireCondition(body.includes(canonical), `${label} is missing its self-canonical URL.`);
  requireCondition(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body), `${label} unexpectedly renders noindex.`);
}

const [directory, city, whirlyball, tarrant, sitemap] = await Promise.all([
  fetchLive('/browse/cities'),
  fetchLive('/city/hurst'),
  fetchLive('/destination/whirlyball-hurst'),
  fetchLive('/county/tarrant'),
  fetchLive('/sitemap.xml'),
]);

requireCondition(
  directory.includes('Hurst has a Texas Defined city guide with official municipal sources'),
  'Texas city directory still treats Hurst as an unverified directory-only city.',
);
requireCondition(directory.includes('/city/hurst'), 'Texas city directory is missing the canonical Hurst city-guide link.');

requireIndexableHtml(city, 'https://texasdefined.com/city/hurst', 'Hurst city authority page');
requireCondition(city.includes('id="city-systems-heading"'), 'Hurst city authority systems section anchor is missing.');
requireCondition(renderedText(city).includes('Hurst systems at a glance'), 'Hurst city authority systems heading is missing.');
requireCondition(city.includes('WhirlyBall Hurst'), 'Hurst city authority page is missing its WhirlyBall cross-link.');
requireCondition(city.includes('/destination/whirlyball-hurst'), 'Hurst city authority page is missing the canonical WhirlyBall URL.');

requireIndexableHtml(tarrant, 'https://texasdefined.com/county/tarrant', 'Tarrant County page');
requireCondition(tarrant.includes('WhirlyBall Hurst'), 'Tarrant County is missing the WhirlyBall Hurst cross-link.');
requireCondition(tarrant.includes('/destination/whirlyball-hurst'), 'Tarrant County is missing the canonical WhirlyBall destination URL.');
requireCondition(tarrant.includes('Arlington and Hurst'), 'Tarrant County structured community coverage is missing Hurst.');

requireCondition(
  sitemap.includes('https://texasdefined.com/city/hurst'),
  'Primary sitemap is missing the canonical Hurst city authority URL.',
);
requireCondition(
  sitemap.includes('https://texasdefined.com/destination/whirlyball-hurst'),
  'Primary sitemap is missing the canonical WhirlyBall Hurst destination URL.',
);

requireIndexableHtml(whirlyball, 'https://texasdefined.com/destination/whirlyball-hurst', 'WhirlyBall Hurst destination page');
requireCondition(whirlyball.includes('/city/hurst'), 'WhirlyBall Hurst is missing the reciprocal Hurst city-authority link.');
requireCondition(whirlyball.includes('Whirlyball.jpg'), 'WhirlyBall Hurst is missing the verified Wikimedia hero image.');
const whirlyballHeroSource = 'https://upload.wikimedia.org/wikipedia/commons/5/52/Whirlyball.jpg';
const whirlyballHeroProxyPath = `/media/remote?url=${encodeURIComponent(whirlyballHeroSource)}`;
requireCondition(
  whirlyball.includes(whirlyballHeroProxyPath),
  'WhirlyBall Hurst is not rendering the governed same-origin remote-image delivery path.',
);
await verifyLiveImage(whirlyballHeroProxyPath, 'WhirlyBall Hurst proxied hero');
requireCondition(
  !whirlyball.includes('Special:Redirect/file/Whirlyball.jpg') && !whirlyball.includes('Special%3ARedirect%2Ffile%2FWhirlyball.jpg'),
  'WhirlyBall Hurst regressed to the unstable Wikimedia Special:Redirect hero source.',
);

console.log('Hurst / WhirlyBall production smoke passed: city directory, city authority, destination reciprocity, canonical indexability and hero source are live.');
