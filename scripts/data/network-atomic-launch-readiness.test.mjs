import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectNetworkAtomicLaunch,networkCustomerLaunchArmed,networkIsolatedStagingArmed,networkRequestHostAllowed,NETWORK_LAUNCH_EVIDENCE_KEYS,NETWORK_LAUNCH_FEATURE_KEYS}
 from '../../src/data/network-atomic-launch-readiness.server.ts';

const uuid1='11111111-1111-4111-8111-111111111111',
uuid2='22222222-2222-4222-8222-222222222222';
function fixture(){
 const env={
  SUPABASE_URL:'https://ftkznprjljkhymknvhye.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY:'eyJ'+ 'x'.repeat(30)+'.eyJ'+ 'y'.repeat(30)+'.syntheticSignature'+ 'z'.repeat(45),
  NETWORK_ADMIN_ACCESS_KEY:'admin-key-test-placeholder-'+ 'x'.repeat(40),
  STRIPE_SECRET_KEY:'sk_live_NOTREAL_'+'x'.repeat(80),
  NETWORK_STRIPE_WEBHOOK_SECRET:'whsec_NOTREAL_'+'x'.repeat(80),
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
test('marketing plan benefits require independent real customer delivery proof, not source or flags',()=>{
 const {env,proof}=fixture();
 const missing={...proof,planBenefitsDelivered:{...proof.planBenefitsDelivered,passed:false}};
 const out=inspectNetworkAtomicLaunch(env,missing);
 assert.equal(out.ready,false);
 assert.ok(out.missing.includes('e2e:planBenefitsDelivered'));
 assert.equal(inspectNetworkAtomicLaunch(env,proof).ready,true);
});
test('new hosted Website tier must be independently delivered before a one-cutover production launch',()=>{
 const {env,proof}=fixture();
 assert.ok(NETWORK_LAUNCH_EVIDENCE_KEYS.includes('hostedWebsiteDelivered'));
 const missing={...proof}; delete missing.hostedWebsiteDelivered;
 const outcome=inspectNetworkAtomicLaunch(env,missing);
 assert.equal(outcome.ready,false);
 assert.ok(outcome.missing.includes('e2e:hostedWebsiteDelivered'));
 assert.equal(networkCustomerLaunchArmed({...env,NETWORK_LAUNCH_EVIDENCE_JSON:JSON.stringify(missing)}),false);
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
  ['STRIPE_SECRET_KEY','sk_test_not_allowed'],['NETWORK_STRIPE_WEBHOOK_SECRET',''],
  ['NETWORK_GRAPH_CLIENT_SECRET',''],['NETWORK_GRAPH_MAILBOX','elsewhere@example.invalid'],
  ['SUPABASE_URL','https://other.supabase.co'],['NETWORK_ADMIN_ACCESS_KEY','x'],
['NETWORK_STRIPE_MODE','test'],
 ]){
  const result=inspectNetworkAtomicLaunch({...env,[name]:value},proof);
  assert.equal(result.ready,false,name);
  assert.ok(result.missing.some(x=>x.startsWith('config:')));
 }
});
test('modern opaque Supabase server secret and legacy signed service JWT are both accepted',()=>{
 const {env,proof}=fixture();
 const opaque={...env,SUPABASE_SERVICE_ROLE_KEY:'sb_secret_SYNTHETIC_PRIVATE_'+ 'x'.repeat(58)};
 assert.equal(inspectNetworkAtomicLaunch(opaque,proof).ready,true);
 for(const value of ['sb_publishable_UNPRIVILEGED_'+'x'.repeat(58),
   'sb_secret_short','not-a-service-key','']){
  assert.equal(inspectNetworkAtomicLaunch({...env,SUPABASE_SERVICE_ROLE_KEY:value},proof).ready,false,value);
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
 for(const v of ['', 'not-json', '[]', '{}', 'x'.repeat(5_200)]){
  assert.equal(networkCustomerLaunchArmed({...approved,NETWORK_LAUNCH_EVIDENCE_JSON:v}),false);
 }
 assert.equal(networkCustomerLaunchArmed({...approved,NETWORK_STRIPE_WEBHOOK_SECRET:''}),false);
});

test('full customer staging can run only on separate hosted DB and Stripe TEST mode, never production',()=>{
 const {env}=fixture();
 const stage={...env,
  NETWORK_ISOLATED_STAGING:'true',
  NETWORK_STAGE_QA_APPROVED:'approved-synthetic-staging-only',
  NETWORK_STAGE_ORIGIN:'https://texasdefined-qa.account.workers.dev',
  SUPABASE_URL:'https://staging0123456789.supabase.co',
  NETWORK_STRIPE_MODE:'test',NETWORK_STRIPE_TEST_MODE_ENABLED:'true',
  NETWORK_STRIPE_TEST_PRICE_ID:'price_TESTnotLive0001',
  NETWORK_STRIPE_TEST_WEBHOOK_SECRET:'whsec_notreal_'+ 'x'.repeat(44),
  STRIPE_SECRET_KEY:'sk_test_notreal_'+ 'x'.repeat(60),
 };
 delete stage.NETWORK_LAUNCH_ATOMIC_VERIFIED;
 delete stage.NETWORK_STRIPE_WEBHOOK_SECRET; // no production webhook keys in staging
 assert.equal(networkIsolatedStagingArmed(stage),true);
 assert.equal(networkCustomerLaunchArmed(stage),true);
 for(const [key,value] of [
  ['SUPABASE_URL','https://ftkznprjljkhymknvhye.supabase.co'],
  ['SUPABASE_URL','https://example.invalid'],
  ['NETWORK_STAGE_ORIGIN','https://texasdefined.com/'],
  ['NETWORK_STAGE_ORIGIN','https://preview.texasdefined.com/'],
  ['NETWORK_STRIPE_MODE','live'],
  ['STRIPE_SECRET_KEY','sk_live_notallowed'],
  ['NETWORK_STAGE_QA_APPROVED',''],
  ['NETWORK_STRIPE_TEST_PRICE_ID','price_1UP28XLtRurj6GMNwFlYDW6N'],
  ['NETWORK_STRIPE_TEST_WEBHOOK_SECRET',''],
  ['NETWORK_INTAKE_ENABLED','false'],
 ]){
  assert.equal(networkIsolatedStagingArmed({...stage,[key]:value}),false,key);
 }
});

test('staging host isolation rejects canonical production and foreign origins',()=>{
 const {env}=fixture();
 const stage={...env,
  NETWORK_ISOLATED_STAGING:'true',
  NETWORK_STAGE_QA_APPROVED:'approved-synthetic-staging-only',
  NETWORK_STAGE_ORIGIN:'https://texasdefined-qa.account.workers.dev',
  SUPABASE_URL:'https://staging0123456789.supabase.co',
  NETWORK_STRIPE_MODE:'test',NETWORK_STRIPE_TEST_MODE_ENABLED:'true',
  NETWORK_STRIPE_TEST_PRICE_ID:'price_TESTnotLive0001',
  NETWORK_STRIPE_TEST_WEBHOOK_SECRET:'whsec_notreal_'+ 'x'.repeat(44),
  STRIPE_SECRET_KEY:'sk_test_notreal_'+ 'x'.repeat(60),
 };
 assert.equal(networkRequestHostAllowed(stage,'https://texasdefined-qa.account.workers.dev/network/join'),true);
 for(const u of ['https://texasdefined.com/network/join',
  'https://www.texasdefined.com/network/join','https://other.account.workers.dev/network/join',
  'http://texasdefined-qa.account.workers.dev/network/join',
  'https://texasdefined-qa.account.workers.dev.evil.invalid/network/join']){
  assert.equal(networkRequestHostAllowed(stage,u),false,u);
 }
 assert.equal(networkRequestHostAllowed(env,'https://texasdefined.com/network/join'),true);
 assert.equal(networkRequestHostAllowed(env,'https://texasdefined-qa.account.workers.dev/network/join'),false);
});
