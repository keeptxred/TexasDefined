#!/usr/bin/env node
/**
 * Research-only evidence sourcebook validator: protects genuine first-party
 * local/softball chronology from stadium, classification, current-staff, and
 * school-name extrapolations. Not a means of approving school pages for release.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'../..');
const read=(p)=>readFileSync(resolve(root,p),'utf8');
const book=JSON.parse(read('docs/softball/research/verified-school-context-2026-10-12.json'));
const draft=read('docs/softball/research/ORIGINAL_EDITORIAL_DRAFTS_2026-10-12.md');
const directory=JSON.parse(read('src/data/softball/uil-2026-27-registry.json'));
const published=JSON.parse(read('src/data/softball/published-team-profiles.json'));
const names=['Shiner','Ganado','Katy','Pearland','Amarillo Highland Park'];
assert.equal(book.version,1);
assert.equal(book.publicationStatus,'research-only');
assert.equal(book.approvedForTeamPagePublication,false,'Proofbook must never directly authorize publishing');
assert.match(book.reviewedAt,/^20\d{2}-\d\d-\d\d$/);
assert.ok(Array.isArray(book.records)&&book.records.length>=19);
const allowed=new Set(['institutional-context','softball-staff-as-of','historical-softball','historic-honors','community-program','visitor-evidence-limitation','administrative-process','venue-source-needed']);
const keys=new Set(),counts=new Map(names.map(x=>[x,0]));
for(const record of book.records){
  assert.ok(names.includes(record.school),'Unknown pilot school in research sourcebook');
  const id=record.school+'|'+record.id;
  assert.ok(!keys.has(id),'Duplicate school-specific evidence: '+id);keys.add(id);
  assert.match(record.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(allowed.has(record.kind),'Research classification should be explicit: '+id);
  assert.ok(record.claim.length>=90,'An original useful sourced finding is required for '+id);
  assert.ok(record.caution.length>=90,'Do not omit fact-specific limits: '+id);
  const u=new URL(record.source);
  assert.equal(u.protocol,'https:','Primary sources must be explicit HTTPS links');
  assert.ok(u.hostname!=='example.com','No synthetic evidence from a test fixture');
  assert.ok(draft.includes(record.source),'Every source must be reviewed in human-readable original editorial draft: '+record.source);
  counts.set(record.school,counts.get(record.school)+1);
}
for(const name of names){
  assert.ok(directory.schools.some(x=>x.name===name),'Exact UIL softball school record required: '+name);
  assert.ok(counts.get(name)>=2,'Every pilot school must have substantive source context: '+name);
  assert.ok(draft.includes('## '+name),'Draft must have distinct school-specific original editorial context: '+name);
  assert.ok(!published.pages.some(p=>p.identity?.uilName===name),'Research-only proofbook cannot create team page: '+name);
}
assert.ok(book.blockingResearch.length>=5,'Publication blockers must remain visible');
assert.ok(draft.includes('NOT approved team pages or public routes'),'Editorial drafts must never be confused for released authority pages');
assert.ok(book.records.some(x=>x.id==='ganado-house-resolution'),'Legislative title report cannot silently disappear');
assert.ok(book.records.some(x=>x.id==='shiner-title-2015'),'Preserve distinct coaching eras');
assert.ok(book.records.some(x=>x.id==='pearland-institution'&&x.caution.includes('SCHOOL')),'School founding is not girls softball founding');
assert.ok(book.records.some(x=>x.id==='katy-field-agenda'&&x.caution.includes('not an adopted vote')),'Board agenda is not proof of a vote');
assert.ok(book.records.some(x=>x.id==='amarillo-new-sport'&&x.caution.includes('Dallas Highland Park')),'Never copy Dallas Highland Park records to Amarillo');
assert.ok(book.records.some(x=>x.id==='pearland-school-schedule-trap'&&x.caution.includes('neither')&&x.caution.includes('2027')),'Old playoff notice must not be current fixture');
console.log('PASS: '+book.records.length+' individually sourced school-context findings, '+names.length+' narrative drafts, no prematurely approved UIL school pages');
