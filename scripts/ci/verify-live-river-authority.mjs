/** Dynamic production acceptance. HTTP evidence does not replace factual or rights review. */
import fs from "node:fs";
const source=fs.readFileSync("src/data/river-authority-relations.ts","utf8");
const pattern=/slug:\s*"(texas-[a-z0-9-]+-(?:river|river-basin)-guide)"[\s\S]*?"?counties"?:\s*(\[[^\]]*\])[\s\S]*?"?destinations"?:\s*(\[[^\]]*\])/g;
const rivers=[...source.matchAll(pattern)].map(m=>({slug:m[1],counties:JSON.parse(m[2]),destinations:JSON.parse(m[3])}));
if(!rivers.length||new Set(rivers.map(r=>r.slug)).size!==rivers.length)throw Error("Invalid river registry");
function fixtureJson(path, symbol) {
 const contents=fs.readFileSync(path,"utf8");
 const result=contents.match(new RegExp("export const "+symbol+" = ([\\s\\S]*?) as const;"));
 if(!result)throw Error("Missing structured river source: "+path);
 return JSON.parse(result[1]);
}
const newer=new Set(fixtureJson("src/data/fixtures/texas-river-recreation-guides.ts","riverRecreationGuideRecords").map(x=>x.slug));
const upgraded=new Set(Object.keys(fixtureJson("src/data/fixtures/texas-river-authority-extensions.ts","existingRiverAuthorityEnhancements")));
const legacy=new Set(fixtureJson("src/data/fixtures/texas-river-authority-remaining.ts","additionalExistingRiverAuthorityResearch").map(x=>x.slug));
const planned=new Map();
function add(path,kind,required=[]){
 const old=planned.get(path);
 if(old){old.required=[...new Set([...old.required,...required])];return;}
 planned.set(path,{path,kind,required:[...new Set(required)]});
}
for(const river of rivers){
 if(!newer.has(river.slug)&&!upgraded.has(river.slug)&&!legacy.has(river.slug))throw Error("River page has no production content contract: "+river.slug);
 const heading=newer.has(river.slug)?"Officially documented access: an example to build from":upgraded.has(river.slug)?"Mapped paddling or visitor-access example":"From watershed map to a real visit";
 add("/article/"+river.slug,"river",[heading,"Fishing","Camping"]);
 for(const county of river.counties)add("/county/"+county,"county",["/article/"+river.slug]);
 for(const destination of river.destinations)add("/destination/"+destination,"destination",["/article/"+river.slug]);
}
for(const path of ["/article/texas-rivers-explained","/explore/landscapes/rivers-and-river-valleys","/fishing"])
 add(path,"directory",rivers.map(r=>"/article/"+r.slug));
add("/best-places-to-go-camping-in-texas","camping",["/article/texas-frio-river-guide"]);
const checks=[...planned.values()],passed=[],failed=[];
const origin=(process.env.TEXASDEFINED_PRODUCTION_ORIGIN||"https://texasdefined.com").replace(/\/$/,"");
let next=0;
async function worker(){
 for(;;){
  const i=next++;if(i>=checks.length)return;
  const row=checks[i];
  try{
   const response=await fetch(origin+row.path,{redirect:"follow",headers:{"user-agent":"TexasDefined-River-Authority-Production/1.0","cache-control":"no-cache"},signal:AbortSignal.timeout(20000)});
   if(response.status!==200){failed.push({...row,status:response.status,issue:"non-200"});continue;}
   const html=await response.text(),missing=row.required.filter(s=>!html.includes(s));
   if(row.kind==="river"){
    if(!/rel=["']canonical["']/.test(html))missing.push("canonical SEO link");
    if(/<meta[^>]+robots[^>]+noindex/i.test(html))missing.push("indexability");
    if(!html.includes("Frequently asked questions")&&!html.includes("Visitor questions"))missing.push("river FAQ");
   }
   if(missing.length)failed.push({...row,status:200,issue:"missing published content or backlinks",missing});
   else passed.push({path:row.path,kind:row.kind,status:200});
  }catch(e){failed.push({...row,issue:"network",error:String(e).slice(0,160)});}
 }
}
await Promise.all(Array.from({length:5},worker));
const summary={checkedAt:new Date().toISOString(),origin,registeredRivers:rivers.length,routesChecked:checks.length,passed:passed.length,failed:failed.length,note:"HTTP/HTML route verification does not substitute for individual factual, license, or current-water safety certification."};
fs.mkdirSync(".artifacts",{recursive:true});
fs.writeFileSync(".artifacts/river-authority-production-acceptance.json",JSON.stringify({summary,failed,passed},null,2)+"\n");
console.log(JSON.stringify(summary,null,2));
for(const f of failed.slice(0,80))console.error(JSON.stringify(f));
if(failed.length)process.exitCode=1;
