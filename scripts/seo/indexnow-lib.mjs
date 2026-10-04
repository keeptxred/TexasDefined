const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';
const DEFAULT_BATCH_SIZE = 1000;
const HARD_MAX_BATCH_SIZE = 10_000;

const BLOCKED_PATH_PREFIXES = [
  '/admin',
  '/api',
  '/search',
  '/preview',
  '/draft',
  '/private',
  '/email',
  '/cart',
  '/shop/checkout',
];

const TRACKING_QUERY_KEYS = /^(?:utm_.+|ref|referrer|source|campaign|fbclid|gclid|msclkid)$/i;

export function normalizeIndexNowUrl(value, { origin, allowTransition = false } = {}) {
  if (!value || !origin) return null;
  let url;
  let canonicalOrigin;
  try {
    url = new URL(value, origin);
    canonicalOrigin = new URL(origin);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' || url.origin !== canonicalOrigin.origin) return null;
  if (url.username || url.password || url.hash) return null;
  if (url.searchParams.size > 0) {
    // Never submit tracking, search, filter or other parameter variants. IndexNow
    // should receive only the clean public URL (or the clean former URL when a
    // deletion/redirect transition is being announced).
    for (const key of url.searchParams.keys()) {
      if (TRACKING_QUERY_KEYS.test(key)) return null;
    }
    return null;
  }

  const path = url.pathname.replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) return null;
  if (BLOCKED_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return null;
  if (!allowTransition && /\.(?:json|xml|txt)$/i.test(path) && path !== '/') return null;

  return `${canonicalOrigin.origin}${path}${path === '/' ? '' : ''}`;
}

export function decodeXml(value) {
  return String(value)
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}>([^<]+)</${name}>`, 'i'));
  return match ? decodeXml(match[1].trim()) : null;
}

export async function fetchText(url, { fetchImpl = fetch, userAgent = 'IndexNowDistribution/2.0' } = {}) {
  const response = await fetchImpl(url, {
    headers: { 'user-agent': userAgent, accept: 'text/plain,text/xml,application/xml,text/html;q=0.8,*/*;q=0.2' },
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

export async function collectSitemapEntries(sitemapUrl, {
  origin,
  fetchImpl = fetch,
  visited = new Set(),
  depth = 0,
} = {}) {
  if (!origin) throw new Error('collectSitemapEntries requires origin');
  if (depth > 4) throw new Error(`Sitemap recursion exceeded safe depth at ${sitemapUrl}`);
  if (visited.has(sitemapUrl)) return [];
  visited.add(sitemapUrl);

  const xml = await fetchText(sitemapUrl, { fetchImpl });
  if (xml.includes('<sitemapindex')) {
    const children = [...xml.matchAll(/<sitemap>[\s\S]*?<\/sitemap>/gi)]
      .map((match) => tag(match[0], 'loc'))
      .filter(Boolean);
    if (children.length > 500) throw new Error(`Sitemap index is unexpectedly large: ${children.length}`);
    const nested = await Promise.all(children.map((child) => collectSitemapEntries(child, {
      origin,
      fetchImpl,
      visited,
      depth: depth + 1,
    })));
    return nested.flat();
  }

  if (!xml.includes('<urlset')) throw new Error(`${sitemapUrl} is neither a sitemap index nor URL sitemap.`);
  return [...xml.matchAll(/<url>[\s\S]*?<\/url>/gi)]
    .map((match) => ({
      url: normalizeIndexNowUrl(tag(match[0], 'loc'), { origin }),
      lastmod: tag(match[0], 'lastmod'),
    }))
    .filter((entry) => Boolean(entry.url));
}

export function selectMeaningfulUrls(entries, {
  freshnessHours = 72,
  full = false,
  now = Date.now(),
} = {}) {
  const byUrl = new Map();
  for (const entry of entries) {
    if (!entry?.url) continue;
    const previous = byUrl.get(entry.url);
    const previousTime = previous?.lastmod ? Date.parse(previous.lastmod) : Number.NaN;
    const nextTime = entry.lastmod ? Date.parse(entry.lastmod) : Number.NaN;
    if (!previous || (Number.isFinite(nextTime) && (!Number.isFinite(previousTime) || nextTime > previousTime))) {
      byUrl.set(entry.url, entry);
    }
  }

  if (full) return [...byUrl.keys()].sort();
  const cutoff = now - Math.max(1, Number(freshnessHours) || 72) * 60 * 60 * 1000;
  return [...byUrl.values()]
    .filter((entry) => {
      if (!entry.lastmod) return false;
      const timestamp = Date.parse(entry.lastmod);
      return Number.isFinite(timestamp) && timestamp >= cutoff;
    })
    .map((entry) => entry.url)
    .sort();
}

export function parseExplicitUrls(raw, { origin, allowTransition = true } = {}) {
  if (!raw) return [];
  return [...new Set(String(raw)
    .split(/[\n,\s]+/)
    .map((value) => normalizeIndexNowUrl(value.trim(), { origin, allowTransition }))
    .filter(Boolean))]
    .sort();
}

export async function verifyIndexNowKey({ origin, key, fetchImpl = fetch }) {
  const keyLocation = `${origin}/${key}.txt`;
  const liveKey = (await fetchText(keyLocation, { fetchImpl })).trim();
  if (liveKey !== key) throw new Error(`IndexNow ownership key mismatch at ${keyLocation}`);
  return keyLocation;
}

export async function submitIndexNowBatches({
  origin,
  host,
  key,
  urls,
  endpoint = DEFAULT_ENDPOINT,
  fetchImpl = fetch,
  batchSize = DEFAULT_BATCH_SIZE,
  logger = console,
}) {
  const keyLocation = `${origin}/${key}.txt`;
  const clean = [...new Set(urls.map((value) => normalizeIndexNowUrl(value, { origin, allowTransition: true })).filter(Boolean))];
  const size = Math.min(HARD_MAX_BATCH_SIZE, Math.max(1, Number(batchSize) || DEFAULT_BATCH_SIZE));
  const results = [];

  for (let i = 0; i < clean.length; i += size) {
    const urlList = clean.slice(i, i + size);
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8', 'user-agent': 'IndexNowDistribution/2.0' },
      body: JSON.stringify({ host, key, keyLocation, urlList }),
      signal: AbortSignal.timeout(15_000),
    });
    const body = response.ok ? '' : (await response.text()).slice(0, 1000);
    if (![200, 202].includes(response.status)) {
      throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : ''}`);
    }
    results.push({ status: response.status, count: urlList.length });
    logger.info?.(`IndexNow accepted batch of ${urlList.length} URL(s) with HTTP ${response.status}.`);
  }

  return { submitted: clean.length, batches: results };
}

export async function submitIndexNowSafely(args) {
  try {
    return { ok: true, ...(await submitIndexNowBatches(args)) };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    args.logger?.warn?.('IndexNow notification failed without blocking publication.', { detail });
    return { ok: false, submitted: 0, batches: [], error: detail };
  }
}
