#!/usr/bin/env node
/** Enforce a one-to-one UIL softball program research/publication ledger.
 * Publishing requires BOTH the existing full-profile gate and an independently
 * reviewed ledger transition. This script never approves an entity itself.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'../..');
const get=p=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const roster=get('src/data/softball/uil-2026-27-registry.json');
const tracker=get('docs/softball/research/UIL_SCHOOL_PUBLICATION_STATUS_2026-10-12.json');
const publicManifest=get('src/data/softball/published-team-profiles.json');
const stateNames=[
  'Not yet researched','Research in progress','Source verification blocked',
  'Research complete','Editorial and rendered-page QA complete',
  'Approved for publication','Published and production verified'
];
const summaryKeys=[
  'notYetResearched','researchInProgress','sourceVerificationBlocked',
  'researchComplete','editorialQaComplete','approvedForPublication',
  'publishedAndProductionVerified'
];
const count=Object.fromEntries(summaryKeys.map(k=>[k,0]));
const identity=p=>[p.name??p.uilName,p.conference,p.district,p.region].join('|');
assert.equal(tracker.schemaVersion,1);
assert.equal(tracker.season,roster.season);
assert.equal(tracker.registryPath,'src/data/softball/uil-2026-27-registry.json');
assert.deepEqual(tracker.allowedStatuses,stateNames);
assert.match(tracker.asOf,/^20\d\d-\d\d-\d\d$/);
assert.ok(Array.isArray(roster.schools)&&roster.schools.length===1192,
  'Season-specific 2026–27 UIL registry changed; reconcile each school before running old status ledger');
assert.ok(Array.isArray(tracker.records)&&tracker.records.length===roster.schools.length,
  'Every UIL softball alignment entry needs one tracked research/publication state');
assert.equal(tracker.summary.listed,roster.schools.length);
const rosterById=new Map();
for(const school of roster.schools){
  const id=identity(school);
  assert.ok(!rosterById.has(id),'Registry has duplicate softball school+conference+district+region');
  rosterById.set(id,school);
}
const seen=new Set(),trackedById=new Map();
for(const school of tracker.records){
  const id=identity(school);
  assert.ok(!seen.has(id),'Duplicate softball research status row: '+id);
  seen.add(id);
  const official=rosterById.get(id);
  assert.ok(official,'Research status has nonexistent or stale UIL school identity '+id);
  assert.equal(school.uilAlignmentUrl,official.sourceUrl,
    'Never silently replace UIL softball source evidence for '+id);
  const idx=stateNames.indexOf(school.status);
  assert.ok(idx>=0,'Unrecognized school research state '+id);
  count[summaryKeys[idx]]++;
  assert.ok(typeof school.sourceVerification==='string'&&school.sourceVerification.length>=8);
  for(const flag of ['editorialQAPassed','mediaRightsVerified','approvedForPublication','publishedInProduction']) {
    assert.equal(typeof school[flag],'boolean','Missing research gate '+flag+' for '+id);
  }
  if(school.status==='Not yet researched'){
    assert.ok(!school.researchDossier&&!school.criticalUnresolved,
      'Do not label a research record with a complete-unresearched default '+id);
  }else {
    assert.ok(typeof school.researchDossier==='string'&&school.researchDossier.startsWith('docs/softball/research/'),
      'Started school research needs reference to an original evidence docket '+id);
    assert.ok(typeof school.criticalUnresolved==='string'&&school.criticalUnresolved.length>=30,
      'Started research must disclose significant known gaps '+id);
  }
  if(idx<4)assert.ok(!school.editorialQAPassed,
    'Cannot assert completed editorial/browser QA before research is complete for '+id);
  if(idx<5) assert.equal(school.approvedForPublication,false,
    'Cannot approve incomplete research/QA for '+id);
  if(idx!==6)assert.equal(school.publishedInProduction,false,
    'Production claims require published-and-verified state for '+id);
  if(school.publishedInProduction) {
    assert.ok(school.editorialQAPassed&&school.mediaRightsVerified&&school.approvedForPublication,
      'Published pages require verified full QA, media permissions and page approvals '+id);
  }
  if(school.approvedForPublication) {
    assert.ok(school.editorialQAPassed&&school.mediaRightsVerified,
      'No approval without complete editorial/browser and media-rights QA '+id);
  }
  trackedById.set(id,school);
}
assert.equal(trackedById.size,rosterById.size);
for(const key of summaryKeys) assert.equal(tracker.summary[key],count[key],
  'Published/unfinished research counters must derive from the actual individually tracked schools');
const enabled=publicManifest.pages??[];
const publicNames=new Set();
for(const page of enabled){
  const i=page.identity;
  assert.ok(i&&typeof i.uilName==='string','Published UIL softball profile needs real school identity');
  const full=roster.schools.find(s=>s.name===i.uilName&&s.conference===i.conference&&s.district===i.district&&s.region===i.region);
  assert.ok(full,'A published softball school must remain in actual UIL alignment');
  const key=identity(full), tracked=trackedById.get(key);
  assert.ok(!publicNames.has(key),'Same UIL team cannot have duplicate published records');
  publicNames.add(key);
  assert.ok(tracked.approvedForPublication && tracked.editorialQAPassed && tracked.mediaRightsVerified,
    'Full-quality researched school publication requires matching explicit ledger approval for '+key);
}
assert.ok(tracker.summary.publishedAndProductionVerified<=publicNames.size,
  'Cannot claim production verified for more teams than authorized in publication manifest');
console.log('PASS: all '+roster.schools.length+' UIL softball program identities have independent research states; '+
  count.researchInProgress+' documented research efforts; '+publicNames.size+' approved publish-manifest pages.');
