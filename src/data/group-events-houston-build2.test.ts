import test from 'node:test';
import assert from 'node:assert/strict';
import { corporateEventProviders } from './corporate-events.ts';
import { houstonBuild2VerifiedProviders } from './corporate-events-houston-build2.ts';
import {
  houstonBuild2Catalog, houstonBuild2Evidence, houstonBuild2Packages, houstonInventoryAudit,
} from './group-events-houston-build2.ts';
import {
  findMarketplaceExperiences, packageFitsGroup, validateMarketplaceCatalog,
} from './group-event-marketplace-foundation.ts';

const newSlugs = new Set(houstonBuild2VerifiedProviders.map(p => p.slug));
const legacyAudit = houstonInventoryAudit.filter(x => !x.newlyResearched);

test('Houston Build 2 extends rather than replaces statewide and legacy directory', () => {
  assert.equal(corporateEventProviders.length,159);
  assert.equal(houstonBuild2VerifiedProviders.length,12);
  assert.equal(legacyAudit.length,74);
  assert.equal(houstonInventoryAudit.length,86);
  assert.equal(houstonInventoryAudit.filter(x => x.city === 'Houston' && !x.newlyResearched).length,60);
  assert.equal(corporateEventProviders.filter(x => x.city === 'Houston').length,62);
  assert.equal(new Set(corporateEventProviders.map(x=>x.slug)).size,159);
  for(const provider of houstonBuild2VerifiedProviders) {
    assert(provider.metro === 'Houston');
    assert(provider.officialUrl.startsWith('https://'));
    assert.equal(provider.verifiedOn,'2026-10-28');
    assert.equal(provider.startingPricePerPerson,null);
    assert(!legacyAudit.some(x => x.slug === provider.slug));
  }
});

test('Houston legacy operator identities are not silently turned into one location', () => {
  const bySlug = new Map(houstonInventoryAudit.map(x=>[x.slug,x]));
  assert.equal(bySlug.get('the-escape-game-houston')?.kind,'multi-site-operator');
  assert.equal(bySlug.get('escape-it-houston-group-events')?.kind,'activity-at-venue');
  assert.equal(bySlug.get('trill-on-wheels')?.kind,'mobile-experience');
  assert.equal(bySlug.get('game-show-experience-houston')?.kind,'venue-and-mobile');
  assert(legacyAudit.every(item => item.requiresIndependentLocationCheck));
  assert(houstonInventoryAudit.filter(x=>x.newlyResearched).every(item => !item.requiresIndependentLocationCheck));
});

test('source-backed tagged experience catalog is deduplicated, rights-cleared and independent', () => {
  assert.deepEqual(validateMarketplaceCatalog(houstonBuild2Catalog),[]);
  assert.equal(houstonBuild2Catalog.length,13);
  assert.equal(new Set(houstonBuild2Catalog.map(x=>x.id)).size,13);
  assert.equal(Object.keys(houstonBuild2Evidence).length,12);
  assert(houstonBuild2VerifiedProviders.every(x=>houstonBuild2Evidence[x.slug]));
  assert(houstonBuild2Catalog.every(x=>x.source.status === 'verified' && x.source.lastVerifiedAt === '2026-10-28'));
  assert(houstonBuild2Catalog.every(x=>x.locationId === null && x.provider.entityId === null));
  assert(houstonBuild2Catalog.every(x=>x.primaryMediaId === null && x.mediaRights === 'unconfirmed'));
  assert(houstonBuild2Catalog.every(x=>x.participation === 'independent' && !x.participationEvidenceVerified));
});

test('search refuses phantom large-group capacity and independently tags venues', () => {
  const matches = (size:number) => findMarketplaceExperiences(houstonBuild2Catalog,{groupSize:size}).map(x=>x.experience.provider.legacySlug);
  assert(matches(45).includes('urbanchef-houston-team-building'));
  assert(matches(45).includes('cypress-event-hall-group-rentals'));
  assert(matches(45).includes('houston-party-boats-league-city'));
  assert(!matches(45).includes('escapology-cypress-group-events'));
  assert(!matches(45).includes('escapology-sugar-land-group-events'));
  assert(!matches(45).includes('galveston-sea-ventures-corporate-charter'));
  assert(!matches(45).includes('bb-sportfishing-galveston-group-charters'));
  assert(!matches(100).includes('urbanchef-houston-team-building'));
  assert(matches(100).includes('towne-lake-lakehouse-events'));
  assert.deepEqual(findMarketplaceExperiences(houstonBuild2Catalog,{
    city:'Sugar Land',activity:'escape-room',groupSize:45,
  }),[]);
  assert.equal(findMarketplaceExperiences(houstonBuild2Catalog,{
    city:'Sugar Land',activity:'escape-room',
  }).length,1);
  assert.equal(findMarketplaceExperiences(houstonBuild2Catalog,{
    city:'Pearland',occasion:'family-reunions',
  }).length,1);
});

test('single boat capacities, separated vessels and unknown packages do not fabricate reservations', () => {
  const boats=houstonBuild2Catalog.filter(x=>x.provider.legacySlug==='houston-party-boats-league-city');
  assert.deepEqual(boats.map(x=>x.maxParticipants).sort((a,b)=>(a??0)-(b??0)),[49,75]);
  assert.equal(houstonBuild2Packages.length,2);
  assert(houstonBuild2Packages.every(x=>x.pricePerPersonCents===null));
  assert(houstonBuild2Packages.every(x=>!packageFitsGroup(x,45,'2026-10-28')));
  const fishing=houstonBuild2Catalog.filter(x=>x.activities.includes('fishing-charter'));
  assert.equal(fishing.length,2);
  assert(fishing.every(x=>x.maxParticipants === 6 && x.simultaneousCapacity === 6));
});
