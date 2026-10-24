import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { corporateEventProviders } from '@/data/corporate-events';
import { corporateEventTexasToday } from '@/data/corporate-event-dates';
import { dueLatestCorporateVenueFollowups } from '@/data/corporate-event-partner-followups';

const client = supabaseAdmin as any;
const EVENT_LIMIT = 120;
const allowedKinds = ['initial_contact','partner_reply','meeting_held','package_received','declined'] as const;
export type CorporateVenueOutreachKind = typeof allowedKinds[number];

export type CorporateVenueOutreachInput = {
  venueSlug: string;
  contactKind: CorporateVenueOutreachKind;
  occurredAt: string;
  evidenceKey: string;
  evidenceReference: string;
  followupOn: string | null;
  independentlyVerifiedActualContact: true;
};

type CorporateVenueOutreachRow = {
  id: string;
  provider_slug: string;
  contact_kind: CorporateVenueOutreachKind;
  occurred_at: string;
  evidence_key: string;
  evidence_reference: string;
  followup_on: string | null;
  recorded_at: string;
};

function validTexasCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(value + 'T12:00:00Z');
  return Number.isFinite(time) && new Date(time).toISOString().slice(0,10) === value;
}

/** Verifies staff authority first, then records one already-completed real-world
 * business communication. No lead, contract, coupon, email or booking is created.
 */
export async function recordCorporateVenueOutreach(accessKey: string, input: CorporateVenueOutreachInput) {
  await assertSportsPartnerAccess(accessKey);
  if (input.independentlyVerifiedActualContact !== true) {
    throw new Error('Do not record copied drafts or planned communications as actual outreach.');
  }
  if (!corporateEventProviders.some(provider => provider.slug === input.venueSlug)) {
    throw new Error('Outreach must match one official-source-backed editorial venue.');
  }
  if (!allowedKinds.includes(input.contactKind)) throw new Error('Unknown real interaction type.');
  const when = new Date(input.occurredAt);
  const occurred = when.getTime();
  if (!Number.isFinite(occurred) || when.toISOString() !== input.occurredAt
    || occurred > Date.now() + 60_000
    || occurred < Date.now() - 2 * 365 * 86400000) {
    throw new Error('Enter the actual date and time of a completed interaction within the last two years.');
  }
  const evidenceKey = input.evidenceKey.trim().toUpperCase();
  if (!/^[A-Z0-9][A-Z0-9:._-]{5,119}$/.test(evidenceKey)) {
    throw new Error('A genuine, bounded external message/call/meeting reference ID is required.');
  }
  const evidenceReference = input.evidenceReference.trim();
  if (evidenceReference.length < 20 || evidenceReference.length > 500) {
    throw new Error('Explain where the actual independent communication evidence can be reviewed (20–500 characters).');
  }
  if (input.followupOn !== null) {
    if (!validTexasCalendarDate(input.followupOn)
      || input.followupOn < corporateEventTexasToday(when)) {
      throw new Error('Follow-up date must be a valid day on or after the actual interaction.');
    }
  }
  const { data, error } = await client.from('texasdefined_group_event_partner_outreach').insert({
    provider_slug: input.venueSlug,
    contact_kind: input.contactKind,
    occurred_at: input.occurredAt,
    evidence_key: evidenceKey,
    evidence_reference: evidenceReference,
    followup_on: input.followupOn,
  }).select('id').maybeSingle();
  if (error || !data?.id) throw new Error('Contact evidence could not be saved; verify the real ID was not already recorded.');
  return { id: String(data.id), savedEvidence: true as const, sent: false as const,
    partnerApproved: false as const, booked: false as const };
}

/** Staff-only bounded source list. All-time totals are deliberately not inferred
 * from the most recent 120 evidence events; none are treated as sales.
 */
export async function loadCorporateVenueOutreach(accessKey: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data, error } = await client.from('texasdefined_group_event_partner_outreach')
    .select('id,provider_slug,contact_kind,occurred_at,evidence_key,evidence_reference,followup_on,recorded_at')
    .order('recorded_at',{ascending:false}).limit(EVENT_LIMIT + 1);
  if (error) throw new Error('The private venue contact-evidence log is unavailable.');
  const rows = (data ?? []) as CorporateVenueOutreachRow[];
  const today = corporateEventTexasToday();
  const events = rows.slice(0, EVENT_LIMIT);
  // One due task per venue: a newer real response/meeting/package supersedes
  // the previous follow-up. We do not claim this bounded view is exhaustive.
  const dueFollowups = dueLatestCorporateVenueFollowups(events, today);
  return {
    events,
    truncated: rows.length > EVENT_LIMIT,
    maxDisplayed: EVENT_LIMIT,
    followupsDueInVisibleRows: dueFollowups.length,
    dueFollowupEventIds: dueFollowups.map(event => event.id),
    today,
    disclosure: 'Only independently evidenced, manually entered business conversations. Due follow-ups refer only to each venue\'s latest interaction in the 120 most recently recorded entries; subsequent evidence clears the earlier reminder. Truncation can hide older tasks. This is not an all-time contact, booking, partner or revenue total.',
  };
}
