import test from 'node:test';
import assert from 'node:assert/strict';
import { publicTicketUrl, classifyTicketLinkResponse, probePublicTicketUrl, chooseBatch } from './verify-ticketmaster-link-batch.mjs';

const official = 'https://www.ticketmaster.com/grand-ol-christmas/event/ABC123';
test('approved public event URLs only; block private, userinfo, misleading and unsupported hosts', () => {
  for (const value of [
    'http://www.ticketmaster.com/event/ABC123',
    'https://www.ticketmaster.com.evil.test/event/ABC123',
    'https://127.0.0.1/event/ABC123',
    'https://localhost/event/ABC123',
    'https://www.ticketmaster.com@evil.example/event/ABC123',
    'https://evil@www.ticketmaster.com/event/ABC123',
    'https://www.ticketmaster.com:8080/event/ABC123',
    'https://www.ticketmaster.com/parking',
    'javascript:alert(1)',
    '',
  ]) assert.equal(publicTicketUrl(value), null, value);
  assert.equal(publicTicketUrl(official)?.href, official);
  assert.ok(publicTicketUrl('https://www.ticketweb.com/event/holiday-show-tickets/14859023'));
});

test('redirect target can never silently swap the event or leave approved provider hosts', () => {
  const u = new URL(official);
  assert.equal(classifyTicketLinkResponse(302,u,'https://www.ticketmaster.com/different/event/OTHER'), 'REVIEW_DIFFERENT_DESTINATION');
  assert.equal(classifyTicketLinkResponse(302,u,'https://evil.example.com/event/ABC123'), 'REVIEW_UNSAFE_OR_MISSING_REDIRECT');
  assert.equal(classifyTicketLinkResponse(302,u,'javascript:alert(1)'), 'REVIEW_UNSAFE_OR_MISSING_REDIRECT');
  assert.equal(classifyTicketLinkResponse(302,u,'/grand-ol-christmas/event/ABC123'), 'REDIRECT_SAME_EVENT_PATH');
  assert.equal(classifyTicketLinkResponse(404,u,null),'REVIEW_NOT_FOUND');
  assert.equal(classifyTicketLinkResponse(410,u,null),'REVIEW_NOT_FOUND');
  assert.equal(classifyTicketLinkResponse(429,u,null),'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.equal(classifyTicketLinkResponse(403,u,null),'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.equal(classifyTicketLinkResponse(500,u,null),'PROVIDER_SERVER_ERROR_INCONCLUSIVE');
  assert.equal(classifyTicketLinkResponse(200,u,null),'REACHABLE_NO_INVENTORY_CLAIM');
});

const response = (status, location) => ({ status, headers: {get: (key) => key === 'location' ? location : null}, body: {cancel() {}} });
test('HEAD 200 proves reachability only and never seats; no bypass after 403', async () => {
  const methods=[];
  const good = await probePublicTicketUrl(official, (_url, options)=>{methods.push(options.method);return response(200);});
  assert.equal(good.probeStatus,'REACHABLE_NO_INVENTORY_CLAIM');
  assert.deepEqual(methods,['HEAD']);
  const blocked=await probePublicTicketUrl(official,(_url,options)=>{methods.push(options.method);return response(403);});
  assert.equal(blocked.probeStatus,'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.deepEqual(methods,['HEAD','HEAD']);
});
test('HEAD 405 permits one ordinary GET without bypassing access restrictions', async()=>{
  const methods=[];
  const result=await probePublicTicketUrl(official,(_url,options)=>{
    methods.push(options.method);
    return response(options.method==='HEAD'?405:200);
  });
  assert.deepEqual(methods,['HEAD','GET']);
  assert.equal(result.probeStatus,'REACHABLE_NO_INVENTORY_CLAIM');
});
test('provider network failure remains inconclusive',async()=>{
  const result=await probePublicTicketUrl(official,()=>{throw new Error('blocked');});
  assert.equal(result.probeStatus,'NETWORK_INCONCLUSIVE');
});
test('deterministic event order and rotating cursor cover catalog without repeated first 40',()=>{
  const events=[
    {id:'z',startDate:'2026-11-01',officialUrl:official,status:'onsale'},
    {id:'a',startDate:'2026-10-31',officialUrl:official,status:'onsale'},
    {id:'b',startDate:'2026-10-31',officialUrl:official,status:'onsale'},
    {id:'c',startDate:'2026-11-02',officialUrl:official,status:'cancelled'},
  ];
  const first=chooseBatch(events,0,2);
  assert.deepEqual(first.candidates.map(x=>x.id),['a','b']);
  const second=chooseBatch(events,first.nextCursor,2);
  assert.deepEqual(second.candidates.map(x=>x.id),['z','a']);
  assert.equal(second.total,3);
  assert.equal(second.nextCursor,1);
});
