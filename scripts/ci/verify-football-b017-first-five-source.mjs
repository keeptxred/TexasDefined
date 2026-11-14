import fs from 'node:fs';
import assert from 'node:assert/strict';
import { certifiedBatch017 } from './verified-football-b017-certificate.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const registry=JSON.parse(read('docs/football-authority/REGISTRY.json'));
// A graduated cohort remains immutable after the next batch is assigned.
const historicalBatch017=registry.batch?.number===17?registry.batch:registry.completedBatches?.find(batch=>batch.number===17);
assert.ok(historicalBatch017,'Signed Batch017 historical certificate must be retained');
const editorial=read('src/data/high-school-football/program-editorial-b017-group1.ts');
const edges=read('src/data/high-school-football/batch017-county-edges.ts');
const server=read('src/data/high-school-football/football-program-profile.server.ts');
const school=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county=read('src/routes/$kind.$slug.lazy.tsx');
const expected=['el-paso-eastlake','el-paso-eastwood','el-paso-el-dorado','el-paso-franklin','el-paso-hanks'];
assert.equal(historicalBatch017.number,17);
assert.deepEqual(historicalBatch017.slugs.slice(0,5),expected);
const graduatedB017=certifiedBatch017(registry);
assert.equal(registry.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch<17).length,380,'Preserve 380 signed earlier school records');
assert.equal(registry.schoolRecords.filter(x=>x.status==='VERIFIED').length,graduatedB017?405:380,'Only signed Batch017 evidence permits 25 more certified schools');
assert.ok(graduatedB017||!registry.schoolRecords.some(r=>r.batch===17&&r.status==='VERIFIED'),'Batch017 may be VERIFIED only by signed Chrome witness');
for(const slug of expected){
  const row=registry.schoolRecords.find(r=>r.slug===slug);
  assert.equal(row?.batch,17);
  assert.equal(row?.status,graduatedB017?'VERIFIED':'IMPLEMENTED','First five must be sourced, and Chrome VERIFIED only if signed');
  assert.equal(row?.actualProductionVerified,graduatedB017);
  assert.ok(editorial.includes(JSON.stringify(slug)+': {'),'Missing individually sourced editorial '+slug);
  assert.ok(edges.includes("slug: '"+slug+"'"),'Missing county edge '+slug);
}
assert.equal((editorial.match(/"slug": "el-paso-/g)||[]).length,5,'Exactly five authored guides');
for(const value of [
  '13000 Emerald Pass Ave','2430 McRae Blvd','12401 Edgemere Blvd',
  '900 Resler Drive','2001 Lee Trevino','JB Frontz','Julio Lopez',
  'Ruben Torres','Excalibur Stadium','6ABBFB2026.pdf','5AD1FB2026.pdf',
  'https://www.sisd.net/article/2627074','https://hanks.yisd.net/live-feed'
])assert.ok(editorial.includes(value),'Missing distinct primary-source evidence '+value);
assert.ok(server.includes('getBatch017FirstFiveEditorial(canonicalSlug)'),'SSR overlay missing');
assert.ok(school.includes('BATCH017_FOOTBALL_COUNTY_EDGES.map'),'School county edge missing');
assert.ok(county.includes('BATCH017_FOOTBALL_COUNTY_EDGES.filter'),'Reciprocal county edge missing');
// Future cohorts may add counties; preserve this cohort's five link identities.
assert.ok((edges.match(/county: 'el-paso'/g)||[]).length>=5,'Preserve the first five El Paso County campuses across later groups');
assert.ok(!editorial.includes('"season":'),'Do not manufacture current scoreboards');
assert.ok(!editorial.includes('"photo":'),'Do not assert unlicensed photo rights');
console.log('PASS Batch017 first-five: five distinct official-source guides, reciprocal county edges, no premature Chrome certification');
