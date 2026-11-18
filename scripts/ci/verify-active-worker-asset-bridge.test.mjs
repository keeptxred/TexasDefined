import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { validCurrentWorkerPage, assertBridgeCapture } from './verify-active-worker-asset-bridge.mjs';

const c211='c211c0ca-940b-4bf9-84b3-4d363cc5120c';
const good={status:200,mime:'text/html; charset=utf-8',workerVersion:c211,
  html:'<html><head><script type="module" src="/assets/main-12345678.js"></script></head><body>'
    +'TexasDefined production page</body></html>',challenge:false};

test('requires the exact current Worker version plus original HTML and JS on both public origins',()=>{
  assert.equal(validCurrentWorkerPage(good,c211),true);
  for(const change of [
    {status:503},{mime:'application/json'},{workerVersion:'0f9a146d-7b91-45d2-b1df-9813c80326e8'},
    {challenge:true},{html:'<html>loading without a verified JS asset</html>'},
  ]){
    assert.equal(validCurrentWorkerPage({...good,...change},c211),false);
  }
  assert.equal(validCurrentWorkerPage(good,'not-a-worker'),false);
});

test('does not accept false outgoing version or incomplete four-route provenance',()=>{
  const paths=['/','/property-tax/taxing-unit/ennis-isd',
    '/property-tax/taxing-unit/yoakum-hospital-district',
    '/texas-high-school-football-teams/shepherd'];
  const snap={snapshots:[{pages:paths.map(path=>({path,version:c211,assets:[
    {path:'/assets/main-abc123.js',wasAvailable:true,preSha256:'a'.repeat(64)}
  ]}))}]};
  assert.deepEqual(assertBridgeCapture(snap,c211),{expected:c211,verifiedPages:4});
  assert.throws(()=>assertBridgeCapture(snap,'7ed30068-bd0d-4ddb-b4f2-ddfe3909dadf'),/does not match exact active Worker/);
  assert.throws(()=>assertBridgeCapture({snapshots:[{pages:[]} ]},c211),/complete freshly captured/);
  const invalid=structuredClone(snap);
  invalid.snapshots[0].pages[3].assets=[];
  assert.throws(()=>assertBridgeCapture(invalid,c211),/lacks verified JS/);
});

test('only exact named c211 bridge with time-limit and immutable proved predecessor survives',()=>{
  const workflow=readFileSync('.github/workflows/deploy-production.yml','utf8');
  assert.match(workflow,/c211c0ca-940b-4bf9-84b3-4d363cc5120c/);
  assert.match(workflow,/2026-11-19T14:32:31Z/);
  assert.match(workflow,/prior_run=43884259995/);
  assert.match(workflow,/prior_sha=3bb9a544e38e65d8b80ddf375ea58ddd5964b8bc/);
  assert.match(workflow,/source_worker=64e9e06f-f80e-424c-8f85-dc6e210463ac/);
  assert.match(workflow,/verify-prior-asset-handoff\.mjs/);
  assert.match(workflow,/verify-prior-deploy-job-eligibility\.mjs/);
  assert.match(workflow,/verify-active-worker-asset-bridge\.mjs live/);
  assert.match(workflow,/verify-active-worker-asset-bridge\.mjs snapshot/);
  assert.match(workflow,/retain-critical-hashed-assets\.mjs --retain/);
  assert.match(workflow,/verify-referenced-assets-production\.mjs --verify/);
});
