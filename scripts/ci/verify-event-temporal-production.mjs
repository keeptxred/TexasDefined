const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x2019;/gi, '’')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href) return decodeHtmlEntities(href);
  }
  return '';
}

function robotsContent(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== 'robots') continue;
    return decodeHtmlEntities(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '');
  }
  return '';
}

function hasNoindex(html) {
  return /(?:^|[\s,])noindex(?:$|[\s,])/i.test(robotsContent(html));
}

function extractJsonLd(html) {
  const values = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    const raw = decodeHtmlEntities(match[1].trim());
    if (!raw) continue;
    values.push(JSON.parse(raw));
  }
  return values;
}

function collectTypedNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectTypedNodes(item, out);
    return out;
  }
  if (!value || typeof value !== 'object') return out;
  if (value['@type']) out.push(value);
  for (const child of Object.values(value)) collectTypedNodes(child, out);
  return out;
}

function hasType(node, type) {
  return Array.isArray(node?.['@type']) ? node['@type'].includes(type) : node?.['@type'] === type;
}

async function fetchProduction(path, label) {
  let lastError = '';
  let lastStatus = 'network-error';
  let lastBody = '';

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify-event-temporal=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Temporal-Event-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (response.ok && !challenged) return lastBody;
      lastError = challenged ? 'Cloudflare challenge' : `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 6) await sleep(8_000);
  }

  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1000).replace(/\s+/g, ' ')}`);
  throw new Error(`${label} failed after retries — ${lastError || `HTTP ${lastStatus}`}`);
}

function parseVerifiedGuideCount(html, label) {
  const decoded = decodeHtmlEntities(html);
  const match = decoded.match(/([0-9,]+)\s+verified event guides/i);
  assert(match, `${label} must visibly expose its verified event-guide count`);
  const count = Number(match[1].replace(/,/g, ''));
  assert(Number.isFinite(count), `${label} verified event-guide count must be numeric`);
  return count;
}

function verifyCollectionSchema(html, label) {
  const nodes = extractJsonLd(html).flatMap((block) => collectTypedNodes(block));
  assert(nodes.some((node) => hasType(node, 'CollectionPage')), `${label} must expose CollectionPage schema`);
  assert(nodes.some((node) => hasType(node, 'ItemList')), `${label} must expose ItemList schema`);
  assert(nodes.some((node) => hasType(node, 'BreadcrumbList')), `${label} must expose BreadcrumbList schema`);
  assert(!nodes.some((node) => hasType(node, 'Event')), `${label} must not expose individual Event schema`);
}

const collections = [
  { path: '/events/this-weekend', threshold: 4, label: 'Texas this weekend', titleNeedle: 'Things to Do in Texas This Weekend' },
  { path: '/events/houston-this-weekend', threshold: 4, label: 'Houston this weekend', titleNeedle: 'Things to Do in Houston This Weekend' },
  { path: '/events/dallas-this-weekend', threshold: 4, label: 'Dallas-Fort Worth this weekend', titleNeedle: 'Things to Do in Dallas-Fort Worth This Weekend' },
  { path: '/events/austin-this-weekend', threshold: 4, label: 'Austin this weekend', titleNeedle: 'Things to Do in Austin This Weekend' },
  { path: '/events/san-antonio-this-weekend', threshold: 4, label: 'San Antonio this weekend', titleNeedle: 'Things to Do in San Antonio This Weekend' },
  { path: '/events/september-events', threshold: 6, label: 'September events', titleNeedle: 'September Events in Texas' },
  { path: '/events/october-events', threshold: 6, label: 'October events', titleNeedle: 'October Events in Texas' },
  { path: '/events/november-events', threshold: 6, label: 'November events', titleNeedle: 'November Events in Texas' },
  { path: '/events/december-events', threshold: 6, label: 'December events', titleNeedle: 'December Events in Texas' },
  { path: '/events/fall-festivals', threshold: 6, label: 'fall festivals', titleNeedle: 'Texas Fall Festivals' },
  { path: '/events/christmas-events', threshold: 4, label: 'Christmas events', titleNeedle: 'Texas Christmas' },
  { path: '/events/county-fairs', threshold: 4, label: 'county fairs', titleNeedle: 'Texas County Fairs' },
];

async function verifyDynamicCollection(collection, sitemap) {
  const html = await fetchProduction(collection.path, collection.label);
  const decoded = decodeHtmlEntities(html);
  assert(canonicalHref(html) === `${origin}${collection.path}`, `${collection.label} canonical must be ${origin}${collection.path}`);
  assert(decoded.includes(collection.titleNeedle), `${collection.label} must render its expected heading`);
  assert(decoded.includes('How to plan it'), `${collection.label} must render planning context`);
  assert(decoded.includes('Source policy'), `${collection.label} must render source-policy context`);
  assert(decoded.includes('Current verified window:'), `${collection.label} must render its current rolling/seasonal window`);
  const count = parseVerifiedGuideCount(html, collection.label);
  const shouldIndex = count >= collection.threshold;
  const inSitemap = sitemap.includes(`<loc>${origin}${collection.path}</loc>`);
  assert(hasNoindex(html) === !shouldIndex, `${collection.label} robots policy must match ${count} guides and ${collection.threshold}-guide threshold`);
  assert(inSitemap === shouldIndex, `${collection.label} sitemap policy must match ${count} guides and ${collection.threshold}-guide threshold`);
  verifyCollectionSchema(html, collection.label);
  console.log(`[${collection.label}] ${count} guides; ${shouldIndex ? 'indexable/in sitemap' : 'noindex/out of sitemap'} verified`);
}

async function verifyAlwaysNoindexCurrentMonth(sitemap) {
  const path = '/events/this-month';
  const html = await fetchProduction(path, 'events this month');
  assert(canonicalHref(html) === `${origin}${path}`, `events this month canonical must be ${origin}${path}`);
  assert(hasNoindex(html), 'events this month must always remain noindex');
  assert(!sitemap.includes(`<loc>${origin}${path}</loc>`), 'events this month must stay out of sitemap.xml');
  assert(decodeHtmlEntities(html).includes('Current verified window:'), 'events this month must expose its current rolling month window');
  parseVerifiedGuideCount(html, 'events this month');
  verifyCollectionSchema(html, 'events this month');
  console.log('[events this month] permanent noindex/out-of-sitemap contract verified');
}

async function main() {
  const sitemap = await fetchProduction('/sitemap.xml', 'events sitemap');
  assert(!sitemap.includes('/events/events/'), 'sitemap.xml must not contain duplicated /events/events/ routes');
  await verifyAlwaysNoindexCurrentMonth(sitemap);
  for (const collection of collections) await verifyDynamicCollection(collection, sitemap);
  console.log(`Verified ${collections.length + 1} temporal event production collections against canonical, robots, sitemap and schema contracts.`);
}

await main();
