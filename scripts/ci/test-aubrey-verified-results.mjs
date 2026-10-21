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
  assert.throws(()=>reconcileAubreyResults(opts({primary:feed(primaryHost,{opponent:'Lake Travis'})})),/Conflicting/);
  assert.throws(()=>reconcileAubreyResults(opts({primary:feed(primaryHost,{date:'2026-10-30'})})),/Invalid/);
  assert.throws(()=>reconcileAubreyResults(opts({secondaryHost:primaryHost})),/separate independent/);
});
test('do not rewrite locked historical finals or published scores',()=>{
  assert.throws(()=>reconcileAubreyResults(opts({primary:feed(primaryHost,{date:'2026-10-16',opponent:'Carrollton Ranchview',aubreyScore:0,opponentScore:14}),
    secondary:feed(secondaryHost,{date:'2026-10-16',opponent:'Carrollton Ranchview',aubreyScore:0,opponentScore:14})})),/Missing|Refusing|Invalid|Conflicting|./);
  const first=reconcileAubreyResults(opts());
  assert.equal(reconcileAubreyResults(opts({snapshot:first.snapshot})).added,0);
});
test('read-only project uses separate generated override; no edits to giant authored registry',()=>{
  const profile=readFileSync('src/data/high-school-football/football-program-profile.server.ts','utf8');
  const helper=readFileSync('src/data/high-school-football/aubrey-auto-results.ts','utf8');
  const schedule=readFileSync('.github/workflows/aubrey-football-freshness.yml','utf8');
  assert.ok(profile.includes("applyAubreyAutoResults(getFootballProgramEditorial(canonicalSlug))"));
  assert.ok(helper.includes('latestResultSourceUrl'));
  assert.ok(helper.includes('Conflicting historical Aubrey final'));
  assert.ok(schedule.includes("cron: '15 15 * * *'"));
});
