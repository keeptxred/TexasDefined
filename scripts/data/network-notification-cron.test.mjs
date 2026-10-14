import test from 'node:test';
import assert from 'node:assert/strict';
import {networkCronLaunchArmed,runNetworkNotificationCron} from '../../src/data/network-notification-cron.server.ts';
const a='11111111-1111-4111-8111-111111111111';
const row={id:a,claim_token:'22222222-2222-4222-8222-222222222222',
 event_key:'notice:'+a,event_type:'application_received',recipient_email:'owner@example.invalid',
 payload:{business_name:'Test Business'},attempts:1};
const proof={messageId:'AAMkSENTid1234=',reference:'graph-sentitems-header-match/'+a+'/AAMkSENTid1234='};
import {NETWORK_LAUNCH_EVIDENCE_KEYS,NETWORK_LAUNCH_FEATURE_KEYS} from '../../src/data/network-atomic-launch-readiness.server.ts';
const env={
 SUPABASE_URL:'https://ftkznprjljkhymknvhye.supabase.co',
 SUPABASE_SERVICE_ROLE_KEY:'eyJ'+ 'x'.repeat(30)+'.eyJ'+ 'y'.repeat(30)+'.syntheticSignature'+ 'z'.repeat(45),
 NETWORK_ADMIN_ACCESS_KEY:'synthetic-admin-'+ 'x'.repeat(36),
 STRIPE_SECRET_KEY:'sk_live_SYNTHETIC_'+ 'x'.repeat(70),
 NETWORK_STRIPE_WEBHOOK_SECRET:'whsec_SYNTHETIC_'+ 'x'.repeat(70),
 NETWORK_GRAPH_TENANT_ID:a,
 NETWORK_GRAPH_CLIENT_ID:'22222222-2222-4222-8222-222222222222',
 NETWORK_GRAPH_CLIENT_SECRET:'synthetic-client-'+'x'.repeat(40),
 NETWORK_GRAPH_MAILBOX:'admin@texasdefined.com',
 NETWORK_LAUNCH_ATOMIC_VERIFIED:'true',
};
for(const flag of NETWORK_LAUNCH_FEATURE_KEYS)env[flag]='true';
const proofs={};
for(const key of NETWORK_LAUNCH_EVIDENCE_KEYS)proofs[key]={
 passed:true,reference:'synthetic-test-only/'+key+'/mock-evidence',
 completedAt:'2026-10-11T18:00:00Z',
};
env.NETWORK_LAUNCH_EVIDENCE_JSON=JSON.stringify(proofs);
test('cron cannot arm with a single disabled feature or without atomic cutover receipt',()=>{
 assert.equal(networkCronLaunchArmed(env),true);
 for(const name of Object.keys(env)){
  assert.equal(networkCronLaunchArmed({...env,[name]:''}),false,name);
 }
});
test('no database claim or send occurs if mailbox/token preflight fails',async()=>{
 let claims=0,sends=0;
 await assert.rejects(runNetworkNotificationCron({
  preflight:async()=>{throw Error('scope refused')},
  listHeld:async()=>[],claim:async()=>{claims++;return [row]},
  send:async()=>{sends++;return {status:202}},
  proof:async()=>proof,reconcile:async()=>true,
 }),/scope refused/);
 assert.equal(claims,0);
 assert.equal(sends,0);
});
test('Sent Items proof allows exact row reconciliation and never resends held rows',async()=>{
 let sends=0,reconciles=0;
 const result=await runNetworkNotificationCron({
  preflight:async()=>{},listHeld:async()=>[row],
  claim:async()=>[],
  send:async()=>{sends++;return {status:202}},
  proof:async()=>proof,reconcile:async(p,v)=>{
    reconciles++;assert.equal(p.id,a);assert.equal(v.messageId,proof.messageId);return true;
  },
 });
 assert.equal(sends,0);assert.equal(reconciles,1);
 assert.deepEqual(result,{claimed:0,previouslyHeld:1,verified:1,unconfirmed:0,rejected:0});
});
test('accepted without independent proof remains held; no automatic replay',async()=>{
 let sends=0,acks=0;
 const result=await runNetworkNotificationCron({
  preflight:async()=>{},listHeld:async()=>[],claim:async()=>[row],
  send:async()=>{sends++;return {status:202}},
  proof:async()=>null,reconcile:async()=>{acks++;return true},
 });
 assert.equal(sends,1);assert.equal(acks,0);
 assert.equal(result.unconfirmed,1);assert.equal(result.verified,0);
});
test('Graph rejection, crash, 429 and 503 never auto-retry or acknowledge as sent',async()=>{
 for(const status of [429,400,503,undefined]){
  let sends=0,proofs=0,acks=0;
  const output=await runNetworkNotificationCron({
   preflight:async()=>{},listHeld:async()=>[],claim:async()=>[row],
   send:async()=>{sends++;if(status===undefined)throw Error('unknown result');return {status}},
   proof:async()=>{proofs++;return proof},
   reconcile:async()=>{acks++;return true},
  });
  assert.equal(sends,1);assert.equal(proofs,0);assert.equal(acks,0);
  assert.equal(output.verified,0);
 }
});
test('duplicate held/new row is rejected, corrupt claims fail before sending',async()=>{
 const deps={preflight:async()=>{},listHeld:async()=>[row],claim:async()=>[row],
  send:async()=>{throw Error('send must never execute')},
  proof:async()=>null,reconcile:async()=>false};
 await assert.rejects(runNetworkNotificationCron(deps),/claimed twice/);
 await assert.rejects(runNetworkNotificationCron({...deps,listHeld:async()=>[],
  claim:async()=>[{...row,attempts:0}]}),/claim invalid/);
});
