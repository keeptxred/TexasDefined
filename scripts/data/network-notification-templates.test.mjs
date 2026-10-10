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
