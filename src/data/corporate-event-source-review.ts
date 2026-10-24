import { corporateEventProviders, type CorporateEventProvider } from './corporate-events';
import { corporateEventTexasToday } from './corporate-event-dates';

/** Internal editorial due dates: these do not claim a website was checked. */
export type CorporateEventSourceReviewItem = {
  provider: CorporateEventProvider;
  lastVerifiedOn: string;
  dueOn: string;
  daysSinceReview: number;
  daysUntilDue: number;
  status: 'overdue' | 'due-soon' | 'scheduled' | 'unverifiable';
  reviewTopics: readonly string[];
};

const DAY_MS = 86400000;
function parseDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(value + 'T12:00:00Z');
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) return null;
  return time;
}

function datePlusDays(verifiedOn: string, days: number): string {
  const stamp = parseDate(verifiedOn);
  return stamp == null ? 'unverified' : new Date(stamp + days * DAY_MS).toISOString().slice(0, 10);
}

/**
 * Price and exact group capacity are rapidly changing publisher claims.
 * Review a listed price within 30 days and every other listing within 60.
 * Never infer accessibility, closures, operating status or remaining inventory.
 */
export function corporateEventSourceReviewSchedule(
  providers: readonly CorporateEventProvider[] = corporateEventProviders,
  asOf: string = corporateEventTexasToday(),
) {
  const now = parseDate(asOf);
  if (now === null) throw new Error('An actual calendar as-of date is required.');
  const reviewItems: CorporateEventSourceReviewItem[] = providers.map(provider => {
    const then = parseDate(provider.verifiedOn);
    const reviewWindowDays = provider.startingPricePerPerson == null ? 60 : 30;
    const dueOn = datePlusDays(provider.verifiedOn, reviewWindowDays);
    const due = parseDate(dueOn);
    const daysSinceReview = then === null ? 0 : Math.max(0, Math.round((now - then) / DAY_MS));
    const daysUntilDue = due === null ? -1 : Math.round((due - now) / DAY_MS);
    const status: CorporateEventSourceReviewItem['status'] = then === null || then > now ? 'unverifiable'
      : daysUntilDue <= 0 ? 'overdue'
      : daysUntilDue <= 14 ? 'due-soon'
      : 'scheduled';
    const reviewTopics = [
      'Operating status, temporary closure and official booking links',
      'Published simultaneous group size, room layout and activity rotation',
      'Pricing and whether taxes, food, minimum spends and staff are included',
      'Accessibility, participant restrictions and accommodation contacts',
      'Private room versus full buyout limits, simultaneous guest counts and venue-specific entrances',
      'Deposits, refunds, cancellations, catering minimums and exclusions',
      'Accessible entrances, parking, public transportation and day-of-event logistics',
      'Restrictions, advance-booking lead time and current temporary closures',
      'Official site redirects, changed event formats and alternate group packages',
    ];
    return {
      provider, lastVerifiedOn: provider.verifiedOn, dueOn, daysSinceReview,
      daysUntilDue, status, reviewTopics,
    };
  });
  const priority = { unverifiable: 0, overdue: 1, 'due-soon': 2, scheduled: 3 } as const;
  reviewItems.sort((a,b) =>
    priority[a.status] - priority[b.status]
    || a.daysUntilDue - b.daysUntilDue
    || a.provider.name.localeCompare(b.provider.name));
  return {
    total: reviewItems.length,
    overdue: reviewItems.filter(item => item.status === 'overdue').length,
    dueSoon: reviewItems.filter(item => item.status === 'due-soon').length,
    unverifiable: reviewItems.filter(item => item.status === 'unverifiable').length,
    nextReviewDueOn: reviewItems.find(item => item.status !== 'unverifiable')?.dueOn ?? null,
    items: reviewItems,
    asOf,
    method: 'Editorial follow-up schedule calculated from the last manually recorded official-source verification date; no automated venue availability check was performed.',
  };
}
