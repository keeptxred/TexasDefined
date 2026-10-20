import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../../.github/workflows/refresh-football-scores-brackets.yml', import.meta.url), 'utf8');
const importer = readFileSync(new URL('../data/refresh-football-matchups.mjs', import.meta.url), 'utf8');
const districtResolver = readFileSync(new URL('../../src/data/high-school-football/football-district-game-week.ts', import.meta.url), 'utf8');

test('scheduled football refresh never silently skips when no authorized score source exists', () => {
  assert.ok(!workflow.includes("if: ${{ github.event_name == 'pull_request' || vars.FOOTBALL_RESULTS_FEED_URL != '' }}"));
  assert.ok(workflow.includes("vars.FOOTBALL_RESULTS_FEED_URL == ''"));
  assert.ok(workflow.includes('gh issue create'));
  assert.ok(workflow.includes('exit 1'));
  assert.ok(workflow.includes('issues: write'));
  assert.ok(workflow.includes("cron: '13 11 * 8-12 *'"));
  assert.ok(workflow.includes("cron: '17 5 * 8-12 *'"));
});

test('verified score changes flow through protected PRs into every district resolver', () => {
  assert.ok(workflow.includes('gh pr create'));
  assert.ok(workflow.includes('gh pr merge "$branch" --repo "$GITHUB_REPOSITORY" --auto --squash'));
  assert.ok(workflow.includes('src/data/high-school-football/football-matchups.snapshot.json'));
  assert.ok(importer.includes('FOOTBALL_RESULTS_FEED_TOKEN'));
  assert.ok(importer.includes('Conflicting final score requires manual reconciliation'));
  assert.ok(districtResolver.includes('for (const game of footballMatchups)'));
  assert.ok(districtResolver.includes("converted.status === 'final' && previous.status !== 'final'"));
});
