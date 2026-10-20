import test from 'node:test';
import assert from 'node:assert/strict';
import {networkGraphPlanForEnvironment} from '../../src/data/network-staging-mail-sink.server.ts';
import {prepareNetworkGraphClaim} from '../../src/data/network-notification-claim-plan.server.ts';
import {prepareNetworkGraphHttpRequest} from '../../src/data/network-notification-graph-transport.server.ts';
const id='11111111-1111-4111-8111-111111111111';
const plan=prepareNetworkGraphClaim({id,claim_token:'22222222-2222-4222-8222-222222222222',
 event_key:'application:'+id,event_type:'application_received',
 recipient_email:'synthetic-test-owner@example.invalid',payload:{business_name:'Synthetic Test Business'},attempts:1});
const staging={
 NETWORK_ISOLATED_STAGING:'true',NETWORK_STAGE_QA_APPROVED:'approved-synthetic-staging-only',
 NETWORK_STAGE_ORIGIN:'https://texasdefined-qa.account.workers.dev',
 SUPABASE_URL:'https://staging0123456789.supabase.co',
 SUPABASE_SERVICE_ROLE_KEY:'sb_secret_SYNTHETIC_'+ 'x'.repeat(70),
 NETWORK_ADMIN_ACCESS_KEY:'admin-key-synthetic-'+'x'.repeat(48),
 NETWORK_STRIPE_MODE:'test',NETWORK_STRIPE_TEST_MODE_ENABLED:'true',
 NETWORK_STRIPE_TEST_PRICE_ID:'price_TestSandbox123',
 NETWORK_STRIPE_TEST_WEBHOOK_SECRET:'whsec_synthetic_'+ 'x'.repeat(40),
 STRIPE_SECRET_KEY:'sk_test_synthetic_'+ 'x'.repeat(50),
 NETWORK_GRAPH_MAILBOX:'admin@texasdefined.com',
 NETWORK_GRAPH_CLIENT_ID:'33333333-3333-4333-8333-333333333333',
 NETWORK_GRAPH_TENANT_ID:'44444444-4444-4444-8444-444444444444',
 NETWORK_GRAPH_CLIENT_SECRET:'synthetic-client-'+ 'x'.repeat(35),
};
for(const f of ['NETWORK_INTAKE_ENABLED','NETWORK_OWNER_PORTAL_ENABLED',
 'NETWORK_PUBLICATION_ENABLED','NETWORK_DIRECTORY_ENABLED','NETWORK_CHECKOUT_ENABLED',
 'NETWORK_EMAIL_DELIVERY_ENABLED','NETWORK_GRAPH_DISPATCH_ENABLED','NETWORK_CRON_ENABLED']){
 staging[f]='true';
}
test('staged synthetic business mail is sent only to owned admin mailbox with immutable original claim id',()=>{
 const shadow=networkGraphPlanForEnvironment(plan,staging);
 assert.equal(shadow.id,id);
 assert.equal(shadow.claimToken,plan.claimToken);
 assert.equal(shadow.recipient,'admin@texasdefined.com');
 assert.equal(shadow.graphPayload.message.toRecipients.length,1);
 assert.equal(shadow.graphPayload.message.toRecipients[0].emailAddress.address,'admin@texasdefined.com');
 assert.match(shadow.graphPayload.message.subject,/^\[NETWORK STAGING\]/);
 assert.match(shadow.graphPayload.message.body.content,/STAGING ONLY/);
 assert.equal(plan.recipient,'synthetic-test-owner@example.invalid');
 const req=prepareNetworkGraphHttpRequest(shadow);
 const wire=JSON.parse(req.body);
 assert.equal(wire.message.internetMessageHeaders[0].value,id);
 assert.equal(wire.message.toRecipients.length,1);
 assert.equal(wire.message.toRecipients[0].emailAddress.address,'admin@texasdefined.com');
 assert.equal(JSON.stringify(wire).includes('synthetic-test-owner@example.invalid'),false);
});
test('production mail leaves independently approved recipient unchanged',()=>{
 assert.equal(networkGraphPlanForEnvironment(plan,{NETWORK_ISOLATED_STAGING:'false'}),plan);
});
test('fake stage marker or real Supabase/Stripe keys cannot redirect or send staging mail',()=>{
 for(const [key,value] of [
  ['NETWORK_STAGE_QA_APPROVED',''],
  ['SUPABASE_URL','https://ftkznprjljkhymknvhye.supabase.co'],
  ['STRIPE_SECRET_KEY','sk_live_NOT_ALLOWED'],
  ['NETWORK_INTAKE_ENABLED','false'],
  ['NETWORK_GRAPH_MAILBOX','other@example.invalid'],
  ['NETWORK_STAGE_ORIGIN','https://texasdefined.com'],
 ]){
  assert.throws(()=>networkGraphPlanForEnvironment(plan,{...staging,[key]:value}),/isolated test stage/,key);
 }
});
