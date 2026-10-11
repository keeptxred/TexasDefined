import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareNetworkGraphClaim} from '../../src/data/network-notification-claim-plan.server.ts';
import {findNetworkGraphSentItemsEvidence} from '../../src/data/network-graph-sentitems.server.ts';
const id='11111111-1111-4111-8111-111111111111';
const plan=prepareNetworkGraphClaim({
 id,claim_token:'22222222-2222-4222-8222-222222222222',
 event_key:'notice:'+id,event_type:'application_received',
 recipient_email:'owner@example.invalid',payload:{business_name:'Test Business'},attempts:1,
});
const token='synthetic-bearer-token-no-real-provider-access-'+ 'x'.repeat(100);
const listRow={id:'AAMkSENTid1234=',subject:plan.graphPayload.message.subject,
 toRecipients:[{emailAddress:{address:plan.recipient}}]};
const detail=(idHeader=id,recipient=plan.recipient)=>({...listRow,
 toRecipients:[{emailAddress:{address:recipient}}],
 internetMessageHeaders:[{name:'x-texasdefined-notification-id',value:idHeader}],
});
const fetchMock=(row=listRow,proof=detail())=>async(url,opts)=>{
 assert.equal(opts.method,'GET');
 assert.equal(opts.headers.Authorization,'Bearer '+token);
 assert.match(url,/^https:\/\/graph.microsoft.com\/v1.0\/users\/admin%40texasdefined.com\//);
 return {status:200,json:async()=>url.includes('mailFolders/sentitems/messages')?
  {value:[row]}:proof};
};
test('202 is never proof; only exact Sent Items header + subject + recipient qualifies',async()=>{
 const result=await findNetworkGraphSentItemsEvidence(plan,token,fetchMock());
 assert.equal(result.messageId,'AAMkSENTid1234=');
 assert.match(result.reference,/graph-sentitems-header-match/);
 for(const proof of [detail('33333333-3333-4333-8333-333333333333'),
  detail(id,'foreign@example.invalid'),
  {...detail(),internetMessageHeaders:[]},
  {...detail(),subject:'Other Subject'},
  {...detail(),internetMessageHeaders:[...detail().internetMessageHeaders,...detail().internetMessageHeaders]}]){
  assert.equal(await findNetworkGraphSentItemsEvidence(plan,token,fetchMock(listRow,proof)),null);
 }
});
test('no candidate or wrong person never reads unrelated message details',async()=>{
 let calls=0;
 const t=async()=>{calls++;return {status:200,json:async()=>({value:[
  {...listRow,toRecipients:[{emailAddress:{address:'other@example.invalid'}}]}
 ]})};};
 assert.equal(await findNetworkGraphSentItemsEvidence(plan,token,t),null);
 assert.equal(calls,1);
});
test('provider errors and malformed responses fail without claiming proof',async()=>{
 await assert.rejects(findNetworkGraphSentItemsEvidence(plan,token,async()=>({status:429})),/listing unavailable/);
 await assert.rejects(findNetworkGraphSentItemsEvidence(plan,token,async()=>{throw Error('sensitive');}),/listing unavailable/);
 await assert.rejects(findNetworkGraphSentItemsEvidence(plan,token,async()=>({status:200,json:async()=>({value:{}})})),/response invalid/);
 const t=async(url)=>url.includes('mailFolders')?{status:200,json:async()=>({value:[listRow]})}:{status:403};
 await assert.rejects(findNetworkGraphSentItemsEvidence(plan,token,t),/header lookup unavailable/);
});
