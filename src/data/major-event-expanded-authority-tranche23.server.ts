import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "great-american-scrapbook-convention",
    name: "Great American Scrapbook Convention",
    city: "Mesquite",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-06-04",
    endDate: "2027-06-05",
    dateNote: "CK Scrapbook Events currently lists GASC-Mesquite for June 4-5, 2027 at the Mesquite Convention Center. The organizer notes that dates and locations are subject to change.",
    venue: "Mesquite Convention Center",
    officialUrl: "https://www.ckscrapbookevents.com/Events/GASC/Location-Hotel",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Great American Scrapbook Convention is a focused North Texas gathering for scrapbookers and paper crafters, combining an exhibit hall, classes, crop sessions, product shopping and community time in a two-day convention format.",
    planningSections: [
      { title: "Confirm the 2027 schedule before booking", body: "CK Scrapbook Events currently lists GASC-Mesquite for Friday and Saturday, June 4-5, 2027. Because the organizer says dates and locations can change, recheck the official event page before buying nonrefundable travel." },
      { title: "Expect shopping, classes and crop time", body: "The organizer describes its scrapbook conventions around three core activities: shopping from manufacturers and vendors, learning techniques in scheduled classes, and dedicated crop time for working on projects and socializing." },
      { title: "Choose priority classes first", body: "When the 2027 class schedule and registration details are posted, reserve the sessions that matter most to you before filling the rest of the day. Leave transition time between classes so the schedule does not crowd out the exhibit floor." },
      { title: "Leave real time for the vendor floor", body: "GASC is not only a classroom event. Build a separate shopping window into the day so you can compare products, demonstrations and project ideas without rushing between scheduled sessions." },
      { title: "Plan lodging around the Mesquite venue", body: "Use the Mesquite Convention Center as the trip-planning anchor, then compare the organizer's current hotel guidance with other nearby lodging. Check parking, cancellation terms and the final venue instructions again before arrival." },
    ],
    relatedLinks: [
      { href: "/county/dallas", label: "Explore Dallas County", description: "Connect the convention to a wider Dallas-area trip." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas conventions, arts events and festivals." },
    ],
    sources: [
      { label: "CK Scrapbook Events official calendar", url: "https://www.ckscrapbookevents.com/" },
      { label: "GASC official location and hotel page", url: "https://www.ckscrapbookevents.com/Events/GASC/Location-Hotel" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche23Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
