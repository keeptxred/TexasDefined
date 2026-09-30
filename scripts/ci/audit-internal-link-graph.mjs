import fs from 'node:fs/promises';

const ORIGIN = process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com';
const USER_AGENT = 'TexasDefinedInternalLinkGraphAudit/1.1 (+https://texasdefined.com)';
const CONCURRENCY = Number(process.env.INTERNAL_LINK_AUDIT_CONCURRENCY || 6);
const TIMEOUT_MS = Number(process.env.INTERNAL_LINK_AUDIT_TIMEOUT_MS || 30000);
const OUT_JSON = process.env.INTERNAL_LINK_AUDIT_JSON || '/tmp/texasdefined-internal-link-graph.json';
const OUT_TSV = process.env.INTERNAL_LINK_AUDIT_TSV || '/tmp/texasdefined-internal-link-graph.tsv';
const OUT_MD = process.env.INTERNAL_LINK_AUDIT_MD || '/tmp/texasdefined-internal-link-graph.md';
const FAIL_ON_BROKEN = process.env.INTERNAL_LINK_FAIL_ON_BROKEN === '1';
const FAIL_ON_ORPHANS = process.env.INTERNAL_LINK_FAIL_ON_ORPHANS === '1';
const MAX_ORPHANS = Number(process.env.INTERNAL_LINK_MAX_ORPHANS || 0);
const GENERIC_ANCHOR_RE = /^(?:read more|learn more|more|details|click here|here|related|related content|view|open|continue)$/i;

function decodeEntities(value = '') {
  return value.replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}
function stripTags(value = '') {
  return decodeEntities(value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
  return match ? decodeEntities(match[1]) : '';
}
function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeEntities(match[1].trim()));
}
function normalizedPath(input) {
  try {
    const url = new URL(input, ORIGIN);
    if (url.origin !== new URL(ORIGIN).origin) return null;
    let path = url.pathname.replace(/\/{2,}/g, '/');
    if (path.length > 1) path = path.replace(/\/$/, '');
    return path + (url.search && !url.searchParams.has('utm_source') ? url.search : '');
  } catch { return null; }
}
function familyFor(pathname) {
  const rules = [
    ['articles', /^\/article\//], ['counties', /^\/(?:county\/|browse\/counties)/], ['cities', /^\/(?:city\/|browse\/cities|compare-texas-cities)/],
    ['destinations', /^\/destination\//], ['small-towns', /^\/explore\/small-towns/], ['state-parks', /^\/explore\/(?:state-parks|parks)|^\/state-park\//],
    ['lakes', /^\/(?:lake\/|explore\/lakes|fishing\/lakes)/], ['rivers', /^\/(?:river\/|explore\/rivers|explore\/lakes-rivers)/], ['fishing', /^\/fishing(?:\/|$)/],
    ['events', /^\/event(?:s|\/|$)/], ['road-trips', /^\/(?:road-trips?|explore\/road-trips)/], ['history', /^\/(?:history|texas-history|historic-site|mission|battlefield|museum)(?:\/|$)/],
    ['relocation', /^\/(?:moving-to-texas|texas-vs|compare-texas-cities|relocation|cost-of-living|find-my-|texas-home|texas-salary)/], ['food', /^\/(?:food|explore\/food-bbq)(?:\/|$)/],
    ['sports', /^\/(?:sports(?:\/|$)|sports-venues?(?:\/|$)|texas-high-school-football(?:-|\/|$)|high-school-football(?:\/|$)|football(?:\/|$))/],
    ['guides-tools', /^\/(?:guides|tools|calculators?|property-tax|learn|do)(?:\/|$)/], ['explore', /^\/explore(?:\/|$)/],
  ];
  return rules.find(([, re]) => re.test(pathname))?.[0] || 'other';
}
async function fetchText(url, attempts = 2) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(url, { headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xml;q=0.9,*/*;q=0.8' }, redirect: 'follow', signal: controller.signal });
      const body = await response.text(); clearTimeout(timer);
      if (response.status >= 500 && attempt < attempts) continue;
      return { response, body };
    } catch (error) { clearTimeout(timer); lastError = error; if (attempt === attempts) throw error; }
  }
  throw lastError;
}
async function discoverSitemaps() {
  const urls = new Set([`${ORIGIN}/sitemap.xml`, `${ORIGIN}/sitemap-explore.xml`]);
  try { const { response, body } = await fetchText(`${ORIGIN}/robots.txt`, 1); if (response.ok) for (const match of body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) urls.add(match[1].trim()); } catch {}
  return [...urls];
}
async function collectSitemapUrls() {
  const pending = await discoverSitemaps(); const seenSitemaps = new Set(); const pages = new Set(); const failures = [];
  while (pending.length) {
    const sitemap = pending.shift(); if (!sitemap || seenSitemaps.has(sitemap)) continue; seenSitemaps.add(sitemap);
    try {
      const { response, body } = await fetchText(sitemap); if (!response.ok) { failures.push({ sitemap, status: response.status }); continue; }
      for (const loc of sitemapLocs(body)) {
        const url = new URL(loc, ORIGIN); if (url.origin !== new URL(ORIGIN).origin) continue;
        if (/\.xml(?:$|\?)/i.test(url.pathname)) pending.push(url.href); else { const path = normalizedPath(url.href); if (path) pages.add(path); }
      }
    } catch (error) { failures.push({ sitemap, status: 0, error: error?.message || String(error) }); }
  }
  return { pages: [...pages].sort(), sitemaps: [...seenSitemaps], failures };
}
function extractAnchors(html, sourcePath) {
  const links = [];
  for (const tag of html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || []) {
    const href = attr(tag, 'href').trim(); if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(href)) continue;
    const target = normalizedPath(href); if (!target) continue;
    links.push({ source: sourcePath, target, text: stripTags(tag), nofollow: /\bnofollow\b/i.test(attr(tag, 'rel')) });
  }
  return links;
}
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length); let cursor = 0;
  async function worker() { while (true) { const index = cursor++; if (index >= items.length) return; results[index] = await fn(items[index], index); } }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker)); return results;
}
async function crawlPage(path) {
  try {
    const { response, body } = await fetchText(`${ORIGIN}${path}`); const finalPath = normalizedPath(response.url);
    const html = (response.headers.get('content-type') || '').toLowerCase().includes('text/html');
    return { path, status: response.status, finalPath, links: response.ok && html ? extractAnchors(body, path) : [], error: null };
  } catch (error) { return { path, status: 0, finalPath: null, links: [], error: error?.message || String(error) }; }
}
function uniqueLinks(links) {
  const seen = new Set();
  return links.filter((link) => { if (link.nofollow) return false; const key = `${link.source}\u0000${link.target}`; if (seen.has(key)) return false; seen.add(key); return true; });
}
function bfs(root, adjacency) {
  const seen = new Set(); const queue = [root];
  while (queue.length) { const node = queue.shift(); if (!node || seen.has(node)) continue; seen.add(node); for (const next of adjacency.get(node) || []) if (!seen.has(next)) queue.push(next); }
  return seen;
}
function markdownReport(summary, familyRows, orphans, weak, broken, redirected, genericAnchors, highInLowOut) {
  const lines = ['# TexasDefined internal-link graph audit','',`Audited: ${summary.auditedAt}`,`Origin: ${summary.origin}`,'','## Site-wide graph','',
    `- Sitemap pages: **${summary.pages}**`,`- Crawl-support pages: **${summary.supportPages}**`,`- Internal edges: **${summary.edges}**`,`- Orphan pages (0 inbound from crawlable pages): **${summary.orphans}**`,
    `- Weak pages (<=1 inbound or <3 outbound-to-indexable): **${summary.weakPages}**`,`- Unreachable from / through crawlable links: **${summary.unreachableFromRoot}**`,
    `- Broken internal targets: **${summary.brokenTargets}**`,`- Redirected internal targets: **${summary.redirectedTargets}**`,`- Generic-anchor links: **${summary.genericAnchorLinks}**`,'',
    '## Topic families','', '| Family | Pages | Orphans | Weak | Avg inbound | Avg outbound |','| --- | ---: | ---: | ---: | ---: | ---: |',
    ...familyRows.map((row) => `| ${row.family} | ${row.pages} | ${row.orphans} | ${row.weak} | ${row.avgInbound} | ${row.avgOutbound} |`),''];
  const section = (title, rows, render) => { lines.push(`## ${title}`,''); if (!rows.length) lines.push('None.'); else rows.slice(0,100).forEach((row) => lines.push(`- ${render(row)}`)); lines.push(''); };
  section('Orphan pages', orphans, (row) => `${row.path} (${row.family}; out ${row.outbound})`); section('Weak pages', weak, (row) => `${row.path} (${row.family}; in ${row.inbound}, out ${row.outbound})`);
  section('Many-in / few-out pages', highInLowOut, (row) => `${row.path} (in ${row.inbound}, out ${row.outbound})`); section('Broken internal targets', broken, (row) => `${row.target} (${row.status || row.error}) linked from ${row.sources.slice(0,5).join(', ')}`);
  section('Redirected internal targets', redirected, (row) => `${row.target} → ${row.finalPath} linked from ${row.sources.slice(0,5).join(', ')}`); section('Generic anchor examples', genericAnchors, (row) => `“${row.text}” ${row.source} → ${row.target}`);
  return `${lines.join('\n')}\n`;
}

const auditedAt = new Date().toISOString();
const { pages, sitemaps, failures: sitemapFailures } = await collectSitemapUrls(); const sitemapSet = new Set(pages);
console.log(`Internal-link graph: crawling ${pages.length} sitemap pages from ${sitemaps.length} sitemap(s).`);
const sitemapCrawls = await mapLimit(pages, CONCURRENCY, crawlPage); const sitemapLinks = uniqueLinks(sitemapCrawls.flatMap((row) => row.links));
const firstHopTargets = [...new Set(sitemapLinks.map((link) => link.target))].filter((target) => !sitemapSet.has(target) && target !== '/').sort();
console.log(`Internal-link graph: checking ${firstHopTargets.length} first-hop non-sitemap targets for crawl support and target health.`);
const firstHopCrawls = await mapLimit(firstHopTargets, CONCURRENCY, crawlPage);
const canonicalSupportCrawls = firstHopCrawls.filter((row) => row.status >= 200 && row.status < 300 && row.finalPath === row.path);
const supportLinks = uniqueLinks(canonicalSupportCrawls.flatMap((row) => row.links)); const edges = uniqueLinks([...sitemapLinks, ...supportLinks]);
const inbound = new Map(pages.map((path) => [path, new Set()])); const outbound = new Map(pages.map((path) => [path, new Set()])); const adjacency = new Map(); const targetSources = new Map();
for (const link of edges) {
  const adjacent = adjacency.get(link.source) || new Set(); adjacent.add(link.target); adjacency.set(link.source, adjacent);
  if (sitemapSet.has(link.target)) inbound.get(link.target)?.add(link.source); if (sitemapSet.has(link.source) && sitemapSet.has(link.target)) outbound.get(link.source)?.add(link.target);
  const sources = targetSources.get(link.target) || new Set(); sources.add(link.source); targetSources.set(link.target, sources);
}
const rows = pages.map((path) => ({ path, family: familyFor(path), inbound: inbound.get(path)?.size || 0, outbound: outbound.get(path)?.size || 0 }));
const orphans = rows.filter((row) => row.path !== '/' && row.inbound === 0).sort((a,b) => a.family.localeCompare(b.family) || a.path.localeCompare(b.path));
const weak = rows.filter((row) => row.path !== '/' && (row.inbound <= 1 || row.outbound < 3)).sort((a,b) => a.inbound-b.inbound || a.outbound-b.outbound || a.path.localeCompare(b.path));
const reachable = bfs('/', adjacency); const unreachable = rows.filter((row) => row.path !== '/' && !reachable.has(row.path)); const highInLowOut = rows.filter((row) => row.inbound >= 10 && row.outbound < 3).sort((a,b) => b.inbound-a.inbound);
const genericAnchors = edges.filter((link) => GENERIC_ANCHOR_RE.test(link.text.trim())).slice(0,500); const firstHopByPath = new Map(firstHopCrawls.map((row) => [row.path,row]));
const checkedTargets = firstHopTargets.map((target) => { const row = firstHopByPath.get(target); return { target, status: row?.status ?? 0, finalPath: row?.finalPath ?? null, error: row?.error ?? null, sources: [...(targetSources.get(target) || [])] }; });
const broken = checkedTargets.filter((row) => row.status === 0 || row.status >= 400); const redirected = checkedTargets.filter((row) => row.status > 0 && row.status < 400 && row.finalPath && row.finalPath !== row.target);
const families = [...new Set(rows.map((row) => row.family))].sort();
const familyRows = families.map((family) => { const familyPages = rows.filter((row) => row.family === family); return { family, pages: familyPages.length, orphans: familyPages.filter((row) => row.path !== '/' && row.inbound===0).length, weak: familyPages.filter((row) => row.path !== '/' && (row.inbound<=1 || row.outbound<3)).length, avgInbound: Number((familyPages.reduce((sum,row)=>sum+row.inbound,0)/Math.max(1,familyPages.length)).toFixed(1)), avgOutbound: Number((familyPages.reduce((sum,row)=>sum+row.outbound,0)/Math.max(1,familyPages.length)).toFixed(1)) }; });
const summary = { auditedAt, origin: ORIGIN, pages: pages.length, supportPages: canonicalSupportCrawls.length, edges: edges.length, orphans: orphans.length, weakPages: weak.length, unreachableFromRoot: unreachable.length, brokenTargets: broken.length, redirectedTargets: redirected.length, genericAnchorLinks: genericAnchors.length, sitemapFailures: sitemapFailures.length };
const report = { summary, sitemaps, sitemapFailures, families: familyRows, orphans, weak, unreachable, highInLowOut, broken, redirected, genericAnchors, pages: rows };
await fs.writeFile(OUT_JSON, `${JSON.stringify(report,null,2)}\n`); await fs.writeFile(OUT_TSV, [['path','family','inbound','outbound'],...rows.map((row)=>[row.path,row.family,row.inbound,row.outbound])].map((row)=>row.join('\t')).join('\n')+'\n'); await fs.writeFile(OUT_MD, markdownReport(summary,familyRows,orphans,weak,broken,redirected,genericAnchors,highInLowOut));
console.log(JSON.stringify({ summary, families: familyRows },null,2));
if (sitemapFailures.length) { console.error(`FAIL: ${sitemapFailures.length} sitemap(s) could not be audited.`); process.exit(1); }
if (FAIL_ON_BROKEN && broken.length) { console.error(`FAIL: ${broken.length} broken internal target(s).`); process.exit(1); }
if (FAIL_ON_ORPHANS && orphans.length > MAX_ORPHANS) { console.error(`FAIL: ${orphans.length} orphan page(s) exceed allowed ${MAX_ORPHANS}.`); process.exit(1); }
console.log('PASS: internal-link graph report generated.');
