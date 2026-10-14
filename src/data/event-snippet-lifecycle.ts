/**
 * Search-snippet lifecycle policy. A past confirmed occurrence is historical
 * evidence, not proof that the same dates are available in a future year.
 *
 * The static State Fair route is an exception to the /event/ route family.
 * Other major events obtain their latest documented end date from the server
 * authority record, so this policy does not maintain a parallel event calendar.
 */
const staticEventEndDates: Record<string, string> = {
  "/texas-state-fair": "2026-10-18",
};

export type EventSnippetInput = {
  canonicalPath?: string;
  title: string;
  description: string;
  eventOccurrenceEndDate?: string | null;
  eventName?: string;
};

export function resolveEventSnippet(input: EventSnippetInput, texasToday: string) {
  const original = { title: input.title, description: input.description };
  const path = input.canonicalPath ?? "";
  if (!path.startsWith("/event/") && path !== "/texas-state-fair") return original;

  const latestEnd = input.eventOccurrenceEndDate ?? staticEventEndDates[path];
  if (!latestEnd || !/^\d{4}-\d{2}-\d{2}$/.test(latestEnd) || latestEnd >= texasToday) return original;

  const expiredYear = latestEnd.slice(0, 4);
  const yearToken = new RegExp("\\b" + expiredYear + "\\b");
  if (!yearToken.test(input.title) && !yearToken.test(input.description)) return original;

  // Change only the finished edition's year. A *projected next-year* title
  // (e.g. 2027 after a 2026 occurrence) must never be silently stripped.
  const title = input.title
    .replace(new RegExp("\\s+" + expiredYear + "(?=[:\\s]|$)", "g"), "")
    .replace(/\s+/g, " ")
    .trim();
  const eventName = (input.eventName || title.split(":")[0]).trim() || "This Texas event";
  const description = "The last published dates for " + eventName +
    " have passed. Explore visitor guidance and official organizer links; confirm the next schedule before traveling.";
  return { title, description };
}
