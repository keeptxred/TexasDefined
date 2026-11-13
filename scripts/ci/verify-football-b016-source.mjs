import assert from 'node:assert/strict';
import { certifiedBatch016 } from './verified-football-b016-certificate.mjs';
import { certifiedBatch017 } from './verified-football-b017-certificate.mjs';
import {readFileSync} from 'node:fs';
const read=(p)=>readFileSync(p,'utf8');
const expected=[
'early','earth-springlake','east-bernard','east-chambers','eastland',
'edcouch-elsa','eden','edgewood','edinburg','edinburg-economedes',
'edinburg-north','edinburg-vela','edna','el-campo','el-maton-tidehaven',
'el-paso','el-paso-americas','el-paso-andress','el-paso-austin','el-paso-bel-air',
'el-paso-bowie','el-paso-burges','el-paso-chapin','el-paso-coronado','el-paso-del-valle'];
assert.equal(new Set(expected).size,25);
const loader=read('src/data/high-school-football/football-program-profile.server.ts');
const registry=JSON.parse(read('docs/football-authority/REGISTRY.json'));
const records=new Map(registry.schoolRecords.map(row=>[row.slug,row]));
const graduated=certifiedBatch016(registry);
for(const slug of expected)assert.equal(records.get(slug)?.status,graduated?'VERIFIED':'NOT_REVIEWED',slug+' must not be prematurely certified');
const verifiedCount=registry.schoolRecords.filter(x=>x.status==='VERIFIED').length;
const expectedVerified=certifiedBatch017(registry)?405:(graduated?380:355);
assert.equal(verifiedCount,expectedVerified,'Historical signed Batch016/017 graduations must be preserved');
const files=[
['program-editorial-b016-early.ts',['early']],
['program-editorial-b016-earth.ts',['earth-springlake']],
['program-editorial-b016-group1.ts',['east-bernard','east-chambers','eastland']],
['program-editorial-b016-group2.ts',expected.slice(5,10)],
['program-editorial-b016-group3.ts',expected.slice(10,15)],
['program-editorial-b016-group4.ts',expected.slice(15,20)],
['program-editorial-b016-group5.ts',expected.slice(20,25)]
];
for(const [name,slugs] of files){
 const source=read('src/data/high-school-football/'+name);
 assert.ok(source.includes('FootballProgramEditorial'),name+' missing typed editorial');
 for(const slug of slugs){
  assert.ok(source.includes('"slug": "'+slug+'"')||source.includes("slug: '"+slug+"'"),name+' missing '+slug);
  assert.ok(source.includes(slug),name+' missing slug identity');
 }
}
for(const method of ['getBatch016EarlyEditorial','getBatch016EarthEditorial','getBatch016GroupOneEditorial','getBatch016SecondFiveEditorial','getBatch016ThirdFiveEditorial','getBatch016FourthFiveEditorial','getBatch016FifthFiveEditorial']){
 assert.ok(loader.includes(method+'(canonicalSlug)'),method+' not used in SSR resolution');
 assert.ok(loader.includes('import { '+method+' }'),method+' not imported');
}
for(const name of ['program-editorial-b016-group1.ts','program-editorial-b016-group2.ts','program-editorial-b016-group3.ts','program-editorial-b016-group4.ts','program-editorial-b016-group5.ts']){
 const source=read('src/data/high-school-football/'+name);
 const match=source.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
 assert.ok(match,name+' editorial map missing');
 const guideMap=JSON.parse(match[1].replace(/,\s*}$/, '}')); // TS object permits a trailing comma; JSON does not
 for(const [slug,g] of Object.entries(guideMap)){
  assert.equal(g.slug,slug);
  assert.ok(g.overview?.length>=4,slug+' thin overview');
  assert.ok(g.faq?.length>=3,slug+' missing practical FAQs');
  assert.ok(g.milestones?.length>=2,slug+' missing source milestones');
  assert.ok(g.schedule?.sourceUrl?.startsWith('https://'),slug+' missing official schedule source');
  assert.ok(g.notice?.sourceUrl?.startsWith('https://'),slug+' missing notice source');
  for(const m of g.milestones)assert.ok(m.sourceUrl?.startsWith('https://'),slug+' missing milestone source');
 }
}
console.log('PASS: Batch016 25 distinct source-authored SSR guides; 355 historical VERIFIED preserved; no premature certification. This is NOT production/Chrome certification.');
