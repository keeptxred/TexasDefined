const origin = 'https://texasdefined.com';
const cases = [
  ['houston', 'Houston'], ['austin', 'Austin'], ['dallas', 'Dallas'], ['fort-worth', 'Fort Worth'], ['san-antonio', 'San Antonio'], ['frisco', 'Frisco'], ['el-paso', 'El Paso'],
  ['harris-county', 'Harris County'], ['dallas-county', 'Dallas County'], ['tarrant-county', 'Tarrant County'], ['bexar-county', 'Bexar County'], ['travis-county', 'Travis County'], ['collin-county', 'Collin County'], ['denton-county', 'Denton County'], ['fort-bend-county', 'Fort Bend County'], ['montgomery-county', 'Montgomery County'], ['williamson-county', 'Williamson County'], ['el-paso-county', 'El Paso County'], ['hidalgo-county', 'Hidalgo County'],
];

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const get = (url) => fetch(url, { headers: { 'user-agent': 'TexasDefinedLocalMortgageVerifier/1.0' }, signal: AbortSignal.timeout(30000) });

async function check() {
  const sitemapResponse = await get(`${origin}/sitemap.xml`);
  if (sitemapResponse.status !== 200) return false;
  const sitemap = await sitemapResponse.text();
  let ok = true;
  for (const [slug, name] of cases) {
    const url = `${origin}/texas-mortgage-calculator/${slug}`;
    const response = await get(url);
    const html = response.status === 200 ? await response.text() : '';
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i))?.[1] ?? '';
    const passes = response.status === 200
      && canonical === url
      && sitemap.includes(url)
      && !/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
      && html.includes(`${name} mortgage payment calculator`)
      && /"@type"\s*:\s*"WebApplication"/.test(html)
      && /"@type"\s*:\s*"FAQPage"/.test(html)
      && html.includes('does not publish a current mortgage rate or imply lender approval')
      && html.includes('texas-home-insurance-calculator')
      && html.includes('texas-homeownership-cost-calculator')
      && html.includes('texas-home-affordability-calculator')
      && html.includes('property-tax-calculator')
      && html.includes('consumerfinance.gov/owning-a-home/loan-estimate')
      && html.includes('comptroller.texas.gov/taxes/property-tax/rates');
    console.log(`${passes ? 'PASS' : 'WAIT'} ${url} status=${response.status}`);
    ok = ok && passes;
  }
  return ok;
}

for (let attempt = 1; attempt <= 10; attempt += 1) {
  try {
    if (await check()) {
      console.log(`All ${cases.length} local mortgage pages passed live production and sitemap verification.`);
      process.exit(0);
    }
  } catch (error) {
    console.log(`WAIT attempt=${attempt}: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (attempt < 10) await pause(30000);
}
console.error('Local mortgage live production verification failed.');
process.exit(1);
