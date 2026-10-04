const publicIndexingEnabled = process.env.PUBLIC_INDEXING_ENABLED === 'true';

if (!publicIndexingEnabled) {
  console.log('IndexNow submission skipped: PUBLIC_INDEXING_ENABLED is not explicitly true. No URLs were submitted.');
  process.exit(0);
}

const origin = 'https://texasdefined.com';
const host = 'texasdefined.com';
const key = '0c2b08423ce5be707dd931f57239acf1';
const keyLocation = `${origin}/${key}.txt`;
const sitemapUrls = [
  `${origin}/sitemap.xml`,
  `${origin}/sitemap-explore.xml`,
  `${origin}/sitemap-texas-icons.xml`,
];
const full = process.env.INDEXNOW_FULL === 'true';
const strict = process.env.INDEXNOW_STRICT === 'true';
const freshnessHours = Number(process.env.INDEXNOW_FRESHNESS_HOURS || '2');
const maxUrls = 10_000;
const blockedPrefixes = ['/admin', '/api', '/auth', '/search'];

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'TexasDefinedIndexNow/2.0' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function canonicalProductionUrl(value) {
  try {
    const url = new URL(value, origin);
    if (url.protocol !== 'https:' || url.hostname !== host || url.username || url.password) return null;
    if (url.search || url.hash) return null;
    if (blockedPrefixes.some((prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`))) return null;
    url.hostname = host;
    url.protocol = 'https:';
    return url.toString();
  } catch {
    return null;
  }
}

function parseSitemapEntries(xml) {
  if (!xml.includes('<urlset')) return [];
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].flatMap((match) => {
    const block = match[1];
    const loc = block.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1];
    if (!loc) return [];
    const url = canonicalProductionUrl(decodeXml(loc.trim()));
    if (!url) return [];
    const lastmodRaw = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1]?.trim() || null;
    const lastmodMs = lastmodRaw ? Date.parse(lastmodRaw) : Number.NaN;
    return [{ url, lastmodMs }];
  });
}

function explicitUrls() {
  return (process.env.INDEXNOW_URLS || '')
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map(canonicalProductionUrl)
    .filter(Boolean);
}

async function submitChunk(urlList) {
  const payload = { host, key, keyLocation, urlList };
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (![200, 202].includes(response.status)) {
    const body = await response.text();
    throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : ''}`);
  }
  return response.status;
}

async function main() {
  const robots = await fetchText(`${origin}/robots.txt`);
  for (const required of [
    'User-agent: Bingbot',
    'User-agent: OAI-SearchBot',
    'User-agent: Applebot',
    'User-agent: DuckDuckBot',
    'Sitemap: https://texasdefined.com/sitemap.xml',
    'Sitemap: https://texasdefined.com/sitemap-explore.xml',
    'Sitemap: https://texasdefined.com/sitemap-texas-icons.xml',
  ]) {
    if (!robots.includes(required)) throw new Error(`robots.txt missing: ${required}`);
  }

  const liveKey = (await fetchText(keyLocation)).trim();
  if (liveKey !== key) throw new Error('Live IndexNow ownership key does not match the configured key.');

  if (!full && (!Number.isFinite(freshnessHours) || freshnessHours <= 0)) {
    throw new Error(`INDEXNOW_FRESHNESS_HOURS must be a positive number, got: ${process.env.INDEXNOW_FRESHNESS_HOURS}`);
  }

  const cutoff = Date.now() - freshnessHours * 60 * 60 * 1000;
  const urls = new Set(explicitUrls());
  let sitemapEntries = 0;
  let datedEntries = 0;

  for (const sitemapUrl of sitemapUrls) {
    const xml = await fetchText(sitemapUrl);
    if (!xml.includes('<urlset')) throw new Error(`${sitemapUrl} is not a URL sitemap.`);
    const entries = parseSitemapEntries(xml);
    sitemapEntries += entries.length;
    for (const entry of entries) {
      if (full) {
        urls.add(entry.url);
      } else if (Number.isFinite(entry.lastmodMs)) {
        datedEntries += 1;
        if (entry.lastmodMs >= cutoff) urls.add(entry.url);
      }
    }
  }

  if (sitemapEntries === 0) throw new Error('No canonical TexasDefined URLs were found in the live sitemaps.');
  if (!full && datedEntries === 0 && urls.size === 0) {
    console.log('IndexNow found no sitemap lastmod values or explicit URLs eligible for a meaningful-change submission.');
    return;
  }
  if (urls.size === 0) {
    console.log(`IndexNow found no canonical URLs changed in the last ${freshnessHours} hours. No submission was needed.`);
    return;
  }

  const sorted = [...urls].sort();
  let accepted = 0;
  for (let offset = 0; offset < sorted.length; offset += maxUrls) {
    const chunk = sorted.slice(offset, offset + maxUrls);
    const status = await submitChunk(chunk);
    accepted += chunk.length;
    console.log(`IndexNow accepted ${chunk.length} TexasDefined URLs with HTTP ${status}.`);
  }
  console.log(`IndexNow submission complete: ${accepted} canonical URL(s); mode=${full ? 'full' : `fresh-${freshnessHours}h`}; explicit=${explicitUrls().length}.`);
}

try {
  await main();
} catch (error) {
  console.error(`IndexNow notification failed: ${error instanceof Error ? error.message : String(error)}`);
  if (strict) process.exit(1);
  console.error('IndexNow failure is non-fatal so normal publishing/deployment can continue.');
}
