import assert from "node:assert/strict";
import test from "node:test";
import {
  matchSourceCandidate, mayIndexDiscoveryEntity, reconcileConfirmedOccurrence,
  verifiedCalendarOccurrences, deduplicateBookingOffers, hasRecordedOwnerApproval,
  type DiscoveryEntity, type DiscoveryEvidence, type DiscoveryOccurrence,
} from "../entity-registry.ts";

const officialEditorial: DiscoveryEvidence = {
  provider: "official-organizer", official: true, purpose: "editorial",
  url: "https://www.example.org/festival", checkedAt: "2026-10-24",
};
const event: DiscoveryEntity = {
  id: "td:annual:festival", kind: "annual-event", name: "Hill Country Holiday Festival",
  city: "Fredericksburg", countySlug: "gillespie", canonicalPath: "/fixture/hill-country-holiday-festival",
  status: "published", editorialOriginal: true, qualityApproved: true,
  evidence: [officialEditorial], offers: [],
  providerRefs: { viator: "attraction-100" },
};
const officialSchedule: DiscoveryEvidence = {
  provider: "official-organizer", official: true, purpose: "schedule",
  url: "https://www.example.org/festival/2026", checkedAt: "2026-10-28",
};
const confirmed: DiscoveryOccurrence = {
  startDate: "2026-12-04", endDate: "2026-12-06",
  sourceUrl: officialSchedule.url, verifiedAt: officialSchedule.checkedAt, status: "confirmed",
};

test("supplier identifiers match existing canonical entities, names alone require review", () => {
  assert.equal(matchSourceCandidate({provider:"viator",providerId:"attraction-100",name:event.name,city:event.city},[event]).outcome,"matched");
  const sameName = matchSourceCandidate({provider:"viator",providerId:"new-100",name:event.name,city:event.city},[event]);
  assert.equal(sameName.outcome,"review");
  assert.equal(sameName.reason,"name-and-city-candidate");
  assert.equal(matchSourceCandidate({provider:"viator",providerId:"new-101",name:"A different festival",city:event.city},[event]).reason,"new-candidate");
  assert.equal(matchSourceCandidate({provider:"viator",providerId:"new-102",name:event.name,city:event.city,countySlug:"travis"},[event]).reason,"county-conflict");
});

test("evergreen authority retains indexability without inventing an occurrence", () => {
  assert.equal(mayIndexDiscoveryEntity(event),true);
  assert.deepEqual(verifiedCalendarOccurrences(event,"2026-10-29"),[]);
  assert.equal(mayIndexDiscoveryEntity({...event,qualityApproved:false}),false);
  assert.equal(mayIndexDiscoveryEntity({...event,editorialOriginal:false}),false);
  assert.equal(mayIndexDiscoveryEntity({...event,status:"candidate",offers:[{
    provider:"viator",url:"https://www.viator.com/a",relationship:"related-tour",affiliate:true,lastVerifiedAt:"2026-10-28",
  }]}),false);
  assert.equal(mayIndexDiscoveryEntity({...event,evidence:[{...officialEditorial,provider:"viator",official:false}]}),false);
});

test("only official, real date checks can advance occurrences", () => {
  assert.throws(()=>reconcileConfirmedOccurrence(event,confirmed,{...officialSchedule,official:false}));
  assert.throws(()=>reconcileConfirmedOccurrence(event,{...confirmed,startDate:"2026-02-30"},officialSchedule));
  assert.throws(()=>reconcileConfirmedOccurrence(event,{...confirmed,sourceUrl:"https://other.example.org"},officialSchedule));
  assert.deepEqual(verifiedCalendarOccurrences(reconcileConfirmedOccurrence(event,confirmed,officialSchedule),"2026-10-29"),[confirmed]);
  assert.deepEqual(verifiedCalendarOccurrences(reconcileConfirmedOccurrence(event,confirmed,officialSchedule),"2026-12-07"),[]);
  assert.deepEqual(verifiedCalendarOccurrences(reconcileConfirmedOccurrence(event,{...confirmed,status:"cancelled"},officialSchedule),"2026-10-29"),[]);
});

test("supplier offers stay separate from official event admission and deduplicate", () => {
  const offer={provider:"viator" as const,providerProductId:"100P3",url:"https://www.viator.com/tours/Texas/Example",relationship:"nearby-experience" as const,affiliate:true,lastVerifiedAt:"2026-10-27"};
  assert.deepEqual(deduplicateBookingOffers([offer,offer,{...offer,url:"http://viator.com"}, {...offer,lastVerifiedAt:"not-a-date"}]),[offer]);
});

test("supplier-derived new authority pages cannot index before owner approval and independent proof", () => {
 const candidate={...event, kind:"attraction" as const, discoveryOrigin:"supplier-candidate" as const};
 assert.equal(mayIndexDiscoveryEntity(candidate),false);
 const approval={batchId:"td-2026-11-batch-01",approvedBy:"keeptxred" as const,
  approvedAt:"2026-10-29",decision:"approved" as const,
  reviewUrl:"https://github.com/keeptxred/TexasDefined/issues/6380#issuecomment-123456"};
 const officialIdentity={...officialEditorial,purpose:"identity" as const};
 const officialLocation={...officialEditorial,purpose:"location" as const};
 assert.equal(hasRecordedOwnerApproval(approval),true);
 assert.equal(hasRecordedOwnerApproval({...approval,reviewUrl:"https://github.com/other/repo/issues/1#issuecomment-123456"}),false);
 assert.equal(hasRecordedOwnerApproval({...approval,decision:"approved",approvedAt:"2026-02-30"}),false);
 assert.equal(mayIndexDiscoveryEntity({...candidate,ownerApproval:approval}),false,
  "Owner approval alone never substitutes for independently verified operator identity and location");
 assert.equal(mayIndexDiscoveryEntity({...candidate,ownerApproval:approval,
  evidence:[officialEditorial,officialIdentity,officialLocation]}),true);
 assert.equal(mayIndexDiscoveryEntity({...candidate,ownerApproval:approval,
  evidence:[officialEditorial,{...officialIdentity,provider:"viator",official:false},officialLocation]}),false);
 assert.equal(mayIndexDiscoveryEntity({...candidate,ownerApproval:approval,
  evidence:[officialEditorial,officialIdentity,officialLocation],qualityApproved:false}),false);
});
