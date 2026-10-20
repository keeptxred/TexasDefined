import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateNetworkRecoveryDecision,maskNetworkRecoveryRecipient,networkRecoveryResolutions}
 from '../../src/data/network-notification-recovery-policy.ts';
const id='11111111-1111-4111-8111-111111111111';
const messageId='AAMkSENTmail123456=';
const base={
 id,resolution:'sent_verified',
 evidenceReference:'graph-sentitems-header-match/'+id+'/'+messageId,
 reviewerLabel:'Sole owner manual verification',
 verifiedProviderId:messageId,
};
test('provider-matched Sent Items claim is necessary for sent_verified',()=>{
 assert.equal(validateNetworkRecoveryDecision(base).resolution,'sent_verified');
 for(const invalid of [
  {...base,verifiedProviderId:null},
  {...base,verifiedProviderId:'unrelatedMessage'},
  {...base,evidenceReference:'operator claimed message delivered manually'},
  {...base,id:'33333333-3333-4333-8333-333333333333'},
  {...base,evidenceReference:'graph-sentitems-header-match/'+id+'/'+messageId+'\nBCC: hidden'},
 ]){
  assert.throws(()=>validateNetworkRecoveryDecision(invalid));
 }
});
test('no-delivery retry requires separate affirmative attestation and evidence',()=>{
 const retry={...base,resolution:'not_delivered_retry',
  verifiedProviderId:null,evidenceReference:'Provider incident and Sent Items negative check 2026-10-11'};
 assert.throws(()=>validateNetworkRecoveryDecision(retry),/confirmation/);
 assert.equal(validateNetworkRecoveryDecision({...retry,confirmedNoDelivery:true}).resolution,'not_delivered_retry');
 for(const resolution of ['failed_verified','suppress_uncertain']){
  assert.equal(validateNetworkRecoveryDecision({...retry,resolution}).resolution,resolution);
 }
});
test('invalid ids, evidence and reviewer fields fail closed',()=>{
 assert.equal(networkRecoveryResolutions.length,4);
 for(const invalid of [
  null,{}, {...base,id:'invalid'}, {...base,resolution:'sent'},
  {...base,evidenceReference:'too brief'},
  {...base,reviewerLabel:'ab'},
  {...base,reviewerLabel:'Bad\nHeader'},
  {...base,evidenceReference:'E'.repeat(501)},
 ])assert.throws(()=>validateNetworkRecoveryDecision(invalid));
});
test('admin inventory masks recipient local-parts and never exposes claim tokens',()=>{
 assert.equal(maskNetworkRecoveryRecipient('OWNER@EXAMPLE.INVALID'),'o***@example.invalid');
 assert.equal(maskNetworkRecoveryRecipient(null),'[unavailable]');
 const source=readFileSync('src/data/network-notification-recovery.server.ts','utf8');
 assert.match(source,/assertNetworkAdminAccess\(accessKey\)/);
 assert.match(source,/reconcile_texasdefined_network_notification/);
 assert.match(source,/findNetworkGraphSentItemsEvidence/);
 assert.match(source,/acquireNetworkGraphAppToken/);
 assert.match(source,/matched.messageId!==decision.verifiedProviderId/);
 assert.match(source,/\.select\('id,event_type,recipient_email,status,attempts,claimed_at,created_at,error_code'\)/);
 assert.doesNotMatch(source,/sendMail|submitNetworkGraphHttpRequest/);
});
