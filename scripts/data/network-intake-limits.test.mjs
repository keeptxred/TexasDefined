import test from 'node:test';
import assert from 'node:assert/strict';
import {NETWORK_INTAKE_MAX_BYTES,readBoundedNetworkIntakeBody} from '../../src/data/network-intake-limits.server.ts';

const url='https://texasdefined.com/api/public/network-application';
function request(body,headers={}) {
 return new Request(url,{method:'POST',body,headers,...(body instanceof ReadableStream?{duplex:'half'}:{})});
}
test('intake accepts bounded JSON with unchanged UTF-8 bytes',async()=>{
 const original='{"name":"Café"}';
 assert.equal(new TextDecoder('utf-8',{fatal:true}).decode(await readBoundedNetworkIntakeBody(request(original))),original);
});
test('intake rejects declared oversize without reading an untrusted request body',async()=>{
 const received=request('x',{'content-length':String(NETWORK_INTAKE_MAX_BYTES+1)});
 assert.equal(await readBoundedNetworkIntakeBody(received),null);
 assert.equal(received.bodyUsed,false);
});
test('intake rejects malformed or extreme Content-Length hints',async()=>{
 for(const value of ['-1','1e6','malicious','9999999999999999999999999999999999999999'])
  assert.equal(await readBoundedNetworkIntakeBody(request('a',{'content-length':value})),null);
});
test('intake accepts exactly the maximum actual bytes when Content-Length is absent',async()=>{
 const received=request(new Uint8Array(NETWORK_INTAKE_MAX_BYTES));
 assert.equal((await readBoundedNetworkIntakeBody(received)).byteLength,NETWORK_INTAKE_MAX_BYTES);
});
test('intake blocks streamed over-limit uploads despite a deceptive short header',async()=>{
 const chunk=new Uint8Array(8_000_001);
 const stream=new ReadableStream({start(controller){controller.enqueue(chunk);controller.enqueue(chunk);controller.close()}});
 assert.equal(await readBoundedNetworkIntakeBody(request(stream,{'content-length':'1'})),null);
});
test('intake fails closed on a broken request stream',async()=>{
 const stream=new ReadableStream({start(controller){controller.error(Error('mocked socket loss'))}});
 assert.equal(await readBoundedNetworkIntakeBody(request(stream)),null);
});
test('intake preserves parseable multipart fields and a private image after bounding',async()=>{
 const form=new FormData();
 form.set('application','{"plan":"basic"}');
 form.set('logo',new File([new Uint8Array([137,80,78,71,13,10,26,10])],'logo.png',{type:'image/png'}));
 const received=new Request(url,{method:'POST',body:form});
 const bytes=await readBoundedNetworkIntakeBody(received);
 const parsed=await new Response(bytes,{headers:{'content-type':received.headers.get('content-type')}}).formData();
 assert.equal(parsed.get('application'),'{"plan":"basic"}');
 assert.equal(parsed.get('logo').name,'logo.png');
});
