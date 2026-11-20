import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readEditorial, validatedFeed, reconcile, applyUpdate, texasToday } from './refresh-canyon-lake-results.mjs';

const source=readFileSync('src/data/high-school-football/program-editorial-comal-canyon-lake.ts','utf8');
const original=readEditorial(source);
const pending=structuredClone(original);
delete pending.season.games.at(-1).result;
pending.season.record='8–2 overall · 6–1 district (through Nov. 13; includes one playoff win)';
const TODAY='2026-11-21';
const primaryHost='licensed-score-one.example.org',secondaryHost='licensed-score-two.example.net';
const makeReport=(host,patch={})=>({
  season:'2026',teamSlug:'comal-canyon-lake',
  games:[{date:'2026-11-20',opponent:'Port Lavaca Calhoun',status:'final',
    hawksScore:28,opponentScore:21,sourceUrl:'https://'+host+'/2026/hawks/calhoun',...patch}]
});
const pair=(a=makeReport(primaryHost),b=makeReport(secondaryHost))=>({
  editorial:pending,primary:a,secondary:b,primaryHost,secondaryHost,today:TODAY,
});
test('retains ten locked finals and the independent area-round fixture',()=>{
  assert.equal(original.season.games.length,11);
  assert.equal(original.season.games.slice(0,10).filter(g=>g.result).length,10);
  assert.equal(original.season.games.at(-1).date,'2026-11-20');
  assert.equal(pending.season.games.filter(g=>g.result).length,10);
  assert.equal(pending.season.games.at(-1).result,undefined);
  assert.equal(pending.season.record.startsWith('8–2'),true);
});
test('both independent authorized provider finals produce exactly one update',()=>{
  const r=reconcile(pair());
  assert.equal(r.added.length,1);
  assert.deepEqual(r.missing,[]);
  const amended=applyUpdate(pending,r.added[0],TODAY);
  assert.equal(amended.season.games.at(-1).result,'W 28–21');
  assert.match(amended.season.record,/9–2 overall · 6–1 district/);
  assert.match(amended.overview[4],/541 points for and 328 against/);
  assert.match(amended.faq[2].answer,/independently confirmed|Both authorized result providers agreed/);
  assert.equal(amended.milestones.at(-1).date,'November 20, 2026');
  assert.equal(amended.milestones.at(-1).sourceUrl,'https://'+primaryHost+'/2026/hawks/calhoun');
  assert.match(amended.season.sourceLabel,/licensed-score-two\.example\.net/);
  assert.equal(pending.season.games.at(-1).result,undefined,'Never mutate the authored source until committed');
});
test('a loss updates the record without implying a next opponent',()=>{
  const a=makeReport(primaryHost,{hawksScore:14,opponentScore:21});
  const b=makeReport(secondaryHost,{hawksScore:14,opponentScore:21});
  const r=reconcile(pair(a,b));
  const amended=applyUpdate(pending,r.added[0],TODAY);
  assert.match(amended.season.record,/8–3 overall · 6–1 district/);
  assert.equal(amended.season.games.at(-1).result,'L 14–21');
  assert.match(amended.intro,/later postseason fixtures require separate source verification/);
});
test('no second provider means no fictional result or automatic publication',()=>{
  const empty={season:'2026',teamSlug:'comal-canyon-lake',games:[]};
  const r=reconcile(pair(makeReport(primaryHost),empty));
  assert.deepEqual(r.added,[]);
  assert.equal(r.missing.length,1);
});
test('wrong opponent, conflicting scores, same-host sources fail closed',()=>{
  assert.throws(()=>reconcile(pair(makeReport(primaryHost,{opponent:'Unlisted Team'}))),/unknown date or opponent/);
  assert.throws(()=>reconcile(pair(makeReport(primaryHost),makeReport(secondaryHost,{hawksScore:35}))),/disagree/);
  assert.throws(()=>reconcile({...pair(),secondaryHost:primaryHost}),/independently hosted/);
});
test('same-day final, duplicate game and unverifiable source are rejected',()=>{
  assert.throws(()=>validatedFeed(makeReport(primaryHost),primaryHost,'2026-11-20'),/must be before today/);
  assert.throws(()=>validatedFeed(makeReport(primaryHost,{sourceUrl:'http://invalid.local'}),primaryHost,TODAY),/authorized provider host/);
  const p=makeReport(primaryHost);p.games.push({...p.games[0]});
  assert.throws(()=>validatedFeed(p,primaryHost,TODAY),/Duplicate final date/);
});
test('matching historical finals from both licensed sources preserve the ledger',()=>{
  const past=(host)=>({date:'2026-11-13',opponent:'Pleasanton',status:'final',
    hawksScore:49,opponentScore:28,sourceUrl:'https://'+host+'/2026/hawks/pleasanton'});
  const a=makeReport(primaryHost);a.games.unshift(past(primaryHost));
  const b=makeReport(secondaryHost);b.games.unshift(past(secondaryHost));
  const reviewed=reconcile(pair(a,b));
  assert.equal(reviewed.added.length,1, 'A corroborated past result must not block a newer final');
  assert.equal(reviewed.added[0].date,'2026-11-20');
  assert.equal(reviewed.old.wins,8);
  assert.equal(reviewed.old.losses,2);
});
test('a single licensed source can corroborate an unchanged historical final',()=>{
  const a=makeReport(primaryHost);
  a.games.unshift({date:'2026-11-13',opponent:'Pleasanton',status:'final',
    hawksScore:49,opponentScore:28,sourceUrl:'https://'+primaryHost+'/2026/hawks/pleasanton'});
  const reviewed=reconcile(pair(a,makeReport(secondaryHost)));
  assert.equal(reviewed.added.length,1, 'Historical row is already locked and must not require an extra publication');
});
test('historical finals are locked against later contradictory provider reports',()=>{
  const p=makeReport(primaryHost);p.games.push({date:'2026-11-13',opponent:'Pleasanton',status:'final',
    hawksScore:48,opponentScore:28,sourceUrl:'https://'+primaryHost+'/2026/hawks/pleasanton'});
  assert.throws(()=>reconcile(pair(p)),/contradicts a locked/);
});
test('timezone-based review date is Texas-local rather than UTC rollover',()=>{
  assert.equal(texasToday(new Date('2026-11-21T02:00:00Z')),'2026-11-20');
  assert.equal(texasToday(new Date('2026-11-21T15:00:00Z')),'2026-11-21');
});
