import type { TexasEventRecord } from "./texas-event-record";

/**
 * Seymour Helping Hands (Baylor County) official upcoming edition for 2027.
 * Organizer posted its own exact Saturday May 8, 2027 date on Nov 18, 2026.
 * Times, spectator admission, car registration fees, street closures and
 * image/media reuse rights were not published; never infer them.
 * Do not treat the nonprofit car show as all City/Chamber festivals.
 */
const records: TexasEventRecord[] = [
  {
    id: "curated-seymour-2027:spring-fling-car-show",
    slug: "seymour-spring-fling-car-show",
    title: "Seymour Spring Fling Car Show",
    summary: "Seymour Helping Hands, the original Baylor County nonprofit that organizes this community event, confirms its 2027 Spring Fling Car Show for Saturday, May 8 in downtown Seymour. Organizers plan a display of cars, trucks and motorcycles, local food and shopping vendors, awards and a free children's activity zone, with a fundraising goal supporting neighborhood assistance programs. The original announcement does not yet specify the event start/end times, car entry registration prices, spectator admission or the precise street-closure footprint. Check the organizer for updates before traveling; the announcement does not authorize photo use or establish a 2028 date.",
    guidePath: "/events?location=county%3Abaylor&start=2027-05-08&end=2027-05-08#calendar",
    startDate: "2027-05-08",
    venueName: "Downtown Seymour, Texas (exact staging details not yet announced)",
    city: "Seymour",
    countySlug: "baylor",
    countyName: "Baylor County",
    region: "prairies-lakes",
    category: "culture",
    officialEventUrl: "https://www.seymourhelpinghands.com/post/the-road-to-75-starts-now",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Seymour Helping Hands — original 2027 Spring Fling Car Show announcement",
  },
];

export function getVerifiedSeymourSpringFlingEvent2027(): TexasEventRecord[] {
  return records.map((event) => ({ ...event }));
}
