import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "great-american-scrapbook-convention",
    name: "Great American Scrapbook Convention",
    city: "Arlington",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-06-11",
    endDate: "2027-06-12",
    dateNote: "CK Scrapbook Events' current 2027 calendar lists GASC-Arlington June 11–12, 2027, replacing older cached GASC-Mesquite June 4–5 results. The organizer warns that dates and locations may change. Its old location/hotel page still describes a 2026 Mesquite block, not a confirmed 2027 Arlington venue or booking rate.",
    venue: "Arlington-area venue — confirm current hall with organizer",
    officialUrl: "https://www.ckscrapbookevents.com/Events/GASC/Location-Hotel",
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "The Great American Scrapbook Convention is a focused North Texas gathering for scrapbookers and paper crafters, combining an exhibit hall, classes, crop sessions, product shopping and community time in a two-day convention format.",
    planningSections: [
      { title: "June 11–12 in Arlington replaces the organizer's older Mesquite listing", body: "The latest CK Scrapbook Events home page and current GASC-Arlington listing both specify June 11–12, 2027, with dates and locations subject to change. An older cached FAQ still lists Mesquite June 4–5; this conflicts with the newer event-list page. Follow the current Arlington registration and request exact address from the organizer before reserving hotels." },
      { title: "Choose classes before building the rest of the day", body: "GASC mixes shopping with scheduled classes and crop time. Once the 2027 class list opens, reserve priority sessions first and then leave enough unscheduled time for the exhibit hall rather than assuming the convention is only a vendor marketplace." },
      { title: "Do not book the expired 2026 Mesquite hotel block", body: "The organizer's old Location & Hotel page still advertises the Mesquite Convention Center and a $120 room block ending July 22, 2026. That information belongs to the previous venue, not Arlington 2027. Check the newly published 2027 class, crop, shopping and hotel instructions before travel." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Connect the convention to a wider Arlington and Fort Worth trip." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas conventions, arts events and festivals." },
    ],
    sources: [
      { label: "CK Scrapbook Events official calendar", url: "https://www.ckscrapbookevents.com/" },
      { label: "Current GASC-Arlington 2027 listing", url: "https://www.ckscrapbookevents.com/Great-American/GASC-Arlington" },
      { label: "Old location/hotel page still advertising expired 2026 Mesquite room block", url: "https://www.ckscrapbookevents.com/Events/GASC/Location-Hotel" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche23Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
