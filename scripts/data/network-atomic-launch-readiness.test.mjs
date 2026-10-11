import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectNetworkAtomicLaunch,networkCustomerLaunchArmed,NETWORK_LAUNCH_EVIDENCE_KEYS,NETWORK_LAUNCH_FEATURE_KEYS}
 from '../../src/data/network-atomic-launch-readiness.server.ts';

const uuid1='11111111-1111-4111-8111-111111111111',
uuid2='22222222-2222-4222-8222-222222222222';
function fixture(){
 const env={
  SUPABASE_URL:'https://ftkznprjljkhymknvhye.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY:'test-only-placeholder-do-not-use-as-a-token-'+ 'x'.repeat(100),
  NETWORK_ADMIN_ACCESS_KEY:'admin-key-test-placeholder-'+ 'x'.repeat(40),
  STRIPE_SECRET_KEY:'sk_live_NOTREAL_'+'x'.repeat(80),
  STRIPE_WEBHOOK_SECRET:'whsec_NOTREAL_'+'x'.repeat(80),
  NETWORK_STRIPE_MODE:'live',
  NETWORK_GRAPH_TENANT_ID:uuid1,NETWORK_GRAPH_CLIENT_ID:uuid2,
  NETWORK_GRAPH_CLIENT_SECRET:'not-real-secret-'+ 'x'.repeat(36),
  NETWORK_GRAPH_MAILBOX:'admin@texasdefined.com',
 };
 for(const f of NETWORK_LAUNCH_FEATURE_KEYS)env[f]='true';
 const proof={};
 for(const key of NETWORK_LAUNCH_EVIDENCE_KEYS)proof[key]={
  passed:true,reference:'synthetic-test-only/'+key+'/mock-evidence',
  completedAt:'2026-10-11T18:00:00Z',
 };
 return {env,proof};
}
test('launch is all-or-nothing and requires complete config AND independent evidence',()=>{
 const {env,proof}=fixture();
 const all=inspectNetworkAtomicLaunch(env,proof);
 assert.equal(all.ready,true);
 assert.equal(all.missing.length,0);
 for(const f of NETWORK_LAUNCH_FEATURE_KEYS){
  const result=inspectNetworkAtomicLaunch({...env,[f]:'false'},proof);
  assert.equal(result.ready,false,f);
  assert.ok(result.missing.includes('feature:'+f));
 }
 for(const e of NETWORK_LAUNCH_EVIDENCE_KEYS){
  const result=inspectNetworkAtomicLaunch(env,{...proof,[e]:{...proof[e],passed:false}});
  assert.equal(result.ready,false,e);
  assert.ok(result.missing.includes('e2e:'+e));
 }
});
test('flags by themselves cannot certify a single launch',()=>{
 const {env}=fixture();
 const result=inspectNetworkAtomicLaunch(env,{});
 assert.equal(result.ready,false);
 assert.equal(result.missing.filter(x=>x.startsWith('e2e:')).length,NETWORK_LAUNCH_EVIDENCE_KEYS.length);
});
test('configuration rejects missing provider credentials and wrong production host',()=>{
 const {env,proof}=fixture();
 for(const [name,value] of [
  ['STRIPE_SECRET_KEY','sk_test_not_allowed'],['STRIPE_WEBHOOK_SECRET',''],
  ['NETWORK_GRAPH_CLIENT_SECRET',''],['NETWORK_GRAPH_MAILBOX','elsewhere@example.invalid'],
  ['SUPABASE_URL','https://other.supabase.co'],['NETWORK_ADMIN_ACCESS_KEY','x'],
['NETWORK_STRIPE_MODE','test'],
 ]){
  const result=inspectNetworkAtomicLaunch({...env,[name]:value},proof);
  assert.equal(result.ready,false,name);
  assert.ok(result.missing.some(x=>x.startsWith('config:')));
 }
});
test('output does not expose credentials or private acceptance evidence references',()=>{
 const {env,proof}=fixture();
 const outcome=inspectNetworkAtomicLaunch(env,proof);
 const json=JSON.stringify(outcome);
 assert.ok(!json.includes(env.STRIPE_SECRET_KEY));
 assert.ok(!json.includes(proof.graphMessageReceived.reference));
});

test('public customer surfaces do not activate before complete signed-off acceptance manifest',()=>{
 const {env,proof}=fixture();
 assert.equal(networkCustomerLaunchArmed(env),false);
 const approved={...env,NETWORK_LAUNCH_EVIDENCE_JSON:JSON.stringify(proof)};
 assert.equal(networkCustomerLaunchArmed(approved),true);
 for(const e of NETWORK_LAUNCH_EVIDENCE_KEYS){
  const missing={...proof,[e]:{...proof[e],passed:false}};
  assert.equal(networkCustomerLaunchArmed({...approved,NETWORK_LAUNCH_EVIDENCE_JSON:JSON.stringify(missing)}),false);
 }
 for(const v of ['', 'not-json', '[]', '{}', 'x'.repeat(17_000)]){
  assert.equal(networkCustomerLaunchArmed({...approved,NETWORK_LAUNCH_EVIDENCE_JSON:v}),false);
 }
 assert.equal(networkCustomerLaunchArmed({...approved,STRIPE_WEBHOOK_SECRET:''}),false);
});
