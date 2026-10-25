import { loadTicketmasterEventsServer } from "./ticketmaster-events.server";
import { resolveEventTicketCta } from "./ticketing";
import { providerForVerifiedTicketUrl } from "./ticket-provider";
import type { TexasEventRecord } from "./texas-event-record";

/**
 * Date-specific, source-checked 2026 performances for the permanent Christmas hub.
 * This editorial list supplements (but does not duplicate) the normal Ticketmaster
 * calendar ingestion. The list expires naturally; 2026 is never projected to 2027.
 * Only the existing, fresh Ticketmaster snapshot may supply affiliate links.
 */
interface ChristmasPerformance {
  id: string;
  name: string;
  date: string;
  /** Last scheduled date when this entry represents a multi-day run. */
  endDate?: string;
  timeLabel: string;
  city: string;
  venue: string;
  sourceUrl: string;
  sourceName: string;
  description: string;
  ticketmasterNeedle?: string;
}

const verified: readonly ChristmasPerformance[] = [
  {
    id: "grinch-dallas-2026", name: "Dr. Seuss' How the Grinch Stole Christmas! The Musical",
    date: "2026-11-27", endDate: "2026-11-29", timeLabel: "11:00 AM, 3:00 PM & 7:00 PM · run Nov. 25–29",
    city: "Dallas", venue: "Music Hall at Fair Park",
    sourceUrl: "https://broadwaydallas.org/shows/dr-seuss-how-the-grinch-stole-christmas-the-musical/",
    sourceName: "Broadway Dallas",
    description: "Touring stage musical; select an exact performance before buying. Every attendee requires a ticket.",
    // Multiple separate showtimes: link to the official performance selector rather
    // than falsely attaching an affiliate ticket for one time to all three.
  },
  {
    id: "king-country-fort-worth-2026", name: "for KING + COUNTRY: A Drummer Boy Christmas",
    date: "2026-12-05", timeLabel: "7:00 PM", city: "Fort Worth", venue: "Dickies Arena",
    sourceUrl: "https://www.livenation.com/event/vvG1YZ_Cx4afyp/for-king-country-a-drummer-boy-christmas",
    sourceName: "Live Nation", ticketmasterNeedle: "drummer boy christmas",
    description: "Holiday arena concert by the Christian pop duo; plan arena parking and arrival before showtime.",
  },
  {
    id: "christmas-kwanzaa-dallas-2026", name: "Promising Young Artist Series: 33rd Annual Christmas/Kwanzaa Concert",
    date: "2026-12-11", timeLabel: "7:30 PM", city: "Dallas", venue: "Bruton Theatre",
    sourceUrl: "https://www.ticketmaster.com/promising-young-artist-series-33rd-annual-dallas-texas-12-11-2026/event/0C00653DBA7FA947",
    sourceName: "Ticketmaster official event ticket page", ticketmasterNeedle: "33rd annual christmas kwanzaa",
    description: "Annual arts and music program presented at the Bruton Theatre.",
  },
  {
    id: "christmas-story-conroe-2026", name: "A Christmas Story",
    date: "2026-12-13", endDate: "2026-12-20", timeLabel: "2:00 PM · additional dates Dec. 4–20",
    city: "Conroe", venue: "Crighton Theatre",
    sourceUrl: "https://www.etix.com/ticket/v/32639/crighton-theatre",
    sourceName: "Crighton Theatre linked ticketing (Etix)", ticketmasterNeedle: "a christmas story",
    description: "Stage adaptation of the Ralphie Parker story; other performances are available in the run.",
  },
  {
    id: "pentatonix-fort-worth-2026", name: "Pentatonix: Christmas in the City Tour",
    date: "2026-12-16", timeLabel: "7:00 PM", city: "Fort Worth", venue: "Dickies Arena",
    sourceUrl: "https://www.livenation.com/event/vvG1YZ_Cn4lA0M/pentatonix-christmas-in-the-city-tour",
    sourceName: "Live Nation", ticketmasterNeedle: "pentatonix",
    description: "Holiday concert with the acclaimed a cappella group.",
  },
  {
    id: "jazzy-christmas-dallas-2026", name: "A Jazzy Christmas Concert",
    date: "2026-12-17", timeLabel: "7:00 PM", city: "Dallas", venue: "Bruton Theatre",
    sourceUrl: "https://www.ticketmaster.com/a-jazzy-christmas-concert-dallas-texas-12-17-2026/event/0C00653DB901A616",
    sourceName: "Ticketmaster official event ticket page", ticketmasterNeedle: "a jazzy christmas concert",
    description: "Holiday jazz concert at the Bruton Theatre.",
  },
  {
    id: "very-merry-symphony-cedar-park-2026", name: "A Very Merry Symphony featuring Austin Symphony Orchestra",
    date: "2026-12-20", timeLabel: "7:00 PM · doors 6:00 PM",
    city: "Cedar Park", venue: "H-E-B Center at Cedar Park",
    sourceUrl: "https://www.hebcenter.com/events/detail/a-very-merry-symphony",
    sourceName: "H-E-B Center", ticketmasterNeedle: "a very merry symphony",
    description: "Full-orchestra holiday program; consult arena bag and parking policies.",
  },
  {
    id: "celtic-christmas-mcallen-2026", name: "A Celtic Christmas by A Taste of Ireland",
    date: "2026-12-20", timeLabel: "4:00 PM", city: "McAllen",
    venue: "McAllen Performing Arts Center",
    sourceUrl: "https://experiencemcallen.com/event/a-celtic-christmas-mcallen-2026/",
    sourceName: "Experience McAllen", ticketmasterNeedle: "a celtic christmas",
    description: "Touring Irish dance, live music and seasonal performance in the Rio Grande Valley.",
  },
  {
    id: "grand-ol-christmas-houston-2026", name: "The Grand Ol' Christmas Show",
    date: "2026-12-22", timeLabel: "7:00 PM", city: "Houston", venue: "House of Blues Houston",
    sourceUrl: "https://www.livenation.com/event/G5dIZ_GluCTsV/grand-ol-christmas",
    sourceName: "Live Nation", ticketmasterNeedle: "grand ol christmas",
    description: "Retro holiday variety show featuring Blue Water Highway Band.",
  },
  {
    id: "grand-ol-christmas-dallas-2026", name: "The Grand Ol' Christmas Show",
    date: "2026-12-23", timeLabel: "6:00 PM show · doors at 5:00 PM",
    city: "Dallas", venue: "House of Blues Dallas",
    sourceUrl: "https://www.ticketmaster.com/grand-ol-christmas-dallas-texas-12-23-2026/event/0C0064CA0668F4BE",
    sourceName: "Ticketmaster official event ticket page", ticketmasterNeedle: "grand ol christmas",
    description: "Holiday variety show. The 5 p.m. listing is the event/door time, not the performance start.",
  },
  {
    id: "cirque-musica-cedar-park-2026", name: "Cirque Musica Holiday Wonderland",
    date: "2026-12-24", timeLabel: "2:00 PM · doors 1:00 PM",
    city: "Cedar Park", venue: "H-E-B Center at Cedar Park",
    sourceUrl: "https://www.hebcenter.com/events/detail/cirque-musica-holiday-wonderland-2026",
    sourceName: "H-E-B Center", ticketmasterNeedle: "cirque musica holiday wonderland",
    description: "Christmas Eve circus and live-music show; separate VIP add-ons are not admission tickets.",
  },
  {
    id: "christmas-carol-houston-2026", name: "A Christmas Carol",
    date: "2026-12-27", timeLabel: "See performance schedule · run Nov. 15–Dec. 27",
    city: "Houston", venue: "Alley Theatre · Hubbard Theatre",
    sourceUrl: "https://www.alleytheatre.org/plays/christmas-carol-2026/",
    sourceName: "Alley Theatre",
    description: "The final scheduled day of the Alley Theatre's 2026 holiday run; children under six are not admitted.",
    // Multiple dates and showtimes: let the theatre's selector handle exact choice.
  },
];

function texasToday(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (kind: "year" | "month" | "day") => parts.find((part) => part.type === kind)?.value ?? "00";
  return [get("year"), get("month"), get("day")].join("-");
}

function normalized(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function getChristmasPerformances2026Server(now = new Date()) {
  const today = texasToday(now);
  if (today > "2026-12-27") return [];
  const ticketmaster = loadTicketmasterEventsServer(undefined, now);
  return verified.filter((show) => (show.endDate ?? show.date) >= today).map((show) => {
    // A theatre run remains current after its featured performance passes, but
    // do not promote a single-date ticket that may already be expired.
    const featuredDatePassed = show.date < today;
    const match = !featuredDatePassed && show.ticketmasterNeedle
      ? ticketmaster.find((event) =>
        event.startDate === show.date
        && normalized(event.city) === normalized(show.city)
        && normalized(event.title).includes(normalized(show.ticketmasterNeedle!))
        && normalized(event.venueName ?? "").includes(normalized(show.venue.split(" · ")[0]))
      ) : undefined;
    const ticketCta = resolveEventTicketCta(match?.ticketing, now);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC", month: "short", day: "numeric", year: "numeric",
    }).format(new Date((featuredDatePassed ? show.endDate! : show.date) + "T12:00:00Z"));
    return {
      ...show,
      dateLabel: featuredDatePassed ? `Additional shows through ${formattedDate}` : formattedDate,
      timeLabel: featuredDatePassed ? "Choose a remaining performance from the organizer's live schedule" : show.timeLabel,
      ticket: ticketCta ?? {
        href: show.sourceUrl, label: "Official event details →",
        rel: "noopener noreferrer", isAffiliate: false,
        disclosure: undefined,
      },
    };
  });
}

/**
 * A separate, source-qualified occurrence for each of the 12 curated shows.
 * Multi-performance runs are represented by the reviewed FEATURED date only;
 * their full operating date windows are not continuous (e.g. the Grinch has
 * no Thursday Nov 26 show, Conroe skips weekdays). The original holiday hub
 * remains the place to select the other organizer-confirmed showtimes.
 *
 * This is intentionally the same verified[] source used by the Christmas hub.
 * Never convert a broad production run into a continuous calendar window.
 */
export function getVerifiedChristmasPerformanceCalendarRecords2026(): TexasEventRecord[] {
  const cities: Record<string, { region: TexasEventRecord["region"]; countySlug: string; countyName: string }> = {
    Dallas: { region: "prairies-lakes", countySlug: "dallas", countyName: "Dallas County" },
    "Fort Worth": { region: "prairies-lakes", countySlug: "tarrant", countyName: "Tarrant County" },
    Conroe: { region: "piney-woods", countySlug: "montgomery", countyName: "Montgomery County" },
    "Cedar Park": { region: "hill-country", countySlug: "williamson", countyName: "Williamson County" },
    McAllen: { region: "south-texas", countySlug: "hidalgo", countyName: "Hidalgo County" },
    Houston: { region: "gulf-coast", countySlug: "harris", countyName: "Harris County" },
  };
  const confirmedStartTimes: Readonly<Record<string, string>> = {
    "king-country-fort-worth-2026": "19:00",
    "christmas-kwanzaa-dallas-2026": "19:30",
    "christmas-story-conroe-2026": "14:00",
    "pentatonix-fort-worth-2026": "19:00",
    "jazzy-christmas-dallas-2026": "19:00",
    "very-merry-symphony-cedar-park-2026": "19:00",
    "celtic-christmas-mcallen-2026": "16:00",
    "grand-ol-christmas-houston-2026": "19:00",
    "grand-ol-christmas-dallas-2026": "18:00",
    "cirque-musica-cedar-park-2026": "14:00",
  };
  const theatreIds = new Set([
    "grinch-dallas-2026",
    "christmas-story-conroe-2026",
    "celtic-christmas-mcallen-2026",
    "christmas-carol-houston-2026",
  ]);
  return verified.map((show): TexasEventRecord => {
    const place = cities[show.city];
    const sourceDate = "2026-10-25";
    const guidePath = "/events/christmas-events";
    return {
      id: 'curated:christmas-2026:' + show.id,
      slug: show.id,
      title: show.name,
      summary: show.description + (show.endDate ? ' Additional performances run through ' + show.endDate + '; check the organizer for exact dates.' : ''),
      guidePath,
      startDate: show.date,
      // No endDate: assigning the end of a discontinuous theatre run would
      // invent concerts on closed days and inflate every calendar-day count.
      startTime: confirmedStartTimes[show.id],
      venueName: show.venue,
      city: show.city,
      countySlug: place.countySlug,
      countyName: place.countyName,
      region: place.region,
      category: theatreIds.has(show.id) ? "culture" : "music",
      officialEventUrl: show.sourceUrl,
      ticketing: {
        links: [{
          provider: providerForVerifiedTicketUrl(show.sourceUrl) ?? "official",
          officialTicketUrl: show.sourceUrl,
          saleStatus: "unknown", // An active event URL does not prove seats remain.
          source: { kind: "official-event", name: show.sourceName, url: show.sourceUrl },
          lastVerifiedAt: sourceDate,
        }],
        offers: [],
      },
      status: "scheduled",
      lastVerifiedAt: sourceDate,
      lastUpdatedAt: sourceDate,
      sourceName: show.sourceName,
    };
  });
}

/** Reconcile exact same venue, city, date and event, including Ticketmaster
 * punctuation/short-title variants. Never dedupe solely by date or city. */
export function isSameChristmasPerformanceCalendarEvent(
  curated: TexasEventRecord,
  candidate: TexasEventRecord,
) {
  if (curated.city.toLowerCase() !== candidate.city.toLowerCase()
      || curated.startDate !== candidate.startDate) return false;
  const leftVenue = normalized(curated.venueName ?? "");
  const rightVenue = normalized(candidate.venueName ?? "");
  if (!leftVenue || !rightVenue
      || !(leftVenue.includes(rightVenue) || rightVenue.includes(leftVenue))) return false;
  const left = normalized(curated.title).replace(/^the /, "");
  const right = normalized(candidate.title).replace(/^the /, "");
  if (left.includes(right) || right.includes(left)) return true;
  const show = verified.find((item) => item.id === curated.slug);
  return Boolean(show?.ticketmasterNeedle && right.includes(normalized(show.ticketmasterNeedle)));
}
