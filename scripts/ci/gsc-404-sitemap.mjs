// Pure bounded sitemap evidence helpers for the exact historic 99-URL GSC sample.
// No crawling, external network calls, publication or Google indexing claims.
const ALLOWED_HOSTS = new Set(['texasdefined.com', 'www.texasdefined.com']);
// The six publicly advertised XML sitemap sources are listed in
// robots.txt/sitemap-index.xml. RSS is a separate feed, not a urlset.
// Cover all XML public discovery surfaces, not just primary + Explore.
export const GSC_SITEMAP_SEEDS = Object.freeze([
  '/sitemap-index.xml',
  '/sitemap.xml',
  '/sitemap-explore.xml',
  '/sitemap-shop.xml',
  '/sitemap-evergreen.xml',
  '/sitemap-texas-icons.xml',
]);

function sitePath(rawUrl) {
  const url = new URL(rawUrl.replaceAll('&amp;', '&'));
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname) || url.search || url.hash) return null;
  let result = url.pathname;
  for (let i = 0; i < 3; i += 1) {
    const next = decodeURIComponent(result);
    if (next === result) break;
    result = next;
  }
  return result;
}

export function parseGscSitemapXml(xml) {
  const isIndex = /<sitemapindex\b/i.test(xml);
  const isUrlset = /<urlset\b/i.test(xml);
  if (isIndex === isUrlset) throw new Error('Expected one XML sitemapindex or urlset root');
  const paths = [];
  const children = [];
  for (const match of xml.matchAll(/<loc\b[^>]*>\s*([^<]+?)\s*<\/loc>/gi)) {
    const parsed = sitePath(match[1].trim());
    if (!parsed) continue;
    if (isIndex) {
      if (parsed.endsWith('.xml')) children.push(parsed);
    } else {
      paths.push(parsed);
    }
  }
  return { kind: isIndex ? 'index' : 'urlset', paths: [...new Set(paths)], children: [...new Set(children)] };
}

export function identifyGscSitemapLeaks(listedPaths, intentionallyMissing, noncanonicalAliases) {
  const listed = new Set(listedPaths);
  return {
    forbiddenListed: [...new Set(intentionallyMissing)].filter((path) => listed.has(path)).sort(),
    redirectSourceListed: [...new Set(noncanonicalAliases)].filter((path) => listed.has(path)).sort(),
  };
}

/** Fail closed when a substantively restored, indexable authority page is not
 * listed in ANY first-party public XML sitemap. This is not a claim of Google
 * indexing; football Google-only exclusion cohorts are deliberately not passed.
 */
export function missingRestoredGscSitemapCanonicals(listedPaths, requiredCanons) {
  const listed = new Set(listedPaths);
  return [...new Set(requiredCanons)].filter((path) => !listed.has(path)).sort();
}
