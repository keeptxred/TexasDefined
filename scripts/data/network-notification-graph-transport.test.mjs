import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareNetworkGraphClaim} from '../../src/data/network-notification-claim-plan.server.ts';
import {prepareNetworkGraphHttpRequest,submitNetworkGraphHttpRequest} from '../../src/data/network-notification-graph-transport.server.ts';
const row={
 id:'11111111-1111-4111-8111-111111111111',
 claim_token:'22222222-2222-4222-8222-222222222222',
 event_key:'application:11111111-1111-4111-8111-111111111111:received',
 event_type:'application_received',
 recipient_email:'test@example.invalid',
 payload:{business_name:'Synthetic Texas Business'},
 attempts:1,
};
test('Graph HTTP adapter constructs a single mailbox-specific bounded request but cannot send',()=>{
 const plan=prepareNetworkGraphClaim(row);
 const req=prepareNetworkGraphHttpRequest(plan);
 assert.equal(req.url,'https://graph.microsoft.com/v1.0/users/admin%40texasdefined.com/sendMail');
 assert.equal(req.method,'POST');
 const msg=JSON.parse(req.body);
 assert.equal(msg.saveToSentItems,true);
 assert.equal(msg.message.toRecipients.length,1);
 assert.equal(msg.message.toRecipients[0].emailAddress.address,'test@example.invalid');
 assert.equal(msg.message.replyTo[0].emailAddress.address,'admin@texasdefined.com');
 assert.deepEqual(msg.message.internetMessageHeaders,[{name:'x-texasdefined-notification-id',value:plan.id}]);
 assert.equal(Object.hasOwn(req,'headers'),false);
 assert.equal(Object.hasOwn(req,'token'),false);
});
test('Graph HTTP preparation refuses changed sender, foreign recipient and injected copies',()=>{
 const plan=prepareNetworkGraphClaim(row);
 assert.throws(()=>prepareNetworkGraphHttpRequest({...plan,sender:'someone@evil.invalid'}),/invalid/);
 assert.throws(()=>prepareNetworkGraphHttpRequest({...plan,recipient:'other@example.invalid'}),/invalid/);
 const forged={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,
   toRecipients:[...plan.graphPayload.message.toRecipients,{emailAddress:{address:'victim@example.invalid'}}]}}};
 assert.throws(()=>prepareNetworkGraphHttpRequest(forged),/invalid/);
 const copied={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,
   bccRecipients:[{emailAddress:{address:'thirdparty@example.invalid'}}]}}};
 assert.throws(()=>prepareNetworkGraphHttpRequest(copied),/invalid/);
 const forgedHtml={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,
   body:{contentType:'HTML',content:'<img src=x>'}}}};
 assert.throws(()=>prepareNetworkGraphHttpRequest(forgedHtml),/invalid/);
 for(const toRecipients of [null,undefined,[],[{}],[{emailAddress:null}]]) {
  const malformed={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,toRecipients}}};
  assert.throws(()=>prepareNetworkGraphHttpRequest(malformed),/envelope invalid/);
 }
 const missingReply={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,replyTo:null}}};
 assert.throws(()=>prepareNetworkGraphHttpRequest(missingReply),/envelope invalid/);
 const oversized={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,
   body:{contentType:'Text',content:'A'.repeat(17_000)}}}};
 assert.throws(()=>prepareNetworkGraphHttpRequest(oversized),/too large/);
 const utf8={...plan,graphPayload:{...plan.graphPayload,message:{...plan.graphPayload.message,
   body:{contentType:'Text',content:'🐾'.repeat(5_000)}}}};
 assert.throws(()=>prepareNetworkGraphHttpRequest(utf8),/too large/);
});
test('Graph transport is hard-disabled before any injected provider or token use',async()=>{
 const plan=prepareNetworkGraphClaim(row);
 let calls=0;
 await assert.rejects(submitNetworkGraphHttpRequest(plan,'some-test-token-value-that-would-be-long-enough',async()=>{
  calls++;throw Error('A test must never access real Graph');
 }),/not authorized/);
 assert.equal(calls,0);
});
