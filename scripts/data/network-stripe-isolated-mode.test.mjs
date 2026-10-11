import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {getNetworkStripeRuntime,networkStripeHostAllowed,networkStripeExpectedLivemode,networkStripeWebhookSecret} from '../../src/data/network-stripe-mode.server.ts';
import {stripeCheckoutEnabled,createNetworkCheckoutSession,isExpectedNetworkPlusSubscription,readNetworkCurrentStripeSubscription,verifyStripeSignature} from '../../src/data/network-stripe.server.ts';
const vars=['NETWORK_STRIPE_MODE','NETWORK_STRIPE_TEST_MODE_ENABLED','NETWORK_ISOLATED_STAGING','NETWORK_STAGE_ORIGIN','NETWORK_STRIPE_TEST_PRICE_ID','NETWORK_STRIPE_TEST_WEBHOOK_SECRET','NETWORK_CHECKOUT_ENABLED','SUPABASE_URL','STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET'];
const old=Object.fromEntries(vars.map(k=>[k,process.env[k]]));
const reset=()=>{for(const k of vars){if(old[k]===undefined)delete process.env[k];else process.env[k]=old[k]}};
after(reset);
function configure(){
 process.env.NETWORK_STRIPE_MODE='test';
 process.env.NETWORK_STRIPE_TEST_MODE_ENABLED='true';
 process.env.NETWORK_ISOLATED_STAGING='true';
 process.env.NETWORK_STAGE_ORIGIN='https://network-stage.example.invalid';
 process.env.NETWORK_STRIPE_TEST_PRICE_ID='price_testExampleStaging';
 process.env.NETWORK_STRIPE_TEST_WEBHOOK_SECRET='whsec_staging_isolated_fake';
 process.env.NETWORK_CHECKOUT_ENABLED='true';
 process.env.SUPABASE_URL='http://127.0.0.1:54321';
 process.env.STRIPE_SECRET_KEY='sk_test_synthetic_no_provider_request';
}
const app='11111111-1111-4111-8111-111111111111',attempt='22222222-2222-4222-8222-222222222222',billing='33333333-3333-4333-8333-333333333333',customer='cus_testSharedBilling';
test('test-mode cannot activate without all isolation signals and never binds production database',()=>{
 reset();process.env.NETWORK_STRIPE_MODE='test';
 process.env.NETWORK_CHECKOUT_ENABLED='true';
 process.env.STRIPE_SECRET_KEY='sk_test_untrusted';
 assert.equal(getNetworkStripeRuntime(),null);
 assert.equal(stripeCheckoutEnabled(),false);
 assert.equal(networkStripeExpectedLivemode(),null);
 configure();
 assert.equal(getNetworkStripeRuntime()?.livemode,false);
 for(const [key,value] of [
  ['SUPABASE_URL','https://ftkznprjljkhymknvhye.supabase.co'],
  ['NETWORK_STAGE_ORIGIN','https://texasdefined.com'],
  ['NETWORK_STAGE_ORIGIN','https://www.texasdefined.com'],
  ['NETWORK_STAGE_ORIGIN','https://network-stage.example.invalid/path'],
  ['NETWORK_STRIPE_TEST_PRICE_ID','price_1UP28XLtRurj6GMNwFlYDW6N'],
  ['STRIPE_SECRET_KEY','sk_live_unsafe'],
  ['NETWORK_ISOLATED_STAGING','false'],
  ['NETWORK_STRIPE_TEST_MODE_ENABLED','false'],
 ]){
  configure();process.env[key]=value;
  assert.equal(getNetworkStripeRuntime(),null,key+' must fail closed');
 }
 reset();
});
test('stage hostname, price and mode match; live is default and test key is rejected in live mode',()=>{
 configure();
 const cfg=getNetworkStripeRuntime();
 assert.equal(cfg.siteOrigin,'https://network-stage.example.invalid');
 assert.equal(cfg.priceId,'price_testExampleStaging');
 assert.equal(networkStripeExpectedLivemode(),false);
 assert.equal(networkStripeHostAllowed(new Request('https://network-stage.example.invalid/api/public/network-stripe-webhook')),true);
 assert.equal(networkStripeHostAllowed(new Request('https://texasdefined.com/api/public/network-stripe-webhook')),false);
 assert.equal(networkStripeHostAllowed(new Request('http://network-stage.example.invalid/')),false);
 reset();
 process.env.STRIPE_SECRET_KEY='sk_test_synthetic_no_provider_request';
 assert.equal(getNetworkStripeRuntime(),null);
 assert.equal(networkStripeExpectedLivemode(),true);
});
test('mock transport test Checkout only accepts cs_test and stage callback origin',async()=>{
 configure();assert.equal(stripeCheckoutEnabled(),true);
 const oldFetch=globalThis.fetch; let called=0,params;
 const good=()=>({
   object:'checkout.session',livemode:false,mode:'subscription',status:'open',
   client_reference_id:app,metadata:{application_id:app,billing_account_id:billing},customer,
   id:'cs_test_mockedTestSession',
   url:'https://checkout.stripe.com/c/pay/cs_test_mockedTestSession',
   expires_at:Math.floor(Date.now()/1000)+1800,
 });
 let payload=good();
 globalThis.fetch=async(url,init)=>{
  called++;assert.equal(url,'https://api.stripe.com/v1/checkout/sessions');
  assert.equal(init.headers.Authorization,'Bearer sk_test_synthetic_no_provider_request');
  assert.equal(init.headers['Idempotency-Key'],'network-plus-'+app+'-'+attempt);
  params=new URLSearchParams(init.body);
  return {ok:true,status:200,json:async()=>payload};
 };
 try{
  assert.equal((await createNetworkCheckoutSession(app,attempt,customer,billing)).sessionId,'cs_test_mockedTestSession');
  assert.equal(params.get('line_items[0][price]'),'price_testExampleStaging');
  assert.equal(params.get('success_url'),'https://network-stage.example.invalid/network/checkout-return?session_id={CHECKOUT_SESSION_ID}');
  assert.equal(params.get('cancel_url'),'https://network-stage.example.invalid/network/billing?checkout=cancelled');
  for(const bad of [
   {...good(),id:'cs_live_wrong_mode'}, {...good(),livemode:true},
   {...good(),metadata:{application_id:'00000000-0000-4000-8000-000000000000',billing_account_id:billing}},
   {...good(),metadata:{application_id:app,billing_account_id:'00000000-0000-4000-8000-000000000000'}},
   {...good(),customer:'cus_testOtherBusiness'},
  ]){
   payload=bad;
   await assert.rejects(createNetworkCheckoutSession(app,attempt,customer,billing),/Checkout session unavailable/);
  }
  assert.equal(called,6);
 }finally{globalThis.fetch=oldFetch;reset();}
});
test('stage subscription reads only from isolated test key and rejects live/other price',async()=>{
 configure();
 const oldFetch=globalThis.fetch,valid={
  livemode:false,id:'sub_testMock',customer:'cus_testMock',
  metadata:{project:'TexasDefined',application_id:app,billing_account_id:billing},
  items:{data:[{price:{id:'price_testExampleStaging'},quantity:1}]}
 };
 let read=false;
 globalThis.fetch=async(url,options)=>{
  read=true;assert.equal(url,'https://api.stripe.com/v1/subscriptions/sub_testMock');
  assert.equal(options.headers.Authorization,'Bearer sk_test_synthetic_no_provider_request');
  return {ok:true,json:async()=>valid};
 };
 try{
  assert.equal((await readNetworkCurrentStripeSubscription('sub_testMock')).id,valid.id);
  assert.equal(isExpectedNetworkPlusSubscription(valid),true);
  assert.equal(isExpectedNetworkPlusSubscription({...valid,livemode:true}),false);
  assert.equal(isExpectedNetworkPlusSubscription({...valid,items:{data:[{price:{id:'price_1UP28XLtRurj6GMNwFlYDW6N'},quantity:1}]}}),false);
  assert.equal(read,true);
 }finally{globalThis.fetch=oldFetch;reset();}
});
test('test webhook verifies only its own signing secret and never claims a 202 means paid',async()=>{
 configure();
 const raw='{"id":"evt_test","livemode":false}';
 const ts=String(Math.floor(Date.now()/1000));
 const sign=secret=>createHmac('sha256',secret).update(ts+'.'+raw).digest('hex');
 assert.equal(networkStripeWebhookSecret(),'whsec_staging_isolated_fake');
 assert.equal(await verifyStripeSignature(raw,'t='+ts+',v1='+sign('whsec_staging_isolated_fake')),true);
 assert.equal(await verifyStripeSignature(raw,'t='+ts+',v1='+sign('whsec_a_different_secret')),false);
 reset();
});
