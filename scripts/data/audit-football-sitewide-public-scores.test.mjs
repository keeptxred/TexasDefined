import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
 indexPrograms,staleRows,audit,shardSelection,searchText,parseRss,lookup,combinedSummary,
 texasDate
} from './audit-football-sitewide-public-scores.mjs';

test('complete 2026 UIL index covers 1,268 teams and 192 districts without invented scores',()=>{
  const x=indexPrograms();
  assert.equal(x.teams.size,1268);
  assert.equal(x.districts.size,192);
  assert.equal(x.teams.get('comal-canyon-lake')?.districtSlug,'4a-division-i-district-13');
  assert.equal(x.districts.get('6a-district-22')?.names.length>0,true);
});
test('static calendar recognizes only played-date missing finals, not existing finals or future fixtures',()=>{
 const source=[
  "scheduled('2026-10-22', 'Frisco Wakeland', 'Denton Braswell'),",
  "final('2026-10-16', 'Frisco Wakeland', 'Denton Guyer', 13, 21),",
  "{date:'2026-10-22',away:'Team A',home:'Team B',status:'scheduled'},",
  "{date:'2026-10-22',away:'Team C',home:'Team D',status:'final',awayScore:28,homeScore:14},",
  "{ date: '2026-11-20', opponent: 'Port Lavaca Calhoun', site: 'Neutral' },",
  "{ date: '2026-11-21', opponent: 'Future Opponent', site: 'Home' },",
  '{"date":"2026-10-18","opponent":"Other School","site":"Away"},',
 ].join('\n');
 const rows=staleRows(source,'fixture.ts','2026-11-20');
 assert.equal(rows.length,3);
 assert.ok(rows.some(x=>x.away==='Frisco Wakeland'&&x.home==='Denton Braswell'));
 assert.ok(rows.some(x=>x.away==='Team A'&&x.home==='Team B'));
 assert.ok(rows.some(x=>x.away==='Other School'&&x.date==='2026-10-18'));
 assert.ok(!rows.some(x=>x.date==='2026-11-20'));
});
test('October and November district snapshot gaps are identified with their affected URLs',()=>{
 const x=audit({today:'2026-11-20'});
 assert.equal(x.teamPages,1268);
 assert.equal(x.districtPages,192);
 assert.ok(x.stale.some(t=>t.file==='football-district5-2026.ts'&&t.date==='2026-10-23'));
 assert.ok(x.stale.some(t=>t.file==='football-district-game-week.ts'&&t.date==='2026-10-22'));
 assert.ok(x.stale.some(t=>t.file==='program-editorial-comal-canyon-lake.ts'&&t.teams.includes('comal-canyon-lake')&&t.date==='2026-11-13')===false,'Completed Canyon Lake score must remain finished');
 assert.ok(x.outdatedStandings.some(t=>t.file==='football-district16-2026.ts'));
 assert.ok(x.stale.some(t=>t.urls.some(u=>u.endsWith('/6a-district-5'))));
 assert.ok(x.stale.every(t=>t.date<'2026-11-20'));
 assert.ok(x.impactedKnownPageUrls>0);
});
test('bounded shard ownership does not double-assign candidates',()=>{
 const x=audit({today:'2026-11-20'});
 const groups=Array.from({length:8},(_,shard)=>shardSelection(x,shard,8));
 assert.ok(groups.every(y=>y.selected.length<=32));
 assert.ok(groups.reduce((sum,y)=>sum+y.total,0)>=x.stale.length);
 const ids=groups.flatMap(g=>g.selected.map(t=>[t.file,t.date,t.away,t.home].join('|')));
 assert.equal(ids.length,new Set(ids).size);
 assert.ok(searchText(groups.flatMap(x=>x.selected)[0]).includes('2026'));
});
test('RSS publication headlines remain unverified evidence, never scores',async()=>{
 const feed='<?xml version="1.0"?><rss><channel><item><title>School A 21, School B 14 football final</title>'+
  '<link>https://example.org/game</link><pubDate>Sat, 21 Nov 2026 10:00:00 GMT</pubDate>'+
  '<source>Local Sports</source></item></channel></rss>';
 assert.equal(parseRss(feed,'2026-11-20').length,1);
 assert.equal(parseRss(feed,'2026-11-22').length,0);
 const mock=async()=>({ok:true,headers:{get:()=>null},text:async()=>feed});
 const out=await lookup({file:'f',date:'2026-11-20',kind:'fixture',away:'School A',home:'School B',teams:[],districts:[],urls:[]},
  {get:mock,now:'2026-11-21'});
 assert.equal(out.leads.length,2);
 assert.ok(out.leads.every(x=>x.verification==='unverified-research-lead'));
 assert.equal(out.errors.length,0);
});
test('partial shard inventory never becomes a falsely complete review',()=>{
 const x=audit({today:'2026-11-20'});
 assert.throws(()=>combinedSummary([{shard:0,shards:8,results:[],notQueried:0}],x),/all scheduled research shards/);
 assert.equal(texasDate(new Date('2026-11-21T03:00:00Z')),'2026-11-20');
});
const workflow=readFileSync(new URL('../../.github/workflows/refresh-football-scores-brackets.yml',import.meta.url),'utf8');
test('scheduled research does not poll live scores, demand paid feeds or auto-publish',()=>{
 assert.ok(workflow.includes('audit-football-sitewide-public-scores.mjs --research'));
 assert.ok(workflow.includes('audit-football-sitewide-public-scores.mjs --summarize'));
 assert.ok(workflow.includes("cron: '37 17 * 8-12 *'"));
 assert.ok(!workflow.includes('FOOTBALL_RESULTS_FEED_URL'));
 assert.ok(!workflow.includes('gh pr create'));
 assert.ok(!workflow.includes('gh pr merge'));
 assert.ok(!workflow.includes('pull-requests: write'));
});
