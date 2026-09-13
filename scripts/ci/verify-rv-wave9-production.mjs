const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';

const profiles = [
  { path: '/destination/lady-bird-johnson-municipal-park', name: 'Lady Bird Johnson Municipal Park' },
  { path: '/destination/quintana-beach-county-park-rv-sites', name: 'Quintana Beach County Park RV Sites' },
  { path: '/destination/ib-magee-beach-park-rv-sites', name: 'IB Magee Beach Park RV Sites' },
  { path: '/destination/east-fork-park-rv-area', name: 'East Fork Park RV Area' },
  { path: '/destination/clear-lake-park-rv-loop', name: 'Clear Lake Park RV Loop' },
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
    const url = `${origin}${path}${separator}verify=rv-wave9-${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-RV-Wave9-Production/1.0' },
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
  if (sitemap.includes(expectedUrl)) throw new Error(`Wave 9 temporary-image profile must stay out of sitemap: ${expectedUrl}`);

  const html = await fetchProduction(profile.path);
  if (!html.toLowerCase().includes(profile.name.toLowerCase())) throw new Error(`Wave 9 profile missing visible identity: ${profile.name}`);
  if (!html.includes('"@type":"WebPage"') || !html.includes('"@type":"TouristAttraction"')) {
    throw new Error(`Wave 9 profile missing destination structured data: ${profile.name}`);
  }
  if (canonicalHref(html) !== expectedUrl) {
    throw new Error(`Wave 9 canonical mismatch for ${profile.name}: ${canonicalHref(html) || 'missing'}`);
  }
  const directives = robotsDirectives(html);
  if (!directives.has('noindex') || !directives.has('follow')) {
    throw new Error(`Wave 9 temporary-image robots policy mismatch for ${profile.name}: ${metaContent(html, 'robots') || 'missing'}`);
  }
}

console.log(`RV Wave 9 production verification passed: ${profiles.length} source-complete profiles are live and canonical with destination schema while temporary representative AI heroes correctly keep them noindex/follow and out of the sitemap.`);
