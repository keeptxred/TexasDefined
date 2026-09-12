const origin = (process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').replace(/\/$/, '');
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();

const allCavernSlugs = [
  'natural-bridge-caverns',
  'inner-space-cavern',
  'longhorn-cavern-state-park',
  'caverns-of-sonora',
  'cascade-caverns',
  'cave-without-a-name',
  'wonder-world-cave',
  'kickapoo-cavern-state-park',
  'gorman-cave',
  'devils-sinkhole-state-natural-area',
  'westcave-preserve',
];

const restoredCaverns = [
  ['caverns-of-sonora', 'Caverns of Sonora'],
  ['cascade-caverns', 'Cascade Caverns'],
  ['cave-without-a-name', 'Cave Without a Name'],
  ['devils-sinkhole-state-natural-area', "Devil's Sinkhole State Natural Area"],
];

const legacyDevilsSinkholeSlug = 'devil-s-sinkhole-state-natural-area';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function fetchWithRetry(label, path, { redirect = 'follow' } = {}) {
  let lastError = null;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect,
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Cavern-Production-Integrity/1.0' },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (!challenged && response.status < 500) return response;
      lastError = new Error(challenged ? 'Cloudflare challenge' : `HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError ?? new Error(`${label} failed after retries`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const sitemapResponse = await fetchWithRetry('cavern-sitemap', '/sitemap.xml');
assert(sitemapResponse.ok, `Sitemap returned HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();

for (const slug of allCavernSlugs) {
  const canonicalUrl = `${origin}/destination/${slug}`;
  assert(sitemap.includes(canonicalUrl), `Sitemap missing canonical cavern URL: ${canonicalUrl}`);
}
assert(!sitemap.includes(`${origin}/destination/${legacyDevilsSinkholeSlug}`), 'Sitemap exposes legacy Devil\'s Sinkhole URL');
console.log(`[cavern-sitemap] verified ${allCavernSlugs.length} canonical cavern URLs and excluded legacy Devil's Sinkhole slug.`);

for (const [slug, name] of restoredCaverns) {
  const path = `/destination/${slug}`;
  const canonicalUrl = `${origin}${path}`;
  const response = await fetchWithRetry(slug, path);
  assert(response.status === 200, `${name} returned HTTP ${response.status}`);
  const body = await response.text();

  assert(body.includes(name), `${name} page is missing its destination name`);
  assert(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body), `${name} page is marked noindex`);

  const canonicalPatternA = new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${escapeRegex(canonicalUrl)}["']`, 'i');
  const canonicalPatternB = new RegExp(`<link[^>]+href=["']${escapeRegex(canonicalUrl)}["'][^>]+rel=["']canonical["']`, 'i');
  assert(canonicalPatternA.test(body) || canonicalPatternB.test(body), `${name} is missing the expected canonical link: ${canonicalUrl}`);

  assert(body.includes('Official source') || body.includes('Official visitor information'), `${name} is missing official-source metadata`);
  assert(body.includes('Visitor information checked'), `${name} is missing source review metadata`);
  assert(body.includes('Photography:'), `${name} is missing image attribution`);

  console.log(`[${slug}] verified HTTP 200, canonical, indexability, official-source metadata, review date, and image attribution.`);
}

console.log(`TexasDefined cavern production integrity passed: ${allCavernSlugs.length} sitemap canonicals + ${restoredCaverns.length} restored destination pages.`);
