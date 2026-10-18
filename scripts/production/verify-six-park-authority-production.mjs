import { mkdirSync, writeFileSync } from "node:fs";
const sites=[
 {slug:"brazos-bend-state-park",county:"fort-bend",words:["wood","charcoal","November 17"],source:"brazos-bend"},
 {slug:"guadalupe-river-state-park",county:"comal",words:["charcoal","November 20","January 11"],source:"guadalupe-river"},
 {slug:"pedernales-falls-state-park",county:"blanco",words:["January 1, 2027","charcoal","falls"],source:"pedernales-falls"},
 {slug:"fort-boggy-state-park",county:"leon",words:["Lake Trail","January 17","November 15"],source:"fort-boggy"},
 {slug:"lake-mineral-wells-state-park",county:"parker",words:["propane","charcoal","fires"],source:"lake-mineral-wells"},
 {slug:"galveston-island-state-park",county:"galveston",words:["71","95","boardwalk"],source:"galveston-island"},
];
const origins=["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
const report={scope:"six-park-live-2026-10-18",verified:[],failures:[],targetCount:12};
function visibleText(html){return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ");}
export function inspectParkHtml(raw,site){
 const visible=visibleText(raw),lower=visible.toLowerCase();
 const h1=raw.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
 if(!h1||!visibleText(h1[1]).toLowerCase().includes(site.slug.replace("-state-park","").replaceAll("-"," ")))throw Error("Missing correct visible park heading: "+site.slug);
 if(!raw.includes('href="/county/'+site.county+'"'))throw Error("County crosslink missing "+site.slug);
 if(!raw.includes("tpwd.texas.gov/state-parks/"+site.source))throw Error("Official park link missing "+site.slug);
 for(const word of site.words)if(!lower.includes(word.toLowerCase()))throw Error("Sourced visitor restriction missing "+site.slug+": "+word);
 if(!/Photography:|Wikimedia Commons|National Park Service/i.test(visible))throw Error("Visible licensed hero attribution missing "+site.slug);
 if(!/<img\b[^>]*alt=/.test(raw))throw Error("Hero image element absent "+site.slug);
 if(/<meta\s+name="robots"\s+content="noindex/i.test(raw))throw Error("Park unexpectedly noindex "+site.slug);
 if(!raw.includes("https://texasdefined.com/destination/"+site.slug))throw Error("Missing self canonical URL "+site.slug);
 return {county:site.county,verifiedVisitorFacts:site.words.length};
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
   report.verified.push({origin,slug:site.slug,status:response.status,bytes:html.length,...checked});return;
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
