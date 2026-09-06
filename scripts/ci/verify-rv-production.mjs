const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const profilePath = '/destination/palo-duro-canyon-state-park-rv-loop';

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

const hub = await fetchProduction('/explore/rv-parks');
requireIncludes(hub.body, [
  'Texas RV Parks',
  '250 Places by Region',
  '"@type":"CollectionPage"',
  '"@type":"Campground"',
  profilePath,
], 'RV hub');
if (canonicalHref(hub.body) !== `${origin}/explore/rv-parks`) {
  throw new Error(`RV hub canonical mismatch: ${canonicalHref(hub.body) || 'missing'}`);
}
if (metaContent(hub.body, 'robots').toLowerCase().includes('noindex')) {
  throw new Error(`RV hub unexpectedly noindex: ${metaContent(hub.body, 'robots')}`);
}
console.log('RV hub production verification passed: indexable canonical collection with Campground ItemList coverage.');

const profile = await fetchProduction(profilePath);
requireIncludes(profile.body, [
  'Palo Duro Canyon State Park RV Loop',
  'Campground inside Palo Duro Canyon State Park in Randall County, Texas',
  'Photography:',
  'Larry D. Moore',
  'CC BY 4.0',
  'Wikimedia Commons',
  '"@type":"WebPage"',
  '"@type":"TouristAttraction"',
], 'RV profile');
if (canonicalHref(profile.body) !== `${origin}${profilePath}`) {
  throw new Error(`RV profile canonical mismatch: ${canonicalHref(profile.body) || 'missing'}`);
}
const profileRobots = metaContent(profile.body, 'robots').toLowerCase();
if (!profileRobots.includes('noindex') || !profileRobots.includes('follow')) {
  throw new Error(`RV profile robots policy mismatch: ${profileRobots || 'missing'}`);
}
console.log('RV profile production verification passed: canonical noindex/follow seed profile with exact campground photo attribution.');

const county = await fetchProduction('/county/randall');
requireIncludes(county.body, [
  'RV camping around Randall County',
  'Palo Duro Canyon State Park RV Loop',
  profilePath,
  `${origin}/county/randall#rv-parks`,
  '"@type":"Campground"',
  '/explore/rv-parks',
], 'Randall County RV integration');
console.log('Randall County RV production verification passed: visible RV discovery section, Campground ItemList and statewide-directory handoff.');

console.log('TexasDefined RV production smoke passed for hub, seed profile, attribution, indexing policy and county integration.');
