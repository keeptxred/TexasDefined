import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
// Batch014 source-only gate. Never call this evidence production certification.
const read=p=>readFileSync(p,'utf8');
const slugs=['dallas-kimball','dallas-life-oak-cliff','dallas-lincoln','dallas-madison','dallas-molina'];
const editorialSource=read('src/data/high-school-football/program-editorial-b014.ts');
const match=editorialSource.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(match,'missing parseable authored Batch014 editorial map');
const guides=JSON.parse(match[1]);
assert.deepEqual(Object.keys(guides),slugs,'unexpected or missing authored schools');
const loader=read('src/data/high-school-football/program-editorial-b014-loader.server.ts');
const server=read('src/data/high-school-football/football-program-profile.server.ts');
assert.ok(loader.includes("import('./program-editorial-b014')"),'Batch014 SSR loader does not dynamically load original editorial');
assert.ok(server.includes('await loadBatch014FootballProgramEditorial(canonicalSlug)'),'Batch014 source is not in actual SSR profile resolver');
const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const b014Certified = reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
assert.ok(reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE'),'Batch014 signed graduation must remain archived');
assert.deepEqual(reg.completedBatches.find(b=>b.number===14).slugs.slice(0,5),slugs,'wrong assigned order');
assert.equal(reg.schoolRecords.filter(x=>x.status==='VERIFIED').length,certifiedBatch015(reg)?355:b014Certified?330:305,'historical certificates must remain intact');


const schoolIdentities=read('src/data/high-school-football/school-identities.ts');
const expectedMascots=new Map([['dallas-kimball','Knights'],['dallas-life-oak-cliff','Lions'],['dallas-lincoln','Tigers'],['dallas-madison','Trojans'],['dallas-molina','Jaguars']]);
for(const [slug,mascot] of expectedMascots){
 assert.ok(schoolIdentities.includes("slug: '"+slug+"', mascot: '"+mascot+"'"),slug+' missing first-party mascot identity');
}
const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county=read('src/routes/$kind.$slug.lazy.tsx');
const campusSection=team.split('const researchedCampusCounty: Record<string, string> = {')[1]?.split('\n  };')[0];
const reciprocal=county.split('const supplementalFootballCountyLinks: Record<string, Array<{ name: string; slug: string; context: string }>> = {')[1]?.split('\n};')[0];
assert.ok(campusSection && reciprocal,'campus/county source maps missing');
const dallas=reciprocal.match(/'dallas'\s*:\s*\[([\s\S]*?)\]\s*,/);
assert.ok(dallas,'Dallas county reciprocal list missing');
const dossier=read('docs/football-authority/BATCH014-FIRST-FIVE-SOURCES.md');
const beginnings=new Set();
for(const slug of slugs){
 const guide=guides[slug];
 assert.equal(guide.slug,slug);
 assert.ok(loader.includes("'"+slug+"'"),slug+' not allowed by SSR loader');
 assert.equal(reg.schoolRecords.find(x=>x.slug===slug)?.status,b014Certified?'VERIFIED':'IMPLEMENTED',slug+' not source implemented');
 assert.equal(reg.schoolRecords.find(x=>x.slug===slug)?.actualProductionVerified,b014Certified,slug+' must not imply Chrome certification');
 assert.ok(dossier.includes('`'+slug+'`'),slug+' missing source dossier');
 assert.ok(campusSection.includes("'"+slug+"': 'dallas'"),slug+' campus county not mapped');
 assert.ok(dallas[1].includes("slug: '"+slug+"'"),slug+' absent from county-to-school links');
 assert.ok(guide.campus?.sourceUrl?.startsWith('https://') && guide.schedule?.sourceUrl?.startsWith('https://'));
 assert.equal(guide.schedule.verifiedAt,'2026-11-06');
 assert.ok(Array.isArray(guide.overview)&&guide.overview.length>=4,slug+' missing school-specific guide context');
 assert.ok(Array.isArray(guide.faq)&&guide.faq.length>=3,slug+' missing visitor FAQs');
 assert.ok(Array.isArray(guide.milestones)&&guide.milestones.length>=2,slug+' missing dated source milestones');
 const lead=guide.overview[0].trim().toLowerCase();
 assert.ok(lead.length>=110,slug+' lead lacks detail');
 assert.ok(!beginnings.has(lead),slug+' repeated school introductory paragraph');
 beginnings.add(lead);
}
assert.ok(guides['dallas-life-oak-cliff'].schedule.sourceUrl.includes('lifeschool.net'),'charter football cannot use Dallas ISD schedule');
assert.ok(guides['dallas-lincoln'].campus.address.includes('Elsie Faye Heggins'),'historical Lincoln street address cannot supersede current school');
console.log('PASS: five unique sourced Batch014 SSR guides, exact registry assignment, first-party schedules, Dallas school/county reciprocity, 305 older VERIFIED preserved; source-only, NOT Chrome.');

assert.equal(reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED').length,b014Certified?25:0,'Batch014 graduation must have signed exact production evidence');
assert.equal(reg.schoolRecords.filter(x=>x.batch===14&&x.status==='IMPLEMENTED').length,b014Certified?0:25,'all 25 source-authored Batch014 schools must remain accounted for');
