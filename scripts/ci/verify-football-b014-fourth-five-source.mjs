import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p => readFileSync(p,'utf8');
const slugs = ['danbury','dawson','dayton','de-kalb','de-leon'];
const counties = new Map([['danbury','brazoria'],['dawson','navarro'],['dayton','liberty'],['de-kalb','bowie'],['de-leon','comanche']]);
const mascots = new Map([['danbury','Panthers'],['dawson','Bulldogs'],['dayton','Broncos'],['de-kalb','Bears'],['de-leon','Bearcats']]);
const editorial = read('src/data/high-school-football/program-editorial-b014-group4.ts');
const m = editorial.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
assert.ok(m,'fourth-five authored SSR map missing');
const guides=JSON.parse(m[1]);
assert.deepEqual(Object.keys(guides),slugs,'wrong or duplicate fourth-five guide roster');
const registry=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const b014Certified = registry.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE' && b.technicalAcceptance?.schoolCasesPassed===75 && b.technicalAcceptance?.countyCasesPassed===25 && b.technicalAcceptance?.browserExecutionCount===1 && b.technicalAcceptance?.githubWorkerLedgerDeploymentId===7613348297 && b.technicalAcceptance?.productionDeploymentGitSha==='851bff976c187e841a178e58984068ec19b06744' && b.technicalAcceptance?.observedWorkerVersions?.[0]==='93fe54dd-9155-49cd-a4e9-7c2d6d7b8ca2') && registry.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED'&&x.actualProductionVerified===true).length===25;
assert.ok(registry.completedBatches.some(b=>b.number===14 && b.state==='VERIFIED_BATCH_014_COMPLETE'),'Batch014 signed graduation must remain archived');
assert.deepEqual(registry.completedBatches.find(b=>b.number===14).slugs.slice(15,20),slugs,'fourth-five registry order must remain canonical');
assert.equal(registry.schoolRecords.filter(s=>s.status==='VERIFIED').length,b014Certified?330:305,'305 historically certified schools must remain');


const loader=read('src/data/high-school-football/program-editorial-b014-loader.server.ts');
assert.ok(loader.includes("import('./program-editorial-b014-group4')"),'fourth-five must be loaded by SSR');
assert.ok(read('src/data/high-school-football/football-program-profile.server.ts').includes('loadBatch014FootballProgramEditorial(canonicalSlug)'),'SSR resolver missing Batch014');
const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county=read('src/routes/$kind.$slug.lazy.tsx');
const campus=team.split('const researchedCampusCounty: Record<string, string> = {')[1]?.split('\n  };')[0];
const reciprocal=county.split('const supplementalFootballCountyLinks: Record<string, Array<{ name: string; slug: string; context: string }>> = {')[1]?.split('\n};')[0];
assert.ok(campus&&reciprocal,'campus or county route is missing');
const identities=read('src/data/high-school-football/school-identities.ts');
const sources=read('docs/football-authority/BATCH014-FOURTH-FIVE-SOURCES.md');
const leads=new Set();
for(const slug of slugs){
 const guide=guides[slug],countySlug=counties.get(slug),record=registry.schoolRecords.find(s=>s.slug===slug);
 assert.equal(guide?.slug,slug,slug+' missing distinct editorial');
 assert.ok(loader.includes("'"+slug+"'"),slug+' absent from SSR loader');
 assert.equal(record?.status,b014Certified?'VERIFIED':'IMPLEMENTED',slug+' missing source implementation status');
 assert.equal(record?.actualProductionVerified,b014Certified,slug+' cannot be browser-certified before acceptance');
 assert.equal([...campus.matchAll(new RegExp("'"+slug+"'\\s*:\\s*'"+countySlug+"'","g"))].length,1,slug+' campus mapping missing or duplicated');
 const row=reciprocal.match(new RegExp("'"+countySlug+"'\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*,"));
 assert.ok(row,countySlug+' county list missing');
 assert.ok(row[1].includes("slug: '"+slug+"'"),slug+' missing county reciprocal link');
 assert.ok(sources.includes('`'+slug+'`'),slug+' missing first-party dossier');
 const identitiesForSchool=[...identities.matchAll(new RegExp("slug:\\s*'"+slug+"'\\s*,\\s*mascot:\\s*'([^']+)'",'g'))];
 assert.equal(identitiesForSchool.length,1,slug+' duplicate or absent sourced mascot identity');
 assert.equal(identitiesForSchool[0][1],mascots.get(slug),slug+' mascot identity mismatch');
 assert.ok(guide.campus?.sourceUrl?.startsWith('https://')&&guide.schedule?.sourceUrl?.startsWith('https://'),slug+' missing campus or sports source');
 assert.ok(guide.overview?.length>=4&&guide.milestones?.length>=2&&guide.faq?.length>=3,slug+' requires useful researched guide sections');
 const lead=guide.overview[0].trim().toLowerCase();
 assert.ok(lead.length>=115&&!leads.has(lead),slug+' thin/duplicated overview lead');
 leads.add(lead);
}
assert.ok(guides.dawson.overview.some(t=>t.includes('Welch')),'Dawson city/district collision caveat required');
assert.ok(guides.danbury.overview.some(t=>t.includes('John Launius')&&t.includes('Rusty Sample')),'Distinct Danbury football/athletic director roles required');
console.log('PASS: Batch014 fourth five source-authored SSR guides, campus↔county, official identity, prior 305 VERIFIED, no false Chrome promotion');

assert.equal(registry.schoolRecords.filter(x=>x.batch===14&&x.status==='VERIFIED').length,b014Certified?25:0,'Batch014 graduation must have signed exact production evidence');
assert.equal(registry.schoolRecords.filter(x=>x.batch===14&&x.status==='IMPLEMENTED').length,b014Certified?0:25,'all 25 source-authored Batch014 schools must remain accounted for');
