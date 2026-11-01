// Preserve Google-only football staging while verifying Bing discovery and exact sitemap parity.
import manifest from '../../src/data/high-school-football/google-index-eligibility.generated.json' with { type: 'json' };

const staged = new Set(manifest.teamIndexableSlugs);
const origin = 'https://texasdefined.com';
const parse = (xml) => new Set([...xml.matchAll(/<loc>\\s*([^<]+?)\\s*<\\/loc>/gi)].map(m => m[1].trim().replace(/\\/$/, '')));

export async function verifySchoolSitemapCoverage(slugs, fetcher = fetch) {
  const feeds = await Promise.all(['/sitemap.xml', '/sitemap-bing-football.xml'].map(async path => {
    const response = await fetcher(origin + path, {signal: AbortSignal.timeout(45000)});
    if (response.status !== 200) throw Error(path + ' returned HTTP ' + response.status);
    const xml = await response.text();
    if (!/<urlset\\b/i.test(xml)) throw Error(path + ' is not a URL sitemap');
    return parse(xml);
  }));
  const [google, bing] = feeds;
  const failures = [];
  for (const slug of slugs) {
    const url = origin + '/texas-high-school-football-teams/' + slug;
    const indexable = staged.has(slug);
    if (indexable && !google.has(url)) failures.push(slug + ': absent from Google sitemap');
    if (!indexable && google.has(url)) failures.push(slug + ': staged URL leaked into Google sitemap');
    if (indexable && bing.has(url)) failures.push(slug + ': protected URL leaked into Bing-only feed');
    if (!indexable && !bing.has(url)) failures.push(slug + ': absent from Bing-only sitemap');
  }
  return failures;
}
