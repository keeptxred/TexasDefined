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
  assert.equal(snapshot.verifiedResults.length,3,'Three individual, cited late-season finals');
  assert.deepEqual(snapshot.verifiedResults.map(x=>[x.date,x.opponent,x.aubreyScore,x.opponentScore]),[
    ['2026-10-23','Lake Dallas',28,21],
    ['2026-10-30','Alvarado',70,40],
    ['2026-11-06','Godley',55,22],
  ]);
  for(const result of snapshot.verifiedResults){
    assert.equal(result.verificationMethod,'manual-editorial-review');
    assert.ok(result.primarySourceUrl.startsWith('https://') && result.secondarySourceUrl.startsWith('https://'));
    assert.notEqual(new URL(result.primarySourceUrl).hostname,new URL(result.secondarySourceUrl).hostname);
  }
  const primary={season:'2026',teamSlug:'aubrey',games:[]};
  const secondary={season:'2026',teamSlug:'aubrey',games:[]};
  const result=reconcileAubreyResults({editorial,snapshot,primary,secondary,primaryHost,secondaryHost,today:'2026-11-13'});
  assert.equal(result.added,0);
  assert.deepEqual(result.pending,[],'Historical verified scores cannot be flagged missing due to sparse feeds');
  const games=editorial.season.games.map(game=>{
    const extra=snapshot.verifiedResults.find(x=>x.date===game.date);
    return { ...game, result:game.result || (extra ? (extra.aubreyScore>extra.opponentScore?'W ':'L ')+extra.aubreyScore+'–'+extra.opponentScore:undefined) };
  });
  assert.equal(games.filter(game=>game.result?.startsWith('W ')).length,7);
  assert.equal(games.filter(game=>game.result?.startsWith('L ')).length,3);
  assert.equal(games.filter(game=>game.district && game.result?.startsWith('W ')).length,7);
  assert.equal(games.filter(game=>game.district && game.result?.startsWith('L ')).length,0);
  assert.throws(()=>reconcileAubreyResults({
    editorial,snapshot,primary,
    secondary:{...secondary,games:[{
      date:'2026-10-30',opponent:'Alvarado',status:'final',
      aubreyScore:71,opponentScore:40,
      sourceUrl:'https://'+secondaryHost+'/2026-10-30',
    }]},
    primaryHost,secondaryHost,today:'2026-11-13',
  }),/published Aubrey final was contradicted/);
});
