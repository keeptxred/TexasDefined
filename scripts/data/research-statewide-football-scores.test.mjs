import test from 'node:test';
import assert from 'node:assert/strict';
import {safeLink,decode,parseNews,chooseSearches,conductResearch,reportMarkdown} from './research-statewide-football-scores.mjs';

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
