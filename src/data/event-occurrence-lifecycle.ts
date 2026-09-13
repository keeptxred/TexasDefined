export type EventOccurrenceDateShape = {
  startDate: string;
  endDate?: string;
  occurrenceWindows?: readonly { startDate: string; endDate?: string }[];
};

function texasDateKey(now: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function latestEventOccurrenceDate(event: EventOccurrenceDateShape) {
  const windows = event.occurrenceWindows?.length
    ? event.occurrenceWindows
    : [{ startDate: event.startDate, endDate: event.endDate }];
  return windows
    .map((window) => window.endDate || window.startDate)
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort()
    .at(-1) ?? null;
}

export function hasCurrentOrFutureConfirmedEventOccurrence(event: EventOccurrenceDateShape, now = new Date()) {
  const latest = latestEventOccurrenceDate(event);
  return Boolean(latest && latest >= texasDateKey(now));
}

export function hasExpiredConfirmedEventOccurrence(event: EventOccurrenceDateShape, now = new Date()) {
  const latest = latestEventOccurrenceDate(event);
  return Boolean(latest && latest < texasDateKey(now));
}
