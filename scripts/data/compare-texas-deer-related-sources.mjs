#!/usr/bin/env node
/** Compare seven official TPWD deer-linked county/CWD/tagging/screwworm source fingerprints.
 * Digests are evidence of legal-source changes, never a substitute for source text.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root='artifacts/deer-related-legal';
const current=JSON.parse(fs.readFileSync(root+'/current.json','utf8'));
assert.equal(current.sources.length,7,'Exactly seven official sources expected');
assert.equal(new Set(current.sources.map(s=>s.id)).size,7);
for(const source of current.sources) {
  assert.match(source.url,/^https:\/\/tpwd\.texas\.gov\//);
  assert.match(source.sha256,/^[0-9a-f]{64}$/);
  assert.ok(source.bytes>=200);
}
const prevPath=process.env.DEER_RELATED_PREVIOUS || '';
const prior=prevPath&&fs.existsSync(prevPath)?JSON.parse(fs.readFileSync(prevPath,'utf8')):null;
const validPrior=prior?.seasonYear===current.seasonYear&&prior.sources?.length===7?prior:null;
const old=new Map((validPrior?.sources||[]).map(s=>[s.id,s]));
const changed=validPrior?current.sources.filter(s=>s.sha256!==old.get(s.id)?.sha256)
  .map(s=>({id:s.id,url:s.url,oldHash:old.get(s.id)?.sha256||null,newHash:s.sha256})):[];
const report={checkedAt:current.checkedAt,seasonYear:current.seasonYear,
  complete:true,firstBaseline:!validPrior,changedCount:changed.length,changed};
fs.writeFileSync(root+'/comparison.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({verifiedSources:7,firstBaseline:!validPrior,changed:changed.map(s=>s.id)}));
