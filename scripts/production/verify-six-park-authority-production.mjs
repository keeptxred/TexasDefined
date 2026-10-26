import { mkdirSync, writeFileSync } from "node:fs";
const sites=[
 {slug:"brazos-bend-state-park",county:"fort-bend",words:["wood","charcoal","November 17"],source:"brazos-bend"},
 {slug:"guadalupe-river-state-park",county:"comal",words:["charcoal","November 20","January 11"],source:"guadalupe-river"},
 {slug:"pedernales-falls-state-park",county:"blanco",words:["January 1, 2027","charcoal","falls"],source:"pedernales-falls"},
 {slug:"fort-boggy-state-park",county:"leon",words:["Lake Trail","January 17","November 15"],source:"fort-boggy"},
 {slug:"lake-mineral-wells-state-park",county:"parker",words:["propane","charcoal","fires"],source:"lake-mineral-wells"},
 {slug:"galveston-island-state-park",county:"galveston",words:["71","95","boardwalk"],source:"galveston-island"},
];
// Park-specific licensed heroes can originate in the state-park catalog or
// the original Lakes/Rivers/Coast editorial gallery. Never accept generic photos.
const approvedAlternateHeroPaths={
 "guadalupe-river-state-park":["/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"],
 "pedernales-falls-state-park":["/images/explore/lakes-rivers/pedernales-falls-state-park.jpg"],
 "galveston-island-state-park":["/images/explore/beaches-coast/galveston-island-state-park.jpg"],
};
function approvedHeroPaths(site){
 return ["/images/state-parks/"+site.slug+".jpg",...(approvedAlternateHeroPaths[site.slug]||[])];
}
const origins=["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
const report={scope:"six-park-live-photo-2026-10-18",verified:[],failures:[],targetCount:12};
function visibleText(html){return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ");}
export function inspectParkHtml(raw,site){
 const visible=visibleText(raw),lower=visible.toLowerCase();
 const h1=raw.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
 if(!h1||!visibleText(h1[1]).toLowerCase().includes(site.slug.replace("-state-park","").replaceAll("-"," ")))throw Error("Missing correct visible park heading: "+site.slug);
 if(!raw.includes('href="/county/'+site.county+'"'))throw Error("County crosslink missing "+site.slug);
 if(!raw.includes("tpwd.texas.gov/state-parks/"+site.source))throw Error("Official park link missing "+site.slug);
 for(const word of site.words)if(!lower.includes(word.toLowerCase()))throw Error("Sourced visitor restriction missing "+site.slug+": "+word);
 if(!/Photography:|Wikimedia Commons|National Park Service/i.test(visible))throw Error("Visible licensed hero attribution missing "+site.slug);
 const heroTags=(raw.match(/<img\b[^>]*>/gi)||[]).filter(tag=>/\s+alt="[^"]+"/.test(tag));
 const heroPath=approvedHeroPaths(site).find(path=>heroTags.some(tag=>tag.includes(path)));
 if(!heroPath)throw Error("Approved park-specific photo or its alt text missing "+site.slug+" ("+approvedHeroPaths(site).join(", ")+")");
 if(/<meta\s+name="robots"\s+content="noindex/i.test(raw))throw Error("Park unexpectedly noindex "+site.slug);
 if(!raw.includes("https://texasdefined.com/destination/"+site.slug))throw Error("Missing self canonical URL "+site.slug);
 return {county:site.county,verifiedVisitorFacts:site.words.length,heroPath};
}
async function verifyHeroBytes(origin,site,heroPath){
 const image=new URL(heroPath,origin);
 const response=await fetch(image,{cache:"no-store",redirect:"follow",signal:AbortSignal.timeout(15000),headers:{"cache-control":"no-cache","user-agent":"TexasDefined-StatePark-Photo-Acceptance/1.0",range:"bytes=0-65535"}});
 if(!response.ok||response.headers.get("cf-mitigated")==="challenge")throw Error("Park hero HTTP "+response.status+": "+site.slug);
 const type=(response.headers.get("content-type")||"").toLowerCase();
 const bytes=new Uint8Array(await response.arrayBuffer());
 if(!type.includes("image/jpeg")||bytes.length<1024||bytes[0]!==255||bytes[1]!==216||bytes[2]!==255)throw Error("Park hero failed JPEG MIME/signature check: "+site.slug+" "+type+" bytes "+bytes.length);
 return {heroUrl:image.pathname,heroMime:type,heroBytes:bytes.length};
}
async function inspectOrigin(origin,site){
 let last;
 for(let attempt=1;attempt<=2;attempt++){
  const url=new URL("/destination/"+site.slug,origin);
  url.searchParams.set("park_authority_probe",(process.env.GITHUB_SHA||"manual")+"-"+attempt);
  try{
   const response=await fetch(url,{cache:"no-store",redirect:"follow",signal:AbortSignal.timeout(15000),headers:{"cache-control":"no-cache","user-agent":"TexasDefined-Park-Editorial-Acceptance/1.0"}});
   if(!response.ok||response.headers.get("cf-mitigated")==="challenge")throw Error("HTTP "+response.status);
   const html=await response.text(),checked=inspectParkHtml(html,site);
   const hero=await verifyHeroBytes(origin,site,checked.heroPath);
   report.verified.push({origin,slug:site.slug,status:response.status,bytes:html.length,...checked,...hero});return;
  }catch(e){last=e;}
 }
 throw Error(origin+" "+site.slug+": "+(last?.message||last));
}
export async function main(){
 for(const origin of origins)for(const site of sites){
  try{await inspectOrigin(origin,site);}catch(e){report.failures.push(String(e?.message||e));}
 }
 mkdirSync(".artifacts",{recursive:true});
 writeFileSync(".artifacts/six-park-authority-production.json",JSON.stringify(report,null,2));
 for(const item of report.verified)console.log("PASS "+JSON.stringify(item));
 for(const e of report.failures)console.error("::error title=Six park authority live gap::"+e);
 if(report.failures.length)process.exitCode=1;
}
if(process.argv[1]?.endsWith("verify-six-park-authority-production.mjs"))await main();
