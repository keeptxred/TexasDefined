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
    dateNote: "The organizer confirms Saturday, December 5, 2026 in downtown Dallas. Its homepage advertises 8:30 a.m., while its spectator FAQ and linked 2026 ticket listing give 9 a.m. (ticket listing: doors 7 a.m.). Plan to be in place before 8:30 a.m. and confirm the precise parade start with the organizer.",
    venue: "Downtown Dallas",
    officialUrl: "https://dallasholidayparade.com/",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "The Dallas Holiday Parade—also commonly searched as the Dallas Christmas parade—is one of the city's largest one-day outdoor events. The date is now explicitly confirmed for December 5, rather than inferred from the first-Saturday tradition. The organizer's differing published start times make early arrival important. Choose between free public viewing and reserved seating, and between DART and parking outside the closure area.",
    planningSections: [
      { title: "December 5 is confirmed; allow for two advertised start times", body: "The 2026 homepage gives 8:30 a.m.; the organizer FAQ and its linked ticket provider give 9 a.m. The ticket listing specifies doors at 7 a.m., a separate time from the parade. Neither source explains the difference. For a reserved seat or curbside viewing, aim to be settled before 8:30 and confirm the exact start directly. The homepage also announces the CW 33 broadcast." },
      { title: "Dallas Christmas parade route: start at Commerce and Houston", body: "The spectator FAQ identifies Commerce and Houston streets as the starting intersection. Its maps page now labels the bleacher and merchant-closure maps 2026, but the restroom-route and staging maps still say 2025. Use the current closure and bleacher maps for parking and seat planning, and treat the older route and restroom maps as historical until the organizer confirms them." },
      { title: "Dallas Holiday Parade tickets and viewing", body: "Free public-route viewing does not require a bleacher ticket. The organizer links to Prekindle for 2026 optional reserved seats. Its FAQ permits chairs or blankets for unticketed spectators and describes storage of large items under ticketed bleachers. Check current checkout terms and seat availability before buying; choose a viewing location that fits your group's mobility needs." },
      { title: "Use DART if it fits your trip", body: "The organizer recommends DART to avoid downtown traffic, fees and closures. Drivers should use the 2026 merchant street-closure map and Downtown Dallas parking resource linked from the FAQ; decide on a meeting point and return route outside the closed streets. Check DART's event-day timetable before departure." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build a broader holiday weekend around downtown Dallas." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday events." },
    ],
    sources: [
      { label: "Dallas Holiday Parade official site", url: "https://dallasholidayparade.com/" },
      { label: "Dallas Holiday Parade official spectator guide, FAQ and dated maps", url: "https://dallasholidayparade.com/things-to-know" },
      { label: "Organizer-linked official ticket listing", url: "https://www.prekindle.com/events/childrensparade" },
      { label: "Downtown Dallas parking and transportation", url: "https://downtowndallas.com/experience/getting-around/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche10Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
