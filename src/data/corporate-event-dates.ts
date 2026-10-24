/** Return a Texas-local YYYY-MM-DD regardless of the server's UTC clock. */
export function corporateEventTexasToday(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const find = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return find('year') + '-' + find('month') + '-' + find('day');
}

/** Validates real calendar days and disallows expired corporate event requests. */
export function isUpcomingCorporateEventDate(value: string, now: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 2020 || year > 2200) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isFinite(date.getTime())
    && date.toISOString().slice(0, 10) === value
    && value >= corporateEventTexasToday(now);
}

/** Calendar-only validation for draft/approved commercial terms.
 * Date ordering and expiry checks are separate; impossible dates cannot
 * accidentally become valid agreements or promotional windows. */
export function isValidCorporateEventCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  if (year < 2020 || year > 2200) return false;
  const parsed = new Date(value + 'T12:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
