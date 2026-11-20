#!/usr/bin/env node
/**
 * Statewide, public-source, next-day football research (NOT a scoreboard importer).
 * Enumerates all 1,268 UIL team profiles and 192 district profiles on every run.
 * Detects authored score/standing snapshots and overdue fixtures, then searches
 * a bounded rotating priority cohort through public news RSS metadata only.
 * Does NOT scrape sports sites, infer a final from a headline or publish changes.
 */
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {UIL_FOOTBALL_PROGRAMS_2026} from '../../src/data/high-school-football/uil-football-alignments-2026.server.ts';
import {footballProgramSlug} from '../../src/data/high-school-football/program-slugs.ts';
import {texasToday} from './refresh-canyon-lake-results.mjs';
import {isSafePublicUrl,decodeXml} from './research-canyon-lake-weekly.mjs';

export const OUT='artifacts/football-statewide-research';
export const EDITORIAL_DIR='src/data/high-school-football';
export const MAX_SEARCHES=48; // each query is sent to at most two RSS sources
const MAX_ITEMS=5,MAX_BYTES=300000,TIMEOUT_MS=9000;
const DATE=/^\d{4}-\d{2}-\d{2}$/;
const isoDay=(d)=>new Date(d).toISOString().slice(0,10);
const validDay=(s)=>DATE.test(s)&&Number.isFinite(Date.parse(s+'T00:00:00Z'))&&isoDay(s+'T00:00:00Z')===s;
const priorityOrder=(x)=>x.severity==='game-overdue'?0:x.severity==='dated-standings'?1:2;
export const pathForTeam=slug=>'/texas-high-school-football-teams/'+slug;
export function districtSlug(p) {
  return [p.classification.toLowerCase(),p.division===1?'division-i':p.division===2?'division-ii':null,'district',String(p.district)].filter(Boolean).join('-');
}
export function extractJsonObjects(text) {
  // The original authored roster is a large JSON-compatible TS literal.
  // Anchor at exactly two leading spaces to exclude nested property objects.
  const result=new Map();
  for(const m of text.matchAll(/^  "([a-z0-9-]+)":\s*\{/gm)){
    const start=text.indexOf('{',m.index+m[0].indexOf(':'));
    let depth=0,inString=false,escaped=false,stop=-1;
    for(let i=start;i<text.length;i++){
      const c=text[i];
      if(inString){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')inString=false;continue;}
      if(c==='"'){inString=true;continue;}
      if(c==='{')depth++;
      else if(c==='}'&&--depth===0){stop=i+1;break;}
    }
    if(stop<0)throw Error('Unterminated editorial JSON for '+m[1]);
    try{const row=JSON.parse(text.slice(start,stop));if(row.slug===m[1])result.set(row.slug,row);}
    catch(e){throw Error('Cannot safely parse '+m[1]+' authored JSON: '+e.message);}
  }
  return result;
}
function externalSnapshots(dir=EDITORIAL_DIR,read=readFileSync,list=readdirSync) {
  const found=new Map(),errors=[];
  const files=list(dir).filter(x=>x.startsWith('program-editorial')&&x.endsWith('.ts'));
  for(const file of files){
    const body=read(dir+'/'+file,'utf8');
    // Grouped batches authored in double-quoted JSON-compatible object style.
    if(file==='program-editorial.ts'||/^program-editorial-b0/.test(file)){
      try{for(const [slug,row] of extractJsonObjects(body))if(row.season)found.set(slug,{season:row.season,file});}
      catch(error){errors.push({file,error:String(error.message)});}
    }
    // Independent source-authored profiles may use inline single-quote TS
    // records. Recognize a season only when the enclosing named profile has one.
    if(file!=='program-editorial.ts'&&/[\s,{]season\s*:\s*\{/.test(body)){
      const named=[...body.matchAll(/(?:\bslug\s*:\s*|\b"slug"\s*:\s*)['"]([a-z0-9-]+)['"]/g)].map(x=>x[1]);
      if(named.length===1&&!found.has(named[0])){
        const dates=[...body.matchAll(/\bdate["']?\s*:\s*['"](\d{4}-\d\d-\d\d)['"]/g)].map(x=>x[1]);
        const finals=[...body.matchAll(/\bresult["']?\s*:\s*['"][WLT] \d{1,3}[–-]\d{1,3}['"]/g)].length;
        const v=body.match(/(?:["']?verifiedAt["']?)\s*:\s*['"](\d{4}-\d\d-\d\d)['"]/);
        found.set(named[0],{season:{games:dates.map(date=>({date})),verifiedAt:v?.[1]||null,recognizedFinals:finals},file,partial:true});
      }
    }
  }
  return {found,errors,files:files.length};
}
export function classifySeason(season,today) {
  if(!season||!Array.isArray(season.games))return {hasSnapshot:false,overdue:[],lastFinal:null,asOf:null};
  const overdue=season.games.filter(x=>validDay(x.date)&&x.date<today&&!x.result);
  const finals=season.games.filter(x=>validDay(x.date)&&x.result).map(x=>x.date).sort();
  return {hasSnapshot:true,overdue:overdue.map(x=>({date:x.date,opponent:x.opponent||null})),
    lastFinal:finals.at(-1)||null,asOf:validDay(season.verifiedAt||'')?season.verifiedAt:null};
}
function gamesFromDistrictSource(text,slug,today) {
  const overdue=[],covered=new Set();
  const constructorRe=/\b(?:scheduled|upcoming)\(\s*['"](\d{4}-\d{2}-\d{2})['"]\s*,([^\n]*?)\)/g;
  for(const m of text.matchAll(constructorRe)){
    const date=m[1];if(date>=today)continue;
    const args=[...m[2].matchAll(/'([^']*)'|"([^"]*)"/g)].map(x=>x[1]??x[2]);
    const names=args.filter(x=>!/\b(?:CDT|CST|a\.m\.|p\.m\.)\b/.test(x)&&!x.startsWith('http')&&!/stadium/i.test(x));
    const away=names[0]||null,home=names[1]||null;
    const key=[date,away,home].join('|');if(covered.has(key))continue;covered.add(key);
    overdue.push({date,away,home,source:'district-fixture'});
  }
  if(slug==='6a-district-16'){
    for(const m of text.matchAll(/\{\s*date:\s*['"](\d{4}-\d\d-\d\d)['"],\s*kickoff:[^,\n]+,\s*away:\s*['"]([^'"]+)['"],\s*home:\s*['"]([^'"]+)['"]/g)){
      if(m[1]>=today)continue;
      const key=[m[1],m[2],m[3]].join('|');if(!covered.has(key)){covered.add(key);overdue.push({date:m[1],away:m[2],home:m[3],source:'district-16-calendar'});}
    }
  }
  return overdue.sort((a,b)=>b.date.localeCompare(a.date));
}
function districtSourceFiles(read=readFileSync) {
  return [
    ['6a-district-22','football-district-game-week.ts'],
    ['6a-district-5','football-district5-2026.ts'],
    ['6a-district-21','football-district21-2026.ts'],
    ['4a-division-i-district-11','football-district11-2026.ts'],
    ['6a-district-16','football-district16-2026.ts'],
  ].map(([slug,file])=>({slug,file,body:read(EDITORIAL_DIR+'/'+file,'utf8')}));
}
export function inventory(today=texasToday(),options={}){
  assert.ok(validDay(today));
  const source=options.source??externalSnapshots();
  const districts=new Map(),teams=new Map();
  for(const p of UIL_FOOTBALL_PROGRAMS_2026){
    const slug=footballProgramSlug(p.schoolName),ds=districtSlug(p);
    if(teams.has(slug))throw Error('UIL team slug collision '+slug);
    const authored=source.found.get(slug);
    const season=classifySeason(authored?.season,today);
    const team={type:'team',slug,name:p.schoolName,url:pathForTeam(slug),
      districtSlug:ds,classification:p.classification,division:p.division,
      snapshotFile:authored?.file||null,season,review:season.overdue.length>0?'game-overdue':season.hasSnapshot?'snapshot-check':'alignment-only'};
    teams.set(slug,team);
    if(!districts.has(ds))districts.set(ds,{type:'district',slug:ds,url:'/texas-high-school-football-districts/'+ds,
      classification:p.classification,division:p.division,teams:[],overdue:[],scoreSnapshotFile:null});
    districts.get(ds).teams.push(slug);
  }
  for(const f of districtSourceFiles(options.read)){
    const d=districts.get(f.slug);if(!d)throw Error('Unknown 2026 district source '+f.slug);
    d.overdue=gamesFromDistrictSource(f.body,f.slug,today);
    d.scoreSnapshotFile=f.file;
  }
  const matchups=JSON.parse((options.read||readFileSync)(EDITORIAL_DIR+'/football-matchups.snapshot.json','utf8'));
  assert.equal(matchups.season,'2026');
  for(const g of matchups.games){
    if(g.status!=='scheduled'||g.date>=today)continue;
    for(const slug of [g.home.slug,g.away.slug]){
      const t=teams.get(slug);if(t&&!t.season.overdue.some(x=>x.date===g.date&&x.opponent===(slug===g.home.slug?g.away.name:g.home.name))){
        t.season.overdue.push({date:g.date,opponent:slug===g.home.slug?g.away.name:g.home.name});
        t.review='game-overdue';
      }
    }
    if(g.districtGame){
      const d=[...districts.values()].find(d=>d.classification===g.classification&&d.teams.includes(g.home.slug)&&d.teams.includes(g.away.slug));
      if(d)d.overdue.push({date:g.date,away:g.away.name,home:g.home.name,source:'matchup-snapshot'});
    }
  }
  const snapshotAge=matchups.updatedAt;
  const rows=[...teams.values(),...districts.values()];
  assert.equal(teams.size,1268);assert.equal(districts.size,192);assert.equal(rows.length,1460);
  return {today,teams:[...teams.values()],districts:[...districts.values()],
    counts:{teamPages:teams.size,districtPages:districts.size,coveredPages:rows.length,
      teamSeasonSnapshots:[...teams.values()].filter(x=>x.season.hasSnapshot).length,
      teamOverdue:[...teams.values()].filter(x=>x.season.overdue.length).length,
      districtOverdue:[...districts.values()].filter(x=>x.overdue.length).length,
      districtScoreSources:[...districts.values()].filter(x=>x.scoreSnapshotFile).length,
      matchupSnapshotVerifiedAt:snapshotAge,parseErrors:source.errors},
    policy:'Source-date review candidates only. A stale date or overdue fixture does not imply a particular result or official UIL standing.'};
}
export function chooseReviewCohort(inv,today=inv.today,limit=MAX_SEARCHES) {
  assert.ok(Number.isInteger(limit)&&limit>0&&limit<=MAX_SEARCHES);
  // Stable, bounded date rotation prevents one perpetually overdue team from
  // starving the rest; new overdue games receive half the queue immediately.
  const all=[...inv.teams,...inv.districts];
  const candidates=all.filter(x=>x.type==='district' ? x.overdue.length>0 : x.season.hasSnapshot||x.season.overdue.length>0);
  const dateOrdinal=Math.floor(Date.parse(today+'T00:00:00Z')/86400000);
  const urgent=candidates.filter(x=>(x.type==='district'?x.overdue:x.season.overdue).some(g=>g.date===isoDay(new Date(Date.parse(today+'T00:00:00Z')-86400000)))).sort((a,b)=>a.slug.localeCompare(b.slug));
  const rotating=candidates.slice().sort((a,b)=>a.slug.localeCompare(b.slug));
  const start=(dateOrdinal*limit)%Math.max(1,rotating.length);
  const roll=[...rotating.slice(start),...rotating.slice(0,start)];
  const selected=new Map();
  for(const x of urgent.slice(0,Math.ceil(limit/2)))selected.set(x.type+':'+x.slug,x);
  for(const x of roll){if(selected.size>=limit)break;selected.set(x.type+':'+x.slug,x);}
  return {candidates:candidates.length,urgent:urgent.length,selected:[...selected.values()]};
}
export function queryFor(row,today){
  const due=row.type==='district'?row.overdue:row.season.overdue;
  const latest=due.filter(g=>g.date<today).sort((a,b)=>b.date.localeCompare(a.date))[0];
  if(row.type==='team')return latest?.opponent
    ? '"'+row.name+'" "'+latest.opponent+'" football final score '+latest.date
    : '"'+row.name+'" Texas high school football 2026 final record standings';
  const district=row.classification+' '+(row.division?'division '+row.division+' ':'')+'district '+row.slug.match(/district-(\d+)$/)?.[1];
  return '"'+district+'" Texas football final scores 2026 '+(latest?.date||today);
}
export function parsePublicFootballRss(xml,{row,now=new Date()}){
  if(!/^<\?xml|<rss\b|<feed\b/i.test(String(xml).trim().slice(0,80)))throw Error('Not an RSS/XML response');
  const out=[];
  const textOf=(block,tag)=>{const m=block.match(new RegExp('<'+tag+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+tag+'>','i'));
    return m?decodeXml(m[1].replace(/^<!\[CDATA\[|\]\]>$/g,'').replace(/<[^>]+>/g,'')).trim():'';};
  const aliases=row.type==='team'
    ?[row.name.toLowerCase(),row.slug.replace(/-/g,' ')]
    :[row.classification.toLowerCase()+' district '+row.slug.match(/district-(\d+)$/)?.[1],
      'district '+row.slug.match(/district-(\d+)$/)?.[1]];
  const cutoff=now.getTime()-45*86400000;
  for(const match of String(xml).matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)){
    const title=textOf(match[1],'title').replace(/\s+/g,' ').slice(0,200);
    const link=textOf(match[1],'link'),stamp=Date.parse(textOf(match[1],'pubDate'));
    const source=textOf(match[1],'source').replace(/\s+/g,' ').slice(0,90)||'Public news reporting';
    if(!title||!isSafePublicUrl(link)||!Number.isFinite(stamp)||stamp<cutoff||stamp>now.getTime()+86400000)continue;
    const normalized=title.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    if(!/\b(?:football|scores?|playoffs?|standings|hawks|tigers|district|final)\b/i.test(title))continue;
    // An exact named school or district reference must appear in each story;
    // never accept generic unrelated headlines as verification.
    if(!aliases.some(a=>a&&a.length>=5&&normalized.includes(a.replace(/[^a-z0-9]+/g,' ').trim())))continue;
    out.push({title,link,source,publishedAt:new Date(stamp).toISOString()});
    if(out.length>=MAX_ITEMS)break;
  }
  return out;
}
function feedUrl(provider,q){
  const u=new URL(provider==='google'?'https://news.google.com/rss/search':'https://www.bing.com/news/search');
  u.searchParams.set('q',q);
  if(provider==='google'){u.searchParams.set('hl','en-US');u.searchParams.set('gl','US');u.searchParams.set('ceid','US:en');}
  else u.searchParams.set('format','rss');
  return u.href;
}
async function fetchFeed(url) {
  const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(TIMEOUT_MS),
    headers:{accept:'application/rss+xml,application/xml,text/xml'}});
  if(!response.ok)throw Error('HTTP '+response.status);
  if(Number(response.headers.get('content-length')||0)>MAX_BYTES)throw Error('oversize RSS');
  const reader=response.body.getReader();const chunks=[];let size=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;
    if(size>MAX_BYTES)throw Error('oversize RSS');chunks.push(Buffer.from(value));}}
  finally{reader.releaseLock();}
  return Buffer.concat(chunks).toString('utf8');
}
export async function researchCohort(inv,{today=inv.today,fetcher=fetchFeed,limit=MAX_SEARCHES}={}){
  const cohort=chooseReviewCohort(inv,today,limit);
  const rows=cohort.selected;
  const results=new Array(rows.length);let cursor=0;
  const worker=async()=>{
    while(cursor<rows.length){
      const i=cursor++,row=rows[i];const query=queryFor(row,today);
      const feeds=[];
      for(const provider of ['google','bing']){
        try{
          const xml=await fetcher(feedUrl(provider,query));
          feeds.push({provider,items:parsePublicFootballRss(xml,{row,now:new Date(today+'T23:00:00Z')})});
        }catch(e){feeds.push({provider,error:String(e.message||e).slice(0,160),items:[]});}
      }
      const articles=[...new Map(feeds.flatMap(f=>f.items||[]).map(a=>[a.link,a])).values()].slice(0,MAX_ITEMS);
      results[i]={type:row.type,slug:row.slug,url:row.url,
        query,overdue:row.type==='district'?row.overdue:row.season.overdue,
        asOf:row.type==='team'?row.season.asOf:null,articles,feedErrors:feeds.filter(f=>f.error).map(f=>f.provider+': '+f.error),
        status:articles.length?'public-reporting-leads':'no-matching-public-headlines'};
    }
  };
  await Promise.all(Array.from({length:Math.min(6,rows.length)},worker));
  return {schemaVersion:1,checkedAt:new Date().toISOString(),today,policy:inv.policy,
    fullInventory:inv.counts,coverage:{candidatePages:cohort.candidates,urgentYesterday:cohort.urgent,checkedPages:results.length,
      unsearchedCandidates:cohort.candidates-results.length,searchCap:limit},
    results};
}
function safe(v){return String(v??'').replace(/[\r\n<>|]/g,' ').slice(0,220);}
export function markdownReport(inv,report){
  const lines=['# Statewide TexasDefined football next-day score and standings research','',
    '**Checked:** '+report.checkedAt+' · **Texas date:** '+report.today,
    '**All indexed UIL football page families:** '+inv.counts.teamPages+' teams + '+inv.counts.districtPages+' districts = '+inv.counts.coveredPages+'.',
    '**Pages with authored 2026 season snapshots:** '+inv.counts.teamSeasonSnapshots+'.',
    '**Known overdue team fixtures:** '+inv.counts.teamOverdue+' affected team pages; **district fixture collections:** '+inv.counts.districtOverdue+'.',
    '**Shared matchup snapshot:** '+inv.counts.matchupSnapshotVerifiedAt+'.',
    '**Rotating research cohort:** '+report.coverage.checkedPages+'/'+report.coverage.candidatePages+' candidates searched today; '+report.coverage.unsearchedCandidates+' queued for future scheduled passes.',
    '','This is **public-source lookup evidence only**. An RSS headline is not a verified final, and missing headlines do not prove no game was played. No scores, standings ranks, tiebreaks, or postseason seeds were inferred or published.',
    '','## Pages with new public reporting to verify'];
  const hits=report.results.filter(x=>x.articles.length);
  if(!hits.length)lines.push('No relevant public headlines in this cohort.');
  for(const r of hits){
    lines.push('','### '+safe(r.type+' '+r.slug)+' — '+r.url);
    for(const a of r.articles)if(isSafePublicUrl(a.link))lines.push('- '+safe(a.publishedAt.slice(0,10)+' · '+a.source+' · '+a.title)+' — '+a.link);
  }
  lines.push('','## Reviewed pages with no matching public headlines / source errors');
  for(const r of report.results.filter(x=>!x.articles.length))
    lines.push('- '+safe(r.type+' '+r.slug)+' — '+r.url+(r.feedErrors.length?' — '+safe(r.feedErrors.join('; ')):''));
  lines.push('','## Required editorial correction',
    'Check the dated school schedule, UIL partner scoreboard and independent local reporting for each flagged game, confirm the final, and prepare a normal reviewed PR. Update results, overall/district W–L, as-of dates, opponent and playoff context together. Do not publish a headline alone as a final.',
    'This one scheduled workflow covers the whole UIL program/district inventory; it rotates bounded public queries rather than creating 1,460 individual cron workflows. Full page registry is in the uploaded JSON artifact.',
    '','## Parse errors');
  for(const e of inv.counts.parseErrors||[])lines.push('- '+safe(e.file+': '+e.error));
  if(!(inv.counts.parseErrors||[]).length)lines.push('None.');
  return lines.join('\n')+'\n';
}
async function main(){
  const mode=process.argv[2];
  assert.ok(['--validate','--inventory','--research'].includes(mode),'Usage: --validate | --inventory | --research');
  const inv=inventory();
  if(inv.counts.parseErrors?.length)throw Error('Cannot trust authored inventory; parse errors: '+JSON.stringify(inv.counts.parseErrors).slice(0,1200));
  if(mode==='--validate'){console.log('PASS statewide football inventory: '+JSON.stringify(inv.counts));return;}
  mkdirSync(OUT,{recursive:true});
  writeFileSync(OUT+'/inventory.json',JSON.stringify(inv,null,2)+'\n');
  if(mode==='--inventory'){console.log(JSON.stringify(inv.counts));return;}
  const report=await researchCohort(inv);
  writeFileSync(OUT+'/research.json',JSON.stringify(report,null,2)+'\n');
  writeFileSync(OUT+'/research.md',markdownReport(inv,report));
  console.log('PASS statewide football next-day public research '+JSON.stringify({coverage:report.coverage,...inv.counts}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
