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
    dateNote: "The discovery inventory listed George West Storyfest on November 7, 2026. Current event history shows Dobie Dichos is the active literary tradition tied to Storyfest's organizers; the official Dobie Dichos site lists November 6, 2026 in Oakville.",
    venue: "Historic Oakville Jail",
    officialUrl: "https://www.dobiedichos.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Dobie Dichos is an active Live Oak County literary tradition centered on J. Frank Dobie, Texas folklore and storytelling. It is the appropriate current event to surface instead of the stale George West Storyfest seed entry.",
    planningSections: [
      { title: "Go to Oakville, not downtown George West", body: "The event is held on the grounds of the Historic Oakville Jail in Oakville, between Three Rivers and George West. Use the organizer's directions and allow extra time for the rural venue." },
      { title: "Build the evening around the program", body: "The 2026 schedule opens the gates at 5 p.m., with the meal and music beginning at 6 p.m. and the storytelling program from 7 to 9 p.m. Choose your ticket type before arrival because meal-and-program and program-only options differ." },
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
    dateNote: "Dallas Holiday Parade 2026 planning date: Saturday, December 5. The organizer's standing rule says the parade is always held on the first Saturday in December; its current spectator guide says the parade starts at 9 a.m. and lasts about two hours. The dedicated 2026 announcement is not yet posted on the organizer's homepage, so recheck the official site before travel for year-specific operational changes.",
    venue: "Downtown Dallas",
    officialUrl: "https://dallasholidayparade.com/",
    sourceCheckedAt: "2026-09-10",
    whyItMatters: "The Dallas Holiday Parade—also commonly searched as the Dallas Christmas parade—is one of the city's largest one-day outdoor events. For 2026 planning, the highest-value facts are the first-Saturday date rule, the 9 a.m. standing start time, the downtown route start, free public viewing and the organizer's DART recommendation.",
    planningSections: [
      { title: "Dallas Holiday Parade 2026: December 5 planning date", body: "The organizer says the parade is always held on the first Saturday in December, which falls on December 5 in 2026. Its current spectator guide lists a 9 a.m. start and about a two-hour parade. Because the organizer's homepage still displays the 2025 event announcement, treat December 5 and the standing timing as the 2026 planning window and confirm the dedicated 2026 update before departure." },
      { title: "Dallas Christmas parade route: start at Commerce and Houston", body: "The official spectator guide says the parade route begins at Commerce and Houston streets in downtown Dallas. Arrive early enough to choose a viewing location before crowds build, and recheck the organizer's 2026 route or operational notice when it is published rather than relying on prior-year closure maps." },
      { title: "Dallas Holiday Parade tickets and viewing", body: "The organizer says the public parade is free. Optional bleacher seating is sold separately, and the standing spectator guide says those tickets become available beginning October 5. No 2026 bleacher price is posted in the current guide, so do not assume a prior-year price; use the official site when 2026 seating sales open." },
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
