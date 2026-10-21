import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { isProTeamHomeGame } from './pro-team-events.ts';
import { parseTeamSeason, selectMajorTeamUpdates } from './pro-team-season.ts';

const teams = JSON.parse(readFileSync(new URL('./pro-teams.json', import.meta.url)));
const now = new Date('2026-10-21T18:00:00Z');
test('13 distinct guides carry individual history, itineraries, official sources and venue relationships', () => {
  assert.equal(teams.length, 13);
  assert.equal(new Set(teams.map((team) => team.slug)).size, 13);
  assert.equal(new Set(teams.map((team) => team.weekend.join(''))).size, 13);
  assert.equal(new Set(teams.map((team) => team.history.join(''))).size, 13);
  for (const team of teams) {
    assert.equal(team.weekend.length, 3, team.name);
    assert.ok(team.history.join(' ').split(/\s+/).length >= 65, team.name);
    assert.ok(team.sources.length >= 2, team.name);
    assert.ok(team.faq.length >= 2, team.name);
    for (const url of [team.officialUrl, team.scheduleUrl, team.newsUrl, team.standingsUrl, ...team.sources.map((source) => source.url)]) assert.equal(new URL(url).protocol, 'https:');
  }
});
test('shared arenas do not turn concerts, opponent-only matches or parking passes into home games', () => {
  const mavs = teams.find((team) => team.slug === 'dallas-mavericks');
  const event = { title: 'Dallas Mavericks vs. Houston Rockets', category: 'sport', venueId: 'sports-venue:american-airlines-center', status: 'scheduled', startDate: '2026-11-01' };
  assert.ok(isProTeamHomeGame(event, mavs));
  assert.equal(isProTeamHomeGame({ ...event, title: 'Dallas Stars vs. New York Rangers' }, mavs), false);
  assert.equal(isProTeamHomeGame({ ...event, category: 'music' }, mavs), false);
  assert.equal(isProTeamHomeGame({ ...event, title: 'Dallas Mavericks Parking' }, mavs), false);
  assert.equal(isProTeamHomeGame({ ...event, venueId: 'sports-venue:toyota-center-houston' }, mavs), false);
  assert.equal(isProTeamHomeGame({ ...event, status: 'postponed' }, mavs), false);
  assert.equal(isProTeamHomeGame({ ...event, title: 'Dallas Mavericks Jr camp' }, mavs), false);
});
test('Wings preserve both arenas and the season-specific venue warning', () => {
  const wings = teams.find((team) => team.slug === 'dallas-wings');
  assert.deepEqual(wings.venues, ['college-park-center', 'american-airlines-center']);
  assert.match(wings.venueLabel, /2026.*2027/);
});
test('records never fabricate zeroes or select home-only results', () => {
  const names = ['Houston Texans'];
  const source = 'https://www.espn.com/nfl/team/_/id/34';
  assert.equal(parseTeamSeason({ team: { displayName: 'Dallas Cowboys' } }, names, source, now), null);
  assert.equal(parseTeamSeason({ team: { displayName: 'Houston Texans' } }, names, source, now), null);
  assert.equal(parseTeamSeason({ team: { displayName: 'Houston Texans', record: { items: [{ type: 'home', summary: '3-0' }] } } }, names, source, now), null);
  const result = parseTeamSeason({ season: { year: 2026 }, team: { displayName: 'Houston Texans', record: { items: [{ type: 'home', summary: '3-0' }, { type: 'total', summary: '5-2' }] }, standingSummary: '1st in AFC South' } }, names, source, now);
  assert.equal(result.record, '5-2'); assert.equal(result.season, '2026'); assert.equal(result.retrievedAt, now.toISOString());
});
test('major updates require exact team category, HTTPS ESPN source, recent date and no rumor language', () => {
  const item = { headline: 'Houston Texans acquire a veteran in trade', published: '2026-10-20T12:00:00Z', links: { web: { href: 'https://www.espn.com/nfl/story/_/id/1' } }, categories: [{ type: 'team', teamId: 34 }] };
  const result = selectMajorTeamUpdates([item, item, { ...item, categories: [{ type: 'team', teamId: 6 }] }, { ...item, headline: 'Houston Texans could trade for a star' }, { ...item, published: '2026-01-01' }, { ...item, published: '2027-01-01' }, { ...item, links: { web: { href: 'javascript:alert(1)' } } }], '34', now);
  assert.equal(result.length, 1); assert.equal(result[0].url, item.links.web.href);
});

test('soccer draws and NHL overtime losses retain their actual statistical meaning', () => {
  const team = { displayName: 'Houston Dash', record: { items: [{ type: 'total', summary: '8-6-14', stats: [{ name: 'wins', value: 8 }, { name: 'ties', value: 6 }, { name: 'losses', value: 14 }] }] } };
  const result = parseTeamSeason({ team }, ['Houston Dash'], 'https://www.espn.com/', now, 'soccer/usa.nwsl');
  assert.equal(result.record, '8–6–14'); assert.equal(result.recordLabel, 'Wins–draws–losses');
  const hockey = { displayName: 'Dallas Stars', record: { items: [{ type: 'total', summary: '4-1-2', stats: [{ name: 'wins', value: 4 }, { name: 'losses', value: 1 }, { name: 'OTLosses', value: 2 }] }] } };
  const stars = parseTeamSeason({ team: hockey }, ['Dallas Stars'], 'https://www.espn.com/', now, 'hockey/nhl');
  assert.equal(stars.record, '4–1–2'); assert.equal(stars.recordLabel, 'Wins–losses–overtime losses');
});
