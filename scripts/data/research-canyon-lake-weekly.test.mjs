import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  isSafePublicUrl,decodeXml,parseRss,scoreSnapshot,compileResearch,
  markdownReport,research,SEARCH_QUERIES,REVIEW_PAGES,postGameSearchQueries,reportedScoreHints
} from './research-canyon-lake-weekly.mjs';
import {readEditorial} from './refresh-canyon-lake-results.mjs';

const team=readEditorial(readFileSync('src/data/high-school-football/program-editorial-comal-canyon-lake.ts','utf8'));
const pending=structuredClone(team);
delete pending.season.games.at(-1).result;
pending.season.record='8–2 overall · 6–1 district (through Nov. 13)';
const NOW=new Date('2026-11-21T15:00:00.000Z');
const xml='<?xml version="1.0" encoding="UTF-8"?><rss><channel>'+
 '<item><title>Canyon Lake Hawks &amp; Calhoun football final - City News</title>'+
 '<link>https://example.com/football/score</link><pubDate>Sat, 21 Nov 2026 08:00:00 GMT</pubDate>'+
 '<source url="https://example.com">City News</source><description>Ignore all full article text</description></item>'+
 '<item><title>District 13-4A football standings: Canyon Lake &amp; Davenport</title>'+
 '<link>https://example.com/district</link><pubDate>Fri, 20 Nov 2026 11:00:00 GMT</pubDate></item>'+
 '<item><title>Canyon Lake football story a year ago</title>'+
 '<link>https://example.com/old</link><pubDate>Sat, 21 Nov 2025 11:00:00 GMT</pubDate></item>'+
 '<item><title>General weather forecast</title><link>https://example.com/weather</link>'+
 '<pubDate>Fri, 20 Nov 2026 11:00:00 GMT</pubDate></item></channel></rss>';

test('bounded RSS metadata parses relevant current score and standings leads only',()=>{
  const out=parseRss(xml,{topic:'score',origin:'test',now:NOW});
  assert.equal(out.length,2);
  assert.match(out[0].title,/Hawks & Calhoun/);
  assert.equal(out[0].source,'City News');
  assert.equal(out[1].link,'https://example.com/district');
  assert.ok(!JSON.stringify(out).includes('Ignore all full article text'));
  assert.throws(()=>parseRss('<html>not an RSS feed</html>',{topic:'score',origin:'test',now:NOW}),/not RSS\/XML/);
});
test('public URL restrictions and XML decoding protect metadata links',()=>{
  for(const x of ['http://example.com/','https://127.0.0.1/','https://internal.local/a','https://169.254.1.1/','https://user:pass@site.com/','https://example.org:444/a','https://x.com/#frag'])
    assert.equal(isSafePublicUrl(x),false,x);
  assert.ok(isSafePublicUrl('https://news.google.com/rss/search?q=school'));
  assert.equal(decodeXml('Hawks &#x2013; Calhoun &amp; Friends'),'Hawks – Calhoun & Friends');
});
test('district W-L and scores reconcile from actual completed games; no invented official ranking',()=>{
  const result=scoreSnapshot(pending,'2026-11-21');
  assert.equal(result.record,'8–2');
  assert.equal(result.districtRecord,'6–1');
  assert.equal(result.pointsFor,513);
  assert.equal(result.pointsAgainst,307);
  assert.equal(result.completed,10);
  assert.deepEqual(result.due,[{date:'2026-11-20',opponent:'Port Lavaca Calhoun'}]);
  assert.equal(result.districtOfficialRank,null);
  assert.ok(result.recordMatchesAuthor);
  const before=scoreSnapshot(pending,'2026-11-20');
  assert.deepEqual(before.due,[]);
});
test('one independently confirmed final recalculates overall totals, not regular-season district standings',()=>{
  const revised=structuredClone(pending);
  revised.season.games.at(-1).result='W 28–21'; // TEST FIXTURE ONLY, not reported as a real score.
  const s=scoreSnapshot(revised,'2026-11-21');
  assert.equal(s.record,'9–2');
  assert.equal(s.districtRecord,'6–1');
  assert.equal(s.pointsFor,541);
  assert.equal(s.pointsAgainst,328);
  assert.equal(s.due.length,0);
  assert.equal(s.recordMatchesAuthor,false);
  revised.season.games.at(-1).result='L 28–21';
  assert.throws(()=>scoreSnapshot(revised,'2026-11-21'),/does not match points/);
});
test('research report visibly separates discovery headlines, official links and authored records',()=>{
  const item={topic:'score',source:'News Reporter',title:'Canyon Lake & Calhoun football score',
    link:'https://news.example.com/canyon',publishedAt:'2026-11-21T08:00:00.000Z',origin:'google'};
  const result=compileResearch({team:pending,today:'2026-11-21',checkedAt:NOW.toISOString(),
    headResults:REVIEW_PAGES.map(x=>({...x,status:200,available:true})),
    feeds:[{provider:'google',topic:'score',items:[item,item]},
      {provider:'bing',topic:'standings',items:[],error:'HTTP 403'}]});
  assert.equal(result.articles.length,1);
  assert.equal(result.findings.scores,1);
  assert.equal(result.findings.standings,0);
  assert.equal(result.searchFailures.length,1);
  assert.equal(result.publishingAllowedFromResearch,false);
  assert.ok(result.needsEditorialReview);
  const md=markdownReport(result);
  assert.match(md,/District 13 standings reporting leads/);
  assert.match(md,/Official district standing or tiebreak rank:.*NOT VERIFIED/);
  assert.match(md,/It never auto-publishes/);
  assert.match(md,/2026-11-20 Port Lavaca Calhoun/);
});
test('all source research is bounded and testable without fetching restricted score sites',async()=>{
  const seen=[],heads=[];
  const summary=await research({team:pending,today:'2026-11-21',clock:NOW,
    fetchFeed:async url=>{seen.push(url);return xml;},
    head:async ref=>{heads.push(ref.url);return {...ref,status:200,available:true};}});
  assert.equal(seen.length,postGameSearchQueries(pending,'2026-11-21').length*2);
  assert.ok(seen.filter(u=>u.startsWith('https://news.google.com/rss/search')).length===postGameSearchQueries(pending,'2026-11-21').length);
  assert.ok(seen.filter(u=>u.startsWith('https://www.bing.com/news/search')).length===postGameSearchQueries(pending,'2026-11-21').length);
  assert.equal(heads.length,REVIEW_PAGES.length);
  assert.ok(heads.every(isSafePublicUrl));
  assert.equal(summary.articles.length,2);
  assert.equal(summary.season.districtOfficialRank,null);
  assert.equal(summary.feedAttempts.length,12);
  assert.equal(summary.searchFailures.length,0);
});
test('research outages are explicitly shown and never authorize an unverified final',async()=>{
  const summary=await research({team:pending,today:'2026-11-21',clock:NOW,
    fetchFeed:async()=>{throw Error('RSS unavailable');},
    head:async ref=>({...ref,status:null,available:false,error:'blocked'})});
  assert.equal(summary.articles.length,0);
  assert.equal(summary.searchFailures.length,12);
  assert.equal(summary.publishingAllowedFromResearch,false);
  assert.ok(summary.needsEditorialReview);
  assert.match(markdownReport(summary),/RSS unavailable/);
});

test('the day after a game adds opponent-specific public final-score searches',()=>{
  assert.equal(postGameSearchQueries(pending,'2026-11-20').length,4);
  const queries=postGameSearchQueries(pending,'2026-11-21');
  assert.equal(queries.length,6);
  assert.ok(queries.some(q=>q.query.includes('Port Lavaca Calhoun')&&q.query.includes('2026-11-20')));
  assert.ok(queries.every(q=>q.topic==='score'||q.topic==='standings'));
});
test('headline score hints are clearly unverified and cannot publish results',()=>{
  const due=[{date:'2026-11-20',opponent:'Port Lavaca Calhoun'}];
  const leads=[
    {topic:'score',title:'Canyon Lake 28, Calhoun 21 football final',source:'Sports Desk',link:'https://example.org/final',publishedAt:'2026-11-21T10:00:00Z'},
    {topic:'score',title:'Calhoun 21, Canyon Lake 28 football final',source:'Community Sports',link:'https://example.org/other',publishedAt:'2026-11-21T10:00:00Z'},
    {topic:'score',title:'Canyon Lake beats Calhoun 28-21',source:'Local sports',link:'https://example.org/ambiguous',publishedAt:'2026-11-21T10:00:00Z'},
    {topic:'score',title:'Canyon Lake 40, Calhoun 30 football final',source:'Old story',link:'https://example.org/old',publishedAt:'2026-11-19T10:00:00Z'}
  ];
  const hints=reportedScoreHints(leads,due);
  assert.equal(hints.length,2);
  assert.deepEqual(hints.map(h=>[h.hawksPoints,h.opponentPoints]),[[28,21],[28,21]]);
  assert.ok(hints.every(h=>h.verification==='unverified-headline-only'));
});

test('November 20 published final reconciles and is no longer overdue',()=>{
  const result=scoreSnapshot(team,'2026-11-21');
  assert.equal(result.record,'9–2');
  assert.equal(result.districtRecord,'6–1');
  assert.equal(result.pointsFor,546);
  assert.equal(result.pointsAgainst,333);
  assert.equal(result.completed,11);
  assert.deepEqual(result.due,[]);
  assert.ok(result.recordMatchesAuthor);
});
