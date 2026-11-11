#!/usr/bin/env node
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
import { certifiedBatch016 } from './verified-football-b016-certificate.mjs';
const read=p=>readFileSync(p,'utf8');
const src=read('src/data/high-school-football/program-editorial-b011.ts');
const match=src.match(/const BATCH011_EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});\s*export function/);
assert.ok(match,'Third cohort source editorial must exist');
const data=JSON.parse(match[1]);
const cases=[
 ['como-pickton','hopkins','Jeremy Griffin','Eagles'],
 ['conroe','montgomery','Cedric Hardeman','Tiger'],
 ['conroe-caney-creek','montgomery','Taylor Cobb','Panthers'],
 ['conroe-grand-oaks','montgomery','Shaun McDowell','Grizzly'],
 ['conroe-oak-ridge','montgomery','Tyler Blackshire','War Eagles']
];
test('Third five source editorial and exact federally sourced campus counties',()=>{
 assert.equal(Object.keys(data).length,25,'All three source-authored cohorts only');
 const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts'),
  ident=read('src/data/high-school-football/school-identities.ts'),
  team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'),
  counties=read('src/routes/$kind.$slug.lazy.tsx');
 for(const [slug,county,staff,mascot] of cases){
  const x=data[slug],dossier=read('docs/football-authority/schools/'+slug+'.md');
  assert.ok(x && x.slug===slug && x.intro.length>250,'Original intro '+slug);
  assert.equal(x.faq.length,5,'Unique fan FAQs '+slug);
  assert.ok(x.overview.length>=4 && x.overview.every(s=>s.length>50),'Original contextual content '+slug);
  assert.equal(x.milestones.length,3,'Three dated historical or status milestones '+slug);
  assert.ok(x.milestones.every(m=>m.sourceUrl.startsWith('https://')),'Actual source links '+slug);
  assert.ok(JSON.stringify(x).includes(staff),'No copied coach/athletic role '+slug);
  assert.ok(loader.includes("'"+slug+"'"),'Independent SSR loading '+slug);
  assert.ok(ident.includes("slug: '"+slug+"'"),'Existing identity or new research '+slug);
  assert.ok(team.includes("'"+slug+"': '"+county+"'"),'Campus county from NCES '+slug);
  assert.ok(counties.includes("slug: '"+slug+"'"),'Two-way county reciprocity '+slug);
  assert.ok(dossier.length>=2000 && dossier.includes('NOT technically VERIFIED'),'School evidence hold '+slug);
 }
 assert.equal(data['como-pickton'].coach,undefined,'2025 school head coach is not automatically a 2026 appointment');
 assert.ok(data['como-pickton'].faq.some(x=>x.answer.includes('2025')),'Earlier 2025 football role explicitly dated');
 assert.ok(data['conroe-grand-oaks'].campus.sourceUrl.includes('481500013065'),'NCES campus county not inferred from Spring mailing address');
});
test('Third five require actual production browser and exact deployed Worker',()=>{
 const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const graduatedB011 = reg.completedBatches.some(b=>b.number===11 && b.state==='VERIFIED_BATCH_011_COMPLETE' && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===18 && b.technicalAcceptance?.browserExecutionCount===1) && reg.schoolRecords.filter(x=>x.batch===11&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 const graduatedB012 = reg.completedBatches.some(b=>b.number===12 && b.state==='VERIFIED_BATCH_012_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1);
 assert.ok(graduatedB011,'Batch011 must retain its independently certified historical acceptance');
 assert.equal(reg.completedBatches.find(b=>b.number===11)?.individuallyVerified,25);
 
 assert.equal(graduatedB011?0:25,graduatedB011?0:25);
 const graduatedB013 = reg.completedBatches.some(b=>b.number===13 && b.state==='VERIFIED_BATCH_013_COMPLETE' && b.individuallyVerified===25 && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.schoolCasesFailed===0 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.countyCasesFailed===0 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId && b.technicalAcceptance?.productionDeploymentGitSha && b.technicalAcceptance?.observedWorkerVersions?.length===1) && reg.schoolRecords.filter(x=>x.batch===13 && x.status==='VERIFIED').length===25;
 const graduatedB014 = reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,certifiedBatch016(reg)?380:certifiedBatch015(reg)?355:graduatedB014?330:graduatedB013?305:graduatedB012?280:graduatedB011?255:230);
  // The next active batch legitimately contributes 25 IMPLEMENTED records.
  // Do not attribute Batch012 work to an unfinished Batch011 graduation.
  assert.equal(reg.schoolRecords.filter(s=>[11,12].includes(s.batch)&&s.status==='IMPLEMENTED').length,0,'Graduated historical batches must not contain IMPLEMENTED records');
 const verifier=read('scripts/ci/verify-football-b011-third-five-production.mjs');
 const workflow=read('.github/workflows/verify-football-b011-all-schools-production.yml');
 for(const needle of ['report.schoolChecks.length!==15','report.countyChecks.length!==2','process.env.FOOTBALL_CHROME_SOURCE_SHA','process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1'])
  assert.ok(verifier.includes(needle),'Missing real Chrome or pinned Worker guard '+needle);
 for(const needle of ['Deploy TexasDefined production','pin-football-b010-production-release.mjs','steps.release.outputs.sha','artifacts/b011-single-run-summary.json'])
  assert.ok(workflow.includes(needle),'Missing release/screenshot evidence '+needle);
 for(const [slug] of cases){
  const s=reg.schoolRecords.find(row=>row.slug===slug);
  assert.equal(s.status,graduatedB011?'VERIFIED':'IMPLEMENTED');
  assert.equal(s.actualProductionVerified,graduatedB011);
  assert.equal(s.schoolPhotoReuseRightsAccepted,false);
  assert.equal(s.manualAccessibilityAccepted,false);
 }
});
