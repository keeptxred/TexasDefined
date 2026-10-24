/**
 * Corporate event quote/booking connector contract.
 *
 * Offline readiness checks ONLY. The current marketplace has NO verified
 * booking/payment provider integration, transport or contract credentials.
 * This module deliberately cannot send mail, create bookings or take money.
 *
 * A future adapter must enforce these same checks again on the server immediately
 * before use, and separately test the actual provider's authentication, webhook
 * signatures, idempotency, cancellation and refund obligations.
 */
export type CorporateProviderAction =
  | 'prepare_quote_draft' | 'transmit_quote_request'
  | 'hold_booking' | 'confirm_booking' | 'collect_payment';

export type CorporateIntegrationReadiness = {
  /** Editorial venue identifier — not proof of commercial partnership. */
  providerSlug: string;
  /** Venue in organizer's recorded exact shortlist. */
  selectedProviderSlugs: readonly string[];
  organizerVenueSharingConsent: boolean;
  organizerVenueSharingConsentedAt: string | null;
  /** Booking-specific authorization is NEVER inferred from quote-sharing consent. */
  organizerExplicitBookingAuthorization: boolean;
  organizerPaymentAuthorization: boolean;
  businessIdentityVerifiedAt: string | null;
  agreementVerifiedAt: string | null;
  agreementExpiresOn: string | null;
  agreementCoversQuoteRouting: boolean;
  /** These two capabilities are deliberately NOT enabled by existing agreements. */
  separatelySignedBookingAuthority: boolean;
  separatelySignedPaymentAuthority: boolean;
  vendorBookingAdapterVerified: boolean;
  vendorPaymentAdapterVerified: boolean;
  venueAvailabilityWrittenConfirmation: boolean;
  eventDate: string | null;
};

export type CorporateIntegrationDecision = {
  action: CorporateProviderAction;
  state: 'blocked' | 'manual_draft_only' | 'requires_signed_provider_adapter';
  /** Intentionally has no 'eligible to execute' state in this release. */
  permittedToExecute: false;
  performsNetworkAction: false;
  partnerOutreachSent: false;
  bookingCreated: false;
  paymentCaptured: false;
  reasons: readonly string[];
};

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T12:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validEvidenceTimestamp(value: string | null, now: Date): boolean {
  if (!value) return false;
  const n = Date.parse(value);
  return Number.isFinite(n) && n <= now.getTime() && n > 0;
}

/** No external side effects, PII in outputs, fabricated quotes or live offers. */
export function assessCorporateProviderAction(
  action: CorporateProviderAction,
  data: CorporateIntegrationReadiness,
  now: Date = new Date(),
): CorporateIntegrationDecision {
  const reasons: string[] = [];
  const quoteLike = action === 'prepare_quote_draft' || action === 'transmit_quote_request';
  const bookingLike = action === 'hold_booking' || action === 'confirm_booking';
  const payment = action === 'collect_payment';
  const needsBooking = bookingLike || payment;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.providerSlug)
    || !data.selectedProviderSlugs.includes(data.providerSlug)) {
    reasons.push('The organizer did not select the exact verified venue.');
  }
  if (!data.organizerVenueSharingConsent
    || !validEvidenceTimestamp(data.organizerVenueSharingConsentedAt, now)) {
    reasons.push('Separate organizer consent for this selected venue is missing.');
  }
  if (!validEvidenceTimestamp(data.businessIdentityVerifiedAt, now)) {
    reasons.push('Independent business identity evidence is missing.');
  }
  if (!validEvidenceTimestamp(data.agreementVerifiedAt, now)) {
    reasons.push('No independently verified signed partner agreement is recorded.');
  }
  if (!data.agreementCoversQuoteRouting) {
    reasons.push('Signed partner terms do not authorize quote routing.');
  }
  const today = now.toISOString().slice(0, 10);
  if (data.agreementExpiresOn
    && (!validDate(data.agreementExpiresOn) || data.agreementExpiresOn < today)) {
    reasons.push('The signed commercial agreement is expired or invalid.');
  }
  if (data.eventDate && (!validDate(data.eventDate) || data.eventDate < today)) {
    reasons.push('The proposed event date is past or invalid.');
  }
  if (needsBooking) {
    if (!data.organizerExplicitBookingAuthorization) {
      reasons.push('A specific organizer booking authorization is required beyond inquiry sharing.');
    }
    if (!data.separatelySignedBookingAuthority) {
      reasons.push('The signed partner terms do not independently authorize bookings.');
    }
    if (!data.vendorBookingAdapterVerified) {
      reasons.push('No vendor-approved booking adapter is verified.');
    }
    if (!data.venueAvailabilityWrittenConfirmation) {
      reasons.push('No written venue availability confirmation exists.');
    }
    if (!data.eventDate) {
      reasons.push('Booking requires a valid agreed future event date.');
    }
  }
  if (payment) {
    if (!data.organizerPaymentAuthorization) reasons.push('No explicit payment authorization exists.');
    if (!data.separatelySignedPaymentAuthority) reasons.push('No signed payment-collection authority exists.');
    if (!data.vendorPaymentAdapterVerified) reasons.push('No verified payment provider contract and adapter exist.');
  }
  // A human-readable draft is permitted only when the specific selected venue,
  // organizer opt-in and independently verified partner agreement all pass.
  const manualOnly = action === 'prepare_quote_draft' && reasons.length === 0;
  // No real transport or connector is configured in this release, even if
  // synthetic test fixture fields claim capabilities.
  if (!manualOnly && reasons.length === 0) {
    reasons.push('Provider API, sender identity, contracts and operational reviews are not activated.');
  }
  return {
    action,
    state: manualOnly ? 'manual_draft_only'
      : reasons.length > 0 && quoteLike && action === 'prepare_quote_draft'
      ? 'blocked' : 'requires_signed_provider_adapter',
    permittedToExecute: false,
    performsNetworkAction: false,
    partnerOutreachSent: false,
    bookingCreated: false,
    paymentCaptured: false,
    reasons,
  };
}
