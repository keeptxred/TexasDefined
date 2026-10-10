import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyStripeSignature, stripeCheckoutEnabled } from '../../src/data/network-stripe.server.ts';

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
