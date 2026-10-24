import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { corporateEventProviders } from '@/data/corporate-events';
import { corporateEventTexasToday } from '@/data/corporate-event-dates';

/**
 * Private STAFF ATTESTATIONS of independently evidenced events. Nothing in
 * this module sends a quote, forwards PII, captures a booking or takes money.
 */
export type CorporateEventOutcomeType =
  | 'quote_requested' | 'quote_received' | 'referral_sent'
  | 'booking_confirmed' | 'booking_cancelled'
  | 'dispute_opened' | 'dispute_resolved' | 'revenue_verified';

export type CorporateEventOutcomeInput = {
  plannerRequestId: string;
  venueSlug: string;
  outcomeType: CorporateEventOutcomeType;
  occurredAt: string;
  evidenceReference: string;
  amountCents: number | null;
  confirmIndependentEvidence: true;
};

export type CorporateEventOutcomeRecord = {
  id: string;
  planner_request_id: string;
  venue_slug: string | null;
  outcome_type: CorporateEventOutcomeType;
  occurred_at: string;
  recorded_at: string;
  evidence_reference: string;
  amount_cents: number | null;
};

const client = supabaseAdmin as any;
const MAX_EVENTS = 120;

/**
 * The private panel never relies on a stale consent/applicant snapshot when
 * recording a real outcome. An approved identity is insufficient without
 * signed partner authorization of the actual referral/quote relationship.
 */
export async function recordCorporateEventOutcome(
  accessKey: string,
  input: CorporateEventOutcomeInput,
) {
  await assertSportsPartnerAccess(accessKey);
  if (!input.confirmIndependentEvidence) {
    throw new Error('Independently verified evidence and the real-world event are required.');
  }
  const evidence = input.evidenceReference.trim();
  if (evidence.length < 20 || evidence.length > 500) {
    throw new Error('Record a 20–500 character private evidence reference, not an assumed conversion.');
  }
  if (!corporateEventProviders.some((provider) => provider.slug === input.venueSlug)) {
    throw new Error('Provider must exist in the officially sourced editorial directory.');
  }
  const when = new Date(input.occurredAt);
  if (!Number.isFinite(when.getTime()) || when.toISOString() !== input.occurredAt
    || when.getTime() > Date.now() + 60_000
    || when.getTime() < Date.now() - 2 * 365 * 24 * 3_600_000) {
    throw new Error('A real historical or current event timestamp is required, never a future booking prediction.');
  }
  const revenue = input.outcomeType === 'revenue_verified';
  if (revenue ? !Number.isSafeInteger(input.amountCents) || (input.amountCents ?? 0) <= 0
    || (input.amountCents ?? 0) > 1_000_000_000 : input.amountCents !== null) {
    throw new Error('Only independently received actual revenue has a positive cent amount.');
  }
  const { data: lead, error: leadError } = await client
    .from('texasdefined_group_event_requests')
    .select('id,created_at,status,provider_slugs,allow_provider_outreach,provider_outreach_consented_at')
    .eq('id', input.plannerRequestId).maybeSingle();
  if (leadError || !lead?.id || lead.status === 'spam') throw new Error('Verified planner request not found.');
  if (when.getTime() < Date.parse(String(lead.created_at))) {
    throw new Error('An outcome cannot precede the original planner inquiry.');
  }
  if (!lead.allow_provider_outreach || !lead.provider_outreach_consented_at
    || !Array.isArray(lead.provider_slugs) || !lead.provider_slugs.includes(input.venueSlug)
    || when.getTime() < Date.parse(String(lead.provider_outreach_consented_at))) {
    throw new Error('Planner-specific venue sharing authorization must precede the recorded event.');
  }
  const venue = corporateEventProviders.find((provider) => provider.slug === input.venueSlug)!;
  const { data: partners, error: partnerError } = await client
    .from('texasdefined_group_event_partner_applications')
    .select('id,status,business_name,website,identity_verified_at,commercial_agreement_verified_at,commercial_agreement_covers_quote_routing,commercial_agreement_expires_on')
    .eq('status', 'approved').limit(250);
  if (partnerError || !Array.isArray(partners) || partners.length === 250) {
    throw new Error('Partner agreement verification is unavailable.');
  }
  const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const verified = partners.filter((partner: any) => {
    if (normalize(String(partner.business_name)) !== normalize(venue.name)
      || !partner.identity_verified_at || !partner.commercial_agreement_verified_at
      || partner.commercial_agreement_covers_quote_routing !== true) return false;
    if (partner.commercial_agreement_expires_on
      && partner.commercial_agreement_expires_on < corporateEventTexasToday()) return false;
    try {
      const official = new URL(venue.officialUrl);
      const business = new URL(String(partner.website));
      const host = (url: URL) => url.hostname.toLowerCase().replace(/^www\./, '');
      const officialHost = host(official), businessHost = host(business);
      return business.protocol === 'https:' && official.protocol === 'https:'
        && (officialHost === businessHost || officialHost.endsWith('.' + businessHost)
          || businessHost.endsWith('.' + officialHost));
    } catch { return false; }
  });
  if (verified.length !== 1) {
    throw new Error('One independently verified partner and signed quote-routing agreement are required.');
  }
  // A signed commercial term can have a start date; never back-date staff evidence
  // to before the separate agreement verification was recorded.
  if (when.getTime() < Date.parse(String(verified[0].commercial_agreement_verified_at))) {
    throw new Error('Outcome evidence predates verified partner authorization.');
  }
  // No pseudo-conversions from clicks or customer planning estimates. Operators
  // must already hold a receipt/quote/provider confirmation before attesting.
  const { data, error } = await client.from('texasdefined_group_event_outcome_events').insert({
    planner_request_id: input.plannerRequestId,
    venue_slug: input.venueSlug,
    outcome_type: input.outcomeType,
    occurred_at: input.occurredAt,
    evidence_reference: evidence,
    recorded_by: 'TexasDefined authorized corporate event operations',
    amount_cents: revenue ? input.amountCents : null,
  }).select('id,outcome_type').maybeSingle();
  if (error || !data?.id) throw new Error('Outcome evidence could not be saved. Review duplicate evidence or agreement validity.');
  return { id: String(data.id), type: String(data.outcome_type), sent: false, booked: false, charged: false };
}

/** Read-only reporting for authorized staff, with explicit truncation. */
export async function loadCorporateEventOutcomes(accessKey: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data, error } = await client.from('texasdefined_group_event_outcome_events')
    .select('id,planner_request_id,venue_slug,outcome_type,occurred_at,recorded_at,evidence_reference,amount_cents')
    .order('recorded_at', { ascending: false }).limit(MAX_EVENTS + 1);
  if (error) throw new Error('Private corporate-event outcome ledger is temporarily unavailable.');
  const rows = (data ?? []) as CorporateEventOutcomeRecord[];
  const bounded = rows.slice(0, MAX_EVENTS);
  const counts: Partial<Record<CorporateEventOutcomeType, number>> = {};
  let verifiedReceivedCents = 0;
  for (const event of bounded) {
    counts[event.outcome_type] = (counts[event.outcome_type] ?? 0) + 1;
    if (event.outcome_type === 'revenue_verified' && Number.isSafeInteger(event.amount_cents)) {
      verifiedReceivedCents += event.amount_cents ?? 0;
    }
  }
  return {
    events: bounded,
    counts,
    verifiedReceivedCents,
    truncated: rows.length > MAX_EVENTS,
    limitedToRecentRows: MAX_EVENTS,
    revenueDefinition: 'Staff-evidenced actual received revenue, not click value, quotes or booking estimates.',
  };
}
