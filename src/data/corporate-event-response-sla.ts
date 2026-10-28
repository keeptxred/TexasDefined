export type CorporateEventResponseLead = {
  created_at: string;
  status: string;
  first_contacted_at: string | null;
  first_contact_evidence_reference: string | null;
};

/** Staff-recorded first contact needs BOTH credible timing and private evidence.
 * The private reference is never returned to a public endpoint or displayed.
 * This establishes record integrity, not independent confirmation of delivery.
 */
export function hasRecordedCorporateEventFirstContact(
  lead: CorporateEventResponseLead,
  now: Date = new Date(),
): boolean {
  const createdAt = Date.parse(lead.created_at);
  const contactedAt = lead.first_contacted_at ? Date.parse(lead.first_contacted_at) : NaN;
  const evidence = lead.first_contact_evidence_reference?.trim() ?? '';
  return Number.isFinite(createdAt) && Number.isFinite(contactedAt)
    && contactedAt >= createdAt && contactedAt <= now.getTime()
    && evidence.length >= 20 && evidence.length <= 500;
}


/** Internal operations target, never a promised public SLA or delivery receipt. */
export const INTERNAL_FOLLOW_UP_TARGET_HOURS = 48;

export function summarizeCorporateEventResponseTimes(
  leads: CorporateEventResponseLead[],
  now: Date = new Date(),
) {
  const deadlineMs = INTERNAL_FOLLOW_UP_TARGET_HOURS * 60 * 60 * 1000;
  let awaitingFirstContact = 0;
  let overdueFirstContact = 0;
  let contactedWithinTarget = 0;
  let contactedAfterTarget = 0;
  let recordedContacts = 0;
  let totalHours = 0;
  for (const lead of leads) {
    const createdAt = Date.parse(lead.created_at);
    if (!Number.isFinite(createdAt)) continue;
    const contactedAt = lead.first_contacted_at ? Date.parse(lead.first_contacted_at) : NaN;
    if (hasRecordedCorporateEventFirstContact(lead, now)) {
      const elapsedMs = contactedAt - createdAt;
      recordedContacts += 1;
      totalHours += elapsedMs / 3_600_000;
      if (elapsedMs <= deadlineMs) contactedWithinTarget += 1;
      else contactedAfterTarget += 1;
      continue;
    }
    // Never treat a status change or a sent-button click as proof of contact.
    // A legacy/bad 'contacted' status without credible contact evidence must stay visible.
    if (!['new', 'reviewing', 'contacted'].includes(lead.status)) continue;
    awaitingFirstContact += 1;
    if (now.getTime() - createdAt > deadlineMs) overdueFirstContact += 1;
  }
  return {
    awaitingFirstContact,
    overdueFirstContact,
    contactedWithinTarget,
    contactedAfterTarget,
    recordedContacts,
    averageFirstContactHours: recordedContacts ? Math.round((totalHours / recordedContacts) * 10) / 10 : null,
  };
}

export function isCorporateEventLeadOverdue(lead: CorporateEventResponseLead, now: Date = new Date()) {
  if (!['new', 'reviewing', 'contacted'].includes(lead.status)) return false;
  const created = Date.parse(lead.created_at);
  if (!Number.isFinite(created)) return false;
  // Never suppress a follow-up just because a timestamp exists: the private
  // supporting evidence reference must be recorded and within valid bounds.
  if (hasRecordedCorporateEventFirstContact(lead, now)) return false;
  return now.getTime() - created > INTERNAL_FOLLOW_UP_TARGET_HOURS * 3_600_000;
}
