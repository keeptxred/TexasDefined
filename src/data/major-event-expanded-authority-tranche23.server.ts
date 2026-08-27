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
    dateNote: "CK Scrapbook Events currently lists GASC-Mesquite for June 4-5, 2027 at the Mesquite Convention Center, with dates subject to change. This supersedes the supplied discovery inventory's July 2027 Arlington projection; Texas Defined uses the organizer's current city and dates rather than carrying the stale projection forward.",
    venue: "Mesquite Convention Center",
    officialUrl: "https://www.ckscrapbookevents.com/Events/GASC/Location-Hotel",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Great American Scrapbook Convention is a focused North Texas gathering for scrapbookers and paper crafters, combining an exhibit hall, classes, crop sessions, product shopping and community time in a two-day convention format.",
    planningSections: [
      { title: "Use the organizer's corrected 2027 location and dates", body: "The current organizer calendar lists GASC-Mesquite for Friday and Saturday, June 4-5, 2027. That is a material change from the supplied inventory's July 2027 Arlington projection, so plan around Mesquite while continuing to recheck the organizer because its posted dates are explicitly subject to change." },
      { title: "Choose classes before building the rest of the day", body: "GASC mixes shopping with scheduled classes and crop time. Once the 2027 class list opens, reserve priority sessions first and then leave enough unscheduled time for the exhibit hall rather than assuming the convention is only a vendor marketplace." },
      { title: "Use the connected convention-center setup", body: "The organizer identifies the Mesquite Convention Center at 1750 Rodeo Drive and notes that it connects directly to the Hampton Inn & Suites Dallas-Mesquite. Check the 2027 hotel block and final parking guidance when registration opens." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Connect the convention to a wider Dallas-area trip." },
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
