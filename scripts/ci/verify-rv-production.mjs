const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const curatedProfilePath = '/destination/palo-duro-canyon-state-park-rv-loop';
const guardedProfilePath = '/destination/caddo-lake-state-park-rv-area';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchProduction(path) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=rv-production-${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-RV-Production-Smoke/1.0' },
      });
      const body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (!challenged && response.ok) return { response, body };
      lastError = new Error(challenged ? 'Cloudflare challenge' : `HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError ?? new Error(`Unable to fetch ${path}`);
}

function requireIncludes(body, needles, label) {
  const missing = needles.filter((needle) => !body.includes(needle));
  if (missing.length) throw new Error(`${label} missing expected production content: ${missing.join(' | ')}`);
}

function requireVisibleIncludes(body, needles, label) {
  const text = visibleText(body);
  const missing = needles.filter((needle) => !text.includes(needle));
  if (missing.length) throw new Error(`${label} missing expected visible production text: ${missing.join(' | ')}`);
}

const hydrationBoundaryFixture = '<h2>RV camping around <!-- -->Randall County</h2>';
requireVisibleIncludes(hydrationBoundaryFixture, ['RV camping around Randall County'], 'RV smoke hydration-boundary regression');

const hub = await fetchProduction('/explore/rv-parks');
requireIncludes(hub.body, [
  'Texas RV Parks',
  '250 Places by Region',
  '"@type":"CollectionPage"',
  '"@type":"Campground"',
  curatedProfilePath,
], 'RV hub');
if (canonicalHref(hub.body) !== `${origin}/explore/rv-parks`) {
  throw new Error(`RV hub canonical mismatch: ${canonicalHref(hub.body) || 'missing'}`);
}
if (metaContent(hub.body, 'robots').toLowerCase().includes('noindex')) {
  throw new Error(`RV hub unexpectedly noindex: ${metaContent(hub.body, 'robots')}`);
}
console.log('RV hub production verification passed: indexable canonical collection with Campground ItemList coverage.');

const curatedProfile = await fetchProduction(curatedProfilePath);
requireIncludes(curatedProfile.body, [
  'Palo Duro Canyon State Park RV Loop',
  'Campground inside Palo Duro Canyon State Park in Randall County, Texas',
  'Photography:',
  'Larry D. Moore',
  'CC BY 4.0',
  'Wikimedia Commons',
  'Texas Parks and Wildlife Department',
  '"@type":"WebPage"',
  '"@type":"TouristAttraction"',
], 'Curated RV profile');
if (canonicalHref(curatedProfile.body) !== `${origin}${curatedProfilePath}`) {
  throw new Error(`Curated RV profile canonical mismatch: ${canonicalHref(curatedProfile.body) || 'missing'}`);
}
const curatedRobots = metaContent(curatedProfile.body, 'robots').toLowerCase();
if (curatedRobots.includes('noindex') || !curatedRobots.includes('index') || !curatedRobots.includes('follow')) {
  throw new Error(`Curated RV profile robots policy mismatch: ${curatedRobots || 'missing'}`);
}
console.log('Curated RV profile production verification passed: canonical index/follow profile with official source and exact-location photo attribution.');

const guardedProfile = await fetchProduction(guardedProfilePath);
requireIncludes(guardedProfile.body, [
  'Caddo Lake State Park RV Area',
  '"@type":"WebPage"',
], 'Guarded RV profile');
if (canonicalHref(guardedProfile.body) !== `${origin}${guardedProfilePath}`) {
  throw new Error(`Guarded RV profile canonical mismatch: ${canonicalHref(guardedProfile.body) || 'missing'}`);
}
const guardedRobots = metaContent(guardedProfile.body, 'robots').toLowerCase();
if (!guardedRobots.includes('noindex') || !guardedRobots.includes('follow')) {
  throw new Error(`Guarded RV profile robots policy mismatch: ${guardedRobots || 'missing'}`);
}
console.log('Guarded RV profile production verification passed: canonical noindex/follow remains enforced for an uncurated seed.');

const county = await fetchProduction('/county/randall');
requireVisibleIncludes(county.body, [
  'RV camping around Randall County',
], 'Randall County RV integration');
requireIncludes(county.body, [
  'Palo Duro Canyon State Park RV Loop',
  curatedProfilePath,
  `${origin}/county/randall#rv-parks`,
  '"@type":"Campground"',
  '/explore/rv-parks',
], 'Randall County RV integration');
console.log('Randall County RV production verification passed: visible RV discovery section, Campground ItemList and statewide-directory handoff.');

console.log('TexasDefined RV production smoke passed for hub, curated indexable profile, guarded noindex profile, attribution, indexing policy and county integration.');
