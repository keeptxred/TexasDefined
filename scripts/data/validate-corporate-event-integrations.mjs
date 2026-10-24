import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assessCorporateProviderAction } from '../../src/data/corporate-event-integration-readiness.ts';

const now = new Date('2026-10-23T18:00:00.000Z');
const valid = {
  providerSlug: 'synthetic-venue',
  selectedProviderSlugs: ['synthetic-venue'],
  organizerVenueSharingConsent: true,
  organizerVenueSharingConsentedAt: '2026-10-22T15:00:00.000Z',
  organizerExplicitBookingAuthorization: false,
  organizerPaymentAuthorization: false,
  businessIdentityVerifiedAt: '2026-10-22T15:00:00.000Z',
  agreementVerifiedAt: '2026-10-22T15:00:00.000Z',
  agreementExpiresOn: '2026-12-31',
  agreementCoversQuoteRouting: true,
  separatelySignedBookingAuthority: false,
  separatelySignedPaymentAuthority: false,
  vendorBookingAdapterVerified: false,
  vendorPaymentAdapterVerified: false,
  venueAvailabilityWrittenConfirmation: false,
  eventDate: '2026-12-15',
};
const manual = assessCorporateProviderAction('prepare_quote_draft', valid, now);
assert.equal(manual.state, 'manual_draft_only');
assert.equal(manual.permittedToExecute, false);
assert.equal(manual.performsNetworkAction, false);
assert.equal(manual.partnerOutreachSent, false);
assert.equal(manual.bookingCreated, false);
assert.equal(manual.paymentCaptured, false);

const denied = (patch, action = 'prepare_quote_draft') =>
  assessCorporateProviderAction(action, { ...valid, ...patch }, now);
assert.equal(denied({ selectedProviderSlugs: ['other'] }).state, 'blocked');
assert.equal(denied({ organizerVenueSharingConsent: false }).state, 'blocked');
assert.equal(denied({ organizerVenueSharingConsentedAt: null }).state, 'blocked');
assert.equal(denied({ organizerVenueSharingConsentedAt: '2026-10-25T00:00:00Z' }).state, 'blocked');
assert.equal(denied({ businessIdentityVerifiedAt: null }).state, 'blocked');
// Signed identity/consent/agreement evidence must use strict, real-calendar
// ISO timestamps, not permissive JS Date.parse interpretations.  Future
// adapters may not lower the public offer provenance requirements.
for (const invalidTimestamp of [
  '2026-10-22', 'October 22, 2026', '2026-10-22T15:00:00',
  '2026-02-31T15:00:00Z', '2026-13-01T15:00:00Z',
  '2026-10-22T25:00:00Z', '2026-10-22T15:00:00+14:30',
  '2026-10-22T15:00:00Z unexpected',
]) {
  for (const field of [
    'organizerVenueSharingConsentedAt', 'businessIdentityVerifiedAt', 'agreementVerifiedAt',
  ]) {
    assert.equal(denied({ [field]: invalidTimestamp }).state, 'blocked',
      `${field} accepted malformed or non-ISO evidence ${invalidTimestamp}`);
  }
}
assert.equal(denied({ agreementVerifiedAt: null }).state, 'blocked');
assert.equal(denied({ agreementCoversQuoteRouting: false }).state, 'blocked');
assert.equal(denied({ agreementExpiresOn: '2026-10-01' }).state, 'blocked');
assert.equal(denied({ eventDate: '2026-08-01' }).state, 'blocked');
assert.equal(denied({ eventDate: '2026-02-31' }).state, 'blocked');
assert.equal(denied({ providerSlug: '../admin' }).state, 'blocked');
assert.equal(denied({}, 'transmit_quote_request').state, 'requires_signed_provider_adapter');

for (const action of ['transmit_quote_request','hold_booking','confirm_booking','collect_payment']) {
  const allClaimed = denied({
    organizerExplicitBookingAuthorization: true,
    organizerPaymentAuthorization: true,
    separatelySignedBookingAuthority: true,
    separatelySignedPaymentAuthority: true,
    vendorBookingAdapterVerified: true,
    vendorPaymentAdapterVerified: true,
    venueAvailabilityWrittenConfirmation: true,
  },action);
  assert.equal(allClaimed.permittedToExecute,false);
  assert.equal(allClaimed.partnerOutreachSent,false);
  assert.equal(allClaimed.bookingCreated,false);
  assert.equal(allClaimed.paymentCaptured,false);
  assert.equal(allClaimed.state,'requires_signed_provider_adapter');
}
assert.equal(denied({},'hold_booking').state,'blocked');
assert.equal(denied({},'collect_payment').state,'blocked');
// Friday October 23, 2026 at 9 PM in Texas is already Oct 24 in UTC.
// Same-day Texas dates and expiring-on-today agreements remain valid until
// the Texas date rolls over; the fixture must never activate network delivery.
const texasEvening = new Date('2026-10-24T02:00:00.000Z');
const sameDay = assessCorporateProviderAction('prepare_quote_draft', {
  ...valid, eventDate: '2026-10-23', agreementExpiresOn: '2026-10-23',
}, texasEvening);
assert.equal(sameDay.state, 'manual_draft_only',
  'UTC midnight must not prematurely expire Texas-local venue date/contract');
assert.equal(sameDay.permittedToExecute, false);
assert.equal(assessCorporateProviderAction('prepare_quote_draft',
  { ...valid, eventDate: '2026-10-22', agreementExpiresOn: '2026-10-23' }, texasEvening).state, 'blocked',
  'Yesterday in Texas must remain expired');
assert.equal(assessCorporateProviderAction('prepare_quote_draft',
  { ...valid, eventDate: '2026-10-23', agreementExpiresOn: '2026-10-22' }, texasEvening).state, 'blocked',
  'Yesterday-expired partner agreements must remain blocked');
const texasNextDay = new Date('2026-10-24T05:01:00.000Z');
assert.equal(assessCorporateProviderAction('prepare_quote_draft',
  { ...valid, eventDate: '2026-10-23', agreementExpiresOn: '2026-10-23' }, texasNextDay).state, 'blocked',
  'Same local-calendar date is expired once Texas midnight actually passes');
assert.equal(assessCorporateProviderAction('prepare_quote_draft',
  { ...valid, eventDate: '2026-02-31', agreementExpiresOn: '2026-12-31' }, texasEvening).state, 'blocked',
  'Calendar rollover must never become an eligible event date');
const source = readFileSync('src/data/corporate-event-integration-readiness.ts','utf8');
assert(!/\bfetch\s*\(|\bXMLHttpRequest\b|\bStripe\s*\(|navigator\.sendBeacon/.test(source));
assert(!source.includes('process.env.'), 'No credentials or activation secret must be referenced');
assert(source.includes('corporateEventEvidenceTimestampIsValid'), 'Use shared commercial evidence timestamp validation');
assert(source.includes('permittedToExecute: false') && source.includes('paymentCaptured: false'));
assert(source.includes('corporateEventTexasToday(now)') && source.includes('isUpcomingCorporateEventDate(data.eventDate, now)'),
  'Offline provider readiness must use the exact Texas calendar policy as real private planner intake');
console.log('Corporate event quote, booking and payment integration foundation: fail-closed and zero network/execution PASS');
