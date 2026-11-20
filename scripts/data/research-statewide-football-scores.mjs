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
export async function conductResearch(state,{getText=download,max=MAX_QUERIES}={}){
  const {selected,deferred}=chooseSearches(state.fixtures,{today:state.today,max});
  const tasks=selected.flatMap(f=>publicProviders(f,state.today).map(provider=>({f,provider,url:rssUrl(provider,f)})));
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
    researchedGames:games,queryAttempts:tasks.length,queryFailures:errors,
    gamesWithPublicReportingLeads:leads,deferredFixtures:deferred,
    publication:false,policy:'Public RSS metadata and linked publisher reports need editorial verification before any site score or W-L update. No live scores, paid feeds, scraped score tables or unattended publication.'};
}
function flat(s){return String(s||'').replace(/[\r\n|<>]/g,' ').slice(0,200);}
export function reportMarkdown(r){
  const s=r.inventory.summary;
  const lines=['# TexasDefined statewide football day-after-game research','',
    '**Texas research date:** '+r.today+' · **Last check:** '+r.checkedAt,
    '**Affected pages with published score, dated record or standings:** '+s.affectedPages,
    '**Overdue-fixture pages:** '+s.overduePages+' · **Dated score/standings review:** '+s.datedScoreReviewPages,
    '**Distinct past fixtures awaiting final-score verification:** '+s.unverifiedFixtures,
    '**Game queries attempted:** '+r.queryAttempts+' · **Failures:** '+r.queryFailures,
    '**Fixtures with RSS reporting leads:** '+r.gamesWithPublicReportingLeads+' · **Deferred by budget:** '+r.deferredFixtures.length,'',
    '## Pages enrolled in the shared GitHub research job',''];
  for(const p of r.inventory.pages){
    lines.push('- ['+flat(p.page.replace(SITE_PREFIX,''))+']('+p.page+') — '+p.reason+
      ' · '+p.overdue.length+' fixture(s) · source: '+flat(p.sourceFile));
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
  writeFileSync(join(OUT,'issue.md'),condensed.join('\n')+'\n');
  console.log(JSON.stringify({pages:state.summary.affectedPages,fixtures:state.summary.unverifiedFixtures,
    attempted:r.queryAttempts,errors:r.queryFailures,leads:r.gamesWithPublicReportingLeads,
    deferred:r.deferredFixtures.length}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();