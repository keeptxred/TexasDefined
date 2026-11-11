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
// These four destinations previously existed as legacy 301 aliases or were
// represented by a generic destination. A redirect-following HTTP 200 is not
// proof that the canonical destination itself exposes the river backlink.
// Fail closed on redirects as well as missing HTML at the repaired canonical URL.
const repairedCanonicalDestinations = [
  ['texas-brazos-river-guide','washington-on-the-brazos'],
  ['texas-san-antonio-river-guide','goliad-state-park'],
  ['texas-san-antonio-river-guide','san-antonio-river-walk'],
  ['texas-san-jacinto-river-guide','san-jacinto-battleground'],
];
const canonicalDestinations = new Set(repairedCanonicalDestinations.map(([,slug])=>'/destination/'+slug));
for(const [riverSlug,destination] of repairedCanonicalDestinations) {
  const river = rivers.find(r=>r.slug===riverSlug);
  if(!river?.destinations.includes(destination))
    throw Error('Repaired canonical river destination relation missing: '+riverSlug+' -> '+destination);
}
if(canonicalDestinations.size!==4) throw Error('Duplicate canonical river destination acceptance target');

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
   const strictlyCanonical = canonicalDestinations.has(row.path);
   const requestedUrl = origin+row.path;
   const response=await fetch(requestedUrl,{redirect:strictlyCanonical?"manual":"follow",headers:{"user-agent":"TexasDefined-River-Authority-Production/1.0","cache-control":"no-cache"},signal:AbortSignal.timeout(20000)});
   if(response.status!==200){failed.push({...row,status:response.status,issue:strictlyCanonical?"canonical destination redirected or returned non-200":"non-200",finalUrl:response.url});continue;}
   if(strictlyCanonical&&(response.redirected||response.url!==requestedUrl)){
     failed.push({...row,status:200,issue:"canonical destination is not the exact requested URL",finalUrl:response.url});continue;
   }
   const html=await response.text(),missing=row.required.filter(s=>!html.includes(s));
   // If a required backlink is absent, distinguish a stale edge cache from
   // missing server-rendered content. A cache-busted success is still a
   // production failure: we must not silently pass a stale canonical URL.
   let cacheProbe;
   if (missing.length && row.kind === "destination") {
     try {
       const probeUrl = new URL(origin + row.path);
       probeUrl.searchParams.set("river_acceptance_probe", String(Date.now()) + "-" + i);
       const fresh = await fetch(probeUrl, {
         redirect: "follow",
         headers: { "user-agent": "TexasDefined-River-Authority-Production/1.0", "cache-control": "no-cache" },
         signal: AbortSignal.timeout(20000),
       });
       const freshHtml = await fresh.text();
       cacheProbe = {
         status: fresh.status,
         missing: row.required.filter(needle => !freshHtml.includes(needle)),
         cacheControl: fresh.headers.get("cache-control"),
         cfCacheStatus: fresh.headers.get("cf-cache-status"),
         originalCfCacheStatus: response.headers.get("cf-cache-status"),
       };
     } catch (error) {
       cacheProbe = { error: String(error).slice(0, 160) };
     }
   }
   if(row.kind==="river"){
    if(!/rel=["']canonical["']/.test(html))missing.push("canonical SEO link");
    if(/<meta[^>]+robots[^>]+noindex/i.test(html))missing.push("indexability");
    if(!html.includes("Frequently asked questions")&&!html.includes("Visitor questions"))missing.push("river FAQ");
   }
   if(missing.length)failed.push({...row,status:200,issue:"missing published content or backlinks",missing,...(cacheProbe ? { cacheProbe } : {})});
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
