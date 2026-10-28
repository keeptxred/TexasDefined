import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const FILE='src/data/hunting/species-season-calendar.json';
const BASE='https://tpwd.texas.gov/regulations/outdoor-annual/hunting/';
export const seasonUrl=(y)=>BASE+y+'-'+(y+1)+'-hunting-season-dates';
export const yearAt=(date)=>{const d=new Date(date+'T12:00:00Z');if(Number.isNaN(d.valueOf()))throw Error('Invalid audit date');return d.getUTCFullYear()-(d.getUTCMonth()<8?1:0)};
export const seasonLabel=(y)=>y+'–'+String(y+1).slice(-2);
export const clean=(s)=>String(s).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi,(_,a,b)=>String.fromCodePoint(parseInt(a||b,a?16:10))).replace(/&amp;/gi,'&').replace(/&nbsp;/gi,' ').replace(/&(?:ndash|mdash|minus);/gi,'-').replace(/[–—−]/g,'-').replace(/\s+/g,' ').trim();
const rowId=(r)=>(r.season+'|'+r.zone).toLowerCase().replace(/\s+/g,' ').trim();
export function readSection(html,heading){
  const heads=[...html.matchAll(/<h([234])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi)];
  const ix=heads.findIndex(m=>clean(m[2]).toLowerCase()===heading.toLowerCase());
  if(ix<0)throw Error('Missing TPWD species section: '+heading);
  const start=heads[ix].index+heads[ix][0].length,end=ix+1<heads.length?heads[ix+1].index:html.length;
  const table=html.slice(start,end).match(/<table\b[^>]*>([\s\S]*?)<\/table\s*>/i);
  if(!table)throw Error('Missing TPWD species table: '+heading);
  const rows=[];let carry='';
  for(const tr of table[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr\s*>/gi)){
    const cells=[...tr[1].matchAll(/<(td|th)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi)].map(x=>clean(x[2]));
    if(!cells.length||cells[0].toLowerCase()==='season')continue;
    let season,zone,dates;
    if(cells.length===3)[season,zone,dates]=cells;
    else if(cells.length===2&&carry)[season,zone,dates]=[carry,...cells];
    else throw Error('TPWD changed season row structure: '+heading);
    if(!season||!zone||!dates)throw Error('Blank TPWD date row: '+heading);
    carry=season;rows.push({season,zone,dates});
  }
  if(!rows.length||new Set(rows.map(rowId)).size!==rows.length)throw Error('TPWD duplicate/missing rows: '+heading);
  return rows;
}
export function reconcile(stored,html,date){
  if(stored.sections?.length!==17)throw Error('Expected 17 TPWD season groups');
  const year=yearAt(date),old=Number(stored.seasonYear?.slice(0,4));
  if(!Number.isInteger(old)||year<old||year>old+1||stored.source!==seasonUrl(old))throw Error('Unexpected season-year rollover or source identity');
  const match=clean(html).match(/\b(20\d{2})\s*-\s*(20\d{2})\s+Hunting Season Dates/i);
  if(!match||Number(match[1])!==year||Number(match[2])!==year+1)throw Error('Official TPWD season heading mismatch');
  const sections=stored.sections.map(section=>{
    const rows=readSection(html,section.heading);
    if(rows.length!==section.rows.length)throw Error('TPWD added or removed hunting zone: '+section.heading);
    for(let i=0;i<rows.length;i++){
      if(rowId(rows[i])!==rowId(section.rows[i]))throw Error('TPWD changed zone or season identity: '+section.heading);
      const years=[...rows[i].dates.matchAll(/\b20\d{2}\b/g)].map(m=>Number(m[0]));
      if(!years.length&&rows[i].dates.toLowerCase()!=='no closed season')throw Error('Unverifiable date row: '+section.heading);
      if(years.some(n=>n!==year&&n!==year+1)||rows[i].dates.length>160)throw Error('Invalid year/date range: '+section.heading);
    }
    return {...section,rows};
  });
  const updated={...stored,seasonYear:seasonLabel(year),source:seasonUrl(year),checkedAt:date,sections};
  if(stored.seasonYear===updated.seasonYear&&sections.every((s,i)=>s.rows.every((r,j)=>r.dates===stored.sections[i].rows[j].dates)))return null;
  return updated;
}
export async function main(){
  const stored=JSON.parse(fs.readFileSync(FILE,'utf8')),date=new Date().toISOString().slice(0,10),url=seasonUrl(yearAt(date));
  const resp=await fetch(url,{signal:AbortSignal.timeout(30000),headers:{'user-agent':'TexasDefined-species-seasons/1.0'}});
  if(!resp.ok||new URL(resp.url).hostname!=='tpwd.texas.gov'||!(resp.headers.get('content-type')||'').includes('text/html'))throw Error('TPWD official source unreachable or untrusted');
  const html=await resp.text();if(html.length<6000)throw Error('Short TPWD response; no changes allowed');
  const updated=reconcile(stored,html,date);
  if(!updated){console.log('17 TPWD species groups: no verified calendar changes');return;}
  if(!process.argv.includes('--write'))throw Error('Verified calendar changed; --write and protected PR required');
  fs.writeFileSync(FILE,JSON.stringify(updated,null,2)+'\n');
  console.log('TPWD source-backed species date change for '+updated.seasonYear+'; only season table JSON modified');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  main().catch(e=>{console.error(e.message);process.exitCode=1});
}
