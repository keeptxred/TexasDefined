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
    dateNote: "The 2026 festival's two separate October 2–4 and October 9–11 weekends are complete. The intervening October 5–8 days were not festival dates, and no 2027 edition dates are asserted.",
    venue: "Zilker Park",
    officialUrl: "https://www.aclfestival.com/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "Austin City Limits Music Festival turns Zilker Park into one of Texas' largest music destinations for two separate October weekends, with more than 100 performances across nine stages plus Austin food, drink and festival programming.",
    quickFacts: [
      { label: "2026 Weekend One", value: "October 2–4 (completed)" },
      { label: "2026 Weekend Two", value: "October 9–11 (completed)" },
      { label: "Location", value: "Zilker Park, Austin" },
      { label: "Program footprint", value: "100+ performances across nine stages in 2026" },
      { label: "Next edition", value: "Wait for new official dates, artist lineup and ticket rules" },
    ],
    planningSections: [
      { title: "Use two distinct weekend dates, not an eleven-day festival", body: "In 2026, ACL Fest ran Friday–Sunday October 2–4 and Friday–Sunday October 9–11 at Zilker Park. The Monday–Thursday gap was not live festival programming; confirm new official windows before publishing a future edition." },
      { title: "Compare the two weekend lineups and passes", body: "Some performers, stage times and pass products vary across weekends. Choose your priority artists before selecting a single-day or weekend ticket, and use the event's official authorized resale and support channels rather than assuming a general admissions ticket covers VIP services." },
      { title: "Leave realistic time between nine stages", body: "With more than 100 performances across nine stages, overlapping sets are inevitable. Use the organizer's final stage-by-stage timetable and map, prioritize a small number of performances and allow time for queues, food and cross-park movement." },
      { title: "Plan Zilker Park access separately from normal Austin park visits", body: "The park's festival footprint changes road access and nearby parking. Consult the organizer's current transportation, shuttle, rideshare and accessible drop-off policies; do not promise parking directly beside a festival entrance." },
      { title: "Account for bags, safety and Texas October weather", body: "Security screening and bag dimensions come from the festival's current safety rules. Heat, sudden rain and evening temperature shifts can affect an outdoor day; hydrate, dress for long walks and confirm permitted refill containers." },
      { title: "Build Austin sightseeing outside festival hours", body: "Barton Springs, downtown museums and surrounding food neighborhoods can round out a trip, but avoid overloading the same day with fixed-time admissions; confirm whether specific venues remain accessible during Zilker Park festival closures." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build a broader Austin and Travis County itinerary around the selected ACL weekend." },
      { href: "/texas-music", label: "Texas Music", description: "Connect ACL Fest to the wider Texas live-music story." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas music and culture events." },
    ],
    sources: [
      { label: "ACL Fest organizer and 2026 program", url: "https://www.aclfestival.com/" },
      { label: "ACL Fest visitor accessibility and help center", url: "https://support.aclfestival.com/" },
      { label: "ACL Fest ticketing and festival updates", url: "https://www.aclfestival.com/tickets" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche31Server(slug: string): MultiWindowMajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
