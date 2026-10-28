import test from 'node:test';
import assert from 'node:assert/strict';
import {
  findMarketplaceExperiences, legacyCorporateVenueLocation, marketplaceCapacityFit,
  packageFitsGroup, validateMarketplaceExperience, validateMarketplaceCatalog,
  type MarketplaceExperience, type MarketplacePackage,
} from './group-event-marketplace-foundation.ts';

const base: MarketplaceExperience = {
  id: 'escape-room-1',
  provider: {
    entityId: null, legacySlug: 'houston-provider', name: 'Example Houston Operator',
    source: { officialUrl: 'https://example.org/groups', lastCheckedAt: null,
      lastVerifiedAt: '2026-10-28', status: 'verified' },
  },
  locationId: 'location-1',
  servedCities: ['Houston'],
  name: 'Team escape room',
  minParticipants: 8, maxParticipants: 50, simultaneousCapacity: 50,
  rotationsConfirmed: false, durationMinutes: 120, setting: 'indoor',
  groupBookingStatus: 'eligible', foodStatus: 'unknown',
  occasions: ['corporate-events', 'team-building'], activities: ['escape-room'],
  verifiedAmenities: ['parking'], environmentTags: ['indoor'],
  participation: 'independent', participationApprovedAt: null,
  participationEvidenceVerified: false, sponsorshipApprovedAt: null,
  source: { officialUrl: 'https://example.org/groups', lastCheckedAt: '2026-10-28',
    lastVerifiedAt: '2026-10-28', status: 'verified' },
  primaryMediaId: null, mediaRights: 'unconfirmed', published: true,
};
const fixture = (changes: Partial<MarketplaceExperience>): MarketplaceExperience =>
  ({ ...base, ...changes });

test('one provider can be associated with multiple existing locations without duplicate profiles', () => {
  const locations = [
    fixture({ id: 'a', locationId: 'location-a' }),
    fixture({ id: 'b', locationId: 'location-b' }),
  ];
  assert.equal(new Set(locations.map(x => x.provider.legacySlug)).size, 1);
  assert.equal(new Set(locations.map(x => x.locationId)).size, 2);
});

test('one location can offer multiple independently capped experiences', () => {
  const items = [
    fixture({ id: 'small', maxParticipants: 12, simultaneousCapacity: 12 }),
    fixture({ id: 'large', maxParticipants: 80, simultaneousCapacity: 80 }),
  ];
  assert.equal(new Set(items.map(x => x.locationId)).size, 1);
  assert.deepEqual(findMarketplaceExperiences(items, { groupSize: 50 }).map(x => x.experience.id), ['large']);
});

test('50 participants match a confirmed 50-person experience, not an imagined 100-person buyout', () => {
  assert.equal(marketplaceCapacityFit(base, 50), 'simultaneous');
  assert.equal(marketplaceCapacityFit(base, 100), null);
});

test('unknown capacity never becomes a verified group-size match', () => {
  assert.equal(marketplaceCapacityFit(fixture({
    maxParticipants: null, simultaneousCapacity: null, rotationsConfirmed: true,
  }), 50), null);
  assert.equal(marketplaceCapacityFit(fixture({
    maxParticipants: 60, simultaneousCapacity: null, rotationsConfirmed: false,
  }), 50), null);
});

test('verified rotations differ from simultaneous capacity', () => {
  const item = fixture({ simultaneousCapacity: 20, maxParticipants: 50, rotationsConfirmed: true });
  assert.equal(marketplaceCapacityFit(item, 45), 'rotating');
  assert.equal(marketplaceCapacityFit({ ...item, rotationsConfirmed: false }, 45), null);
});

test('indoor-only excludes verified outdoor-only; occasion and activity require evidence', () => {
  const outdoor = fixture({ id: 'outdoor', setting: 'outdoor',
    occasions: ['family-reunions'], activities: ['outdoor-adventure'] });
  assert.deepEqual(findMarketplaceExperiences([base, outdoor], {
    indoorOnly: true, occasion: 'corporate-events', activity: 'escape-room',
  }).map(x => x.experience.id), ['escape-room-1']);
  assert.deepEqual(findMarketplaceExperiences([base, outdoor], {
    occasion: 'family-reunions',
  }).map(x => x.experience.id), ['outdoor']);
  assert.equal(findMarketplaceExperiences([outdoor], {
    occasion: 'family-reunions', indoorOnly: true,
  }).length, 0);
});

test('unverified source, unknown requested amenities, and unpublished records do not match', () => {
  assert.equal(findMarketplaceExperiences([fixture({
    source: { ...base.source, status: 'stale' },
  })], {}).length, 0);
  assert.equal(findMarketplaceExperiences([fixture({ published: false })], {}).length, 0);
  assert.equal(findMarketplaceExperiences([base], { amenities: ['full-restaurant'] }).length, 0);
});

test('participating and sponsored require recorded approval without paid editorial ranking boost', () => {
  const participating = fixture({ id: 'participating', participation: 'participating',
    participationApprovedAt: '2026-10-28', participationEvidenceVerified: true });
  const sponsored = fixture({ id: 'sponsored', participation: 'sponsored',
    participationApprovedAt: '2026-10-28', participationEvidenceVerified: true,
    sponsorshipApprovedAt: '2026-10-28' });
  assert.equal(validateMarketplaceExperience(fixture({
    participation: 'participating', participationApprovedAt: null,
  })).length, 1);
  assert.equal(validateMarketplaceExperience(fixture({
    participation: 'sponsored', participationApprovedAt: '2026-10-28',
    participationEvidenceVerified: true, sponsorshipApprovedAt: null,
  })).length, 1);
  assert.deepEqual(findMarketplaceExperiences([base, participating, sponsored], {
    participatingOnly: true,
  }).map(x => x.experience.id), ['participating', 'sponsored']);
  assert.deepEqual(findMarketplaceExperiences([base, sponsored, participating], {
    groupSize: 20,
  }).map(x => x.experience.id), ['escape-room-1', 'sponsored', 'participating']);
});

test('invalid capacities and controlled terms fail validation', () => {
  assert(validateMarketplaceExperience(fixture({
    minParticipants: 75, maxParticipants: 50,
  })).includes('Minimum group exceeds maximum'));
  assert(validateMarketplaceExperience(fixture({
    simultaneousCapacity: 51,
  })).includes('Simultaneous capacity exceeds event maximum'));
  assert(validateMarketplaceExperience(fixture({
    activities: ['uncontrolled-custom-tag' as never],
  })).includes('Unsupported activity'));
});

test('unlicensed real venue imagery is not eligible', () => {
  assert(validateMarketplaceExperience(fixture({
    primaryMediaId: 'media-id', mediaRights: 'unconfirmed',
  })).includes('Real venue imagery requires approved rights'));
});

test('packages have separate verified capacity, validity and price fields', () => {
  const pkg: MarketplacePackage = {
    id: 'package-1', experienceId: base.id, name: 'Lunch and games',
    includedActivities: ['Escape room'], foodAndBeverageDetails: 'Confirm lunch menu',
    minParticipants: 20, maxParticipants: 35, durationMinutes: 180,
    pricePerPersonCents: null, minimumSpendCents: null,
    validFrom: null, validUntil: null,
    source: base.source,
  };
  assert.equal(packageFitsGroup(pkg, 30), true);
  assert.equal(packageFitsGroup(pkg, 50), false);
  assert.equal(packageFitsGroup({ ...pkg, maxParticipants: null }, 30), false);
});

test('legacy editorial venues remain independent locations, never invented activities or partners', () => {
  const legacy = legacyCorporateVenueLocation({
    slug: 'example', name: 'Example', city: 'Houston', area: 'Downtown',
    categories: ['team-building'], description: 'Venue', format: 'Outdoor',
    maxGroup: 250, capacityDetail: 'Published sitewide capacity only',
    startingPricePerPerson: null, officialUrl: 'https://example.org',
    sourceUrl: 'https://example.org/venues', verifiedOn: '2026-10-28',
  });
  assert.equal(legacy.publishedVenueMaximum, 250);
  assert.equal(legacy.groupSuitability, 'supported');
  assert.equal(legacy.locationId, null);
  assert.equal(legacy.setting, 'unknown');
  assert.equal(legacy.provider.legacySlug, 'example');
});

test('unconfirmed group booking and food are not treated as verified facts', () => {
  const unknown = fixture({ groupBookingStatus: 'unknown', foodStatus: 'unknown' });
  assert.equal(findMarketplaceExperiences([unknown], { groupSize: 20 }).length, 0);
  assert.equal(findMarketplaceExperiences([unknown], { foodRequired: true }).length, 0);
  assert.equal(findMarketplaceExperiences([
    fixture({ foodStatus: 'available', verifiedAmenities: ['food-available'] }),
  ], { foodRequired: true, groupSize: 20 }).length, 1);
});
test('expired and not-yet-valid packages do not qualify', () => {
  const pkg: MarketplacePackage = {
    id: 'dated-package', experienceId: base.id, name: 'Seasonal',
    includedActivities: [], foodAndBeverageDetails: null,
    minParticipants: 10, maxParticipants: 80, durationMinutes: 120,
    pricePerPersonCents: null, minimumSpendCents: null,
    validFrom: '2026-10-01', validUntil: '2026-10-31', source: base.source,
  };
  assert.equal(packageFitsGroup(pkg, 50, '2026-10-28'), true);
  assert.equal(packageFitsGroup(pkg, 50, '2026-11-01'), false);
  assert.equal(packageFitsGroup(pkg, 50, '2026-09-30'), false);
  assert.equal(packageFitsGroup(pkg, 50), false);
});

test('duplicate experience identities are rejected before catalog publication', () => {
  assert(validateMarketplaceCatalog([base, { ...base }]).some(message => message.includes('Duplicate experience ID')));
});
test('a claimed approved timestamp without underlying partner evidence is insufficient', () => {
  assert(validateMarketplaceExperience(fixture({
    participation: 'participating', participationApprovedAt: '2026-10-28',
    participationEvidenceVerified: false,
  })).includes('Partner participation must be explicitly verified and approved'));
});

test('environmental attributes require explicitly verified tags', () => {
  assert.equal(findMarketplaceExperiences([base], { environment: ['waterfront'] }).length, 0);
  const waterfront = fixture({ environmentTags: ['indoor','waterfront'] });
  assert.equal(findMarketplaceExperiences([waterfront], { environment: ['waterfront'] }).length, 1);
  assert(validateMarketplaceExperience(fixture({
    environmentTags: ['guessed-attribute' as never],
  })).includes('Unsupported environment tag'));
});
