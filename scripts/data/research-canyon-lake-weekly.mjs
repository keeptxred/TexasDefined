#!/usr/bin/env node
/**
 * Bounded weekly Canyon Lake football score and District 13 standings research.
 *
 * Search discovery reads news RSS feeds intended for syndication. It records
 * ONLY headline/link/date metadata and never downloads news articles, scrapes
 * scoreboards, or interprets headlines as verified match results. Official and
 * standings pages are checked by HEAD only. Publication of a new score still
 * requires the separately licensed independent JSON feeds and protected PRs.
 */
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {texasToday,readEditorial} from './refresh-canyon-lake-results.mjs';

export const OUT='artifacts/canyon-lake-refresh';
export const SOURCE='src/data/high-school-football/program-editorial-comal-canyon-lake.ts';
const NEWS_LIMIT=24;
const BYTES_LIMIT=350000;
const LOOKBACK_DAYS=30;
export const REVIEW_PAGES=[
  {label:'UIL official 4A Division I alignment (district membership, not standings)',url:'https://www.uiltexas.org/football/alignments',kind:'official-alignment'},
  {label:'Canyon Lake school athletics',url:'https://clhs.comalisd.org/',kind:'school'},
  {label:'MaxPreps Canyon Lake results (editorial review link, not a data feed)',url:'https://www.maxpreps.com/tx/fischer/canyon-lake-hawks/football/schedule/',kind:'scores-reference'},
  {label:'MaxPreps District 13 standings (review link, not UIL certified)',url:'https://www.maxpreps.com/tx/fischer/canyon-lake-hawks/football/standings/',kind:'standings-reference'},
  {label:'La Grange ISD November 20 neutral-site playoff notice',url:'https://www.lgisd.net/article/3260935',kind:'host'},
];
export const SEARCH_QUERIES=[
  {topic:'score',query:'"Canyon Lake" "Calhoun" football 2026 final score'},
  {topic:'score',query:'"Canyon Lake Hawks" football result 2026'},
  {topic:'standings',query:'"District 13-4A" football standings Canyon Lake 2026'},
  {topic:'standings',query:'"Canyon Lake" "Davenport" district football standings 2026'},
];
export function isSafePublicUrl(value){
  if(typeof value!=='string'||value.length>1800)return false;
  try{
    const u=new URL(value);
    return u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&!u.hash
      &&!/(?:^localhost$|\.local$|^127\.|^10\.|^192\.168\.|^169\.254\.|^172\.(?:1[6-9]|2\d|3[01])\.)/i.test(u.hostname);
  }catch{return false;}
}
const ENTITIES={amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',ndash:'–',mdash:'—',rsquo:'’'};
export function decodeXml(value){
  return String(value||'').replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,(match,e)=>{
    if(e[0]==='#'){
      const hex=e[1].toLowerCase()==='x';
      const n=Number.parseInt(e.slice(hex?2:1),hex?16:10);
      return Number.isInteger(n)&&n>0&&n<=0x10ffff&&!(n>=0xd800&&n<=0xdfff)?String.fromCodePoint(n):'';
    }
    return ENTITIES[e.toLowerCase()]??match;
  });
}
function xmlValue(block,tag){
  const escaped=tag.replace(/[.*+?^$()|[\]{}\\]/g,'\\$&');
  const match=block.match(new RegExp('<'+escaped+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+escaped+'>','i'));
  return match?decodeXml(match[1].replace(/^<!\[CDATA\[|\]\]>$/g,'').replace(/<[^>]*>/g,'')).trim():'';
}
export function parseRss(xml,{topic,origin,now=new Date()}){
  if(!/^<\?xml|<rss\b|<feed\b/i.test(String(xml).trim().slice(0,80)))throw Error('Feed is not RSS/XML');
  const cutoff=now.getTime()-LOOKBACK_DAYS*86400000;
  const items=[];
  for(const match of String(xml).matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)){
    if(items.length>=30)break;
    const title=xmlValue(match[1],'title').replace(/\s+/g,' ').slice(0,180);
    const link=xmlValue(match[1],'link');
    const source=xmlValue(match[1],'source').replace(/\s+/g,' ').slice(0,80)||origin;
    const date=xmlValue(match[1],'pubDate');
    const stamp=Date.parse(date);
    if(!title||!isSafePublicUrl(link)||!Number.isFinite(stamp)||stamp<cutoff||stamp>now.getTime()+86400000)continue;
    const footballRelevant=/\b(?:football|hawks|playoff|calhoun|sandcrabs|district|standings)\b/i.test(title);
    const schoolRelevant=/canyon lake|comal canyon lake|calhoun|district 13.?4a|davenport/i.test(title);
    if(!footballRelevant||!schoolRelevant)continue;
    items.push({topic,title,link,source,publishedAt:new Date(stamp).toISOString(),origin});
  }
  return items;
}
export function scoreSnapshot(team,today){
  assert.equal(team.slug,'comal-canyon-lake');
  const games=team.season.games;
  const completed=games.filter(g=>Boolean(g.result));
  let wins=0,losses=0,districtWins=0,districtLosses=0,pointsFor=0,pointsAgainst=0;
  for(const game of completed){
    const m=/^([WL]) (\d{1,3})–(\d{1,3})$/.exec(game.result);
    if(!m)throw Error('Invalid documented result '+game.date);
    const a=Number(m[2]),b=Number(m[3]);
    if((m[1]==='W')!==(a>b)||a===b)throw Error('Result does not match points '+game.date);
    pointsFor+=a;pointsAgainst+=b;
    if(m[1]==='W'){wins++;if(game.district)districtWins++;}
    else {losses++;if(game.district)districtLosses++;}
  }
  const latest=completed.at(-1);
  const due=games.filter(g=>!g.result&&g.date<today).map(g=>({date:g.date,opponent:g.opponent}));
  const record=wins+'–'+losses, districtRecord=districtWins+'–'+districtLosses;
  return {season:'2026',verifiedAsOf:team.season.verifiedAt,
    record,districtRecord,pointsFor,pointsAgainst,completed:completed.length,
    latestFinal:latest?{date:latest.date,opponent:latest.opponent,result:latest.result}:null,
    due,recordMatchesAuthor:team.season.record.includes(record+' overall')&&team.season.record.includes(districtRecord+' district'),
    districtOfficialRank:null,rankNote:'District rank and complete standings require a separately checked authoritative standings source; do not infer official seeding from this team-only ledger.'};
}
function newsFeedUrl(provider,query){
  const url=provider==='google'
    ?new URL('https://news.google.com/rss/search'):new URL('https://www.bing.com/news/search');
  url.searchParams.set('q',query);
  if(provider==='google'){url.searchParams.set('hl','en-US');url.searchParams.set('gl','US');url.searchParams.set('ceid','US:en');}
  else url.searchParams.set('format','rss');
  return url.toString();
}
async function limitedText(url){
  const resp=await fetch(url,{redirect:'error',headers:{accept:'application/rss+xml, application/xml, text/xml'},
    signal:AbortSignal.timeout(12000)});
  if(!resp.ok)throw Error('HTTP '+resp.status);
  if(Number(resp.headers.get('content-length')||0)>BYTES_LIMIT)throw Error('Feed too large');
  const reader=resp.body.getReader(),chunks=[];let size=0;
  while(true){
    const {done,value}=await reader.read();if(done)break;
    size+=value.byteLength;
    if(size>BYTES_LIMIT){await reader.cancel();throw Error('Feed exceeded byte limit');}
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}
async function sourceHead(reference){
  try{
    assert.ok(isSafePublicUrl(reference.url));
    const response=await fetch(reference.url,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(9000)});
    return {...reference,status:response.status,available:response.ok,redirect:response.headers.get('location')?.slice(0,300)||null};
  }catch(e){return {...reference,status:null,available:false,error:String(e?.message||e).slice(0,180)};}
}
export function compileResearch({team,today,headResults,feeds,checkedAt=new Date().toISOString()}){
  const season=scoreSnapshot(team,today);
  const deduped=new Map();
  for(const feed of feeds){
    for(const item of feed.items||[]){
      const key=item.title.toLowerCase().replace(/\s+/g,' ');
      if(!deduped.has(key))deduped.set(key,item);
    }
  }
  const articles=[...deduped.values()].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)).slice(0,NEWS_LIMIT);
  const searchFailures=feeds.filter(x=>x.error).map(x=>({topic:x.topic,provider:x.provider,error:x.error}));
  return {schemaVersion:1,checkedAt,today,teamSlug:'comal-canyon-lake',
    discoveryOnly:true,publishingAllowedFromResearch:false,
    researchMethod:'Recent RSS headline/link/date discovery and HEAD-only source availability. Not a licensed score feed; headlines are leads, not final-score evidence.',
    season,reviewPages:headResults,articles,searchFailures,
    feedAttempts:feeds.map(x=>({provider:x.provider,topic:x.topic,count:x.items?.length||0,error:x.error||null})),
    needsEditorialReview:season.due.length>0||!season.recordMatchesAuthor||searchFailures.length===feeds.length,
    findings:{scores:articles.filter(x=>x.topic==='score').length,
      standings:articles.filter(x=>x.topic==='standings').length},
    nextAction:season.due.length
      ?'Verify overdue finals against independent full sources, reconcile records and postseason status, and publish only via protected PR with authorized data.'
      :'Review newly discovered reports and official standing links; no score change is automatically inferred.',
    safeguards:'No publisher article bodies, automated scraping of game-score sites, alleged official rank, or unsourced fixture are imported.'};
}
function escapeMd(s){return String(s||'').replace(/[\r\n\t]+/g,' ').replace(/[\\<>|[\]\u0060]/g,' ').slice(0,260);}
export function markdownReport(r){
  const lines=['# Canyon Lake weekly scores and district standings research','',
    '**Checked:** '+r.checkedAt+' UTC · **Texas date:** '+r.today,
    '**Current authored record:** '+r.season.record+' overall, '+r.season.districtRecord+' district.',
    '**Points:** '+r.season.pointsFor+' for / '+r.season.pointsAgainst+' against · '+r.season.completed+' completed games.',
    '**Latest recorded final:** '+(r.season.latestFinal?escapeMd(r.season.latestFinal.date+' '+r.season.latestFinal.opponent+' '+r.season.latestFinal.result):'none'),
    '**Unconfirmed past fixtures:** '+(r.season.due.length?r.season.due.map(x=>escapeMd(x.date+' '+x.opponent)).join('; '):'none'),
    '**Official district standing or tiebreak rank:** NOT VERIFIED. Only the team’s source-attributed district W–L is calculated.','',
    '## Source references for independent review',''];
  for(const item of r.reviewPages)lines.push('- '+escapeMd(item.label)+' — '+item.url+' (HEAD '+(item.status??'unavailable')+')');
  lines.push('','## New score-related reporting leads');
  const news=r.articles.filter(x=>x.topic==='score');
  if(!news.length)lines.push('No relevant recent RSS headlines available; this is not evidence that no game occurred.');
  for(const a of news)lines.push('- '+escapeMd(a.publishedAt.slice(0,10)+' · '+a.source+' · '+a.title)+' — '+a.link);
  lines.push('','## District 13 standings reporting leads');
  const stands=r.articles.filter(x=>x.topic==='standings');
  if(!stands.length)lines.push('No recent standings headlines found; check linked source pages and the official UIL alignment.');
  for(const a of stands)lines.push('- '+escapeMd(a.publishedAt.slice(0,10)+' · '+a.source+' · '+a.title)+' — '+a.link);
  lines.push('','## Source discovery diagnostics');
  for(const f of r.feedAttempts)lines.push('- '+escapeMd(f.provider)+' / '+escapeMd(f.topic)+': '+f.count+' candidates'+(f.error?' (unavailable: '+escapeMd(f.error)+')':''));
  lines.push('','## Editorial and publication boundary',
    'RSS headlines and the site’s authored game ledger are **not independent proof of an unreported final or complete district standings**.',
    'Verify primary school/UIL and independent reports, compare conflicting records and tie-breakers, and retain dated evidence.',
    'Automatic score PRs still require TWO independent licensed JSON feed hosts; the existing protected score-update finisher performs exact-SHA validation and merge.',
    'This research job creates a weekly report and review issue. It does not secretly rewrite a score or claim a certified district ranking.',
    '','**Next action:** '+r.nextAction,'');
  return lines.join('\n');
}
export async function research({team,today,clock=new Date(),fetchFeed=limitedText,head=sourceHead}){
  const jobs=SEARCH_QUERIES.flatMap(q=>['google','bing'].map(provider=>({provider,topic:q.topic,url:newsFeedUrl(provider,q.query)})));
  const feeds=[];
  for(const job of jobs){
    try{
      const xml=await fetchFeed(job.url);
      feeds.push({...job,items:parseRss(xml,{topic:job.topic,origin:job.provider,now:clock})});
    }catch(error){feeds.push({...job,error:String(error?.message||error).slice(0,180),items:[]});}
  }
  const heads=await Promise.all(REVIEW_PAGES.map(head));
  return compileResearch({team,today,headResults:heads,feeds,checkedAt:clock.toISOString()});
}
async function main(){
  const mode=process.argv[2];
  assert.ok(['--validate','--research'].includes(mode),'Usage: --validate or --research');
  const team=readEditorial(readFileSync(SOURCE,'utf8'));
  assert.equal(SEARCH_QUERIES.length,4);
  assert.equal(REVIEW_PAGES.length,5);
  for(const item of REVIEW_PAGES)assert.ok(isSafePublicUrl(item.url));
  const today=texasToday();
  scoreSnapshot(team,today);
  if(mode==='--validate'){console.log('PASS: Canyon Lake weekly RSS discovery, current team score arithmetic and official-source inventory');return;}
  const report=await research({team,today});
  mkdirSync(OUT,{recursive:true});
  writeFileSync(OUT+'/research.json',JSON.stringify(report,null,2)+'\n');
  writeFileSync(OUT+'/research.md',markdownReport(report));
  console.log('Canyon Lake weekly score/standings research: '+JSON.stringify({
    checkedAt:report.checkedAt,headlines:report.articles.length,searchFailures:report.searchFailures.length,
    scoreLeads:report.findings.scores,standingsLeads:report.findings.standings,
    unverifiedGames:report.season.due.length,districtRecord:report.season.districtRecord}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
