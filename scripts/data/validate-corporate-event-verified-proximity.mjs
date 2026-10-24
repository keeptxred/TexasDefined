import assert from 'node:assert/strict';
import {
  corporateEventAirMiles, searchCorporateEventVerifiedRadius,
  validVerifiedCorporateEventPoint,
} from '../../src/data/corporate-event-verified-proximity.ts';
import { readFileSync } from 'node:fs';

// Purely synthetic TEST fixtures, never venue/ZIP source data or production records.
const reviewDate = '2026-10-23';
const zipPoint = {
  latitude: 29.75, longitude: -95.35,
  sourceUrl: 'https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gaz_zcta_national.zip',
  verifiedOn: reviewDate, precision: 'zcta-representative',
};
const venuePoint = {
  latitude: 29.78, longitude: -95.39,
  sourceUrl: 'https://events.operator-example.test/group-venue-site',
  verifiedOn: reviewDate, precision: 'venue-entrance',
};
const providers = [
  { slug: 'fake-near', name: 'Synthetic Nearby Venue', officialUrl: 'https://operator-example.test/events' },
  { slug: 'fake-unknown', name: 'Synthetic Unsourced Venue', officialUrl: 'https://other-venue.test/events' },
];
const zips = [{ zip: '77002', point: zipPoint }];
const venues = [{ providerSlug: 'fake-near', point: venuePoint }];
const run = (zip, miles, zp = zips, vp = venues) =>
  searchCorporateEventVerifiedRadius(providers, zip, miles, zp, vp, reviewDate);

assert(validVerifiedCorporateEventPoint(venuePoint, 'venue', reviewDate, providers[0].officialUrl));
assert(!validVerifiedCorporateEventPoint(venuePoint, 'venue', reviewDate),
  'A venue location cannot be admitted without the independently sourced operator domain');
assert(validVerifiedCorporateEventPoint(zipPoint, 'zcta', reviewDate));
assert(!validVerifiedCorporateEventPoint(zipPoint, 'venue', reviewDate), 'A ZCTA point is never a venue address');
assert(!validVerifiedCorporateEventPoint(venuePoint, 'zcta', reviewDate), 'A venue point is never a household ZIP origin');
// Private and third-party sources cannot masquerade as "verified" just
// because they provide a plausible Texas latitude/longitude over HTTPS.
assert(!validVerifiedCorporateEventPoint({...zipPoint,sourceUrl:'https://census.gov.evil.test/zip'},'zcta',reviewDate));
assert(!validVerifiedCorporateEventPoint({...zipPoint,sourceUrl:'https://third-party-map.test/location'},'zcta',reviewDate));
assert(!validVerifiedCorporateEventPoint({...zipPoint,sourceUrl:'https://user:secret@www2.census.gov/data'},'zcta',reviewDate));
assert(!validVerifiedCorporateEventPoint({...venuePoint,sourceUrl:'https://operator-example.test.evil.test/venue'},'venue',reviewDate,providers[0].officialUrl));
assert(!validVerifiedCorporateEventPoint({...venuePoint,sourceUrl:'https://operator-example.test:444/private'},'venue',reviewDate,providers[0].officialUrl));
assert(!validVerifiedCorporateEventPoint(venuePoint,'venue',reviewDate,'https://events.operator-example.test/venue'),
  'A parent domain may not impersonate a strictly source-reviewed venue subdomain');
assert(!validVerifiedCorporateEventPoint(venuePoint,'venue',reviewDate,providers[1].officialUrl),
  'Evidence for another venue may not be reused by changing the provider slug');
assert.equal(run('77002', 10,zips,[{...venues[0],point:{...venuePoint,sourceUrl:'https://unrelated-map.test/example'}}]).status,'no_verified_venues',
  'Never admit a source-spoofed venue point into public radius results');

assert(!validVerifiedCorporateEventPoint({ ...venuePoint, sourceUrl: '' }, 'venue', reviewDate, providers[0].officialUrl), 'Every point requires evidence');
assert(!validVerifiedCorporateEventPoint({ ...venuePoint, latitude: Number.NaN }, 'venue', reviewDate, providers[0].officialUrl));
assert(!validVerifiedCorporateEventPoint({ ...venuePoint, verifiedOn: '2027-01-01' }, 'venue', reviewDate, providers[0].officialUrl), 'Future review forbidden');
assert.equal(corporateEventAirMiles(zipPoint, zipPoint), 0);
assert(corporateEventAirMiles(zipPoint, venuePoint) > 1, 'Synthetic sample should have nonzero air miles');
assert.equal(run('77002', 1).matches.length, 0, 'Radius is not a claim of venue presence');
assert.equal(run('77002', 10).matches.length, 1);
assert.equal(run('77002', 10).excludedUnverified, 1, 'Unsourced providers remain explicitly excluded');
assert.equal(run('77002', 10).originType, 'zcta-representative');
assert.equal(run('77002', 10).distanceBasis, 'straight-line-estimate-not-driving');
assert.equal(run('77002', 10).matches[0].estimateOnly, true);
assert.equal(run('77002', 10, []).status, 'unsupported_zip');
assert.equal(run('77002', 10, zips, []).status, 'no_verified_venues');
assert.equal(run('ABC02', 10).status, 'unsupported_zip');
assert.equal(run('77002', 0).status, 'unsupported_zip');
assert.equal(run('77002', 251).status, 'unsupported_zip');
assert.equal(run('77002', 10, [zips[0], zips[0]]).status, 'unsupported_zip', 'Conflicting/duplicate origin sources require review');
assert.equal(run('77002', 10, zips, [venues[0], venues[0]]).status, 'no_verified_venues', 'Conflicting venue source points are excluded');
const source = readFileSync('src/data/corporate-event-verified-proximity.ts', 'utf8');
assert(source.includes('Missing provider/ZIP evidence') || source.includes('Missing provider/ZIP'));
assert(!/navigator\.geolocation|cookie|request\.headers|cf-connecting-ip/i.test(source), "Pure ZIP geometry must not collect a user's location or device identity");
console.log('Corporate event sourced-only radius engine: unsupported ZIPs fail closed; straight-line geometry, evidence, privacy and coverage reporting PASS');
