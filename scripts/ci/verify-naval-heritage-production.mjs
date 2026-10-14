#!/usr/bin/env node
/**
 * Post-deployment authority check. Verify served SSR, not source fixtures.
 * External image pixel loading and visual viewport inspections are out of scope.
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
   const photos=imgs.filter(v=>/commons\.wikimedia\.org|upload\.wikimedia\.org/.test(v.src));
   if(photos.length<c.minimum)errors.push("expected "+c.minimum+" archival photo tags, found "+photos.length);
   for(const photo of photos)if(!photo.alt.trim())errors.push("image without alt: "+photo.src.slice(0,80));
   for(const file of c.images)if(!photos.some(photo=>photo.src.includes(file)))errors.push("expected photo missing from img tag: "+file);
   if(/this story is no longer available|story unavailable/i.test(text))errors.push("story unavailable fallback");
   last={path:c.path,http:r.status,images:photos.length,canonical:canonical?attr(canonical,"href"):null,errors};
   if(!errors.length)break;
   console.error("Attempt "+attempt+" "+c.path+": "+errors.join("; "));
  }catch(error){last={path:c.path,errors:["fetch error: "+String(error)]};console.error("Attempt "+attempt+" "+c.path+": "+error)}
  if(attempt<3)await pause(2800);
 }
 results.push(last);
 if(!last.errors.length)console.log("PASS "+c.path+": "+last.images+" rendered archival images");
}
const failures=results.filter(v=>v.errors.length);
await mkdir(".artifacts",{recursive:true});
await writeFile(".artifacts/naval-heritage-production.json",JSON.stringify({sha,checkedAt:new Date().toISOString(),results,scope:"live SSR, attributes, links and photo tags; no external image pixel verification"},null,2));
console.log(JSON.stringify({sha,checked:results.length,passed:results.length-failures.length,failed:failures.length},null,2));
if(failures.length)process.exitCode=1;
