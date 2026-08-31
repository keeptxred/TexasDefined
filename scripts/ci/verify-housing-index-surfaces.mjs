const origin = 'https://texasdefined.com';

const sharedLocations = [
  ['houston', 'Houston'], ['austin', 'Austin'], ['dallas', 'Dallas'], ['fort-worth', 'Fort Worth'], ['san-antonio', 'San Antonio'], ['frisco', 'Frisco'], ['el-paso', 'El Paso'],
  ['harris-county', 'Harris County'], ['dallas-county', 'Dallas County'], ['tarrant-county', 'Tarrant County'], ['bexar-county', 'Bexar County'], ['travis-county', 'Travis County'], ['collin-county', 'Collin County'], ['denton-county', 'Denton County'], ['fort-bend-county', 'Fort Bend County'], ['montgomery-county', 'Montgomery County'], ['williamson-county', 'Williamson County'], ['el-paso-county', 'El Paso County'], ['hidalgo-county', 'Hidalgo County'],
];

const propertyTaxLocations = [
  ['houston', 'Houston'], ['austin', 'Austin'], ['frisco', 'Frisco'],
  ['harris-county', 'Harris County'], ['dallas-county', 'Dallas County'], ['tarrant-county', 'Tarrant County'], ['bexar-county', 'Bexar County'], ['travis-county', 'Travis County'], ['collin-county', 'Collin County'], ['denton-county', 'Denton County'], ['fort-bend-county', 'Fort Bend County'], ['montgomery-county', 'Montgomery County'], ['williamson-county', 'Williamson County'], ['el-paso-county', 'El Paso County'], ['hidalgo-county', 'Hidalgo County'],
];

const localFamilies = [
  { key: 'property-tax', prefix: '/property-tax-calculator', cases: propertyTaxLocations, titleSuffix: 'property tax calculator' },
  { key: 'affordability', prefix: '/texas-home-affordability-calculator', cases: sharedLocations, titleSuffix: 'home affordability calculator' },
  { key: 'homeownership', prefix: '/texas-homeownership-cost-calculator', cases: sharedLocations, titleSuffix: 'homeownership cost calculator' },
  { key: 'insurance', prefix: '/texas-home-insurance-calculator', cases: sharedLocations, titleSuffix: 'home insurance' },
  { key: 'mortgage', prefix: '/texas-mortgage-calculator', cases: sharedLocations, titleSuffix: 'mortgage payment calculator' },
];

const localUrls = localFamilies.flatMap((family) => family.cases.map(([slug, name]) => ({
  family,
  slug,
  name,
  url: `${origin}${family.prefix}/${slug}`,
})));
const buyerUrl = `${origin}/buying-a-home-in-texas`;
if (localUrls.length + 1 !== 92) throw new Error(`Expected 92 governed housing URLs, found ${localUrls.length + 1}`);

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const get = (url) => fetch(url, {
  redirect: 'manual',
  headers: { 'user-agent': 'TexasDefinedHousingIndexAudit/1.0 (https://texasdefined.com/about)' },
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

function hasSchema(html, type) {
  return new RegExp(`\\"@type\\"\\s*:\\s*\\"${type}\\"`).test(html);
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

async function inspectLocal(item, sitemap) {
  const response = await get(item.url);
  const html = response.status === 200 ? await response.text() : '';
  const canonical = canonicalOf(html);
  const titleSignal = html.toLowerCase().includes(`${item.name} ${item.family.titleSuffix}`.toLowerCase());
  const passes = response.status === 200
    && canonical === item.url
    && sitemap.includes(`<loc>${item.url}</loc>`)
    && !hasNoindex(html)
    && hasSchema(html, 'WebApplication')
    && hasSchema(html, 'FAQPage')
    && titleSignal;
  if (!passes) {
    console.log(`WAIT ${item.family.key} ${item.url} status=${response.status} canonical=${canonical || 'missing'} sitemap=${sitemap.includes(item.url)} noindex=${hasNoindex(html)} webapp=${hasSchema(html, 'WebApplication')} faq=${hasSchema(html, 'FAQPage')} title=${titleSignal}`);
  }
  return passes;
}

async function inspectBuyer(sitemap) {
  const response = await get(buyerUrl);
  const html = response.status === 200 ? await response.text() : '';
  const canonical = canonicalOf(html);
  const passes = response.status === 200
    && canonical === buyerUrl
    && sitemap.includes(`<loc>${buyerUrl}</loc>`)
    && !hasNoindex(html)
    && hasSchema(html, 'HowTo')
    && hasSchema(html, 'FAQPage')
    && html.toLowerCase().includes('buying a home in texas');
  if (!passes) console.log(`WAIT homebuyer ${buyerUrl} status=${response.status} canonical=${canonical || 'missing'} sitemap=${sitemap.includes(buyerUrl)} noindex=${hasNoindex(html)} howto=${hasSchema(html, 'HowTo')} faq=${hasSchema(html, 'FAQPage')}`);
  return passes;
}

async function inspectInvalidRoutes(sitemap) {
  const invalidSlug = 'invalid-slug-phase10';
  const probes = localFamilies.map((family) => `${origin}${family.prefix}/${invalidSlug}`);
  const results = await mapLimit(probes, 5, async (url) => {
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
  const localResults = await mapLimit(localUrls, 8, (item) => inspectLocal(item, sitemap));
  const buyerPass = await inspectBuyer(sitemap);
  const invalidPass = await inspectInvalidRoutes(sitemap);
  const passed = localResults.filter(Boolean).length;
  console.log(`Housing index audit pass count: ${passed}/${localUrls.length} local pages; homebuyer=${buyerPass}; invalid-slug-404=${invalidPass}.`);
  return passed === localUrls.length && buyerPass && invalidPass;
}

for (let attempt = 1; attempt <= 10; attempt += 1) {
  try {
    if (await check()) {
      console.log('All 92 governed housing URLs passed live index-suppression verification: HTTP 200, exact self-canonical, sitemap discovery, no noindex, expected structured data; unknown dynamic slugs return 404.');
      process.exit(0);
    }
  } catch (error) {
    console.log(`WAIT attempt=${attempt}: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (attempt < 10) await pause(30000);
}

console.error('Phase 10 housing live index-suppression verification failed.');
process.exit(1);
