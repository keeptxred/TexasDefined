import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const workflow=readFileSync('.github/workflows/refresh-football-scores-brackets.yml','utf8');
const importer=readFileSync('scripts/data/refresh-football-matchups.mjs','utf8');
const districtResolver=readFileSync('src/data/high-school-football/football-district-game-week.ts','utf8');
const researcher=readFileSync('scripts/data/research-football-pages-statewide.mjs','utf8');

test('one statewide job researches prior-game scores daily without paid or live provider connections',()=>{
  assert.ok(workflow.includes("cron: '37 17 * * 6'"));
  assert.ok(workflow.includes("cron: '37 17 * 8-12 0-5'"));
  assert.ok(workflow.includes('workflow_dispatch:'));
  assert.ok(workflow.includes('node scripts/data/research-football-pages-statewide.mjs --research'));
  assert.ok(workflow.includes('node --test scripts/data/validate-football-research-publication.test.mjs'));
  assert.ok(workflow.includes('issues: write'));
  assert.ok(workflow.includes('gh issue create'));
  assert.ok(workflow.includes('artifacts/football-statewide-research/'));
  assert.ok(!workflow.includes('FOOTBALL_RESULTS_FEED_URL'));
  assert.ok(!workflow.includes('FOOTBALL_RESULTS_FEED_TOKEN'));
  assert.ok(!workflow.includes('gh pr create'));
  assert.ok(!workflow.includes('gh pr merge'));
  assert.ok(!workflow.includes('pull-requests: write'));
});
test('live results publisher remains inactive; offline historical reconciliation safety contracts retained',()=>{
  assert.ok(importer.includes('FOOTBALL_RESULTS_FEED_TOKEN'));
  assert.ok(importer.includes('Conflicting final score requires manual reconciliation'));
  assert.ok(importer.includes("game.phase === 'regular' && typeof game.districtGame !== 'boolean'"));
  assert.ok(importer.includes("game.districtGame === true && (!Number.isInteger(game.district)"));
  assert.ok(importer.includes("old.districtGame !== game.districtGame || old.district !== game.district"));
  assert.ok(!workflow.includes('refresh-football-matchups.mjs'));
  assert.ok(researcher.includes('MAX_SEARCHES=180'));
  assert.ok(researcher.includes('parsePublicFootballRss'));
  assert.ok(districtResolver.includes('for (const game of footballMatchups)'));
  assert.ok(districtResolver.includes("game.districtGame !== true"));
  assert.ok(districtResolver.includes("converted.status === 'final' && previous.status !== 'final'"));
});
