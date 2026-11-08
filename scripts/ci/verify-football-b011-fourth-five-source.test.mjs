#!/usr/bin/env node
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
const read=p=>readFileSync(p,'utf8');
const source=read('src/data/high-school-football/program-editorial-b011.ts');
const match=source.match(/const BATCH011_EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});\s*export function/);
assert.ok(match,'Batch011 typed editorial map missing');
const data=JSON.parse(match[1]);
const cases=[
 ['conroe-the-woodlands','montgomery','Jim (James) Rapp','Highlanders'],
 ['conroe-woodlands-college-park','montgomery','Michael Buro','Cavaliers'],
 ['converse-judson','bexar','Vernon Hughes','Rockets'],
 ['coolidge','limestone','six-man','Yellowjackets'],
 ['cooper','delta','Bruce Silman','Bulldogs']
];
test('Fourth five distinct 2026 football programs, format and first-party staff qualification',()=>{
 assert.equal(Object.keys(data).length,25,'Four implemented school cohorts and no fifth cohort yet');
 const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts'),
 identities=read('src/data/high-school-football/school-identities.ts'),
 team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'),
 county=read('src/routes/$kind.$slug.lazy.tsx');
 for(const [slug,physicalCounty,person,mascot] of cases){
  const x=data[slug],dossier=read('docs/football-authority/schools/'+slug+'.md');
  assert.ok(x && x.slug===slug && x.intro.length>250,'Missing original authority introduction '+slug);
  assert.equal(x.faq.length,5,'Five individually useful fan FAQs '+slug);
  assert.ok(x.overview.length>=4 && x.overview.every(t=>t.length>50),'School-specific content '+slug);
  assert.equal(x.milestones.length,3,'Three sourced milestones '+slug);
  assert.ok(x.milestones.every(t=>t.sourceUrl.startsWith('https://')),'Source provenance '+slug);
  assert.ok(JSON.stringify(x).includes(person),'Specific staff or format distinction '+slug);
  assert.ok(loader.includes("'"+slug+"'"),'Conditional server-only source loader '+slug);
  assert.ok(identities.includes("slug: '"+slug+"'"),'Official school identity name '+slug);
  assert.ok(identities.includes("mascot: '"+mascot+"'"),'Mascot name not unlicensed mark '+slug);
  assert.ok(team.includes("'"+slug+"': '"+physicalCounty+"'"),'Physical campus county '+slug);
  assert.ok(county.includes("slug: '"+slug+"'"),'Exact school-to-county reciprocity '+slug);
  assert.ok(dossier.length>=2000 && dossier.includes('not technically VERIFIED'),'Individual source dossier is not production proof '+slug);
  assert.ok(x.seo.title.includes('Football') && x.seo.description.length>80,'Specific SEO metadata '+slug);
  assert.ok(!x.photo && !x.season,'No licensed score feed or team photo invented '+slug);
 }
 assert.equal(data.coolidge.coach,undefined,'Unconfirmed 2026 Coolidge school football coach may not be asserted');
 assert.equal(data.cooper.coach,undefined,'Cooper AD Bruce Silman not assumed 2026 head football coach');
 assert.ok(data.coolidge.seo.title.includes('Six-Man'),'Coolidge cannot be mislabeled 11-man');
 assert.ok(data['conroe-woodlands-college-park'].intro.includes('Cavaliers'),'College Park must remain distinct from Highlanders');
});
test('Fourth production verification requires actual screenshot count and GitHub pinned Worker',()=>{
 const r=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const graduatedB011 = r.completedBatches.some(b=>b.number===11 && b.state==='VERIFIED_BATCH_011_COMPLETE' && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===18 && b.technicalAcceptance?.browserExecutionCount===1) && r.schoolRecords.filter(x=>x.batch===11&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 const graduatedB012 = r.completedBatches.some(b=>b.number===12 && b.state==='VERIFIED_BATCH_012_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1);
 assert.ok(graduatedB011,'Batch011 must retain its independently certified historical acceptance');assert.equal(r.completedBatches.find(b=>b.number===11)?.individuallyVerified,25);
 const graduatedB013 = r.completedBatches.some(b=>b.number===13 && b.state==='VERIFIED_BATCH_013_COMPLETE' && b.individuallyVerified===25 && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.schoolCasesFailed===0 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.countyCasesFailed===0 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId && b.technicalAcceptance?.productionDeploymentGitSha && b.technicalAcceptance?.observedWorkerVersions?.length===1) && r.schoolRecords.filter(x=>x.batch===13 && x.status==='VERIFIED').length===25;
 const graduatedB014 = r.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && r.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 assert.equal(r.schoolRecords.filter(x=>x.status==='VERIFIED').length,certifiedBatch015(r)?355:graduatedB014?330:graduatedB013?305:graduatedB012?280:graduatedB011?255:230);
  // Batch012 legitimately has 25 IMPLEMENTED records after Batch011 graduation.
  assert.equal(r.schoolRecords.filter(s=>[11,12].includes(s.batch)&&s.status==='IMPLEMENTED').length,0,'Graduated historical batches must not contain IMPLEMENTED records');
 for(const [slug] of cases){
  const x=r.schoolRecords.find(s=>s.slug===slug);
  assert.equal(x.status,graduatedB011?'VERIFIED':'IMPLEMENTED');
  assert.equal(x.actualProductionVerified,graduatedB011);
  assert.equal(x.schoolPhotoReuseRightsAccepted,false);
  assert.equal(x.manualAccessibilityAccepted,false);
 }
 const chrome=read('scripts/ci/verify-football-b011-fourth-five-production.mjs'),
 workflow=read('.github/workflows/verify-football-b011-all-schools-production.yml');
 for(const n of ['report.schoolChecks.length!==15','report.countyChecks.length!==4','process.env.FOOTBALL_CHROME_SOURCE_SHA','process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1'])
  assert.ok(chrome.includes(n),'Missing strict exact release browser evidence '+n);
 for(const n of ['Deploy TexasDefined production','pin-football-b010-production-release.mjs',
 'steps.release.outputs.sha','artifacts/b011-single-run-summary.json'])
  assert.ok(workflow.includes(n),'Missing protected Chrome workflow artifact/source '+n);
});
