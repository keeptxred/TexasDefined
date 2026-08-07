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
async function pageFor(title){
  const p=new URLSearchParams({action:"query",titles:title,prop:"imageinfo",iiprop:"url|mime|size|extmetadata",iiurlwidth:"1600",format:"json",origin:"*"});
  const r=await fetch(`https://commons.wikimedia.org/w/api.php?${p}`,{headers:{"User-Agent":USER_AGENT,Accept:"application/json"}});
  if(!r.ok) throw new Error(`Commons HTTP ${r.status}`);
  const data=await r.json();
  const page=Object.values(data.query?.pages||{})[0];
  if(!page?.imageinfo?.[0]||page.imageinfo[0].mime!=="image/jpeg") throw new Error(`No JPEG for ${title}`);
  return page;
}
async function download(url,dest){
  const r=await fetch(url,{headers:{"User-Agent":USER_AGENT,Accept:"image/jpeg,image/*;q=0.8"}});
  if(!r.ok) throw new Error(`Download HTTP ${r.status}`);
  const temp=`${dest}.tmp`;
  await fs.writeFile(temp,Buffer.from(await r.arrayBuffer()));
  try{await execFileAsync("convert",[temp,"-auto-orient","-strip","-resize","1600x1600>","-quality","88",dest]);}finally{await fs.rm(temp,{force:true});}
}
function credit(page){const m=page.imageinfo[0].extmetadata||{};return `${clean(m.Artist?.value||m.Credit?.value||"Wikimedia Commons contributor")} · ${clean(m.LicenseShortName?.value||m.UsageTerms?.value||"free license")} · Wikimedia Commons`;}
const report=JSON.parse(await fs.readFile(REPORT,"utf8"));
for(const repair of repairs){
  const page=await pageFor(repair.title); const info=page.imageinfo[0];
  await download(info.thumburl||info.url,path.join(ROOT,repair.dest));
  const row=report.images.find((x)=>x.key===repair.key);
  if(row){row.source="free-use";row.credit=credit(page);row.sourceTitle=page.title;row.specificityVerified=true;}
  console.log(`${repair.key} <- ${page.title}`);
}
report.freeUse=report.images.filter((x)=>x.source==="free-use").length;
report.generated=report.images.filter((x)=>x.source==="generated").length;
report.specificityRepairs=repairs.map((x)=>x.key);
report.generatedAt=new Date().toISOString();
await fs.writeFile(REPORT,`${JSON.stringify(report,null,2)}\n`);
