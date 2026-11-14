#!/usr/bin/env node
/**
 * One-time, owner-requested production HTML crawl for current thin-content candidates.
 *
 * Does NOT change production, publish, redirect, deindex, or re-enable recurring audits.
 * Sitemaps + additional same-site HTML pages linked from those pages are in scope.
 * Slow, bounded read-only HTTP concurrency; never fetches images, scripts or stylesheets.
 * "Thin" is a reviewer risk signal, not a Google-provided verdict.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { decodeEntities } from "./html-entities.mjs";
const BASE="https://texasdefined.com";
const OUT=process.env.TD_THIN_REPORT_DIR || "ops/seo/audits/2026-10-30-live";
const CONCURRENCY=Number(process.env.TD_THIN_CONCURRENCY || 4);
const MAX_URLS=Number(process.env.TD_THIN_MAX_URLS || 12000);
const MAX_TIME_MS=75*60*1000;
if(!Number.isInteger(CONCURRENCY)||CONCURRENCY<1||CONCURRENCY>6)throw Error("Invalid bounded crawl concurrency");
const began=Date.now(), results=[], failures=[], sitemaps=[], queue=[], queued=new Set(), sitemapUrls=new Set();
const normalize=(value)=>{
 try {
  const u=new URL(value,BASE);
  if(!["texasdefined.com","www.texasdefined.com"].includes(u.hostname)||!["http:","https:"].includes(u.protocol))return null;
  if(/(?:\.(?:xml|json|jpg|jpeg|png|webp|svg|css|js|txt|pdf|zip|ico|csv|woff2?)$)/i.test(u.pathname))return null;
  if(/^(?:\/(?:admin|api|auth|assets|images|content|_build|cdn-cgi|cart|checkout|account)(?:\/|$))/.test(u.pathname))return null;
  u.protocol="https:";u.hostname="texasdefined.com";u.search="";u.hash="";
  u.pathname=u.pathname.replace(/\/+$/,"")||"/";
  return u.href;
 }catch{return null;}
};
function enqueue(url,source){
 const u=normalize(url);if(!u||queued.has(u)||queued.size>=MAX_URLS)return;
 queued.add(u);queue.push({url:u,source});if(source==="sitemap")sitemapUrls.add(u);
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,attempts=2){
 let last;
 for(let n=0;n<attempts;n++){
  try{
   const res=await fetch(url,{headers:{"user-agent":"TexasDefinedOwnerOneTimeThinContentAudit/1.0 (+https://texasdefined.com)","accept":"text/html,application/xml,text/plain;q=0.8","cache-control":"no-cache"},signal:AbortSignal.timeout(22000),redirect:"follow"});
   if((res.status===429||res.status>=500)&&n+1<attempts){await res.body?.cancel();await wait(2000+n*2000);continue;}
   const type=res.headers.get("content-type")||"";
   const len=Number(res.headers.get("content-length")||0);
   if(len>8000000){await res.body?.cancel();return {status:res.status,type,url:res.url,body:"",error:"oversize HTML"};}
   const body=await res.text();
   return {status:res.status,type,url:res.url,body:body.slice(0,8000000),error:""};
  }catch(e){last=String(e);if(n+1<attempts)await wait(1000+n*2000);}
 }
 return {status:0,type:"",url,error:last,body:""};
}
const clean=(s)=>decodeEntities(String(s||"").replace(/<(?:script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/(?:script|style|svg|noscript|template)\s*>/gi," ").replace(/<!--[\s\S]*?-->/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim());
const countWords=(x)=>(String(x||"").match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)||[]).length;
const extractAttr=(s,n)=>decodeEntities(s.match(new RegExp("\\b"+n+"\\s*=\\s*[\"']([^\"']*)[\"']","i"))?.[1]||"");
const meta=(html,name)=>{
 for(const m of html.matchAll(/<meta\b[^>]*>/gi)){
  const tag=m[0];if(extractAttr(tag,"name").toLowerCase()===name||extractAttr(tag,"property").toLowerCase()===name)return extractAttr(tag,"content");
 }return "";
};
const canonical=(html)=>{
 for(const m of html.matchAll(/<link\b[^>]*>/gi)){
  const tag=m[0];if(extractAttr(tag,"rel").toLowerCase().split(/\s+/).includes("canonical"))return extractAttr(tag,"href");
 }return "";
};
function family(url){return "/"+(new URL(url).pathname.split("/").filter(Boolean)[0]||"");}
function isTool(u){return /(?:^|\/)(?:find-my-|.*-calculator|.*-estimator|search|shop|compare-texas-cities|property-tax-calculator)(?:\/|$)/.test(new URL(u).pathname);}
function parsePage(entry,res){
 const html=res.body;
 const title=clean(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||"");
 const h1=clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||"");
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||"";
 const scope=main||html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]||"";
 const reduced=scope.replace(/<(?:nav|aside|header|footer)\b[^>]*>[\s\S]*?<\/(?:nav|aside|header|footer)\s*>/gi," ");
 const mainText=clean(reduced);
 const words=countWords(mainText), totalWords=countWords(clean(html));
 const paragraphs=[...reduced.matchAll(/<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)].map(m=>clean(m[1]).toLowerCase().replace(/\s+/g," ")).filter(t=>t.length>=110&&countWords(t)>=18);
 const outgoing=new Set();
 for(const m of reduced.matchAll(/<a\b[^>]*>/gi)){
  const href=extractAttr(m[0],"href");if(!href)continue;
  try{const u=new URL(href,entry.url);if(["texasdefined.com","www.texasdefined.com"].includes(u.hostname)){let link=normalize(u.href);if(link){outgoing.add(link);enqueue(link,"internal-link");}}}catch{}
 }
 const sources=new Set();
 for(const m of reduced.matchAll(/<a\b[^>]*>/gi)){
  const href=extractAttr(m[0],"href");try{const u=new URL(href,entry.url);if(u.protocol==="https:"&&!["texasdefined.com","www.texasdefined.com"].includes(u.hostname))sources.add(u.hostname);}catch{}
 }
 const robots=meta(html,"robots"), can=canonical(html);
 let normalizedCanon=null;try{normalizedCanon=can?normalize(new URL(can,entry.url).href):null;}catch{}
 const textHash=createHash("sha256").update(mainText.toLowerCase().replace(/\s+/g," ")).digest("hex").slice(0,24);
 return {url:entry.url,origin:entry.source,sitemap:sitemapUrls.has(entry.url),status:res.status,finalUrl:res.url||entry.url,type:res.type,title,h1,description:meta(html,"description"),canonical:can,normalizedCanon,robots,mainWords:words,totalWords,externalSources:sources.size,internalLinks:outgoing.size,sections:(reduced.match(/<h[2-4]\b/gi)||[]).length,paragraphs:paragraphs.slice(0,200),textHash,mainPresent:Boolean(main),error:res.error||"",family:family(entry.url),sample:mainText.slice(0,160)};
}
async function discoverSitemaps(){
 const roots=new Set([BASE+"/sitemap.xml",BASE+"/sitemap-explore.xml"]);
 const rob=await get(BASE+"/robots.txt");
 if(rob.status===200)for(const m of rob.body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)){try{const u=new URL(m[1]);if(u.hostname==="texasdefined.com"&&u.pathname.endsWith(".xml"))roots.add(u.href);}catch{}}
 else failures.push({sitemap:"robots.txt",status:rob.status,error:rob.error||"Robots sitemap discovery unavailable"});
 const pending=[...roots],done=new Set();
 while(pending.length){
  const uri=pending.shift();if(done.has(uri))continue;done.add(uri);
  const res=await get(uri);
  if(res.status!==200||!res.body.includes("<loc>")){failures.push({sitemap:uri,status:res.status,error:res.error||"Missing or inaccessible sitemap XML"});continue;}
  let count=0;
  for(const m of res.body.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)){
   const raw=decodeEntities(m[1].trim());try{
    const u=new URL(raw,BASE);
    if(!["texasdefined.com","www.texasdefined.com"].includes(u.hostname))continue;
    if(u.pathname.endsWith(".xml"))pending.push(u.href);
    else{enqueue(u.href,"sitemap");count++;}
   }catch{}
  }
  sitemaps.push({url:uri,urls:count});
 }
}
await discoverSitemaps();
if(!queue.length)throw Error("No URLs discovered from current sitemaps: abort, do not invent results");
console.log("Found "+queue.length+" current sitemap URLs across "+sitemaps.length+" XML sitemaps");
let cursor=0;
async function worker(){
 while(true){
  if(Date.now()-began>MAX_TIME_MS)return;
  const i=cursor++;if(i>=queue.length)return;
  const entry=queue[i],res=await get(entry.url);
  if(res.status===200&&res.type.includes("text/html")){
   results.push(parsePage(entry,res));
  }else {
   results.push({url:entry.url,origin:entry.source,sitemap:sitemapUrls.has(entry.url),status:res.status,finalUrl:res.url||entry.url,type:res.type,title:"",h1:"",description:"",canonical:"",normalizedCanon:null,robots:"",mainWords:null,totalWords:null,externalSources:null,internalLinks:null,sections:null,paragraphs:[],textHash:null,mainPresent:false,error:res.error||"Non-200/non-HTML",family:family(entry.url),sample:""});
  }
  if((i+1)%200===0)console.log("Current live pages fetched "+(i+1)+"/"+queue.length);
  await wait(200);
 }
}
await Promise.all(Array.from({length:CONCURRENCY},worker));
const timedOut=cursor<queue.length;
const paragraphFreq=new Map(), hashFreq=new Map(), titleFreq=new Map();
for(const r of results){
 if(r.status!==200||!r.type.includes("html"))continue;
 if(r.textHash)hashFreq.set(r.textHash,(hashFreq.get(r.textHash)||0)+1);
 if(r.title){let k=r.title.toLowerCase();titleFreq.set(k,(titleFreq.get(k)||0)+1);}
 for(const p of new Set(r.paragraphs||[])){paragraphFreq.set(p,(paragraphFreq.get(p)||0)+1);}
}
const expected=queue.length;
for(const r of results){
 const reasons=[];let risk="NOT_FLAGGED";const tool=isTool(r.url);
 const tech=(r.status!==200||!r.type.includes("html")||!r.mainPresent||!r.normalizedCanon||(r.normalizedCanon!==r.url)||/\bnoindex\b/i.test(r.robots)||r.error);
 if(tech){risk="TECHNICAL_REVIEW";if(r.status!==200)reasons.push("HTTP "+r.status);if(!r.mainPresent)reasons.push("Main element absent in SSR");if(!r.normalizedCanon)reasons.push("Canonical missing");else if(r.normalizedCanon!==r.url)reasons.push("Canonical target different from URL");if(/\bnoindex\b/i.test(r.robots))reasons.push("Robots noindex");if(r.error)reasons.push(r.error);}
 else{
  const shared=(r.paragraphs||[]).filter(p=>(paragraphFreq.get(p)||0)>=5);
  const sharedWords=shared.reduce((n,p)=>n+countWords(p),0);
  const repeatShare=r.mainWords?sharedWords/r.mainWords:0;
  const duplicate=hashFreq.get(r.textHash)>=2;
  if(r.mainWords<130&&!tool){risk="HIGH";reasons.push("Extremely little main content: "+r.mainWords+" words");}
  else if(r.mainWords<260&&!tool&&(r.externalSources===0||r.sections===0||repeatShare>0.35)){risk="HIGH";reasons.push("Short and weakly differentiated main content: "+r.mainWords+" words");}
  else if(r.mainWords<330&&!tool){risk="MEDIUM";reasons.push("Limited substantive main content: "+r.mainWords+" words");}
  if(duplicate){risk="HIGH";reasons.push("Identical main text on another URL");}
  if(!tool&&repeatShare>0.5&&r.mainWords<950){if(risk==="NOT_FLAGGED")risk="MEDIUM";reasons.push("Shared boilerplate makes up >50% of paragraph content");}
  if(titleFreq.get(r.title.toLowerCase())>=2){if(risk==="NOT_FLAGGED")risk="REVIEW";reasons.push("Duplicate title across crawl");}
  if(!tool&&r.mainWords<500&&r.externalSources===0){if(risk==="NOT_FLAGGED")risk="REVIEW";reasons.push("Short page without visible outgoing external sources");}
  if(tool&&r.mainWords<80){if(risk==="NOT_FLAGGED")risk="REVIEW";reasons.push("Short tool page: assess interactive usefulness, not word count");}
 }
 r.risk=risk;r.reasons=reasons.join("; ");r.identicalMainUrls=hashFreq.get(r.textHash)||0;r.duplicateTitleUrls=titleFreq.get(r.title.toLowerCase())||0;
 delete r.paragraphs;delete r.textHash;
}
const sortOrder={TECHNICAL_REVIEW:0,HIGH:1,MEDIUM:2,REVIEW:3,NOT_FLAGGED:4};
results.sort((a,b)=>(sortOrder[a.risk]-sortOrder[b.risk])||a.family.localeCompare(b.family)||a.url.localeCompare(b.url));
const cols=["url","risk","reasons","family","sitemap","status","mainWords","totalWords","externalSources","sections","internalLinks","identicalMainUrls","duplicateTitleUrls","title","h1","description","canonical","robots","origin","mainPresent","error","sample"];
const csv=(v)=>'"'+String(v??"").replaceAll('"','""').replace(/[\r\n]+/g," ").slice(0,6000)+'"';
const toCsv=(rows)=>[cols.join(","),...rows.map(r=>cols.map(k=>csv(r[k])).join(","))].join("\n")+"\n";
const counts={};for(const r of results)counts[r.risk]=(counts[r.risk]||0)+1;
const incomplete=timedOut||Boolean(failures.length)||results.length!==expected||queued.size>=MAX_URLS;
const summary={startedAt:new Date(began).toISOString(),finishedAt:new Date().toISOString(),source:"LIVE_PRODUCTION_HTML",scanned:results.length,discovered:expected,sitemapUrls:sitemapUrls.size,otherLinkedUrls:results.length-sitemapUrls.size,sitemaps,failures,counts,incomplete,notes:"No Google thin-content classification exists; candidates require content review. Live HTTP crawl; no production changes."};
await fs.mkdir(OUT,{recursive:true});
await Promise.all([
 fs.writeFile(path.join(OUT,"all-current-pages.csv"),toCsv(results)),
 fs.writeFile(path.join(OUT,"current-thin-candidates.csv"),toCsv(results.filter(r=>r.risk!=="NOT_FLAGGED"))),
 fs.writeFile(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n"),
 fs.writeFile(path.join(OUT,"README.md"),[
  "# TexasDefined — one-time LIVE sitewide content audit",
  "",
  "**Current crawl, not an old audit.** Start: "+summary.startedAt+". Finish: "+summary.finishedAt,
  "",
  "Live URLs scanned: "+summary.scanned+" / "+summary.discovered,
  "Sitemap URLs: "+summary.sitemapUrls+"; internally discovered linked URLs: "+summary.otherLinkedUrls,
  "Completeness: "+(incomplete?"INCOMPLETE — do not present as a comprehensive verdict":"all discovered URLs requested; review individual failures separately"),
  "",
  "## Risk counts",
  ...Object.entries(counts).map(([k,v])=>"- "+k+": "+v),
  "",
  "Sitemap errors: "+failures.length,
  ...failures.map(f=>"- "+f.sitemap+" returned "+f.status+" "+f.error),
  "",
  "## Interpret with care",
  "- HIGH, MEDIUM, REVIEW are **signals for editorial scrutiny**, not Google's verdict or evidence of a penalty.",
  "- Technical/canonical/noindex errors are separated and should never be counted as thin content.",
  "- Calculator, table and search utilities must be assessed by functional quality, not length.",
  "- Main text includes first-party rendered SSR content, excluding headers, scripts and navigation; dynamically injected JS content may require a second rendered-browser check.",
  "- Do not automatically delete, merge, noindex or pad these pages. Improve original relevant content first.",
  "- This workflow is intentionally one-time, runs from GitHub, and does not re-enable disabled schedules.",
 ].join("\n")+"\n")
]);
console.log(JSON.stringify(summary,null,2));
if(incomplete)process.exitCode=2;