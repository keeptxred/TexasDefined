import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const registryFile='docs/football-authority/REGISTRY.json';
const output='src/data/high-school-football/google-index-eligibility.generated.json';
const registry=JSON.parse(await readFile(registryFile,'utf8'));
const stored=JSON.parse(await readFile(output,'utf8'));
assert.equal(registry.schoolRecords.length,1292,'Registry size changed; review before automated update');
assert(stored.teamIndexableSlugs.length>=900&&stored.districtIndexableSlugs.length>=130,'Protection baseline is unexpectedly small');
const known=new Set(registry.schoolRecords.map(r=>r.slug));
for(const slug of stored.teamIndexableSlugs)assert(known.has(slug),'Previously protected team missing from authority registry: '+slug);
const verified=registry.schoolRecords.filter(r=>r.status==='VERIFIED'&&r.actualProductionVerified===true).map(r=>r.slug);
const teamIndexableSlugs=[...new Set([...stored.teamIndexableSlugs,...verified])].sort();
const districtIndexableSlugs=[...new Set(stored.districtIndexableSlugs)].sort();
const updated={schemaVersion:1,baseline:'Finalized owner GSC Web Search 2026-08-01 to 2026-10-28; private URL-level measurements not published',registry:registryFile,teamIndexableSlugs,districtIndexableSlugs};
const expected=JSON.stringify(updated,null,2)+'\n';
if(process.argv.includes('--check')){
  assert.equal(await readFile(output,'utf8'),expected,'The snapshot differs from the verified authority registry');
  console.log('PASS: protected URLs and newly verified teams remain Google eligible');
}else{
  await writeFile(output,expected,'utf8');
  console.log('Refreshed protected football Google cohorts without exposing private GSC measurements');
}
