#!/usr/bin/env node
import test from 'node:test';
import assert from 'node:assert/strict';
import {selectLiveVerifiedRelease} from './pin-football-b010-production-release.mjs';
const sha='f'.repeat(40),old='123e4567-e89b-42d3-a456-426614174000';
const current='123e4567-e89b-42d3-a456-426614174001';
const proof=(worker,commit=sha)=>({id:778,sha:commit,environment:'texasdefined-verified-worker',
  payload:{commit_sha:commit,worker_version:worker,source_run_id:'1234567',
    verified_at:'2026-10-29T03:40:00Z'}});
test('pins current live Worker to exact historical source SHA and verified ledger',()=>{
  const accepted=selectLiveVerifiedRelease([proof(old),proof(current)],current);
  assert.equal(accepted?.worker,current);
  assert.equal(accepted?.sha,sha);
  assert.equal(accepted?.runId,1234567);
});
test('refuses to attribute published Worker to a newer github commit',()=>{
  const mismatched=proof(old);
  mismatched.payload.commit_sha='e'.repeat(40);
  assert.equal(selectLiveVerifiedRelease([mismatched],old),null);
  assert.equal(selectLiveVerifiedRelease([proof(old)],current),null);
  assert.equal(selectLiveVerifiedRelease([proof(old)],''),null);
});
test('reject malformed or untrusted deployment metadata',()=>{
  assert.equal(selectLiveVerifiedRelease([{...proof(old),payload:'not json'}],old),null);
  assert.equal(selectLiveVerifiedRelease([{...proof(old),environment:'staging'}],old),null);
  const missing=proof(old);missing.payload.source_run_id='';
  assert.equal(selectLiveVerifiedRelease([missing],old),null);
});
