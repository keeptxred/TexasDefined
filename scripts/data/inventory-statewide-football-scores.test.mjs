import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT,DIR,isoDate,field,balanced,inspectEditorial,inventory} from './inventory-statewide-football-scores.mjs';

test('date-only Texas postgame lookup never treats todays kickoff as an overdue final',()=>{
  assert.equal(isoDate('2026-11-20'),'2026-11-20');
  assert.equal(isoDate('Oct. 30'),'2026-10-30');
  assert.equal(isoDate('November 6, 2026'),'2026-11-06');
  assert.equal(isoDate('2026-02-30'),null);
  assert.equal(isoDate('n/a'),null);
});
test('balanced scanner ignores nested prose punctuation and quoted braces',()=>{
  const item="{ intro:'A { \\'word\\' }', season: { games: [{date: 'Nov. 6', result:'W 32–28'}] } }";
  assert.equal(balanced(item,0,'{','}'),item);
  assert.equal(field(item,'intro'),"A { 'word' }");
});
test('published 2026 score schedule is a review candidate; source-only guide is not',()=>{
  const fake=String.raw`
    const A = { slug: 'sample-school', season: {
      record: '4–3 through Oct. 23, 2026', verifiedAt:'2026-10-26',
      sourceUrl:'https://school.example/scores',
      games:[{date:'Oct. 23',opponent:'School A',result:'W 28–7'},
        {date:'Nov. 6',opponent:'School B',site:'Home'}]
    } };
    const B = { slug:'no-score-guide', schedule:{sourceUrl:'https://example.org'} };
  `;
  const a=inspectEditorial(fake,'program-editorial-b008.ts','2026-11-20');
  assert.equal(a.find(p=>p.slug==='sample-school').reason,'overdue-fixture');
  assert.equal(a.find(p=>p.slug==='sample-school').overdue[0].date,'2026-11-06');
  assert.equal(a.find(p=>p.slug==='sample-school').overdue[0].home,'sample school');
  assert.equal(a.find(p=>p.slug==='no-score-guide').published,false);
});
test('real inventory excludes 2026 alignment and visitor pages without published scores',()=>{
  const report=inventory({today:'2026-11-20'});
  assert.ok(report.summary.editorialFilesScanned>=45);
  assert.ok(report.summary.effectiveTeamEditorials>=50);
  for(const name of ['forney','early','frisco-lone-star'])
    assert.ok(!report.pages.some(p=>p.page.endsWith('/'+name)),name);
  assert.ok(report.pages.every(p=>p.page.startsWith('https://texasdefined.com/texas-high-school-football-')));
  assert.ok(report.pages.every(p=>['team','district','matchup'].includes(p.kind)));
});
test('completed district finals are not falsely enrolled while historical standings still get review',()=>{
  const report=inventory({today:'2026-11-20'});
  for(const slug of ['6a-district-5','4a-division-i-district-11','6a-district-22']){
    assert.ok(!report.pages.some(p=>p.page.endsWith('/'+slug)),slug+' was fully source-verified and should not be overdue');
  }
  for(const slug of ['6a-district-16','6a-district-21']){
    const p=report.pages.find(p=>p.page.endsWith('/'+slug));
    assert.ok(p,slug+' retains an explicitly dated archived standings review');
    assert.equal(p.overdue.length,0,slug+' published late finals must not be treated as unverified');
    assert.equal(p.reason,'dated-standings-review');
  }
  assert.ok(!report.pages.some(p=>p.page.endsWith('/6a-district-9')));
});
test('sourced District 21 finals no longer appear as overdue district fixtures',()=>{
  const report=inventory({today:'2026-11-20'});
  const district=report.pages.find(p=>p.page.endsWith('/6a-district-21'));
  assert.ok(district);
  assert.equal(district.overdue.length,0);
  for(const slug of ['fort-bend-austin','fort-bend-bush','fort-bend-clements','fort-bend-elkins',
    'fort-bend-hightower','fort-bend-ridge-point','fort-bend-travis','houston-strake-jesuit']){
    const page=report.pages.find(p=>p.page.endsWith('/'+slug));
    assert.ok(!page?.overdue.some(g=>g.sourceFile==='football-district21-2026.ts'),slug);
  }
  assert.ok(!report.pages.some(p=>p.page.endsWith('/houston-lamar-at-houston-memorial')));
});
test('verified Houston and Aubrey finals clear their due flags; todays Canyon Lake kickoff is not overdue',()=>{
  const report=inventory({today:'2026-11-20'});
  assert.ok(!report.pages.some(p=>p.page.endsWith('/2026-10-23-houston-lamar-at-houston-memorial')));
  assert.ok(!report.pages.some(p=>p.page.endsWith('/aubrey')&&p.overdue.some(g=>g.date==='2026-11-19')));
  const aubrey=JSON.parse(readFileSync(join(ROOT,'src/data/high-school-football/aubrey-auto-results.snapshot.json'),'utf8'));
  assert.deepEqual(aubrey.verifiedResults.filter(g=>g.date==='2026-11-19').map(g=>[g.opponent,g.aubreyScore,g.opponentScore]),[['Canyon',36,39]]);
  const canyon=report.pages.find(p=>p.page.endsWith('/comal-canyon-lake'));
  assert.ok(!canyon?.overdue?.some(g=>g.date==='2026-11-20'));
  assert.ok(report.fixtures.every(g=>g.date<'2026-11-20'));
  assert.equal(new Set(report.pages.map(p=>p.page)).size,report.pages.length);
});
test('Aubrey verified overlay clears only matching published finals, not a different school\'s unresolved coverage',()=>{
  const report=inventory({today:'2026-11-20'});
  const aubrey=report.pages.find(p=>p.page.endsWith('/aubrey'));
  for(const date of ['2026-10-23','2026-10-30','2026-11-06','2026-11-12','2026-11-19'])
    assert.ok(!aubrey?.overdue.some(g=>g.date===date),'Already verified on Aubrey page: '+date);
  assert.ok(!report.fixtures.some(g=>g.date==='2026-11-19' &&
    [g.away,g.home].includes('Aubrey') && [g.away,g.home].includes('Canyon')),
    'Canyon 39–Aubrey 36 must not remain on the missing-final queue');
  // Alvarado's Oct 30 result now has a separate double-source editorial
  // registry row; other unresolved games must remain in the inventory.
  const alvarado=report.pages.find(p=>p.page.endsWith('/alvarado'));
  assert.ok(!alvarado?.overdue.some(g=>g.date==='2026-10-30'),
    'Alvarado Oct 30 has its own independently source-checked result');
  assert.ok(alvarado?.overdue.some(g=>g.date==='2026-10-16'),
    'Other independently unverified Alvarado results must still be reviewed');
  const published=JSON.parse(readFileSync(join(ROOT,'src/data/high-school-football/aubrey-auto-results.snapshot.json'),'utf8'));
  assert.ok(published.verifiedResults.some(g=>g.date==='2026-11-19'&&g.aubreyScore===36&&g.opponentScore===39));
});

test('real inventory retains only source-dated record candidates and identifies result coverage',()=>{
  const r=inventory({today:'2026-11-21'});
  assert.ok(r.summary.affectedPages>10,r.summary.affectedPages);
  assert.ok(r.summary.unverifiedFixtures>20,r.summary.unverifiedFixtures);
  assert.ok(r.pages.some(p=>p.page.endsWith('/comal-canyon-lake')&&p.overdue.some(g=>g.date==='2026-11-20')));
  assert.ok(r.summary.overduePages<=r.summary.affectedPages);
  assert.ok(r.pages.every(p=>p.overdue.length||p.reason==='dated-score-review'||p.reason==='dated-standings-review'));
});
