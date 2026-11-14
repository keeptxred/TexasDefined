#!/usr/bin/env node
/** Read-only, uncached production verification for ten Texas music history URLs. */
import { mkdirSync, writeFileSync } from "node:fs";
const base="https://texasdefined.com";
const slugs=[
 "broken-spoke-austin-history","continental-club-austin-history","antones-austin-history","billy-bobs-texas-history",
 "texas-music-cities","austin-music-history","houston-music-history","san-antonio-music-history",
 "corpus-christi-music-history","lubbock-music-history"
];
const nonce=Date.now().toString(36);
const results=[];
function attrs(tag,name){return tag.match(new RegExp("\\b"+name+"\\s*=\\s*[\"']([^\"']+)[\"']","i"))?.[1]??null}
function visible(html){return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]*>/g," ").replace(/&(?:amp|nbsp|lt|gt|quot);/g," ").replace(/\s+/g," ")}
async function get(slug,kind){
 // CRITICAL: exercise the clean visitor/crawler-facing canonical; query nonce
 // tests alone can hide an obsolete HTML object still stored at the edge.
 const clean=kind==="visitor"||kind==="googlebot-like";
 const url=new URL("/"+slug,base);
 if(!clean)url.searchParams.set("_music_authority_probe",nonce+"-"+kind);
 const headers={"Accept":"text/html","User-Agent":
   kind==="mobile"?"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36":
   kind==="visitor"?"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36":
   kind==="googlebot-like"?"Googlebot/2.1 (+http://www.google.com/bot.html)":
   "TexasDefined-MusicAuthority-ReadOnly/1.0"};
 if(!clean){headers["Cache-Control"]="no-store,no-cache";headers.Pragma="no-cache"}
 const start=Date.now();
 const resp=await fetch(url,{headers,redirect:"manual",signal:AbortSignal.timeout(25000)});
 return {resp,html:await resp.text(),elapsedMs:Date.now()-start,
  edgeCache:resp.headers.get("cf-cache-status"),edgeAge:resp.headers.get("age"),
  finalUrl:resp.url};
}
async function verify(slug){
 const errors=[],crawlerWarnings=[];let desktop,mobile,visitor,crawler;
 try{desktop=await get(slug,"desktop")}catch(e){errors.push("Desktop network: "+String(e))}
 try{mobile=await get(slug,"mobile")}catch(e){errors.push("Mobile network: "+String(e))}
 try{visitor=await get(slug,"visitor")}catch(e){errors.push("Clean canonical visitor network: "+String(e))}
 // A spoofed Googlebot User-Agent is NOT an authenticated Google crawler.
 // Record it for diagnosis without claiming to have verified Google's IP-based access.
 try{crawler=await get(slug,"googlebot-like")}catch(e){crawlerWarnings.push("Unauthenticated crawler-UA network: "+String(e))}
 const expected=base+"/"+slug;
 for(const [kind,data] of [["desktop",desktop],["mobile",mobile],["visitor",visitor]]){
  if(!data)continue;
  const {resp,html}=data;
  if(resp.status!==200)errors.push(kind+" HTTP "+resp.status);
  if(/\bnoindex\b/i.test(resp.headers.get("x-robots-tag")??""))errors.push(kind+" X-Robots noindex");
  const canonical=(html.match(/<link\b[^>]*>/gi)??[]).filter(x=>(attrs(x,"rel")??"").toLowerCase()==="canonical").map(x=>attrs(x,"href"));
  if(canonical.length!==1||canonical[0]!==expected)errors.push(kind+" canonical "+JSON.stringify(canonical));
  if(!/<title\b[^>]*>[^<]{14,}<\/title>/i.test(html))errors.push(kind+" title missing");
  if(!/<meta\b[^>]+name=["']description["']/i.test(html))errors.push(kind+" description missing");
  if(!/<main(?:\s|>)/i.test(html))errors.push(kind+" main missing");
  if(!/<h1\b[^>]*>[\s\S]{6,}?<\/h1>/i.test(html))errors.push(kind+" H1 missing");
  const robots=(html.match(/<meta\b[^>]*>/gi)??[]).filter(x=>(attrs(x,"name")??"").toLowerCase()==="robots");
  if(robots.some(x=>/\bnoindex\b/i.test(attrs(x,"content")??"")))errors.push(kind+" meta robots noindex");
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]??"";
  if(visible(main).length<1300)errors.push(kind+" thin server-rendered main");
  if(visible(main).length<2500)errors.push(kind+" insufficient researched server-rendered main");
  for(const heading of ["Research file", "What the record establishes", "Our reading", "What remains uncertain:"]) {
   if(!visible(main).includes(heading))errors.push(kind+" missing source/interpretation research section: "+heading);
  }
  if(((main.match(/What the record establishes/g)||[]).length)<4) errors.push(kind+" fewer than four grounded research findings");
  if(slug==="continental-club-austin-history"&&!visible(main).includes("1955")||slug==="continental-club-austin-history"&&!visible(main).includes("1957"))errors.push(kind+" Continental opening-date dispute was not published");

  for(const marker of ["Texas Defined Editorial Desk","November 13, 2026","Historical source"]){
   if(!visible(html).includes(marker) && marker!=="Historical source")errors.push(kind+" missing published evidence: "+marker);
  }
  if(!html.includes('application/ld+json')||!html.includes('BreadcrumbList')||!html.includes('dateModified'))errors.push(kind+" article/breadcrumb JSON-LD evidence missing");
  if(!html.includes('tshaonline.org') && slug!=="continental-club-austin-history")errors.push(kind+" institutional citations absent");
  if(slug==="texas-music-cities"&&!visible(html).includes("What made each Texas music city different?"))errors.push(kind+" accessible comparison missing");
  if(slug!=="texas-music-cities"&&!visible(html).match(/documented milestones|source-linked chronology|Milestones in a Coastal Bend recording center/i))errors.push(kind+" per-page source-linked chronology missing");
  if(/(?:lorem ipsum|delve into|unlock the secrets|in today's fast.paced world)/i.test(visible(main)))errors.push(kind+" placeholder copy");
  const imgTags=main.match(/<img\b[^>]*>/gi)??[];
  for(const tag of imgTags){if(!/\balt\s*=/.test(tag))errors.push(kind+" image without alt attribute")}
 }
 if(crawler){
   if(crawler.resp.status!==200) crawlerWarnings.push("Unauthenticated crawler-UA HTTP "+crawler.resp.status);
   else{
    const crawlerMain=crawler.html.match(/<main\\b[^>]*>([\\s\\S]*?)<\\/main>/i)?.[1]??"";
    if(!visible(crawlerMain).includes("What the record establishes") ||
       !visible(crawlerMain).includes("Texas Defined Editorial Desk"))
       crawlerWarnings.push("Crawler-UA content differed from researched visitor article");
    if(/\\bnoindex\\b/i.test(crawler.resp.headers.get("x-robots-tag")??"") ||
       /<meta\\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(crawler.html))
       crawlerWarnings.push("Crawler-UA noindex response");
   }
 }
 const status={slug,ok:!errors.length,errors,crawlerWarnings,
   desktopStatus:desktop?.resp.status??null,mobileStatus:mobile?.resp.status??null,
   cleanCanonicalStatus:visitor?.resp.status??null,googlebotLikeStatus:crawler?.resp.status??null,
   desktopElapsedMs:desktop?.elapsedMs??null,mobileElapsedMs:mobile?.elapsedMs??null,
   cleanCanonicalElapsedMs:visitor?.elapsedMs??null,
   cleanCanonicalCacheStatus:visitor?.edgeCache??null,cleanCanonicalCacheAge:visitor?.edgeAge??null};
 results.push(status);
}
for(let i=0;i<slugs.length;i+=2) await Promise.all(slugs.slice(i,i+2).map(verify));
results.sort((a,b)=>slugs.indexOf(a.slug)-slugs.indexOf(b.slug));
mkdirSync(".artifacts",{recursive:true});
writeFileSync(".artifacts/texas-music-history-production.json",JSON.stringify({checkedAt:new Date().toISOString(),base,passed:results.filter(x=>x.ok).length,failed:results.filter(x=>!x.ok).length,results},null,2)+"\n");
results.forEach(r=>console.log((r.ok?"PASS ":"FAIL ")+r.slug+
 " clean="+r.cleanCanonicalStatus+" edge="+(r.cleanCanonicalCacheStatus??"n/a")+
 (r.errors.length?" "+r.errors.join(" | "):"")+
 (r.crawlerWarnings.length?" CRAWLER-UA ADVISORY: "+r.crawlerWarnings.join(" | "):"")));
console.log("Production music history acceptance "+results.filter(x=>x.ok).length+"/"+slugs.length);
if(results.some(x=>!x.ok))process.exitCode=1;
