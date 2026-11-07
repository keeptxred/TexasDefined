/**
 * Compare actually published species-by-lake grades with official TPWD
 * Angling Opportunities tables. Rotate 12 of 72 profiles each Mon/Thu;
 * full quarterly/manual review. This is an editorial DRIFT ALERT, never
 * permission to rewrite ratings or restamp reviewed dates automatically.
 *
 * --plan is offline and requires no dependencies; network runs need esbuild
 * from the project's locked npm dependencies to read the actual catalog.
 */
import fs from "node:fs";
import { parseTpwdGrades } from "./tpwd-fishery-grades.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
const dossierFile = "src/data/fishing/lake-authority-research-wave1.ts";
const text = fs.readFileSync(dossierFile, "utf8");
const match = text.match(/export const LAKE_AUTHORITY_RESEARCH_WAVE1: Record<string, LakeAuthorityResearch> = (\{[\s\S]*\});\s*$/);
if (!match) throw new Error("Missing parseable lake-by-lake source dossiers");
const dossiers = JSON.parse(match[1]);
const lakes = Object.keys(dossiers).sort();
if (lakes.length !== 72) throw new Error("Grade-source monitor must preserve all 72 lake dossiers");
const now = new Date();
const week = Math.floor((Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate())-Date.UTC(2026,0,5))/(7*86400000));
const cohort = ((week*2+(now.getUTCDay()===4?1:0))%6+6)%6;
const groups = Array.from({length:6},(_,n)=>lakes.filter((_,i)=>i%6===n));
if(groups.some(g=>g.length!==12)||new Set(groups.flat()).size!==72) throw new Error("Invalid 72-lake cohort plan");
const full = process.argv.includes("--full") || process.env.FISHING_LAKES_FULL_REVIEW === "1";
const selected = full ? lakes : groups[cohort];
if(process.argv.includes("--plan")){
  console.log(JSON.stringify({totalLakes:lakes.length,cohort,groups:groups.map((g,i)=>({cohort:i,slugs:g}))},null,2));
  process.exit(0);
}

const { build } = await import("esbuild");
// Build the published catalog once in isolation. No hand-entered second
// rating inventory and no heavy lake records added to the browser bundle.
const entry = "export { fishingPlatform } from './src/data/fishing/index.ts'; export { isCompleteFishingLakeSlug } from './src/data/fishing/slugs.ts';";
const bundled = await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:"lake-grade-audit-entry.ts",loader:"ts"},
  bundle:true,write:false,platform:"node",format:"esm",target:"node22",tsconfig:"tsconfig.json",logLevel:"error"});
const moduleUrl="data:text/javascript;base64,"+Buffer.from(bundled.outputFiles[0].contents).toString("base64");
const catalog=await import(moduleUrl);
const scope={brandId:"texasdefined",status:"published"};
const [publishedLakes,publishedSpecies,relations]=await Promise.all([
  catalog.fishingPlatform.lakes.list({...scope,limit:1000}),
  catalog.fishingPlatform.species.list({...scope,limit:1000}),
  catalog.fishingPlatform.lakeSpecies.list({brandId:"texasdefined"}),
]);
const published=publishedLakes.filter(l=>catalog.isCompleteFishingLakeSlug(l.slug));
if(published.length!==72)throw new Error("Live catalog no longer has exactly 72 complete guides");
const speciesById=new Map(publishedSpecies.map(s=>[s.id,s.commonName]));
const lakeBySlug=new Map(published.map(l=>[l.slug,l]));
const relationsByLake=new Map();
for(const r of relations){
  const row=relationsByLake.get(r.lakeId)||[];
  row.push({name:speciesById.get(r.speciesId),quality:r.quality});
  relationsByLake.set(r.lakeId,row);
}
const normalize=s=>String(s||"").toLowerCase().replace(/&amp;/g,"and").replace(/&/g,"and").replace(/\b(white|black)\s+and\s+hybrid/,"white and hybrid").replace(/[^a-z0-9]+/g," ").trim();
const strip=s=>String(s||"").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<[^>]+>/g," ").replace(/&(?:nbsp|#160);/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
const officialUrl=u=>{try{const p=new URL(u);return p.protocol==="https:"&&p.hostname==="tpwd.texas.gov"&&/^\/fishboat\/fish\/recreational\/lakes\/[a-z0-9_]+\/(?:index\.phtml)?$/i.test(p.pathname)}catch{return false}};
const grades=["poor","fair","good","excellent"];

const checks=[], errors=[], inconclusive=[];
let position=0;
const sourceNames=new Set();
const batch=Array.from({length:Math.min(3,selected.length)},async()=>{
  while(position<selected.length){
    const slug=selected[position++];
    const lake=lakeBySlug.get(slug);
    if(!lake){errors.push(slug+": published researched lake missing from catalog");continue}
    const source=lake.sources.find(s=>officialUrl(s.url));
    if(!source){errors.push(slug+": no specific first-party TPWD fishery profile in published source registry");continue}
    if(sourceNames.has(source.url)){errors.push(slug+": duplicate official TPWD lake URL");continue}
    sourceNames.add(source.url);
    try{
      const resp=await fetch(source.url,{headers:{"User-Agent":"TexasDefinedFisherySourceReview/1.0 (+https://texasdefined.com/fishing/lakes)",Accept:"text/html"},signal:AbortSignal.timeout(18000),redirect:"follow"});
      if(!resp.ok)throw new Error("HTTP "+resp.status);
      const html=(await resp.text()).slice(0,800000);
      const rows=parseTpwdGrades(html);
      if(!rows.length){inconclusive.push(slug+": official page contains no parseable marked Angling Opportunities grade table; manual check required");checks.push({slug,url:source.url,outcome:"no machine-readable grades",comparisons:0});continue}
      const expected=relationsByLake.get(lake.id)||[];
      const matched=[];
      for(const row of rows){
        // Exact named species/category only. Never infer a distinct grade for
        // species grouped by TPWD, or treat qualitative editorial labels as law.
        const found=expected.find(x=>normalize(x.name)===normalize(row.name));
        if(!found||!grades.includes(found.quality))continue;
        const equal=found.quality===row.grade;
        matched.push({species:row.name,published:found.quality,tpwd:row.grade,equal});
        if(!equal)errors.push(slug+": "+row.name+" published "+found.quality+" but TPWD grades "+row.grade+" at "+source.url);
      }
      if(!matched.length)inconclusive.push(slug+": TPWD ratings exist but none could be matched safely by exact species/category name");
      checks.push({slug,url:source.url,agencyRows:rows.length,comparisons:matched.length,matched});
    }catch(e){errors.push(slug+": official fishery review unavailable: "+String(e?.message??e))}
  }
});
await Promise.all(batch);
checks.sort((a,b)=>a.slug.localeCompare(b.slug));
const report={checkedAt:new Date().toISOString(),mode:full?"full":"cohort",cohort:full?null:cohort,
  publishedLakes:published.length,selectedLakes:selected.length,checkedLakes:checks.length,
  comparedRatings:checks.reduce((sum,row)=>sum+(row.comparisons||0),0),
  scope:"Same-species TPWD Angling Opportunities grades against published lake-species grades, not all fisheries, current catch conditions or harvest laws.",
  errors,inconclusive,checks};
mkdirSync(".artifacts",{recursive:true});
writeFileSync(".artifacts/fishing-lake-fishery-grade-evidence.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({selectedLakes:report.selectedLakes,checkedLakes:report.checkedLakes,comparedRatings:report.comparedRatings,
  errors:errors.slice(0,20),inconclusive:inconclusive.slice(0,15)},null,2));
if(errors.length) process.exitCode=1;
