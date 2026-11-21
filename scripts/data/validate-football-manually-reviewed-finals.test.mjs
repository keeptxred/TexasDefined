import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT,inventory} from './inventory-statewide-football-scores.mjs';

const reviewed=JSON.parse(readFileSync(join(ROOT,'src/data/high-school-football/football-manually-verified-finals-2026.snapshot.json'),'utf8'));
const rows=reviewed.verifiedFinals;
const bySlug=new Map(rows.map(row=>[row.slug,row]));

test('all nine 2026 late-season results have explicit editorial authority and independent source hosts',()=>{
  assert.equal(reviewed.schemaVersion,1);
  assert.equal(reviewed.season,'2026');
  assert.equal(rows.length,9);
  assert.equal(bySlug.size,9);
  for(const row of rows){
    assert.equal(row.date,'2026-11-06');
    assert.equal(row.verifiedAt,'2026-11-20');
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
  assert.ok(alvarado?.overdue.some(g=>g.date==='2026-10-30'),
    'Separate Oct30 Aubrey game requires Alvarado editorial coverage');
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
