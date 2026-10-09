import fs from 'node:fs/promises';

const ORIGIN = new URL(process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').origin;
const USER_AGENT = 'TexasDefinedInternalLinkGraphAudit/1.0 (+https://texasdefined.com)';
const CONCURRENCY = Math.max(1, Math.min(20, Number(process.env.INTERNAL_LINK_AUDIT_CONCURRENCY || 8)));
const TIMEOUT_MS = Math.max(5_000, Number(process.env.INTERNAL_LINK_AUDIT_TIMEOUT_MS || 25_000));
const RETRIES = Math.max(1, Math.min(4, Number(process.env.INTERNAL_LINK_AUDIT_RETRIES || 2)));
const STRICT = process.env.INTERNAL_LINK_AUDIT_STRICT === '1';
const OUT_JSON = process.env.INTERNAL_LINK_AUDIT_JSON || 'internal-link-graph-audit.json';
const OUT_MD = process.env.INTERNAL_LINK_AUDIT_MD || 'internal-link-graph-audit.md';

const DELIBERATE_ZERO_INBOUND = new Set(['/']);
const SKIP_TARGET_RE = /^(?:\/(?:api|admin|_build|_assets|cdn-cgi)(?:\/|$))|(?:.*\.(?:avif|css|gif|ico|jpe?g|js|json|map|mp4|pdf|png|svg|txt|webm|webp|xml))$/i;
const HIGH_VALUE_RE = /^\/(?:article|destination|event|fishing|county|city|sports-venue|moving-to-texas|texas-vs|compare-texas-cities)(?:\/|$)/;
const MAJOR_HUB_PATHS = new Set([
  '/', '/explore', '/events', '/fishing', '/moving-to-texas', '/guides',
  '/county', '/browse/counties', '/browse/cities', '/sports', '/shop'
]);

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function decodeEntities(value='') {
  return value
    .replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'")
    .replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')
    .replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
}
function attrFromTag(tag,name) {
  const match=tag.match(new RegExp('\\b'+name+'=["\\\']([^"\\\']*)["\\\']','i'));
  return match ? decodeEntities(match[1]) : '';
}
function metaContent(html,name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi)||[]) {
    if (attrFromTag(tag,'name').toLowerCase()===name.toLowerCase()) return attrFromTag(tag,'content').trim();
  }
  return '';
}
function normalizePath(pathname) {
  let value=pathname.replace(/\/{2,}/g,'/');
  if (value.length>1) value=value.replace(/\/+$/,'');
  return value || '/';
}
function canonicalInternalUrl(raw, base) {
  if (!raw || /^\s*(?:#|mailto:|tel:|javascript:|data:)/i.test(raw)) return null;
  try {
    const url=new URL(decodeEntities(raw),base);
    if (url.origin!==ORIGIN) return null;
    url.hash=''; url.search='';
    url.pathname=normalizePath(url.pathname);
    return url.origin+url.pathname;
  } catch { return null; }
}
function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match)=>decodeEntities(match[1].trim()));
}
function extractInternalAnchors(html,base) {
  const urls=new Set();
  for (const tag of html.match(/<a\b[^>]*>/gi)||[]) {
    const href=attrFromTag(tag,'href');
    const url=canonicalInternalUrl(href,base);
    if (url) urls.add(url);
  }
  return [...urls];
}
async function fetchText(url) {
  let lastError;
  for (let attempt=1; attempt<=RETRIES; attempt+=1) {
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),TIMEOUT_MS);
    try {
      const response=await fetch(url,{
        redirect:'follow',
        headers:{'user-agent':USER_AGENT,accept:'text/html,application/xml;q=0.9,*/*;q=0.8'},
        signal:controller.signal,
      });
      const body=await response.text();
      clearTimeout(timer);
      if (response.status>=500 && attempt<RETRIES) { await sleep(350*attempt); continue; }
      return {response,body};
    } catch (error) {
      clearTimeout(timer);
      lastError=error;
      if (attempt<RETRIES) { await sleep(350*attempt); continue; }
    }
  }
  throw lastError;
}
async function discoverSitemaps() {
  const urls=new Set([ORIGIN+'/sitemap.xml',ORIGIN+'/sitemap-explore.xml']);
  try {
    const result=await fetchText(ORIGIN+'/robots.txt');
    if (result.response.ok) {
      for (const match of result.body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) {
        const url=new URL(match[1].trim(),ORIGIN);
        if (url.origin===ORIGIN) urls.add(url.href);
      }
    }
  } catch {}
  return [...urls];
}
async function collectSitemapPages() {
  const pending=await discoverSitemaps();
  const seen=new Set(), failures=[], pages=new Set();
  while (pending.length) {
    const sitemap=pending.shift();
    if (!sitemap || seen.has(sitemap)) continue;
    seen.add(sitemap);
    try {
      const {response,body}=await fetchText(sitemap);
      if (!response.ok) { failures.push({sitemap,status:response.status}); continue; }
      for (const loc of sitemapLocs(body)) {
        const url=new URL(loc,ORIGIN);
        if (url.origin!==ORIGIN) continue;
        if (/\.xml$/i.test(url.pathname)) pending.push(url.href);
        else pages.add(url.origin+normalizePath(url.pathname));
      }
    } catch (error) {
      failures.push({sitemap,status:0,error:error instanceof Error?error.message:String(error)});
    }
  }
  return {pages:[...pages].sort(),sitemaps:[...seen],failures};
}
async function mapLimit(items,limit,fn) {
  const results=new Array(items.length);
  let cursor=0,finished=0;
  async function worker() {
    while (true) {
      const index=cursor++;
      if (index>=items.length) return;
      results[index]=await fn(items[index],index);
      finished+=1;
      if (finished%100===0 || finished===items.length) console.log('Audited '+finished+'/'+items.length);
    }
  }
  await Promise.all(Array.from({length:Math.min(limit,Math.max(1,items.length))},worker));
  return results;
}
async function inspectPage(url) {
  try {
    const {response,body}=await fetchText(url);
    const final=canonicalInternalUrl(response.url,url) || url;
    const contentType=(response.headers.get('content-type')||'').toLowerCase();
    const html=response.ok && contentType.includes('text/html');
    const robots=html ? metaContent(body,'robots').toLowerCase() : '';
    return {
      url,
      status:response.status,
      finalUrl:final,
      redirected:normalizePath(new URL(final).pathname)!==normalizePath(new URL(url).pathname),
      indexable:response.ok && html && !robots.includes('noindex'),
      anchors:html ? extractInternalAnchors(body,url) : [],
    };
  } catch (error) {
    return {url,status:0,finalUrl:url,redirected:false,indexable:false,anchors:[],error:error instanceof Error?error.message:String(error)};
  }
}
function markdownList(items,render,limit=100) {
  if (!items.length) return '- None';
  const shown=items.slice(0,limit).map((item)=>'- '+render(item));
  if (items.length>limit) shown.push('- … '+(items.length-limit)+' more in the JSON artifact');
  return shown.join('\n');
}

const discovery=await collectSitemapPages();
console.log('Discovered '+discovery.pages.length+' sitemap-listed page URLs across '+discovery.sitemaps.length+' sitemap(s).');
const pageResults=await mapLimit(discovery.pages,CONCURRENCY,inspectPage);
const indexable=pageResults.filter((page)=>page.indexable);
const indexableByUrl=new Map(indexable.map((page)=>[page.url,page]));
const inbound=new Map(indexable.map((page)=>[page.url,new Set()]));
const outbound=new Map(indexable.map((page)=>[page.url,new Set()]));
const allTargets=new Map();

for (const source of indexable) {
  const sourceOutbound=outbound.get(source.url);
  for (const target of source.anchors) {
    const targetPath=normalizePath(new URL(target).pathname);
    if (SKIP_TARGET_RE.test(targetPath)) continue;
    const sources=allTargets.get(target) || new Set();
    sources.add(source.url);
    allTargets.set(target,sources);
    if (indexableByUrl.has(target) && target!==source.url) {
      sourceOutbound.add(target);
      inbound.get(target).add(source.url);
    }
  }
}

const unresolvedTargets=[...allTargets.keys()].filter((target)=>!indexableByUrl.has(target));
const unresolvedChecks=await mapLimit(unresolvedTargets,CONCURRENCY,inspectPage);
const linkChecks=new Map(pageResults.map((page)=>[page.url,page]));
for (const page of unresolvedChecks) linkChecks.set(page.url,page);

const brokenInternalLinks=[];
const redirectedInternalLinks=[];
for (const [target,sources] of allTargets) {
  const check=linkChecks.get(target);
  if (!check || check.status===0 || check.status>=400) {
    brokenInternalLinks.push({target,status:check?.status||0,sources:[...sources].sort()});
  } else if (check.redirected) {
    redirectedInternalLinks.push({target,finalUrl:check.finalUrl,status:check.status,sources:[...sources].sort()});
  }
}
brokenInternalLinks.sort((a,b)=>b.sources.length-a.sources.length||a.target.localeCompare(b.target));
redirectedInternalLinks.sort((a,b)=>b.sources.length-a.sources.length||a.target.localeCompare(b.target));

const pageGraph=indexable.map((page)=>{
  const inboundSources=[...(inbound.get(page.url)||[])].sort();
  const outboundTargets=[...(outbound.get(page.url)||[])].sort();
  const pathname=normalizePath(new URL(page.url).pathname);
  return {url:page.url,pathname,inboundCount:inboundSources.length,inboundSources,outboundIndexableCount:outboundTargets.length,outboundTargets};
}).sort((a,b)=>a.pathname.localeCompare(b.pathname));

const zeroInbound=pageGraph.filter((page)=>page.inboundCount===0 && !DELIBERATE_ZERO_INBOUND.has(page.pathname));
const exactlyOneInbound=pageGraph.filter((page)=>page.inboundCount===1);
const twoToThreeInbound=pageGraph.filter((page)=>page.inboundCount>=2 && page.inboundCount<=3);
const aboveThreeInbound=pageGraph.filter((page)=>page.inboundCount>3);
const highValueWeak=pageGraph.filter((page)=>HIGH_VALUE_RE.test(page.pathname) && page.inboundCount<=1);
const sitemapOnlyCandidates=zeroInbound.slice();
const weakHubs=pageGraph
  .filter((page)=>MAJOR_HUB_PATHS.has(page.pathname) || /^\/(?:explore|fishing|events)\/[^/]+$/.test(page.pathname))
  .filter((page)=>page.outboundIndexableCount<10)
  .sort((a,b)=>a.outboundIndexableCount-b.outboundIndexableCount||a.pathname.localeCompare(b.pathname));

const summary={
  totalSitemapPages:discovery.pages.length,
  totalIndexablePages:indexable.length,
  deliberateZeroInboundExceptions:pageGraph.filter((page)=>page.inboundCount===0 && DELIBERATE_ZERO_INBOUND.has(page.pathname)).length,
  zeroInboundPages:zeroInbound.length,
  exactlyOneInboundPages:exactlyOneInbound.length,
  twoToThreeInboundPages:twoToThreeInbound.length,
  aboveThreeInboundPages:aboveThreeInbound.length,
  brokenInternalTargets:brokenInternalLinks.length,
  redirectedInternalTargets:redirectedInternalLinks.length,
  sitemapOnlyCandidates:sitemapOnlyCandidates.length,
  weakMajorHubs:weakHubs.length,
  highValuePagesWithAtMostOneInbound:highValueWeak.length,
  sitemapFailures:discovery.failures.length,
};

const report={
  generatedAt:new Date().toISOString(),
  origin:ORIGIN,
  summary,
  deliberateZeroInboundExceptions:[...DELIBERATE_ZERO_INBOUND],
  sitemaps:discovery.sitemaps,
  sitemapFailures:discovery.failures,
  zeroInbound,
  exactlyOneInbound,
  twoToThreeInbound,
  weakHubs,
  highValueWeak,
  brokenInternalLinks,
  redirectedInternalLinks,
  pages:pageGraph,
};
await fs.writeFile(OUT_JSON,JSON.stringify(report,null,2)+'\n');

const md=[
  '# TexasDefined production internal-link graph audit',
  '',
  'Generated: '+report.generatedAt,
  '',
  'This audit crawls crawlable SSR anchor links from every sitemap-listed, indexable production page. The homepage is the only deliberate zero-inbound exception.',
  '',
  '## Summary',
  '',
  '| Metric | Count |',
  '|---|---:|',
  '| Sitemap-listed pages | '+summary.totalSitemapPages+' |',
  '| Indexable pages audited | '+summary.totalIndexablePages+' |',
  '| 0 inbound links (excluding documented exceptions) | '+summary.zeroInboundPages+' |',
  '| Exactly 1 inbound link | '+summary.exactlyOneInboundPages+' |',
  '| 2–3 inbound links | '+summary.twoToThreeInboundPages+' |',
  '| More than 3 inbound links | '+summary.aboveThreeInboundPages+' |',
  '| Broken internal targets | '+summary.brokenInternalTargets+' |',
  '| Redirected internal targets | '+summary.redirectedInternalTargets+' |',
  '| Sitemap-only / filter-search-only candidates | '+summary.sitemapOnlyCandidates+' |',
  '| Weak major hubs (<10 indexable outbound links) | '+summary.weakMajorHubs+' |',
  '| High-value pages with ≤1 inbound link | '+summary.highValuePagesWithAtMostOneInbound+' |',
  '| Sitemap failures | '+summary.sitemapFailures+' |',
  '',
  '## Zero-inbound pages',
  '',
  markdownList(zeroInbound,(item)=>item.pathname),
  '',
  '## Exactly-one-inbound high-value pages',
  '',
  markdownList(highValueWeak.filter((item)=>item.inboundCount===1),(item)=>item.pathname+' ← '+item.inboundSources[0]),
  '',
  '## Broken internal targets',
  '',
  markdownList(brokenInternalLinks,(item)=>item.status+' '+item.target+' ← '+item.sources.length+' source page(s)'),
  '',
  '## Redirected internal targets',
  '',
  markdownList(redirectedInternalLinks,(item)=>item.target+' → '+item.finalUrl+' ← '+item.sources.length+' source page(s)'),
  '',
  '## Weak major hubs',
  '',
  markdownList(weakHubs,(item)=>item.pathname+' — '+item.outboundIndexableCount+' indexable outbound links'),
  '',
  'Full page-level graph data is in '+OUT_JSON+'.',
  '',
].join('\n');
await fs.writeFile(OUT_MD,md);
console.log(JSON.stringify(summary,null,2));

if (STRICT && (discovery.failures.length || zeroInbound.length || brokenInternalLinks.length || redirectedInternalLinks.length)) {
  console.error('Internal-link graph strict audit failed.');
  process.exit(1);
}
