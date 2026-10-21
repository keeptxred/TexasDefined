import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

interface MajorEventOccurrenceWindow {
  label?: string;
  startDate: string;
  endDate?: string;
}

type MultiWindowMajorEventAuthorityRecord = MajorEventAuthorityRecord & {
  occurrenceWindows?: MajorEventOccurrenceWindow[];
};

const records: MultiWindowMajorEventAuthorityRecord[] = [
  {
    slug: "austin-city-limits-music-festival",
    name: "Austin City Limits Music Festival",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "music",
    startDate: "2026-10-02",
    endDate: "2026-10-11",
    occurrenceWindows: [
      { label: "Weekend One", startDate: "2026-10-02", endDate: "2026-10-04" },
      { label: "Weekend Two", startDate: "2026-10-09", endDate: "2026-10-11" },
    ],
    dateNote: "ACL Fest runs on two separate three-day weekends in 2026: October 2-4 and October 9-11. There is no festival programming implied for the Monday-through-Thursday gap between the weekends.",
    venue: "Zilker Park",
    officialUrl: "https://www.aclfestival.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Austin City Limits Music Festival turns Zilker Park into one of Texas' largest music destinations for two separate October weekends, with more than 100 performances across nine stages plus Austin food, drink and festival programming.",
    planningSections: [
      { title: "Choose Weekend One or Weekend Two first", body: "The organizer confirms two discrete 2026 festival windows: October 2-4 and October 9-11. Pick the weekend before booking lodging or transportation because Texas Defined does not treat the gap between them as festival days." },
      { title: "Build the day from the official schedule", body: "ACL publishes a stage-by-stage schedule for both weekends. Choose priority performers and allow realistic walking time across Zilker Park instead of assuming back-to-back sets on different stages are effortless to reach." },
      { title: "Use the festival's transportation guidance", body: "A major Zilker Park weekend changes normal access patterns around central Austin. Recheck the organizer's current transportation, bag, entry and ticket guidance before arrival and avoid relying on ordinary park-day assumptions." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build a broader Austin and Travis County itinerary around the selected ACL weekend." },
      { href: "/texas-music", label: "Texas Music", description: "Connect ACL Fest to the wider Texas live-music story." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas music and culture events." },
    ],
    sources: [
      { label: "Austin City Limits Music Festival official site", url: "https://www.aclfestival.com/" },
      { label: "ACL Fest official 2026 schedule", url: "https://www.aclfestival.com/schedule" },
      { label: "ACL Fest official tickets and weekend dates", url: "https://www.aclfestival.com/tickets" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche31Server(slug: string): MultiWindowMajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
