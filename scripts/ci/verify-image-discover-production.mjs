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
const SITEMAP_PATHS = ['/sitemap.xml', '/sitemap-explore.xml', '/sitemap-events.xml'];

const FORBIDDEN_IMAGE_RE = /(?:placeholder|photo[-_ ]?unavailable|image[-_ ]?unavailable|fallback(?:[-_ ]?image)?|favicon|logo|icon[-_.])/i;
const FALLBACK_COPY_RE = /Photo unavailable|Photograph unavailable|image unavailable|texasdefined-destination-placeholder\.svg/i;
const MIN_DISCOVER_WIDTH = 1200;
const MIN_DISCOVER_PIXELS = 300_000;

function decodeHtml(value = '') {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
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

function robots(html) { return meta(html, 'robots', 'name').toLowerCase(); }
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
      headers: { 'user-agent': 'TexasDefinedImageDiscoverAudit/1.3 (+https://texasdefined.com)', ...(options.headers || {}) },
      signal: controller.signal,
    });
  } finally { clearTimeout(id); }
}

async function fetchText(url) {
  const response = await fetchWithTimeout(url);
  return { response, text: await response.text() };
}

function u16be(bytes, offset) { return (bytes[offset] << 8) | bytes[offset + 1]; }
function u32be(bytes, offset) { return ((bytes[offset] << 24) >>> 0) + (bytes[offset + 1] << 16) + (bytes[offset + 2] << 8) + bytes[offset + 3]; }
function pngDimensions(bytes) {
  if (bytes.length < 24 || bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) return null;
  return { width: u32be(bytes, 16), height: u32be(bytes, 20) };
}
function jpegDimensions(bytes) {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  let offset = 2;
  const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  while (offset + 8 < bytes.length) {
    if (bytes[offset] !== 0xff) { offset += 1; continue; }
    const marker = bytes[offset + 1];
    if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue; }
    if (offset + 4 >= bytes.length) break;
    const length = u16be(bytes, offset + 2);
    if (sof.has(marker) && offset + 8 < bytes.length) return { height: u16be(bytes, offset + 5), width: u16be(bytes, offset + 7) };
    if (length < 2) break;
    offset += 2 + length;
  }
  return null;
}
function webpDimensions(bytes) {
  if (bytes.length < 30 || String.fromCharCode(...bytes.slice(0, 4)) !== 'RIFF' || String.fromCharCode(...bytes.slice(8, 12)) !== 'WEBP') return null;
  const chunk = String.fromCharCode(...bytes.slice(12, 16));
  if (chunk === 'VP8X') return { width: 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16), height: 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16) };
  if (chunk === 'VP8L' && bytes[20] === 0x2f) return { width: 1 + bytes[21] + ((bytes[22] & 0x3f) << 8), height: 1 + (bytes[22] >> 6) + (bytes[23] << 2) + ((bytes[24] & 0x0f) << 10) };
  if (chunk === 'VP8 ') for (let offset = 20; offset + 9 < bytes.length; offset += 1) if (bytes[offset] === 0x9d && bytes[offset + 1] === 0x01 && bytes[offset + 2] === 0x2a) return { width: (bytes[offset + 3] | (bytes[offset + 4] << 8)) & 0x3fff, height: (bytes[offset + 5] | (bytes[offset + 6] << 8)) & 0x3fff };
  return null;
}
function imageDimensions(bytes, type) {
  if (type === 'image/png') return pngDimensions(bytes);
  if (type === 'image/jpeg') return jpegDimensions(bytes);
  if (type === 'image/webp') return webpDimensions(bytes);
  return null;
}

async function inspectImage(url) {
  if (!url) return { ok: false, status: 0, type: '', length: 0, width: 0, height: 0 };
  try {
    const response = await fetchWithTimeout(url, { method: 'GET', headers: { range: 'bytes=0-65535' } });
    const type = (response.headers.get('content-type') || '').split(';')[0].toLowerCase();
    const length = Number(response.headers.get('content-length') || 0);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const dimensions = imageDimensions(bytes, type);
    return { ok: response.ok && /^image\/(?:jpeg|png|webp|avif)$/i.test(type), status: response.status, type, length, width: dimensions?.width || 0, height: dimensions?.height || 0 };
  } catch (error) {
    return { ok: false, status: 0, type: '', length: 0, width: 0, height: 0, error: error instanceof Error ? error.message : String(error) };
  }
}

function discoverGeometry(width, height) {
  if (!width || !height) return { ok: false, reason: 'preferred-image-dimensions-unverifiable' };
  if (width < MIN_DISCOVER_WIDTH) return { ok: false, reason: `preferred-image-width-${width}` };
  if (width * height < MIN_DISCOVER_PIXELS) return { ok: false, reason: `preferred-image-pixels-${width * height}` };
  return { ok: true, reason: '' };
}

async function loadPriorityUrls() {
  const urls = [];
  const sitemapFailures = [];
  let successfulSitemaps = 0;
  for (const path of SITEMAP_PATHS) {
    const sitemapUrl = `${BASE_URL}${path}`;
    try {
      const { response, text } = await fetchText(sitemapUrl);
      if (!response.ok) {
        sitemapFailures.push(`${response.status} ${sitemapUrl}`);
        continue;
      }
      successfulSitemaps += 1;
      urls.push(...[...text.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => absolute(match[1])).filter(Boolean));
    } catch (error) {
      sitemapFailures.push(`${error instanceof Error ? error.message : String(error)} ${sitemapUrl}`);
    }
  }
  if (!successfulSitemaps) throw new Error(`All sitemap requests failed: ${sitemapFailures.join('; ')}`);
  if (sitemapFailures.length) console.warn(`Image/Discover audit continuing with healthy sitemap surfaces; unavailable sitemap(s): ${sitemapFailures.join('; ')}`);
  return {
    urls: [...new Set(urls)].filter((url) => PRIORITY_PATHS.some((pattern) => pattern.test(new URL(url).pathname))),
    sitemapFailures,
    successfulSitemaps,
  };
}

async function auditPage(url) {
  const issues = []; const warnings = [];
  let response; let html = '';
  try { ({ response, text: html } = await fetchText(url)); }
  catch (error) { return { url, status: 0, indexable: false, image: null, issues: [`page-fetch:${error instanceof Error ? error.message : String(error)}`], warnings }; }
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
    if (FALLBACK_COPY_RE.test(html)) warnings.push('page-contains-image-unavailable-fallback-copy');
    if (!image.width || !image.height) warnings.push('missing-og-image-dimensions');
  }
  return { url, status: response.status, indexable, directives, image, issues, warnings };
}

async function mapConcurrent(items, worker, concurrency) {
  const results = new Array(items.length); let cursor = 0;
  async function run() { while (true) { const index = cursor++; if (index >= items.length) return; results[index] = await worker(items[index], index); } }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length || 1) }, run));
  return results;
}

const discovery = await loadPriorityUrls();
const urls = discovery.urls;
const pages = await mapConcurrent(urls, auditPage, CONCURRENCY);
const uniqueImageUrls = [...new Set(pages.filter((page) => page.indexable && page.image?.url).map((page) => page.image.url))];
const imageChecks = new Map();
for (const result of await mapConcurrent(uniqueImageUrls, async (url) => [url, await inspectImage(url)], CONCURRENCY)) imageChecks.set(result[0], result[1]);

for (const page of pages) {
  if (!page.indexable || !page.image?.url) continue;
  const check = imageChecks.get(page.image.url);
  if (!check?.ok) {
    if (check?.status === 429) page.warnings.push(`preferred-image-fetch-rate-limited:${check.status}:${check.type || 'unknown'}`);
    else page.issues.push(`preferred-image-fetch:${check?.status || 0}:${check?.type || 'unknown'}`);
    continue;
  }
  const width = page.image.width || check.width;
  const height = page.image.height || check.height;
  const geometry = discoverGeometry(width, height);
  if (!geometry.ok) page.issues.push(geometry.reason);
}

const usage = new Map();
for (const page of pages) {
  if (!page.indexable || !page.image?.url) continue;
  const list = usage.get(page.image.url) || []; list.push(page.url); usage.set(page.image.url, list);
}
const suspiciousReuse = [...usage.entries()].filter(([, pageUrls]) => pageUrls.length >= 6).map(([imageUrl, pageUrls]) => ({ imageUrl, count: pageUrls.length, pages: pageUrls }));
for (const reuse of suspiciousReuse) for (const url of reuse.pages) pages.find((page) => page.url === url)?.warnings.push(`preferred-image-reused-${reuse.count}-times`);

const failing = pages.filter((page) => page.issues.length > 0);
const warningPages = pages.filter((page) => page.warnings.length > 0);
const noindex = pages.filter((page) => !page.indexable);
const report = {
  generatedAt: new Date().toISOString(), baseUrl: BASE_URL,
  sitemapDiscovery: { configured: SITEMAP_PATHS, successful: discovery.successfulSitemaps, failures: discovery.sitemapFailures },
  googleDiscoverContract: { minWidth: MIN_DISCOVER_WIDTH, minPixels: MIN_DISCOVER_PIXELS, requiresLargeImagePreview: true, requiresRepresentativePreferredImage: true },
  summary: { auditedPriorityPages: pages.length, indexablePages: pages.length - noindex.length, noindexPages: noindex.length, uniquePreferredImages: uniqueImageUrls.length, failingPages: failing.length, warningPages: warningPages.length, suspiciousReusedImages: suspiciousReuse.length },
  suspiciousReuse, failing,
  warnings: warningPages.map((page) => ({ url: page.url, warnings: page.warnings, image: page.image })),
  noindex: noindex.map((page) => ({ url: page.url, directives: page.directives, issues: page.issues, warnings: page.warnings })),
};
fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));
if (discovery.sitemapFailures.length) console.warn(`Image/Discover production audit used partial sitemap discovery because ${discovery.sitemapFailures.length} sitemap surface(s) were unavailable.`);
if (warningPages.length) console.warn(`Image/Discover production audit found ${warningPages.length} priority page(s) with non-blocking metadata, fallback-copy, upstream rate-limit, or reuse warnings.`);
if (failing.length) {
  console.error(`Image/Discover production audit found ${failing.length} priority page(s) with blocking issues.`);
  for (const page of failing.slice(0, 100)) console.error(`- ${page.url}: ${page.issues.join(', ')}`);
  if (failing.length > 100) console.error(`... ${failing.length - 100} additional failing page(s) are in ${REPORT_PATH}.`);
  if (STRICT) process.exit(1);
}
