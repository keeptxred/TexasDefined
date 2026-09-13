const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';

const profiles = [
  { path: '/destination/big-bend-national-park-cottonwood-campground', name: 'Big Bend National Park Cottonwood Campground', temporaryImage: true },
  { path: '/destination/big-bend-national-park-rio-grande-village-rv-park', name: 'Big Bend National Park Rio Grande Village RV Park', temporaryImage: true },
  { path: '/destination/hueco-tanks-state-park-rv-sites', name: 'Hueco Tanks State Park RV Sites', temporaryImage: true },
  { path: '/destination/fort-griffin-state-historic-site-rv-loop', name: 'Fort Griffin State Historic Site RV Loop', temporaryImage: true },
  { path: '/destination/davis-mountains-state-park-rv-loop', name: 'Davis Mountains State Park RV Loop', temporaryImage: false },
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
    const url = `${origin}${path}${separator}verify=rv-wave7-${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-RV-Wave7-Production/1.0' },
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
  const inSitemap = sitemap.includes(expectedUrl);
  if (profile.temporaryImage && inSitemap) {
    throw new Error(`Wave 7 temporary-image profile must stay out of sitemap: ${expectedUrl}`);
  }
  if (!profile.temporaryImage && !inSitemap) {
    throw new Error(`Wave 7 final-image profile missing from sitemap: ${expectedUrl}`);
  }

  const html = await fetchProduction(profile.path);
  if (!html.includes(profile.name)) throw new Error(`Wave 7 profile missing visible identity: ${profile.name}`);
  if (!html.includes('"@type":"WebPage"') || !html.includes('"@type":"TouristAttraction"')) {
    throw new Error(`Wave 7 profile missing destination structured data: ${profile.name}`);
  }
  if (canonicalHref(html) !== expectedUrl) {
    throw new Error(`Wave 7 canonical mismatch for ${profile.name}: ${canonicalHref(html) || 'missing'}`);
  }

  const directives = robotsDirectives(html);
  if (profile.temporaryImage) {
    if (!directives.has('noindex') || !directives.has('follow')) {
      throw new Error(`Wave 7 temporary-image robots policy mismatch for ${profile.name}: ${metaContent(html, 'robots') || 'missing'}`);
    }
  } else if (directives.has('noindex') || !directives.has('index') || !directives.has('follow')) {
    throw new Error(`Wave 7 final-image robots policy mismatch for ${profile.name}: ${metaContent(html, 'robots') || 'missing'}`);
  }
}

const temporaryCount = profiles.filter((profile) => profile.temporaryImage).length;
const finalCount = profiles.length - temporaryCount;
console.log(`RV Wave 7 production verification passed: ${temporaryCount} temporary representative-image profiles remain live/canonical but noindex/follow and out of the sitemap, while ${finalCount} exact-location-image profile remains index/follow and sitemap-discoverable.`);
