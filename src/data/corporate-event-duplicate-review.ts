export type CorporatePlannerDuplicateCandidate = {
  id: string;
  created_at: string;
  email: string;
  company: string;
  city: string;
  group_size: number;
  event_category: string;
  event_date: string | null;
};

export type CorporatePlannerDuplicateNotice = { similarCount: number; otherIds: string[] };

/**
 * Flags ONLY likely repeat submissions for human review. Never automatically
 * removes, rejects, combines, forwards, or exposes private planner data.
 * Matching stays within the already-protected operator dashboard.
 */
export function findCorporatePlannerDuplicates(
  leads: readonly CorporatePlannerDuplicateCandidate[],
  withinHours = 48,
): Map<string, CorporatePlannerDuplicateNotice> {
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');
  const groups = new Map<string, CorporatePlannerDuplicateCandidate[]>();
  for (const lead of leads) {
    const key = [
      normalize(lead.email),
      normalize(lead.company),
      normalize(lead.city),
      lead.group_size,
      lead.event_category,
      lead.event_date || 'undated',
    ].join('|');
    const list = groups.get(key) ?? [];
    list.push(lead);
    groups.set(key, list);
  }
  const matches = new Map<string, CorporatePlannerDuplicateNotice>();
  const windowMillis = withinHours * 60 * 60 * 1000;
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    for (const lead of group) {
      const created = Date.parse(lead.created_at);
      if (!Number.isFinite(created)) continue;
      const otherIds = group
        .filter((other) => other.id !== lead.id)
        .filter((other) => {
          const otherCreated = Date.parse(other.created_at);
          return Number.isFinite(otherCreated) && Math.abs(otherCreated - created) <= windowMillis;
        })
        .map((other) => other.id);
      if (otherIds.length) matches.set(lead.id, { similarCount: otherIds.length, otherIds });
    }
  }
  return matches;
}
