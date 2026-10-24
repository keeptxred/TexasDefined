import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import {
  corporateEventOfficialDomainMatches,
  corporateEventVerifiedRedemptionUrl,
  corporateEventEvidenceTimestampIsValid,
} from '../../src/data/corporate-event-offer-provenance.ts';

test('private quote identity uses exact official HTTPS site or child, never ancestor, spoof or URL credential', () => {
  const official = 'https://www.operator-example.com/texas/team-building';
  for (const website of ['https://operator-example.com', 'https://www.operator-example.com/contact', 'https://events.operator-example.com']) {
    assert(corporateEventOfficialDomainMatches(website, official), website);
  }
  for (const website of [
    'https://example.com', 'https://operator-example.com.evil.test',
    'https://com', 'https://operator-example.com:444', 'https://person:secret@operator-example.com',
    'http://operator-example.com', 'https://localhost', 'https://www.eviloperator-example.com',
  ]) assert(!corporateEventOfficialDomainMatches(website, official), 'Reject spoofed website: '+website);
  assert(!corporateEventOfficialDomainMatches('https://operator-example.com','https://events.operator-example.com'),
    'A parent host does not independently identify a specific venue subdomain');
});

test('public offers remain hosted by the independently sourced, approved partner', () => {
  const official='https://venue-example.com/team-events';
  assert(corporateEventVerifiedRedemptionUrl(
    'https://offers.venue-example.com/corporate?code=SOURCED', 'https://venue-example.com', official));
  assert(corporateEventVerifiedRedemptionUrl(
    'https://www.venue-example.com/promo', 'https://www.venue-example.com', official));
  for(const destination of [
    'http://venue-example.com/offers',
    'https://venue-example.com.malicious.test/promo',
    'https://venue-example.com:8443/promo',
    'https://sales:password@venue-example.com/booking',
    'https://totally-unrelated.test/promo',
  ]) assert(!corporateEventVerifiedRedemptionUrl(destination,'https://venue-example.com',official),destination);
  assert(!corporateEventVerifiedRedemptionUrl('https://venue-example.com/offer','https://impostor.test',official),
    'A business site must independently match the directory source');
  assert(!corporateEventVerifiedRedemptionUrl('https://venue-example.com/offer',
    'https://venue-example.com','https://events.venue-example.com'),
    'Reverse ancestor-domain approval cannot bypass the official venue hostname');
});

test('real offer reviewer, business identity and signed agreement timestamps cannot be future, missing or malformed', () => {
  const now = new Date('2026-10-24T12:00:00Z');
  for (const value of ['2026-10-23T23:00:00Z','2026-10-24T11:59:59.987Z','2026-10-24T07:00:00-05:00']) {
    assert(corporateEventEvidenceTimestampIsValid(value,now),value);
  }
  for(const value of [null,undefined,'','2035-01-01T00:00:00Z','2026-10-24T12:00:01Z',
    'tomorrow','2026-10-24','2026-02-31T12:00:00Z','2026-10-24T12:00:00']) {
    assert(!corporateEventEvidenceTimestampIsValid(value,now),String(value));
  }
});

test('live public offers and staff-only quote use the strict security helper', () => {
  const offers = readFileSync('src/data/corporate-events-offers.server.ts','utf8');
  const quote = readFileSync('src/data/corporate-event-quote.server.ts','utf8');
  for(const condition of [
    'identity_verified_at,commercial_agreement_verified_at',
    'corporateEventEvidenceTimestampIsValid(offer.reviewed_at)',
    'corporateEventEvidenceTimestampIsValid(business.identity_verified_at)',
    'corporateEventEvidenceTimestampIsValid(business.commercial_agreement_verified_at)',
    'business.commercial_agreement_covers_offers !== true',
    'business.commercial_agreement_expires_on < offer.ends_on',
    'corporateEventVerifiedRedemptionUrl(offer.redemption_url, business.website, provider.officialUrl)',
  ]) assert(offers.includes(condition), 'Public offer approval gate missing: '+condition);
  assert(quote.includes('return corporateEventOfficialDomainMatches(website, officialUrl)'),
    'Private planner quote must use a source-verified domain predicate');
  assert(!offers.includes('approvedRedemptionUrl('),
    'Do not bypass independently sourced venue identity using only an applicant supplied website');
});
