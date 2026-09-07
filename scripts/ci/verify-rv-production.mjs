const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const curatedProfiles = [
  { path: '/destination/blanco-state-park-rv-area', name: 'Blanco State Park RV Area' },
  { path: '/destination/garner-state-park-rv-loops', name: 'Garner State Park RV Loops' },
  { path: '/destination/pedernales-falls-state-park-rv-sites', name: 'Pedernales Falls State Park RV Sites' },
  { path: '/destination/galveston-island-state-park-rv-area', name: 'Galveston Island State Park RV Area' },
  { path: '/destination/palo-duro-canyon-state-park-rv-loop', name: 'Palo Duro Canyon State Park RV Loop' },
];
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

function robotsDirectives(html) {
  return new Set(metaContent(html, 'robots').toLowerCase().split(',').map((item) => item.trim()).filter(Boolean));
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
  profilePath,
], 'RV hub');
if (canonicalHref(hub.body) !== `${origin}/explore/rv-parks`) {
  throw new Error(`RV hub canonical mismatch: ${canonicalHref(hub.body) || 'missing'}`);
}
if (metaContent(hub.body, 'robots').toLowerCase().includes('noindex')) {
  throw new Error(`RV hub unexpectedly noindex: ${metaContent(hub.body, 'robots')}`);
}
console.log('RV hub production verification passed: indexable canonical collection with Campground ItemList coverage.');

const sitemap = await fetchProduction('/sitemap-explore.xml');
for (const profile of curatedProfiles) {
  requireIncludes(sitemap.body, [`${origin}${profile.path}`], `RV sitemap ${profile.name}`);
}
console.log(`RV sitemap production verification passed: all ${curatedProfiles.length} curated public-park profiles are discoverable.`);

for (const profileSpec of curatedProfiles) {
  const profile = await fetchProduction(profileSpec.path);
  requireIncludes(profile.body, [
    profileSpec.name,
    '"@type":"WebPage"',
    '"@type":"TouristAttraction"',
  ], `RV profile ${profileSpec.name}`);
  if (canonicalHref(profile.body) !== `${origin}${profileSpec.path}`) {
    throw new Error(`RV profile canonical mismatch for ${profileSpec.name}: ${canonicalHref(profile.body) || 'missing'}`);
  }
  const directives = robotsDirectives(profile.body);
  if (directives.has('noindex') || !directives.has('index') || !directives.has('follow')) {
    throw new Error(`RV profile robots policy mismatch for ${profileSpec.name}: ${metaContent(profile.body, 'robots') || 'missing'}`);
  }

  if (profileSpec.path === profilePath) {
    requireIncludes(profile.body, [
      'Campground inside Palo Duro Canyon State Park in Randall County, Texas',
      'Photography:',
      'Larry D. Moore',
      'CC BY 4.0',
      'Wikimedia Commons',
    ], 'Palo Duro RV profile attribution');
  }
}
console.log(`RV profile production verification passed: all ${curatedProfiles.length} curated public-park profiles are canonical index/follow pages with WebPage and TouristAttraction schema; Palo Duro attribution remains intact.`);

const county = await fetchProduction('/county/randall');
requireVisibleIncludes(county.body, [
  'RV camping around Randall County',
], 'Randall County RV integration');
requireIncludes(county.body, [
  'Palo Duro Canyon State Park RV Loop',
  profilePath,
  `${origin}/county/randall#rv-parks`,
  '"@type":"Campground"',
  '/explore/rv-parks',
], 'Randall County RV integration');
console.log('Randall County RV production verification passed: visible RV discovery section, Campground ItemList and statewide-directory handoff.');

console.log(`TexasDefined RV production smoke passed for hub, ${curatedProfiles.length} index-ready profiles, sitemap discovery, attribution and Randall County integration.`);
