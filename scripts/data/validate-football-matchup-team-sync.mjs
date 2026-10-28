// Focused, low-cost contract check. Do not crawl the 1,268 football profiles
// after a single sourced score change; verify this one profile and the curated feed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (name) => readFileSync(name, 'utf8');
const source = read('src/data/high-school-football/program-editorial.ts');
const overlay = read('src/data/high-school-football/football-team-season-overlay.ts');
const profileServer = read('src/data/high-school-football/football-program-profile.server.ts');
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
assert.equal(memorial?.districtGame, true, 'Memorial–Taylor is explicitly marked as a district contest');
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
assert.ok(!source.includes("footballMatchups"), 'base editorial registry must not own the runtime matchup overlay');
assert.ok(profileServer.includes("import { footballMatchups } from './football-matchups';"), 'profile server must load the verified matchup snapshot');
assert.ok(profileServer.includes("import { applyFootballMatchupSnapshot } from './football-team-season-overlay';"), 'profile server must use the shared matchup overlay');
assert.ok(profileServer.includes("applyFootballMatchupSnapshot(aubreyAdjustedEditorial, canonicalSlug, footballMatchups)"), 'overlay must run after authored shard and Aubrey precedence');
assert.ok(overlay.includes("editorial ?? { slug: teamSlug, overview: [], faq: [] }"), 'snapshot-only teams must receive a minimal season container');
assert.ok(overlay.includes("recordLabel: 'Verified snapshot record'"), 'partial snapshot record must be labeled honestly');
assert.ok(overlay.includes("game.result && row.result && game.result !== row.result"), 'conflicting authored finals must be preserved for reconciliation');
assert.ok(overlay.includes("game.status !== 'final'"), 'scheduled games must never be converted to finals');
assert.ok(overlay.includes("matchupPath: '/texas-high-school-football-matchups/' + game.slug"), 'snapshot rows must link back to matchup details');
assert.ok(!source.includes('  "houston-memorial": {'), 'Houston Memorial intentionally exercises the no-authored-editorial overlay path');
assert.ok(snapshot.games.some((game) => game.home.slug === 'houston-memorial' || game.away.slug === 'houston-memorial'), 'snapshot must contain a Houston Memorial game');
assert.ok(route.includes("editorial.season.recordLabel || 'Record when checked'"), 'team profile must expose partial-record labeling');
assert.ok(route.includes("editorial?.overview?.length ? <section"), 'snapshot-only editorial containers must not create empty overview sections');
assert.ok(route.includes('latestResult.matchupPath'), 'latest result is clickable');
assert.ok(route.includes('game.matchupPath'), 'schedule table has sourced matchup links');
assert.ok(identities.includes("colors: 'Red, Navy and White'"), 'identity must reflect sourced school colors');
assert.ok(team.theme.accentHex !== '#315F4D', 'unsourced green Lions accent removed');
assert.ok(!team.overview.some((line) => line.includes('Upcoming Stratford') || line.includes('5–1 overall and 3–1')), 'no stale game copy');
// Past, unconfirmed fixtures must not be promoted into future kickoffs,
// reported finals or EventCompleted schema. Keep unknown results unknown.
const sourceMatchup = read('src/data/high-school-football/football-matchups.ts');
const listMatchup = read('src/routes/texas-high-school-football-matchups.tsx');
const detailMatchup = read('src/routes/texas-high-school-football-matchups_.$slug.tsx');
const oct23Game = snapshot.games.find((g) => g.slug === '2026-10-23-houston-lamar-at-houston-memorial');
assert.equal(oct23Game?.status, 'scheduled', 'the example has no verified final; never manufacture one');
assert.ok(Date.parse('2026-10-28T12:00:00Z') >=
  Date.parse(oct23Game.date + 'T00:00:00Z') + 48 * 60 * 60 * 1000,
  'fixture is genuinely past, beyond the Texas/UTC date-change safety buffer');
assert.ok(sourceMatchup.includes("if (game.status === 'final') return false;"),
  'a sourced final must never be reclassified as unconfirmed');
assert.ok(sourceMatchup.includes("nowMillis >= startOfDateUtc + 48 * 60 * 60 * 1000"),
  'avoid calling a Texas Friday-night kickoff past prematurely');
assert.ok(listMatchup.includes("'Past fixture · final not verified'") &&
  listMatchup.includes('footballMatchupIsPastUnconfirmed(game)'),
  'past unconfirmed fixture must not be advertised as scheduled in the list');
assert.ok(detailMatchup.includes("'Past fixture · no verified final'") &&
  detailMatchup.includes("'Game date passed; no final verified.'"),
  'individual matchup title/meta and body must say the final is not verified');
assert.ok(detailMatchup.includes("eventStatus: 'https://schema.org/EventCompleted'") &&
  detailMatchup.includes("eventStatus: 'https://schema.org/EventScheduled'") &&
  detailMatchup.includes("? {} // The outcome is unknown"),
  'schema may say completed only for sourced finals, not unverified past fixtures');
console.log('Alief Taylor: verified finals, schedule, links, school colors, and snapshot reconciliation contract OK');
