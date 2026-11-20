import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  extractJsonObjects,inventory,classifySeason,chooseReviewCohort,queryFor,
  parsePublicFootballRss,researchCohort,markdownReport,districtSlug,pathForTeam
} from './research-football-pages-statewide.mjs';
import {UIL_FOOTBALL_PROGRAMS_2026} from '../../src/data/high-school-football/uil-football-alignments-2026.server.ts';
const DAY='2026-11-20';
const parsed=extractJsonObjects('const X={\n  "aubrey": {"slug":"aubrey","season":{"games":[{"date":"2026-11-06","opponent":"Other team"}]}},\n  "comal-canyon-lake": {"slug":"comal-canyon-lake","intro":"quoted } bracket and escaped \\" text","season":{"games":[]}}\n};');
test('nested, escaped JSON objects are extracted by their exact school slug',()=>{
  assert.equal(parsed.size,2);
  assert.equal(parsed.get('aubrey').season.games[0].opponent,'Other team');
  assert.equal(parsed.get('comal-canyon-lake').season.games.length,0);
});
test('overdue fixtures are detected but missing finals are not invented',()=>{
  const s=classifySeason({verifiedAt:'2026-10-20',games:[
    {date:'2026-11-06',opponent:'Opponent',site:'Away'},
    {date:'2026-10-02',opponent:'Earlier',result:'W 14–7'},
    {date:'2026-11-20',opponent:'Today'}
  ]},DAY);
  assert.equal(s.overdue.length,1);assert.equal(s.overdue[0].opponent,'Opponent');
  assert.equal(s.lastFinal,'2026-10-02');assert.equal(s.asOf,'2026-10-20');
});
test('statewide inventory covers 1268 UIL teams and 192 unique districts',()=>{
  const rows=inventory(DAY);
  assert.equal(rows.counts.uilTeamPages,1268);
  assert.equal(rows.counts.additionalFeaturedTeamPages,24,'Only 24 distinct featured/private-school canonical team routes');
  assert.equal(rows.teams.length,1268+rows.counts.additionalFeaturedTeamPages);
  assert.equal(rows.districts.length,192);
  assert.equal(rows.counts.coveredPages,1484);
  assert.equal(rows.counts.parseErrors.length,0);
  assert.equal(new Set(rows.teams.map(x=>x.slug)).size,rows.teams.length);
  assert.equal(new Set(rows.districts.map(x=>x.slug)).size,192);
  assert.ok(rows.teams.every(x=>x.url===pathForTeam(x.slug)));
  assert.equal(districtSlug(UIL_FOOTBALL_PROGRAMS_2026.find(x=>x.schoolName==='Comal Canyon Lake')),'4a-division-i-district-13');
  assert.ok(rows.districts.some(x=>x.slug==='6a-district-21'&&x.overdue.length===0), 'District 21 final ledger is now fully resolved');
  assert.ok(rows.districts.some(x=>x.slug==='4a-division-i-district-11'&&x.overdue.length===0), 'District 11 final ledger is now fully resolved');
  assert.ok(rows.districts.some(x=>x.slug==='6a-district-16'&&x.overdue.length===0), 'District 16 late fixtures now have corroborated finals');
  assert.equal(rows.counts.matchupSnapshotVerifiedAt,'2026-11-20');
  assert.ok(rows.counts.teamSeasonSnapshots>0);
});
test('cohort selects overdue results then rotates all flagged pages without exceeding cap',()=>{
  const inv=inventory('2026-11-21'),cohort=chooseReviewCohort(inv,'2026-11-21',12);
  assert.ok(cohort.candidates>=12);
  assert.equal(cohort.selected.length,12);
  assert.equal(new Set(cohort.selected.map(x=>x.type+':'+x.slug)).size,12);
  assert.ok(cohort.selected.every(x=>x.type==='district'||x.type==='team'));
  assert.ok(cohort.selected.every(x=>queryFor(x,'2026-11-21').includes('football')));
});
const xml='<?xml version="1.0"?><rss><channel>'+
 '<item><title>Canyon Lake Hawks football final score this week</title><link>https://example.org/hawks</link><pubDate>Sat, 21 Nov 2026 09:00:00 GMT</pubDate><source>District Sports</source></item>'+
 '<item><title>Unrelated city volleyball scores</title><link>https://example.org/other</link><pubDate>Sat, 21 Nov 2026 09:00:00 GMT</pubDate></item>'+
 '</channel></rss>';
const row={type:'team',slug:'comal-canyon-lake',name:'Comal Canyon Lake'};
test('public RSS search requires the team name and links to reporting, not assumed scores',()=>{
  const items=parsePublicFootballRss(xml,{row,now:new Date('2026-11-21T17:00:00Z')});
  assert.equal(items.length,0,'generic Canyon Lake alias is not automatically Comal Canyon Lake identity proof');
  const good=xml.replace('Canyon Lake Hawks','Comal Canyon Lake Hawks');
  const match=parsePublicFootballRss(good,{row,now:new Date('2026-11-21T17:00:00Z')});
  assert.equal(match.length,1);assert.equal(match[0].source,'District Sports');
});
test('bounded research records source links only and never publishes the discovered score',async()=>{
  const inv=inventory('2026-11-21');const seen=[];
  const result=await researchCohort(inv,{today:'2026-11-21',limit:2,
    fetcher:async url=>{seen.push(url);return xml.replace('Canyon Lake Hawks','Comal Canyon Lake Hawks');}});
  assert.equal(result.results.length,2);
  assert.equal(seen.length,4);
  assert.ok(result.results.every(x=>x.url.startsWith('/texas-high-school-football-')));
  assert.ok(!JSON.stringify(result).includes('homeScore'));
  assert.match(markdownReport(inv,result),/No scores, standings ranks, tiebreaks/);
});
