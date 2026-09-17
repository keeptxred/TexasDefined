import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = new URL(process.env.SITE_ORIGIN ?? 'https://texasdefined.com').origin;
const SITEMAPS = ['/sitemap.xml', '/sitemap-explore.xml'];
const CONCURRENCY = Math.max(1, Number(process.env.AUDIT_CONCURRENCY ?? 12));
const TIMEOUT_MS = Math.max(1000, Number(process.env.AUDIT_TIMEOUT_MS ?? 15000));
const RETRIES = Math.max(0, Number(process.env.AUDIT_RETRIES ?? 2));
const MAX_URLS = Math.max(0, Number(process.env.AUDIT_MAX_URLS ?? 0));
const OUTPUT = process.env.AUDIT_OUTPUT ?? '';
const USER_AGENT = process.env.AUDIT_USER_AGENT ?? 'TexasDefined-SitemapIndexabilityAudit/1.0';

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#34;', '"')
    .replaceAll('&#39;', "'");
}

function normalizeUrl(value) {
  const url = new URL(value, ORIGIN);
  url.hash = '';
  if (url.pathname !== '/' && url.pathname.endsWith('/')) url.pathname = url.pathname.replace(/\/+$/, '');
  return url.toString();
}

function familyFor(urlString) {
  const { pathname } = new URL(urlString);
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return '/';
  if (['article', 'news', 'event', 'destination', 'county', 'city', 'property-tax', 'state-park', 'historic-site', 'sports-venue', 'texas-vs'].includes(parts[0])) {
    return `/${parts.slice(0, Math.min(2, parts.length)).join('/')}`;
  }
  return `/${parts[0]}`;
}

function linkCanonical(html) {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of linkTags) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1] ?? '';
    if (!rel.split(/\s+/).some((value) => value.toLowerCase() === 'canonical')) continue;
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (href) return decodeHtml(href.trim());
  }
  return null;
}

function robotsContent(html) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const values = [];
  for (const tag of metaTags) {
    const name = tag.match(/\bname\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== 'robots' && name !== 'googlebot') continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    if (content) values.push(content.toLowerCase());
  }
  return values.join(',');
}

function titleText(html) {
  return decodeHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? '');
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'user-agent': USER_AGENT,
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        ...(options.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRetry(url, options = {}) {
  let lastError;
  for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, options);
      if (response.status >= 500 && attempt < RETRIES) {
        await response.body?.cancel().catch(() => {});
        await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt === RETRIES) throw error;
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function loadSitemap(sitemapPath) {
  const url = `${ORIGIN}${sitemapPath}`;
  const response = await fetchRetry(url, { redirect: 'manual' });
  if (response.status !== 200) throw new Error(`${sitemapPath} returned HTTP ${response.status}`);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => normalizeUrl(decodeXml(match[1].trim())));
  if (locations.length === 0) throw new Error(`${sitemapPath} contained no <loc> entries`);
  return { sitemapPath, locations };
}

function failure(url, code, detail = '') {
  return { url, family: familyFor(url), code, detail };
}

async function auditUrl(url) {
  let response;
  try {
    response = await fetchRetry(url, { redirect: 'manual' });
  } catch (error) {
    return [failure(url, 'fetch-error', error instanceof Error ? error.message : String(error))];
  }

  const failures = [];
  if (response.status >= 300 && response.status < 400) {
    failures.push(failure(url, 'redirect', `${response.status} -> ${response.headers.get('location') ?? '(missing location)'}`));
    await response.body?.cancel().catch(() => {});
    return failures;
  }
  if (response.status !== 200) {
    failures.push(failure(url, 'http-status', String(response.status)));
    await response.body?.cancel().catch(() => {});
    return failures;
  }

  const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
  if (!contentType.includes('text/html')) failures.push(failure(url, 'content-type', contentType || '(missing)'));

  const xRobots = (response.headers.get('x-robots-tag') ?? '').toLowerCase();
  if (xRobots.includes('noindex')) failures.push(failure(url, 'x-robots-noindex', xRobots));

  const html = await response.text();
  const robots = robotsContent(html);
  if (robots.includes('noindex')) failures.push(failure(url, 'meta-robots-noindex', robots));

  const canonical = linkCanonical(html);
  if (!canonical) {
    failures.push(failure(url, 'missing-canonical'));
  } else {
    let normalizedCanonical;
    try {
      normalizedCanonical = normalizeUrl(canonical);
    } catch {
      failures.push(failure(url, 'invalid-canonical', canonical));
    }
    if (normalizedCanonical && normalizedCanonical !== normalizeUrl(url)) {
      failures.push(failure(url, 'canonical-mismatch', normalizedCanonical));
    }
  }

  const title = titleText(html);
  if (!title) failures.push(failure(url, 'missing-title'));
  if (/^(404\b|not found\b|unavailable\b)/i.test(title) || /\bpage not found\b/i.test(title)) {
    failures.push(failure(url, 'soft-404-title', title));
  }

  return failures;
}

async function mapConcurrent(items, worker, concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  async function runner() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runner()));
  return results;
}

const sitemapResults = await Promise.all(SITEMAPS.map(loadSitemap));
const memberships = new Map();
for (const { sitemapPath, locations } of sitemapResults) {
  for (const url of locations) {
    if (!memberships.has(url)) memberships.set(url, []);
    memberships.get(url).push(sitemapPath);
  }
}

const overlaps = [...memberships.entries()].filter(([, sources]) => sources.length > 1);
if (overlaps.length) {
  console.error(`Found ${overlaps.length} URL(s) present in more than one sitemap.`);
  for (const [url, sources] of overlaps.slice(0, 50)) console.error(`- ${url} :: ${sources.join(', ')}`);
  process.exit(1);
}

let urls = [...memberships.keys()];
if (MAX_URLS > 0) urls = urls.slice(0, MAX_URLS);
console.log(`Auditing ${urls.length.toLocaleString('en-US')} sitemap URL(s) with concurrency ${CONCURRENCY}.`);

const nestedFailures = await mapConcurrent(urls, auditUrl, CONCURRENCY);
const failures = nestedFailures.flat();
const failureUrls = new Set(failures.map((item) => item.url));
const familyCounts = new Map();
const codeCounts = new Map();
for (const item of failures) {
  familyCounts.set(item.family, (familyCounts.get(item.family) ?? 0) + 1);
  codeCounts.set(item.code, (codeCounts.get(item.code) ?? 0) + 1);
}

const report = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  sitemapCounts: Object.fromEntries(sitemapResults.map(({ sitemapPath, locations }) => [sitemapPath, locations.length])),
  auditedUrls: urls.length,
  failedUrls: failureUrls.size,
  failures,
  failureCodes: Object.fromEntries([...codeCounts.entries()].sort((a, b) => b[1] - a[1])),
  failureFamilies: Object.fromEntries([...familyCounts.entries()].sort((a, b) => b[1] - a[1])),
};

if (OUTPUT) {
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote audit report to ${OUTPUT}.`);
}

if (failures.length) {
  console.error(`Sitemap page indexability audit failed: ${failureUrls.size} URL(s), ${failures.length} issue(s).`);
  console.error('Failure codes:');
  for (const [code, count] of [...codeCounts.entries()].sort((a, b) => b[1] - a[1])) console.error(`- ${code}: ${count}`);
  console.error('Failure families:');
  for (const [family, count] of [...familyCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)) console.error(`- ${family}: ${count}`);
  console.error('First failures:');
  for (const item of failures.slice(0, 100)) console.error(`- [${item.code}] ${item.url}${item.detail ? ` :: ${item.detail}` : ''}`);
  process.exit(1);
}

console.log(`Sitemap page indexability audit passed: ${urls.length.toLocaleString('en-US')} sitemap URLs returned HTTP 200 HTML, self-canonicals, indexable robots directives, and non-soft-404 titles.`);
