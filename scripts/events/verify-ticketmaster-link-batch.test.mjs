import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { publicTicketUrl, classifyTicketLinkResponse, probePublicTicketUrl, primaryAdmissionProbeCandidate, chooseBatch, summarizeProviderProbeOutcomes, auditCatalogIntegrity } from './verify-ticketmaster-link-batch.mjs';

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

test('full Ticketmaster snapshot validates exact same-event authorized Impact wrappers', () => {
  const official = 'https://www.ticketmaster.com/event/ABC123';
  const ticketweb = 'https://www.ticketweb.com/event/safe-holiday-concert/14922334';
  const impact = (href) => 'https://ticketmaster.evyy.net/c/7758914/264167/4272?u=' + encodeURIComponent(href);
  const good = { id:'TM-ABC', name:'Holiday Concert', city:'Fort Worth',
    venue:'Ariat Arena', startDate:'2026-12-16', officialUrl:official,
    affiliateUrl:impact(official), status:'onsale' };
  const child = { ...good, id:'TW-DEF', name:'VIP Upgrade (Event Ticket Not Included)',
    officialUrl:ticketweb, affiliateUrl:impact(ticketweb), status:'soldout', venue:'' };
  const summary = auditCatalogIntegrity([good, child]);
  assert.equal(summary.rows,2);
  assert.equal(summary.uniqueEventIds,2);
  assert.equal(summary.validOfficialEventLinks,2);
  assert.equal(summary.validAuthorizedImpactDeepLinks,2);
  assert.equal(summary.ticketmaster,1);
  assert.equal(summary.ticketweb,1);
  assert.equal(summary.missingVenueNames,1);
  assert.equal(summary.filteredNonAdmissionProductNames,1);
  assert.equal(summary.offSaleOrSoldOut,1);
  assert.equal(summary.structuralErrors,0);
  assert.equal(summary.httpLinksProbed,false);
  assert.equal(summary.seatsVerified,false);
  assert.equal(summary.commissionsVerified,false);
  const wrong = auditCatalogIntegrity([
    good, { ...good, affiliateUrl:impact('https://www.ticketmaster.com/event/OTHER') },
    { ...good,id:'ATTACK',affiliateUrl:'https://not-approved.example.com/offer' },
    { ...good,id:'OTHER-CAMPAIGN',affiliateUrl:'https://ticketmaster.evyy.net/c/7758914/999999/4272?u='+encodeURIComponent(official) },
    { ...good,id:'TW-UNSAFE',officialUrl:'https://www.ticketweb.com.evil.test/event/something/12' },
    { ...good,id:'NO-CITY',city:'' },
  ]);
  assert.ok(wrong.structuralErrors>=4);
  assert.ok(wrong.errorExamples.some(x=>x.includes('duplicate-provider-id')));
  assert.ok(wrong.errorExamples.some(x=>x.includes('wrong-event-impact')));
  assert.ok(wrong.errorExamples.some(x=>x.includes('invalid-official')));
  assert.ok(wrong.errorExamples.some(x=>x.includes('missing-city')));
});
test('catalog integrity treats provider sale status as descriptive, never proof of remaining seats', () => {
  const u = 'https://www.ticketmaster.com/event/ABC123';
  const event = {id:'ONSALE',name:'Christmas Show',city:'Dallas',venue:'Bruton Theatre',
    startDate:'2026-12-11',status:'onsale',officialUrl:u,
    affiliateUrl:'https://ticketmaster.evyy.net/c/7758914/264167/4272?u='+encodeURIComponent(u)};
  const result = auditCatalogIntegrity([event, {...event,id:'UNKNOWN',status:'unknown'}]);
  assert.equal(result.structuralErrors,0);
  assert.equal(result.incompleteSaleStatus,1);
  assert.equal(result.seatsVerified,false);
});

test('checked-in Ticketmaster Discovery snapshot is structurally publishable before daily probes', () => {
  const current = JSON.parse(readFileSync(new URL('../../src/data/generated/ticketmaster-events.json', import.meta.url), 'utf8'));
  assert.ok(Array.isArray(current.events) && current.events.length > 0, 'Expected nonempty managed Discovery snapshot');
  const audit = auditCatalogIntegrity(current.events);
  assert.equal(audit.structuralErrors, 0, 'Do not enable a whole-snapshot fail-closed release gate while current source rows fail integrity: ' + audit.errorExamples.join(', '));
  assert.equal(audit.uniqueEventIds, current.events.length, 'Duplicate provider IDs in checked-in source');
  assert.equal(audit.validAuthorizedImpactDeepLinks, current.events.length, 'Missing approved, event-specific Impact tracking destinations');
  assert.equal(audit.httpLinksProbed, false);
  assert.equal(audit.seatsVerified, false);
});
