import { mkdirSync, writeFileSync } from "node:fs";

const codes = ["alfl","amis","bibe","bith","blsc","buov","cham","elte","elca","foda","gumo","lamr","lyjo","pais","paal","rigr","saan","waco"];
const origins = ["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
const photoUrl = "https://www.nps.gov/common/uploads/structured_data/3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg";
const verifyTag = [process.env.GITHUB_SHA || "manual",process.env.GITHUB_RUN_ID || "local"].join("-");
const evidence = { version:"nps-park-live-2026-10-18",sha:process.env.GITHUB_SHA||"",checked:[],failures:[] };
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function unescapeAttributes(text){return text.replace(/&amp;/g,"&").replace(/&quot;/g,'"');}
/** Check real anchor tags inside a rendered section rather than JS preload strings. */
export function verifyDirectoryHtml(raw){
 const html=unescapeAttributes(raw);
 const renderedSections=[...html.matchAll(/<section\b[^>]*\bid="complete-texas-nps-inventory"/g)];
 if(renderedSections.length!==1)throw new Error("Expected exactly one real HTML section for the NPS inventory; found "+renderedSections.length);
 const start=renderedSections[0].index,end=html.indexOf("</section>",start);
 if(end<0)throw new Error("NPS inventory closing section not rendered");
 const section=html.slice(start,end+10);
 if(!section.includes("18 National Park Service designations"))throw new Error("Full federal inventory heading absent");
 const links=[...section.matchAll(/<a\b[^>]*href="https:\/\/www\.nps\.gov\/([a-z]{4})\/"[^>]*>/g)].map(m=>m[1]);
 if(links.length!==18||new Set(links).size!==18)throw new Error("Expected 18 distinct rendered official NPS links; found "+links.length);
 for(const code of codes)if(!links.includes(code))throw new Error("Missing Texas NPS unit "+code);
 if(!section.includes("TexasDefined guide"))throw new Error("Existing internal federal guide links absent");
 if(section.includes('href="/destination/amistad-national-recreation-area"'))throw new Error("Unverified Amistad local guide incorrectly linked");
 return {uniqueFederalLinks:links.length,localGuideMentions:(section.match(/TexasDefined guide/g)||[]).length};
}
export function verifyBattlefieldHtml(raw){
 const html=unescapeAttributes(raw);
 if(!html.includes("Palo Alto Battlefield National Historical Park"))throw new Error("Not the Palo Alto authority page");
 if(!html.includes("3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg"))throw new Error("Official Palo Alto NPS photo absent");
 if(!html.includes("Blue Mexican eight-pound field gun"))throw new Error("Actual photographed subject not identified in alt");
 if(!html.includes("National Park Service"))throw new Error("Official photo credit absent");
 if(html.includes('Special:Redirect/file/Palo_Alto_Battlefield'))throw new Error("Retired Wikimedia image redirect still rendered");
 return {photo:photoUrl,credited:true};
}
/** Chamizal was historically omitted from the NPS live acceptance despite a rewritten guide.
 * Assert rendered destination content on both direct Worker and canonical domain.
 */
export function verifyChamizalHtml(raw) {
 const html=unescapeAttributes(raw);
 const required=[
  ["page identity","Chamizal National Memorial"],
  ["treaty-era chronology","John F. Kennedy"],
  ["treaty effective date","January 14, 1964"],
  ["1968 river channel","1968"],
  ["community relocation","5,000 El Paso residents"],
  ["cultural mural","Nuestra Herencia"],
  ["museum visiting details","Tuesday"],
  ["memorial admission","free"],
  ["El Paso history connections","Magoffin Home"],
  ["NPS public-domain photographic credit","Public domain"],
  ["historical documentary image","Documentary photographs"],
 ];
 for(const [label,needle] of required)if(!html.includes(needle))throw new Error("Chamizal "+label+" missing: "+needle);
 const forbidden=["Chamizal National Memorial occupies a significant landscape within El Paso, commemorating",
  "Tours and experiences near Chamizal National Memorial", "First-time focused visit",
  "during Lyndon B. Johnson’s administration"];
 for(const needle of forbidden)if(html.includes(needle))throw new Error("Stale Chamizal content survives: "+needle.slice(0,60));
 return {checked:required.length,staleMarkersRemoved:true};
}
const headers=()=>({"cache-control":"no-cache, no-store, max-age=0",pragma:"no-cache","user-agent":"TexasDefined-NPS-Authority-Acceptance/1.0"});
async function fetchHtml(origin,path,kind){
 let last;
 for(let i=1;i<=3;i++){
  const url=new URL(path,origin);
  url.searchParams.set("park_acceptance",verifyTag+"-"+kind+"-"+i);
  try{
   const response=await fetch(url,{cache:"no-store",redirect:"follow",headers:headers(),signal:AbortSignal.timeout(16000)});
   if(response.status!==200||response.headers.get("cf-mitigated")==="challenge")throw new Error("HTTP "+response.status+" or edge challenge");
   if(!response.headers.get("content-type")?.includes("text/html"))throw new Error("Not HTML");
   const body=await response.text();
   const result=kind==="directory"?verifyDirectoryHtml(body):kind==="battlefield"?verifyBattlefieldHtml(body):verifyChamizalHtml(body);
   evidence.checked.push({origin,path,kind,status:200,attempt:i,htmlBytes:body.length,...result});
   return;
  }catch(e){last=e;if(i<3)await sleep(1500);}
 }
 throw new Error(origin+path+" "+kind+" failed: "+(last?.message||last));
}
async function verifyPhotoBytes(){
 const response=await fetch(photoUrl,{cache:"no-store",redirect:"follow",headers:{...headers(),range:"bytes=0-65535"},signal:AbortSignal.timeout(16000)});
 if(!response.ok||response.headers.get("cf-mitigated")==="challenge")throw new Error("Official Palo Alto NPS JPEG HTTP "+response.status);
 const type=response.headers.get("content-type")||"";
 const bytes=new Uint8Array(await response.arrayBuffer());
 if(!type.toLowerCase().includes("image/jpeg")||bytes.length<1024||bytes[0]!==255||bytes[1]!==216||bytes[2]!==255){
  throw new Error("Palo Alto source is not a valid JPEG: "+type+" length "+bytes.length);
 }
 evidence.checked.push({kind:"official-photo-bytes",photo:photoUrl,status:response.status,mime:type,bytes:bytes.length});
}
export async function main(){
 for(const origin of origins){
  for(const [path,kind] of [["/explore/national-parks","directory"],["/destination/palo-alto-battlefield-national-historical-park","battlefield"],["/destination/chamizal-national-memorial","chamizal"]]){
   try{await fetchHtml(origin,path,kind);}catch(e){evidence.failures.push(String(e?.message||e));}
  }
 }
 try{await verifyPhotoBytes();}catch(e){evidence.failures.push(String(e?.message||e));}
 mkdirSync(".artifacts",{recursive:true});
 writeFileSync(".artifacts/nps-park-live-acceptance.json",JSON.stringify(evidence,null,2));
 for(const item of evidence.checked)console.log("PASS",JSON.stringify(item));
 for(const err of evidence.failures)console.error("::error title=NPS exact-page production acceptance::"+err);
 if(evidence.failures.length)process.exitCode=1;
}
if(process.argv[1]?.endsWith("verify-nps-park-production.mjs"))await main();
