import { mkdirSync, writeFileSync } from "node:fs";

const codes = ["alfl","amis","bibe","bith","blsc","buov","cham","elte","elca","foda","gumo","lamr","lyjo","pais","paal","rigr","saan","waco"];
const origins = ["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
const photoUrl = "https://www.nps.gov/common/uploads/structured_data/3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg";
const verifyTag = [process.env.GITHUB_SHA || "manual",process.env.GITHUB_RUN_ID || "local"].join("-");
const evidence = { version:"nps-18-guides-live-2026-10-18",sha:process.env.GITHUB_SHA||"",checked:[],failures:[] };
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
 if(!section.includes('href="/destination/amistad-national-recreation-area"'))throw new Error("Existing Amistad local federal guide must be linked from the rendered NPS index");
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

export function verifyAmistadHtml(raw){
 const html=unescapeAttributes(raw);
 if(!/<h1\b[^>]*>\s*Amistad National Recreation Area\s*<\/h1>/i.test(html))throw new Error("Amistad federal destination H1 missing");
 if(!html.includes("www.nps.gov/amis/"))throw new Error("Amistad original NPS source not linked");
 if(!html.includes("/images/explore/lakes-rivers/amistad-national-recreation-area.jpg"))throw new Error("Specific Amistad landscape hero not present");
 if(!html.includes("National Park Service")||!html.includes("Public domain"))throw new Error("NPS ownership or public-domain Amistad photo credit missing");
 if(!html.includes("Lake Use Pass"))throw new Error("Amistad boat permitting authority guidance missing from live page");
 return {park:"Amistad National Recreation Area",officialSource:"nps.gov/amis",image:"/images/explore/lakes-rivers/amistad-national-recreation-area.jpg"};
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
   const result=kind==="directory"?verifyDirectoryHtml(body):kind==="battlefield"?verifyBattlefieldHtml(body):verifyAmistadHtml(body);
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

async function verifyAmistadPhotoBytes(origin){
 const path="/images/explore/lakes-rivers/amistad-national-recreation-area.jpg";
 const response=await fetch(new URL(path,origin),{cache:"no-store",redirect:"follow",headers:{...headers(),range:"bytes=0-65535"},signal:AbortSignal.timeout(16000)});
 if(!response.ok||response.headers.get("cf-mitigated")==="challenge")throw new Error("Amistad exact-site photo HTTP "+response.status+" at "+origin);
 const mime=(response.headers.get("content-type")||"").toLowerCase(),bytes=new Uint8Array(await response.arrayBuffer());
 if(!mime.includes("image/jpeg")||bytes.length<1024||bytes[0]!==255||bytes[1]!==216||bytes[2]!==255)throw new Error("Amistad photo does not return valid JPEG bytes at "+origin+" mime="+mime+" length="+bytes.length);
 evidence.checked.push({kind:"amistad-photo-bytes",origin,path,status:response.status,mime,bytes:bytes.length});
}
export async function main(){
 for(const origin of origins){
  for(const [path,kind] of [["/explore/national-parks","directory"],["/destination/palo-alto-battlefield-national-historical-park","battlefield"],["/destination/amistad-national-recreation-area","amistad"]]){
   try{await fetchHtml(origin,path,kind);}catch(e){evidence.failures.push(String(e?.message||e));}
  }
  try{await verifyAmistadPhotoBytes(origin);}catch(e){evidence.failures.push(String(e?.message||e));}
 }
 try{await verifyPhotoBytes();}catch(e){evidence.failures.push(String(e?.message||e));}
 mkdirSync(".artifacts",{recursive:true});
 writeFileSync(".artifacts/nps-park-live-acceptance.json",JSON.stringify(evidence,null,2));
 for(const item of evidence.checked)console.log("PASS",JSON.stringify(item));
 for(const err of evidence.failures)console.error("::error title=NPS exact-page production acceptance::"+err);
 if(evidence.failures.length)process.exitCode=1;
}
if(process.argv[1]?.endsWith("verify-nps-park-production.mjs"))await main();
