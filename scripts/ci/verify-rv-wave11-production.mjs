import fs from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const images = fs.readFileSync('src/data/rv-parks/images.server.ts', 'utf8');

const profiles = [
  { slug: 'dellanera-rv-park', path: '/destination/dellanera-rv-park', name: 'Dellanera RV Park' },
  { slug: 'pleasure-island-rv-park', path: '/destination/pleasure-island-rv-park', name: 'Pleasure Island RV Park' },
  { slug: 'pioneer-rv-resort', path: '/destination/pioneer-rv-resort', name: 'Pioneer RV Resort' },
  { slug: 'gulf-waters-beach-front-rv-resort', path: '/destination/gulf-waters-beach-front-rv-resort', name: 'Gulf Waters Beach Front RV Resort' },
  { slug: 'jamaica-beach-rv-resort', path: '/destination/jamaica-beach-rv-resort', name: 'Jamaica Beach RV Resort' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function blockFor(source, slug) {
  const singleStart = source.indexOf(`'${slug}': {`);
  const doubleStart = source.indexOf(`"${slug}": {`);
  const start = singleStart >= 0 ? singleStart : doubleStart;
  if (start < 0) return '';
  const singleNext = source.indexOf("\n  '", start + slug.length + 8);
  const doubleNext = source.indexOf('\n  "', start + slug.length + 8);
  const candidates = [singleNext, doubleNext].filter((value) => value > start);
  const end = candidates.length ? Math.min(...candidates) : source.indexOf('\n};', start);
  return source.slice(start, end > start ? end : undefined);
}

function finalImageReady(slug) {
  const block = blockFor(images, slug);
  if (!block) throw new Error(`Wave 11 image registry record missing for ${slug}`);
  if (/actualLocation:\s*true/.test(block)) return true;
  const representative = /actualLocation:\s*false/.test(block)
    && /subjectScope:\s*['"]representative['"]/.test(block)
    && /sourceKind:\s*['"]generated-representative['"]/.test(block)
    && /AI-generated representative editorial image/i.test(block);
  if (representative) return false;
  throw new Error(`Wave 11 image record has unsupported readiness state for ${slug}`);
}

function metaContent(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const metaName = tag.match(/\bname=["']([^"']+)["']/i)?.[1];
    if (metaName?.toLowerCase() !== name.toLowerCase()) continue;
    return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '';
  }
  return '';
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1] ?? '';
    if (!rel.toLowerCase().split(/\s+/).includes('canonical')) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? '';
  }
  return '';
}

function robotsDirectives(html) {
  return new Set(metaContent(html, 'robots').toLowerCase().split(',').map((item) => item.trim()).filter(Boolean));
}

async function fetchProduction(path) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=rv-wave11-${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-RV-Wave11-Production/1.0' },
      });
      const body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (!challenged && response.ok) return body;
      lastError = new Error(challenged ? 'Cloudflare challenge' : `HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError ?? new Error(`Unable to fetch ${path}`);
}

const sitemap = await fetchProduction('/sitemap-explore.xml');
let indexReady = 0;
let imageGated = 0;

for (const profile of profiles) {
  const expectedUrl = `${origin}${profile.path}`;
  const ready = finalImageReady(profile.slug);
  const inSitemap = sitemap.includes(expectedUrl);
  const html = await fetchProduction(profile.path);
  if (!html.toLowerCase().includes(profile.name.toLowerCase())) throw new Error(`Wave 11 profile missing visible identity: ${profile.name}`);
  if (!html.includes('"@type":"WebPage"') || !html.includes('"@type":"TouristAttraction"')) {
    throw new Error(`Wave 11 profile missing destination structured data: ${profile.name}`);
  }
  if (canonicalHref(html) !== expectedUrl) {
    throw new Error(`Wave 11 canonical mismatch for ${profile.name}: ${canonicalHref(html) || 'missing'}`);
  }

  const directives = robotsDirectives(html);
  if (ready) {
    indexReady += 1;
    if (!inSitemap) throw new Error(`Wave 11 final-image profile missing from sitemap: ${expectedUrl}`);
    if (directives.has('noindex') || !directives.has('index') || !directives.has('follow')) {
      throw new Error(`Wave 11 final-image robots policy mismatch for ${profile.name}: ${metaContent(html, 'robots') || 'missing'}`);
    }
  } else {
    imageGated += 1;
    if (inSitemap) throw new Error(`Wave 11 representative-image profile must stay out of sitemap: ${expectedUrl}`);
    if (!directives.has('noindex') || !directives.has('follow')) {
      throw new Error(`Wave 11 representative-image robots policy mismatch for ${profile.name}: ${metaContent(html, 'robots') || 'missing'}`);
    }
  }
}

console.log(`RV Wave 11 production verification passed: ${profiles.length} source-backed profiles are live and canonical; ${indexReady} satisfy the final-image gate and ${imageGated} remain correctly noindex/follow and out of the sitemap pending final governed imagery.`);
