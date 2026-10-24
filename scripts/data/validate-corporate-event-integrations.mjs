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
const source = readFileSync('src/data/corporate-event-integration-readiness.ts','utf8');
assert(!/\\bfetch\\s*\\(|\\bXMLHttpRequest\\b|\\bStripe\\s*\\(|navigator\\.sendBeacon/.test(source));
assert(!source.includes('process.env.'), 'No credentials or activation secret must be referenced');
assert(source.includes('permittedToExecute: false') && source.includes('paymentCaptured: false'));
console.log('Corporate event quote, booking and payment integration foundation: fail-closed and zero network/execution PASS');
