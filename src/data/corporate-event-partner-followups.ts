/**
 * A staff-only, bounded view of due follow-ups. One venue's older promised
 * follow-up ceases to be outstanding when there is a later independently
 * evidenced interaction with that same venue. This is not an all-time count,
 * not a response SLA, and not evidence of an actual future communication.
 */
export type VenueContactEvidenceForFollowup = {
  id: string;
  provider_slug: string;
  contact_kind: string;
  occurred_at: string;
  recorded_at: string;
  followup_on: string | null;
};

function later(a: VenueContactEvidenceForFollowup, b: VenueContactEvidenceForFollowup): boolean {
  const occurred = a.occurred_at.localeCompare(b.occurred_at);
  if (occurred !== 0) return occurred > 0;
  const recorded = a.recorded_at.localeCompare(b.recorded_at);
  return recorded !== 0 ? recorded > 0 : a.id.localeCompare(b.id) > 0;
}

/**
 * All provided events are already staff-authorized. Assumes a bounded list of
 * genuine records, not client-submitted booking/customer data.
 *
 * If history is truncated, do not claim the resulting list is complete.
 */
export function dueLatestCorporateVenueFollowups<T extends VenueContactEvidenceForFollowup>(
  events: readonly T[], today: string,
): T[] {
  const latest = new Map<string, T>();
  for (const event of events) {
    if (!event.provider_slug) continue;
    const previous = latest.get(event.provider_slug);
    if (!previous || later(event, previous)) latest.set(event.provider_slug, event);
  }
  return [...latest.values()]
    .filter(event =>
      event.contact_kind !== 'declined'
      && event.followup_on !== null
      && /^\d{4}-\d{2}-\d{2}$/.test(event.followup_on)
      && event.followup_on <= today)
    .sort((a,b) =>
      (a.followup_on ?? '').localeCompare(b.followup_on ?? '')
      || a.provider_slug.localeCompare(b.provider_slug));
}
