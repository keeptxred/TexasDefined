#!/usr/bin/env node
/** Cycle through every TPWD county rules page without mirroring legal advice.
 * Live TPWD pages remain the legal authority. Each county is checked once per
 * eleven daily batches, with no heavy Worker-side scans or paid API dependency.
 */
import fs from 'node:fs';
import assert from 'node:assert/strict';

const countySource=fs.readFileSync('src/data/texas-places.ts','utf8');
const names=countySource.match(/const COUNTY_NAMES = \x60([^\x60]+)\x60\.split\('\|'\);/)?.[1]?.split('|');
if (!names || names.length !== 254 || new Set(names).size !== 254) {
  throw new Error('Texas county registry changed: expected 254 distinct county names.');
}
const slug=(name)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const counties=names.map(name=>({name,slug:slug(name),tpwdSlug:name==='La Salle'?'lasalle':slug(name)}));
const BATCH_SIZE=24, BATCHES=Math.ceil(counties.length/BATCH_SIZE);
if(BATCHES!==11)throw new Error('Expected eleven balanced TPWD county batches');
const shards=Array.from({length:BATCHES},(_,i)=>counties.slice(i*BATCH_SIZE,(i+1)*BATCH_SIZE));
const unique=new Set(shards.flat().map(x=>x.slug));
if(unique.size!==254)throw new Error('The county source coverage map is incomplete or contains duplicates.');
if(process.argv.includes('--self-test')){
  assert.equal(shards.length,11);
  assert.equal(shards.flat().length,254);
  assert.equal(shards[0].length,24);
  assert.equal(shards[10].length,14);
  assert.equal(counties.find(x=>x.name==='La Salle').tpwdSlug,'lasalle');
  assert.equal(counties.find(x=>x.name==='DeWitt').tpwdSlug,'dewitt');
  assert.ok(shards.every(group=>group.every(x=>x.tpwdSlug)));
  console.log('TPWD deer 254-county/11-batch coverage and official route contracts passed.');
  process.exit(0);
}
const now=new Date();
const batch=process.env.TPWD_COUNTY_BATCH==='all'?-1:
  process.env.TPWD_COUNTY_BATCH!==undefined?Number(process.env.TPWD_COUNTY_BATCH):
  Math.floor(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate())/86400000)%BATCHES;
if(batch!==-1&&(!Number.isInteger(batch)||batch<0||batch>=BATCHES))throw new Error('Invalid county batch');
const selected=batch===-1?counties:shards[batch];
const season=JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json','utf8'));
const clean=(s)=>s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&(?:nbsp|#160);/gi,' ').replace(/&amp;/gi,'&').replace(/\s+/g,' ').trim();
async function validateCounty(county){
  const url='https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/'+county.tpwdSlug+'/';
  let error;
  for(let attempt=0;attempt<3;attempt++){
    if(attempt)await new Promise(resolve=>setTimeout(resolve,attempt*3000));
    try{
      const response=await fetch(url,{
        headers:{accept:'text/html','user-agent':'TexasDefined-deer-county-rules-health/1.0'},
        signal:AbortSignal.timeout(18000),
      });
      if(!response.ok)throw new Error('HTTP '+response.status);
      if(new URL(response.url).hostname!=='tpwd.texas.gov')throw new Error('Official county page redirected off TPWD');
      const text=clean(await response.text());
      if(text.length<250||!/White-tailed Deer/i.test(text)||!/Bag Limit/i.test(text)){
        throw new Error('TPWD county deer/bag regulation headings were missing');
      }
      if(!text.includes(String(season.startYear))&&!text.includes(String(season.startYear+1))){
        throw new Error('TPWD county page did not identify the governed hunting season');
      }
      return;
    }catch(e){error=e;}
  }
  throw new Error(county.name+': '+String(error).slice(0,200));
}
const failures=[];
let cursor=0;
async function boundedWorker(){
  for(;;){
    const index=cursor++;
    if(index>=selected.length)return;
    const county=selected[index];
    try{await validateCounty(county);console.log('TPWD county verified: '+county.name);}
    catch(error){failures.push(String(error));console.error(String(error));}
  }
}
await Promise.all(Array.from({length:Math.min(3,selected.length)},()=>boundedWorker()));
console.log(JSON.stringify({verified:selected.length-failures.length,total:selected.length,batch:batch===-1?'all':batch,allCountyCount:counties.length,failures:failures.slice(0,254)}));
if(failures.length)process.exitCode=1;
