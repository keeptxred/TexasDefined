import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');
const profile = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const panel = read('src/components/sports/FootballGameNightGuide.tsx');
const functions = read('src/data/sports-sponsorship.functions.ts');
const sponsorServer = read('src/data/sports-sponsorship.server.ts');
const migration = read('supabase/migrations/20261017030000_extend_sports_sponsor_football_team_surfaces.sql');

test('football game-night guide is part of existing profile with notice guard', () => {
  assert.match(profile, /import \{ FootballGameNightGuide \} from/);
  assert.match(profile, /!editorial\?\.notice && \(editorial\?\.schedule/);
  assert.match(profile, /<FootballGameNightGuide/);
  assert.match(profile, /schoolWebsite=\{program\?\.schoolWebsite\}/);
});

test('game-night panel uses sourced schedules and cannot invent times or ticket availability', () => {
  assert.match(panel, /!game\.result/);
  assert.match(panel, /America\/Chicago/);
  assert.match(panel, /Schedule snapshot checked/);
  assert.match(panel, /confirm.*directly before you travel/i);
  assert.match(panel, /Verify schedule and results/);
  assert.doesNotMatch(panel, /Buy tickets now|Tickets available|Tickets from \$/i);
  assert.match(panel, /not official school merchandise/i);
});

test('first-party action tracking respects existing automation and shop analytics', () => {
  assert.match(panel, /trackTexasDefinedOutcome/);
  assert.match(panel, /next_step_selected/);
  assert.match(panel, /shop_navigation_clicked/);
  assert.match(panel, /high-school-football-game-night/);
  assert.doesNotMatch(panel, /localStorage|sessionStorage|sendBeacon/);
});

test('team sponsorship paths are staged but no launch hold is bypassed', () => {
  const allowed = /^\/(?:sports-venues|sports-venue\/[a-z0-9-]+|texas-high-school-football-teams\/[a-z0-9-]+)$/;
  for (const path of [
    '/sports-venues',
    '/sports-venue/eagle-stadium-allen',
    '/texas-high-school-football-teams/southlake-carroll',
    '/texas-high-school-football-teams/aledo',
  ]) assert.equal(allowed.test(path), true, path);
  for (const path of [
    '/texas-high-school-football-teams/../../admin',
    '/texas-high-school-football-teams/',
    '/texas-high-school-football-teams/fake?redirect=x',
  ]) assert.equal(allowed.test(path), false, path);

  assert.match(functions, /texas-high-school-football-teams/);
  assert.match(migration, /texas-high-school-football-teams/);
  assert.match(migration, /DROP CONSTRAINT IF EXISTS texasdefined_sports_sponsor_placements_surface_path_check/);
  assert.match(migration, /ADD CONSTRAINT texasdefined_sports_sponsor_placements_surface_path_check/);
  assert.match(sponsorServer, /export const SPORTS_SPONSOR_OUTREACH_HOLD = true/);
  assert.match(sponsorServer, /if \(SPORTS_SPONSOR_OUTREACH_HOLD\) return null/);
});
