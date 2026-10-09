/**
 * Advisory, destination-specific live certification after successful Cloudflare deployment.
 * This never replaces the core fail-closed production gate, and never claims photo ownership.
 * Usage: node scripts/ci/verify-zapata-museum-production.mjs
 */
const origin = (process.env.ZAPATA_MUSEUM_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const path = '/destination/zapata-county-museum-history';
const canonical = `${origin}${path}`;
const imagePath = '/images/zapata-county-museum-history-editorial.svg';
const attempts = 4;

async function download(url) {
  const response = await fetch(url, {
    headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-Museum-Live-Smoke/1.0' },
    signal: AbortSignal.timeout(35000),
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  if (response.headers.get('cf-mitigated') === 'challenge') throw new Error('Cloudflare challenge prevented public museum verification');
  return { response, content: await response.text() };
}

function verifyMuseumHtml(html) {
  const required = [
    'Zapata County Museum of History: Exhibits',
    'What you can explore inside',
    'Admission and opening hours',
    'Start with the introduction:',
    'eight-minute film',
    '/fishing/lakes/falcon-international-reservoir',
    'zapata-county-museum-history-editorial.svg',
    'Zapata%20County%20Museum.jpg',
    'Zapata County Commissioners Court project gallery',
    '805 N U.S. Highway 83',
    'Museum tour overview',
    'application/ld+json',
  ];
  const missing = required.filter((marker) => !html.includes(marker));
  if (missing.length) throw new Error(`Missing museum HTML markers: ${missing.join('; ')}`);

  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  const robots = metaTags.filter((tag) => /\bname=(['"])robots\1/i.test(tag));
  if (robots.some((tag) => /noindex/i.test(tag))) throw new Error(`Museum page is noindex: ${robots.join(' ')}`);
  const canonicalLinks = (html.match(/<link\b[^>]*>/gi) || []).filter((tag) => /\brel=(['"])canonical\1/i.test(tag));
  if (!canonicalLinks.some((tag) => tag.includes(canonical))) throw new Error('Canonical link missing or points to wrong museum URL');

  const ldScripts = (html.match(/<script\b[^>]*type=(['"])application\/ld\+json\1[^>]*>[\s\S]*?<\/script>/gi) || []);
  if (!ldScripts.some((script) => script.includes('Museum') && script.includes('TouristAttraction'))) {
    throw new Error('Museum/TouristAttraction structured-data graph not found');
  }
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    const nonce = `museum-live-${Date.now()}-${attempt}`;
    const { content } = await download(`${canonical}?verification=${nonce}`);
    verifyMuseumHtml(content);
    // The county hosts the primary photograph; we verify the local backup asset independently.
    const asset = await download(`${origin}${imagePath}?verification=${nonce}`);
    const mime = asset.response.headers.get('content-type') || '';
    if (!mime.includes('image/svg+xml')) throw new Error(`Hero SVG returned unexpected type: ${mime}`);
    if (!asset.content.includes('ORIGINAL EDITORIAL ILLUSTRATION')) throw new Error('Illustration attribution is missing');
    // The Explore sitemap can temporarily fall back during remote catalog outages;
    // only a normal healthy sitemap is authoritative for per-destination inclusion.
    try {
      const sitemap = await download(`${origin}/sitemap-explore.xml?verification=${nonce}`);
      const fallback = sitemap.response.headers.get('x-texasdefined-sitemap-fallback') === '1';
      if (fallback) {
        console.warn('Explore sitemap was served in governed outage fallback mode: museum inclusion not certified on this run.');
      } else if (!sitemap.content.includes(`<loc>${canonical}</loc>`)) {
        throw new Error('Zapata museum is missing from the healthy Explore sitemap');
      } else {
        console.log('Explore sitemap contains the canonical Zapata museum URL.');
      }
    } catch (sitemapError) {
      if (sitemapError instanceof Error && sitemapError.message.includes('missing from the healthy Explore sitemap')) throw sitemapError;
      console.warn(`Explore sitemap unavailable; dedicated page indexability remains verified: ${sitemapError instanceof Error ? sitemapError.message : String(sitemapError)}`);
    }
    console.log(`PASS: Zapata museum public HTML, official county photo URL and credit, canonical, indexability, exhibit content, Museum schema and backup illustration (attempt ${attempt}).`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.warn(`Museum live verification attempt ${attempt}/${attempts}: ${error instanceof Error ? error.message : String(error)}`);
    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 4000));
  }
}
console.error(`Zapata museum production verification failed: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
process.exit(1);
