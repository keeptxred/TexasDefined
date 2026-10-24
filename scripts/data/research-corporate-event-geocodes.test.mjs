import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  validatePublicVenueAddress,
  loadPublicCorporateVenueCatalog,
  censusAddressLookupUrl,
  parseCensusCandidate,
  researchPublicVenueCoordinates,
} from './research-corporate-event-geocodes.mjs';

const date='2026-10-23';
const entry={ city:'Houston',officialUrl:'https://official-example.test/events' };
const row={providerSlug:'synthetic-event-venue',streetAddress:'4600 Sample Park Road',city:'Houston',
  zip:'77002',officialAddressEvidenceUrl:'https://official-example.test/contact',addressReviewedOn:date};
const venues=new Map([['synthetic-event-venue',entry]]);
const actualDirectory = loadPublicCorporateVenueCatalog();
assert.equal(actualDirectory.size, 122, 'Manual geocoding research must include all 122 current real source records');
assert.equal(actualDirectory.get('beat-the-bomb-houston')?.city, 'Houston');
assert(actualDirectory.get('main-event-webster-corporate')?.officialUrl.startsWith('https://'),
  'A venue with pre-slug metadata must also be found');

assert.equal(validatePublicVenueAddress(row,entry,date),null,'Official business street evidence should be accepted for further research');
assert.match(validatePublicVenueAddress({...row,streetAddress:'Downtown Houston'},entry,date),/street number/);
assert.match(validatePublicVenueAddress({...row,city:'Dallas'},entry,date),/differs/);
assert.match(validatePublicVenueAddress({...row,zip:'99999abc'},entry,date),/five-digit/);
assert.match(validatePublicVenueAddress({...row,officialAddressEvidenceUrl:'https://unrelated.test/venue'},entry,date),/official venue HTTPS domain/);
assert.match(validatePublicVenueAddress({...row,officialAddressEvidenceUrl:'http://official-example.test/address'},entry,date),/official venue HTTPS domain/);
assert.match(validatePublicVenueAddress({...row,addressReviewedOn:'2026-11-01'},entry,date),/nonfuture/);
assert.match(validatePublicVenueAddress({...row,addressReviewedOn:'2026-02-31'},entry,date),/nonfuture/);
const censusUrl = new URL(censusAddressLookupUrl(row));
assert.equal(censusUrl.hostname, 'geocoding.geo.census.gov');
assert.equal(censusUrl.searchParams.get('benchmark'),'Public_AR_Current');
assert.equal(censusUrl.searchParams.get('format'),'json');
assert(censusUrl.searchParams.get('address').includes('4600 Sample Park Road'));

const fakeReply={result:{addressMatches:[{
  matchedAddress:'4600 SAMPLE PARK ROAD, HOUSTON, TX, 77002',
  addressComponents:{city:'HOUSTON',state:'TX',fromAddress:'4590'},
  coordinates:{x:-95.372,y:29.758},
}]}};
const candidate=parseCensusCandidate(fakeReply,'Houston','4600');
assert.equal(candidate.kind,'census-address-range-interpolation');
assert.equal(candidate.manualReviewRequired,true);
assert.equal(candidate.canBeUsedAsVenueEntrance,false);
assert.equal(candidate.canBeAutoPublished,false);
assert.equal(candidate.latitude,29.758);
assert.equal(parseCensusCandidate({...fakeReply,result:{addressMatches:[]}},'Houston','4600'),null);
assert.equal(parseCensusCandidate({...fakeReply,result:{addressMatches:[fakeReply.result.addressMatches[0],fakeReply.result.addressMatches[0]]}},'Houston','4600'),null);
assert.equal(parseCensusCandidate(fakeReply,'Dallas','4600'),null);
assert.equal(parseCensusCandidate(fakeReply,'Houston','4700'),null);
assert.equal(parseCensusCandidate({...fakeReply,result:{addressMatches:[{...fakeReply.result.addressMatches[0],addressComponents:{city:'HOUSTON',state:'OK'}}]}},'Houston','4600'),null);
let requestCount=0;
const fakeFetch=async (url)=>{
  requestCount++;
  assert.equal(new URL(url).hostname,'geocoding.geo.census.gov');
  return new Response(JSON.stringify(fakeReply),{status:200,headers:{'content-type':'application/json'}});
};
const result=await researchPublicVenueCoordinates([row],venues,fakeFetch,date);
assert.equal(requestCount,1);
assert.equal(result.acceptedVerifiedVenuePoints,0);
assert.equal(result.proposals.length,1);
assert.equal(result.proposals[0].status,'needs-premises-confirmation');
assert.equal(result.proposals[0].published,false);
assert.equal(result.proposals[0].automaticallyImported,false);
assert.equal(result.proposals[0].candidate.canBeUsedAsVenueEntrance,false);
const rejected=await researchPublicVenueCoordinates([{...row,city:'Dallas'}],venues,fakeFetch,date);
assert.equal(requestCount,1,'Reject unsourced addresses before any network request');
assert.equal(rejected.proposals[0].status,'rejected-input');
await assert.rejects(researchPublicVenueCoordinates(Array(26).fill(row),venues,fakeFetch,date),/Maximum 25/);
await assert.rejects(researchPublicVenueCoordinates([row,row],venues,fakeFetch,date),/One independently reviewed/);
const moduleText=readFileSync('scripts/data/research-corporate-event-geocodes.mjs','utf8');
assert(moduleText.includes("args.includes('--lookup')") && moduleText.includes("insideArtifacts(input)"),
  'Census research must be explicitly invoked and write only private quarantined artifacts');
assert(!moduleText.includes('from(\'texasdefined_group_event') && !moduleText.includes('supabaseAdmin') &&
  !moduleText.includes('update_file') && !moduleText.includes('wrangler'),
  'Research must have no production database, publishing or deployment mutation path');
console.log('Corporate events public venue geocode research: Census interpolations quarantined, official-source evidence, input bounds and zero auto-publication PASS');
