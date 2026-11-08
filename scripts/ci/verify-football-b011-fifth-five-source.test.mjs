#!/usr/bin/env node
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
const read=p=>readFileSync(p,'utf8');
const source=read('src/data/high-school-football/program-editorial-b011.ts');
const match=source.match(/const BATCH011_EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});\s*export function/);
assert.ok(match,'Missing official Batch011 editorial source map');
const data=JSON.parse(match[1]);
const cases=[
 ['coppell','dallas','Antonio Wiley','Cowboys'],
 ['copperas-cove','coryell','Rodney Southern','Bulldawgs'],
 ['cornerstone-christian','bexar','Clayton Guillory','Warriors'],
 ['corpus-christi-calallen','nueces','Charlie Reeve','Wildcats'],
 ['corpus-christi-carroll','nueces','Calvin','Tigers'],
];
test('Final fifth five individually sourced and distinct from unrelated schools',()=>{
 assert.equal(Object.keys(data).length,25,'All 25 distinct Batch011 schools individually implemented');
 const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts'),
  identity=read('src/data/high-school-football/school-identities.ts'),
  routes=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'),
  county=read('src/routes/$kind.$slug.lazy.tsx');
 for(const [slug,physicalCounty,person,mascot] of cases){
  const s=data[slug],dossier=read('docs/football-authority/schools/'+slug+'.md');
  assert.ok(s && s.slug===slug && s.intro.length>250,'School-specific body '+slug);
  assert.ok(s.overview.length>=4 && s.overview.every(t=>t.length>50),'Original meaningful content '+slug);
  assert.equal(s.faq.length,5,'Five independently useful FAQs '+slug);
  assert.equal(s.milestones.length,3,'Three dated school-source milestones '+slug);
  assert.ok(s.milestones.every(t=>t.sourceUrl.startsWith('https://')),'Source evidence '+slug);
  assert.ok(JSON.stringify(s).includes(person),'Coach or qualified athletics role for exact school '+slug);
  assert.ok(loader.includes("'"+slug+"'"),'School independently authored source in SSR '+slug);
  assert.ok(identity.includes("slug: '"+slug+"'"),'Official mascot name '+slug);
  assert.ok(identity.includes("mascot: '"+mascot+"'"),'Mascot is a name, not image rights '+slug);
  assert.ok(routes.includes("'"+slug+"': '"+physicalCounty+"'"),'Correct physical campus county '+slug);
  assert.ok(county.includes("slug: '"+slug+"'"),'Reciprocal linked county discoverability '+slug);
  assert.ok(dossier.length>2000 && dossier.includes('not technically VERIFIED'),'Source evidence not fake live acceptance '+slug);
 }
 assert.ok(data['cornerstone-christian'].intro.includes('not a UIL program'),'Private school cannot be assigned UIL division');
 assert.ok(data['cornerstone-christian'].intro.includes('San Antonio'),'Warriors not namesake Sugar Land Cougars');
 assert.ok(data['cornerstone-christian'].coach.name==='Clayton Guillory','Official 2026 private head coach source');
 assert.equal(data['corpus-christi-calallen'].coach,undefined,'Calallen AD title not a verified 2026 head football coach');
 assert.equal(data['corpus-christi-carroll'].coach,undefined,'Carroll athletics coordinator alone not 2026 school head coach');
 assert.ok(data.coppell.coach.name==='Antonio Wiley','Coppell head coach not Antonio Wiley Jr.');
 assert.ok(data['copperas-cove'].coach.name==='Rodney Southern','Stale Tony Johnson coach not assigned current head coach');
});
test('Private Cornerstone uses current Batch011 loader in non-UIL branch',()=>{
 const profile=read('src/data/high-school-football/football-program-profile.server.ts');
 const legacy=profile.slice(profile.indexOf('if (!seed) {'),profile.indexOf('const result = await searchFootballPrograms'));
 assert.ok(legacy.includes('loadBatch011FootballProgramEditorial(legacy.featured.slug)'),'Private profile must load latest school editorial');
 assert.ok(legacy.includes('districtPath: null'),'Do not inject fake UIL district link');
 assert.ok(legacy.includes('privateAlignment: legacy.privateAlignment'),'Preserve source-governed private/independent metadata');
 const featured=read('src/data/high-school-football/featured-programs.ts');
 assert.ok(featured.includes('"Cornerstone Christian"'),'Private San Antonio Warriors must resolve under legacy school eligibility');
});
test('Batch011 fifth-five source only until five distinct real production Chrome passes',()=>{
 const registry=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const graduatedB011 = registry.completedBatches.some(b=>b.number===11 && b.state==='VERIFIED_BATCH_011_COMPLETE' && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===18 && b.technicalAcceptance?.browserExecutionCount===1) && registry.schoolRecords.filter(x=>x.batch===11&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 const graduatedB012 = registry.completedBatches.some(b=>b.number===12 && b.state==='VERIFIED_BATCH_012_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1);
 assert.ok(graduatedB011,'Historical Batch011 must retain its own genuine Chrome certificate');
 assert.equal(registry.completedBatches.find(b=>b.number===11)?.individuallyVerified,25);
 const graduatedB013 = registry.completedBatches.some(b=>b.number===13 && b.state==='VERIFIED_BATCH_013_COMPLETE' && b.individuallyVerified===25 && b.technicalAcceptance?.schoolCount===25 && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.schoolCasesFailed===0 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.countyCasesFailed===0 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId && b.technicalAcceptance?.productionDeploymentGitSha && b.technicalAcceptance?.observedWorkerVersions?.length===1) && registry.schoolRecords.filter(x=>x.batch===13 && x.status==='VERIFIED').length===25;
 const graduatedB014 = registry.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && registry.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
 assert.equal(registry.schoolRecords.filter(t=>t.batch===11&&t.status==='IMPLEMENTED').length,0,'No unfinished Batch011 school');
 assert.equal(registry.schoolRecords.filter(t=>t.batch===11&&t.status==='VERIFIED'&&t.actualProductionVerified===true).length,25,'Batch011 historical production evidence must cover all 25 schools');
 assert.equal(registry.schoolRecords.filter(t=>t.status==='VERIFIED').length,certifiedBatch015(registry)?355:graduatedB014?330:graduatedB013?305:graduatedB012?280:graduatedB011?255:230);
  // A current Batch012 must remain IMPLEMENTED until its own Chrome graduation.
  assert.equal(registry.schoolRecords.filter(t=>[11,12].includes(t.batch)&&t.status==='IMPLEMENTED').length,0,'Graduated historical schools must not regress to IMPLEMENTED');
 for(const [slug] of cases){const x=registry.schoolRecords.find(t=>t.slug===slug);
  assert.equal(x.status,graduatedB011?'VERIFIED':'IMPLEMENTED');
  assert.equal(x.actualProductionVerified,graduatedB011);
  assert.equal(x.schoolPhotoReuseRightsAccepted,false);
  assert.equal(x.manualAccessibilityAccepted,false);
 }
 const code=read('scripts/ci/verify-football-b011-fifth-five-production.mjs');
 const workflow=read('.github/workflows/verify-football-b011-all-schools-production.yml');
 for(const word of ['report.schoolChecks.length!==15','report.countyChecks.length!==4','process.env.FOOTBALL_CHROME_SOURCE_SHA','process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1'])
  assert.ok(code.includes(word),'Required real Chrome evidence missing '+word);
 for(const word of ['Deploy TexasDefined production','pin-football-b010-production-release.mjs',
 'steps.release.outputs.sha','artifacts/b011-single-run-summary.json'])
  assert.ok(workflow.includes(word),'Missing protected release or preserved screenshots '+word);
});
