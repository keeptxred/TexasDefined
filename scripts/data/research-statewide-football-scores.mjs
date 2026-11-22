#!/usr/bin/env node
/* Shared day-after-game public research for every eligible TexasDefined 2026
 * football score/standing page. News RSS metadata is a lookup lead, not proof
 * of a final. Never scrape score sites, make a result edit, or publish a PR. */
import {writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {inventory,OUT} from './inventory-statewide-football-scores.mjs';
const REQUEST_TIMEOUT=8500, MAX_RESPONSE=350000, MAX_QUERIES=800, WORKERS=8;
export function safeLink(raw){
  try{const u=new URL(raw);return u.protocol==='https:'&&!u.username&&!u.password&&!u.port
    &&!/^(?:localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.|.*\.local$)/i.test(u.hostname);}
  catch{return false;}
}
export function decode(raw){
  const named={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',ndash:'–',mdash:'—',rsquo:'’'};
  return String(raw||'').replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,(all,v)=>{
    if(v[0]==='#'){const hex=v[1].toLowerCase()==='x',n=Number.parseInt(v.slice(hex?2:1),hex?16:10);
      return Number.isInteger(n)&&n>0&&n<=0x10ffff?String.fromCodePoint(n):'';}
    return named[v.toLowerCase()]||all;
  });
}
function tagText(item,k){
  const pat=new RegExp('<'+k+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+k+'>','i');
  const m=pat.exec(item);return m?decode(m[1].replace(/^<!\[CDATA\[|\]\]>$/g,'').replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim():'';
}
export function parseNews(xml,fixture,provider,today){
  if(!/<rss\b|<feed\b/i.test(String(xml).slice(0,300)))throw Error('Not RSS');
  const articles=[],match=/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi;
  for(const m of String(xml).matchAll(match)){
    if(articles.length>=12)break;
    const title=tagText(m[1],'title').slice(0,220),link=tagText(m[1],'link');
    const rawDate=tagText(m[1],'pubDate'),stamp=Date.parse(rawDate);
    if(!title||!safeLink(link)||!Number.isFinite(stamp))continue;
    const date=new Date(stamp).toISOString().slice(0,10);
    // Keep only reports posted on or after the scheduled game. An old article
    // does not demonstrate that the later game was played or give its final.
    if(date<fixture.date||date>today)continue;
    const terms=(fixture.away+' '+fixture.home).toLowerCase().split(/\W+/).filter(x=>x.length>=4);
    if(!terms.some(term=>title.toLowerCase().includes(term)))continue;
    articles.push({title,url:link,source:tagText(m[1],'source').slice(0,90)||provider,
      publishedAt:new Date(stamp).toISOString(),provider,
      verification:'public-headline-lead-only'});
  }
  return articles;
}
function rssUrl(provider,fixture){
  const query='"'+fixture.away+'" "'+fixture.home+'" Texas high school football final score '+fixture.date;
  const u=new URL(provider==='google'?'https://news.google.com/rss/search':'https://www.bing.com/news/search');
  u.searchParams.set('q',query);
  if(provider==='google'){u.searchParams.set('hl','en-US');u.searchParams.set('gl','US');u.searchParams.set('ceid','US:en');}
  else u.searchParams.set('format','rss');
  return u.toString();
}
async function download(url){
  const r=await fetch(url,{redirect:'error',headers:{accept:'application/rss+xml, application/xml, text/xml'},
    signal:AbortSignal.timeout(REQUEST_TIMEOUT)});
  if(!r.ok)throw Error('HTTP '+r.status);
  if(Number(r.headers.get('content-length')||0)>MAX_RESPONSE)throw Error('RSS too large');
  const reader=r.body.getReader(),chunks=[];let bytes=0;
  for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;
    if(bytes>MAX_RESPONSE){await reader.cancel();throw Error('RSS exceeds safe size');}
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}
export function orderedFixtures(rows){
  // Newest unconfirmed finals first, then older dated scores awaiting correction.
  return [...rows].sort((a,b)=>b.date.localeCompare(a.date)||a.away.localeCompare(b.away));
}
export function publicProviders(fixture,today){
  const age=Math.max(0,Math.floor((Date.parse(today)-Date.parse(fixture.date))/86400000));
  // Recent games get two metadata discovery searches; dated backlog gets one
  // provider per run (alternating daily), without starving any page.
  if(age<=10)return ['google','bing'];
  const day=Math.floor(Date.parse(today)/86400000);
  return [day%2===0?'google':'bing'];
}
export function chooseSearches(rows,{today,max=MAX_QUERIES}={}){
  const sorted=orderedFixtures(rows);
  // Page coverage takes priority: every eligible overdue fixture receives at
  // least one lookup, not a constant first-N subset that excludes old scores.
  const newest=sorted.slice(0,60),older=sorted.slice(60);
  const day=Math.floor(Date.parse(today)/86400000),offset=older.length?day%older.length:0;
  const rotated=[...newest,...older.slice(offset),...older.slice(0,offset)];
  let used=0;const selected=[],deferred=[];
  for(const f of rotated){
    const cost=publicProviders(f,today).length;
    if(used+cost<=max){selected.push(f);used+=cost;}else deferred.push(f);
  }
  return {selected,deferred,queryBudgetUsed:used};
}
export const STANDINGS_SOURCE_URLS={
  '6a-district-5':'https://www.maxpreps.com/tx/football/26-27/district/6a-region-i-district-5/?leagueid=20c93622-4d8b-48f7-8dc8-a3983405b170',
  '4a-division-i-district-11':'https://www.maxpreps.com/tx/football/26-27/district/4a-1-region-iii-district-11/?leagueid=e544a32d-42ab-43c2-befa-ee65e25baf62',
  '6a-district-16':'https://www.maxpreps.com/tx/football/26-27/district/6a-region-ii-district-16/?leagueid=30542350-2954-4f15-a3f8-1944386a4e88',
  '6a-district-21':'https://www.maxpreps.com/tx/football/26-27/district/6a-region-iii-district-21/?leagueid=3daf50ec-b7b2-4bd1-a010-7588e5cc9310',
  '6a-district-22':'https://www.texastng.com/districts/d22-6a'
};
export function additionalResearchTargets(inventory){
  const extras=[];
  for(const p of inventory.pages){
    if(p.kind==='district'){
      const slug=p.page.split('/').at(-1);
      if(!STANDINGS_SOURCE_URLS[slug])continue;
      extras.push({kind:'standings',page:p.page,
        label:slug.replaceAll('-',' '),sourceUrl:STANDINGS_SOURCE_URLS[slug],
        query:slug.replaceAll('-',' ')+' Texas high school football 2026 final district standings',
        providers:['google','bing']});
    } else if(p.kind==='team'&&!p.overdue.length&&p.reason==='dated-score-review'){
      const school=p.slug.replaceAll('-',' ');
      extras.push({kind:'team-record',page:p.page,label:school,sourceUrl:p.sourceUrl,
        query:'"'+school+'" 2026 Texas high school football final record scores November',
        providers:['google']});
    }
  }
  // A finished known schedule is not permanent exemption from research.
  // Every score-bearing team remains on the next scheduled run so newly
  // reported games (including postseason pairings) can be discovered.
  const seen=new Set(extras.map(p=>p.page));
  const year=String(inventory.today||'2026').slice(0,4);
  for(const p of inventory.coverage?.enrollment||[]){
    if(seen.has(p.page))continue;
    if(p.kind==='team'){
      const school=p.slug.replaceAll('-',' ');
      extras.push({kind:'team-record',page:p.page,label:school,sourceUrl:p.sourceUrl,
        query:'"'+school+'" Texas high school football '+year+' final score results playoff schedule',providers:['google']});
    }else if(p.kind==='district'){
      extras.push({kind:'standings',page:p.page,label:p.slug.replaceAll('-',' '),
        sourceUrl:STANDINGS_SOURCE_URLS[p.slug]||p.sourceUrl||'https://www.uiltexas.org/maxpreps/',
        query:p.slug.replaceAll('-',' ')+' Texas high school football '+year+' district final standings',providers:['google']});
    }else if(p.kind==='bracket'||p.kind==='hub'){
      extras.push({kind:'standings',page:p.page,label:'Texas UIL football '+(p.kind==='bracket'?'playoff brackets':'scoreboard'),
        sourceUrl:p.sourceUrl,query:'Texas UIL high school football '+year+' '+(p.kind==='bracket'?'playoff bracket next round final results':'final score results'),providers:['google']});
    }else if(p.kind==='matchup'){
      // The dated final stays enrolled via the snapshot, team sources and
      // independent matchup/index research. A known missing final has its
      // own exact date/opponent query in the ordinary inventory.
      continue;
    }
    seen.add(p.page);
  }
  return extras;
}
function extraRssUrl(provider,query){
  const u=new URL(provider==='google'?'https://news.google.com/rss/search':'https://www.bing.com/news/search');
  u.searchParams.set('q',query);
  if(provider==='google'){u.searchParams.set('hl','en-US');u.searchParams.set('gl','US');u.searchParams.set('ceid','US:en');}
  else u.searchParams.set('format','rss');
  return u.toString();
}
export function parseExtraNews(xml,target,provider,today){
  if(!/<rss\b|<feed\b/i.test(String(xml).slice(0,300)))throw Error('Not RSS');
  const articles=[],maxLookback=45*86400000;
  const now=Date.parse(today+'T23:59:59Z');
  const words=target.label.toLowerCase().split(/\W+/).filter(x=>x.length>=3);
  for(const m of String(xml).matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)){
    if(articles.length>=10)break;
    const title=tagText(m[1],'title').slice(0,220),link=tagText(m[1],'link');
    const published=Date.parse(tagText(m[1],'pubDate'));
    if(!title||!safeLink(link)||!Number.isFinite(published)||published<now-maxLookback||published>now)continue;
    const lower=title.toLowerCase();
    const valid=target.kind==='standings'
      ?lower.includes('district')&&lower.includes('football')
      :words.filter(w=>lower.includes(w)).length>=Math.min(2,words.length);
    if(!valid)continue;
    articles.push({title,url:link,source:tagText(m[1],'source').slice(0,90)||provider,
      publishedAt:new Date(published).toISOString(),provider,verification:'unverified-public-report-lead'});
  }
  return articles;
}
export async function conductResearch(state,{getText=download,max=MAX_QUERIES}={}){
  const {selected,deferred}=chooseSearches(state.fixtures,{today:state.today,max});
  const targets=additionalResearchTargets(state);
  const tasks=selected.flatMap(f=>publicProviders(f,state.today).map(provider=>({f,provider,url:rssUrl(provider,f)})));
  const extraTasks=targets.flatMap(target=>target.providers.map(provider=>({target,provider,url:extraRssUrl(provider,target.query)})));
  const results=tasks.map(t=>({...t,articles:[],error:null}));let at=0;
  const worker=async()=>{
    for(;;){
      const i=at++;if(i>=tasks.length)return;
      const t=tasks[i];
      try{results[i].articles=parseNews(await getText(t.url),t.f,t.provider,state.today);}
      catch(e){results[i].error=String(e?.message||e).slice(0,180);}
    }
  };
  await Promise.all(Array.from({length:Math.min(WORKERS,tasks.length)},worker));
  const extraResults=extraTasks.map(t=>({...t,articles:[],error:null}));let extraAt=0;
  const extraWorker=async()=>{
    for(;;){
      const i=extraAt++;if(i>=extraTasks.length)return;
      const t=extraTasks[i];
      try{extraResults[i].articles=parseExtraNews(await getText(t.url),t.target,t.provider,state.today);}
      catch(e){extraResults[i].error=String(e?.message||e).slice(0,180);}
    }
  };
  await Promise.all(Array.from({length:Math.min(WORKERS,extraTasks.length)},extraWorker));
  const additionalResearch=targets.map(target=>({
    target:{kind:target.kind,page:target.page,label:target.label,sourceUrl:target.sourceUrl},
    articles:extraResults.filter(x=>x.target.page===target.page).flatMap(x=>x.articles)
      .filter((item,i,all)=>all.findIndex(a=>a.title.toLowerCase()===item.title.toLowerCase())===i).slice(0,10),
    failures:extraResults.filter(x=>x.target.page===target.page&&x.error).map(x=>({provider:x.provider,error:x.error}))
  }));
  const byGame=new Map();
  for(const x of results){
    const key=x.f.date+'|'+x.f.away+'|'+x.f.home;
    if(!byGame.has(key))byGame.set(key,{fixture:x.f,articles:[],failures:[]});
    const g=byGame.get(key);
    if(x.error)g.failures.push({provider:x.provider,error:x.error});
    else for(const a of x.articles)if(!g.articles.some(old=>old.title.toLowerCase()===a.title.toLowerCase()))
      g.articles.push(a);
  }
  const games=[...byGame.values()].map(g=>({...g,articles:g.articles.slice(0,12)}));
  const errors=results.filter(r=>r.error).length,leads=games.filter(g=>g.articles.length).length;
  return {schemaVersion:1,checkedAt:new Date().toISOString(),today:state.today,inventory:state,
    researchedGames:games,additionalResearch,
    queryAttempts:tasks.length+extraTasks.length,
    queryFailures:errors+extraResults.filter(x=>x.error).length,
    gamesWithPublicReportingLeads:leads,deferredFixtures:deferred,
    publication:false,policy:'Public RSS metadata and linked publisher reports need editorial verification before any site score or W-L update. No live scores, paid feeds, scraped score tables or unattended publication.'};
}
function flat(s){return String(s||'').replace(/[\r\n|<>]/g,' ').slice(0,200);}
export function reportMarkdown(r){
  const s=r.inventory.summary;
  const lines=['# TexasDefined statewide football day-after-game research','',
    '**Texas research date:** '+r.today+' · **Last check:** '+r.checkedAt,
    '**Permanently enrolled score/standings/matchup/bracket pages:** '+(r.inventory.coverage?.summary.enrolledPages??s.affectedPages),
    '**Canonical football routes scanned for enrollment:** '+(r.inventory.coverage?.summary.scannedPages??s.affectedPages),
    '**Affected pages with published score, dated record or standings:** '+s.affectedPages,
    '**Overdue-fixture pages:** '+s.overduePages+' · **Dated score/standings review:** '+s.datedScoreReviewPages,
    '**Distinct past fixtures awaiting final-score verification:** '+s.unverifiedFixtures,
    '**Public research queries attempted (games + standings + dated records):** '+r.queryAttempts+' · **Failures:** '+r.queryFailures,
    '**Fixtures with RSS reporting leads:** '+r.gamesWithPublicReportingLeads+' · **Deferred by budget:** '+r.deferredFixtures.length,'',
    '## Pages currently needing specific overdue or dated-record review',''];
  for(const p of r.inventory.pages){
    lines.push('- ['+flat(p.page.replace(SITE_PREFIX,''))+']('+p.page+') — '+p.reason+
      ' · '+p.overdue.length+' fixture(s) · source: '+flat(p.sourceFile));
  }
  lines.push('','## Permanent scheduled enrollment (including current records)','');
  for(const p of r.inventory.coverage?.enrollment||[])lines.push('- '+p.page+' · '+flat(p.sources.join('; ')));
  lines.push('','## Current standings and dated-record research (not official UIL seeding)','');
  for(const row of r.additionalResearch){
    lines.push('### '+flat(row.target.label)+' — '+row.target.kind);
    lines.push('Affected: '+row.target.page);
    if(row.target.sourceUrl&&safeLink(row.target.sourceUrl))lines.push('Published results/standings reference: '+row.target.sourceUrl);
    if(!row.articles.length)lines.push('No relevant recent RSS headline; inspect the cited current source directly before updating.');
    for(const a of row.articles)lines.push('- '+flat(a.publishedAt.slice(0,10)+' · '+a.source+' · '+a.title)+' — '+a.url+' (unverified source lead)');
    if(row.failures.length)lines.push('RSS errors: '+row.failures.map(e=>flat(e.provider+': '+e.error)).join('; '));
    lines.push('');
  }
  lines.push('','## Public reporting leads for overdue fixtures','');
  for(const g of r.researchedGames){
    lines.push('### '+flat(g.fixture.date+' '+g.fixture.away+' at '+g.fixture.home));
    lines.push('Affected: '+g.fixture.pages.map(p=>'['+flat(p.replace(SITE_PREFIX,''))+']('+p+')').join(', '));
    if(!g.articles.length)lines.push('No usable recent headline lead; score remains unverified.');
    for(const a of g.articles)lines.push('- '+flat(a.publishedAt.slice(0,10)+' · '+a.source+' · '+a.title)+' — '+a.url+' (headline lead only)');
    if(g.failures.length)lines.push('RSS lookup errors: '+g.failures.map(e=>flat(e.provider+': '+e.error)).join('; '));
    lines.push('');
  }
  if(r.deferredFixtures.length){
    lines.push('## Budget-deferred games (remain enrolled for next scheduled run)','');
    for(const g of r.deferredFixtures)lines.push('- '+flat(g.date+' '+g.away+' vs '+g.home));
  }
  lines.push('','## Editorial safeguard',
    'This scheduled source research never edits football pages or publishes guessed scores. Review a full dated publisher/school report and independent corroboration, then make a normal protected editorial PR. A page without published scores, W-L or standings is NOT tagged outdated. The JSON artifact lists every affected page and unconfirmed fixture.','');
  return lines.join('\n');
}
const SITE_PREFIX='https://texasdefined.com';
async function main(){
  const arg=process.argv[2];if(!['--research','--validate'].includes(arg))throw Error('Use --research or --validate');
  const state=inventory();
  if(!Number.isFinite(state.summary.affectedPages)||!Array.isArray(state.pages))throw Error('Inventory failed');
  if(arg==='--validate'){console.log('PASS public-source statewide inventory, RSS URL safety, and day-after-game workflow');return;}
  const r=await conductResearch(state);
  mkdirSync(OUT,{recursive:true});
  writeFileSync(join(OUT,'inventory.json'),JSON.stringify(state,null,2)+'\n');
  writeFileSync(join(OUT,'research.json'),JSON.stringify(r,null,2)+'\n');
  writeFileSync(join(OUT,'research.md'),reportMarkdown(r));
  const md=reportMarkdown(r).split('\n');
  const condensed=[...md.slice(0,15),
    '','Full dated page inventory, all queried games and source links are in the workflow artifact.',
    '','## Representative affected pages',...r.inventory.pages.slice(0,60).map(p=>'- '+p.page+' ('+p.reason+')'),
    '','## Recent source reporting leads'];
  for(const g of r.researchedGames.filter(x=>x.articles.length).slice(0,15)){
    condensed.push('- '+flat(g.fixture.date+' '+g.fixture.away+' vs '+g.fixture.home)+': '+
      g.articles.slice(0,2).map(a=>a.url).join(' ; '));
  }
  condensed.push('','## Published district and hub source references and recent sourced leads');
  for(const row of r.additionalResearch){
    if(row.target.kind!=='standings')continue;
    condensed.push('- '+row.target.page+' · '+row.target.sourceUrl);
    for(const lead of row.articles.slice(0,2))condensed.push('  - '+lead.url);
  }
  writeFileSync(join(OUT,'issue.md'),condensed.join('\n')+'\n');
  console.log(JSON.stringify({pages:state.summary.affectedPages,fixtures:state.summary.unverifiedFixtures,
    attempted:r.queryAttempts,errors:r.queryFailures,leads:r.gamesWithPublicReportingLeads,
    deferred:r.deferredFixtures.length}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();