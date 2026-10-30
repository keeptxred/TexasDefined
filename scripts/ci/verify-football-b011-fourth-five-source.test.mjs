#!/usr/bin/env node
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
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
 assert.equal(r.batch.number,11);assert.equal(r.batch.implementedOnBranch,25);assert.equal(r.batch.remainingToImplement,0);
 assert.equal(r.schoolRecords.filter(x=>x.status==='VERIFIED').length,230);
 assert.equal(r.schoolRecords.filter(x=>x.status==='IMPLEMENTED').length,25);
 for(const [slug] of cases){
  const x=r.schoolRecords.find(s=>s.slug===slug);
  assert.equal(x.status,'IMPLEMENTED');
  assert.equal(x.actualProductionVerified,false);
  assert.equal(x.schoolPhotoReuseRightsAccepted,false);
  assert.equal(x.manualAccessibilityAccepted,false);
 }
 const chrome=read('scripts/ci/verify-football-b011-fourth-five-production.mjs'),
 workflow=read('.github/workflows/verify-football-b011-fourth-five-production.yml');
 for(const n of ['report.schoolChecks.length!==15','report.countyChecks.length!==4','report.screenshots!==19',
 'process.env.FOOTBALL_CHROME_SOURCE_SHA','process.env.FOOTBALL_EXPECTED_WORKER_VERSION','versions.size!==1'])
  assert.ok(chrome.includes(n),'Missing strict exact release browser evidence '+n);
 for(const n of ['Deploy TexasDefined production','pin-football-b010-production-release.mjs',
 'steps.release.outputs.sha','artifacts/b011-fourth-five-production-chrome/'])
  assert.ok(workflow.includes(n),'Missing protected Chrome workflow artifact/source '+n);
});
