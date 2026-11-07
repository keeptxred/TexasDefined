#!/usr/bin/env node
// Guard individually sourced second cohort before any deployment claims.
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const source=read('src/data/high-school-football/program-editorial-b011.ts');
const match=source.match(/const BATCH011_EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});\s*export function/);
assert.ok(match,'Missing isolated Batch011 source data');
const data=JSON.parse(match[1]);
const cases=[
 ['comal-pieper','bexar','Eduardo (Eddie) Salas','Warriors'],
 ['comal-smithson-valley','comal','Larry Hill','Rangers'],
 ['comanche','comanche','Jake Escobar','Indians'],
 ['comfort','kendall','Jay Rieken','Bobcats'],
 ['commerce','hunt','John McSheffery','Tigers']
];
test('Five individually grounded second-cohort guides and exact campus counties',()=>{
 assert.equal(Object.keys(data).length,25,'Exactly two source cohorts; neither fabricated later school');
 const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts');
 const identities=read('src/data/high-school-football/school-identities.ts');
 const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
 const county=read('src/routes/$kind.$slug.lazy.tsx');
 for(const [slug,campusCounty,person,mascot] of cases){
  const entry=data[slug],dossier=read('docs/football-authority/schools/'+slug+'.md');
  assert.ok(entry && entry.slug===slug,'Missing unique school '+slug);
  assert.ok(entry.intro.length>250,'Specific football introduction '+slug);
  assert.ok(entry.overview.length>=4 && entry.overview.every(s=>s.length>50),'School-specific overview '+slug);
  assert.equal(entry.faq.length,5,'Five useful researched questions '+slug);
  assert.ok(entry.milestones.length>=3 && entry.milestones.every(m=>m.sourceUrl.startsWith('https://')),'Dated source milestones '+slug);
  assert.ok(entry.schedule.sourceUrl.startsWith('https://'),'Official school schedule or navigation '+slug);
  assert.ok(!entry.season && !entry.photo,'No unauthorized scoreboard or school photo '+slug);
  assert.ok(JSON.stringify(entry).includes(person),'Individually qualified official athletics context '+slug);
  assert.ok(dossier.length>=2000 && dossier.includes('NOT technically VERIFIED'),'Individual source dossier and status hold '+slug);
  assert.ok(loader.includes("'"+slug+"'"),'Isolated server-only source loader '+slug);
  assert.ok(identities.includes("slug: '"+slug+"'") && identities.includes("mascot: '"+mascot+"'"),'Source-supported mascot NAME '+slug);
  assert.ok(team.includes("'"+slug+"': '"+campusCounty+"'"),'Exact physical school county '+slug);
  assert.ok(county.includes("slug: '"+slug+"'"),'Reciprocal county link '+slug);
 }
 assert.equal(data.comfort.coach,undefined,'October 2026 AD role does not confirm 2026 HFC');
 assert.ok(data.comfort.faq.some(x=>x.answer.includes('August 2025')),'Comfort prior-year coach qualification');
 assert.ok(data['comal-pieper'].intro.includes('Bexar County'),'Do not confuse Comal ISD with physical campus county');
 assert.ok(data['comal-smithson-valley'].intro.includes('2025'),'Do not mark historic title as 2026');
});
test('Second cohort requires real non-skipped Chrome and exact live release attribution',()=>{
 const chrome=read('scripts/ci/verify-football-b011-second-five-production.mjs');
 const flow=read('.github/workflows/verify-football-b011-all-schools-production.yml');
 for(const s of ['report.schoolChecks.length!==15','report.countyChecks.length!==5',
  'process.env.FOOTBALL_CHROME_SOURCE_SHA',
  'process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1',
  '/tmp/td-b011-second-chrome/node_modules/playwright-core'])
  assert.ok(chrome.includes(s),'Strict Chrome control missing '+s);
 for(const s of ['Deploy TexasDefined production','steps.release.outputs.sha',
  'pin-football-b010-production-release.mjs',
  'artifacts/b011-single-run-summary.json'])
  assert.ok(flow.includes(s),'Protected second-cohort browser workflow missing '+s);
 const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const graduatedB011 = reg.completedBatches.some(b=>b.number===11 && b.state==='VERIFIED_BATCH_011_COMPLETE' && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===18 && b.technicalAcceptance?.browserExecutionCount===1) && reg.schoolRecords.filter(x=>x.batch===11&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 const graduatedB012 = reg.completedBatches.some(b=>b.number===12 && b.state==='VERIFIED_BATCH_012_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1);
 assert.ok(graduatedB011,'Batch011 must retain its independently certified historical acceptance');
 assert.equal(reg.completedBatches.find(b=>b.number===11)?.individuallyVerified,25);
 assert.equal(graduatedB011?0:25,graduatedB011?0:25);
 const graduatedB013 = reg.completedBatches.some(b=>b.number===13 && b.state==='VERIFIED_BATCH_013_COMPLETE' && b.individuallyVerified===25 && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.schoolCasesFailed===0 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.countyCasesFailed===0 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId && b.technicalAcceptance?.productionDeploymentGitSha && b.technicalAcceptance?.observedWorkerVersions?.length===1) && reg.schoolRecords.filter(x=>x.batch===13 && x.status==='VERIFIED').length===25;
 const graduatedB014 = reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 assert.equal(reg.schoolRecords.filter(x=>x.status==='VERIFIED').length,graduatedB014?330:graduatedB013?305:graduatedB012?280:graduatedB011?255:230);
 for(const [slug] of cases){
  const row=reg.schoolRecords.find(x=>x.slug===slug);
  assert.equal(row.status,graduatedB011?'VERIFIED':'IMPLEMENTED');
  assert.equal(row.actualProductionVerified,graduatedB011);
  assert.equal(row.schoolPhotoReuseRightsAccepted,false);
  assert.equal(row.manualAccessibilityAccepted,false);
 }
});
