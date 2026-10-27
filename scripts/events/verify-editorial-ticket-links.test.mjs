import test from 'node:test';
import assert from 'node:assert/strict';
import {
  approvedEditorialProbeUrl, editorialProbeOutcome, probeEditorialOfficialUrl,
  texasLocalToday, selectEditorialProbeBatch,
} from './verify-editorial-ticket-links.mjs';

test('explicit public ticket seller allowlist excludes internal, malicious, arbitrary and directory URLs',()=>{
  const good=[
    'https://www.etix.com/ticket/p/62230269/a-christmas-story-conroe-crighton-theatre',
    'https://www.ticketsignup.io/TicketEvent/BluebonnetAirshow',
    'https://ticketing.roninpos.app/events/wfesttickets',
    'https://www.eventbrite.com/e/organizer-sponsored-show-123456',
  ];
  for(const u of good)assert.ok(approvedEditorialProbeUrl(u),u);
  for(const u of [
    'https://localhost/event/abc','https://127.0.0.1/event/abc',
    'https://www.etix.com.evil.test/ticket/p/1234',
    'http://www.etix.com/ticket/p/1234',
    'https://user@etix.com/ticket/p/1234',
    'https://www.etix.com:8080/ticket/p/1234',
    'https://www.etix.com/','https://some-unknown-organizer.org/event/test',
    'javascript:alert(1)',
  ])assert.equal(approvedEditorialProbeUrl(u),null,u);
});

test('no automatic redirect following, no false seat or broken-link conclusion on restricted sellers',()=>{
  const url=new URL('https://www.etix.com/ticket/p/62230269/test');
  assert.equal(editorialProbeOutcome(200,null,url),'REACHABLE_NO_INVENTORY_CLAIM');
  assert.equal(editorialProbeOutcome(302,'https://www.etix.com/ticket/p/62230269/test',url),'REDIRECT_SAME_PATH_NO_INVENTORY_CLAIM');
  assert.equal(editorialProbeOutcome(302,'https://www.etix.com/ticket/p/99999/other',url),'REDIRECT_DIFFERENT_DESTINATION_REVIEW');
  // A session ID can live in the query string rather than the path. Such a
  // redirect must not be called same-performance admission.
  const queryEvent=new URL('https://www.etix.com/ticket/p/62230269/test?session=matinee&date=2026-12-13');
  assert.equal(editorialProbeOutcome(302,'?session=evening&date=2026-12-13',queryEvent),'REDIRECT_DIFFERENT_DESTINATION_REVIEW');
  assert.equal(editorialProbeOutcome(302,'?session=matinee&date=2026-12-14',queryEvent),'REDIRECT_DIFFERENT_DESTINATION_REVIEW');
  assert.equal(editorialProbeOutcome(302,'?session=matinee&date=2026-12-13',queryEvent),'REDIRECT_SAME_PATH_NO_INVENTORY_CLAIM');
  assert.equal(editorialProbeOutcome(302,'?session=matinee&date=2026-12-13#prices',queryEvent),'REDIRECT_SAME_PATH_NO_INVENTORY_CLAIM');

  assert.equal(editorialProbeOutcome(302,'https://not-a-trusted-site.org/checkout',url),'REDIRECT_UNVERIFIED_INCONCLUSIVE');
  assert.equal(editorialProbeOutcome(404,null,url),'REVIEW_NOT_FOUND');
  assert.equal(editorialProbeOutcome(410,null,url),'REVIEW_NOT_FOUND');
  assert.equal(editorialProbeOutcome(401,null,url),'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.equal(editorialProbeOutcome(403,null,url),'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.equal(editorialProbeOutcome(429,null,url),'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.equal(editorialProbeOutcome(500,null,url),'PROVIDER_SERVER_ERROR_INCONCLUSIVE');
});

test('HEAD remains bounded and GET only follows legitimate 405 (not CAPTCHA or 403)',async()=>{
  const url='https://www.etix.com/ticket/p/62230269/test';
  const methods=[];
  const fake=(status)=>({status,headers:{get(){return null}},body:{cancel(){}}});
  const result=await probeEditorialOfficialUrl(url,(_u,opts)=>{
    methods.push(opts.method);
    return fake(opts.method==='HEAD'?405:200);
  });
  assert.deepEqual(methods,['HEAD','GET']);
  assert.equal(result.probeStatus,'REACHABLE_NO_INVENTORY_CLAIM');
  const blocked=await probeEditorialOfficialUrl(url,(_u,opts)=>{
    methods.push(opts.method);return fake(403);
  });
  assert.equal(blocked.probeStatus,'ACCESS_RESTRICTED_INCONCLUSIVE');
  assert.deepEqual(methods,['HEAD','GET','HEAD']);
  const unlisted=await probeEditorialOfficialUrl('https://unknown.example.net/event/abc',()=>{
    throw Error('should not fetch unapproved domain');
  });
  assert.equal(unlisted.probeStatus,'UNLISTED_PROVIDER_INCONCLUSIVE');
});

test('deterministically take 25 upcoming nonaffiliate editorial event links; recheck changed or 14-day stale',()=>{
  const now=new Date('2026-10-27T03:00:00Z'); // still Oct 26 in Texas
  assert.equal(texasLocalToday(now),'2026-10-26');
  assert.equal(texasLocalToday(new Date('2026-10-27T15:00:00Z')),'2026-10-27');
  const events=[
    {id:'b',startDate:'2026-10-27',status:'scheduled',ticketUrl:'https://www.etix.com/ticket/p/b',isAffiliate:false},
    {id:'a',startDate:'2026-10-26',status:'scheduled',ticketUrl:'https://www.etix.com/ticket/p/a',isAffiliate:false},
    {id:'c',startDate:'2026-10-28',status:'cancelled',ticketUrl:'https://www.etix.com/ticket/p/c',isAffiliate:false},
    {id:'d',startDate:'2026-10-28',status:'scheduled',ticketUrl:'https://www.etix.com/ticket/p/d',isAffiliate:true},
    {id:'ticketmaster:e',startDate:'2026-10-28',status:'scheduled',ticketUrl:'https://www.ticketmaster.com/event/abc',isAffiliate:false},
    {id:'old',startDate:'2026-10-25',status:'scheduled',ticketUrl:'https://www.etix.com/ticket/p/old',isAffiliate:false},
  ];
  const batch=selectEditorialProbeBatch(events,{},now,25);
  assert.equal(batch.eligible,2);
  assert.deepEqual(batch.candidates.map(x=>x.id),['a','b']);
  const history={'editorial:a':{date:'2026-10-26',officialUrl:events[1].ticketUrl,checkedAt:now.toISOString()}};
  assert.deepEqual(selectEditorialProbeBatch(events,history,now).candidates.map(x=>x.id),['b']);
  const changed=[{...events[1],ticketUrl:'https://www.etix.com/ticket/p/new'}];
  assert.deepEqual(selectEditorialProbeBatch(changed,history,now).candidates.map(x=>x.id),['a']);
  history['editorial:a'].checkedAt=new Date(now.getTime()-15*86400000).toISOString();
  assert.deepEqual(selectEditorialProbeBatch(events,history,now).candidates.map(x=>x.id),['a','b']);
});
