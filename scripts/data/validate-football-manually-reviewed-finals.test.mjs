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
    if(row.outcome!==undefined){assert.ok(['forfeit-win','forfeit-loss','not-played','score-disputed-win'].includes(row.outcome));assert.equal(row.pointsFor,undefined);assert.equal(row.pointsAgainst,undefined);}else{assert.ok(Number.isInteger(row.pointsFor)&&Number.isInteger(row.pointsAgainst));assert.ok(row.pointsFor>=0&&row.pointsAgainst>=0&&row.pointsFor!==row.pointsAgainst);}
    if(row.playedDate){assert.match(row.playedDate,/^2026-\d{2}-\d{2}$/);assert.ok(row.playedDate<=row.verifiedAt);}
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
    if(row.outcome==='score-disputed-win')continue;
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
    "if (game.result && game.result.replace(", "if (!found.has(row.date))",
    "Partial 2026 scorecard from independently verified final results",
    "verifiedAt:mostRecent.verifiedAt",
  ])assert.ok(overlay.includes(mark),mark);
  assert.ok(!overlay.includes('fetch('),'No live score scraping or publication at render time');
});




test('November 24 postseason catch-up covers omitted fixtures without publishing future finals',()=>{
 const expected=[['allen',12,0,7,0],['austin-westlake',11,1,6,0],['angleton',11,1,7,1],['amarillo',11,1,7,0],['belton',8,4,4,1]];
 const authored=readFileSync(join(ROOT,'src/data/high-school-football/program-editorial.ts'),'utf8');
 const dates={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Sept:'09',Oct:'10',Nov:'11',Dec:'12'};
 const iso=s=>{if(/^2026-/.test(s))return s;const m=/^([A-Za-z]+)\.? (\d+)$/.exec(s);assert.ok(m,s);return '2026-'+dates[m[1]]+'-'+m[2].padStart(2,'0')};
 for(const [slug,w,l,dw,dl] of expected){
  const key='  "'+slug+'": ';
  const start=authored.indexOf(key),end=authored.indexOf('\n  },',start)+4;
  assert.ok(start>=0&&end>start,slug);
  const team=JSON.parse(authored.slice(start+key.length,end));
  let wins=0,losses=0,districtWins=0,districtLosses=0;
  for(const g of team.season.games){const r=byFixture.get(slug+'|'+iso(g.date));const result=r?(r.pointsFor>r.pointsAgainst?'W':'L'):g.result?.[0];if(iso(g.date)>'2026-11-24'){assert.equal(result,undefined,slug+' future score');continue;}assert.ok(result==='W'||result==='L',slug+' '+g.date);if(result==='W'){wins++;if(g.district)districtWins++;}else{losses++;if(g.district)districtLosses++;}}
  assert.deepEqual([wins,losses,districtWins,districtLosses],[w,l,dw,dl],slug);
 }
 const state=inventory({today:'2026-11-24'});
 for(const [slug] of expected)assert.ok(!state.pages.find(p=>p.page.endsWith('/'+slug))?.overdue.length,slug);
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


test("October 9, 16 and 23 manually corroborated finals preserve exact editorial fixture keys", () => {
  for (const [slug,date,opponent,pf,pa] of [["all-saints-fort-worth","2026-10-23","Midland Christian",70,39],["allen","2026-10-23","Dallas Jesuit",77,14],["altair-rice","2026-10-23","East Bernard",27,35],["alvin","2026-10-23","Shadow Creek",0,59],["alvin-shadow-creek","2026-10-23","Alvin",59,0],["alvord","2026-10-23","Tioga",7,50],["amarillo-caprock","2026-10-23","Tascosa",8,28],["amarillo-highland-park","2026-10-23","Panhandle",6,69],["amarillo-palo-duro","2026-10-23","Wichita Falls Memorial",35,21],["amarillo-river-road","2026-10-23","Dimmitt",13,50],["amarillo-tascosa","2026-10-23","Caprock",28,8],["anderson-shiro","2026-10-23","Florence",55,0],["andrews","2026-10-23","Midland Greenwood",7,45],["angleton","2026-10-23","Friendswood",28,21],["anson","2026-10-23","De Leon",21,45],["anthony","2026-10-23","San Angelo Grape Creek",0,64],["anton","2026-10-23","Lazbuddie",64,31],["aquilla","2026-10-23","Coolidge",66,14],["aransas-pass","2026-10-23","Mathis",46,60],["archer-city","2026-10-23","Seymour",28,56],["arlington-houston","2026-10-23","Granbury",16,28],["arlington-martin","2026-10-23","Arlington Lamar",57,29],["arlington-seguin","2026-10-23","Corsicana",24,0],["austin-westlake","2026-10-23","Lake Travis",38,17],["ballinger","2026-10-23","Christoval",61,28],["bandera","2026-10-23","San Antonio Memorial",52,20],["bangs","2026-10-23","Brady",36,21],["banquete","2026-10-23","Monte Alto",52,0],["barksdale-nueces-canyon","2026-10-23","Prairie Lea",52,0],["bastrop","2026-10-23","Navarro",65,0],["bastrop-cedar-creek","2026-10-23","Lehman",7,59],["bay-city","2026-10-23","Needville",45,7],["baytown-goose-creek-memorial","2026-10-23","Lufkin",28,21],["baytown-sterling","2026-10-23","Port Arthur Memorial",0,16],["beaumont-united","2026-10-23","La Porte",27,56],["beeville-jones","2026-10-23","Calallen",7,49],["bells","2026-10-23","Howe",35,6],["bellville","2026-10-23","La Grange",55,27],["belton","2026-10-23","Ellison",57,48],["ben-bolt-palito-blanco","2026-10-23","Kaufer",84,19],["big-lake-reagan-co","2026-10-23","Sonora",44,52],["big-sandy","2026-10-23","Clarksville",14,50],["big-spring","2026-10-23","Monahans",0,38],["bishop","2026-10-23","Santa Gertrudis Academy",38,20],["blackwell","2026-10-23","Valera Panther Creek",94,6],["blanco","2026-10-23","San Antonio Young Men's Leadership Academy",64,0],["blooming-grove","2026-10-23","Rice",8,67],["blue-ridge","2026-10-23","Callisburg",38,44],["boerne","2026-10-23","San Antonio Veterans Memorial",49,7],["boerne-champion","2026-10-23","Smithson Valley",24,35],["boling","2026-10-23","Wallis Brazos",21,17],["borden-county","2026-10-23","Lamesa Klondike",62,16],["borger","2026-10-23","Levelland",18,41],["bosqueville","2026-10-23","Axtell",0,52],["bowie","2026-10-23","Vernon",14,35],["boyd","2026-10-23","Paradise",7,57],["boys-ranch","2026-10-23","Claude",40,22],["brackettville-brackett","2026-10-23","D'Hanis",40,26],["brady","2026-10-23","Bangs",21,36],["breckenridge","2026-10-23","Holliday",34,35],["brenham","2026-10-23","Waco",43,7],["bridge-city","2026-10-23","Liberty",55,28],["bridgeland","2026-10-23","Cypress Park",59,7],["bridgeport","2026-10-23","Mineral Wells",7,36],["brock","2026-10-23","Iowa Park",59,0],["bronte","2026-10-23","Paint Rock",64,37],["brookesmith","2026-10-23","Lohn",58,12],["brownfield","2026-10-23","Shallowater",0,63],["brownsville-pace","2026-10-23","Donna",21,14],["brownsville-rivera","2026-10-23","Corpus Christi Veterans Memorial",7,65],["brownsville-veterans-memorial","2026-10-23","Harlingen",13,24],["brownwood","2026-10-23","Gatesville",38,7],["bruceville-eddy","2026-10-23","Hearne",28,6],["bruni","2026-10-23","Leakey",0,54],["bryan","2026-10-23","Lake Belton",21,52],["bryan-rudder","2026-10-23","Waco University",21,28],["buffalo","2026-10-23","Mildred",28,21],["callisburg","2026-10-23","Blue Ridge",44,38],["shamrock","2026-10-23","Quanah",36,54],["alief-taylor","2026-10-16","Houston Memorial",18,42],["all-saints-fort-worth","2026-10-16","Grapevine Faith Christian",45,7],["altair-rice","2026-10-16","Wallis Brazos",54,31],["alto","2026-10-16","Cushing",46,56],["alvin","2026-10-16","Pasadena Sam Rayburn",35,0],["alvin-iowa-colony","2026-10-16","Victoria East",57,13],["alvin-shadow-creek","2026-10-16","Manvel",42,6],["alvord","2026-10-16","Muenster",7,56],["amarillo","2026-10-16","Abilene",24,14],["amarillo-palo-duro","2026-10-16","Abilene Wylie",53,10],["amarillo-river-road","2026-10-16","Friona",35,63],["anderson-shiro","2026-10-16","Schulenburg",30,0],["andrews","2026-10-16","Lubbock Christian",14,50],["anson","2026-10-16","Abilene TLCA",68,0],["anthony","2026-10-16","Coahoma",0,63],["arlington-houston","2026-10-16","Arlington Lamar",17,26],["austin-westlake","2026-10-16","McNeil",70,6],["bandera","2026-10-16","Pearsall",44,6],["bangs","2026-10-16","Coleman",53,10],["banquete","2026-10-16","Dilley",0,41],["barksdale-nueces-canyon","2026-10-16","Bruni",47,6],["bartlett","2026-10-16","Chilton",0,48],["bastrop","2026-10-16","Pflugerville",30,25],["bay-city","2026-10-16","El Campo",29,19],["baytown-sterling","2026-10-16","La Porte",13,55],["beaumont-united","2026-10-16","West Brook",14,28],["beckville","2026-10-16","Harleton",44,3],["beeville-jones","2026-10-16","Calhoun",0,35],["bellville","2026-10-16","Harmony School of Innovation",85,0],["belton","2026-10-16","Waco",27,21],["ben-bolt-palito-blanco","2026-10-16","Santa Maria",50,27],["benjamin","2026-10-16","Haskell Paint Creek",58,0],["big-lake-reagan-co","2026-10-16","Christoval",22,26],["shamrock","2026-10-16","Clarendon",32,58],["all-saints-fort-worth","2026-10-09","Fort Worth Southwest Christian",56,13],["allen","2026-10-09","McKinney",70,3],["altair-rice","2026-10-09","Vanderbilt Industrial",41,24],["alto","2026-10-09","Mount Enterprise",63,24],["alvin","2026-10-09","Pearland",7,59],["alvin-iowa-colony","2026-10-09","Richmond Randle",7,49],["alvord","2026-10-09","Olney",59,0],["amarillo-caprock","2026-10-09","Frenship",14,49],["amarillo-highland-park","2026-10-09","Spearman",26,65],["amarillo-tascosa","2026-10-09","Lubbock",64,21],["anahuac","2026-10-09","Buna",41,40],["anderson-shiro","2026-10-09","Lexington",42,33],["anson","2026-10-09","Cisco",6,58],["anthony","2026-10-09","Stanton",0,77],["aquilla","2026-10-09","Penelope",50,0],["aransas-pass","2026-10-09","West Oso",22,30],["archer-city","2026-10-09","Windthorst",14,73],["bandera","2026-10-09","Gonzales",16,20],["bartlett","2026-10-09","Bremond",6,55],["bastrop","2026-10-09","Crockett",70,0],["beeville-jones","2026-10-09","King",50,32],["ben-bolt-palito-blanco","2026-10-09","Woodsboro",62,6],["benavides","2026-10-09","ACA",28,40],["big-lake-reagan-co","2026-10-09","Colorado",24,34],["big-sandy","2026-10-09","Detroit",52,30],["shamrock","2026-10-09","Wellington",6,56]]) {
    const final=byFixture.get(slug+"|"+date);
    assert.ok(final,slug+" "+date);
    assert.equal(final.opponent,opponent);
    assert.equal(final.pointsFor,pf);
    assert.equal(final.pointsAgainst,pa);
  }
});


test("Remaining corroborated Thursday and early-season results preserve exact fixture keys",()=>{for(const [slug,date,opponent,pf,pa] of [["allen","2026-11-05","Prosper Walnut Grove",63,7],["alvin-shadow-creek","2026-11-05","Pasadena Sam Rayburn",70,10],["amarillo-palo-duro","2026-11-05","Lubbock Cooper",49,13],["anahuac","2026-11-05","Coldspring-Oakhurst",64,27],["arlington-houston","2026-11-05","Arlington Bowie",10,35],["arlington-martin","2026-11-05","Granbury",70,14],["arlington-seguin","2026-11-05","Midlothian Heritage",10,40],["baytown-sterling","2026-11-05","Beaumont United",27,34],["beaumont-united","2026-11-05","Sterling",34,27],["beeville-jones","2026-11-05","Tuloso-Midway",20,31],["bridgeland","2026-11-05","Foster",55,0],["brownsville-lopez","2026-11-05","Donna",7,42],["brownsville-porter","2026-11-05","Mercedes",0,52],["buda-hays","2026-11-05","Austin Akins",76,0],["burkeville","2026-11-05","Union Hill",14,70],["alto","2026-10-29","Tenaha",28,34],["alvin-iowa-colony","2026-10-29","South Houston",62,24],["andrews","2026-10-29","San Angelo Lake View",22,31],["aransas-pass","2026-10-29","Sinton",20,44],["arlington-seguin","2026-10-29","Burleson",35,14],["bastrop-cedar-creek","2026-10-29","Anderson",0,63],["belton","2026-10-29","University",31,13],["buda-johnson","2026-10-29","Austin High",42,6],["burleson","2026-10-29","Arlington Seguin",14,35],["amarillo","2026-10-22","Frenship",41,14],["anahuac","2026-10-22","Orangefield",14,49],["bovina","2026-10-22","Stratford",0,83],["brownsboro","2026-10-22","Van — moved to Thursday, see current school calendar",14,48],["brownsville-hanna","2026-10-22","Corpus Christi Carroll",21,35],["brownsville-lopez","2026-10-22","Brownsville Porter",31,13],["brownsville-porter","2026-10-22","Brownsville Lopez",13,31],["allen","2026-10-15","Prosper Rock Hill",70,14],["amarillo-caprock","2026-10-15","Lubbock",28,42],["amarillo-tascosa","2026-10-15","Lubbock Monterey",55,14],["anahuac","2026-10-15","East Chambers",21,14],["aransas-pass","2026-10-15","Orange Grove",7,48],["arlington-seguin","2026-10-15","Everman",48,26],["amarillo-palo-duro","2026-10-08","Lubbock Coronado",55,0],["angleton","2026-10-08","Katy Freeman",52,7],["arlington-houston","2026-10-08","Arlington Martin",14,63],["arlington-martin","2026-10-08","Arlington Sam Houston",63,14],["amarillo-palo-duro","2026-10-01","Abilene Cooper",35,7],["alvin-iowa-colony","2026-10-02","Friendswood",42,48],["amarillo","2026-10-02","Tascosa",45,20],["amarillo-highland-park","2026-10-02","Vega",38,26],["amarillo-river-road","2026-10-02","Borger",7,49],["amarillo-tascosa","2026-10-02","Amarillo",20,45],["anahuac","2026-10-02","Kirbyville",35,14],["andrews","2026-10-02","Lubbock Estacado",10,40],["angleton","2026-10-02","Pasadena",63,0],["anton","2026-10-02","Petersburg",50,45],["aquilla","2026-10-02","May",60,12],["baytown-goose-creek-memorial","2026-10-17","New Caney",28,21],["angleton","2026-09-25","Iowa Colony",34,24]]){const actual=byFixture.get(slug+"|"+date);assert.ok(actual,slug+" "+date);assert.deepEqual([actual.opponent,actual.pointsFor,actual.pointsAgainst],[opponent,pf,pa]);}});


test('verified forfeits do not imply played points and rescheduled games keep the authored fixture identity',()=>{
 for(const [slug,date,opponent,outcome] of [["bluff-dale","2026-11-05","Avalon","forfeit-win"],["campbell","2026-11-05","Fruitvale","forfeit-win"],["campbell","2026-10-29","Savoy","forfeit-win"],["aquilla","2026-10-30","Gholson","forfeit-win"],["buffalo","2026-11-06","Blooming Grove","forfeit-win"],["blooming-grove","2026-11-06","Buffalo","forfeit-loss"]]){const r=byFixture.get(slug+'|'+date);assert.equal(r.opponent,opponent);assert.equal(r.outcome,outcome);assert.equal(r.pointsFor,undefined);assert.equal(r.pointsAgainst,undefined);}
 for(const [slug,date,opponent,pf,pa] of [["angleton","2026-09-18","South Houston",72,7],["big-sandy","2026-10-15","Maud",34,46],["big-spring","2026-10-30","Fort Stockton",25,14],["borden-county","2026-11-06","Ackerly Sands",62,16],["amarillo","2026-10-09","Lubbock Monterey",24,14]]){const r=byFixture.get(slug+'|'+date);assert.deepEqual([r.opponent,r.pointsFor,r.pointsAgainst],[opponent,pf,pa]);}
 assert.equal(byFixture.get('borden-county|2026-11-06').playedDate,'2026-11-05');assert.equal(byFixture.get('amarillo|2026-10-09').playedDate,'2026-10-08');
});


test('additional conflict-resolved and rescheduled finals retain exact original fixture keys',()=>{for(const [slug,date,opponent,pf,pa] of [["amarillo-caprock","2026-10-29","Frenship Memorial",21,30],["big-sandy","2026-10-30","Bowie",39,46],["caddo-mills","2026-11-06","Paris",63,64],["burleson-centennial","2026-11-06","Cedar Hill",14,28]]){const r=byFixture.get(slug+'|'+date);assert.deepEqual([r.opponent,r.pointsFor,r.pointsAgainst],[opponent,pf,pa]);}});


test('Reconciled remaining dated fixtures retain exact editorial keys and corroborated results',()=>{
  for(const row of [
  {
    "slug": "altair-rice",
    "date": "2026-10-02",
    "opponent": "Boling",
    "pointsFor": 28,
    "pointsAgainst": 27,
    "primarySourceUrl": "https://www.maxpreps.com/tx/altair/rice-consolidated-raiders/football/schedule/",
    "secondarySourceUrl": "https://txprepfootball.com/schools/rice-consolidated-raiders/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "alvord",
    "date": "2026-11-07",
    "playedDate": "2026-11-06",
    "opponent": "Chico",
    "pointsFor": 48,
    "pointsAgainst": 0,
    "primarySourceUrl": "https://www.pigskinprep.com/showfreeschedules.asp?distID=103&yr=2026",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/chico/chico-dragons/football/schedule/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "anton",
    "date": "2026-09-18",
    "opponent": "Springlake-Earth",
    "pointsFor": 50,
    "pointsAgainst": 22,
    "primarySourceUrl": "https://klvtsports.wordpress.com/2026/09/20/klvt-listening-area-week-4-football-scoreboards/",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/anton/anton-bulldogs/football/schedule/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "archer-city",
    "date": "2026-10-02",
    "opponent": "Petrolia",
    "pointsFor": 32,
    "pointsAgainst": 40,
    "primarySourceUrl": "https://sports.yahoo.com/articles/week-6-wichita-falls-area-045520524.html",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/football/game/archer-city-vs-petrolia/10-2-2026/?c=6b091db7-bf37-46d7-a902-b315b3d75a0d",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "alvin-shadow-creek",
    "date": "2026-10-09",
    "opponent": "Pasadena Memorial",
    "pointsFor": 59,
    "pointsAgainst": 13,
    "primarySourceUrl": "https://www.on3.com/high-school/scores/football/texas/game/pasadena-memorial-vs-shadow-creek-2026-10-09-2001013/",
    "secondarySourceUrl": "https://app.l4mediacompany.com/district/19-6a.html",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "alief-taylor",
    "date": "2026-10-22",
    "opponent": "Westside",
    "pointsFor": 41,
    "pointsAgainst": 7,
    "primarySourceUrl": "https://www.maxpreps.com/tx/houston/alief-taylor-lions/football/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/alief-taylor/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "arlington-martin",
    "date": "2026-10-16",
    "opponent": "Arlington Bowie",
    "pointsFor": 45,
    "pointsAgainst": 20,
    "primarySourceUrl": "https://www.martinfbrecruiting.com/varsity-schedule",
    "secondarySourceUrl": "https://gmsportsmedia.com/2026/10/dfw-football-scores-week-8/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "arlington-seguin",
    "date": "2026-10-08",
    "opponent": "Mansfield Timberview",
    "pointsFor": 14,
    "pointsAgainst": 56,
    "primarySourceUrl": "https://www.aol.com/articles/week-7-fort-worth-area-061137000.html",
    "secondarySourceUrl": "https://gmsportsmedia.com/2026/10/dfw-football-scores-week-7/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "ballinger",
    "date": "2026-10-16",
    "opponent": "Colorado",
    "pointsFor": 34,
    "pointsAgainst": 14,
    "primarySourceUrl": "https://sanangelolive.com/news/sports/2026-10-16/ballinger-beats-colorado-city-stay-perfect-district",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/ballinger/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bartlett",
    "date": "2026-10-23",
    "opponent": "Somerville",
    "pointsFor": 48,
    "pointsAgainst": 42,
    "primarySourceUrl": "https://www.maxpreps.com/tx/bartlett/bartlett-bulldogs/football/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/bartlett/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bishop",
    "date": "2026-10-30",
    "opponent": "Progreso",
    "pointsFor": 48,
    "pointsAgainst": 0,
    "primarySourceUrl": "https://www.maxpreps.com/tx/football/scores/?date=10%2F30%2F2026",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/bishop/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bloomington",
    "date": "2026-10-23",
    "opponent": "Weimar",
    "pointsFor": 8,
    "pointsAgainst": 44,
    "primarySourceUrl": "https://www.coloradocountycitizen.com/article/9155%2Cwildcats-blowout-bloomington-on-homecoming-night",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/bloomington/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bonham",
    "date": "2026-10-23",
    "opponent": "Wills Point",
    "pointsFor": 45,
    "pointsAgainst": 33,
    "primarySourceUrl": "https://www.si.com/high-school/stats/texas/25039-division-4a2-region-2-district-7/football/scores?date=2026-10-23",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/bonham/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bonham",
    "date": "2026-11-06",
    "opponent": "Farmersville",
    "pointsFor": 18,
    "pointsAgainst": 44,
    "primarySourceUrl": "https://www.mrt.com/sports/highschool/article/texas-statewide-high-school-football-scores-nov-6-22517995.php",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/bonham/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "booker",
    "date": "2026-11-05",
    "opponent": "Boys Ranch",
    "pointsFor": 22,
    "pointsAgainst": 70,
    "primarySourceUrl": "https://www.maxpreps.com/tx/booker/booker-kiowas/football/schedule/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/booker/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "boys-ranch",
    "date": "2026-11-05",
    "opponent": "Booker",
    "pointsFor": 70,
    "pointsAgainst": 22,
    "primarySourceUrl": "https://www.maxpreps.com/tx/booker/booker-kiowas/football/schedule/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/boys-ranch/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bremond",
    "date": "2026-10-23",
    "opponent": "Burton",
    "pointsFor": 36,
    "pointsAgainst": 13,
    "primarySourceUrl": "https://www.maxpreps.com/tx/football/game/bremond-vs-burton/10-23-2026/?c=f31c8efb-dbbc-407e-8727-67b33b322067",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/burton/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "brownsville-hanna",
    "date": "2026-11-07",
    "opponent": "Brownsville Rivera (rival BISD campus; game in Brownsville)",
    "pointsFor": 49,
    "pointsAgainst": 17,
    "primarySourceUrl": "https://www.maxpreps.com/tx/brownsville/hanna-golden-eagles/football/schedule/",
    "secondarySourceUrl": "https://www.si.com/high-school/stats/texas/football/scores?date=2026-11-07",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "brownsville-rivera",
    "date": "2026-11-07",
    "opponent": "Brownsville Hanna",
    "pointsFor": 17,
    "pointsAgainst": 49,
    "primarySourceUrl": "https://www.maxpreps.com/tx/brownsville/rivera-raiders/football/schedule/",
    "secondarySourceUrl": "https://www.si.com/high-school/stats/texas/football/scores?date=2026-11-07",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bryson",
    "date": "2026-10-30",
    "opponent": "Vernon Northside",
    "pointsFor": 78,
    "pointsAgainst": 116,
    "primarySourceUrl": "https://www.maxpreps.com/tx/football/scores/?date=10%2F30%2F2026",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/bryson/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "buda-hays",
    "date": "2026-10-30",
    "opponent": "Del Valle",
    "pointsFor": 68,
    "pointsAgainst": 14,
    "primarySourceUrl": "https://www.maxpreps.com/tx/buda/hays-hawks/football/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/buda-hays/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "calvert",
    "date": "2026-10-30",
    "opponent": "Apple Springs",
    "pointsFor": 33,
    "pointsAgainst": 52,
    "primarySourceUrl": "https://www.maxpreps.com/tx/football/scores/?date=10%2F30%2F2026",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/calvert/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "canutillo",
    "date": "2026-10-30",
    "opponent": "Burges",
    "pointsFor": 50,
    "pointsAgainst": 14,
    "primarySourceUrl": "https://www.maxpreps.com/tx/canutillo/canutillo-eagles/football/schedule/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/canutillo/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "blum",
    "date": "2026-11-06",
    "opponent": "Milford",
    "pointsFor": 14,
    "pointsAgainst": 62,
    "primarySourceUrl": "https://www.maxpreps.com/tx/association/texas-university-interscholastic-league/football/scores/?date=11%2F6%2F2026&mobile=1",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/blum/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "anthony",
    "date": "2026-11-06",
    "opponent": "Crane",
    "pointsFor": 7,
    "pointsAgainst": 51,
    "primarySourceUrl": "https://www.mrt.com/sports/highschool/article/texas-statewide-high-school-football-scores-nov-6-22517995.php",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/anthony/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "benjamin",
    "date": "2026-10-30",
    "opponent": "Knox City",
    "pointsFor": 12,
    "pointsAgainst": 58,
    "primarySourceUrl": "https://www.aol.com/articles/see-final-scores-week-10-044806000.html",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/knox-city/knox-city-greyhounds/football/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bastrop",
    "date": "2026-11-05",
    "opponent": "LASAA",
    "outcome": "forfeit-win",
    "primarySourceUrl": "https://www.expressnews.com/news/article/austin-lasa-football-season-22497100.php",
    "secondarySourceUrl": "https://www.bastroppassport.com/sports/football?school=bastrop",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "archer-city",
    "date": "2026-10-30",
    "opponent": "Haskell",
    "pointsFor": 12,
    "pointsAgainst": 72,
    "primarySourceUrl": "https://www.aol.com/articles/see-final-scores-week-10-044806000.html",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/haskell/haskell-indians/football/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "benjamin",
    "date": "2026-10-23",
    "opponent": "Lueders-Avoca",
    "outcome": "forfeit-win",
    "primarySourceUrl": "https://www.aol.com/articles/week-9-big-country-high-090149000.html",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/avoca/lueders-avoca-raiders/football/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "blanket",
    "date": "2026-10-23",
    "playedDate": "2026-10-22",
    "opponent": "Mullin",
    "pointsFor": 62,
    "pointsAgainst": 16,
    "primarySourceUrl": "https://www.brownwoodnews.com/2026/10/24/week-9-gridiron-rewind-eight-local-squads-secure-district-victories/",
    "secondarySourceUrl": "https://www.aol.com/articles/week-9-big-country-high-090149000.html",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bluff-dale",
    "date": "2026-10-23",
    "playedDate": "2026-10-22",
    "opponent": "Milford",
    "pointsFor": 8,
    "pointsAgainst": 58,
    "primarySourceUrl": "https://texashsfootball.com/milford-rolls-past-bluff-dale-58-8-in-six-man-matchup/",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/bluff-dale/bluff-dale-bobcats/football/schedule/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  }
]){
    assert.deepEqual(byFixture.get(row.slug+'|'+row.date),row);
  }
});


test('remaining confirmed results preserve fixture keys, corrected opponents and bye weeks',()=>{
 for(const row of [
  {
    "slug": "anton",
    "date": "2026-10-30",
    "opponent": "Lorenzo",
    "pointsFor": 53,
    "pointsAgainst": 6,
    "verifiedAt": "2026-11-21",
    "primarySourceUrl": "https://txprepfootball.com/schools/anton-bulldogs/",
    "secondarySourceUrl": "https://www.maxpreps.com/tx/lorenzo/lorenzo-hornets/football/",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bay-city",
    "date": "2026-10-30",
    "opponent": "Columbia",
    "pointsFor": 42,
    "pointsAgainst": 0,
    "verifiedAt": "2026-11-21",
    "primarySourceUrl": "https://www.maxpreps.com/tx/football/game/bay-city-vs-columbia-west-columbia/10-30-2026/?c=8ce1098b-3066-40fe-a4dd-a77052e01b68",
    "secondarySourceUrl": "https://txprepfootball.com/schools/columbia-roughnecks/",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "blue-ridge",
    "date": "2026-10-30",
    "opponent": "Sadler S&S Consolidated",
    "pointsFor": 55,
    "pointsAgainst": 7,
    "verifiedAt": "2026-11-21",
    "primarySourceUrl": "https://www.maxpreps.com/tx/blue-ridge/blue-ridge-tigers/football/",
    "secondarySourceUrl": "https://txprepfootball.com/schools/s-and-s-consolidated-rams/",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "bluff-dale",
    "date": "2026-10-29",
    "opponent": "Pinnacle Christian",
    "pointsFor": 40,
    "pointsAgainst": 59,
    "verifiedAt": "2026-11-21",
    "primarySourceUrl": "https://www.maxpreps.com/news/4-t9wzr_iEWHLayRixB5eA/football-recap-bluff-dale-struggles-against-grace-classical-christian-academy.htm",
    "secondarySourceUrl": "https://www.pigskinprep.com/showscores.asp?cid=7&wk=10&yr=2026",
    "verificationMethod": "manual-editorial-review",
    "playedDate": "2026-10-30",
    "playedOpponent": "Grace Classical Christian Academy (Granbury)",
    "playedSite": "Away"
  },
  {
    "slug": "anton",
    "date": "2026-10-09",
    "opponent": "Cotton Center",
    "outcome": "not-played",
    "verifiedAt": "2026-11-21",
    "primarySourceUrl": "https://klvtsports.wordpress.com/2026/10/11/football-district-updates-for-levelland-ropes-smyer-sundown-whiteface-whitharral-from-friday-oct-9th/",
    "secondarySourceUrl": "https://www.pigskinprep.com/showscores.asp?cid=5&wk=7&yr=2026",
    "verificationMethod": "manual-editorial-review"
  }
])assert.deepEqual(byFixture.get(row.slug+'|'+row.date),row);
 const state=inventory({today:'2026-11-22'});
 assert.ok(!state.pages.some(p=>p.slug==='alpine'&&p.reason==='dated-score-review'));
});


test('final reviewed six-man outcomes and a disclosed numeric disagreement retain evidence',()=>{for(const row of [
  {
    "slug": "anton",
    "date": "2026-10-16",
    "opponent": "Amherst",
    "outcome": "forfeit-win",
    "primarySourceUrl": "https://sixmanfootball.com/scores/2026/week-8/",
    "secondarySourceUrl": "https://txhsfb.net/?p=29395",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "benavides",
    "date": "2026-10-23",
    "opponent": "Pawnee",
    "outcome": "not-played",
    "primarySourceUrl": "https://sixmanfootball.com/teams/benavides-eagles.19121/schedule/",
    "secondarySourceUrl": "https://texasfootballroundup.com/teams/benavides/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  },
  {
    "slug": "alvin-iowa-colony",
    "date": "2026-10-23",
    "opponent": "Fort Bend Dulles",
    "outcome": "score-disputed-win",
    "reportedScores": [
      "48–8",
      "42–8"
    ],
    "primarySourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/schedule/",
    "secondarySourceUrl": "https://www.northchannelstar.com/2026/10/friday-night-lights-live-updates-from-area-football-games-oct-23/",
    "verifiedAt": "2026-11-21",
    "verificationMethod": "manual-editorial-review"
  }
])assert.deepEqual(byFixture.get(row.slug+'|'+row.date),row);const state=inventory({today:'2026-11-22'});assert.ok(state.pages.some(p=>p.slug==='alvin-iowa-colony'&&p.overdue.some(g=>g.date==='2026-10-23')),'A confirmed winner with conflicting score reports remains on the numerical-score research queue');});


test('Iowa Colony postseason result is independently verified, with disputed Dulles win retained',()=>{
 const row=byFixture.get('alvin-iowa-colony|2026-11-13');
 assert.deepEqual([row.opponent,row.pointsFor,row.pointsAgainst],['Pflugerville Weiss',7,56]);
 assert.equal(byFixture.get('alvin-iowa-colony|2026-10-23').outcome,'score-disputed-win');
 const authored=readFileSync(join(ROOT,'src/data/high-school-football/program-editorial.ts'),'utf8');
 const start=authored.indexOf('  "alvin-iowa-colony": {');
 const end=authored.indexOf('\n  },',start)+4;
 const team=JSON.parse(authored.slice(start+'  "alvin-iowa-colony": '.length,end));
 assert.equal(team.season.games.length,11);
 assert.deepEqual(team.season.games.at(-1),{date:'2026-11-13',opponent:'Pflugerville Weiss',site:'Away',district:false});
 assert.ok(team.overview.some(s=>s.includes('5–6')&&s.includes('5–3')));
 const state=inventory({today:'2026-11-24'});
 assert.ok(!state.pages.find(p=>p.page.endsWith('/alvin-iowa-colony'))?.overdue.some(g=>g.date==='2026-11-13'));
});
