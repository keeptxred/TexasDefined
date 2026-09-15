const origin = 'https://texasdefined.com';
const slugs = [
  'houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso',
  'harris-county', 'dallas-county', 'tarrant-county', 'bexar-county', 'travis-county', 'collin-county', 'denton-county', 'fort-bend-county', 'montgomery-county', 'williamson-county', 'el-paso-county', 'hidalgo-county',
];

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const get = (url, redirect = 'follow') => fetch(url, {
  headers: { 'user-agent': 'TexasDefinedLocalMortgageVerifier/2.0' },
  redirect,
  signal: AbortSignal.timeout(30000),
});

async function check() {
  const canonicalPath = '/texas-mortgage-calculator';
  const canonicalUrl = `${origin}${canonicalPath}`;
  const [hubResponse, sitemapResponse] = await Promise.all([
    get(canonicalUrl),
    get(`${origin}/sitemap.xml`),
  ]);
  if (hubResponse.status !== 200 || sitemapResponse.status !== 200) return false;

  const [hubHtml, sitemap] = await Promise.all([hubResponse.text(), sitemapResponse.text()]);
  const canonical = (
    hubHtml.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)
    || hubHtml.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)
  )?.[1] ?? '';

  let ok = canonical === canonicalUrl
    && sitemap.includes(canonicalUrl)
    && hubHtml.includes('Local mortgage context')
    && hubHtml.includes('Select a city or county');

  console.log(`${ok ? 'PASS' : 'WAIT'} canonical ${canonicalUrl} status=${hubResponse.status}`);

  for (const slug of slugs) {
    const legacyUrl = `${origin}${canonicalPath}/${slug}`;
    const expectedLocation = `${canonicalPath}#${slug}`;
    const response = await get(legacyUrl, 'manual');
    const location = response.headers.get('location') ?? '';
    const retiredFromSitemap = !sitemap.includes(legacyUrl);
    const redirectsToCanonical = response.status === 301
      && (location === expectedLocation || location === `${origin}${expectedLocation}`);
    const passes = redirectsToCanonical && retiredFromSitemap;
    console.log(`${passes ? 'PASS' : 'WAIT'} ${legacyUrl} status=${response.status} location=${location || 'none'}`);
    ok = ok && passes;
  }

  const invalid = await get(`${origin}${canonicalPath}/not-a-governed-location`, 'manual');
  const invalidPasses = invalid.status === 404;
  console.log(`${invalidPasses ? 'PASS' : 'WAIT'} invalid mortgage slug status=${invalid.status}`);
  return ok && invalidPasses;
}

for (let attempt = 1; attempt <= 10; attempt += 1) {
  try {
    if (await check()) {
      console.log(`Canonical mortgage calculator and all ${slugs.length} retired local routes passed live redirect/sitemap verification.`);
      process.exit(0);
    }
  } catch (error) {
    console.log(`WAIT attempt=${attempt}: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (attempt < 10) await pause(30000);
}

console.error('Consolidated mortgage live production verification failed.');
process.exit(1);
