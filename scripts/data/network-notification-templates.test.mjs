import test from 'node:test';
import assert from 'node:assert/strict';
import {NETWORK_EMAIL_DELIVERY_ENABLED,NETWORK_NOTIFICATION_SENDER,renderNetworkNotification} from '../../src/data/network-notification-templates.server.ts';

const events=['application_received','application_approved','application_rejected','owner_enabled','membership_active','membership_inactive','revision_approved','revision_rejected'];
test('Network email delivery is OFF until approved Office 365 integration',()=>{
 assert.equal(NETWORK_EMAIL_DELIVERY_ENABLED,false);
 assert.equal(NETWORK_NOTIFICATION_SENDER,'admin@texasdefined.com');
});
test('every Network notification uses the approved sender and a meaningful message',()=>{
 for(const event of events){
  const message=renderNetworkNotification(event,'Hill Country Museum');
  assert.equal(message.from,'admin@texasdefined.com');
  assert.equal(message.replyTo,'admin@texasdefined.com');
  assert.ok(message.subject.includes('Hill Country Museum'));
  assert.ok(message.text.length>75);
 }
});
test('business names cannot inject extra email headers',()=>{
 const msg=renderNetworkNotification('application_received','Museum\r\nBcc: unrelated@example.com');
 assert.ok(!msg.subject.includes('\r'));
 assert.ok(!msg.subject.includes('\n'));
});


import {NETWORK_GRAPH_DISPATCH_ENABLED,createNetworkGraphMailDraft,classifyNetworkGraphResponse} from '../../src/data/network-notification-graph-readiness.server.ts';

test('Graph message preparation uses approved Office 365 sender and never performs a send',()=>{
 assert.equal(NETWORK_GRAPH_DISPATCH_ENABLED,false);
 for(const event of events){
  const draft=createNetworkGraphMailDraft(event,'Hill Country Museum','OWNER@EXAMPLE.INVALID');
  assert.equal(draft.sender,'admin@texasdefined.com');
  assert.equal(draft.payload.message.toRecipients[0].emailAddress.address,'owner@example.invalid');
  assert.equal(draft.payload.message.replyTo[0].emailAddress.address,'admin@texasdefined.com');
  assert.ok(draft.payload.message.subject.includes('Hill Country Museum'));
  assert.ok(draft.payload.message.body.content.length>75);
  assert.equal(draft.payload.saveToSentItems,true);
 }
});
test('Graph draft rejects invalid or injected recipients without contacting a provider',()=>{
 for(const address of [null,'','not-an-email','victim@example.invalid\r\nBcc:intruder@example.invalid','a@b.invalid\0']){
  assert.throws(()=>createNetworkGraphMailDraft('application_received','A',address),/recipient invalid/);
 }
});
test('Graph outcome classification does not treat HTTP 202 as confirmed delivery',()=>{
 assert.equal(classifyNetworkGraphResponse(202),'accepted_unconfirmed');
 assert.equal(classifyNetworkGraphResponse(429),'retryable_rejection');
 for(const code of [400,401,403,404,413,415,422])
  assert.equal(classifyNetworkGraphResponse(code),'permanent_rejection');
 for(const code of [undefined,null,0,200,201,408,500,502,503,504])
  assert.equal(classifyNetworkGraphResponse(code),'ambiguous_do_not_resend');
});
