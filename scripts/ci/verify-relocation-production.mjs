const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';

const routes = [
  ['/moving-to-texas', 'Moving to Texas'],
  ['/moving-to-texas/tools', 'Texas relocation tools'],
  ['/find-my-county', 'What county am I in?'],
  ['/find-my-school-district', 'Find the school district that serves an address'],
  ['/find-my-utilities', 'Find utilities for a Texas address'],
  ['/find-my-voter-registration', 'Find your Texas voter-registration path'],
  ['/find-my-homestead-exemption', 'Find where to file a Texas homestead exemption'],
  ['/find-my-property-tax', 'Find your Texas property-tax offices'],
  ['/find-my-emergency-services', 'Find Texas emergency and community services'],
  ['/texas-zip-code-explorer', 'Texas ZIP Code Explorer'],
  ['/compare-texas-cities', 'Compare Texas cities'],
];

const toolkitLinks = routes
  .map(([path]) => path)
  .filter((path) => path !== '/moving-to-texas' && path !== '/moving-to-texas/tools');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchLive(path, label) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}relocation_verify=${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Relocation-Production-Smoke/1.0' },
      });
      const body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (response.ok && !challenged) return { response, body };
      lastError = new Error(`${label}: HTTP ${response.status}${challenged ? ' with Cloudflare challenge' : ''}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError instanceof Error ? lastError : new Error(`${label}: request failed`);
}

function hasCanonical(body, path) {
  const canonical = `${origin}${path}`;
  const linkTags = body.match(/<link\b[^>]*>/gi) ?? [];
  return linkTags.some((tag) => {
    const isCanonical = /\brel=["']canonical["']/i.test(tag);
    const hasHref = tag.includes(`href="${canonical}"`) || tag.includes(`href='${canonical}'`);
    return isCanonical && hasHref;
  });
}

function hasRobotsNoindex(body) {
  const metas = body.match(/<meta\b[^>]*>/gi) ?? [];
  return metas.some((tag) => /\bname=["']robots["']/i.test(tag) && /\bcontent=["'][^"']*noindex/i.test(tag));
}

function bodySample(body) {
  return body.slice(0, 4000).replace(/\s+/g, ' ');
}

for (const [path, needle] of routes) {
  const { response, body } = await fetchLive(path, path);
  if (response.status !== 200) throw new Error(`${path}: expected HTTP 200, received ${response.status}`);
  if (!body.includes(needle)) {
    console.error(`${path} response sample: ${bodySample(body)}`);
    throw new Error(`${path}: expected substantive content not found: ${needle}`);
  }
  if (!hasCanonical(body, path)) {
    console.error(`${path} response sample: ${bodySample(body)}`);
    throw new Error(`${path}: canonical does not resolve to ${origin}${path}`);
  }
  if (hasRobotsNoindex(body)) throw new Error(`${path}: robots meta unexpectedly contains noindex`);
  console.log(`PASS ${path}: 200, expected content, canonical, indexable meta`);
}

const { body: toolkitBody } = await fetchLive('/moving-to-texas/tools', 'relocation toolkit');
for (const path of toolkitLinks) {
  const relative = `href="${path}"`;
  const absolute = `href="${origin}${path}"`;
  if (!toolkitBody.includes(relative) && !toolkitBody.includes(absolute)) {
    throw new Error(`/moving-to-texas/tools: missing internal link to ${path}`);
  }
}
console.log(`PASS /moving-to-texas/tools: links to all ${toolkitLinks.length} supporting relocation tools`);

const { body: robots } = await fetchLive('/robots.txt', 'robots.txt');
for (const [path] of routes) {
  if (robots.split(/\r?\n/).some((line) => line.trim().toLowerCase() === `disallow: ${path.toLowerCase()}`)) {
    throw new Error(`robots.txt explicitly blocks ${path}`);
  }
}
console.log('PASS robots.txt: relocation routes are not explicitly blocked');

const { body: sitemap } = await fetchLive('/sitemap.xml', 'sitemap.xml');
for (const [path] of routes) {
  const loc = `<loc>${origin}${path}</loc>`;
  if (!sitemap.includes(loc)) throw new Error(`sitemap.xml missing ${origin}${path}`);
}
console.log(`PASS sitemap.xml: all ${routes.length} relocation URLs are present`);

console.log(`TexasDefined relocation production verification passed for ${routes.length} canonical, indexable relocation URLs.`);
