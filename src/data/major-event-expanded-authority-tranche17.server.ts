import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "granbury-founders-day-jubilee",
    name: "Granbury Founder's Day Jubilee and Cook-Off",
    city: "Granbury",
    countySlug: "hood",
    countyName: "Hood County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2026-03-13",
    endDate: "2026-03-15",
    dateNote: "The Historic Granbury Merchants Association currently advertises March 13–15, 2026 for the completed Founders' Day celebration. The third-March-weekend tradition is NOT an official 2027 date announcement; the previously projected March 19–21, 2027 is therefore withdrawn pending a year-specific organizer calendar.",
    venue: "Granbury Square and Langdon Park",
    officialUrl: "https://granburysquare.com/annual-festivals-events/",
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "Granbury Founder's Day turns the historic courthouse square into a heritage weekend built around General Granbury's birthday, cook-off traditions, live entertainment, vendors and family events, making it one of Hood County's signature spring gatherings.",
    planningSections: [
      { title: "The organizer has only posted the completed March 2026 weekend", body: "Historic Granbury's current festival listing identifies March 13–15, 2026, with a bean cook-off at Langdon Park, Bean Queen crowning and General Granbury birthday events. Until a dedicated 2027 announcement appears, the recurring March weekend is a planning clue, not a verified upcoming event or ticket product." },
      { title: "Plan for activity around the square", body: "Recent programs spread festivities across Granbury Square and Langdon Park and have included the bean cook-off, birthday cake for General Granbury, vendors, live music, a parade and the well-known outhouse races. Review the final schedule before arrival because individual activities can move between locations and days." },
      { title: "Make it a Hood County weekend", body: "Granbury's courthouse square, Lake Granbury and nearby Acton make the festival easy to combine with a wider Hood County trip. Reserve time outside the event footprint if you want to explore the lakefront and local history." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-hood", label: "Explore Hood County", description: "Connect Founders Day to Granbury, the lake and nearby Acton." },
      { href: "/events", label: "Texas events calendar", description: "Compare other spring festivals and heritage weekends." },
    ],
    sources: [
      { label: "Historic Granbury Merchants Association annual festivals", url: "https://granburysquare.com/annual-festivals-events/" },
      { label: "Visit Granbury annual events", url: "https://www.visitgranbury.com/media-gallery/album/annual-events/67abaff75908cecf7ce52045/" },
    ],
  },
  {
    slug: "galveston-juneteenth-celebrations",
    name: "Galveston Juneteenth Celebrations",
    city: "Galveston",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2027-06-01",
    endDate: "2027-06-30",
    dateNote: "Visit Galveston currently publishes Juneteenth Celebrations as a June 1-30, 2027 annual-event window. This replaces the supplied seed inventory's single-day 'Juneteenth Freedom Fest' label with the destination's current, broader official framing. Individual ceremonies, tours, performances and community events will have their own dates and venues, so check the current program before traveling.",
    venue: "Galveston Island venues",
    officialUrl: "https://www.visitgalveston.com/events/annual-events/",
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "Galveston is the birthplace of Juneteenth, where General Order No. 3 was announced on June 19, 1865. The island's modern Juneteenth season connects that history to commemorations, cultural programs and community events across the month of June.",
    planningSections: [
      { title: "June 1–30, 2027 is an island-wide commemorative series", body: "Visit Galveston's current 2027 annual-event inventory confirms Juneteenth Celebrations June 1–30, 2027. That is the overall destination programming window, not a promise of continuous daily activities or a single all-access event. The historical anniversary of General Order No. 3 remains June 19; choose individual museum programs, ceremonies and island venues after the city releases event-specific dates." },
      { title: "Start with the historic context", body: "Galveston's importance comes from the June 19, 1865 announcement of General Order No. 3. Pair festival programming with the island's Juneteenth historic sites and interpretation so the celebration is grounded in the place where the holiday began." },
      { title: "Check venue-level details before arrival", body: "A month-long destination celebration can span multiple organizations and locations. Confirm the final time, admission policy and venue on the current Galveston event listing before traveling to a specific program." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-galveston", label: "Explore Galveston County", description: "Build a wider Gulf Coast history and culture itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas cultural and heritage events." },
    ],
    sources: [
      { label: "Visit Galveston annual events", url: "https://www.visitgalveston.com/events/annual-events/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche17Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
