// Post-crawl, same-origin, sitemap-scoped contextual link evidence.
// Counts actual SSR anchors inside each page's <main> rather than treating
// shared navigation, sitemap entries, or a mention in JS as editorial linking.
// An unlinked page is a research candidate, not automatic evidence of a defect.
function pathFromUrl(raw) {
  try {
    const path = new URL(raw).pathname;
    return path.replace(/\/+$/, '') || '/';
  } catch { return null; }
}
function linkPath(raw) {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//')) return null;
  return raw.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
}
export function enrichAuthorityLinkGraph(results) {
  const byPath = new Map();
  for (const page of results) {
    const path = pathFromUrl(page.url);
    if (path && page.authority) byPath.set(path, page);
  }
  const inbound = new Map([...byPath.keys()].map(path => [path, new Set()]));
  const outlinks = new Map();
  const unresolved = new Map();
  for (const [path, page] of byPath) {
    const valid = new Set();
    const missing = new Set();
    for (const raw of page.authority.contextualInternalPaths || []) {
      const dest = linkPath(raw);
      if (!dest || dest === path) continue;
      if (byPath.has(dest)) {
        valid.add(dest);
        inbound.get(dest).add(path);
      } else {
        missing.add(dest);
      }
    }
    outlinks.set(path, valid);
    unresolved.set(path, missing);
  }
  const byFamily = {};
  const unattestedCandidates = [];
  for (const [path, page] of byPath) {
    const current = page.authority;
    const sourcePages = inbound.get(path);
    const destinations = outlinks.get(path);
    const reciprocal = [...destinations].filter(dest => outlinks.get(dest)?.has(path));
    const noInbound = sourcePages.size === 0;
    const noReciprocal = reciprocal.length === 0 && destinations.size > 0;
    const flagged = [];
    if (noInbound) flagged.push('no-main-content-inbound-anchor-from-sitemap-pages');
    if (noReciprocal) flagged.push('no-reciprocal-main-content-anchor');
    current.inboundContextualPages = sourcePages.size;
    current.outboundSitemapPageLinks = destinations.size;
    current.reciprocalContextualPages = reciprocal.length;
    current.outgoingNotInSitemapPaths = [...unresolved.get(path)].sort();
    current.inboundContextualExamples = [...sourcePages].sort().slice(0, 8);
    current.linkGraphFlags = flagged;
    const counters = byFamily[current.family] ??= { pages: 0, noInbound: 0, noReciprocal: 0, linkedPathsOutsideSitemap: 0 };
    counters.pages++;
    if (noInbound) counters.noInbound++;
    if (noReciprocal) counters.noReciprocal++;
    if (unresolved.get(path).size) counters.linkedPathsOutsideSitemap++;
    if (noInbound || unresolved.get(path).size) {
      unattestedCandidates.push({ path, family: current.family, priority: current.priority, noInbound, outboundLinks: destinations.size, unresolvedPaths: current.outgoingNotInSitemapPaths.slice(0, 8) });
    }
  }
  unattestedCandidates.sort((a,b) => a.priority - b.priority || (b.unresolvedPaths.length - a.unresolvedPaths.length) || a.path.localeCompare(b.path));
  return { totals: { pages: byPath.size, noInbound: Object.values(byFamily).reduce((n,x)=>n+x.noInbound,0), noReciprocal: Object.values(byFamily).reduce((n,x)=>n+x.noReciprocal,0), pagesWithUnsitemappedLinks: Object.values(byFamily).reduce((n,x)=>n+x.linkedPathsOutsideSitemap,0) }, byFamily, reviewCandidates: unattestedCandidates };
}
