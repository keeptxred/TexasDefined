const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const publicTestAddress = '1100 Congress Ave, Austin, TX 78701';
const expectedCanonical = 'https://texasdefined.com/find-my-county';
const userAgent = 'TexasDefined-CI-Find-My-County-Smoke/1.0';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function hasCloudflareChallenge(response) {
  return response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
}

async function retry(label, fn) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      await fn(attempt);
      console.log(`[${label}] verified on attempt ${attempt}.`);
      return;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(`[${label}] attempt ${attempt} failed: ${lastError.message}`);
      if (attempt < 6) await sleep(5_000);
    }
  }

  throw new Error(`${label} failed after 6 attempts: ${lastError?.message ?? 'unknown error'}`);
}

async function verifyPage() {
  await retry('find-my-county-page', async (attempt) => {
    const url = `${origin}/find-my-county?verify=${encodeURIComponent(`${Date.now()}-${attempt}`)}`;
    const response = await fetch(url, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': userAgent },
    });
    const body = await response.text();
    const robotsHeader = (response.headers.get('x-robots-tag') ?? '').toLowerCase();

    if (hasCloudflareChallenge(response)) throw new Error('Cloudflare challenge response');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!body.includes('What county am I in?')) throw new Error('expected county-finder heading is missing');
    if (!body.includes(`rel="canonical" href="${expectedCanonical}"`) && !body.includes(`href="${expectedCanonical}" rel="canonical"`)) {
      throw new Error('self-canonical is missing');
    }
    if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(body) || robotsHeader.includes('noindex')) {
      throw new Error('page is unexpectedly noindex');
    }
  });
}

async function verifySitemap() {
  await retry('find-my-county-sitemap', async (attempt) => {
    const response = await fetch(`${origin}/sitemap.xml?verify=${encodeURIComponent(`${Date.now()}-${attempt}`)}`, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': userAgent },
    });
    const body = await response.text();

    if (hasCloudflareChallenge(response)) throw new Error('Cloudflare challenge response');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!body.includes(`<loc>${expectedCanonical}</loc>`)) throw new Error('canonical county-finder URL is missing from sitemap');
  });
}

async function verifyApi() {
  await retry('find-my-county-api', async () => {
    const response = await fetch(`${origin}/api/find-my-county`, {
      method: 'POST',
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: {
        'content-type': 'application/json',
        'user-agent': userAgent,
      },
      body: JSON.stringify({ address: publicTestAddress }),
    });

    const body = await response.text();
    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      throw new Error(`non-JSON API response (HTTP ${response.status})`);
    }

    const cacheControl = (response.headers.get('cache-control') ?? '').toLowerCase();
    const robots = (response.headers.get('x-robots-tag') ?? '').toLowerCase();

    if (hasCloudflareChallenge(response)) throw new Error('Cloudflare challenge response');
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${body.slice(0, 240)}`);
    if (payload?.ok !== true) throw new Error(`API did not return ok=true: ${body.slice(0, 240)}`);
    if (payload.countyName !== 'Travis County') throw new Error(`expected Travis County, received ${payload.countyName ?? 'missing countyName'}`);
    if (payload.countyFips !== '48453') throw new Error(`expected county FIPS 48453, received ${payload.countyFips ?? 'missing countyFips'}`);
    if (payload.countyUrl !== '/county/travis') throw new Error(`expected /county/travis, received ${payload.countyUrl ?? 'missing countyUrl'}`);
    if (!cacheControl.includes('private') || !cacheControl.includes('no-store')) {
      throw new Error(`privacy cache contract missing: cache-control=${cacheControl || '(missing)'}`);
    }
    if (!robots.includes('noindex') || !robots.includes('nofollow')) {
      throw new Error(`API robots contract missing: x-robots-tag=${robots || '(missing)'}`);
    }
  });
}

try {
  await verifyPage();
  await verifySitemap();
  await verifyApi();
  console.log('Find My Texas County production smoke passed: page is indexable, sitemap includes the canonical URL, and the public Austin fixture resolves to Travis County with private/no-store + noindex/nofollow API headers.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error title=Find My County production smoke failed::${message}`);
  process.exit(1);
}
