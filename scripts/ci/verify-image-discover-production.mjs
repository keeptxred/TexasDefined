import fs from 'node:fs';

const BASE_URL = process.env.TEXASDEFINED_BASE_URL || 'https://texasdefined.com';
const STRICT = process.env.IMAGE_AUDIT_STRICT === '1';
const CONCURRENCY = Math.max(1, Math.min(20, Number(process.env.IMAGE_AUDIT_CONCURRENCY || 8)));
const REQUEST_TIMEOUT_MS = Math.max(5_000, Number(process.env.IMAGE_AUDIT_TIMEOUT_MS || 20_000));
const REPORT_PATH = process.env.IMAGE_AUDIT_REPORT || 'image-discover-production-report.json';

const PRIORITY_PATHS = [
  /^\/destination\//,
  /^\/county\//,
  /^\/fishing(?:\/|$)/,
  /^\/event\//,
  /^\/sports-venue\//,
  /^\/article\//,
  /^\/explore\/(?:state-parks|lakes-rivers|small-towns|road-trips|painted-churches)(?:\/|$)/,
  /^\/texas-state-fair(?:\/|$)/,
];

const FORBIDDEN_IMAGE_RE = /(?:placeholder|photo[-_ ]?unavailable|image[-_ ]?unavailable|fallback(?:[-_ ]?image)?|favicon|logo|icon[-_.])/i;
const FORBIDDEN_PAGE_RE = /Photo unavailable|Photograph unavailable|image unavailable|texasdefined-destination-placeholder\.svg/i;
const MIN_DISCOVER_WIDTH = 1200;
const MIN_DISCOVER_PIXELS = 300_000;

function decodeHtml(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function absolute(value) {
  if (!value) return '';
  try { return new URL(decodeHtml(value), BASE_URL).toString(); } catch { return ''; }
}

function meta(html, key, attr = 'property') {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const property = tag.match(new RegExp(`\\b${attr}=["']([^"']+)["']`, 'i'))?.[1];
    if (property?.toLowerCase() !== key.toLowerCase()) continue;
    return decodeHtml(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || '');
  }
  return '';
}

function robots(html) {
  return meta(html, 'robots', 'name').toLowerCase();
}

function preferredImage(html) {
  return {
    url: absolute(meta(html, 'og:image')),
    alt: meta(html, 'og:image:alt'),
    width: Number(meta(html, 'og:image:width')) || 0,
    height: Number(meta(html, 'og:image:height')) || 0,
    twitterUrl: absolute(meta(html, 'twitter:image', 'name')),
    twitterCard: meta(html, 'twitter:card', 'name').toLowerCase(),
  };
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: 'follow',
      ...options,
      headers: {
        'user-agent': 'TexasDefinedImageDiscoverAudit/1.0 (+https://texasdefined.com)',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(id);
  }
}

async function fetchText(url) {
  const response = await fetchWithTimeout(url);
  const text = await response.text();
  return { response, text };
}

async function inspectImage(url) {
  if (!url) return { ok: false, status: 0, type: '', length: 0 };
  try {
    const response = await fetchWithTimeout(url, { method: 'GET', headers: { range: 'bytes=0-65535' } });
    const type = (response.headers.get('content-type') || '').split(';')[0].toLowerCase();
    const length = Number(response.headers.get('content-length') || 0);
    // Consume the response so keep-alive connections can be reused. We do not need
    // full binary decoding because page metadata carries governed dimensions.
    await response.arrayBuffer();
    return { ok: response.ok && /^image\/(?:jpeg|png|webp|avif)$/i.test(type), status: response.status, type, length };
  } catch (error) {
    return { ok: false, status: 0, type: '', length: 0, error: error instanceof Error ? error.message : String(error) };
  }
}

function discoverGeometry(image) {
  if (!image.width || !image.height) return { ok: false, reason: 'missing-og-image-dimensions' };
  if (image.width < MIN_DISCOVER_WIDTH) return { ok: false, reason: `preferred-image-width-${image.width}` };
  if (image.width * image.height < MIN_DISCOVER_PIXELS) return { ok: false, reason: `preferred-image-pixels-${image.width * image.height}` };
  return { ok: true, reason: '' };
}

async function loadPriorityUrls() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  const { response, text } = await fetchText(sitemapUrl);
  if (!response.ok) throw new Error(`Sitemap request failed: ${response.status} ${sitemapUrl}`);
  const urls = [...text.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => absolute(match[1])).filter(Boolean);
  return [...new Set(urls)].filter((url) => {
    const path = new URL(url).pathname;
    return PRIORITY_PATHS.some((pattern) => pattern.test(path));
  });
}

async function auditPage(url) {
  const issues = [];
  let response;
  let html = '';
  try {
    ({ response, text: html } = await fetchText(url));
  } catch (error) {
    return { url, status: 0, indexable: false, image: null, issues: [`page-fetch:${error instanceof Error ? error.message : String(error)}`] };
  }

  if (!response.ok) issues.push(`page-status:${response.status}`);
  const directives = robots(html);
  const indexable = !directives.includes('noindex');
  const image = preferredImage(html);

  if (indexable) {
    if (!directives.includes('max-image-preview:large')) issues.push('robots-missing-max-image-preview-large');
    if (!image.url) issues.push('missing-og-image');
    if (!image.alt.trim()) issues.push('missing-og-image-alt');
    if (image.twitterCard !== 'summary_large_image') issues.push(`twitter-card:${image.twitterCard || 'missing'}`);
    if (!image.twitterUrl) issues.push('missing-twitter-image');
    if (image.url && image.twitterUrl && image.url !== image.twitterUrl) issues.push('og-twitter-image-mismatch');
    if (image.url && FORBIDDEN_IMAGE_RE.test(new URL(image.url).pathname)) issues.push('preferred-image-looks-generic-or-placeholder');
    if (image.url && /\.svg(?:$|\?)/i.test(image.url)) issues.push('preferred-image-svg');
    if (FORBIDDEN_PAGE_RE.test(html)) issues.push('visible-image-unavailable-or-placeholder-copy');
    const geometry = discoverGeometry(image);
    if (!geometry.ok) issues.push(geometry.reason);
  }

  return { url, status: response.status, indexable, directives, image, issues };
}

async function mapConcurrent(items, worker, concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length || 1) }, run));
  return results;
}

const urls = await loadPriorityUrls();
const pages = await mapConcurrent(urls, auditPage, CONCURRENCY);

const uniqueImageUrls = [...new Set(pages.filter((page) => page.indexable && page.image?.url).map((page) => page.image.url))];
const imageChecks = new Map();
for (const result of await mapConcurrent(uniqueImageUrls, async (url) => [url, await inspectImage(url)], CONCURRENCY)) {
  imageChecks.set(result[0], result[1]);
}

for (const page of pages) {
  if (!page.indexable || !page.image?.url) continue;
  const check = imageChecks.get(page.image.url);
  if (!check?.ok) page.issues.push(`preferred-image-fetch:${check?.status || 0}:${check?.type || 'unknown'}`);
}

const usage = new Map();
for (const page of pages) {
  if (!page.indexable || !page.image?.url) continue;
  const list = usage.get(page.image.url) || [];
  list.push(page.url);
  usage.set(page.image.url, list);
}
const suspiciousReuse = [...usage.entries()]
  .filter(([, pageUrls]) => pageUrls.length >= 6)
  .map(([imageUrl, pageUrls]) => ({ imageUrl, count: pageUrls.length, pages: pageUrls }));
for (const reuse of suspiciousReuse) {
  for (const url of reuse.pages) {
    pages.find((page) => page.url === url)?.issues.push(`preferred-image-reused-${reuse.count}-times`);
  }
}

const failing = pages.filter((page) => page.issues.length > 0);
const noindex = pages.filter((page) => !page.indexable);
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  googleDiscoverContract: {
    minWidth: MIN_DISCOVER_WIDTH,
    minPixels: MIN_DISCOVER_PIXELS,
    requiresLargeImagePreview: true,
    requiresRepresentativePreferredImage: true,
  },
  summary: {
    auditedPriorityPages: pages.length,
    indexablePages: pages.length - noindex.length,
    noindexPages: noindex.length,
    uniquePreferredImages: uniqueImageUrls.length,
    failingPages: failing.length,
    suspiciousReusedImages: suspiciousReuse.length,
  },
  suspiciousReuse,
  failing,
  noindex: noindex.map((page) => ({ url: page.url, directives: page.directives, issues: page.issues })),
};

fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));
if (failing.length) {
  console.error(`Image/Discover production audit found ${failing.length} priority page(s) with issues.`);
  for (const page of failing.slice(0, 100)) console.error(`- ${page.url}: ${page.issues.join(', ')}`);
  if (failing.length > 100) console.error(`... ${failing.length - 100} additional failing page(s) are in ${REPORT_PATH}.`);
  if (STRICT) process.exit(1);
}
