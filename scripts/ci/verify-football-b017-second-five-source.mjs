import fs from 'node:fs';
import assert from 'node:assert/strict';
import { certifiedBatch017 } from './verified-football-b017-certificate.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
// A graduated cohort remains immutable after the next batch is assigned.
const historicalBatch017=reg.batch?.number===17?reg.batch:reg.completedBatches?.find(batch=>batch.number===17);
assert.ok(historicalBatch017,'Signed Batch017 historical certificate must be retained');
const source=read('src/data/high-school-football/program-editorial-b017-group2.ts');
const edges=read('src/data/high-school-football/batch017-county-edges.ts');
const server=read('src/data/high-school-football/football-program-profile.server.ts');
const school=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county=read('src/routes/$kind.$slug.lazy.tsx');
const slugs=['el-paso-irvin','el-paso-jefferson','el-paso-montwood','el-paso-parkland','el-paso-pebble-hills'];
assert.equal(historicalBatch017.number,17);
assert.deepEqual(historicalBatch017.slugs.slice(5,10),slugs);
const graduatedB017=certifiedBatch017(reg);
assert.equal(reg.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch<17).length,380,'Preserve 380 signed earlier school records');
assert.equal(reg.schoolRecords.filter(x=>x.status==='VERIFIED').length,graduatedB017?405:380,'Only signed Batch017 evidence permits 25 more certified schools');
assert.ok(graduatedB017||reg.schoolRecords.filter(x=>x.status==='IMPLEMENTED'&&x.batch===17).length>=10,'Retain at least ten sourced schools or signed graduation');
assert.ok(reg.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length<=902);
assert.ok(graduatedB017||reg.schoolRecords.filter(x=>x.batch===17).every(x=>x.status!=='VERIFIED'&&x.actualProductionVerified!==true),'No false Batch017 Chrome promotion');
for(const slug of slugs){
  const row=reg.schoolRecords.find(x=>x.slug===slug);
  assert.equal(row?.status,graduatedB017?'VERIFIED':'IMPLEMENTED',slug+' source status or signed Chrome graduation');
  assert.equal(row?.actualProductionVerified,graduatedB017);
  assert.ok(source.includes(JSON.stringify(slug)+': {'),'Missing unique guide '+slug);
  assert.ok(edges.includes("slug: '"+slug+"'"),'Missing shared campus-county edge '+slug);
}
assert.equal((source.match(/"slug": "el-paso-/g)||[]).length,5,'Exactly five independent guides');
assert.ok((edges.match(/county: 'el-paso'/g)||[]).length>=10,'Retain ten El Paso campus edges');
for(const s of ['5400 Sanders Ave','4700 Alameda Ave','12000 Montwood Drive','5932 Quail Ave','14400 Pebble Hills Blvd','Tony Martinez','Leigh McWhorter','Ryan Warner','Ivan Rangel','1949','2022','4AD2FB2026.pdf','5AD2FB2026.pdf','5AD1FB2026.pdf','6ABBFB2026.pdf'])
  assert.ok(source.includes(s),'Missing official-source-specific detail '+s);
assert.ok(server.includes('getBatch017SecondFiveEditorial(canonicalSlug)'));
assert.ok(school.includes('BATCH017_FOOTBALL_COUNTY_EDGES.map'));
assert.ok(county.includes('BATCH017_FOOTBALL_COUNTY_EDGES.filter'));
assert.ok(!source.includes('"season":')&&!source.includes('"photo":'),'No unsourced score or licensed photo');
console.log('PASS Batch017 second-five source contract: ten sourced, zero new production verified, reciprocal El Paso County links');
