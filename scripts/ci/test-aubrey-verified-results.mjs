import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { reconcileAubreyResults } from '../data/update-aubrey-verified-results.mjs';

const fake = () => ({
  season: { games: [
    {date:'2026-10-16',opponent:'Carrollton Ranchview',district:true,result:'W 66–14'},
    {date:'2026-10-23',opponent:'Lake Dallas',district:true},
    {date:'2026-10-30',opponent:'Alvarado',district:true},
  ] },
});
const primaryHost='scores.approved-one.example.org';
const secondaryHost='results.independent-two.example.net';
const row = (host, overrides={}) => ({
  date:'2026-10-23',opponent:'Lake Dallas',status:'final',
  aubreyScore:21,opponentScore:17,
  sourceUrl:'https://' + host + '/aubrey/2026-10-23',...overrides,
});
const feed = (host, overrides={}) => ({
  season:'2026',teamSlug:'aubrey',games:[row(host,overrides)],
});
const opts = (overrides={}) => ({
  editorial:fake(),snapshot:{season:'2026',teamSlug:'aubrey',verifiedResults:[]},
  primary:feed(primaryHost),secondary:feed(secondaryHost),
  primaryHost,secondaryHost,today:'2026-10-24',...overrides,
});
test('two licensed, independently-hosted matching finals create one record',()=>{
  const result = reconcileAubreyResults(opts());
  assert.equal(result.added,1);
  assert.equal(result.pending.length,0);
  assert.equal(result.snapshot.verifiedResults[0].aubreyScore,21);
  assert.equal(result.snapshot.verifiedResults[0].opponentScore,17);
  assert.equal(result.snapshot.verifiedResults[0].district,true);
  assert.ok(result.snapshot.verifiedResults[0].primarySourceUrl.includes(primaryHost));
  assert.ok(result.snapshot.verifiedResults[0].secondarySourceUrl.includes(secondaryHost));
});
test('do not publish score when only one provider has a result',()=>{
  const result=reconcileAubreyResults(opts({secondary:feed(secondaryHost,{})}));
  assert.equal(result.added,1);
  assert.ok(result.pending.some(x=>x.includes('Alvarado')) === false);
  const noSecond=reconcileAubreyResults(opts({secondary:{season:'2026',teamSlug:'aubrey',games:[]}}));
  assert.equal(noSecond.added,0);
  assert.ok(noSecond.pending.some(x=>x.includes('Lake Dallas')));
});
test('conflicting final scores always fail closed',()=>{
  assert.throws(()=>reconcileAubreyResults(opts({secondary:feed(secondaryHost,{opponentScore:20})})),/Conflicting/);
});
test('wrong team or fabricated future results always fail',()=>{
  const conflictingSnapshot={season:'2026',teamSlug:'aubrey',verifiedResults:[{
    date:'2026-10-16',opponent:'Carrollton Ranchview',district:true,
    aubreyScore:0,opponentScore:14,verifiedAt:'2026-10-17',
    primarySourceUrl:'https://' + primaryHost + '/ranchview',
    secondarySourceUrl:'https://' + secondaryHost + '/ranchview',
  }]};
  assert.throws(()=>reconcileAubreyResults(opts({snapshot:conflictingSnapshot})),/Conflicting locked historical final/);
  const first=reconcileAubreyResults(opts());
  assert.equal(reconcileAubreyResults(opts({snapshot:first.snapshot})).added,0);
});
test('read-only project uses separate generated override; no edits to giant authored registry',()=>{
  const profile=readFileSync('src/data/high-school-football/football-program-profile.server.ts','utf8');
  const helper=readFileSync('src/data/high-school-football/aubrey-auto-results.ts','utf8');
  const schedule=readFileSync('.github/workflows/aubrey-football-freshness.yml','utf8');
  assert.ok(profile.includes("canonicalSlug === 'aubrey'") && profile.includes('applyAubreyAutoResults(baseEditorial)'));
  assert.ok(profile.includes('getFootballProgramEditorial(canonicalSlug)'),
    'Aubrey must still derive its generated override from the authored school editorial fallback');
  assert.ok(helper.includes('latestResultSourceUrl'));
  assert.ok(helper.includes('Conflicting historical Aubrey final'));
  assert.ok(schedule.includes("cron: '15 15 * * *'"));
});


test('manually double-cited 2026 Aubrey finals survive later sparse authorized feeds',()=>{
  const raw=readFileSync('src/data/high-school-football/program-editorial.ts','utf8');
  const start=raw.indexOf('  "aubrey": {');
  const end=raw.indexOf('\n  "',start+14);
  assert.ok(start>=0 && end>start);
  const editorial=JSON.parse('{'+raw.slice(start,end).trim().replace(/,\s*$/,'')+'}').aubrey;
  const snapshot=JSON.parse(readFileSync('src/data/high-school-football/aubrey-auto-results.snapshot.json','utf8'));
  // These four manually corroborated historical finals are an immutable
  // baseline, NOT an upper bound: future verified playoff results must pass
  // protected checks without editing this test after every new game.
  const baseline = [
    ['2026-10-23','Lake Dallas',28,21],
    ['2026-10-30','Alvarado',70,40],
    ['2026-11-06','Godley',55,22],
    ['2026-11-12','Andrews',63,24],
  ];
  assert.ok(snapshot.verifiedResults.length >= baseline.length && snapshot.verifiedResults.length <= 16);
  for (const [date, opponent, aubreyScore, opponentScore] of baseline) {
    const row = snapshot.verifiedResults.find(x=>x.date===date);
    assert.ok(row, 'Previously published Aubrey final must remain: '+date);
    assert.deepEqual([row.opponent,row.aubreyScore,row.opponentScore],[opponent,aubreyScore,opponentScore]);
    assert.equal(row.verificationMethod,'manual-editorial-review');
  }
  for(const result of snapshot.verifiedResults){
    assert.ok(['manual-editorial-review','dual-authorized-feed'].includes(result.verificationMethod), 'Unknown publication provenance: '+result.date);
    assert.ok(result.primarySourceUrl.startsWith('https://') && result.secondarySourceUrl.startsWith('https://'));
    assert.notEqual(new URL(result.primarySourceUrl).hostname,new URL(result.secondarySourceUrl).hostname);
  }
  const primary={season:'2026',teamSlug:'aubrey',games:[]};
  const secondary={season:'2026',teamSlug:'aubrey',games:[]};
  const playoff=JSON.parse(readFileSync('src/data/high-school-football/aubrey-postseason-fixtures.snapshot.json','utf8'));
  assert.ok(playoff.games.length >= 2 && playoff.games.length <= 6, 'Retain two verified playoff fixtures while permitting later rounds');
  assert.equal(playoff.games[0].opponent,'Andrews');
  assert.equal(playoff.games[1].opponent,'Canyon');
  assert.equal(playoff.games[1].result,undefined,'Upcoming Canyon fixture must not have invented final');
  const result=reconcileAubreyResults({editorial,snapshot,primary,secondary,primaryHost,secondaryHost,today:'2026-11-14',playoffFixtures:playoff.games});
  assert.equal(result.added,0);
  assert.deepEqual(result.pending,[],'Historical verified scores cannot be flagged missing due to sparse feeds');
  const games=[...editorial.season.games,...playoff.games].map(game=>{
    const extra=snapshot.verifiedResults.find(x=>x.date===game.date);
    return { ...game, result:game.result || (extra ? (extra.aubreyScore>extra.opponentScore?'W ':'L ')+extra.aubreyScore+'–'+extra.opponentScore:undefined) };
  });
  assert.ok(games.filter(game=>game.result?.startsWith('W ')).length>=8, 'Keep eight documented wins; later verified wins are allowed');
  assert.ok(games.filter(game=>game.result?.startsWith('L ')).length>=3, 'Keep three documented losses; later playoff results are allowed');
  assert.equal(games.filter(game=>game.district && game.result?.startsWith('W ')).length,7);
  assert.equal(games.filter(game=>game.district && game.result?.startsWith('L ')).length,0);
  assert.throws(()=>reconcileAubreyResults({
    editorial,snapshot,primary,
    secondary:{...secondary,games:[{
      date:'2026-10-30',opponent:'Alvarado',status:'final',
      aubreyScore:71,opponentScore:40,
      sourceUrl:'https://'+secondaryHost+'/2026-10-30',
    }]},
    primaryHost,secondaryHost,today:'2026-11-14',playoffFixtures:playoff.games,
  }),/published Aubrey final was contradicted/);
});

test('new licensed playoff finals can update the existing verified upcoming Canyon fixture but cannot invent opponents',()=>{
  const published=JSON.parse(readFileSync('src/data/high-school-football/aubrey-auto-results.snapshot.json','utf8'));
  const playoff=JSON.parse(readFileSync('src/data/high-school-football/aubrey-postseason-fixtures.snapshot.json','utf8'));
  const fakeRecord={season:{games:[{date:'2026-11-12',opponent:'Andrews',site:'Neutral',district:false},
    {date:'2026-11-19',opponent:'Canyon',site:'Neutral',district:false}]}};
  const canyon=(host,score=28)=>({
    season:'2026',teamSlug:'aubrey',games:[{
      date:'2026-11-19',opponent:'Canyon',status:'final',aubreyScore:score,opponentScore:21,
      sourceUrl:'https://'+host+'/2026-11-19',
    }],
  });
  const empty={season:'2026',teamSlug:'aubrey',verifiedResults:[]};
  const outcome=reconcileAubreyResults({editorial:fakeRecord,snapshot:empty,
    primary:canyon(primaryHost),secondary:canyon(secondaryHost),primaryHost,secondaryHost,
    today:'2026-11-20',playoffFixtures:[]});
  assert.equal(outcome.added,1);
  assert.equal(outcome.snapshot.verifiedResults[0].district,false);
  assert.throws(()=>reconcileAubreyResults({editorial:fakeRecord,snapshot:empty,
    primary:canyon(primaryHost),secondary:canyon(secondaryHost,35),primaryHost,secondaryHost,
    today:'2026-11-20'}),/Conflicting/);
  assert.throws(()=>reconcileAubreyResults({editorial:fakeRecord,snapshot:empty,
    primary:canyon(primaryHost),secondary:canyon(secondaryHost),primaryHost,secondaryHost,
    today:'2026-11-18'}),/future|Invalid/i);
});

test('reject unlisted playoff advancement even if both licensed providers agree',()=>{
  const extra = {date:'2026-11-13',opponent:'Invented School',status:'final',
    aubreyScore:42,opponentScore:14};
  assert.throws(()=>reconcileAubreyResults(opts({
    primary:feed(primaryHost,{...extra,sourceUrl:'https://'+primaryHost+'/2026-11-13'}),
    secondary:feed(secondaryHost,{...extra,sourceUrl:'https://'+secondaryHost+'/2026-11-13'}),
    today:'2026-11-14',
  })),/Unlisted or wrong-opponent/);
});

test('reject a wrong opponent even when date and scores agree',()=>{
  assert.throws(()=>reconcileAubreyResults(opts({
    primary:feed(primaryHost,{opponent:'Not Lake Dallas'}),
    secondary:feed(secondaryHost,{opponent:'Not Lake Dallas'}),
  })),/Unlisted or wrong-opponent/);
});

test('reject duplicate dates in an already published score snapshot',()=>{
  const candidate = {
    date:'2026-10-23',opponent:'Lake Dallas',aubreyScore:21,opponentScore:17,
    district:true,primarySourceUrl:'https://'+primaryHost+'/2026-10-23',
    secondarySourceUrl:'https://'+secondaryHost+'/2026-10-23',verifiedAt:'2026-10-24',
  };
  assert.throws(()=>reconcileAubreyResults(opts({
    snapshot:{season:'2026',teamSlug:'aubrey',verifiedResults:[candidate,candidate]},
  })),/Duplicate already-published/);
});

test('contradictions of already authored game finals cannot silently pass',()=>{
  const prior = row(primaryHost,{
    date:'2026-10-16',opponent:'Carrollton Ranchview',
    aubreyScore:65,opponentScore:14,
    sourceUrl:'https://'+primaryHost+'/aubrey/2026-10-16',
  });
  const primary={season:'2026',teamSlug:'aubrey',games:[prior]};
  const secondary={season:'2026',teamSlug:'aubrey',games:[]};
  assert.throws(()=>reconcileAubreyResults(opts({primary,secondary})),
    /contradicts an authored Aubrey final/);
  const correct={...prior,aubreyScore:66};
  assert.equal(reconcileAubreyResults(opts({
    primary:{...primary,games:[correct]},secondary,
  })).added,0,'Matching provider report must preserve authored final without republishing');
});

test('legacy Aubrey paid-score job never runs or publishes on a schedule',()=>{
  const workflow=readFileSync('.github/workflows/aubrey-verified-score-sync.yml','utf8');
  const statewide=readFileSync('.github/workflows/refresh-football-scores-brackets.yml','utf8');
  assert.ok(workflow.includes('pull_request:'));
  assert.ok(!workflow.includes('schedule:'),'Aubrey no longer requires a redundant paid-feed cron');
  assert.ok(!workflow.includes('workflow_dispatch:'));
  assert.ok(!workflow.includes('gh pr create'));
  assert.ok(!workflow.includes('AUBREY_SCORE_FEED_PRIMARY_URL'));
  assert.ok(!workflow.includes('pull-requests: write'));
  assert.ok(statewide.includes('node scripts/data/research-football-pages-statewide.mjs --research'),
    'Aubrey is researched through the one statewide next-day public lookup');
});
