import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "dobie-dichos",
    name: "Dobie Dichos",
    city: "Oakville",
    countySlug: "live-oak",
    countyName: "Live Oak County",
    region: "south-texas",
    category: "culture",
    startDate: "2026-11-06",
    endDate: "2026-11-06",
    dateNote: "The 2026 Dobie Dichos storytelling event is November 6 in Oakville (not the old George West Storyfest seed). On October 29 the organizer listed Program + Meal as sold out; Program Only remained separately available, with $25 adult gate admission. Recheck the official ticket page because availability can change.",
    venue: "Historic Oakville Jail",
    officialUrl: "https://www.dobiedichos.com/",
    sourceCheckedAt: "2026-10-29",
    whyItMatters: "Dobie Dichos is an active Live Oak County literary tradition centered on J. Frank Dobie, Texas folklore and storytelling. It is the appropriate current event to surface instead of the stale George West Storyfest seed entry.",
    planningSections: [
      { title: "Go to Oakville, not downtown George West", body: "The event is held on the grounds of the Historic Oakville Jail in Oakville, between Three Rivers and George West. Use the organizer's directions and allow extra time for the rural venue." },
      { title: "Build the evening around the program", body: "The 2026 schedule opens the gates at 5 p.m., with the meal and music beginning at 6 p.m. and the storytelling program from 7 to 9 p.m. As verified October 29, 2026, the organizer marks the Program + Meal tier sold out. Its Program Only ticket still permits walk-up purchase (listed at $25 for adults); confirm the current ticket terms before departure rather than expecting the sold-out meal option." },
      { title: "Bring what the setting calls for", body: "This is an outdoor campfire-style literary event. Check the current weather and organizer guidance, and bring a lawn chair if the current ticket instructions call for one." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-live-oak", label: "Explore Live Oak County", description: "Connect the event to a broader South Texas visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas literary, heritage and cultural events." },
    ],
    sources: [
      { label: "Dobie Dichos official site", url: "https://www.dobiedichos.com/" },
      { label: "Dobie Dichos official history", url: "https://www.dobiedichos.com/about" },
      { label: "Dobie Dichos official tickets and schedule", url: "https://www.dobiedichos.com/tickets-schedule" },
    ],
  },
  {
    slug: "dallas-holiday-parade",
    name: "Dallas Holiday Parade",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-12-05",
    endDate: "2026-12-05",
    dateNote: "The organizer now explicitly announces Saturday, December 5, 2026 at 8:30 a.m. in downtown Dallas, with tickets for optional seating on sale. This current-year announcement supersedes prior 9 a.m. spectator-guide and inferred first-Saturday information; recheck the 2026 route, entry instructions and traffic advisories before travel.",
    venue: "Downtown Dallas",
    officialUrl: "https://dallasholidayparade.com/",
    sourceCheckedAt: "2026-11-07",
    whyItMatters: "The Dallas Holiday Parade—also commonly searched as the Dallas Christmas parade—is one of the city's largest one-day outdoor events. The organizer's 2026 announcement confirms Saturday December 5 at 8:30 a.m. downtown. For visitors the key decisions are free public viewing versus optional paid seating, the downtown route and DART versus parking.",
    planningSections: [
      { title: "Dallas Holiday Parade 2026: confirmed December 5 at 8:30 a.m.", body: "The parade organizer's homepage now announces Saturday, December 5, 2026 at 8:30 a.m. in downtown Dallas. This dedicated 2026 notice supersedes the older spectator guide's 9 a.m. standing time. Arrive ahead of the announced start and check official traffic, route and ticket updates closer to parade day." },
      { title: "Dallas Christmas parade route: start at Commerce and Houston", body: "The official spectator guide says the parade route begins at Commerce and Houston streets in downtown Dallas. Arrive early enough to choose a viewing location before crowds build, and recheck the organizer's 2026 route or operational notice when it is published rather than relying on prior-year closure maps." },
      { title: "Dallas Holiday Parade tickets and viewing", body: "The organizer says the public parade is free to view; optional seating tickets are sold separately and the official homepage now advertises 2026 seating tickets on sale. Do not assume a past edition's bleacher price or that a ticket is needed to watch from ordinary public viewing areas; use the current official checkout for seat availability and terms." },
      { title: "Use DART if it fits your trip", body: "The organizer recommends taking DART downtown to avoid traffic, parking fees and street closures. If you drive, use current downtown parking information and wait for a 2026 traffic advisory before planning around specific closure streets or times." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build a broader holiday weekend around downtown Dallas." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday events." },
    ],
    sources: [
      { label: "Dallas Holiday Parade official site", url: "https://dallasholidayparade.com/" },
      { label: "Dallas Holiday Parade official spectator guide and FAQ", url: "https://dallasholidayparade.com/things-to-know" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche10Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
