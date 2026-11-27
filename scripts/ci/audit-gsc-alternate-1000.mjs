import fs from "node:fs/promises";
const manifest=JSON.parse(await fs.readFile("ops/seo/gsc-alternate-2026-11-27.json","utf8"));
const origin="https://texasdefined.com";
const families=new Set(["/events","/texas-property-tax-estimator","/partner-with-us","/moving-to-texas","/corporate-events","/fishing/plan","/fishing/seasons"]);
if(manifest.rows.length!==1000||new Set(manifest.rows.map(r=>r.url)).size!==1000||manifest.reportedTotal!==1383)throw Error("Owner manifest is incomplete or duplicated");
for(const row of manifest.rows){const u=new URL(row.url);if(u.origin!==origin||!families.has(u.pathname)||!u.search)throw Error("Invalid manifest URL "+row.url);}
if(process.argv.includes("--manifest-only")){console.log("PASS: 1000 exact distinct owner-export URLs; 383 unlisted, not guessed.");process.exit(0);}
const dir="artifacts/gsc-alternate-2026-11-27";
await fs.mkdir(dir,{recursive:true});
const attr=(tag,k)=>(tag.match(new RegExp("\\b"+k+"\\s*=\\s*([\\\"'])(.*?)\\1","i"))?.[2]||"").replace(/&amp;|&#38;/gi,"&");
const tags=(html,name)=>(html.match(new RegExp("<"+name+"\\b[^>]*>","gi"))||[]);
const options={redirect:"manual",cache:"no-store",headers:{"user-agent":"TexasDefined-Exact-GSC-Alternate-Audit/1.0","cache-control":"no-cache"}};
async function one(row){
 const expected=new URL(row.url).origin+new URL(row.url).pathname;
 const out={...row,expected,checkedAt:new Date().toISOString(),redirects:[]};
 try{
 let url=new URL(row.url),response;
 for(let i=0;i<4;i++){
 response=await fetch(url,{...options,signal:AbortSignal.timeout(20000)});
 if(![301,302,303,307,308].includes(response.status))break;
 const location=response.headers.get("location");if(!location)throw Error("Missing Location");
 const next=new URL(location,url);out.redirects.push({status:response.status,from:url.href,to:next.href});
 await response.body?.cancel();
 if(next.origin!==origin||next.pathname!==new URL(expected).pathname)throw Error("Off-family redirect");
 url=next;
 }
 out.finalUrl=url.href;out.status=response.status;out.contentType=response.headers.get("content-type");out.cfMitigated=response.headers.get("cf-mitigated");out.xRobots=response.headers.get("x-robots-tag");out.headerLink=response.headers.get("link");
 const html=await response.text();
 out.canonicals=tags(html,"link").filter(t=>attr(t,"rel").toLowerCase().split(/\\s+/).includes("canonical")).map(t=>attr(t,"href"));
 out.ogUrls=tags(html,"meta").filter(t=>attr(t,"property").toLowerCase()==="og:url").map(t=>attr(t,"content"));
 out.metaRobots=tags(html,"meta").filter(t=>["robots","googlebot"].includes(attr(t,"name").toLowerCase())).map(t=>attr(t,"content"));
 out.headerCanonicals=(out.headerLink||"").split(/,(?=\\s*<)/).flatMap(t=>/;\\s*rel\\s*=\\s*["']?canonical(?:["';\\s]|$)/i.test(t)?[t.match(/<([^>]+)>/)?.[1]]:[]);
 const issues=[];
 if(out.status!==200||out.cfMitigated==="challenge"||!out.contentType?.includes("text/html"))issues.push("HTTP/challenge/content type");
 if(out.canonicals.length!==1||out.canonicals[0]!==expected)issues.push("HTML canonical mismatch");
 if(out.ogUrls.some(x=>x!==expected)||out.headerCanonicals.some(x=>x!==expected))issues.push("Conflicting canonical signal");
 if(out.redirects.length)issues.push("Redirect requires individual state-retention review");
 out.issues=issues;out.result=issues.length?"REVIEW":"PASS";
 }catch(e){out.result="ERROR";out.issues=[String(e)];}
 return out;
}
const results=new Array(manifest.rows.length);let next=0;
async function worker(){while(true){const i=next++;if(i>=manifest.rows.length)return;const row=await one(manifest.rows[i]);results[i]=row;await fs.appendFile(dir+"/results.ndjson",JSON.stringify({index:i+1,...row})+"\n");if((i+1)%50===0)console.log("Processed row",i+1);await new Promise(r=>setTimeout(r,350));}}
await fs.writeFile(dir+"/results.ndjson","");
await Promise.all(Array.from({length:4},worker));
const summary={reportedTotal:manifest.reportedTotal,provided:manifest.rows.length,unlisted:manifest.unlistedCount,checked:results.length,pass:results.filter(r=>r.result==="PASS").length,review:results.filter(r=>r.result==="REVIEW").length,errors:results.filter(r=>r.result==="ERROR").length,sourceSha:process.env.GITHUB_SHA||null,verifiedBaseline:process.env.BASELINE_SHA||null};
await fs.writeFile(dir+"/results.json",JSON.stringify({summary,results},null,2));
console.log(JSON.stringify(summary));if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,"Exact owner-export audit (live HTTP, not Google index):\n\n"+JSON.stringify(summary,null,2)+"\n");
if(summary.review||summary.errors)process.exitCode=1;
