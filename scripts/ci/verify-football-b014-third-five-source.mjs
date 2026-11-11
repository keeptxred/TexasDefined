import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
import { certifiedBatch016 } from './verified-football-b016-certificate.mjs';
const read=p=>readFileSync(p,'utf8');
const slugs=['dallas-south-oak-cliff','dallas-spruce','dallas-sunset','dallas-white','dallas-wilson'];
const m=read('src/data/high-school-football/program-editorial-b014-group3.ts').match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(m,'missing third-five SSR editorial object');
const guides=JSON.parse(m[1]);
assert.deepEqual(Object.keys(guides),slugs,'must keep exactly five individual original guides');
const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const b014Certified = reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
assert.ok(reg.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE'),'Batch014 signed graduation must remain archived');
assert.deepEqual(reg.completedBatches.find(b=>b.number===14).slugs.slice(10,15),slugs,'third-five assignment not canonical');
assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,certifiedBatch016(reg)?380:certifiedBatch015(reg)?355:b014Certified?330:305,'historical signed certificates changed');


const loader=read('src/data/high-school-football/program-editorial-b014-loader.server.ts');
assert.ok(loader.includes("import('./program-editorial-b014-group3')"),'third group missing SSR import');
assert.ok(read('src/data/high-school-football/football-program-profile.server.ts').includes('loadBatch014FootballProgramEditorial(canonicalSlug)'),'profile server missing B014 SSR');
const source=read('docs/football-authority/BATCH014-THIRD-FIVE-SOURCES.md');
const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county=read('src/routes/$kind.$slug.lazy.tsx');
const campus=team.split('const researchedCampusCounty: Record<string, string> = {')[1]?.split('\n  };')[0];
const reciprocal=county.split('const supplementalFootballCountyLinks: Record<string, Array<{ name: string; slug: string; context: string }>> = {')[1]?.split('\n};')[0];
const dallas=reciprocal?.match(/'dallas'\s*:\s*\[([\s\S]*?)\]\s*,/);
assert.ok(campus&&dallas,'source maps absent');
const identity=read('src/data/high-school-football/school-identities.ts');
const expectedMascot=new Map([['dallas-south-oak-cliff','Golden Bears'],['dallas-spruce','Timberwolves'],['dallas-sunset','Bison'],['dallas-white','Longhorns'],['dallas-wilson','Wildcats']]);
const leads=new Set();
for(const slug of slugs){
 const guide=guides[slug];assert.equal(guide?.slug,slug);
 assert.ok(loader.includes("'"+slug+"'"),slug+' SSR slug missing');
 assert.equal(reg.schoolRecords.find(s=>s.slug===slug)?.status,b014Certified?'VERIFIED':'IMPLEMENTED',slug+' not source implemented');
 assert.equal(reg.schoolRecords.find(s=>s.slug===slug)?.actualProductionVerified,b014Certified,slug+' incorrectly Chrome verified');
 assert.ok(source.includes(String.fromCharCode(96)+slug+String.fromCharCode(96)),slug+' primary source dossier missing');
 assert.ok(campus.includes("'"+slug+"': 'dallas'"),slug+' campus county missing');
 assert.ok(dallas[1].includes("slug: '"+slug+"'"),slug+' county reciprocal missing');
 assert.equal([...identity.matchAll(new RegExp("slug:\\s*'"+slug+"'","g"))].length,1,slug+' duplicate or missing official mascot identity');
 assert.ok(guide.schedule?.sourceUrl==='https://www.dallasisd.org/departments/athletics/schedules',slug+' wrong official varsity schedule');
 assert.ok(guide.campus?.sourceUrl?.startsWith('https://'),slug+' campus source missing');
 assert.ok(guide.overview?.length>=4&&guide.milestones?.length>=2&&guide.faq?.length>=3,slug+' original source editorial missing');
 const lead=guide.overview[0].trim().toLowerCase();assert.ok(lead.length>=115&&!leads.has(lead),slug+' duplicate/weak intro');leads.add(lead);
}
for(const [slug,mascot] of expectedMascot){
 const at=identity.indexOf("slug: '"+slug+"'");
 assert.ok(at>=0&&identity.slice(at,at+130).includes("mascot: '"+mascot+"'"),slug+' incorrect current official mascot');
}
assert.ok(guides['dallas-spruce'].overview.some(x=>x.includes('Apaches')&&x.includes('Timberwolves')),'Spruce historical mascot must remain distinguished');
assert.ok(guides['dallas-south-oak-cliff'].overview.some(x=>/Life (?:High )?School(?: Oak Cliff)?/.test(x) && /charter|separat(?:e|ely)|different/i.test(x)),'South Oak Cliff must explicitly distinguish the separate Life School Oak Cliff charter');
console.log('PASS Batch014 first fifteen individual source guides, unique mascot identity, Dallas reciprocity, 305 prior certified; NOT production Chrome');

assert.equal(reg.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED').length,b014Certified?25:0,'Batch014 graduation must have signed exact production evidence');
assert.equal(reg.schoolRecords.filter(x=>x.batch===14&&x.status==='IMPLEMENTED').length,b014Certified?0:25,'all 25 source-authored Batch014 schools must remain accounted for');
