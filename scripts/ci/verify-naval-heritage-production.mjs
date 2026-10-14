#!/usr/bin/env node
/**
 * Post-deployment authority check. Verify served SSR, not source fixtures.
 * Validates live source image delivery as well as SSR tags; visual viewport inspection is separate.
 */
import {mkdir,writeFile} from "node:fs/promises";
const origin=(process.env.TD_PRODUCTION_ORIGIN||"https://texasdefined.com").replace(/\/+$/,"");
const sha=process.env.PRODUCTION_COMMIT_SHA||process.env.DEPLOY_SHA||"manual";
const cases=[
 {path:"/article/uss-lexington-cv16-history-visitor-guide",phrases:["USS Lexington (CV-16)","Blue Ghost","aircraft carrier","Matthew T Rader"],links:["/destination/uss-lexington-museum-corpus-christi","/article/battleship-texas-bb-35-history-restoration"],images:["Launch%20of%20USS%20Lexington","underway%20on%2013%20June%201944","launching%20planes%20in%201956"],minimum:7},
 {path:"/destination/uss-lexington-museum-corpus-christi",phrases:["USS Lexington Museum","LEX LIFT","$25","$5","October 14, 2026"],links:["/article/uss-lexington-cv16-history-visitor-guide","/article/battleship-texas-bb-35-history-restoration"],images:["Launch%20of%20USS%20Lexington","underway%20on%2013%20June%201944"],minimum:3},
 {path:"/article/battleship-texas-bb-35-history-restoration",phrases:["Battleship Texas","USS Lexington","Normandy","Kingfisher"],links:["/article/uss-lexington-cv16-history-visitor-guide","/article/uss-texas-1895-original-battleship"],images:["USS%20Texas%20(BB-35)%201914","Kingfisher%20off%20Iwo%20Jima"],minimum:8},
 {path:"/article/uss-texas-1895-original-battleship",phrases:["The First USS Texas","San Marcos","Santiago de Cuba","USS Lexington"],links:["/article/uss-lexington-cv16-history-visitor-guide","/article/battleship-texas-bb-35-history-restoration"],images:["USSTexas(1892)Diagram.png","USS%20Texas%20in%201898"],minimum:5},
 {path:"/destination/battleship-texas",phrases:["Battleship Texas","Gulf Copper","Pier 21","Pier 15"],links:["/article/battleship-texas-bb-35-history-restoration"],images:["USS%20Texas%20(BB-35)%201914","USS%20Texas-6.jpg"],minimum:4},
];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const decode=s=>s.replace(/&amp;/gi,"&").replace(/&quot;/gi,'"').replace(/&#39;|&#x27;/gi,"'").replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
const attr=(s,n)=>decode((new RegExp("\\b"+n+"\\s*=\\s*[\"']([^\"']*)[\"']","i").exec(s)||[])[1]||"");
const plain=s=>decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ")).replace(/\s+/g," ");

function originPhotoUrl(src) {
  try {
    const served=new URL(src,origin);
    // Articles deliberately use /media/remote?url=<encoded Wikimedia URL>,
    // so match canonical filenames against the upstream URL, not %2520-encoded HTML.
    if (served.pathname==="/media/remote") return served.searchParams.get("url") || "";
    return served.href;
  } catch {return "";}
}
async function verifyImageBytes(src) {
  const url=new URL(src,origin);
  // Don't fetch arbitrary URLs surfaced by a document: only this site's broker,
  // or the two image hosts already authorized by the editorial delivery system.
  if(url.protocol!=="https:" || ![new URL(origin).hostname,"commons.wikimedia.org","upload.wikimedia.org"].includes(url.hostname)) {
    return "photo media host not authorized: "+url.hostname;
  }
  try {
    const response=await fetch(url,{redirect:"follow",signal:AbortSignal.timeout(16000),headers:{"User-Agent":"TexasDefined-Naval-Photo-Delivery/1.0","Accept":"image/jpeg,image/png,image/webp,image/avif,image/*"}});
    const contentType=(response.headers.get("content-type") || "").toLowerCase();
    if(!response.ok || !contentType.startsWith("image/")) {
      await response.body?.cancel();
      return "photo GET HTTP "+response.status+" with MIME "+contentType;
    }
    const reader=response.body?.getReader();
    const first=reader ? await reader.read() : {value:undefined};
    await reader?.cancel();
    const bytes=first.value || new Uint8Array();
    const jpeg=bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
    const png=bytes[0]===137 && bytes[1]===80 && bytes[2]===78 && bytes[3]===71;
    const riff=String.fromCharCode(...bytes.slice(0,4))==="RIFF";
    const avif=String.fromCharCode(...bytes.slice(4,12)).includes("avif");
    if(!jpeg && !png && !riff && !avif) return "photo MIME is image/* but body has unexpected file signature: "+contentType;
    return null;
  } catch (error) { return "photo GET failed: "+String(error); }
}

const results=[];
for(const c of cases){
 let last;
 for(let attempt=1;attempt<=3;attempt++){
  try{
   const url=origin+c.path+"?naval_authority_check="+encodeURIComponent(sha)+"-"+attempt;
   const r=await fetch(url,{redirect:"follow",signal:AbortSignal.timeout(26000),headers:{"User-Agent":"TexasDefined-Naval-Authority-Production/1.0","Cache-Control":"no-cache"}});
   const html=await r.text(),decoded=decode(html),text=plain(html).toLowerCase(),errors=[];
   if(r.status!==200)errors.push("HTTP "+r.status);
   if(!(r.headers.get("content-type")||"").includes("text/html"))errors.push("not HTML");
   const canonical=(html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)||[])[0];
   if(!canonical||attr(canonical,"href")!==origin+c.path)errors.push("missing/wrong canonical");
   if(/<meta\b(?=[^>]*name=["']robots["'])(?=[^>]*noindex)[^>]*>/i.test(html))errors.push("noindex");
   for(const phrase of c.phrases)if(!text.includes(phrase.toLowerCase()))errors.push("missing visible phrase: "+phrase);
   for(const link of c.links)if(!decoded.includes(link))errors.push("missing cross-link: "+link);
   const imgs=(html.match(/<img\b[^>]*>/gi)||[]).map(tag=>({src:attr(tag,"src"),alt:attr(tag,"alt")}));
   const photos=imgs.map(v=>({...v,originUrl:originPhotoUrl(v.src)})).filter(v=>/^https:\/\/(?:commons|upload)\.wikimedia\.org\//.test(v.originUrl));
   if(photos.length<c.minimum)errors.push("expected "+c.minimum+" archival photo tags, found "+photos.length);
   for(const photo of photos)if(!photo.alt.trim())errors.push("image without alt: "+photo.src.slice(0,80));
   const checkedPhotos=[];
   for(const file of c.images){
     const match=photos.find(photo=>photo.originUrl.includes(file));
     if(!match)errors.push("expected photo missing from rendered img tag: "+file);
     else checkedPhotos.push({marker:file,servedSrc:match.src,source:match.originUrl});
   }
   if(checkedPhotos.length){
     // One live media-binary probe per page catches cached 404/429/HTML responses
     // that source-code-only or img-tag-only checks cannot establish.
     const sampled=checkedPhotos[0];
     const imageFailure=await verifyImageBytes(sampled.servedSrc);
     if(imageFailure)errors.push("live photo "+sampled.marker+": "+imageFailure);
   }
   if(/this story is no longer available|story unavailable/i.test(text))errors.push("story unavailable fallback");
   last={path:c.path,http:r.status,images:photos.length,matchedPhotos:checkedPhotos.length,canonical:canonical?attr(canonical,"href"):null,errors,photoSourcesOnFailure:errors.length?photos.slice(0,14).map(p=>p.originUrl):undefined};
   if(!errors.length)break;
   console.error("Attempt "+attempt+" "+c.path+": "+errors.join("; "));
  }catch(error){last={path:c.path,errors:["fetch error: "+String(error)]};console.error("Attempt "+attempt+" "+c.path+": "+error)}
  if(attempt<3)await pause(2800);
 }
 results.push(last);
 if(!last.errors.length)console.log("PASS "+c.path+": "+last.images+" rendered archival images");
}
// The closed museum is an indexable historical reference, not a visit-planner
// recommendation. The Explore sitemap must reflect that editorial distinction.
try {
  const response=await fetch(origin+"/sitemap-explore.xml?naval_sitemap_check="+encodeURIComponent(sha),{
    redirect:"follow",signal:AbortSignal.timeout(25000),
    headers:{"User-Agent":"TexasDefined-Naval-Sitemap-Acceptance/1.0"}
  });
  const xml=await response.text();
  const permalink="<loc>"+origin+"/destination/battleship-texas</loc>";
  if(!response.ok || !xml.includes(permalink)){
    results.push({path:"/sitemap-explore.xml",errors:["quality-gated closed Battleship Texas historical reference is missing from Explore sitemap (HTTP "+response.status+")"]});
  } else console.log("PASS historical Battleship Texas canonical in Explore sitemap");
} catch(error){
  results.push({path:"/sitemap-explore.xml",errors:["Explore sitemap fetch: "+String(error)]});
}

const failures=results.filter(v=>v.errors.length);
await mkdir(".artifacts",{recursive:true});
await writeFile(".artifacts/naval-heritage-production.json",JSON.stringify({sha,checkedAt:new Date().toISOString(),results,scope:"live SSR, canonical, links, normalized upstream photo URLs and one real photo binary per naval page; responsive-layout inspection separate"},null,2));
console.log(JSON.stringify({sha,checked:results.length,passed:results.length-failures.length,failed:failures.length},null,2));
if(failures.length)process.exitCode=1;
