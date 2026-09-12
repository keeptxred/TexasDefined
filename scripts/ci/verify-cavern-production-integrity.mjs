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

async function fetchTextUntil(label, path, predicate, failureDescription, { attempts = 18, delayMs = 10_000 } = {}) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Cavern-Production-Integrity/1.0' },
      });
      lastStatus = String(response.status);
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastBody = await response.text();
      lastError = '';
      if (!challenged && response.ok && predicate(lastBody, response)) return { body: lastBody, response };
      console.log(challenged
        ? `[${label}] Cloudflare challenge; waiting for production.`
        : `[${label}] HTTP ${response.status}; ${failureDescription}; waiting for production.`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      console.log(`[${label}] request failed: ${lastError}`);
    }
    if (attempt < attempts) await sleep(delayMs);
  }
  throw new Error(`${label} failed after ${attempts} attempts: ${lastError || `HTTP ${lastStatus}; ${failureDescription}`} ${lastBody.slice(0, 300)}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const expectedRobotsSitemaps = [`${origin}/sitemap.xml`, `${origin}/sitemap-explore.xml`];
const { body: robots } = await fetchTextUntil(
  'robots',
  '/robots.txt',
  (body) => expectedRobotsSitemaps.every((sitemapUrl) => body.split(`Sitemap: ${sitemapUrl}`).length - 1 === 1),
  'required sitemap discovery lines are not live yet',
  { attempts: 6, delayMs: 5_000 },
);
for (const sitemapUrl of expectedRobotsSitemaps) {
  const count = robots.split(`Sitemap: ${sitemapUrl}`).length - 1;
  assert(count === 1, `robots.txt must advertise ${sitemapUrl} exactly once; found ${count}`);
}
console.log('[robots] verified primary and Explore sitemap discovery.');

const expectedCavernUrls = allCavernSlugs.map((slug) => `${origin}/destination/${slug}`);
const legacyCavernUrl = `${origin}/destination/${legacyDevilsSinkholeSlug}`;
const { body: exploreSitemap } = await fetchTextUntil(
  'explore-sitemap',
  '/sitemap-explore.xml',
  (body) => expectedCavernUrls.every((url) => body.includes(url)) && !body.includes(legacyCavernUrl),
  'all 11 canonical cavern URLs are not live in the Explore sitemap yet or the legacy Devil\'s Sinkhole URL is still present',
);
for (const canonicalUrl of expectedCavernUrls) {
  assert(exploreSitemap.includes(canonicalUrl), `Explore sitemap missing canonical cavern URL: ${canonicalUrl}`);
}
assert(!exploreSitemap.includes(legacyCavernUrl), 'Explore sitemap exposes legacy Devil\'s Sinkhole URL');
console.log(`[explore-sitemap] verified ${allCavernSlugs.length} canonical cavern URLs and excluded legacy Devil's Sinkhole slug.`);

for (const [slug, name] of restoredCaverns) {
  const path = `/destination/${slug}`;
  const canonicalUrl = `${origin}${path}`;
  const canonicalPatternA = new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${escapeRegex(canonicalUrl)}["']`, 'i');
  const canonicalPatternB = new RegExp(`<link[^>]+href=["']${escapeRegex(canonicalUrl)}["'][^>]+rel=["']canonical["']`, 'i');
  const noindexPatternA = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i;
  const noindexPatternB = /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i;

  const { body, response } = await fetchTextUntil(
    slug,
    path,
    (html, res) => res.status === 200
      && html.includes(name)
      && !noindexPatternA.test(html)
      && !noindexPatternB.test(html)
      && (canonicalPatternA.test(html) || canonicalPatternB.test(html))
      && (html.includes('Official source') || html.includes('Official visitor information'))
      && html.includes('Visitor information checked')
      && html.includes('Photography:'),
    `${name} has not reached the complete canonical/indexable/source-attributed state yet`,
  );

  assert(response.status === 200, `${name} returned HTTP ${response.status}`);
  assert(body.includes(name), `${name} page is missing its destination name`);
  assert(!noindexPatternA.test(body) && !noindexPatternB.test(body), `${name} page is marked noindex`);
  assert(canonicalPatternA.test(body) || canonicalPatternB.test(body), `${name} is missing the expected canonical link: ${canonicalUrl}`);
  assert(body.includes('Official source') || body.includes('Official visitor information'), `${name} is missing official-source metadata`);
  assert(body.includes('Visitor information checked'), `${name} is missing source review metadata`);
  assert(body.includes('Photography:'), `${name} is missing image attribution`);
  console.log(`[${slug}] verified HTTP 200, canonical, indexability, official-source metadata, review date, and image attribution.`);
}

console.log(`TexasDefined cavern production integrity passed: robots sitemap discovery + ${allCavernSlugs.length} Explore sitemap canonicals + ${restoredCaverns.length} restored destination pages.`);
