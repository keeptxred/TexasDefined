import { createLocalAuditFetch } from './local-audit-fetch.mjs';
const localAuditFetch = createLocalAuditFetch({ localOrigin: process.env.LOCAL_AUDIT_ORIGIN });
import fs from 'node:fs/promises';
import { auditAuthorityEvidence } from './authority-evidence.mjs';
import { enrichAuthorityLinkGraph } from './authority-link-graph.mjs';
import { decodeEntities } from './html-entities.mjs';
import { fetchTextWithRetry } from './audit-fetch.mjs';
import { expiredEventSnippetIssues } from './expired-event-snippet.mjs';
import { classifySnippetPage, snippetClassificationCounts } from './snippet-classification.mjs';

const ORIGIN = process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com';
const USER_AGENT = 'TexasDefinedWholeSiteQualityAudit/2.0 (+https://texasdefined.com)';
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 4);
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT_MS || 30000);
const OUT_JSON = process.env.AUDIT_JSON || '/tmp/texasdefined-page-audit.json';
const OUT_TSV = process.env.AUDIT_TSV || '/tmp/texasdefined-page-audit.tsv';
const OUT_AUTHORITY_TSV = process.env.AUDIT_AUTHORITY_TSV || '/tmp/texasdefined-authority-review.tsv';
const OUT_LINK_GRAPH_TSV = process.env.AUDIT_LINK_GRAPH_TSV || '/tmp/texasdefined-contextual-link-graph.tsv';
const OUT_SNIPPET_TSV = process.env.AUDIT_SNIPPET_TSV || '/tmp/texasdefined-snippet-classification.tsv';

const PAGE_FALLBACK_RE = /Story unavailable|This story is no longer available|page not found|404[^0-9].*not found|County unavailable|This county guide is being expanded|We are adding verified details before expanding this page into a full guide|There is nothing in this section yet|We are still gathering and checking the details for this guide/i;
const LOCALIZED_IMAGE_FALLBACK_RE = /Photo coming soon|destination-specific photograph not yet available/i;
const BAD_TITLE_RE = /^(Unavailable|Story unavailable|Page not found|404)(?:\s*\||$)/i;
const GENERIC_TITLE_RE = /^(?:Texas ?Defined|Home|Guide|Article|Events|Explore|Search|Texas Guide)(?:\s*[|–—-]\s*(?:Texas ?Defined))?$/i;
const TITLE_REVIEW_LENGTH = 70;
const TITLE_HARD_MAX_LENGTH = 90;
const INTENT_STOP_WORDS = new Set([
  'a','an','and','are','as','at','by','for','from','guide','in','is','of','on','or','page','the','to','with',
  'texasdefined','defined',
]);

function normalizeSpace(value='') { return value.replace(/\s+/g, ' ').trim(); }
function stripTags(html='') { return decodeEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi,' ').replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi,' ').replace(/<[^>]+>/g,' ')); }
function wordCount(html='') { return (stripTags(html).match(/[A-Za-z0-9]+(?:[’'\-][A-Za-z0-9]+)*/g)||[]).length; }
function attrFromTag(tag,name) { const m=tag.match(new RegExp('\\b'+name+'=["\\\']([^"\\\']*)["\\\']','i')); return m?decodeEntities(m[1]):''; }
function firstTag(html,tag) { const m=html.match(new RegExp('<'+tag+'\\b[^>]*>[\\s\\S]*?<\\/'+tag+'>','i')); return m?m[0]:''; }
function innerText(tag='') { return normalizeSpace(stripTags(tag)); }
function metaContent(html,name) { for(const tag of html.match(/<meta\b[^>]*>/gi)||[]){ if(attrFromTag(tag,'name').toLowerCase()===name.toLowerCase()||attrFromTag(tag,'property').toLowerCase()===name.toLowerCase()) return normalizeSpace(attrFromTag(tag,'content')); } return ''; }
function canonicalHref(html) { for(const tag of html.match(/<link\b[^>]*>/gi)||[]){ if(attrFromTag(tag,'rel').toLowerCase().split(/\s+/).includes('canonical')) return attrFromTag(tag,'href'); } return ''; }
function h1Count(html) { return (html.match(/<h1\b/gi)||[]).length; }
function titleIntentTokens(value='') {
 const normalized=normalizeSpace(value).toLowerCase().replace(/texas\s*defined/g,' ').replace(/[^a-z0-9]+/g,' ');
 return new Set(normalized.split(/\s+/).filter(token=>token.length>=3&&!INTENT_STOP_WORDS.has(token)));
}
function severeTitleH1Conflict(title,h1) {
 const titleTokens=titleIntentTokens(title), h1Tokens=titleIntentTokens(h1);
 if(titleTokens.size<2||h1Tokens.size<2) return false;
 for(const token of titleTokens) if(h1Tokens.has(token)) return false;
 return true;
}

async function fetchText(url, attempts=3) {
 return fetchTextWithRetry(url, {
  attempts,
  fetchImpl: localAuditFetch,
  timeoutMs: TIMEOUT_MS,
  backoffMs: 400,
  headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xml;q=0.9,*/*;q=0.8' },
 });
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
 const issues=[],warnings=[]; let status=0,finalUrl=url,contentType='',title='',description='',canonical='',h1='',words=0,h1s=0,authority=null;
 try{
  const {response,body}=await fetchText(url); status=response.status; finalUrl=response.url; contentType=response.headers.get('content-type')||'';
  if(status!==200) issues.push({code:'http-status',detail:String(status)});
  if(status===200&&contentType.toLowerCase().includes('text/html')){
   title=innerText(firstTag(body,'title')); description=metaContent(body,'description'); canonical=canonicalHref(body); h1=innerText(firstTag(body,'h1')); words=wordCount(body); h1s=h1Count(body);
   authority=auditAuthorityEvidence(url,body);
   if(!title) issues.push({code:'missing-title',detail:''});
   else {
    if(BAD_TITLE_RE.test(title)) issues.push({code:'fallback-title',detail:title});
    if(GENERIC_TITLE_RE.test(title)) issues.push({code:'generic-title',detail:title});
    if(title.length>TITLE_HARD_MAX_LENGTH) issues.push({code:'title-extreme-length',detail:title.length+' chars > '+TITLE_HARD_MAX_LENGTH});
    // A title ending in a connector often indicates silent SEO budget truncation.
    const subjectTitle = title.replace(/\s*[|–—-]\s*Texas Defined\s*$/i, '').trim();
    const headingCompletesTitle = h1.toLowerCase().startsWith(subjectTitle.toLowerCase())
      && h1.length >= subjectTitle.length + 5;
    const choppedLocation = /\s+(?:San|Corpus)$/i.test(subjectTitle);
    // Avoid false positives for complete idiomatic headings such as
    // "Texas Water Towers Worth Pulling Over For".
    if ((headingCompletesTitle && /(?:\s+(?:and|or|of|for|to|with|in|at|the)|\s+&)$/i.test(subjectTitle))
      || choppedLocation) {
      issues.push({code:'dangling-title-fragment',detail:subjectTitle});
    }
    else if(title.length>TITLE_REVIEW_LENGTH) warnings.push({code:'title-review-length',detail:title.length+' chars > '+TITLE_REVIEW_LENGTH});
   }
   if(!description) issues.push({code:'missing-description',detail:''});
   if(!canonical) issues.push({code:'missing-canonical',detail:''});
   else try{ const requested=new URL(url),canon=new URL(canonical,ORIGIN); if(canon.origin!==requested.origin||canon.pathname.replace(/\/$/,'')!==requested.pathname.replace(/\/$/,'')) issues.push({code:'canonical-mismatch',detail:canon.href}); }catch{issues.push({code:'invalid-canonical',detail:canonical});}
   if(h1s!==1) issues.push({code:'h1-count',detail:String(h1s)});
   else if(severeTitleH1Conflict(title,h1)) issues.push({code:'title-h1-intent-conflict',detail:`title="${title}" h1="${h1}"`});
   const threshold=thinThreshold(new URL(url).pathname); if(words<threshold) issues.push({code:'thin-render',detail:words+' words < '+threshold});
   // A genuine destination defect seen in production: location Q&A claimed
   // that Fredericksburg was "near Fredericksburg". Treat self-referential
   // place answers as a live regression, not an editorial suggestion.
   if (new URL(url).pathname.startsWith('/destination/') && h1) {
     const normalizedBody = normalizeSpace(stripTags(body)).toLowerCase();
     const normalizedName = normalizeSpace(h1).toLowerCase();
     if (normalizedBody.includes(`${normalizedName} is near ${normalizedName}`)
       || normalizedBody.includes(`${normalizedName} is in ${normalizedName}`)) {
       issues.push({code:'self-referential-location',detail:h1});
     }
   }
   const renderedText=stripTags(body);
   if (new URL(url).pathname.startsWith('/event/')) {
     issues.push(...expiredEventSnippetIssues({ url, title, description, renderedText }));
   }
   const pageFallbackMatch=renderedText.match(PAGE_FALLBACK_RE); if(pageFallbackMatch) issues.push({code:'page-level-fallback-copy',detail:pageFallbackMatch[0]});
   const imageFallbackMatch=renderedText.match(LOCALIZED_IMAGE_FALLBACK_RE); if(imageFallbackMatch) warnings.push({code:'localized-image-fallback',detail:imageFallbackMatch[0]});
   const robots=metaContent(body,'robots').toLowerCase(); if(robots.includes('noindex')) issues.push({code:'sitemap-url-noindex',detail:robots});
   if(finalUrl!==url&&new URL(finalUrl).pathname!==new URL(url).pathname) issues.push({code:'unexpected-redirect',detail:finalUrl});
  }
 }catch(error){issues.push({code:'fetch-error',detail:error?.message||String(error)});}
 return {url,finalUrl,status,contentType,title,description,canonical,h1,words,h1s,issues,warnings,authority};
}
async function mapLimit(items,limit,fn){const results=new Array(items.length);let cursor=0;async function worker(){while(true){const i=cursor++;if(i>=items.length)return;results[i]=await fn(items[i],i);if((i+1)%100===0)console.log('Audited '+(i+1)+'/'+items.length);}}await Promise.all(Array.from({length:Math.max(1,Math.min(limit,items.length))},worker));return results;}
function duplicateIssues(results,field,code){const groups=new Map();for(const result of results){const value=normalizeSpace(result[field]||'').toLowerCase();if(!value)continue;const list=groups.get(value)||[];list.push(result);groups.set(value,list);}for(const list of groups.values()){if(list.length<2)continue;const urls=list.map(x=>x.url).join(', ');for(const item of list)item.issues.push({code,detail:urls});}}

const {pageUrls,sitemaps,sitemapFailures}=await collectUrls();
console.log('Discovered '+pageUrls.length+' unique indexable URLs from '+sitemaps.length+' sitemap(s); '+sitemapFailures.length+' sitemap failure(s).');
const results=await mapLimit(pageUrls,CONCURRENCY,auditPage);
duplicateIssues(results,'title','duplicate-title'); duplicateIssues(results,'description','duplicate-description');
for (const result of results) result.snippet = classifySnippetPage(result);
const snippetClassifications = snippetClassificationCounts(results);
const linkGraph = enrichAuthorityLinkGraph(results);
const failures=results.filter(r=>r.issues.length),warningPages=results.filter(r=>r.warnings?.length),byCode={},warningsByCode={};for(const result of failures)for(const issue of result.issues)byCode[issue.code]=(byCode[issue.code]||0)+1;for(const result of warningPages)for(const warning of result.warnings)warningsByCode[warning.code]=(warningsByCode[warning.code]||0)+1;
const authorityByFamily={};const authorityFlags={};
for(const result of results){if(!result.authority)continue;const a=result.authority;const group=authorityByFamily[a.family]??={pages:0,withReviewFlags:0,missingPrimarySourceCandidates:0};group.pages++;if(a.reviewFlags.length)group.withReviewFlags++;if(a.reviewFlags.includes('no-identifiable-primary-source-host'))group.missingPrimarySourceCandidates++;for(const flag of a.reviewFlags)authorityFlags[flag]=(authorityFlags[flag]??0)+1;}
localAuditFetch.assertComplete();
await fs.writeFile(OUT_JSON,JSON.stringify({auditRuntime:'local-built-worker',sourceSha:process.env.GITHUB_SHA || null,auditedAt:new Date().toISOString(),origin:ORIGIN,sitemaps,sitemapFailures,totals:{pages:results.length,failingPages:failures.length,passingPages:results.length-failures.length,warningPages:warningPages.length},byCode,warningsByCode,authorityByFamily,authorityFlags,linkGraph,authorityCertification:'NOT VERIFIED BY AUTOMATED AUDIT',snippetClassifications,searchPerformanceMeasurement:'NOT AVAILABLE FROM PUBLIC HTML',results},null,2)+'\n');
const rows=[['url','status','words','h1s','title','description','h1','canonical','issues','warnings'],...results.map(r=>[r.url,String(r.status),String(r.words),String(r.h1s),r.title,r.description,r.h1,r.canonical,r.issues.map(i=>i.code+(i.detail?':'+i.detail:'')).join(' | '),(r.warnings||[]).map(i=>i.code+(i.detail?':'+i.detail:'')).join(' | ')])];
await fs.writeFile(OUT_TSV,rows.map(row=>row.map(v=>String(v??'').replace(/[\t\r\n]+/g,' ')).join('\t')).join('\n')+'\n');
const snippetRows=[['url','primary_classification','evidence','classification_basis','html_verified','indexable_candidate','family','title','description','h1','canonical','technical_issues','warnings','gsc_measurement'],...results.map(r=>[r.url,r.snippet.classification,r.snippet.evidence.join(','),r.snippet.basis,String(r.snippet.htmlVerified),String(r.snippet.eligibleIndexableCandidate),r.authority?.family||'',r.title,r.description,r.h1,r.canonical,r.issues.map(i=>i.code).join(','),r.warnings.map(i=>i.code).join(','),'unavailable'])];
await fs.writeFile(OUT_SNIPPET_TSV,snippetRows.map(row=>row.map(v=>String(v??'').replace(/[\t\r\n]+/g,' ')).join('\t')).join('\n')+'\n');
const authorityRows=[['priority','family','url','technical_issues','review_flags','link_graph_review','incoming_contextual_pages','reciprocal_contextual_pages','outgoing_sitemap_pages','main_words','source_hosts','candidate_official_source_urls','internal_destinations','date_signal','editorial_certification'],...results.filter(r=>r.authority && (r.authority.reviewFlags.length||r.issues.length)).sort((a,b)=>a.authority.priority-b.authority.priority||b.issues.length-a.issues.length||a.url.localeCompare(b.url)).map(r=>[r.authority.priority,r.authority.family,r.url,r.issues.map(i=>i.code).join(','),r.authority.reviewFlags.join(','),r.authority.linkGraphFlags.join(','),r.authority.inboundContextualPages,r.authority.reciprocalContextualPages,r.authority.outboundSitemapPageLinks,r.authority.mainWords,r.authority.identifiablePrimarySourceHosts,r.authority.officialEvidenceCandidates.join(' | '),r.authority.internalLinkDestinations,r.authority.visibleReviewDate,r.authority.editorialCertification])];
await fs.writeFile(OUT_AUTHORITY_TSV,authorityRows.map(row=>row.map(v=>String(v??'').replace(/[\t\r\n]+/g,' ')).join('\t')).join('\n')+'\n');
const linkRows=[['url','family','priority','contextual_inbound_pages','contextual_outbound_sitemap_pages','reciprocal_links','review_flags','outbound_not_in_sitemap_paths'],...results.filter(r=>r.authority).sort((a,b)=>a.authority.priority-b.authority.priority||a.url.localeCompare(b.url)).map(r=>[r.url,r.authority.family,r.authority.priority,r.authority.inboundContextualPages,r.authority.outboundSitemapPageLinks,r.authority.reciprocalContextualPages,r.authority.linkGraphFlags.join(','),r.authority.outgoingNotInSitemapPaths.join(' | ')])];
await fs.writeFile(OUT_LINK_GRAPH_TSV,linkRows.map(row=>row.map(v=>String(v??'').replace(/[\t\r\n]+/g,' ')).join('\t')).join('\n')+'\n');
console.log(JSON.stringify({pages:results.length,failingPages:failures.length,warningPages:warningPages.length,byCode,warningsByCode,sitemapFailures,authorityByFamily,authorityFlags,linkGraphSummary:linkGraph.totals,authorityCertification:'NOT VERIFIED BY AUTOMATED AUDIT'},null,2));
for(const result of failures.slice(0,250))console.error('FAIL '+result.url+' :: '+result.issues.map(i=>i.code+(i.detail?'='+i.detail:'')).join(', '));
if(sitemapFailures.length||failures.length)process.exit(1);
console.log('PASS: every sitemap-listed TexasDefined page satisfied the whole-site production quality audit.');
