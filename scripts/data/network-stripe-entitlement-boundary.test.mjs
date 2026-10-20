import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {
 isExpectedNetworkPlusSubscription,isNetworkSubscriptionIdentity,isBoundNetworkSubscriptionPriceMismatch
} from '../../src/data/network-stripe.server.ts';
const env={...process.env};
after(()=>{for(const k of ['NETWORK_STRIPE_MODE','STRIPE_SECRET_KEY']){if(env[k]===undefined)delete process.env[k];else process.env[k]=env[k]}});
delete process.env.NETWORK_STRIPE_MODE;
const app='11111111-1111-4111-8111-111111111111';
const billing='33333333-3333-4333-8333-333333333333';
const subscription={
 livemode:true,id:'sub_knownVerifiedOne',customer:'cus_knownVerifiedOne',
 metadata:{project:'TexasDefined',application_id:app,billing_account_id:billing},
 status:'active',
 items:{data:[{price:{id:'price_1UP28XLtRurj6GMNwFlYDW6N'},quantity:1}]},
};
const bound={
 plan:'plus',stripe_subscription_id:subscription.id,stripe_customer_id:subscription.customer,
};
test('approved active Plus plan is never a mismatch',()=>{
 assert.equal(isNetworkSubscriptionIdentity(subscription),true);
 assert.equal(isExpectedNetworkPlusSubscription(subscription),true);
 assert.equal(isBoundNetworkSubscriptionPriceMismatch(subscription,bound),false);
});
test('existing bound subscription changed to another price must lose Plus eligibility',()=>{
 const changed={
  ...subscription,items:{data:[{price:{id:'price_unapprovedAnotherPlan'},quantity:1}]},
 };
 assert.equal(isNetworkSubscriptionIdentity(changed),true);
 assert.equal(isExpectedNetworkPlusSubscription(changed),false);
 assert.equal(isBoundNetworkSubscriptionPriceMismatch(changed,bound),true);
 for(const items of [[],[{price:{id:'price_1UP28XLtRurj6GMNwFlYDW6N'},quantity:2}],
   [{price:{id:'price_1UP28XLtRurj6GMNwFlYDW6N'},quantity:1},{price:{id:'price_extra'},quantity:1}]])
   assert.equal(isBoundNetworkSubscriptionPriceMismatch({...changed,items:{data:items}},bound),true);
});
test('unbound subscriptions and different customers can never be auto-bound by a downgrade event',()=>{
 const changed={...subscription,items:{data:[{price:{id:'price_wrong'},quantity:1}]}};
 const foreign=[
  null,{...bound,stripe_subscription_id:null}, {...bound,stripe_customer_id:null},
  {...bound,stripe_subscription_id:'sub_another'}, {...bound,stripe_customer_id:'cus_another'},
  {...bound,plan:'basic'},
 ];
 for(const b of foreign)assert.equal(isBoundNetworkSubscriptionPriceMismatch(changed,b),false);
});
test('price-mismatch revocation only processes verified current mode, app metadata and Stripe identity',()=>{
 const changed={...subscription,items:{data:[{price:{id:'price_wrong'},quantity:1}]}};
 for(const bad of [
  {...changed,livemode:false},
  {...changed,id:'cus_invalid'}, {...changed,customer:'sub_invalid'},
  {...changed,metadata:null}, {...changed,metadata:{application_id:app,billing_account_id:billing,project:'Someone Else'}},
  {...changed,metadata:{application_id:'malformed',billing_account_id:billing,project:'TexasDefined'}},
  {...changed,metadata:{application_id:app,billing_account_id:'malformed',project:'TexasDefined'}},
 ])assert.equal(isBoundNetworkSubscriptionPriceMismatch(bad,bound),false);
});
