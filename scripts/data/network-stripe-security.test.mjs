import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyStripeSignature, stripeCheckoutEnabled, verifiedNetworkSubscriptionOwnership, createNetworkCheckoutSession, isNetworkCheckoutUrl, isExpectedNetworkPlusSubscription, readNetworkWebhookPayload, NETWORK_WEBHOOK_MAX_BYTES, readNetworkCurrentStripeSubscription, stripeRequest, isNetworkBillingPortalUrl } from '../../src/data/network-stripe.server.ts';

const previousSecret=process.env.STRIPE_WEBHOOK_SECRET;
const previousCheckout=process.env.NETWORK_CHECKOUT_ENABLED;
const previousKey=process.env.STRIPE_SECRET_KEY;
const secret='whsec_test_only_local_not_real';
const sign=(timestamp,payload)=>createHmac('sha256',secret).update(timestamp+'.'+payload).digest('hex');
function restore(){
 if(previousSecret===undefined)delete process.env.STRIPE_WEBHOOK_SECRET;else process.env.STRIPE_WEBHOOK_SECRET=previousSecret;
 if(previousCheckout===undefined)delete process.env.NETWORK_CHECKOUT_ENABLED;else process.env.NETWORK_CHECKOUT_ENABLED=previousCheckout;
 if(previousKey===undefined)delete process.env.STRIPE_SECRET_KEY;else process.env.STRIPE_SECRET_KEY=previousKey;
}
test.after(restore);
test('rejects Stripe webhook when unsigned or unconfigured',async()=>{
 delete process.env.STRIPE_WEBHOOK_SECRET;
 assert.equal(await verifyStripeSignature('{}',null),false);
 assert.equal(await verifyStripeSignature('{}','t=1,v1='+('0'.repeat(64))),false);
});
test('accepts current signed webhook and rejects altered payload/signature',async()=>{
 process.env.STRIPE_WEBHOOK_SECRET=secret;
 const timestamp=String(Math.floor(Date.now()/1000));
 const payload=JSON.stringify({id:'evt_test',livemode:false});
 const signature=sign(timestamp,payload);
 assert.equal(await verifyStripeSignature(payload,'t='+timestamp+',v1='+signature),true);
 assert.equal(await verifyStripeSignature(payload+' ','t='+timestamp+',v1='+signature),false);
 assert.equal(await verifyStripeSignature(payload,'t='+timestamp+',v1='+('0'.repeat(64))),false);
 assert.equal(await verifyStripeSignature(payload,'t='+timestamp+',v1=invalid'),false);
});
test('rejects stale and malformed timestamp headers',async()=>{
 process.env.STRIPE_WEBHOOK_SECRET=secret;
 const payload='{}';
 const stale=String(Math.floor(Date.now()/1000)-3600);
 assert.equal(await verifyStripeSignature(payload,'t='+stale+',v1='+sign(stale,payload)),false);
 assert.equal(await verifyStripeSignature(payload,'t=nope,v1='+('0'.repeat(64))),false);
});
test('checkout requires explicit flag and live-secret configuration',()=>{
 delete process.env.NETWORK_CHECKOUT_ENABLED;
 process.env.STRIPE_SECRET_KEY='sk_live_fake_unit_only';
 assert.equal(stripeCheckoutEnabled(),false);
 process.env.NETWORK_CHECKOUT_ENABLED='true';
 delete process.env.STRIPE_SECRET_KEY;
 assert.equal(stripeCheckoutEnabled(),false);
 process.env.STRIPE_SECRET_KEY='sk_test_not_live';
 assert.equal(stripeCheckoutEnabled(),false);
});

test('webhook accepts matching rotated Stripe signature among several candidates', async () => {
 process.env.STRIPE_WEBHOOK_SECRET=secret;
 const timestamp=String(Math.floor(Date.now()/1000));
 const payload=JSON.stringify({id:'evt_rotation_example',livemode:false});
 assert.equal(await verifyStripeSignature(payload,'t='+timestamp+',v1='+('0'.repeat(64))+',v1='+sign(timestamp,payload)),true);
});
test('rejects correctly signed webhook too far in the future', async () => {
 process.env.STRIPE_WEBHOOK_SECRET=secret;
 const payload=JSON.stringify({id:'evt_future_example'});
 const timestamp=String(Math.floor(Date.now()/1000)+3600);
 assert.equal(await verifyStripeSignature(payload,'t='+timestamp+',v1='+sign(timestamp,payload)),false);
});
test('rejects a signature from a different webhook body at the same timestamp', async () => {
 process.env.STRIPE_WEBHOOK_SECRET=secret;
 const timestamp=String(Math.floor(Date.now()/1000));
 const original=JSON.stringify({id:'evt_A',type:'customer.subscription.updated'});
 const altered=JSON.stringify({id:'evt_B',type:'customer.subscription.updated'});
 assert.equal(await verifyStripeSignature(altered,'t='+timestamp+',v1='+sign(timestamp,original)),false);
});

test('refuses cross-account Stripe subscription and customer replacement', () => {
 const existing={stripe_subscription_id:'sub_original',stripe_customer_id:'cus_original'};
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_original',customer:'cus_original'},existing),true);
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_other',customer:'cus_original'},existing),false);
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_original',customer:'cus_other'},existing),false);
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_original',customer:''},existing),false);
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_original'},existing),false);
});
test('first authorized subscription must always contain a Stripe customer', () => {
 const newBusiness={stripe_subscription_id:null,stripe_customer_id:null};
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_new',customer:'cus_new'},newBusiness),true);
 assert.equal(verifiedNetworkSubscriptionOwnership({id:'sub_new',customer:null},newBusiness),false);
});

test('rejects spoofed or unsafe Stripe checkout redirect destinations',()=>{
 assert.equal(isNetworkCheckoutUrl('https://checkout.stripe.com.evil.test/c/pay/123'),false);
 assert.equal(isNetworkCheckoutUrl('http://checkout.stripe.com/c/pay/123'),false);
 assert.equal(isNetworkCheckoutUrl('https://billing.stripe.com/p/session'),false);
 assert.equal(isNetworkCheckoutUrl('https://checkout.stripe.com/c/pay/session'),true);
});
test('mocked Checkout creates a bounded, owner-reserved session with a unique attempt id',async()=>{
 const priorFetch=globalThis.fetch;
 process.env.NETWORK_CHECKOUT_ENABLED='true';
 process.env.STRIPE_SECRET_KEY='sk_live_mocked_never_sent';
 let outgoing;
 globalThis.fetch=async(url,options)=>{
   outgoing={url,options};
   return {ok:true,status:200,json:async()=>({
     object:'checkout.session',livemode:true,mode:'subscription',status:'open',
     client_reference_id:'11111111-1111-4111-8111-111111111111',metadata:{application_id:'11111111-1111-4111-8111-111111111111'},
     customer_email:'test@example.invalid',
     id:'cs_live_mocked_for_unit_test',
     url:'https://checkout.stripe.com/c/pay/cs_live_mocked_for_unit_test',
     expires_at:Math.floor(Date.now()/1000)+1800,
   })};
 };
 try {
   const appId='11111111-1111-4111-8111-111111111111';
   const attempt='22222222-2222-4222-8222-222222222222';
   const result=await createNetworkCheckoutSession(appId,'test@example.invalid',attempt);
   assert.equal(result.sessionId,'cs_live_mocked_for_unit_test');
   assert.equal(outgoing.url,'https://api.stripe.com/v1/checkout/sessions');
   assert.equal(outgoing.options.headers['Idempotency-Key'],'network-plus-'+appId+'-'+attempt);
   const body=new URLSearchParams(outgoing.options.body);
   assert.equal(body.get('subscription_data[metadata][application_id]'),appId);
   assert.equal(body.get('line_items[0][price]'),'price_1UP28XLtRurj6GMNwFlYDW6N');
   assert.ok(body.get('success_url').includes('/network/checkout-return?'));
 } finally {
   globalThis.fetch=priorFetch;
   delete process.env.NETWORK_CHECKOUT_ENABLED;
   delete process.env.STRIPE_SECRET_KEY;
 }
});
test('Checkout cannot create a session without explicit live authorization',async()=>{
 delete process.env.NETWORK_CHECKOUT_ENABLED;
 await assert.rejects(
  createNetworkCheckoutSession('11111111-1111-4111-8111-111111111111','test@example.invalid','22222222-2222-4222-8222-222222222222'),
  /not activated/
 );
});

test('Stripe Plus subscription verifier rejects extra items and cross-plan prices',()=>{
 const item={price:{id:'price_1UP28XLtRurj6GMNwFlYDW6N'},quantity:1};
 const valid={
  livemode:true,id:'sub_mocked_example',customer:'cus_mocked_example',
  metadata:{application_id:'11111111-1111-4111-8111-111111111111',project:'TexasDefined'},
  items:{data:[item]}
 };
 assert.equal(isExpectedNetworkPlusSubscription(valid),true);
 assert.equal(isExpectedNetworkPlusSubscription({...valid,items:{data:[item,item]}}),false);
 assert.equal(isExpectedNetworkPlusSubscription({...valid,items:{data:[{...item,quantity:2}]}}),false);
 assert.equal(isExpectedNetworkPlusSubscription({...valid,items:{data:[{price:{id:'price_wrong'},quantity:1}]}}),false);
 assert.equal(isExpectedNetworkPlusSubscription({...valid,livemode:false}),false);
 assert.equal(isExpectedNetworkPlusSubscription({...valid,metadata:{...valid.metadata,project:'Other'}}),false);
 assert.equal(isExpectedNetworkPlusSubscription({...valid,customer:'cus_!!!'}),false);
});

test('webhook reader accepts a normally sized UTF-8 event',async()=>{
 const request=new Request('https://texasdefined.com/api/public/network-stripe-webhook',{
  method:'POST',body:JSON.stringify({id:'evt_safe',description:'Tejano music'}),
 });
 const body=await readNetworkWebhookPayload(request);
 assert.deepEqual(JSON.parse(body),{id:'evt_safe',description:'Tejano music'});
});
test('webhook rejects oversized declared Content-Length without consuming the request body',async()=>{
 // Web Streams may prefetch from pull() even when no reader was acquired.
 // bodyUsed is the correct observable request-consumption contract.
 const body=new ReadableStream({pull(controller){controller.enqueue(new Uint8Array(2));controller.close()}});
 const request=new Request('https://texasdefined.com/api/public/network-stripe-webhook',{
  method:'POST',body,duplex:'half',headers:{'content-length':String(NETWORK_WEBHOOK_MAX_BYTES+1)},
 });
 assert.equal(await readNetworkWebhookPayload(request),null);
 assert.equal(request.bodyUsed,false);
});
test('webhook enforces actual streamed byte cap if Content-Length is omitted',async()=>{
 const chunk=new Uint8Array(Math.ceil(NETWORK_WEBHOOK_MAX_BYTES/2)+4);
 const stream=new ReadableStream({
  start(controller){controller.enqueue(chunk);controller.enqueue(chunk);controller.close()}
 });
 const request=new Request('https://texasdefined.com/api/public/network-stripe-webhook',{
  method:'POST',body:stream,duplex:'half',
 });
 assert.equal(await readNetworkWebhookPayload(request),null);
});
test('webhook rejects invalid UTF-8 instead of decoding replacement characters',async()=>{
 const request=new Request('https://texasdefined.com/api/public/network-stripe-webhook',{
  method:'POST',body:new Uint8Array([0xff,0xfe,0x00]),
 });
 assert.equal(await readNetworkWebhookPayload(request),null);
});


test('Checkout rejects mocked Stripe transport failures, expired sessions, and forged redirect responses',async()=>{
 const originalFetch=globalThis.fetch;
 const originalFlag=process.env.NETWORK_CHECKOUT_ENABLED;
 const originalKey=process.env.STRIPE_SECRET_KEY;
 process.env.NETWORK_CHECKOUT_ENABLED='true';
 process.env.STRIPE_SECRET_KEY='sk_live_mocked_never_sent';
 const application='11111111-1111-4111-8111-111111111111';
 const attempt='22222222-2222-4222-8222-222222222222';
 const goodResponse=()=>({
  object:'checkout.session',livemode:true,mode:'subscription',status:'open',
  client_reference_id:application,metadata:{application_id:application},customer_email:'owner@example.invalid',
  id:'cs_live_mocked_for_unit_test',
  url:'https://checkout.stripe.com/c/pay/cs_live_mocked_for_unit_test',
  expires_at:Math.floor(Date.now()/1000)+1800,
 });
 const scenarios=[
  {name:'transport failure',stub:()=>Promise.reject(new Error('mocked connection unavailable')),message:/mocked connection unavailable/},
  {name:'Stripe non-success',stub:async()=>({ok:false,status:503,json:async()=>({error:'mocked outage'})}),message:/Stripe API unavailable: 503/},
  {name:'Stripe invalid JSON',stub:async()=>({ok:true,status:200,json:async()=>{throw Error('mocked invalid JSON')}}),message:/mocked invalid JSON/},
  {name:'expired Checkout session',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),expires_at:Math.floor(Date.now()/1000)-30})}),message:/Checkout session unavailable/},
  {name:'malicious Checkout redirect',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),url:'https://checkout.stripe.com.attacker.invalid/pay'})}),message:/Checkout session unavailable/},
  {name:'test-mode Checkout ID',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),id:'cs_test_mocked'})}),message:/Checkout session unavailable/},
  {name:'missing Stripe session ID',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),id:undefined})}),message:/Checkout session unavailable/},
  {name:'foreign application reference',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),client_reference_id:'33333333-3333-4333-8333-333333333333'})}),message:/Checkout session unavailable/},
  {name:'foreign application metadata',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),metadata:{application_id:'33333333-3333-4333-8333-333333333333'}})}),message:/Checkout session unavailable/},
  {name:'different customer email',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),customer_email:'another-owner@example.invalid'})}),message:/Checkout session unavailable/},
  {name:'Checkout in test mode despite live-looking id',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),livemode:false})}),message:/Checkout session unavailable/},
  {name:'payment-only Checkout rather than subscription',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),mode:'payment'})}),message:/Checkout session unavailable/},
  {name:'already-completed Checkout session',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),status:'complete'})}),message:/Checkout session unavailable/},
  {name:'non-Checkout Stripe object',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),object:'customer'})}),message:/Checkout session unavailable/},
  {name:'missing subscription verification metadata',stub:async()=>({ok:true,status:200,json:async()=>({...goodResponse(),metadata:null})}),message:/Checkout session unavailable/},
 ];
 try{
  for(const scenario of scenarios){
   globalThis.fetch=scenario.stub;
   await assert.rejects(createNetworkCheckoutSession(application,'owner@example.invalid',attempt),scenario.message,scenario.name);
  }
 }finally{
  globalThis.fetch=originalFetch;
  if(originalFlag===undefined)delete process.env.NETWORK_CHECKOUT_ENABLED;
  else process.env.NETWORK_CHECKOUT_ENABLED=originalFlag;
  if(originalKey===undefined)delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY=originalKey;
 }
});
test('distinct failed Checkout reservations use distinct Stripe idempotency keys',async()=>{
 const oldFetch=globalThis.fetch;
 const oldFlag=process.env.NETWORK_CHECKOUT_ENABLED;
 const oldKey=process.env.STRIPE_SECRET_KEY;
 process.env.NETWORK_CHECKOUT_ENABLED='true';
 process.env.STRIPE_SECRET_KEY='sk_live_mocked_never_sent';
 const keys=[];
 globalThis.fetch=async(_url,opts)=>{
  keys.push(opts.headers['Idempotency-Key']);
  return {ok:true,status:200,json:async()=>({
   object:'checkout.session',livemode:true,mode:'subscription',status:'open',
   client_reference_id:'11111111-1111-4111-8111-111111111111',metadata:{application_id:'11111111-1111-4111-8111-111111111111'},customer_email:'owner@example.invalid',
   id:'cs_live_mocked_for_unit_test',
   url:'https://checkout.stripe.com/c/pay/cs_live_mocked_for_unit_test',
   expires_at:Math.floor(Date.now()/1000)+1800,
  })};
 };
 try{
  const app='11111111-1111-4111-8111-111111111111';
  const first='22222222-2222-4222-8222-222222222222';
  const second='33333333-3333-4333-8333-333333333333';
  await createNetworkCheckoutSession(app,'owner@example.invalid',first);
  await createNetworkCheckoutSession(app,'owner@example.invalid',second);
  assert.deepEqual(keys,['network-plus-'+app+'-'+first,'network-plus-'+app+'-'+second]);
 }finally{
  globalThis.fetch=oldFetch;
  if(oldFlag===undefined)delete process.env.NETWORK_CHECKOUT_ENABLED;
  else process.env.NETWORK_CHECKOUT_ENABLED=oldFlag;
  if(oldKey===undefined)delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY=oldKey;
 }
});


test('current Stripe webhook subscription read requires a live server credential and a strict subscription ID',async()=>{
 const key=process.env.STRIPE_SECRET_KEY;
 const priorFetch=globalThis.fetch;
 let called=0;
 globalThis.fetch=async()=>{called++;throw Error('must not fetch')};
 try{
  delete process.env.STRIPE_SECRET_KEY;
  await assert.rejects(readNetworkCurrentStripeSubscription('sub_valid_mock'),/verification unavailable/);
  process.env.STRIPE_SECRET_KEY='sk_test_mock';
  await assert.rejects(readNetworkCurrentStripeSubscription('sub_valid_mock'),/verification unavailable/);
  process.env.STRIPE_SECRET_KEY='sk_live_mock_never_sent';
  for(const invalid of ['../../customers','cus_mock','sub_good?expand[]=customer','','sub_!?']){
   await assert.rejects(readNetworkCurrentStripeSubscription(invalid),/verification unavailable/);
  }
  assert.equal(called,0,'invalid verification inputs must not issue network requests');
 }finally{
  globalThis.fetch=priorFetch;
  if(key===undefined)delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY=key;
 }
});
test('Stripe webhook subscription read treats outages, bad status and malformed JSON as failures, never acknowledgements',async()=>{
 const oldFetch=globalThis.fetch,oldKey=process.env.STRIPE_SECRET_KEY;
 process.env.STRIPE_SECRET_KEY='sk_live_mock_never_sent';
 const responses=[
  {name:'socket loss',mock:async()=>{throw new Error('mocked socket failure')}},
  {name:'timeout',mock:async()=>{throw new DOMException('mocked timeout','TimeoutError')}},
  {name:'remote 429',mock:async()=>({ok:false,status:429,json:async()=>({})})},
  {name:'remote 503',mock:async()=>({ok:false,status:503,json:async()=>({})})},
  {name:'invalid JSON',mock:async()=>({ok:true,status:200,json:async()=>{throw new SyntaxError('invalid JSON')}})},
  {name:'null data',mock:async()=>({ok:true,status:200,json:async()=>null})},
  {name:'array data',mock:async()=>({ok:true,status:200,json:async()=>[]})},
 ];
 try{
  for(const scenario of responses){
   globalThis.fetch=scenario.mock;
   await assert.rejects(readNetworkCurrentStripeSubscription('sub_mocked'),undefined,scenario.name);
  }
  let observed;
  globalThis.fetch=async(url,opts)=>{
   observed={url,opts};
   return {ok:true,status:200,json:async()=>({id:'sub_mocked',livemode:true})};
  };
  const payload=await readNetworkCurrentStripeSubscription('sub_mocked');
  assert.equal(payload.id,'sub_mocked');
  assert.equal(observed.url,'https://api.stripe.com/v1/subscriptions/sub_mocked');
  assert.equal(observed.opts.headers.Authorization,'Bearer sk_live_mock_never_sent');
  assert.ok(observed.opts.signal,'must bound Stripe API network request');
 }finally{
  globalThis.fetch=oldFetch;
  if(oldKey===undefined)delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY=oldKey;
 }
});


test('Stripe billing portal destination rejects credential tricks, third-party domains and fragments',()=>{
 assert.equal(isNetworkBillingPortalUrl('https://billing.stripe.com/p/session/mock'),true);
 for(const url of [
  'https://billing.stripe.com.attacker.invalid/p/session',
  'https://evil.invalid/?next=billing.stripe.com',
  'https://user:secret@billing.stripe.com/p/session',
  'https://billing.stripe.com/p/session#fragment',
  'http://billing.stripe.com/p/session',
  'https://checkout.stripe.com/c/pay/abc',
  '//billing.stripe.com/p/session','not a URL',null,undefined
 ])assert.equal(isNetworkBillingPortalUrl(url),false,String(url));
});

test('Stripe Checkout POST uses a bounded deadline, preserves the caller idempotency key and cannot override server bearer',async()=>{
 const oldFetch=globalThis.fetch,oldKey=process.env.STRIPE_SECRET_KEY;
 process.env.STRIPE_SECRET_KEY='sk_live_mock_never_sent';
 let captured;
 globalThis.fetch=async(url,opts)=>{
  captured={url,opts};
  return {ok:true,status:200,json:async()=>({ok:true})};
 };
 try{
  assert.deepEqual(await stripeRequest('/checkout/sessions',{
   method:'POST',headers:{'Idempotency-Key':'network-plus-test','Authorization':'Bearer attacker'},
   body:new URLSearchParams({foo:'bar'}),
  }),{ok:true});
  assert.equal(captured.url,'https://api.stripe.com/v1/checkout/sessions');
  assert.equal(captured.opts.headers.Authorization,'Bearer sk_live_mock_never_sent');
  assert.equal(captured.opts.headers['Idempotency-Key'],'network-plus-test');
  assert.equal(captured.opts.method,'POST');
  assert.ok(captured.opts.signal && !captured.opts.signal.aborted,'Stripe API call must be time-bounded');
 }finally{
  globalThis.fetch=oldFetch;
  if(oldKey===undefined)delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY=oldKey;
 }
});

test('Stripe Checkout upstream rejects outages, timeouts, bad HTTP and malformed JSON without false success',async()=>{
 const oldFetch=globalThis.fetch,oldKey=process.env.STRIPE_SECRET_KEY;
 process.env.STRIPE_SECRET_KEY='sk_live_mock_never_sent';
 const cases=[
  {name:'transport loss',mock:async()=>{throw Error('mocked socket loss')},message:/socket loss/},
  {name:'timeout',mock:async()=>{throw new DOMException('mocked aborted','TimeoutError')},message:/mocked aborted/},
  {name:'upstream 429',mock:async()=>({ok:false,status:429,json:async()=>{throw Error('do not parse non-2xx JSON')}}),message:/Stripe API unavailable: 429/},
  {name:'upstream 503',mock:async()=>({ok:false,status:503,json:async()=>null}),message:/Stripe API unavailable: 503/},
  {name:'upstream 200 null',mock:async()=>({ok:true,status:200,json:async()=>null}),message:/Malformed Stripe API response/},
  {name:'upstream 200 array',mock:async()=>({ok:true,status:200,json:async()=>[]}),message:/Malformed Stripe API response/},
  {name:'upstream invalid JSON',mock:async()=>({ok:true,status:200,json:async()=>{throw new SyntaxError('mocked invalid JSON')}}),message:/mocked invalid JSON/},
 ];
 try{
  for(const scenario of cases){
   globalThis.fetch=scenario.mock;
   await assert.rejects(stripeRequest('/checkout/sessions',{method:'POST'}),scenario.message,scenario.name);
  }
 }finally{
  globalThis.fetch=oldFetch;
  if(oldKey===undefined)delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY=oldKey;
 }
});
