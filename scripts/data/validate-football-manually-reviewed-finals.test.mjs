import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT,inventory} from './inventory-statewide-football-scores.mjs';

const reviewed=JSON.parse(readFileSync(join(ROOT,'src/data/high-school-football/football-manually-verified-finals-2026.snapshot.json'),'utf8'));
const rows=reviewed.verifiedFinals;
const bySlug=new Map(rows.filter(row=>row.date==='2026-11-06').map(row=>[row.slug,row]));
const byFixture=new Map(rows.map(row=>[row.slug+'|'+row.date,row]));

test('all manually reviewed 2026 results have explicit editorial authority and independent source hosts',()=>{
  assert.equal(reviewed.schemaVersion,1);
  assert.equal(reviewed.season,'2026');
  assert.ok(rows.length>=26);
  assert.equal(byFixture.size,rows.length);
  for(const row of rows){
    assert.match(row.date,/^2026-\d{2}-\d{2}$/);
    assert.match(row.verifiedAt,/^2026-\d{2}-\d{2}$/);
    assert.ok(row.verifiedAt>=row.date);
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
  assert.ok(!alvarado?.overdue.some(g=>g.date==='2026-10-30'),
    'Separate Oct30 Aubrey game now has reviewed Alvarado editorial coverage');
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


test('November 21 source-verified corrections preserve team-side orientation',()=>{
  assert.deepEqual([byFixture.get('alvarado|2026-10-30').pointsFor,byFixture.get('alvarado|2026-10-30').pointsAgainst],[40,70]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-10-30').pointsFor,byFixture.get('arlington-lamar|2026-10-30').pointsAgainst],[28,7]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-11-06').pointsFor,byFixture.get('arlington-lamar|2026-11-06').pointsAgainst],[3,28]);
  assert.deepEqual([byFixture.get('baytown-lee|2026-11-06').pointsFor,byFixture.get('baytown-lee|2026-11-06').pointsAgainst],[7,28]);
  assert.deepEqual([byFixture.get('beaumont-west-brook|2026-11-06').pointsFor,byFixture.get('beaumont-west-brook|2026-11-06').pointsAgainst],[62,21]);
});

test('written October and November dates cannot be classified as upcoming on November 21',async()=>{
  const {footballFixtureCalendarDate,footballFixtureCalendarStatus}=await import('../../src/data/high-school-football/football-fixture-calendar.ts');
  for(const date of ['Oct. 9','Sept. 25','Nov. 6','Nov 6, 2026','2026-11-06']) assert.equal(footballFixtureCalendarStatus(date,'2026-11-21'),'past',date);
  assert.equal(footballFixtureCalendarStatus('Nov. 27','2026-11-21'),'future-or-today');
  assert.equal(footballFixtureCalendarDate('Feb. 30'),null);
  assert.equal(footballFixtureCalendarStatus('TBD','2026-11-21'),'unknown');
  const route=readFileSync(join(ROOT,'src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'),'utf8');
  assert.ok(route.includes("footballFixtureCalendarStatus(game.date, todayTexas) === 'future-or-today'"));
  assert.ok(route.includes("footballFixtureCalendarStatus(game.date, todayTexas) === 'past'"));
  assert.ok(!route.includes('game.date >= todayTexas')&&!route.includes('game.date < todayTexas'));
});

test('November 21 completed four regular-season scorecards match independently reported October finals',()=>{
  assert.deepEqual([byFixture.get('alvarado|2026-10-09').pointsFor,byFixture.get('alvarado|2026-10-09').pointsAgainst],[70,24]);
  assert.deepEqual([byFixture.get('alvarado|2026-10-16').pointsFor,byFixture.get('alvarado|2026-10-16').pointsAgainst],[28,51]);
  assert.deepEqual([byFixture.get('alvarado|2026-10-23').pointsFor,byFixture.get('alvarado|2026-10-23').pointsAgainst],[31,51]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-10-09').pointsFor,byFixture.get('arlington-lamar|2026-10-09').pointsAgainst],[28,35]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-10-16').pointsFor,byFixture.get('arlington-lamar|2026-10-16').pointsAgainst],[26,17]);
  assert.deepEqual([byFixture.get('arlington-lamar|2026-10-23').pointsFor,byFixture.get('arlington-lamar|2026-10-23').pointsAgainst],[29,57]);
  assert.deepEqual([byFixture.get('baytown-lee|2026-10-15').pointsFor,byFixture.get('baytown-lee|2026-10-15').pointsAgainst],[35,14]);
  assert.deepEqual([byFixture.get('baytown-lee|2026-10-23').pointsFor,byFixture.get('baytown-lee|2026-10-23').pointsAgainst],[44,35]);
  assert.deepEqual([byFixture.get('baytown-lee|2026-10-30').pointsFor,byFixture.get('baytown-lee|2026-10-30').pointsAgainst],[6,50]);
  assert.deepEqual([byFixture.get('beaumont-west-brook|2026-10-16').pointsFor,byFixture.get('beaumont-west-brook|2026-10-16').pointsAgainst],[28,14]);
  assert.deepEqual([byFixture.get('beaumont-west-brook|2026-10-23').pointsFor,byFixture.get('beaumont-west-brook|2026-10-23').pointsAgainst],[55,7]);
  assert.deepEqual([byFixture.get('beaumont-west-brook|2026-10-30').pointsFor,byFixture.get('beaumont-west-brook|2026-10-30').pointsAgainst],[14,24]);
});


test('November 6 independently cross-checked statewide final scores retain correct team perspective and opponent',()=>{
  for(const [slug,opponent,pointsFor,pointsAgainst] of [
  [
    "altair-rice",
    "Van Vleck",
    39,
    13
  ],
  [
    "alto",
    "Cross Roads",
    76,
    60
  ],
  [
    "alvin",
    "Pasadena Dobie",
    10,
    16
  ],
  [
    "andrews",
    "Plainview",
    40,
    42
  ],
  [
    "angleton",
    "Victoria East",
    59,
    13
  ],
  [
    "anton",
    "Hart",
    40,
    76
  ],
  [
    "aquilla",
    "Abbott",
    76,
    30
  ],
  [
    "aransas-pass",
    "Goliad",
    21,
    28
  ],
  [
    "archer-city",
    "Electra",
    60,
    0
  ],
  [
    "bandera",
    "Cuero",
    7,
    63
  ],
  [
    "bangs",
    "Johnson City",
    27,
    28
  ],
  [
    "barksdale-nueces-canyon",
    "Leakey",
    26,
    15
  ],
  [
    "bartlett",
    "Holland",
    28,
    20
  ],
  [
    "bastrop-cedar-creek",
    "Lockhart",
    7,
    49
  ],
  [
    "beckville",
    "Elysian Fields",
    64,
    13
  ],
  [
    "bells",
    "Callisburg",
    54,
    6
  ],
  [
    "bellville",
    "Brazosport",
    63,
    26
  ],
  [
    "belton",
    "Brenham",
    7,
    35
  ],
  [
    "ben-bolt-palito-blanco",
    "Agua Dulce",
    64,
    55
  ],
  [
    "benavides",
    "Runge",
    0,
    48
  ],
  [
    "benjamin",
    "Rule",
    50,
    44
  ],
  [
    "big-sandy",
    "Linden-Kildare",
    47,
    34
  ],
  [
    "big-sandy-harmony",
    "Prairiland",
    28,
    35
  ],
  [
    "big-spring",
    "Snyder",
    48,
    6
  ],
  [
    "bishop",
    "San Diego",
    35,
    29
  ],
  [
    "blanco",
    "Comfort",
    74,
    29
  ],
  [
    "blanket",
    "Gustine",
    8,
    62
  ],
  [
    "bloomington",
    "Ganado",
    14,
    56
  ],
  [
    "boerne",
    "Liberty Hill Legacy Ranch",
    32,
    27
  ],
  [
    "boerne-champion",
    "Manor",
    49,
    7
  ],
  [
    "bogata-rivercrest",
    "Cooper",
    3,
    48
  ],
  [
    "boling",
    "El Maton Tidehaven",
    21,
    28
  ],
  [
    "bosqueville",
    "Riesel",
    24,
    12
  ],
  [
    "bovina",
    "Vega",
    34,
    49
  ],
  [
    "bowie",
    "Boyd",
    42,
    17
  ],
  [
    "bowie-gold-burg",
    "Harrold",
    31,
    80
  ],
  [
    "boyd",
    "Bowie",
    17,
    42
  ],
  [
    "brackettville-brackett",
    "Center Point",
    49,
    14
  ],
  [
    "brady",
    "San Saba",
    14,
    21
  ],
  [
    "breckenridge",
    "Henrietta",
    35,
    64
  ],
  [
    "bremond",
    "Chilton",
    47,
    36
  ],
  [
    "brenham",
    "Belton",
    35,
    7
  ],
  [
    "bridgeport",
    "Burkburnett",
    7,
    56
  ],
  [
    "brock",
    "Mineral Wells",
    56,
    3
  ],
  [
    "bronte",
    "Robert Lee",
    34,
    84
  ],
  [
    "brownsboro",
    "Madisonville (Senior Night)",
    14,
    51
  ],
  [
    "brownsville-veterans-memorial",
    "PSJA North",
    14,
    42
  ],
  [
    "brownwood",
    "Salado",
    44,
    20
  ],
  [
    "bruceville-eddy",
    "Thorndale",
    0,
    47
  ],
  [
    "bruni",
    "Medina",
    0,
    68
  ],
  [
    "bryan-rudder",
    "Killeen Ellison",
    18,
    55
  ],
  [
    "bryson",
    "Newcastle",
    0,
    66
  ],
  [
    "buckholts",
    "Calvert",
    38,
    57
  ],
  [
    "buda-johnson",
    "Austin Bowie",
    0,
    31
  ],
  [
    "bullard",
    "Pine Tree",
    14,
    42
  ],
  [
    "burkburnett",
    "Bridgeport",
    56,
    7
  ],
  [
    "burleson",
    "Joshua",
    34,
    68
  ],
  [
    "burnet",
    "Jarrell",
    21,
    69
  ],
  [
    "burton",
    "Somerville",
    58,
    29
  ],
  [
    "bushland",
    "Dalhart",
    40,
    0
  ],
  [
    "bynum",
    "Trinidad",
    0,
    48
  ],
  [
    "caldwell",
    "Rockdale",
    14,
    42
  ],
  [
    "callisburg",
    "Bells",
    6,
    54
  ],
  [
    "calvert",
    "Buckholts",
    57,
    38
  ],
  [
    "cameron-yoe",
    "Lorena",
    14,
    64
  ],
  [
    "canadian",
    "River Road",
    59,
    0
  ],
  [
    "canutillo",
    "El Paso",
    42,
    0
  ],
  [
    "canyon",
    "Dumas",
    33,
    31
  ],
  [
    "canyon-randall",
    "Hereford",
    45,
    13
  ],
  [
    "shamrock",
    "Wheeler",
    6,
    52
  ]
]){
    const actual=byFixture.get(slug+'|2026-11-06');
    assert.ok(actual,slug);
    assert.deepEqual([actual.opponent,actual.pointsFor,actual.pointsAgainst],[opponent,pointsFor,pointsAgainst],slug);
  }
});


test('October 30 source-verified finals preserve authored opponent and team orientation',()=>{
  for(const [slug,opponent,pointsFor,pointsAgainst] of [["allen","McKinney Boyd",56,14],["altair-rice","Tidehaven",35,14],["alvin","Brazoswood",21,44],["alvin-shadow-creek","Pearland",55,35],["alvord","Nocona",37,7],["amarillo","Lubbock",63,0],["amarillo-highland-park","Sanford-Fritch",54,30],["amarillo-river-road","Childress",14,61],["amarillo-tascosa","Abilene",21,28],["anderson-shiro","Thrall",0,20],["angleton","Richmond Randle",22,29],["anson","Hawley",19,14],["anthony","Alpine",14,33],["arlington-houston","Aledo",0,61],["arlington-martin","Arlington High",41,31],["ballinger","Sonora",41,42],["bandera","Navarro",24,6],["bangs","San Saba",13,20],["barksdale-nueces-canyon","Medina",6,52],["bartlett","Milano",58,8],["bastrop","Elgin",51,0],["baytown-goose-creek-memorial","Ball",42,10],["beaumont-united","Port Arthur Memorial",6,56],["beckville","Union Grove",50,0],["bells","Leonard",42,14],["bellville","La Marque",45,27],["ben-bolt-palito-blanco","La Villa",28,57],["benavides","Westhoff Academy",34,0],["big-lake-reagan-co","Ozona",16,34],["big-sandy-harmony","Grand Saline",21,45],["blackwell","Loraine",60,8],["blanket","Zephyr",38,83],["blooming-grove","Corsicana Mildred",0,63],["blum","Covington",21,51],["boerne","New Braunfels",28,17],["boerne-champion","Austin McCallum",61,0],["bogata-rivercrest","Honey Grove",10,51],["boling","East Bernard",0,28],["bonham","Sunnyvale",15,69],["booker","Wildorado",58,14],["borden-county","Ira",46,0],["borger","Perryton",21,54],["bosqueville","Italy",28,35],["bowie-gold-burg","Forestburg",57,12],["boyd","Vernon",29,34],["boys-ranch","White Deer",32,24],["brackettville-brackett","La Pryor",36,14],["brady","Mason",0,48],["breckenridge","Merkel",6,14],["bremond","Holland",61,16],["brenham","Killeen Ellison",24,13],["bridge-city","Little Cypress–Mauriceville",7,28],["bridgeland","Waller",34,10],["bridgeport","Iowa Park",0,62],["brock","Graham",59,7],["bronte","Santa Anna",34,30],["brookesmith","Cherokee",0,46],["brownfield","Bushland",6,62],["brownsboro","Rusk",14,44],["brownsville-hanna","Corpus Christi Flour Bluff",21,52],["brownsville-lopez","Mercedes",14,56],["brownsville-pace","Gregory-Portland",0,64],["brownsville-rivera","Harlingen South",28,49],["brownsville-veterans-memorial","Los Fresnos",0,43],["brownwood","Waco Connally",66,7],["bruceville-eddy","Granger",0,42],["bruni","Knippa",0,46],["bryan","Temple",21,49],["bryan-rudder","Waco",20,48],["buckholts","High Island",63,18],["buffalo","Elkhart",54,48],["bullard","Jacksonville",37,44],["buna","Kirbyville",21,17],["burkburnett","Mineral Wells",21,41],["burkeville","Leverett's Chapel",54,70],["burleson-centennial","Mansfield Summit",23,40],["burnet","Stephenville",14,51],["burton","Chilton",33,39],["bushland","Brownfield",62,6],["bynum","Mount Calm",6,61],["caddo-mills","Sulphur Springs",31,35],["caldwell","Cameron Yoe",14,48],["callisburg","Valley View",12,7],["cameron-yoe","Caldwell",48,14],["canton","Madisonville",42,31],["canyon","Pampa",51,17],["canyon-randall","West Plains",39,21]]){
    const actual=byFixture.get(slug+'|2026-10-30');
    assert.ok(actual,slug);
    assert.deepEqual([actual.opponent,actual.pointsFor,actual.pointsAgainst],[opponent,pointsFor,pointsAgainst],slug);
  }
});
