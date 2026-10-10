import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REPORT = path.join(ROOT,"scripts/data/missing-site-image-report.json");
const USER_AGENT = "TexasDefined/1.0 (editorial image specificity repair; https://texasdefined.com)";
const repairs = [
  { key:"texas-native-plants-yard-unique", title:"File:Texas Discovery Gardens August 2016 28 (Benny J. Simpson Texas Native Plant Collection).jpg", dest:"src/assets/generated/texas-native-plants-yard-unique.jpg" },
  { key:"hill-country-identity", title:"File:Texas hill country.jpg", dest:"src/assets/generated/hill-country-identity.jpg" },
  { key:"texas-school-districts", title:"File:Texas High School, Texarkana IMG 6386.jpg", dest:"src/assets/generated/texas-school-districts.jpg" },
];
function clean(v){return String(v||"").replace(/<[^>]*>/g," ").replace(/&amp;/gi,"&").replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/\s+/g," ").trim();}
// Wikimedia Commons can rate-limit automated CI. Never hammer its API.
// A single bounded retry covers short transients; persistent 429/503 fails
// explicitly so rights/attribution data cannot be guessed or fabricated.
async function requestWithBoundedBackoff(url,headers,label){
  for(let attempt=0;attempt<2;attempt++){
    const response=await fetch(url,{headers});
    if(response.ok)return response;
    if((response.status!==429&&response.status!==503)||attempt===1)
      throw new Error(`${label} HTTP ${response.status}; no image/metadata was published`);
    const hinted=Number(response.headers.get("retry-after"));
    const delay=Number.isFinite(hinted)&&hinted>0?Math.min(10000,Math.max(1000,hinted*1000)):5000;
    console.warn(`${label} HTTP ${response.status}; respecting rate limit with one bounded retry`);
    await new Promise(resolve=>setTimeout(resolve,delay));
  }
  throw new Error(`${label} unavailable; no image was published`);
}
async function pageFor(title){
  const p=new URLSearchParams({action:"query",titles:title,prop:"imageinfo",iiprop:"url|mime|size|extmetadata",iiurlwidth:"1600",format:"json",origin:"*"});
  const endpoint=`https://commons.wikimedia.org/w/api.php?${p}`;
  const r=await requestWithBoundedBackoff(endpoint,{"User-Agent":USER_AGENT,Accept:"application/json"},"Commons");
  const data=await r.json();
  const page=Object.values(data.query?.pages||{})[0];
  if(!page?.imageinfo?.[0]||page.imageinfo[0].mime!=="image/jpeg") throw new Error(`No JPEG for ${title}`);
  return page;
}
async function download(url,dest){
  const r=await requestWithBoundedBackoff(url,{"User-Agent":USER_AGENT,Accept:"image/jpeg,image/*;q=0.8"},"Image download");
  const temp=`${dest}.tmp`;
  await fs.writeFile(temp,Buffer.from(await r.arrayBuffer()));
  try{await execFileAsync("convert",[temp,"-auto-orient","-strip","-resize","1600x1600>","-quality","88",dest]);}finally{await fs.rm(temp,{force:true});}
}
function credit(page){const m=page.imageinfo[0].extmetadata||{};return `${clean(m.Artist?.value||m.Credit?.value||"Wikimedia Commons contributor")} · ${clean(m.LicenseShortName?.value||m.UsageTerms?.value||"free license")} · Wikimedia Commons`;}
const report=JSON.parse(await fs.readFile(REPORT,"utf8"));
if(!Array.isArray(report.images))throw new Error("Missing image report entries: refusing untracked Commons downloads");
const outstanding=[];
for(const repair of repairs){
  const destination=path.join(ROOT,repair.dest);
  const row=report.images.find(x=>x.key===repair.key);
  const file=await fs.stat(destination).catch(()=>null);
  // The existing report may be empty after a completed repair cycle. If the
  // JPEG is already committed and no row is asking for a repair, do not fetch
  // it again just because the workflow or script changed.
  if(!row){
    if(!file||file.size<50000)throw new Error(`Untracked repair target missing: ${repair.dest}; update the governed image report first`);
    console.log(`SKIP ${repair.key}: existing JPEG, no outstanding governed report entry`);
    continue;
  }
  if(row.source==="free-use"&&row.specificityVerified===true&&file?.size>=50000){
    console.log(`SKIP ${repair.key}: already source-verified and JPEG exists`);
    continue;
  }
  outstanding.push({repair,row,destination});
}
if(outstanding.length===0){
  console.log("No pending editorial image specificity repairs. Commons not contacted; repository unchanged.");
}else{
  for(const {repair,row,destination} of outstanding){
    const page=await pageFor(repair.title);const info=page.imageinfo[0];
    await download(info.thumburl||info.url,destination);
    row.source="free-use";row.credit=credit(page);row.sourceTitle=page.title;row.specificityVerified=true;
    console.log(`${repair.key} <- ${page.title}`);
  }
  report.freeUse=report.images.filter(x=>x.source==="free-use").length;
  report.generated=report.images.filter(x=>x.source==="generated").length;
  report.specificityRepairs=outstanding.map(x=>x.repair.key);
  report.generatedAt=new Date().toISOString();
  await fs.writeFile(REPORT,`${JSON.stringify(report,null,2)}\n`);
}
