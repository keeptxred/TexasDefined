import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyStripeSignature, stripeCheckoutEnabled, verifiedNetworkSubscriptionOwnership, createNetworkCheckoutSession, isNetworkCheckoutUrl, isExpectedNetworkPlusSubscription } from '../../src/data/network-stripe.server.ts';

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
