import test from 'node:test';
import assert from 'node:assert/strict';
import {NETWORK_BILLING_JSON_MAX_BYTES,parseBoundedNetworkBillingJson} from '../../src/data/network-billing-json.server.ts';

const url='https://texasdefined.com/api/public/network-checkout';
function jsonPost(body,headers={}){
 return new Request(url,{method:'POST',body,headers,...(body instanceof ReadableStream?{duplex:'half'}:{})});
}
test('tiny billing parser keeps validated JSON shape and owner application ID',async()=>{
 const applicationId='11111111-1111-4111-8111-111111111111';
 const value={applicationId,email:'owner@example.invalid'};
 assert.deepEqual(await parseBoundedNetworkBillingJson(jsonPost(JSON.stringify(value))),{ok:true,value});
});
test('tiny billing parser accepts exactly 4096 bytes',async()=>{
 const valid=' '.repeat(NETWORK_BILLING_JSON_MAX_BYTES-2)+'{}';
 const result=await parseBoundedNetworkBillingJson(jsonPost(valid));
 assert.deepEqual(result,{ok:true,value:{}});
});
test('tiny billing parser rejects advertised oversized bytes without consuming body',async()=>{
 const input=jsonPost('{"ok":true}',{'content-length':String(NETWORK_BILLING_JSON_MAX_BYTES+1)});
 assert.deepEqual(await parseBoundedNetworkBillingJson(input),{ok:false,status:413});
 assert.equal(input.bodyUsed,false);
});
test('tiny billing parser rejects malformed or astronomical Content-Length',async()=>{
 for(const length of ['-1','not-a-number','4e3','99999999999999999999999999'])
  assert.deepEqual(await parseBoundedNetworkBillingJson(jsonPost('{}',{'content-length':length})),{ok:false,status:413});
});
test('tiny billing parser refuses streamed oversized request with missing or deceptive length',async()=>{
 for(const headers of [{},{'content-length':'20'}]){
  const chunk=new Uint8Array(NETWORK_BILLING_JSON_MAX_BYTES/2+1);
  const stream=new ReadableStream({start(c){c.enqueue(chunk);c.enqueue(chunk);c.close()}});
  assert.deepEqual(await parseBoundedNetworkBillingJson(jsonPost(stream,headers)),{ok:false,status:413});
 }
});
test('tiny billing parser rejects invalid JSON, invalid UTF-8 and missing body',async()=>{
 assert.deepEqual(await parseBoundedNetworkBillingJson(jsonPost('{')), {ok:false,status:400});
 assert.deepEqual(await parseBoundedNetworkBillingJson(jsonPost(new Uint8Array([0xff,0xfe]))),{ok:false,status:400});
 const empty=new Request(url,{method:'POST'});
 assert.deepEqual(await parseBoundedNetworkBillingJson(empty),{ok:false,status:400});
});
test('tiny billing parser fails closed on aborted or broken request streams',async()=>{
 const stream=new ReadableStream({start(c){c.error(new Error('simulated client disconnect'))}});
 assert.deepEqual(await parseBoundedNetworkBillingJson(jsonPost(stream)),{ok:false,status:400});
});
