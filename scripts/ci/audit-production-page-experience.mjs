import fs from 'node:fs';

const ORIGIN = (process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').replace(/\/$/, '');
const SITEMAPS = ['/sitemap.xml', '/sitemap-explore.xml', '/sitemap-texas-icons.xml'];
const CONCURRENCY = Math.max(1, Math.min(16, Number.parseInt(process.env.PAGE_AUDIT_CONCURRENCY ?? '8', 10) || 8));
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_ATTEMPTS = 3;
const publicRoutesSource = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const revision = process.env.GITHUB_SHA ?? 'local';

const failures = [];
const warnings = [];
const results = [];

function appendSummary(text) {
  if (summaryPath) fs.appendFileSync(summaryPath, text);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function arrayValues(name) {
  const match = publicRoutesSource.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
  if (!match) throw new Error(`Could not find public-route registry array ${name}.`);
  return [...match[1].matchAll(/["'](\/[^"'\n]+)["']/g)].map((entry) => entry[1]);
}

function htmlPagePath(path) {
  const leaf = path.split('/').pop() ?? '';
  return !/\.(?:csv|json|txt|xml)$/i.test(leaf);
}

function attributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attrs;
}

function stripNonVisible(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ');
}

function visibleText(html) {
  return decodeHtml(stripNonVisible(html).replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function headingTexts(html) {
  const visibleHtml = stripNonVisible(html);
  return [...visibleHtml.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => decodeHtml(match[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim());
}

function metaContent(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    if ((attrs.name ?? '').toLowerCase() === name.toLowerCase()) return attrs.content ?? '';
  }
  return '';
}

function canonicalHrefs(html) {
  const values = [];
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    const rel = (attrs.rel ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && attrs.href) values.push(attrs.href);
  }
  return values;
}

function titleText(html) {
  const match = stripNonVisible(html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')).match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(match[1]).replace(/\s+/g, ' ').trim() : '';
}

function canonicalUrl(value, requestedUrl) {
  try {
    const parsed = new URL(value, requestedUrl);
    parsed.search = '';
    parsed.hash = '';
    return parsed.href;
  } catch {
    return '';
  }
}

function normalizedRequestedUrl(value) {
  const parsed = new URL(value);
  parsed.search = '';
  parsed.hash = '';
  return parsed.href;
}

function pageFailure(path, message) {
  failures.push({ path, message });
}

function pageWarning(path, message) {
  warnings.push({ path, message });
}

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: options.redirect ?? 'manual',
        cache: 'no-store',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        headers: {
          'user-agent': 'TexasDefined-All-Page-Audit/1.0',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
      });
      if (response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge') {
        throw new Error('Cloudflare challenge response');
      }
      if (response.status >= 500 && attempt < MAX_ATTEMPTS) {
        await response.arrayBuffer();
        await sleep(1000 * attempt);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) await sleep(1000 * attempt);
    }
  }
  throw lastError ?? new Error('request failed');
}

async function sitemapInventory(path) {
  const response = await fetchWithRetry(`${ORIGIN}${path}?td_page_audit=${encodeURIComponent(revision)}`, { redirect: 'manual' });
  if (response.status !== 200) throw new Error(`${path} returned HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
  if (!urls.length) throw new Error(`${path} contained no URLs`);
  return urls;
}

function registerTarget(map, path, mode, source) {
  if (!htmlPagePath(path)) return;
  const existing = map.get(path);
  const rank = { redirect: 0, public: 1, conditional: 2, indexable: 3 };
  if (!existing || rank[mode] > rank[existing.mode]) map.set(path, { path, mode, source });
}

async function buildTargets() {
  const map = new Map();
  for (const sitemap of SITEMAPS) {
    for (const url of await sitemapInventory(sitemap)) {
      const parsed = new URL(url);
      if (parsed.origin !== ORIGIN) throw new Error(`${sitemap} contains off-origin URL ${url}`);
      registerTarget(map, parsed.pathname, 'indexable', sitemap);
    }
  }

  for (const path of arrayValues('INDEXABLE_STATIC_PATHS')) registerTarget(map, path, 'indexable', 'INDEXABLE_STATIC_PATHS');
  for (const path of arrayValues('CONDITIONAL_INDEXABLE_PUBLIC_PATHS')) registerTarget(map, path, 'conditional', 'CONDITIONAL_INDEXABLE_PUBLIC_PATHS');
  for (const path of arrayValues('NON_INDEXABLE_PUBLIC_PATHS')) registerTarget(map, path, 'public', 'NON_INDEXABLE_PUBLIC_PATHS');
  for (const path of arrayValues('REDIRECT_ONLY_PATHS')) {
    if (!htmlPagePath(path)) continue;
    const existing = map.get(path);
    if (existing?.mode === 'indexable') {
      pageFailure(path, `redirect-only route is also present in indexable/sitemap inventory from ${existing.source}`);
    }
    map.set(path, { path, mode: 'redirect', source: 'REDIRECT_ONLY_PATHS' });
  }
  return [...map.values()].sort((a, b) => a.path.localeCompare(b.path));
}

async function auditRedirect(target) {
  const url = new URL(target.path, ORIGIN);
  url.searchParams.set('td_page_audit', revision);
  const response = await fetchWithRetry(url.href, { redirect: 'manual' });
  const location = response.headers.get('location') ?? '';
  if (response.status !== 301) pageFailure(target.path, `redirect-only route returned HTTP ${response.status}, expected 301`);
  if (!location) {
    pageFailure(target.path, 'redirect-only route omitted Location header');
  } else {
    try {
      const destination = new URL(location, ORIGIN);
      if (destination.origin !== ORIGIN) pageFailure(target.path, `redirect leaves TexasDefined origin: ${destination.href}`);
    } catch {
      pageFailure(target.path, `redirect returned invalid Location header: ${location}`);
    }
  }
  results.push({ ...target, status: response.status, wordCount: 0 });
}

async function auditPage(target) {
  const url = new URL(target.path, ORIGIN);
  url.searchParams.set('td_page_audit', revision);
  let response;
  try {
    response = await fetchWithRetry(url.href, { redirect: 'manual' });
  } catch (error) {
    pageFailure(target.path, `request failed: ${error instanceof Error ? error.message : String(error)}`);
    results.push({ ...target, status: 0, wordCount: 0 });
    return;
  }

  if (response.status !== 200) {
    pageFailure(target.path, `returned HTTP ${response.status}`);
    results.push({ ...target, status: response.status, wordCount: 0 });
    return;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
    pageFailure(target.path, `returned non-HTML Content-Type ${JSON.stringify(contentType)}`);
    results.push({ ...target, status: response.status, wordCount: 0 });
    return;
  }

  const html = await response.text();
  const text = visibleText(html);
  const words = text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? [];
  const title = titleText(html);
  const description = metaContent(html, 'description').trim();
  const canonicals = canonicalHrefs(html);
  const headings = headingTexts(html);
  const h1Count = (stripNonVisible(html).match(/<h1\b/gi) ?? []).length;
  const robots = [metaContent(html, 'robots'), metaContent(html, 'googlebot')].join(',').toLowerCase();
  const indexable = target.mode === 'indexable';

  if (!title) pageFailure(target.path, 'missing <title>');
  if (/\b(?:undefined|null)\b/i.test(title)) pageFailure(target.path, `invalid title text: ${title}`);
  if (title.toLowerCase() === 'unavailable') pageFailure(target.path, 'served the unavailable fallback title');
  if (indexable && !description) pageFailure(target.path, 'indexable page has no meta description');
  if (indexable && /\bnoindex\b/i.test(robots)) pageFailure(target.path, 'sitemap/indexable page emits noindex');
  if (target.mode === 'public' && !/\bnoindex\b/i.test(robots)) {
    pageWarning(target.path, 'non-indexable public registry page does not emit noindex');
  }

  if (indexable) {
    if (canonicals.length !== 1) {
      pageFailure(target.path, `expected exactly one canonical, found ${canonicals.length}`);
    } else {
      const actual = canonicalUrl(canonicals[0], url.href);
      const expected = normalizedRequestedUrl(new URL(target.path, ORIGIN).href);
      if (actual !== expected) pageFailure(target.path, `canonical mismatch: ${actual || canonicals[0]} != ${expected}`);
    }
  } else if (canonicals.length > 1) {
    pageFailure(target.path, `multiple canonical links found (${canonicals.length})`);
  }

  if (h1Count !== 1) pageFailure(target.path, `expected exactly one visible-page H1 in SSR markup, found ${h1Count}`);

  const bannedHeading = headings.find((heading) =>
    /^why it belongs on the list[.!?]?$/i.test(heading)
    || /^plan the visit[.!?]?$/i.test(heading)
  );
  if (bannedHeading) pageFailure(target.path, `legacy/generic heading still renders: ${JSON.stringify(bannedHeading)}`);

  if (indexable && /\b(?:this guide is being expanded|texas defined is still building this guide|guide in progress)\b/i.test(text)) {
    pageFailure(target.path, 'indexable page renders unfinished/placeholder guide copy');
  }

  if (/<div\b[^>]*data-stay-nearby-slot[^>]*class=["'][^"']*\bmy-\d+\b[^"']*["'][^>]*>\s*<\/div>/i.test(stripNonVisible(html))) {
    pageFailure(target.path, 'empty Stay Nearby slot retains vertical margin and can create dead space');
  }

  for (const tag of stripNonVisible(html).match(/<img\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    if (!Object.prototype.hasOwnProperty.call(attrs, 'alt')) pageFailure(target.path, 'image missing alt attribute');
    if (Object.prototype.hasOwnProperty.call(attrs, 'src') && !attrs.src.trim()) pageFailure(target.path, 'image has empty src');
  }

  if (indexable && words.length < 180) pageWarning(target.path, `thin visible SSR text signal: ${words.length} words`);
  if (indexable && description.length > 0 && description.length < 70) pageWarning(target.path, `short meta description signal: ${description.length} characters`);

  results.push({ ...target, status: response.status, wordCount: words.length, title, h1Count });
}

async function auditTarget(target) {
  if (target.mode === 'redirect') return auditRedirect(target);
  return auditPage(target);
}

const targets = await buildTargets();
console.log(`TexasDefined all-page audit inventory: ${targets.length} public HTML routes from all three sitemaps plus public-route governance.`);

let cursor = 0;
async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= targets.length) return;
    const target = targets[index];
    try {
      await auditTarget(target);
    } catch (error) {
      pageFailure(target.path, `audit crashed: ${error instanceof Error ? error.message : String(error)}`);
    }
    if ((index + 1) % 100 === 0 || index + 1 === targets.length) {
      console.log(`Audited ${Math.min(index + 1, targets.length)}/${targets.length} public routes...`);
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, () => worker()));

const uniqueFailures = [...new Map(failures.map((item) => [`${item.path}|\0${item.message}`, item])).values()];
const uniqueWarnings = [...new Map(warnings.map((item) => [`${item.path}|\0${item.message}`, item])).values()];
const report = {
  auditedAt: new Date().toISOString(),
  origin: ORIGIN,
  revision,
  targetCount: targets.length,
  resultCount: results.length,
  failures: uniqueFailures,
  warnings: uniqueWarnings,
  results: results.sort((a, b) => a.path.localeCompare(b.path)),
};
fs.writeFileSync('page-experience-audit.json', JSON.stringify(report, null, 2));

appendSummary('## All-page production experience audit\n\n');
appendSummary(`Audited **${targets.length}** governed public HTML routes from every TexasDefined sitemap plus static, conditional, noindex and redirect-only public-route registries.\n\n`);
appendSummary(`- Critical failures: **${uniqueFailures.length}**\n- Review warnings: **${uniqueWarnings.length}**\n\n`);

if (uniqueWarnings.length) {
  appendSummary('### Review warnings (first 50)\n\n');
  for (const warning of uniqueWarnings.slice(0, 50)) appendSummary(`- \`${warning.path}\` — ${warning.message}\n`);
  appendSummary('\n');
}

if (uniqueFailures.length) {
  appendSummary('### Critical failures (first 100)\n\n');
  for (const failure of uniqueFailures.slice(0, 100)) appendSummary(`- \`${failure.path}\` — ${failure.message}\n`);
  console.error(`All-page production experience audit failed: ${uniqueFailures.length} critical issue(s) across ${targets.length} routes.`);
  for (const failure of uniqueFailures.slice(0, 100)) console.error(`- ${failure.path}: ${failure.message}`);
  process.exit(1);
}

console.log(`All-page production experience audit passed: ${targets.length} governed public HTML routes checked; ${uniqueWarnings.length} soft review signal(s) recorded.`);
