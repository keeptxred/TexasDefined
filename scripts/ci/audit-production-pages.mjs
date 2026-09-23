import fs from 'node:fs/promises';

const ORIGIN = process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com';
const USER_AGENT = 'TexasDefinedWholeSiteQualityAudit/2.0 (+https://texasdefined.com)';
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 4);
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT_MS || 30000);
const OUT_JSON = process.env.AUDIT_JSON || '/tmp/texasdefined-page-audit.json';
const OUT_TSV = process.env.AUDIT_TSV || '/tmp/texasdefined-page-audit.tsv';

const PLACEHOLDER_RE = /Story unavailable|This story is no longer available|page not found|404[^0-9].*not found|County unavailable|This county guide is being expanded|We are adding verified details before expanding this page into a full guide|There is nothing in this section yet|We are still gathering and checking the details for this guide|Photo coming soon|destination-specific photograph not yet available/i;
const BAD_TITLE_RE = /^(Unavailable|Story unavailable|Page not found|404)(?:\s*\||$)/i;

function normalizeSpace(value='') { return value.replace(/\s+/g, ' ').trim(); }
function decodeEntities(value='') { return value.replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n))); }
function stripTags(html='') { return decodeEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi,' ').replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi,' ').replace(/<[^>]+>/g,' ')); }
function wordCount(html='') { return (stripTags(html).match(/[A-Za-z0-9]+(?:[’'\-][A-Za-z0-9]+)*/g)||[]).length; }
function attrFromTag(tag,name) { const m=tag.match(new RegExp('\\b'+name+'=["\\\']([^"\\\']*)["\\\']','i')); return m?decodeEntities(m[1]):''; }
function firstTag(html,tag) { const m=html.match(new RegExp('<'+tag+'\\b[^>]*>[\\s\\S]*?<\\/'+tag+'>','i')); return m?m[0]:''; }
function innerText(tag='') { return normalizeSpace(stripTags(tag)); }
function metaContent(html,name) { for(const tag of html.match(/<meta\b[^>]*>/gi)||[]){ if(attrFromTag(tag,'name').toLowerCase()===name.toLowerCase()||attrFromTag(tag,'property').toLowerCase()===name.toLowerCase()) return normalizeSpace(attrFromTag(tag,'content')); } return ''; }
function canonicalHref(html) { for(const tag of html.match(/<link\b[^>]*>/gi)||[]){ if(attrFromTag(tag,'rel').toLowerCase().split(/\s+/).includes('canonical')) return attrFromTag(tag,'href'); } return ''; }
function h1Count(html) { return (html.match(/<h1\b/gi)||[]).length; }

async function fetchText(url,attempts=2) {
 let lastError;
 for(let attempt=1;attempt<=attempts;attempt++){
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),TIMEOUT_MS);
  try { const response=await fetch(url,{headers:{'user-agent':USER_AGENT,accept:'text/html,application/xml;q=0.9,*/*;q=0.8'},redirect:'follow',signal:controller.signal}); const body=await response.text(); clearTimeout(timer); if(response.status>=500&&attempt<attempts) continue; return {response,body}; }
  catch(error){ clearTimeout(timer); lastError=error; if(attempt===attempts) throw error; }
 }
 throw lastError;
}
function sitemapLocs(xml){ return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(m=>decodeEntities(m[1].trim())); }
async function discoverSitemaps(){ const urls=new Set([ORIGIN+'/sitemap.xml',ORIGIN+'/sitemap-explore.xml']); try{ const {response,body}=await fetchText(ORIGIN+'/robots.txt',1); if(response.ok) for(const m of body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) urls.add(m[1].trim()); }catch{} return [...urls]; }
async function collectUrls(){
 const pending=await discoverSitemaps(), seenSitemaps=new Set(), sitemapFailures=[], pageUrls=new Set();
 while(pending.length){ const sitemap=pending.shift(); if(!sitemap||seenSitemaps.has(sitemap)) continue; seenSitemaps.add(sitemap); let response,body;
  try{({response,body}=await fetchText(sitemap));}catch(error){sitemapFailures.push({sitemap,status:0,error:error?.message||String(error)});continue;}
  if(!response.ok){sitemapFailures.push({sitemap,status:response.status,error:'HTTP '+response.status});continue;}
  for(const loc of sitemapLocs(body)){ const url=new URL(loc,ORIGIN); if(url.origin!==new URL(ORIGIN).origin) continue; if(/\.xml(?:$|\?)/i.test(url.pathname)) pending.push(url.href); else pageUrls.add(url.href.replace(/#.*$/,'')); }
 }
 return {pageUrls:[...pageUrls].sort(),sitemaps:[...seenSitemaps],sitemapFailures};
}
function thinThreshold(pathname){
 if(/^\/(?:shop|search)(?:\/|$)/.test(pathname)) return 80;
 if(/^\/county\//.test(pathname)) return 220;
 if(/^\/(?:event|destination|article|city|food|sports-venue|property-tax\/county)\//.test(pathname)) return 260;
 return 120;
}
async function auditPage(url){
 const issues=[]; let status=0,finalUrl=url,contentType='',title='',description='',canonical='',words=0,h1s=0;
 try{
  const {response,body}=await fetchText(url); status=response.status; finalUrl=response.url; contentType=response.headers.get('content-type')||'';
  if(status!==200) issues.push({code:'http-status',detail:String(status)});
  if(status===200&&contentType.toLowerCase().includes('text/html')){
   title=innerText(firstTag(body,'title')); description=metaContent(body,'description'); canonical=canonicalHref(body); words=wordCount(body); h1s=h1Count(body);
   if(!title) issues.push({code:'missing-title',detail:''}); else if(BAD_TITLE_RE.test(title)) issues.push({code:'fallback-title',detail:title});
   if(!description) issues.push({code:'missing-description',detail:''});
   if(!canonical) issues.push({code:'missing-canonical',detail:''});
   else try{ const requested=new URL(url),canon=new URL(canonical,ORIGIN); if(canon.origin!==requested.origin||canon.pathname.replace(/\/$/,'')!==requested.pathname.replace(/\/$/,'')) issues.push({code:'canonical-mismatch',detail:canon.href}); }catch{issues.push({code:'invalid-canonical',detail:canonical});}
   if(h1s!==1) issues.push({code:'h1-count',detail:String(h1s)});
   const threshold=thinThreshold(new URL(url).pathname); if(words<threshold) issues.push({code:'thin-render',detail:words+' words < '+threshold});
   if(PLACEHOLDER_RE.test(stripTags(body))) issues.push({code:'placeholder-or-fallback-copy',detail:''});
   const robots=metaContent(body,'robots').toLowerCase(); if(robots.includes('noindex')) issues.push({code:'sitemap-url-noindex',detail:robots});
   if(finalUrl!==url&&new URL(finalUrl).pathname!==new URL(url).pathname) issues.push({code:'unexpected-redirect',detail:finalUrl});
  }
 }catch(error){issues.push({code:'fetch-error',detail:error?.message||String(error)});}
 return {url,finalUrl,status,contentType,title,description,canonical,words,h1s,issues};
}
async function mapLimit(items,limit,fn){const results=new Array(items.length);let cursor=0;async function worker(){while(true){const i=cursor++;if(i>=items.length)return;results[i]=await fn(items[i],i);if((i+1)%100===0)console.log('Audited '+(i+1)+'/'+items.length);}}await Promise.all(Array.from({length:Math.max(1,Math.min(limit,items.length))},worker));return results;}
function duplicateIssues(results,field,code){const groups=new Map();for(const result of results){const value=normalizeSpace(result[field]||'').toLowerCase();if(!value)continue;const list=groups.get(value)||[];list.push(result);groups.set(value,list);}for(const list of groups.values()){if(list.length<2)continue;const urls=list.map(x=>x.url).join(', ');for(const item of list)item.issues.push({code,detail:urls});}}

const {pageUrls,sitemaps,sitemapFailures}=await collectUrls();
console.log('Discovered '+pageUrls.length+' unique indexable URLs from '+sitemaps.length+' sitemap(s); '+sitemapFailures.length+' sitemap failure(s).');
const results=await mapLimit(pageUrls,CONCURRENCY,auditPage);
duplicateIssues(results,'title','duplicate-title'); duplicateIssues(results,'description','duplicate-description');
const failures=results.filter(r=>r.issues.length),byCode={};for(const result of failures)for(const issue of result.issues)byCode[issue.code]=(byCode[issue.code]||0)+1;
await fs.writeFile(OUT_JSON,JSON.stringify({auditedAt:new Date().toISOString(),origin:ORIGIN,sitemaps,sitemapFailures,totals:{pages:results.length,failingPages:failures.length,passingPages:results.length-failures.length},byCode,results},null,2)+'\n');
const rows=[['url','status','words','h1s','title','canonical','issues'],...results.map(r=>[r.url,String(r.status),String(r.words),String(r.h1s),r.title,r.canonical,r.issues.map(i=>i.code+(i.detail?':'+i.detail:'')).join(' | ')])];
await fs.writeFile(OUT_TSV,rows.map(row=>row.map(v=>String(v??'').replace(/[\t\r\n]+/g,' ')).join('\t')).join('\n')+'\n');
console.log(JSON.stringify({pages:results.length,failingPages:failures.length,byCode,sitemapFailures},null,2));
for(const result of failures.slice(0,250))console.error('FAIL '+result.url+' :: '+result.issues.map(i=>i.code+(i.detail?'='+i.detail:'')).join(', '));
if(sitemapFailures.length||failures.length)process.exit(1);
console.log('PASS: every sitemap-listed TexasDefined page satisfied the whole-site production quality audit.');
