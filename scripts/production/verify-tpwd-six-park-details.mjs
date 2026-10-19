import { mkdirSync, writeFileSync } from "node:fs";

export const parks = [
 {slug:"kickapoo-cavern-state-park",name:"Kickapoo Cavern State Park",facts:["no trash service","Friday","Monday"],faq:"Can I visit Kickapoo Cavern on Wednesday?",county:"kinney"},
 {slug:"possum-kingdom-state-park",name:"Possum Kingdom State Park",facts:["cabins","kayak launch","December"],faq:"Can I book Possum Kingdom cabins in January?",county:"palo-pinto"},
 {slug:"lake-casa-blanca-international-state-park",name:"Lake Casa Blanca International State Park",facts:["courtesy dock","concrete boat ramps","shoreline"],faq:"Are the concrete boat ramps at Lake Casa Blanca closed?",county:"webb"},
 {slug:"lake-colorado-city-state-park",name:"Lake Colorado City State Park",facts:["Tuesday","Wednesday","self-pay"],faq:"Is Lake Colorado City State Park closed on Tuesdays?",county:"mitchell"},
 {slug:"purtis-creek-state-park",name:"Purtis Creek State Park",facts:["Beaver Slide Trail","primitive","October 23"],faq:"Is Purtis Creek closed entirely for the October and January hunts?",county:"henderson"},
 {slug:"martin-dies-jr-state-park",name:"Martin Dies, Jr. State Park",facts:["Hen House","day-use","charcoal"],faq:"Is the Hen House Ridge boat ramp open?",county:"jasper"},
];
const origins=["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
const evidence={version:"tpwd-six-live-v1",sha:process.env.GITHUB_SHA||"",checks:[],failures:[]};
const decode=text=>text.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&apos;|&#39;|&#x27;/g,"'").replace(/&ndash;|&#8211;/g,"–").replace(/&rsquo;|&#8217;/g,"’");
export function inspectParkHtml(raw,park){
 const html=decode(raw);
 const visible=decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]*>/g," ").replace(/\s+/g," ")).toLowerCase();
 const h1=decode((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||"").replace(/<[^>]*>/g,"")).trim();
 if(h1!==park.name)throw new Error("Wrong or missing park H1: "+h1);
 for(const needle of park.facts)if(!visible.includes(needle.toLowerCase()))throw new Error("Missing current park rule: "+needle);
 if(!visible.includes(park.faq.toLowerCase()))throw new Error("Specific source-linked FAQ not rendered");
 if(!html.includes('href="/county/'+park.county+'"'))throw new Error("Missing county internal link: "+park.county);
 if(!html.includes('href="https://tpwd.texas.gov/state-parks/'))throw new Error("Official TPWD link missing");
 const photo=html.match(/<img\b(?=[^>]*fetchpriority="high")[^>]*>/i)?.[0];
 if(!photo)throw new Error("Hero image not SSR-rendered");
 const src=photo.match(/\bsrc="([^"]+)"/i)?.[1],alt=photo.match(/\balt="([^"]+)"/i)?.[1];
 if(!src||!alt||alt.toLowerCase().includes("placeholder"))throw new Error("Missing or generic photo alt/source");
 if(!visible.includes("photography:"))throw new Error("Photograph source credit missing");
 return {slug:park.slug,imageSrc:src,imageAlt:alt,faq:true,officialSource:true,county:true};
}
const headers={"cache-control":"no-cache,no-store,max-age=0",pragma:"no-cache","user-agent":"TexasDefined-Scoped-StatePark-LiveQA/1.0"};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function fetchOnce(url){
 let last;
 for(let attempt=1;attempt<=2;attempt++){
  try{
   const response=await fetch(url,{cache:"no-store",redirect:"follow",headers,signal:AbortSignal.timeout(16000)});
   if(!response.ok)throw new Error("HTTP "+response.status);
   return {response,attempt};
  }catch(err){last=err;if(attempt<2)await sleep(900);}
 }
 throw last;
}
async function main(){
 const photoUrls=new Map();
 for(const origin of origins){
  for(const park of parks){
   const url=new URL("/destination/"+park.slug,origin);
   url.searchParams.set("park_acceptance",(process.env.GITHUB_SHA||"local").slice(0,10)+"-"+park.slug);
   try{
    const {response,attempt}=await fetchOnce(url.toString());
    if(!response.headers.get("content-type")?.includes("text/html"))throw new Error("Not HTML");
    const body=await response.text(),result=inspectParkHtml(body,park);
    evidence.checks.push({kind:"SSR-and-citations",origin,attempt,status:200,htmlBytes:body.length,...result});
    if(origin===origins[1])photoUrls.set(new URL(result.imageSrc,origin).toString(),park.slug);
   }catch(err){evidence.failures.push(origin+" "+park.slug+" "+String(err?.message||err));}
  }
 }
 for(const [url,slug] of photoUrls){
  try{
   const response=await fetch(url,{cache:"no-store",redirect:"follow",headers:{...headers,range:"bytes=0-65535"},signal:AbortSignal.timeout(16000)});
   if(!response.ok)throw new Error("HTTP "+response.status);
   const type=response.headers.get("content-type")||"";
   const bytes=new Uint8Array(await response.arrayBuffer());
   const jpeg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
   const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;
   const webp=String.fromCharCode(...bytes.slice(0,4))==="RIFF"&&String.fromCharCode(...bytes.slice(8,12))==="WEBP";
   if(!type.startsWith("image/")||bytes.length<1024||!(jpeg||png||webp))throw new Error("Not a JPEG, PNG or WebP photo: "+type);
   evidence.checks.push({kind:"real-photo-bytes",url,slug,type,bytes:bytes.length,status:response.status});
  }catch(err){evidence.failures.push(slug+" photo "+url+" "+String(err?.message||err));}
 }
 mkdirSync(".artifacts",{recursive:true});
 writeFileSync(".artifacts/tpwd-six-detail-live-acceptance.json",JSON.stringify(evidence,null,2));
 for(const item of evidence.checks)console.log("PASS",JSON.stringify(item));
 for(const err of evidence.failures)console.error("::error title=Six-state-park detail acceptance::"+err);
 if(evidence.failures.length)process.exitCode=1;
}
if(process.argv[1]?.endsWith("verify-tpwd-six-park-details.mjs"))await main();
