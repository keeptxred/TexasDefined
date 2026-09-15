const origin = 'https://texasdefined.com';

const sharedLocations = [
  ['houston', 'Houston'], ['austin', 'Austin'], ['dallas', 'Dallas'], ['fort-worth', 'Fort Worth'], ['san-antonio', 'San Antonio'], ['frisco', 'Frisco'], ['el-paso', 'El Paso'],
  ['harris-county', 'Harris County'], ['dallas-county', 'Dallas County'], ['tarrant-county', 'Tarrant County'], ['bexar-county', 'Bexar County'], ['travis-county', 'Travis County'], ['collin-county', 'Collin County'], ['denton-county', 'Denton County'], ['fort-bend-county', 'Fort Bend County'], ['montgomery-county', 'Montgomery County'], ['williamson-county', 'Williamson County'], ['el-paso-county', 'El Paso County'], ['hidalgo-county', 'Hidalgo County'],
];
const cityLocations = sharedLocations.slice(0, 7);
const propertyTaxLocations = [
  ['houston', 'Houston'], ['austin', 'Austin'], ['frisco', 'Frisco'],
  ['harris-county', 'Harris County'], ['dallas-county', 'Dallas County'], ['tarrant-county', 'Tarrant County'], ['bexar-county', 'Bexar County'], ['travis-county', 'Travis County'], ['collin-county', 'Collin County'], ['denton-county', 'Denton County'], ['fort-bend-county', 'Fort Bend County'], ['montgomery-county', 'Montgomery County'], ['williamson-county', 'Williamson County'], ['el-paso-county', 'El Paso County'], ['hidalgo-county', 'Hidalgo County'],
];

const localFamilies = [
  { key: 'property-tax', legacyPrefix: '/property-tax-calculator', canonical: '/texas-property-tax-estimator', cases: propertyTaxLocations },
  { key: 'affordability', legacyPrefix: '/texas-home-affordability-calculator', canonical: '/texas-home-affordability-calculator', cases: sharedLocations },
  { key: 'homeownership', legacyPrefix: '/texas-homeownership-cost-calculator', canonical: '/texas-homeownership-cost-calculator', cases: sharedLocations },
  { key: 'insurance', legacyPrefix: '/texas-home-insurance-calculator', canonical: '/texas-home-insurance-calculator', cases: sharedLocations },
  { key: 'mortgage', legacyPrefix: '/texas-mortgage-calculator', canonical: '/texas-mortgage-calculator', cases: sharedLocations },
  { key: 'cost-of-living', legacyPrefix: '/texas-cost-of-living-calculator', canonical: '/texas-cost-of-living-calculator', cases: cityLocations },
  { key: 'salary-needed', legacyPrefix: '/texas-salary-needed-calculator', canonical: '/texas-salary-needed-calculator', cases: cityLocations },
];

const canonicalPaths = [...new Set(localFamilies.map((family) => family.canonical))];
const legacyUrls = localFamilies.flatMap((family) => family.cases.map(([slug, name]) => ({
  family,
  slug,
  name,
  url: `${origin}${family.legacyPrefix}/${slug}`,
  target: `${family.canonical}#${slug}`,
})));
const buyerUrl = `${origin}/buying-a-home-in-texas`;
if (legacyUrls.length !== 105) throw new Error(`Expected 105 legacy local calculator URLs, found ${legacyUrls.length}`);
if (canonicalPaths.length !== 7) throw new Error(`Expected 7 canonical calculator pages, found ${canonicalPaths.length}`);

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const get = (url) => fetch(url, {
  redirect: 'manual',
  headers: { 'user-agent': 'TexasDefinedCalculatorConsolidationAudit/1.0 (https://texasdefined.com/about)' },
  signal: AbortSignal.timeout(30000),
});

function canonicalOf(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/\brel\s*=\s*["'][^"']*canonical[^"']*["']/i.test(tag)) continue;
    return tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? '';
  }
  return '';
}
function hasNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => /\bname\s*=\s*["']robots["']/i.test(tag) && /\bcontent\s*=\s*["'][^"']*noindex/i.test(tag));
}
async function mapLimit(items, limit, fn) {
  let cursor = 0;
  const results = new Array(items.length);
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function inspectCanonical(path, sitemap) {
  const url = `${origin}${path}`;
  const response = await get(url);
  const html = response.status === 200 ? await response.text() : '';
  const canonical = canonicalOf(html);
  const passes = response.status === 200
    && canonical === url
    && sitemap.includes(`<loc>${url}</loc>`)
    && !hasNoindex(html);
  if (!passes) console.log(`WAIT canonical ${url} status=${response.status} canonical=${canonical || 'missing'} sitemap=${sitemap.includes(url)} noindex=${hasNoindex(html)}`);
  return passes;
}

async function inspectLegacy(item, sitemap) {
  const response = await get(item.url);
  const location = response.headers.get('location') ?? '';
  const absoluteTarget = `${origin}${item.target}`;
  const passes = response.status === 301
    && (location === item.target || location === absoluteTarget)
    && !sitemap.includes(`<loc>${item.url}</loc>`);
  if (!passes) console.log(`WAIT redirect ${item.url} status=${response.status} location=${location || 'missing'} expected=${item.target} sitemap=${sitemap.includes(item.url)}`);
  return passes;
}

async function inspectBuyer(sitemap) {
  const response = await get(buyerUrl);
  const html = response.status === 200 ? await response.text() : '';
  const canonical = canonicalOf(html);
  const passes = response.status === 200 && canonical === buyerUrl && sitemap.includes(`<loc>${buyerUrl}</loc>`) && !hasNoindex(html) && html.toLowerCase().includes('buying a home in texas');
  if (!passes) console.log(`WAIT homebuyer ${buyerUrl} status=${response.status} canonical=${canonical || 'missing'} sitemap=${sitemap.includes(buyerUrl)} noindex=${hasNoindex(html)}`);
  return passes;
}

async function inspectInvalidRoutes(sitemap) {
  const invalidSlug = 'invalid-slug-consolidation-audit';
  const probes = localFamilies.map((family) => `${origin}${family.legacyPrefix}/${invalidSlug}`);
  const results = await mapLimit(probes, 7, async (url) => {
    const response = await get(url);
    const passes = response.status === 404 && !sitemap.includes(url);
    if (!passes) console.log(`WAIT invalid-route ${url} status=${response.status} sitemap=${sitemap.includes(url)}`);
    return passes;
  });
  return results.every(Boolean);
}

async function check() {
  const sitemapResponse = await get(`${origin}/sitemap.xml`);
  if (sitemapResponse.status !== 200) {
    console.log(`WAIT sitemap status=${sitemapResponse.status}`);
    return false;
  }
  const sitemap = await sitemapResponse.text();
  const canonicalResults = await mapLimit(canonicalPaths, 7, (path) => inspectCanonical(path, sitemap));
  const legacyResults = await mapLimit(legacyUrls, 8, (item) => inspectLegacy(item, sitemap));
  const buyerPass = await inspectBuyer(sitemap);
  const invalidPass = await inspectInvalidRoutes(sitemap);
  const canonicalsPassed = canonicalResults.filter(Boolean).length;
  const redirectsPassed = legacyResults.filter(Boolean).length;
  console.log(`Calculator consolidation audit: canonical=${canonicalsPassed}/${canonicalPaths.length}; redirects=${redirectsPassed}/${legacyUrls.length}; homebuyer=${buyerPass}; invalid-slug-404=${invalidPass}.`);
  return canonicalsPassed === canonicalPaths.length && redirectsPassed === legacyUrls.length && buyerPass && invalidPass;
}

for (let attempt = 1; attempt <= 10; attempt += 1) {
  try {
    if (await check()) {
      console.log('Calculator consolidation verified: 7 canonical calculator pages remain indexable, 105 legacy local calculator URLs permanently redirect with preserved location fragments, legacy leaves are absent from the sitemap, and unknown slugs remain 404.');
      process.exit(0);
    }
  } catch (error) {
    console.log(`WAIT attempt=${attempt}: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (attempt < 10) await pause(30000);
}

console.error('Calculator consolidation live verification failed.');
process.exit(1);
