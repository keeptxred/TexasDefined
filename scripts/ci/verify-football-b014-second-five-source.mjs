import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
import { certifiedBatch016 } from './verified-football-b016-certificate.mjs';
const read=p=>readFileSync(p,'utf8');
const slugs=['dallas-pinkston','dallas-roosevelt','dallas-samuell','dallas-seagoville','dallas-skyline'];
const source=read('src/data/high-school-football/program-editorial-b014-group2.ts');
const match=source.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(match,'Batch014 second-five editorials missing');
const guides=JSON.parse(match[1]);
assert.deepEqual(Object.keys(guides),slugs,'wrong second-five distinct guide roster');
const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const b014Certified = reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
assert.ok(reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE'),'Batch014 signed graduation must remain archived');
assert.deepEqual(reg.completedBatches.find(b=>b.number===14).slugs.slice(5,10),slugs,'wrong canonical assigned order');
assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,certifiedBatch016(reg)?380:certifiedBatch015(reg)?355:b014Certified?330:305,'historical certificates must be retained');


const loader=read('src/data/high-school-football/program-editorial-b014-loader.server.ts');
assert.ok(loader.includes("import('./program-editorial-b014-group2')"),'second-five SSR content not loaded');
assert.ok(read('src/data/high-school-football/football-program-profile.server.ts').includes('loadBatch014FootballProgramEditorial(canonicalSlug)'),'SSR resolver omits Batch014');
const names=new Map([['dallas-pinkston','Vikings'],['dallas-roosevelt','Mustangs'],['dallas-samuell','Spartans'],['dallas-seagoville','Dragons'],['dallas-skyline','Raiders']]);
const identities=read('src/data/high-school-football/school-identities.ts');
const teams=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const counties=read('src/routes/$kind.$slug.lazy.tsx');
const campus=teams.split('const researchedCampusCounty: Record<string, string> = {')[1]?.split('\n  };')[0];
const reciprocal=counties.split('const supplementalFootballCountyLinks: Record<string, Array<{ name: string; slug: string; context: string }>> = {')[1]?.split('\n};')[0];
assert.ok(campus&&reciprocal,'source maps missing');
const countyRow=reciprocal.match(/'dallas'\s*:\s*\[([\s\S]*?)\]\s*,/);
assert.ok(countyRow,'Dallas County section absent');
const dossier=read('docs/football-authority/BATCH014-SECOND-FIVE-SOURCES.md');
const leads=new Set();
for(const slug of slugs){
 const guide=guides[slug];assert.equal(guide.slug,slug);
 assert.ok(loader.includes("'"+slug+"'"),slug+' omitted from SSR loader');
 const record=reg.schoolRecords.find(s=>s.slug===slug);
 assert.equal(record?.status,b014Certified?'VERIFIED':'IMPLEMENTED',slug+' source status wrong');
 assert.equal(record?.actualProductionVerified,b014Certified,'no Chrome acceptance for '+slug);
 assert.ok(campus.includes("'"+slug+"': 'dallas'"),slug+' wrong campus county');
 assert.ok(countyRow[1].includes("slug: '"+slug+"'"),slug+' missing county return link');
 assert.ok(dossier.includes(String.fromCharCode(96)+slug+String.fromCharCode(96)),slug+' missing first-party research');
 assert.ok(identities.includes("slug: '"+slug+"', mascot: '"+names.get(slug)+"'"),slug+' missing official identity');
 assert.equal(guide.schedule?.sourceUrl,'https://www.dallasisd.org/departments/athletics/schedules',slug+' wrong district source');
 assert.ok(guide.campus?.sourceUrl?.startsWith('https://'),slug+' no campus source');
 assert.ok(guide.overview?.length>=4&&guide.milestones?.length>=2&&guide.faq?.length>=3,slug+' missing authored sections');
 const lead=guide.overview[0].toLowerCase();
 assert.ok(lead.length>=115&&!leads.has(lead),slug+' duplicate/thin intro');leads.add(lead);
}
assert.ok(guides['dallas-samuell'].overview.some(s=>/Spartans/.test(s)&&/older/.test(s)),'Samuell old mascot contradiction must remain disclosed');
console.log('PASS: 10 Batch014 school guides source-implemented, official identities, county reciprocity, 305 older VERIFIED, not Chrome');

assert.equal(reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED').length,b014Certified?25:0,'Batch014 graduation must have signed exact production evidence');
assert.equal(reg.schoolRecords.filter(x=>x.batch===14&&x.status==='IMPLEMENTED').length,b014Certified?0:25,'all 25 source-authored Batch014 schools must remain accounted for');
