/**
 * Thanksgiving week in America/Chicago: Monday before the fourth Thursday of
 * November through the following Sunday. The seasonal homepage automatically
 * reverts to its evergreen title on Monday without another deployment.
 */
export function isTexasThanksgivingWeek(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "numeric", day: "numeric",
  }).formatToParts(date);
  const read = (type: string): number => Number(parts.find((part) => part.type === type)?.value);
  const year = read("year");
  if (read("month") !== 11) return false;
  const firstDay = new Date(Date.UTC(year, 10, 1)).getUTCDay();
  const thanksgiving = 1 + (4 - firstDay + 7) % 7 + 21;
  const today = read("day");
  return today >= thanksgiving - 3 && today <= thanksgiving + 3;
}
