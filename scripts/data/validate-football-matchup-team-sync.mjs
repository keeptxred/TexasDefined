// Focused, low-cost contract check. Do not crawl the 1,268 football profiles
// after a single sourced score change; verify this one profile and the curated feed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (name) => readFileSync(name, 'utf8');
const source = read('src/data/high-school-football/program-editorial.ts');
const identities = read('src/data/high-school-football/school-identities.ts');
const route = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const snapshot = JSON.parse(read('src/data/high-school-football/football-matchups.snapshot.json'));
const start = source.indexOf('  "alief-taylor": {');
const end = source.indexOf('  "alief-hastings": {', start);
assert.ok(start !== -1 && end > start, 'Alief Taylor editorial exists');
const block = source.slice(start, end).trim().replace(/,\s*$/, '');
const team = JSON.parse(block.slice(block.indexOf('{')));
const games = team.season.games;
assert.equal(games.length, 10, 'full 2026 Lions schedule');
assert.ok(games.every((game) => /^2026-\d\d-\d\d$/.test(game.date)), 'dates must be ISO to power next-game links');
assert.deepEqual(games.map((game) => game.date), [...games.map((game) => game.date)].sort(), 'schedule must be chronological');
assert.equal(games.find((game) => game.date === '2026-10-10').result, 'W 29–28');
assert.equal(games.find((game) => game.date === '2026-10-16').result, undefined, 'sourced matchup owns Memorial final, not a second hand-edited final');
const memorial = snapshot.games.find((game) => game.slug === '2026-10-16-houston-memorial-at-alief-taylor');
assert.equal(memorial?.status, 'final');
assert.equal(memorial.home.slug, 'alief-taylor');
assert.equal(memorial.homeScore, 18);
assert.equal(memorial.awayScore, 42);
assert.ok(memorial.resultSourceUrl?.startsWith('https://'), 'sourced final required');
const completed = games.map((game) => {
  if (game.date === memorial.date) return { ...game, result: 'L 18–42' };
  return game;
}).filter((game) => game.result);
assert.equal(completed.filter((game) => game.result.startsWith('W ')).length, 6);
assert.equal(completed.filter((game) => game.result.startsWith('L ')).length, 2);
assert.equal(completed.filter((game) => game.district && game.result.startsWith('W ')).length, 4);
assert.equal(completed.filter((game) => game.district && game.result.startsWith('L ')).length, 2);
assert.equal(games.find((game) => !game.result)?.date, '2026-10-16', 'the reconciler, not manually entered editorial, clears the last pending result');
assert.ok(source.includes("import { footballMatchups, footballMatchupPath } from './football-matchups';"), 'shared game source imported');
assert.ok(source.includes('matchupPath: footballMatchupPath(match)'), 'final results link back to matchup details');
assert.ok(source.includes("game.status === 'final'"), 'scheduled games must never be marked final');
assert.ok(route.includes('latestResult.matchupPath'), 'latest result is clickable');
assert.ok(route.includes('game.matchupPath'), 'schedule table has sourced matchup links');
assert.ok(identities.includes("colors: 'Red, Navy and White'"), 'identity must reflect sourced school colors');
assert.ok(team.theme.accentHex !== '#315F4D', 'unsourced green Lions accent removed');
assert.ok(!team.overview.some((line) => line.includes('Upcoming Stratford') || line.includes('5–1 overall and 3–1')), 'no stale game copy');
console.log('Alief Taylor: verified finals, schedule, links, school colors, and snapshot reconciliation contract OK');
