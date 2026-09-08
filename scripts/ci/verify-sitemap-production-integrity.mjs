const ORIGIN = 'https://texasdefined.com';
const SITEMAPS = ['/sitemap.xml', '/sitemap-explore.xml'];
const MAX_URLS_PER_SITEMAP = 50_000;

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

async function fetchSitemap(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(`${ORIGIN}${path}`, {
      redirect: 'error',
      signal: controller.signal,
      headers: { 'user-agent': 'TexasDefined-Sitemap-Integrity/1.0' },
    });
    if (response.status !== 200) throw new Error(`${path} returned HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') ?? '';
    if (!/application\/(?:xml|[a-z0-9.+-]+\+xml)|text\/xml/i.test(contentType)) {
      throw new Error(`${path} returned unexpected Content-Type ${JSON.stringify(contentType)}`);
    }
    const cache = {
      age: response.headers.get('age'),
      cacheControl: response.headers.get('cache-control'),
      cfCacheStatus: response.headers.get('cf-cache-status'),
      etag: response.headers.get('etag'),
      lastModified: response.headers.get('last-modified'),
    };
    return { xml: await response.text(), cache };
  } finally {
    clearTimeout(timer);
  }
}

function validateSitemap(path, xml, cache) {
  if (!xml.startsWith('<?xml')) throw new Error(`${path} is missing the XML declaration`);
  const openingUrlset = xml.match(/<urlset\b[^>]*>/i)?.[0] ?? '(missing <urlset>)';
  console.log(`${path} response diagnostics: ${JSON.stringify({ openingUrlset, ...cache })}`);
  if (!/<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["'][^>]*>/i.test(xml)) {
    throw new Error(`${path} is missing the standard sitemap urlset namespace; received ${openingUrlset}`);
  }
  if (!/<\/urlset>\s*$/i.test(xml)) throw new Error(`${path} does not close urlset cleanly`);

  const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => match[1]);
  if (urlBlocks.length === 0) throw new Error(`${path} contains no URL entries`);
  if (urlBlocks.length > MAX_URLS_PER_SITEMAP) throw new Error(`${path} exceeds the 50,000-URL sitemap limit`);

  const locations = [];
  for (const [index, block] of urlBlocks.entries()) {
    const locMatches = [...block.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)];
    if (locMatches.length !== 1) {
      throw new Error(`${path} URL entry ${index + 1} has ${locMatches.length} <loc> elements`);
    }
    const rawLoc = locMatches[0][1];
    const loc = decodeXml(rawLoc);
    if (/[\u0000-\u001F\u007F\s]/.test(loc)) {
      throw new Error(`${path} contains whitespace/control characters in URL ${JSON.stringify(loc)}`);
    }

    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      throw new Error(`${path} contains an invalid absolute URL ${JSON.stringify(loc)}`);
    }
    if (parsed.origin !== ORIGIN) throw new Error(`${path} contains off-origin URL ${loc}`);
    if (parsed.username || parsed.password || parsed.search || parsed.hash) {
      throw new Error(`${path} contains credentials, query parameters or fragment in ${loc}`);
    }
    if (parsed.href !== loc) {
      throw new Error(`${path} contains a URL that is not already canonically encoded: ${loc} -> ${parsed.href}`);
    }
    locations.push(loc);

    const lastmods = [...block.matchAll(/<lastmod>([\s\S]*?)<\/lastmod>/gi)].map((match) => match[1]);
    if (lastmods.length > 1) throw new Error(`${path} URL ${loc} has multiple <lastmod> elements`);
    if (lastmods.length === 1) {
      const lastmod = lastmods[0];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod) || Number.isNaN(Date.parse(`${lastmod}T00:00:00Z`))) {
        throw new Error(`${path} URL ${loc} has invalid lastmod ${JSON.stringify(lastmod)}`);
      }
    }
  }

  const duplicates = locations.filter((loc, index) => locations.indexOf(loc) !== index);
  if (duplicates.length) {
    throw new Error(`${path} contains duplicate URLs: ${[...new Set(duplicates)].slice(0, 10).join(', ')}`);
  }

  const strayLocCount = [...xml.matchAll(/<loc>/gi)].length;
  if (strayLocCount !== locations.length) {
    throw new Error(`${path} has ${strayLocCount} <loc> tags but ${locations.length} valid <url> entries`);
  }

  console.log(`${path}: ${locations.length} unique, same-origin, canonically encoded URL entries passed XML integrity checks.`);
  return new Set(locations);
}

const inventories = new Map();
for (const path of SITEMAPS) {
  const { xml, cache } = await fetchSitemap(path);
  inventories.set(path, validateSitemap(path, xml, cache));
}

const primary = inventories.get('/sitemap.xml');
const explore = inventories.get('/sitemap-explore.xml');
const overlap = [...primary].filter((url) => explore.has(url));
if (overlap.length) {
  throw new Error(`Primary and Explore sitemaps overlap on ${overlap.length} URL(s): ${overlap.slice(0, 10).join(', ')}`);
}

console.log(`Production sitemap integrity passed: ${primary.size + explore.size} unique URLs across partitioned primary and Explore inventories.`);
