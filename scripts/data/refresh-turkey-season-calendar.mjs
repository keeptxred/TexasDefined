import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Only within-year TPWD date changes are eligible for automatic update.
// A new season or any legal-rule drift stops and requires editorial review.
const file = 'src/data/hunting/turkey-season-calendar.json';
const official = 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey';
const table = 'https://tpwd.texas.gov/regulations/outdoor-annual/hunting/2026-2027-hunting-season-dates';
const news = 'https://tpwd.texas.gov/newsmedia/releases/?req=20260401b';
const mon = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
const dateRx = new RegExp('\\b(' + mon + ')\\.?\\s+(\\d{1,2})(?:,\\s*(20\\d{2}))?\\s*[-–]\\s*(?:(' + mon + ')\\.?\\s+)?(\\d{1,2}),\\s*(20\\d{2})\\b','gi');
const order = ['archery-fall','fall-north','fall-south','fall-four','fall-youth-north','fall-youth-south','fall-youth-four','spring-south','spring-north','spring-one','spring-east','spring-youth-south','spring-youth-north'];
export function visible(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]*>/g,' ').replace(/&amp;/gi,'&')
    .replace(/&(?:nbsp|#160|#xA0);/gi,' ')
    .replace(/&(?:ndash|mdash|minus|#8211|#8212);/gi,'-')
    .replace(/[–—−]/g,'-').replace(/\s+/g,' ').trim();
}
function between(s,a,b) {
  const i=s.indexOf(a), j=s.indexOf(b,i+a.length);
  if(i<0||j<=i) throw Error('TPWD source structure changed: '+a+' / '+b);
  return s.slice(i+a.length,j);
}
export function ranges(s) {
  const out=[];
  for(const m of s.matchAll(dateRx)){
    const y0=Number(m[3]||m[6]), y1=Number(m[6]), endMon=m[4]||m[1];
    const n=x=>('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ').findIndex(z=>z.toLowerCase()===x.toLowerCase())+1);
    const iso=(x,d,y)=>y+'-'+String(n(x)).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    const start=iso(m[1],m[2],y0),end=iso(endMon,m[5],y1);
    if(new Date(start+'T12:00:00Z').toISOString().slice(0,10)!==start||new Date(end+'T12:00:00Z').toISOString().slice(0,10)!==end||start>end)throw Error('Invalid official date '+m[0]);
    const fmt=x=>x.toLowerCase()==='may'?'May':x[0].toUpperCase()+x.slice(1).toLowerCase()+'.';
    const dates=y0!==y1?fmt(m[1])+' '+m[2]+', '+y0+' – '+fmt(endMon)+' '+m[5]+', '+y1:
      m[1].toLowerCase()===endMon.toLowerCase()?fmt(m[1])+' '+m[2]+'–'+m[5]+', '+y1:
      fmt(m[1])+' '+m[2]+' – '+fmt(endMon)+' '+m[5]+', '+y1;
    out.push({start,end,dates});
  }
  return out;
}
export function parseOfficial(html){
  const txt=visible(html), h=txt.match(/Wild Turkey\s+(20\d{2})\s*-\s*(20\d{2})\s+Seasons\s*&\s*Regulations/i);
  if(!h||Number(h[2])!==Number(h[1])+1)throw Error('Official TPWD turkey season year missing');
  const body=txt.slice(txt.indexOf(h[0]));
  const a=ranges(between(body,'Archery Only','Youth-Only'));
  const y=ranges(between(body,'Youth-Only','Fall Season'));
  const f=ranges(between(body,'Fall Season','Spring Season'));
  const s=ranges(between(body,'Spring Season','View Wild Turkey hunting regulations for your county'));
  if([a.length,y.length,f.length,s.length].join('/')!=='1/9/3/4')throw Error('Changed TPWD date layout: '+[a.length,y.length,f.length,s.length].join('/'));
  const must=['Upland Game Bird Endorsement','Harvest of unbearded hens is prohibited','Mandatory harvest reporting within 24 hours of harvest','No more than one gobbler may be harvested annually per county','no hunting over bait'];
  if(must.some(x=>!body.toLowerCase().includes(x.toLowerCase())))throw Error('Official legal wording changed; requires editorial review');
  return {seasonYear:h[1]+'–'+h[2].slice(-2),byId:{
    'archery-fall':[a[0]],'fall-north':[f[0]],'fall-south':[f[1]],'fall-four':[f[2]],
    'fall-youth-north':[y[0],y[1]],'fall-youth-south':[y[2],y[3]],'fall-youth-four':[y[4]],
    'spring-south':[s[1]],'spring-north':[s[0]],'spring-one':[s[2]],'spring-east':[s[3]],
    'spring-youth-south':[y[7],y[8]],'spring-youth-north':[y[5],y[6]]
  }};
}
export function checkCompanion(html,parsed){
  const known=new Set(ranges(between(visible(html),'Wild Turkey season dates','Migratory Game Bird')).map(x=>x.start+':'+x.end));
  if(known.size<12)throw Error('TPWD companion calendar incomplete');
  for(const [id,list] of Object.entries(parsed.byId))for(const v of list)if(!known.has(v.start+':'+v.end))throw Error('TPWD sources disagree: '+id+' '+v.dates);
}
export function updateStored(stored,parsed,checkedAt){
  if(parsed.seasonYear!==stored.seasonYear)throw Error('YEAR_ROLLOVER: review all county closures, bag limits, dates, public draws and guidance before publishing '+parsed.seasonYear);
  if(stored.rows?.length!==13||stored.rows.map(x=>x.id).join('|')!==order.join('|'))throw Error('Unexpected calendar schema');
  const rows=stored.rows.map(x=>({...x,dates:parsed.byId[x.id].map(r=>r.dates).join('; ')}));
  if(rows.every((x,i)=>x.dates===stored.rows[i].dates))return null;
  return {...stored,checkedAt,rows};
}
export class TpwdTransportUnavailable extends Error {
  constructor(url, cause) {
    super('Official TPWD transport unavailable after three bounded attempts: ' + url, { cause });
    this.name = 'TpwdTransportUnavailable';
  }
}
export async function fetchTPWD(url, fetchFn = fetch, sleep = ms => new Promise(resolve => setTimeout(resolve, ms))) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let response;
    try {
      response = await fetchFn(url, {
        signal: AbortSignal.timeout(20000),
        headers: { 'user-agent': 'TexasDefined turkey season monitor' },
      });
    } catch (error) {
      if (attempt === 3) throw new TpwdTransportUnavailable(url, error);
      await sleep(attempt * 1500);
      continue;
    }
    // HTTP errors or unexpected page content may signal a changed source. Never suppress them.
    if (!response.ok) throw Error('TPWD HTTP ' + response.status + ' ' + url);
    const body = await response.text();
    if (body.length < 3500 || !/Texas Parks/i.test(body)) throw Error('Untrusted/short TPWD response ' + url);
    return body;
  }
  throw Error('Unreachable TPWD source retry state ' + url);
}
async function main(){
  const stored=JSON.parse(fs.readFileSync(file,'utf8'));
  if(stored.source!==official||stored.crossCheckSource!==table)throw Error('Wrong official source URLs');
  const [a,b,c]=await Promise.all([fetchTPWD(official),fetchTPWD(table),fetchTPWD(news)]);
  if(!visible(c).includes('Matagorda and Wharton counties were closed to wild turkey hunting'))throw Error('Closure source changed');
  const parsed=parseOfficial(a);
  checkCompanion(b,parsed);
  const updated=updateStored(stored,parsed,new Date().toISOString().slice(0,10));
  if(!updated){console.log('TPWD turkey calendar unchanged');return;}
  if(process.argv.includes('--check-only'))throw Error('Date change detected; run protected PR refresh');
  fs.writeFileSync(file,JSON.stringify(updated,null,2)+'\n');
  console.log('Verified within-season TPWD dates updated; legal editorial content unchanged.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    if (process.argv.includes('--check-only') && error instanceof TpwdTransportUnavailable) {
      // Network outages are not evidence that published rules changed. PRs may proceed
      // with a visible warning; scheduled runs still fail and create a review issue.
      console.warn('::warning::' + error.message + '. PR source freshness not reverified; scheduled checker remains fail-closed.');
    } else {
      throw error;
    }
  }
}
