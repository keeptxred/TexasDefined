#!/usr/bin/env node
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
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
 assert.equal(reg.batch.number,11);
 assert.equal(reg.batch.implementedOnBranch,25);
 assert.equal(reg.batch.remainingAssigned,0);
 assert.equal(reg.batch.remainingToVerify,25);
 assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,230);
 assert.equal(reg.schoolRecords.filter(s=>s.status==='IMPLEMENTED').length,25);
 const verifier=read('scripts/ci/verify-football-b011-third-five-production.mjs');
 const workflow=read('.github/workflows/verify-football-b011-third-five-production.yml');
 for(const needle of ['report.schoolChecks.length!==15','report.countyChecks.length!==2','process.env.FOOTBALL_CHROME_SOURCE_SHA','process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1'])
  assert.ok(verifier.includes(needle),'Missing real Chrome or pinned Worker guard '+needle);
 for(const needle of ['Deploy TexasDefined production','pin-football-b010-production-release.mjs','steps.release.outputs.sha','artifacts/b011-third-five-production-chrome/'])
  assert.ok(workflow.includes(needle),'Missing release/screenshot evidence '+needle);
 for(const [slug] of cases){
  const s=reg.schoolRecords.find(row=>row.slug===slug);
  assert.equal(s.status,'IMPLEMENTED');
  assert.equal(s.actualProductionVerified,false);
  assert.equal(s.schoolPhotoReuseRightsAccepted,false);
  assert.equal(s.manualAccessibilityAccepted,false);
 }
});
