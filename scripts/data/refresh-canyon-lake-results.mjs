#!/usr/bin/env node
/**
 * Canyon Lake-only scheduled score refresher.
 *
 * Only two independently authorized, machine-readable JSON feed endpoints may
 * publish a final. Public school pages, MaxPreps, UIL and search snippets are
 * NOT feed licenses and are never scraped by this script. Missing feeds, an
 * unlisted opponent, a score conflict or a still-unknown game are review items,
 * not permission to manufacture a result.
 */
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export const EDITORIAL_PATH='src/data/high-school-football/program-editorial-comal-canyon-lake.ts';
export const REPORT_PATH=process.env.CANYON_LAKE_REFRESH_REPORT || 'artifacts/canyon-lake-refresh/report.json';
export const TEAM='comal-canyon-lake';
const FIXTURE_PATTERN=/^2026-\d\d-\d\d$/;
const SOURCE_PATTERN=/(const CANYON_LAKE: FootballProgramEditorial = )([\s\S]*?)(;\s*export function getCanyonLakeFootballEditorial)/;
export const texasToday=(clock=new Date())=>{
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(clock);
  const get=(type)=>parts.find(x=>x.type===type)?.value;
  return [get('year'),get('month'),get('day')].join('-');
};
export function readEditorial(source){
  const m=source.match(SOURCE_PATTERN);
  if(!m)throw Error('Cannot find the uniquely authored Canyon Lake editorial object');
  const team=JSON.parse(m[2]);
  assert.equal(team.slug,TEAM);
  assert.ok(Array.isArray(team.season?.games)&&team.season.games.length>=10&&team.season.games.length<=16);
  return team;
}
function isPublicHttps(s){
  if(typeof s!=='string'||s.length>500)return false;
  try{
    const u=new URL(s);
    return u.protocol==='https:' && !u.username&&!u.password&&!u.port&&!u.hash
      && !/^(?:localhost|127\.|10\.|0\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.|.*\.local$)/i.test(u.hostname);
  }catch{return false;}
}
const safeScore=(x)=>Number.isInteger(x)&&x>=0&&x<=200;
const validDate=(x)=>typeof x==='string'&&FIXTURE_PATTERN.test(x)&&Number.isFinite(Date.parse(x+'T00:00:00Z'))
  &&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x;
export function validatedFeed(data,hostname,today){
  assert.equal(data?.season,'2026');
  assert.equal(data?.teamSlug,TEAM);
  assert.ok(Array.isArray(data?.games)&&data.games.length<=16,'Unbounded or missing provider games');
  const byDate=new Map();
  for(const row of data.games){
    assert.ok(validDate(row?.date)&&row.date<today,'A game must be before today in Texas, never a same-day anticipated final');
    assert.equal(row.status,'final');
    assert.ok(typeof row.opponent==='string'&&row.opponent.length>=3&&row.opponent.length<=110);
    assert.ok(safeScore(row.hawksScore)&&safeScore(row.opponentScore)&&row.hawksScore!==row.opponentScore);
    assert.ok(isPublicHttps(row.sourceUrl)&&new URL(row.sourceUrl).hostname===hostname,
      'Source URL must belong to its configured authorized provider host');
    assert.ok(!byDate.has(row.date),'Duplicate final date from one provider');
    byDate.set(row.date,row);
  }
  return byDate;
}
function scores(games){
  let wins=0,losses=0,districtWins=0,districtLosses=0,forPoints=0,againstPoints=0;
  for(const game of games.filter(x=>x.result)){
    const m=/^([WL]) (\d{1,3})–(\d{1,3})$/.exec(game.result);
    if(!m)throw Error('Invalid authored result on '+game.date);
    const a=Number(m[2]),b=Number(m[3]);
    if(!safeScore(a)||!safeScore(b)||a===b||(a>b)!==(m[1]==='W'))throw Error('Inconsistent W/L for '+game.date);
    if(m[1]==='W'){wins++;if(game.district)districtWins++;}
    else {losses++;if(game.district)districtLosses++;}
    forPoints+=a;againstPoints+=b;
  }
  return {wins,losses,districtWins,districtLosses,forPoints,againstPoints};
}
export function reconcile({editorial,primary,secondary,primaryHost,secondaryHost,today}){
  if(!primaryHost||!secondaryHost||primaryHost===secondaryHost)
    throw Error('Require two independently hosted licensed score providers');
  const a=validatedFeed(primary,primaryHost,today),b=validatedFeed(secondary,secondaryHost,today);
  const games=editorial.season.games;
  const known=new Map(games.map(g=>[g.date,g]));
  if(known.size!==games.length)throw Error('Duplicate authored fixture dates');
  for(const [name,rows] of [['primary',a],['secondary',b]])for(const [date,row] of rows){
    const fixture=known.get(date);
    if(!fixture||fixture.opponent!==row.opponent)
      throw Error(name+' provider submitted unknown date or opponent '+date);
  }
  const missing=[],added=[];
  // Validate every historical score against any reported provider entry.
  for(const game of games){
    const x=a.get(game.date),y=b.get(game.date);
    if(game.result){
      const old=/^[WL] (\d{1,3})–(\d{1,3})$/.exec(game.result);
      if(!old)throw Error('Malformed historical final');
      for(const row of [x,y].filter(Boolean))
        if(row.hawksScore!==Number(old[2])||row.opponentScore!==Number(old[3]))
          throw Error('Authorized feed contradicts a locked Canyon Lake score: '+game.date);
      continue;
    }
    if(game.date>=today)continue;
    if(!x||!y){missing.push(game.date+' / '+game.opponent+': two independent finals missing');continue;}
    if(x.hawksScore!==y.hawksScore||x.opponentScore!==y.opponentScore)
      throw Error('Independent providers disagree on '+game.date);
    added.push({date:game.date,opponent:game.opponent,h: x.hawksScore,a:x.opponentScore,
      primarySourceUrl:x.sourceUrl,secondarySourceUrl:y.sourceUrl});
  }
  // One newly confirmed fixture at a time. Another playoff opponent must
  // first be authorized as an editorial source-backed fixture.
  if(added.length>1)throw Error('Multiple new results require editorial review');
  return {added,missing,old:scores(games)};
}
export function applyUpdate(editorial,update,today){
  const team=structuredClone(editorial),game=team.season.games.find(g=>g.date===update.date);
  assert.ok(game&&!game.result,'Cannot overwrite a previously published final');
  game.result=(update.h>update.a?'W ':'L ')+update.h+'–'+update.a;
  const s=scores(team.season.games);
  const result=game.result, win=update.h>update.a;
  const dateLabel=new Date(update.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
  const asOf=new Date(today+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',timeZone:'UTC'});
  const record=s.wins+'–'+s.losses;
  const district=s.districtWins+'–'+s.districtLosses;
  team.season.record=record+' overall · '+district+' district (through '+dateLabel+'; '+team.season.games.filter(g=>g.result).length+' confirmed finals)';
  team.season.recordLabel='2026 completed varsity results through '+dateLabel+' · checked '+asOf;
  team.season.verifiedAt=today;
  team.season.latestResultSourceUrl=update.primarySourceUrl;
  team.season.sourceLabel='First ten finals from MaxPreps November 19 historical game log; '+dateLabel+' '+game.opponent+' result confirmed by two independent authorized JSON feeds ('+update.primarySourceUrl+' and '+update.secondarySourceUrl+'). Checked '+asOf+'; this is not a live score feed.';
  team.intro="Canyon Lake High School's Hawks ("+record+" overall, "+district+" in District 13) "+
    (win?'defeated':'lost to')+' '+game.opponent+' '+update.h+'–'+update.a+' in the '+dateLabel+
    ' 2026 UIL area round at neutral-site Leopard Stadium in La Grange. This is a dated, independently corroborated final; later postseason fixtures require separate source verification.';
  team.seo.description='Canyon Lake Hawks football: 2026 season '+record+', verified area-round final against '+game.opponent+', District 13 record '+district+', analysis and school sources.';
  team.overview[1]='Canyon Lake finished the reported regular season 7–2 and 6–1 against district opponents. After beating Pleasanton 49–28 in the November 13 bi-district round, the Hawks '+(win?'defeated':'lost to')+
    ' Port Lavaca Calhoun '+update.h+'–'+update.a+' on '+dateLabel+'. Their reported cumulative record after '+team.season.games.filter(g=>g.result).length+' games is '+record+'.';
  team.overview[4]='Across the '+team.season.games.filter(g=>g.result).length+' reported 2026 finals through '+dateLabel+', Canyon Lake totaled '+s.forPoints+' points for and '+s.againstPoints+
    ' against, or '+(s.forPoints/(s.wins+s.losses)).toFixed(1)+' scored and '+(s.againstPoints/(s.wins+s.losses)).toFixed(1)+
    ' allowed per game ('+(s.forPoints-s.againstPoints>=0?'+':'')+(s.forPoints-s.againstPoints)+'). These are TexasDefined calculations from the dated, source-attributed game log; an unconfirmed later game is never counted as a final.';
  team.faq[0].answer='At the '+asOf+' source review, the Hawks were '+record+' overall and '+district+' in District 13 after the independently confirmed '+dateLabel+' area-round game. Dated results are not a live feed.';
  const playoffFaq=team.faq.find(f=>f.question.includes('next playoff game'));
  if(playoffFaq){playoffFaq.question='What happened in Canyon Lake’s November 20 playoff game?';playoffFaq.answer='Canyon Lake '+(win?'beat':'lost to')+' Port Lavaca Calhoun '+update.h+'–'+update.a+
    ' on '+dateLabel+' at neutral-site Leopard Stadium in La Grange. Both authorized result providers agreed on the exact score. A next matchup is not shown until verified.';}
  const siteFaq=team.faq.find(f=>f.question.includes('Hawk Stadium'));
  if(siteFaq)siteFaq.answer=siteFaq.answer.replace('the November 20 matchup is listed in La Grange','the November 20 area-round game was played in La Grange');
  const milestone=team.milestones.find(m=>m.date.startsWith('November 20, 2026'));
  if(!milestone)throw Error('Missing source-backed November 20 milestone');
  milestone.date=dateLabel;
  milestone.title='Area round: Canyon Lake '+update.h+', Port Lavaca Calhoun '+update.a;
  milestone.body='Canyon Lake '+(win?'defeated':'lost to')+' Port Lavaca Calhoun '+update.h+'–'+update.a+' at neutral-site Leopard Stadium in La Grange on '+dateLabel+
    '. Two separately hosted authorized sources agreed on the final. This verified result does not itself establish the next opponent, venue or tickets.';
  milestone.sourceUrl=update.primarySourceUrl;
  milestone.sourceLabel='Independently agreed authorized final; corroborating second report: '+update.secondarySourceUrl;
  return team;
}
async function fetchFeed(url,token){
  if(!isPublicHttps(url))throw Error('Configured authorized feed URL must be a safe public HTTPS address');
  const headers={accept:'application/json'};
  if(token)headers.authorization='Bearer '+token;
  const r=await fetch(url,{headers,redirect:'error',signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw Error('Authorized feed returned HTTP '+r.status);
  if(Number(r.headers.get('content-length')||0)>200000)throw Error('Authorized feed exceeds bounded response');
  const body=await r.text();
  if(body.length>200000)throw Error('Authorized feed exceeds bounded response');
  return JSON.parse(body);
}
function emit(report){
  mkdirSync(dirname(REPORT_PATH),{recursive:true});
  writeFileSync(REPORT_PATH,JSON.stringify(report,null,2)+'\n');
  if(process.env.GITHUB_OUTPUT)
    for(const [key,value] of [['changed',Boolean(report.changed)],['review_needed',Boolean(report.reviewNeeded)]])
      appendFileSync(process.env.GITHUB_OUTPUT,key+'='+value+'\n');
  console.log('Canyon Lake scheduled refresh: '+JSON.stringify(report));
}
async function main(){
  const mode=process.argv[2],today=texasToday();
  if(!['--validate','--refresh'].includes(mode))throw Error('Use --validate or --refresh');
  const source=readFileSync(EDITORIAL_PATH,'utf8'),team=readEditorial(source);
  const games=team.season.games;
  assert.ok(games.every((g,i)=>validDate(g.date)&&(i===0||games[i-1].date<g.date)));
  const baseline=scores(games);
  assert.equal(baseline.wins+baseline.losses,games.filter(g=>g.result).length);
  if(mode==='--validate'){console.log('PASS Canyon Lake scheduled refresh shape, dated fixture and baseline arithmetic');return;}
  const due=games.filter(g=>!g.result&&g.date<today).map(g=>g.date+' '+g.opponent);
  const primaryUrl=process.env.CANYON_LAKE_SCORE_PRIMARY_URL,secondaryUrl=process.env.CANYON_LAKE_SCORE_SECONDARY_URL;
  const report={checkedAt:today,teamSlug:TEAM,latestVerifiedAt:team.season.verifiedAt,record:team.season.record,
    due,changed:false,reviewNeeded:due.length>0,blocker:null,independentFeedsConfigured:false,policy:'Only independent licensed JSON feeds can auto-publish; no scraping public sports pages.'};
  if(!primaryUrl||!secondaryUrl){
    report.blocker='Two independently licensed score JSON feeds are not configured; the scheduled job flags a due game for editorial verification and never invents a result.';
    emit(report);return;
  }
  if(!isPublicHttps(primaryUrl)||!isPublicHttps(secondaryUrl)||new URL(primaryUrl).hostname===new URL(secondaryUrl).hostname)
    throw Error('Independent authorized public HTTPS providers on separate hostnames are required');
  report.independentFeedsConfigured=true;
  const [primary,secondary]=await Promise.all([
    fetchFeed(primaryUrl,process.env.CANYON_LAKE_SCORE_PRIMARY_TOKEN),
    fetchFeed(secondaryUrl,process.env.CANYON_LAKE_SCORE_SECONDARY_TOKEN)
  ]);
  const outcome=reconcile({editorial:team,primary,secondary,
    primaryHost:new URL(primaryUrl).hostname,secondaryHost:new URL(secondaryUrl).hostname,today});
  report.reviewNeeded=outcome.missing.length>0;
  report.missing=outcome.missing;
  if(outcome.added.length){
    const updated=applyUpdate(team,outcome.added[0],today);
    const rewritten=source.replace(SOURCE_PATTERN,(match,prefix,object,suffix)=>prefix+JSON.stringify(updated,null,2)+suffix);
    if(rewritten===source)throw Error('No source changes despite a confirmed new game');
    writeFileSync(EDITORIAL_PATH,rewritten);
    report.changed=true;report.game=outcome.added[0];report.record=updated.season.record;
  }
  emit(report);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
