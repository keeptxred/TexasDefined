import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DISTRICT_5_2026_GAMES} from '../../src/data/high-school-football/football-district5-2026.ts';
import {DISTRICT_21_2026_GAMES} from '../../src/data/high-school-football/football-district21-2026.ts';
import {DISTRICT_11_2026_GAMES} from '../../src/data/high-school-football/football-district11-2026.ts';
import {applyVerifiedDistrictFinalsToTeam} from '../../src/data/high-school-football/football-team-season-overlay.ts';

const rows=[
  ['District 5',DISTRICT_5_2026_GAMES,28],
  ['District 21',DISTRICT_21_2026_GAMES,28],
  ['District 11',DISTRICT_11_2026_GAMES,21],
];
test('three independently researched districts have all league finals and dated external sources',()=>{
  for(const [label,games,expected] of rows){
    assert.equal(games.length,expected,label);
    assert.equal(games.filter(x=>x.status==='final').length,expected,label);
    assert.equal(new Set(games.map(x=>[x.away,x.home].sort().join('|'))).size,expected,label+' repeat games');
    assert.ok(games.every(x=>x.verifiedAt==='2026-11-20'),label);
    assert.ok(games.every(x=>x.resultSourceUrl?.startsWith('https://')),label);
    assert.ok(games.every(x=>Number.isInteger(x.awayScore)&&Number.isInteger(x.homeScore)&&x.awayScore!==x.homeScore),label);
  }
});
test('cited November finals preserve score orientation for every club',()=>{
  const look=(data,date,away,home)=>{
    const g=data.find(x=>x.date===date&&x.away===away&&x.home===home);
    assert.ok(g,date+' '+away+' at '+home);return [g.awayScore,g.homeScore];
  };
  assert.deepEqual(look(DISTRICT_5_2026_GAMES,'2026-11-05','Lewisville','Little Elm'),[41,14]);
  assert.deepEqual(look(DISTRICT_5_2026_GAMES,'2026-10-23','Frisco Wakeland','Denton Braswell'),[31,28]);
  assert.deepEqual(look(DISTRICT_21_2026_GAMES,'2026-11-06','Fort Bend Hightower','Fort Bend Ridge Point'),[14,26]);
  assert.deepEqual(look(DISTRICT_21_2026_GAMES,'2026-11-05','Fort Bend Elkins','Fort Bend Austin'),[44,20]); // Houston Chronicle + SI / CFISD reporting; a MaxPreps scoreboard conflicts.
  assert.deepEqual(look(DISTRICT_21_2026_GAMES,'2026-10-30','Fort Bend Ridge Point','Fort Bend Travis'),[56,0]);
  assert.deepEqual(look(DISTRICT_11_2026_GAMES,'2026-11-06','West Columbia Columbia','Royal'),[36,14]);
  assert.deepEqual(look(DISTRICT_11_2026_GAMES,'2026-10-30','Bay City','West Columbia Columbia'),[42,0]);
});
test('team profile receives all verified district results and derived partial district-only record',()=>{
  const result=applyVerifiedDistrictFinalsToTeam(null,'lewisville','Lewisville',DISTRICT_5_2026_GAMES);
  assert.ok(result?.season);
  assert.equal(result.season.games.length,7);
  assert.ok(result.season.record.includes('7–0'));
  assert.ok(result.season.record.includes('full overall record not verified'));
  assert.ok(result.season.games.every(x=>x.district));
  const row=result.season.games.find(x=>x.date==='2026-11-05');
  assert.equal(row?.result,'W 41–14');
  assert.equal(row?.opponent,'Little Elm');
});
test('preserve original sourced finals if another publisher reports a contradictory score',()=>{
  const editorial={slug:'lewisville',overview:[],faq:[],season:{
    games:[{date:'2026-11-05',opponent:'Little Elm',site:'Away',result:'W 40–14',district:true}],
    record:'1–0',recordLabel:'Historical source',verifiedAt:'2026-11-06',
    sourceUrl:'https://example.org/source',sourceLabel:'Editorial source'
  }};
  const outcome=applyVerifiedDistrictFinalsToTeam(editorial,'lewisville','Lewisville',DISTRICT_5_2026_GAMES);
  assert.equal(outcome.season.games.find(x=>x.date==='2026-11-05')?.result,'W 40–14');
  assert.equal(outcome.season.games.length,7);
  assert.ok(outcome.season.latestResultSourceUrl.startsWith('https://'));
  const other=applyVerifiedDistrictFinalsToTeam(editorial,'fake','Imaginary School',DISTRICT_5_2026_GAMES);
  assert.equal(other,editorial);
});
test('team and district routes accurately mark past fixtures as unverified, not future',()=>{
  const team=readFileSync('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
  const district=readFileSync('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx','utf8');
  const d16=readFileSync('src/components/sports/District16Coverage.tsx','utf8');
  const server=readFileSync('src/data/high-school-football/football-program-profile.server.ts','utf8');
  assert.ok(team.includes('overdueUnverifiedGames'));
  assert.ok(team.includes('Final not yet verified'));
  assert.ok(!team.includes('Live scores & schedule links'));
  assert.ok(district.includes('pastUnverifiedGames')&&district.includes('Past games awaiting final-score verification'));
  assert.ok(d16.includes('data-football-district16-postseason-verified')&&d16.includes('shared champions'));
  assert.ok(server.includes('applyVerifiedDistrictFinalsToTeam('));
});
