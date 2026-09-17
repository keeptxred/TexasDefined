const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';

const profiles = [
  { path: '/destination/mission-tejas-state-park-rv-loop', name: 'Mission Tejas State Park RV Loop' },
  { path: '/destination/cooper-lake-state-park-rv-loops', name: 'Cooper Lake State Park RV Loops' },
  { path: '/destination/caprock-canyons-state-park-rv-loop', name: 'Caprock Canyons State Park RV Loop' },
  { path: '/destination/abilene-state-park-rv-loop', name: 'Abilene State Park RV Loop' },
  { path: '/destination/lake-colorado-city-state-park-rv-loop', name: 'Lake Colorado City State Park RV Loop' },
];

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

async function fetchProduction(path) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=rv-wave5-${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-RV-Wave5-Production/1.0' },
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
for (const profile of profiles) {
  const expectedUrl = `${origin}${profile.path}`;
  if (!sitemap.includes(expectedUrl)) throw new Error(`Wave 5 sitemap missing ${profile.name}: ${expectedUrl}`);

  const html = await fetchProduction(profile.path);
  if (!html.includes(profile.name)) throw new Error(`Wave 5 profile missing visible identity: ${profile.name}`);
  if (!html.includes('"@type":"WebPage"') || !html.includes('"@type":"TouristAttraction"')) {
    throw new Error(`Wave 5 profile missing destination structured data: ${profile.name}`);
  }
  if (canonicalHref(html) !== expectedUrl) {
    throw new Error(`Wave 5 canonical mismatch for ${profile.name}: ${canonicalHref(html) || 'missing'}`);
  }
  const directives = robotsDirectives(html);
  if (directives.has('noindex') || !directives.has('index') || !directives.has('follow')) {
    throw new Error(`Wave 5 robots policy mismatch for ${profile.name}: ${metaContent(html, 'robots') || 'missing'}`);
  }
}

console.log(`RV Wave 5 production verification passed: ${profiles.length} profiles are sitemap-discoverable, canonical index/follow destinations with WebPage and TouristAttraction schema.`);
