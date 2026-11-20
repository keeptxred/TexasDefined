#!/usr/bin/env node
/**
 * Source-backed NEXT-DAY football freshness research, never a score publisher.
 * Indexes every current UIL team/district; narrows score lookups to authored
 * scores, scheduled fixtures and dated standings snapshots. A research lead
 * cannot modify a game, district rank, record, rendered page or Git branch.
 * No licensed feed credentials, article-body scraping, or live score polling.
 */
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {UIL_FOOTBALL_PROGRAMS_2026} from '../../src/data/high-school-football/uil-football-alignments-2026.server.ts';
import {footballProgramSlug} from '../../src/data/high-school-football/program-slugs.ts';

const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const DATA=join(ROOT,'src/data/high-school-football');
const OUT=join(ROOT,'artifacts/football-next-day-research');
const YEAR='2026';
const FEED_LIMIT=140000, RSS_ITEMS=8, PER_SHARD=32;
export const texasDate=(now=new Date())=>new Intl.DateTimeFormat('en-CA',{
  timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'
}).format(now);
const districtSlug=(p)=>[p.classification.toLowerCase(),
  p.division===1?'division-i':p.division===2?'division-ii':null,
  'district',String(p.district)].filter(Boolean).join('-');
const safe=(s)=>String(s||'').replace(/[\r\n|<>\x00-\x1f]/g,' ').slice(0,220);
const md=(s)=>safe(s).replace(/[\[\]()*_]/g,' ');
const dateValue=(s)=>{const n=Date.parse(s);return Number.isFinite(n)?new Date(n).toISOString().slice(0,10):null;};
export function indexPrograms(programs=UIL_FOOTBALL_PROGRAMS_2026){
  const teams=new Map(),districts=new Map(),nameToSlug=new Map();
  for(const p of programs){
    const slug=footballProgramSlug(p.schoolName),ds=districtSlug(p);
    assert.ok(slug&&!teams.has(slug),'UIL canonical school slug missing/duplicated: '+slug);
    teams.set(slug,{slug,name:p.schoolName,classification:p.classification,division:p.division,district:p.district,districtSlug:ds,
      url:'https://texasdefined.com/texas-high-school-football-teams/'+slug});
    nameToSlug.set(p.schoolName.toLowerCase(),slug);
    if(!districts.has(ds))districts.set(ds,{slug:ds,classification:p.classification,division:p.division,district:p.district,
      url:'https://texasdefined.com/texas-high-school-football-districts/'+ds,names:[]});
    districts.get(ds).names.push(p.schoolName);
  }
  return {teams,districts,nameToSlug};
}
export function staleRows(source,filename,today){
  const rows=[],seen=new Set();
  const add=(date,away,home,kind='fixture',position=-1)=>{
    if(!date||date>=today||!/^2026-\d{2}-\d{2}$/.test(date))return;
    const id=[filename,date,kind,away||'',home||''].join('|');
    if(seen.has(id))return;
    seen.add(id);rows.push({file:filename,date,kind,away:away||null,home:home||null,position});
  };
  // Published function-call calendars: match arguments only, never final().
  const calls=/\b(scheduled|upcoming)\(\s*['"](2026-\d{2}-\d{2})['"]\s*,\s*['"]([^'"]{2,100})['"]\s*,\s*['"]([^'"]{2,100})['"](?:\s*,\s*['"]([^'"]{2,100})['"])?/g;
  for(const m of source.matchAll(calls)){
    const hasKickoff=filename==='football-district-game-week.ts';
    add(m[2],hasKickoff?m[4]:m[3],hasKickoff?m[5]:m[4],'fixture',m.index);
  }
  // Static calendar and per-team season.games records, including JSON rows.
  const objects=/\{[^{}]{0,1500}?["']?date["']?\s*:\s*['"](2026-\d{2}-\d{2})['"][^{}]{0,1500}?\}/g;
  for(const m of source.matchAll(objects)){
    const body=m[0];
    if(/\b["']?(?:result|status)["']?\s*:\s*['"](?:W |L |T |final)/.test(body))continue;
    if(!/\b(?:opponent|away|home|kickoff|matchupPath|districtGame)\b/.test(body))continue;
    const val=(k)=>{const x=body.match(new RegExp('["\\\']?'+k+'["\\\']?\\s*:\\s*["\\\']([^"\\\']{2,110})["\\\']'));return x?.[1]||null;};
    add(m[1],val('opponent')||val('away'),val('home'),'fixture',m.index);
  }
  return rows;
}
function sourceDistrict(filename){
  const known={'football-district5-2026.ts':'6a-district-5',
    'football-district11-2026.ts':'4a-division-i-district-11',
    'football-district16-2026.ts':'6a-district-16',
    'football-district21-2026.ts':'6a-district-21',
    'football-district-game-week.ts':'6a-district-22'};
  return known[filename]||null;
}
function unique(arr){return [...new Set(arr.filter(Boolean))];}
function sourceSlugs(content,index){
  const found=unique([...content.matchAll(/["']?slug["']?\s*:\s*['"]([a-z0-9-]+)['"]/g)].map(x=>x[1]));
  return found.filter(x=>index.teams.has(x));
}
function nearestAuthoredTeam(source,position,index){
  if(position<0)return null;
  const prefix=source.slice(0,position);
  const matcher=/["']?slug["']?\s*:\s*['"]([a-z0-9-]+)['"]/g;
  let latest=null;
  for(const m of prefix.matchAll(matcher))if(index.teams.has(m[1]))latest=m[1];
  return latest;
}
function findMatchedSlug(name,index){
  return index.nameToSlug.get((name||'').toLowerCase())||null;
}
export function audit({today=texasDate(),dir=DATA,programs=UIL_FOOTBALL_PROGRAMS_2026}={}){
  const index=indexPrograms(programs);
  const watchFiles=readdirSync(dir).filter(f=>
    /^(?:program-editorial(?:-.+)?\.ts|football-district(?:[0-9]+-2026|-game-week)\.ts|football-matchups\.snapshot\.json|aubrey-postseason-fixtures\.snapshot\.json)$/.test(f)).sort();
  const stale=[],outdatedStandings=[],scanned=[];
  for(const file of watchFiles){
    const source=readFileSync(join(dir,file),'utf8');
    const slugs=sourceSlugs(source,index),dist=sourceDistrict(file);
    const rows=staleRows(source,file,today);
    const isTeamFile=file.startsWith('program-editorial');
    // Multiple programs in a single authoring file must not be misattributed.
    const fileTeam=(isTeamFile&&slugs.length===1)?slugs[0]:null;
    for(const row of rows){
      const owner=isTeamFile ? nearestAuthoredTeam(source,row.position,index) : null;
      const teams=unique([findMatchedSlug(row.away,index),findMatchedSlug(row.home,index),owner,fileTeam]);
      const districts=unique([dist,...teams.map(x=>index.teams.get(x)?.districtSlug)]);
      stale.push({...row,teams,districts,subjectName:owner?index.teams.get(owner)?.name||null:null,sourceAmbiguous:isTeamFile&&slugs.length!==1&&!owner,
        urls:unique([...teams.map(x=>index.teams.get(x)?.url),...districts.map(x=>index.districts.get(x)?.url)])});
    }
    if(file.includes('district')){
      const asOf=source.match(/(?:STANDINGS_AS_OF|standingsAsOf)\s*(?::|=)\s*['"]([^'"]+)['"]/);
      const date=asOf?dateValue(asOf[1]):null;
      if(date&&date<today&&((Date.parse(today)-Date.parse(date))/86400000)>=7)
        outdatedStandings.push({file,asOf:date,districts:dist?[dist]:[],
          url:dist?index.districts.get(dist)?.url:null,
          note:'Dated published standings need postgame re-verification; official tiebreak and seeds are not inferred'});
    }
    scanned.push({file,knownTeamSlugs:slugs.length,overdue:rows.length,scoreData:!!rows.length||/\bseason\s*:\s*\{/.test(source)});
  }
  // Small independently verified matchup snapshot can also contain passed scheduled games.
  const snapshot=JSON.parse(readFileSync(join(dir,'football-matchups.snapshot.json'),'utf8'));
  for(const game of snapshot.games||[]){
    if(game.status!=='scheduled'||game.date>=today)continue;
    const teams=unique([game.home?.slug,game.away?.slug].filter(s=>index.teams.has(s)));
    const districts=unique(teams.map(x=>index.teams.get(x)?.districtSlug));
    const entry={file:'football-matchups.snapshot.json',date:game.date,kind:'matchup',
      away:game.away?.name||null,home:game.home?.name||null,teams,districts,sourceAmbiguous:false,
      urls:unique([...teams.map(x=>index.teams.get(x)?.url),...districts.map(x=>index.districts.get(x)?.url),
        'https://texasdefined.com/texas-high-school-football-matchups/'+game.slug])};
    if(!stale.some(x=>x.file===entry.file&&x.date===entry.date&&x.away===entry.away))stale.push(entry);
  }
  stale.sort((a,b)=>b.date.localeCompare(a.date)||a.file.localeCompare(b.file)||String(a.away).localeCompare(String(b.away)));
  const impacted=unique([...stale.flatMap(x=>x.urls),...outdatedStandings.map(x=>x.url)]);
  return {schema:1,asOf:today,teamPages:index.teams.size,districtPages:index.districts.size,
    scoreBearingSourceFiles:scanned.filter(x=>x.scoreData).length,
    sourceFilesScanned:scanned.length,
    overdueFixtureCandidates:stale.length,datedStandingsDue:outdatedStandings.length,
    impactedKnownPageUrls:impacted.length,stale,outdatedStandings,scanned,
    scopeNote:'All 1,268 current UIL teams and 192 districts are indexed. Only source-backed pages with an overdue listed fixture or old dated standings are flagged, not all generic directory profiles.'};
}
export function shardSelection(report,shard,shards,cap=PER_SHARD){
  assert.ok(Number.isInteger(shard)&&shard>=0&&shard<shards&&shards>=1&&shards<=16);
  const tasks=[...report.stale.map(x=>({...x,kind:x.kind||'fixture'})),
    ...report.outdatedStandings.map(x=>({...x,kind:'standings',date:x.asOf,away:null,home:null,teams:[],urls:x.url?[x.url]:[]}))];
  // Make each shard responsible for a stable subset and rotate older backlog.
  const owned=tasks.filter(x=>hash([x.file,x.date,x.away,x.home].join('|'))%shards===shard);
  const recent=owned.filter(x=>Math.round((Date.parse(report.asOf)-Date.parse(x.date))/86400000)<=5);
  const old=owned.filter(x=>!recent.includes(x));
  const cycle=Math.floor(Date.parse(report.asOf)/86400000);
  const offset=old.length?(cycle*cap)%old.length:0;
  const rotated=old.length?[...old.slice(offset),...old.slice(0,offset)]:[];
  const selected=[...recent.slice(0,cap),...rotated.slice(0,Math.max(0,cap-recent.length))];
  return {total:owned.length,selected,notQueried:Math.max(0,owned.length-selected.length)};
}
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function searchText(task){
  if(task.kind==='standings')return [task.districts?.[0]||'Texas','2026','football','district','standings'].join(' ');
  const names=unique([task.away,task.home,task.subjectName]).map(n=>'"'+n+'"');
  if(names.length<2&&task.teams?.length)names.push('"'+task.teams[0].replace(/-/g,' ')+'"');
  return [...names,'Texas high school football final',task.date].join(' ');
}
function feedUrl(provider,query){
  const u=new URL(provider==='google'?'https://news.google.com/rss/search':'https://www.bing.com/news/search');
  u.searchParams.set('q',query);
  if(provider==='google'){u.searchParams.set('hl','en-US');u.searchParams.set('gl','US');u.searchParams.set('ceid','US:en');}
  else u.searchParams.set('format','rss');
  return u.toString();
}
function xmlValue(body,tag){
  const re=new RegExp('<'+tag+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+tag+'>','i');
  return (body.match(re)?.[1]||'').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]*>/g,'')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
}
export function parseRss(xml,earliest){
  const out=[];if(!/<rss\b|<feed\b/i.test(xml.slice(0,500)))throw Error('Not an RSS feed');
  for(const m of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)){
    const title=xmlValue(m[1],'title').slice(0,200),url=xmlValue(m[1],'link'),
      source=xmlValue(m[1],'source').slice(0,100),d=dateValue(xmlValue(m[1],'pubDate'));
    if(!title||!d||d<earliest||!/https:\/\/[^/]+/.test(url))continue;
    out.push({title,url,source:source||'News RSS',date:d,verification:'unverified-research-lead'});
    if(out.length>=RSS_ITEMS)break;
  }
  return out;
}
// Only a score printed next to BOTH named teams in a public headline is a hint.
// Contradictory or duplicate headlines never become source-verified game data.
export function explicitScoreHints(task,leads){
  const pair=unique([task.away,task.home,task.subjectName]);
  if(pair.length<2)return [];
  const patterns=(name)=>{
    const opts=[name];
    if(name.startsWith('Port Lavaca '))opts.push(name.slice('Port Lavaca '.length));
    return '(?:'+opts.filter(n=>n.length>=5).map(n=>n.replace(/[^A-Za-z0-9]+/g,'\\s+')).join('|')+')';
  };
  const a=patterns(pair[0]),b=patterns(pair[1]);
  const regex=new RegExp('('+a+')\\s+(\\d{1,3})\\s*[,;:–-]\\s*('+b+')\\s+(\\d{1,3})','i');
  const rev=new RegExp('('+b+')\\s+(\\d{1,3})\\s*[,;:–-]\\s*('+a+')\\s+(\\d{1,3})','i');
  const result=[];
  for(const item of leads){
    const m=regex.exec(item.title),r=m?null:rev.exec(item.title);
    if(!m&&!r)continue;
    const first=Number(m?.[2]??r?.[4]),second=Number(m?.[4]??r?.[2]);
    if(first>200||second>200||first===second)continue;
    result.push({firstTeam:pair[0],secondTeam:pair[1],firstScore:first,secondScore:second,
      headline:item.title,url:item.url,source:item.source,date:item.date,verification:'unverified-headline-only'});
  }
  return result.slice(0,8);
}
export async function lookup(task,{get=fetch,now=texasDate()}={}){
  const query=searchText(task),out={task,query,leads:[],errors:[]};
  const earliest=task.date>now.slice(0,4)+'-01-01'?task.date:now.slice(0,4)+'-01-01';
  for(const provider of ['google','bing']){
    try{
      const response=await get(feedUrl(provider,query),{signal:AbortSignal.timeout(10000),
        headers:{accept:'application/rss+xml, application/xml'},redirect:'error'});
      if(!response.ok)throw Error('RSS HTTP '+response.status);
      if(Number(response.headers.get('content-length')||0)>FEED_LIMIT)throw Error('RSS too large');
      const body=await response.text();if(body.length>FEED_LIMIT)throw Error('RSS exceeded byte limit');
      out.leads.push(...parseRss(body,earliest).map(x=>({...x,discovery:provider})));
    }catch(e){out.errors.push({provider,error:String(e.message||e).slice(0,120)});}
  }
  return {...out,leads:out.leads.slice(0,10),scoreHints:explicitScoreHints(task,out.leads)};
}
async function research(shard,shards,opts={}){
  const auditReport=audit(opts),selected=shardSelection(auditReport,shard,shards);
  const results=[];
  for(const task of selected.selected)results.push(await lookup(task,opts));
  return {schema:1,checkedAt:new Date().toISOString(),asOf:auditReport.asOf,
    shard,shards,inventory:{teamPages:auditReport.teamPages,districtPages:auditReport.districtPages,
      impactedKnownPageUrls:auditReport.impactedKnownPageUrls,overdue:auditReport.overdueFixtureCandidates,
      datedStandings:auditReport.datedStandingsDue},
    allocated:selected.total,notQueried:selected.notQueried,results,
    advisory:'Public news headlines only identify candidates. They do not verify a final, standing, seed or tiebreak, and this job never publishes site changes.'};
}
export function combinedSummary(reports,auditReport){
  const ids=new Set(reports.map(x=>x.shard));
  assert.equal(ids.size,reports.length,'duplicate research shards');
  const shards=reports[0]?.shards;
  assert.ok(reports.length===shards,'all scheduled research shards must be represented');
  for(let i=0;i<shards;i++)assert.ok(ids.has(i),'missing research shard '+i);
  const results=reports.flatMap(x=>x.results),failed=results.filter(x=>x.errors.length===2);
  const allPages=unique(auditReport.stale.flatMap(x=>x.urls).concat(auditReport.outdatedStandings.map(x=>x.url)));
  const lines=['# TexasDefined 2026 football scores and standings — next-day public-source review','',
    '**Date (Texas):** '+auditReport.asOf,
    '**Indexed:** '+auditReport.teamPages+' UIL team pages, '+auditReport.districtPages+' district pages.',
    '**Source file inventory:** '+auditReport.sourceFilesScanned+' files reviewed; '+auditReport.scoreBearingSourceFiles+' contain score/season evidence.',
    '**Unconfirmed past-game entries:** '+auditReport.overdueFixtureCandidates+' (review candidates, not proven incorrect scores).',
    '**Dated standings needing review:** '+auditReport.datedStandingsDue,
    '**Affected known URLs:** '+allPages.length+' (complete URL list in JSON artifact).',
    '**This run:** '+results.length+' source searches, '+failed.length+' with both public RSS sources unavailable; '+reports.reduce((n,x)=>n+x.notQueried,0)+' queued for later scheduled batches.','',
    'No paid feed, live-score polling, mass copying of third-party scoreboards, inferred official rank, or unattended site publication.',
    'Verify a final against publicly available named reports, then update the authored score and derived W–L/points/standings through a normal protected editorial PR and production check.',
    '','## Most recent unconfirmed game / dated-standings reviews'];
  for(const r of results.slice(0,80)){
    const t=r.task;
    lines.push('','- **'+md(t.date)+' '+md(t.away||t.districts?.[0]||'District')+(t.home?' at '+md(t.home):'')+'** — '+md(t.file));
    for(const url of (t.urls||[]).slice(0,4))lines.push('  - Affected page: '+url);
    if(!r.leads.length)lines.push('  - No recent public RSS lead. Check official athletics and dated published score references; do not invent a result.');
    for(const x of r.leads.slice(0,3))lines.push('  - Unverified lead ('+md(x.source)+', '+x.date+'): '+md(x.title)+' — '+x.url);
    for(const h of (r.scoreHints||[]).slice(0,2))lines.push('  - **Candidate final only; NOT verified:** '+md(h.firstTeam)+' '+h.firstScore+' – '+md(h.secondTeam)+' '+h.secondScore+' ('+md(h.source)+') — '+h.url);
    if(r.errors.length)lines.push('  - Source problems: '+r.errors.map(x=>x.provider+' '+md(x.error)).join('; '));
  }
  if(results.length>80)lines.push('','Only first 80 researched candidates are summarized here. Full reports and every affected URL are saved as artifacts.');
  lines.push('','**Next action:** Source-check the highest-priority overdue finals, update every affected canonical and district from consistent evidence, preserve a review trail, and rerun the protected deploy/live check. This task does not auto-publish.','');
  return {markdown:lines.join('\n').slice(0,58000),summary:{asOf:auditReport.asOf,teamPages:auditReport.teamPages,districtPages:auditReport.districtPages,
    overdue:auditReport.overdueFixtureCandidates,datedStandings:auditReport.datedStandingsDue,
    affectedPageUrls:allPages,results}};
}
async function main(){
  const mode=process.argv[2],today=texasDate();
  if(mode==='--audit'){
    const result=audit({today});mkdirSync(OUT,{recursive:true});
    writeFileSync(join(OUT,'inventory.json'),JSON.stringify(result,null,2)+'\n');
    console.log('Football sitewide public score audit: '+JSON.stringify({teamPages:result.teamPages,districtPages:result.districtPages,
      overdue:result.overdueFixtureCandidates,datedStandings:result.datedStandingsDue,affected:result.impactedKnownPageUrls}));return;
  }
  if(mode==='--research'){
    const shard=Number(process.argv[3]),shards=Number(process.argv[4]);
    assert.ok(Number.isInteger(shard)&&Number.isInteger(shards));
    const r=await research(shard,shards,{today});
    const dir=join(OUT,'shard-'+shard);mkdirSync(dir,{recursive:true});
    writeFileSync(join(dir,'report.json'),JSON.stringify(r,null,2)+'\n');
    console.log('Football public-source shard: '+JSON.stringify({shard,allocated:r.allocated,queried:r.results.length,
      unavailable:r.results.filter(x=>x.errors.length===2).length}));return;
  }
  if(mode==='--summarize'){
    const dir=join(OUT,'collected'),reports=[];
    for(const sub of readdirSync(dir)){
      const path=join(dir,sub,'report.json');if(existsSync(path))reports.push(JSON.parse(readFileSync(path,'utf8')));
    }
    const combined=combinedSummary(reports,audit({today}));
    mkdirSync(OUT,{recursive:true});
    writeFileSync(join(OUT,'summary.md'),combined.markdown);
    writeFileSync(join(OUT,'summary.json'),JSON.stringify(combined.summary,null,2)+'\n');
    console.log('Football statewide research assembled: '+reports.length+' shards, '+combined.summary.affectedPageUrls.length+' referenced affected pages.');return;
  }
  throw Error('Usage: --audit | --research SHARD SHARDS | --summarize');
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===fileURLToPath(new URL('file://'+process.argv[1])))await main();
