import fs from 'node:fs/promises';

const ORIGIN = process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com';
const USER_AGENT = 'TexasDefinedInternalLinkGraphAudit/1.1 (+https://texasdefined.com)';
const CONCURRENCY = Number(process.env.LINK_GRAPH_CONCURRENCY || 6);
const TIMEOUT_MS = Number(process.env.LINK_GRAPH_TIMEOUT_MS || 30000);
const WEAK_INBOUND_THRESHOLD = Number(process.env.LINK_GRAPH_WEAK_INBOUND_THRESHOLD || 1);
const MAX_UNLISTED_CHECKS = Number(process.env.LINK_GRAPH_MAX_UNLISTED_CHECKS || 2500);
const MAX_PAGE_FETCH_FAILURES = Number(process.env.LINK_GRAPH_MAX_PAGE_FETCH_FAILURES || 3);
const OUT_JSON = process.env.LINK_GRAPH_JSON || '/tmp/texasdefined-link-graph.json';
const OUT_TSV = process.env.LINK_GRAPH_TSV || '/tmp/texasdefined-link-graph.tsv';

function decodeEntities(value='') {
  return value
    .replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')
    .replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'")
    .replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
}
function attrFromTag(tag,name) {
  const match = tag.match(new RegExp('\\b'+name+'=["\\\']([^"\\\']*)["\\\']','i'));
  return match ? decodeEntities(match[1]) : '';
}
function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match)=>decodeEntities(match[1].trim()));
}
function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/{2,}/g,'/').replace(/\/$/,'') || '/';
}
function pageKey(value) {
  const url = new URL(value, ORIGIN);
  return normalizePathname(url.pathname);
}
function familyFor(pathname) {
  if (pathname === '/') return 'home';
  const rules = [
    ['articles','/article/'],['destinations','/destination/'],['events','/event/'],['fishing','/fishing'],
    ['counties','/county/'],['cities','/city/'],['sports','/sports'],['relocation','/moving-to-texas'],
    ['relocation','/texas-vs/'],['relocation','/compare-texas-cities'],['explore','/explore'],['guides','/guides'],
    ['food','/food'],['history','/history'],['tools','/texas-'],['browse','/browse/'],
  ];
  return rules.find(([,prefix])=>pathname.startsWith(prefix))?.[0] || 'other';
}
function extractInternalTargets(html, sourceUrl) {
  const origin = new URL(ORIGIN).origin;
  const targets = new Set();
  for (const tag of html.match(/<a\b[^>]*>/gi) || []) {
    const href = attrFromTag(tag,'href').trim();
    if (!href || href.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    try {
      const url = new URL(href, sourceUrl);
      if (url.origin !== origin) continue;
      if (/^\/api(?:\/|$)/.test(url.pathname)) continue;
      url.hash = '';
      url.search = '';
      targets.add(normalizePathname(url.pathname));
    } catch {}
  }
  return [...targets];
}
async function fetchText(url, { attempts=2, redirect='follow' } = {}) {
  let lastError;
  for (let attempt=1; attempt<=attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(url,{headers:{'user-agent':USER_AGENT,accept:'text/html,application/xml;q=0.9,*/*;q=0.8'},redirect,signal:controller.signal});
      const body = redirect === 'manual' && response.status !== 200 ? '' : await response.text();
      clearTimeout(timer);
      if (response.status >= 500 && attempt < attempts) continue;
      return { response, body };
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (attempt === attempts) throw error;
    }
  }
  throw lastError;
}
async function discoverSitemaps() {
  const urls = new Set([ORIGIN+'/sitemap.xml',ORIGIN+'/sitemap-explore.xml']);
  try {
    const {response,body}=await fetchText(ORIGIN+'/robots.txt',{attempts:2});
    if (response.ok) for (const match of body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) urls.add(match[1].trim());
  } catch {}
  return [...urls];
}
async function collectUrls() {
  const pending=await discoverSitemaps(), seenSitemaps=new Set(), sitemapFailures=[], pageUrls=new Set();
  while (pending.length) {
    const sitemap=pending.shift();
    if (!sitemap || seenSitemaps.has(sitemap)) continue;
    seenSitemaps.add(sitemap);
    let response,body;
    try { ({response,body}=await fetchText(sitemap,{attempts:3})); }
    catch (error) { sitemapFailures.push({sitemap,status:0,error:error?.message||String(error)}); continue; }
    if (!response.ok) { sitemapFailures.push({sitemap,status:response.status,error:'HTTP '+response.status}); continue; }
    for (const loc of sitemapLocs(body)) {
      const url=new URL(loc,ORIGIN);
      if (url.origin!==new URL(ORIGIN).origin) continue;
      if (/\.xml(?:$|\?)/i.test(url.pathname)) pending.push(url.href);
      else pageUrls.add(url.href.replace(/#.*$/,''));
    }
  }
  return { pageUrls:[...pageUrls].sort(), sitemaps:[...seenSitemaps], sitemapFailures };
}
async function mapLimit(items,limit,fn) {
  const results=new Array(items.length); let cursor=0;
  async function worker(){ while(true){ const index=cursor++; if(index>=items.length)return; results[index]=await fn(items[index],index); if((index+1)%100===0)console.log('Link-audited '+(index+1)+'/'+items.length); } }
  await Promise.all(Array.from({length:Math.max(1,Math.min(limit,items.length))},worker));
  return results;
}
async function crawlPage(url) {
  try {
    const {response,body}=await fetchText(url,{attempts:3});
    const contentType=response.headers.get('content-type')||'';
    if (response.status!==200 || !contentType.toLowerCase().includes('text/html')) return {url,status:response.status,targets:[],error:response.status===200?'non-html':'HTTP '+response.status};
    return {url,status:response.status,targets:extractInternalTargets(body,response.url),error:''};
  } catch (error) {
    return {url,status:0,targets:[],error:error?.message||String(error)};
  }
}
async function inspectInternalTarget(pathname) {
  const url = new URL(pathname,ORIGIN).href;
  try {
    const {response,body}=await fetchText(url,{attempts:2,redirect:'manual'});
    const contentType=response.headers.get('content-type')||'';
    const targets=response.status===200&&contentType.toLowerCase().includes('text/html')
      ? extractInternalTargets(body,url)
      : [];
    return {pathname,status:response.status,location:response.headers.get('location')||'',targets,error:''};
  } catch (error) {
    return {pathname,status:0,location:'',targets:[],error:error?.message||String(error)};
  }
}
function addTargetSource(targetSources,target,source) {
  const sources=targetSources.get(target)??new Set();
  sources.add(source);
  targetSources.set(target,sources);
}

const {pageUrls,sitemaps,sitemapFailures}=await collectUrls();
const sitemapKeys=new Set(pageUrls.map(pageKey));
console.log('Discovered '+pageUrls.length+' sitemap-listed pages across '+sitemaps.length+' sitemap(s).');
const crawled=await mapLimit(pageUrls,CONCURRENCY,crawlPage);
const fetchFailures=crawled.filter((page)=>page.error);

const inbound=new Map([...sitemapKeys].map((key)=>[key,new Set()]));
const outbound=new Map([...sitemapKeys].map((key)=>[key,new Set()]));
const allInternalTargets=new Set();
const targetSources=new Map();
for (const page of crawled) {
  const source=pageKey(page.url);
  for (const target of page.targets) {
    allInternalTargets.add(target);
    addTargetSource(targetSources,target,source);
    if (target===source) continue;
    if (!sitemapKeys.has(target)) continue;
    outbound.get(source)?.add(target);
    inbound.get(target)?.add(source);
  }
}

const allUnlistedTargets=[...allInternalTargets].filter((target)=>!sitemapKeys.has(target)).sort();
const unlistedTargets=allUnlistedTargets.slice(0,MAX_UNLISTED_CHECKS);
const checkedTargets=await mapLimit(unlistedTargets,CONCURRENCY,inspectInternalTarget);
const crawlableUnlistedPages=checkedTargets.filter((item)=>item.status===200&&item.targets.length);
for (const page of crawlableUnlistedPages) {
  for (const target of page.targets) {
    allInternalTargets.add(target);
    addTargetSource(targetSources,target,page.pathname);
    if (!sitemapKeys.has(target)||target===page.pathname) continue;
    inbound.get(target)?.add(page.pathname);
  }
}

const rows=[...sitemapKeys].map((pathname)=>({
  pathname,
  url:new URL(pathname,ORIGIN).href,
  family:familyFor(pathname),
  inboundCount:inbound.get(pathname)?.size||0,
  outboundCount:outbound.get(pathname)?.size||0,
  inboundFrom:[...(inbound.get(pathname)||[])].sort(),
  outboundTo:[...(outbound.get(pathname)||[])].sort(),
})).sort((a,b)=>a.inboundCount-b.inboundCount||a.pathname.localeCompare(b.pathname));
const orphanPages=rows.filter((row)=>row.inboundCount===0);
const weakPages=rows.filter((row)=>row.inboundCount>0&&row.inboundCount<=WEAK_INBOUND_THRESHOLD);
const strongPages=rows.filter((row)=>row.inboundCount>WEAK_INBOUND_THRESHOLD);

const familySummary={};
for (const row of rows) {
  const bucket=familySummary[row.family]??={pages:0,orphans:0,weak:0,totalInbound:0,totalOutbound:0};
  bucket.pages+=1; bucket.totalInbound+=row.inboundCount; bucket.totalOutbound+=row.outboundCount;
  if(row.inboundCount===0)bucket.orphans+=1;
  else if(row.inboundCount<=WEAK_INBOUND_THRESHOLD)bucket.weak+=1;
  familySummary[row.family]=bucket;
}
for (const bucket of Object.values(familySummary)) {
  bucket.averageInbound=Number((bucket.totalInbound/Math.max(1,bucket.pages)).toFixed(2));
  bucket.averageOutbound=Number((bucket.totalOutbound/Math.max(1,bucket.pages)).toFixed(2));
}

const withSources=(item)=>({
  ...item,
  sources:[...(targetSources.get(item.pathname)||[])].sort(),
});
const redirectedInternalLinks=checkedTargets.filter((item)=>item.status>=300&&item.status<400).map(withSources);
const brokenInternalLinks=checkedTargets.filter((item)=>item.status>=400).map(withSources);
const unverifiedInternalTargets=checkedTargets.filter((item)=>item.status===0).map(withSources);

const report={
  auditedAt:new Date().toISOString(),origin:ORIGIN,sitemaps,sitemapFailures,
  thresholds:{weakInbound:WEAK_INBOUND_THRESHOLD,maxUnlistedChecks:MAX_UNLISTED_CHECKS,maxPageFetchFailures:MAX_PAGE_FETCH_FAILURES},
  totals:{pages:rows.length,orphans:orphanPages.length,weak:weakPages.length,strong:strongPages.length,pageFetchFailures:fetchFailures.length,uniqueInternalTargets:allInternalTargets.size,unlistedInternalTargets:allUnlistedTargets.length,checkedUnlistedTargets:checkedTargets.length,crawlableUnlistedPages:crawlableUnlistedPages.length,redirectedInternalLinks:redirectedInternalLinks.length,brokenInternalLinks:brokenInternalLinks.length,unverifiedInternalTargets:unverifiedInternalTargets.length},
  familySummary,orphanPages,weakPages,redirectedInternalLinks,brokenInternalLinks,unverifiedInternalTargets,fetchFailures,rows,
};
await fs.writeFile(OUT_JSON,JSON.stringify(report,null,2)+'\n');
const tsv=[['url','family','inbound','outbound','status'],...rows.map((row)=>[row.url,row.family,String(row.inboundCount),String(row.outboundCount),row.inboundCount===0?'orphan':row.inboundCount<=WEAK_INBOUND_THRESHOLD?'weak':'strong'])];
await fs.writeFile(OUT_TSV,tsv.map((row)=>row.join('\t')).join('\n')+'\n');

console.log(JSON.stringify(report.totals,null,2));
console.log('Family summary:',JSON.stringify(familySummary,null,2));
for (const row of orphanPages.slice(0,100)) console.warn('ORPHAN '+row.url+' :: outbound='+row.outboundCount);
for (const row of weakPages.slice(0,100)) console.warn('WEAK '+row.url+' :: inbound='+row.inboundCount+' from '+row.inboundFrom.join(', '));
for (const item of redirectedInternalLinks.slice(0,100)) console.warn('REDIRECT-LINK '+item.pathname+' :: '+item.status+' -> '+item.location+' :: from '+item.sources.join(', '));
for (const item of brokenInternalLinks.slice(0,100)) console.error('BROKEN-LINK '+item.pathname+' :: '+item.status+' :: from '+item.sources.join(', '));
for (const item of unverifiedInternalTargets.slice(0,50)) console.warn('UNVERIFIED-LINK '+item.pathname+' :: '+(item.error||'request failed')+' :: from '+item.sources.join(', '));
for (const page of fetchFailures.slice(0,50)) console.warn('FETCH-FAILURE '+page.url+' :: '+page.error);

if (sitemapFailures.length || fetchFailures.length > MAX_PAGE_FETCH_FAILURES || brokenInternalLinks.length) process.exit(1);
console.log('PASS: public link graph completed; crawlable noindex/internal hubs contribute inbound links, orphan/weak pages are reported as optimization debt, and no broken internal targets were detected.');
