import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareNetworkGraphClaim,classifyNetworkGraphClaimForOperator} from '../../src/data/network-notification-claim-plan.server.ts';
import {NETWORK_EMAIL_DELIVERY_ENABLED} from '../../src/data/network-notification-templates.server.ts';
import {NETWORK_GRAPH_DISPATCH_ENABLED} from '../../src/data/network-notification-graph-readiness.server.ts';

const valid=()=>({
 id:'11111111-1111-4111-8111-111111111111',
 claim_token:'22222222-2222-4222-8222-222222222222',
 event_key:'application:11111111-1111-4111-8111-111111111111:received',
 event_type:'application_received',
 recipient_email:'OWNER@EXAMPLE.INVALID',
 payload:{business_name:'Texas Heritage Center'},
 attempts:1,
});
test('an authenticated database claim is formatted for the only authorized sender without sending',()=>{
 assert.equal(NETWORK_EMAIL_DELIVERY_ENABLED,false);
 assert.equal(NETWORK_GRAPH_DISPATCH_ENABLED,false);
 const oldFetch=globalThis.fetch;
 globalThis.fetch=async()=>{throw Error('no network is permitted during Graph preflight')};
 try{
  const p=prepareNetworkGraphClaim(valid());
  assert.equal(p.sender,'admin@texasdefined.com');
  assert.equal(p.recipient,'owner@example.invalid');
  assert.equal(p.claimToken,valid().claim_token);
  assert.equal(p.graphPayload.message.toRecipients.length,1);
  assert.equal(p.graphPayload.message.replyTo[0].emailAddress.address,'admin@texasdefined.com');
  assert.equal(p.graphPayload.saveToSentItems,true);
  assert.match(p.graphPayload.message.body.content,/Texas Heritage Center/);
 }finally{globalThis.fetch=oldFetch}
});
test('malformed or replay-like claim data is refused before a provider is ever called',()=>{
 const mutate=[
  {id:'0'}, {claim_token:'invalid'}, {event_key:'bad\nkey'},
  {event_type:'membership_admin_bypass'}, {attempts:0},{attempts:4},
  {payload:null},{payload:[]},{payload:{business_name:''}},
  {payload:{business_name:'A'.repeat(200)}},
  {recipient_email:'victim@example.invalid\r\nBcc:somebody@example.invalid'},
 ];
 for(const candidate of mutate){
  assert.throws(()=>prepareNetworkGraphClaim({...valid(),...candidate}),/invalid/i);
 }
 assert.throws(()=>prepareNetworkGraphClaim(null),/invalid/i);
});
test('all eight legitimate event types prepare a single bounded Graph message',()=>{
 const types=['application_received','application_approved','application_rejected','owner_enabled',
 'membership_active','membership_inactive','revision_approved','revision_rejected'];
 for(const type of types){
  const p=prepareNetworkGraphClaim({...valid(),event_type:type,attempts:3});
  assert.equal(p.attempt,3);
  assert.match(p.graphPayload.message.subject,/Texas Heritage Center/);
 }
});
test('202 acceptance, timeout, crash, 5xx and late ambiguous failures are NEVER proof of sent delivery',()=>{
 for(const status of [202,undefined,null,200,408,500,502,503,504]){
  const decision=classifyNetworkGraphClaimForOperator(status);
  assert.equal(decision.nextStep,'manual_evidence_required');
  assert.equal(decision.mayMarkDelivered,false);
  assert.equal(decision.mayRetryAutomatically,false);
 }
});
test('rejection or throttling still requires evidence and approved reconciliation, not blind worker retry',()=>{
 for(const status of [400,401,403,404,413,415,422,429]){
  const decision=classifyNetworkGraphClaimForOperator(status);
  assert.equal(decision.nextStep,'known_rejection_manual_review');
  assert.equal(decision.mayMarkDelivered,false);
  assert.equal(decision.mayRetryAutomatically,false);
 }
});
