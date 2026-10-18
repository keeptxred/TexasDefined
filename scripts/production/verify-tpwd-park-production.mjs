import { mkdirSync, writeFileSync } from "node:fs";

const origins = ["https://texasdefined-site.freddy-coppola.workers.dev", "https://texasdefined.com"];
const parks = [
 { slug:"abilene-state-park", title:"Abilene State Park", county:"Taylor", source:"abilene", terms:["Lake Abilene boat ramps","pellet fires","swimming pool"] },
 { slug:"buescher-state-park", title:"Buescher State Park", county:"Bastrop", source:"buescher", terms:["Oak Haven","canoe","charcoal"] },
 { slug:"fort-parker-state-park", title:"Fort Parker State Park", county:"Limestone", source:"fort-parker", terms:["both fishing piers","May 2027","motorized"] },
 { slug:"galveston-island-state-park", title:"Galveston Island State Park", county:"Galveston", source:"galveston-island", terms:["71–95","September 28","boardwalk"] },
];
const evidence={version:"tpwd-park-live-2026-10-18",sha:process.env.GITHUB_SHA||"",passed:[],failures:[]};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
function visibleHtml(source){
 return source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"")
   .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"")
   .replace(/<!--[\s\S]*?-->/g,"");
}
function visibleText(html){
 return visibleHtml(html).replace(/<[^>]+>/g," ").replace(/&nbsp;|&#160;/g," ")
   .replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
}
export function verifyParkPage(html,park){
 const visible=visibleHtml(html),text=visibleText(html).toLowerCase();
 if(!/<h1\b[^>]*>[\s\S]*?<\/h1>/.test(visible))throw Error("SSR destination H1 absent");
 if(!text.includes(park.title.toLowerCase()))throw Error("Incorrect park identity "+park.title);
 if(!visible.includes('id="state-park-essentials"'))throw Error("Official park facilities module not rendered");
 if(!visible.includes('id="why-go"'))throw Error("Researched destination article not rendered");
 if(!visible.includes('href="/county/')&&!visible.includes("href='/county/"))throw Error("County cross-link is absent");
 if(!text.includes(park.county.toLowerCase()+" county"))throw Error("Expected county not displayed");
 if(!visible.includes("tpwd.texas.gov/state-parks/"+park.source))throw Error("Official park-specific TPWD source link absent");
 if(!text.includes("photography:")&&!text.includes("photo:"))throw Error("Credited destination photography absent");
 for(const term of park.terms){
  if(!text.includes(term.toLowerCase()))throw Error("Current source-backed alert not visible: "+term);
 }
 if(/photo unavailable/i.test(text))throw Error("Visible broken-image placeholder");
 return {slug:park.slug,requiredTerms:park.terms,county:park.county,officialSource:true,photographyCredit:true};
}
async function checkLive(origin,park){
 let error;
 for(let attempt=1;attempt<=2;attempt++){
  const url=new URL("/destination/"+park.slug,origin);
  url.searchParams.set("tpwd_acceptance",[process.env.GITHUB_SHA||"manual",process.env.GITHUB_RUN_ID||"local",attempt].join("-"));
  try{
   const response=await fetch(url,{cache:"no-store",redirect:"follow",signal:AbortSignal.timeout(14000),headers:{"cache-control":"no-cache,no-store","user-agent":"TexasDefined-TPWD-Scoped-Live-Acceptance/1.0"}});
   if(response.status!==200||response.headers.get("cf-mitigated")==="challenge")throw Error("HTTP "+response.status+" or edge challenge");
   if(!response.headers.get("content-type")?.includes("text/html"))throw Error("Expected HTML");
   const html=await response.text(),accepted=verifyParkPage(html,park);
   evidence.passed.push({origin,attempt,status:response.status,htmlBytes:html.length,...accepted});
   return;
  }catch(e){error=e;if(attempt===1)await pause(800);}
 }
 throw Error(origin+"/destination/"+park.slug+" failed after bounded attempts: "+(error?.message||error));
}
export async function main(){
 for(const origin of origins){
  for(const park of parks){
   try{await checkLive(origin,park);}
   catch(e){evidence.failures.push(String(e?.message||e));}
  }
 }
 mkdirSync(".artifacts",{recursive:true});
 writeFileSync(".artifacts/tpwd-park-live-acceptance.json",JSON.stringify(evidence,null,2));
 evidence.passed.forEach(x=>console.log("PASS",JSON.stringify(x)));
 evidence.failures.forEach(e=>console.error("::error title=TPWD page acceptance::"+e));
 if(evidence.failures.length)process.exitCode=1;
}
if(process.argv[1]?.endsWith("verify-tpwd-park-production.mjs"))await main();
