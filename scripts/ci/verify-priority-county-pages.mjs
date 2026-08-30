const origin = 'https://texasdefined.com';
const cases = [
  ['travis', 'Travis County', ['traviscad.org', 'tax-office.traviscountytx.gov']],
  ['bexar', 'Bexar County', ['bcad.org', 'bexar.org']],
  ['dallas', 'Dallas County', ['dallascad.org', 'dallascounty.org']],
  ['collin', 'Collin County', ['collincad.org', 'collincountytx.gov']],
];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const get = (url) => fetch(url, { headers: { 'user-agent': 'TexasDefinedProductionVerifier/1.0' }, signal: AbortSignal.timeout(30000) });

async function check() {
  const sitemapResponse = await get(`${origin}/sitemap.xml`);
  if (sitemapResponse.status !== 200) return false;
  const sitemap = await sitemapResponse.text();
  let ok = true;
  for (const [slug, name, hosts] of cases) {
    const url = `${origin}/property-tax/county/${slug}`;
    const response = await get(url);
    const html = response.status === 200 ? await response.text() : '';
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i))?.[1] ?? '';
    const passes = response.status === 200
      && canonical === url
      && sitemap.includes(url)
      && !/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
      && html.includes(`${name} Appraisal District &amp; Property Tax`)
      && /"@type"\s*:\s*"Article"/.test(html)
      && html.includes('Sources, methodology and verification')
      && html.includes('August 30, 2026')
      && hosts.every((host) => html.includes(host))
      && !html.includes('Local office verification pending');
    console.log(`${passes ? 'PASS' : 'WAIT'} ${url} status=${response.status} sources=${hosts.join(',')}`);
    ok = ok && passes;
  }
  return ok;
}

for (let attempt = 1; attempt <= 10; attempt += 1) {
  try {
    if (await check()) {
      console.log('All 4 priority county property pages passed live production verification.');
      process.exit(0);
    }
  } catch (error) {
    console.log(`WAIT attempt=${attempt}: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (attempt < 10) await pause(30000);
}
console.error('Priority county property live verification failed.');
process.exit(1);
