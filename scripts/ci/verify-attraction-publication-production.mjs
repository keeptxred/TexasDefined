import { mkdir, writeFile } from "node:fs/promises";

// Independently verify the deployed HTML, not just local previews or data declarations.
const origins=["https://texasdefined.com","https://texasdefined-site.freddy-coppola.workers.dev"];
const pages=[
  {slug:"texas-freshwater-fisheries-center",title:"Texas Freshwater Fisheries Center",credit:"Larry D. Moore",facts:["$5.50","pets are not allowed","summer 2027"]},
  {slug:"national-ranching-heritage-center-lubbock",title:"National Ranching Heritage Center",credit:"USDA NRCS Texas",facts:["$50 for the group","larger than 20","service animals","Illustrative Texas ranching photograph"]},
];
const report={checkedAt:new Date().toISOString(),commit:process.env.GITHUB_SHA||null,checks:[],failures:[]};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function retrieve(origin,path){
  const url=new URL(path,origin);
  url.searchParams.set("attraction-publication",process.env.GITHUB_RUN_ID||String(Date.now()));
  let last;
  for(let attempt=1;attempt<=3;attempt++){
    try{
      const response=await fetch(url,{redirect:"follow",signal:AbortSignal.timeout(25000),headers:{"User-Agent":"TexasDefined-Attraction-Release-Check/1.0","Cache-Control":"no-cache"}});
      if(response.status!==200)throw Error("HTTP "+response.status);
      if(response.headers.get("cf-mitigated")==="challenge")throw Error("Cloudflare challenge");
      const html=await response.text();
      if(html.length<300||html.length>10000000)throw Error("Unexpected response size "+html.length);
      return {html,url:response.url,robotsHeader:response.headers.get("x-robots-tag")||""};
    }catch(error){last=error;if(attempt<3)await sleep(1000*attempt);}
  }
  throw last;
}
function attribute(tag,name){
  const pattern=new RegExp("\\b"+name+"\\s*=\\s*([\"'])(.*?)\\1","i");
  return tag.match(pattern)?.[2]||"";
}
function canonical(html){
  const link=[...html.matchAll(/<link\b[^>]*>/gi)].map(x=>x[0]).find(tag=>attribute(tag,"rel").toLowerCase()==="canonical");
  return attribute(link||"","href");
}
function metaRobots(html){
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map(x=>x[0])
    .filter(tag=>/^(robots|googlebot|bingbot)$/i.test(attribute(tag,"name")))
    .map(tag=>attribute(tag,"content")).join(";");
}
function requireFact(pass,origin,label){if(!pass)report.failures.push(origin+": "+label);}
for(const origin of origins){
  try{
    const xml=await retrieve(origin,"/sitemap-explore.xml");
    for(const page of pages){
      const loc="https://texasdefined.com/destination/"+page.slug;
      requireFact(xml.html.includes("<loc>"+loc+"</loc>"),origin,page.slug+" missing sitemap loc");
    }
    report.checks.push({origin,path:"/sitemap-explore.xml",status:200,bytes:xml.html.length});
  }catch(error){report.failures.push(origin+": sitemap fetch: "+String(error));}
  for(const page of pages){
    const route="/destination/"+page.slug;
    try{
      const result=await retrieve(origin,route),html=result.html,lower=html.toLowerCase();
      const h1=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||"";
      requireFact(new URL(result.url).pathname===route,origin,page.slug+" unexpectedly redirected");
      requireFact(h1.includes(page.title),origin,page.slug+" missing destination H1");
      requireFact(canonical(html)==="https://texasdefined.com"+route,origin,page.slug+" missing/wrong canonical");
      requireFact(!/\bnoindex\b/i.test(metaRobots(html)),origin,page.slug+" meta robots noindex");
      requireFact(!/\bnoindex\b/i.test(result.robotsHeader),origin,page.slug+" X-Robots-Tag noindex");
      requireFact(/application\/ld\+json/i.test(html)&&html.includes("TouristAttraction"),origin,page.slug+" missing TouristAttraction JSON-LD");
      requireFact(html.includes("Frequently asked questions about "+page.title),origin,page.slug+" missing SSR FAQs");
      requireFact(html.includes(page.credit),origin,page.slug+" missing image credit");
      requireFact(html.includes("creativecommons.org/licenses/"),origin,page.slug+" missing image license");
      for(const fact of page.facts)requireFact(lower.includes(fact.toLowerCase()),origin,page.slug+" missing source-verified fact "+fact);
      requireFact(html.length>=25000,origin,page.slug+" unexpectedly thin SSR");
      report.checks.push({origin,path:route,status:200,bytes:html.length,canonical:canonical(html),robots:metaRobots(html)||"indexable",robotsHeader:result.robotsHeader||null});
    }catch(error){report.failures.push(origin+": "+page.slug+" fetch: "+String(error));}
  }
}
await mkdir(".artifacts",{recursive:true});
await writeFile(".artifacts/attraction-publication-live.json",JSON.stringify(report,null,2)+"\n");
if(report.failures.length){for(const failure of report.failures)console.error("FAIL "+failure);process.exitCode=1;}
else console.log("PASS: both live attraction authority pages indexable on canonical and direct Worker, with SSR, image licenses, essential visitor facts and live sitemap URLs");
