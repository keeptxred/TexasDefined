#!/usr/bin/env node
// Houston Build 2 post-release source QA. No customer data, database credentials or writes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const source = readFileSync('src/data/corporate-events-houston-build2.ts', 'utf8');
const records = [...source.matchAll(/"slug":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"city":\s*"([^"]+)"[\s\S]*?"metro":\s*"([^"]+)"[\s\S]*?"area":\s*"([^"]+)"[\s\S]*?"categories":\s*\[([\s\S]*?)\][\s\S]*?"capacityDetail":\s*"([^"]+)"[\s\S]*?"officialUrl":\s*"([^"]+)"[\s\S]*?"sourceUrl":\s*"([^"]+)"[\s\S]*?"verifiedOn":\s*"([^"]+)"/g)].map(m=>({slug:m[1],name:m[2],city:m[3],metro:m[4],area:m[5],categories:m[6],capacityDetail:m[7],officialUrl:m[8],sourceUrl:m[9],verifiedOn:m[10]}));
const issues=[];
if(records.length!==12)issues.push('Expected 12 additive Houston operator listings; found '+records.length);
const seen=new Set();
for(const r of records){
 if(seen.has(r.slug))issues.push('Duplicate slug: '+r.slug);
 seen.add(r.slug);
 if(r.metro!=='Houston'||!r.city||!r.area)issues.push('Missing Houston geography: '+r.slug);
 if(!r.categories.includes('"')||!r.capacityDetail)issues.push('Missing categories/capacity disclosure: '+r.slug);
 for(const field of ['officialUrl','sourceUrl']){
  try {const u=new URL(r[field]);if(u.protocol!=='https:')throw Error('non-HTTPS');}
  catch{issues.push('Invalid '+field+': '+r.slug);}
 }
 if(!/^\d{4}-\d{2}-\d{2}$/.test(r.verifiedOn))issues.push('Invalid review date: '+r.slug);
}
const linkResults=[];
if(process.argv.includes('--links')){
 for(const r of records){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),12000);
  try{
   const response=await fetch(r.officialUrl,{method:'GET',signal:controller.signal,redirect:'follow',headers:{'User-Agent':'TexasDefined-Editorial-QA/1.0'}});
   linkResults.push({slug:r.slug,status:response.status,finalUrl:response.url});
   if(response.status>=400)issues.push('Operator URL returned HTTP '+response.status+': '+r.slug);
  }catch(e){linkResults.push({slug:r.slug,error:String(e)});issues.push('Operator URL needs manual review: '+r.slug);}
  finally{clearTimeout(timeout);}
 }
}
const report={checkedAt:new Date().toISOString(),operators:records.length,issues,linkResults,notice:'External failures are review signals, not proof of closure; do not automatically unpublish.'};
mkdirSync('artifacts/corporate-events-postrelease',{recursive:true});
writeFileSync('artifacts/corporate-events-postrelease/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
