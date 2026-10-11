import test from 'node:test';
import assert from 'node:assert/strict';
import {isExpectedNetworkBillingPortalSession} from '../../src/data/network-stripe.server.ts';

const live={livemode:true,siteOrigin:'https://texasdefined.com'};
const staging={livemode:false,siteOrigin:'https://network-stage.example.invalid'};
const customer='cus_owning_business_test';
const good=(runtime=live)=>({
 id:'bps_verifiedSession',object:'billing_portal.session',livemode:runtime.livemode,
 customer,return_url:runtime.siteOrigin+'/network/billing',
 url:'https://billing.stripe.com/p/session/test_session_fake_fixture',
});

test('validated portal session is bound to exact owning Stripe customer and environment',()=>{
 assert.equal(isExpectedNetworkBillingPortalSession(good(),customer,live),true);
 assert.equal(isExpectedNetworkBillingPortalSession(good(staging),customer,staging),true);
 assert.equal(isExpectedNetworkBillingPortalSession(good(staging),customer,live),false);
 assert.equal(isExpectedNetworkBillingPortalSession(good(),customer,staging),false);
});
test('foreign, malformed and wrong-mode billing portal session cannot leak a redirect',()=>{
 const bad=[
   {...good(),customer:'cus_other_business'},
   {...good(),customer:null},
   {...good(),livemode:false},
   {...good(),livemode:'true'},
   {...good(),object:'checkout.session'},
   {...good(),object:undefined},
   {...good(),id:'cs_live_wrong_type'},
   {...good(),id:''},
   {...good(),return_url:'https://attacker.invalid/billing'},
   {...good(),return_url:'https://network-stage.example.invalid/network/billing'},
   {...good(),url:'https://billing.stripe.com.attacker.invalid/p/session/redirect'},
   {...good(),url:'http://billing.stripe.com/p/session/not-secure'},
   {...good(),url:'https://billing.stripe.com/p/session/123#embedded'},
   {...good(),url:'https://user:secret@billing.stripe.com/p/session/123'},
   null,[],{},
 ];
 for(const item of bad)assert.equal(isExpectedNetworkBillingPortalSession(item,customer,live),false,JSON.stringify(item));
});
test('attacker-controlled database customer or test-host mismatch fails before redirect',()=>{
 for(const id of [undefined,null,'', 'cus_!!','attacker@example.invalid','cus_other\nX-Test: evil']){
   assert.equal(isExpectedNetworkBillingPortalSession(good(),id,live),false,String(id));
 }
 assert.equal(isExpectedNetworkBillingPortalSession(good(staging),customer,
   {livemode:false,siteOrigin:'https://texasdefined.com'}),false);
});
