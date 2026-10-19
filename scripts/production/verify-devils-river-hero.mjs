import { mkdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
const photo="https://upload.wikimedia.org/wikipedia/commons/b/b1/Devils_River_-_Dolan_Falls_%28174119624%29.jpg";
const license="https://creativecommons.org/licenses/by-sa/2.0/";
const site="/destination/devils-river-state-natural-area";
const origins=["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
const record={id:"devils-river-photo-acceptance-20261018",sha:process.env.GITHUB_SHA||"unknown",pages:[],photo:null,failures:[]};
const headers={"user-agent":"TexasDefined-Sourced-Park-Hero-Acceptance/1.0","cache-control":"no-cache, no-store",pragma:"no-cache"};

function visibleText(html) {
 return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ");
}
export function inspectDevilsRiverHtml(html) {
 const body=visibleText(html);
 if(!body.includes("Devils River State Natural Area"))throw Error("Wrong destination");
 if(!html.includes('href="/county/val-verde"'))throw Error("Val Verde internal county route missing");
 if(!html.includes("tpwd.texas.gov/state-parks/devils-river"))throw Error("Official TPWD route missing");
 const imgTags=[...html.matchAll(/<img\b[^>]*>/gi)].map(x=>x[0]);
 const hero=imgTags.find(x=>x.includes("Dolan Falls")&&x.includes("not an advertised public trailhead"));
 if(!hero)throw Error("The actual Devils River hero or accurate waterfall alt text is missing");
 const heroSrc=hero.match(/\bsrc="([^"]+)"/)?.[1]?.replace(/&amp;/g,"&")||"";
 // Production converts the licensed Wikimedia URL into a first-party
 // /media/remote proxy. An exact query match prevents another image URL
 // from inheriting this photographer's provenance or passing acceptance.
 const approvedProxy="/media/remote?url="+encodeURIComponent(photo);
 if(heroSrc!==photo&&heroSrc!==approvedProxy)throw Error("Hero source is not the exact approved photo or image-delivery proxy: "+heroSrc.slice(0,160));
 if(!body.includes("Clinton")||!body.includes("Robertson"))throw Error("Original photographer not credited");
 if(!html.includes("https://commons.wikimedia.org/wiki/File:Devils_River_-_Dolan_Falls_"))throw Error("Commons original source link missing");
 if(!html.includes(license))throw Error("CC BY-SA 2.0 legal attribution link missing");
 if(html.includes('src="/images/explore/lakes-rivers/devils-river-state-natural-area.jpg"'))throw Error("Old millipede hero still active");
 return {park:"devils-river-state-natural-area",source:photo,heroSrc,license,photoCredit:true};
}
function jpegSize(bytes){
 if(bytes.length<100||bytes[0]!==0xff||bytes[1]!==0xd8)throw Error("Not a JPEG by magic bytes");
 let i=2;
 while(i+8<bytes.length){
  if(bytes[i]!==0xff){i++;continue;}
  const marker=bytes[i+1];i+=2;
  if(marker===0xd9||marker===0xda)break;
  if(marker===0xd8||marker===0x01||marker>=0xd0&&marker<=0xd7)continue;
  const len=(bytes[i]<<8)+bytes[i+1];if(len<2||i+len>bytes.length)break;
  if([0xc0,0xc1,0xc2,0xc3].includes(marker))return {height:(bytes[i+3]<<8)+bytes[i+4],width:(bytes[i+5]<<8)+bytes[i+6]};
  i+=len;
 }
 throw Error("JPEG dimensions unavailable");
}
async function fetchOne(origin) {
 let last;
 for(let attempt=1;attempt<=2;attempt++){
  try{
   const url=new URL(site,origin);url.searchParams.set("devils_river_photo_probe",(process.env.GITHUB_SHA||"manual")+"-"+attempt);
   const response=await fetch(url,{cache:"no-store",redirect:"follow",headers,signal:AbortSignal.timeout(16000)});
   if(response.status!==200||response.headers.get("cf-mitigated")==="challenge")throw Error("HTTP "+response.status);
   if(!(response.headers.get("content-type")||"").includes("text/html"))throw Error("Not an HTML destination");
   const html=await response.text();
   const check=inspectDevilsRiverHtml(html);
   const sitePhoto=await checkDeliveredPhoto(origin,check.heroSrc);
   record.pages.push({origin,attempt,htmlBytes:html.length,...check,...sitePhoto});
   return;
  }catch(error){last=error;}
 }
 throw Error(origin+" "+site+" verification failed after 2 attempts: "+String(last?.message||last));
}
async function checkDeliveredPhoto(origin,heroSrc){
 if(!heroSrc.startsWith("/media/remote?"))throw Error("External hero bypassed first-party image delivery");
 const url=new URL(heroSrc,origin);
 if(url.pathname!=="/media/remote"||url.searchParams.get("url")!==photo)throw Error("Photo proxy references a different Wikimedia asset");
 const r=await fetch(url,{cache:"no-store",headers:{...headers,range:"bytes=0-65535"},signal:AbortSignal.timeout(16000),redirect:"follow"});
 if(!r.ok||r.headers.get("cf-mitigated")==="challenge")throw Error("Site-owned Devils River image proxy HTTP "+r.status);
 const mime=(r.headers.get("content-type")||"").toLowerCase();
 if(!mime.includes("image/jpeg"))throw Error("Site-owned Devils River image proxy MIME "+mime);
 const bytes=new Uint8Array(await r.arrayBuffer()),size=jpegSize(bytes);
 if(size.width!==800||size.height!==415)throw Error("Proxied image dimensions differ from Commons original: "+JSON.stringify(size));
 return {proxiedImageStatus:r.status,proxiedMime:mime,proxiedBytes:bytes.length,...size};
}

async function checkImage(){
 const response=await fetch(photo,{cache:"no-store",redirect:"follow",headers:{...headers,range:"bytes=0-65535"},signal:AbortSignal.timeout(16000)});
 if(!response.ok||response.headers.get("cf-mitigated")==="challenge")throw Error("Photo URL HTTP "+response.status);
 const type=response.headers.get("content-type")||"";
 if(!type.toLowerCase().includes("image/jpeg"))throw Error("Photo URL returns "+type+" rather than JPEG");
 const bytes=new Uint8Array(await response.arrayBuffer());
 const size=jpegSize(bytes);
 if(size.width!==800||size.height!==415)throw Error("Photo source differs from attributed 800x415 Commons original: "+JSON.stringify(size));
 record.photo={url:photo,http:response.status,mime:type,receivedBytes:bytes.length,...size};
}
export async function main(){
 for(const origin of origins)try{await fetchOne(origin);}catch(error){record.failures.push(String(error.message||error));}
 try{await checkImage();}catch(error){record.failures.push(String(error.message||error));}
 mkdirSync(".artifacts",{recursive:true});writeFileSync(".artifacts/devils-river-hero-acceptance.json",JSON.stringify(record,null,2));
 for(const item of record.pages)console.log("PASS",JSON.stringify(item));
 if(record.photo)console.log("PASS",JSON.stringify(record.photo));
 for(const error of record.failures)console.error("::error title=Devils River photographic authority::"+error);
 if(record.failures.length)process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
