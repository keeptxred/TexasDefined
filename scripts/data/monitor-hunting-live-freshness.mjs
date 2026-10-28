import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ORIGIN='https://texasdefined.com';
const freshness=fs.readFileSync('src/data/hunting/freshness.ts','utf8');
const season=JSON.parse(fs.readFileSync('src/data/hunting/species-season-calendar.json','utf8'));
const last=/lastVerifiedLabel:\s*"([^"]+)"/.exec(freshness)?.[1];
if(!last)throw Error('Hunting reviewed source date missing');
export const TARGETS=[
  {pathname:'/hunting',needles:['Hunting Texas: licenses, public land','Four decisions before choosing a hunting spot','Muzzleloader definition','Source review '+last]},
  {pathname:'/hunting/public-hunting',needles:['Where Can You Hunt on Public Land in Texas?','Texas Parks and Wildlife']},
  {pathname:'/hunting/texas-deer-hunting',needles:['Texas White-Tailed Deer Hunting Guide','Texas white-tailed deer hunting dates']},
  {pathname:'/hunting/mule-deer-hunting',needles:['Texas Mule Deer Hunting Guide','TPWD '+season.seasonYear+' season dates','Panhandle','Trans-Pecos']},
];
export const visible=(html)=>String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<!--[\s\S]*?-->/g,' ').replace(/<[^>]*>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/\s+/g,' ').trim();
export function verifyHtml(html,target,variant){
  if(html.length<4000||!/<html[\s>]/i.test(html))throw Error(target.pathname+' '+variant+' incomplete HTML');
  const text=visible(html);
  const missing=target.needles.filter(n=>!text.includes(n));
  if(missing.length)throw Error(target.pathname+' '+variant+' stale or missing: '+missing.join('; '));
  if(!html.includes(ORIGIN+target.pathname))throw Error(target.pathname+' '+variant+' canonical path missing');
  return text;
}
async function fetchPage(pathname,bust=false){
  const u=ORIGIN+pathname+(bust?'?__td_hunting_freshness='+encodeURIComponent(process.env.GITHUB_RUN_ID||String(Date.now())):'');
  const r=await fetch(u,{headers:{'cache-control':'no-cache','pragma':'no-cache','user-agent':'TexasDefined-Hunting-Bounded-Live-Audit/1.0'},redirect:'follow',signal:AbortSignal.timeout(25000)});
  if(!r.ok||new URL(r.url).hostname!=='texasdefined.com'||!(r.headers.get('content-type')||'').includes('text/html'))throw Error('Hunting live URL unavailable '+pathname+' HTTP '+r.status);
  return r.text();
}
export async function main(){
  for(const item of TARGETS){
    const [plain,fresh]=await Promise.all([fetchPage(item.pathname),fetchPage(item.pathname,true)]);
    verifyHtml(plain,item,'canonical');
    verifyHtml(fresh,item,'cache-bypass');
    console.log('HUNTING LIVE PASS '+item.pathname+' canonical and cache-bypass');
  }
  console.log('Hunting bounded production freshness verified on four paths; no broad crawl.');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  main().catch(e=>{console.error(e.message);process.exitCode=1});
}
