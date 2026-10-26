import test from 'node:test';
import assert from 'node:assert/strict';
import { publicTicketUrl, classifyTicketLinkResponse, probePublicTicketUrl, primaryAdmissionProbeCandidate, chooseBatch, summarizeProviderProbeOutcomes } from './verify-ticketmaster-link-batch.mjs';

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
  const future = (days) => new Date(Date.now()+days*86400000).toISOString().slice(0,10);
  const events=[
    {id:'z',name:'Performance Z',startDate:future(3),officialUrl:official,status:'onsale'},
    {id:'a',name:'Performance A',startDate:future(2),officialUrl:official,status:'onsale'},
    {id:'b',name:'Performance B',startDate:future(2),officialUrl:official,status:'onsale'},
    {id:'c',name:'Cancelled show',startDate:future(4),officialUrl:official,status:'cancelled'},
    {id:'old',name:'Expired show',startDate:'2020-01-01',officialUrl:official,status:'onsale'},
  ];
  const first=chooseBatch(events,0,2);
  assert.deepEqual(first.candidates.map(x=>x.id),['a','b']);
  const second=chooseBatch(events,first.nextCursor,2);
  assert.deepEqual(second.candidates.map(x=>x.id),['z','a']);
  assert.equal(second.total,3);
  assert.equal(second.nextCursor,1);
});

test('daily outbound verification excludes branded garage parking and add-on products', () => {
  const notAdmission = [
    'FIFTH THIRD GARAGE: Dallas Stars v New Jersey Devils',
    '5th Third Garage: Concert',
    'Pentatonix - Parking',
    'Holiday Show VIP Upgrade',
    'Artist Fast Lane Pass',
    'Parking Lot: Arena Concert',
    'Meet & Greet Add-on: Tour',
    'Garage Parking: Arena Event',
    'Concert - Parking Pass',
    'VIP Upgrade: Artist',
    'Test Concert - Ticket Not Included',
  ];
  for (const name of notAdmission) {
    assert.equal(primaryAdmissionProbeCandidate({ name }), false, name);
  }
  for (const name of ['Dallas Stars vs. New Jersey Devils', 'Pentatonix: Christmas in the City Tour', 'The Parking Lot (band) Live']) {
    assert.equal(primaryAdmissionProbeCandidate({ name }), true, name);
  }
  assert.equal(primaryAdmissionProbeCandidate({ name: '' }), false);
  const date = new Date(Date.now()+86400000).toISOString().slice(0,10);
  const events = [
    { id: 'garage', name: notAdmission[0], startDate: date, officialUrl: official, status: 'onsale' },
    { id: 'vip', name: notAdmission[3], startDate: date, officialUrl: official, status: 'onsale' },
    { id: 'show', name: 'Dallas Stars vs. New Jersey Devils', startDate: date, officialUrl: official, status: 'onsale' },
    { id: 'off', name: 'Off Sale Show', startDate: date, officialUrl: official, status: 'offsale' },
    { id: 'sold', name: 'Sold Out Concert', startDate: date, officialUrl: official, status: 'soldout' },
  ];
  const batch = chooseBatch(events, 0, 40);
  assert.deepEqual(batch.candidates.map(e=>e.id), ['show']);
  assert.equal(batch.total, 1);
});


test('summarize vendor-specific restricted and inconclusive results without implying inventory', () => {
  const list = [
    { id:'a', officialUrl:'https://www.ticketmaster.com/event/ABC123' },
    { id:'b', officialUrl:'https://www.ticketweb.com/event/holiday-concert/14999111' },
    { id:'c', officialUrl:'https://www.ticketmaster.com/event/DEF456' },
    { id:'d', officialUrl:'https://private.example.test/event/ZZZ' },
  ];
  const probes = {
    a:{ probeStatus:'ACCESS_RESTRICTED_INCONCLUSIVE' },
    b:{ probeStatus:'PROVIDER_SERVER_ERROR_INCONCLUSIVE' },
    c:{ probeStatus:'REACHABLE_NO_INVENTORY_CLAIM' },
    d:{ probeStatus:'REVIEW_INVALID_OR_UNAPPROVED_URL' },
  };
  assert.deepEqual(summarizeProviderProbeOutcomes(list,probes), {
    ticketmaster:{ ACCESS_RESTRICTED_INCONCLUSIVE:1, REACHABLE_NO_INVENTORY_CLAIM:1 },
    ticketweb:{ PROVIDER_SERVER_ERROR_INCONCLUSIVE:1 },
    'invalid-provider-url':{ REVIEW_INVALID_OR_UNAPPROVED_URL:1 },
  });
  assert.deepEqual(summarizeProviderProbeOutcomes([],{}),{});
  assert.deepEqual(summarizeProviderProbeOutcomes([list[0]],{}),
    {ticketmaster:{NOT_RECORDED_INCONCLUSIVE:1}});
});

test('daily automation skips recent identical probes despite rolling date-index changes', () => {
  const now = new Date();
  const futureDate = new Date(now.getTime()+4*86400000).toISOString().slice(0,10);
  const events = ['alpha','beta','gamma'].map((id) => ({
    id, name:'Admission '+id, startDate:futureDate,
    officialUrl:'https://www.ticketmaster.com/'+id+'/event/'+id.toUpperCase(),
    status:'onsale',
  }));
  const history = Object.fromEntries(events.slice(0,2).map((event) => [event.id, {
    eventId:event.id, date:event.startDate, officialUrl:event.officialUrl,
    checkedAt:now.toISOString(), probeStatus:'ACCESS_RESTRICTED_INCONCLUSIVE',
  }]));
  const next=chooseBatch(events,40,40,history,now);
  assert.deepEqual(next.candidates.map((row)=>row.id), ['gamma']);
  assert.equal(next.pendingToCheck,1);
  const changed = {...events[0], officialUrl:'https://www.ticketmaster.com/alpha/event/NEWID'};
  const correction=chooseBatch([changed,events[1]],0,40,history,now);
  assert.deepEqual(correction.candidates.map((row)=>row.id),['alpha']);
  const staleHistory = {...history, beta:{...history.beta,checkedAt:new Date(now.getTime()-15*86400000).toISOString()}};
  const stale=chooseBatch(events,0,40,staleHistory,now);
  assert.deepEqual(stale.candidates.map((row)=>row.id),['beta','gamma']);
  assert.equal(stale.total,3);
});
