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
    startDate: "2027-03-19",
    endDate: "2027-03-21",
    dateNote: "Visit Granbury lists Founders Day Cook Off on the third weekend in March, and the Historic Granbury Merchants Association currently presents the celebration as a Friday-through-Sunday festival honoring General Granbury's birthday. Applying that recurrence to 2027 yields March 19-21. This corrects the supplied seed inventory, which placed the event in May. Recheck the organizer when the dedicated 2027 schedule is released.",
    venue: "Granbury Square and Langdon Park",
    officialUrl: "https://granburysquare.com/annual-festivals-events/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Granbury Founder's Day turns the historic courthouse square into a heritage weekend built around General Granbury's birthday, cook-off traditions, live entertainment, vendors and family events, making it one of Hood County's signature spring gatherings.",
    planningSections: [
      { title: "Use the third weekend in March as the planning window", body: "Visit Granbury publishes Founders Day Cook Off as a third-weekend-in-March annual event, while the Historic Granbury Merchants Association currently uses a Friday-through-Sunday festival format. Texas Defined therefore maps the 2027 planning window to March 19-21 and will defer year-specific hours to the future organizer schedule." },
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
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche17Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
