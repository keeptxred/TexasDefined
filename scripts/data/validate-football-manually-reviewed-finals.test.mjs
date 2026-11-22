import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT,inventory} from './inventory-statewide-football-scores.mjs';

const reviewed=JSON.parse(readFileSync(join(ROOT,'src/data/high-school-football/football-manually-verified-finals-2026.snapshot.json'),'utf8'));
const rows=reviewed.verifiedFinals;
const bySlug=new Map(rows.filter(row=>row.date==='2026-11-06').map(row=>[row.slug,row]));
const byFixture=new Map(rows.map(row=>[row.slug+'|'+row.date,row]));

test('all manually reviewed 2026 results have explicit editorial authority and independent source hosts',()=>{
  assert.equal(reviewed.schemaVersion,1);
  assert.equal(reviewed.season,'2026');
  assert.ok(rows.length>=14);
  assert.equal(byFixture.size,rows.length);
  for(const row of rows){
    assert.match(row.date,/^2026-\d{2}-\d{2}$/);
    assert.match(row.verifiedAt,/^2026-\d{2}-\d{2}$/);
    assert.ok(row.verifiedAt>=row.date);
    assert.equal(row.verificationMethod,'manual-editorial-review');
    assert.ok(Number.isInteger(row.pointsFor)&&Number.isInteger(row.pointsAgainst));
    assert.ok(row.pointsFor>=0&&row.pointsAgainst>=0&&row.pointsFor!==row.pointsAgainst);
    const first=new URL(row.primarySourceUrl),second=new URL(row.secondarySourceUrl);
    assert.equal(first.protocol,'https:');
    assert.equal(second.protocol,'https:');
    assert.notEqual(first.hostname,second.hostname);
  }
  assert.deepEqual([bySlug.get('alief-taylor').pointsFor,bySlug.get('alief-taylor').pointsAgainst],[7,24]);
  assert.deepEqual([bySlug.get('alvarado').pointsFor,bySlug.get('alvarado').pointsAgainst],[28,49]);
  assert.deepEqual([bySlug.get('amarillo').pointsFor,bySlug.get('amarillo').pointsAgainst],[52,3]);
  assert.deepEqual([bySlug.get('amarillo-caprock').pointsFor,bySlug.get('amarillo-caprock').pointsAgainst],[3,52]);
  assert.deepEqual([bySlug.get('amarillo-highland-park').pointsFor,bySlug.get('amarillo-highland-park').pointsAgainst],[48,47]);
  assert.deepEqual([bySlug.get('amarillo-river-road').pointsFor,bySlug.get('amarillo-river-road').pointsAgainst],[0,59]);
  assert.deepEqual([bySlug.get('anderson-shiro').pointsFor,bySlug.get('anderson-shiro').pointsAgainst],[14,23]);
  assert.deepEqual([bySlug.get('anson').pointsFor,bySlug.get('anson').pointsAgainst],[45,21]);
  assert.deepEqual([bySlug.get('ballinger').pointsFor,bySlug.get('ballinger').pointsAgainst],[35,36]);
});

test('source-locked November finals never reenter statewide missing-final review for their own pages',()=>{
  const state=inventory({today:'2026-11-20'});
  for(const row of rows){
    const page=state.pages.find(p=>p.page.endsWith('/'+row.slug));
    assert.ok(!page?.overdue?.some(g=>g.date===row.date),'Sourced final wrongly due on '+row.slug);
  }
  const alvarado=state.pages.find(p=>p.page.endsWith('/alvarado'));
  assert.ok(!alvarado?.overdue.some(g=>g.date==='2026-10-30'),
    'Separate Oct30 Aubrey game now has reviewed Alvarado editorial coverage');
  assert.ok(state.fixtures.every(g=>g.date<'2026-11-20'));
});

test('server-side scoreboard overlay refuses opponent/date mismatch and contradictory prior finals',()=>{
  const server=readFileSync(join(ROOT,'src/data/high-school-football/football-program-profile.server.ts'),'utf8');
  const overlay=readFileSync(join(ROOT,'src/data/high-school-football/football-manually-verified-final-overlay.ts'),'utf8');
  assert.ok(server.includes('applyManuallyVerifiedFootballFinals(applyVerifiedDistrictFinalsToTeam('));
  for(const mark of [
    "if (!updates.length) return editorial", "publishedDates.has(row.date)",
    "normalized(game.opponent)!==normalized(row.opponent)",
    "if (game.result && game.result !== result)", "if (!found.has(row.date))",
    "Partial 2026 scorecard from independently verified final results",
    "verifiedAt:mostRecent.verifiedAt",
  ])assert.ok(overlay.includes(mark),mark);
  assert.ok(!overlay.includes('fetch('),'No live score scraping or publication at render time');
});


test('November 21 source-verified corrections preserve team-side orientation',()=>{
  assert.deepEqual([byFixture.get('alvarado|2026-10-30').pointsFor,byFixture.get('alvarado|2026-10-30').pointsAgainst],[40,70]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-10-30').pointsFor,byFixture.get('arlington-lamar|2026-10-30').pointsAgainst],[28,7]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-11-06').pointsFor,byFixture.get('arlington-lamar|2026-11-06').pointsAgainst],[3,28]);
  assert.deepEqual([byFixture.get('baytown-lee|2026-11-06').pointsFor,byFixture.get('baytown-lee|2026-11-06').pointsAgainst],[7,28]);
  assert.deepEqual([byFixture.get('beaumont-west-brook|2026-11-06').pointsFor,byFixture.get('beaumont-west-brook|2026-11-06').pointsAgainst],[62,21]);
});

test('written October and November dates cannot be classified as upcoming on November 21',async()=>{
  const {footballFixtureCalendarDate,footballFixtureCalendarStatus}=await import('../../src/data/high-school-football/football-fixture-calendar.ts');
  for(const date of ['Oct. 9','Sept. 25','Nov. 6','Nov 6, 2026','2026-11-06']) assert.equal(footballFixtureCalendarStatus(date,'2026-11-21'),'past',date);
  assert.equal(footballFixtureCalendarStatus('Nov. 27','2026-11-21'),'future-or-today');
  assert.equal(footballFixtureCalendarDate('Feb. 30'),null);
  assert.equal(footballFixtureCalendarStatus('TBD','2026-11-21'),'unknown');
  const route=readFileSync(join(ROOT,'src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'),'utf8');
  assert.ok(route.includes("footballFixtureCalendarStatus(game.date, todayTexas) === 'future-or-today'"));
  assert.ok(route.includes("footballFixtureCalendarStatus(game.date, todayTexas) === 'past'"));
  assert.ok(!route.includes('game.date >= todayTexas')&&!route.includes('game.date < todayTexas'));
});
