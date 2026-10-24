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

/** Staff-only recent evidence view plus a complete, bounded search for all
 * outstanding due venue follow-ups. The latest actual interaction must win
 * even if it was recorded out of chronological order. No production records
 * are changed or invented by this read-only scan.
 *
 * A hard cap prevents expensive unbounded service-role reads. If reached,
 * return only recent due tasks with a prominent non-exhaustive disclosure,
 * never an invented "all-time" total.
 */
const HISTORY_PAGE_SIZE = 400;
const HISTORY_LIMIT = 5_000;
const HISTORY_FIELDS = 'id,provider_slug,contact_kind,occurred_at,evidence_key,evidence_reference,followup_on,recorded_at';

export async function loadCorporateVenueOutreach(accessKey: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data, error } = await client.from('texasdefined_group_event_partner_outreach')
    .select(HISTORY_FIELDS)
    .order('recorded_at',{ascending:false}).order('id',{ascending:false})
    .limit(EVENT_LIMIT + 1);
  if (error) throw new Error('The private venue contact-evidence log is unavailable.');
  const rows = (data ?? []) as CorporateVenueOutreachRow[];
  const events = rows.slice(0, EVENT_LIMIT);
  const today = corporateEventTexasToday();
  const truncated = rows.length > EVENT_LIMIT;
  let exhaustiveHistory = !truncated;
  const history = rows.slice();

  if (truncated) {
    // Freeze the scan to the newest row at load time. Recorded contact evidence
    // is append-only; later inserts cannot shift historical page offsets.
    const newestRecordedAt = rows[0].recorded_at;
    while (history.length <= HISTORY_LIMIT) {
      const batchSize = Math.min(HISTORY_PAGE_SIZE, HISTORY_LIMIT + 1 - history.length);
      const { data: pageData, error: pageError } = await client
        .from('texasdefined_group_event_partner_outreach').select(HISTORY_FIELDS)
        .lte('recorded_at', newestRecordedAt)
        .order('recorded_at',{ascending:false}).order('id',{ascending:false})
        .range(history.length, history.length + batchSize - 1);
      if (pageError) throw new Error('The private venue follow-up history could not be reviewed.');
      const page = (pageData ?? []) as CorporateVenueOutreachRow[];
      history.push(...page);
      if (page.length < batchSize) { exhaustiveHistory = true; break; }
    }
  }

  // The complete outstanding list is exposed only after ALL recorded venue
  // interactions were checked. This prevents an older superseded reminder from
  // reappearing when a history cap excludes a later-occurring record.
  const visibleDue = dueLatestCorporateVenueFollowups(events, today);
  const dueFollowups = exhaustiveHistory
    ? dueLatestCorporateVenueFollowups(history, today)
    : visibleDue;
  return {
    events,
    truncated,
    maxDisplayed: EVENT_LIMIT,
    followupsDueInVisibleRows: visibleDue.length,
    dueFollowupEventIds: dueFollowups.map(event => event.id),
    dueFollowupEvents: dueFollowups,
    followupsDueInReviewedHistory: dueFollowups.length,
    followupHistoryExhaustive: exhaustiveHistory,
    followupHistoryRecordsReviewed: history.length,
    today,
    disclosure: exhaustiveHistory
      ? 'Only independently evidenced, manually entered business conversations. The due follow-up queue checks every recorded venue interaction as of this read; the most recent actual interaction determines each venue task. The recent activity log separately displays at most 120 events. No outreach, booking, partner or revenue totals are implied.'
      : 'Only independently evidenced business conversations. More than 5,000 records exist; due reminders show only the latest 120 visible events, not an exhaustive queue. Truncation can hide older tasks. Request a database-backed scalable queue before relying on complete historical follow-ups. No outreach, booking, partner or revenue totals are implied.',
  };
}
