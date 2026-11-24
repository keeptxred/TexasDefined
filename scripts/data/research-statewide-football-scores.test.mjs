import {inventory} from './inventory-statewide-football-scores.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {safeLink,decode,parseNews,parseExtraNews,additionalResearchTargets,publicProviders,chooseSearches,conductResearch,reportMarkdown,retryAfterMs,createRssDownloader} from './research-statewide-football-scores.mjs';

const fixture={date:'2026-11-19',away:'Aubrey',home:'Canyon',pages:['https://texasdefined.com/texas-high-school-football-teams/aubrey']};
const xml='<?xml version="1.0"?><rss><channel>'+
  '<item><title>Aubrey &amp; Canyon football final results Friday</title>'+
  '<link>https://news.example.com/game</link><pubDate>Fri, 20 Nov 2026 10:00:00 GMT</pubDate>'+
  '<source>Local News</source><description>Do not import article text</description></item>'+
  '<item><title>Canyon score from old game</title><link>https://news.example.com/old</link>'+
  '<pubDate>Thu, 19 Nov 2026 11:00:00 GMT</pubDate></item>'+
  '<item><title>Old unrelated basketball story</title><link>https://example.com/other</link>'+
  '<pubDate>Mon, 16 Nov 2026 11:00:00 GMT</pubDate></item></channel></rss>';

test('only safe HTTPS public article links enter score review metadata',()=>{
  for(const u of ['http://example.com','https://127.0.0.1/x','https://192.168.0.1','https://abc.local','https://user:pw@example.com/'])
    assert.equal(safeLink(u),false,u);
  assert.equal(safeLink('https://news.example.com/local-football'),true);
  assert.equal(decode('Aubrey &amp; Canyon &#x2013; finals'),'Aubrey & Canyon – finals');
});
test('RSS parser retains date-scoped public headlines, not article bodies or invented scores',()=>{
  const items=parseNews(xml,fixture,'google','2026-11-20');
  assert.equal(items.length,2);
  assert.equal(items[0].title,'Aubrey & Canyon football final results Friday');
  assert.ok(items.every(x=>x.verification==='public-headline-lead-only'));
  assert.ok(!JSON.stringify(items).includes('Do not import article text'));
  assert.throws(()=>parseNews('<html>nothing</html>',fixture,'bing','2026-11-20'),/Not RSS/);
});
test('the full stale inventory remains scheduled even if search budget is deferred',()=>{
  const many=Array.from({length:20},(_,i)=>({date:'2026-11-19',away:'School '+i,home:'Opponent '+i,pages:['https://texasdefined.com/'+i]}));
  const out=chooseSearches(many,{today:'2026-11-20',max:12});
  assert.equal(out.selected.length,6);
  assert.equal(out.deferred.length,14);
  assert.equal(new Set(out.selected.map(x=>x.away)).size,6);
});
test('shared research queries all due fixtures without requiring paid feeds or publishing',async()=>{
  const state={today:'2026-11-20',summary:{affectedPages:1,overduePages:1,datedScoreReviewPages:0,unverifiedFixtures:1},
    pages:[{page:fixture.pages[0],reason:'overdue-fixture',sourceFile:'test',overdue:[fixture]}],fixtures:[fixture]};
  const calls=[];
  const r=await conductResearch(state,{getText:async url=>{calls.push(url);return xml;}});
  assert.equal(calls.length,2);
  assert.ok(calls.some(x=>x.includes('news.google.com/rss/search')));
  assert.ok(calls.some(x=>x.includes('www.bing.com/news/search')));
  assert.equal(r.queryFailures,0);
  assert.equal(r.gamesWithPublicReportingLeads,1);
  assert.equal(r.publication,false);
  assert.equal(r.researchedGames[0].articles.length,2);
  assert.match(reportMarkdown(r),/never edits football pages or publishes guessed scores/);
  assert.match(reportMarkdown(r),/Aubrey/);
});
test('public RSS outage is clearly reported but never authorizes a score update',async()=>{
  const state={today:'2026-11-20',summary:{affectedPages:1,overduePages:1,datedScoreReviewPages:0,unverifiedFixtures:1},
    pages:[{page:fixture.pages[0],reason:'overdue-fixture',sourceFile:'test',overdue:[fixture]}],fixtures:[fixture]};
  const r=await conductResearch(state,{getText:async()=>{throw Error('Network unavailable');}});
  assert.equal(r.queryFailures,2);
  assert.equal(r.gamesWithPublicReportingLeads,0);
  assert.equal(r.publication,false);
  assert.equal(r.researchedGames[0].failures.length,2);
});

test('all currently eligible statewide overdue fixtures receive lookup coverage in one daily run',()=>{
  const report=inventory({today:'2026-11-20'});
  const selected=chooseSearches(report.fixtures,{today:report.today,max:800});
  assert.equal(selected.deferred.length,0, 'every real dated score page must be researched');
  assert.equal(selected.selected.length,report.fixtures.length);
  assert.ok(selected.queryBudgetUsed<=800);
  assert.deepEqual(publicProviders({date:'2026-11-19'},'2026-11-20'),['google','bing']);
  assert.equal(publicProviders({date:'2026-10-23'},'2026-11-20').length,1);
});

test('only archived district standings still needing review receive public source lookups',()=>{
  const state=inventory({today:'2026-11-20'});
  const targets=additionalResearchTargets(state);
  const districts=targets.filter(t=>t.kind==='standings');
  assert.ok(districts.length>=6);
  for(const slug of ['6a-district-5','4a-division-i-district-11','6a-district-16','6a-district-20','6a-district-21','6a-district-22'])assert.ok(districts.some(t=>t.page.endsWith('/'+slug)),slug);
  for(const t of districts){
    assert.ok(t.sourceUrl.startsWith('https://'));
    assert.ok(t.providers.length>=1);
    assert.ok(t.query.includes('2026'));
  }
  assert.ok(!targets.some(t=>t.page.endsWith('/frisco-lone-star')));
});
test('published district standing and aged season research is metadata-only',async()=>{
  const target={kind:'standings',page:'https://texasdefined.com/texas-high-school-football-districts/6a-district-16',
    label:'6a district 16',sourceUrl:'https://www.maxpreps.com/tx/football/district/',providers:['google','bing']};
  const dated='<?xml version="1.0"?><rss><channel><item><title>District 16 football standings updated in Texas</title>'+
   '<link>https://news.example.org/d16</link><pubDate>Fri, 20 Nov 2026 10:00:00 GMT</pubDate></item></channel></rss>';
  assert.equal(parseExtraNews(dated,target,'google','2026-11-20').length,1);
  assert.equal(parseExtraNews(dated,target,'google','2026-09-20').length,0);
  const state={today:'2026-11-20',summary:{affectedPages:1,overduePages:0,datedScoreReviewPages:1,unverifiedFixtures:0},
    pages:[{page:target.page,kind:'district',reason:'dated-standings-review',sourceFile:'test',overdue:[]}],fixtures:[]};
  const r=await conductResearch(state,{getText:async()=>dated});
  assert.equal(r.additionalResearch.length,1);
  assert.equal(r.additionalResearch[0].target.kind,'standings');
  assert.equal(r.additionalResearch[0].articles.length,1);
  assert.equal(r.publication,false);
  assert.match(reportMarkdown(r),/Current standings and dated-record research/);
});

test('current score pages and the bracket hub are actively researched even without a stale fixture',()=>{
  const state=inventory({today:'2026-11-21'});
  const targets=additionalResearchTargets(state);
  assert.ok(targets.some(t=>t.page.endsWith('/aubrey')));
  assert.ok(targets.some(t=>t.page.endsWith('/katy')));
  assert.ok(targets.some(t=>t.page.endsWith('/texas-high-school-football-playoff-brackets')));
  for(const p of state.coverage.enrollment.filter(p=>p.kind!=='matchup'))assert.ok(targets.some(t=>t.page===p.page)||p.kind==='team'&&state.pages.some(q=>q.page===p.page&&q.overdue.length),p.page);
});


test('429 respects Retry-After and retries once without bypassing the provider',async()=>{
  let time=100000,calls=[];
  const download=createRssDownloader({now:()=>time,wait:async ms=>{time+=ms;},fetchImpl:async url=>{
    calls.push({url,time});
    return calls.length===1?new Response('rate limited',{status:429,headers:{'Retry-After':'3'}}):new Response(xml);
  }});
  assert.equal(await download('https://news.google.com/rss/search?q=fixture'),xml);
  assert.equal(calls.length,2);
  assert.ok(calls[1].time-calls[0].time>=3000);
  assert.equal(retryAfterMs(null),30000);
  assert.equal(retryAfterMs('Thu, 01 Jan 1970 00:02:00 GMT',100000),20000);
});
test('persistent 429 pauses only the affected provider and never retries beyond its wait budget',async()=>{
  let time=100000,calls=[];
  const download=createRssDownloader({now:()=>time,wait:async ms=>{time+=ms;},fetchImpl:async url=>{
    calls.push(url);
    return url.includes('google.com')?new Response('rate limited',{status:429,headers:{'Retry-After':'120'}}):new Response(xml);
  }});
  await assert.rejects(download('https://news.google.com/rss/search?q=a'),/HTTP 429/);
  await assert.rejects(download('https://news.google.com/rss/search?q=b'),/paused/);
  assert.equal(calls.length,1);
  assert.equal(await download('https://www.bing.com/news/search?q=a'),xml);
  assert.equal(calls.length,2);
});
test('repeated rate limiting stops that provider instead of hammering it',async()=>{
  let time=100000,calls=0;
  const download=createRssDownloader({now:()=>time,wait:async ms=>{time+=ms;},fetchImpl:async()=>{
    calls++;
    return new Response('rate limited',{status:429,headers:{'Retry-After':'1'}});
  }});
  await assert.rejects(download('https://news.google.com/rss/search?q=a'),/HTTP 429/);
  await assert.rejects(download('https://news.google.com/rss/search?q=b'),/paused/);
  assert.equal(calls,2);
});
