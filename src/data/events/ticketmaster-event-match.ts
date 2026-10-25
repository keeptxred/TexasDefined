import type { TexasEventRecord } from './texas-event-record';

/**
 * Same title/city/date is not proof of the same performance: multiple venues
 * can stage identical shows on the same night. Only combine an editorial
 * record with a Ticketmaster event when their venues independently agree.
 * A canonical venue ID wins; otherwise require the complete normalized name
 * or an explicit venue-room suffix (e.g. "Alley Theatre · Hubbard Theatre").
 * If either side lacks the venue, show a separate provider listing instead
 * of redirecting readers to potentially unrelated tickets.
 */
export function ticketmasterVenueMatches(
  editorial: Pick<TexasEventRecord, "venueId" | "venueName">,
  provider: Pick<TexasEventRecord, "venueId" | "venueName">,
): boolean {
  const normalize = (value?: string) => (value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const a = normalize(editorial.venueName);
  const b = normalize(provider.venueName);
  if (!a || !b) return false;
  // A parking/VIP/fast-lane location is not interchangeable with the main
  // concert venue. Fail closed if one record describes an admission add-on.
  const addOn = /\b(parking|vip|fast lane|upgrade|add on)\b/;
  if (addOn.test(a) !== addOn.test(b)) return false;
  // Even a shared canonical venue ID cannot turn a parking/VIP location
  // into normal admission. Apply that safety rule before the ID shortcut.
  if (editorial.venueId && provider.venueId && editorial.venueId !== provider.venueId) return false;
  // IDs identify a facility, not necessarily its stage or hall: names must
  // also agree so the Hubbard and Neuhaus stages cannot be conflated.
  return a === b || a.startsWith(b + " ") || b.startsWith(a + " ");
}


/**
 * Same venue on the same day may host a matinee and an evening performance.
 * Do not attach a ticket for a different showtime. When an editorial record
 * lacks a showtime, it may only be enriched if Ticketmaster has exactly one
 * matching same-name/date/venue performance in the current fresh snapshot.
 */
export function ticketmasterShowtimeMatches(
  editorial: Pick<TexasEventRecord, "startTime">,
  provider: Pick<TexasEventRecord, "startTime">,
  matchingProviderPerformances: number,
): boolean {
  const clock = (value?: string) => {
    const match = value?.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?/i);
    if (!match) return null;
    let hour = Number(match[1]);
    if (hour > 23 || Number(match[2]) > 59) return null;
    if (match[3]) hour = (hour % 12) + (match[3].toLowerCase() === "pm" ? 12 : 0);
    return `${String(hour).padStart(2, "0")}:${match[2]}`;
  };
  const editorialTime = clock(editorial.startTime);
  const providerTime = clock(provider.startTime);
  if (editorial.startTime && !editorialTime) return false;
  if (provider.startTime && !providerTime) return false;
  if (editorialTime && providerTime) return editorialTime === providerTime;
  if (editorialTime && !providerTime) return false;
  return matchingProviderPerformances === 1;
}


/**
 * Discovery also publishes add-ons as "events". Suite, parking and entry
 * upgrades are NOT regular show-admission tickets. Keep them out of the
 * general event feed and out of curated concert affiliate matching.
 * Prefer a false negative (official organizer fallback) over promoting
 * an addon as primary admission.
 */
export function ticketmasterIsPrimaryAdmissionTitle(name: string): boolean {
  const normalized = name.trim().toLowerCase().replace(/[–—]/g, "-");
  // These vendor disclaimers are affirmative proof this listing is NOT admission.
  if (/\b(?:not a (?:concert|event) ticket|event ticket not included|ticket not included)\b/i.test(normalized)) return false;
  // The same add-ons appear AFTER an artist/show title in provider feeds:
  // "Pentatonix - Parking", "Holiday Show VIP Upgrade", etc. An exact
  // title/venue/date/time match is not sufficient to make them admission.
  if (/\b(?:parking\s+(?:pass(?:es)?|tickets?|only)|vip\s+(?:upgrades?|add-?ons?)|fast\s+lane\s+pass(?:es)?|quick\s+pass(?:es)?|express\s+entry|club\s+access|suite\s+(?:pass(?:es)?|tickets?)|meet\s*(?:&|and)\s*greet\s+(?:add-?ons?|upgrades?)|signed\s+poster\s+add-?ons?)\b/i.test(normalized)) return false;
  if (/(?:^|[\s:–—-])parking\s*$/.test(normalized)) return false;
  if (/\b(?:parking|vip|fast lane|suite)\s+only\b/i.test(normalized)) return false;

  return !/^(?:parking(?:\s+pass)?|(?:reserved|premium|premier|general)\s+parking(?:\s+pass)?|suites?|vip\s+(?:upgrade|add-?on)|fast\s+lane(?:\s+pass)?|quick\s+pass|express\s+entry|club\s+access|meet\s*(?:&|and)\s*greet|signed\s+poster\s+add-?on)\s*[:\-]/i.test(normalized);
}
