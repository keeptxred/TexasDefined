import fs from 'node:fs';
import assert from 'node:assert/strict';
import { certifiedBatch017 } from './verified-football-b017-certificate.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const reg=JSON.parse(read('docs/football-authority/REGISTRY.json'));
// A graduated cohort remains immutable after the next batch is assigned.
const historicalBatch017=reg.batch?.number===17?reg.batch:reg.completedBatches?.find(batch=>batch.number===17);
assert.ok(historicalBatch017,'Signed Batch017 historical certificate must be retained');
const source=read('src/data/high-school-football/program-editorial-b017-group5.ts');
const edges=read('src/data/high-school-football/batch017-county-edges.ts');
const server=read('src/data/high-school-football/football-program-profile.server.ts');
const slugs=["euless-trinity","eustace","evadale","evant","everman"];
assert.equal(historicalBatch017.number,17);
assert.deepEqual(historicalBatch017.slugs.slice(20,25),slugs);
const graduatedB017=certifiedBatch017(reg);
assert.equal(reg.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch<17).length,380,'Preserve 380 earlier signed certificates');
assert.equal(reg.schoolRecords.filter(x=>x.status==='VERIFIED').length,graduatedB017?405:380,'Only exact signed Chrome may certify Batch017');
assert.equal(reg.schoolRecords.filter(x=>x.status==='IMPLEMENTED'&&x.batch===17).length,graduatedB017?0:25);
assert.equal(reg.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length,887);
for(const slug of slugs){const row=reg.schoolRecords.find(x=>x.slug===slug);assert.equal(row?.status,graduatedB017?'VERIFIED':'IMPLEMENTED');assert.equal(row?.actualProductionVerified,graduatedB017);assert.ok(source.includes(JSON.stringify(slug)+': {'));assert.ok(edges.includes("slug: '"+slug+"'"));}
assert.equal((source.match(/"slug": "/g)||[]).length,5);
assert.ok(server.includes('getBatch017FifthFiveEditorial(canonicalSlug)'));
for(const s of ['1968','Trojans','350 FM 316 South','Eustace Bulldogs','908 FM 105','2026 campus construction','six-man','339 N Memory Ln','1000 S Race St','Hall of Honor','6ABBFB2026.pdf','3AD1FB2026.pdf','2AD2FB2026.pdf','1AD1FB2026.pdf','5AD2FB2026.pdf'])assert.ok(source.includes(s),'Missing source-specific fact '+s);
for(const county of ['tarrant','henderson','jasper','coryell'])assert.ok(edges.includes("county: '"+county+"'"),county+' missing');
assert.ok(!source.includes('"season":')&&!source.includes('"photo":'));
console.log('PASS Batch017 fifth-five: all 25 source implemented with distinct 11-man/six-man school guides, no invented Chrome certification');
