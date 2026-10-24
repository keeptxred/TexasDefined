export type CorporateEventResponseLead = {
  created_at: string;
  status: string;
  first_contacted_at: string | null;
};

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
    if (Number.isFinite(contactedAt) && contactedAt >= createdAt) {
      const elapsedMs = contactedAt - createdAt;
      recordedContacts += 1;
      totalHours += elapsedMs / 3_600_000;
      if (elapsedMs <= deadlineMs) contactedWithinTarget += 1;
      else contactedAfterTarget += 1;
      continue;
    }
    // Never treat a status change or a sent-button click as proof of contact.
    if (!['new', 'reviewing'].includes(lead.status)) continue;
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
  if (!['new', 'reviewing'].includes(lead.status) || lead.first_contacted_at) return false;
  const created = Date.parse(lead.created_at);
  return Number.isFinite(created) && now.getTime() - created > INTERNAL_FOLLOW_UP_TARGET_HOURS * 3_600_000;
}
