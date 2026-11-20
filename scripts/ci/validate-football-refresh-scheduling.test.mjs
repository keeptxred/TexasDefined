import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const workflow=readFileSync(new URL('../../.github/workflows/refresh-football-scores-brackets.yml',import.meta.url),'utf8');
const research=readFileSync(new URL('../data/audit-football-sitewide-public-scores.mjs',import.meta.url),'utf8');
const importer=readFileSync(new URL('../data/refresh-football-matchups.mjs',import.meta.url),'utf8');
const districtResolver=readFileSync(new URL('../../src/data/high-school-football/football-district-game-week.ts',import.meta.url),'utf8');

test('sitewide football refresh is next-day research, not a paid-live-feed failure',()=>{
 assert.ok(workflow.includes("cron: '37 17 * 8-12 *'"));
 assert.ok(workflow.includes("cron: '37 17 * 1-7 6'"));
 assert.ok(workflow.includes('workflow_dispatch:'));
 assert.ok(workflow.includes('matrix:')&&workflow.includes('shard: [0,1,2,3,4,5,6,7]'));
 assert.ok(workflow.includes('node --experimental-strip-types scripts/data/audit-football-sitewide-public-scores.mjs --audit'));
 assert.ok(workflow.includes('node --experimental-strip-types scripts/data/audit-football-sitewide-public-scores.mjs --research'));
 assert.ok(workflow.includes('node --experimental-strip-types scripts/data/audit-football-sitewide-public-scores.mjs --summarize'));
 assert.ok(workflow.includes('gh issue create')&&workflow.includes('issues: write'));
 assert.ok(!workflow.includes('vars.FOOTBALL_RESULTS_FEED_URL'));
 assert.ok(!workflow.includes('FOOTBALL_RESULTS_FEED_TOKEN'));
 assert.ok(!workflow.includes('gh pr create')&&!workflow.includes('gh pr merge'));
 assert.ok(!workflow.includes('pull-requests: write'));
 assert.ok(research.includes('no live score polling')||research.includes('live score polling'));
 assert.ok(research.includes('UIL_FOOTBALL_PROGRAMS_2026'));
 assert.ok(research.includes('No paid feed, live-score polling'));
});

test('historical importer stays safety-bounded but is not called by the GitHub schedule',()=>{
 assert.ok(importer.includes('FOOTBALL_RESULTS_FEED_TOKEN'));
 assert.ok(importer.includes('Conflicting final score requires manual reconciliation'));
 assert.ok(importer.includes("game.phase === 'regular' && typeof game.districtGame !== 'boolean'"));
 assert.ok(importer.includes("game.districtGame === true && (!Number.isInteger(game.district)"));
 assert.ok(importer.includes("old.districtGame !== game.districtGame || old.district !== game.district"));
 assert.ok(districtResolver.includes('for (const game of footballMatchups)'));
 assert.ok(districtResolver.includes("game.districtGame !== true"));
 assert.ok(districtResolver.includes("converted.status === 'final' && previous.status !== 'final'"));
});
