import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const workflow=read('.github/workflows/refresh-football-scores-brackets.yml');
const inventory=read('scripts/data/inventory-statewide-football-scores.mjs');
const researcher=read('scripts/data/research-statewide-football-scores.mjs');
const districtResolver=read('src/data/high-school-football/football-district-game-week.ts');
const aubrey=read('.github/workflows/aubrey-verified-score-sync.yml');

test('statewide schedule searches published game sources the next day for all eligible pages',()=>{
  assert.ok(workflow.includes("cron: '37 17 * * 6'"));
  assert.ok(workflow.includes("cron: '37 17 * 8-12 0-5'"));
  assert.ok(workflow.includes('workflow_dispatch:'));
  assert.ok(workflow.includes('node scripts/data/inventory-statewide-football-scores.mjs --inventory'));
  assert.ok(workflow.includes('node scripts/data/research-statewide-football-scores.mjs --research'));
  assert.ok(workflow.includes('node --test scripts/data/inventory-statewide-football-scores.test.mjs'));
  assert.ok(workflow.includes('node --test scripts/data/research-statewide-football-scores.test.mjs'));
  assert.ok(workflow.includes('issues: write'));
  assert.ok(workflow.includes('actions/upload-artifact@v4'));
  assert.ok(workflow.includes('gh issue create'));
  assert.ok(workflow.includes('gh issue edit'));
});
test('statewide and Aubrey schedules never depend on paid feeds or auto-publish scores',()=>{
  assert.ok(!workflow.includes('FOOTBALL_RESULTS_FEED_URL'));
  assert.ok(!workflow.includes('FOOTBALL_RESULTS_FEED_TOKEN'));
  assert.ok(!workflow.includes('vars.'));
  assert.ok(!workflow.includes('gh pr create'));
  assert.ok(!workflow.includes('gh pr merge'));
  assert.ok(!workflow.includes('pull-requests: write'));
  assert.ok(!aubrey.includes('AUBREY_SCORE_FEED_PRIMARY_URL'));
  assert.ok(!aubrey.includes('AUBREY_SCORE_FEED_SECONDARY_URL'));
  assert.ok(!aubrey.includes('cron:'));
  assert.ok(!aubrey.includes('gh pr create'));
});
test('only football pages actually publishing results or standings are enrolled',()=>{
  assert.ok(inventory.includes('program-editorial'));
  assert.ok(inventory.includes("football-district5-2026.ts"));
  assert.ok(inventory.includes("football-district11-2026.ts"));
  assert.ok(inventory.includes("football-district16-2026.ts"));
  assert.ok(inventory.includes("football-district21-2026.ts"));
  assert.ok(inventory.includes("football-district-game-week.ts"));
  assert.ok(inventory.includes("football-matchups.snapshot.json"));
  assert.ok(inventory.includes("aubrey-postseason-fixtures.snapshot.json"));
  assert.ok(inventory.includes('published&&p.reason'));
  assert.ok(inventory.includes("p.overdue"));
  assert.ok(researcher.includes('deferredFixtures'));
  assert.ok(researcher.includes('publication:false'));
  assert.ok(researcher.includes('news.google.com/rss/search'));
  assert.ok(researcher.includes('www.bing.com/news/search'));
});
test('verified future manual updates propagate into existing district routes',()=>{
  assert.ok(districtResolver.includes('for (const game of footballMatchups)'));
  assert.ok(districtResolver.includes("game.districtGame !== true"));
  assert.ok(districtResolver.includes("converted.status === 'final' && previous.status !== 'final'"));
});
